import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOutreachConfig, getAllOutreachSlugs } from "@/data/outreach/loader";
import type { OutreachConfig, OutreachSection, OutreachBlock } from "@/data/outreach/types";
import { SITE } from "@/lib/constants";
import OutreachTracker from "./tracker";
import ResponseBox from "./response-box";
import BubbleNav from "./bubble-nav";
import LiveClock from "./live-clock";
import LogoSlider from "./logo-slider";


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
    title: `Nicola Serrao × ${config.companyName}`,
    robots: { index: false, follow: false },
  };
}

/* ── Nicola palette (from old PHP templates) ── */
const NS = {
  bg: "#0a0e0d",
  teal: "#00fffc",
  tealDim: "rgba(0,255,252,0.10)",
  tealBorder: "rgba(0,255,252,0.22)",
  text: "#e8f0ff",
  textDim: "rgba(232,240,255,0.50)",
  textFaint: "rgba(232,240,255,0.20)",
  serif: "'Playfair Display', serif",
  mono: "'DM Mono', monospace",
} as const;

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getOutreachConfig(slug);
  if (!config) notFound();

  /* v4 — new video-first one-screen template */
  if (config.version === "v4") return <OutreachV4 config={config} slug={slug} />;
  /* Legacy templates for already-sent pages */
  if (slug === "cascioli-rent") return <OutreachCascioliRent config={config} slug={slug} />;
  if (config.pitch) return <OutreachV3 config={config} slug={slug} />;
  return <OutreachV2 config={config} slug={slug} />;
}

/* ================================================================
   V4 TEMPLATE — video-first, one-screen landing
   ================================================================ */

