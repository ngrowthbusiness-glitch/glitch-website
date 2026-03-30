import type { Metadata } from "next";
import { SITE, GLITCH_PHASES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Metodo GLITCH",
  description:
    "Il framework proprietario: Grounding, Loops, Insight, Testing, Calibration, Harvest. Un metodo basato su dati, test e risultati.",
  openGraph: {
    title: "Metodo GLITCH | Nicola Serrao",
    description:
      "Grounding, Loops, Insight, Testing, Calibration, Harvest. Il metodo per far crescere il tuo business.",
    url: `${SITE.url}/metodo-glitch`,
  },
};

export default function MetodoGlitchPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-[60px] py-20 max-md:px-8 max-[480px]:px-5">
      {/* Hero */}
      <section className="text-center mb-20 max-md:mb-14">
        <div className="animate-fade-up text-[9px] tracking-[3px] uppercase text-primary mb-4">
          Framework
        </div>
        <h1 className="animate-fade-up delay-100 font-heading text-[clamp(36px,6vw,64px)] font-bold text-foreground leading-tight mb-6">
          Metodo{" "}
          <span className="text-primary">
            {"GLITCH".split("").map((letter, i) => (
              <span
                key={i}
                className="inline-block animate-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </h1>
        <p className="animate-fade-up delay-400 text-sm text-dimmed max-w-lg mx-auto leading-relaxed">
          Non un processo rigido, ma un sistema adattivo.
          Ogni fase genera dati che alimentano la successiva.
        </p>
      </section>

      {/* Phases */}
      <section className="relative mb-20">
        {/* Vertical connecting line */}
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="flex flex-col gap-8">
          {GLITCH_PHASES.map((phase, i) => (
            <div
              key={phase.letter}
              className="animate-fade-up flex gap-8 items-start max-md:gap-5"
              style={{ animationDelay: `${0.1 * (i + 1)}s` }}
            >
              {/* Letter circle */}
              <div className="relative z-10 w-14 h-14 shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-primary">
                  {phase.letter}
                </span>
              </div>

              {/* Content */}
              <div className="glass glass-hover p-8 flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {phase.name}
                  </h3>
                  <span className="text-[10px] tracking-[2px] uppercase text-dimmed">
                    {phase.subtitle}
                  </span>
                </div>
                <p className="text-xs text-dimmed leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="glass p-10 border-l-[3px] border-l-primary mb-20">
        <p className="font-heading italic text-lg text-dimmed leading-relaxed">
          &ldquo;Il metodo non &egrave; una formula magica. &Egrave; il contrario:
          &egrave; la disciplina di guardare i numeri in faccia e agire di conseguenza.&rdquo;
        </p>
        <p className="text-xs text-faint mt-4 tracking-[1.5px] uppercase">
          &mdash; Nicola Serrao
        </p>
      </section>

      {/* GLITCH Economics CTA */}
      <section className="glass p-10 text-center mb-20">
        <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
          Il metodo in azione
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          Vedi GLITCH Economics
        </h2>
        <p className="text-sm text-dimmed max-w-md mx-auto mb-6 leading-relaxed">
          Il tool che applica il Metodo GLITCH ai tuoi dati economici.
          KPI calculator, stato di salute del progetto, insight automatici.
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
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
          Vuoi applicare il metodo al tuo business?
        </h2>
        <p className="text-sm text-dimmed mb-6">
          Parliamone. 30 minuti, zero fuffa.
        </p>
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
