"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Icona from "@/components/Icona";

/* Il footer (copy approvato il 2026-11-04): gli stessi nomi del menu, i contatti scritti
   per intero (su molti telefoni il link mail non si apre), indirizzo e P.IVA come prima. */

function handleCookieReset() {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
  window.location.reload();
}

const STILE = `
.ft{border-top:1px solid var(--line);margin-top:auto}
.ft-in{max-width:1200px;margin:0 auto;padding:44px 24px 36px;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:32px}
.ft .ft-brand{display:flex;align-items:center;gap:10px;color:var(--ink);font-weight:800;font-size:15px;line-height:1.2;text-decoration:none}
.ft-brand small{display:block;font-weight:600;font-size:12px;color:var(--muted)}
.ft-mark{width:34px;height:34px;border-radius:9px;background:var(--chip);box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center}
.ft-riga{margin-top:14px!important;font-size:14px;line-height:1.6;color:var(--muted);max-width:34ch}
.ft h2{font:700 11.5px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin:4px 0 14px}
.ft ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
.ft a,.ft button.lk{font:600 14.5px/1.4 var(--font-manrope),sans-serif;color:var(--ink);text-decoration:none;background:none;border:0;padding:0;cursor:pointer;text-align:left;transition:color .2s}
.ft a:hover,.ft button.lk:hover{color:var(--accent)}
.ft .ct{display:inline-flex;align-items:center;gap:9px}
.ft .ct svg{color:var(--accent);flex-shrink:0}
.ft-legale{border-top:1px solid var(--line)}
.ft-legale div{max-width:1200px;margin:0 auto;padding:18px 24px 26px;display:flex;flex-wrap:wrap;gap:6px 22px;font-size:12.5px;color:var(--muted)}
.ft .ft-legale .lk{font-size:12.5px;font-weight:600;color:var(--muted)}
@media (max-width:860px){.ft-in{grid-template-columns:1fr 1fr}.ft-in > :first-child{grid-column:1/-1}}
@media (max-width:480px){.ft-in{grid-template-columns:1fr;gap:28px}}
`;

export default function Footer() {
  return (
    <footer className="ft">
      <style>{STILE}</style>
      <div className="ft-in">
        <div>
          <Link href="/" className="ft-brand">
            <span className="ft-mark">
              <Image src="/favicon.png" alt="" width={20} height={20} style={{ objectFit: "contain" }} />
            </span>
            <span>
              Nicola Serrao
              <small>Fractional CMO · Agugliano (AN)</small>
            </span>
          </Link>
          <p className="ft-riga">Un direttore marketing nella tua azienda, senza assumerlo.</p>
        </div>

        <nav aria-label="Pagine del sito">
          <h2>Il sito</h2>
          <ul>
            {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Contatti</h2>
          <ul>
            <li>
              <a className="ct" href={`mailto:${SITE.email}`}>
                <Icona n="mail" size={16} stroke={2} />
                {SITE.email}
              </a>
            </li>
            <li>
              <a className="ct" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                <Icona n="message-circle" size={16} stroke={2} />
                WhatsApp +39 338 569 1369
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-legale">
        <div>
          <span>
            {SITE.address.street}, {SITE.address.cap} {SITE.address.city} ({SITE.address.province}) · P.IVA {SITE.piva} · CF {SITE.cf}
          </span>
          <span>© 2026 Nicola Serrao</span>
          <Link href="/privacy-policy" className="lk">
            Privacy e cookie
          </Link>
          <button type="button" onClick={handleCookieReset} className="lk">
            Gestisci i cookie
          </button>
        </div>
      </div>
    </footer>
  );
}
