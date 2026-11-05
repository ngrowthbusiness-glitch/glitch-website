"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/lib/constants";
import Icona from "@/components/Icona";
import Rotta from "./Rotta";
import Cervello from "./Cervello";
import Mese from "./Mese";
import Mani from "./Mani";
import {
  AREAS,
  BASE_STAGE,
  BRAIN,
  CLOSING,
  DIRECTION,
  EFFORTS,
  FAQ,
  HANDS,
  HERO,
  INDEX,
  LIMIT_VIEW,
  MODES,
  MONTH_INTRO,
  MONTH_NOTE,
  OPENING,
  RHYTHM,
  RHYTHM_LABEL,
  STAGES,
  WHO_LABEL,
  type Area,
  type Effort,
  type Mode,
  type Rhythm,
  type StageId,
} from "./data";

/* ordine di lettura dentro ogni tappa: le cose non mie vanno in fondo */
const STAGE_ORDER: Record<StageId, string[]> = {
  traffico: ["messaggio", "organico", "seo", "ads", "pubblici", "creativita", "social", "produzione"],
  sito: ["pagine", "negozio", "cro", "sviluppo"],
  conversione: ["vendita", "checkout", "economia"],
  relazione: ["email", "newsletter", "ritorno"],
  base: ["misura", "conduzione"],
};

const EFF_BREVE: Record<Effort, string> = {
  operativo: "ci metto le mani io",
  supporto: "lo facciamo in due",
  consulenziale: "decido, scelgo chi lo fa, controllo",
};

/* l'imbuto sopra le quattro tappe: alto a sinistra, stretto a destra */
const IMBUTO = [44, 34, 25, 17, 10];

/* quanto e' pieno ogni cantiere nel disegno del limite (solo forma, nessun dato) */
const TANTI = [0.38, 0.5, 0.3, 0.46, 0.42];

