import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { configs, getConfig, getAllSlugs } from "@/data/outreach/loader";
import type { OutreachConfig } from "@/data/outreach/types";
import { Tracker } from "./tracker";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config) return { robots: { index: false, follow: false } };

  return {
    title: `Analisi privata · ${config.prospect.companyName}`,
    description: config.hero.subheadline,
    robots: { index: false, follow: false },
  };
}

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config) notFound();

  return (
    <main>
      <Tracker slug={slug} />
      <Hero config={config} />
      <Divider config={config} />
      <ProspectSection config={config} />
      <OutreachStyles config={config} />
    </main>
  );
}

/* ─────────────────────────────────────────────
   DIVIDER — banda di transizione tra hero e sezione prospect
   Layout: [testo glitch "Nicola Serrao"] · [logo Nicola] · [logo prospect]
───────────────────────────────────────────── */

function Divider({ config }: { config: OutreachConfig }) {
  const logoUrl = config.prospect.logoUrl;
  const logoMaxH = config.prospect.logoMaxHeight ?? 56;

  return (
    <section className="o-divider">
      <div className="o-divider__inner">
        <div className="o-divider__glitch" aria-label="Nicola Serrao">
          <span className="o-divider__glitch-back" aria-hidden="true">Nicola</span>
          <span className="o-divider__glitch-front">Nicola Serrao</span>
        </div>

        <div className="o-divider__sep" aria-hidden="true">×</div>

        <div className="o-divider__logo o-divider__logo--nicola">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.png" alt="Nicola Serrao" className="o-divider__logo-icon" />
          <span className="o-divider__logo-text">
            Nicola <em className="o-divider__logo-text-accent">Serrao</em>
          </span>
        </div>

        {logoUrl && (
          <>
            <div className="o-divider__sep" aria-hidden="true">×</div>
            <div className="o-divider__logo o-divider__logo--prospect">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={config.prospect.companyName}
                className="o-divider__logo-img"
                style={{ maxHeight: `${logoMaxH}px` }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HERO — stile sito Nicola Serrao
   Background: #0a0e0d, accent teal #00fffc, Playfair + DM Mono
───────────────────────────────────────────── */

function Hero({ config }: { config: OutreachConfig }) {
  const { hero } = config;

  return (
    <section className="o-hero">
      <div className="o-hero__inner">
        <div className="o-hero__copy">
          <div className="o-hero__eyebrow">{hero.eyebrow}</div>
          <h1 className="o-hero__headline">{hero.headline}</h1>
          <p className="o-hero__subheadline">{hero.subheadline}</p>
          <div className="o-hero__signature">
            <span className="o-hero__signature-dot" aria-hidden="true" />
            {hero.signature}
          </div>
        </div>

        <div className="o-hero__video">
          <VideoFrame url={hero.videoUrl} aspect={hero.videoAspect ?? "16/9"} />
        </div>
      </div>
    </section>
  );
}

function VideoFrame({
  url,
  aspect,
}: {
  url: string | null;
  aspect: "16/9" | "4/5" | "9/16" | "1/1";
}) {
  const isVertical = aspect === "4/5" || aspect === "9/16";
  const wrapperClass = isVertical ? "o-video o-video--vertical" : "o-video";
  const style = { aspectRatio: aspect.replace("/", " / ") };

  if (url) {
    return (
      <div className={wrapperClass} style={style}>
        <iframe
          src={url}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video presentazione"
          className="o-video__iframe"
        />
      </div>
    );
  }

  return (
    <div className={`${wrapperClass} o-video--placeholder`} style={style}>
      <div className="o-video__ph-inner">
        <div className="o-video__ph-icon" aria-hidden="true">▶</div>
        <div className="o-video__ph-text">Video in arrivo</div>
        <div className="o-video__ph-sub">~ 75 secondi</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SEZIONE 2 — stile prospect (token dal config)
───────────────────────────────────────────── */

function ProspectSection({ config }: { config: OutreachConfig }) {
  const { closing, observations, conditions, cta } = config;
  const conditionsParagraphs = conditions.split("\n\n");

  return (
    <section className="o-prospect">
      <div className="o-prospect__inner">
        <div className="o-prospect__intro">
          <div className="o-prospect__eyebrow">{closing.title}</div>
          <p className="o-prospect__intro-note">{closing.introNote}</p>
        </div>

        <div className="o-observations">
          {observations.map((obs, i) => (
            <article key={i} className="o-obs">
              <div className="o-obs__label">{obs.label}</div>
              <h2 className="o-obs__title">{obs.title}</h2>
              <div className="o-obs__body">
                {obs.body.split("\n\n").map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="o-divider" aria-hidden="true" />

        <div className="o-conditions">
          {conditionsParagraphs.map((p, i) => (
            <p key={i} className={i === conditionsParagraphs.length - 1 ? "o-conditions__final" : ""}>
              {p}
            </p>
          ))}
        </div>

        <div className="o-cta">
          <a
            href={cta.primaryHref}
            className="o-cta__primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta.primaryText}
          </a>
          <div className="o-cta__secondary">
            {cta.secondaryText} · WhatsApp{" "}
            <a href={cta.whatsappHref} target="_blank" rel="noopener noreferrer">
              +39 338 5691369
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STILI INLINE
   - Hero: design system Nicola (dark, teal, Playfair)
   - Sezione 2: design tokens del prospect (dal config)
───────────────────────────────────────────── */

function OutreachStyles({ config }: { config: OutreachConfig }) {
  const s = config.prospectStyle;

  // CSS scoped via classi prefix `o-*` per evitare conflitti col resto del sito
  const css = `
    .o-hero,
    .o-divider,
    .o-prospect {
      width: 100%;
      box-sizing: border-box;
      overflow-x: clip;
    }
    .o-hero *,
    .o-divider *,
    .o-prospect * {
      box-sizing: border-box;
    }

    /* ============ HERO (stile Nicola) ============ */

    .o-hero {
      background: #0a0e0d;
      color: #e8f5f2;
      padding: 80px 40px;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
    .o-hero__inner {
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    .o-hero__eyebrow {
      font-family: var(--font-dm-mono), 'Courier New', monospace;
      font-size: 11px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(0, 255, 252, 0.7);
      margin-bottom: 32px;
    }
    .o-hero__headline {
      font-family: var(--font-playfair), Georgia, serif;
      font-weight: 700;
      font-size: clamp(36px, 4.6vw, 60px);
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: #e8f5f2;
      margin: 0 0 28px 0;
    }
    .o-hero__subheadline {
      font-family: var(--font-dm-mono), 'Courier New', monospace;
      font-size: 17px;
      line-height: 1.65;
      color: rgba(232, 245, 242, 0.78);
      margin: 0 0 40px 0;
      max-width: 520px;
    }
    .o-hero__signature {
      font-family: var(--font-dm-mono), 'Courier New', monospace;
      font-size: 13px;
      letter-spacing: 0.05em;
      color: rgba(232, 245, 242, 0.55);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .o-hero__signature-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #00fffc;
      display: inline-block;
    }

    .o-hero__video {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .o-video {
      position: relative;
      width: 100%;
      background: rgba(0, 255, 252, 0.04);
      border: 1.5px solid rgba(0, 255, 252, 0.55);
      border-radius: 4px;
      overflow: hidden;
      box-shadow:
        6px 6px 0 -1px rgba(0, 255, 252, 0.22),
        12px 12px 0 -1px rgba(0, 255, 252, 0.10),
        -4px -4px 0 -1px rgba(255, 0, 200, 0.14),
        0 0 60px rgba(0, 255, 252, 0.18);
    }
    .o-video::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        repeating-linear-gradient(
          to bottom,
          transparent 0px,
          transparent 3px,
          rgba(0, 255, 252, 0.04) 3px,
          rgba(0, 255, 252, 0.04) 4px
        );
      mix-blend-mode: overlay;
      z-index: 2;
    }
    .o-video--vertical {
      max-width: 380px;
      width: 100%;
    }
    .o-video__iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
    .o-video--placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .o-video__ph-inner { text-align: center; }
    .o-video__ph-icon {
      font-size: 48px;
      color: #00fffc;
      opacity: 0.6;
      margin-bottom: 16px;
    }
    .o-video__ph-text {
      font-family: var(--font-playfair), Georgia, serif;
      font-size: 20px;
      color: #e8f5f2;
      margin-bottom: 4px;
    }
    .o-video__ph-sub {
      font-family: var(--font-dm-mono), 'Courier New', monospace;
      font-size: 12px;
      color: rgba(232, 245, 242, 0.4);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    /* ============ DIVIDER (stacco hero → prospect) ============ */

    .o-divider {
      background: #0a0e0d;
      padding: 32px 40px;
      border-top: 1px solid rgba(0, 255, 252, 0.18);
      border-bottom: 1px solid rgba(0, 255, 252, 0.18);
      position: relative;
    }
    .o-divider::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent 2px,
          rgba(0, 255, 252, 0.025) 2px,
          rgba(0, 255, 252, 0.025) 3px
        );
    }
    .o-divider__inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
    }

    /* Glitch text */
    .o-divider__glitch {
      position: relative;
      display: inline-block;
      font-family: var(--font-playfair), Georgia, serif;
      font-weight: 700;
      font-size: clamp(20px, 2.2vw, 30px);
      line-height: 1;
      letter-spacing: -0.01em;
      white-space: nowrap;
      animation: o-glitch-jitter 8s infinite steps(1, end);
    }
    .o-divider__glitch-front {
      position: relative;
      color: #ffffff;
      z-index: 2;
    }
    .o-divider__glitch-back {
      position: absolute;
      top: 0;
      left: 0;
      color: #00fffc;
      transform: translate(-3px, 1px);
      opacity: 0.85;
      z-index: 1;
      mix-blend-mode: screen;
      filter: blur(0.3px);
    }
    @keyframes o-glitch-jitter {
      0%, 96%, 100% { transform: translate(0, 0); }
      97% { transform: translate(1px, 0); }
      98% { transform: translate(-1px, 0); }
      99% { transform: translate(0.5px, -0.5px); }
    }

    /* Separatore × */
    .o-divider__sep {
      font-family: var(--font-dm-mono), monospace;
      color: rgba(0, 255, 252, 0.35);
      font-size: 18px;
      font-weight: 300;
      user-select: none;
    }

    /* Logo Nicola */
    .o-divider__logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .o-divider__logo-icon {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
    .o-divider__logo-text {
      font-family: var(--font-playfair), Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      color: #e8f5f2;
      letter-spacing: -0.3px;
      line-height: 1;
    }
    .o-divider__logo-text-accent {
      color: #00fffc;
      font-style: normal;
    }

    /* Logo prospect */
    .o-divider__logo--prospect {
      display: flex;
      align-items: center;
    }
    .o-divider__logo-img {
      width: auto;
      height: auto;
      display: block;
      object-fit: contain;
      opacity: 0.9;
    }

    /* ============ SEZIONE 2 (stile prospect) ============ */

    .o-prospect {
      background: ${s.bgPrimary};
      color: ${s.textPrimary};
      padding: 120px 40px;
      font-family: ${s.fontBody};
      font-weight: ${s.bodyWeight};
    }
    .o-prospect__inner {
      max-width: 980px;
      margin: 0 auto;
    }

    .o-prospect__intro { margin-bottom: 80px; }
    .o-prospect__eyebrow {
      font-family: ${s.fontHeading};
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: ${s.accent};
      margin-bottom: 24px;
    }
    .o-prospect__intro-note {
      font-family: ${s.fontHeading};
      font-weight: ${s.headingWeight};
      font-size: clamp(22px, 2.4vw, 30px);
      line-height: 1.4;
      letter-spacing: ${s.headingLetterSpacing};
      color: ${s.textPrimary};
      margin: 0;
      max-width: 720px;
    }

    .o-observations {
      display: flex;
      flex-direction: column;
      gap: 80px;
      margin-bottom: 100px;
    }
    .o-obs {
      border-top: 1px solid ${s.border};
      padding-top: 32px;
    }
    .o-obs__label {
      font-family: ${s.fontHeading};
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.25em;
      ${s.headingTransform === "uppercase" ? "text-transform: uppercase;" : ""}
      color: ${s.accent};
      margin-bottom: 24px;
    }
    .o-obs__title {
      font-family: ${s.fontHeading};
      font-weight: ${s.headingWeight};
      font-size: clamp(28px, 3.6vw, 48px);
      line-height: 1.1;
      letter-spacing: ${s.headingLetterSpacing};
      ${s.headingTransform === "uppercase" ? "text-transform: uppercase;" : ""}
      color: ${s.accent};
      margin: 0 0 32px 0;
    }
    .o-obs__body p {
      font-family: ${s.fontBody};
      font-weight: ${s.bodyWeight};
      font-size: 16px;
      line-height: 1.75;
      color: ${s.textSecondary};
      margin: 0 0 18px 0;
      max-width: 760px;
    }
    .o-obs__body p:last-child { margin-bottom: 0; }

    .o-divider {
      width: 60px;
      height: 1px;
      background: ${s.accent};
      margin: 0 auto 60px auto;
    }

    .o-conditions {
      max-width: 720px;
      margin: 0 auto 80px auto;
      text-align: center;
    }
    .o-conditions p {
      font-family: ${s.fontBody};
      font-weight: ${s.bodyWeight};
      font-size: 16px;
      line-height: 1.75;
      color: ${s.textSecondary};
      margin: 0 0 18px 0;
    }
    .o-conditions__final {
      font-family: ${s.fontHeading} !important;
      font-weight: ${s.headingWeight} !important;
      font-size: clamp(20px, 2.2vw, 26px) !important;
      line-height: 1.35 !important;
      letter-spacing: ${s.headingLetterSpacing} !important;
      ${s.headingTransform === "uppercase" ? "text-transform: uppercase !important;" : ""}
      color: ${s.accent} !important;
      margin-top: 24px !important;
    }

    .o-cta {
      text-align: center;
    }
    .o-cta__primary {
      display: inline-block;
      font-family: ${s.fontHeading};
      font-weight: 400;
      font-size: 13px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${s.accent};
      background: transparent;
      border: 1px solid ${s.accent};
      border-radius: ${s.buttonRadius};
      padding: ${s.buttonPadding};
      text-decoration: none;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .o-cta__primary:hover {
      background: ${s.accent};
      color: ${s.bgPrimary};
    }
    .o-cta__secondary {
      font-family: ${s.fontBody};
      font-weight: ${s.bodyWeight};
      font-size: 13px;
      color: ${s.textSecondary};
      margin-top: 24px;
      letter-spacing: 0.02em;
    }
    .o-cta__secondary a {
      color: ${s.accent};
      text-decoration: none;
      border-bottom: 1px solid ${s.border};
    }
    .o-cta__secondary a:hover {
      border-bottom-color: ${s.accent};
    }

    /* ============ RESPONSIVE ============ */

    @media (max-width: 900px) {
      .o-hero {
        padding: 60px 24px;
        min-height: auto;
      }
      .o-hero__inner {
        grid-template-columns: 1fr;
        gap: 48px;
      }
      .o-divider {
        padding: 24px 24px;
      }
      .o-divider__inner {
        gap: 24px;
      }
      .o-prospect {
        padding: 80px 24px;
      }
      .o-observations { gap: 56px; }
      .o-video--vertical {
        max-width: 320px;
      }
      .o-video {
        box-shadow:
          5px 5px 0 -1px rgba(0, 255, 252, 0.22),
          10px 10px 0 -1px rgba(0, 255, 252, 0.10),
          -3px -3px 0 -1px rgba(255, 0, 200, 0.14),
          0 0 40px rgba(0, 255, 252, 0.18);
      }
    }

    @media (max-width: 480px) {
      .o-hero {
        padding: 48px 20px;
      }
      .o-hero__headline {
        font-size: 32px;
        line-height: 1.12;
      }
      .o-divider {
        padding: 20px 20px;
      }
      .o-divider__inner {
        gap: 14px;
        flex-direction: column;
      }
      .o-divider__sep {
        display: none;
      }
      .o-divider__glitch {
        font-size: 22px;
      }
      .o-divider__logo-img {
        max-height: 44px !important;
      }
      .o-hero__subheadline {
        font-size: 15px;
      }
      .o-prospect {
        padding: 64px 20px;
      }
      .o-prospect__intro { margin-bottom: 56px; }
      .o-prospect__intro-note {
        font-size: 19px;
      }
      .o-obs__title {
        font-size: 26px;
        line-height: 1.15;
      }
      .o-obs__body p {
        font-size: 15px;
      }
      .o-conditions { margin-bottom: 56px; }
      .o-conditions p { font-size: 15px; }
      .o-conditions__final {
        font-size: 18px !important;
      }
      .o-cta__primary {
        padding: 14px 32px;
        font-size: 12px;
        letter-spacing: 0.16em;
      }
      .o-cta__secondary { font-size: 12px; }
      .o-video--vertical {
        max-width: 280px;
      }
      .o-video {
        box-shadow:
          4px 4px 0 -1px rgba(0, 255, 252, 0.22),
          8px 8px 0 -1px rgba(0, 255, 252, 0.10),
          -2px -2px 0 -1px rgba(255, 0, 200, 0.14),
          0 0 30px rgba(0, 255, 252, 0.18);
      }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
