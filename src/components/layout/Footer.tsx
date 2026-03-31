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
        padding: "40px 60px 28px",
      }}
    >
      {/* ── footer-top ── */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          <Image
            src="/favicon.svg"
            alt=""
            width={18}
            height={18}
            style={{ display: "inline-block" }}
          />
          Nicola <span style={{ color: "var(--teal)" }}>Serrao</span>
        </div>
        <div
          style={{
            fontSize: "9px",
            letterSpacing: "1.5px",
            fontStyle: "italic",
            color: "var(--text-faint)",
            marginTop: "4px",
          }}
        >
          Digital Marketing Strategist
        </div>
      </div>

      {/* ── footer-divider ── */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--teal-border), transparent)",
          marginBottom: "32px",
        }}
      />

      {/* ── footer-middle ── */}
      <div className="footer-middle">
        {/* Contatti */}
        <div>
          <div className="footer-col-label">Contatti</div>
          <ul className="footer-col-list">
            <li>
              <a href={`mailto:${SITE.email}`} className="footer-link">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                WhatsApp &rarr;
              </a>
            </li>
          </ul>
        </div>

        {/* Navigazione */}
        <div>
          <div className="footer-col-label">Navigazione</div>
          <ul className="footer-col-list">
            <li>
              <Link href="/cosa-posso-fare" className="footer-link">
                Cosa posso fare
              </Link>
            </li>
            <li>
              <Link href="/cosa-ho-fatto" className="footer-link">
                Cosa ho fatto
              </Link>
            </li>
            <li>
              <Link href="/metodo-glitch" className="footer-link">
                Metodo GLITCH
              </Link>
            </li>
          </ul>
        </div>

        {/* Legale */}
        <div>
          <div className="footer-col-label">Legale</div>
          <ul className="footer-col-list">
            <li>
              <Link href="/privacy-policy" className="footer-link">
                Privacy &amp; Cookie Policy
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCookieReset}
                className="footer-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit",
                }}
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
          marginBottom: "24px",
        }}
      />

      {/* ── footer-bottom ── */}
      <div
        style={{
          textAlign: "center",
          fontSize: "8px",
          color: "rgba(232,245,242,0.15)",
          lineHeight: 1.8,
          letterSpacing: "0.5px",
        }}
      >
        <p>
          Via Oberdan 25, 60020 Agugliano (AN) &mdash; P.IVA: 02703360426
          &mdash; CF: SRRNCL93T31B963M
        </p>
        <p
          style={{ color: "rgba(232,245,242,0.12)", marginTop: "4px" }}
          className="footer-copy"
        >
          &copy; 2026 Nicola Serrao &mdash; Tutti i diritti riservati
        </p>
      </div>

      {/* ── scoped styles ── */}
      <style jsx>{`
        .footer-middle {
          display: flex;
          justify-content: center;
          gap: 80px;
        }
        .footer-col-label {
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 10px;
        }
        .footer-col-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        /* Contatti: più visibili */
        .footer-middle > div:first-child .footer-link {
          font-size: 11px;
          color: var(--text-dim);
        }
        .footer-middle > div:first-child .footer-link:hover {
          color: var(--teal);
        }
        /* Nav e Legale: più discreti */
        .footer-link {
          font-size: 9px;
          color: var(--text-faint);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--teal);
        }
        @media (max-width: 900px) {
          footer {
            padding: 40px 32px 28px !important;
          }
          .footer-middle {
            gap: 40px;
          }
        }
        @media (max-width: 480px) {
          .footer-middle {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
