"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

/**
 * Toggle fisso in basso a destra, SOPRA il WhatsApp bubble.
 * Click → popup invitante con email professionale + bottone "Apri mail".
 * Niente mailto automatico al click sul bubble.
 */
export default function FloatMailBubble() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard non supportato */
    }
  };

  return (
    <>
      <style>{`
        .fmb-bubble {
          position: fixed;
          bottom: 92px;
          right: 24px;
          z-index: 91;
          width: 56px; height: 56px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: var(--bg);
          border: 1px solid rgba(0,255,252,0.45);
          color: var(--teal);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), 0 0 0 0 rgba(0,255,252,0.0);
        }
        .fmb-bubble:hover {
          transform: translateY(-3px);
          background: rgba(0,255,252,0.08);
          border-color: var(--teal);
          box-shadow: 0 6px 28px rgba(0,255,252,0.25);
        }
        .fmb-tooltip {
          position: absolute; bottom: 64px; right: 0;
          white-space: nowrap;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          padding: 6px 12px; border-radius: 5px;
          background: var(--teal-dim); color: var(--teal);
          border: 1px solid var(--teal-border);
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          transform: translateY(4px);
        }
        .fmb-bubble:hover .fmb-tooltip {
          opacity: 1; transform: translateY(0);
        }

        @media (max-width: 480px) {
          .fmb-bubble { width: 48px; height: 48px; bottom: 76px; right: 16px; }
          .fmb-tooltip { display: none; }
        }

        /* ─── POPUP ─── */
        .fmb-overlay {
          position: fixed; inset: 0; z-index: 1001;
          background: rgba(10,14,13,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fmb-fade 0.2s ease;
        }
        @keyframes fmb-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fmb-card {
          background: #0a0e0d;
          border: 1px solid rgba(0,255,252,0.3);
          border-radius: 14px;
          padding: 36px 32px 28px;
          max-width: 420px; width: 100%;
          position: relative;
          box-shadow: 0 0 60px rgba(0,255,252,0.15);
          animation: fmb-slide 0.25s ease;
          text-align: center;
        }
        @keyframes fmb-slide {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fmb-close {
          position: absolute; top: 12px; right: 12px;
          background: transparent;
          border: 1px solid rgba(232,245,242,0.1);
          color: var(--text-dim);
          cursor: pointer;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .fmb-close:hover {
          color: var(--teal); border-color: var(--teal);
          background: rgba(0,255,252,0.08);
        }

        .fmb-icon-circle {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(0,255,252,0.1);
          border: 1px solid rgba(0,255,252,0.4);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
          margin: 0 auto 18px;
        }
        .fmb-eyebrow {
          font-size: 10px; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--teal);
          margin-bottom: 8px; font-weight: 500;
        }
        .fmb-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: var(--text); margin: 0 0 10px; line-height: 1.25;
        }
        .fmb-sub {
          font-size: 13.5px; color: var(--text);
          line-height: 1.6; margin: 0 0 22px;
          opacity: 0.9;
        }
        .fmb-email {
          display: flex; align-items: center; gap: 8px;
          background: rgba(0,255,252,0.06);
          border: 1px solid var(--teal-border);
          border-radius: 6px;
          padding: 12px 14px;
          margin-bottom: 18px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          color: var(--text);
          word-break: break-all;
          text-align: left;
        }
        .fmb-email-text { flex: 1; min-width: 0; }
        .fmb-copy-btn {
          flex-shrink: 0;
          background: transparent;
          border: 1px solid rgba(0,255,252,0.3);
          color: var(--teal);
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: background 0.2s, border-color 0.2s;
        }
        .fmb-copy-btn:hover {
          background: var(--teal-dim);
          border-color: var(--teal);
        }
        .fmb-actions {
          display: flex; flex-direction: column; gap: 10px;
        }
        .fmb-mailto {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 10px;
          padding: 14px 20px; border-radius: 6px;
          background: var(--teal); color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .fmb-mailto:hover {
          opacity: 0.9; transform: translateY(-1px);
        }
        .fmb-foot {
          margin-top: 18px; padding-top: 16px;
          border-top: 1px solid rgba(0,255,252,0.12);
          font-size: 11px; color: var(--text-dim);
          line-height: 1.55;
        }
        @media (max-width: 480px) {
          .fmb-card { padding: 30px 22px 24px; }
          .fmb-title { font-size: 19px; }
          .fmb-email { font-size: 12px; }
        }
      `}</style>

      <button
        type="button"
        className="fmb-bubble"
        onClick={() => setOpen(true)}
        aria-label="Scrivimi una mail"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 7l10 6 10-6" />
        </svg>
        <span className="fmb-tooltip">Scrivimi una mail</span>
      </button>

      {open && (
        <div
          className="fmb-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="fmb-card">
            <button
              type="button"
              className="fmb-close"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="fmb-icon-circle">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 6 10-6" />
              </svg>
            </div>

            <div className="fmb-eyebrow">Mail diretta</div>
            <h3 className="fmb-title">Scrivimi alla mia mail professionale</h3>
            <p className="fmb-sub">
              Ti rispondo direttamente io. Niente filtri, niente assistenti virtuali.
            </p>

            <div className="fmb-email">
              <span className="fmb-email-text">{SITE.email}</span>
              <button
                type="button"
                className="fmb-copy-btn"
                onClick={copyEmail}
                aria-label="Copia indirizzo email"
              >
                {copied ? "Copiato" : "Copia"}
              </button>
            </div>

            <div className="fmb-actions">
              <a
                href={`mailto:${SITE.email}`}
                className="fmb-mailto"
                onClick={() => setOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Apri il mio client mail
              </a>
            </div>

            <div className="fmb-foot">
              Tempo medio di risposta: 24 ore. Niente automazioni di mezzo.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
