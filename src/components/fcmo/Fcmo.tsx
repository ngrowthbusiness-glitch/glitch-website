"use client";

import { useRef } from "react";
import Link from "next/link";
import Icona, { type NomeIcona } from "@/components/Icona";
import ContactCTAButton from "@/components/layout/ContactCTAButton";
import useComparse from "@/components/useComparse";
import { FCMO } from "./testi";

/* La pagina madre del Fractional CMO (copy approvato il 2026-11-04, varianti A; prezzo deciso da Nicola
   nel ticket 09). Spiega il ruolo in terza persona; in fondo il passaggio a «io lavoro cosi'». */

const COSA_ICO: NomeIcona[] = ["eye", "signpost", "circle-x", "users", "wrench"];

const STILE = `
.fc{--e:cubic-bezier(.2,.7,.2,1);--rimbalzo:cubic-bezier(.34,1.56,.64,1)}
.fc-w{max-width:1200px;margin:0 auto;padding:0 24px}
.fc h1{font:800 clamp(36px,4.6vw,60px)/1.05 var(--font-manrope),sans-serif;letter-spacing:-.035em;color:var(--ink);margin:16px 0 22px;text-wrap:balance}
.fc h2{font:800 clamp(28px,3.2vw,42px)/1.1 var(--font-manrope),sans-serif;letter-spacing:-.025em;color:var(--ink);text-wrap:balance;max-width:24ch;margin:0}
.fc h3{font:800 19px/1.3 var(--font-manrope),sans-serif;letter-spacing:-.01em;color:var(--ink);margin:0}
.fc p{margin:0}
.fc-k{font:700 12px/1.3 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);display:block;margin-bottom:12px}
.fc-sec{padding-top:112px}
.fc :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}
@keyframes fc-su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

/* testa */
.fc-testa{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:56px;align-items:center;padding:72px 0 0}
.fc-testa-t > *{animation:fc-su .9s var(--e) both}
.fc-testa-t > :nth-child(2){animation-delay:.07s}
.fc-testa-t > :nth-child(3){animation-delay:.15s}
.fc-sotto{font-size:clamp(17px,1.4vw,19px);line-height:1.6;color:var(--body);max-width:56ch}
.fc-parola{padding:26px 26px 24px;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);animation:fc-su .9s var(--e) .25s both}
.fc-parola small{display:block;font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:16px}
.fc-term{display:grid;grid-template-columns:auto auto;justify-content:start;gap:0 14px;font:800 clamp(30px,3.2vw,40px)/1 var(--font-manrope),sans-serif;letter-spacing:-.03em;color:var(--ink)}
.fc-term span{position:relative;padding-bottom:14px}
.fc-term span::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;animation:fc-riga .7s var(--e) both}
.fc-term span:first-child::after{animation-delay:.7s}
.fc-term span:last-child::after{animation-delay:.95s;background:var(--ink)}
@keyframes fc-riga{to{transform:none}}
.fc-split{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}
.fc-split > div{position:relative;padding:14px 14px 14px 16px;border-radius:14px;background:var(--soft);animation:fc-su .6s var(--e) both}
.fc-split > div:first-child{animation-delay:1.05s;background:var(--accent-soft)}
.fc-split > div:last-child{animation-delay:1.25s}
.fc-split b{display:block;font:800 11px/1.2 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
.fc-split > div:last-child b{color:var(--ink)}
.fc-split span{font-size:15px;line-height:1.45;color:var(--ink);font-weight:600}
.fc-insieme{margin-top:16px!important;padding-top:14px;border-top:1px dashed var(--line);font-size:15px;line-height:1.55;color:var(--body);animation:fc-su .6s var(--e) 1.45s both}
.fc-insieme b{color:var(--ink)}

/* cosa fa */
.fc-cosa{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:34px}
.fc-cosa > div{display:grid;grid-template-columns:44px 1fr;gap:16px;padding:24px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);transition:box-shadow .3s,transform .35s var(--e)}
.fc-cosa > div:hover{box-shadow:inset 0 0 0 1.5px var(--accent);transform:translateY(-2px)}
.fc-cosa .ico{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent)}
.fc-cosa p{font-size:15.5px;line-height:1.6;color:var(--body);margin-top:6px!important}
.fc-cosa > .mani{grid-column:1/-1;grid-template-columns:44px 1fr auto;align-items:center;background:transparent;box-shadow:inset 0 0 0 1px var(--line);border-style:dashed}
.fc-cosa > .mani .ico{background:var(--soft);color:var(--muted)}
.fc-cosa > .mani p{margin-top:2px!important}
.fc-cosa .mani a{font:700 14px/1 var(--font-manrope),sans-serif;color:var(--accent);text-decoration:none;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.fc-cosa .mani a svg{transition:transform .3s var(--e)}
.fc-cosa .mani a:hover svg{transform:translateX(3px)}

/* quando serve, e quando no */
.fc-quando{display:grid;grid-template-columns:1fr 1fr;margin-top:34px;border-radius:24px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--line)}
.fc-quando > div{padding:28px 30px 30px}
.fc-quando > div:first-child{background:var(--surface)}
.fc-quando > div:last-child{background:var(--soft)}
.fc-quando h3{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.fc-quando h3 svg{color:var(--accent)}
.fc-quando > div:last-child h3 svg{color:var(--muted)}
.fc-quando ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.fc-quando li{display:grid;grid-template-columns:24px 1fr;gap:10px;padding:12px 0;border-top:1px solid var(--line);font-size:16px;line-height:1.5;color:var(--ink)}
.fc-quando li svg{margin-top:2px;color:var(--accent)}
.fc-quando > div:last-child li{color:var(--body)}
.fc-quando > div:last-child li svg{color:var(--muted)}

/* il confronto */
.fc-tab{margin-top:34px;display:grid;grid-template-columns:minmax(0,.8fr) repeat(3,minmax(0,1fr));gap:0 12px}
.fc-tab .th{padding:18px 18px 14px;font:800 16px/1.2 var(--font-manrope),sans-serif;color:var(--ink)}
.fc-tab .th small{display:block;font:700 11px/1.3 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.fc-tab .c{padding:18px;border-top:1px solid var(--line);font-size:15.5px;line-height:1.55;color:var(--body)}
.fc-tab .r{padding:18px 18px 18px 0;border-top:1px solid var(--line);font:800 15.5px/1.35 var(--font-manrope),sans-serif;color:var(--ink)}
.fc-tab .io{background:var(--accent-soft);color:var(--ink);font-weight:600}
.fc-tab .th.io{border-radius:18px 18px 0 0;color:var(--accent)}
.fc-tab .th.io small{color:var(--accent)}
.fc-tab .c.io.ult{border-radius:0 0 18px 18px}
.fc-tab .vuoto{padding:0}

/* quanto costa */
.fc-costo{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:16px;margin-top:34px;align-items:stretch}
.fc-prezzo{padding:32px 30px;border-radius:24px;background:var(--accent);color:var(--accent-ink);display:flex;flex-direction:column;justify-content:space-between;gap:28px}
.fc-prezzo .da{font:700 13px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
.fc-prezzo .cifra{font:800 clamp(32px,3.4vw,44px)/1.08 var(--font-manrope),sans-serif;letter-spacing:-.03em;margin-top:12px;text-wrap:balance}
.fc-prezzo .mese{font:700 17px/1.3 var(--font-manrope),sans-serif;opacity:.9;margin-top:8px}
.fc-prezzo .testo{font-size:15.5px;line-height:1.6;opacity:.92;margin-top:14px!important;max-width:44ch}
.fc-prezzo .segni{list-style:none;margin:0;padding:18px 0 0;border-top:1px solid color-mix(in srgb,var(--accent-ink) 28%,transparent);display:flex;flex-direction:column;gap:11px}
.fc-prezzo .segni li{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:15px;line-height:1.5;font-weight:600}
.fc-prezzo .segni svg{margin-top:2px}
.fc-liste{display:grid;grid-template-rows:auto auto;gap:12px}
.fc-liste > div{padding:22px 24px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
.fc-liste > div:last-child{background:transparent;box-shadow:inset 0 0 0 1px var(--line)}
.fc-liste b{display:block;font:800 12px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
.fc-liste > div:last-child b{color:var(--muted)}
.fc-liste ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px}
.fc-liste li{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:15.5px;line-height:1.5;color:var(--ink)}
.fc-liste li svg{margin-top:2px;color:var(--accent)}
.fc-liste > div:last-child li{color:var(--body)}
.fc-liste > div:last-child li svg{color:var(--muted)}

/* come si comincia */
.fc-passi{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:40px;list-style:none;padding:0}
.fc-passi::before{content:"";position:absolute;left:18px;right:18px;top:18px;height:2px;background:var(--line)}
.fc-passi::after{content:"";position:absolute;left:18px;right:18px;top:18px;height:2px;background:var(--accent);transform-origin:left;transition:transform 1.6s var(--e) .2s}
.rv-on .fc-passi:not([data-in])::after{transform:scaleX(0)}
.fc-passi li{position:relative;z-index:1}
.fc-passi .n{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:var(--surface);box-shadow:inset 0 0 0 2px var(--accent);color:var(--accent);font:800 14px/1 var(--font-manrope),sans-serif;margin-bottom:16px;transition:background .4s,color .4s;transition-delay:calc(var(--i) * .35s + .3s)}
.fc-passi[data-in] .n,.fc:not(.rv-on) .fc-passi .n{background:var(--accent);color:var(--accent-ink)}
.fc-passi p{font-size:16px;line-height:1.55;color:var(--ink);font-weight:600;max-width:26ch}
.fc-inizio-cta{margin-top:36px}

/* le domande, aperte */
.fc-faq{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:34px}
.fc-faq > div{padding:24px 26px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
.fc-faq h3{font-size:18px;margin-bottom:10px}
.fc-faq > div:last-child:nth-child(odd){grid-column:1/-1}
.fc-faq p{font-size:15.5px;line-height:1.65;color:var(--body)}

/* io lavoro cosi' */
.fc-io{margin:112px 0 0;padding:40px;border-radius:28px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:30px;align-items:center}
.fc-io img{width:96px;height:96px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px var(--surface),0 0 0 5px var(--accent)}
.fc-io p{margin-top:10px!important;font-size:17px;line-height:1.6;color:var(--body);max-width:52ch}
.fc-io .az{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}
.fc-io .ccta-wrap{gap:0}
.fc-fondo{height:96px}

@media (max-width:980px){
  .fc-testa{grid-template-columns:1fr;gap:28px;padding-top:40px}
  .fc-tab{grid-template-columns:1fr;gap:0}
  .fc-tab .th,.fc-tab .vuoto{display:none}
  .fc-tab .r{padding:22px 0 10px;border-top:1px solid var(--line)}
  .fc-tab .c{border-top:0;padding:10px 14px;border-radius:12px;margin-bottom:6px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
  .fc-tab .c::before{content:attr(data-chi);display:block;font:800 11px/1.3 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
  .fc-tab .c.io{background:var(--accent-soft);box-shadow:inset 0 0 0 1.5px var(--accent);border-radius:12px}
  .fc-tab .c.io::before{color:var(--accent)}
  .fc-tab .c.io.ult{border-radius:12px}
  .fc-costo{grid-template-columns:1fr}
  .fc-passi{grid-template-columns:1fr 1fr;row-gap:28px}
  .fc-passi::before,.fc-passi::after{display:none}
  .fc-io{grid-template-columns:auto 1fr}
  .fc-io .az{grid-column:1/-1}
}
@media (max-width:680px){
  .fc-cosa,.fc-quando,.fc-faq{grid-template-columns:1fr}
  .fc-cosa > .mani{grid-template-columns:44px 1fr}
  .fc-cosa > .mani a{grid-column:2}
  .fc-split{grid-template-columns:1fr}
  .fc-passi{grid-template-columns:1fr}
  .fc-io{grid-template-columns:1fr;padding:26px}
  .fc-sec{padding-top:88px}
}
@media (prefers-reduced-motion:reduce){.fc *{transition:none!important;animation:none!important}}
`;

