import type { Metadata } from "next";
import Link from "next/link";
import { SITE, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cosa posso fare",
  description:
    "Strategia, digital marketing, ADV, e-commerce, CRO, lead generation. Scopri come posso aiutare la tua impresa a crescere.",
  openGraph: {
    title: "Cosa posso fare | Nicola Serrao",
    description:
      "Strategia, digital marketing, ADV, e-commerce, CRO, lead generation per imprese italiane.",
    url: `${SITE.url}/cosa-posso-fare`,
  },
};

const ICONS: Record<string, string> = {
  strategy: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  adv: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
  ecommerce: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
  cro: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  leadgen: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  glitch: "M13 10V3L4 14h7v7l9-11h-7z",
};

const STEPS = [
  {
    num: "01",
    title: "Chiacchierata",
    description: "30 minuti, zero impegno. Capisco il tuo business, i tuoi numeri, i tuoi obiettivi.",
  },
  {
    num: "02",
    title: "Analisi",
    description: "Studio i dati, il mercato, i competitor. Ti presento un quadro reale, non ottimistico.",
  },
  {
    num: "03",
    title: "Proposta",
    description: "Una strategia su misura con budget, timeline e KPI chiari. Decidi tu se partire.",
  },
];

export default function CosaPossoFarePage() {
  return (
    <div className="max-w-[1100px] mx-auto px-[60px] py-20 max-md:px-8 max-[480px]:px-5">
      {/* Hero */}
      <section className="text-center mb-20 max-md:mb-14">
        <div className="animate-fade-up text-[9px] tracking-[3px] uppercase text-primary mb-4">
          Servizi
        </div>
        <h1 className="animate-fade-up delay-100 font-heading text-[clamp(32px,5vw,52px)] font-bold text-foreground leading-tight mb-6">
          Prima ti ascolto.<br />
          Poi capiamo insieme cosa ti serve.
        </h1>
        <p className="animate-fade-up delay-200 text-sm text-dimmed max-w-lg mx-auto leading-relaxed">
          Non vendo pacchetti preconfezionati. Ogni impresa ha bisogno di una strategia diversa.
        </p>
      </section>

      {/* Services grid */}
      <section className="grid grid-cols-2 gap-5 mb-20 max-md:grid-cols-1">
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            className="glass glass-hover p-8 animate-fade-up"
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div className="w-10 h-10 rounded-lg bg-[rgba(0,255,252,0.10)] border border-border flex items-center justify-center mb-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={ICONS[service.icon]} />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-xs text-dimmed leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </section>

      {/* Process */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
            Come funziona
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Tre passi, zero fuffa
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {STEPS.map((step) => (
            <div key={step.num} className="glass p-8 text-center">
              <div className="text-3xl font-bold text-primary opacity-30 mb-4">
                {step.num}
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-xs text-dimmed leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="glass p-10 border-l-[3px] border-l-primary mb-20">
        <p className="font-heading italic text-lg text-dimmed leading-relaxed">
          &ldquo;Non ti dir&ograve; quello che vuoi sentirti dire. Ti dir&ograve; quello che ti serve sapere.&rdquo;
        </p>
        <p className="text-xs text-faint mt-4 tracking-[1.5px] uppercase">
          &mdash; Nicola Serrao
        </p>
      </section>

      {/* GLITCH Economics CTA */}
      <section className="glass p-10 text-center mb-20">
        <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
          Strumento gratuito
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          Scopri la salute del tuo progetto
        </h2>
        <p className="text-sm text-dimmed max-w-md mx-auto mb-6 leading-relaxed">
          GLITCH Economics analizza i KPI del tuo business e ti mostra dove stai perdendo margine.
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
          Parliamone?
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
