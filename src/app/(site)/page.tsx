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
              Disponibile per nuovi progetti
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
              Digital Marketing Strategist
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
              Ogni imprenditore ha bisogno di qualcuno
              <br />
              che gli dica{" "}
              <strong style={{ color: "var(--text)", fontStyle: "normal" }}>
                la verit&agrave;.
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
                Scrivimi su WA
              </a>
              <a
                href={`mailto:${SITE.email}`}
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
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Inviami una mail
              </a>
            </div>

            {/* Tags row */}
            <div
              className="animate-fade-up delay-500 flex flex-wrap hero-tags"
              style={{ gap: "8px" }}
            >
              {[
                "Strategia",
                "Digital ADV",
                "E-commerce",
                "CRO",
                "Lead Gen",
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
        }
        @media (max-width: 480px) {
          .hp-section { padding: 0 20px; }
          .hp-case-left, .hp-case-right { padding: 24px 20px; }
          .hp-method-grid { grid-template-columns: repeat(2, 1fr); }
          .hp-cta-buttons { flex-direction: column; align-items: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── 1. SOCIAL PROOF BAR ── */}
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
            Spendi in marketing, ma <em>non sai se funziona.</em>
          </h2>
          <div className="hp-problem-grid">
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>L&apos;agenzia ti manda report</strong> pieni di numeri, ma non capisci cosa significano davvero per il tuo fatturato.
              </p>
            </div>
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>Il fatturato cresce</strong>, ma i margini no. Lavori di pi&ugrave;, guadagni uguale. Qualcosa non torna.
              </p>
            </div>
            <div className="hp-pain-card">
              <div className="hp-pain-icon">&#9898;</div>
              <p className="hp-pain-text">
                <strong>Hai provato freelancer, agenzie, corsi.</strong> Nessuno ti ha mai detto con onest&agrave; cosa funziona e cosa no nel tuo caso specifico.
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
          <div className="hp-eyebrow">Il mio approccio</div>
          <h2 className="hp-method-title">
            Non parto dalle Ads.<br /><em>Parto dai tuoi numeri.</em>
          </h2>
          <p className="hp-method-sub">
            Il Metodo GLITCH &egrave; un framework in 6 fasi: dalla diagnosi del business alla crescita misurabile. Niente formule magiche &mdash; solo metodo, dati e onest&agrave;.
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

      {/* ── 5. CTA FINALE ── */}
      <div className="hp-section">
        <div className="hp-cta">
          <h2 className="hp-cta-title">15 minuti. Zero impegno.</h2>
          <p className="hp-cta-sub">
            Una chiacchierata informale per capire se posso aiutarti.<br />
            Nessun pitch, nessuna presentazione. Solo una conversazione onesta sul tuo business.
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
              Prenota 15 minuti
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
