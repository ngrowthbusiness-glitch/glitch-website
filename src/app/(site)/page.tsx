import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center">
      {/* Hero grid: 1fr auto, gap 80px, padding 80px 60px, max-width 1100px */}
      <div
        className="w-full mx-auto grid items-center max-md:grid-cols-1 max-md:px-8 max-md:py-12 max-md:gap-10 max-md:text-center max-[480px]:px-5 max-[480px]:py-10"
        style={{
          maxWidth: "1100px",
          gridTemplateColumns: "1fr auto",
          gap: "80px",
          padding: "80px 60px",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col max-md:items-center" style={{ gap: "28px" }}>
          {/* Badge: Disponibile */}
          <div
            className="animate-fade-up inline-flex items-center w-fit"
            style={{
              gap: "8px",
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--teal)",
              border: "1px solid var(--teal-border)",
              padding: "6px 12px",
              borderRadius: "5px",
              background: "var(--teal-dim)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--teal)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            Disponibile per nuovi progetti
          </div>

          {/* H1 */}
          <h1
            className="animate-fade-up delay-100 font-heading font-bold leading-none"
            style={{
              fontSize: "clamp(44px, 6vw, 72px)",
              color: "var(--text)",
            }}
          >
            Nicola Serrao
          </h1>

          {/* Subtitle */}
          <div
            className="animate-fade-up delay-200"
            style={{
              fontSize: "clamp(11px, 1.5vw, 14px)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--teal)",
            }}
          >
            Digital Marketing Strategist
          </div>

          {/* Tagline — Playfair italic */}
          <p
            className="animate-fade-up delay-300 font-heading italic leading-relaxed"
            style={{
              fontSize: "clamp(16px, 2vw, 21px)",
              color: "var(--text-dim)",
              maxWidth: "500px",
            }}
          >
            Ogni imprenditore ha bisogno di qualcuno
            <br />
            che gli dica{" "}
            <strong style={{ color: "var(--text)", fontStyle: "normal" }}>
              la verit&agrave;.
            </strong>
          </p>

          {/* Buttons row: gap 14px */}
          <div
            className="animate-fade-up delay-400 flex flex-wrap max-[480px]:flex-col max-[480px]:w-full"
            style={{ gap: "14px" }}
          >
            {/* WhatsApp — green bg */}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center no-underline hover:opacity-85 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center hero-btn-wa"
              style={{
                gap: "10px",
                background: "var(--teal)",
                color: "var(--bg)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "14px 24px",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Scrivimi su WA
            </a>

            {/* Email — outline */}
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center no-underline hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap max-[480px]:justify-center hero-btn-email"
              style={{
                gap: "10px",
                background: "transparent",
                color: "var(--teal)",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "14px 24px",
                borderRadius: "5px",
                border: "1px solid var(--teal-border)",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Inviami una mail
            </a>
          </div>

          {/* Tags row: gap 8px, font-size 9px */}
          <div
            className="animate-fade-up delay-500 flex flex-wrap max-md:justify-center"
            style={{ gap: "8px" }}
          >
            {[
              "Strategia",
              "Digital ADV",
              "E-commerce",
              "CRO",
              "Lead Gen",
              "Metodo GLITCH",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  border: "1px solid var(--text-faint)",
                  padding: "4px 10px",
                  borderRadius: "5px",
                  background: "rgba(232,245,242,0.04)",
                }}
              >
                {tag}
              </span>
            ))}
            <Link
              href="/cosa-posso-fare"
              className="no-underline hover:opacity-70 transition-opacity max-md:w-full max-md:text-center max-md:mt-1"
              style={{
                fontSize: "9px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--teal)",
                padding: "4px 0",
              }}
            >
              Cosa posso fare &rarr;
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Photo + GLITCH badge ── */}
        <div
          className="animate-fade-up delay-200 flex flex-col items-center shrink-0 max-md:order-first max-md:flex-row max-md:justify-center"
          style={{ gap: "20px" }}
        >
          {/* Photo frame: 240px with spinning conic-gradient border */}
          <div
            className="relative shrink-0 max-md:!w-[120px] max-md:!h-[120px]"
            style={{ width: "240px", height: "240px" }}
          >
            {/* Spinning conic-gradient border */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "-3px",
                background:
                  "conic-gradient(var(--teal) 0deg, transparent 120deg, var(--teal) 240deg, transparent 360deg)",
                animation: "spin 6s linear infinite",
                opacity: 0.5,
              }}
            />
            {/* Inner bg ring */}
            <div
              className="absolute rounded-full"
              style={{
                inset: "3px",
                background: "var(--bg)",
                zIndex: 1,
              }}
            />
            {/* Photo */}
            <Image
              src="/images/nicola.png"
              alt="Nicola Serrao"
              width={228}
              height={228}
              priority
              className="absolute rounded-full object-cover object-top"
              style={{
                inset: "6px",
                width: "calc(100% - 12px)",
                height: "calc(100% - 12px)",
                zIndex: 2,
              }}
            />
          </div>

          {/* Metodo GLITCH badge */}
          <Link
            href="/metodo-glitch"
            className="no-underline transition-all duration-200 whitespace-nowrap hero-badge-glitch"
            style={{
              fontSize: "9px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--teal)",
              border: "1px solid var(--teal-border)",
              padding: "6px 18px",
              borderRadius: "5px",
              background: "var(--teal-dim)",
              zIndex: 10,
            }}
          >
            Metodo GLITCH
          </Link>
        </div>
      </div>
    </div>
  );
}
