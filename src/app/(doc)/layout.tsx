import Link from "next/link";
import Image from "next/image";
import GlowBackground from "@/components/layout/GlowBackground";
import CookieBanner from "@/components/layout/CookieBanner";
import { SITE } from "@/lib/constants";

/* Layout "documento": niente barra di navigazione, solo il logo.
   Serve alle pagine pensate per essere mandate a un prospect,
   dove ogni link in alto e' una via d'uscita dal documento. */
export default function DocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlowBackground />
      <header
        className="s-wrap"
        style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: "28px" }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/favicon.png"
            alt="Nicola Serrao"
            width={24}
            height={24}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e8f5f2",
            }}
          >
            Nicola{" "}
            <span style={{ color: "var(--teal)" }}>Serrao</span>
          </span>
        </Link>
      </header>
      <main className="relative flex-1">{children}</main>

      {/* Footer minimo: nessun rimando ad altre pagine.
          Resta solo il contatto e la riga legale. */}
      <footer
        className="s-wrap"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "36px 60px 44px",
          borderTop: "1px solid rgba(232,245,242,0.07)",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 28px",
            alignItems: "baseline",
            fontSize: "11px",
            letterSpacing: "1px",
            color: "rgba(232,245,242,0.30)",
            lineHeight: 1.9,
          }}
        >
          <span style={{ color: "rgba(232,245,242,0.55)" }}>
            Nicola Serrao · Fractional CMO
          </span>
          <a
            href={`mailto:${SITE.email}`}
            style={{ color: "var(--teal)", textDecoration: "none", opacity: 0.8 }}
          >
            {SITE.email}
          </a>
          <span>
            {SITE.address.street}, {SITE.address.cap} {SITE.address.city} (
            {SITE.address.province}) · P.IVA {SITE.piva}
          </span>
          <Link
            href="/privacy-policy"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Privacy
          </Link>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}
