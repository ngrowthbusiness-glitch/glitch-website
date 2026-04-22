"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   QUIZ DATA
───────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: "ga4",
    text: "Hai GA4 (o un altro tool analytics) con eventi di conversione configurati — non solo il pageview generico?",
    hint: "Acquisti, lead form, checkout completati, click su CTA: qualsiasi azione che conta per il tuo business.",
  },
  {
    id: "funnel",
    text: "Riesci a vedere il funnel di conversione step-by-step: sessioni → azione chiave → conversione finale?",
    hint: "Non il solo totale delle conversioni. Ogni step intermedio, con i drop-off tra uno e l'altro.",
  },
  {
    id: "cpa",
    text: "Sai qual è il tuo CPA reale per canale — non il ROAS medio aggregato di piattaforma?",
    hint: "Quanto costa acquisire un cliente pagante da Meta, da Google, da organic — separatamente.",
  },
  {
    id: "dropoff",
    text: "Quando una campagna non performa, riesci a identificare in quale step del funnel si rompe?",
    hint: "Non 'le campagne non vanno bene'. Ma: il problema è nel click, nello step 2 del checkout, o nel prodotto?",
  },
  {
    id: "ltv",
    text: "Hai dati sull'LTV medio dei tuoi clienti — e sai quale canale porta clienti con LTV più alto?",
    hint: "Non solo chi compra di più una volta, ma chi torna e spende nel tempo.",
  },
  {
    id: "exclusions",
    text: "Le tue campagne di acquisizione escludono i clienti esistenti e i retargeting warm?",
    hint: "Stai misurando l'acquisizione reale — non le conversioni di chi avrebbe comprato comunque.",
  },
  {
    id: "abtesting",
    text: "Fai test A/B sistematici su almeno una variabile al mese — con una metrica di successo definita prima di iniziare?",
    hint: "Non test casuali. Un test con ipotesi chiara, durata stabilita, metrica primaria definita.",
  },
  {
    id: "attribution",
    text: "Il modello di attribuzione che usi riflette il percorso reale del tuo cliente — non quello di default della piattaforma?",
    hint: "Last-click di Google tende a prendersi tutto il credito. Il tuo cliente tocca davvero solo quel canale?",
  },
  {
    id: "dashboard",
    text: "Hai un cruscotto con massimo 5-6 metriche chiave che guardi ogni settimana — prima di aprire Meta Ads o Google Ads?",
    hint: "Non 40 report diversi. Un posto solo, con i numeri che decidono se la settimana è andata bene o no.",
  },
  {
    id: "reporting",
    text: "Il tuo team o agenzia ti porta report con KPI di business (CPA reale, MER, LTV) — non solo metriche di piattaforma (ROAS, CPM, CTR)?",
    hint: "La differenza: 'Il ROAS è 4.2' vs 'Abbiamo acquisito 34 clienti a €28 ciascuno con un LTV medio di €180'.",
  },
] as const;

type QuizStep = "intro" | "quiz" | "result" | "form" | "done";

type Profile = {
  label: string;
  tagline: string;
  color: string;
  summary: string;
  actions: string[];
  nextStep: string;
};

