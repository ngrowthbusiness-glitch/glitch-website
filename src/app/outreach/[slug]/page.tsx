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

  if (config.pitch) return <OutreachV3 config={config} slug={slug} />;
  return <OutreachV2 config={config} slug={slug} />;
}

/* ================================================================
   V3 TEMPLATE — faithful conversion of old PHP outreach pages
   ================================================================ */

function OutreachV3({ config, slug }: { config: OutreachConfig; slug: string }) {
  const isLightBg = isLight(config.palette.background);
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
  const pBg = config.palette.background;
  const pPrimary = config.palette.primary;
  const pText = config.palette.text;
  const pTextDim = config.palette.textDim;
  const pBorder = config.palette.border;
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
  background: radial-gradient(ellipse 70% 70% at 60% 50%, ${config.palette.primaryDim} 0%, transparent 70%);
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
  background: ${config.palette.primaryDim};
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
.tl-after { background: ${config.palette.primaryDim}; border-color: ${pPrimary}30; }
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
  background: ${config.palette.primaryDim};
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
