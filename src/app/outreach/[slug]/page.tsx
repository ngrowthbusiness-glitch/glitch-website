import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOutreachConfig, getAllOutreachSlugs } from "@/data/outreach/loader";
import type { OutreachConfig, OutreachSection } from "@/data/outreach/types";
import { SITE } from "@/lib/constants";
import OutreachTracker from "./tracker";
import ResponseBox from "./response-box";

export async function generateStaticParams() {
  return getAllOutreachSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getOutreachConfig(slug);
  if (!config) return {};

  return {
    title: `${config.companyName} — Strategia Digitale`,
    robots: { index: false, follow: false },
  };
}

/* ---------- Nicola's fixed palette ---------- */
const NS = {
  bg: "#0a0e0d",
  text: "#e8f0ff",
  textDim: "rgba(232,240,255,0.50)",
  primary: "#00fffc",
  primaryDim: "rgba(0,255,252,0.10)",
  border: "rgba(0,255,252,0.15)",
} as const;

const NS_PILLS = [
  "Strategia",
  "Meta Ads",
  "Google Ads",
  "CRO",
  "E-commerce",
  "Lead Generation",
  "Shopify",
  "Klaviyo",
];

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getOutreachConfig(slug);
  if (!config) notFound();

  const isV3 = !!config.pitch;

  if (isV3) {
    return <OutreachV3 config={config} slug={slug} />;
  }

  return <OutreachV2 config={config} slug={slug} />;
}

/* ============================================================
   V3 TEMPLATE — Dual-style Nicola / Prospect + Glitch Dividers
   ============================================================ */

