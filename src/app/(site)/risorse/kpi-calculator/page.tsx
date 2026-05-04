"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface FormData {
  budgetAds: string;
  fatturato: string;
  aov: string;
  margineLordo: string;
  modello: string;
  costoAcquisizione: string;
}

const MODELLO_OPTIONS = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "b2b-leadgen", label: "B2B Lead Gen" },
  { value: "infoproduct", label: "Info-product / Formazione" },
  { value: "servizi", label: "Servizi / Consulenza" },
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
    .replace(/^\|(.+)\|$/gm, (row) => {
      const cells = row.split("|").filter(Boolean).map((c) => c.trim());
      const isHeader = false;
      return `<tr>${cells.map((c) => `<td style="padding:8px 12px;border:1px solid rgba(232,245,242,0.08);font-size:12px;color:var(--text-dim);">${c}</td>`).join("")}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (m) => `<table style="width:100%;border-collapse:collapse;margin:16px 0;">${m}</table>`)
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;padding-left:4px;">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul style="list-style:none;padding:0;margin:12px 0;">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:12px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">')
    .replace(/^(?!<[htulp])(.+)$/gm, '<p style="margin:12px 0;font-size:13px;color:var(--text-dim);line-height:1.75;">$1</p>');
}

/* ─────────────────────────────────────────────
   NUMERIC INPUT COMPONENT
───────────────────────────────────────────── */
function NumericInput({
  label,
  hint,
  prefix,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="kpi-field">
      <label className="kpi-label">
        {label}
        {hint && <span className="kpi-hint"> — {hint}</span>}
      </label>
      <div className="kpi-input-wrap">
        {prefix && <span className="kpi-prefix">{prefix}</span>}
        <input
          type="number"
          className="kpi-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
          min="0"
        />
        {suffix && <span className="kpi-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function KPICalculatorPage() {
  const [formData, setFormData] = useState<FormData>({
    budgetAds: "",
    fatturato: "",
    aov: "",
    margineLordo: "",
    modello: "",
    costoAcquisizione: "",
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

  const isValid = () => {
    const b = parseFloat(formData.budgetAds);
    const f = parseFloat(formData.fatturato);
    const a = parseFloat(formData.aov);
    const m = parseFloat(formData.margineLordo);
    return (
      formData.modello &&
      b > 0 && f > 0 && a > 0 && m > 0 && m <= 100
    );
  };

  const handleSubmit = async () => {
    if (!isValid()) return;
    setLoading(true);
    setError("");
    setResult("");
    setSubmitted(true);

    const payload = {
      budgetAds: parseFloat(formData.budgetAds),
      fatturato: parseFloat(formData.fatturato),
      aov: parseFloat(formData.aov),
      margineLordo: parseFloat(formData.margineLordo),
      modello: formData.modello,
      costoAcquisizione: formData.costoAcquisizione ? parseFloat(formData.costoAcquisizione) : undefined,
    };

    try {
      const response = await fetch("/api/risorse/kpi-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Errore del server");
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
            if (e instanceof Error && e.message !== "Unexpected end of JSON input") throw e;
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: keyof FormData) => (v: string) =>
    setFormData((p) => ({ ...p, [field]: v }));

  return (
    <>
      <style>{`
        .kpi-page {
          max-width: 760px;
          margin: 0 auto;
          padding: 80px 40px 120px;
          min-height: 80vh;
        }
        @media (max-width: 768px) { .kpi-page { padding: 60px 24px 80px; } }
        @media (max-width: 480px) { .kpi-page { padding: 40px 16px 64px; } }

        .kpi-back {
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
        .kpi-back:hover { color: var(--teal); }

        .kpi-header { margin-bottom: 48px; }
        .kpi-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
        }
        .kpi-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          margin-bottom: 14px;
        }
        .kpi-title em { font-style: italic; color: var(--teal); }
        .kpi-subtitle {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.75;
          max-width: 540px;
        }

        /* ── FORM CARD ── */
        .kpi-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 12px;
          padding: 36px 40px;
          background: rgba(232,245,242,0.02);
          margin-bottom: 24px;
        }
        @media (max-width: 480px) { .kpi-card { padding: 24px 20px; } }

        .kpi-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 28px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 560px) { .kpi-grid { grid-template-columns: 1fr; } }

        /* ── FIELD ── */
        .kpi-field { display: flex; flex-direction: column; gap: 8px; }
        .kpi-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .kpi-hint { text-transform: none; letter-spacing: 0; font-size: 10px; color: rgba(232,245,242,0.25); }
        .kpi-input-wrap {
          display: flex;
          align-items: center;
          background: rgba(232,245,242,0.03);
          border: 1px solid rgba(232,245,242,0.1);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .kpi-input-wrap:focus-within { border-color: var(--teal-border); }
        .kpi-prefix, .kpi-suffix {
          padding: 0 12px;
          font-size: 13px;
          color: var(--teal);
          background: rgba(0,255,252,0.05);
          height: 44px;
          display: flex;
          align-items: center;
          border-right: 1px solid rgba(232,245,242,0.08);
          flex-shrink: 0;
        }
        .kpi-suffix { border-right: none; border-left: 1px solid rgba(232,245,242,0.08); }
        .kpi-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0 14px;
          height: 44px;
          color: var(--text);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 14px;
          outline: none;
        }
        .kpi-input::placeholder { color: var(--text-faint); }
        .kpi-input::-webkit-outer-spin-button,
        .kpi-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .kpi-input[type=number] { -moz-appearance: textfield; }

        /* ── MODEL OPTIONS ── */
        .kpi-models {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 28px;
        }
        @media (max-width: 600px) { .kpi-models { grid-template-columns: repeat(2, 1fr); } }

        .kpi-model-btn {
          border: 1px solid rgba(232,245,242,0.1);
          border-radius: 8px;
          padding: 10px 8px;
          background: transparent;
          color: var(--text-dim);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.5px;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .kpi-model-btn:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
          color: var(--text);
        }
        .kpi-model-btn.selected {
          border-color: var(--teal);
          background: rgba(0,255,252,0.08);
          color: var(--text);
        }

        .kpi-section-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 16px;
        }

        .kpi-optional-tag {
          font-size: 8px;
          letter-spacing: 1px;
          color: var(--text-faint);
          border: 1px solid rgba(232,245,242,0.1);
          padding: 2px 6px;
          border-radius: 3px;
          margin-left: 6px;
          text-transform: none;
          vertical-align: middle;
        }

        /* ── SUBMIT ── */
        .kpi-submit-wrap {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
        .kpi-btn {
          background: var(--teal);
          border: none;
          border-radius: 6px;
          padding: 14px 32px;
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
          gap: 10px;
        }
        .kpi-btn:hover:not(:disabled) { opacity: 0.85; transform: translateY(-1px); }
        .kpi-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .kpi-reset {
          background: transparent;
          border: 1px solid rgba(232,245,242,0.12);
          border-radius: 6px;
          padding: 10px 18px;
          color: var(--text-faint);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: color 0.2s;
          margin-right: 12px;
        }
        .kpi-reset:hover { color: var(--text-dim); }

        /* ── RESULT ── */
        .kpi-result-wrap {
          border: 1px solid rgba(0,255,252,0.15);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 48px;
        }
        .kpi-result-header {
          background: rgba(0,255,252,0.05);
          border-bottom: 1px solid rgba(0,255,252,0.1);
          padding: 16px 32px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .kpi-result-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
        }
        .kpi-result-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
        }
        .kpi-result-body {
          padding: 32px;
        }
        .kpi-result-body svg {
          max-width: 100%;
          height: auto;
        }
        .kpi-result-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 12px;
        }
        .kpi-result-body table th {
          background: rgba(0,255,252,0.06);
          color: var(--teal);
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 12px;
          border: 1px solid rgba(232,245,242,0.08);
          text-align: left;
        }

        /* ── LOADING ── */
        .kpi-loading {
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
        .kpi-spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(0,255,252,0.15);
          border-top-color: var(--teal);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .kpi-error {
          border: 1px solid rgba(255,80,80,0.25);
          border-radius: 8px;
          padding: 16px 20px;
          color: #ff8080;
          font-size: 12px;
          background: rgba(255,80,80,0.05);
          margin-top: 24px;
        }

        .kpi-post-cta {
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
        .kpi-post-cta-text {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .kpi-post-cta-text strong { color: var(--text); }
        .kpi-post-cta-btn {
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
        .kpi-post-cta-btn:hover { opacity: 0.85; }
      `}</style>

      <div className="kpi-page">

        {/* Back */}
        <Link href="/risorse" className="kpi-back">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Risorse
        </Link>

        {/* Header */}
        <div className="kpi-header">
          <div className="kpi-eyebrow">KPI Calculator · AI-Powered · Gratis</div>
          <h1 className="kpi-title">
            I tuoi numeri.<br /><em>Interpretati.</em>
          </h1>
          <p className="kpi-subtitle">
            Inserisci budget, fatturato e margine. In 30 secondi ricevi un&apos;analisi AI con break-even ROAS, CPA massimo sostenibile e 3 scenari di crescita calcolati sui tuoi dati reali.
          </p>
        </div>

        {!submitted ? (
          <>
            <div className="kpi-card">
              <div className="kpi-card-title">I tuoi numeri</div>

              {/* Modello di business */}
              <div className="kpi-section-label">Modello di business</div>
              <div className="kpi-models">
                {MODELLO_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={`kpi-model-btn${formData.modello === o.value ? " selected" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, modello: o.value }))}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Metriche principali */}
              <div className="kpi-section-label">Metriche mensili</div>
              <div className="kpi-grid" style={{ marginBottom: "20px" }}>
                <NumericInput
                  label="Budget Advertising"
                  hint="spesa ads/mese"
                  prefix="€"
                  value={formData.budgetAds}
                  onChange={set("budgetAds")}
                  placeholder="5000"
                />
                <NumericInput
                  label="Fatturato totale"
                  hint="ricavi/mese"
                  prefix="€"
                  value={formData.fatturato}
                  onChange={set("fatturato")}
                  placeholder="30000"
                />
                <NumericInput
                  label="AOV — Valore medio ordine"
                  hint="o valore medio cliente"
                  prefix="€"
                  value={formData.aov}
                  onChange={set("aov")}
                  placeholder="120"
                />
                <NumericInput
                  label="Margine Lordo"
                  hint="sul fatturato"
                  suffix="%"
                  value={formData.margineLordo}
                  onChange={set("margineLordo")}
                  placeholder="35"
                />
              </div>

              {/* CPA opzionale */}
              <div className="kpi-section-label">
                CPA attuale
                <span className="kpi-optional-tag">opzionale</span>
              </div>
              <div style={{ maxWidth: "280px" }}>
                <NumericInput
                  label=""
                  hint="costo acquisizione cliente se lo conosci"
                  prefix="€"
                  value={formData.costoAcquisizione}
                  onChange={set("costoAcquisizione")}
                  placeholder="es. 28"
                />
              </div>
            </div>

            <div className="kpi-submit-wrap">
              <button className="kpi-btn" disabled={!isValid()} onClick={handleSubmit}>
                Analizza i miei KPI
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div ref={resultRef}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", color: "var(--text-faint)", letterSpacing: "0.5px" }}>
                Budget €{formData.budgetAds} · Fatturato €{formData.fatturato} · Margine {formData.margineLordo}% · {formData.modello}
              </div>
              <button className="kpi-reset" onClick={() => { setSubmitted(false); setResult(""); setError(""); }}>
                Ricomincia
              </button>
            </div>

            {loading && !result && (
              <div className="kpi-loading">
                <div className="kpi-spinner" />
                <span>Calcolo in corso...</span>
              </div>
            )}

            {error && <div className="kpi-error"><strong>Errore:</strong> {error}</div>}

            {result && (
              <>
                <div className="kpi-result-wrap">
                  <div className="kpi-result-header">
                    <div className="kpi-result-dot" style={loading ? { animation: "pulse 1.5s ease-in-out infinite" } : {}} />
                    <span className="kpi-result-label">
                      {loading ? "Analisi in corso..." : "Analisi completata"}
                    </span>
                  </div>
                  <div
                    className="kpi-result-body"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }}
                  />
                </div>

                {!loading && (
                  <div className="kpi-post-cta">
                    <div className="kpi-post-cta-text">
                      <strong>Vuoi tradurre questi numeri in un piano concreto?</strong><br />
                      20 minuti per capire dove stai perdendo margine e quali 3 azioni prioritizzare subito.
                    </div>
                    <a
                      href="https://wa.me/393516737345"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kpi-post-cta-btn"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      Prenota 20 minuti
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
