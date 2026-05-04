"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

function handleCookieReset() {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
  window.location.reload();
}

export default function Footer() {
  return (
    <footer
      className="ft-root"
      style={{
        borderTop: "1px solid var(--teal-border)",
        padding: "44px 60px 32px",
      }}
    >
      {/* ── footer-top: brand + ruolo ── */}
      <div style={{ textAlign: "center", marginBottom: "22px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          <Image
            src="/favicon.png"
            alt=""
            width={20}
            height={20}
            style={{ display: "inline-block" }}
          />
          Nicola <span style={{ color: "var(--teal)" }}>Serrao</span>
        </div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "1.8px",
            fontStyle: "italic",
            color: "var(--text-dim)",
            marginTop: "8px",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Fractional CMO
        </div>
        <div
          style={{
            width: "28px",
            height: "1px",
            background: "var(--teal-border)",
            margin: "8px auto",
          }}
        />
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "1.5px",
            fontStyle: "italic",
            color: "var(--text-faint)",
            textTransform: "uppercase",
          }}
        >
          Digital Marketing
        </div>
      </div>

      {/* ── footer-divider ── */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--teal-border), transparent)",
          marginBottom: "36px",
        }}
      />

      {/* ── footer-middle: 3 colonne (desktop) / 2-col grid (mobile) ── */}
      <style>{`
        .ft-mid {
          display: flex;
          justify-content: center;
          gap: 88px;
        }
        .ft-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .ft-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0; margin: 0;
        }
        .ft-contact {
          font-size: 12px;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-contact:hover { color: var(--teal); }
        /* Icone contatti (mail + WhatsApp) */
        .ft-icons {
          display: flex; gap: 12px; align-items: center;
        }
        .ft-icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid var(--teal-border);
          background: rgba(0,255,252,0.04);
          color: var(--teal);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .ft-icon-btn:hover {
          background: rgba(0,255,252,0.12);
          border-color: var(--teal);
          transform: translateY(-2px);
        }
        .ft-link {
          font-size: 11px;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }
        .ft-link:hover { color: var(--teal); }

        /* TABLET: gap ridotto */
        @media (max-width: 900px) {
          .ft-mid { gap: 48px; }
        }

        /* MOBILE: grid 2-col + separatore verticale teal + font ridotti
           SX: Contatti (icone) + Legale
           DX: Navigazione (centrata, nowrap) */
        @media (max-width: 600px) {
          .ft-root { padding: 36px 24px 28px !important; }
          .ft-mid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 24px 18px;
            text-align: left;
            max-width: 100%;
            margin: 0 auto;
            justify-content: stretch;
            align-items: start;
            position: relative;
          }
          /* Separatore verticale teal sottile fra le 2 colonne */
          .ft-mid::before {
            content: "";
            position: absolute;
            top: 8%; bottom: 8%;
            left: 50%;
            width: 1px;
            background: linear-gradient(180deg, transparent, var(--teal-border) 30%, var(--teal-border) 70%, transparent);
            pointer-events: none;
          }
          .ft-mid > div:nth-child(1) { /* Contatti */
            grid-column: 1; grid-row: 1;
          }
          .ft-mid > div:nth-child(2) { /* Navigazione — centrata */
            grid-column: 2; grid-row: 1 / 3;
            padding-left: 10px;
            text-align: center;
          }
          .ft-mid > div:nth-child(2) .ft-list { align-items: center; }
          .ft-mid > div:nth-child(3) { /* Legale */
            grid-column: 1; grid-row: 2;
          }
          .ft-label {
            font-size: 9px;
            letter-spacing: 2px;
            margin-bottom: 10px;
          }
          .ft-contact { font-size: 11px; }
          .ft-link {
            font-size: 11px;
            white-space: nowrap;
          }
          .ft-list { gap: 8px; }
        }
      `}</style>
      <div className="ft-mid">
        {/* Contatti — icone mail + WhatsApp */}
        <div>
          <div className="ft-label">Contatti</div>
          <div className="ft-icons">
            <a
              href={`mailto:${SITE.email}`}
              className="ft-icon-btn"
              aria-label="Scrivimi una mail"
              title={SITE.email}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 6 10-6" />
              </svg>
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="ft-icon-btn"
              aria-label="Scrivimi su WhatsApp"
              title="WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigazione */}
        <div>
          <div className="ft-label">Navigazione</div>
          <ul className="ft-list">
            <li>
              <Link href="/cosa-posso-fare" className="ft-link">
                Cosa posso fare
              </Link>
            </li>
            <li>
              <Link href="/cosa-ho-fatto" className="ft-link">
                Cosa ho fatto
              </Link>
            </li>
            <li>
              <Link href="/metodo-glitch" className="ft-link">
                Metodo GLITCH
              </Link>
            </li>
            <li>
              <Link href="/blog" className="ft-link">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/risorse" className="ft-link">
                Risorse
              </Link>
            </li>
          </ul>
        </div>

        {/* Legale */}
        <div>
          <div className="ft-label">Legale</div>
          <ul className="ft-list">
            <li>
              <Link href="/privacy-policy" className="ft-link">
                Privacy &amp; Cookie Policy
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCookieReset}
                className="ft-link"
              >
                Gestisci cookie
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* ── footer-divider ── */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--teal-border), transparent)",
          marginTop: "32px",
          marginBottom: "22px",
        }}
      />

      {/* ── footer-bottom ── */}
      <div
        style={{
          textAlign: "center",
          fontSize: "9px",
          color: "rgba(232,245,242,0.20)",
          lineHeight: 1.8,
          letterSpacing: "0.5px",
        }}
      >
        <p>
          Via Oberdan 25, 60020 Agugliano (AN) &mdash; P.IVA: 02703360426
          &mdash; CF: SRRNCL93T31B963M
        </p>
        <p style={{ color: "rgba(232,245,242,0.13)", marginTop: "4px" }}>
          &copy; 2026 Nicola Serrao &mdash; Tutti i diritti riservati
        </p>
      </div>
    </footer>
  );
}