function getProfile(score: number): Profile {
  if (score <= 3) return {
    label: "Fase iniziale",
    tagline: "Il tuo marketing sta operando quasi alla cieca.",
    color: "#ff6b6b",
    summary: "Hai pochi dati strutturati. Le decisioni si basano principalmente sull'intuizione e sulle metriche di piattaforma — non su dati di business reali. Non è necessariamente colpa tua: spesso chi lavora per te non ha mai impostato le cose diversamente. Ma ogni euro speso ora è difficile da ottimizzare perché non sai cosa sta funzionando.",
    actions: [
      "Configura gli eventi di conversione in GA4 — non solo il pageview generico",
      "Imposta il funnel step-by-step: sessioni → azione chiave → conversione finale",
      "Calcola il CPA reale per canale — non il ROAS medio aggregato",
      "Prima di nuove campagne: capisci dove si rompe il funnel esistente",
    ],
    nextStep: "Prima priorità: audit analytics di base. Prima di spendere un euro in più, capisci cosa stai misurando.",
  };
  if (score <= 6) return {
    label: "In costruzione",
    tagline: "Hai delle basi. Mancano i collegamenti critici.",
    color: "#ffd93d",
    summary: "Hai alcune metriche attive e un'idea dei tuoi numeri principali. Il problema è che i dati che guardi non sono ancora connessi agli obiettivi di business reali. Stai probabilmente ottimizzando le metriche di piattaforma invece dei risultati. Con pochi aggiustamenti mirati potresti passare da 'so che funziona qualcosa' a 'so esattamente cosa funziona e perché'.",
    actions: [
      "Collega le metriche di campagna ai KPI reali: CPA, LTV, margine per canale",
      "Segmenta le performance per canale — smetti di guardare le medie aggregate",
      "Analizza l'LTV dei clienti esistenti per capire dove stai davvero acquisendo valore",
      "Costruisci un cruscotto con massimo 5 metriche — quelle che guardi prima di tutto il resto",
    ],
    nextStep: "Priorità: allineamento KPI. Ridefinisci cosa misuri prima di ottimizzare le campagne.",
  };
  if (score <= 9) return {
    label: "Quasi solido",
    tagline: "Buona struttura. Alcune lacune specifiche da chiudere.",
    color: "#00ffb3",
    summary: "Hai un'infrastruttura dati discreta. Misuri le cose giuste nella maggior parte dei casi. Le opportunità di miglioramento ora sono specifiche — non sistemiche. Un lavoro mirato sulle aree deboli (quelle dove hai risposto no) porterebbe un salto di efficienza misurabile senza rivoluzionare tutto.",
    actions: [
      "Identifica i 2-3 touchpoint del funnel dove hai ancora dati incompleti",
      "Verifica che le esclusioni di targeting siano configurate correttamente su tutti i canali",
      "Implementa test A/B sistematici — non occasionali — con metrica di successo definita prima",
      "Controlla il modello di attribuzione: riflette davvero il percorso del tuo cliente?",
    ],
    nextStep: "Priorità: chiudere le lacune specifiche. Non serve una ristrutturazione — serve ottimizzazione mirata.",
  };
  return {
    label: "Data-driven",
    tagline: "Sei tra il 5% delle aziende che misura davvero.",
    color: "#00fffc",
    summary: "Hai una struttura dati solida. Misuri i KPI giusti, segmenti per canale, e prendi decisioni basate su dati di business reali. Il lavoro ora è mantenere questa disciplina mentre il business scala — e trovare i margini di ottimizzazione più sottili. Spesso a questo livello il valore maggiore è nella strategia, non nella tecnica.",
    actions: [
      "Focalizzati su test incrementali: ogni test migliora un numero specifico",
      "Analisi per coorte: i clienti acquisiti in periodi diversi si comportano diversamente?",
      "Verifica che l'attribuzione regga quando aumenti il budget e aggiungi canali",
      "Costruisci un sistema di forecasting: dai dati storici, cosa ti aspetti il prossimo trimestre?",
    ],
    nextStep: "Sei in una posizione solida. Il valore è nel dettaglio e nel mantenere la disciplina di misurazione.",
  };
}

