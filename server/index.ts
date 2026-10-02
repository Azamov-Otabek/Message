import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT || 3001);

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(express.json({ limit: "32kb" }));

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { ok: false, message: "Juda ko‘p urinish. Birozdan keyin qayta urinib ko‘ring." }
});

const answerSchema = z.object({
  id: z.string().min(1).max(80),
  question: z.string().min(1).max(500),
  answer: z.union([
    z.string().max(1000),
    z.array(z.string().max(200)).max(20),
    z.number().min(0).max(10)
  ]),
  answerLabels: z.array(z.string().max(1000)).max(20)
});

const submissionSchema = z.object({
  answers: z.array(answerSchema).min(1).max(30),
  durationMs: z.number().int().min(0).max(1000 * 60 * 60)
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatDuration(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes}m ${rest}s` : `${rest}s`;
}

function buildTelegramMessage(data: z.infer<typeof submissionSchema>) {
  const lines = [
    "💌 <b>MESSAGE — yangi javoblar</b>",
    "",
    `⏱ <b>Vaqt:</b> ${escapeHtml(formatDuration(data.durationMs))}`,
    `🕒 <b>Kelgan vaqt:</b> ${escapeHtml(new Date().toISOString())}`,
    "",
    "━━━━━━━━━━━━━━━━━━",
    ""
  ];

  data.answers.forEach((item, index) => {
    lines.push(`<b>${index + 1}. ${escapeHtml(item.question)}</b>`);
    const value = item.answerLabels.length ? item.answerLabels.join(", ") : "—";
    lines.push(escapeHtml(value || "—"));
    lines.push("");
  });

  lines.push("━━━━━━━━━━━━━━━━━━");
  lines.push("✨ <i>Message loyihasi orqali yuborildi</i>");

  return lines.join("\n");
}

async function sendTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram environment variables are not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true
    }),
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${details.slice(0, 250)}`);
  }
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    telegramConfigured: Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
    )
  });
});

app.post("/api/submit", submitLimiter, async (req, res) => {
  const parsed = submissionSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ ok: false, message: "Javob formati noto‘g‘ri." });
    return;
  }

  try {
    await sendTelegram(buildTelegramMessage(parsed.data));
    res.json({ ok: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    res.status(503).json({
      ok: false,
      message: "Telegramga yuborishda xatolik."
    });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, "../dist");

app.use(express.static(clientPath, { maxAge: "1h" }));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(clientPath, "index.html"));
    return;
  }
  next();
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Topilmadi." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Message server listening on port ${port}`);
});
