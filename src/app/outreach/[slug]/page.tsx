import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOutreachConfig, getAllOutreachSlugs } from "@/data/outreach/loader";
import type { OutreachSection } from "@/data/outreach/types";
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

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getOutreachConfig(slug);
  if (!config) notFound();

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

        /* CTA buttons (legacy) */
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

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
