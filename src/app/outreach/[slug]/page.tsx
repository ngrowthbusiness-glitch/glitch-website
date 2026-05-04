import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { configs, getConfig, getAllSlugs } from "@/data/outreach/loader";
import type { OutreachConfig } from "@/data/outreach/types";
import { Tracker } from "./tracker";
import ContactCTAButton from "@/components/layout/ContactCTAButton";

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
      <NicolaContactSection config={config} />
      <OutreachFooter />
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

  return (
    <section className="o-divider">
      <div className="o-divider__row">
        <div className="o-divider__brand o-divider__brand--nicola">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.png" alt="" className="o-divider__icon" aria-hidden="true" />
          <span className="o-divider__name" aria-label="Nicola Serrao">
            <span className="o-divider__name-back" aria-hidden="true">Nicola Serrao</span>
            <span className="o-divider__name-front">
              Nicola <em className="o-divider__name-accent">Serrao</em>
            </span>
          </span>
        </div>

        <div className="o-divider__line" aria-hidden="true">
          <span className="o-divider__line-base" />
          <span className="o-divider__line-scan" />
          <span className="o-divider__line-shift" />
        </div>

        {logoUrl && (
          <div className="o-divider__brand o-divider__brand--prospect">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt={config.prospect.companyName}
              className="o-divider__logo-img"
            />
          </div>
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
          <div className="o-hero__brand">
            <span className="o-hero__brand-name" aria-label="Nicola Serrao">
              <span className="o-hero__brand-name-back" aria-hidden="true">Nicola Serrao</span>
              <span className="o-hero__brand-name-front">
                Nicola <em className="o-hero__brand-name-accent">Serrao</em>
              </span>
            </span>
          </div>
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
  const { closing, observations } = config;

  return (
    <section className="o-prospect">
      <div className="o-prospect__inner">
        <div className="o-prospect__intro">
          <div className="o-prospect__eyebrow">{closing.title}</div>
          <p className="o-prospect__intro-note">{closing.introNote}</p>
        </div>

        <div className="o-observations" role="region" aria-label="Idee embrionali">
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
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SEZIONE FINALE — torna allo stile Nicola (dark, teal)
   Contiene: emotional "Conosciamoci" + conditions box pattern home + CTA stile sito
───────────────────────────────────────────── */

function NicolaContactSection({ config }: { config: OutreachConfig }) {
  const { closing, cta } = config;
  const emotionalParagraphs = closing.emotional?.split("\n\n") ?? [];
  const emotionalTitle = closing.emotionalTitle ?? "CONOSCIAMOCI";

  return (
    <section className="o-nicola">
      <div className="o-nicola__inner">
        {closing.emotional && (
          <div className="o-nicola__emotional">
            <div className="o-nicola__emotional-title">{emotionalTitle}</div>
            <div className="o-nicola__emotional-body">
              {emotionalParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Box CTA finale — IDENTICA alla home page (.hp-cta hp-cta-final) */}
        <div className="hp-cta hp-cta-final">
          <div className="hp-cta-eyebrow">Conosciamoci</div>

          <h2 className="hp-h2" style={{ position: "relative", marginBottom: "20px" }}>
            20 minuti.<br />Ne usciamo con <em>ordine e chiarezza</em>.
          </h2>

          <p className="hp-cta-honest">
            &ldquo;Se ti dicessi che dietro non c&apos;&egrave; una vendita, ti mentirei. Ma non &egrave; proprio cos&igrave; che funziona con me.&rdquo;
          </p>

          <div className="hp-cta-explainer">
            <p>
              Faccio call con chi vuole una <strong>reale consulenza</strong>, non con chi cerca un preventivo. Mi racconti dove sei e dove vuoi arrivare. Io ti dico onestamente <strong>se posso esserti utile, o se puoi farcela da solo</strong>.
            </p>
            <p>
              &Egrave; controproducente per entrambi se ti vendo qualcosa che non ti serve.
            </p>
          </div>

          <div className="hp-cta-promise">
            <div className="hp-cta-promise-title">Cosa ricevi sempre, in 20 minuti:</div>
            <ul className="hp-cta-promise-list">
              <li>
                <span className="hp-cta-promise-key">Ordine</span>
                <span className="hp-cta-promise-val">sui passi successivi</span>
              </li>
              <li>
                <span className="hp-cta-promise-key">Chiarezza</span>
                <span className="hp-cta-promise-val">sulle priorit&agrave;</span>
              </li>
              <li>
                <span className="hp-cta-promise-key">Focus</span>
                <span className="hp-cta-promise-val">su cosa muove davvero i numeri</span>
              </li>
            </ul>
          </div>

          <p className="hp-cta-closing">
            Tu non vuoi questo ordine? Non vuoi questa chiarezza?
          </p>

          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <ContactCTAButton
              label={cta.primaryText}
              microcopy="Ho sempre un grande interesse nel conoscere nuovi contesti."
              align="center"
              buttonClassName="s-btn-primary"
              emailHref={cta.emailHref}
              whatsappHref={cta.phoneHref}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER — info legali + contatti, riadattato dal sito
───────────────────────────────────────────── */

function OutreachFooter() {
  return (
    <footer className="o-footer">
      <div className="o-footer__inner">
        <div className="o-footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.png" alt="" className="o-footer__brand-icon" aria-hidden="true" />
          <div>
            <div className="o-footer__brand-name">
              Nicola <span className="o-footer__brand-accent">Serrao</span>
            </div>
            <div className="o-footer__brand-role">Fractional CMO &middot; AI-Powered Strategist</div>
          </div>
        </div>

        <div className="o-footer__divider" aria-hidden="true" />

        <div className="o-footer__cols">
          <div className="o-footer__col">
            <div className="o-footer__col-label">Contatti</div>
            <ul>
              <li>
                <a href="mailto:marketing@nicolaserrao.com" className="o-footer__contact">
                  marketing@nicolaserrao.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/393385691369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="o-footer__contact"
                >
                  WhatsApp &rarr; +39 338 5691369
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nicola-serrao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="o-footer__contact"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="o-footer__col">
            <div className="o-footer__col-label">Sede</div>
            <ul>
              <li className="o-footer__txt">Via Oberdan 25</li>
              <li className="o-footer__txt">60020 Agugliano (AN)</li>
              <li className="o-footer__txt">Italia</li>
            </ul>
          </div>
          <div className="o-footer__col">
            <div className="o-footer__col-label">Legale</div>
            <ul>
              <li className="o-footer__txt">P.IVA 02703360426</li>
              <li className="o-footer__txt">CF SRRNCL93T31B963M</li>
              <li>
                <a
                  href="https://nicolaserrao.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="o-footer__link"
                >
                  Privacy &amp; Cookie
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="o-footer__divider" aria-hidden="true" />

        <div className="o-footer__bottom">
          <p>&copy; 2026 Nicola Serrao &mdash; Tutti i diritti riservati</p>
          <p className="o-footer__bottom-fine">
            Pagina riservata. Non indicizzata. Distribuita su invito.
          </p>
        </div>
      </div>
    </footer>
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
    .o-hero__brand {
      margin-bottom: 36px;
    }
    .o-hero__brand-name {
      position: relative;
      display: inline-block;
      font-family: var(--font-playfair), Georgia, serif;
      font-size: clamp(22px, 2.4vw, 30px);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.5px;
      white-space: nowrap;
    }
    .o-hero__brand-name-front {
      position: relative;
      color: #e8f5f2;
      z-index: 2;
    }
    .o-hero__brand-name-accent {
      color: #00fffc;
      font-style: normal;
    }
    .o-hero__brand-name-back {
      position: absolute;
      top: 0;
      left: 0;
      color: #00fffc;
      transform: translate(-2px, 1px);
      opacity: 0.5;
      z-index: 1;
      mix-blend-mode: screen;
      filter: blur(0.2px);
      pointer-events: none;
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

    /* ============ DIVIDER (transizione orizzontale glitch hero → prospect) ============ */

    .o-divider {
      background: #0a0e0d;
      padding: 36px 40px;
    }
    .o-divider__row {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 28px;
    }

    .o-divider__brand {
      display: flex;
      align-items: center;
    }

    /* Brand sinistro — Nicola */
    .o-divider__brand--nicola {
      gap: 12px;
    }
    .o-divider__icon {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
    .o-divider__name {
      position: relative;
      display: inline-block;
      font-family: var(--font-playfair), Georgia, serif;
      font-size: clamp(16px, 1.6vw, 20px);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.3px;
      white-space: nowrap;
    }
    .o-divider__name-front {
      position: relative;
      color: #e8f5f2;
      z-index: 2;
    }
    .o-divider__name-accent {
      color: #00fffc;
      font-style: normal;
    }
    .o-divider__name-back {
      position: absolute;
      top: 0;
      left: 0;
      color: #00fffc;
      transform: translate(-2px, 1px);
      opacity: 0.5;
      z-index: 1;
      mix-blend-mode: screen;
      filter: blur(0.2px);
      pointer-events: none;
    }

    /* Linea centrale animata */
    .o-divider__line {
      flex: 1 1 auto;
      position: relative;
      height: 2px;
      min-width: 80px;
      overflow: hidden;
    }
    .o-divider__line-base {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba(0, 255, 252, 0) 0%,
        rgba(0, 255, 252, 0.45) 18%,
        rgba(212, 170, 65, 0.45) 82%,
        rgba(212, 170, 65, 0) 100%
      );
    }
    /* Scanner luminoso che attraversa */
    .o-divider__line-scan {
      position: absolute;
      top: -2px;
      left: -10%;
      width: 22%;
      height: 6px;
      background: linear-gradient(
        to right,
        transparent,
        rgba(0, 255, 252, 0.95),
        rgba(255, 255, 255, 1),
        rgba(212, 170, 65, 0.95),
        transparent
      );
      filter: blur(1.5px);
      animation: o-scan-cross 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes o-scan-cross {
      0%   { left: -25%; opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { left: 110%; opacity: 0; }
    }
    /* RGB-shift glitch sporadico */
    .o-divider__line-shift {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba(0, 255, 252, 0) 0%,
        rgba(255, 0, 128, 0.6) 50%,
        rgba(0, 255, 252, 0) 100%
      );
      transform: translate(0, 0);
      opacity: 0;
      animation: o-rgb-glitch 7s steps(1, end) infinite;
    }
    @keyframes o-rgb-glitch {
      0%, 91%, 100% { opacity: 0; transform: translate(0, 0); }
      92% { opacity: 0.7; transform: translate(3px, -1px); }
      93% { opacity: 0; transform: translate(0, 0); }
      94% { opacity: 0.5; transform: translate(-3px, 1px); }
      95% { opacity: 0; transform: translate(0, 0); }
    }

    /* Brand destro — prospect (logo originale a colori in pill bianco) */
    .o-divider__brand--prospect {
      justify-self: end;
      background: #ffffff;
      padding: 6px 12px;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(212, 170, 65, 0.35), 0 0 20px rgba(212, 170, 65, 0.15);
    }
    .o-divider__logo-img {
      height: 36px;
      width: auto;
      object-fit: contain;
      display: block;
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
      gap: 24px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: ${s.accent} transparent;
      padding: 4px 4px 24px 4px;
      margin: 0 -4px;
    }
    .o-observations::-webkit-scrollbar {
      height: 6px;
    }
    .o-observations::-webkit-scrollbar-track {
      background: ${s.border};
    }
    .o-observations::-webkit-scrollbar-thumb {
      background: ${s.accent};
      border-radius: 3px;
    }
    .o-obs {
      flex: 0 0 clamp(340px, 42%, 460px);
      min-width: 320px;
      max-width: 480px;
      scroll-snap-align: start;
      border: 1px solid ${s.border};
      background: rgba(0, 0, 0, 0.02);
      padding: 44px 40px;
      display: flex;
      flex-direction: column;
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
      font-size: clamp(22px, 2.4vw, 28px);
      line-height: 1.25;
      letter-spacing: ${s.headingLetterSpacing};
      ${s.headingTransform === "uppercase" ? "text-transform: uppercase;" : ""}
      color: ${s.accent};
      margin: 0 0 24px 0;
    }
    .o-obs__body p {
      font-family: ${s.fontBody};
      font-weight: ${s.bodyWeight};
      font-size: 15.5px;
      line-height: 1.7;
      color: ${s.textSecondary};
      margin: 0 0 16px 0;
    }
    .o-obs__body p:last-child { margin-bottom: 0; }

    /* ============ SEZIONE NICOLA (finale) — stile sito (dark, teal) ============ */

    .o-nicola {
      background: #0a0e0d;
      color: #e8f5f2;
      padding: 100px 40px;
      width: 100%;
      box-sizing: border-box;
    }
    .o-nicola__inner {
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
    }

    /* Sezione emotiva "Conosciamoci" (le 2 domande) */
    .o-nicola__emotional {
      margin-bottom: 80px;
    }
    .o-nicola__emotional-title {
      font-family: var(--font-dm-mono), 'Courier New', monospace;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: #00fffc;
      margin-bottom: 28px;
    }
    .o-nicola__emotional-body p {
      font-family: var(--font-playfair), Georgia, serif;
      font-weight: 700;
      font-size: clamp(22px, 2.6vw, 32px);
      line-height: 1.4;
      letter-spacing: -0.01em;
      color: #e8f5f2;
      margin: 0 0 18px 0;
    }
    .o-nicola__emotional-body p:last-child { margin: 0; }
    .o-nicola__emotional-body p:first-child {
      color: rgba(232, 245, 242, 0.78);
    }

    /* ════════════════════════════════════════
       Box CTA finale — IDENTICA alla home page
       (copia di .hp-cta + .hp-cta-final + .hp-h2 da src/app/(site)/page.tsx)
    ════════════════════════════════════════ */

    .o-nicola .hp-cta {
      border: 1px solid var(--teal-border); border-radius: 10px;
      padding: 56px 48px; background: var(--teal-dim);
      text-align: center; position: relative; overflow: hidden;
    }
    .o-nicola .hp-cta::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,252,0.06), transparent);
      pointer-events: none;
    }
    .o-nicola .hp-cta-final { padding: 64px 56px; }
    .o-nicola .hp-cta-eyebrow {
      font-size: 10px; letter-spacing: 3px;
      text-transform: uppercase; color: var(--teal);
      font-weight: 600; margin-bottom: 18px;
      position: relative;
    }
    .o-nicola .hp-h2 {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(26px, 3.5vw, 42px);
      font-weight: 700;
      line-height: 1.15;
      color: var(--text);
      margin: 0;
    }
    .o-nicola .hp-h2 em { font-style: italic; color: var(--teal); }
    .o-nicola .hp-cta-honest {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(17px, 2vw, 22px);
      line-height: 1.5;
      color: var(--text);
      max-width: 720px;
      margin: 0 auto 32px;
      position: relative;
      padding: 18px 0;
      border-top: 1px solid rgba(0,255,252,0.18);
      border-bottom: 1px solid rgba(0,255,252,0.18);
    }
    .o-nicola .hp-cta-explainer {
      max-width: 720px;
      margin: 0 auto 32px;
      position: relative;
      display: flex; flex-direction: column; gap: 16px;
    }
    .o-nicola .hp-cta-explainer p {
      font-size: 14px;
      color: var(--text);
      line-height: 1.7;
      margin: 0;
    }
    .o-nicola .hp-cta-explainer strong {
      color: var(--teal);
      font-weight: 500;
    }
    .o-nicola .hp-cta-promise {
      max-width: 600px;
      margin: 0 auto 32px;
      padding: 28px 32px;
      border: 1px solid rgba(0,255,252,0.3);
      border-radius: 12px;
      background: rgba(0,255,252,0.05);
      position: relative;
      text-align: left;
    }
    .o-nicola .hp-cta-promise-title {
      font-size: 11px; letter-spacing: 2px;
      text-transform: uppercase; color: var(--teal);
      font-weight: 600; margin-bottom: 16px;
      text-align: center;
    }
    .o-nicola .hp-cta-promise-list {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 12px;
    }
    .o-nicola .hp-cta-promise-list li {
      display: flex; align-items: baseline; gap: 14px;
      padding-left: 22px; position: relative;
    }
    .o-nicola .hp-cta-promise-list li::before {
      content: ""; position: absolute;
      left: 0; top: 8px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--teal);
      box-shadow: 0 0 10px rgba(0,255,252,0.5);
    }
    .o-nicola .hp-cta-promise-key {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--teal);
      line-height: 1.2;
      flex-shrink: 0;
    }
    .o-nicola .hp-cta-promise-val {
      font-size: 14px;
      color: var(--text);
      line-height: 1.4;
    }
    .o-nicola .hp-cta-closing {
      font-family: var(--font-playfair), 'Playfair Display', serif;
      font-size: clamp(18px, 2.2vw, 24px);
      font-weight: 700;
      color: var(--text);
      line-height: 1.4;
      margin: 0 auto 28px;
      max-width: 600px;
      position: relative;
    }

    /* ============ FOOTER ============ */

    .o-footer {
      background: #0a0e0d;
      color: rgba(232, 245, 242, 0.7);
      padding: 48px 40px 28px;
      border-top: 1px solid rgba(0, 255, 252, 0.18);
      font-family: var(--font-dm-mono), 'Courier New', monospace;
    }
    .o-footer__inner {
      max-width: 1100px;
      margin: 0 auto;
    }
    .o-footer__brand {
      display: flex;
      align-items: center;
      gap: 14px;
      justify-content: center;
      margin-bottom: 12px;
    }
    .o-footer__brand-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
    .o-footer__brand-name {
      font-family: var(--font-playfair), Georgia, serif;
      font-size: 18px;
      font-weight: 700;
      color: #e8f5f2;
      letter-spacing: -0.3px;
      line-height: 1;
    }
    .o-footer__brand-accent { color: #00fffc; }
    .o-footer__brand-role {
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(232, 245, 242, 0.4);
      margin-top: 4px;
    }
    .o-footer__divider {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 255, 252, 0.22),
        transparent
      );
      margin: 24px 0;
    }
    .o-footer__cols {
      display: flex;
      justify-content: center;
      gap: 80px;
      flex-wrap: wrap;
    }
    .o-footer__col ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .o-footer__col li { line-height: 1.4; }
    .o-footer__col-label {
      font-size: 8px;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #00fffc;
      margin-bottom: 12px;
    }
    .o-footer__contact {
      font-size: 11px;
      color: rgba(232, 245, 242, 0.6);
      text-decoration: none;
      transition: color 0.2s;
    }
    .o-footer__contact:hover { color: #00fffc; }
    .o-footer__link {
      font-size: 9px;
      color: rgba(232, 245, 242, 0.4);
      text-decoration: none;
      transition: color 0.2s;
    }
    .o-footer__link:hover { color: #00fffc; }
    .o-footer__txt {
      font-size: 10px;
      color: rgba(232, 245, 242, 0.5);
      letter-spacing: 0.04em;
    }
    .o-footer__bottom {
      text-align: center;
      font-size: 9px;
      color: rgba(232, 245, 242, 0.25);
      line-height: 1.8;
      letter-spacing: 0.05em;
    }
    .o-footer__bottom-fine {
      color: rgba(232, 245, 242, 0.15);
      margin-top: 4px;
      font-style: italic;
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
        padding: 28px 24px;
      }
      .o-divider__row {
        gap: 18px;
      }
      .o-divider__logo-img {
        height: 32px;
      }
      .o-divider__brand--prospect {
        padding: 5px 10px;
      }
      .o-prospect {
        padding: 80px 24px;
      }
      .o-observations { gap: 18px; padding-bottom: 18px; }
      .o-obs { padding: 36px 28px; min-width: 290px; flex-basis: 88%; max-width: 420px; }
      .o-nicola { padding: 72px 24px; }
      .o-nicola__emotional { margin-bottom: 56px; }
      .o-nicola .hp-cta-final { padding: 48px 28px; }
      .o-nicola .hp-cta-honest { font-size: 16px; padding: 14px 0; margin-bottom: 24px; }
      .o-nicola .hp-cta-explainer { margin-bottom: 24px; }
      .o-nicola .hp-cta-promise { padding: 22px 22px; margin-bottom: 24px; }
      .o-nicola .hp-cta-promise-list li { flex-direction: column; gap: 2px; align-items: flex-start; }
      .o-nicola .hp-cta-promise-key { font-size: 16px; }
      .o-nicola .hp-cta-promise-val { font-size: 13px; }
      .o-nicola .hp-cta-closing { font-size: 17px; margin-bottom: 22px; }
      .o-footer {
        padding: 40px 24px 24px;
      }
      .o-footer__cols {
        gap: 48px;
      }
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
        padding: 22px 14px;
      }
      .o-divider__row {
        gap: 10px;
      }
      .o-divider__icon {
        width: 22px;
        height: 22px;
      }
      .o-divider__name {
        font-size: 12px;
      }
      .o-divider__brand--nicola { gap: 8px; }
      .o-divider__line { min-width: 30px; height: 1.5px; }
      .o-divider__logo-img { height: 24px; }
      .o-divider__brand--prospect {
        padding: 4px 8px;
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
        font-size: 22px;
        line-height: 1.2;
      }
      .o-obs__body p {
        font-size: 14px;
      }
      .o-obs { padding: 28px 22px; min-width: 270px; flex-basis: 92%; max-width: 360px; }
      .o-obs__title { font-size: 20px; }
      .o-obs__body p { font-size: 14.5px; }
      .o-nicola { padding: 56px 18px; }
      .o-nicola .hp-cta-final { padding: 40px 22px; }
      .o-nicola .hp-cta-honest { font-size: 15px; }
      .o-nicola .hp-cta-promise { padding: 20px 20px; }
      .o-footer {
        padding: 36px 20px 20px;
      }
      .o-footer__cols {
        gap: 32px;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
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
