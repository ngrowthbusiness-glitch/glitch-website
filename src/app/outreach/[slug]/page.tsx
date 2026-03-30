import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOutreachConfig, getAllOutreachSlugs } from "@/data/outreach/loader";
import type { OutreachConfig, OutreachSection } from "@/data/outreach/types";
import { SITE } from "@/lib/constants";
import OutreachTracker from "./tracker";

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

  return (
    <>
      <OutreachTracker slug={slug} />
      <div
        className="min-h-screen"
        style={{
          "--o-primary": config.palette.primary,
          "--o-primary-dim": config.palette.primaryDim,
          "--o-bg": config.palette.background,
          "--o-text": config.palette.text,
          "--o-text-dim": config.palette.textDim,
          "--o-border": config.palette.border,
        } as React.CSSProperties}
      >
        <div
          className="min-h-screen"
          style={{ background: "var(--o-bg)", color: "var(--o-text)" }}
        >
          {/* Header bar */}
          <header
            className="sticky top-0 z-50 px-[60px] py-4 flex items-center justify-between max-md:px-8 max-[480px]:px-5"
            style={{
              background: isLightBg
                ? "rgba(255,255,255,0.9)"
                : "rgba(10,14,19,0.9)",
              backdropFilter: "blur(12px)",
              borderBottom: `1px solid var(--o-border)`,
            }}
          >
            <div className="flex items-center gap-4">
              {config.logo && (
                <Image
                  src={config.logo}
                  alt={config.companyName}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              )}
              <span
                className="text-[10px] tracking-[2px] uppercase"
                style={{ color: "var(--o-text-dim)" }}
              >
                Proposta per {config.companyName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="NS"
                width={20}
                height={20}
                className="object-contain"
              />
              <span
                className="text-[10px] tracking-[1.5px] uppercase"
                style={{ color: "var(--o-text-dim)" }}
              >
                Nicola Serrao
              </span>
            </div>
          </header>

          {/* Hero */}
          <section className="max-w-[900px] mx-auto px-[60px] pt-20 pb-16 max-md:px-8 max-[480px]:px-5">
            <div
              className="text-[9px] tracking-[3px] uppercase mb-4"
              style={{ color: "var(--o-primary)" }}
            >
              {config.sector}
            </div>
            <h1
              className="font-heading text-[clamp(32px,5vw,48px)] font-bold leading-tight mb-4"
              style={{ color: "var(--o-text)" }}
            >
              {config.heroTitle}
            </h1>
            <p
              className="text-base leading-relaxed mb-3"
              style={{ color: "var(--o-text-dim)" }}
            >
              {config.heroSubtitle}
            </p>
            {config.heroTagline && (
              <p
                className="font-heading italic text-sm"
                style={{ color: "var(--o-text-dim)" }}
              >
                {config.heroTagline}
              </p>
            )}
          </section>

          {/* Dynamic sections */}
          {config.sections.map((section, i) => (
            <SectionRenderer
              key={i}
              section={section}
              isLightBg={isLightBg}
            />
          ))}

          {/* CTA */}
          <section className="max-w-[900px] mx-auto px-[60px] py-20 text-center max-md:px-8 max-[480px]:px-5">
            <h2
              className="font-heading text-3xl font-bold mb-4"
              style={{ color: "var(--o-text)" }}
            >
              {config.cta.title}
            </h2>
            {config.cta.subtitle && (
              <p
                className="text-sm mb-8"
                style={{ color: "var(--o-text-dim)" }}
              >
                {config.cta.subtitle}
              </p>
            )}
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(config.cta.whatsappText || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[10px] font-medium tracking-[2px] uppercase px-6 py-3.5 rounded no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  background: "var(--o-primary)",
                  color: isLightBg ? "#fff" : "var(--o-bg)",
                }}
              >
                Scrivimi su WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(config.cta.emailSubject || "")}`}
                className="inline-flex items-center gap-2.5 text-[10px] tracking-[2px] uppercase px-6 py-3.5 rounded border no-underline hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  color: "var(--o-primary)",
                  borderColor: "var(--o-border)",
                }}
              >
                Inviami una mail
              </a>
            </div>
            {config.cta.showGlitchEconomics && (
              <div className="mt-10">
                <a
                  href={SITE.glitchEconomicsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] tracking-[2px] uppercase no-underline hover:opacity-70 transition-opacity"
                  style={{ color: "var(--o-text-dim)" }}
                >
                  Analizza i tuoi numeri con GLITCH Economics &rarr;
                </a>
              </div>
            )}
          </section>

          {/* Minimal footer */}
          <footer
            className="text-center py-6 text-[10px] tracking-[1px]"
            style={{
              color: "var(--o-text-dim)",
              borderTop: `1px solid var(--o-border)`,
            }}
          >
            <p>
              {SITE.name} &middot; {SITE.title} &middot;{" "}
              <a
                href={SITE.url}
                className="no-underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--o-primary)" }}
              >
                nicolaserrao.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

function SectionRenderer({
  section,
  isLightBg,
}: {
  section: OutreachSection;
  isLightBg: boolean;
}) {
  const cardBg = isLightBg
    ? "rgba(0,0,0,0.03)"
    : "rgba(255,255,255,0.04)";

  return (
    <section className="max-w-[900px] mx-auto px-[60px] py-12 max-md:px-8 max-[480px]:px-5">
      {section.title && (
        <h2
          className="font-heading text-2xl font-bold mb-6"
          style={{ color: "var(--o-text)" }}
        >
          {section.title}
        </h2>
      )}

      {section.content && (
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--o-text-dim)" }}
        >
          {section.content}
        </p>
      )}

      {section.items && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {section.items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border"
              style={{
                background: cardBg,
                borderColor: "var(--o-border)",
              }}
            >
              <h4
                className="font-heading text-base font-bold mb-2"
                style={{ color: "var(--o-text)" }}
              >
                {item.title}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--o-text-dim)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {section.metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {section.metrics.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border text-center"
              style={{
                background: cardBg,
                borderColor: "var(--o-border)",
              }}
            >
              <div
                className="text-lg font-bold"
                style={{ color: "var(--o-primary)" }}
              >
                {m.value}
              </div>
              <div
                className="text-[9px] tracking-[1.5px] uppercase mt-1"
                style={{ color: "var(--o-text-dim)" }}
              >
                {m.label}
              </div>
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
