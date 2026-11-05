import Link from "next/link";
import Image from "next/image";
import CookieBanner from "@/components/layout/CookieBanner";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE } from "@/lib/constants";

/* Layout "documento": niente barra di navigazione, solo il logo.
   Serve alle pagine pensate per essere mandate a un prospect,
   dove ogni link in alto e' una via d'uscita dal documento.
   Token, Manrope e tema vengono dal layout radice e da globals.css. */
const STILE = `
.ns-doc{min-height:100vh;background:var(--bg);color:var(--body);font-size:16px;line-height:1.6;display:flex;flex-direction:column}
.ns-wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 24px}
.ns-top .ns-wrap{display:flex;align-items:center;gap:16px;height:68px}
.ns-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-weight:800;font-size:15px}
.ns-brand small{display:block;font-weight:600;font-size:11.5px;color:var(--muted)}
.ns-mark{width:32px;height:32px;border-radius:9px;background:var(--chip);box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center}
.ns-top .ns-tema{margin-left:auto}
.ns-foot{margin-top:auto;border-top:1px solid var(--line);padding:28px 0 40px;font-size:13px;color:var(--muted)}
.ns-foot .ns-wrap{display:flex;flex-wrap:wrap;gap:8px 26px;align-items:baseline}
.ns-foot a{color:inherit;text-decoration:none}
.ns-foot a:hover{color:var(--accent)}
.ns-foot b{color:var(--ink);font-weight:700}
`;

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ns-doc">
      <style>{STILE}</style>
      <header className="ns-top">
        <div className="ns-wrap">
          <Link href="/" className="ns-brand">
            <span className="ns-mark">
              <Image src="/favicon.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} />
            </span>
            <span>
              Nicola Serrao
              <small>Fractional CMO</small>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer minimo: nessun rimando ad altre pagine.
          Resta solo il contatto, scritto in chiaro, e la riga legale. */}
      <footer className="ns-foot">
        <div className="ns-wrap">
          <b>Nicola Serrao · Fractional CMO · Agugliano (AN)</b>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.whatsapp}>WhatsApp {SITE.phone}</a>
          <span>
            {SITE.address.street}, {SITE.address.cap} {SITE.address.city} ({SITE.address.province}) · P.IVA {SITE.piva}
          </span>
          <Link href="/privacy-policy">Privacy</Link>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}
