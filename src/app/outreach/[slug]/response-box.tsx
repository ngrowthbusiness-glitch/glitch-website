"use client";

import { useState } from "react";

interface ResponseBoxProps {
  question: string;
  companyName: string;
  slug: string;
  emailSubject?: string;
  siteEmail: string;
}

export default function ResponseBox({
  question,
  companyName,
  slug,
  emailSubject,
  siteEmail,
}: ResponseBoxProps) {
  const [risposta, setRisposta] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!risposta.trim() || !email.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/outreach/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          risposta: risposta.trim(),
          email: email.trim(),
          companyName,
          slug,
          domanda: question,
        }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="or-box or-box-sent">
        <div className="or-sent-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="or-sent-title">Ricevuto.</p>
        <p className="or-sent-sub">
          Ti rispondo personalmente entro 24 ore.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .or-box {
          border: 1px solid var(--o-border);
          border-radius: 12px;
          padding: 36px;
          background: var(--o-primary-dim);
          position: relative;
          overflow: hidden;
        }
        .or-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--o-primary), transparent);
        }
        .or-question {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 700;
          font-style: italic;
          color: var(--o-text);
          line-height: 1.4;
          margin-bottom: 24px;
        }
        .or-form { display: flex; flex-direction: column; gap: 14px; }
        .or-textarea {
          width: 100%;
          min-height: 100px;
          padding: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--o-border);
          border-radius: 8px;
          color: var(--o-text);
          font-family: inherit;
          font-size: 13px;
          line-height: 1.7;
          resize: vertical;
          transition: border-color 0.2s;
        }
        .or-textarea:focus {
          outline: none;
          border-color: var(--o-primary);
        }
        .or-textarea::placeholder { color: var(--o-text-dim); }
        .or-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--o-border);
          border-radius: 8px;
          color: var(--o-text);
          font-family: inherit;
          font-size: 13px;
          transition: border-color 0.2s;
        }
        .or-input:focus {
          outline: none;
          border-color: var(--o-primary);
        }
        .or-input::placeholder { color: var(--o-text-dim); }
        .or-submit {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--o-primary);
          color: var(--o-bg);
          font-family: inherit;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }
        .or-submit:hover:not(:disabled) { opacity: 0.85; transform: translateY(-2px); }
        .or-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .or-divider-text {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }
        .or-divider-text::before,
        .or-divider-text::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--o-border);
        }
        .or-divider-text span {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--o-text-dim);
          white-space: nowrap;
        }
        .or-email-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--o-primary);
          text-decoration: none;
          transition: opacity 0.2s;
          margin-top: 4px;
        }
        .or-email-link:hover { opacity: 0.7; }
        .or-error {
          font-size: 11px;
          color: #EF4444;
          margin-top: 4px;
        }

        /* Sent state */
        .or-box-sent {
          text-align: center;
          padding: 48px 36px;
        }
        .or-sent-icon {
          color: var(--o-primary);
          margin-bottom: 16px;
        }
        .or-sent-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 8px;
        }
        .or-sent-sub {
          font-size: 12px;
          color: var(--o-text-dim);
        }

        /* Light bg adjustments */
        @media (prefers-color-scheme: light) {
          .or-textarea, .or-input {
            background: rgba(0,0,0,0.03);
          }
        }

        @media (max-width: 480px) {
          .or-box { padding: 24px 20px; }
          .or-submit { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="or-box">
        <p className="or-question">{question}</p>

        <form className="or-form" onSubmit={handleSubmit}>
          <textarea
            className="or-textarea"
            placeholder="Scrivi qui la tua risposta..."
            value={risposta}
            onChange={(e) => setRisposta(e.target.value)}
            required
          />
          <input
            type="email"
            className="or-input"
            placeholder="La tua email (per ricevere il mio parere)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="or-submit"
            disabled={status === "sending" || !risposta.trim() || !email.trim()}
          >
            {status === "sending" ? "Invio in corso..." : "Invia"}
          </button>
          {status === "error" && (
            <p className="or-error">
              Errore nell&apos;invio. Riprova o scrivimi direttamente.
            </p>
          )}
        </form>

        <div className="or-divider-text">
          <span>oppure</span>
        </div>

        <a
          href={`mailto:${siteEmail}?subject=${encodeURIComponent(emailSubject || "")}`}
          className="or-email-link"
        >
          Scrivimi direttamente via email &rarr;
        </a>
      </div>
    </>
  );
}
