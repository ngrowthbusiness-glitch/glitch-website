import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cosa ho fatto",
  description:
    "Case studies e risultati reali. E-commerce +200%, brand luxury B2B, gestione multi-cliente.",
  openGraph: {
    title: "Cosa ho fatto | Nicola Serrao",
    description: "Case studies e risultati reali da progetti di digital marketing.",
    url: `${SITE.url}/cosa-ho-fatto`,
  },
};

const CASES = [
  {
    title: "Balance Nutrition",
    type: "E-commerce",
    result: "+200%",
    resultLabel: "crescita fatturato",
    description:
      "Da zero a brand riconosciuto nel settore integratori. Strategia completa: Shopify, Meta Ads, email marketing, CRO. Risultato: fatturato triplicato in 12 mesi.",
    metrics: [
      { label: "ROAS medio", value: "4.2x" },
      { label: "AOV", value: "+35%" },
      { label: "Repeat rate", value: "42%" },
    ],
  },
  {
    title: "Brand Luxury B2B",
    type: "Avantgrade",
    result: "Premium",
    resultLabel: "posizionamento",
    description:
      "Strategia di posizionamento per brand luxury nel mercato B2B. Lead generation qualificata, content strategy, LinkedIn Ads. Pipeline commerciale strutturata.",
    metrics: [
      { label: "Lead qualificati", value: "+180%" },
      { label: "Costo per lead", value: "-40%" },
      { label: "Conversion rate", value: "8.5%" },
    ],
  },
  {
    title: "Multi-Client Management",
    type: "Agenzia",
    result: "12+",
    resultLabel: "clienti gestiti",
    description:
      "Gestione simultanea di oltre 12 clienti in settori diversi. Dashboard centralizzate, reportistica automatizzata, ottimizzazione continua dei budget.",
    metrics: [
      { label: "Budget gestito", value: "€500K+/anno" },
      { label: "Settori", value: "7 diversi" },
      { label: "Retention", value: "95%" },
    ],
  },
];

const TOOLS = [
  "Shopify", "Meta Ads", "Google Ads", "Klaviyo", "N8N",
  "Notion", "Slack", "Canva", "Brevo", "GA4",
];

export default function CosaHoFattoPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-[60px] py-20 max-md:px-8 max-[480px]:px-5">
      {/* Hero */}
      <section className="text-center mb-20 max-md:mb-14">
        <div className="animate-fade-up text-[9px] tracking-[3px] uppercase text-primary mb-4">
          Portfolio
        </div>
        <h1 className="animate-fade-up delay-100 font-heading text-[clamp(32px,5vw,52px)] font-bold text-foreground leading-tight mb-6">
          Numeri reali.<br />Aziende reali.
        </h1>
        <p className="animate-fade-up delay-200 text-sm text-dimmed max-w-lg mx-auto leading-relaxed">
          Non parlo di vanity metrics. Parlo di fatturato, margini e crescita misurabile.
        </p>
      </section>

      {/* Case Studies */}
      <section className="flex flex-col gap-6 mb-20">
        {CASES.map((c, i) => (
          <div
            key={c.title}
            className="glass glass-hover p-10 animate-fade-up max-md:p-7"
            style={{ animationDelay: `${0.15 * (i + 1)}s` }}
          >
            <div className="flex items-start justify-between gap-8 mb-6 max-md:flex-col max-md:gap-4">
              <div>
                <div className="text-[9px] tracking-[2.5px] uppercase text-primary mb-2">
                  {c.type}
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {c.title}
                </h3>
              </div>
              <div className="text-right max-md:text-left">
                <div className="text-3xl font-bold text-primary">{c.result}</div>
                <div className="text-[10px] text-dimmed tracking-[1.5px] uppercase">
                  {c.resultLabel}
                </div>
              </div>
            </div>
            <p className="text-xs text-dimmed leading-relaxed mb-6">
              {c.description}
            </p>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {c.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-[rgba(0,255,252,0.05)] border border-border rounded-lg p-4 text-center"
                >
                  <div className="text-lg font-bold text-primary">{m.value}</div>
                  <div className="text-[9px] tracking-[1.5px] uppercase text-dimmed mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
            Stack
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Strumenti che uso ogni giorno
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="text-[10px] tracking-[1.5px] uppercase text-dimmed border border-border px-4 py-2 rounded bg-[rgba(0,255,252,0.05)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* GLITCH Economics CTA */}
      <section className="glass p-10 text-center mb-20">
        <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
          Analizza il tuo business
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          Vuoi numeri cos&igrave; anche per te?
        </h2>
        <p className="text-sm text-dimmed max-w-md mx-auto mb-6 leading-relaxed">
          Parti dall&apos;analisi. GLITCH Economics ti mostra dove sei e dove puoi arrivare.
        </p>
        <a
          href={SITE.glitchEconomicsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-primary text-primary-fg text-[10px] font-medium tracking-[2px] uppercase px-6 py-3.5 rounded no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200"
        >
          Prova GLITCH Economics &rarr;
        </a>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Vuoi essere il prossimo caso studio?
        </h2>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-fg text-[10px] font-medium tracking-[2px] uppercase px-6 py-3.5 rounded no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200"
          >
            Scrivimi su WA
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2.5 bg-transparent text-primary text-[10px] tracking-[2px] uppercase px-6 py-3.5 rounded border border-border no-underline hover:bg-[rgba(0,255,252,0.10)] hover:border-primary hover:-translate-y-0.5 transition-all duration-200"
          >
            Inviami una mail
          </a>
        </div>
      </section>
    </div>
  );
}
