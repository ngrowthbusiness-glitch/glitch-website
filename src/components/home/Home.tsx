"use client";

import { useRef } from "react";
import Link from "next/link";
import Icona, { type NomeIcona } from "@/components/Icona";
import ContactCTAButton from "@/components/layout/ContactCTAButton";
import useComparse from "@/components/useComparse";
import { DIRECTION } from "@/app/(doc)/chi-fa-cosa/data";
import Rumore from "./Rumore";
import Ora from "./Ora";

/* La home (copy approvato da Nicola il 2026-11-04, varianti A; design: concept 01 «La rotta»).
   Ordine: chi sei e cosa fai, la direzione in breve, la prova, le domande, come si parte.
   I numeri di credibilita' di aprile non ci sono finche' Nicola non li conferma. */

const TESTI = {
  eyebrow: "Fractional CMO",
  titolo: "Un direttore marketing nella tua azienda, senza assumerlo.",
  sotto:
    "Entro come responsabile del marketing per il tempo che serve. Guardo tutto il percorso a partire dai numeri veri, decido con te la cosa che conta adesso, e la faccio succedere.",
  presenza: "Non ti vendo nulla se non ti serve.",
  rigaCta: "Rispondo io, non un modulo.",
};

const TRE: { ico: NomeIcona; b: string; t: string }[] = [
  { ico: "signpost", b: "Decido cosa conta.", t: "Le priorità scritte, in ordine, con il perché di quell'ordine." },
  { ico: "users", b: "Tengo tutti sulla stessa rotta.", t: "Tu, chi lavora con te, l'agenzia, i fornitori: ognuno sa cosa fare, e io controllo che funzioni." },
  { ico: "wrench", b: "Metto le mani dove serve.", t: "Pagine, campagne, mail, tracciamento: quando sono la priorità, le faccio io." },
];

/* i quattro punti della direzione: i titoli della home, la spiegazione di Il metodo */
const DIREZIONE = [
  "Capire dove sei, a partire dai numeri veri",
  "Decidere la cosa che conta adesso",
  "Dire cosa non si fa",
  "Tenere tutti sulla stessa rotta",
].map((t, i) => ({ t, b: DIRECTION.points[i].b }));

const CASI = [
  { slug: "autonoleggio", nome: "Autonoleggio B2B", com: "Stesso messaggio di tutti, stesso risultato.", dec: "Un angolo che nessuno usava." },
  { slug: "balance-nutrition", nome: "Balance Nutrition", com: "Un business sano con la crescita ferma.", dec: "Partire dai conti, prima di spingere sulle campagne." },
  { slug: "lancio-yoga", nome: "Lancio yoga", com: "Zero lista, zero storico.", dec: "Costruire il lancio come un sistema, prima di spendere." },
  { slug: "pneumatici", nome: "Pneumatici B2C", com: "Un marchio di lusso che non si fidava del digitale.", dec: "Semplificare, non complicare." },
];

const DOMANDE = [
  { q: "Sei una persona sola. E se serve qualcosa che non fai?", a: "Dove non arrivo io, scelgo chi lo fa, gli scrivo cosa deve fare e controllo il risultato. La responsabilità resta mia." },
  { q: "Quanto mi devo impegnare?", a: "Nessun vincolo, si va mese per mese. Tre mesi è il tempo che ti suggerisco per vedere se il cambiamento arriva. Se non va ci salutiamo, e resta tutto tuo." },
  { q: "Tutti vendono fumo.", a: "Se dopo aver guardato i numeri penso che non ci sia margine, te lo dico e non partiamo." },
  { q: "Non conosci il mio settore.", a: "Il metodo è lo stesso, l'applicazione cambia: prima i numeri e l'economia dell'azienda, poi il marketing." },
  { q: "Cosa fai il primo mese?", a: "I primi due giorni raccolgo gli accessi e guardo tutto. Poi torno da te con il piano: le priorità in ordine, e niente lasciato scoperto." },
];