function OutreachV4({ config, slug }: { config: OutreachConfig; slug: string }) {
  const blocks = config.blocks || [];

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{`
        /* ── v4 reset & base ── */
        .v4-page {
          min-height: 100vh;
          background: ${NS.bg};
          color: ${NS.text};
          font-family: ${NS.mono};
          display: flex;
          flex-direction: column;
        }

        /* ── topbar ── */
        .v4-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          border-bottom: 1px solid ${NS.tealBorder};
        }
        .v4-topbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: ${NS.serif};
          font-size: 15px;
          color: ${NS.text};
          text-decoration: none;
          letter-spacing: 0.5px;
        }
        .v4-topbar-logo span { color: ${NS.teal}; }
        .v4-topbar-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${NS.textDim};
        }
        .v4-topbar-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${NS.teal};
          animation: v4pulse 2s ease-in-out infinite;
        }

        /* ── main content ── */
        .v4-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          gap: 48px;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── video section ── */
        .v4-video-wrap {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid ${NS.tealBorder};
          background: rgba(0,255,252,0.03);
        }
        .v4-video-aspect {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 */
        }
        .v4-video-aspect iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .v4-video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          color: ${NS.textDim};
          font-size: 13px;
        }
        .v4-video-placeholder svg {
          opacity: 0.4;
        }

        /* ── blocks grid ── */
        .v4-blocks {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .v4-block-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: stretch;
        }
        .v4-block-card {
          padding: 24px;
          border-radius: 10px;
          border: 1px solid ${NS.tealBorder};
          background: rgba(0,255,252,0.03);
        }
        .v4-block-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .v4-block-label-today {
          color: ${NS.textDim};
        }
        .v4-block-label-tomorrow {
          color: ${NS.teal};
        }
        .v4-block-text {
          font-family: ${NS.serif};
          font-size: 16px;
          line-height: 1.5;
          color: ${NS.text};
        }
        .v4-block-card-tomorrow {
          border-color: rgba(0,255,252,0.35);
          background: rgba(0,255,252,0.06);
        }
        .v4-block-arrow {
          display: flex;
          align-items: center;
          color: ${NS.teal};
          opacity: 0.6;
        }

        /* ── CTA section ── */
        .v4-cta {
          width: 100%;
          text-align: center;
          padding: 32px 0 0;
          border-top: 1px solid ${NS.tealBorder};
        }
        .v4-cta-text {
          font-family: ${NS.serif};
          font-size: clamp(20px, 3vw, 28px);
          font-style: italic;
          color: ${NS.text};
          margin-bottom: 24px;
        }
        .v4-cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .v4-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .v4-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .v4-btn-wa {
          background: ${NS.teal};
          color: ${NS.bg};
        }
        .v4-btn-email {
          background: transparent;
          color: ${NS.teal};
          border: 1px solid ${NS.tealBorder};
        }
        .v4-btn-email:hover {
          background: ${NS.tealDim};
          border-color: ${NS.teal};
        }

        /* ── footer ── */
        .v4-footer {
          text-align: center;
          padding: 24px 32px;
          font-size: 11px;
          color: ${NS.textFaint};
          letter-spacing: 1px;
        }
        .v4-footer a { color: ${NS.textDim}; text-decoration: none; }
        .v4-footer a:hover { color: ${NS.teal}; }

        /* ── glow background ── */
        .v4-bg-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.03) 0%, transparent 50%);
        }

        @keyframes v4pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* ── responsive ── */
        @media (max-width: 640px) {
          .v4-topbar { padding: 12px 20px; }
          .v4-topbar-tag { display: none; }
          .v4-content { padding: 28px 20px; gap: 36px; }
          .v4-block-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .v4-block-arrow {
            transform: rotate(90deg);
            justify-content: center;
          }
          .v4-block-card { padding: 18px; }
          .v4-block-text { font-size: 14px; }
        }
      `}</style>

      <div className="v4-bg-glow" />

      <div className="v4-page" style={{ position: "relative", zIndex: 1 }}>
        {/* ── TOPBAR ── */}
        <div className="v4-topbar">
          <a
            href="https://nicolaserrao.com"
            className="v4-topbar-logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/favicon.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} />
            Nicola<span>.</span>Serrao
          </a>
          <div className="v4-topbar-tag">
            <span className="v4-topbar-dot" />
            proposta riservata &middot; {config.companyName}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="v4-content">

          {/* VIDEO */}
          <div className="v4-video-wrap">
            <div className="v4-video-aspect">
              {config.videoUrl ? (
                <iframe
                  src={config.videoUrl}
                  allowFullScreen
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={`Video per ${config.companyName}`}
                />
              ) : (
                <div className="v4-video-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Video in arrivo
                </div>
              )}
            </div>
          </div>

          {/* BLOCKS: today → tomorrow */}
          {blocks.length > 0 && (
            <div className="v4-blocks">
              {blocks.map((block: OutreachBlock, i: number) => (
                <div key={i} className="v4-block-row">
                  <div className="v4-block-card">
                    <div className="v4-block-label v4-block-label-today">Oggi</div>
                    <div className="v4-block-text">{block.today}</div>
                  </div>
                  <div className="v4-block-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="v4-block-card v4-block-card-tomorrow">
                    <div className="v4-block-label v4-block-label-tomorrow">Domani</div>
                    <div className="v4-block-text">{block.tomorrow}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="v4-cta">
            <p className="v4-cta-text">{config.cta.text || "Ti va una chiacchierata di 15 minuti?"}</p>
            <div className="v4-cta-buttons">
              {config.cta.whatsappText && (
                <a
                  href={`https://wa.me/393385691369?text=${encodeURIComponent(config.cta.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v4-btn v4-btn-wa"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Scrivimi su WhatsApp
                </a>
              )}
              {config.cta.emailSubject && (
                <a
                  href={`mailto:marketing@nicolaserrao.com?subject=${encodeURIComponent(config.cta.emailSubject)}`}
                  className="v4-btn v4-btn-email"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                  Scrivimi via email
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="v4-footer">
          <a href="https://nicolaserrao.com" target="_blank" rel="noopener noreferrer">
            nicolaserrao.com
          </a>
        </div>
      </div>
    </>
  );
}

/* ================================================================
   V3 TEMPLATE — faithful conversion of old PHP outreach pages
   ================================================================ */

function OutreachV3({ config, slug }: { config: OutreachConfig; slug: string }) {
  const palette = config.palette!;
  const isLightBg = isLight(palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;
  const pitchParas = config.pitch!.split("\n\n");
  const urgencyParas = config.urgencyText ? config.urgencyText.split("\n\n") : [];
  const pFont = config.headingFont ? `'${config.headingFont}', sans-serif` : `${NS.serif}`;

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{v3CSS(config, isLightBg)}</style>

      <div className="bg-glow" />

      {/* ════════════════════════
           TOP BAR
      ════════════════════════ */}
      <div className="page-topbar">
        <a href="https://nicolaserrao.com" className="topbar-logo" target="_blank" rel="noopener noreferrer">
          <Image src="/favicon.png" alt="" width={22} height={22} style={{ objectFit: "contain" }} />
          Nicola<span>.</span>Serrao
        </a>
        <div className="topbar-tag">
          <span className="topbar-dot" />
          proposta riservata &middot; {config.companyName}
        </div>
      </div>

      {/* ════════════════════════
           SEZIONE 1 — HERO NICOLA (60/40)
      ════════════════════════ */}
      <section className="nicola-hero" id="chi-sono">
        <div className="hero-left">
          <div className="hero-eyebrow">Digital Marketing Strategist</div>
          <h1 className="hero-headline">
            Ho fatto un lavoro per te e credo<br />
            <em>ti possa tornare utile.</em>
          </h1>
          <p className="hero-sub">{config.heroSubtitle}</p>
          <div className="hero-pills">
            <span className="pill hi">Strategia</span>
            <span className="pill hi">Meta Ads &middot; Google Ads</span>
            <span className="pill">E-commerce &middot; CRO</span>
            <span className="pill">Lead Generation</span>
            <span className="pill">Digital ADV</span>
          </div>
          <a href="#il-progetto" className="hero-cta-scroll">
            <span className="hero-scroll-arrow" />
            scopri il lavoro che ho fatto per voi
          </a>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={340}
              height={450}
              priority
              className="hero-photo"
            />
          </div>
          <div className="hero-photo-caption">
            Nicola Serrao
            <span>Digital Marketing Strategist</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════
           GLITCH ZONE 1
      ════════════════════════ */}
      <div className="glitch-zone" id="il-progetto">
        <div className="glitch-bg-fwd" />
        <div className="glitch-scanlines" />
        <div className="glitch-label">// il lavoro che ho fatto per voi</div>
      </div>

      {/* ════════════════════════
           SEZIONE 2 — PROSPECT
      ════════════════════════ */}
      <section className="prospect-section">

        {/* Topbar sticky */}
        <div className="prospect-topbar">
          {config.logo ? (
            <Image
              src={config.logo}
              alt={config.companyName}
              width={160}
              height={38}
              style={{ objectFit: "contain", display: "block", maxWidth: 200 }}
            />
          ) : (
            <span className="prospect-brand">{config.companyName}</span>
          )}
          <div className="prospect-topbar-tag">
            [ Studio realizzato da Nicola Serrao &middot; nicolaserrao.com ]
          </div>
        </div>

        {/* Intro */}
        <div className="c-intro">
          <div className="c-eyebrow">{config.sector}</div>
          <h2 className="c-headline">{config.heroTitle}</h2>
          <p className="c-sub">{config.heroSubtitle}</p>
        </div>

        {/* ═══ LAYOUT A: Timeline + Value Rows (when present) ═══ */}
        {config.timeline ? (
          <>
            {/* Pitch headline */}
            <div className="c-pitch-section">
              <div className="c-container">
                {pitchParas.map((p, i) => (
                  <p key={i} className="c-pitch-text">{p}</p>
                ))}
              </div>
            </div>

            {/* Timeline: oggi → domani */}
            <div className="tl-wrap">
              <div className="tl-container">
                <div className="tl-card tl-before">
                  <div className="tl-label">Oggi</div>
                  <h4 className="tl-title">{config.timeline.before.label}</h4>
                  <ul className="tl-points">
                    {config.timeline.before.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="tl-arrow" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
                <div className="tl-card tl-after">
                  <div className="tl-label">Domani</div>
                  <h4 className="tl-title">{config.timeline.after.label}</h4>
                  <ul className="tl-points">
                    {config.timeline.after.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Value rows: il mio linguaggio | il vostro linguaggio */}
            {config.valueRows && config.valueRows.length > 0 && (
              <div className="vr-wrap" id="competenze">
                <div className="vr-container">
                  <div className="vr-header">
                    <div className="c-eyebrow">Cosa pu&ograve; fare una figura come me per voi</div>
                  </div>
                  {config.valueRows.map((row, i) => (
                    <div key={i} className="vr-row">
                      <div className="vr-row-label">
                        <span className="vr-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="vr-title">{row.title}</span>
                      </div>
                      <div className="vr-cols">
                        <div className="vr-col vr-mine">
                          <div className="vr-col-tag">Il mio lavoro</div>
                          <h4 className="vr-col-h">{row.mine.headline}</h4>
                          <ul className="vr-col-points">
                            {row.mine.points.map((p, j) => (
                              <li key={j}>{p}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="vr-col vr-theirs">
                          <div className="vr-col-tag">Cosa significa per voi</div>
                          <h4 className="vr-col-h">{row.theirs.headline}</h4>
                          <ul className="vr-col-points">
                            {row.theirs.points.map((p, j) => (
                              <li key={j}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Takeaways */}
            {config.takeaways && config.takeaways.length > 0 && (
              <div className="tk-wrap">
                <div className="tk-container">
                  {config.takeaways.map((t, i) => (
                    <div key={i} className="tk-item">{t}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ═══ LAYOUT B: Method block + Pillars (default) ═══ */}
            <div className="method-block">
              <div className="method-text">
                <div className="m-num">Analisi &middot; 00</div>
                <h3 className="m-title">
                  Ho studiato il vostro <span className="acc">progetto.</span>
                </h3>
                {pitchParas.map((p, i) => (
                  <p key={i} className="m-body">{p}</p>
                ))}
                <div className="m-callout">
                  <strong>Non parlo di teoria.</strong> Parlo di opportunit&agrave; concrete che ho individuato analizzando il vostro business dall&apos;esterno.
                </div>
              </div>
              <div className="method-visual">
                <div className="method-card">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 16 }}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <div className="method-card-title">Opportunit&agrave; concrete</div>
                  <p className="method-card-sub">
                    Analisi del vostro posizionamento, competitor e potenziale di crescita nel digitale.
                  </p>
                </div>
              </div>
            </div>

            {config.boxes && config.boxes.length > 0 && (
              <div className="pillars-wrap" id="competenze">
                <div className="pillars-header">
                  <div className="c-eyebrow">Cosa posso fare per voi</div>
                  <h2 className="c-headline" style={{ fontSize: "clamp(1.6rem,2.8vw,2.6rem)", marginBottom: 0 }}>
                    Tre pilastri su cui posso<br />portare valore a {config.companyName}.
                  </h2>
                </div>
                <div className="pillars-grid">
                  {config.boxes.map((box, i) => (
                    <div key={i} className={`pcard p${i + 1}`}>
                      <div className="p-num">Pilastro {String(i + 1).padStart(2, "0")}</div>
                      <span className="p-icon">{getPillarIcon(i)}</span>
                      <div className="p-title">{box.title}</div>
                      <p className="p-body">{box.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ════════════════════════
           GLITCH ZONE 2
      ════════════════════════ */}
      <div className="glitch-zone">
        <div className="glitch-bg-bwd" />
        <div className="glitch-scanlines" />
        <div className="glitch-label">// e queste sono solo alcune delle idee</div>
      </div>

      {/* ════════════════════════
           SEZIONE 3 — CHIUSURA NICOLA
      ════════════════════════ */}
      <section className="nicola-close" id="parliamone">
        <div className="close-inner">

          <div>
            <div className="close-eyebrow">Prossimo passo</div>
            <h2 className="close-headline">
              Questa &egrave; solo<br />
              <em>la punta dell&apos;iceberg.</em>
            </h2>
            {urgencyParas.length > 0 && (
              <div className="close-lines">
                {urgencyParas.map((p, i) => (
                  <div key={i} className="close-line">{p}</div>
                ))}
              </div>
            )}
            <div className="close-cta-row">
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="close-cta-mail"
              >
                Scrivimi una mail
                <span className="arr" />
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
            <div className="close-note">
              nicola@nicolaserrao.com &mdash; rispondo sempre entro 24 ore. Se preferite una chiamata, scrivetelo nella mail.
            </div>
          </div>

          <div className="close-right">
            <div className="close-photo-wrap">
              <Image
                src="/images/nicola.png"
                alt="Nicola Serrao"
                width={280}
                height={370}
                className="close-photo"
              />
            </div>
            <div className="close-photo-caption">
              Nicola Serrao
              <span>Digital Marketing Strategist</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════
           FOOTER
      ════════════════════════ */}
      <footer className="site-footer">
        <span>&copy; Nicola Serrao &middot; nicolaserrao.com</span>
        <a href={`mailto:${SITE.email}`}>nicola@nicolaserrao.com</a>
        <span>Proposta riservata &middot; 2026</span>
      </footer>
    </>
  );
}

/* ── Pillar emoji icons ── */
function getPillarIcon(i: number): string {
  return ["💡", "📈", "⚙️"][i] || "💡";
}

/* ── V3 CSS — exact port from old PHP templates ── */
function v3CSS(config: OutreachConfig, isLightBg: boolean): string {
  const isDark = !isLightBg;
  const palette = config.palette!;
  const pBg = palette.background;
  const pPrimary = palette.primary;
  const pText = palette.text;
  const pTextDim = palette.textDim;
  const pBorder = palette.border;
  const pFont = config.headingFont ? `'${config.headingFont}', sans-serif` : `'Fira Sans', sans-serif`;

  // Derived prospect colors
  const pBgMid = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";
  const pBgCard = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const pTextFaint = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.25)";
  const pBorder2 = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

  return `
/* ══════════════════════════════════════════
   RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${NS.bg}; color: ${NS.text}; font-family: ${NS.mono}; overflow-x: hidden; }
.bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.03) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   TOP BAR
══════════════════════════════════════════ */
.page-topbar {
  position: relative; z-index: 10;
  padding: 28px 64px 0;
  display: flex; align-items: center; justify-content: space-between;
}
.topbar-logo {
  font-family: ${NS.serif}; font-size: 18px; font-weight: 700;
  color: ${NS.text}; text-decoration: none; letter-spacing: -0.3px;
  display: flex; align-items: center; gap: 8px;
}
.topbar-logo span { color: ${NS.teal}; }
.topbar-tag {
  font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
  color: ${NS.textDim}; display: flex; align-items: center; gap: 8px;
}
.topbar-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: ${NS.teal}; animation: blink 2.5s infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

/* ══════════════════════════════════════════
   SEZIONE 1 — HERO NICOLA (60/40)
══════════════════════════════════════════ */
.nicola-hero {
  position: relative; z-index: 1;
  min-height: calc(100vh - 80px);
  padding: 64px 64px 80px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  align-items: center;
  overflow: hidden;
}
.nicola-hero::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${NS.tealBorder}, transparent);
}

/* Colonna sinistra */
.hero-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${NS.teal}; margin-bottom: 28px;
  display: flex; align-items: center; gap: 12px;
  animation: fadeUp .6s ease both;
}
.hero-eyebrow::before { content:''; width:32px; height:1px; background:${NS.teal}; }

.hero-headline {
  font-family: ${NS.serif};
  font-size: clamp(2.4rem, 4vw, 4.4rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -.02em;
  max-width: 720px; margin-bottom: 24px;
  animation: fadeUp .6s .1s ease both;
}
.hero-headline em { font-style: italic; color: ${NS.teal}; }

.hero-sub {
  font-size: 15px; line-height: 1.8;
  color: ${NS.textDim}; max-width: 560px;
  margin-bottom: 36px;
  animation: fadeUp .6s .2s ease both;
}
.hero-sub strong { color: ${NS.text}; font-weight: 500; }

.hero-pills {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 44px;
  animation: fadeUp .6s .3s ease both;
}
.pill {
  font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 5px 12px; border-radius: 3px;
  border: 1px solid rgba(232,245,242,0.15);
  color: ${NS.textDim}; background: rgba(232,245,242,0.04);
}
.pill.hi { color: ${NS.teal}; border-color: ${NS.tealBorder}; background: ${NS.tealDim}; }

.hero-cta-scroll {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: ${NS.textDim}; text-decoration: none; transition: color .2s;
  animation: fadeUp .6s .4s ease both;
}
.hero-cta-scroll:hover { color: ${NS.teal}; }
.hero-scroll-arrow {
  width: 36px; height: 1px; background: currentColor; position: relative;
}
.hero-scroll-arrow::after {
  content:''; position:absolute; right:0; top:-4px;
  width:8px; height:8px;
  border-right:1px solid currentColor; border-bottom:1px solid currentColor;
  transform:rotate(-45deg);
}

/* Colonna destra — foto */
.hero-right {
  display: flex; flex-direction: column; align-items: center;
  gap: 20px; animation: fadeUp .6s .2s ease both;
}
.hero-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
}
.hero-photo-wrap::before {
  content:''; position:absolute; top:-8px; right:-8px;
  width:55%; height:55%;
  border-top:1px solid ${NS.tealBorder};
  border-right:1px solid ${NS.tealBorder};
  z-index:3; pointer-events:none;
}
.hero-photo-wrap::after {
  content:''; position:absolute; bottom:0; left:0; right:0;
  height:35%; background:linear-gradient(to top, ${NS.bg} 0%, transparent 100%);
  z-index:2; pointer-events:none;
}
.hero-photo {
  position:relative; z-index:1; width:100%; aspect-ratio:3/4;
  object-fit:cover; object-position:top center; display:block;
  filter:grayscale(25%) contrast(1.05);
}

.hero-photo-caption {
  text-align:center; font-family:${NS.serif}; font-size:.95rem;
  font-style:italic; color:${NS.textDim}; line-height:1.5;
}
.hero-photo-caption span {
  color:${NS.teal}; display:block; font-style:normal;
  font-family:${NS.mono}; font-size:9px; letter-spacing:2px;
  text-transform:uppercase; margin-top:4px;
}

@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONE
══════════════════════════════════════════ */
.glitch-zone {
  position:relative; height:180px; overflow:hidden;
  display:flex; align-items:center; justify-content:center; z-index:1;
}
.glitch-bg-fwd {
  position:absolute; inset:0;
  background:linear-gradient(180deg, ${NS.bg} 0%, ${pBg} 100%);
}
.glitch-bg-bwd {
  position:absolute; inset:0;
  background:linear-gradient(180deg, ${pBg} 0%, ${NS.bg} 100%);
}
.glitch-scanlines {
  position:absolute; inset:0;
  background:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation:scan 6s linear infinite;
}
@keyframes scan{from{background-position:0 0}to{background-position:0 40px}}
.glitch-label {
  position:relative; z-index:2; font-family:${NS.serif}; font-style:italic;
  font-size:clamp(1.2rem,2.5vw,2rem); font-weight:700; color:${NS.teal};
  letter-spacing:.06em; animation:gltch 4s infinite;
}
@keyframes gltch{
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SEZIONE 2 — PROSPECT
══════════════════════════════════════════ */
.prospect-section {
  background: ${pBg}; color: ${pText};
  font-family: ${pFont}; position: relative; z-index: 1;
}

/* Topbar prospect */
.prospect-topbar {
  background: ${isDark ? "rgba(5,12,23,0.97)" : "rgba(255,255,255,0.97)"};
  border-bottom: 1px solid ${pBorder2};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
.prospect-brand {
  font-size: 20px; font-weight: 800; color: ${pText}; letter-spacing: -.03em;
}
.prospect-topbar-tag {
  font-family: ${NS.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${pTextFaint};
}

/* Intro */
.c-intro { padding: 72px 64px 0; }
.c-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${pPrimary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.c-eyebrow::before { content:''; width:24px; height:1px; background:${pPrimary}; }
.c-headline {
  font-size: clamp(2rem,3.8vw,3.6rem); font-weight: 700;
  line-height: 1.15; color: ${pText}; max-width: 860px;
  margin-bottom: 20px; letter-spacing: -.02em;
}
.c-headline .acc { color: ${pPrimary}; }
.c-sub {
  font-size: 16px; line-height: 1.8; color: ${pTextDim};
  max-width: 640px; margin-bottom: 60px; font-weight: 300;
}

/* ═════════ BLOCCO ANALISI — 50/50 ═════════ */
.method-block {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0; border-top: 1px solid ${pBorder};
  min-height: 480px;
}
.method-text {
  padding: 64px;
  display: flex; flex-direction: column; justify-content: center;
  background: ${pBgMid};
  border-right: 1px solid ${pBorder};
}
.method-visual {
  padding: 64px 48px;
  display: flex; align-items: center; justify-content: center;
  background: ${pBg};
  position: relative; overflow: hidden;
}
.method-visual::before {
  content:''; position:absolute; inset:0;
  background: radial-gradient(ellipse 70% 70% at 60% 50%, ${palette.primaryDim} 0%, transparent 70%);
  pointer-events:none;
}
.m-num {
  font-family: ${NS.mono}; font-size: 9px; letter-spacing: 3px;
  text-transform: uppercase; color: ${pTextFaint}; margin-bottom: 20px;
}
.m-title {
  font-size: 1.5rem; font-weight: 700; color: ${pText};
  line-height: 1.2; margin-bottom: 16px;
}
.m-title .acc { color: ${pPrimary}; }
.m-body {
  font-size: 14px; line-height: 1.8; color: ${pTextDim};
  margin-bottom: 16px; font-weight: 300;
}
.m-body strong { color: ${pText}; font-weight: 600; }
.m-callout {
  border-left: 3px solid ${pPrimary};
  padding: 16px 20px; margin-top: 20px;
  background: ${palette.primaryDim};
  font-size: 13px; font-style: italic;
  color: ${pTextDim}; line-height: 1.7;
}
.m-callout strong { color: ${pText}; font-style: normal; font-weight: 600; }

/* Method card (visual side) */
.method-card {
  position: relative; z-index: 1;
  padding: 44px 36px; text-align: center;
  border: 1px solid ${pBorder2};
  background: ${pBgCard};
  max-width: 320px;
}
.method-card svg { color: ${pPrimary}; }
.method-card-title {
  font-size: 18px; font-weight: 700; color: ${pText}; margin-bottom: 10px;
}
.method-card-sub {
  font-size: 12px; line-height: 1.75; color: ${pTextDim}; max-width: 260px; margin: 0 auto;
}

/* ═════════ PILLARS ═════════ */
.pillars-wrap {
  padding: 72px 64px;
  background: ${pBgMid};
  border-top: 1px solid ${pBorder};
}
.pillars-header { margin-bottom: 40px; }
.pillars-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 2px; background: ${pBorder};
}
.pcard {
  background: ${pBgCard}; padding: 32px 28px;
  position: relative; transition: background .2s;
}
.pcard:hover { background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}; }
.pcard::after {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
}
.p1::after { background: ${pPrimary}; }
.p2::after { background: ${isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"}; }
.p3::after { background: linear-gradient(90deg, ${pPrimary}, ${isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"}); }
.p-num {
  font-family: ${NS.mono}; font-size: 9px; letter-spacing: 3px;
  text-transform: uppercase; color: ${pTextFaint}; margin-bottom: 14px;
}
.p-icon { font-size: 1.8rem; margin-bottom: 14px; display: block; }
.p-title {
  font-size: 1.05rem; font-weight: 700; color: ${pText};
  margin-bottom: 10px; line-height: 1.3;
}
.p-body {
  font-size: 13px; color: ${pTextDim}; line-height: 1.7;
  margin-bottom: 12px; font-weight: 300;
}

/* ══════════════════════════════════════════
   SEZIONE 3 — CHIUSURA NICOLA
══════════════════════════════════════════ */
.nicola-close {
  position:relative; z-index:1;
  padding: 96px 64px;
  background: ${NS.bg};
}
.close-inner {
  max-width:1040px; margin:0 auto;
  display:grid; grid-template-columns:1fr 360px; gap:80px; align-items:center;
}
.close-eyebrow {
  font-size:10px; letter-spacing:3px; text-transform:uppercase;
  color:${NS.teal}; margin-bottom:24px;
  display:flex; align-items:center; gap:12px;
}
.close-eyebrow::before { content:''; width:32px; height:1px; background:${NS.teal}; }
.close-headline {
  font-family:${NS.serif};
  font-size:clamp(2rem,3.2vw,3.4rem); font-weight:400;
  line-height:1.15; letter-spacing:-.02em;
  color:${NS.text}; margin-bottom:28px;
}
.close-headline em { font-style:italic; color:${NS.teal}; }
.close-lines { display:flex; flex-direction:column; gap:16px; margin-bottom:40px; }
.close-line {
  display:flex; align-items:flex-start; gap:12px;
  font-size:14px; line-height:1.7; color:${NS.textDim}; font-family:${NS.mono};
}
.close-line::before { content:'→'; color:${NS.teal}; flex-shrink:0; margin-top:2px; font-size:12px; }
.close-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:32px; }
.close-cta-mail {
  display:inline-flex; align-items:center; gap:12px;
  background:${NS.teal}; color:${NS.bg};
  font-family:${NS.mono}; font-size:11px; font-weight:500;
  letter-spacing:2px; text-transform:uppercase;
  padding:16px 28px; text-decoration:none; transition:opacity .2s; white-space:nowrap;
}
.close-cta-mail:hover { opacity:.85; }
.close-cta-mail .arr { width:16px; height:1px; background:${NS.bg}; position:relative; }
.close-cta-mail .arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${NS.bg}; border-top:1px solid ${NS.bg};
  transform:rotate(45deg);
}
.close-note {
  font-size:12px; color:${NS.textFaint}; line-height:1.7; font-style:italic;
  padding-top:20px; border-top:1px solid rgba(232,245,242,.07);
}

/* Foto chiusura */
.close-right { display:flex; flex-direction:column; align-items:center; gap:20px; }
.close-photo-wrap { position:relative; width:80%; max-width:280px; }
.close-photo-wrap::after {
  content:''; position:absolute; bottom:0; left:0; right:0;
  height:45%; background:linear-gradient(to top, ${NS.bg} 0%, transparent 100%);
  z-index:2; pointer-events:none;
}
.close-photo-wrap::before {
  content:''; position:absolute; top:-6px; left:-6px;
  width:50%; height:50%;
  border-top:1px solid ${NS.tealBorder}; border-left:1px solid ${NS.tealBorder};
  z-index:3; pointer-events:none;
}
.close-photo {
  position:relative; z-index:1; width:100%; aspect-ratio:3/4;
  object-fit:cover; object-position:top center; display:block;
  filter:grayscale(30%) contrast(1.05);
}
.close-photo-caption {
  text-align:center; font-family:${NS.serif}; font-size:.95rem;
  font-style:italic; color:${NS.textDim}; line-height:1.5;
}
.close-photo-caption span {
  color:${NS.teal}; display:block; font-style:normal;
  font-family:${NS.mono}; font-size:9px; letter-spacing:2px;
  text-transform:uppercase; margin-top:4px;
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.site-footer {
  position:relative; z-index:1;
  border-top:1px solid ${NS.tealBorder};
  padding:24px 64px;
  display:flex; justify-content:space-between; align-items:center;
  font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
  color:${NS.textFaint}; background:${NS.bg};
}
.site-footer a { color:${NS.teal}; text-decoration:none; }

/* ══════════════════════════════════════════
   PITCH SECTION (for timeline layout)
══════════════════════════════════════════ */
.c-pitch-section {
  padding: 56px 0 0;
  border-top: 1px solid ${pBorder};
}
.c-container { max-width: 1100px; margin: 0 auto; padding: 0 64px; }
.c-pitch-text {
  font-size: 17px; line-height: 1.75; color: ${pTextDim};
  max-width: 720px; margin-bottom: 12px; font-weight: 300;
}
.c-pitch-text:last-child { margin-bottom: 0; }

/* ══════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════ */
.tl-wrap { padding: 56px 0; }
.tl-container {
  max-width: 1100px; margin: 0 auto; padding: 0 64px;
  display: grid; grid-template-columns: 1fr auto 1fr;
  gap: 0; align-items: stretch;
}
.tl-card {
  padding: 32px 28px; border: 1px solid ${pBorder};
}
.tl-before { background: ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}; }
.tl-after { background: ${palette.primaryDim}; border-color: ${pPrimary}30; }
.tl-label {
  font-family: ${NS.mono}; font-size: 9px; letter-spacing: 3px;
  text-transform: uppercase; color: ${pTextFaint}; margin-bottom: 12px;
}
.tl-after .tl-label { color: ${pPrimary}; }
.tl-title {
  font-size: 1.1rem; font-weight: 700; color: ${pText};
  margin-bottom: 16px; line-height: 1.3;
}
.tl-points {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.tl-points li {
  font-size: 13px; line-height: 1.6; color: ${pTextDim};
  padding-left: 16px; position: relative; font-weight: 300;
}
.tl-points li::before {
  content: ''; position: absolute; left: 0; top: 8px;
  width: 5px; height: 5px; border-radius: 50%;
  background: ${pTextFaint};
}
.tl-after .tl-points li::before { background: ${pPrimary}; }
.tl-arrow {
  display: flex; align-items: center; justify-content: center;
  padding: 0 20px; color: ${pPrimary};
}

/* ══════════════════════════════════════════
   VALUE ROWS
══════════════════════════════════════════ */
.vr-wrap { padding: 0 0 56px; border-top: 1px solid ${pBorder}; }
.vr-container { max-width: 1100px; margin: 0 auto; padding: 0 64px; }
.vr-header { padding: 48px 0 36px; }
.vr-row {
  border-bottom: 1px solid ${pBorder};
  padding: 36px 0;
}
.vr-row:last-child { border-bottom: none; }
.vr-row-label {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 24px;
}
.vr-num {
  font-family: ${NS.mono}; font-size: 10px; letter-spacing: 2px;
  color: ${pPrimary}; font-weight: 700;
}
.vr-title {
  font-size: 1.3rem; font-weight: 700; color: ${pText};
  letter-spacing: -0.02em;
}
.vr-cols {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 2px;
}
.vr-col {
  padding: 28px 24px;
}
.vr-mine {
  background: ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"};
  border-left: 3px solid ${pTextFaint};
}
.vr-theirs {
  background: ${palette.primaryDim};
  border-left: 3px solid ${pPrimary};
}
.vr-col-tag {
  font-family: ${NS.mono}; font-size: 9px; letter-spacing: 2px;
  text-transform: uppercase; color: ${pTextFaint};
  margin-bottom: 12px;
}
.vr-theirs .vr-col-tag { color: ${pPrimary}; }
.vr-col-h {
  font-size: 15px; font-weight: 600; color: ${pText};
  margin-bottom: 14px; line-height: 1.35;
}
.vr-col-points {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 8px;
}
.vr-col-points li {
  font-size: 12.5px; line-height: 1.6; color: ${pTextDim};
  padding-left: 14px; position: relative; font-weight: 300;
}
.vr-col-points li::before {
  content: '\\2192'; position: absolute; left: 0; top: 0;
  font-size: 10px; color: ${pTextFaint};
}
.vr-theirs .vr-col-points li::before { color: ${pPrimary}; }

/* ══════════════════════════════════════════
   TAKEAWAYS
══════════════════════════════════════════ */
.tk-wrap {
  padding: 48px 0; border-top: 1px solid ${pBorder};
}
.tk-container {
  max-width: 1100px; margin: 0 auto; padding: 0 64px;
  display: flex; flex-direction: column; gap: 20px;
}
.tk-item {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 14px; line-height: 1.7; color: ${pTextDim};
  font-weight: 300;
}
.tk-item::before {
  content: '\\2192'; color: ${pPrimary}; flex-shrink: 0;
  margin-top: 1px; font-size: 13px;
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .nicola-hero { grid-template-columns:1fr; padding:48px 28px 64px; }
  .hero-right { order:-1; max-width:240px; margin:0 auto; }
  .page-topbar, .c-intro, .pillars-wrap, .nicola-close, .site-footer { padding-left:28px; padding-right:28px; }
  .prospect-topbar { padding:0 28px; }
  .method-block { grid-template-columns:1fr; }
  .method-text { border-right:none; border-bottom:1px solid ${pBorder}; padding:48px 28px; }
  .method-visual { padding:40px 28px; min-height:300px; }
  .pillars-grid { grid-template-columns:1fr; }
  .close-inner { grid-template-columns:1fr; gap:48px; }
  .close-right { order:-1; max-width:200px; margin:0 auto; }
  .prospect-topbar-tag { display:none; }
  .site-footer { flex-direction:column; gap:8px; }
  .c-container { padding:0 28px; }
  .tl-container { grid-template-columns:1fr; padding:0 28px; gap:16px; }
  .tl-arrow { transform:rotate(90deg); justify-self:center; }
  .vr-container { padding:0 28px; }
  .vr-cols { grid-template-columns:1fr; }
  .tk-container { padding:0 28px; }
}
@media(max-width:480px){
  .page-topbar { padding:20px 20px 0; }
  .nicola-hero { padding:36px 20px 48px; min-height:auto; }
  .hero-right { max-width:180px; }
  .hero-headline { font-size:2rem; }
  .hero-pills { display:none; }
  .c-intro { padding:48px 20px 0; }
  .prospect-topbar { padding:0 20px; height:56px; }
  .method-text { padding:36px 20px; }
  .method-visual { padding:36px 20px; }
  .pillars-wrap { padding:48px 20px; }
  .c-container { padding:0 20px; }
  .tl-container { padding:0 20px; }
  .vr-container { padding:0 20px; }
  .tk-container { padding:0 20px; }
  .nicola-close { padding:48px 20px; }
  .close-cta-row { flex-direction:column; }
  .close-cta-mail { justify-content:center; }
  .site-footer { padding:20px; }
  .glitch-zone { height:120px; }
}
  `;
}

/* ================================================================
   UNIBAG — Custom outreach: 3-month validation pitch
   ================================================================ */

function OutreachUnibag({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{unibagCSS()}</style>

      <div className="ub-bg-glow" />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (dark bg)
         ════════════════════════════════════════ */}
      <section className="ub-nicola" id="chi-sono">
        <div className="ub-nicola-left">
          <div className="ub-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="ub-ns-name">Nicola Serrao</h1>
          <div className="ub-ns-role">Digital Marketing Strategist</div>
          <p className="ub-ns-intro">
            Ho analizzato il vostro mercato e ho individuato un&apos;opportunit&agrave; concreta.
            Con il metodo giusto, in soli 3 mesi possiamo capire se Unibag pu&ograve; costruire
            un sistema di lead generation B2B profittevole.
          </p>
          <ul className="ub-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Analisi del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="ub-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="ub-nicola-right">
          <div className="ub-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="ub-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="ub-glitch-zone ub-glitch-fwd" id="il-progetto">
        <div className="ub-glitch-bg" />
        <div className="ub-glitch-scanlines" />
        <div className="ub-glitch-label">// quello che ho trovato</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — UNIBAG (warm beige bg)
         ════════════════════════════════════════ */}
      <section className="ub-prospect">

        {/* Prospect sticky topbar */}
        <div className="ub-prospect-topbar">
          <Image
            src={config.logo || "/favicon.png"}
            alt={config.companyName}
            width={160}
            height={38}
            style={{ objectFit: "contain", display: "block", maxWidth: 200 }}
          />
          <div className="ub-prospect-topbar-tag">Studio realizzato da Nicola Serrao</div>
        </div>

        {/* ─── Sub-section A: Vantaggio competitivo ─── */}
        <div className="ub-section-block">
          <div className="ub-eyebrow">Analisi</div>
          <h2 className="ub-headline">
            Avete qualcosa che i vostri<br />competitor non hanno.
          </h2>
          <div className="ub-two-col">
            <div className="ub-two-col-text">
              <p>
                La vostra certificazione Vinçotte OK Compost &mdash; conforme alla norma EN 13432:2002 &mdash;
                non &egrave; un claim marketing. &Egrave; un dato verificabile a livello europeo.
              </p>
              <p>
                Con il regolamento PPWR 2026 alle porte, chi acquista packaging ha bisogno di fornitori
                che garantiscano conformit&agrave; normativa. Voi ce l&apos;avete gi&agrave;.
              </p>
              <p>
                A questo si aggiunge un ciclo produttivo chiuso con il 100% degli scarti riciclati,
                personalizzazione tecnica avanzata e oltre 50 anni di esperienza nel territorio marchigiano.
                Questo non &egrave; &ldquo;green generico&rdquo; &mdash; &egrave; sostanza verificabile.
              </p>
            </div>
            <div className="ub-diff-card">
              <Image
                src="/images/outreach/unibag/bio.jpg"
                alt="Shopper biodegradabili Unibag"
                width={480}
                height={280}
                style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 8, marginBottom: 20, border: "1px solid rgba(27,27,27,0.08)" }}
              />
              <div className="ub-diff-card-title">I vostri differenziali</div>
              <ul className="ub-diff-list">
                <li>
                  <span className="ub-diff-bullet ub-diff-green" />
                  Certificazione Vinçotte OK Compost EN 13432
                </li>
                <li>
                  <span className="ub-diff-bullet ub-diff-green" />
                  Ciclo produttivo chiuso (100% scarti riciclati)
                </li>
                <li>
                  <span className="ub-diff-bullet" />
                  Personalizzazione tecnica (6 colori, formati custom)
                </li>
                <li>
                  <span className="ub-diff-bullet" />
                  Eredit&agrave; marchigiana 50+ anni
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Sub-section B: Competitor ─── */}
        <div className="ub-section-block ub-section-border">
          <div className="ub-eyebrow">Competitor</div>
          <h2 className="ub-headline">Il mercato vi sta aspettando.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 32 }}>
            <Image src="/images/outreach/unibag/flexiloop.jpg" alt="Flexiloop" width={360} height={240} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 8, border: "1px solid rgba(27,27,27,0.08)" }} />
            <Image src="/images/outreach/unibag/shopper.jpg" alt="Shopper" width={360} height={240} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 8, border: "1px solid rgba(27,27,27,0.08)" }} />
            <Image src="/images/outreach/unibag/patch.jpg" alt="Patch" width={360} height={240} style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 8, border: "1px solid rgba(27,27,27,0.08)" }} />
          </div>
          <div className="ub-comp-grid">
            <div className="ub-comp-card">
              <div className="ub-comp-name">Poliflex</div>
              <div className="ub-comp-location">Brescia</div>
              <p className="ub-comp-desc">Custom polietilene, sito moderno + SEO</p>
              <div className="ub-comp-tag ub-comp-tag-no">NO certificazione compostabile</div>
            </div>
            <div className="ub-comp-card">
              <div className="ub-comp-name">Milanesi Plast</div>
              <div className="ub-comp-location">Milano</div>
              <p className="ub-comp-desc">Storytelling 40 anni, LinkedIn B2B</p>
              <div className="ub-comp-tag ub-comp-tag-no">NO certificazione compostabile</div>
            </div>
            <div className="ub-comp-card">
              <div className="ub-comp-name">Sipi</div>
              <div className="ub-comp-location">Melzo</div>
              <p className="ub-comp-desc">B2B con filtri prodotti</p>
              <div className="ub-comp-tag ub-comp-tag-no">NO certificazione compostabile</div>
            </div>
          </div>
          <p className="ub-comp-note">
            Loro vincono su visibilit&agrave; digitale. Voi vincete sulla sostanza.
            Il gap si chiude con il metodo giusto.
          </p>
        </div>

        {/* ─── Sub-section C: La proposta — 3 mesi ─── */}
        <div className="ub-section-block ub-section-border">
          <div className="ub-eyebrow">Il metodo</div>
          <h2 className="ub-headline">3 mesi. Un test. La risposta.</h2>
          <p className="ub-sub">
            Con il giusto metodo, in soli 3 mesi possiamo capire se Unibag pu&ograve; avere
            un sistema di acquisizione clienti B2B profittevole.
          </p>

          <div className="ub-timeline">
            <div className="ub-tl-block">
              <div className="ub-tl-month">Mese 1</div>
              <div className="ub-tl-title">Strategia</div>
              <p className="ub-tl-desc">
                Definire target, messaggio, canali. Costruire gli asset. KPI chiari.
              </p>
            </div>
            <div className="ub-tl-connector" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="ub-tl-block">
              <div className="ub-tl-month">Mese 2</div>
              <div className="ub-tl-title">Test &amp; Analisi</div>
              <p className="ub-tl-desc">
                Lanciare, misurare, iterare. LinkedIn Ads + Google Ads. Dati reali, non ipotesi.
              </p>
            </div>
            <div className="ub-tl-connector" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="ub-tl-block">
              <div className="ub-tl-month">Mese 3</div>
              <div className="ub-tl-title">Risultato</div>
              <p className="ub-tl-desc">
                Sapere con certezza: quanto costa un lead, quanti diventano clienti, se il sistema &egrave; profittevole.
              </p>
            </div>
          </div>

          <div className="ub-highlight-box">
            Se funziona, si scala. Se non funziona, avrete comunque dati e chiarezza che prima non avevate.
            <strong> In entrambi i casi, vincete.</strong>
          </div>
        </div>

        {/* ─── Sub-section D: Cosa porto al tavolo ─── */}
        <div className="ub-section-block ub-section-border" id="competenze">
          <div className="ub-eyebrow">Cosa porto al tavolo</div>

          {/* Row 1 — Strategia */}
          <div className="ub-vr-row">
            <div className="ub-vr-label">
              <span className="ub-vr-num">01</span>
              <span className="ub-vr-title">Strategia</span>
            </div>
            <div className="ub-vr-cols">
              <div className="ub-vr-col ub-vr-mine">
                <p>Posizionamento &ldquo;partner green compliant PPWR 2026&rdquo;. Funnel B2B strutturato. Target: responsabili acquisti packaging Marche/Lombardia.</p>
              </div>
              <div className="ub-vr-col ub-vr-theirs">
                <p>Sapere esattamente chi contattare, con quale messaggio, su quale canale. Zero budget sprecato.</p>
              </div>
            </div>
          </div>

          {/* Row 2 — Analisi */}
          <div className="ub-vr-row">
            <div className="ub-vr-label">
              <span className="ub-vr-num">02</span>
              <span className="ub-vr-title">Analisi</span>
            </div>
            <div className="ub-vr-cols">
              <div className="ub-vr-col ub-vr-mine">
                <p>KPI dal giorno uno. 20 lead/mese come obiettivo iniziale. Ogni euro tracciato. Feedback loop settimanale.</p>
              </div>
              <div className="ub-vr-col ub-vr-theirs">
                <p>Numeri reali ogni settimana. Sapere se funziona o no &mdash; e perch&eacute;. Decisioni basate su dati, non sensazioni.</p>
              </div>
            </div>
          </div>

          {/* Row 3 — Creativita */}
          <div className="ub-vr-row">
            <div className="ub-vr-label">
              <span className="ub-vr-num">03</span>
              <span className="ub-vr-title">Creativit&agrave;</span>
            </div>
            <div className="ub-vr-cols">
              <div className="ub-vr-col ub-vr-mine">
                <p>Video produzione 30 secondi. Case study &ldquo;Da scarto a loyalty&rdquo;. Calcolatore prezzi online. Campioni gratis post-call.</p>
              </div>
              <div className="ub-vr-col ub-vr-theirs">
                <p>Comunicare il vostro vero valore: non &ldquo;sacchetti green&rdquo; generico, ma certificazione verificabile + made in Italy + personalizzazione estrema.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Sub-section E: Takeaways ─── */}
        <div className="ub-takeaways">
          <div className="ub-tk-item">
            Queste sono idee embrionali da un&apos;analisi rapida &mdash; il valore vero esce solo da una chiacchierata di 15 minuti.
          </div>
          <div className="ub-tk-item">
            Non serve stravolgere nulla: si parte da quello che avete gi&agrave; e si costruisce un sistema misurabile.
          </div>
          <div className="ub-tk-item">
            Se ci sono i presupposti, lo capiamo in una call veloce. Senza impegno.
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="ub-glitch-zone ub-glitch-bwd">
        <div className="ub-glitch-bg" />
        <div className="ub-glitch-scanlines" />
        <div className="ub-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING NICOLA
         ════════════════════════════════════════ */}
      <section className="ub-close" id="parliamone">
        <div className="ub-close-inner">
          <div className="ub-close-eyebrow">Prossimo passo</div>
          <h2 className="ub-close-headline">
            15 minuti per capire<br />se ha senso.
          </h2>
          <p className="ub-close-sub">
            Ho informazioni fresche sul vostro mercato. Vi racconto quello che ho trovato &mdash; poi decidete voi.
          </p>
          <div className="ub-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="ub-close-cta"
            >
              Prenota una call
              <span className="ub-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent("Ciao Nicola, ho visto la vostra analisi per Unibag. Vorrei parlarne.")}`}
            className="ub-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="ub-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── Unibag CSS ── */
function unibagCSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* Unibag palette — warm beige, professional */
  const u = {
    bg: "#f0ede5",
    primary: "#0066cc",
    green: "#218506",
    cardBg: "#ffffff",
    midBg: "#e8e4dc",
    text: "#1b1b1b",
    textDim: "#414546",
    textFaint: "rgba(27,27,27,0.35)",
    border: "rgba(27,27,27,0.08)",
    font: "'Inter', system-ui, -apple-system, sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   UNIBAG — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.ub-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.ub-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 80px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.ub-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.ub-ns-logo-row { margin-bottom: 20px; animation: ubFadeUp .6s ease both; }
.ub-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: ubFadeUp .6s .05s ease both;
}
.ub-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: ubFadeUp .6s .1s ease both;
}
.ub-ns-intro {
  font-size: 15px; line-height: 1.8; color: ${n.textDim};
  max-width: 520px; margin-bottom: 32px;
  animation: ubFadeUp .6s .15s ease both;
}
.ub-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: ubFadeUp .6s .2s ease both;
}
.ub-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.ub-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.ub-clock { font-variant-numeric: tabular-nums; }
.ub-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.ub-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: ubFadeUp .6s .2s ease both;
}
.ub-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.ub-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes ubFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.ub-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.ub-glitch-fwd .ub-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${u.bg} 100%);
}
.ub-glitch-bwd .ub-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${u.bg} 0%, ${n.bg} 100%);
}
.ub-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: ubScan 6s linear infinite;
}
@keyframes ubScan { from{background-position:0 0} to{background-position:0 40px} }
.ub-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: ubGltch 4s infinite;
}
@keyframes ubGltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT (Unibag)
══════════════════════════════════════════ */
.ub-prospect {
  background: ${u.bg}; color: ${u.text};
  font-family: ${u.font}; position: relative; z-index: 1;
}
.ub-prospect-topbar {
  background: rgba(240,237,229,0.95); border-bottom: 1px solid ${u.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.ub-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${u.textFaint};
}

/* Section blocks */
.ub-section-block { padding: 56px 64px; max-width: 1100px; margin: 0 auto; }
.ub-section-border { border-top: 1px solid ${u.border}; }
.ub-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${u.primary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.ub-eyebrow::before { content:''; width:24px; height:1px; background:${u.primary}; }
.ub-headline {
  font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${u.text}; max-width: 780px;
  margin-bottom: 20px; letter-spacing: -0.02em;
}
.ub-sub {
  font-size: 16px; line-height: 1.8; color: ${u.textDim};
  max-width: 640px; margin-bottom: 40px; font-weight: 300;
}

/* ═════════ Sub-A: Two-col with diff card ═════════ */
.ub-two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 32px;
}
.ub-two-col-text p {
  font-size: 15px; line-height: 1.8; color: ${u.textDim}; font-weight: 300;
  margin-bottom: 16px;
}
.ub-diff-card {
  background: ${u.cardBg}; border: 1px solid ${u.border};
  padding: 32px; border-radius: 2px;
}
.ub-diff-card-title {
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: ${u.primary}; font-weight: 600; margin-bottom: 24px;
}
.ub-diff-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
.ub-diff-list li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; line-height: 1.6; color: ${u.text}; font-weight: 400;
}
.ub-diff-bullet {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px;
  background: ${u.primary};
}
.ub-diff-green { background: ${u.green}; }

/* ═════════ Sub-B: Competitor grid ═════════ */
.ub-comp-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;
}
.ub-comp-card {
  background: ${u.cardBg}; border: 1px solid ${u.border};
  padding: 28px 24px; border-radius: 2px;
}
.ub-comp-name {
  font-size: 16px; font-weight: 700; color: ${u.text}; margin-bottom: 2px;
}
.ub-comp-location {
  font-size: 11px; color: ${u.textFaint}; letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 12px;
}
.ub-comp-desc {
  font-size: 13px; line-height: 1.7; color: ${u.textDim}; font-weight: 300;
  margin-bottom: 16px;
}
.ub-comp-tag {
  font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
  font-weight: 600; padding: 6px 12px; display: inline-block; border-radius: 2px;
}
.ub-comp-tag-no {
  background: rgba(200,50,50,0.08); color: #b33;
}
.ub-comp-note {
  font-size: 15px; line-height: 1.7; color: ${u.textDim}; font-weight: 400;
  font-style: italic; text-align: center; padding-top: 8px;
}

/* ═════════ Sub-C: Timeline ═════════ */
.ub-timeline {
  display: flex; align-items: stretch; gap: 0; margin-bottom: 32px;
}
.ub-tl-block {
  flex: 1; padding: 32px 24px; text-align: center;
  background: ${u.cardBg}; border: 1px solid ${u.border};
}
.ub-tl-month {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: ${u.primary}; font-weight: 700; margin-bottom: 8px;
}
.ub-tl-title {
  font-size: 18px; font-weight: 700; color: ${u.text};
  margin-bottom: 12px; letter-spacing: -0.01em;
}
.ub-tl-desc {
  font-size: 13px; line-height: 1.7; color: ${u.textDim}; font-weight: 300;
}
.ub-tl-connector {
  display: flex; align-items: center; justify-content: center;
  padding: 0 10px; color: ${u.primary}; flex-shrink: 0;
}

.ub-highlight-box {
  background: ${u.cardBg}; border-left: 3px solid ${u.primary};
  padding: 24px 28px; font-size: 15px; line-height: 1.7;
  color: ${u.text}; font-weight: 300;
}
.ub-highlight-box strong { font-weight: 600; color: ${u.primary}; }

/* ═════════ Sub-D: Value rows ═════════ */
.ub-vr-row {
  border-bottom: 1px solid ${u.border}; padding: 36px 0;
}
.ub-vr-row:last-child { border-bottom: none; }
.ub-vr-label {
  display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
}
.ub-vr-num {
  font-family: ${n.mono}; font-size: 10px; letter-spacing: 2px;
  color: ${u.primary}; font-weight: 700;
}
.ub-vr-title {
  font-size: 1.3rem; font-weight: 700; color: ${u.text};
  letter-spacing: -0.02em;
}
.ub-vr-cols {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
}
.ub-vr-col { padding: 24px 20px; }
.ub-vr-col p {
  font-size: 14px; line-height: 1.75; color: ${u.textDim}; font-weight: 300;
}
.ub-vr-mine {
  background: ${u.midBg};
  border-left: 3px solid ${u.border};
}
.ub-vr-theirs {
  background: ${u.cardBg};
  border-left: 3px solid ${u.primary};
}

/* ═════════ Sub-E: Takeaways ═════════ */
.ub-takeaways {
  padding: 48px 64px; max-width: 1100px; margin: 0 auto;
  border-top: 1px solid ${u.border};
  display: flex; flex-direction: column; gap: 20px;
}
.ub-tk-item {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 14px; line-height: 1.7; color: ${u.textDim}; font-weight: 300;
}
.ub-tk-item::before {
  content: '\\2192'; color: ${u.primary}; flex-shrink: 0;
  margin-top: 1px; font-size: 13px;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING
══════════════════════════════════════════ */
.ub-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.ub-close-inner { max-width: 700px; margin: 0 auto; }
.ub-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.ub-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.ub-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.ub-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.ub-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.ub-close-cta-row { margin-bottom: 20px; }
.ub-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.ub-close-cta:hover { opacity: 0.85; }
.ub-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.ub-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.ub-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.ub-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.ub-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .ub-nicola { grid-template-columns: 1fr; padding: 80px 28px 64px; gap: 40px; }
  .ub-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .ub-prospect-topbar { padding: 0 28px; }
  .ub-prospect-topbar-tag { display: none; }
  .ub-section-block { padding: 48px 28px; }
  .ub-two-col { grid-template-columns: 1fr; gap: 24px; }
  .ub-comp-grid { grid-template-columns: 1fr; }
  .ub-timeline { flex-direction: column; gap: 0; }
  .ub-tl-connector { transform: rotate(90deg); padding: 8px 0; }
  .ub-vr-cols { grid-template-columns: 1fr; }
  .ub-takeaways { padding: 40px 28px; }
  .ub-close { padding: 64px 28px; }
  .ub-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .ub-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .ub-nicola { padding: 60px 20px 48px; min-height: auto; }
  .ub-nicola-right { max-width: 160px; }
  .ub-ns-name { font-size: 2rem; }
  .ub-section-block { padding: 40px 20px; }
  .ub-takeaways { padding: 32px 20px; }
  .ub-close { padding: 48px 20px; }
  .ub-footer { padding: 16px 20px; }
  .ub-glitch-zone { height: 100px; }
  .ub-prospect-topbar { padding: 0 20px; height: 56px; }
}
  `;
}

/* ================================================================
   NET IMPIANTI — SITE DEMO (outreach as website mockup)
   ================================================================ */

function OutreachNetImpianti({ config, slug }: { config: OutreachConfig; slug: string }) {
  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{netImpiantiCSS()}</style>

      {/* ── Banner Nicola (sottile, non invasivo) ── */}
      <div className="ni-banner">
        <span>
          Bozza realizzata da <strong>Nicola Serrao</strong> per N.E.T. Impianti &mdash;{" "}
          <a href="#ni-perche">Scopri perch&eacute; &darr;</a>
        </span>
      </div>

      {/* ── Navbar ── */}
      <nav className="ni-nav">
        <div className="ni-nav-inner">
          <a href="#" className="ni-nav-logo">
            <Image src="/images/outreach/net-impianti/logo.png" alt="N.E.T. Impianti" width={140} height={40} style={{ objectFit: "contain" }} />
          </a>
          <div className="ni-nav-links">
            <a href="#ni-servizi">Servizi</a>
            <a href="#ni-progetti">Progetti</a>
            <a href="#ni-chi-siamo">Chi siamo</a>
            <a href="#ni-contatti" className="ni-nav-cta">Preventivo gratuito</a>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="ni-hero">
        <div className="ni-hero-content">
          <div className="ni-hero-eyebrow">Impianti elettrici &middot; Telecomunicazioni &middot; Dal 2004</div>
          <h1 className="ni-hero-h1">
            Progettiamo impianti elettrici<br />
            che fanno funzionare<br />
            <em>le aziende che contano.</em>
          </h1>
          <p className="ni-hero-sub">
            Da oltre 20 anni, NET Impianti realizza soluzioni elettriche e di telecomunicazione per
            l&apos;industria, il civile e le grandi infrastrutture. Da Falconara Marittima all&apos;Europa.
          </p>
          <div className="ni-hero-cta-row">
            <a href="#ni-contatti" className="ni-btn-primary">
              Richiedi preventivo gratuito
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#ni-progetti" className="ni-btn-ghost">Guarda i progetti</a>
          </div>
          <div className="ni-hero-stats">
            <div className="ni-stat">
              <span className="ni-stat-num">20+</span>
              <span className="ni-stat-label">Anni di esperienza</span>
            </div>
            <div className="ni-stat-divider" />
            <div className="ni-stat">
              <span className="ni-stat-num">2.3M&euro;</span>
              <span className="ni-stat-label">Fatturato 2023</span>
            </div>
            <div className="ni-stat-divider" />
            <div className="ni-stat">
              <span className="ni-stat-num">12</span>
              <span className="ni-stat-label">Specialisti</span>
            </div>
            <div className="ni-stat-divider" />
            <div className="ni-stat">
              <span className="ni-stat-num">EU</span>
              <span className="ni-stat-label">Progetti internazionali</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo slider ── */}
      <LogoSlider />

      {/* ════════════════════════════════════════
          SERVIZI
      ════════════════════════════════════════ */}
      <section className="ni-section ni-section-light" id="ni-servizi">
        <div className="ni-container">
          <div className="ni-section-header">
            <span className="ni-eyebrow">Servizi</span>
            <h2 className="ni-h2">Soluzioni per ogni scala di progetto</h2>
            <p className="ni-section-sub">Dal piccolo intervento civile ai grandi impianti industriali e infrastrutturali.</p>
          </div>
          <div className="ni-services-grid">
            <div className="ni-service-card">
              <div className="ni-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </div>
              <h3 className="ni-service-title">Impianti civili</h3>
              <p className="ni-service-desc">Progettazione e installazione di impianti elettrici per edifici residenziali e commerciali. Certificazioni e conformit&agrave; normativa.</p>
            </div>
            <div className="ni-service-card">
              <div className="ni-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20M5 20V10l7-6 7 6v10" /><rect x="9" y="14" width="6" height="6" /></svg>
              </div>
              <h3 className="ni-service-title">Impianti industriali</h3>
              <p className="ni-service-desc">Soluzioni elettriche per stabilimenti produttivi, centrali energetiche e infrastrutture critiche. Esperienza su progetti Enel e Tirreno Power.</p>
            </div>
            <div className="ni-service-card">
              <div className="ni-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <h3 className="ni-service-title">Telecomunicazioni</h3>
              <p className="ni-service-desc">Reti dati, fibra ottica, cablaggi strutturati e sistemi di comunicazione per aziende e enti pubblici.</p>
            </div>
            <div className="ni-service-card">
              <div className="ni-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
              </div>
              <h3 className="ni-service-title">Manutenzione</h3>
              <p className="ni-service-desc">Assistenza programmata e interventi rapidi. Contratti di manutenzione per garantire continuit&agrave; operativa ai vostri impianti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROGETTI
      ════════════════════════════════════════ */}
      <section className="ni-section ni-section-dark" id="ni-progetti">
        <div className="ni-container">
          <div className="ni-section-header ni-section-header--light">
            <span className="ni-eyebrow ni-eyebrow--light">Progetti</span>
            <h2 className="ni-h2 ni-h2--light">Dall&apos;Italia all&apos;Europa</h2>
            <p className="ni-section-sub ni-section-sub--light">Alcuni dei progetti pi&ugrave; significativi realizzati dal nostro team.</p>
          </div>
          <div className="ni-projects-grid">
            <div className="ni-project-card ni-project-featured">
              <Image
                src="/images/outreach/net-impianti/enel-slovacchia.jpg"
                alt="Centrale Enel — Slovacchia"
                width={1120}
                height={480}
                className="ni-project-img"
              />
              <div className="ni-project-info">
                <span className="ni-project-tag">Internazionale &middot; Industriale</span>
                <h3 className="ni-project-title">Centrale Enel &mdash; Slovacchia</h3>
                <p className="ni-project-desc">Impianto elettrico completo per centrale di produzione energetica. Progettazione, installazione e collaudo in conformit&agrave; agli standard europei.</p>
              </div>
            </div>
            <div className="ni-project-card">
              <Image
                src="/images/outreach/net-impianti/tirreno-power.jpg"
                alt="Centrale Tirreno Power"
                width={560}
                height={315}
                className="ni-project-img"
              />
              <div className="ni-project-info">
                <span className="ni-project-tag">Nazionale &middot; Energia</span>
                <h3 className="ni-project-title">Centrale Tirreno Power</h3>
                <p className="ni-project-desc">Interventi di manutenzione e potenziamento degli impianti elettrici della centrale.</p>
              </div>
            </div>
            <div className="ni-project-card">
              <Image
                src="/images/outreach/net-impianti/piattaforma.jpg"
                alt="Piattaforme industriali"
                width={560}
                height={315}
                className="ni-project-img"
              />
              <div className="ni-project-info">
                <span className="ni-project-tag">Infrastrutture &middot; Speciale</span>
                <h3 className="ni-project-title">Piattaforme industriali</h3>
                <p className="ni-project-desc">Installazione e cablaggio elettrico per piattaforme operative in ambienti complessi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHI SIAMO
      ════════════════════════════════════════ */}
      <section className="ni-section ni-section-light" id="ni-chi-siamo">
        <div className="ni-container">
          <div className="ni-about-grid">
            <div className="ni-about-text">
              <span className="ni-eyebrow">Chi siamo</span>
              <h2 className="ni-h2">Un team che costruisce con passione dal 2004</h2>
              <p className="ni-about-body">
                N.E.T. Impianti nasce a Falconara Marittima con una missione chiara: offrire soluzioni
                elettriche e di telecomunicazione affidabili, sicure e all&apos;avanguardia.
              </p>
              <p className="ni-about-body">
                In oltre 20 anni abbiamo costruito un team di 12 specialisti capaci di operare
                su progetti di qualsiasi dimensione &mdash; dal piccolo impianto civile alle grandi
                centrali energetiche internazionali.
              </p>
              <p className="ni-about-body">
                La nostra forza? Esperienza su grandi progetti, presenza radicata nel territorio
                e un&apos;assistenza che non si ferma alla consegna.
              </p>
            </div>
            <div className="ni-about-numbers">
              <div className="ni-about-num-card">
                <span className="ni-about-num">2004</span>
                <span className="ni-about-num-label">Anno di fondazione</span>
              </div>
              <div className="ni-about-num-card">
                <span className="ni-about-num">12</span>
                <span className="ni-about-num-label">Professionisti nel team</span>
              </div>
              <div className="ni-about-num-card">
                <span className="ni-about-num">2.3M&euro;</span>
                <span className="ni-about-num-label">Fatturato 2023</span>
              </div>
              <div className="ni-about-num-card">
                <span className="ni-about-num">+48%</span>
                <span className="ni-about-num-label">Crescita ricavi YoY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTATTI
      ════════════════════════════════════════ */}
      <section className="ni-section ni-section-light ni-contacts" id="ni-contatti">
        <div className="ni-container">
          <div className="ni-contact-grid">
            <div className="ni-contact-text">
              <span className="ni-eyebrow">Contatti</span>
              <h2 className="ni-h2">Parliamo del vostro progetto</h2>
              <p className="ni-about-body">
                Compilate il form e vi ricontatteremo entro 24 ore con una valutazione preliminare gratuita.
              </p>
              <div className="ni-contact-info">
                <div className="ni-contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  <span>071 7497830</span>
                </div>
                <div className="ni-contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span>Via del Lavoro 2, Falconara M. (AN)</span>
                </div>
                <div className="ni-contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                  <span>P.IVA 02187070426</span>
                </div>
              </div>
            </div>
            <div className="ni-contact-form-wrap">
              {/* NetImpiantiForm removed — outreach cleanup pending */}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          NOTA NICOLA (sottile, in fondo)
      ════════════════════════════════════════ */}
      <section className="ni-nicola-note" id="ni-perche">
        <div className="ni-container">
          <div className="ni-note-inner">
            <Image src="/favicon.png" alt="NS" width={32} height={32} style={{ objectFit: "contain", opacity: 0.8 }} />
            <div className="ni-note-text">
              <p className="ni-note-main">
                Questa bozza &egrave; stata creata da <strong>Nicola Serrao</strong>, Digital Marketing Strategist.
                Creare siti web non &egrave; il mio forte &mdash; io mi occupo di strategia marketing.
              </p>
              <p className="ni-note-main">
                Ma volevo farvi vedere cosa si potrebbe fare con la vostra presenza online.
                Se internamente avete mai pensato di investire nel marketing digitale per generare
                pi&ugrave; richieste di preventivo, questa potrebbe essere un&apos;occasione per conoscerci.
              </p>
              <a href={`mailto:${SITE.email}?subject=NET%20Impianti%20%E2%80%94%20Ho%20visto%20la%20bozza`} className="ni-note-cta">
                Scrivimi &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="ni-footer">
        <div className="ni-container">
          <div className="ni-footer-grid">
            <div>
              <span className="ni-footer-brand">&#9889; N.E.T. Impianti</span>
              <p className="ni-footer-desc">Network Electrical And Telecommunication S.r.l.</p>
            </div>
            <div className="ni-footer-col">
              <span className="ni-footer-label">Sede</span>
              <span>Via del Lavoro 2</span>
              <span>60015 Falconara Marittima (AN)</span>
            </div>
            <div className="ni-footer-col">
              <span className="ni-footer-label">Contatti</span>
              <span>Tel: 071 7497830</span>
              <span>P.IVA: 02187070426</span>
            </div>
          </div>
          <div className="ni-footer-bottom">
            <span>&copy; 2026 N.E.T. Impianti S.r.l. &mdash; Tutti i diritti riservati</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── NET IMPIANTI CSS ── */
function netImpiantiCSS(): string {
  const navy = "#0a1628";
  const blue = "#3b82f6";
  const orange = "#f59e0b";
  const light = "#f8fafc";
  const white = "#ffffff";
  const textDark = "#1e293b";
  const textDim = "#64748b";
  const border = "rgba(30,41,59,0.08)";

  return `
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${white}; color: ${textDark}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

.ni-container { max-width: 1120px; margin: 0 auto; padding: 0 48px; }

/* ── Banner Nicola ── */
.ni-banner {
  background: ${navy}; color: rgba(248,250,252,0.7);
  text-align: center; padding: 10px 24px;
  font-size: 12px; letter-spacing: 0.3px; line-height: 1.5;
  position: relative; z-index: 50;
}
.ni-banner strong { color: #fff; }
.ni-banner a { color: ${blue}; text-decoration: none; }
.ni-banner a:hover { text-decoration: underline; }

/* ── Navbar ── */
.ni-nav {
  position: sticky; top: 0; z-index: 40;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${border};
  padding: 0 48px;
}
.ni-nav-inner {
  max-width: 1120px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.ni-nav-logo {
  display: flex; align-items: center; gap: 8px;
  font-size: 16px; font-weight: 700; color: ${navy};
  text-decoration: none; letter-spacing: -0.02em;
}
.ni-nav-logo-icon { font-size: 20px; }
.ni-nav-links { display: flex; align-items: center; gap: 32px; }
.ni-nav-links a {
  font-size: 13px; font-weight: 500; color: ${textDim};
  text-decoration: none; transition: color 0.2s;
}
.ni-nav-links a:hover { color: ${textDark}; }
.ni-nav-cta {
  background: ${orange} !important; color: ${white} !important;
  padding: 8px 20px !important; border-radius: 6px;
  font-weight: 600 !important; font-size: 12px !important;
  letter-spacing: 0.3px; transition: opacity 0.2s !important;
}
.ni-nav-cta:hover { opacity: 0.9; }

/* ── Hero ── */
.ni-hero {
  background: ${navy}; color: #fff;
  padding: 120px 48px 80px; position: relative;
  overflow: hidden;
}
.ni-hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 60% at 70% 40%, rgba(59,130,246,0.08) 0%, transparent 70%);
}
.ni-hero-content { max-width: 1120px; margin: 0 auto; position: relative; z-index: 1; }
.ni-hero-eyebrow {
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: ${blue}; margin-bottom: 28px; font-weight: 500;
}
.ni-hero-h1 {
  font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 800;
  line-height: 1.1; letter-spacing: -0.03em;
  margin-bottom: 24px; max-width: 720px;
}
.ni-hero-h1 em { font-style: italic; color: ${blue}; }
.ni-hero-sub {
  font-size: 17px; line-height: 1.75; color: rgba(248,250,252,0.6);
  max-width: 560px; margin-bottom: 40px; font-weight: 300;
}
.ni-hero-cta-row { display: flex; gap: 16px; margin-bottom: 56px; flex-wrap: wrap; }
.ni-btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  background: ${orange}; color: ${white};
  font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
  padding: 14px 28px; border-radius: 8px; text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.ni-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.3); }