const Check = () => <Icona n="check" size={16} stroke={2.6} />;
const Meno = () => <Icona n="x" size={16} stroke={2.4} />;

export default function Fcmo() {
  const root = useRef<HTMLDivElement>(null);
  useComparse(root);

  return (
    <div className="fc" ref={root}>
      <style>{STILE}</style>
      <div className="fc-w">
        {/* ══ L'APERTURA ══ */}
        <section className="fc-testa">
          <div className="fc-testa-t">
            <span className="fc-k">Fractional CMO</span>
            <h1>{FCMO.titolo}</h1>
            <p className="fc-sotto">{FCMO.sotto}</p>
          </div>
          <div className="fc-parola" aria-label="La parola, spiegata">
            <small>La parola, spiegata</small>
            <div className="fc-term" aria-hidden="true">
              <span>Fractional</span>
              <span>CMO</span>
            </div>
            <div className="fc-split">
              <div>
                <b>Fractional</b>
                <span>Una frazione del tempo: quella che serve alla tua azienda.</span>
              </div>
              <div>
                <b>CMO</b>
                <span>Chief Marketing Officer: il direttore marketing.</span>
              </div>
            </div>
            <p className="fc-insieme">
              <b>Insieme:</b> chi decide dove va il marketing della tua azienda e ne risponde, senza essere assunto.
            </p>
          </div>
        </section>

        {/* ══ COSA FA ══ */}
        <section className="fc-sec">
          <span className="fc-k" data-rv>
            Il ruolo
          </span>
          <h2 data-rv>Cosa fa per la tua azienda</h2>
          <div className="fc-cosa">
            {FCMO.cosa.map((c, i) => (
              <div key={c.b} className={i === 4 ? "mani" : undefined} data-rv style={{ "--i": i } as React.CSSProperties}>
                <span className="ico">
                  <Icona n={COSA_ICO[i]} size={20} />
                </span>
                <div>
                  <h3>{c.b}</h3>
                  <p>{c.t}</p>
                </div>
                {i === 4 && (
                  <Link href="/il-metodo#mani">
                    Quali, e come
                    <Icona n="arrow-right" size={15} stroke={2.2} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ══ QUANDO SERVE, E QUANDO NO ══ */}
        <section className="fc-sec">
          <span className="fc-k" data-rv>
            Prima di tutto
          </span>
          <h2 data-rv>Quando serve, e quando no</h2>
          <div className="fc-quando" data-rv>
            <div>
              <h3>
                <Icona n="circle-check" size={20} stroke={2} />
                Serve quando
              </h3>
              <ul>
                {FCMO.serve.map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>
                <Icona n="circle-x" size={20} stroke={2} />
                Non serve quando
              </h3>
              <ul>
                {FCMO.nonServe.map((t) => (
                  <li key={t}>
                    <Meno />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ IL CONFRONTO ══ */}
        <section className="fc-sec">
          <span className="fc-k" data-rv>
            Il confronto
          </span>
          <h2 data-rv>Tre modi di avere il marketing in azienda</h2>
          <div className="fc-tab" role="table" aria-label="Agenzia, Fractional CMO, dipendente" data-rv>
            <div className="vuoto" role="columnheader" />
            {FCMO.colonne.map((c, i) => (
              <div key={c.t} className={`th${i === 1 ? " io" : ""}`} role="columnheader">
                {c.t}
              </div>
            ))}
            {FCMO.righe.map((r, ri) => (
              <div key={r.r} style={{ display: "contents" }} role="row">
                <div className="r" role="rowheader">
                  {r.r}
                </div>
                {r.c.map((v, ci) => (
                  <div
                    key={ci}
                    role="cell"
                    data-chi={FCMO.colonne[ci].t}
                    className={`c${ci === 1 ? " io" : ""}${ci === 1 && ri === FCMO.righe.length - 1 ? " ult" : ""}`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══ QUANTO COSTA ══ */}
        <section className="fc-sec" id="quanto-costa">
          <span className="fc-k" data-rv>
            Il prezzo
          </span>
          <h2 data-rv>Quanto costa</h2>
          <div className="fc-costo">
            <div className="fc-prezzo" data-rv>
              <div>
                <span className="da">Come è fatto il prezzo</span>
                <div className="cifra">{FCMO.prezzoTitolo}</div>
                <p className="testo">{FCMO.costoTesto}</p>
              </div>
              <ul className="segni">
                {FCMO.prezzoSegni.map((t) => (
                  <li key={t}>
                    <Icona n="check" size={16} stroke={2.6} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fc-liste">
              <div data-rv style={{ "--i": 1 } as React.CSSProperties}>
                <b>Cosa è incluso</b>
                <ul>
                  {FCMO.incluso.map((t) => (
                    <li key={t}>
                      <Check />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-rv style={{ "--i": 2 } as React.CSSProperties}>
                <b>Cosa non è incluso</b>
                <ul>
                  {FCMO.escluso.map((t) => (
                    <li key={t}>
                      <Meno />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ COME SI COMINCIA ══ */}
        <section className="fc-sec">
          <span className="fc-k" data-rv>
            L&apos;inizio
          </span>
          <h2 data-rv>Come si comincia</h2>
          <ol className="fc-passi" data-rv>
            {FCMO.passi.map((t, i) => (
              <li key={t} style={{ "--i": i } as React.CSSProperties}>
                <span className="n">{i + 1}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
          <div className="fc-inizio-cta" data-rv>
            <ContactCTAButton label="Scrivimi" microcopy="Rispondo io, non un modulo." buttonClassName="s-btn-primary" />
          </div>
        </section>

        {/* ══ LE DOMANDE ══ */}
        <section className="fc-sec">
          <span className="fc-k" data-rv>
            Domande
          </span>
          <h2 data-rv>Le domande che fanno tutti</h2>
          <div className="fc-faq">
            {FCMO.faq.map((f, i) => (
              <div key={f.q} data-rv style={{ "--i": i } as React.CSSProperties}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ IO LAVORO COSI' ══ */}
        <section className="fc-io" data-rv>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nicola.png" alt="Nicola Serrao" width={96} height={96} loading="lazy" />
          <div>
            <h2>Io lavoro così.</h2>
            <p>{FCMO.ioTesto}</p>
          </div>
          <div className="az">
            <Link href="/il-metodo" className="s-btn-secondary">
              Il metodo
              <Icona n="arrow-right" size={16} stroke={2.2} />
            </Link>
            <ContactCTAButton label="Scrivimi" microcopy="" buttonClassName="s-btn-primary" />
          </div>
        </section>
        <div className="fc-fondo" />
      </div>
    </div>
  );
}
