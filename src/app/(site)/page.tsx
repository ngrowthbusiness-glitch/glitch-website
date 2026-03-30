import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center">
      <div className="w-full max-w-[1100px] mx-auto px-[60px] py-20 grid grid-cols-[1fr_auto] gap-20 items-center max-md:grid-cols-1 max-md:px-8 max-md:py-12 max-md:gap-10 max-md:text-center max-[480px]:px-5 max-[480px]:py-10">
        {/* Left content */}
        <div className="flex flex-col gap-7 max-md:items-center">
          <div className="animate-fade-up inline-flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-primary border border-border px-3 py-1.5 rounded bg-[rgba(0,255,252,0.10)] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            Disponibile per nuovi progetti
          </div>

          <h1 className="animate-fade-up delay-100 font-heading text-[clamp(44px,6vw,72px)] font-bold leading-none text-foreground">
            Nicola Serrao
          </h1>

          <div className="animate-fade-up delay-200 text-[clamp(11px,1.5vw,14px)] tracking-[4px] uppercase text-primary">
            Digital Marketing Strategist
          </div>

          <p className="animate-fade-up delay-300 font-heading italic text-[clamp(16px,2vw,21px)] text-dimmed leading-relaxed max-w-[500px]">
            Ogni imprenditore ha bisogno di qualcuno
            <br />
            che gli dica <strong className="text-foreground not-italic">la verit&agrave;.</strong>
          </p>

          <div className="animate-fade-up delay-400 flex gap-3.5 flex-wrap max-[480px]:flex-col max-[480px]:w-full">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary text-primary-fg text-[10px] font-medium tracking-[2px] uppercase px-6 py-3.5 rounded no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Scrivimi su WA
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2.5 bg-transparent text-primary text-[10px] tracking-[2px] uppercase px-6 py-3.5 rounded border border-border no-underline hover:bg-[rgba(0,255,252,0.10)] hover:border-primary hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Inviami una mail
            </a>
          </div>

          <div className="animate-fade-up delay-500 flex gap-2 flex-wrap max-md:justify-center">
            {["Strategia", "Digital ADV", "E-commerce", "CRO", "Lead Gen", "Metodo GLITCH"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[1.5px] uppercase text-dimmed border border-[rgba(232,240,255,0.15)] px-2.5 py-1 rounded bg-[rgba(232,240,255,0.04)]"
                >
                  {tag}
                </span>
              )
            )}
            <Link
              href="/cosa-posso-fare"
              className="text-[9px] tracking-[1.5px] uppercase text-primary no-underline hover:opacity-70 transition-opacity py-1 max-md:w-full max-md:text-center max-md:mt-1"
            >
              Cosa posso fare &rarr;
            </Link>
          </div>
        </div>

        {/* Right — Photo + GLITCH badge */}
        <div className="animate-fade-up delay-200 flex flex-col items-center gap-5 shrink-0 max-md:order-first max-md:flex-row max-md:justify-center">
          <div className="relative w-60 h-60 shrink-0 max-md:w-30 max-md:h-30">
            {/* Spinning border */}
            <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(var(--primary)_0deg,transparent_120deg,var(--primary)_240deg,transparent_360deg)] animate-spin-slow opacity-50" />
            {/* Inner bg ring */}
            <div className="absolute inset-[3px] rounded-full bg-background z-1" />
            {/* Photo */}
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={228}
              height={228}
              priority
              className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full object-cover object-top z-2"
            />
          </div>
          <Link
            href="/metodo-glitch"
            className="text-[9px] tracking-[2.5px] uppercase text-primary border border-border px-4.5 py-1.5 rounded bg-[rgba(0,255,252,0.10)] no-underline hover:bg-[rgba(0,255,252,0.18)] hover:border-primary transition-all duration-200 whitespace-nowrap z-10"
          >
            Metodo GLITCH
          </Link>
        </div>
      </div>
    </div>
  );
}
