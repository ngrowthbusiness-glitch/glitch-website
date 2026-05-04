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

        /* MOBILE: grid 2-col più ariosa con separatore verticale teal
           SX: Contatti (top) + Legale (bottom)
           DX: Navigazione (span 2 row) */
        @media (max-width: 600px) {
          .ft-mid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 28px 32px;
            text-align: left;
            max-width: 400px;
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
          .ft-mid > div:nth-child(2) { /* Navigazione */
            grid-column: 2; grid-row: 1 / 3;
            padding-left: 8px;
          }
          .ft-mid > div:nth-child(3) { /* Legale */
            grid-column: 1; grid-row: 2;
          }
          .ft-label {
            font-size: 11px;
            letter-spacing: 2.5px;
            margin-bottom: 14px;
          }
          .ft-contact { font-size: 14px; }
          .ft-link { font-size: 13px; }
          .ft-list { gap: 10px; }
        }
      `}</style>
      <div className="ft-mid">
        {/* Contatti — più visibili */}
        <div>
          <div className="ft-label">Contatti</div>
          <ul className="ft-list">
            <li>
              <a href={`mailto:${SITE.email}`} className="ft-contact">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-contact"
              >
                WhatsApp &rarr;
              </a>
            </li>
          </ul>
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
