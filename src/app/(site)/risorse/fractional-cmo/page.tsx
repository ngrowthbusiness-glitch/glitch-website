"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormData {
  fatturato: string;
  teamMarketing: string;
  problema: string;
  obiettivo: string;
  cosaProviato: string;
  budget: string;
  settore: string;
  fase: string;
}

const STEPS = [
  {
    id: "base",
    title: "Il tuo business",
    fields: ["fatturato", "settore", "fase"],
  },
  {
    id: "team",
    title: "Il tuo team marketing",
    fields: ["teamMarketing", "budget"],
  },
  {
    id: "situazione",
    title: "La tua situazione",
    fields: ["problema", "obiettivo", "cosaProviato"],
  },
];

const FATTURATO_OPTIONS = [
  { value: "sotto-100k", label: "Sotto €100k / anno" },
  { value: "100k-500k", label: "€100k – €500k / anno" },
  { value: "500k-2m", label: "€500k – €2M / anno" },
  { value: "oltre-2m", label: "Oltre €2M / anno" },
];

const TEAM_OPTIONS = [
  { value: "nessuno", label: "Nessuno — gestisco tutto io" },
  { value: "io-stesso", label: "Solo io, part-time" },
  { value: "1-2-persone", label: "1–2 persone interne" },
  { value: "agenzia", label: "Un'agenzia esterna" },
  { value: "misto", label: "Misto: interni + agenzia" },
];

const BUDGET_OPTIONS = [
  { value: "sotto-500", label: "Sotto €500 / mese" },
  { value: "500-1500", label: "€500 – €1.500 / mese" },
  { value: "1500-3000", label: "€1.500 – €3.000 / mese" },
  { value: "oltre-3000", label: "Oltre €3.000 / mese" },
];

const SETTORE_OPTIONS = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "b2b-servizi", label: "B2B Servizi" },
  { value: "b2b-manifattura", label: "B2B Manifattura / Prodotto" },
  { value: "infoproduct", label: "Info-product / Formazione" },
  { value: "altro", label: "Altro" },
];

const FASE_OPTIONS = [
  { value: "startup", label: "Startup — prodotto ancora da validare" },
  { value: "crescita", label: "Crescita — ho clienti, voglio scalare" },
  { value: "consolidamento", label: "Consolidamento — ottimizzare i margini" },
  { value: "scala", label: "Scala — espansione mercati / canali" },
];