function OutreachV3({ config, slug }: { config: OutreachConfig; slug: string }) {
  const isLightBg = isLight(config.palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{v3Styles(config, isLightBg)}</style>

      <div className="v3-page">
        {/* ── SEZIONE 1: APERTURA — Stile Nicola ── */}
        <section className="v3-ns-section v3-opener">
          <div className="v3-opener-inner">
            <Image
              src="/favicon.png"
              alt="NS"
              width={36}
              height={36}
              style={{ objectFit: "contain" }}
            />
            <h2 className="v3-opener-name">Nicola Serrao</h2>
            <p className="v3-opener-role">Digital Marketing Strategist</p>
            <div className="v3-pills">
              {NS_PILLS.map((p) => (
                <span key={p} className="v3-pill">{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── GLITCH DIVIDER 1 ── */}
        <div className="v3-glitch-divider" aria-hidden="true">
          <div className="v3-glitch-line v3-glitch-line--1" />
          <div className="v3-glitch-line v3-glitch-line--2" />
          <div className="v3-glitch-line v3-glitch-line--3" />
        </div>

        {/* ── SEZIONE 2: HEADLINE + CTA IMMEDIATO — Stile Prospect ── */}
        <section className="v3-prospect-section v3-hero">
          <div className="v3-section-inner">
            {config.logo && (
              <Image
                src={config.logo}
                alt={config.companyName}
                width={48}
                height={48}
                className="v3-hero-logo"
                style={{ objectFit: "contain" }}
              />
            )}
            <div className="v3-eyebrow">{config.sector}</div>
            <h1 className="v3-h1">{config.heroTitle}</h1>
            <p className="v3-hero-sub">{config.heroSubtitle}</p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="v3-btn-primary"
            >
              Scrivimi &rarr;
            </a>
          </div>
        </section>

        {/* ── SEZIONE 3: IL CONCETTO ESPANSO — Stile Prospect ── */}
        <section className="v3-prospect-section v3-pitch">
          <div className="v3-section-inner">
            {config.pitch!.split("\n\n").map((para, i) => (
              <p key={i} className="v3-pitch-para">{para}</p>
            ))}
          </div>
        </section>

        {/* ── SEZIONE 4: LE 3 BOX COMPETENZE — Stile Prospect ── */}
        {config.boxes && config.boxes.length > 0 && (
          <section className="v3-prospect-section v3-boxes">
            <div className="v3-section-inner">
              <div className="v3-boxes-grid">
                {config.boxes.map((box, i) => (
                  <div key={i} className="v3-box-card">
                    <div className="v3-box-num">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="v3-box-title">{box.title}</h3>
                    <p className="v3-box-desc">{box.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SEZIONE 5: CTA CON URGENZA — Stile Prospect ── */}
        <section className="v3-prospect-section v3-urgency">
          <div className="v3-section-inner">
            {config.urgencyText && (
              <div className="v3-urgency-text">
                {config.urgencyText.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {hasResponseBox ? (
              <ResponseBox
                question={config.cta.ctaQuestion!}
                companyName={config.companyName}
                slug={slug}
                emailSubject={config.cta.emailSubject}
                siteEmail={SITE.email}
              />
            ) : (
              <div className="v3-cta-buttons">
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                  className="v3-btn-primary"
                >
                  Scrivimi via email
                </a>
                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-btn-secondary"
                >
                  Scrivimi su WhatsApp
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ── GLITCH DIVIDER 2 ── */}
        <div className="v3-glitch-divider" aria-hidden="true">
          <div className="v3-glitch-line v3-glitch-line--1" />
          <div className="v3-glitch-line v3-glitch-line--2" />
          <div className="v3-glitch-line v3-glitch-line--3" />
        </div>

        {/* ── SEZIONE 6: CHIUSURA — Stile Nicola ── */}
        <section className="v3-ns-section v3-closer">
          <div className="v3-closer-inner">
            {hasResponseBox ? (
              <p className="v3-closer-text">
                Preferisci scrivermi direttamente?
              </p>
            ) : null}
            <div className="v3-cta-buttons">
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="v3-btn-ns-primary"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="v3-btn-ns-secondary"
              >
                Email
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="v3-footer">
          <p>
            {SITE.name} &middot; {SITE.title} &middot;{" "}
            <a href={SITE.url}>nicolaserrao.com</a>
          </p>
        </footer>
      </div>
    </>
  );
}

/* ---------- V3 Styles ---------- */
function v3Styles(config: OutreachConfig, isLightBg: boolean): string {
  return `
    /* === BASE === */
    .v3-page {
      min-height: 100vh;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
    }

    /* === NICOLA SECTIONS (dark, cyan accent) === */
    .v3-ns-section {
      background: ${NS.bg};
      color: ${NS.text};
    }

    /* === PROSPECT SECTIONS (config palette) === */
    .v3-prospect-section {
      --o-primary: ${config.palette.primary};
      --o-primary-dim: ${config.palette.primaryDim};
      --o-bg: ${config.palette.background};
      --o-text: ${config.palette.text};
      --o-text-dim: ${config.palette.textDim};
      --o-border: ${config.palette.border};
      background: ${config.palette.background};
      color: ${config.palette.text};
    }

    /* === SEZIONE 1 — OPENER (Nicola) === */
    .v3-opener {
      padding: 64px 60px 56px;
      text-align: center;
    }
    .v3-opener-inner {
      max-width: 720px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .v3-opener-name {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      color: ${NS.text};
      margin-top: 8px;
    }
    .v3-opener-role {
      font-size: 11px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: ${NS.textDim};
    }
    .v3-pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
    }
    .v3-pill {
      font-size: 9px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 100px;
      border: 1px solid ${NS.border};
      color: ${NS.primary};
      background: ${NS.primaryDim};
    }

    /* === GLITCH DIVIDER === */
    .v3-glitch-divider {
      position: relative;
      height: 48px;
      overflow: hidden;
      background: linear-gradient(
        180deg,
        ${NS.bg} 0%,
        ${config.palette.background} 100%
      );
    }
    /* Reverse for second divider (prospect → nicola) */
    .v3-urgency + .v3-glitch-divider {
      background: linear-gradient(
        180deg,
        ${config.palette.background} 0%,
        ${NS.bg} 100%
      );
    }
    .v3-glitch-line {
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
    }
    .v3-glitch-line--1 {
      top: 35%;
      background: ${NS.primary};
      opacity: 0.7;
      animation: glitch-shift-1 3s ease-in-out infinite;
    }
    .v3-glitch-line--2 {
      top: 50%;
      background: ${config.palette.primary};
      opacity: 0.5;
      animation: glitch-shift-2 2.5s ease-in-out infinite 0.3s;
    }
    .v3-glitch-line--3 {
      top: 65%;
      background: ${NS.primary};
      opacity: 0.3;
      animation: glitch-shift-3 4s ease-in-out infinite 0.7s;
    }
    @keyframes glitch-shift-1 {
      0%, 100% { transform: translateX(0); opacity: 0.7; }
      10% { transform: translateX(-30%); opacity: 1; }
      11% { transform: translateX(15%); opacity: 0.4; }
      12% { transform: translateX(0); opacity: 0.7; }
      50% { transform: translateX(0); opacity: 0.7; }
      60% { transform: translateX(25%); opacity: 1; }
      61% { transform: translateX(-10%); opacity: 0.3; }
      62% { transform: translateX(0); opacity: 0.7; }
    }
    @keyframes glitch-shift-2 {
      0%, 100% { transform: translateX(0) scaleX(1); }
      15% { transform: translateX(20%) scaleX(0.6); }
      16% { transform: translateX(-40%) scaleX(1.2); }
      17% { transform: translateX(0) scaleX(1); }
      55% { transform: translateX(-15%) scaleX(0.8); }
      56% { transform: translateX(30%) scaleX(1.1); }
      57% { transform: translateX(0) scaleX(1); }
    }
    @keyframes glitch-shift-3 {
      0%, 100% { transform: translateX(0); width: 100%; }
      20% { transform: translateX(10%); width: 60%; }
      21% { transform: translateX(-20%); width: 40%; }
      22% { transform: translateX(0); width: 100%; }
      70% { transform: translateX(-5%); width: 80%; }
      71% { transform: translateX(15%); width: 50%; }
      72% { transform: translateX(0); width: 100%; }
    }

    /* === SECTION INNER (shared max-width) === */
    .v3-section-inner {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 60px;
    }

    /* === SEZIONE 2 — HERO (Prospect) === */
    .v3-hero {
      padding: 80px 0 64px;
      text-align: center;
    }
    .v3-hero-logo {
      margin-bottom: 20px;
    }
    .v3-eyebrow {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--o-primary);
      margin-bottom: 20px;
    }
    .v3-h1 {
      font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 700;
      line-height: 1.15;
      color: var(--o-text);
      margin-bottom: 20px;
    }
    .v3-hero-sub {
      font-size: 15px;
      line-height: 1.7;
      color: var(--o-text-dim);
      margin-bottom: 32px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* === BUTTONS (Prospect style) === */
    .v3-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 5px;
      text-decoration: none;
      transition: opacity 0.2s, transform 0.2s;
      background: var(--o-primary);
      color: ${isLightBg ? '#fff' : config.palette.background};
    }
    .v3-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
    .v3-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 5px;
      border: 1px solid var(--o-border);
      text-decoration: none;
      transition: all 0.2s;
      color: var(--o-primary);
      background: transparent;
    }
    .v3-btn-secondary:hover { transform: translateY(-2px); }
    .v3-cta-buttons {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* === BUTTONS (Nicola style) === */
    .v3-btn-ns-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 5px;
      text-decoration: none;
      transition: opacity 0.2s, transform 0.2s;
      background: ${NS.primary};
      color: ${NS.bg};
    }
    .v3-btn-ns-primary:hover { opacity: 0.85; transform: translateY(-2px); }
    .v3-btn-ns-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 5px;
      border: 1px solid ${NS.border};
      text-decoration: none;
      transition: all 0.2s;
      color: ${NS.primary};
      background: transparent;
    }
    .v3-btn-ns-secondary:hover { transform: translateY(-2px); }

    /* === SEZIONE 3 — PITCH (Prospect) === */
    .v3-pitch {
      padding: 48px 0 56px;
    }
    .v3-pitch-para {
      font-size: 15px;
      line-height: 1.85;
      color: var(--o-text-dim);
      margin-bottom: 20px;
    }
    .v3-pitch-para:last-child {
      margin-bottom: 0;
    }

    /* === SEZIONE 4 — 3 BOX (Prospect) === */
    .v3-boxes {
      padding: 48px 0 56px;
    }
    .v3-boxes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .v3-box-card {
      padding: 28px 24px;
      border-radius: 12px;
      border: 1px solid var(--o-border);
      background: ${isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)'};
      position: relative;
    }
    .v3-box-num {
      font-size: 11px;
      font-weight: 500;
      color: var(--o-primary);
      margin-bottom: 12px;
      letter-spacing: 1px;
    }
    .v3-box-title {
      font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 700;
      color: var(--o-text);
      margin-bottom: 10px;
    }
    .v3-box-desc {
      font-size: 12px;
      line-height: 1.75;
      color: var(--o-text-dim);
    }

    /* === SEZIONE 5 — URGENCY CTA (Prospect) === */
    .v3-urgency {
      padding: 56px 0 64px;
      text-align: center;
    }
    .v3-urgency-text {
      max-width: 600px;
      margin: 0 auto 36px;
      text-align: left;
    }
    .v3-urgency-text p {
      font-size: 15px;
      line-height: 1.85;
      color: var(--o-text-dim);
      margin-bottom: 16px;
    }
    .v3-urgency-text p:last-child {
      color: var(--o-text);
      font-style: italic;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 17px;
      margin-bottom: 0;
    }

    /* === SEZIONE 6 — CLOSER (Nicola) === */
    .v3-closer {
      padding: 48px 60px;
      text-align: center;
    }
    .v3-closer-inner {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .v3-closer-text {
      font-size: 13px;
      color: ${NS.textDim};
    }

    /* === FOOTER === */
    .v3-footer {
      background: ${NS.bg};
      text-align: center;
      padding: 24px;
      font-size: 10px;
      letter-spacing: 1px;
      color: ${NS.textDim};
      border-top: 1px solid ${NS.border};
    }
    .v3-footer a {
      color: ${NS.primary};
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .v3-footer a:hover { opacity: 0.7; }

    /* === RESPONSIVE === */
    @media (max-width: 900px) {
      .v3-opener { padding: 48px 32px 40px; }
      .v3-section-inner { padding: 0 32px; }
      .v3-closer { padding: 40px 32px; }
      .v3-boxes-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .v3-opener { padding: 40px 20px 32px; }
      .v3-section-inner { padding: 0 20px; }
      .v3-closer { padding: 32px 20px; }
      .v3-cta-buttons { flex-direction: column; }
      .v3-btn-primary, .v3-btn-secondary,
      .v3-btn-ns-primary, .v3-btn-ns-secondary { justify-content: center; }
      .v3-glitch-divider { height: 36px; }
    }
  `;
}

/* ============================================================
   V2 TEMPLATE — Legacy section-based renderer (backward compat)
   ============================================================ */

function OutreachV2({ config, slug }: { config: OutreachConfig; slug: string }) {
  const isLightBg = isLight(config.palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{`
        .o-page {
          --o-primary: ${config.palette.primary};
          --o-primary-dim: ${config.palette.primaryDim};
          --o-bg: ${config.palette.background};
          --o-text: ${config.palette.text};
          --o-text-dim: ${config.palette.textDim};
          --o-border: ${config.palette.border};
          min-height: 100vh;
          background: ${config.palette.background};
          color: ${config.palette.text};
          font-family: 'DM Mono', monospace;
        }

        /* Header */
        .o-header {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 16px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: ${isLightBg ? 'rgba(255,255,255,0.9)' : 'rgba(10,14,19,0.9)'};
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--o-border);
        }
        .o-header-left, .o-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .o-header-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--o-text-dim);
        }

        /* Sections */
        .o-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 60px;
        }
        .o-section-hero {
          padding-top: 80px;
          padding-bottom: 64px;
        }

        /* Typography */
        .o-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--o-primary);
          margin-bottom: 16px;
        }
        .o-h1 {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--o-text);
          margin-bottom: 16px;
        }
        .o-h2 {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 24px;
        }
        .o-h3 {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 16px;
        }
        .o-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: var(--o-text-dim);
          margin-bottom: 12px;
        }
        .o-tagline {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ''}var(--font-playfair), 'Playfair Display', serif;
          font-style: italic;
          font-size: 14px;
          color: var(--o-text-dim);
        }
        .o-body {
          font-size: 14px;
          line-height: 1.85;
          color: var(--o-text-dim);
          margin-bottom: 24px;
        }
        .o-sub-label {
          font-size: 13px;
          color: var(--o-text-dim);
          margin-bottom: 24px;
        }

        /* Cards */
        .o-card-bg { background: ${isLightBg ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)'}; }

        /* Insight cards */
        .o-insight-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .o-insight-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--o-border);
        }
        .o-insight-num {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--o-primary);
          flex-shrink: 0;
        }
        .o-insight-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 4px;
        }
        .o-insight-desc {
          font-size: 12px;
          line-height: 1.7;
          color: var(--o-text-dim);
        }

        /* Grid cards */
        .o-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .o-grid-card {
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--o-border);
        }
        .o-grid-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 8px;
        }
        .o-grid-card-desc {
          font-size: 12px;
          line-height: 1.7;
          color: var(--o-text-dim);
        }

        /* Teaser cards */
        .o-teaser-card {
          padding: 20px;
          border-radius: 12px;
          border-left: 2px solid var(--o-primary);
        }
        .o-teaser-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 4px;
        }
        .o-teaser-desc {
          font-size: 12px;
          line-height: 1.7;
          color: var(--o-text-dim);
        }

        /* Metrics */
        .o-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .o-metric-card {
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--o-border);
          text-align: center;
        }
        .o-metric-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--o-primary);
        }
        .o-metric-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 4px;
          color: var(--o-text-dim);
        }

        /* CTA buttons */
        .o-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 24px;
          border-radius: 5px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          background: var(--o-primary);
          color: ${isLightBg ? '#fff' : config.palette.background};
        }
        .o-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .o-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 24px;
          border-radius: 5px;
          border: 1px solid var(--o-border);
          text-decoration: none;
          transition: all 0.2s;
          color: var(--o-primary);
          background: transparent;
        }
        .o-btn-secondary:hover { transform: translateY(-2px); }
        .o-cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .o-economics-link {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--o-text-dim);
          transition: opacity 0.2s;
        }
        .o-economics-link:hover { opacity: 0.7; }

        /* Footer */
        .o-footer {
          text-align: center;
          padding: 24px;
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--o-text-dim);
          border-top: 1px solid var(--o-border);
        }
        .o-footer a {
          color: var(--o-primary);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .o-footer a:hover { opacity: 0.7; }

        /* Responsive */
        @media (max-width: 900px) {
          .o-header { padding: 16px 32px; }
          .o-section { padding: 36px 32px; }
          .o-section-hero { padding-top: 60px; padding-bottom: 48px; }
          .o-grid-3 { grid-template-columns: 1fr; }
          .o-metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .o-header { padding: 16px 20px; }
          .o-section { padding: 28px 20px; }
          .o-cta-buttons { flex-direction: column; }
          .o-btn-primary, .o-btn-secondary { justify-content: center; }
        }
      `}</style>

      <div className="o-page">
        {/* Header */}
        <header className="o-header">
          <div className="o-header-left">
            {config.logo && (
              <Image
                src={config.logo}
                alt={config.companyName}
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            )}
            <span className="o-header-label">{config.companyName}</span>
          </div>
          <div className="o-header-right">
            <Image
              src="/favicon.png"
              alt="NS"
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
            <span className="o-header-label">Nicola Serrao</span>
          </div>
        </header>

        {/* Hero */}
        <section className="o-section o-section-hero">
          <div className="o-eyebrow">{config.sector}</div>
          <h1 className="o-h1">{config.heroTitle}</h1>
          <p className="o-subtitle">{config.heroSubtitle}</p>
          {config.heroTagline && (
            <p className="o-tagline">{config.heroTagline}</p>
          )}
        </section>

        {/* Dynamic sections */}
        {config.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        {/* CTA */}
        <section className="o-section">
          <h2 className="o-h3" style={{ textAlign: hasResponseBox ? "left" : "center" }}>
            {config.cta.title}
          </h2>
          {config.cta.subtitle && (
            <p className="o-sub-label" style={{ textAlign: hasResponseBox ? "left" : "center" }}>
              {config.cta.subtitle}
            </p>
          )}

          {hasResponseBox ? (
            <ResponseBox
              question={config.cta.ctaQuestion!}
              companyName={config.companyName}
              slug={slug}
              emailSubject={config.cta.emailSubject}
              siteEmail={SITE.email}
            />
          ) : (
            <div className="o-cta-buttons">
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="o-btn-primary"
              >
                Scrivimi su WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="o-btn-secondary"
              >
                Inviami una mail
              </a>
            </div>
          )}

          {config.cta.showGlitchEconomics && (
            <div style={{ marginTop: 40, textAlign: hasResponseBox ? "left" : "center" }}>
              <a
                href={SITE.glitchEconomicsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="o-economics-link"
              >
                Analizza i tuoi numeri con GLITCH Economics &rarr;
              </a>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="o-footer">
          <p>
            {SITE.name} &middot; {SITE.title} &middot;{" "}
            <a href={SITE.url}>nicolaserrao.com</a>
          </p>
        </footer>
      </div>
    </>
  );
}

/* ---------- V2 Section Renderer ---------- */
function SectionRenderer({ section }: { section: OutreachSection }) {
  if (section.type === "insight" && section.items) {
    return (
      <section className="o-section">
        {section.title && <div className="o-eyebrow">{section.title}</div>}
        <div className="o-insight-list">
          {section.items.map((item, i) => (
            <div key={i} className="o-insight-card o-card-bg">
              <span className="o-insight-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="o-insight-title">{item.title}</div>
                <p className="o-insight-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "teaser" && section.items) {
    return (
      <section className="o-section">
        {section.title && <h2 className="o-h2">{section.title}</h2>}
        {section.subtitle && (
          <p className="o-sub-label">{section.subtitle}</p>
        )}
        <div className="o-grid-3">
          {section.items.map((item, i) => (
            <div key={i} className="o-teaser-card o-card-bg">
              <div className="o-teaser-title">{item.title}</div>
              <p className="o-teaser-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="o-section">
      {section.title && <h2 className="o-h2">{section.title}</h2>}
      {section.content && <p className="o-body">{section.content}</p>}

      {section.items && (
        <div className="o-grid-3">
          {section.items.map((item, i) => (
            <div key={i} className="o-grid-card o-card-bg">
              <div className="o-grid-card-title">{item.title}</div>
              <p className="o-grid-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {section.metrics && (
        <div className="o-metrics-grid">
          {section.metrics.map((m, i) => (
            <div key={i} className="o-metric-card o-card-bg">
              <div className="o-metric-value">{m.value}</div>
              <div className="o-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Utility ---------- */
function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
