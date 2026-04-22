import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO — full viewport, unchanged
      ══════════════════════════════════════════════ */}
      <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center">
        <style>{`
          .hero-wrapper {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 80px 60px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 80px;
            align-items: center;
          }
          @media (max-width: 900px) {
            .hero-wrapper {
              grid-template-columns: 1fr;
              padding: 48px 32px 60px;
              gap: 40px;
              text-align: center;
            }
          }
          @media (max-width: 480px) {
            .hero-wrapper {
              padding: 40px 20px 48px;
            }
          }
        `}</style>
        <div className="hero-wrapper">
          {/* ── LEFT COLUMN ── */}
          <div className="hero-left" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <style>{`
              @media (max-width: 900px) {
                .hero-left { align-items: center; }
                .hero-right { order: -1; flex-direction: row; align-items: center; justify-content: center; gap: 20px; }
                .hero-photo { width: 120px !important; height: 120px !important; }
                .hero-actions { }
                .hero-tags { justify-content: center; }
                .hero-tag-link { width: 100%; display: block; text-align: center; margin-top: 4px; }
              }
              @media (max-width: 480px) {
                .hero-actions { flex-direction: column; width: 100%; }
                .hero-actions a { justify-content: center; }
              }
            `}</style>
            {/* Badge: Disponibile */}
            <div
              className="animate-fade-up inline-flex items-center w-fit"
              style={{
                gap: "8px",
                fontSize: "9px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--teal)",
                border: "1px solid var(--teal-border)",
                padding: "6px 12px",
                borderRadius: "5px",
                background: "var(--teal-dim)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--teal)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              Fractional CMO — Disponibile
            </div>

            {/* H1 */}
            <h1
              className="animate-fade-up delay-100 font-heading font-bold leading-none"
              style={{
                fontSize: "clamp(44px, 6vw, 72px)",
                color: "var(--text)",
              }}
            >
              Nicola Serrao
            </h1>

            {/* Subtitle */}
            <div
              className="animate-fade-up delay-200"
              style={{
                fontSize: "clamp(11px, 1.5vw, 14px)",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--teal)",
              }}
            >
              Fractional CMO &amp; Growth Strategist
            </div>

            {/* Tagline — Playfair italic */}
            <p
              className="animate-fade-up delay-300 font-heading italic leading-relaxed"
              style={{
                fontSize: "clamp(16px, 2vw, 21px)",
                color: "var(--text-dim)",
                maxWidth: "500px",
              }}
            >
              Hai gi&agrave; un&apos;agenzia.
              <br />
              Ti manca qualcuno che sappia{" "}
              <strong style={{ color: "var(--text)", fontStyle: "normal" }}>
                dove stai andando.
              </strong>
            </p>

            {/* Buttons row */}
            <div
              className="animate-fade-up delay-400 flex flex-wrap hero-actions"
              style={{ gap: "14px" }}
            >
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center hero-btn-wa"
                style={{
                  gap: "10px",
                  background: "var(--teal)",
                  color: "var(--bg)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Prenota 15 minuti
              </a>
              <Link
                href="/risorse"
                className="inline-flex items-center no-underline hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center hero-btn-email"
                style={{
                  gap: "10px",
                  background: "transparent",
                  color: "var(--teal)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  borderRadius: "5px",
                  border: "1px solid var(--teal-border)",
                  textDecoration: "none",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Risorse Gratis
              </Link>
            </div>

            {/* Tags row */}
            <div
              className="animate-fade-up delay-500 flex flex-wrap hero-tags"
              style={{ gap: "8px" }}
            >
              {[
                "Fractional CMO",
                "Strategia Revenue",
                "E-commerce",
                "B2B Lead Gen",
                "Growth",
                "Metodo GLITCH",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                    border: "1px solid var(--text-faint)",
                    padding: "4px 10px",
                    borderRadius: "5px",
                    background: "rgba(232,245,242,0.04)",
                  }}
                >
                  {tag}
                </span>
              ))}
              <Link
                href="/cosa-posso-fare"
                className="no-underline hover:opacity-70 transition-opacity hero-tag-link"
                style={{
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--teal)",
                  padding: "4px 0",
                }}
              >
                Cosa posso fare &rarr;
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Photo + GLITCH badge ── */}
          <div
            className="animate-fade-up delay-200 flex flex-col items-center shrink-0 hero-right"
            style={{ gap: "20px" }}
          >
            <div
              className="relative shrink-0 hero-photo"
              style={{ width: "240px", height: "240px" }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  inset: "-3px",
                  background:
                    "conic-gradient(var(--teal) 0deg, transparent 120deg, var(--teal) 240deg, transparent 360deg)",
                  animation: "spin 6s linear infinite",
                  opacity: 0.5,
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  inset: "3px",
                  background: "var(--bg)",
                  zIndex: 1,
                }}
              />
              <Image
                src="/images/nicola.png"
                alt="Nicola Serrao"
                width={228}
                height={228}
                priority
                className="absolute rounded-full object-cover object-top"
                style={{
                  inset: "6px",
                  width: "calc(100% - 12px)",
                  height: "calc(100% - 12px)",
                  zIndex: 2,
                }}
              />
            </div>
            <Link
              href="/metodo-glitch"
              className="no-underline transition-all duration-200 whitespace-nowrap hero-badge-glitch"
              style={{
                fontSize: "9px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--teal)",
                border: "1px solid var(--teal-border)",
                padding: "6px 18px",
                borderRadius: "5px",
                background: "var(--teal-dim)",
                zIndex: 10,
              }}
            >
              Metodo GLITCH
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SEZIONI SOTTO IL FOLD
      ══════════════════════════════════════════════ */}
      <style>{`
        .hp-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 60px;
        }

        /* ── SOCIAL PROOF BAR ── */
        .hp-proof-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          border: 1px solid var(--teal-border);
          border-radius: 10px;
          background: var(--teal-dim);
          padding: 32px 40px;
          margin-bottom: 100px;
        }
        .hp-proof-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          flex: 1;
        }
        .hp-proof-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--teal);
          line-height: 1;
        }
        .hp-proof-label {
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--text-dim);
          line-height: 1.6;
        }
        .hp-proof-divider {
          width: 1px;
          height: 48px;
          background: var(--teal-border);
          flex-shrink: 0;
          margin: 0 20px;
        }

        /* ── IL PROBLEMA ── */
        .hp-problem {
          margin-bottom: 100px;
        }
        .hp-eyebrow {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 24px;
        }
        .hp-problem-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 28px;
        }
        .hp-problem-title em {
          font-style: italic;
          color: var(--teal);
        }
        .hp-problem-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hp-pain-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          padding: 24px 20px;
          background: rgba(232,245,242,0.02);
          transition: border-color 0.3s;
        }
        .hp-pain-card:hover {
          border-color: var(--teal-border);
        }
        .hp-pain-icon {
          font-size: 20px;
          margin-bottom: 14px;
          opacity: 0.6;
        }
        .hp-pain-text {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.8;
        }
        .hp-pain-text strong {
          color: var(--text);
          font-weight: 500;
        }

        /* ── DIVIDER ── */
        .hp-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 0 0 100px;
        }

        /* ── CASO STUDIO ── */
        .hp-case {
          margin-bottom: 100px;
        }
        .hp-case-card {
          border: 1px solid var(--teal-border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--teal-dim);
        }
        .hp-case-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--teal) 0%, transparent 100%);
        }
        .hp-case-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .hp-case-left {
          padding: 36px;
          border-right: 1px solid var(--teal-border);
        }
        .hp-case-right {
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
        }
        .hp-case-badge {
          display: inline-block;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 4px 10px;
          border-radius: 3px;
          background: var(--teal-dim);
          margin-right: 8px;
          margin-bottom: 8px;
        }
        .hp-case-brand {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }
        .hp-case-desc {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.85;
        }
        .hp-case-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .hp-metric-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--teal);
          line-height: 1;
          margin-bottom: 6px;
        }
        .hp-metric-label {
          font-size: 10px;
          color: var(--text-dim);
          line-height: 1.5;
        }
        .hp-case-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          text-decoration: none;
          transition: opacity 0.2s;
          margin-top: 8px;
        }
        .hp-case-link:hover { opacity: 0.7; }

        /* ── METODO GLITCH PILLOLE ── */
        .hp-method {
          margin-bottom: 100px;
        }
        .hp-method-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 12px;
        }
        .hp-method-title em {
          font-style: italic;
          color: var(--teal);
        }
        .hp-method-sub {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.85;
          max-width: 560px;
          margin-bottom: 36px;
        }
        .hp-method-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .hp-method-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 8px;
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          background: rgba(232,245,242,0.02);
          transition: border-color 0.3s, background 0.3s;
        }
        .hp-method-step:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
        }
        .hp-method-letter {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--teal);
          margin-bottom: 8px;
        }
        .hp-method-name {
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-dim);
        }

        /* ── CTA FINALE ── */
        .hp-cta {
          border: 1px solid var(--teal-border);
          border-radius: 10px;
          padding: 48px;
          background: var(--teal-dim);
          text-align: center;
          margin-bottom: 100px;
          position: relative;
          overflow: hidden;
        }
        .hp-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,252,0.06), transparent);
          pointer-events: none;
        }
        .hp-cta-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          position: relative;
        }
        .hp-cta-sub {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.85;
          margin-bottom: 32px;
          position: relative;
        }
        .hp-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          position: relative;
        }
        .hp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--teal);
          color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 5px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .hp-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .hp-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--teal);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 5px;
          border: 1px solid var(--teal-border);
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .hp-btn-secondary:hover {
          background: var(--teal-dim);
          border-color: var(--teal);
          transform: translateY(-2px);
        }

        /* ── RISORSE GRATUITE ── */
        .hp-risorse {
          max-width: 900px;
          margin: 0 auto;
        }
        .hp-risorse-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .hp-risorse-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
        }
        .hp-risorse-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.25;
        }
        .hp-risorse-title em {
          font-style: italic;
          color: var(--teal);
        }
        .hp-risorse-sub {
          margin-top: 12px;
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .hp-risorse-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hp-risorsa-card {
          border: 1px solid rgba(0,255,252,0.12);
          border-radius: 10px;
          padding: 28px 24px;
          background: rgba(0,255,252,0.025);
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
        }
        .hp-risorsa-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .hp-risorsa-card:hover {
          border-color: rgba(0,255,252,0.3);
          background: rgba(0,255,252,0.05);
          transform: translateY(-3px);
        }
        .hp-risorsa-card:hover::before {
          opacity: 1;
        }
        .hp-risorsa-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 3px 8px;
          border-radius: 3px;
          background: var(--teal-dim);
          width: fit-content;
        }
        .hp-risorsa-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(0,255,252,0.08);
          border: 1px solid rgba(0,255,252,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }
        .hp-risorsa-name {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .hp-risorsa-desc {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.7;
          flex: 1;
        }
        .hp-risorsa-question {
          font-size: 11px;
          color: var(--text-faint);
          line-height: 1.6;
          border-left: 2px solid var(--teal-border);
          padding-left: 10px;
          font-style: italic;
        }
        .hp-risorsa-cta {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s;
        }
        .hp-risorsa-card:hover .hp-risorsa-cta { gap: 10px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hp-section { padding: 0 32px; }
          .hp-proof-bar { flex-direction: column; gap: 24px; padding: 24px 20px; }
          .hp-proof-divider { width: 48px; height: 1px; margin: 0; }
          .hp-problem-grid { grid-template-columns: 1fr; }
          .hp-case-inner { grid-template-columns: 1fr; }
          .hp-case-left { border-right: none; border-bottom: 1px solid var(--teal-border); }
          .hp-method-grid { grid-template-columns: repeat(3, 1fr); }
          .hp-cta { padding: 36px 28px; }
          .hp-risorse-grid { grid-template-columns: 1fr; }
          .hp-blog-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .hp-section { padding: 0 20px; }
          .hp-case-left, .hp-case-right { padding: 24px 20px; }
          .hp-method-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-cta-buttons { flex-direction: column; align-items: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; }
        }
        /* ── BLOG PREVIEW ── */
        .hp-blog {
          max-width: 900px;
          margin: 0 auto;
        }
        .hp-blog-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .hp-blog-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 700;
          color: var(--text);
        }
        .hp-blog-title em {
          font-style: italic;
          color: var(--teal);
        }
        .hp-blog-link {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          text-decoration: none;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .hp-blog-link:hover { opacity: 0.7; }
        .hp-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .hp-blog-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          padding: 22px 20px;
          background: rgba(232,245,242,0.02);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .hp-blog-card:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
        }
        .hp-blog-card-cat {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 2px 7px;
          border-radius: 3px;
          background: var(--teal-dim);
          align-self: flex-start;
        }
        .hp-blog-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.4;
          flex: 1;
        }
        .hp-blog-card-meta {
          font-size: 10px;
          color: var(--text-faint);
          letter-spacing: 0.5px;
        }
        .hp-blog-card-arrow {
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--teal);
          display: flex;
          align-items: center;
          gap: 5px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .hp-blog-card:hover .hp-blog-card-arrow { opacity: 1; }
      `}</style>

      {/* ── 1. RISORSE GRATUITE ── */}
      <div className="hp-section" style={{ paddingTop: "0", paddingBottom: "80px" }}>
        <div className="hp-risorse">
          <div className="hp-risorse-header">
            <div className="hp-risorse-eyebrow">&#9733; Gratis — senza registrazione</div>
            <h2 className="hp-risorse-title">
              Strumenti pratici <em>per decidere meglio.</em>
            </h2>
            <p className="hp-risorse-sub">
              Tre risorse gratuite alimentate da AI. Rispondono alle domande che ogni imprenditore si fa sul proprio marketing — in modo diretto, senza giri di parole.
            </p>
          </div>
          <div className="hp-risorse-grid">

            {/* Card 1 — KPI Calculator */}
            <Link href="/risorse/kpi-calculator" className="hp-risorsa-card">
              <div className="hp-risorsa-badge">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                AI-Powered
              </div>
              <div className="hp-risorsa-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="hp-risorsa-name">KPI Calculator</div>
              <div className="hp-risorsa-question">
                &ldquo;Sto spendendo troppo in ads? Qual &egrave; il mio break-even ROAS reale?&rdquo;
              </div>
              <div className="hp-risorsa-desc">
                Inserisci budget, fatturato e margine. Ricevi in 30 secondi un&apos;analisi AI con i 3 scenari di crescita e i KPI che contano davvero.
              </div>
              <div className="hp-risorsa-cta">
                Calcola ora
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>

            {/* Card 2 — Marketing Audit */}
            <Link href="/risorse/audit-score" className="hp-risorsa-card">
              <div className="hp-risorsa-badge">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                AI-Powered
              </div>
              <div className="hp-risorsa-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="hp-risorsa-name">Marketing Audit</div>
              <div className="hp-risorsa-question">
                &ldquo;Il mio marketing &egrave; strutturato o sto solo spendendo a caso?&rdquo;
              </div>
              <div className="hp-risorsa-desc">
                10 domande sul tuo stack marketing. L&apos;AI diagnostica i gap pi&ugrave; critici, stima il costo invisibile di ciascuno e ti d&agrave; 3 priorit&agrave; concrete.
              </div>
              <div className="hp-risorsa-cta">
                Fai il test
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>

            {/* Card 3 — Fractional CMO Self-Assessment */}
            <Link href="/risorse/fractional-cmo" className="hp-risorsa-card">
              <div className="hp-risorsa-badge">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                AI-Powered
              </div>
              <div className="hp-risorsa-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hp-risorsa-name">Fractional CMO Check</div>
              <div className="hp-risorsa-question">
                &ldquo;Ho davvero bisogno di un Fractional CMO o basta una consulenza spot?&rdquo;
              </div>
              <div className="hp-risorsa-desc">
                Self-assessment in 5 minuti. L&apos;AI analizza fase, team e obiettivi e ti dice esattamente quale figura ti serve — e perch&eacute;.
              </div>
              <div className="hp-risorsa-cta">
                Scopri il tuo profilo
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* ── 2. SOCIAL PROOF BAR ── */}
      <div className="hp-section">
        <div className="hp-proof-bar">
          <div className="hp-proof-item">
            <span className="hp-proof-value">30+</span>
            <span className="hp-proof-label">Clienti gestiti</span>
          </div>
          <div className="hp-proof-divider" />
          <div className="hp-proof-item">
            <span className="hp-proof-value">&euro;5M+</span>
            <span className="hp-proof-label">Budget Ads gestito</span>
          </div>
          <div className="hp-proof-divider" />
          <div className="hp-proof-item">
            <span className="hp-proof-value">15+</span>
            <span className="hp-proof-label">Settori diversi</span>
          </div>
          <div className="hp-proof-divider" />
          <div className="hp-proof-item">
            <span className="hp-proof-value">+200%</span>
            <span className="hp-proof-label">Fatturato (caso reale)</span>
          </div>
        </div>
      </div>

      {/* ── 2. IL PROBLEMA ── */}
      <div className="hp-section">
        <div className="hp-problem">
          <div className="hp-eyebrow">Ti riconosci?</div>
          <h2 className="hp-problem-title">
            Hai un&apos;agenzia. Hai il budget. <em>Ma manca la direzione.</em>
          </h2>
          <div className="hp-problem-grid">
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>Le agenzie eseguono,</strong> ma nessuno decide dove andare. Ogni trimestre ricomincia da zero senza una strategia che si accumula.
              </p>
            </div>
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>Il fatturato cresce</strong>, ma i margini no. Spendi di pi&ugrave; in ads, ottieni gli stessi risultati. Il problema non &egrave; il budget — &egrave; il metodo.
              </p>
            </div>
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>Non hai bisogno di un altro fornitore.</strong> Hai bisogno di qualcuno che si sieda al tuo tavolo, capisca i tuoi numeri e dica la verit&agrave;.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-section">
        <div className="hp-divider" />
      </div>

      {/* ── 3. MINI CASO STUDIO ── */}
      <div className="hp-section">
        <div className="hp-case">
          <div className="hp-eyebrow">Caso reale</div>
          <div className="hp-case-card">
            <div className="hp-case-bar" />
            <div className="hp-case-inner">
              <div className="hp-case-left">
                <div>
                  <span className="hp-case-badge">E-commerce</span>
                  <span className="hp-case-badge">Strategia</span>
                </div>
                <div className="hp-case-brand">Balance Nutrition</div>
                <p className="hp-case-desc">
                  Brand nel settore nutrition con fatturato mensile di &euro;45k, campagne Ads non ottimizzate e un AOV basso che limitava i margini. In 4 mesi abbiamo triplicato il fatturato lavorando su strategia, catalogo e funnel di acquisizione.
                </p>
                <Link href="/cosa-ho-fatto" className="hp-case-link">
                  Vedi tutti i casi &rarr;
                </Link>
              </div>
              <div className="hp-case-right">
                <div className="hp-case-metrics">
                  <div>
                    <div className="hp-metric-value">+200%</div>
                    <div className="hp-metric-label">Fatturato mensile</div>
                  </div>
                  <div>
                    <div className="hp-metric-value">+33%</div>
                    <div className="hp-metric-label">AOV con strategia bundle</div>
                  </div>
                  <div>
                    <div className="hp-metric-value">10%</div>
                    <div className="hp-metric-label">Margini netti consolidati</div>
                  </div>
                  <div>
                    <div className="hp-metric-value">4 mesi</div>
                    <div className="hp-metric-label">Per triplicare il fatturato</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-section">
        <div className="hp-divider" />
      </div>

      {/* ── 4. METODO GLITCH IN PILLOLE ── */}
      <div className="hp-section">
        <div className="hp-method">
          <div className="hp-eyebrow">Il metodo</div>
          <h2 className="hp-method-title">
            Non parto dalle campagne.<br /><em>Parto dalla strategia.</em>
          </h2>
          <p className="hp-method-sub">
            Il Metodo GLITCH &egrave; il framework che uso come Fractional CMO: 6 fasi dalla diagnosi del business alla crescita misurabile. Affianco il tuo team 3&ndash;4 volte al mese — strategia, decisioni, priorit&agrave;.
          </p>
          <div className="hp-method-grid">
            {[
              { letter: "G", name: "Grounding" },
              { letter: "L", name: "Loops" },
              { letter: "I", name: "Insight" },
              { letter: "T", name: "Testing" },
              { letter: "C", name: "Calibration" },
              { letter: "H", name: "Harvest" },
            ].map((step) => (
              <div key={step.letter} className="hp-method-step">
                <div className="hp-method-letter">{step.letter}</div>
                <div className="hp-method-name">{step.name}</div>
              </div>
            ))}
          </div>
          <Link
            href="/metodo-glitch"
            style={{
              fontSize: "10px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--teal)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Scopri il metodo completo &rarr;
          </Link>
        </div>
      </div>

      <div className="hp-section">
        <div className="hp-divider" />
      </div>

      {/* ── 5. BLOG PREVIEW ── */}
      <div className="hp-section">
        <div className="hp-blog">
          <div className="hp-blog-header">
            <h2 className="hp-blog-title">
              Dal campo.<br /><em>Senza filtri.</em>
            </h2>
            <Link href="/blog" className="hp-blog-link">
              Tutti gli articoli &rarr;
            </Link>
          </div>
          <div className="hp-blog-grid">
            {[
              {
                slug: "prime-settimane-consulente-marketing",
                category: "Metodo",
                title: "Prima della strategia, si mappa. Cosa fa davvero un buon consulente nelle prime settimane.",
                readTime: "7 min",
              },
              {
                slug: "test-ab-significanza-statistica",
                category: "Analytics",
                title: "Il tuo test A/B ha mostrato +18%. Probabilmente non significa niente.",
                readTime: "9 min",
              },
              {
                slug: "roas-non-e-un-kpi",
                category: "Analytics",
                title: "Il ROAS non è un KPI. Ecco cosa guardare invece.",
                readTime: "8 min",
              },
            ].map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="hp-blog-card">
                <span className="hp-blog-card-cat">{post.category}</span>
                <div className="hp-blog-card-title">{post.title}</div>
                <div className="hp-blog-card-meta">{post.readTime} lettura</div>
                <div className="hp-blog-card-arrow">
                  Leggi
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hp-section">
        <div className="hp-divider" />
      </div>

      {/* ── 6. CTA FINALE ── */}
      <div className="hp-section">
        <div className="hp-cta">
          <h2 className="hp-cta-title">15 minuti. Zero pitch.</h2>
          <p className="hp-cta-sub">
            Una call per capire se il modello Fractional CMO ha senso per il tuo business.<br />
            Nessuna presentazione, nessun preventivo. Solo una conversazione onesta sui tuoi numeri.
          </p>
          <div className="hp-cta-buttons">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Prenota la call
            </a>
            <a href={`mailto:${SITE.email}`} className="hp-btn-secondary">
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
