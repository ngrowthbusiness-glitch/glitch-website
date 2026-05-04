"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

type Variant = "primary" | "secondary";
type Align = "left" | "center";

type Props = {
  /** Testo del bottone. Default: "Approfitta di 15 minuti del mio tempo" */
  label?: string;
  /** Microcopy sotto il bottone. Default frase genuina. */
  microcopy?: string;
  /** Stile bottone */
  variant?: Variant;
  /** Allineamento bottone + microcopy */
  align?: Align;
  /** Override classe button (es. classi globali s-btn-primary) */
  buttonClassName?: string;
};

/**
 * CTA universale: 1 bottone "Approfitta di 15 minuti del mio tempo"
 * + microcopy sotto. Click → modal con scelta WhatsApp / Mail.
 */
export default function ContactCTAButton({
  label = "Approfitta di 15 minuti del mio tempo",
  microcopy = "Ho sempre un grande interesse nel conoscere nuovi contesti.",
  variant = "primary",
  align = "left",
  buttonClassName,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handle);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const defaultBtnClass = variant === "primary" ? "s-btn-primary" : "s-btn-secondary";
  const btnClass = buttonClassName ?? defaultBtnClass;

  return (
    <>
      <style>{`
        .ccta-wrap {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .ccta-wrap[data-align="center"] { align-items: center; text-align: center; }
        .ccta-wrap[data-align="left"]   { align-items: flex-start; text-align: left; }

        .ccta-microcopy {
          font-size: 12px;
          color: var(--text);
          line-height: 1.55;
          max-width: 480px;
        }

        .ccta-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,14,13,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: ccta-fade-in 0.2s ease;
        }
        @keyframes ccta-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ccta-modal-card {
          background: #0a0e0d;
          border: 1px solid rgba(0,255,252,0.3);
          border-radius: 14px;
          padding: 40px 36px 32px;
          max-width: 440px; width: 100%;
          position: relative;
          box-shadow: 0 0 60px rgba(0,255,252,0.15);
          animation: ccta-slide-up 0.25s ease;
          text-align: center;
        }
        @keyframes ccta-slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ccta-modal-close {
          position: absolute; top: 14px; right: 14px;
          background: transparent;
          border: 1px solid rgba(232,245,242,0.1);
          color: var(--text-dim);
          cursor: pointer;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .ccta-modal-close:hover {
          color: var(--teal);
          border-color: var(--teal);
          background: rgba(0,255,252,0.08);
        }
        .ccta-modal-eyebrow {
          font-size: 10px; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--teal);
          margin-bottom: 10px; font-weight: 500;
        }
        .ccta-modal-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: var(--text); margin: 0 0 8px; line-height: 1.25;
        }
        .ccta-modal-sub {
          font-size: 13px; color: var(--text);
          line-height: 1.6; margin: 0 0 26px;
          opacity: 0.9;
        }
        .ccta-modal-actions {
          display: flex; flex-direction: column; gap: 10px;
        }
        .ccta-channel-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 10px;
          padding: 14px 20px; border-radius: 6px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px; font-weight: 500;
          letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .ccta-channel-wa {
          background: var(--teal); color: #0a0e0d;
        }
        .ccta-channel-wa:hover {
          opacity: 0.9; transform: translateY(-1px);
        }
        .ccta-channel-mail {
          background: transparent; color: var(--teal);
          border: 1px solid var(--teal-border);
        }
        .ccta-channel-mail:hover {
          background: var(--teal-dim); border-color: var(--teal);
          transform: translateY(-1px);
        }
        .ccta-modal-foot {
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid rgba(0,255,252,0.12);
          font-size: 11px; color: var(--text-dim);
          line-height: 1.55;
        }
        /* Su mobile: forziamo center anche se data-align="left",
           e diamo più respiro tra bottone e microcopy */
        @media (max-width: 900px) {
          .ccta-wrap[data-align="left"] {
            align-items: center; text-align: center;
          }
          .ccta-wrap { gap: 14px; }
          .ccta-microcopy { max-width: 320px; font-size: 13px; line-height: 1.5; }
        }
        @media (max-width: 480px) {
          .ccta-modal-card { padding: 32px 22px 24px; }
          .ccta-modal-title { font-size: 19px; }
          .ccta-modal-close { top: 10px; right: 10px; width: 30px; height: 30px; }
          .ccta-microcopy { font-size: 12.5px; }
        }
      `}</style>

      <div className="ccta-wrap" data-align={align}>
        <button
          type="button"
          className={btnClass}
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
        {microcopy && <div className="ccta-microcopy">{microcopy}</div>}
      </div>

      {open && (
        <div
          className="ccta-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="ccta-modal-card">
            <button
              type="button"
              className="ccta-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="ccta-modal-eyebrow">Scegli il canale</div>
            <h3 className="ccta-modal-title">Come preferisci scrivermi?</h3>
            <p className="ccta-modal-sub">
              Rispondo personalmente a tutti. Niente filtri, niente assistenti virtuali.
            </p>

            <div className="ccta-modal-actions">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="ccta-channel-btn ccta-channel-wa"
                onClick={() => setOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Scrivimi su WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="ccta-channel-btn ccta-channel-mail"
                onClick={() => setOpen(false)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Inviami una mail
              </a>
            </div>

            <div className="ccta-modal-foot">
              Tempo medio di risposta: 24 ore. Fuori dall&apos;orario di lavoro magari un po&apos; di pi&ugrave;.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
