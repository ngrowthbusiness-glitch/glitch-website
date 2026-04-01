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

/* ── Nicola's palette (fixed) ── */
const NS = {
  bg: "#0a0e0d",
  text: "#e8f0ff",
  textDim: "rgba(232,240,255,0.50)",
  textFaint: "rgba(232,240,255,0.30)",
  primary: "#00fffc",
  primaryDim: "rgba(0,255,252,0.08)",
  border: "rgba(0,255,252,0.12)",
} as const;

const NS_STATS = [
  { value: "30+", label: "Clienti gestiti" },
  { value: "5M+", label: "Budget Ads gestito" },
  { value: "+200%", label: "Fatturato (caso reale)" },
];

const NS_TAGS = ["Strategia", "Digital ADV", "E-commerce", "CRO", "Lead Gen"];

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getOutreachConfig(slug);
  if (!config) notFound();

  if (config.pitch) return <OutreachV3 config={config} slug={slug} />;
  return <OutreachV2 config={config} slug={slug} />;
}

/* ================================================================
   V3 TEMPLATE
   ================================================================ */

function OutreachV3({ config, slug }: { config: OutreachConfig; slug: string }) {
  const isLightBg = isLight(config.palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;
  const pitchParas = config.pitch!.split("\n\n");
  const urgencyParas = config.urgencyText ? config.urgencyText.split("\n\n") : [];

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{v3CSS(config, isLightBg)}</style>

      <div className="v3">

        {/* ────────────────────────────────────────────
            OPENER — Nicola (dark)
            ──────────────────────────────────────────── */}
        <section className="v3-opener">
          <div className="v3-opener-grid">
            {/* left: identity + stats */}
            <div className="v3-opener-left">
              <p className="v3-opener-name">Nicola Serrao</p>
              <p className="v3-opener-role">Digital Marketing Strategist</p>

              <div className="v3-opener-stats">
                {NS_STATS.map((s, i) => (
                  <div key={s.label} className="v3-opener-stat">
                    <span className="v3-opener-stat-val">{s.value}</span>
                    <span className="v3-opener-stat-lbl">{s.label}</span>
                    {i < NS_STATS.length - 1 && <span className="v3-opener-stat-div" />}
                  </div>
                ))}
              </div>

              <div className="v3-opener-tags">
                {NS_TAGS.map((t) => (
                  <span key={t} className="v3-opener-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* right: photo */}
            <div className="v3-opener-right">
              <div className="v3-photo-ring">
                <Image
                  src="/images/nicola.png"
                  alt="Nicola Serrao"
                  width={140}
                  height={140}
                  priority
                  className="v3-photo"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            GLITCH DIVIDER
            ──────────────────────────────────────────── */}
        <GlitchDivider from={NS.bg} to={config.palette.background} accent1={NS.primary} accent2={config.palette.primary} />

        {/* ────────────────────────────────────────────
            HERO — Prospect palette
            ──────────────────────────────────────────── */}
        <section className="v3-ps v3-hero">
          <div className="v3-container">
            {config.logo && (
              <div className="v3-hero-logo">
                <Image
                  src={config.logo}
                  alt={config.companyName}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <span className="v3-label">{config.sector}</span>
            <h1 className="v3-hero-h1">{config.heroTitle}</h1>
            <p className="v3-hero-sub">{config.heroSubtitle}</p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="v3-btn"
            >
              Scrivimi &rarr;
            </a>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            PITCH — Two columns: text + accent card
            ──────────────────────────────────────────── */}
        <section className="v3-ps v3-section">
          <div className="v3-container">
            <div className="v3-two-col">
              <div className="v3-col-text">
                <span className="v3-label">Cosa ho visto</span>
                <h2 className="v3-h2">
                  Ho studiato il vostro <em>progetto.</em>
                </h2>
                {pitchParas.map((p, i) => (
                  <p key={i} className="v3-body">{p}</p>
                ))}
              </div>
              <div className="v3-col-visual">
                <div className="v3-accent-card">
                  <svg className="v3-accent-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  <p className="v3-accent-title">Opportunit&agrave; concrete</p>
                  <p className="v3-accent-sub">Analisi del vostro posizionamento, competitor e potenziale di crescita nel digitale.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            COMPETENZE — Alternating rows
            ──────────────────────────────────────────── */}
        {config.boxes && config.boxes.length > 0 && (
          <section className="v3-ps v3-section v3-section--tight">
            <div className="v3-container">
              <div className="v3-section-header">
                <span className="v3-label">Cosa posso fare per voi</span>
                <h2 className="v3-h2">
                  Tre aree di <em>impatto.</em>
                </h2>
              </div>

              <div className="v3-boxes-stack">
                {config.boxes.map((box, i) => (
                  <div key={i} className={`v3-box-row ${i % 2 !== 0 ? "v3-box-row--flip" : ""}`}>
                    <div className="v3-box-content">
                      <span className="v3-box-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="v3-box-title">{box.title}</h3>
                      <p className="v3-box-desc">{box.description}</p>
                    </div>
                    <div className="v3-box-visual">
                      {box.image ? (
                        <Image
                          src={box.image}
                          alt={box.title}
                          width={480}
                          height={320}
                          className="v3-box-img"
                        />
                      ) : (
                        <div className="v3-box-placeholder">
                          <span className="v3-box-ph-icon">{getIcon(i)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────
            URGENCY + CTA
            ──────────────────────────────────────────── */}
        <section className="v3-ps v3-section v3-urgency">
          <div className="v3-container-narrow">
            {urgencyParas.length > 0 && (
              <div className="v3-urgency-copy">
                {urgencyParas.map((p, i) => (
                  <p
                    key={i}
                    className={i === urgencyParas.length - 1 ? "v3-urgency-closing" : "v3-body"}
                  >
                    {p}
                  </p>
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
              <div className="v3-cta-row">
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                  className="v3-btn"
                >
                  Scrivimi via email
                </a>
                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-btn-ghost"
                >
                  Scrivimi su WhatsApp
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ────────────────────────────────────────────
            GLITCH DIVIDER 2
            ──────────────────────────────────────────── */}
        <GlitchDivider from={config.palette.background} to={NS.bg} accent1={config.palette.primary} accent2={NS.primary} />

        {/* ────────────────────────────────────────────
            FOOTER — Nicola
            ──────────────────────────────────────────── */}
        <footer className="v3-footer">
          <div className="v3-footer-inner">
            <div className="v3-footer-buttons">
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="v3-footer-btn"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="v3-footer-btn-ghost"
              >
                Email
              </a>
            </div>
            <div className="v3-footer-line" />
            <p className="v3-footer-credit">
              {SITE.name} &middot; {SITE.title} &middot;{" "}
              <a href={SITE.url}>nicolaserrao.com</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ── Glitch divider component ── */
function GlitchDivider({ from, to, accent1, accent2 }: { from: string; to: string; accent1: string; accent2: string }) {
  return (
    <div
      className="v3-glitch"
      aria-hidden="true"
      style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    >
      <div className="v3-gl v3-gl1" style={{ background: accent1 }} />
      <div className="v3-gl v3-gl2" style={{ background: accent2 }} />
      <div className="v3-gl v3-gl3" style={{ background: accent1 }} />
    </div>
  );
}

/* ── Box icons (fallback when no image) ── */
function getIcon(i: number) {
  const icons = [
    <svg key="0" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" /><path d="M10 21h4" /></svg>,
    <svg key="1" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    <svg key="2" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 3h18v4l-6.5 7V21l-5-3v-4L3 7V3z" /></svg>,
  ];
  return icons[i] || icons[0];
}

/* ── V3 CSS ── */
function v3CSS(config: OutreachConfig, isLightBg: boolean): string {
  const cardBg = isLightBg ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.035)";
  const cardBorder = isLightBg ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const btnText = isLightBg ? "#fff" : config.palette.background;

  return `
    /* ── Base ── */
    .v3 {
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      min-height: 100vh;
    }

    /* ── Containers ── */
    .v3-container { max-width: 1140px; margin: 0 auto; padding: 0 60px; }
    .v3-container-narrow { max-width: 720px; margin: 0 auto; padding: 0 60px; }

    /* ── Shared prospect section ── */
    .v3-ps {
      --o-primary: ${config.palette.primary};
      --o-primary-dim: ${config.palette.primaryDim};
      --o-bg: ${config.palette.background};
      --o-text: ${config.palette.text};
      --o-text-dim: ${config.palette.textDim};
      --o-border: ${config.palette.border};
      background: var(--o-bg);
      color: var(--o-text);
    }

    /* ── Typography ── */
    .v3-label {
      display: block;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .v3-ps .v3-label { color: var(--o-primary); }

    .v3-hero-h1 {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(36px, 5.5vw, 56px);
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.02em;
      margin-bottom: 24px;
    }
    .v3-h2 {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(26px, 3.5vw, 38px);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.015em;
      margin-bottom: 20px;
    }
    .v3-h2 em {
      font-style: italic;
      color: var(--o-primary);
    }
    .v3-hero-sub {
      font-size: 15px;
      line-height: 1.75;
      color: var(--o-text-dim);
      max-width: 540px;
      margin: 0 auto 40px;
    }
    .v3-body {
      font-size: 14px;
      line-height: 1.9;
      color: var(--o-text-dim);
      margin-bottom: 16px;
      max-width: 520px;
    }
    .v3-body:last-child { margin-bottom: 0; }

    /* ══════════════════════════════════════════
       OPENER (Nicola)
    ══════════════════════════════════════════ */
    .v3-opener {
      background: ${NS.bg};
      color: ${NS.text};
      padding: 52px 60px 44px;
    }
    .v3-opener-grid {
      max-width: 1140px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 40px;
      align-items: center;
    }
    .v3-opener-name {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .v3-opener-role {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: ${NS.primary};
      margin-bottom: 24px;
    }
    .v3-opener-stats {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 20px;
    }
    .v3-opener-stat {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding-right: 24px;
      position: relative;
    }
    .v3-opener-stat-div {
      position: absolute;
      right: 0;
      top: 4px;
      bottom: 4px;
      width: 1px;
      background: ${NS.border};
    }
    .v3-opener-stat + .v3-opener-stat { padding-left: 24px; }
    .v3-opener-stat-val {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: ${NS.primary};
      line-height: 1;
      letter-spacing: -0.03em;
    }
    .v3-opener-stat-lbl {
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: ${NS.textDim};
    }
    .v3-opener-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .v3-opener-tag {
      font-size: 8px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
      border: 1px solid ${NS.border};
      color: ${NS.textDim};
    }
    .v3-opener-right { flex-shrink: 0; }
    .v3-photo-ring {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      padding: 3px;
      background: conic-gradient(${NS.primary} 0deg, transparent 120deg, ${NS.primary} 240deg, transparent 360deg);
      animation: photoSpin 8s linear infinite;
    }
    @keyframes photoSpin { to { transform: rotate(360deg); } }
    .v3-photo {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      display: block;
      border: 3px solid ${NS.bg};
    }

    /* ══════════════════════════════════════════
       GLITCH DIVIDER
    ══════════════════════════════════════════ */
    .v3-glitch {
      position: relative;
      height: 48px;
      overflow: hidden;
    }
    .v3-gl {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      opacity: 0;
    }
    .v3-gl1 { top: 30%; animation: gl1 4s ease-in-out infinite; }
    .v3-gl2 { top: 50%; animation: gl2 3s ease-in-out infinite 0.5s; }
    .v3-gl3 { top: 70%; animation: gl3 5s ease-in-out infinite 1s; }
    @keyframes gl1 {
      0%,88%,100% { opacity: 0; transform: translateX(0); }
      90% { opacity: 0.8; transform: translateX(-25%); }
      92% { opacity: 0.3; transform: translateX(12%); }
      94% { opacity: 0; transform: translateX(0); }
    }
    @keyframes gl2 {
      0%,84%,100% { opacity: 0; transform: scaleX(1); }
      86% { opacity: 0.6; transform: scaleX(0.5) translateX(30%); }
      88% { opacity: 0; transform: scaleX(1); }
    }
    @keyframes gl3 {
      0%,78%,100% { opacity: 0; }
      80% { opacity: 0.4; transform: translateX(15%); }
      82% { opacity: 0.2; transform: translateX(-20%); }
      84% { opacity: 0; transform: translateX(0); }
    }

    /* ══════════════════════════════════════════
       HERO
    ══════════════════════════════════════════ */
    .v3-hero {
      padding: 96px 0 80px;
      text-align: center;
    }
    .v3-hero-logo {
      display: inline-block;
      margin-bottom: 28px;
      opacity: 0.85;
    }

    /* ══════════════════════════════════════════
       BUTTONS
    ══════════════════════════════════════════ */
    .v3-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 16px 36px;
      border-radius: 100px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      background: var(--o-primary);
      color: ${btnText};
    }
    .v3-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 0 24px ${config.palette.primary}40;
    }
    .v3-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 16px 36px;
      border-radius: 100px;
      border: 1px solid ${cardBorder};
      text-decoration: none;
      transition: all 0.2s;
      color: var(--o-text-dim);
      background: transparent;
    }
    .v3-btn-ghost:hover {
      color: var(--o-text);
      border-color: var(--o-primary);
      background: var(--o-primary-dim);
    }
    .v3-cta-row {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* ══════════════════════════════════════════
       SECTIONS (generic)
    ══════════════════════════════════════════ */
    .v3-section {
      padding: 96px 0;
    }
    .v3-section--tight {
      padding-top: 48px;
    }
    .v3-section-header {
      text-align: center;
      margin-bottom: 64px;
    }

    /* ── Two-column split ── */
    .v3-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
      align-items: center;
    }

    /* ── Accent card (visual column) ── */
    .v3-accent-card {
      padding: 44px 36px;
      border-radius: 24px;
      border: 1px solid ${cardBorder};
      background: ${cardBg};
      text-align: center;
    }
    .v3-accent-icon {
      color: var(--o-primary);
      margin-bottom: 20px;
    }
    .v3-accent-title {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--o-text);
      margin-bottom: 10px;
    }
    .v3-accent-sub {
      font-size: 12px;
      line-height: 1.75;
      color: var(--o-text-dim);
      max-width: 280px;
      margin: 0 auto;
    }

    /* ══════════════════════════════════════════
       BOXES (alternating rows)
    ══════════════════════════════════════════ */
    .v3-boxes-stack {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }
    .v3-box-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
      align-items: center;
      padding: 48px;
      border-radius: 28px;
      border: 1px solid ${cardBorder};
      background: ${cardBg};
      transition: border-color 0.3s;
    }
    .v3-box-row:hover {
      border-color: ${config.palette.primary}30;
    }
    .v3-box-row--flip { direction: rtl; }
    .v3-box-row--flip > * { direction: ltr; }

    .v3-box-num {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--o-primary);
      margin-bottom: 12px;
    }
    .v3-box-title {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--o-text);
      margin-bottom: 14px;
    }
    .v3-box-desc {
      font-size: 13px;
      line-height: 1.85;
      color: var(--o-text-dim);
    }
    .v3-box-visual { display: flex; align-items: center; justify-content: center; }
    .v3-box-img {
      width: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
    .v3-box-placeholder {
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: 20px;
      border: 1px solid ${cardBorder};
      background: ${isLightBg ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.02)"};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v3-box-ph-icon { color: var(--o-primary); opacity: 0.3; }

    /* ══════════════════════════════════════════
       URGENCY
    ══════════════════════════════════════════ */
    .v3-urgency {
      text-align: center;
      padding: 80px 0 96px;
    }
    .v3-urgency-copy {
      text-align: left;
      margin-bottom: 48px;
    }
    .v3-urgency-closing {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 19px;
      font-style: italic;
      color: var(--o-text);
      line-height: 1.6;
      margin-top: 8px;
    }

    /* ══════════════════════════════════════════
       FOOTER
    ══════════════════════════════════════════ */
    .v3-footer {
      background: ${NS.bg};
      color: ${NS.text};
      padding: 48px 60px 28px;
    }
    .v3-footer-inner {
      max-width: 1140px;
      margin: 0 auto;
      text-align: center;
    }
    .v3-footer-buttons {
      display: flex;
      gap: 14px;
      justify-content: center;
      margin-bottom: 32px;
    }
    .v3-footer-btn {
      display: inline-flex;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 100px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      background: ${NS.primary};
      color: ${NS.bg};
    }
    .v3-footer-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 0 20px ${NS.primary}40;
    }
    .v3-footer-btn-ghost {
      display: inline-flex;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 100px;
      border: 1px solid ${NS.border};
      text-decoration: none;
      transition: all 0.2s;
      color: ${NS.textDim};
    }
    .v3-footer-btn-ghost:hover {
      color: ${NS.text};
      border-color: ${NS.primary};
    }
    .v3-footer-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, ${NS.border}, transparent);
      margin-bottom: 20px;
    }
    .v3-footer-credit {
      font-size: 10px;
      letter-spacing: 1px;
      color: ${NS.textFaint};
    }
    .v3-footer-credit a {
      color: ${NS.primary};
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .v3-footer-credit a:hover { opacity: 0.7; }

    /* ══════════════════════════════════════════
       RESPONSIVE
    ══════════════════════════════════════════ */
    @media (max-width: 1024px) {
      .v3-container { padding: 0 40px; }
      .v3-container-narrow { padding: 0 40px; }
      .v3-opener { padding: 40px 40px 36px; }
      .v3-two-col { gap: 48px; }
      .v3-box-row { gap: 40px; padding: 36px; }
    }

    @media (max-width: 768px) {
      .v3-container, .v3-container-narrow { padding: 0 28px; }
      .v3-opener { padding: 32px 28px; }
      .v3-opener-grid { gap: 20px; }

      .v3-hero { padding: 64px 0 56px; }
      .v3-section { padding: 64px 0; }
      .v3-urgency { padding: 56px 0 64px; }

      .v3-two-col { grid-template-columns: 1fr; gap: 36px; }
      .v3-box-row {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 28px;
        border-radius: 20px;
      }
      .v3-box-row--flip { direction: ltr; }
      .v3-box-visual { order: -1; }

      .v3-section-header { margin-bottom: 40px; }
      .v3-footer { padding: 36px 28px 20px; }
    }

    @media (max-width: 480px) {
      .v3-container, .v3-container-narrow { padding: 0 20px; }
      .v3-opener { padding: 24px 20px; }
      .v3-opener-grid { grid-template-columns: 1fr auto; gap: 12px; }
      .v3-photo-ring { width: 64px; height: 64px; }
      .v3-opener-stats { flex-wrap: wrap; gap: 12px; }
      .v3-opener-stat { padding-right: 16px; }
      .v3-opener-stat + .v3-opener-stat { padding-left: 16px; }
      .v3-opener-stat-val { font-size: 18px; }
      .v3-opener-tags { display: none; }

      .v3-hero { padding: 48px 0 40px; }
      .v3-section { padding: 48px 0; }
      .v3-box-row { padding: 24px; }

      .v3-cta-row { flex-direction: column; }
      .v3-btn, .v3-btn-ghost { justify-content: center; width: 100%; }
      .v3-footer { padding: 28px 20px 16px; }
      .v3-footer-buttons { flex-direction: column; }
      .v3-footer-btn, .v3-footer-btn-ghost { justify-content: center; }
      .v3-glitch { height: 32px; }
    }
  `;
}

/* ── Helper: heading font prefix ── */
function hf(c: OutreachConfig): string {
  return c.headingFont ? `'${c.headingFont}', ` : "";
}

/* ================================================================
   V2 TEMPLATE (legacy, unchanged)
   ================================================================ */

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
        .o-header {
          position: sticky; top: 0; z-index: 50;
          padding: 16px 60px;
          display: flex; align-items: center; justify-content: space-between;
          background: ${isLightBg ? "rgba(255,255,255,0.9)" : "rgba(10,14,19,0.9)"};
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--o-border);
        }
        .o-header-left, .o-header-right { display: flex; align-items: center; gap: 12px; }
        .o-header-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--o-text-dim); }
        .o-section { max-width: 900px; margin: 0 auto; padding: 48px 60px; }
        .o-section-hero { padding-top: 80px; padding-bottom: 64px; }
        .o-eyebrow { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--o-primary); margin-bottom: 16px; }
        .o-h1 { font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif; font-size: clamp(32px, 5vw, 48px); font-weight: 700; line-height: 1.1; color: var(--o-text); margin-bottom: 16px; }
        .o-h2 { font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--o-text); margin-bottom: 24px; }
        .o-h3 { font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif; font-size: 30px; font-weight: 700; color: var(--o-text); margin-bottom: 16px; }
        .o-subtitle { font-size: 16px; line-height: 1.6; color: var(--o-text-dim); margin-bottom: 12px; }
        .o-tagline { font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif; font-style: italic; font-size: 14px; color: var(--o-text-dim); }
        .o-body { font-size: 14px; line-height: 1.85; color: var(--o-text-dim); margin-bottom: 24px; }
        .o-sub-label { font-size: 13px; color: var(--o-text-dim); margin-bottom: 24px; }
        .o-card-bg { background: ${isLightBg ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)"}; }
        .o-insight-list { display: flex; flex-direction: column; gap: 16px; }
        .o-insight-card { display: flex; gap: 16px; padding: 20px; border-radius: 12px; border: 1px solid var(--o-border); }
        .o-insight-num { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--o-primary); flex-shrink: 0; }
        .o-insight-title { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--o-text); margin-bottom: 4px; }
        .o-insight-desc { font-size: 12px; line-height: 1.7; color: var(--o-text-dim); }
        .o-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .o-grid-card { padding: 24px; border-radius: 12px; border: 1px solid var(--o-border); }
        .o-grid-card-title { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--o-text); margin-bottom: 8px; }
        .o-grid-card-desc { font-size: 12px; line-height: 1.7; color: var(--o-text-dim); }
        .o-teaser-card { padding: 20px; border-radius: 12px; border-left: 2px solid var(--o-primary); }
        .o-teaser-title { font-size: 14px; font-weight: 700; color: var(--o-text); margin-bottom: 4px; }
        .o-teaser-desc { font-size: 12px; line-height: 1.7; color: var(--o-text-dim); }
        .o-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .o-metric-card { padding: 20px; border-radius: 12px; border: 1px solid var(--o-border); text-align: center; }
        .o-metric-value { font-size: 18px; font-weight: 700; color: var(--o-primary); }
        .o-metric-label { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; color: var(--o-text-dim); }
        .o-btn-primary { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; border-radius: 5px; text-decoration: none; transition: opacity 0.2s, transform 0.2s; background: var(--o-primary); color: ${isLightBg ? "#fff" : config.palette.background}; }
        .o-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .o-btn-secondary { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; border-radius: 5px; border: 1px solid var(--o-border); text-decoration: none; transition: all 0.2s; color: var(--o-primary); background: transparent; }
        .o-btn-secondary:hover { transform: translateY(-2px); }
        .o-cta-buttons { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .o-economics-link { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; color: var(--o-text-dim); transition: opacity 0.2s; }
        .o-economics-link:hover { opacity: 0.7; }
        .o-footer { text-align: center; padding: 24px; font-size: 10px; letter-spacing: 1px; color: var(--o-text-dim); border-top: 1px solid var(--o-border); }
        .o-footer a { color: var(--o-primary); text-decoration: none; transition: opacity 0.2s; }
        .o-footer a:hover { opacity: 0.7; }
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
        <header className="o-header">
          <div className="o-header-left">
            {config.logo && <Image src={config.logo} alt={config.companyName} width={32} height={32} style={{ objectFit: "contain" }} />}
            <span className="o-header-label">{config.companyName}</span>
          </div>
          <div className="o-header-right">
            <Image src="/favicon.png" alt="NS" width={20} height={20} style={{ objectFit: "contain" }} />
            <span className="o-header-label">Nicola Serrao</span>
          </div>
        </header>

        <section className="o-section o-section-hero">
          <div className="o-eyebrow">{config.sector}</div>
          <h1 className="o-h1">{config.heroTitle}</h1>
          <p className="o-subtitle">{config.heroSubtitle}</p>
          {config.heroTagline && <p className="o-tagline">{config.heroTagline}</p>}
        </section>

        {config.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        <section className="o-section">
          <h2 className="o-h3" style={{ textAlign: hasResponseBox ? "left" : "center" }}>{config.cta.title}</h2>
          {config.cta.subtitle && <p className="o-sub-label" style={{ textAlign: hasResponseBox ? "left" : "center" }}>{config.cta.subtitle}</p>}
          {hasResponseBox ? (
            <ResponseBox question={config.cta.ctaQuestion!} companyName={config.companyName} slug={slug} emailSubject={config.cta.emailSubject} siteEmail={SITE.email} />
          ) : (
            <div className="o-cta-buttons">
              <a href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`} target="_blank" rel="noopener noreferrer" className="o-btn-primary">Scrivimi su WhatsApp</a>
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`} className="o-btn-secondary">Inviami una mail</a>
            </div>
          )}
          {config.cta.showGlitchEconomics && (
            <div style={{ marginTop: 40, textAlign: hasResponseBox ? "left" : "center" }}>
              <a href={SITE.glitchEconomicsUrl} target="_blank" rel="noopener noreferrer" className="o-economics-link">Analizza i tuoi numeri con GLITCH Economics &rarr;</a>
            </div>
          )}
        </section>

        <footer className="o-footer">
          <p>{SITE.name} &middot; {SITE.title} &middot; <a href={SITE.url}>nicolaserrao.com</a></p>
        </footer>
      </div>
    </>
  );
}

function SectionRenderer({ section }: { section: OutreachSection }) {
  if (section.type === "insight" && section.items) {
    return (
      <section className="o-section">
        {section.title && <div className="o-eyebrow">{section.title}</div>}
        <div className="o-insight-list">
          {section.items.map((item, i) => (
            <div key={i} className="o-insight-card o-card-bg">
              <span className="o-insight-num">{String(i + 1).padStart(2, "0")}</span>
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
        {section.subtitle && <p className="o-sub-label">{section.subtitle}</p>}
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

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