.ni-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: rgba(248,250,252,0.7);
  font-size: 13px; font-weight: 500;
  padding: 14px 28px; border-radius: 8px; text-decoration: none;
  border: 1px solid rgba(248,250,252,0.15);
  transition: all 0.2s;
}
.ni-btn-ghost:hover { color: #fff; border-color: rgba(248,250,252,0.3); background: rgba(248,250,252,0.05); }

/* Stats */
.ni-hero-stats {
  display: flex; align-items: center; gap: 0;
}
.ni-stat { display: flex; flex-direction: column; gap: 4px; padding: 0 32px; }
.ni-stat:first-child { padding-left: 0; }
.ni-stat-num {
  font-size: 28px; font-weight: 800; color: #fff;
  letter-spacing: -0.03em; line-height: 1;
}
.ni-stat-label {
  font-size: 11px; color: rgba(248,250,252,0.4);
  letter-spacing: 0.5px;
}
.ni-stat-divider {
  width: 1px; height: 40px; background: rgba(248,250,252,0.1);
}

/* ── Logo Slider ── */
.ni-slider-wrap {
  background: ${light}; border-bottom: 1px solid ${border};
  padding: 24px 0; overflow: hidden;
}
.ni-slider-label {
  text-align: center; font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; color: ${textDim}; margin-bottom: 20px;
}
.ni-slider-track { overflow: hidden; position: relative; }
.ni-slider-inner {
  display: flex; gap: 48px; animation: niSlide 20s linear infinite;
  width: max-content;
}
.ni-slider-item {
  font-size: 14px; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: rgba(30,41,59,0.2);
  white-space: nowrap; flex-shrink: 0;
}
@keyframes niSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── Sections ── */
.ni-section { padding: 96px 0; }
.ni-section-light { background: ${white}; }
.ni-section-dark { background: ${navy}; }
.ni-section-header { text-align: center; margin-bottom: 64px; }
.ni-eyebrow {
  display: inline-block; font-size: 11px; letter-spacing: 3px;
  text-transform: uppercase; color: ${blue}; font-weight: 600;
  margin-bottom: 16px;
}
.ni-eyebrow--light { color: rgba(59,130,246,0.8); }
.ni-h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800;
  line-height: 1.15; letter-spacing: -0.02em;
  color: ${textDark}; margin-bottom: 16px;
}
.ni-h2--light { color: #fff; }
.ni-section-sub { font-size: 16px; line-height: 1.7; color: ${textDim}; max-width: 520px; margin: 0 auto; }
.ni-section-sub--light { color: rgba(248,250,252,0.5); }

/* ── Services Grid ── */
.ni-services-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
}
.ni-service-card {
  padding: 36px 28px; background: ${light};
  border: 1px solid ${border}; border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ni-service-card:hover {
  border-color: rgba(59,130,246,0.2);
  box-shadow: 0 4px 20px rgba(59,130,246,0.06);
}
.ni-service-icon { color: ${blue}; margin-bottom: 20px; }
.ni-service-title { font-size: 16px; font-weight: 700; color: ${textDark}; margin-bottom: 10px; }
.ni-service-desc { font-size: 13px; line-height: 1.7; color: ${textDim}; }

/* ── Projects Grid ── */
.ni-projects-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.ni-project-featured { grid-column: 1 / -1; }
.ni-project-card {
  border-radius: 12px; overflow: hidden;
  border: 1px solid rgba(248,250,252,0.08);
  background: rgba(248,250,252,0.03);
  transition: border-color 0.2s;
}
.ni-project-card:hover { border-color: rgba(59,130,246,0.3); }
.ni-project-img {
  width: 100%; height: auto; aspect-ratio: 16/9;
  object-fit: cover; display: block;
}
.ni-project-featured .ni-project-img { aspect-ratio: 21/9; }
.ni-project-info { padding: 24px; }
.ni-project-tag {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: ${blue}; margin-bottom: 8px; display: block;
}
.ni-project-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.ni-project-desc { font-size: 13px; line-height: 1.7; color: rgba(248,250,252,0.5); }

/* ── About ── */
.ni-about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
.ni-about-body { font-size: 15px; line-height: 1.8; color: ${textDim}; margin-bottom: 16px; }
.ni-about-numbers {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.ni-about-num-card {
  padding: 28px 24px; background: ${light};
  border: 1px solid ${border}; border-radius: 12px;
  text-align: center;
}
.ni-about-num {
  display: block; font-size: 2rem; font-weight: 800;
  color: ${navy}; letter-spacing: -0.03em; line-height: 1;
  margin-bottom: 6px;
}
.ni-about-num-label { font-size: 11px; color: ${textDim}; letter-spacing: 0.3px; }

/* ── Contact ── */
.ni-contacts { background: ${light} !important; border-top: 1px solid ${border}; }
.ni-contact-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;
}
.ni-contact-info { margin-top: 24px; display: flex; flex-direction: column; gap: 14px; }
.ni-contact-item {
  display: flex; align-items: center; gap: 12px;
  font-size: 14px; color: ${textDim};
}
.ni-contact-item svg { color: ${blue}; flex-shrink: 0; }

/* Form */
.ni-form { display: flex; flex-direction: column; gap: 0; }
.ni-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ni-field-full { grid-column: 1 / -1; }
.ni-label { display: block; font-size: 12px; font-weight: 600; color: ${textDark}; margin-bottom: 6px; }
.ni-input, .ni-textarea, .ni-select {
  width: 100%; padding: 12px 14px; border: 1px solid ${border};
  border-radius: 8px; font-size: 14px; font-family: inherit;
  color: ${textDark}; background: ${white};
  transition: border-color 0.2s;
}
.ni-input:focus, .ni-textarea:focus, .ni-select:focus {
  outline: none; border-color: ${blue};
}
.ni-textarea { resize: vertical; }
.ni-select { appearance: none; cursor: pointer; }
.ni-accordion-toggle {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 14px 0; margin-top: 8px;
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: ${blue}; font-weight: 500;
  font-family: inherit;
}
.ni-accordion-icon { transition: transform 0.2s; }
.ni-accordion-open .ni-accordion-icon { transform: rotate(180deg); }
.ni-accordion-body { padding: 0 0 16px; animation: niFadeIn 0.3s ease; }
@keyframes niFadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
.ni-submit {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; padding: 14px 28px; margin-top: 16px;
  background: ${orange}; color: ${white};
  font-size: 14px; font-weight: 600; font-family: inherit;
  border: none; border-radius: 8px; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.ni-submit:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(245,158,11,0.3); }

/* ── Nota Nicola ── */
.ni-nicola-note {
  background: ${navy}; padding: 64px 0;
}
.ni-note-inner {
  display: flex; gap: 24px; align-items: flex-start;
  max-width: 640px;
}
.ni-note-text { display: flex; flex-direction: column; gap: 12px; }
.ni-note-main {
  font-size: 14px; line-height: 1.75; color: rgba(248,250,252,0.6);
}
.ni-note-main strong { color: #fff; }
.ni-note-cta {
  display: inline-block; color: ${blue}; font-size: 13px;
  font-weight: 600; text-decoration: none; margin-top: 8px;
  transition: opacity 0.2s;
}
.ni-note-cta:hover { opacity: 0.8; }

/* ── Footer ── */
.ni-footer { background: ${navy}; border-top: 1px solid rgba(248,250,252,0.06); padding: 48px 0 24px; }
.ni-footer-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 48px;
  padding-bottom: 32px; border-bottom: 1px solid rgba(248,250,252,0.06);
}
.ni-footer-brand {
  font-size: 18px; font-weight: 700; color: #fff;
  display: block; margin-bottom: 8px;
}
.ni-footer-desc { font-size: 12px; color: rgba(248,250,252,0.4); line-height: 1.5; }
.ni-footer-col { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: rgba(248,250,252,0.5); }
.ni-footer-label { font-size: 11px; font-weight: 600; color: rgba(248,250,252,0.3); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
.ni-footer-bottom { padding-top: 20px; font-size: 11px; color: rgba(248,250,252,0.25); }

/* ── Responsive ── */
@media (max-width: 960px) {
  .ni-container { padding: 0 28px; }
  .ni-hero { padding: 80px 28px 60px; }
  .ni-services-grid { grid-template-columns: 1fr 1fr; }
  .ni-projects-grid { grid-template-columns: 1fr; }
  .ni-about-grid { grid-template-columns: 1fr; gap: 40px; }
  .ni-contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .ni-footer-grid { grid-template-columns: 1fr; gap: 24px; }
  .ni-nav { padding: 0 28px; }
  .ni-hero-stats { flex-wrap: wrap; gap: 20px; }
  .ni-stat { padding: 0 20px; }
}
@media (max-width: 480px) {
  .ni-container { padding: 0 20px; }
  .ni-hero { padding: 64px 20px 48px; }
  .ni-nav { padding: 0 20px; }
  .ni-nav-links a:not(.ni-nav-cta) { display: none; }
  .ni-services-grid { grid-template-columns: 1fr; }
  .ni-hero-stats { flex-direction: column; align-items: flex-start; gap: 16px; }
  .ni-stat { padding: 0; }
  .ni-stat-divider { display: none; }
  .ni-about-numbers { grid-template-columns: 1fr 1fr; }
  .ni-form-grid { grid-template-columns: 1fr; }
  .ni-section { padding: 64px 0; }
  .ni-hero-cta-row { flex-direction: column; }
  .ni-btn-primary, .ni-btn-ghost { justify-content: center; width: 100%; }
}
  `;
}

/* ================================================================
   TECNOGRAFTING — FULLY CUSTOM TEMPLATE
   ================================================================ */

function OutreachTecnografting({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{tecnograftingCSS()}</style>

      <div className="tg-bg-glow" />
      <BubbleNav />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (dark)
         ════════════════════════════════════════ */}
      <section className="tg-nicola" id="chi-sono">
        <div className="tg-nicola-left">
          <div className="tg-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="tg-ns-name">Nicola Serrao</h1>
          <div className="tg-ns-role">Digital Marketing Strategist</div>
          <p className="tg-ns-intro">
            Ho analizzato il vostro mercato &mdash; clip per innesti orticoli &mdash;
            e ho individuato uno spazio che i vostri competitor non stanno coprendo.
            Con il metodo giusto, in 3 mesi possiamo capire se Tecnografting pu&ograve;
            costruire un sistema di acquisizione clienti digitale profittevole.
          </p>
          <ul className="tg-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Analisi del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="tg-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="tg-nicola-right">
          <div className="tg-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="tg-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="tg-glitch-zone tg-glitch-fwd" id="il-progetto">
        <div className="tg-glitch-bg" />
        <div className="tg-glitch-scanlines" />
        <div className="tg-glitch-label">// quello che ho intravisto</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — TECNOGRAFTING (light)
         ════════════════════════════════════════ */}
      <section className="tg-prospect">

        {/* Prospect sticky topbar */}
        <div className="tg-prospect-topbar">
          <Image
            src={config.logo || "/favicon.png"}
            alt={config.companyName}
            width={160}
            height={38}
            style={{ objectFit: "contain", display: "block", maxWidth: 200, filter: "invert(1)" }}
          />
          <div className="tg-prospect-topbar-tag">Studio realizzato da Nicola Serrao</div>
        </div>

        {/* ─── Sub-section A: Il quadro ─── */}
        <div className="tg-subsection" id="competenze">
          <div className="tg-subsection-header">
            <div className="tg-eyebrow">Il mercato</div>
            <h2 className="tg-headline">Un mercato in crescita.<br />Una nicchia ancora libera.</h2>
          </div>
          <div className="tg-two-col">
            <div className="tg-two-col-text">
              <p>
                Il mercato nursery tech cresce dell&apos;8% annuo. La domanda di clip affidabili
                per innesti &egrave; in aumento. Eppure, quasi nessun player sta facendo
                lead generation digitale mirata verso i vivai europei.
              </p>
            </div>
            <div className="tg-stat-cards">
              <div className="tg-stat-card">
                <div className="tg-stat-value">+8% CAGR</div>
                <div className="tg-stat-label">Nursery tech globale</div>
              </div>
              <div className="tg-stat-card">
                <div className="tg-stat-value">0</div>
                <div className="tg-stat-label">Competitor con lead gen digitale mirata</div>
              </div>
              <div className="tg-stat-card">
                <div className="tg-stat-value">50+</div>
                <div className="tg-stat-label">Anni di esperienza Tecnografting</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Sub-section B: Il vostro vantaggio ─── */}
        <div className="tg-subsection tg-subsection-bordered">
          <div className="tg-eyebrow">Differenziazione</div>
          <h2 className="tg-headline">Specializzazione italiana + R&amp;D sul campo.</h2>
          <div className="tg-two-col">
            <div className="tg-two-col-text">
              <p className="tg-body">
                La vostra specializzazione italiana nelle clip per innesti &mdash;
                in particolare per piante spinose &mdash; &egrave; rara sul mercato.
                La R&amp;D testata direttamente sul campo vi d&agrave; un vantaggio tecnico
                che pochi possono replicare.
              </p>
              <p className="tg-body">
                L&apos;acquisizione da parte del Gruppo Paskal vi apre una rete distributiva globale.
                Ma l&apos;opportunit&agrave; digitale &egrave; ancora completamente scoperta.
              </p>
            </div>
            <div className="tg-img-col">
              <Image
                src="/images/outreach/tecnografting/product1.jpg"
                alt="Clip per innesti Tecnografting"
                width={480}
                height={286}
                className="tg-section-img"
              />
            </div>
          </div>
        </div>

        {/* ─── Sub-section C: Il metodo — 3 mesi ─── */}
        <div className="tg-subsection tg-subsection-bordered">
          <div className="tg-eyebrow">La proposta</div>
          <h2 className="tg-headline">3 mesi per avere una risposta.</h2>
          <p className="tg-sub">
            Non servono grandi budget. Serve un metodo. Strategia, analisi, creativit&agrave; &mdash; e test veloci.
          </p>
          <div className="tg-timeline">
            <div className="tg-timeline-block">
              <div className="tg-timeline-month">Mese 1</div>
              <div className="tg-timeline-title">Analisi &amp; Strategia</div>
              <div className="tg-timeline-desc">Capire il target, definire il messaggio, costruire gli asset.</div>
            </div>
            <div className="tg-timeline-block">
              <div className="tg-timeline-month">Mese 2</div>
              <div className="tg-timeline-title">Test &amp; Dati</div>
              <div className="tg-timeline-desc">Lanciare, misurare, iterare. Budget contenuto, risultati concreti.</div>
            </div>
            <div className="tg-timeline-block">
              <div className="tg-timeline-month">Mese 3</div>
              <div className="tg-timeline-title">La risposta</div>
              <div className="tg-timeline-desc">Il sistema funziona? Si scala. Non funziona? Avrete dati su cosa evitare.</div>
            </div>
          </div>
          <div className="tg-highlight-box">
            Con un buon metodo non si perde mai. Nel peggiore dei casi, avrete chiarezza.
          </div>
        </div>

        {/* ─── Sub-section D: Ma prima, parliamoci ─── */}
        <div className="tg-subsection tg-subsection-bordered">
          <div className="tg-eyebrow">Il prossimo passo</div>
          <h2 className="tg-headline">Queste sono ipotesi.<br />La soluzione vera esce solo da una chiacchierata.</h2>
          <div className="tg-arrow-lines">
            <div className="tg-arrow-line">
              <span className="tg-arrow-icon">&rarr;</span>
              <span>Non posso fare strategia senza conoscere i vostri obiettivi e le dinamiche aziendali.</span>
            </div>
            <div className="tg-arrow-line">
              <span className="tg-arrow-icon">&rarr;</span>
              <span>Quello che vedete qui &egrave; un&apos;analisi preliminare &mdash; il valore vero emerge dal confronto diretto.</span>
            </div>
            <div className="tg-arrow-line">
              <span className="tg-arrow-icon">&rarr;</span>
              <span>15 minuti bastano per capire se ci sono i presupposti per lavorare insieme.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="tg-glitch-zone tg-glitch-bwd">
        <div className="tg-glitch-bg" />
        <div className="tg-glitch-scanlines" />
        <div className="tg-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING (dark, Nicola style)
         ════════════════════════════════════════ */}
      <section className="tg-close" id="parliamone">
        <div className="tg-close-inner">
          <div className="tg-close-eyebrow">Prossimo passo</div>
          <h2 className="tg-close-headline">
            Una chiacchierata<br />di 15 minuti.
          </h2>
          <p className="tg-close-sub">
            Vi racconto quello che ho trovato. Poi decidete voi.
          </p>
          <div className="tg-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="tg-close-cta"
            >
              Scrivimi
              <span className="tg-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
            className="tg-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            O scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="tg-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── Tecnografting CSS ── */
function tecnograftingCSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* Tecnografting palette */
  const t = {
    bg: "#f5f6f8",
    primary: "#007ee5",
    accent: "#056ab2",
    cardBg: "#ffffff",
    text: "#0f151a",
    textDim: "rgba(15,21,26,0.55)",
    textFaint: "rgba(15,21,26,0.35)",
    border: "rgba(15,21,26,0.08)",
    font: "'Inter', system-ui, sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   TECNOGRAFTING — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.tg-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   BUBBLE NAV
══════════════════════════════════════════ */
.tg-bubble-nav {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 100; display: flex; align-items: center; justify-content: space-between;
  width: min(92%, 860px); padding: 10px 24px;
  border-radius: 999px;
  background: rgba(10,14,13,0.55);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(0,255,252,0.10);
}

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.tg-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 100px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.tg-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.tg-ns-logo-row { margin-bottom: 20px; animation: tgFadeUp .6s ease both; }
.tg-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: tgFadeUp .6s .05s ease both;
}
.tg-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: tgFadeUp .6s .1s ease both;
}
.tg-ns-intro {
  font-size: 15px; line-height: 1.8; color: ${n.textDim};
  max-width: 520px; margin-bottom: 32px;
  animation: tgFadeUp .6s .15s ease both;
}
.tg-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: tgFadeUp .6s .2s ease both;
}
.tg-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.tg-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.tg-clock { font-variant-numeric: tabular-nums; }
.tg-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.tg-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: tgFadeUp .6s .2s ease both;
}
.tg-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.tg-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes tgFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.tg-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.tg-glitch-fwd .tg-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${t.bg} 100%);
}
.tg-glitch-bwd .tg-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${t.bg} 0%, ${n.bg} 100%);
}
.tg-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: tgScan 6s linear infinite;
}
@keyframes tgScan { from{background-position:0 0} to{background-position:0 40px} }
.tg-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: tgGltch 4s infinite;
}
@keyframes tgGltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT
══════════════════════════════════════════ */
.tg-prospect {
  background: ${t.bg}; color: ${t.text};
  font-family: ${t.font}; position: relative; z-index: 1;
}
.tg-prospect-topbar {
  background: rgba(245,246,248,0.95); border-bottom: 1px solid ${t.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.tg-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${t.textFaint};
}

/* Sub-sections */
.tg-subsection { padding: 72px 64px 0; max-width: 1100px; margin: 0 auto; }
.tg-subsection-bordered { border-top: 1px solid ${t.border}; }
.tg-subsection-header { margin-bottom: 40px; }
.tg-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${t.primary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.tg-eyebrow::before { content:''; width:24px; height:1px; background:${t.primary}; }
.tg-headline {
  font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${t.text}; max-width: 780px;
  margin-bottom: 20px; letter-spacing: -0.02em;
}
.tg-sub {
  font-size: 16px; line-height: 1.8; color: ${t.textDim};
  max-width: 640px; margin-bottom: 40px; font-weight: 300;
}
.tg-body {
  font-size: 15px; line-height: 1.8; color: ${t.textDim};
  max-width: 640px; margin-bottom: 16px; font-weight: 300;
}

/* Two-column layout (text + stats) */
.tg-two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
}
.tg-two-col-text p {
  font-size: 15px; line-height: 1.8; color: ${t.textDim}; font-weight: 300;
}
.tg-img-col { display: flex; align-items: center; }
.tg-section-img {
  width: 100%; height: auto; border-radius: 8px;
  object-fit: cover; border: 1px solid ${t.border};
}
.tg-stat-cards { display: flex; flex-direction: column; gap: 12px; }
.tg-stat-card {
  background: ${t.cardBg}; border: 1px solid ${t.border};
  padding: 20px 24px; display: flex; align-items: center; gap: 16px;
}
.tg-stat-value {
  font-size: 20px; font-weight: 700; color: ${t.primary};
  white-space: nowrap; min-width: 90px;
}
.tg-stat-label {
  font-size: 12px; line-height: 1.5; color: ${t.textDim}; font-weight: 300;
}

/* Timeline */
.tg-timeline {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
  margin-bottom: 32px;
}
.tg-timeline-block {
  background: ${t.cardBg}; border: 1px solid ${t.border}; padding: 28px 24px;
}
.tg-timeline-month {
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: ${t.primary}; font-weight: 700; margin-bottom: 12px;
}
.tg-timeline-title {
  font-size: 16px; font-weight: 700; color: ${t.text};
  margin-bottom: 8px; letter-spacing: -0.01em;
}
.tg-timeline-desc {
  font-size: 13px; line-height: 1.7; color: ${t.textDim}; font-weight: 300;
}

/* Highlight box */
.tg-highlight-box {
  background: ${t.primary}; color: #ffffff;
  padding: 24px 32px; font-size: 15px; font-weight: 500;
  line-height: 1.6; letter-spacing: -0.01em;
}

/* Arrow lines */
.tg-arrow-lines {
  display: flex; flex-direction: column; gap: 20px;
  padding-bottom: 72px;
}
.tg-arrow-line {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 15px; line-height: 1.7; color: ${t.textDim}; font-weight: 300;
}
.tg-arrow-icon {
  color: ${t.primary}; flex-shrink: 0; margin-top: 2px; font-size: 14px;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING
══════════════════════════════════════════ */
.tg-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.tg-close-inner { max-width: 700px; margin: 0 auto; }
.tg-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.tg-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.tg-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.tg-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.tg-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.tg-close-cta-row { margin-bottom: 20px; }
.tg-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.tg-close-cta:hover { opacity: 0.85; }
.tg-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.tg-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.tg-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.tg-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.tg-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .tg-nicola { grid-template-columns: 1fr; padding: 100px 28px 64px; gap: 40px; }
  .tg-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .tg-prospect-topbar { padding: 0 28px; }
  .tg-prospect-topbar-tag { display: none; }
  .tg-subsection { padding: 56px 28px 0; }
  .tg-two-col { grid-template-columns: 1fr; gap: 32px; }
  .tg-timeline { grid-template-columns: 1fr; }
  .tg-arrow-lines { padding-bottom: 56px; }
  .tg-close { padding: 64px 28px; }
  .tg-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .tg-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .tg-nicola { padding: 90px 20px 48px; min-height: auto; }
  .tg-nicola-right { max-width: 160px; }
  .tg-ns-name { font-size: 2rem; }
  .tg-subsection { padding: 40px 20px 0; }
  .tg-stat-card { flex-direction: column; align-items: flex-start; gap: 4px; padding: 16px 20px; }
  .tg-timeline-block { padding: 20px 16px; }
  .tg-highlight-box { padding: 20px 24px; font-size: 14px; }
  .tg-close { padding: 48px 20px; }
  .tg-footer { padding: 16px 20px; }
  .tg-glitch-zone { height: 100px; }
  .tg-prospect-topbar { padding: 0 20px; height: 56px; }
}
  `;
}

/* ================================================================
   CASCIOLI RENT — FULLY CUSTOM TEMPLATE
   ================================================================ */

function OutreachCascioliRent({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{cascioliRentCSS()}</style>

      <div className="cr-bg-glow" />
      <BubbleNav />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (Nicola style)
         ════════════════════════════════════════ */}
      <section className="cr-nicola" id="chi-sono">
        <div className="cr-nicola-left">
          <div className="cr-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="cr-ns-name">Nicola Serrao</h1>
          <div className="cr-ns-role">Digital Marketing Strategist</div>
          <p className="cr-ns-intro">
            Ho provato dell&apos;interesse nel vostro progetto, cos&igrave; l&apos;ho approfondito
            per capire se con le mie competenze ci pu&ograve; essere qualcosa da migliorare.
            L&apos;ho fatto &mdash; quello che trovate sotto &egrave; un breve resoconto.
          </p>
          <ul className="cr-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              {SITE.phone}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Analisi del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="cr-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="cr-nicola-right">
          <div className="cr-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="cr-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="cr-glitch-zone cr-glitch-fwd" id="il-progetto">
        <div className="cr-glitch-bg" />
        <div className="cr-glitch-scanlines" />
        <div className="cr-glitch-label">// entriamo nel vostro mondo</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — CASCIOLI RENT
         ════════════════════════════════════════ */}
      <section className="cr-prospect">

        {/* Prospect sticky topbar */}
        <div className="cr-prospect-topbar">
          <Image
            src={config.logo || "/favicon.png"}
            alt={config.companyName}
            width={160}
            height={38}
            style={{ objectFit: "contain", display: "block", maxWidth: 200, filter: "invert(1)" }}
          />
          <div className="cr-prospect-topbar-tag">Studio realizzato da Nicola Serrao</div>
        </div>

        {/* Intro */}
        <div className="cr-intro">
          <div className="cr-eyebrow">Il quadro attuale</div>
          <h2 className="cr-headline">
            Questo &egrave; quello che &egrave; emerso<br />da quello che ho potuto vedere online.
          </h2>
          <p className="cr-sub">
            Ho analizzato la vostra presenza digitale &mdash; sito, advertising, comunicazione &mdash;
            per capire dove si pu&ograve; intervenire concretamente.
          </p>
        </div>

        {/* ─── FUNNEL OGGI ─── */}
        <div className="cr-funnel-section">
          <div className="cr-funnel-header">
            <div className="cr-eyebrow">Come vi immagino oggi</div>
          </div>
          <div className="cr-funnel-flow cr-funnel-current">
            <div className="cr-funnel-node">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <div className="cr-funnel-title">Ads attive</div>
              <div className="cr-funnel-detail">Meta / altre piattaforme</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <div className="cr-funnel-title">Messaggio generico</div>
              <div className="cr-funnel-detail">Personalizzazione limitata</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div className="cr-funnel-title">Team vendite</div>
              <div className="cr-funnel-detail">Gestione del contatto</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node cr-funnel-node-q">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <div className="cr-funnel-title">Risultato?</div>
              <div className="cr-funnel-detail">Difficile da misurare</div>
            </div>
          </div>
          <p className="cr-funnel-note">
            Non conosco i vostri dati interni &mdash; questa &egrave; la mia lettura dall&apos;esterno.
          </p>
        </div>

        {/* ─── FUNNEL PROPOSTO ─── */}
        <div className="cr-funnel-section cr-funnel-proposed-section">
          <div className="cr-funnel-header">
            <div className="cr-eyebrow">Come potrebbe funzionare con un sistema strutturato</div>
          </div>
          <div className="cr-funnel-flow cr-funnel-proposed">
            <div className="cr-funnel-node cr-funnel-node-hi">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </div>
              <div className="cr-funnel-title">Ads mirate</div>
              <div className="cr-funnel-detail">KPI precisi, test continuo</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node cr-funnel-node-hi">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="cr-funnel-title">Creativit&agrave; strategica</div>
              <div className="cr-funnel-detail">Messaggi per situazioni reali, non offerte generiche</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node cr-funnel-node-hi">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div className="cr-funnel-title">Sistema di conversione</div>
              <div className="cr-funnel-detail">Landing dedicate, follow-up strutturato</div>
            </div>
            <div className="cr-funnel-arrow" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="cr-funnel-node cr-funnel-node-hi">
              <div className="cr-funnel-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div className="cr-funnel-title">Team vendite</div>
              <div className="cr-funnel-detail">Dati dal marketing &rarr; feedback &rarr; ottimizzazione</div>
            </div>
          </div>
          <div className="cr-funnel-loop">
            <svg width="100%" height="40" viewBox="0 0 600 40" preserveAspectRatio="none" fill="none" stroke="#1a9bbf" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5">
              <path d="M540 5 C580 5,595 20,595 35 L5 35 C5 20,20 5,60 5" />
              <polygon points="55,0 65,5 55,10" fill="#1a9bbf" opacity="0.5" />
            </svg>
            <span className="cr-funnel-loop-label">Feedback loop &mdash; ottimizzazione continua</span>
          </div>
        </div>

        {/* ─── VALUE SECTION ─── */}
        <div className="cr-value-section" id="competenze">
          <div className="cr-value-header">
            <div className="cr-eyebrow">Cosa porto al tavolo</div>
          </div>

          {/* Row 1 — Strategia */}
          <div className="cr-vr-row">
            <div className="cr-vr-label">
              <span className="cr-vr-num">01</span>
              <span className="cr-vr-title">Strategia</span>
            </div>
            <div className="cr-vr-cols">
              <div className="cr-vr-col cr-vr-mine">
                <p>Un sistema di acquisizione clienti misurabile. Funnel strutturato con obiettivi chiari collegati ai risultati commerciali.</p>
              </div>
              <div className="cr-vr-col cr-vr-theirs">
                <p>Sapere con esattezza quanto costa acquisire un cliente, quanti contatti diventano contratti, dove intervenire per migliorare.</p>
              </div>
            </div>
          </div>

          {/* Row 2 — Analisi */}
          <div className="cr-vr-row">
            <div className="cr-vr-label">
              <span className="cr-vr-num">02</span>
              <span className="cr-vr-title">Analisi</span>
            </div>
            <div className="cr-vr-cols">
              <div className="cr-vr-col cr-vr-mine">
                <p>KPI, iterazione, feedback loop con il reparto vendite. Ogni passaggio del funnel tracciato e ottimizzato.</p>
              </div>
              <div className="cr-vr-col cr-vr-theirs">
                <p>Ogni euro investito produce dati. Ogni dato produce una decisione migliore. Niente budget sprecato.</p>
              </div>
            </div>
          </div>

          {/* Row 3 — Creativita */}
          <div className="cr-vr-row">
            <div className="cr-vr-label">
              <span className="cr-vr-num">03</span>
              <span className="cr-vr-title">Creativit&agrave;</span>
            </div>
            <div className="cr-vr-cols">
              <div className="cr-vr-col cr-vr-mine">
                <p>Comunicazione che vi differenzia. Messaggi per ogni livello di consapevolezza, non &ldquo;ecco l&apos;ultima offerta&rdquo;.</p>
              </div>
              <div className="cr-vr-col cr-vr-theirs">
                <p>Pi&ugrave; visibilit&agrave; tra chi conta. Pi&ugrave; traffico qualificato. Pi&ugrave; richieste da convertire.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── TAKEAWAYS ─── */}
        <div className="cr-takeaways">
          <div className="cr-tk-item">Questa &egrave; un&apos;ipotesi costruita dall&apos;esterno &mdash; con un confronto diretto sarebbe ancora pi&ugrave; precisa.</div>
          <div className="cr-tk-item">Non serve stravolgere nulla: si parte da quello che funziona gi&agrave;.</div>
          <div className="cr-tk-item">Se ci sono i presupposti, lo capiamo in 20 minuti.</div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="cr-glitch-zone cr-glitch-bwd">
        <div className="cr-glitch-bg" />
        <div className="cr-glitch-scanlines" />
        <div className="cr-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING NICOLA
         ════════════════════════════════════════ */}
      <section className="cr-close" id="parliamone">
        <div className="cr-close-inner">
          <div className="cr-close-eyebrow">Prossimo passo</div>
          <h2 className="cr-close-headline">
            Ho informazioni fresche<br />sul vostro business.
          </h2>
          <p className="cr-close-sub">
            Perch&eacute; non ci prendiamo un momento per conoscerci?
          </p>
          <div className="cr-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="cr-close-cta"
            >
              Prenota una call
              <span className="cr-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
            className="cr-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            O scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="cr-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── CascioliRent CSS ── */
function cascioliRentCSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* CascioliRent palette — sobria, corporate, dal sito reale */
  const c = {
    bg: "#f4f7fa",
    primary: "#1a2744",
    secondary: "#2d4a6f",
    cardBg: "#ffffff",
    midBg: "#edf1f5",
    text: "#1a2b3c",
    textDim: "rgba(26,43,60,0.60)",
    textFaint: "rgba(26,43,60,0.35)",
    border: "rgba(26,43,60,0.10)",
    font: "'Fira Sans', sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   CASCIOLI RENT — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.cr-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   BUBBLE NAV
══════════════════════════════════════════ */
.cr-bubble-nav {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 100; display: flex; align-items: center; justify-content: space-between;
  width: min(92%, 860px); padding: 10px 24px;
  border-radius: 999px;
  background: rgba(10,14,13,0.55);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(0,255,252,0.10);
}
.cr-bubble-logo {
  display: flex; align-items: center; gap: 8px;
  font-family: ${n.serif}; font-size: 15px; font-weight: 700;
  color: ${n.text}; letter-spacing: -0.3px;
}
.cr-bubble-logo img { border-radius: 4px; }
.cr-bubble-links { display: flex; align-items: center; gap: 24px; }
.cr-bubble-links a {
  font-family: ${n.mono}; font-size: 10px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s;
}
.cr-bubble-links a:hover { color: ${n.cyan}; }

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.cr-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 100px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.cr-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.cr-ns-logo-row { margin-bottom: 20px; animation: crFadeUp .6s ease both; }
.cr-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: crFadeUp .6s .05s ease both;
}
.cr-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: crFadeUp .6s .1s ease both;
}
.cr-ns-intro {
  font-size: 15px; line-height: 1.8; color: ${n.textDim};
  max-width: 520px; margin-bottom: 32px;
  animation: crFadeUp .6s .15s ease both;
}
.cr-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: crFadeUp .6s .2s ease both;
}
.cr-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.cr-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.cr-clock { font-variant-numeric: tabular-nums; }
.cr-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.cr-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: crFadeUp .6s .2s ease both;
}
.cr-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.cr-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes crFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.cr-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.cr-glitch-fwd .cr-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${c.bg} 100%);
}
.cr-glitch-bwd .cr-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${c.bg} 0%, ${n.bg} 100%);
}
.cr-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: crScan 6s linear infinite;
}
@keyframes crScan { from{background-position:0 0} to{background-position:0 40px} }
.cr-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: crGltch 4s infinite;
}
@keyframes crGltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT
══════════════════════════════════════════ */
.cr-prospect {
  background: ${c.bg}; color: ${c.text};
  font-family: ${c.font}; position: relative; z-index: 1;
}
.cr-prospect-topbar {
  background: rgba(244,247,250,0.95); border-bottom: 1px solid ${c.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.cr-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${c.textFaint};
}

/* Intro */
.cr-intro { padding: 72px 64px 0; max-width: 1100px; margin: 0 auto; }
.cr-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${c.primary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.cr-eyebrow::before { content:''; width:24px; height:1px; background:${c.primary}; }
.cr-headline {
  font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${c.text}; max-width: 780px;
  margin-bottom: 20px; letter-spacing: -0.02em;
}
.cr-sub {
  font-size: 16px; line-height: 1.8; color: ${c.textDim};
  max-width: 640px; margin-bottom: 48px; font-weight: 300;
}

/* ═════════ FUNNEL FLOWS ═════════ */
.cr-funnel-section {
  padding: 48px 64px; max-width: 1100px; margin: 0 auto;
}
.cr-funnel-proposed-section {
  border-top: 1px solid ${c.border};
}
.cr-funnel-header { margin-bottom: 32px; }
.cr-funnel-flow {
  display: flex; align-items: stretch; gap: 0;
}
.cr-funnel-node {
  flex: 1; padding: 24px 20px; text-align: center;
  border: 1px solid ${c.border}; background: ${c.midBg};
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  transition: background 0.2s;
}
.cr-funnel-node-q { border-style: dashed; }
.cr-funnel-node-hi {
  background: ${c.cardBg}; border-color: ${c.primary}30;
}
.cr-funnel-icon { color: ${c.primary}; margin-bottom: 4px; }
.cr-funnel-current .cr-funnel-icon { color: ${c.textFaint}; }
.cr-funnel-title {
  font-size: 14px; font-weight: 600; color: ${c.text}; line-height: 1.3;
}
.cr-funnel-detail {
  font-size: 11px; line-height: 1.5; color: ${c.textDim}; font-weight: 300;
}
.cr-funnel-arrow {
  display: flex; align-items: center; justify-content: center;
  padding: 0 10px; color: ${c.primary}; flex-shrink: 0;
}
.cr-funnel-current .cr-funnel-arrow { color: ${c.textFaint}; }
.cr-funnel-note {
  font-size: 12px; color: ${c.textDim}; font-style: italic;
  margin-top: 20px; text-align: center;
}
.cr-funnel-loop {
  margin-top: 12px; text-align: center; position: relative;
}
.cr-funnel-loop-label {
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${c.textDim}; display: block; margin-top: 6px;
}

/* ═════════ VALUE SECTION ═════════ */
.cr-value-section {
  padding: 56px 64px; max-width: 1100px; margin: 0 auto;
  border-top: 1px solid ${c.border};
}
.cr-value-header { margin-bottom: 40px; }
.cr-vr-row {
  border-bottom: 1px solid ${c.border}; padding: 36px 0;
}
.cr-vr-row:last-child { border-bottom: none; }
.cr-vr-label {
  display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
}
.cr-vr-num {
  font-family: ${n.mono}; font-size: 10px; letter-spacing: 2px;
  color: ${c.primary}; font-weight: 700;
}
.cr-vr-title {
  font-size: 1.3rem; font-weight: 700; color: ${c.text};
  letter-spacing: -0.02em;
}
.cr-vr-cols {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
}
.cr-vr-col { padding: 24px 20px; }
.cr-vr-col p {
  font-size: 14px; line-height: 1.75; color: ${c.textDim}; font-weight: 300;
}
.cr-vr-mine {
  background: ${c.midBg};
  border-left: 3px solid ${c.border};
}
.cr-vr-theirs {
  background: ${c.cardBg};
  border-left: 3px solid ${c.primary};
}

/* ═════════ TAKEAWAYS ═════════ */
.cr-takeaways {
  padding: 48px 64px; max-width: 1100px; margin: 0 auto;
  border-top: 1px solid ${c.border};
  display: flex; flex-direction: column; gap: 20px;
}
.cr-tk-item {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 14px; line-height: 1.7; color: ${c.textDim}; font-weight: 300;
}
.cr-tk-item::before {
  content: '\\2192'; color: ${c.primary}; flex-shrink: 0;
  margin-top: 1px; font-size: 13px;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING
══════════════════════════════════════════ */
.cr-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.cr-close-inner { max-width: 700px; margin: 0 auto; }
.cr-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.cr-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.cr-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.cr-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.cr-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.cr-close-cta-row { margin-bottom: 20px; }
.cr-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.cr-close-cta:hover { opacity: 0.85; }
.cr-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.cr-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.cr-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.cr-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.cr-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .cr-bubble-links { gap: 16px; }
  .cr-nicola { grid-template-columns: 1fr; padding: 100px 28px 64px; gap: 40px; }
  .cr-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .cr-prospect-topbar { padding: 0 28px; }
  .cr-prospect-topbar-tag { display: none; }
  .cr-intro { padding: 56px 28px 0; }
  .cr-funnel-section { padding: 40px 28px; }
  .cr-funnel-flow { flex-direction: column; gap: 0; }
  .cr-funnel-arrow { transform: rotate(90deg); padding: 8px 0; }
  .cr-value-section { padding: 48px 28px; }
  .cr-vr-cols { grid-template-columns: 1fr; }
  .cr-takeaways { padding: 40px 28px; }
  .cr-close { padding: 64px 28px; }
  .cr-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .cr-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .cr-bubble-nav { padding: 8px 16px; width: 96%; }
  .cr-bubble-links { gap: 10px; }
  .cr-bubble-links a { font-size: 8px; letter-spacing: 1px; }
  .cr-nicola { padding: 90px 20px 48px; min-height: auto; }
  .cr-nicola-right { max-width: 160px; }
  .cr-ns-name { font-size: 2rem; }
  .cr-intro { padding: 40px 20px 0; }
  .cr-funnel-section { padding: 32px 20px; }
  .cr-value-section { padding: 40px 20px; }
  .cr-takeaways { padding: 32px 20px; }
  .cr-close { padding: 48px 20px; }
  .cr-footer { padding: 16px 20px; }
  .cr-glitch-zone { height: 100px; }
  .cr-prospect-topbar { padding: 0 20px; height: 56px; }
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
  const palette = config.palette!;
  const isLightBg = isLight(palette.background);
  const hasResponseBox = !!config.cta.ctaQuestion;

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{`
        .o-page {
          --o-primary: ${palette.primary};
          --o-primary-dim: ${palette.primaryDim};
          --o-bg: ${palette.background};
          --o-text: ${palette.text};
          --o-text-dim: ${palette.textDim};
          --o-border: ${palette.border};
          min-height: 100vh;
          background: ${palette.background};
          color: ${palette.text};
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
        .o-btn-primary { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; border-radius: 5px; text-decoration: none; transition: opacity 0.2s, transform 0.2s; background: var(--o-primary); color: ${isLightBg ? "#fff" : palette.background}; }
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

        {config.sections?.map((section, i) => (
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

/* ================================================================
   LA FEMME — FULLY CUSTOM TEMPLATE
   B2B fashion manufacturer — elegant editorial design
   ================================================================ */

function OutreachLaFemme({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{laFemmeCSS()}</style>

      <div className="lf-bg-glow" />
      <BubbleNav />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (dark)
         ════════════════════════════════════════ */}
      <section className="lf-nicola" id="chi-sono">
        <div className="lf-nicola-left">
          <div className="lf-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="lf-ns-name">Nicola Serrao</h1>
          <div className="lf-ns-role">Digital Marketing Strategist</div>
          <p className="lf-ns-intro">
            Mi occupo di posizionamento digitale per aziende manifatturiere italiane.
            Ho studiato la vostra storia &mdash; quattro generazioni nel tessile, dalla sartoria
            Caraceni fino allo stabilimento di Trecastelli &mdash; e vedo un&apos;opportunit&agrave;
            concreta: far arrivare il vostro racconto alle persone giuste nella filiera moda.
          </p>
          <ul className="lf-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Analisi del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="lf-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="lf-nicola-right">
          <div className="lf-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="lf-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="lf-glitch-zone lf-glitch-fwd" id="il-progetto">
        <div className="lf-glitch-bg" />
        <div className="lf-glitch-scanlines" />
        <div className="lf-glitch-label">// quello che ho visto</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — LA FEMME (warm cream)
         ════════════════════════════════════════ */}
      <section className="lf-prospect">

        {/* Prospect sticky topbar */}
        <div className="lf-prospect-topbar">
          <Image src="/images/outreach/la-femme/logo.png" alt="La Femme" width={140} height={40} style={{ objectFit: "contain" }} />
          <div className="lf-prospect-topbar-tag">Riflessione a cura di Nicola Serrao</div>
        </div>

        {/* ─── SUB-SECTION A: Il vostro patrimonio ─── */}
        <div className="lf-section-block" id="patrimonio">
          <div className="lf-eyebrow">Chi siete</div>
          <h2 className="lf-headline">Artigianale di dimensioni industriali.</h2>
          {/* Immagini produzione */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 36, borderRadius: 8, overflow: "hidden" }}>
            <Image src="/images/outreach/la-femme/taglio.jpg" alt="Taglio" width={370} height={250} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <Image src="/images/outreach/la-femme/cucire.jpg" alt="Confezione" width={370} height={250} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <Image src="/images/outreach/la-femme/stiro.jpg" alt="Stiro" width={370} height={250} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="lf-two-col">
            <div className="lf-col-text">
              <p>
                Quattro generazioni nel tessile &mdash; dalla sartoria Caraceni a Roma fino
                allo stabilimento unico di Trecastelli. Un ciclo produttivo interamente interno:
                taglio, confezione, stiro. Tecnologia Lever System per la movimentazione aerea
                dei capi. Specializzazione nei capi spalla e nei tessuti pi&ugrave; complessi.
              </p>
              <p>
                Questo non &egrave; un laboratorio artigianale che cerca di sembrare grande,
                n&eacute; un&apos;industria che cerca di sembrare artigianale. &Egrave; una
                realt&agrave; che ha saputo tenere insieme entrambe le cose &mdash; e questo
                ha un valore enorme nella filiera moda di oggi.
              </p>
            </div>
            <div className="lf-col-card">
              <div className="lf-strength-card">
                <div className="lf-strength-title">I vostri punti di forza</div>
                <ul className="lf-strength-list">
                  <li>Full cycle Made in Italy (taglio, confezione, stiro)</li>
                  <li>4 generazioni nel tessile dal 1915</li>
                  <li>Specializzazione capi spalla e tessuti complessi</li>
                  <li>Tecnologia Lever System</li>
                  <li>64 professionisti, stabilimento unico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SUB-SECTION B: Il gap ─── */}
        <div className="lf-section-block" id="osservazione">
          <div className="lf-eyebrow">L&apos;osservazione</div>
          <h2 className="lf-headline">Un racconto straordinario che non sta lavorando per voi.</h2>
          <div className="lf-narrow-text">
            <p>
              I responsabili prodotto e sourcing manager delle case di moda cercano partner come voi.
              Ma oggi, se non vi conoscono gi&agrave;, non vi trovano.
            </p>
            <p>
              Il vostro sito racconta bene chi siete, ma non aiuta un buyer a capire in 5 minuti
              se siete il partner giusto. Manca il percorso: dalla scoperta alla richiesta di contatto.
            </p>
          </div>
        </div>

        {/* ─── SUB-SECTION C: Le leve ─── */}
        <div className="lf-section-block" id="competenze">
          <div className="lf-eyebrow">Le leve</div>
          <h2 className="lf-headline">Tre aree concrete.</h2>
          <div className="lf-three-blocks">

            <div className="lf-block">
              <div className="lf-block-num">01</div>
              <h3 className="lf-block-title">Posizionamento B2B chiaro</h3>
              <p className="lf-block-desc">
                Tradurre la vostra storia in una value proposition per buyer: per quali brand,
                che problemi risolvete, perch&eacute; voi e non un altro. Non cambiare chi
                siete &mdash; rendere visibile ci&ograve; che gi&agrave; fate.
              </p>
            </div>

            <div className="lf-block">
              <div className="lf-block-num">02</div>
              <h3 className="lf-block-title">Nuove relazioni nella filiera</h3>
              <p className="lf-block-desc">
                Non serve traffico. Servono 2-3 contatti giusti all&apos;anno &mdash; brand mid-tier,
                capsule di nicchia, marchi digitali per cui il vostro tipo di produzione ha molto senso.
                Un sistema pulito e professionale per farvi conoscere.
              </p>
            </div>

            <div className="lf-block">
              <div className="lf-block-num">03</div>
              <h3 className="lf-block-title">Il racconto per buyer esteri</h3>
              <p className="lf-block-desc">
                Brand stranieri stanno riportando produzione in Europa. La vostra storia (Caraceni,
                4 generazioni, stabilimento unico) &egrave; esattamente il tipo di narrativa che
                funziona. Ma queste persone oggi non vi vedono.
              </p>
            </div>

          </div>
        </div>

        {/* ─── SUB-SECTION D: Closing thought ─── */}
        <div className="lf-section-block lf-closing-thought">
          <p className="lf-thought">
            Non ho la pretesa di dirvi da fuori cosa dovete fare. Quello che posso offrire
            &egrave; un confronto onesto: mettere sul tavolo i dati che ho raccolto e valutare
            insieme se c&apos;&egrave; spazio per migliorare il modo in cui il vostro lavoro
            arriva alle persone giuste.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="lf-glitch-zone lf-glitch-bwd">
        <div className="lf-glitch-bg" />
        <div className="lf-glitch-scanlines" />
        <div className="lf-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING (dark, Nicola)
         ════════════════════════════════════════ */}
      <section className="lf-close" id="parliamone">
        <div className="lf-close-inner">
          <div className="lf-close-eyebrow">Prossimo passo</div>
          <h2 className="lf-close-headline">
            Una chiacchierata tra chi<br />fa le cose bene.
          </h2>
          <p className="lf-close-sub">
            Nessuna proposta standard. Solo un confronto per capire se posso esservi utile.
          </p>
          <div className="lf-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="lf-close-cta"
            >
              Scrivimi
              <span className="lf-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent("Buongiorno, ho visto la riflessione sul posizionamento di La Femme.")}`}
            className="lf-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            O scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="lf-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── La Femme CSS ── */
function laFemmeCSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* La Femme palette — warm cream, high-end fashion lookbook */
  const f = {
    bg: "#faf8f5",
    primary: "#1a1a1a",
    accent: "#8a7560",
    cardBg: "#ffffff",
    text: "#1a1a1a",
    textDim: "rgba(26,26,26,0.50)",
    textFaint: "rgba(26,26,26,0.30)",
    border: "rgba(26,26,26,0.08)",
    serif: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   LA FEMME — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.lf-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.lf-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 100px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.lf-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.lf-ns-logo-row { margin-bottom: 20px; animation: lfFadeUp .6s ease both; }
.lf-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: lfFadeUp .6s .05s ease both;
}
.lf-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: lfFadeUp .6s .1s ease both;
}
.lf-ns-intro {
  font-size: 15px; line-height: 1.8; color: ${n.textDim};
  max-width: 520px; margin-bottom: 32px;
  animation: lfFadeUp .6s .15s ease both;
}
.lf-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: lfFadeUp .6s .2s ease both;
}
.lf-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.lf-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.lf-clock { font-variant-numeric: tabular-nums; }
.lf-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.lf-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: lfFadeUp .6s .2s ease both;
}
.lf-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.lf-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes lfFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.lf-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.lf-glitch-fwd .lf-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${f.bg} 100%);
}
.lf-glitch-bwd .lf-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${f.bg} 0%, ${n.bg} 100%);
}
.lf-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: lfScan 6s linear infinite;
}
@keyframes lfScan { from{background-position:0 0} to{background-position:0 40px} }
.lf-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: lfGltch 4s infinite;
}
@keyframes lfGltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT (La Femme)
══════════════════════════════════════════ */
.lf-prospect {
  background: ${f.bg}; color: ${f.text};
  font-family: ${f.body}; position: relative; z-index: 1;
}

