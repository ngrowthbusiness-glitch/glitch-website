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

const NS_TAGS = ["Strategia", "Digital ADV", "E-commerce", "CRO", "Lead Gen"];

const NAV_ITEMS = [
  { label: "Chi sono", anchor: "chi-sono" },
  { label: "Il progetto", anchor: "il-progetto" },
  { label: "Competenze", anchor: "competenze" },
  { label: "Parliamone", anchor: "parliamone" },
];

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
   V3 TEMPLATE — inspired by old PHP outreach pages
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
        {/* Background glow */}
        <div className="v3-bg-glow" aria-hidden="true" />

        {/* ────────────────────────────────────────────
            NAVBAR
            ──────────────────────────────────────────── */}
        <nav className="v3-nav">
          <div className="v3-nav-inner">
            <div className="v3-nav-left">
              <Image
                src="/favicon.png"
                alt="NS"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="v3-nav-right">
              {NAV_ITEMS.map((item) => (
                <a key={item.anchor} href={`#${item.anchor}`} className="v3-nav-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ────────────────────────────────────────────
            SEZIONE 1 — OPENER (Nicola Hero)
            Layout 60/40: testo + foto
            ──────────────────────────────────────────── */}
        <section className="v3-opener" id="chi-sono">
          <div className="v3-opener-grid">
            {/* LEFT: identity */}
            <div className="v3-opener-left">
              <div className="v3-opener-logo-row">
                <Image
                  src="/favicon.png"
                  alt="NS"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="v3-eyebrow">Digital Marketing Strategist</div>
              <h1 className="v3-opener-name">Nicola Serrao</h1>
              <p className="v3-opener-intro">
                Ho fatto un lavoro per te e credo ti possa tornare utile.
              </p>
              <div className="v3-opener-tags">
                {NS_TAGS.map((t) => (
                  <span key={t} className="v3-opener-tag">{t}</span>
                ))}
              </div>
              <a href="#il-progetto" className="v3-scroll-cta">
                <span className="v3-scroll-line" />
                <span className="v3-scroll-label">scopri il lavoro</span>
              </a>
            </div>

            {/* RIGHT: photo */}
            <div className="v3-opener-right">
              <div className="v3-photo-wrap">
                <Image
                  src="/images/nicola.png"
                  alt="Nicola Serrao"
                  width={320}
                  height={400}
                  priority
                  className="v3-photo"
                />
                <div className="v3-photo-bar">
                  <span className="v3-photo-bar-dot" />
                  <span className="v3-photo-bar-text">Sto lavorando al vostro progetto</span>
                </div>
              </div>
              <div className="v3-photo-caption">
                Nicola Serrao
                <span>Digital Marketing Strategist</span>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            GLITCH ZONE 1
            ──────────────────────────────────────────── */}
        <GlitchZone
          from={NS.bg}
          to={config.palette.background}
          accent={NS.primary}
          label="// il lavoro che ho fatto per voi"
          id="il-progetto"
        />

        {/* ────────────────────────────────────────────
            SEZIONE 2 — PROSPECT
            ──────────────────────────────────────────── */}
        <div className="v3-prospect">
          {/* Prospect topbar — sticky */}
          <div className="v3-p-topbar">
            <div className="v3-p-topbar-inner">
              {config.logo ? (
                <Image
                  src={config.logo}
                  alt={config.companyName}
                  width={140}
                  height={38}
                  style={{ objectFit: "contain", display: "block" }}
                />
              ) : (
                <span className="v3-p-topbar-brand">{config.companyName}</span>
              )}
              <span className="v3-p-topbar-tag">
                Studio realizzato da Nicola Serrao &middot; nicolaserrao.com
              </span>
            </div>
          </div>

          {/* Intro */}
          <section className="v3-p-intro">
            <div className="v3-container">
              <div className="v3-p-eyebrow">{config.sector}</div>
              <h2 className="v3-p-headline">
                {config.heroTitle}
              </h2>
              <p className="v3-p-sub">{config.heroSubtitle}</p>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="v3-p-btn"
              >
                Scrivimi <span className="v3-btn-arr" />
              </a>
            </div>
          </section>

          {/* Pitch — 2 colonne: testo + card visiva */}
          <section className="v3-pitch">
            <div className="v3-pitch-grid">
              <div className="v3-pitch-left">
                <div className="v3-p-eyebrow">Cosa ho visto</div>
                <h3 className="v3-pitch-h">
                  Ho studiato il vostro <em>progetto.</em>
                </h3>
                {pitchParas.map((p, i) => (
                  <p key={i} className="v3-pitch-body">{p}</p>
                ))}
              </div>
              <div className="v3-pitch-right">
                <div className="v3-pitch-card">
                  <svg className="v3-pitch-card-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <p className="v3-pitch-card-title">Opportunit&agrave; concrete</p>
                  <p className="v3-pitch-card-sub">
                    Analisi del vostro posizionamento, competitor e potenziale di crescita nel digitale.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillars — 3 card */}
          {config.boxes && config.boxes.length > 0 && (
            <section className="v3-pillars" id="competenze">
              <div className="v3-container">
                <div className="v3-pillars-header">
                  <div className="v3-p-eyebrow v3-p-eyebrow--center">Cosa posso fare per voi</div>
                  <h3 className="v3-pillars-headline">
                    Tre aree di <em>impatto.</em>
                  </h3>
                </div>
                <div className="v3-pillars-grid">
                  {config.boxes.map((box, i) => (
                    <div key={i} className={`v3-pillar v3-pc${i + 1}`}>
                      <div className="v3-pillar-num">Pilastro {String(i + 1).padStart(2, "0")}</div>
                      <div className="v3-pillar-icon">{getIcon(i)}</div>
                      <h4 className="v3-pillar-title">{box.title}</h4>
                      <p className="v3-pillar-body">{box.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* ────────────────────────────────────────────
            GLITCH ZONE 2
            ──────────────────────────────────────────── */}
        <GlitchZone
          from={config.palette.background}
          to={NS.bg}
          accent={NS.primary}
          label="// e queste sono solo alcune delle idee"
        />

        {/* ────────────────────────────────────────────
            SEZIONE 3 — CHIUSURA (Nicola)
            Layout 60/40: testo con frecce + foto
            ──────────────────────────────────────────── */}
        <section className="v3-close" id="parliamone">
          <div className="v3-close-inner">
            <div className="v3-close-left">
              <div className="v3-eyebrow">Prossimo passo</div>
              <h2 className="v3-close-h">
                Questa &egrave; solo<br />
                <em>la punta dell&apos;iceberg.</em>
              </h2>
              {urgencyParas.length > 0 && (
                <div className="v3-close-lines">
                  {urgencyParas.map((p, i) => (
                    <div
                      key={i}
                      className={
                        i === urgencyParas.length - 1
                          ? "v3-close-line v3-close-closing"
                          : "v3-close-line"
                      }
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
              <div className="v3-close-cta">
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                  className="v3-close-btn-primary"
                >
                  Scrivimi una mail <span className="v3-btn-arr" />
                </a>
                <a
                  href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-close-btn-secondary"
                >
                  Scrivimi su WhatsApp
                </a>
              </div>
              {hasResponseBox && (
                <ResponseBox
                  question={config.cta.ctaQuestion!}
                  companyName={config.companyName}
                  slug={slug}
                  emailSubject={config.cta.emailSubject}
                  siteEmail={SITE.email}
                />
              )}
              <div className="v3-close-note">
                nicola@nicolaserrao.com &mdash; rispondo sempre entro 24 ore.
                Se preferite una chiamata, scrivetelo nella mail.
              </div>
            </div>
            <div className="v3-close-right">
              <div className="v3-close-photo-wrap">
                <Image
                  src="/images/nicola.png"
                  alt="Nicola Serrao"
                  width={280}
                  height={370}
                  className="v3-close-photo"
                />
              </div>
              <div className="v3-photo-caption">
                Nicola Serrao
                <span>Digital Marketing Strategist</span>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────
            FOOTER
            ──────────────────────────────────────────── */}
        <footer className="v3-footer">
          <span>&copy; {SITE.name} &middot; {SITE.title}</span>
          <a href={SITE.url}>nicolaserrao.com</a>
        </footer>
      </div>
    </>
  );
}

/* ── Glitch zone — elaborate transition ── */
function GlitchZone({
  from,
  to,
  accent,
  label,
  id,
}: {
  from: string;
  to: string;
  accent: string;
  label: string;
  id?: string;
}) {
  return (
    <div className="v3-gz" id={id} aria-hidden="true">
      <div
        className="v3-gz-bg"
        style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
      />
      <div className="v3-gz-scanlines" />
      <div className="v3-gz-label" style={{ color: accent }}>
        {label}
      </div>
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
  const pCardBg = isLightBg ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.035)";
  const pCardBorder = isLightBg ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const pBtnText = isLightBg ? "#fff" : config.palette.background;

  return `
    /* ══════════════════════════════════════════
       BASE
    ══════════════════════════════════════════ */
    .v3 {
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      min-height: 100vh;
      position: relative;
    }
    .v3-bg-glow {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background:
        radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
    }
    .v3-container { max-width: 1100px; margin: 0 auto; padding: 0 60px; }

    /* ══════════════════════════════════════════
       NAVBAR
    ══════════════════════════════════════════ */
    .v3-nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(10,14,13,0.88);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid ${NS.border};
    }
    .v3-nav-inner {
      max-width: 1100px; margin: 0 auto; padding: 14px 60px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .v3-nav-left { display: flex; align-items: center; gap: 10px; }
    .v3-nav-right { display: flex; align-items: center; gap: 28px; }
    .v3-nav-link {
      font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
      color: ${NS.textDim}; text-decoration: none; transition: color 0.2s;
    }
    .v3-nav-link:hover { color: ${NS.primary}; }

    /* ══════════════════════════════════════════
       SEZIONE 1 — OPENER (Nicola Hero)
    ══════════════════════════════════════════ */
    .v3-opener {
      position: relative; z-index: 1;
      background: ${NS.bg}; color: ${NS.text};
      min-height: calc(100vh - 52px);
      padding: 64px 60px 80px;
      display: flex; flex-direction: column; justify-content: center;
      overflow: hidden;
    }
    .v3-opener::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, ${NS.border}, transparent);
    }
    .v3-opener-grid {
      max-width: 1100px; margin: 0 auto; width: 100%;
      display: grid; grid-template-columns: 1fr 380px;
      gap: 60px; align-items: center;
    }
    .v3-opener-left { display: flex; flex-direction: column; }
    .v3-opener-logo-row { margin-bottom: 20px; }

    /* Eyebrow — riuso in tutto Nicola */
    .v3-eyebrow {
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: ${NS.primary}; margin-bottom: 24px;
      display: flex; align-items: center; gap: 12px;
    }
    .v3-eyebrow::before {
      content: ''; width: 32px; height: 1px; background: ${NS.primary};
    }

    .v3-opener-name {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(2.4rem, 4.5vw, 4.4rem);
      font-weight: 700; line-height: 1.08; letter-spacing: -0.02em;
      margin-bottom: 24px;
    }
    .v3-opener-intro {
      font-size: 15px; line-height: 1.85;
      color: ${NS.textDim}; max-width: 520px; margin-bottom: 36px;
    }
    .v3-opener-tags {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 44px;
    }
    .v3-opener-tag {
      font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
      padding: 5px 12px; border-radius: 3px;
      border: 1px solid rgba(232,240,255,0.15);
      color: ${NS.textDim}; background: rgba(232,240,255,0.04);
    }

    /* Scroll CTA — freccia orizzontale + testo */
    .v3-scroll-cta {
      display: inline-flex; align-items: center; gap: 12px;
      font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
      color: ${NS.textDim}; text-decoration: none; transition: color 0.2s;
    }
    .v3-scroll-cta:hover { color: ${NS.primary}; }
    .v3-scroll-line {
      width: 36px; height: 1px; background: currentColor; position: relative;
    }
    .v3-scroll-line::after {
      content: ''; position: absolute; right: 0; top: -4px;
      width: 8px; height: 8px;
      border-right: 1px solid currentColor;
      border-bottom: 1px solid currentColor;
      transform: rotate(-45deg);
    }
    .v3-scroll-label { /* text next to arrow */ }

    /* Foto colonna destra */
    .v3-opener-right {
      display: flex; flex-direction: column; align-items: center; gap: 20px;
    }
    .v3-photo-wrap {
      position: relative; width: 100%; max-width: 340px;
    }
    .v3-photo-wrap::before {
      content: ''; position: absolute; top: -8px; right: -8px;
      width: 55%; height: 55%;
      border-top: 1px solid ${NS.border};
      border-right: 1px solid ${NS.border};
      z-index: 3; pointer-events: none;
    }
    .v3-photo-wrap::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 35%;
      background: linear-gradient(to top, ${NS.bg} 0%, transparent 100%);
      z-index: 2; pointer-events: none;
    }
    .v3-photo {
      position: relative; z-index: 1;
      width: 100%; aspect-ratio: 3/4;
      object-fit: cover; object-position: top center;
      display: block;
      filter: grayscale(25%) contrast(1.05);
    }
    .v3-photo-bar {
      position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
      padding: 14px 20px;
      background: rgba(10,14,13,0.75);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      display: flex; align-items: center; gap: 10px;
      border-top: 1px solid ${NS.border};
    }
    .v3-photo-bar-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: ${NS.primary};
      animation: v3pulse 2.5s ease-in-out infinite;
      flex-shrink: 0;
    }
    @keyframes v3pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .v3-photo-bar-text {
      font-size: 10px; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${NS.textDim};
    }
    .v3-photo-caption {
      text-align: center;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 0.95rem; font-style: italic;
      color: ${NS.textDim}; line-height: 1.5;
    }
    .v3-photo-caption span {
      color: ${NS.primary}; display: block; font-style: normal;
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 9px; letter-spacing: 2px;
      text-transform: uppercase; margin-top: 4px;
    }

    /* Fade-up animations */
    @keyframes v3fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: none; }
    }
    .v3-opener-left > * { animation: v3fadeUp 0.6s ease both; }
    .v3-opener-left > :nth-child(1) { animation-delay: 0s; }
    .v3-opener-left > :nth-child(2) { animation-delay: 0.08s; }
    .v3-opener-left > :nth-child(3) { animation-delay: 0.15s; }
    .v3-opener-left > :nth-child(4) { animation-delay: 0.22s; }
    .v3-opener-left > :nth-child(5) { animation-delay: 0.3s; }
    .v3-opener-left > :nth-child(6) { animation-delay: 0.4s; }
    .v3-opener-right { animation: v3fadeUp 0.6s 0.2s ease both; }

    /* ══════════════════════════════════════════
       GLITCH ZONE
    ══════════════════════════════════════════ */
    .v3-gz {
      position: relative; height: 180px; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      z-index: 1;
    }
    .v3-gz-bg { position: absolute; inset: 0; }
    .v3-gz-scanlines {
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 2px,
        rgba(0,255,252,0.02) 2px, rgba(0,255,252,0.02) 4px
      );
      animation: v3scan 6s linear infinite;
    }
    @keyframes v3scan { from{background-position:0 0} to{background-position:0 40px} }
    .v3-gz-label {
      position: relative; z-index: 2;
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(1.2rem, 2.5vw, 2rem);
      font-weight: 700; letter-spacing: 0.06em;
      animation: v3glitch 4s infinite;
    }
    @keyframes v3glitch {
      0%,88%,100% {
        text-shadow: 2px 0 rgba(255,0,100,0.5), -2px 0 rgba(0,200,255,0.5);
        transform: none;
      }
      90% {
        text-shadow: -5px 0 rgba(255,0,100,0.8), 5px 0 rgba(0,200,255,0.8);
        transform: translateX(3px);
      }
      93% {
        text-shadow: 5px 0 rgba(255,0,100,0.8), -5px 0 rgba(0,200,255,0.8);
        transform: translateX(-3px);
      }
      96% {
        text-shadow: 2px 0 rgba(255,0,100,0.5), -2px 0 rgba(0,200,255,0.5);
        transform: none;
      }
    }

    /* ══════════════════════════════════════════
       SEZIONE 2 — PROSPECT
    ══════════════════════════════════════════ */
    .v3-prospect {
      background: ${config.palette.background};
      color: ${config.palette.text};
      position: relative; z-index: 1;
    }

    /* Topbar prospect — sticky */
    .v3-p-topbar {
      background: ${isLightBg ? "rgba(255,255,255,0.97)" : "rgba(5,12,23,0.97)"};
      border-bottom: 1px solid ${config.palette.border};
      position: sticky; top: 0; z-index: 20;
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }
    .v3-p-topbar-inner {
      max-width: 1100px; margin: 0 auto; padding: 0 60px; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .v3-p-topbar-brand {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: 20px; font-weight: 700;
    }
    .v3-p-topbar-tag {
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${config.palette.textDim};
    }

    /* Prospect intro */
    .v3-p-intro { padding: 72px 0 0; }
    .v3-p-eyebrow {
      font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
      color: ${config.palette.primary}; margin-bottom: 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .v3-p-eyebrow::before {
      content: ''; width: 24px; height: 1px;
      background: ${config.palette.primary};
    }
    .v3-p-eyebrow--center { justify-content: center; }
    .v3-p-headline {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(2rem, 3.8vw, 3.6rem);
      font-weight: 700; line-height: 1.15; letter-spacing: -0.02em;
      max-width: 860px; margin-bottom: 20px;
    }
    .v3-p-sub {
      font-size: 16px; line-height: 1.8;
      color: ${config.palette.textDim};
      max-width: 640px; margin-bottom: 40px;
    }

    /* Prospect CTA button */
    .v3-p-btn {
      display: inline-flex; align-items: center; gap: 12px;
      background: ${config.palette.primary}; color: ${pBtnText};
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      padding: 16px 28px; text-decoration: none;
      transition: opacity 0.2s, transform 0.2s;
    }
    .v3-p-btn:hover { opacity: 0.85; transform: translateY(-2px); }
    .v3-btn-arr {
      width: 16px; height: 1px; background: currentColor; position: relative;
    }
    .v3-btn-arr::after {
      content: ''; position: absolute; right: 0; top: -3px;
      width: 6px; height: 6px;
      border-right: 1px solid currentColor;
      border-top: 1px solid currentColor;
      transform: rotate(45deg);
    }

    /* Pitch — 2 colonne */
    .v3-pitch {
      padding: 72px 0;
      border-top: 1px solid ${config.palette.border};
    }
    .v3-pitch-grid {
      max-width: 1100px; margin: 0 auto; padding: 0 60px;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 60px; align-items: center;
    }
    .v3-pitch-h {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(1.6rem, 2.5vw, 2.2rem);
      font-weight: 700; line-height: 1.2; margin-bottom: 20px;
    }
    .v3-pitch-h em { font-style: italic; color: ${config.palette.primary}; }
    .v3-pitch-body {
      font-size: 14px; line-height: 1.85;
      color: ${config.palette.textDim}; margin-bottom: 16px;
    }
    .v3-pitch-body:last-child { margin-bottom: 0; }

    /* Card visiva nella colonna destra del pitch */
    .v3-pitch-card {
      padding: 44px 36px; text-align: center;
      border: 1px solid ${pCardBorder};
      background: ${pCardBg};
    }
    .v3-pitch-card-icon {
      color: ${config.palette.primary}; margin-bottom: 20px;
    }
    .v3-pitch-card-title {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: 18px; font-weight: 700; margin-bottom: 10px;
    }
    .v3-pitch-card-sub {
      font-size: 12px; line-height: 1.75;
      color: ${config.palette.textDim};
      max-width: 280px; margin: 0 auto;
    }

    /* ═════════ PILLARS ═════════ */
    .v3-pillars {
      padding: 72px 0;
      border-top: 1px solid ${config.palette.border};
    }
    .v3-pillars-header {
      text-align: center; margin-bottom: 48px;
    }
    .v3-pillars-headline {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(1.6rem, 2.8vw, 2.6rem);
      font-weight: 700; line-height: 1.15;
    }
    .v3-pillars-headline em { font-style: italic; color: ${config.palette.primary}; }
    .v3-pillars-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 2px; background: ${pCardBorder};
    }
    .v3-pillar {
      background: ${isLightBg ? "#fff" : pCardBg};
      padding: 32px 28px; position: relative;
      transition: background 0.2s;
    }
    .v3-pillar::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    }
    .v3-pc1::after { background: ${config.palette.primary}; }
    .v3-pc2::after { background: ${isLightBg ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)"}; }
    .v3-pc3::after { background: linear-gradient(90deg, ${config.palette.primary}, ${isLightBg ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)"}); }
    .v3-pillar-num {
      font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
      color: ${config.palette.textDim}; margin-bottom: 14px;
    }
    .v3-pillar-icon {
      color: ${config.palette.primary}; margin-bottom: 14px; opacity: 0.5;
    }
    .v3-pillar-title {
      font-family: ${hf(config)}var(--font-playfair), 'Playfair Display', serif;
      font-size: 1.05rem; font-weight: 700;
      margin-bottom: 10px; line-height: 1.3;
    }
    .v3-pillar-body {
      font-size: 13px; line-height: 1.7;
      color: ${config.palette.textDim};
    }

    /* ══════════════════════════════════════════
       SEZIONE 3 — CHIUSURA (Nicola)
    ══════════════════════════════════════════ */
    .v3-close {
      position: relative; z-index: 1;
      padding: 96px 60px;
      background: ${NS.bg}; color: ${NS.text};
    }
    .v3-close-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 360px;
      gap: 80px; align-items: center;
    }
    .v3-close-h {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(2rem, 3.2vw, 3.4rem);
      font-weight: 400; line-height: 1.15;
      letter-spacing: -0.02em; margin-bottom: 28px;
    }
    .v3-close-h em { font-style: italic; color: ${NS.primary}; }
    .v3-close-lines {
      display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px;
    }
    .v3-close-line {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; line-height: 1.7; color: ${NS.textDim};
    }
    .v3-close-line::before {
      content: '\\2192'; color: ${NS.primary};
      flex-shrink: 0; margin-top: 2px; font-size: 12px;
    }
    .v3-close-closing {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-style: italic; font-size: 17px;
      color: ${NS.text}; line-height: 1.5;
    }
    .v3-close-closing::before { content: none; }
    .v3-close-cta {
      display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 32px;
    }
    .v3-close-btn-primary {
      display: inline-flex; align-items: center; gap: 12px;
      background: ${NS.primary}; color: ${NS.bg};
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      padding: 16px 28px; text-decoration: none;
      transition: opacity 0.2s; white-space: nowrap;
    }
    .v3-close-btn-primary:hover { opacity: 0.85; }
    .v3-close-btn-secondary {
      display: inline-flex; align-items: center; gap: 10px;
      background: transparent; color: ${NS.primary};
      font-family: var(--font-dm-mono), 'DM Mono', monospace;
      font-size: 11px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      padding: 16px 28px; text-decoration: none;
      border: 1px solid ${NS.border};
      transition: background 0.2s, border-color 0.2s;
      white-space: nowrap;
    }
    .v3-close-btn-secondary:hover {
      background: ${NS.primaryDim}; border-color: ${NS.primary};
    }
    .v3-close-note {
      font-size: 12px; color: ${NS.textFaint};
      line-height: 1.7; font-style: italic;
      padding-top: 20px;
      border-top: 1px solid rgba(232,240,255,0.07);
    }

    /* Foto chiusura */
    .v3-close-right {
      display: flex; flex-direction: column;
      align-items: center; gap: 20px;
    }
    .v3-close-photo-wrap {
      position: relative; width: 80%; max-width: 280px;
    }
    .v3-close-photo-wrap::before {
      content: ''; position: absolute; top: -6px; left: -6px;
      width: 50%; height: 50%;
      border-top: 1px solid ${NS.border};
      border-left: 1px solid ${NS.border};
      z-index: 3; pointer-events: none;
    }
    .v3-close-photo-wrap::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 45%;
      background: linear-gradient(to top, ${NS.bg} 0%, transparent 100%);
      z-index: 2; pointer-events: none;
    }
    .v3-close-photo {
      position: relative; z-index: 1;
      width: 100%; aspect-ratio: 3/4;
      object-fit: cover; object-position: top center;
      display: block;
      filter: grayscale(30%) contrast(1.05);
    }

    /* ══════════════════════════════════════════
       FOOTER
    ══════════════════════════════════════════ */
    .v3-footer {
      position: relative; z-index: 1;
      border-top: 1px solid ${NS.border};
      padding: 24px 60px;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 10px; letter-spacing: 1.5px;
      text-transform: uppercase; color: ${NS.textFaint};
      background: ${NS.bg};
    }
    .v3-footer a {
      color: ${NS.primary}; text-decoration: none;
      transition: opacity 0.2s;
    }
    .v3-footer a:hover { opacity: 0.7; }

    /* ══════════════════════════════════════════
       RESPONSIVE
    ══════════════════════════════════════════ */
    @media (max-width: 960px) {
      .v3-nav-inner { padding: 14px 28px; }
      .v3-opener { padding: 48px 28px 64px; }
      .v3-opener-grid { grid-template-columns: 1fr; gap: 32px; }
      .v3-opener-right { order: -1; max-width: 240px; margin: 0 auto; }
      .v3-container { padding: 0 28px; }
      .v3-p-topbar-inner { padding: 0 28px; }
      .v3-p-topbar-tag { display: none; }
      .v3-pitch-grid { grid-template-columns: 1fr; padding: 0 28px; }
      .v3-pillars-grid { grid-template-columns: 1fr; }
      .v3-close { padding: 64px 28px; }
      .v3-close-inner { grid-template-columns: 1fr; gap: 48px; }
      .v3-close-right { order: -1; max-width: 200px; margin: 0 auto; }
      .v3-footer { padding: 24px 28px; }
    }

    @media (max-width: 480px) {
      .v3-nav-inner { padding: 10px 20px; }
      .v3-nav-right { display: none; }
      .v3-opener { padding: 36px 20px 48px; min-height: auto; }
      .v3-opener-grid { gap: 24px; }
      .v3-opener-right { max-width: 180px; }
      .v3-opener-name { font-size: 32px; }
      .v3-opener-tags { display: none; }
      .v3-container { padding: 0 20px; }
      .v3-p-topbar-inner { padding: 0 20px; height: 56px; }
      .v3-p-intro { padding-top: 48px; }
      .v3-pitch { padding: 48px 0; }
      .v3-pitch-grid { padding: 0 20px; gap: 36px; }
      .v3-pillars { padding: 48px 0; }
      .v3-close { padding: 48px 20px; }
      .v3-close-cta { flex-direction: column; }
      .v3-close-btn-primary,
      .v3-close-btn-secondary { justify-content: center; }
      .v3-footer { padding: 20px; flex-direction: column; gap: 8px; }
      .v3-gz { height: 120px; }
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
