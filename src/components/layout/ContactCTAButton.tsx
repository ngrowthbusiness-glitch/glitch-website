"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SITE } from "@/lib/constants";

type Variant = "primary" | "secondary";
type Align = "left" | "center";

type Props = {
  /** Testo del bottone. Default: "Approfitta di 20 minuti del mio tempo" */
  label?: string;
  /** Microcopy sotto il bottone. Default frase genuina. */
  microcopy?: string;
  /** Stile bottone */
  variant?: Variant;
  /** Allineamento bottone + microcopy */
  align?: Align;
  /** Override classe button (es. classi globali s-btn-primary) */
  buttonClassName?: string;
  /** Override mailto custom (per outreach con subject precompilato). Default: mailto:SITE.email */
  emailHref?: string;
  /** Override WhatsApp link custom (per outreach con messaggio precompilato). Default: SITE.whatsapp */
  whatsappHref?: string;
};

/**
 * CTA universale: 1 bottone "Approfitta di 20 minuti del mio tempo"
 * + microcopy sotto. Click → modal con scelta WhatsApp / Mail.
 */
export default function ContactCTAButton({
  label = "Approfitta di 20 minuti del mio tempo",
  microcopy = "Ho sempre un grande interesse nel conoscere nuovi contesti.",
  variant = "primary",
  align = "left",
  buttonClassName,
  emailHref,
  whatsappHref,
}: Props) {
  const [open, setOpen] = useState(false);
  /* il modale esce dal punto in cui sta il bottone: dentro la barra (sfocata) un fixed resterebbe
     chiuso nella barra. Va nel .v1 piu' vicino (outreach) o nel body. */
  const wrap = useRef<HTMLDivElement>(null);
  const resolvedEmail = emailHref ?? `mailto:${SITE.email}`;
  const resolvedWhatsapp = whatsappHref ?? SITE.whatsapp;

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

  const defaultBtnClass =
    variant === "primary" ? "s-btn-primary" : "s-btn-secondary";
  const btnClass = buttonClassName ?? defaultBtnClass;

  return (
    <>
      <style>{`
        /* Brand Nicola Serrao v2.0 sul sito; dentro .v1 (outreach) torna lo stile di prima */
        .ccta-wrap {
          display: flex; flex-direction: column;
          gap: 10px;
        }
        .ccta-wrap[data-align="center"] { align-items: center; text-align: center; }
        .ccta-wrap[data-align="left"]   { align-items: flex-start; text-align: left; }

        .ccta-microcopy {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.55;
          max-width: 480px;
        }

        .ccta-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: color-mix(in srgb, var(--ink) 35%, transparent);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: ccta-fade-in 0.2s ease;
        }
        @keyframes ccta-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ccta-modal-card {
          background: var(--surface);
          border-radius: 20px;
          padding: 34px 30px 26px;
          max-width: 420px; width: 100%;
          position: relative;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,.35), inset 0 0 0 1px var(--line);
          animation: ccta-slide-up 0.3s cubic-bezier(.2,.7,.2,1);
          text-align: left;
          font-family: var(--font-manrope), sans-serif;
        }
        @keyframes ccta-slide-up {
          from { opacity: 0; transform: translateY(14px) scale(.98); }
          to { opacity: 1; transform: none; }
        }
        .ccta-modal-close {
          position: absolute; top: 14px; right: 14px;
          background: var(--surface);
          border: 1px solid var(--line);
          color: var(--ink);
          cursor: pointer;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: border-color 0.2s, transform .3s cubic-bezier(.2,.7,.2,1);
        }
        .ccta-modal-close:hover { border-color: var(--accent); transform: rotate(90deg); }
        .ccta-modal-eyebrow {
          font-size: 11px; letter-spacing: .12em;
          text-transform: uppercase; color: var(--accent);
          margin-bottom: 8px; font-weight: 700;
        }
        .ccta-modal-title {
          font-size: 24px; font-weight: 800; letter-spacing: -.02em;
          color: var(--ink); margin: 0 40px 8px 0; line-height: 1.2;
        }
        .ccta-modal-sub {
          font-size: 15px; color: var(--body);
          line-height: 1.6; margin: 0 0 22px;
        }
        .ccta-modal-actions {
          display: flex; flex-direction: column; gap: 10px;
        }
        .ccta-channel-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 10px;
          padding: 15px 20px; border-radius: 12px;
          font-size: 15px; font-weight: 700;
          text-decoration: none;
          transition: border-color 0.2s, color .2s, transform 0.25s cubic-bezier(.2,.7,.2,1);
          cursor: pointer;
        }
        .ccta-channel-wa { background: var(--accent); color: var(--accent-ink); }
        .ccta-channel-wa:hover { transform: translateY(-1px); }
        .ccta-channel-mail { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
        .ccta-channel-mail:hover { border-color: var(--accent); color: var(--accent); }
        .ccta-modal-foot {
          margin-top: 20px; padding-top: 16px;
          border-top: 1px solid var(--line);
          font-size: 13px; color: var(--muted);
          line-height: 1.55;
        }
        @media (max-width: 900px) {
          .ccta-wrap[data-align="left"] { align-items: center; text-align: center; }
          .ccta-wrap { gap: 14px; }
          .ccta-microcopy { max-width: 320px; }
        }
        @media (max-width: 480px) {
          .ccta-modal-card { padding: 30px 22px 22px; }
          .ccta-modal-title { font-size: 21px; }
        }

        /* outreach: il vecchio sistema, invariato */
        .v1 .ccta-microcopy { font-size: 12px; color: var(--text); }
        .v1 .ccta-modal-overlay { background: rgba(10,14,13,0.88); backdrop-filter: blur(10px); }
        .v1 .ccta-modal-card { background: #0a0e0d; border-radius: 14px; padding: 40px 36px 32px; max-width: 440px; text-align: center; box-shadow: 0 0 60px rgba(0,255,252,0.15), inset 0 0 0 1px rgba(0,255,252,0.3); font-family: var(--font-dm-mono), 'DM Mono', monospace; }
        .v1 .ccta-modal-close { background: transparent; border-color: rgba(232,245,242,0.1); color: var(--text-dim); border-radius: 8px; }
        .v1 .ccta-modal-close:hover { color: var(--teal); border-color: var(--teal); background: rgba(0,255,252,0.08); transform: none; }
        .v1 .ccta-modal-eyebrow { font-size: 10px; letter-spacing: 2.5px; font-weight: 500; margin-bottom: 10px; }
        .v1 .ccta-modal-title { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 22px; font-weight: 700; letter-spacing: 0; color: var(--text); margin: 0 0 8px; line-height: 1.25; }
        .v1 .ccta-modal-sub { font-size: 13px; color: var(--text); opacity: .9; margin: 0 0 26px; }
        .v1 .ccta-channel-btn { display: inline-flex; padding: 14px 20px; border-radius: 6px; font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; }
        .v1 .ccta-channel-wa { background: var(--teal); color: #0a0e0d; }
        .v1 .ccta-channel-mail { background: transparent; color: var(--teal); border: 1px solid var(--teal-border); }
        .v1 .ccta-channel-mail:hover { background: var(--teal-dim); border-color: var(--teal); color: var(--teal); }
        .v1 .ccta-modal-foot { margin-top: 22px; padding-top: 18px; border-top: 1px solid rgba(0,255,252,0.12); font-size: 11px; color: var(--text-dim); }
      `}</style>

      <div className="ccta-wrap" data-align={align} ref={wrap}>
        <button
          type="button"
          className={btnClass}
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
        {microcopy && <div className="ccta-microcopy">{microcopy}</div>}
      </div>

      {open &&
        createPortal(
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="ccta-modal-eyebrow">Scegli il canale</div>
              <h3 className="ccta-modal-title">Come preferisci scrivermi?</h3>
              <p className="ccta-modal-sub">
                Rispondo personalmente a tutti. Niente filtri, niente assistenti
                virtuali.
              </p>

              <div className="ccta-modal-actions">
                <a
                  href={resolvedWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ccta-channel-btn ccta-channel-wa"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Scrivimi su WhatsApp
                </a>
                <a
                  href={resolvedEmail}
                  className="ccta-channel-btn ccta-channel-mail"
                  onClick={() => setOpen(false)}
                >
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
                  Inviami una mail
                </a>
              </div>

              <div className="ccta-modal-foot">
                Tempo medio di risposta: 24 ore. Fuori dall&apos;orario di
                lavoro magari un po&apos; di pi&ugrave;.
              </div>
            </div>
          </div>,
          (wrap.current?.closest(".v1") as HTMLElement | null) ?? document.body,
        )}
    </>
  );
}