const STILE = `
.hm{--e:cubic-bezier(.2,.7,.2,1);--rimbalzo:cubic-bezier(.34,1.56,.64,1);interpolate-size:allow-keywords}
.hm-w{max-width:1200px;margin:0 auto;padding:0 24px}
.hm h1{font:800 clamp(38px,4.7vw,62px)/1.04 var(--font-manrope),sans-serif;letter-spacing:-.035em;color:var(--ink);margin:16px 0 22px;text-wrap:balance}
.hm h2{font:800 clamp(28px,3.4vw,44px)/1.1 var(--font-manrope),sans-serif;letter-spacing:-.025em;color:var(--ink);text-wrap:balance;max-width:22ch}
.hm p{margin:0}
.hm-k{font:700 12px/1.3 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.hm-sec{padding-top:112px}

/* ── testa ── */
.hm-testa{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:48px;align-items:center;padding:48px 0 8px;min-height:calc(100vh - var(--nav-h) - 24px)}
.hm-testa-t > *{animation:hm-su .9s var(--e) both}
.hm-testa-t > :nth-child(2){animation-delay:.07s}
.hm-testa-t > :nth-child(3){animation-delay:.15s}
.hm-testa-t > :nth-child(4){animation-delay:.24s}
.hm-testa-t > :nth-child(5){animation-delay:.32s}
@keyframes hm-su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.hm-sotto{font-size:clamp(17px,1.4vw,19px);line-height:1.6;color:var(--body);max-width:52ch}
.hm-pres{display:flex;align-items:center;gap:12px;margin:26px 0 26px;font-size:14px;color:var(--muted);flex-wrap:wrap}
.hm-pres img{width:40px;height:40px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px var(--bg),0 0 0 3.5px var(--accent)}
.hm-pres b{color:var(--ink);font-weight:700}
.hm-pres .ora{font-variant-numeric:tabular-nums;color:var(--ink);font-weight:600;min-width:5.2em;display:inline-block}
.hm-pres .vivo{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--accent);margin-right:6px;animation:hm-batte 2s ease-in-out infinite}
@keyframes hm-batte{50%{opacity:.35}}
.hm-cta .ccta-wrap{gap:10px}
.hm-cta .ccta-microcopy{font-size:13.5px}

/* il rumore */
.rm{position:relative;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);padding:14px;animation:hm-su .9s var(--e) .2s both}
.rm-seg{position:relative;z-index:3;display:inline-flex;padding:3px;border-radius:12px;background:var(--soft);gap:2px}
.rm-seg button{font:700 13px/1 var(--font-manrope),sans-serif;border:0;background:transparent;color:var(--muted);padding:9px 14px;border-radius:9px;cursor:pointer;transition:background .25s,color .25s,box-shadow .25s}
.rm-seg button[aria-checked="true"]{background:var(--surface);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.rm-campo{position:relative;height:min(62vh,500px);min-height:400px;margin-top:-46px;overflow:hidden;border-radius:16px}
.rm-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.rm-svg path{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset 1.2s var(--e) .55s}
.rm[data-st="ordine"] .rm-svg path{stroke-dashoffset:0}
.rm[data-st="caos"] .rm-svg path{transition-delay:0s;transition-duration:.4s}
.rm-nodo{position:absolute;width:0;opacity:0;transform:translateY(8px);transition:opacity .45s var(--e),transform .55s var(--rimbalzo);transition-delay:calc(var(--i) * 110ms + .35s)}
.rm[data-st="ordine"] .rm-nodo{opacity:1;transform:none}
.rm[data-st="caos"] .rm-nodo{transition-delay:0s}
.rm-nodo b{display:grid;place-items:center;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:var(--accent);color:var(--accent-ink);font:800 14px/1 var(--font-manrope),sans-serif;box-shadow:0 0 0 5px var(--surface)}
.rm-nodo span{display:block;width:120px;margin:9px 0 0 -60px;text-align:center;font:800 13px/1.2 var(--font-manrope),sans-serif;color:var(--ink)}
.rm-voce{position:absolute;left:0;top:0;will-change:transform;transition:transform .95s var(--e),opacity .5s;transition-delay:calc(var(--d) * 1ms)}
.rm[data-pronto="0"] .rm-voce{opacity:0}
.rm[data-vivo="0"] .rm-voce{transition:none}
.rm-voce i{display:block;font:600 13px/1 var(--font-manrope),sans-serif;font-style:normal;white-space:nowrap;color:var(--body);padding:8px 11px;border-radius:999px;background:var(--soft);transition:background .5s,color .5s,box-shadow .5s,opacity .5s;transition-delay:calc(var(--d) * 1ms + .5s)}
.rm[data-st="caos"] .rm-voce i{animation:rm-deriva 5.5s ease-in-out infinite alternate;animation-delay:var(--ph)}
@keyframes rm-deriva{from{transform:translate(-7px,-5px)}to{transform:translate(7px,6px)}}
.rm[data-st="ordine"] .rm-voce[data-a="0"] i,.rm[data-st="ordine"] .rm-voce[data-a="1"] i,.rm[data-st="ordine"] .rm-voce[data-a="2"] i,.rm[data-st="ordine"] .rm-voce[data-a="3"] i{background:var(--accent-soft);color:var(--ink)}
.rm[data-st="ordine"] .rm-voce[data-a="-1"] i{background:transparent;box-shadow:inset 0 0 0 1px var(--line);color:var(--muted)}
.rm-scaffale{position:absolute;left:20px;right:20px;bottom:16px;display:flex;align-items:center;gap:7px;border-top:1.5px dashed var(--line);padding-top:10px;font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);opacity:0;transition:opacity .5s .9s}
.rm[data-st="ordine"] .rm-scaffale{opacity:1}
.rm[data-st="caos"] .rm-scaffale{transition-delay:0s}
.rm-fase{position:absolute;right:20px;top:20px;z-index:3;max-width:46%;text-align:right;font:700 13px/1.35 var(--font-manrope),sans-serif;color:var(--muted);animation:hm-su .5s var(--e) both}

/* ── le tre righe ── */
.hm-tre{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:64px;border-top:1px solid var(--line)}
.hm-tre > div{position:relative;padding:26px 28px 6px 0}
.hm-tre > div + div{padding-left:28px;border-left:1px solid var(--line)}
.hm-tre > div::before{content:"";position:absolute;left:0;right:0;top:-1px;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .9s var(--e);transition-delay:calc(var(--i) * .35s + .2s)}
.hm-tre[data-in] > div::before,.hm:not(.rv-on) .hm-tre > div::before{transform:none}
.hm-tre .ico{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);margin-bottom:16px}
.hm-tre > div:last-child .ico{background:var(--soft);color:var(--muted)}
.hm-tre b{display:block;font:800 19px/1.3 var(--font-manrope),sans-serif;color:var(--ink);margin-bottom:6px}
.hm-tre p{font-size:15.5px;line-height:1.6;color:var(--body)}

/* ── la direzione, in breve ── */
.hm-dir{margin-top:34px;border-top:1px solid var(--line)}
.hm-dir li{position:relative;display:grid;grid-template-columns:72px minmax(0,1.1fr) minmax(0,1fr);gap:24px;align-items:baseline;padding:28px 0;border-bottom:1px solid var(--line);list-style:none}
.hm-dir li::before{content:"";position:absolute;left:0;top:-1px;bottom:-1px;width:3px;background:var(--accent);transform:scaleY(0);transform-origin:top;transition:transform .45s var(--e)}
.hm-dir li:hover::before{transform:none}
.hm-dir .n{font:800 15px/1 var(--font-manrope),sans-serif;color:var(--accent);padding-left:16px;font-variant-numeric:tabular-nums}
.hm-dir h3{font:800 clamp(22px,2.4vw,30px)/1.2 var(--font-manrope),sans-serif;letter-spacing:-.02em;color:var(--ink);margin:0;transition:transform .45s var(--e)}
.hm-dir li:hover h3{transform:translateX(6px)}
.hm-dir p{font-size:15.5px;line-height:1.6;color:var(--body);max-width:52ch}
.hm-dir ol{margin:0;padding:0}
.hm-link{display:inline-flex;align-items:center;gap:8px;margin-top:26px;font:700 15px/1 var(--font-manrope),sans-serif;color:var(--accent);text-decoration:none}
.hm-link svg{transition:transform .3s var(--e)}
.hm-link:hover svg{transform:translateX(4px)}

/* ── la prova: i casi ── */
.hm-casi-t{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:32px;align-items:end}
.hm-casi-t p{font-size:17px;line-height:1.6;color:var(--body);max-width:52ch}
.hm-casi{margin-top:36px;display:flex;flex-direction:column;gap:10px}
.hm-caso{display:grid;grid-template-columns:54px minmax(0,.85fr) minmax(0,1fr) minmax(0,1.15fr) 40px;gap:20px;align-items:center;padding:22px 22px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);text-decoration:none;color:var(--body);transition:box-shadow .3s,transform .35s var(--e)}
.hm-caso:hover{box-shadow:inset 0 0 0 1.5px var(--accent);transform:translateY(-2px)}
.hm-caso .n{font:800 13px/1 var(--font-manrope),sans-serif;color:var(--muted);font-variant-numeric:tabular-nums}
.hm-caso b{font:800 18px/1.25 var(--font-manrope),sans-serif;color:var(--ink)}
.hm-caso .com{font-size:15px;line-height:1.5}
.hm-caso .dec{font-size:15px;line-height:1.5;color:var(--ink);font-weight:600;padding:10px 14px;border-radius:12px;background:var(--accent-soft)}
.hm-caso .dec small{display:block;font:800 10.5px/1.3 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:3px}
.hm-caso .va{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:var(--muted);box-shadow:inset 0 0 0 1px var(--line);transition:color .2s,background .2s,transform .35s var(--e)}
.hm-caso:hover .va{color:var(--accent-ink);background:var(--accent);box-shadow:none;transform:translateX(3px)}

/* ── le domande ── */
.hm-dom{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;align-items:start}
.hm-dom-t{position:sticky;top:calc(var(--nav-h) + 32px)}
.hm-dom-t p{margin-top:14px!important;font-size:16px;line-height:1.6;color:var(--muted);max-width:36ch}
.hm-dom details{border-bottom:1px solid var(--line)}
.hm-dom details:first-child{border-top:1px solid var(--line)}
.hm-dom details::details-content{block-size:0;overflow:hidden;transition:block-size .4s var(--e),content-visibility .4s allow-discrete}
.hm-dom details[open]::details-content{block-size:auto}
.hm-dom summary{list-style:none;cursor:pointer;padding:22px 48px 22px 0;position:relative;font:800 19px/1.35 var(--font-manrope),sans-serif;color:var(--ink);transition:color .2s}
.hm-dom summary::-webkit-details-marker{display:none}
.hm-dom summary:hover{color:var(--accent)}
.hm-dom summary::after{content:"+";position:absolute;right:4px;top:18px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft);color:var(--accent);font-size:18px;transition:transform .35s var(--e),background .2s}
.hm-dom details[open] summary::after{transform:rotate(45deg);background:var(--accent-soft)}
.hm-dom details p{font-size:16.5px;line-height:1.7;color:var(--body);padding:0 48px 24px 0}

/* ── la chiusura ── */
.hm-fine{margin-top:120px;background:var(--accent-soft);padding:88px 0 96px}
.hm-fine .hm-w{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:36px;align-items:center}
.hm-fine img{width:112px;height:112px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 4px var(--accent-soft),0 0 0 6px var(--accent)}
.hm-fine h2{max-width:20ch}
.hm-fine p{margin-top:14px!important;font-size:18px;line-height:1.6;color:var(--ink);max-width:48ch}
.hm-fine .luogo{display:flex;align-items:center;gap:8px;margin-top:18px!important;font-size:14px;color:var(--body)}
.hm-fine .ora{font-variant-numeric:tabular-nums;font-weight:700;color:var(--ink)}
.hm :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}

@media (max-width:1020px){
  .hm-testa{grid-template-columns:1fr;min-height:0;gap:28px;padding-top:28px}
  .rm-campo{height:480px;min-height:0}
  .hm-caso{grid-template-columns:40px minmax(0,1fr) 36px;gap:12px 16px}
  .hm-caso .com{grid-column:2/3}
  .hm-caso .dec{grid-column:2/3}
  .hm-caso .va{grid-row:1;grid-column:3}
  .hm-casi-t,.hm-dom{grid-template-columns:1fr;gap:18px}
  .hm-dom-t{position:static}
  .hm-fine .hm-w{grid-template-columns:auto 1fr}
  .hm-fine .hm-w > :last-child{grid-column:1/-1}
}
@media (max-width:760px){
  .hm-tre{grid-template-columns:1fr}
  .hm-tre > div,.hm-tre > div + div{padding:22px 0 18px;border-left:0}
  .hm-dir li{grid-template-columns:44px 1fr;gap:6px 12px}
  .hm-dir li p{grid-column:2}
  .hm-dir .n{padding-left:10px}
  .rm-voce i{font-size:11px;padding:6px 8px}
  .rm-nodo span{width:76px;margin-left:-38px;font-size:11px}
  .rm-fase{position:static;max-width:none;text-align:left;margin:10px 4px 2px!important}
  .rm-campo{height:540px;margin-top:10px}
  .hm-fine{padding:64px 0 72px}
  .hm-fine .hm-w{grid-template-columns:1fr;gap:20px}
  .hm-fine img{width:84px;height:84px}
  .hm-sec{padding-top:88px}
}
@media (prefers-reduced-motion:reduce){
  .hm *,.rm *{transition:none!important;animation:none!important}
}
`;

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useComparse(root);

  return (
    <div className="hm" ref={root}>
      <style>{STILE}</style>

      <div className="hm-w">
        {/* ══ TESTA: chi sei e cosa fai ══ */}
        <section className="hm-testa">
          <div className="hm-testa-t">
            <span className="hm-k">{TESTI.eyebrow}</span>
            <h1>{TESTI.titolo}</h1>
            <p className="hm-sotto">{TESTI.sotto}</p>
            <div className="hm-pres">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nicola.png" alt="Nicola Serrao" width={40} height={40} />
              <span>
                <b>Agugliano (AN)</b>, Italia · <span className="vivo" aria-hidden="true" />
                <Ora />
              </span>
              <span>{TESTI.presenza}</span>
            </div>
            <div className="hm-cta">
              <ContactCTAButton label="Scrivimi" microcopy={TESTI.rigaCta} buttonClassName="s-btn-primary" />
            </div>
          </div>
          <Rumore />
        </section>

        {/* ══ LE TRE RIGHE ══ */}
        <div className="hm-tre" data-rv>
          {TRE.map((r, i) => (
            <div key={r.b} style={{ "--i": i } as React.CSSProperties}>
              <span className="ico">
                <Icona n={r.ico} size={20} />
              </span>
              <b>{r.b}</b>
              <p>{r.t}</p>
            </div>
          ))}
        </div>

        {/* ══ LA DIREZIONE, IN BREVE ══ */}
        <section className="hm-sec">
          <span className="hm-k" data-rv>
            La direzione
          </span>
          <h2 style={{ marginTop: 12 }} data-rv>
            Il mio lavoro è decidere cosa conta. Poi farlo succedere.
          </h2>
          <ol className="hm-dir">
            {DIREZIONE.map((d, i) => (
              <li key={d.t} data-rv style={{ "--i": i } as React.CSSProperties}>
                <span className="n">0{i + 1}</span>
                <h3>{d.t}</h3>
                <p>{d.b}</p>
              </li>
            ))}
          </ol>
          <Link href="/il-metodo" className="hm-link" data-rv>
            Come lavoro, nel dettaglio
            <Icona n="arrow-right" size={17} stroke={2.2} />
          </Link>
        </section>

        {/* ══ LA PROVA: I CASI ══ */}
        <section className="hm-sec">
          <div className="hm-casi-t">
            <div>
              <span className="hm-k" data-rv>
                Casi
              </span>
              <h2 style={{ marginTop: 12 }} data-rv>
                Quattro aziende, quattro decisioni.
              </h2>
            </div>
            <p data-rv>
              Ogni volta la stessa domanda prima di tutto: dove va l&apos;azienda, e dove vanno i soldi. Poi si decide cosa fare.
            </p>
          </div>
          <div className="hm-casi">
            {CASI.map((c, i) => (
              <Link key={c.slug} href={`/cosa-ho-fatto/${c.slug}`} className="hm-caso" data-rv style={{ "--i": i } as React.CSSProperties}>
                <span className="n">0{i + 1}</span>
                <b>{c.nome}</b>
                <span className="com">{c.com}</span>
                <span className="dec">
                  <small>La decisione</small>
                  {c.dec}
                </span>
                <span className="va" aria-hidden="true">
                  <Icona n="arrow-right" size={16} stroke={2.2} />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/cosa-ho-fatto" className="hm-link" data-rv>
            Tutti i casi
            <Icona n="arrow-right" size={17} stroke={2.2} />
          </Link>
        </section>

        {/* ══ LE DOMANDE ══ */}
        <section className="hm-sec hm-dom">
          <div className="hm-dom-t">
            <span className="hm-k" data-rv>
              Prima di scrivermi
            </span>
            <h2 style={{ marginTop: 12 }} data-rv>
              Quello che probabilmente ti stai chiedendo.
            </h2>
          </div>
          <div>
            {DOMANDE.map((d, i) => (
              <details key={d.q} data-rv style={{ "--i": i } as React.CSSProperties}>
                <summary>{d.q}</summary>
                <p>{d.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* ══ COME SI PARTE ══ */}
      <section className="hm-fine" id="contatti">
        <div className="hm-w">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nicola.png" alt="" width={112} height={112} loading="lazy" data-rv />
          <div data-rv>
            <h2>20 minuti. Ne usciamo con ordine e chiarezza.</h2>
            <p>Mandami un messaggio. Ti dico onestamente se posso aiutarti, o se non ne hai bisogno.</p>
            <p className="luogo">
              <Icona n="map-pin" size={15} stroke={2} />
              Agugliano (AN), Italia · <Ora />
            </p>
          </div>
          <div data-rv>
            <ContactCTAButton label="Scrivimi" microcopy={TESTI.rigaCta} buttonClassName="s-btn-primary" />
          </div>
        </div>
      </section>
    </div>
  );
}
