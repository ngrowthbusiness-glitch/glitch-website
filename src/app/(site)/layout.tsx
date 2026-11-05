import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { SITE } from "@/lib/constants";
import { getPersonSchema, getOrganizationSchema } from "@/lib/structured-data";

/* Il layout del sito (Brand Nicola Serrao v2.0, 2026-11-04). Fissi a schermo: la barra in alto
   e una bolla sola, WhatsApp (decisione dell'alberatura). Via il cursore personalizzato,
   il bagliore di sfondo, la bolla mail, la pillola al centro e la bolla Risorse. */

const STILE = `
.ns-site{--sticky-top:var(--nav-h);display:flex;flex-direction:column;min-height:100vh}
.ns-site [id]{scroll-margin-top:calc(var(--nav-h) + 24px)}
.ns-site > main{position:relative;flex:1;padding-top:var(--nav-h)}
.wa-bolla{position:fixed;right:24px;bottom:24px;z-index:90;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:var(--accent);color:var(--accent-ink);text-decoration:none;box-shadow:0 12px 32px -10px color-mix(in srgb,var(--accent) 60%,transparent);transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.wa-bolla:hover{transform:translateY(-3px) scale(1.04)}
.wa-bolla span{position:absolute;right:66px;white-space:nowrap;font:700 13px/1 var(--font-manrope),sans-serif;padding:9px 12px;border-radius:9px;background:var(--ink);color:var(--bg);opacity:0;transform:translateX(6px);pointer-events:none;transition:opacity .2s,transform .25s cubic-bezier(.2,.7,.2,1)}
.wa-bolla:hover span,.wa-bolla:focus-visible span{opacity:1;transform:none}
@media (max-width:480px){.wa-bolla{width:50px;height:50px;right:16px;bottom:16px}.wa-bolla span{display:none}}
`;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ns-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }} />
      <style>{STILE}</style>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="wa-bolla" aria-label="Scrivimi su WhatsApp">
        <span>Scrivimi su WhatsApp</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  );
}
