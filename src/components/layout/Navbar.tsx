"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Icona from "@/components/Icona";
import ThemeToggle from "@/components/ThemeToggle";
import ContactCTAButton from "@/components/layout/ContactCTAButton";

/* La barra del sito (Brand Nicola Serrao v2.0): trasparente in cima, poi un velo del fondo
   con una riga sotto. Cinque voci, l'interruttore del tema, un bottone solo: «Scrivimi». */

const STILE = `
.nv{position:fixed;top:0;left:0;right:0;height:var(--nav-h);z-index:100;transition:background .3s,box-shadow .3s}
.nv[data-giu="1"],.nv[data-aperto="1"]{background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--line)}
.nv-in{max-width:1200px;height:100%;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:22px}
.nv-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-weight:800;font-size:15px;line-height:1.15;flex-shrink:0}
.nv-brand small{display:block;font-weight:600;font-size:11.5px;color:var(--muted)}
.nv-mark{width:32px;height:32px;border-radius:9px;background:var(--chip);box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center;transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
.nv-brand:hover .nv-mark{transform:rotate(-8deg)}
.nv-links{display:flex;align-items:center;gap:4px;list-style:none;margin:0 0 0 auto;padding:0}
.nv-links a{position:relative;display:block;padding:9px 12px;border-radius:9px;font-weight:700;font-size:14px;color:var(--muted);text-decoration:none;transition:color .2s,background .2s}
.nv-links a:hover{color:var(--ink);background:var(--soft)}
.nv-links a[aria-current="page"]{color:var(--ink)}
.nv-links a[aria-current="page"]::after{content:"";position:absolute;left:50%;bottom:3px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--accent)}
.nv-dx{display:flex;align-items:center;gap:12px}
.nv-cta{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:var(--accent-ink);font:700 14px/1 var(--font-manrope),sans-serif;padding:11px 16px;border-radius:10px;border:0;cursor:pointer;white-space:nowrap;transition:transform .25s cubic-bezier(.2,.7,.2,1)}
.nv-cta:hover{transform:translateY(-1px)}
.nv-menu{display:none;width:40px;height:40px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--ink);place-items:center;cursor:pointer}
.nv-pan{position:fixed;top:var(--nav-h);left:0;right:0;z-index:99;background:var(--bg);box-shadow:0 1px 0 var(--line),0 24px 40px -24px rgba(0,0,0,.25);padding:12px 24px 24px;animation:nv-giu .28s cubic-bezier(.2,.7,.2,1) both}
@keyframes nv-giu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.nv-pan a{display:flex;align-items:center;justify-content:space-between;padding:15px 2px;border-bottom:1px solid var(--line);font-weight:800;font-size:19px;color:var(--ink);text-decoration:none}
.nv-pan a[aria-current="page"]{color:var(--accent)}
.nv-pan .piede{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px;font-size:14px;color:var(--muted)}
.nv-pan .piede a{display:inline;padding:0;border:0;font-size:14px;font-weight:700;color:var(--accent)}
.nv-torna{position:fixed;bottom:24px;left:24px;z-index:1000;display:flex;align-items:center;gap:10px;padding:10px 12px 10px 16px;background:var(--surface);border-radius:12px;box-shadow:inset 0 0 0 1px var(--line),0 12px 32px -12px rgba(0,0,0,.3);transition:opacity .3s,transform .3s cubic-bezier(.2,.7,.2,1)}
.nv-torna a{font-weight:700;font-size:14px;color:var(--accent);text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.nv-indietro{transform:rotate(180deg)}
.nv-torna button{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;border:0;background:transparent;color:var(--muted);cursor:pointer}
.nv-torna button:hover{color:var(--ink);background:var(--soft)}
@media (max-width:980px){
  .nv-links,.nv-dx .ns-tema{display:none}
  .nv-menu{display:grid}
  .nv-dx{margin-left:auto}
}
@media (max-width:420px){
  .nv-brand small{display:none}
  .nv-cta{padding:10px 13px}
}
@media (prefers-reduced-motion:reduce){.nv-pan{animation:none}}
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [giu, setGiu] = useState(false);
  const [outreach, setOutreach] = useState<{ slug: string; url: string } | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const pathname = usePathname();

  /* la barra prende il fondo appena si scorre */
  useEffect(() => {
    const on = () => setGiu(scrollY > 8);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  /* il menu del telefono si chiude cambiando pagina */
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setMenuOpen(false);
  }, [pathname]);

  /* Chi arriva da una pagina outreach trova il bottone per tornarci */
  useEffect(() => {
    if (pathname.startsWith("/outreach/")) return;
    const active = sessionStorage.getItem("ns_outreach_active");
    const url = sessionStorage.getItem("ns_outreach_url");
    if (active && url) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setOutreach({ slug: active, url });
      const timer = setTimeout(() => setBubbleVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const dismissBubble = () => {
    setBubbleVisible(false);
    setTimeout(() => setOutreach(null), 300);
  };

  const attivo = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <style>{STILE}</style>
      <header className="nv" data-giu={giu ? "1" : "0"} data-aperto={menuOpen ? "1" : "0"}>
        <div className="nv-in">
          <Link href="/" className="nv-brand" aria-label="Nicola Serrao, Fractional CMO: home">
            <span className="nv-mark">
              <Image src="/favicon.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} />
            </span>
            <span>
              Nicola Serrao
              <small>Fractional CMO</small>
            </span>
          </Link>

          <nav aria-label="Menu principale" style={{ marginLeft: "auto" }}>
            <ul className="nv-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={attivo(link.href) ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nv-dx">
            <ThemeToggle />
            <ContactCTAButton label="Scrivimi" microcopy="" buttonClassName="nv-cta" />
            <button
              type="button"
              className="nv-menu"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Chiudi il menu" : "Apri il menu"}
              aria-expanded={menuOpen}
              aria-controls="nv-pan"
            >
              <Icona n={menuOpen ? "x" : "menu"} size={20} stroke={2} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="nv-pan" id="nv-pan">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={attivo(link.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
              {link.label}
              <Icona n="arrow-right" size={18} stroke={2} />
            </Link>
          ))}
          <div className="piede">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* ── Ritorno alla pagina outreach ── */}
      {outreach && (
        <div
          className="nv-torna"
          style={{
            opacity: bubbleVisible ? 1 : 0,
            transform: bubbleVisible ? "none" : "translateY(16px)",
            pointerEvents: bubbleVisible ? "auto" : "none",
          }}
        >
          <Link href={outreach.url}>
            <Icona n="arrow-right" size={15} stroke={2.2} className="nv-indietro" />
            Torna alla tua strategia
          </Link>
          <button onClick={dismissBubble} aria-label="Chiudi">
            <Icona n="x" size={14} stroke={2.2} />
          </button>
        </div>
      )}
    </>
  );
}
