"use client";

import { useEffect, useCallback } from "react";
import { SITE } from "@/lib/constants";

interface DiagnosiPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function DiagnosiPopup({ open, onClose }: DiagnosiPopupProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      <style>{`
        .dx-overlay {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(0,0,0,0.70);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: dxFadeIn 0.25s ease;
        }

        .dx-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0c1210;
          border: 1px solid rgba(0,255,252,0.22);
          border-radius: 12px;
          padding: 44px 40px 40px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 80px rgba(0,255,252,0.04);
          animation: dxSlideUp 0.3s ease;
        }

        .dx-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: rgba(232,245,242,0.35);
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .dx-close:hover { color: #e8f5f2; }

        .dx-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #00fffc;
          margin-bottom: 16px;
        }

        .dx-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #e8f5f2;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .dx-subtitle {
          font-size: 12px;
          font-weight: 300;
          color: rgba(232,245,242,0.50);
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .dx-steps {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .dx-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .dx-step-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0,255,252,0.22);
          background: rgba(0,255,252,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: #00fffc;
        }

        .dx-step-content {
          flex: 1;
        }

        .dx-step-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          color: #e8f5f2;
          margin-bottom: 4px;
        }

        .dx-step-desc {
          font-size: 11px;
          font-weight: 300;
          color: rgba(232,245,242,0.50);
          line-height: 1.7;
        }

        .dx-takeaway {
          border: 1px solid rgba(0,255,252,0.22);
          border-radius: 8px;
          background: rgba(0,255,252,0.05);
          padding: 20px 24px;
          margin-bottom: 28px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .dx-takeaway-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: #00fffc;
          margin-top: 1px;
        }
        .dx-takeaway-text {
          font-size: 12px;
          font-weight: 300;
          color: #e8f5f2;
          line-height: 1.7;
        }
        .dx-takeaway-text strong {
          font-weight: 500;
          color: #00fffc;
        }

        .dx-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,252,0.22), transparent);
          margin-bottom: 28px;
        }

        .dx-promise {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(232,245,242,0.50);
          line-height: 1.7;
          text-align: center;
          margin-bottom: 28px;
        }
        .dx-promise strong {
          color: #00fffc;
          font-style: normal;
        }

        .dx-buttons {
          display: flex;
          gap: 12px;
        }

        .dx-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #00fffc;
          color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 20px;
          border-radius: 5px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .dx-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }

        .dx-btn-secondary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          color: #00fffc;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 20px;
          border-radius: 5px;
          border: 1px solid rgba(0,255,252,0.22);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .dx-btn-secondary:hover {
          background: rgba(0,255,252,0.10);
          border-color: #00fffc;
          transform: translateY(-2px);
        }

        @keyframes dxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dxSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .dx-card { padding: 32px 24px 28px; }
          .dx-title { font-size: 24px; }
          .dx-buttons { flex-direction: column; }
        }
      `}</style>

      {/* Overlay */}
      <div className="dx-overlay" onClick={onClose}>
        {/* Card — stop propagation so clicking inside doesn't close */}
        <div className="dx-card" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="dx-close"
            onClick={onClose}
            aria-label="Chiudi"
          >
            &times;
          </button>

          <div className="dx-eyebrow">Diagnosi gratuita</div>
          <h2 className="dx-title">Come funziona</h2>
          <p className="dx-subtitle">
            Non &egrave; una call di vendita. &Egrave; una conversazione in cui ascolto io.
          </p>

          <div className="dx-steps">
            <div className="dx-step">
              <div className="dx-step-icon">1</div>
              <div className="dx-step-content">
                <div className="dx-step-title">Mi racconti il tuo business</div>
                <div className="dx-step-desc">
                  Cosa fai, come lo fai, cosa hai provato finora. Nessun questionario &mdash; parliamo come due persone.
                </div>
              </div>
            </div>
            <div className="dx-step">
              <div className="dx-step-icon">2</div>
              <div className="dx-step-content">
                <div className="dx-step-title">Capisco dove sei davvero</div>
                <div className="dx-step-desc">
                  Ti faccio le domande giuste per capire i numeri, le sfide e gli obiettivi reali &mdash; non quelli che stanno bene su una slide.
                </div>
              </div>
            </div>
            <div className="dx-step">
              <div className="dx-step-icon">3</div>
              <div className="dx-step-content">
                <div className="dx-step-title">Ti dico la verit&agrave;</div>
                <div className="dx-step-desc">
                  Se posso aiutarti, ti spiego come. Se non posso, te lo dico. Nessun giro di parole, nessuna forzatura.
                </div>
              </div>
            </div>
          </div>

          <div className="dx-takeaway">
            <svg className="dx-takeaway-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="dx-takeaway-text">
              Alla fine della call avrai <strong>il mio parere onesto sulla tua situazione</strong> &ndash; cosa funziona, cosa no, e se ha senso lavorare insieme.
            </p>
          </div>

          <div className="dx-divider" />

          <p className="dx-promise">
            15 minuti, zero impegno, <strong>zero fuffa.</strong><br />
            Solo onest&agrave; &mdash; &egrave; l&apos;unico modo in cui so lavorare.
          </p>

          <div className="dx-buttons">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="dx-btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Scrivimi su WhatsApp
            </a>
            <a href={`mailto:${SITE.email}`} className="dx-btn-secondary">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Scrivimi una mail
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