/* ─────────────────────────────────────────────
   SIMPLE MARKDOWN RENDERER
───────────────────────────────────────────── */
function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-playfair),\'Playfair Display\',serif;font-size:clamp(17px,2vw,21px);font-weight:700;color:var(--text);margin:28px 0 12px;line-height:1.3;">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:13px;font-weight:600;color:var(--text);margin:20px 0 8px;letter-spacing:0.5px;">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text);font-weight:600;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:var(--text-dim);">$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;padding-left:4px;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul style="list-style:none;padding:0;margin:12px 0;">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:12px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">')
    .replace(/^(?!<[h|u|l|p])(.+)$/gm, '<p style="margin:12px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">$1</p>');
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function FractionalCMOPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fatturato: "",
    teamMarketing: "",
    problema: "",
    obiettivo: "",
    cosaProviato: "",
    budget: "",
    settore: "",
    fase: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const canProceed = () => {
    if (step === 0) return formData.fatturato && formData.settore && formData.fase;
    if (step === 1) return formData.teamMarketing && formData.budget;
    if (step === 2) return formData.problema.length > 10 && formData.obiettivo.length > 10;
    return false;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult("");
    setSubmitted(true);

    try {
      const response = await fetch("/api/risorse/fractional-cmo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok || !response.body) {
        throw new Error("Errore nella risposta del server");
      }

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
            if (parsed.text) setResult((prev) => prev + parsed.text);
          } catch (e) {
            if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
              throw e;
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .fcmo-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 80px 40px 120px;
          min-height: 80vh;
        }
        @media (max-width: 768px) { .fcmo-page { padding: 60px 24px 80px; } }
        @media (max-width: 480px) { .fcmo-page { padding: 40px 16px 64px; } }

        .fcmo-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          text-decoration: none;
          margin-bottom: 40px;
          transition: color 0.2s;
        }
        .fcmo-back:hover { color: var(--teal); }

        .fcmo-header { margin-bottom: 48px; }
        .fcmo-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
        }
        .fcmo-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .fcmo-title em { font-style: italic; color: var(--teal); }
        .fcmo-subtitle {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.75;
          max-width: 540px;
        }

        /* ── PROGRESS ── */
        .fcmo-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
        }
        .fcmo-step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(232,245,242,0.12);
          transition: background 0.3s, transform 0.2s;
        }
        .fcmo-step-dot.active {
          background: var(--teal);
          transform: scale(1.25);
        }
        .fcmo-step-dot.done {
          background: rgba(0,255,252,0.35);
        }
        .fcmo-step-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-left: 4px;
        }

        /* ── FORM CARD ── */
        .fcmo-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 12px;
          padding: 36px 40px;
          background: rgba(232,245,242,0.02);
          margin-bottom: 24px;
        }
        @media (max-width: 480px) { .fcmo-card { padding: 24px 20px; } }

        .fcmo-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 24px;
        }

        /* ── OPTION GRID ── */
        .fcmo-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        @media (max-width: 560px) { .fcmo-options { grid-template-columns: 1fr; } }

        .fcmo-option {
          border: 1px solid rgba(232,245,242,0.1);
          border-radius: 8px;
          padding: 12px 16px;
          background: transparent;
          color: var(--text-dim);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .fcmo-option:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
          color: var(--text);
        }
        .fcmo-option.selected {
          border-color: var(--teal);
          background: rgba(0,255,252,0.08);
          color: var(--text);
        }

        /* ── TEXTAREA ── */
        .fcmo-field { margin-bottom: 20px; }
        .fcmo-label {
          display: block;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 8px;
        }
        .fcmo-textarea {
          width: 100%;
          background: rgba(232,245,242,0.03);
          border: 1px solid rgba(232,245,242,0.1);
          border-radius: 8px;
          padding: 14px 16px;
          color: var(--text);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px;
          line-height: 1.65;
          resize: vertical;
          min-height: 90px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .fcmo-textarea:focus {
          outline: none;
          border-color: var(--teal-border);
        }
        .fcmo-textarea::placeholder { color: var(--text-faint); }

        /* ── NAVIGATION ── */
        .fcmo-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .fcmo-btn-back {
          background: transparent;
          border: 1px solid rgba(232,245,242,0.12);
          border-radius: 6px;
          padding: 12px 22px;
          color: var(--text-dim);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .fcmo-btn-back:hover { border-color: var(--teal-border); color: var(--teal); }

        .fcmo-btn-next {
          background: var(--teal);
          border: none;
          border-radius: 6px;
          padding: 12px 28px;
          color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fcmo-btn-next:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        .fcmo-btn-next:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ── RESULT ── */
        .fcmo-result-wrap {
          border: 1px solid rgba(0,255,252,0.15);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 48px;
        }
        .fcmo-result-header {
          background: rgba(0,255,252,0.05);
          border-bottom: 1px solid rgba(0,255,252,0.1);
          padding: 16px 32px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .fcmo-result-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
        }
        .fcmo-result-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
        }
        .fcmo-result-body {
          padding: 32px;
        }
        .fcmo-result-body svg {
          max-width: 100%;
          height: auto;
        }

        /* ── LOADING ── */
        .fcmo-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 0;
          color: var(--text-dim);
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .fcmo-spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(0,255,252,0.15);
          border-top-color: var(--teal);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── ERROR ── */
        .fcmo-error {
          border: 1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          padding: 16px 20px;
          color: #ff8080;
          font-size: 12px;
          background: rgba(255,80,80,0.05);
          margin-top: 24px;
        }

        /* ── CTA POST-RESULT ── */
        .fcmo-post-cta {
          margin-top: 32px;
          padding: 28px 32px;
          border: 1px solid rgba(0,255,252,0.12);
          border-radius: 10px;
          background: rgba(0,255,252,0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .fcmo-post-cta-text {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .fcmo-post-cta-text strong { color: var(--text); }
        .fcmo-post-cta-btn {
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
          padding: 13px 22px;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .fcmo-post-cta-btn:hover { opacity: 0.85; }
      `}</style>

      <div className="fcmo-page">

        {/* Back link */}
        <Link href="/risorse" className="fcmo-back">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Risorse
        </Link>

        {/* Header */}
        <div className="fcmo-header">
          <div className="fcmo-eyebrow">Self-Assessment · AI-Powered · Gratis</div>
          <h1 className="fcmo-title">
            Di cosa hai<br /><em>davvero bisogno?</em>
          </h1>
          <p className="fcmo-subtitle">
            5 minuti per capire se un Fractional CMO fa al caso tuo — o se c&apos;è una soluzione più adatta alla tua fase.
            L&apos;AI analizza la tua situazione e ti dà una risposta diretta.
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Progress */}
            <div className="fcmo-progress">
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`fcmo-step-dot ${i === step ? "active" : i < step ? "done" : ""}`}
                />
              ))}
              <span className="fcmo-step-label">
                {step + 1} / {STEPS.length} — {STEPS[step].title}
              </span>
            </div>

            {/* Step 0 — Dati base */}
            {step === 0 && (
              <div className="fcmo-card">
                <div className="fcmo-card-title">Il tuo business</div>

                <label className="fcmo-label">Fatturato annuo</label>
                <div className="fcmo-options">
                  {FATTURATO_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`fcmo-option${formData.fatturato === o.value ? " selected" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, fatturato: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <label className="fcmo-label" style={{ marginTop: "20px" }}>Settore</label>
                <div className="fcmo-options">
                  {SETTORE_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`fcmo-option${formData.settore === o.value ? " selected" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, settore: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <label className="fcmo-label" style={{ marginTop: "20px" }}>Fase aziendale</label>
                <div className="fcmo-options">
                  {FASE_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`fcmo-option${formData.fase === o.value ? " selected" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, fase: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 — Team */}
            {step === 1 && (
              <div className="fcmo-card">
                <div className="fcmo-card-title">Il tuo team marketing</div>

                <label className="fcmo-label">Chi gestisce il marketing oggi?</label>
                <div className="fcmo-options">
                  {TEAM_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`fcmo-option${formData.teamMarketing === o.value ? " selected" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, teamMarketing: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <label className="fcmo-label" style={{ marginTop: "20px" }}>Budget disponibile per supporto marketing</label>
                <div className="fcmo-options">
                  {BUDGET_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      className={`fcmo-option${formData.budget === o.value ? " selected" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, budget: o.value }))}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Situazione */}
            {step === 2 && (
              <div className="fcmo-card">
                <div className="fcmo-card-title">La tua situazione</div>

                <div className="fcmo-field">
                  <label className="fcmo-label">Qual è il problema principale che stai cercando di risolvere?</label>
                  <textarea
                    className="fcmo-textarea"
                    placeholder="Es: le ads non scalano, non so quale canale prioritizzare, non riesco a misurare il ritorno reale del marketing..."
                    value={formData.problema}
                    onChange={(e) => setFormData((p) => ({ ...p, problema: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="fcmo-field">
                  <label className="fcmo-label">Qual è il tuo obiettivo nei prossimi 12 mesi?</label>
                  <textarea
                    className="fcmo-textarea"
                    placeholder="Es: raggiungere €500k di fatturato, entrare in un nuovo mercato, ridurre il costo di acquisizione sotto €50..."
                    value={formData.obiettivo}
                    onChange={(e) => setFormData((p) => ({ ...p, obiettivo: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="fcmo-field">
                  <label className="fcmo-label">Cosa hai già provato? (opzionale)</label>
                  <textarea
                    className="fcmo-textarea"
                    placeholder="Es: ho cambiato agenzia, fatto corsi, assunto un freelancer..."
                    value={formData.cosaProviato}
                    onChange={(e) => setFormData((p) => ({ ...p, cosaProviato: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="fcmo-nav">
              {step > 0 ? (
                <button className="fcmo-btn-back" onClick={() => setStep((s) => s - 1)}>
                  ← Indietro
                </button>
              ) : (
                <div />
              )}
              {step < STEPS.length - 1 ? (
                <button
                  className="fcmo-btn-next"
                  disabled={!canProceed()}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Avanti
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  className="fcmo-btn-next"
                  disabled={!canProceed()}
                  onClick={handleSubmit}
                >
                  Analizza la mia situazione
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </>
        ) : (
          /* ── RESULT VIEW ── */
          <div ref={resultRef}>
            {loading && !result && (
              <div className="fcmo-loading">
                <div className="fcmo-spinner" />
                <span>Analisi in corso...</span>
              </div>
            )}

            {error && (
              <div className="fcmo-error">
                <strong>Errore:</strong> {error}
              </div>
            )}

            {result && (
              <>
                <div className="fcmo-result-wrap">
                  <div className="fcmo-result-header">
                    <div className={`fcmo-result-dot${loading ? "" : ""}`}
                      style={loading ? { animation: "pulse 1.5s ease-in-out infinite" } : {}} />
                    <span className="fcmo-result-label">
                      {loading ? "Analisi in corso..." : "Analisi completata"}
                    </span>
                  </div>
                  <div
                    className="fcmo-result-body"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }}
                  />
                </div>

                {!loading && (
                  <div className="fcmo-post-cta">
                    <div className="fcmo-post-cta-text">
                      <strong>Vuoi approfondire?</strong><br />
                      Prenota 20 minuti gratuiti per verificare insieme se il modello Fractional CMO ha senso per il tuo business specifico.
                    </div>
                    <a
                      href="https://wa.me/393516737345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fcmo-post-cta-btn"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      Prenota la call
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
