import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HeartHandshake,
  Send,
  Sparkles
} from "lucide-react";
import { characterNotes, questions, type Question } from "./questions";

type AnswerValue = string | string[] | number;

type SubmissionAnswer = {
  id: string;
  question: string;
  answer: AnswerValue;
  answerLabels: string[];
};

function getLabels(question: Question, value: AnswerValue): string[] {
  if (question.type === "scale") return [String(value) + "/10"];
  if (question.type === "text") return [String(value || "—")];

  const values = Array.isArray(value) ? value : [String(value)];
  return values.map(
    (item) => question.options?.find((option) => option.value === item)?.label ?? item
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef<number>(Date.now());

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const currentAnswer = answers[question?.id];

  const canContinue = useMemo(() => {
    if (!question) return false;
    if (question.optional) return true;
    if (question.type === "multi") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (question.type === "text") {
      return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
    }
    return currentAnswer !== undefined && currentAnswer !== "";
  }, [question, currentAnswer]);

  const chooseSingle = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const toggleMulti = (value: string) => {
    setAnswers((prev) => {
      const selected = Array.isArray(prev[question.id])
        ? (prev[question.id] as string[])
        : [];

      return {
        ...prev,
        [question.id]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value]
      };
    });
  };

  const goNext = async () => {
    if (!canContinue || submitting) return;

    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setError("");

    const payload: SubmissionAnswer[] = questions.map((item) => {
      const value = answers[item.id] ?? "";
      return {
        id: item.id,
        question: item.title,
        answer: value,
        answerLabels: getLabels(item, value)
      };
    });

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: payload,
          durationMs: Date.now() - startedAt.current
        })
      });

      if (!response.ok) {
        throw new Error("Javoblarni yuborib bo‘lmadi");
      }

      setDone(true);
    } catch {
      setError("Nimadir ishlamadi. Internetni tekshirib, yana bir marta urinib ko‘ring.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!started) {
    return (
      <main className="app-shell intro-shell">
        <Ambient />
        <section className="intro-card">
          <div className="tiny-mark"><Sparkles size={15} /> faqat bir necha daqiqa</div>
          <p className="kicker">BIR OZ ROSTGO‘YLIK</p>
          <h1>Bu test emas.<br /><em>Sizni tushunish uchun</em> kichik bir yo‘l.</h1>
          <p className="intro-copy">
            Hech bir javobning “to‘g‘ri” varianti yo‘q. Men shunchaki siz qanday
            o‘ylashingizni, nimani qadrlashingizni va meni hozir qanday
            ko‘rishingizni bilmoqchiman.
          </p>

          <div className="intro-rule">
            <span>13 savol</span>
            <i />
            <span>2–4 daqiqa</span>
            <i />
            <span>rost javoblar</span>
          </div>

          <button
            className="primary-btn"
            onClick={() => {
              startedAt.current = Date.now();
              setStarted(true);
            }}
          >
            Boshlaymiz <ArrowRight size={18} />
          </button>

          <p className="whisper">Javoblaringiz menga yuboriladi · oxirida kichkina gapim ham bor.</p>
        </section>
      </main>
    );
  }

  if (done) {
    return (
      <main className="app-shell done-shell">
        <Ambient />
        <section className="done-card">
          <div className="done-icon"><HeartHandshake size={30} /></div>
          <p className="kicker">TAMOM ✦</p>
          <h1>Rahmat.<br />Endi navbat <em>menda.</em></h1>
          <p>
            Javoblaringiz yetib bordi. Eng yoqqan joyi — siz hech narsani
            “chiroyli ko‘rsatish” uchun emas, o‘zingizdek javob bergan bo‘lsangiz bo‘ldi.
          </p>
          <div className="signature">
            <span>— Otabek</span>
          </div>
        </section>
      </main>
    );
  }

  const note = characterNotes[current];

  return (
    <main className="app-shell">
      <Ambient />

      <header className="topbar">
        <button
          className="ghost-btn"
          aria-label="Orqaga"
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
          disabled={current === 0}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="progress-wrap">
          <div className="progress-meta">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <span>{String(questions.length).padStart(2, "0")}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: progress + "%" }} />
          </div>
        </div>

        <span className="top-mark">✦</span>
      </header>

      <section className="question-layout">
        <div className="question-card" key={question.id}>
          <p className="eyebrow">{question.eyebrow}</p>
          <h2>{question.title}</h2>
          {question.description && <p className="question-description">{question.description}</p>}

          {question.type === "single" && (
            <div className="option-grid">
              {question.options?.map((option, index) => {
                const selected = currentAnswer === option.value;
                return (
                  <button
                    className={"option-card " + (selected ? "selected" : "")}
                    key={option.value}
                    onClick={() => chooseSingle(option.value)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-copy">
                      <strong>{option.label}</strong>
                      {option.hint && <small>{option.hint}</small>}
                    </span>
                    <span className="option-check">{selected && <Check size={15} />}</span>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "multi" && (
            <div className="chip-grid">
              {question.options?.map((option) => {
                const selected =
                  Array.isArray(currentAnswer) && currentAnswer.includes(option.value);

                return (
                  <button
                    key={option.value}
                    className={"choice-chip " + (selected ? "selected" : "")}
                    onClick={() => toggleMulti(option.value)}
                  >
                    <span>{option.label}</span>
                    {selected && <Check size={15} />}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "scale" && (
            <div className="scale-block">
              <div className="scale-value">{typeof currentAnswer === "number" ? currentAnswer : 5}<span>/10</span></div>
              <input
                aria-label="Ishonch darajasi"
                type="range"
                min="0"
                max="10"
                step="1"
                value={typeof currentAnswer === "number" ? currentAnswer : 5}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: Number(event.target.value)
                  }))
                }
              />
              <div className="scale-labels">
                <span>{question.minLabel}</span>
                <span>{question.maxLabel}</span>
              </div>
              {currentAnswer === undefined && (
                <button
                  className="scale-confirm"
                  onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: 5 }))}
                >
                  5 dan boshlaymiz
                </button>
              )}
            </div>
          )}

          {question.type === "text" && (
            <div className="text-answer">
              <textarea
                value={typeof currentAnswer === "string" ? currentAnswer : ""}
                placeholder={question.placeholder}
                maxLength={600}
                onChange={(event) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: event.target.value
                  }))
                }
              />
              <span>{typeof currentAnswer === "string" ? currentAnswer.length : 0}/600</span>
            </div>
          )}

          <div className="question-actions">
            <button
              className="primary-btn"
              disabled={!canContinue || submitting}
              onClick={goNext}
            >
              {current === questions.length - 1 ? (
                <>{submitting ? "Yuborilyapti..." : "Javoblarni yuborish"} <Send size={17} /></>
              ) : (
                <>Davom etish <ArrowRight size={18} /></>
              )}
            </button>
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>

        {note && (
          <aside className="character-note">
            <span>Otabek haqida</span>
            <strong>{note.title}</strong>
            <p>{note.text}</p>
          </aside>
        )}
      </section>

      <footer className="footer-note">
        <span>MESSAGE / 2026</span>
        <span>javob berishda shoshilmang</span>
      </footer>
    </main>
  );
}

function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="grain" />
      <div className="stars">
        {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
      </div>
    </div>
  );
}