/* etichetta: nel sito la pagina si chiama «Il metodo» (copy approvato), per i prospect «Come lavoro» */
export default function ChiFaCosa({ etichetta = HERO.eyebrow }: { etichetta?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("servizi");
  const [handsOpen, setHandsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [esce, setEsce] = useState(false);
  const [sezione, setSezione] = useState(-1);
  const [railOn, setRailOn] = useState(false);

  const areas = useMemo(() => AREAS.filter((a) => a.modes.includes(mode)), [mode]);
  const open: Area | undefined = useMemo(() => (openId ? AREAS.find((a) => a.id === openId) : undefined), [openId]);
  const ops = useMemo(() => (open ? open.ops.filter((o) => !o.mode || o.mode === mode) : []), [open, mode]);

  const byStage = (id: StageId) => {
    const ord = STAGE_ORDER[id];
    return areas.filter((a) => a.stage === id && ord.includes(a.id)).sort((a, b) => ord.indexOf(a.id) - ord.indexOf(b.id));
  };

  function close() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpenId(null);
      setAnchor(null);
      return;
    }
    setEsce(true);
    window.setTimeout(() => {
      setOpenId(null);
      setAnchor(null);
      setEsce(false);
    }, 170);
  }
  function openArea(id: string, el: HTMLElement) {
    const target = AREAS.find((a) => a.id === id);
    if (target && !target.modes.includes(mode)) setMode(target.modes[0]);
    setAnchor(el.getBoundingClientRect());
    setEsce(false);
    setOpenId(id);
  }

  /* Il link mandato a un prospect puo' aprire gia' sulla mappa giusta:
     /chi-fa-cosa?tipo=ecommerce (e ?aree=1 per trovarla gia' aperta).
     Letto una volta dopo l'idratazione, cosi' la pagina resta statica. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get("tipo");
    /* eslint-disable react-hooks/set-state-in-effect */
    if (t && MODES.some((m) => m.id === t)) setMode(t as Mode);
    if (q.get("aree") === "1") setHandsOpen(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* Le comparse: titoli e blocchi salgono quando entrano in vista, una volta.
     Si armano solo con JavaScript e senza movimento ridotto: senza, la pagina e' gia' tutta li'. */
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.rvOn = "1";
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = "1";
          obs.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    el.querySelectorAll("[data-rv]").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  /* L'indice a margine: compare dopo la testa della pagina, sparisce sulla chiusura,
     e segna la sezione che si sta leggendo. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let testa = true,
      fine = false;
    const bordo = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if ((e.target as HTMLElement).dataset.bordo === "testa") testa = e.isIntersecting;
        else fine = e.isIntersecting;
      });
      setRailOn(!testa && !fine);
    });
    el.querySelectorAll("[data-bordo]").forEach((n) => bordo.observe(n));
    const sez = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setSezione(INDEX.findIndex((x) => x.id === e.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    INDEX.forEach((x) => {
      const s = document.getElementById(x.id);
      if (s) sez.observe(s);
    });
    return () => {
      bordo.disconnect();
      sez.disconnect();
    };
  }, []);

  /* Esc per chiudere, e niente scroll sotto la modale */
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  /* La scheda si apre di fianco all'elemento cliccato, mai sopra, e arriva da quel lato */
  const popStyle = useMemo((): React.CSSProperties => {
    if (!anchor) return {};
    const vw = window.innerWidth;
    if (vw <= 860) return { left: 12, right: 12, bottom: 12, top: "auto", maxHeight: "74vh", "--da": "0, 24px" } as React.CSSProperties;
    const w = Math.min(520, Math.round(vw * 0.44));
    const toTheRight = anchor.left + anchor.width / 2 < vw / 2;
    const left = toTheRight ? Math.min(anchor.right + 24, vw - w - 24) : Math.max(24, anchor.left - 24 - w);
    return { left, width: w, top: "50%", translate: "0 -50%", maxHeight: "80vh", "--da": toTheRight ? "-16px, 0" : "16px, 0" } as React.CSSProperties;
  }, [anchor]);

  const effortOf = (id: Effort) => EFFORTS.find((e) => e.id === id)!;
  const stageLabel = (id: StageId) => (id === "base" ? BASE_STAGE.label : STAGES.find((s) => s.id === id)?.label);

  const Pill = ({ a, big, i = 0 }: { a: Area; big?: boolean; i?: number }) => (
    <button
      type="button"
      className={big ? "cf-pilastro" : "cf-pill"}
      data-on={openId === a.id ? "1" : "0"}
      data-eff={a.effort}
      aria-haspopup="dialog"
      style={{ "--i": i } as React.CSSProperties}
      onClick={(ev) => openArea(a.id, ev.currentTarget)}
    >
      <span className="cf-dot" data-eff={a.effort} aria-hidden="true" />
      <span className="cf-pill-t">{big ? a.title : a.short}</span>
      {big && <span className="cf-pill-c">{a.claim}</span>}
      <span className="cf-piu" aria-hidden="true">
        <Icona n="plus" size={12} stroke={2.4} />
      </span>
    </button>
  );

  return (
    <div className="cf" ref={root}>
      <style>{`
        /* ══ CHI FA COSA · LA ROTTA · Brand Nicola Serrao v2.0 ══
           I token vengono dal layout documento (Manrope, chiaro e scuro). */
        .cf{--max:1200px;--e:cubic-bezier(.2,.7,.2,1);--rimbalzo:cubic-bezier(.34,1.56,.64,1);interpolate-size:allow-keywords}
        :root:has(.cf){scroll-behavior:smooth}
        .cf [id]{scroll-margin-top:calc(var(--sticky-top,0px) + 28px)}
        .cf-wrap{max-width:var(--max);margin:0 auto;padding:0 24px}
        .cf-kicker{font:700 12px/1.3 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
        .cf h1{font:800 clamp(40px,6vw,78px)/1.02 var(--font-manrope),sans-serif;letter-spacing:-.035em;color:var(--ink);margin:16px 0 22px;text-wrap:balance;max-width:14ch}
        .cf h1 em{font-style:normal;color:var(--accent)}
        .cf h2{font:800 clamp(28px,3.4vw,44px)/1.1 var(--font-manrope),sans-serif;letter-spacing:-.025em;color:var(--ink);text-wrap:balance;max-width:24ch;margin:0}
        .cf h3{font:800 20px/1.25 var(--font-manrope),sans-serif;letter-spacing:-.015em;color:var(--ink);margin:0}
        .cf p{margin:0}
        .cf-lead{font-size:clamp(17px,1.5vw,19.5px);line-height:1.6;max-width:56ch;color:var(--body)}
        .cf-sec{padding:104px 0 0}
        .cf-sec-l{display:flex;align-items:center;gap:12px;margin-bottom:14px;font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
        .cf-sec-l b{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--accent);color:var(--accent-ink);letter-spacing:0;font-size:12px}
        .cf-sec-l::after{content:"";flex:1;height:1px;background:var(--line)}
        .cf-btn{display:inline-flex;align-items:center;gap:9px;background:var(--accent);color:var(--accent-ink);font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 20px;border-radius:10px;text-decoration:none;border:0;cursor:pointer;transition:transform .25s var(--e)}
        .cf-btn:hover{transform:translateY(-2px)}
        .cf-btn .va{transition:transform .25s var(--e)}
        .cf-btn:hover .va{transform:translateX(3px)}
        .cf-btn2{display:inline-flex;align-items:center;gap:9px;background:var(--surface);color:var(--ink);font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 18px;border-radius:10px;text-decoration:none;border:1px solid var(--line);cursor:pointer;transition:border-color .2s,color .2s}
        .cf-btn2:hover{border-color:var(--accent);color:var(--accent)}
        .cf :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}

        /* ── comparse ── */
        @keyframes cf-su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .cf[data-rv-on] [data-rv]{opacity:0;transform:translateY(18px);transition:opacity .8s var(--e),transform .8s var(--e);transition-delay:calc(var(--i,0) * 90ms)}
        .cf[data-rv-on] [data-rv][data-in]{opacity:1;transform:none}
        .cf[data-rv-on] .cf-sec-l[data-rv]{opacity:1;transform:none}
        .cf[data-rv-on] .cf-sec-l[data-rv] b{transform:scale(.3);opacity:0;transition:transform .6s var(--rimbalzo),opacity .3s}
        .cf[data-rv-on] .cf-sec-l[data-rv] span{opacity:0;transform:translateX(-8px);transition:opacity .5s .1s,transform .6s var(--e) .1s}
        .cf[data-rv-on] .cf-sec-l[data-rv]::after{transform:scaleX(0);transform-origin:left;transition:transform 1.2s var(--e) .2s}
        .cf[data-rv-on] .cf-sec-l[data-in] b,.cf[data-rv-on] .cf-sec-l[data-in] span{opacity:1;transform:none}
        .cf[data-rv-on] .cf-sec-l[data-in]::after{transform:none}

        /* ── testa e indice ── */
        .cf-hero{padding:56px 0 24px;display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,.75fr);gap:56px;align-items:end}
        .cf-hero-t > *{animation:cf-su .9s var(--e) both}
        .cf-hero-t > :nth-child(2){animation-delay:.08s}
        .cf-hero-t > :nth-child(3){animation-delay:.18s}
        .cf-indice{padding:18px 20px 8px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);animation:cf-su .9s var(--e) .32s both}
        .cf-indice small{display:block;font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
        .cf-indice ol{list-style:none;margin:0;padding:0}
        .cf-indice a{display:grid;grid-template-columns:26px 1fr 16px;gap:12px;align-items:center;padding:11px 0;border-top:1px solid var(--line);text-decoration:none;color:var(--ink)}
        .cf-indice li:first-child a{border-top:0}
        .cf-indice b{display:block;font:800 15px/1.25 var(--font-manrope),sans-serif;transition:color .2s}
        .cf-indice .d{display:block;font-size:13px;line-height:1.4;color:var(--muted);margin-top:2px}
        .cf-indice .va{color:var(--muted);transition:transform .25s var(--e),color .2s}
        .cf-indice a:hover b,.cf-indice a:hover .va{color:var(--accent)}
        .cf-indice a:hover .va{transform:translateX(3px)}
        .cf-num{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font:800 11.5px/1 var(--font-manrope),sans-serif;background:var(--accent);color:var(--accent-ink)}
        .cf-num[data-n="0"]{background:transparent;box-shadow:inset 0 0 0 1.5px var(--line)}
        .cf-num[data-n="0"]::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--muted)}

        .cf-rail{position:fixed;left:max(16px,calc((100vw - 1200px) / 2 - 122px));top:50%;z-index:20;display:none;opacity:0;transform:translate(-10px,-50%);pointer-events:none;transition:opacity .45s var(--e),transform .45s var(--e)}
        @media (min-width:1400px){.cf-rail{display:block}}
        .cf-rail[data-on="1"]{opacity:1;transform:translate(0,-50%);pointer-events:auto}
        .cf-rail ol{list-style:none;margin:0;padding:0;position:relative;display:flex;flex-direction:column;gap:16px}
        .cf-rail ol::before,.cf-rail .riempi{content:"";position:absolute;left:8px;top:9px;bottom:9px;width:1.5px;background:var(--line)}
        .cf-rail .riempi{z-index:1}
        .cf-rail li{position:relative;z-index:2}
        .cf-rail .riempi{background:var(--accent);transform-origin:top;transition:transform .6s var(--e)}
        .cf-rail a{position:relative;display:flex;align-items:center;gap:10px;font:700 11.5px/1.2 var(--font-manrope),sans-serif;color:var(--muted);text-decoration:none;transition:color .3s}
        .cf-rail a:hover{color:var(--ink)}
        .cf-rail .pt{width:18px;height:18px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;background:var(--bg);box-shadow:inset 0 0 0 1.5px var(--line);font:800 9.5px/1 var(--font-manrope),sans-serif;color:var(--muted);transition:background .3s,color .3s,box-shadow .3s,transform .3s var(--rimbalzo)}
        .cf-rail a[data-fatto="1"] .pt{box-shadow:inset 0 0 0 1.5px var(--accent);color:var(--accent)}
        .cf-rail a[data-on="1"]{color:var(--ink)}
        .cf-rail a[data-on="1"] .pt{background:var(--accent);color:var(--accent-ink);box-shadow:none;transform:scale(1.15)}

        /* ── la rotta ── */
        .rt-scena{height:300vh;position:relative;margin-top:8px}
        .rt-palco{position:sticky;top:var(--sticky-top,0px);height:calc(100vh - var(--sticky-top,0px));display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:36px;align-items:center;padding:24px 0}
        .rt-barre{display:flex;gap:6px;margin-bottom:16px;max-width:240px}
        .rt-barre span{flex:1;height:4px;border-radius:2px;background:var(--line);overflow:hidden}
        .rt-barre i{display:block;height:100%;background:var(--accent);transform-origin:left;transform:scaleX(0)}
        .rt-fase{font:800 clamp(20px,2vw,26px)/1.25 var(--font-manrope),sans-serif;letter-spacing:-.015em;color:var(--ink);margin-bottom:22px!important;min-height:2.5em;animation:cf-su .55s var(--e) both}
        .rt-punti{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
        .rt-punti li{display:grid;grid-template-columns:34px 1fr;gap:14px;padding:14px 16px;border-radius:14px;transition:background .45s,opacity .45s,transform .45s var(--e),box-shadow .45s;opacity:.42}
        .rt-punti li[data-on="1"]{opacity:1;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);transform:translateX(4px)}
        .rt-n{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:800 13px/1 var(--font-manrope),sans-serif;background:var(--soft);color:var(--muted);transition:background .35s,color .35s,transform .45s var(--rimbalzo)}
        .rt-punti li[data-on="1"] .rt-n{background:var(--accent);color:var(--accent-ink);transform:scale(1.06)}
        .rt-punti b{display:block;font:800 17px/1.3 var(--font-manrope),sans-serif;color:var(--ink);margin-bottom:3px}
        .rt-punti p{font-size:14.5px;line-height:1.55}
        .rt-campo{position:relative;height:min(76vh,640px);border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
        .rt-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
        .rt-svg path{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round}
        .rt-testa{fill:var(--accent);opacity:0;transition:opacity .2s;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--accent) 45%,transparent))}
        .rt-voce{position:absolute;left:0;top:0;white-space:nowrap;font:600 13.5px/1 var(--font-manrope),sans-serif;color:var(--body);padding:8px 12px;border-radius:999px;background:var(--soft);will-change:transform,opacity;transition:background .4s,color .4s,box-shadow .4s}
        .rt-voce::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 1.5px var(--accent);opacity:0}
        .rt-voce[data-ok="1"]{background:var(--accent-soft);color:var(--ink)}
        .rt-voce[data-ok="1"]::after{animation:rt-posa .6s var(--e)}
        @keyframes rt-posa{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.35)}}
        .rt-voce[data-wait="1"]{background:transparent;box-shadow:inset 0 0 0 1px var(--line);color:var(--muted)}
        .rt-nodo{position:absolute;left:0;top:0;width:0;opacity:0;will-change:transform,opacity}
        .rt-nodo b{display:grid;place-items:center;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:var(--accent);color:var(--accent-ink);font:800 14px/1 var(--font-manrope),sans-serif;box-shadow:0 0 0 5px var(--surface)}
        .rt-nodo span{display:block;width:140px;margin:10px 0 0 -70px;text-align:center;font:800 14px/1.2 var(--font-manrope),sans-serif;color:var(--ink)}
        .rt-scaffale{position:absolute;left:24px;right:24px;bottom:18px;display:flex;align-items:center;gap:7px;border-top:1.5px dashed var(--line);padding-top:10px;font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);opacity:0}

        /* ── il limite, disegnato ── */
        .cf-limite{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:32px;align-items:center;padding:24px 26px;border-radius:18px;background:var(--accent-soft);margin-top:8px}
        .cf-limite .lm-t b{display:block;font:700 11px/1.6 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:6px}
        .cf-limite .lm-t p{color:var(--ink);font-size:16px;line-height:1.65;max-width:62ch}
        .lm-vista{display:flex;flex-direction:column;gap:16px}
        .lm-et{display:flex;justify-content:space-between;gap:10px;font:800 13px/1.2 var(--font-manrope),sans-serif;color:var(--ink);margin-bottom:7px}
        .lm-et em{font-style:normal;font-weight:600;color:var(--muted);text-align:right}
        .lm-barre{display:flex;gap:6px}
        .lm-barre span{position:relative;flex:1;height:10px;border-radius:5px;background:color-mix(in srgb,var(--surface) 75%,transparent);overflow:hidden}
        .lm-barre i{position:absolute;inset:0;border-radius:inherit;background:var(--muted);opacity:.55;transform-origin:left;transform:scaleX(var(--v));transition:transform 1.3s var(--e);transition-delay:calc(var(--i) * 90ms + .25s)}
        .lm-ok .lm-barre i{background:var(--accent);opacity:1;transition-duration:1.1s}
        .lm-ok .lm-et em{display:inline-flex;align-items:center;gap:5px;color:var(--accent)}
        .lm-ok .lm-et em svg{transition:transform .45s var(--rimbalzo) 1.3s,opacity .3s 1.3s}
        .cf[data-rv-on] .cf-limite:not([data-in]) .lm-barre i{transform:scaleX(0)}
        .cf[data-rv-on] .cf-limite:not([data-in]) .lm-ok .lm-et em svg{transform:scale(0);opacity:0}

        /* ── il cervello e io ── */
        .cv{margin-top:34px}
        .cv-scena{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 128px minmax(0,1fr);padding:18px 18px 62px;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
        .cv-pan{position:relative;z-index:1;border-radius:16px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line);padding:14px 16px 16px;min-height:312px}
        .cv-head{display:flex;align-items:center;gap:8px;color:var(--muted);font:700 11.5px/1 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid var(--line)}
        .cv-head b{color:var(--ink);font-weight:800}
        .cv-live,.cv-agg{margin-left:auto;display:inline-flex;align-items:center;gap:6px;text-transform:none;letter-spacing:0;font-weight:700;font-size:12px;transition:color .3s,opacity .4s}
        .cv-live i{width:7px;height:7px;border-radius:50%;background:var(--muted)}
        .cv-live[data-on="1"]{color:var(--accent)}
        .cv-live[data-on="1"] i{background:var(--accent);animation:cv-batte 1.1s ease-in-out infinite}
        @keyframes cv-batte{50%{opacity:.3;transform:scale(.6)}}
        .cv-agg{opacity:0;color:var(--accent)}
        .cv-agg[data-on="1"]{opacity:1}
        .cv-onda{display:flex;align-items:center;justify-content:space-between;height:30px;margin:12px 0 10px}
        .cv-onda i{width:3px;height:100%;border-radius:2px;background:var(--line);transform:scaleY(.14);transition:transform .6s var(--e),background .4s}
        .cv-onda[data-on="1"] i{background:var(--accent);animation:cv-onda .8s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -47ms)}
        @keyframes cv-onda{from{transform:scaleY(calc(var(--h) * .22))}to{transform:scaleY(var(--h))}}
        .cv-righe{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}
        .cv-righe li{display:grid;grid-template-columns:30px 1fr;gap:10px;opacity:0;transform:translateY(8px);transition:opacity .55s var(--e),transform .55s var(--e)}
        .cv-righe li[data-on="1"]{opacity:1;transform:none}
        .cv-righe .chi{font:800 10.5px/1 var(--font-manrope),sans-serif;height:22px;border-radius:6px;display:grid;place-items:center;background:var(--soft);color:var(--muted);margin-top:1px}
        .cv-righe .chi[data-io="1"]{background:var(--accent-soft);color:var(--accent)}
        .cv-righe p{font-size:14.5px;line-height:1.55;color:var(--body)}
        .cv[data-s]:not([data-s="0"]) .cv-righe li[data-segno="0"][data-on="1"]{opacity:.62}
        .cv mark{color:inherit;border-radius:3px;padding:0 2px;margin:0 -2px;-webkit-box-decoration-break:clone;box-decoration-break:clone;background:linear-gradient(var(--accent-soft),var(--accent-soft)) no-repeat 0 0/0% 100%,linear-gradient(var(--accent),var(--accent)) no-repeat 0 100%/0% 2px;transition:background-size .8s var(--e),color .4s}
        .cv mark[data-on="1"]{color:var(--ink);font-weight:700;background-size:100% 100%,100% 2px}
        .cv-ponte{position:relative}
        .cv-ponte > svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
        .cv-ponte path{fill:none;stroke-width:1.5}
        .cv-ponte .base{stroke:var(--line)}
        .cv-ponte .flusso{stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:16 100;stroke-dashoffset:16;opacity:0}
        .cv-ponte .flusso[data-go="1"]{animation:cv-flusso 1.05s var(--e) both}
        @keyframes cv-flusso{0%{stroke-dashoffset:16;opacity:1}80%{opacity:1}100%{stroke-dashoffset:-100;opacity:0}}
        .cv-nodo{position:absolute;left:50%;top:50%;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;display:grid;place-items:center;background:var(--surface);color:var(--muted);box-shadow:inset 0 0 0 1.5px var(--line);transition:color .4s,box-shadow .4s,transform .6s var(--e);z-index:2}
        .cv-nodo[data-on="1"]{color:var(--accent);box-shadow:inset 0 0 0 2px var(--accent);transform:scale(1.08)}
        .cv-nodo[data-fine="1"]{color:var(--accent);box-shadow:inset 0 0 0 1.5px var(--accent)}
        .cv-nodo .anello{position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 1.5px var(--accent);opacity:0;pointer-events:none}
        .cv-nodo[data-on="1"] .anello{animation:cv-anello 1.8s var(--e) infinite}
        .cv-nodo[data-on="1"] .anello.b{animation-delay:.9s}
        @keyframes cv-anello{0%{opacity:.5;transform:scale(1)}100%{opacity:0;transform:scale(1.9)}}
        .cv-uscite{list-style:none;margin:14px 0 0;padding:0;display:flex;flex-direction:column;gap:9px}
        .cv-uscite li{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"tipo timbro" "corpo corpo";gap:9px 10px;padding:11px 13px 12px;border-radius:12px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);transition:box-shadow .45s,background .45s}
        .cv-uscite li > *{transition:opacity .4s}
        .cv-uscite li[data-st="vuoto"]{background:transparent;box-shadow:none;outline:1.5px dashed var(--line);outline-offset:-1.5px}
        .cv-uscite li[data-st="vuoto"] > *{opacity:0}
        .cv-uscite li[data-st="scheletro"]{animation:cv-arriva .55s var(--e) both}
        @keyframes cv-arriva{from{opacity:.2;transform:translateX(-14px)}to{opacity:1;transform:none}}
        .cv-uscite li[data-k="adesso"]{box-shadow:inset 0 0 0 1.5px var(--accent)}
        .cv-uscite li[data-k="aspetta"]{background:transparent}
        .cv-uscite li[data-k="aspetta"] .corpo p{color:var(--muted)}
        .cv .tipo{grid-area:tipo;justify-self:start;display:inline-flex;align-items:center;gap:6px;font:800 10.5px/1 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);padding:5px 8px;border-radius:6px;background:var(--accent-soft)}
        .cv li[data-k="memoria"] .tipo,.cv li[data-k="aspetta"] .tipo{background:var(--soft);color:var(--muted)}
        .cv .corpo{grid-area:corpo;position:relative}
        .cv .corpo p{font:700 14.5px/1.4 var(--font-manrope),sans-serif;color:var(--ink);transition:opacity .45s .1s,color .4s}
        .cv .skel{position:absolute;left:0;right:0;top:3px;display:flex;flex-direction:column;gap:7px;transition:opacity .3s;pointer-events:none}
        .cv .skel i{display:block;height:9px;border-radius:5px;background:var(--soft);position:relative;overflow:hidden}
        .cv .skel i:last-child{width:62%}
        .cv .skel i::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 28%,transparent),transparent);transform:translateX(-100%);animation:cv-luce 1.1s ease-in-out infinite}
        @keyframes cv-luce{to{transform:translateX(100%)}}
        .cv li[data-st="scheletro"] .corpo p{opacity:0}
        .cv li[data-st="testo"] .skel,.cv li[data-st="vuoto"] .skel{opacity:0}
        .cv li[data-st="testo"] .skel i::after,.cv li[data-st="vuoto"] .skel i::after{animation:none}
        .cv .sotto{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12.5px;font-weight:700;color:var(--muted);opacity:0;transform:translateY(4px);transition:opacity .45s,transform .45s var(--e),color .3s}
        .cv .sotto[data-on="1"]{opacity:1;transform:none}
        .cv .sotto[data-ok="1"]{color:var(--accent)}
        .cv .timbro{grid-area:timbro;justify-self:end;align-self:start;display:inline-flex;align-items:center;gap:5px;font:800 11px/1 var(--font-manrope),sans-serif;padding:5px 9px;border-radius:999px;opacity:0;transform:scale(.6)}
        .cv .timbro[data-on="1"]{opacity:1;transform:none;animation:cv-timbro .55s var(--rimbalzo) both}
        @keyframes cv-timbro{from{opacity:0;transform:scale(.5) rotate(-8deg)}to{opacity:1;transform:none}}
        .cv .timbro[data-k="adesso"]{background:var(--accent);color:var(--accent-ink)}
        .cv .timbro[data-k="aspetta"]{background:var(--soft);color:var(--muted);box-shadow:inset 0 0 0 1px var(--line)}
        .cv-fase{position:absolute;left:22px;right:140px;bottom:21px;display:flex;align-items:center;gap:8px;font:700 14px/1.3 var(--font-manrope),sans-serif;color:var(--ink);animation:cf-su .5s var(--e) both}
        .cv-fase svg{color:var(--accent);flex-shrink:0}
        .cv-rivedi{position:absolute;right:18px;bottom:14px;display:inline-flex;align-items:center;gap:6px;font:700 12.5px/1 var(--font-manrope),sans-serif;padding:9px 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--muted);cursor:pointer;opacity:0;pointer-events:none;transition:opacity .4s,color .2s,border-color .2s}
        .cv-rivedi svg{transition:transform .5s var(--e)}
        .cv-rivedi[data-on="1"]{opacity:1;pointer-events:auto}
        .cv-rivedi:hover{color:var(--accent);border-color:var(--accent)}
        .cv-rivedi:hover svg{transform:rotate(-140deg)}
        .cv-duo{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .cv-col{padding:20px 24px 14px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .cv-col.io{box-shadow:inset 0 0 0 2px var(--accent)}
        .cv-col h3{display:flex;align-items:center;gap:9px;font:800 12px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;min-height:30px}
        .cv-col.io h3{color:var(--accent)}
        .cv-cerv{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft);color:var(--ink)}
        .cv-foto{width:30px;height:30px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px var(--surface),0 0 0 3.5px var(--accent)}
        .cv-col ul{list-style:none;margin:0;padding:0}
        .cv-col li{position:relative;display:grid;grid-template-columns:32px 1fr;gap:12px;align-items:center;padding:10px;margin:0 -10px;border-radius:12px;font-size:16px;line-height:1.45;color:var(--ink);transition:background .45s,opacity .45s}
        .cv-col li + li::before{content:"";position:absolute;left:10px;right:10px;top:0;height:1px;background:var(--line)}
        .cv-col .ico{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:var(--soft);color:var(--muted);transition:background .45s,color .45s,transform .45s var(--rimbalzo)}
        .cv:not([data-s="0"]) .cv-col li[data-st="spento"]{opacity:.42}
        .cv-col li[data-st="adesso"]{background:var(--accent-soft)}
        .cv-col li[data-st="adesso"]::before,.cv-col li[data-st="adesso"] + li::before{opacity:0}
        .cv-col li[data-st="adesso"] .ico{background:var(--accent);color:var(--accent-ink);transform:scale(1.08)}
        .cv-col li[data-st="fatto"] .ico{background:var(--accent-soft);color:var(--accent)}

        /* ── il ritmo ── */
        .cf-avvio{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:32px;padding:28px;border-radius:22px;background:var(--surface);box-shadow:inset 0 0 0 2px var(--accent)}
        .cf-avvio .quando{display:inline-flex;align-items:center;gap:8px;font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
        .cf-avvio h3{font-size:28px;margin:10px 0 10px}
        .cf-passi{list-style:none;margin:0;padding:0;position:relative;display:flex;flex-direction:column;gap:12px}
        .cf-passi::before{content:"";position:absolute;left:11px;top:12px;bottom:12px;width:1.5px;background:var(--line)}
        .cf-passi li{position:relative;display:grid;grid-template-columns:24px 1fr;gap:14px;font-size:15.5px;line-height:1.5;color:var(--ink)}
        .cf-passi .p{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--surface);box-shadow:inset 0 0 0 1.5px var(--accent);color:var(--accent);font:800 11px/1 var(--font-manrope),sans-serif;z-index:1}
        .cf-passi li:last-child .p{background:var(--accent);color:var(--accent-ink);box-shadow:none}
        .cf[data-rv-on] .cf-avvio[data-rv] .cf-passi li{opacity:0;transform:translateX(-8px);transition:opacity .5s var(--e),transform .5s var(--e);transition-delay:calc(var(--i) * 110ms + .3s)}
        .cf[data-rv-on] .cf-avvio[data-in] .cf-passi li{opacity:1;transform:none}
        .cf-serve{margin-top:16px;padding:14px 16px;border-radius:12px;background:var(--soft);font-size:15px;color:var(--ink)}
        .cf-serve b{display:block;font:700 11px/1.3 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:3px}
        .cf-ponte{display:flex;align-items:center;justify-content:center;gap:10px;color:var(--muted);font-size:15px;padding:26px 0}
        .cf-ponte svg{color:var(--accent)}
        .cf-ciclo{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end}
        .cf .cf-nota{margin-top:26px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;padding:16px 18px;border-radius:14px;background:var(--soft);font-size:16px;line-height:1.65;max-width:80ch;color:var(--ink)}
        .cf-nota svg{color:var(--accent);margin-top:3px}

        .ms{margin-top:28px}
        .ms-testa{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap;margin-bottom:8px}
        .ms-oggi{display:flex;align-items:baseline;gap:8px;color:var(--muted);font-weight:700;font-size:13px}
        .ms-oggi b{font:800 46px/1 var(--font-manrope),sans-serif;letter-spacing:-.03em;color:var(--ink);font-variant-numeric:tabular-nums;min-width:1.3em;text-align:right}
        .ms-leg{list-style:none;margin:0;padding:0;display:flex;gap:18px;flex-wrap:wrap;font-size:13px;font-weight:600;color:var(--muted)}
        .ms-leg li{display:inline-flex;align-items:center;gap:8px}
        .ms .mk{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--surface);color:var(--accent);box-shadow:inset 0 0 0 1.5px var(--accent);transition:transform .3s var(--e),opacity .3s}
        .ms [data-k="chiusa"] > .mk{width:30px;height:30px;background:var(--accent);color:var(--accent-ink);box-shadow:none}
        .ms-leg [data-k="chiusa"] .mk{width:24px;height:24px}
        .ms [data-k="nota"] > .mk{box-shadow:none;outline:1.5px dashed var(--accent);outline-offset:-1.5px}
        .ms-righello{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:10px}
        .ms-seg{position:relative;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));padding:18px 0 22px}
        .ms-base{position:absolute;left:calc(100% / 14);right:calc(100% / 14);top:37px;height:2px;border-radius:1px;background:var(--line);overflow:hidden}
        .ms-base i{position:absolute;inset:0;background:var(--accent);transform-origin:left;transition:transform .12s linear}
        .ms-seg .slot{position:relative;height:40px;display:grid;place-items:center;z-index:1}
        .ms-seg .slot > i{width:2px;height:12px;border-radius:1px;background:var(--line);transition:background .25s,transform .3s var(--e)}
        .ms-seg .slot[data-on="1"] > i{background:var(--accent)}
        .ms-seg .slot[data-oggi="1"] > i{transform:scaleY(2)}
        .ms-seg .slot[data-oggi="1"]::after{content:"";position:absolute;left:50%;top:-6px;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--accent)}
        .ms[data-parte="1"] .slot[data-on="0"] .mk{opacity:.4;transform:scale(.82)}
        .ms[data-parte="1"] .slot[data-on="1"] .mk{animation:ms-pop .5s var(--rimbalzo)}
        @keyframes ms-pop{0%{transform:scale(.82)}55%{transform:scale(1.22)}100%{transform:none}}
        .ms-14{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);white-space:nowrap;font:800 10.5px/1 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);font-style:normal}
        .ms-range{position:absolute;left:0;right:0;bottom:0;text-align:center;font:700 11px/1 var(--font-manrope),sans-serif;color:var(--muted);letter-spacing:.04em}
        .ms-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
        .ms-sett{position:relative;padding:18px 18px 18px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:9px;transition:opacity .55s var(--e),transform .55s var(--e),box-shadow .4s,outline-color .4s}
        .ms[data-parte="1"] .ms-sett[data-on="0"]{opacity:.5;transform:translateY(8px)}
        .ms-sett[data-now="1"]{box-shadow:inset 0 0 0 2px var(--accent);transform:translateY(-4px)}
        .ms-sett[data-k="nota"]{background:transparent;box-shadow:none;outline:1.5px dashed var(--line);outline-offset:-1.5px}
        .ms-sett[data-k="nota"][data-now="1"]{outline-color:var(--accent)}
        .ms-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
        .ms-ico{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent);transition:background .4s,color .4s,transform .45s var(--rimbalzo)}
        .ms-sett[data-now="1"] .ms-ico{background:var(--accent);color:var(--accent-ink);transform:rotate(-6deg) scale(1.05)}
        .ms-sett .n{font:700 11.5px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
        .ms-sett h3{font-size:19px}
        .ms-sett .call{display:inline-flex;align-items:center;gap:7px;font:700 13.5px/1.3 var(--font-manrope),sans-serif;color:var(--accent)}
        .ms-sett p{font-size:14.5px;line-height:1.55;flex:1}
        .ms-arriva{font-size:14.5px;line-height:1.45;padding:11px 13px;border-radius:11px;background:var(--accent-soft);color:var(--ink);font-weight:700}
        .ms-arriva small{display:flex;align-items:center;gap:6px;font:800 10.5px/1.3 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
        .ms-arriva[data-k="milestone"]{background:var(--accent);color:var(--accent-ink)}
        .ms-arriva[data-k="milestone"] small{color:inherit;opacity:.85}
        .ms-arriva[data-k="nota"]{background:var(--soft)}

        /* ── le mani ── */
        .cf-mani-b{font-size:17px;line-height:1.65;max-width:62ch;margin:18px 0 0!important}
        .mn{margin-top:30px;padding:24px 28px 28px;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .mn-capi{display:flex;justify-content:space-between;gap:16px;font:700 11.5px/1.3 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
        .mn-capi span:first-child{color:var(--accent)}
        .mn-capi span:last-child{text-align:right}
        .mn-livelli{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
        .mn-binario{position:absolute;left:22px;right:0;top:21px;height:2px;border-radius:1px;background:linear-gradient(90deg,var(--accent),var(--line) 85%);transform-origin:left;transition:transform 1.5s var(--e)}
        .mn-binario i{position:absolute;right:-1px;top:-3px;width:8px;height:8px;border-radius:50%;background:var(--line)}
        .mn-liv{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:0 26px 0 0}
        .mn-liv + .mn-liv{padding-left:26px}
        .mn-liv + .mn-liv::before{content:"";position:absolute;left:0;top:68px;bottom:0;width:1px;background:var(--line)}
        .mn-glifo{position:relative;width:44px;height:44px;margin-bottom:12px;z-index:1}
        .mn-glifo .ring{fill:var(--surface);stroke:var(--accent);stroke-width:2.2;stroke-dasharray:100;stroke-dashoffset:0;transition:stroke-dashoffset 1s var(--e);transition-delay:calc(var(--i) * .3s + .35s)}
        .mn-glifo[data-eff="consulenziale"] .ring{stroke:var(--muted);stroke-dasharray:4 4.2}
        .mn-glifo .pieno{fill:var(--accent);transform-origin:22px 22px;transition:transform .7s var(--rimbalzo);transition-delay:calc(var(--i) * .3s + .85s)}
        .mn-liv > :not(svg){transition:opacity .7s var(--e),transform .7s var(--e);transition-delay:calc(var(--i) * .15s + .25s)}
        .mn[data-st="pronto"] .mn-binario{transform:scaleX(0)}
        .mn[data-st="pronto"] .mn-glifo .ring{stroke-dashoffset:100}
        .mn[data-st="pronto"] .mn-glifo[data-eff="consulenziale"] .ring{opacity:0}
        .mn[data-st="pronto"] .mn-glifo .pieno{transform:scale(0)}
        .mn[data-st="pronto"] .mn-liv > :not(svg){opacity:0;transform:translateY(10px)}
        .mn-glifo[data-eff="consulenziale"] .ring{transition:opacity .8s var(--e) calc(var(--i) * .3s + .35s)}
        .mn-nome{font:800 11px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
        .mn-liv[data-eff="consulenziale"] .mn-nome{color:var(--muted)}
        .mn-liv h3{font-size:22px}
        .mn-liv p{font-size:15px;line-height:1.6;color:var(--body)}
        .mn-aree{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
        .mn-area{display:inline-flex;align-items:center;gap:6px;font:700 13px/1 var(--font-manrope),sans-serif;color:var(--ink);background:var(--soft);border:1px solid transparent;border-radius:999px;padding:8px 10px 8px 12px;cursor:pointer;transition:border-color .2s,background .2s,transform .25s var(--e)}
        .mn-area svg{color:var(--muted);transition:transform .3s var(--e),color .2s}
        .mn-area:hover{background:var(--surface);border-color:var(--accent);transform:translateY(-1px)}
        .mn-area:hover svg{transform:rotate(90deg);color:var(--accent)}
        .mn-area[data-on="1"]{background:var(--accent-soft);border-color:var(--accent)}
        .mn-liv[data-eff="consulenziale"] .mn-area{background:transparent;border:1px dashed var(--line);color:var(--body)}
        .mn-liv[data-eff="consulenziale"] .mn-area:hover{border-style:solid;border-color:var(--accent)}
        .cf-apri{display:inline-flex;align-items:center;gap:10px;margin-top:16px;font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 18px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;transition:border-color .2s,color .2s}
        .cf-apri:hover{border-color:var(--accent);color:var(--accent)}
        .cf-apri svg{transition:transform .35s var(--e)}
        .cf-apri[aria-expanded="true"] svg{transform:rotate(45deg)}
        .cf-aree{margin-top:34px;animation:cf-su .6s var(--e) both}
        .cf-aree > h3{font-size:24px}
        .cf-aree > p{color:var(--body);font-size:15.5px;line-height:1.6;max-width:70ch;margin:8px 0 22px!important}
        .cf-barra{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .cf-seg{display:inline-flex;padding:3px;border-radius:12px;background:var(--soft);gap:2px}
        .cf-seg button{font:700 13.5px/1 var(--font-manrope),sans-serif;border:0;background:transparent;color:var(--muted);padding:10px 16px;border-radius:9px;cursor:pointer;transition:background .2s,color .2s}
        .cf-seg button[data-on="1"]{background:var(--surface);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
        .cf-hint{font-size:14px;color:var(--muted);max-width:60ch}
        .cf-effs{display:flex;flex-wrap:wrap;gap:8px 22px;margin:18px 0 8px}
        .cf-effs span{display:inline-flex;align-items:center;gap:8px;font-size:14px}
        .cf-effs b{color:var(--ink)}
        .cf-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;display:inline-block;background:var(--accent)}
        .cf-dot[data-eff="supporto"]{background:linear-gradient(90deg,var(--accent) 50%,transparent 50%);box-shadow:inset 0 0 0 1.5px var(--accent)}
        .cf-dot[data-eff="consulenziale"]{background:transparent;box-shadow:inset 0 0 0 1.5px var(--muted)}
        .cf-imbuto{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;height:44px;margin:16px 0 10px}
        .cf-imbuto svg{width:100%;height:100%;display:block}
        .cf-imbuto polygon{fill:var(--accent-soft);transform-box:fill-box;transform-origin:left center;animation:cf-imb .7s var(--e) both;animation-delay:calc(var(--i) * .1s + .1s)}
        @keyframes cf-imb{from{transform:scaleX(0);opacity:0}to{transform:none;opacity:1}}
        .cf-tappe{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
        .cf-tappa{padding:18px 16px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:6px}
        .cf-tappa .n{font:700 12px/1 var(--font-manrope),sans-serif;color:var(--accent)}
        .cf-tappa h3{font-size:18px}
        .cf-tappa > p{font-size:13.5px;line-height:1.5;color:var(--muted);margin-bottom:10px!important;min-height:4.5em}
        .cf-pills{display:flex;flex-direction:column;gap:6px}
        .cf-pill,.cf-pilastro{display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:700 14px/1.2 var(--font-manrope),sans-serif;color:var(--ink);background:var(--soft);border:1px solid transparent;border-radius:999px;padding:9px 12px;cursor:pointer;transition:border-color .2s,background .2s,transform .25s var(--e)}
        .cf-aree .cf-pill{animation:cf-su .5s var(--e) backwards;animation-delay:calc(var(--i) * 45ms + .25s)}
        .cf-pill:hover,.cf-pilastro:hover{background:var(--surface);border-color:var(--line);transform:translateX(2px)}
        .cf-pill:hover .cf-piu,.cf-pilastro:hover .cf-piu{color:var(--accent);transform:rotate(90deg)}
        .cf-pill[data-on="1"],.cf-pilastro[data-on="1"]{background:var(--accent-soft);border-color:var(--accent)}
        .cf-pill[data-eff="consulenziale"]{background:transparent;border:1px dashed var(--line);color:var(--muted);font-weight:600}
        .cf-pill-t{flex:1}
        .cf-piu{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;color:var(--muted);box-shadow:inset 0 0 0 1px var(--line);transition:transform .3s var(--e),color .2s}
        .cf-pil-t{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:baseline;margin:26px 0 10px}
        .cf-pil-t h3{font-size:18px}
        .cf-pil-t p{font-size:14px;color:var(--muted)}
        .cf-pilastri{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .cf-pilastro{border-radius:18px;padding:18px 20px;flex-wrap:wrap;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .cf-pilastro .cf-pill-t{font-size:17px}
        .cf-pill-c{flex-basis:100%;font:500 14px/1.5 var(--font-manrope),sans-serif;color:var(--muted);padding-left:20px}

        /* ── modale ── */
        .cf-back{position:fixed;inset:0;z-index:60;background:color-mix(in srgb,var(--ink) 35%,transparent);backdrop-filter:blur(3px);border:0;width:100%;cursor:zoom-out;animation:cfa .25s ease both}
        @keyframes cfa{from{opacity:0}to{opacity:1}}
        .cf-pop{position:fixed;z-index:62;background:var(--surface);border-radius:20px;box-shadow:0 30px 80px -20px rgba(0,0,0,.35),inset 0 0 0 1px var(--line);padding:26px 26px 22px;overflow-y:auto;animation:cf-pop .32s var(--e) both}
        @keyframes cf-pop{from{opacity:0;transform:translate(var(--da)) scale(.98)}to{opacity:1;transform:none}}
        .cf-pop[data-esce="1"],.cf-back[data-esce="1"]{animation:cf-via .17s ease both}
        @keyframes cf-via{to{opacity:0}}
        .cf-pop > *{animation:cf-su .45s var(--e) backwards;animation-delay:calc(var(--i,0) * 40ms + 60ms)}
        .cf-x{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:transform .3s var(--e),border-color .2s}
        .cf-x:hover{transform:rotate(90deg);border-color:var(--accent)}
        .cf-pop .tappa{font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
        .cf-pop h3{font-size:24px;margin:8px 40px 8px 0}
        .cf-pop .claim{font-size:15px;color:var(--muted);margin-bottom:14px!important}
        .cf-pop .eff{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:var(--accent-soft);font-size:14px;color:var(--ink);margin-bottom:14px}
        .cf-pop .eff .cf-dot{margin-top:5px}
        .cf-ops{list-style:none;margin:0;padding:0}
        .cf-ops li{display:grid;grid-template-columns:72px 1fr;gap:12px;padding:10px 0;border-top:1px solid var(--line);font-size:15px;line-height:1.5;color:var(--ink)}
        .cf-ops li:first-child{border-top:0}
        .cf-who{font:800 11px/1.6 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
        .cf-who[data-w="io"]{color:var(--accent)}
        .cf-ops .r{font-size:12px;color:var(--muted)}
        .cf-pop .serve{margin-top:14px;padding:12px 14px;border-radius:12px;background:var(--soft);font-size:14.5px;color:var(--ink)}
        .cf-pop .serve b{display:block;font:700 10.5px/1.3 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:3px}

        /* ── domande e chiusura ── */
        .cf-faq details{border-bottom:1px solid var(--line)}
        .cf-faq details::details-content{block-size:0;overflow:hidden;transition:block-size .4s var(--e),content-visibility .4s allow-discrete}
        .cf-faq details[open]::details-content{block-size:auto}
        .cf-faq summary{list-style:none;cursor:pointer;padding:20px 48px 20px 0;position:relative;font:800 18px/1.35 var(--font-manrope),sans-serif;color:var(--ink);transition:color .2s}
        .cf-faq summary:hover{color:var(--accent)}
        .cf-faq summary::-webkit-details-marker{display:none}
        .cf-faq summary::after{content:"+";position:absolute;right:6px;top:16px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:var(--soft);color:var(--accent);font-size:18px;transition:transform .35s var(--e),background .2s}
        .cf-faq summary:hover::after{background:var(--accent-soft)}
        .cf-faq details[open] summary::after{transform:rotate(45deg)}
        .cf-faq p{font-size:16px;line-height:1.75;padding:0 48px 22px 0;max-width:78ch}
        .cf-fine{margin:104px 0 72px;padding:36px 40px;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:grid;grid-template-columns:auto minmax(0,1.4fr) auto;gap:28px;align-items:center}
        .cf-fine img{width:84px;height:84px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px var(--surface),0 0 0 5px var(--accent)}
        .cf-fine p{font-size:17px;line-height:1.65;margin-top:12px!important;max-width:60ch}
        .cf-fine .azioni{display:flex;gap:10px;flex-wrap:wrap}

        @media (max-width:1100px){
          .cf-hero{grid-template-columns:1fr;gap:28px;align-items:start}
          .cf-indice{max-width:560px}
        }
        @media (max-width:980px){
          .rt-palco{grid-template-columns:1fr;grid-template-rows:auto 1fr;align-items:stretch;gap:14px;padding:76px 0 16px}
          .rt-testo{align-self:start}
          .rt-punti li{padding:8px 10px}.rt-punti p{display:none}
          .rt-punti li[data-on="1"]{transform:none}
          .rt-fase{min-height:0;margin-bottom:10px!important;font-size:18px}
          .rt-barre{margin-bottom:10px}
          .rt-campo{height:auto;min-height:300px}
          .rt-voce{font-size:11.5px;padding:6px 9px}
          .rt-nodo span{width:86px;margin-left:-43px;font-size:11.5px}
          .cf-tappe,.cf-imbuto{grid-template-columns:1fr 1fr}
          .ms-grid,.ms-righello{grid-template-columns:1fr 1fr}
          .ms-righello{row-gap:18px}
          .cf-avvio,.cf-limite{grid-template-columns:1fr}
          .cf-fine{grid-template-columns:auto 1fr}
          .cf-fine .azioni{grid-column:1/-1}
          .mn-livelli{grid-template-columns:1fr;gap:26px}
          .mn-binario{display:none}
          .mn-liv,.mn-liv + .mn-liv{padding:0}
          .mn-liv + .mn-liv::before{display:none}
          .mn-glifo{margin-bottom:4px}
        }
        @media (max-width:860px){
          .cv-scena{grid-template-columns:1fr;grid-template-rows:auto 84px auto;padding:12px 12px 100px}
          .cv-ponte > svg{display:none}
          .cv-ponte::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1.5px;background:var(--line)}
          .cv-pan{min-height:0}
          .cv-duo{grid-template-columns:1fr}
          .cv-fase{left:16px;right:16px;bottom:58px;font-size:13.5px;align-items:flex-start}
          .cv-rivedi{left:14px;right:auto;bottom:14px}
        }
        @media (max-width:640px){
          .cf-tappe,.ms-grid,.cf-pilastri{grid-template-columns:1fr}
          .cf-imbuto{display:none}
          .cf-fine{padding:26px;grid-template-columns:1fr}
          .cf-fine img{width:64px;height:64px}
          .cf-pil-t{grid-template-columns:1fr;gap:4px}
          .mn{padding:20px}
          .mn-capi{display:none}
          .ms-oggi b{font-size:38px}
        }
        @media (prefers-reduced-motion:reduce){
          :root:has(.cf){scroll-behavior:auto}
          .rt-scena{height:auto}.rt-palco{position:static;height:auto}
          .rt-campo{height:520px}
          .cf *{transition:none!important;animation:none!important}
        }
        @media print{.cf-back,.cf-pop,.cf-apri,.ns-tema,.cf-rail,.cv-rivedi{display:none!important}}
      `}</style>

      {/* ══ INDICE A MARGINE ══ */}
      <nav className="cf-rail" data-on={railOn ? "1" : "0"} aria-label="In questa pagina">
        <span className="riempi" style={{ transform: `scaleY(${Math.max(0, sezione) / (INDEX.length - 1)})` }} aria-hidden="true" />
        <ol>
          {INDEX.map((x, i) => (
            <li key={x.id}>
              <a href={`#${x.id}`} data-on={sezione === i ? "1" : "0"} data-fatto={sezione > i ? "1" : "0"}>
                <span className="pt">{x.n ?? ""}</span>
                {x.t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="cf-wrap">
        {/* ══ TESTA ══ */}
        <section className="cf-hero" data-bordo="testa">
          <div className="cf-hero-t">
            <span className="cf-kicker">{etichetta}</span>
            <h1>
              {HERO.title} <em>{HERO.titleEm}</em>
            </h1>
            <p className="cf-lead">{HERO.sub}</p>
          </div>
          <nav className="cf-indice" aria-label="In questa pagina">
            <small>In questa pagina</small>
            <ol>
              {INDEX.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`}>
                    <span className="cf-num" data-n={x.n ? "1" : "0"}>
                      {x.n}
                    </span>
                    <span>
                      <b>{x.t}</b>
                      <span className="d">{x.b}</span>
                    </span>
                    <Icona n="arrow-right" size={16} className="va" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* ══ 1. LA DIREZIONE, fatta vedere ══ */}
        <section className="cf-sec" id="direzione">
          <div className="cf-sec-l" data-rv>
            <b>1</b>
            <span>{DIRECTION.label}</span>
          </div>
          <h2 data-rv>{DIRECTION.title}</h2>
          <Rotta />
          <div className="cf-limite" data-rv>
            <div className="lm-t">
              <b>Il limite</b>
              <p>{DIRECTION.limit}</p>
            </div>
            <div className="lm-vista" aria-hidden="true">
              <div>
                <div className="lm-et">
                  {LIMIT_VIEW.tanti}
                  <em>{LIMIT_VIEW.tantiEsito}</em>
                </div>
                <div className="lm-barre">
                  {TANTI.map((v, i) => (
                    <span key={i}>
                      <i style={{ "--v": v, "--i": i } as React.CSSProperties} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="lm-ok">
                <div className="lm-et">
                  {LIMIT_VIEW.pochi}
                  <em>
                    <Icona n="circle-check" size={14} stroke={2.2} />
                    {LIMIT_VIEW.pochiEsito}
                  </em>
                </div>
                <div className="lm-barre">
                  {[0, 1].map((i) => (
                    <span key={i}>
                      <i style={{ "--v": 1, "--i": i * 2 } as React.CSSProperties} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ IL CERVELLO E IO: chi fa cosa, fra l'AI e me ══ */}
        <section className="cf-sec" id="cervello">
          <div className="cf-sec-l" data-rv>
            <span>{BRAIN.label}</span>
          </div>
          <h2 data-rv>{BRAIN.title}</h2>
          <p className="cf-lead" style={{ marginTop: 14 }} data-rv>
            {BRAIN.body}
          </p>
          <Cervello />
        </section>

        {/* ══ 2. IL RITMO ══ */}
        <section className="cf-sec" id="ritmo">
          <div className="cf-sec-l" data-rv>
            <b>2</b>
            <span>{RHYTHM.label}</span>
          </div>
          <h2 data-rv>{RHYTHM.title}</h2>

          <div className="cf-avvio" style={{ marginTop: 34 }} data-rv>
            <div>
              <span className="quando">
                <Icona n="flag" size={14} stroke={2.2} />
                {OPENING.when} · {OPENING.badge}
              </span>
              <h3>{OPENING.label}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6 }}>{OPENING.claim}</p>
              <div className="cf-serve">
                <b>Cosa serve da te</b>
                {OPENING.need}
              </div>
            </div>
            <ol className="cf-passi">
              {OPENING.steps.map((s, i) => (
                <li key={s} style={{ "--i": i } as React.CSSProperties}>
                  <span className="p">{i === OPENING.steps.length - 1 ? <Icona n="check" size={12} stroke={2.8} /> : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <p className="cf-ponte" data-rv>
            <Icona n="rotate-ccw" size={16} stroke={2} />
            {OPENING.bridge}
          </p>

          <div className="cf-ciclo" data-rv>
            <div>
              <h3 style={{ fontSize: 26 }}>Il ciclo mensile</h3>
              <p className="cf-lead" style={{ marginTop: 8 }}>
                {MONTH_INTRO}
              </p>
            </div>
          </div>
          <Mese />
          <p className="cf-nota" data-rv>
            <Icona n="flag" size={18} stroke={2} />
            {MONTH_NOTE}
          </p>
        </section>

        {/* ══ 3. LE MANI: la scala in breve, la mappa se serve ══ */}
        <section className="cf-sec" id="mani">
          <div className="cf-sec-l" data-rv>
            <b>3</b>
            <span>{HANDS.label}</span>
          </div>
          <h2 data-rv>{HANDS.title}</h2>
          <p className="cf-mani-b" data-rv>
            {HANDS.body}
          </p>
          <Mani onOpen={openArea} openId={openId} />
          <button
            type="button"
            className="cf-apri"
            aria-expanded={handsOpen}
            aria-controls="cf-aree"
            onClick={() => setHandsOpen((v) => !v)}
          >
            <Icona n="plus" size={16} stroke={2.2} />
            {handsOpen ? HANDS.close : HANDS.open}
          </button>

          {handsOpen && (
            <div className="cf-aree" id="cf-aree">
              <h3>{HANDS.mapTitle}</h3>
              <p>{HANDS.mapBody}</p>
              <div className="cf-barra">
                <div className="cf-seg" role="tablist" aria-label="Tipo di business">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      role="tab"
                      aria-selected={mode === m.id}
                      data-on={mode === m.id ? "1" : "0"}
                      onClick={() => setMode(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <p className="cf-hint">{MODES.find((m) => m.id === mode)?.hint}</p>
              </div>
              <div className="cf-effs">
                {EFFORTS.map((e) => (
                  <span key={e.id}>
                    <i className="cf-dot" data-eff={e.id} />
                    <b>{e.label}</b> {EFF_BREVE[e.id]}
                  </span>
                ))}
              </div>
              <div className="cf-imbuto" aria-hidden="true">
                {STAGES.map((st, i) => {
                  const a = IMBUTO[i],
                    b = IMBUTO[i + 1];
                  return (
                    <svg key={st.id} viewBox="0 0 100 44" preserveAspectRatio="none">
                      <polygon
                        points={`0,${(44 - a) / 2} 100,${(44 - b) / 2} 100,${(44 + b) / 2} 0,${(44 + a) / 2}`}
                        style={{ "--i": i } as React.CSSProperties}
                      />
                    </svg>
                  );
                })}
              </div>
              <div className="cf-tappe" key={mode}>
                {STAGES.map((st) => (
                  <div className="cf-tappa" key={st.id}>
                    <span className="n">{st.n}</span>
                    <h3>{st.label}</h3>
                    <p>{st.claim}</p>
                    <div className="cf-pills">
                      {byStage(st.id).map((a, i) => (
                        <Pill a={a} key={a.id} i={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cf-pil-t">
                <h3>{BASE_STAGE.label}</h3>
                <p>{BASE_STAGE.claim}</p>
              </div>
              <div className="cf-pilastri">
                {byStage("base").map((a) => (
                  <Pill a={a} key={a.id} big />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ══ DOMANDE ══ */}
        <section className="cf-sec" id="domande">
          <div className="cf-sec-l" data-rv>
            <span>Domande vere</span>
          </div>
          <h2 style={{ marginBottom: 18 }} data-rv>
            Quello che mi chiedono per iscritto
          </h2>
          <div className="cf-faq">
            {FAQ.map((f, i) => (
              <details key={f.q} data-rv style={{ "--i": i } as React.CSSProperties}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ══ CHIUSURA ══ */}
        <section className="cf-fine" data-bordo="fine" data-rv>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nicola.png" alt="Nicola Serrao" width={84} height={84} loading="lazy" />
          <div>
            <h2>{CLOSING.title}</h2>
            <p>{CLOSING.body}</p>
          </div>
          <div className="azioni">
            <a className="cf-btn" href={`mailto:${SITE.email}`}>
              <Icona n="mail" size={16} stroke={2} />
              Scrivimi
              <Icona n="arrow-right" size={16} stroke={2} className="va" />
            </a>
            <a className="cf-btn2" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              <Icona n="message-circle" size={16} stroke={2} />
              WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* ══ MODALE ══ */}
      {open && (
        <>
          <button type="button" className="cf-back" aria-label="Chiudi" onClick={close} data-esce={esce ? "1" : "0"} />
          <div className="cf-pop" role="dialog" aria-modal="true" aria-label={open.title} style={popStyle} data-esce={esce ? "1" : "0"}>
            <button type="button" className="cf-x" onClick={close} aria-label="Chiudi">
              <Icona n="x" size={15} stroke={2.2} />
            </button>
            <span className="tappa">{stageLabel(open.stage)}</span>
            <h3 style={{ "--i": 1 } as React.CSSProperties}>{open.title}</h3>
            <p className="claim" style={{ "--i": 2 } as React.CSSProperties}>
              {open.claim}
            </p>
            <div className="eff" style={{ "--i": 3 } as React.CSSProperties}>
              <span className="cf-dot" data-eff={open.effort} />
              <span>
                <b>{effortOf(open.effort).label}.</b> {effortOf(open.effort).body}
              </span>
            </div>
            <ul className="cf-ops" style={{ "--i": 4 } as React.CSSProperties}>
              {ops.map((o, i) => (
                <li key={`${open.id}-${i}`}>
                  <span className="cf-who" data-w={o.who}>
                    {WHO_LABEL[o.who]}
                  </span>
                  <span>
                    {o.t} <span className="r">· {RHYTHM_LABEL[o.r as Rhythm].toLowerCase()}</span>
                  </span>
                </li>
              ))}
            </ul>
            {open.need && (
              <div className="serve" style={{ "--i": 5 } as React.CSSProperties}>
                <b>Cosa serve da te</b>
                {open.need}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