/* Prospect topbar */
.lf-prospect-topbar {
  background: rgba(250,248,245,0.95); border-bottom: 1px solid ${f.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.lf-prospect-topbar-name {
  font-family: ${f.serif}; font-style: italic; font-size: 22px;
  font-weight: 700; color: ${f.primary}; letter-spacing: -0.02em;
}
.lf-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${f.textFaint};
}

/* Section blocks */
.lf-section-block {
  padding: 72px 64px 0; max-width: 1100px; margin: 0 auto;
}
.lf-section-block + .lf-section-block {
  border-top: 1px solid ${f.border}; margin-top: 64px;
}

/* Eyebrow */
.lf-eyebrow {
  font-family: ${n.mono}; font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${f.accent}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.lf-eyebrow::before { content:''; width:24px; height:1px; background:${f.accent}; }

/* Headline */
.lf-headline {
  font-family: ${f.serif}; font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${f.text}; max-width: 780px;
  margin-bottom: 40px; letter-spacing: -0.02em;
}

/* Two-column layout */
.lf-two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
}
.lf-col-text p {
  font-size: 15px; line-height: 1.85; color: ${f.textDim}; font-weight: 300;
  margin-bottom: 20px;
}
.lf-col-text p:last-child { margin-bottom: 0; }

/* Strength card */
.lf-strength-card {
  background: ${f.cardBg}; border: 1px solid ${f.border};
  padding: 32px; border-radius: 2px;
}
.lf-strength-title {
  font-family: ${n.mono}; font-size: 10px; letter-spacing: 2px;
  text-transform: uppercase; color: ${f.accent}; margin-bottom: 24px;
}
.lf-strength-list {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;
}
.lf-strength-list li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; line-height: 1.6; color: ${f.text}; font-weight: 400;
}
.lf-strength-list li::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  background: ${f.accent}; flex-shrink: 0; margin-top: 7px;
}

