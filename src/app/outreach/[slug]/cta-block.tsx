"use client";

import { useState } from "react";

type CtaBlockProps = {
  primaryText: string;
  emailHref: string;
  phoneHref: string;
  emailLabel: string;
  phoneLabel: string;
  /** Token stile prospect (per riusabilita) */
  accent: string;
  bgPrimary: string;
  fontHeading: string;
  fontBody: string;
  buttonRadius: string;
  buttonPadding: string;
  textSecondary: string;
  border: string;
};

export function CtaBlock({
  primaryText,
  emailHref,
  phoneHref,
  emailLabel,
  phoneLabel,
  accent,
  bgPrimary,
  fontHeading,
  fontBody,
  buttonRadius,
  buttonPadding,
  textSecondary,
  border,
}: CtaBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="o-cta">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="o-cta__primary"
        aria-expanded={open}
        style={{
          fontFamily: fontHeading,
          color: accent,
          borderColor: accent,
          borderRadius: buttonRadius,
          padding: buttonPadding,
        }}
      >
        {primaryText}
      </button>

      <div
        className={`o-cta__channels ${open ? "o-cta__channels--open" : ""}`}
        aria-hidden={!open}
      >
        <a
          href={emailHref}
          className="o-cta__channel"
          style={{
            fontFamily: fontBody,
            color: accent,
            borderColor: border,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconMail color={accent} />
          <span>{emailLabel}</span>
        </a>
        <a
          href={phoneHref}
          className="o-cta__channel"
          style={{
            fontFamily: fontBody,
            color: accent,
            borderColor: border,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsapp color={accent} />
          <span>{phoneLabel}</span>
        </a>
      </div>

      <div
        className="o-cta__hint"
        style={{ color: textSecondary, fontFamily: fontBody }}
        aria-hidden={open}
      >
        Clicca il bottone per scegliere come scriverci.
      </div>

      {/* Stili scoped */}
      <style>{`
        .o-cta { text-align: center; }
        .o-cta__primary {
          display: inline-block;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid ${accent};
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .o-cta__primary:hover {
          background: ${accent};
          color: ${bgPrimary};
        }
        .o-cta__primary:active { transform: translateY(1px); }
        .o-cta__primary[aria-expanded="true"] {
          background: ${accent};
          color: ${bgPrimary};
        }

        .o-cta__channels {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.25s ease, margin-top 0.35s ease;
        }
        .o-cta__channels--open {
          max-height: 200px;
          opacity: 1;
          margin-top: 22px;
        }
        .o-cta__channel {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 22px;
          border: 1px solid;
          border-radius: ${buttonRadius};
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.06em;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }
        .o-cta__channel:hover {
          background: rgba(212, 170, 65, 0.08);
        }
        .o-cta__channel:active { transform: translateY(1px); }
        .o-cta__channel svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .o-cta__hint {
          font-size: 12px;
          margin-top: 16px;
          letter-spacing: 0.02em;
          opacity: 0.55;
          transition: opacity 0.25s ease;
        }
        .o-cta__hint[aria-hidden="true"] { opacity: 0; height: 0; margin-top: 0; pointer-events: none; }
      `}</style>
    </div>
  );
}

function IconMail({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconWhatsapp({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
      <path d="M20.5 12.04A8.5 8.5 0 1 1 12 3.5a8.5 8.5 0 0 1 7.5 4.4l1-3-1 5h-5" />
      <path d="M9.5 8.5c0 4 3 7 7 7l1.4-2.5-2.4-1-1 1.2c-1.5-.6-2.6-1.7-3.2-3.2l1.2-1-1-2.4z" />
    </svg>
  );
}
