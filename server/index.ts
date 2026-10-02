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

function getAnswerMap(data: z.infer<typeof submissionSchema>) {
  return Object.fromEntries(data.answers.map((item) => [item.id, item.answer]));
}

function buildAnswerSummary(data: z.infer<typeof submissionSchema>) {
  const answers = getAnswerMap(data);
  const notes: string[] = [];

  const trust = typeof answers.trust_level === "number" ? answers.trust_level : null;
  if (trust !== null) {
    if (trust <= 3) {
      notes.push("🫶 <b>Ishonch:</b> Hozircha ehtiyotkor. Ishonchni bosim bilan emas, vaqt va barqaror munosabat bilan qurish muhim ko‘rinadi.");
    } else if (trust <= 6) {
      notes.push("🫶 <b>Ishonch:</b> Boshlang‘ich ishonch bor, lekin hali bir-birini yaxshiroq tanish uchun vaqt kerak.");
    } else {
      notes.push("🫶 <b>Ishonch:</b> Sizga nisbatan iliq va ancha ochiq kayfiyat bor, lekin bu baribir tanishuvning hozirgi bosqichidagi taassurot.");
    }
  }

  const trustBuilder = String(answers.trust_builder ?? "");
  const trustText: Record<string, string> = {
    words: "ochiq va aniq muloqot",
    actions: "gapdan ko‘ra amalda ko‘rsatish",
    time: "vaqt davomida bir xil, barqaror munosabat",
    all: "gap, amal va vaqtning bir-biriga mos kelishi"
  };
  if (trustText[trustBuilder]) {
    notes.push(`🤝 <b>Ishonchni nima oshiradi:</b> U uchun ${trustText[trustBuilder]} ayniqsa muhim.`);
  }

  const directness = String(answers.directness ?? "");
  const conflict = String(answers.conflict ?? "");
  const communicationParts: string[] = [];
  if (directness === "like") communicationParts.push("ochiq gapni yaxshi qabul qiladi");
  if (directness === "soft") communicationParts.push("ochiqlikni yoqtiradi, lekin ohang yumshoq bo‘lishini xohlaydi");
  if (directness === "depends") communicationParts.push("ochiqlikda vaziyat va ohangni hisobga oladi");
  if (directness === "hard") communicationParts.push("to‘g‘ridan-to‘g‘ri gapga darrov ochilmasligi mumkin");

  if (conflict === "talk_now") communicationParts.push("kelishmovchilikni cho‘zmay gaplashib olishga moyil");
  if (conflict === "pause") communicationParts.push("janjal paytida avval tinchlanish uchun vaqtni afzal ko‘radi");
  if (conflict === "message") communicationParts.push("murakkab hislarni yozib tushuntirish unga osonroq bo‘lishi mumkin");
  if (conflict === "depends") communicationParts.push("kelishmovchilik usulini vaziyatga qarab tanlaydi");

  if (communicationParts.length) {
    notes.push(`💬 <b>Muloqot:</b> ${communicationParts.join("; ")}.`);
  }

  const jealousy = String(answers.jealousy ?? "");
  const jealousyText: Record<string, string> = {
    little: "ozroq rashkni befarqlik emasligining belgisi deb ko‘rishi mumkin, lekin me’yor muhim",
    trust: "ishonchni rashkdan ustun qo‘yadi",
    boundaries: "nazoratdan ko‘ra aniq va o‘zaro kelishilgan chegaralarni muhim deb biladi",
    depends: "rashkni qora-oq emas, vaziyat va sababga qarab baholaydi"
  };
  if (jealousyText[jealousy]) {
    notes.push(`🧭 <b>Chegaralar:</b> ${jealousyText[jealousy]}.`);
  }

  const expectations = Array.isArray(answers.expectations) ? answers.expectations : [];
  const traits = Array.isArray(answers.important_traits) ? answers.important_traits : [];
  const values = new Set([...expectations, ...traits]);
  const valueLabels: Record<string, string> = {
    respect: "hurmat",
    loyalty: "sadoqat",
    responsible: "mas’uliyat",
    responsibility: "mas’uliyat",
    care: "g‘amxo‘rlik",
    honesty: "ochiqlik",
    freedom: "shaxsiy erkinlik",
    protection: "xavfsizlik va tayanch",
    fair: "adolat",
    protective: "himoya va tayanch",
    calm: "vazminlik",
    ambitious: "maqsadlilik",
    family: "oilani qadrlash",
    loyal: "sodiqlik",
    understanding: "tushunishga harakat qilish",
    humor: "hazil va yengillik"
  };
  const topValues = [...values]
    .map((item) => valueLabels[String(item)])
    .filter(Boolean)
    .slice(0, 6);

  if (topValues.length) {
    notes.push(`✨ <b>Qadriyatlari:</b> Javoblarida ${topValues.join(", ")} ko‘proq ajralib turadi.`);
  }

  const dateInvite = String(answers.date_invite ?? "");
  const role = String(answers.role ?? "");
  let closeness = "";

  if (dateInvite === "yes") closeness = "Uchrashuv fikriga ochiq.";
  if (dateInvite === "public_place") closeness = "Uchrashuvga qarshi emas, lekin o‘zini xotirjam va xavfsiz his qiladigan ochiq joyni afzal ko‘radi.";
  if (dateInvite === "later") closeness = "Hozircha shoshmasdan, avval ko‘proq suhbat va tanishuvni xohlaydi.";
  if (dateInvite === "not_ready") closeness = "Hozir uchrashuvga tayyor emas; bu joyda bosim qilmaslik eng to‘g‘ri yondashuv.";

  const roleText: Record<string, string> = {
    friend: "Hozircha do‘stlik unga eng tabiiy yo‘nalish bo‘lib ko‘rinadi.",
    know_more: "Bir-biringizni yaqindan bilib ko‘rishga ochiq.",
    close_person: "Vaqt o‘tishi bilan yaqinroq inson bo‘lib qolish ehtimolini inkor qilmaydi.",
    unknown: "Hozir hech narsaga nom qo‘yishni istamaydi; vaqt ko‘rsatishini afzal ko‘radi."
  };

  if (closeness || roleText[role]) {
    notes.push(`🌙 <b>Siz bilan yaqinlashish:</b> ${[closeness, roleText[role]].filter(Boolean).join(" ")}`);
  }

  const sayNo = String(answers.say_no ?? "");
  if (sayNo === "yes" || sayNo === "try") {
    notes.push("🌿 <b>Muhim signal:</b> Sizga yoqmagan narsani aytishga tayyorligi — ochiq va sog‘lom muloqot uchun yaxshi asos.");
  } else if (sayNo === "need_trust") {
    notes.push("🌿 <b>Muhim signal:</b> Noqulay narsalarni ochiq aytishi uchun avval ko‘proq ishonch va xotirjamlik kerak bo‘lishi mumkin.");
  } else if (sayNo === "hard") {
    notes.push("🌿 <b>Muhim signal:</b> Noroziligini darrov aytmasligi mumkin. Shuning uchun uning sukutini avtomatik ravishda rozilik deb qabul qilmaslik muhim.");
  }

  return notes;
}

function buildTelegramMessages(data: z.infer<typeof submissionSchema>) {
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

  lines.push("✨ <i>Message loyihasi orqali yuborildi</i>");

  const summary = [
    "🧠 <b>JAVOBLARDAN CHIQQAN TAXMINIY XULOSA</b>",
    "",
    "<i>Bu psixologik tashxis emas. Faqat tanlangan javoblardagi tendensiyalar.</i>",
    "",
    ...buildAnswerSummary(data),
    "",
    "🤍 <b>Qisqa yondashuv:</b> Eng yaxshi yo‘l — uning javoblaridagi chegaralar va tempni hurmat qilib, hech narsani majburlamasdan tabiiy davom ettirish."
  ];

  return [lines.join("\n"), summary.join("\n")];
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
    const messages = buildTelegramMessages(parsed.data);
    for (const message of messages) {
      await sendTelegram(message);
    }
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