/* Narrow text (for gap section) */
.lf-narrow-text {
  max-width: 680px;
}
.lf-narrow-text p {
  font-size: 15px; line-height: 1.85; color: ${f.textDim}; font-weight: 300;
  margin-bottom: 20px;
}
.lf-narrow-text p:last-child { margin-bottom: 0; }

/* Three blocks */
.lf-three-blocks {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
}
.lf-block {
  padding: 0;
  border-top: 2px solid ${f.accent};
  padding-top: 24px;
}
.lf-block-num {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 2px;
  color: ${f.accent}; font-weight: 700; margin-bottom: 12px;
}
.lf-block-title {
  font-family: ${f.serif}; font-size: 1.15rem; font-weight: 700;
  color: ${f.text}; margin-bottom: 12px; letter-spacing: -0.01em;
}
.lf-block-desc {
  font-size: 14px; line-height: 1.8; color: ${f.textDim}; font-weight: 300;
}

/* Closing thought */
.lf-closing-thought {
  text-align: center; padding-bottom: 72px !important;
}
.lf-thought {
  font-family: ${f.serif}; font-style: italic;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem); line-height: 1.75;
  color: ${f.textDim}; max-width: 680px; margin: 0 auto;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING (Nicola)
══════════════════════════════════════════ */
.lf-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.lf-close-inner { max-width: 700px; margin: 0 auto; }
.lf-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.lf-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.lf-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.lf-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.lf-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.lf-close-cta-row { margin-bottom: 20px; }
.lf-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.lf-close-cta:hover { opacity: 0.85; }
.lf-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.lf-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.lf-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.lf-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.lf-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .lf-nicola { grid-template-columns: 1fr; padding: 100px 28px 64px; gap: 40px; }
  .lf-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .lf-prospect-topbar { padding: 0 28px; }
  .lf-prospect-topbar-tag { display: none; }
  .lf-section-block { padding: 56px 28px 0; }
  .lf-two-col { grid-template-columns: 1fr; gap: 32px; }
  .lf-three-blocks { grid-template-columns: 1fr; gap: 24px; }
  .lf-closing-thought { padding-bottom: 56px !important; }
  .lf-close { padding: 64px 28px; }
  .lf-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .lf-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .lf-nicola { padding: 90px 20px 48px; min-height: auto; }
  .lf-nicola-right { max-width: 160px; }
  .lf-ns-name { font-size: 2rem; }
  .lf-section-block { padding: 40px 20px 0; }
  .lf-section-block + .lf-section-block { margin-top: 40px; }
  .lf-closing-thought { padding-bottom: 40px !important; }
  .lf-close { padding: 48px 20px; }
  .lf-footer { padding: 16px 20px; }
  .lf-glitch-zone { height: 100px; }
  .lf-prospect-topbar { padding: 0 20px; height: 56px; }
  .lf-prospect-topbar-name { font-size: 18px; }
}
  `;
}

/* ================================================================
   T33 (SOUND POLICY) — FULLY CUSTOM TEMPLATE
   ================================================================ */

function OutreachT33({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{t33CSS()}</style>

      <div className="t3-bg-glow" />
      <BubbleNav />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (dark)
         ════════════════════════════════════════ */}
      <section className="t3-nicola" id="chi-sono">
        <div className="t3-nicola-left">
          <div className="t3-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="t3-ns-name">Nicola Serrao</h1>
          <div className="t3-ns-role">Digital Marketing Strategist</div>
          <p className="t3-ns-intro">
            Mi occupo di strategia digitale per organizzazioni che producono valore
            intellettuale e hanno bisogno di farlo arrivare alle persone giuste.
            Ho studiato il vostro percorso &mdash; dalla fondazione ad Ancona nel 2007
            al nuovo capitolo con OpenEconomics &mdash; e credo ci siano leve concrete
            per amplificare ci&ograve; che gi&agrave; fate molto bene.
          </p>
          <ul className="t3-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Riflessione del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="t3-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="t3-nicola-right">
          <div className="t3-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="t3-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="t3-glitch-zone t3-glitch-fwd" id="il-progetto">
        <div className="t3-glitch-bg" />
        <div className="t3-glitch-scanlines" />
        <div className="t3-glitch-label">// il momento strategico</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — T33 (white, institutional)
         ════════════════════════════════════════ */}
      <section className="t3-prospect">

        {/* Prospect sticky topbar */}
        <div className="t3-prospect-topbar">
          <Image
            src={config.logo || "/favicon.png"}
            alt={config.companyName}
            width={120}
            height={38}
            style={{ objectFit: "contain", display: "block", maxWidth: 160 }}
          />
          <div className="t3-prospect-topbar-tag">Riflessione strategica a cura di Nicola Serrao</div>
        </div>

        {/* ─── Sub-section A: Il nuovo capitolo ─── */}
        <div className="t3-subsection" id="contesto">
          <div className="t3-subsection-header">
            <div className="t3-eyebrow">Il contesto</div>
            <h2 className="t3-headline">Da boutique di Ancona<br />a player europeo.</h2>
          </div>
          <div className="t3-body-text">
            <p>
              L&apos;acquisizione da parte di OpenEconomics crea una nuova entit&agrave; nel mercato
              europeo della valutazione delle politiche. &Egrave; un momento di opportunit&agrave; &mdash;
              ma anche un momento in cui la comunicazione diventa critica.
            </p>
            <p>
              Come raccontate questa storia alle managing authority, alla Commissione,
              ai potenziali talenti, determina come il mercato percepisce il nuovo gruppo.
              Il posizionamento non si costruisce da solo &mdash; va articolato con intenzione.
            </p>
          </div>
        </div>

        {/* ─── Sub-section B: Il gap ─── */}
        <div className="t3-subsection t3-subsection-bordered" id="competenze">
          <div className="t3-eyebrow">L&apos;osservazione</div>
          <h2 className="t3-headline">Contenuti di altissimo livello.<br />Distribuzione che non li valorizza.</h2>
          <div className="t3-two-col">
            <div className="t3-two-col-text">
              <p>
                Le vostre tavole rotonde sul futuro della coesione, gli studi per DG REGIO,
                le valutazioni ex post: sono materiali di valore straordinario. Ma oggi vivono
                sul sito come repository statici.
              </p>
              <p>
                Non raggiungono proattivamente le managing authority che non vi conoscono ancora,
                non diventano thought leadership sistematica, non alimentano una pipeline di
                relazioni nuove.
              </p>
            </div>
            <div className="t3-obs-card">
              <ul className="t3-obs-list">
                <li>
                  <span className="t3-obs-dot" />
                  Sito come vetrina, non come motore di relazioni
                </li>
                <li>
                  <span className="t3-obs-dot" />
                  LinkedIn usato per HR, non per sviluppo commerciale
                </li>
                <li>
                  <span className="t3-obs-dot" />
                  Contenuti di alto valore senza distribuzione mirata
                </li>
                <li>
                  <span className="t3-obs-dot" />
                  Nuovo posizionamento post-acquisizione da comunicare
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ─── Sub-section C: Le leve strategiche ─── */}
        <div className="t3-subsection t3-subsection-bordered">
          <div className="t3-eyebrow">Dove intervenire</div>
          <h2 className="t3-headline">Quattro aree dove la comunicazione<br />pu&ograve; fare la differenza.</h2>
          <div className="t3-strategy-grid">
            <div className="t3-strategy-card">
              <div className="t3-strategy-num">01</div>
              <h3 className="t3-strategy-title">Riposizionamento del brand</h3>
              <p className="t3-strategy-desc">
                Articolare il nuovo posizionamento t33 + OpenEconomics verso Commissione,
                Parlamento, CoR e managing authority. Chi fa cosa, per chi, con quali punti
                di forza distintivi.
              </p>
            </div>
            <div className="t3-strategy-card">
              <div className="t3-strategy-num">02</div>
              <h3 className="t3-strategy-title">Thought leadership sistematica</h3>
              <p className="t3-strategy-desc">
                Trasformare report e studi in policy brief, infografiche, newsletter per managing
                authority. Non produrre di pi&ugrave; &mdash; distribuire meglio ci&ograve; che
                gi&agrave; producete.
              </p>
            </div>
            <div className="t3-strategy-card">
              <div className="t3-strategy-num">03</div>
              <h3 className="t3-strategy-title">Sviluppo commerciale mirato</h3>
              <p className="t3-strategy-desc">
                Posizionarvi come &ldquo;top of mind&rdquo; presso nuove managing authority e nuovi Paesi.
                Non lead generation classica &mdash; facilitazione di contatti qualificati attraverso
                contenuti mirati.
              </p>
            </div>
            <div className="t3-strategy-card">
              <div className="t3-strategy-num">04</div>
              <h3 className="t3-strategy-title">Attrazione talenti</h3>
              <p className="t3-strategy-desc">
                Rafforzare l&apos;employer branding verso profili quantitativi, economisti, data scientist.
                La crescita richiede le persone giuste &mdash; e le persone giuste cercano online.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Sub-section D: Closing thought ─── */}
        <div className="t3-subsection t3-subsection-bordered t3-closing-thought">
          <p className="t3-thought">
            Queste sono riflessioni dall&apos;esterno. Il valore reale emerge da un confronto
            diretto &mdash; capire i vostri obiettivi post-acquisizione, le priorit&agrave; del nuovo
            gruppo, le aree dove la comunicazione pu&ograve; accelerare ci&ograve; che state costruendo.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="t3-glitch-zone t3-glitch-bwd">
        <div className="t3-glitch-bg" />
        <div className="t3-glitch-scanlines" />
        <div className="t3-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING (dark, Nicola style)
         ════════════════════════════════════════ */}
      <section className="t3-close" id="parliamone">
        <div className="t3-close-inner">
          <div className="t3-close-eyebrow">Prossimo passo</div>
          <h2 className="t3-close-headline">
            Un confronto<br />tra professionisti.
          </h2>
          <p className="t3-close-sub">
            Nessuna proposta preconfezionata. Solo una conversazione per capire
            se posso esservi utile.
          </p>
          <div className="t3-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="t3-close-cta"
            >
              Scrivimi
              <span className="t3-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent("Buongiorno Nicola, ho letto la riflessione su t33. Vorrei approfondire.")}`}
            className="t3-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            O scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="t3-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── T33 CSS ── */
