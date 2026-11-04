import Link from "next/link";
import Image from "next/image";
import { Manrope } from "next/font/google";
import CookieBanner from "@/components/layout/CookieBanner";
import { SITE } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

/* Layout "documento": niente barra di navigazione, solo il logo.
   Serve alle pagine pensate per essere mandate a un prospect,
   dove ogni link in alto e' una via d'uscita dal documento.
   Dal 2026-11-04 e' il primo pezzo del sito nel Brand Nicola Serrao v2.0:
   Manrope, i token di Basecamp, tema sistema/chiaro/scuro. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const SCRIPT_TEMA = `try{var t=localStorage.getItem("tema");if(t==="chiaro")document.documentElement.dataset.theme="light";else if(t==="scuro")document.documentElement.dataset.theme="dark"}catch(e){}`;

const STILE = `
:root:has(.ns-doc){--bg:#f6f5f0;--surface:#fff;--soft:#eeece4;--line:#d9d6ca;--ink:#0d1413;--body:#2c3836;--muted:#66716e;--accent:#00726f;--accent-soft:#dcefed;--accent-ink:#fff;--chip:#0a0e0d;color-scheme:light}
@media (prefers-color-scheme:dark){:root:has(.ns-doc):not([data-theme="light"]){--bg:#0a0e0d;--surface:#111917;--soft:#0f1614;--line:#243532;--ink:#eef7f5;--body:#c3d3cf;--muted:#8aa19c;--accent:#00fffc;--accent-soft:#0d2a29;--accent-ink:#0a0e0d;color-scheme:dark}}
:root[data-theme="dark"]:has(.ns-doc){--bg:#0a0e0d;--surface:#111917;--soft:#0f1614;--line:#243532;--ink:#eef7f5;--body:#c3d3cf;--muted:#8aa19c;--accent:#00fffc;--accent-soft:#0d2a29;--accent-ink:#0a0e0d;color-scheme:dark}
body:has(.ns-doc){background:var(--bg);color:var(--body)}
.ns-doc{min-height:100vh;background:var(--bg);color:var(--body);font-family:var(--font-manrope),system-ui,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column}
.ns-doc *{font-family:inherit}
.ns-wrap{width:100%;max-width:1200px;margin:0 auto;padding:0 24px}
.ns-top .ns-wrap{display:flex;align-items:center;gap:16px;height:68px}
.ns-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-weight:800;font-size:15px}
.ns-brand small{display:block;font-weight:600;font-size:11.5px;color:var(--muted)}
.ns-mark{width:32px;height:32px;border-radius:9px;background:var(--chip);display:grid;place-items:center}
.ns-tema{margin-left:auto;display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px}
.ns-tema button{font:700 12px/1 var(--font-manrope),sans-serif;border:0;background:transparent;color:var(--muted);padding:7px 11px;border-radius:999px;cursor:pointer}
.ns-tema button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.ns-tema button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ns-foot{margin-top:auto;border-top:1px solid var(--line);padding:28px 0 40px;font-size:13px;color:var(--muted)}
.ns-foot .ns-wrap{display:flex;flex-wrap:wrap;gap:8px 26px;align-items:baseline}
.ns-foot a{color:inherit;text-decoration:none}
.ns-foot a:hover{color:var(--accent)}
.ns-foot b{color:var(--ink);font-weight:700}
@media (max-width:560px){.ns-tema button{padding:7px 8px}}
`;

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ns-doc ${manrope.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
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