/* ─────────────────────────────────────────────
   MARKDOWN RENDERER
───────────────────────────────────────────── */
function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-playfair),\'Playfair Display\',serif;font-size:clamp(16px,2vw,20px);font-weight:700;color:var(--text);margin:24px 0 10px;line-height:1.3;">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:12px;font-weight:600;color:var(--text);margin:18px 0 6px;letter-spacing:0.5px;">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text);font-weight:600;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:var(--text-dim);">$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:5px 0;padding-left:4px;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul style="list-style:none;padding:0;margin:10px 0;">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:10px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">')
    .replace(/^(?!<[h|u|l|p])(.+)$/gm, '<p style="margin:10px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">$1</p>');
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function AuditScorePage() {
  const [step, setStep] = useState<QuizStep>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [settore, setSettore] = useState("altro");
  const [budget, setBudget] = useState("500-1500");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const aiRef = useRef<HTMLDivElement>(null);

  const score = answers.filter(Boolean).length;
  const profile = getProfile(score);

  const fetchAI = useCallback(async (ans: boolean[], set: string, bud: string) => {
    setAiLoading(true);
    setAiError("");
    setAiResult("");
    const risposte: Record<string, boolean> = {};
    QUESTIONS.forEach((q, i) => { risposte[q.id] = ans[i] ?? false; });
    try {
      const response = await fetch("/api/risorse/marketing-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ risposte, settore: set, budget: bud }),
      });
      if (!response.ok || !response.body) throw new Error("Errore del server");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) setAiResult((prev) => prev + parsed.text);
          } catch (e) {
            if (e instanceof Error && e.message !== "Unexpected end of JSON input") throw e;
          }
        }
      }
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === "result" && answers.length === QUESTIONS.length && !aiResult && !aiLoading) {
      fetchAI(answers, settore, budget);
    }
  }, [step, answers, settore, budget, aiResult, aiLoading, fetchAI]);

  function handleAnswer(val: boolean) {
    const next = [...answers, val];
    setAnswers(next);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setStep("result");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;
    setSending(true);
    setError("");
    try {
      const answersObj: Record<string, boolean> = {};
      QUESTIONS.forEach((q, i) => { answersObj[q.text] = answers[i] ?? false; });
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, type: "audit-score", score, total: QUESTIONS.length, answers: answersObj }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("done");
      } else {
        setError(data.message || "Errore nell'invio. Riprova.");
      }
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <style>{`
        .as-wrap {
          min-height: 100vh;
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 60px 100px;
        }
        .as-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 48px;
        }
        .as-breadcrumb a { color: var(--teal); text-decoration: none; }
        .as-breadcrumb a:hover { opacity: .7; }
        .as-breadcrumb-sep { color: var(--text-faint); }

        /* INTRO */
        .as-eyebrow { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--teal); margin-bottom: 20px; }
        .as-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 44px); font-weight: 700;
          color: var(--text); line-height: 1.15; margin-bottom: 20px;
        }
        .as-title em { font-style: italic; color: var(--teal); }
        .as-lead { font-size: 14px; color: var(--text-dim); line-height: 1.85; margin-bottom: 36px; }
        .as-lead strong { color: var(--text); }
        .as-meta {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
          font-size: 11px; color: var(--text-faint); margin-bottom: 40px;
        }
        .as-meta-item { display: flex; align-items: center; gap: 6px; }
        .as-start-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: var(--bg);
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          padding: 15px 32px; border-radius: 5px; cursor: pointer;
          border: none; transition: opacity .2s, transform .2s;
        }
        .as-start-btn:hover { opacity: .85; transform: translateY(-2px); }

        /* PROGRESS */
        .as-progress { margin-bottom: 40px; }
        .as-progress-bar-bg {
          height: 3px; background: rgba(232,245,242,0.08); border-radius: 2px;
          margin-bottom: 12px; overflow: hidden;
        }
        .as-progress-bar-fill {
          height: 100%; background: var(--teal); border-radius: 2px;
          transition: width .4s ease;
        }
        .as-progress-label {
          font-size: 10px; color: var(--text-faint); letter-spacing: 1px;
          display: flex; justify-content: space-between;
        }

        /* QUESTION */
        .as-q-number {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px; color: var(--teal); letter-spacing: 2px;
          margin-bottom: 20px;
        }
        .as-q-text {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 24px); font-weight: 700;
          color: var(--text); line-height: 1.35; margin-bottom: 16px;
        }
        .as-q-hint {
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
          padding: 12px 16px; background: rgba(232,245,242,0.03);
          border-left: 2px solid var(--teal-border); border-radius: 0 4px 4px 0;
          margin-bottom: 36px;
        }
        .as-q-btns { display: flex; gap: 12px; }
        .as-q-btn {
          flex: 1; padding: 16px; border-radius: 6px; cursor: pointer;
          font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border: 1px solid; transition: background .15s, color .15s, transform .1s;
        }
        .as-q-btn:active { transform: scale(.98); }
        .as-q-btn-yes {
          border-color: var(--teal); color: var(--teal); background: var(--teal-dim);
        }
        .as-q-btn-yes:hover { background: var(--teal); color: var(--bg); }
        .as-q-btn-no {
          border-color: rgba(232,245,242,0.12); color: var(--text-dim);
          background: rgba(232,245,242,0.03);
        }
        .as-q-btn-no:hover { border-color: rgba(232,245,242,0.25); color: var(--text); }

        /* RESULT */
        .as-result-score {
          display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px;
        }
        .as-result-num {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 64px; font-weight: 700; line-height: 1;
        }
        .as-result-total {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 24px; color: var(--text-faint);
        }
        .as-result-bar-bg {
          height: 6px; background: rgba(232,245,242,0.08);
          border-radius: 3px; margin: 16px 0 24px; overflow: hidden;
        }
        .as-result-bar-fill { height: 100%; border-radius: 3px; transition: width .6s ease; }
        .as-result-label {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; margin-bottom: 8px;
        }
        .as-result-tagline { font-size: 14px; color: var(--text-dim); margin-bottom: 28px; line-height: 1.6; }
        .as-result-summary {
          font-size: 13px; color: var(--text-dim); line-height: 1.9;
          padding: 20px; background: rgba(232,245,242,0.03);
          border: 1px solid rgba(232,245,242,0.07); border-radius: 6px; margin-bottom: 32px;
        }
        .as-result-actions { margin-bottom: 32px; }
        .as-result-actions-title {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-faint); margin-bottom: 14px;
        }
        .as-result-action {
          display: flex; gap: 14px; padding: 12px 0;
          border-bottom: 1px solid rgba(232,245,242,0.06); font-size: 13px;
          color: var(--text-dim); line-height: 1.65;
        }
        .as-result-action:last-child { border-bottom: none; }
        .as-result-action-num {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; color: var(--teal); flex-shrink: 0; padding-top: 3px;
        }
        .as-nextstep {
          padding: 16px 20px;
          background: rgba(0,255,252,0.06);
          border-left: 3px solid var(--teal);
          border-radius: 0 6px 6px 0; margin-bottom: 40px;
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
        }
        .as-nextstep strong { color: var(--teal); }
        .as-get-report-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: var(--bg);
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          padding: 15px 32px; border-radius: 5px; cursor: pointer;
          border: none; transition: opacity .2s, transform .2s;
        }
        .as-get-report-btn:hover { opacity: .85; transform: translateY(-2px); }

        /* FORM */
        .as-form-block {
          border: 1px solid var(--teal-border); border-radius: 10px;
          padding: 36px 40px; background: var(--teal-dim); margin-top: 8px;
        }
        .as-form-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 10px;
        }
        .as-form-sub { font-size: 13px; color: var(--text-dim); line-height: 1.7; margin-bottom: 28px; }
        .as-field { margin-bottom: 16px; }
        .as-label { display: block; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
        .as-input {
          width: 100%; padding: 12px 16px; background: rgba(232,245,242,0.05);
          border: 1px solid rgba(232,245,242,0.12); border-radius: 5px;
          color: var(--text); font-size: 13px; box-sizing: border-box;
          transition: border-color .2s; outline: none;
        }
        .as-input:focus { border-color: var(--teal); }
        .as-input::placeholder { color: var(--text-faint); }
        .as-submit-btn {
          width: 100%; padding: 15px; background: var(--teal); color: var(--bg);
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border: none; border-radius: 5px; cursor: pointer;
          transition: opacity .2s; margin-top: 8px;
        }
        .as-submit-btn:hover:not(:disabled) { opacity: .85; }
        .as-submit-btn:disabled { opacity: .5; cursor: default; }
        .as-error { font-size: 12px; color: #ff6b6b; margin-top: 10px; }
        .as-privacy { font-size: 10px; color: var(--text-faint); margin-top: 12px; line-height: 1.6; text-align: center; }

        /* DONE */
        .as-done {
          text-align: center; padding: 48px 32px;
          border: 1px solid var(--teal-border); border-radius: 10px;
          background: var(--teal-dim);
        }
        .as-done-icon { font-size: 40px; margin-bottom: 20px; }
        .as-done-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 12px;
        }
        .as-done-sub { font-size: 13px; color: var(--text-dim); line-height: 1.8; margin-bottom: 28px; }

        @media (max-width: 768px) {
          .as-wrap { padding: 100px 24px 80px; }
          .as-form-block { padding: 24px 20px; }
          .as-q-btns { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .as-wrap { padding: 90px 16px 64px; }
        }

        /* ── AI ANALYSIS ── */
        .as-ai-wrap {
          margin-top: 48px;
          border: 1px solid rgba(0,255,252,0.15);
          border-radius: 12px;
          overflow: hidden;
        }
        .as-ai-header {
          background: rgba(0,255,252,0.05);
          border-bottom: 1px solid rgba(0,255,252,0.1);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .as-ai-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
        }
        .as-ai-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
        }
        .as-ai-body {
          padding: 28px;
        }
        .as-ai-body svg { max-width: 100%; height: auto; }
        .as-ai-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 40px 0;
          color: var(--text-faint);
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .as-ai-spin {
          width: 28px;
          height: 28px;
          border: 2px solid rgba(0,255,252,0.12);
          border-top-color: var(--teal);
          border-radius: 50%;
          animation: aispin 0.8s linear infinite;
        }
        @keyframes aispin { to { transform: rotate(360deg); } }
        .as-ai-error {
          padding: 16px 20px;
          color: #ff8080;
          font-size: 12px;
        }
        .as-post-cta {
          margin-top: 28px;
          padding: 24px 28px;
          border: 1px solid rgba(0,255,252,0.1);
          border-radius: 10px;
          background: rgba(0,255,252,0.025);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .as-post-cta-text { font-size: 13px; color: var(--text-dim); line-height: 1.6; }
        .as-post-cta-text strong { color: var(--text); }
        .as-post-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--teal);
          color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .as-post-cta-btn:hover { opacity: 0.85; }
      `}</style>

      <div className="as-wrap">
        <nav className="as-breadcrumb">
          <Link href="/">Home</Link>
          <span className="as-breadcrumb-sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="as-breadcrumb-sep">/</span>
          <span>Audit Score</span>
        </nav>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <>
            <div className="as-eyebrow">Strumento gratuito</div>
            <h1 className="as-title">
              Quanto è sano<br />
              <em>il tuo marketing?</em>
            </h1>
            <p className="as-lead">
              <strong>10 domande, 3 minuti.</strong> Scopri se stai prendendo decisioni
              su dati solidi o su rumore — e ricevi un profilo personalizzato con i punti
              critici specifici del tuo business.
            </p>
            <div className="as-meta">
              <span className="as-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                3 minuti
              </span>
              <span className="as-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                10 domande
              </span>
              <span className="as-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.54-.45a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Risultati via email
              </span>
              <span className="as-meta-item">Gratuito · Nessun impegno</span>
            </div>
            <button className="as-start-btn" onClick={() => setStep("quiz")}>
              Inizia l&apos;audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        )}

        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <>
            <div className="as-progress">
              <div className="as-progress-bar-bg">
                <div
                  className="as-progress-bar-fill"
                  style={{ width: `${((current) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <div className="as-progress-label">
                <span>Domanda {current + 1} di {QUESTIONS.length}</span>
                <span>{Math.round((current / QUESTIONS.length) * 100)}% completato</span>
              </div>
            </div>

            <div className="as-q-number">
              {String(current + 1).padStart(2, "0")} / {QUESTIONS.length}
            </div>
            <div className="as-q-text">{QUESTIONS[current].text}</div>
            <div className="as-q-hint">{QUESTIONS[current].hint}</div>
            <div className="as-q-btns">
              <button className="as-q-btn as-q-btn-yes" onClick={() => handleAnswer(true)}>
                Sì, lo faccio
              </button>
              <button className="as-q-btn as-q-btn-no" onClick={() => handleAnswer(false)}>
                No / non ancora
              </button>
            </div>
          </>
        )}

        {/* ── RESULT ── */}
        {step === "result" && (
          <>
            <div className="as-eyebrow">Il tuo profilo</div>
            <div className="as-result-score">
              <span className="as-result-num" style={{ color: profile.color }}>{score}</span>
              <span className="as-result-total">/ {QUESTIONS.length}</span>
            </div>
            <div className="as-result-bar-bg">
              <div
                className="as-result-bar-fill"
                style={{
                  width: `${Math.max(4, (score / QUESTIONS.length) * 100)}%`,
                  background: profile.color,
                }}
              />
            </div>
            <div className="as-result-label" style={{ color: profile.color }}>{profile.label}</div>
            <div className="as-result-tagline">{profile.tagline}</div>
            <div className="as-result-summary">{profile.summary}</div>
            <div className="as-result-actions">
              <div className="as-result-actions-title">Prossimi passi consigliati</div>
              {profile.actions.map((a, i) => (
                <div key={i} className="as-result-action">
                  <span className="as-result-action-num">0{i + 1}</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
            <div className="as-nextstep">
              <strong>Next step:</strong> {profile.nextStep}
            </div>
            {/* ── AI ANALYSIS ── */}
            <div className="as-ai-wrap" ref={aiRef}>
              <div className="as-ai-header">
                <div className="as-ai-dot" style={aiLoading ? { animation: "pulse 1.5s ease-in-out infinite" } : {}} />
                <span className="as-ai-label">
                  {aiLoading ? "Analisi AI in corso..." : aiResult ? "Diagnosi AI completata" : "Preparazione analisi..."}
                </span>
              </div>
              <div className="as-ai-body">
                {aiLoading && !aiResult && (
                  <div className="as-ai-spinner">
                    <div className="as-ai-spin" />
                    <span>Analisi in corso...</span>
                  </div>
                )}
                {aiError && <div className="as-ai-error">Errore: {aiError}</div>}
                {aiResult && (
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(aiResult) }} />
                )}
              </div>
            </div>

            {!aiLoading && aiResult && (
              <div className="as-post-cta">
                <div className="as-post-cta-text">
                  <strong>Vuoi trasformare questa diagnosi in un piano?</strong><br />
                  15 minuti per capire insieme quali 3 azioni portano il massimo impatto nel tuo caso specifico.
                </div>
                <a
                  href="https://wa.me/393516737345"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="as-post-cta-btn"
                >
                  Prenota la call
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            )}

            <button className="as-get-report-btn" onClick={() => setStep("form")} style={{ marginTop: "24px" }}>
              Ricevi il report completo via email
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        )}

        {/* ── FORM ── */}
        {step === "form" && (
          <>
            <div className="as-result-score" style={{ marginBottom: "4px" }}>
              <span className="as-result-num" style={{ color: profile.color, fontSize: "40px" }}>{score}</span>
              <span className="as-result-total" style={{ fontSize: "18px" }}>/ {QUESTIONS.length}</span>
            </div>
            <div className="as-result-label" style={{ color: profile.color, fontSize: "20px", marginBottom: "28px" }}>
              {profile.label}
            </div>
            <div className="as-form-block">
              <div className="as-form-title">Ricevi il tuo report completo</div>
              <div className="as-form-sub">
                Ti mandiamo il profilo dettagliato con i tuoi risultati, i prossimi passi
                consigliati e un confronto con i benchmark di settore — direttamente nella tua inbox.
              </div>
              <form onSubmit={handleSubmit}>
                <div className="as-field">
                  <label className="as-label" htmlFor="as-nome">Nome</label>
                  <input
                    id="as-nome"
                    className="as-input"
                    type="text"
                    placeholder="Il tuo nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="as-field">
                  <label className="as-label" htmlFor="as-email">Email</label>
                  <input
                    id="as-email"
                    className="as-input"
                    type="email"
                    placeholder="la.tua@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="as-submit-btn" type="submit" disabled={sending}>
                  {sending ? "Invio in corso…" : "Invia il mio report"}
                </button>
                {error && <div className="as-error">{error}</div>}
                <div className="as-privacy">
                  Nessuno spam. Puoi cancellarti in qualsiasi momento.
                </div>
              </form>
            </div>
          </>
        )}

        {/* ── DONE ── */}
        {step === "done" && (
          <div className="as-done">
            <div className="as-done-icon">✓</div>
            <div className="as-done-title">Report inviato.</div>
            <div className="as-done-sub">
              Controlla la tua inbox — il profilo dettagliato con score <strong>{score}/{QUESTIONS.length}</strong>,
              i prossimi passi e i benchmark è in arrivo.<br />
              Se non lo trovi, controlla la cartella spam.
            </div>
            <Link
              href="/blog"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: "var(--teal)", fontSize: "11px", letterSpacing: "2px",
                textTransform: "uppercase", textDecoration: "none",
              }}
            >
              Torna al blog
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