function t33CSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* t33 palette */
  const t = {
    bg: "#ffffff",
    primary: "#009ee0",
    accent: "#df4d34",
    cardBg: "#f8f9fa",
    text: "#212121",
    textDim: "rgba(33,33,33,0.55)",
    textFaint: "rgba(33,33,33,0.35)",
    border: "rgba(33,33,33,0.08)",
    font: "'Inter', system-ui, sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   T33 — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.t3-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.t3-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 100px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.t3-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.t3-ns-logo-row { margin-bottom: 20px; animation: t3FadeUp .6s ease both; }
.t3-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: t3FadeUp .6s .05s ease both;
}
.t3-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: t3FadeUp .6s .1s ease both;
}
.t3-ns-intro {
  font-size: 15px; line-height: 1.85; color: ${n.textDim};
  max-width: 540px; margin-bottom: 32px;
  animation: t3FadeUp .6s .15s ease both;
}
.t3-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: t3FadeUp .6s .2s ease both;
}
.t3-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.t3-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.t3-clock { font-variant-numeric: tabular-nums; }
.t3-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.t3-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: t3FadeUp .6s .2s ease both;
}
.t3-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.t3-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes t3FadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.t3-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.t3-glitch-fwd .t3-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${t.bg} 100%);
}
.t3-glitch-bwd .t3-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${t.bg} 0%, ${n.bg} 100%);
}
.t3-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: t3Scan 6s linear infinite;
}
@keyframes t3Scan { from{background-position:0 0} to{background-position:0 40px} }
.t3-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: t3Gltch 4s infinite;
}
@keyframes t3Gltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT (t33)
══════════════════════════════════════════ */
.t3-prospect {
  background: ${t.bg}; color: ${t.text};
  font-family: ${t.font}; position: relative; z-index: 1;
}
.t3-prospect-topbar {
  background: rgba(255,255,255,0.95); border-bottom: 1px solid ${t.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.t3-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${t.textFaint};
}

/* Sub-sections */
.t3-subsection { padding: 72px 64px 0; max-width: 1100px; margin: 0 auto; }
.t3-subsection-bordered { border-top: 1px solid ${t.border}; }
.t3-subsection-header { margin-bottom: 40px; }
.t3-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${t.primary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.t3-eyebrow::before { content:''; width:24px; height:1px; background:${t.primary}; }
.t3-headline {
  font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${t.text}; max-width: 780px;
  margin-bottom: 20px; letter-spacing: -0.02em;
}

/* Body text for section A */
.t3-body-text {
  max-width: 680px;
}
.t3-body-text p {
  font-size: 16px; line-height: 1.85; color: ${t.textDim};
  margin-bottom: 16px; font-weight: 300;
}
.t3-body-text p:last-child { margin-bottom: 0; }

/* Two-column layout */
.t3-two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
}
.t3-two-col-text p {
  font-size: 15px; line-height: 1.85; color: ${t.textDim}; font-weight: 300;
  margin-bottom: 14px;
}
.t3-two-col-text p:last-child { margin-bottom: 0; }

/* Observations card */
.t3-obs-card {
  background: ${t.cardBg}; border: 1px solid ${t.border};
  padding: 28px 32px; border-radius: 8px;
  border-left: 3px solid ${t.primary};
}
.t3-obs-list {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 18px;
}
.t3-obs-list li {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 14px; line-height: 1.65; color: ${t.text}; font-weight: 400;
}
.t3-obs-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: ${t.primary}; flex-shrink: 0; margin-top: 7px;
}

/* Strategy cards grid */
.t3-strategy-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
  margin-top: 8px;
}
.t3-strategy-card {
  background: ${t.cardBg}; border: 1px solid ${t.border};
  padding: 36px 32px; transition: border-color 0.2s;
}
.t3-strategy-card:hover { border-color: rgba(33,33,33,0.15); }
.t3-strategy-num {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 2px;
  color: ${t.primary}; margin-bottom: 14px; font-weight: 500;
}
.t3-strategy-title {
  font-size: 18px; font-weight: 600; color: ${t.text};
  margin-bottom: 10px; letter-spacing: -0.01em; line-height: 1.3;
}
.t3-strategy-desc {
  font-size: 14px; line-height: 1.75; color: ${t.textDim}; font-weight: 300;
}

