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

const NS_CREDENTIALS = [
  { value: "30+", label: "Clienti gestiti" },
  { value: "5M+", label: "Budget Ads" },
  { value: "+200%", label: "Fatturato (caso reale)" },
];

const NS_TAGS = [
  "Strategia",
  "Digital ADV",
  "E-commerce",
  "CRO",
  "Lead Gen",
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
   V3 TEMPLATE — Professional landing page with two-column layout
   ============================================================ */

function OutreachV3({ config, slug }: { config: OutreachConfig; slug: string }) {
  const isLightBg = isLight(config.palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;

  /* Split pitch into short paragraphs for the left column */
  const pitchParagraphs = config.pitch!.split("\n\n");

  /* Split urgency text */
  const urgencyParagraphs = config.urgencyText
    ? config.urgencyText.split("\n\n")
    : [];

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{v3Styles(config, isLightBg)}</style>

      <div className="v3">
        {/* ═══════════════════════════════════════════
            SECTION 1 — NICOLA INTRO (dark, compact)
            Two-column: credentials left, photo right
        ═══════════════════════════════════════════ */}
        <section className="v3-intro">
          <div className="v3-intro-grid">
            <div className="v3-intro-left">
              <p className="v3-intro-name">Nicola Serrao</p>
              <p className="v3-intro-role">Digital Marketing Strategist</p>
              <div className="v3-intro-stats">
                {NS_CREDENTIALS.map((c) => (
                  <div key={c.label} className="v3-stat">
                    <span className="v3-stat-value">{c.value}</span>
                    <span className="v3-stat-label">{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="v3-intro-tags">
                {NS_TAGS.map((t) => (
                  <span key={t} className="v3-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="v3-intro-right">
              <div className="v3-photo-wrap">
                <Image
                  src="/images/nicola.png"
                  alt="Nicola Serrao"
                  width={160}
                  height={160}
                  priority
                  className="v3-photo"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            GLITCH DIVIDER
        ═══════════════════════════════════════════ */}
        <div className="v3-glitch" aria-hidden="true">
          <div className="v3-glitch-l v3-glitch-l1" />
          <div className="v3-glitch-l v3-glitch-l2" />
          <div className="v3-glitch-l v3-glitch-l3" />
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 2 — HERO (prospect style, wide)
            Company logo, headline, subtitle, instant CTA
        ═══════════════════════════════════════════ */}
        <section className="v3-ps v3-hero">
          <div className="v3-wide">
            {config.logo && (
              <div className="v3-hero-logo-wrap">
                <Image
                  src={config.logo}
                  alt={config.companyName}
                  width={44}
                  height={44}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <div className="v3-eyebrow">{config.sector}</div>
            <h1 className="v3-h1">{config.heroTitle}</h1>
            <p className="v3-hero-sub">{config.heroSubtitle}</p>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="v3-cta-btn"
            >
              Scrivimi &rarr;
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3 — PITCH (two-column: text left, visual right)
            Alternating blocks, no walls of text
        ═══════════════════════════════════════════ */}
        <section className="v3-ps v3-pitch-section">
          <div className="v3-wide">
            <div className="v3-split">
              <div className="v3-split-text">
                {pitchParagraphs.map((para, i) => (
                  <p key={i} className="v3-pitch-p">{para}</p>
                ))}
              </div>
              <div className="v3-split-visual">
                <div className="v3-accent-block">
                  <div className="v3-accent-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <p className="v3-accent-label">Opportunit&agrave; identificate</p>
                  <p className="v3-accent-desc">
                    Analisi approfondita del vostro posizionamento digitale, competitor e potenziale di crescita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4 — COMPETENZE (3 boxes, two-col alternating)
        ═══════════════════════════════════════════ */}
        {config.boxes && config.boxes.length > 0 && (
          <section className="v3-ps v3-competenze">
            <div className="v3-wide">
              {config.boxes.map((box, i) => (
                <div
                  key={i}
                  className={`v3-comp-row ${i % 2 !== 0 ? "v3-comp-row--rev" : ""}`}
                >
                  <div className="v3-comp-text">
                    <span className="v3-comp-num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="v3-comp-title">{box.title}</h3>
                    <p className="v3-comp-desc">{box.description}</p>
                  </div>
                  <div className="v3-comp-visual">
                    {box.image ? (
                      <Image
                        src={box.image}
                        alt={box.title}
                        width={400}
                        height={260}
                        className="v3-comp-img"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="v3-comp-placeholder">
                        <div className="v3-comp-ph-icon">{getBoxIcon(i)}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            SECTION 5 — URGENCY CTA
        ═══════════════════════════════════════════ */}
        <section className="v3-ps v3-urgency">
          <div className="v3-narrow">
            {urgencyParagraphs.length > 0 && (
              <div className="v3-urgency-copy">
                {urgencyParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === urgencyParagraphs.length - 1
                        ? "v3-urgency-closing"
                        : "v3-urgency-p"
                    }
                  >
                    {para}
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
              <div className="v3-cta-group">
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                  className="v3-cta-btn"
                >
                  Scrivimi via email
                </a>
                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-cta-btn-ghost"
                >
                  Scrivimi su WhatsApp
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            GLITCH DIVIDER 2
        ═══════════════════════════════════════════ */}
        <div className="v3-glitch v3-glitch--rev" aria-hidden="true">
          <div className="v3-glitch-l v3-glitch-l1" />
          <div className="v3-glitch-l v3-glitch-l2" />
          <div className="v3-glitch-l v3-glitch-l3" />
        </div>

        {/* ═══════════════════════════════════════════
            FOOTER (Nicola style)
        ═══════════════════════════════════════════ */}
        <footer className="v3-footer">
          <div className="v3-footer-cta">
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-ns-btn"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="v3-ns-btn-ghost"
            >
              Email
            </a>
          </div>
          <p className="v3-footer-credit">
            {SITE.name} &middot; {SITE.title} &middot;{" "}
            <a href={SITE.url}>nicolaserrao.com</a>
          </p>
        </footer>
      </div>
    </>
  );
}

/* ---------- Box icons (when no image provided) ---------- */
function getBoxIcon(index: number) {
  const icons = [
    /* Creatività & Comunicazione */
    <svg key="0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      <path d="M10 21h4" />
    </svg>,
    /* Conversione & CRO */
    <svg key="1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>,
    /* Strategia Full Funnel */
    <svg key="2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3h18v4l-6.5 7V21l-5-3v-4L3 7V3z" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

/* ---------- V3 Styles ---------- */
function v3Styles(config: OutreachConfig, isLightBg: boolean): string {
  const btnTextColor = isLightBg ? "#fff" : config.palette.background;
  return `
    /* === RESET & BASE === */
    .v3 {
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      min-height: 100vh;
    }

    /* === LAYOUT CONTAINERS === */
    .v3-wide {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 60px;
    }
    .v3-narrow {
      max-width: 700px;
      margin: 0 auto;
      padding: 0 60px;
    }

    /* ═══════════════════════════════════════════
       SECTION 1 — NICOLA INTRO
    ═══════════════════════════════════════════ */
    .v3-intro {
      background: ${NS.bg};
      color: ${NS.text};
      padding: 48px 60px 40px;
    }
    .v3-intro-grid {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 48px;
      align-items: center;
    }
    .v3-intro-name {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 700;
      color: ${NS.text};
      margin-bottom: 2px;
    }
    .v3-intro-role {
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: ${NS.primary};
      margin-bottom: 20px;
    }
    .v3-intro-stats {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }
    .v3-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .v3-stat-value {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      color: ${NS.primary};
      line-height: 1;
    }
    .v3-stat-label {
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: ${NS.textDim};
    }
    .v3-intro-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .v3-tag {
      font-size: 8px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 100px;
      border: 1px solid ${NS.border};
      color: ${NS.textDim};
    }
    .v3-intro-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v3-photo-wrap {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid ${NS.border};
      flex-shrink: 0;
    }
    .v3-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    /* ═══════════════════════════════════════════
       GLITCH DIVIDER
    ═══════════════════════════════════════════ */
    .v3-glitch {
      position: relative;
      height: 40px;
      overflow: hidden;
      background: linear-gradient(180deg, ${NS.bg} 0%, ${config.palette.background} 100%);
    }
    .v3-glitch--rev {
      background: linear-gradient(180deg, ${config.palette.background} 0%, ${NS.bg} 100%);
    }
    .v3-glitch-l {
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
    }
    .v3-glitch-l1 {
      top: 30%;
      background: ${NS.primary};
      opacity: 0.6;
      animation: gShift1 3s ease-in-out infinite;
    }
    .v3-glitch-l2 {
      top: 50%;
      background: ${config.palette.primary};
      opacity: 0.4;
      animation: gShift2 2.5s ease-in-out infinite 0.3s;
    }
    .v3-glitch-l3 {
      top: 70%;
      background: ${NS.primary};
      opacity: 0.25;
      animation: gShift3 4s ease-in-out infinite 0.7s;
    }
    @keyframes gShift1 {
      0%,100% { transform: translateX(0); opacity: 0.6; }
      10% { transform: translateX(-30%); opacity: 1; }
      12% { transform: translateX(0); opacity: 0.6; }
      60% { transform: translateX(25%); opacity: 1; }
      62% { transform: translateX(0); opacity: 0.6; }
    }
    @keyframes gShift2 {
      0%,100% { transform: translateX(0) scaleX(1); }
      15% { transform: translateX(20%) scaleX(0.6); }
      17% { transform: translateX(0) scaleX(1); }
      55% { transform: translateX(-15%) scaleX(0.8); }
      57% { transform: translateX(0) scaleX(1); }
    }
    @keyframes gShift3 {
      0%,100% { transform: translateX(0); }
      20% { transform: translateX(10%); }
      22% { transform: translateX(0); }
      70% { transform: translateX(-5%); }
      72% { transform: translateX(0); }
    }

    /* ═══════════════════════════════════════════
       PROSPECT SECTIONS (shared)
    ═══════════════════════════════════════════ */
    .v3-ps {
      --o-primary: ${config.palette.primary};
      --o-primary-dim: ${config.palette.primaryDim};
      --o-bg: ${config.palette.background};
      --o-text: ${config.palette.text};
      --o-text-dim: ${config.palette.textDim};
      --o-border: ${config.palette.border};
      background: ${config.palette.background};
      color: ${config.palette.text};
    }

    /* ═══════════════════════════════════════════
       SECTION 2 — HERO
    ═══════════════════════════════════════════ */
    .v3-hero {
      padding: 80px 0 72px;
      text-align: center;
    }
    .v3-hero-logo-wrap {
      margin-bottom: 24px;
      display: inline-block;
    }
    .v3-eyebrow {
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--o-primary);
      margin-bottom: 20px;
    }
    .v3-h1 {
      font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(32px, 5vw, 52px);
      font-weight: 700;
      line-height: 1.1;
      color: var(--o-text);
      margin-bottom: 20px;
    }
    .v3-hero-sub {
      font-size: 15px;
      line-height: 1.75;
      color: var(--o-text-dim);
      max-width: 580px;
      margin: 0 auto 36px;
    }

    /* ═══════════════════════════════════════════
       BUTTONS
    ═══════════════════════════════════════════ */
    .v3-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 32px;
      border-radius: 5px;
      text-decoration: none;
      transition: opacity 0.2s, transform 0.2s;
      background: var(--o-primary);
      color: ${btnTextColor};
    }
    .v3-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }
    .v3-cta-btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 32px;
      border-radius: 5px;
      border: 1px solid var(--o-border);
      text-decoration: none;
      transition: all 0.2s;
      color: var(--o-primary);
      background: transparent;
    }
    .v3-cta-btn-ghost:hover { transform: translateY(-2px); }
    .v3-cta-group {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .v3-ns-btn {
      display: inline-flex;
      align-items: center;
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
    .v3-ns-btn:hover { opacity: 0.85; transform: translateY(-2px); }
    .v3-ns-btn-ghost {
      display: inline-flex;
      align-items: center;
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
    .v3-ns-btn-ghost:hover { transform: translateY(-2px); }

    /* ═══════════════════════════════════════════
       SECTION 3 — PITCH (two-column split)
    ═══════════════════════════════════════════ */
    .v3-pitch-section {
      padding: 72px 0;
    }
    .v3-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }
    .v3-split-text {}
    .v3-pitch-p {
      font-size: 15px;
      line-height: 1.85;
      color: var(--o-text-dim);
      margin-bottom: 18px;
    }
    .v3-pitch-p:last-child { margin-bottom: 0; }

    .v3-split-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v3-accent-block {
      padding: 36px 32px;
      border-radius: 16px;
      border: 1px solid var(--o-border);
      background: ${isLightBg ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)"};
      text-align: center;
    }
    .v3-accent-icon {
      color: var(--o-primary);
      margin-bottom: 16px;
    }
    .v3-accent-label {
      font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 700;
      color: var(--o-text);
      margin-bottom: 8px;
    }
    .v3-accent-desc {
      font-size: 12px;
      line-height: 1.7;
      color: var(--o-text-dim);
    }

    /* ═══════════════════════════════════════════
       SECTION 4 — COMPETENZE (alternating rows)
    ═══════════════════════════════════════════ */
    .v3-competenze {
      padding: 48px 0 72px;
    }
    .v3-comp-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
      margin-bottom: 64px;
    }
    .v3-comp-row:last-child { margin-bottom: 0; }
    .v3-comp-row--rev {
      direction: rtl;
    }
    .v3-comp-row--rev > * {
      direction: ltr;
    }
    .v3-comp-num {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--o-primary);
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    .v3-comp-title {
      font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--o-text);
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .v3-comp-desc {
      font-size: 14px;
      line-height: 1.85;
      color: var(--o-text-dim);
    }
    .v3-comp-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v3-comp-img {
      border-radius: 12px;
      width: 100%;
      max-height: 280px;
      object-fit: cover;
    }
    .v3-comp-placeholder {
      width: 100%;
      aspect-ratio: 16/10;
      border-radius: 16px;
      border: 1px solid var(--o-border);
      background: ${isLightBg ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)"};
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .v3-comp-ph-icon {
      color: var(--o-primary);
      opacity: 0.5;
    }

    /* ═══════════════════════════════════════════
       SECTION 5 — URGENCY CTA
    ═══════════════════════════════════════════ */
    .v3-urgency {
      padding: 72px 0 80px;
      text-align: center;
    }
    .v3-urgency-copy {
      text-align: left;
      margin-bottom: 40px;
    }
    .v3-urgency-p {
      font-size: 15px;
      line-height: 1.85;
      color: var(--o-text-dim);
      margin-bottom: 16px;
    }
    .v3-urgency-closing {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 18px;
      font-style: italic;
      color: var(--o-text);
      margin-bottom: 0;
    }

    /* ═══════════════════════════════════════════
       FOOTER
    ═══════════════════════════════════════════ */
    .v3-footer {
      background: ${NS.bg};
      padding: 40px 60px 24px;
      text-align: center;
    }
    .v3-footer-cta {
      display: flex;
      gap: 14px;
      justify-content: center;
      margin-bottom: 28px;
    }
    .v3-footer-credit {
      font-size: 10px;
      letter-spacing: 1px;
      color: ${NS.textDim};
      border-top: 1px solid ${NS.border};
      padding-top: 20px;
    }
    .v3-footer-credit a {
      color: ${NS.primary};
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .v3-footer-credit a:hover { opacity: 0.7; }

    /* ═══════════════════════════════════════════
       RESPONSIVE
    ═══════════════════════════════════════════ */
    @media (max-width: 900px) {
      .v3-intro { padding: 36px 32px 32px; }
      .v3-intro-grid { gap: 28px; }
      .v3-wide, .v3-narrow { padding: 0 32px; }
      .v3-split { grid-template-columns: 1fr; gap: 36px; }
      .v3-comp-row { grid-template-columns: 1fr; gap: 28px; }
      .v3-comp-row--rev { direction: ltr; }
      .v3-comp-visual { order: -1; }
      .v3-footer { padding: 32px 32px 20px; }
    }
    @media (max-width: 640px) {
      .v3-intro { padding: 28px 20px 24px; }
      .v3-intro-grid {
        grid-template-columns: 1fr auto;
        gap: 16px;
      }
      .v3-photo-wrap { width: 72px; height: 72px; }
      .v3-intro-stats { gap: 16px; }
      .v3-stat-value { font-size: 16px; }
      .v3-intro-tags { display: none; }
      .v3-wide, .v3-narrow { padding: 0 20px; }
      .v3-hero { padding: 56px 0 48px; }
      .v3-pitch-section { padding: 48px 0; }
      .v3-competenze { padding: 36px 0 48px; }
      .v3-comp-row { margin-bottom: 40px; }
      .v3-urgency { padding: 48px 0 56px; }
      .v3-cta-group { flex-direction: column; }
      .v3-cta-btn, .v3-cta-btn-ghost { justify-content: center; }
      .v3-footer { padding: 28px 20px 16px; }
      .v3-footer-cta { flex-direction: column; }
      .v3-ns-btn, .v3-ns-btn-ghost { justify-content: center; }
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
          background: ${isLightBg ? "rgba(255,255,255,0.9)" : "rgba(10,14,19,0.9)"};
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
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--o-text);
          margin-bottom: 16px;
        }
        .o-h2 {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--o-text);
          margin-bottom: 24px;
        }
        .o-h3 {
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
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
          font-family: ${config.headingFont ? `'${config.headingFont}', ` : ""}var(--font-playfair), 'Playfair Display', serif;
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
        .o-card-bg { background: ${isLightBg ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)"}; }

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
          color: ${isLightBg ? "#fff" : config.palette.background};
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