/* Closing thought */
.t3-closing-thought {
  padding-bottom: 80px; padding-top: 64px;
  display: flex; align-items: center; justify-content: center;
}
.t3-thought {
  max-width: 720px; text-align: center;
  font-size: 18px; line-height: 1.85; font-style: italic;
  color: ${t.textDim}; font-weight: 300;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING
══════════════════════════════════════════ */
.t3-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.t3-close-inner { max-width: 700px; margin: 0 auto; }
.t3-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.t3-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.t3-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.t3-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.t3-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.t3-close-cta-row { margin-bottom: 20px; }
.t3-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.t3-close-cta:hover { opacity: 0.85; }
.t3-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.t3-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.t3-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.t3-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.t3-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .t3-nicola { grid-template-columns: 1fr; padding: 100px 28px 64px; gap: 40px; }
  .t3-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .t3-prospect-topbar { padding: 0 28px; }
  .t3-prospect-topbar-tag { display: none; }
  .t3-subsection { padding: 56px 28px 0; }
  .t3-two-col { grid-template-columns: 1fr; gap: 32px; }
  .t3-strategy-grid { grid-template-columns: 1fr; }
  .t3-closing-thought { padding-bottom: 56px; }
  .t3-close { padding: 64px 28px; }
  .t3-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .t3-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .t3-nicola { padding: 90px 20px 48px; min-height: auto; }
  .t3-nicola-right { max-width: 160px; }
  .t3-ns-name { font-size: 2rem; }
  .t3-subsection { padding: 40px 20px 0; }
  .t3-obs-card { padding: 20px 24px; }
  .t3-strategy-card { padding: 24px 20px; }
  .t3-closing-thought { padding-bottom: 48px; padding-top: 48px; }
  .t3-thought { font-size: 16px; }
  .t3-close { padding: 48px 20px; }
  .t3-footer { padding: 16px 20px; }
  .t3-glitch-zone { height: 100px; }
  .t3-prospect-topbar { padding: 0 20px; height: 56px; }
}
  `;
}

/* ================================================================
   BLULOGISTIC — FULLY CUSTOM TEMPLATE
   ================================================================ */

function OutreachBlulogistic({ config, slug }: { config: OutreachConfig; slug: string }) {
  const today = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <OutreachTracker slug={slug} />
      <style>{blulogisticCSS()}</style>

      <div className="bl-bg-glow" />
      <BubbleNav />

      {/* ════════════════════════════════════════
           SECTION 1 — NICOLA (dark)
         ════════════════════════════════════════ */}
      <section className="bl-nicola" id="chi-sono">
        <div className="bl-nicola-left">
          <div className="bl-ns-logo-row">
            <Image src="/favicon.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} />
          </div>
          <h1 className="bl-ns-name">Nicola Serrao</h1>
          <div className="bl-ns-role">Digital Marketing Strategist</div>
          <p className="bl-ns-intro">
            Mi occupo di strategia digitale per aziende B2B. Ho analizzato il settore
            della logistica e dei trasporti &mdash; e credo che per Blulogistic ci sia
            un&apos;opportunit&agrave; concreta nel digitale per supportare i vostri
            obiettivi 2026. Vi propongo un confronto per valutarlo insieme.
          </p>
          <ul className="bl-ns-pills">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ancona, Italia
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              nicolaserrao.com
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Analisi del {today}
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <LiveClock />
              <span className="bl-tz-label">Roma</span>
            </li>
          </ul>
        </div>

        <div className="bl-nicola-right">
          <div className="bl-photo-wrap">
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={360}
              height={480}
              priority
              className="bl-photo"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 1
         ════════════════════════════════════════ */}
      <div className="bl-glitch-zone bl-glitch-fwd" id="il-progetto">
        <div className="bl-glitch-bg" />
        <div className="bl-glitch-scanlines" />
        <div className="bl-glitch-label">// il quadro che ho visto</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 2 — BLULOGISTIC (light)
         ════════════════════════════════════════ */}
      <section className="bl-prospect">

        {/* Prospect sticky topbar */}
        <div className="bl-prospect-topbar">
          <Image
            src={config.logo || "/favicon.png"}
            alt={config.companyName}
            width={160}
            height={38}
            style={{ objectFit: "contain", display: "block", maxWidth: 200 }}
          />
          <div className="bl-prospect-topbar-tag">Studio realizzato da Nicola Serrao</div>
        </div>

        {/* ─── Sub-section A: Il contesto digitale ─── */}
        <div className="bl-subsection" id="competenze">
          <div className="bl-subsection-header">
            <div className="bl-eyebrow">Il mercato</div>
            <h2 className="bl-headline">Il 79% degli acquirenti B2B logistica<br />inizia la ricerca online.</h2>
          </div>
          <div className="bl-two-col">
            <div className="bl-two-col-text">
              <p>
                Il settore trasporti e logistica &egrave; sempre pi&ugrave; digitale-dipendente.
                Chi cerca servizi di trasporto combinato, groupage o intermodale parte da Google.
                Chi &egrave; visibile, intercetta la domanda. Chi non c&apos;&egrave;, la perde.
              </p>
            </div>
            <div className="bl-img-col">
              <Image
                src="/images/outreach/blulogistic/gallery.jpg"
                alt="Flotta Blulogistic"
                width={520}
                height={340}
                className="bl-section-img"
              />
            </div>
          </div>
        </div>

        {/* ─── Sub-section B: Il vostro posizionamento ─── */}
        <div className="bl-subsection bl-subsection-bordered">
          <div className="bl-eyebrow">Blulogistic oggi</div>
          <h2 className="bl-headline">Un&apos;esperienza solida.<br />Una presenza online da costruire.</h2>
          <div className="bl-two-col">
            <div className="bl-highlight-card">
              <ul className="bl-strength-list">
                <li>
                  <span className="bl-check-icon">&#10003;</span>
                  20+ anni di esperienza nel settore
                </li>
                <li>
                  <span className="bl-check-icon">&#10003;</span>
                  Rotta Sardegna &#8596; Centro-Nord consolidata
                </li>
                <li>
                  <span className="bl-check-icon">&#10003;</span>
                  Flotta Euro 5/6 (vantaggio green)
                </li>
                <li>
                  <span className="bl-check-icon">&#10003;</span>
                  Team esperto (Lorenzetti, Bocchini)
                </li>
              </ul>
            </div>
            <div className="bl-two-col-text">
              <p>
                Ma oggi il vostro sito &egrave; una vetrina statica. Nessun form di preventivo
                dinamico, nessuna campagna attiva, nessun contenuto che intercetti la domanda
                online. In un mercato dove il 79% parte da una ricerca, questo &egrave; un gap
                che si traduce in opportunit&agrave; perse ogni giorno.
              </p>
              <div className="bl-team-img-wrap">
                <Image
                  src="/images/outreach/blulogistic/team.jpg"
                  alt="Team Blulogistic"
                  width={480}
                  height={300}
                  className="bl-section-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Sub-section C: L'opportunita ─── */}
        <div className="bl-subsection bl-subsection-bordered">
          <div className="bl-eyebrow">La proposta</div>
          <h2 className="bl-headline">Valutare insieme l&apos;apporto dell&apos;online<br />nei vostri obiettivi 2026.</h2>
          <p className="bl-sub">
            Non vi propongo di stravolgere nulla. Vi propongo un confronto professionale
            per capire se e come il digitale pu&ograve; supportare la vostra crescita.
            Dalla visibilit&agrave; su &ldquo;trasporto Sardegna groupage&rdquo; alla generazione
            di contatti qualificati da PMI esportatrici &mdash; le opportunit&agrave; ci sono.
            Serve capire quali hanno senso per voi.
          </p>
          <div className="bl-opp-list">
            <div className="bl-opp-item">
              <div className="bl-opp-title">Visibilit&agrave;</div>
              <div className="bl-opp-desc">Farvi trovare da chi cerca esattamente quello che offrite</div>
            </div>
            <div className="bl-opp-item">
              <div className="bl-opp-title">Lead qualificati</div>
              <div className="bl-opp-desc">Trasformare la ricerca online in richieste di preventivo concrete</div>
            </div>
            <div className="bl-opp-item">
              <div className="bl-opp-title">Misurabilit&agrave;</div>
              <div className="bl-opp-desc">Sapere con esattezza cosa funziona e cosa no</div>
            </div>
          </div>
        </div>

        {/* ─── Sub-section D: Takeaways ─── */}
        <div className="bl-subsection bl-subsection-bordered">
          <div className="bl-arrow-lines">
            <div className="bl-arrow-line">
              <span className="bl-arrow-icon">&rarr;</span>
              <span>Questa &egrave; una lettura dall&apos;esterno &mdash; il valore vero emerge da un confronto diretto.</span>
            </div>
            <div className="bl-arrow-line">
              <span className="bl-arrow-icon">&rarr;</span>
              <span>Non serve un grande investimento per iniziare: serve chiarezza sugli obiettivi.</span>
            </div>
            <div className="bl-arrow-line">
              <span className="bl-arrow-icon">&rarr;</span>
              <span>Se vi interessa valutare, bastano 20 minuti di chiamata. Senza impegno.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
           GLITCH DIVIDER 2
         ════════════════════════════════════════ */}
      <div className="bl-glitch-zone bl-glitch-bwd">
        <div className="bl-glitch-bg" />
        <div className="bl-glitch-scanlines" />
        <div className="bl-glitch-label">// e adesso?</div>
      </div>

      {/* ════════════════════════════════════════
           SECTION 3 — CLOSING (dark, Nicola style)
         ════════════════════════════════════════ */}
      <section className="bl-close" id="parliamone">
        <div className="bl-close-inner">
          <div className="bl-close-eyebrow">Prossimo passo</div>
          <h2 className="bl-close-headline">
            Un confronto<br />di 20 minuti.
          </h2>
          <p className="bl-close-sub">
            Vi racconto quello che ho trovato e valutiamo insieme se ha senso
            per i vostri obiettivi 2026.
          </p>
          <div className="bl-close-cta-row">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
              className="bl-close-cta"
            >
              Scrivimi
              <span className="bl-arr" />
            </a>
          </div>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
            className="bl-close-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            O scrivimi su WhatsApp
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════
           FOOTER
         ════════════════════════════════════════ */}
      <footer className="bl-footer">
        <span>&copy; Nicola Serrao &middot; Digital Marketing Strategist &middot; nicolaserrao.com</span>
        <span>{SITE.email} &middot; {SITE.phone}</span>
      </footer>
    </>
  );
}

/* ── Blulogistic CSS ── */
function blulogisticCSS(): string {
  /* Nicola palette */
  const n = {
    bg: "#0a0e0d",
    cyan: "#00fffc",
    cyanDim: "rgba(0,255,252,0.10)",
    cyanBorder: "rgba(0,255,252,0.22)",
    text: "#e8f0ff",
    textDim: "rgba(232,240,255,0.50)",
    textFaint: "rgba(232,240,255,0.20)",
    serif: "'Playfair Display', serif",
    mono: "'DM Mono', monospace",
  };
  /* Blulogistic palette */
  const b = {
    bg: "#f5f7fa",
    primary: "#2d6db5",
    accent: "#3a85d3",
    cardBg: "#ffffff",
    text: "#1a2332",
    textDim: "rgba(26,35,50,0.55)",
    textFaint: "rgba(26,35,50,0.35)",
    border: "rgba(26,35,50,0.08)",
    font: "'Inter', system-ui, sans-serif",
  };

  return `
/* ══════════════════════════════════════════
   BLULOGISTIC — RESET & BASE
══════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: ${n.bg}; color: ${n.text}; font-family: ${n.mono}; overflow-x: hidden; }
.bl-bg-glow {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(0,255,252,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,255,252,0.02) 0%, transparent 50%);
}

/* ══════════════════════════════════════════
   SECTION 1 — NICOLA
══════════════════════════════════════════ */
.bl-nicola {
  position: relative; z-index: 1;
  min-height: 100vh; padding: 100px 64px 80px;
  display: grid; grid-template-columns: 1fr 380px;
  gap: 60px; align-items: center;
}
.bl-nicola::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${n.cyanBorder}, transparent);
}
.bl-ns-logo-row { margin-bottom: 20px; animation: blFadeUp .6s ease both; }
.bl-ns-name {
  font-family: ${n.serif}; font-size: clamp(2.2rem, 3.5vw, 3.6rem);
  font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 8px;
  animation: blFadeUp .6s .05s ease both;
}
.bl-ns-role {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 28px;
  animation: blFadeUp .6s .1s ease both;
}
.bl-ns-intro {
  font-size: 15px; line-height: 1.8; color: ${n.textDim};
  max-width: 520px; margin-bottom: 32px;
  animation: blFadeUp .6s .15s ease both;
}
.bl-ns-pills {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;
  animation: blFadeUp .6s .2s ease both;
}
.bl-ns-pills li {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; color: ${n.textDim};
}
.bl-ns-pills li svg { color: ${n.cyan}; flex-shrink: 0; }
.bl-clock { font-variant-numeric: tabular-nums; }
.bl-tz-label {
  font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
  color: ${n.textFaint}; margin-left: 4px;
}

/* Photo */
.bl-nicola-right {
  display: flex; flex-direction: column; align-items: center;
  animation: blFadeUp .6s .2s ease both;
}
.bl-photo-wrap {
  position: relative; width: 100%; max-width: 340px;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 3% 97%);
}
.bl-photo {
  width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top center;
  display: block; filter: grayscale(60%) contrast(1.08); opacity: 0.85;
}

@keyframes blFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

/* ══════════════════════════════════════════
   GLITCH ZONES
══════════════════════════════════════════ */
.bl-glitch-zone {
  position: relative; height: 180px; overflow: hidden;
  display: flex; align-items: center; justify-content: center; z-index: 1;
}
.bl-glitch-fwd .bl-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${n.bg} 0%, ${b.bg} 100%);
}
.bl-glitch-bwd .bl-glitch-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, ${b.bg} 0%, ${n.bg} 100%);
}
.bl-glitch-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,252,0.025) 2px, rgba(0,255,252,0.025) 4px);
  animation: blScan 6s linear infinite;
}
@keyframes blScan { from{background-position:0 0} to{background-position:0 40px} }
.bl-glitch-label {
  position: relative; z-index: 2; font-family: ${n.serif}; font-style: italic;
  font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 700; color: ${n.cyan};
  letter-spacing: 0.06em; animation: blGltch 4s infinite;
}
@keyframes blGltch {
  0%,88%,100%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
  90%{text-shadow:-5px 0 rgba(255,0,100,.8),5px 0 rgba(0,200,255,.8);transform:translateX(3px)}
  93%{text-shadow:5px 0 rgba(255,0,100,.8),-5px 0 rgba(0,200,255,.8);transform:translateX(-3px)}
  96%{text-shadow:2px 0 rgba(255,0,100,.5),-2px 0 rgba(0,200,255,.5);transform:none}
}

/* ══════════════════════════════════════════
   SECTION 2 — PROSPECT
══════════════════════════════════════════ */
.bl-prospect {
  background: ${b.bg}; color: ${b.text};
  font-family: ${b.font}; position: relative; z-index: 1;
}
.bl-prospect-topbar {
  background: rgba(245,247,250,0.95); border-bottom: 1px solid ${b.border};
  padding: 0 64px; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.bl-prospect-topbar-tag {
  font-family: ${n.mono}; font-size: 11px; letter-spacing: 1.5px;
  text-transform: uppercase; color: ${b.textFaint};
}

/* Sub-sections */
.bl-subsection { padding: 72px 64px 0; max-width: 1100px; margin: 0 auto; }
.bl-subsection-bordered { border-top: 1px solid ${b.border}; }
.bl-subsection-header { margin-bottom: 40px; }
.bl-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${b.primary}; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.bl-eyebrow::before { content:''; width:24px; height:1px; background:${b.primary}; }
.bl-headline {
  font-size: clamp(1.8rem, 3.2vw, 3rem); font-weight: 700;
  line-height: 1.15; color: ${b.text}; max-width: 780px;
  margin-bottom: 20px; letter-spacing: -0.02em;
}
.bl-sub {
  font-size: 16px; line-height: 1.8; color: ${b.textDim};
  max-width: 640px; margin-bottom: 40px; font-weight: 300;
}
.bl-body {
  font-size: 15px; line-height: 1.8; color: ${b.textDim};
  max-width: 640px; margin-bottom: 16px; font-weight: 300;
}

/* Two-column layout */
.bl-two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
}
.bl-two-col-text p {
  font-size: 15px; line-height: 1.8; color: ${b.textDim}; font-weight: 300;
}
.bl-img-col { display: flex; align-items: center; }
.bl-section-img {
  width: 100%; height: auto; border-radius: 8px;
  object-fit: cover; border: 1px solid ${b.border};
}
.bl-team-img-wrap { margin-top: 24px; }

/* Highlight card (strengths) */
.bl-highlight-card {
  background: ${b.cardBg}; border: 1px solid ${b.border};
  padding: 28px 32px; border-radius: 8px;
  border-left: 3px solid ${b.primary};
}
.bl-strength-list {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px;
}
.bl-strength-list li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 15px; line-height: 1.6; color: ${b.text}; font-weight: 400;
}
.bl-check-icon {
  color: ${b.primary}; font-weight: 700; flex-shrink: 0; margin-top: 1px;
}

/* Opportunity items */
.bl-opp-list {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
  margin-bottom: 32px;
}
.bl-opp-item {
  background: ${b.cardBg}; border: 1px solid ${b.border}; padding: 28px 24px;
}
.bl-opp-title {
  font-size: 16px; font-weight: 700; color: ${b.primary};
  margin-bottom: 8px; letter-spacing: -0.01em;
}
.bl-opp-desc {
  font-size: 13px; line-height: 1.7; color: ${b.textDim}; font-weight: 300;
}

/* Arrow lines */
.bl-arrow-lines {
  display: flex; flex-direction: column; gap: 20px;
  padding-bottom: 72px; padding-top: 48px;
}
.bl-arrow-line {
  display: flex; align-items: flex-start; gap: 14px;
  font-size: 15px; line-height: 1.7; color: ${b.textDim}; font-weight: 300;
}
.bl-arrow-icon {
  color: ${b.primary}; flex-shrink: 0; margin-top: 2px; font-size: 14px;
}

/* ══════════════════════════════════════════
   SECTION 3 — CLOSING
══════════════════════════════════════════ */
.bl-close {
  position: relative; z-index: 1;
  padding: 96px 64px; background: ${n.bg};
  text-align: center;
}
.bl-close-inner { max-width: 700px; margin: 0 auto; }
.bl-close-eyebrow {
  font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
  color: ${n.cyan}; margin-bottom: 24px;
  display: inline-flex; align-items: center; gap: 12px;
}
.bl-close-eyebrow::before { content:''; width:32px; height:1px; background:${n.cyan}; }
.bl-close-eyebrow::after { content:''; width:32px; height:1px; background:${n.cyan}; }
.bl-close-headline {
  font-family: ${n.serif};
  font-size: clamp(2rem, 3.5vw, 3.6rem); font-weight: 700;
  line-height: 1.12; letter-spacing: -0.02em;
  color: ${n.text}; margin-bottom: 20px;
}
.bl-close-sub {
  font-size: 17px; line-height: 1.7; color: ${n.textDim};
  margin-bottom: 40px;
}
.bl-close-cta-row { margin-bottom: 20px; }
.bl-close-cta {
  display: inline-flex; align-items: center; gap: 12px;
  background: ${n.cyan}; color: ${n.bg};
  font-family: ${n.mono}; font-size: 11px; font-weight: 500;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 16px 32px; text-decoration: none; transition: opacity 0.2s;
}
.bl-close-cta:hover { opacity: 0.85; }
.bl-arr { width: 16px; height: 1px; background: ${n.bg}; position: relative; }
.bl-arr::after {
  content:''; position:absolute; right:0; top:-3px;
  width:6px; height:6px;
  border-right:1px solid ${n.bg}; border-top:1px solid ${n.bg};
  transform:rotate(45deg);
}
.bl-close-wa {
  font-size: 12px; color: ${n.textDim}; text-decoration: none;
  transition: color 0.2s; display: inline-block;
  border-bottom: 1px solid ${n.textFaint};
  padding-bottom: 2px;
}
.bl-close-wa:hover { color: ${n.cyan}; border-color: ${n.cyan}; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.bl-footer {
  position: relative; z-index: 1;
  border-top: 1px solid ${n.cyanBorder};
  padding: 24px 64px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: ${n.textFaint}; background: ${n.bg};
}

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media(max-width:960px){
  .bl-nicola { grid-template-columns: 1fr; padding: 100px 28px 64px; gap: 40px; }
  .bl-nicola-right { order: -1; max-width: 220px; margin: 0 auto; }
  .bl-prospect-topbar { padding: 0 28px; }
  .bl-prospect-topbar-tag { display: none; }
  .bl-subsection { padding: 56px 28px 0; }
  .bl-two-col { grid-template-columns: 1fr; gap: 32px; }
  .bl-opp-list { grid-template-columns: 1fr; }
  .bl-arrow-lines { padding-bottom: 56px; }
  .bl-close { padding: 64px 28px; }
  .bl-footer { padding: 20px 28px; flex-direction: column; gap: 6px; text-align: center; }
  .bl-glitch-zone { height: 140px; }
}
@media(max-width:480px){
  .bl-nicola { padding: 90px 20px 48px; min-height: auto; }
  .bl-nicola-right { max-width: 160px; }
  .bl-ns-name { font-size: 2rem; }
  .bl-subsection { padding: 40px 20px 0; }
  .bl-highlight-card { padding: 20px 24px; }
  .bl-opp-item { padding: 20px 16px; }
  .bl-close { padding: 48px 20px; }
  .bl-footer { padding: 16px 20px; }
  .bl-glitch-zone { height: 100px; }
  .bl-prospect-topbar { padding: 0 20px; height: 56px; }
}
  `;
}

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
