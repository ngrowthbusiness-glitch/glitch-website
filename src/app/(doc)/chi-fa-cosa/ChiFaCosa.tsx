"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/lib/constants";
import Rotta from "./Rotta";
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
  MODES,
  MONTH,
  MONTH_INTRO,
  MONTH_NOTE,
  OPENING,
  RHYTHM,
  RHYTHM_LABEL,
  RIGHELLO,
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

/* Il righello del mese: il cursore va dal giorno 1 al 30 quando entra in vista, una volta. */
function Righello() {
  const box = useRef<HTMLDivElement>(null);
  const [g, setG] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setG(30);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const va = (now: number) => {
          const k = Math.min(1, (now - t0) / 3600);
          setG(1 + Math.round((1 - Math.pow(1 - k, 3)) * 29));
          if (k < 1) raf = requestAnimationFrame(va);
        };
        raf = requestAnimationFrame(va);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="cf-righello" ref={box} aria-label="Il mese, dal giorno 1 al 30">
      <div className="cf-tacche" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <i key={i} data-on={i < g ? "1" : "0"} />
        ))}
      </div>
      <span className="cf-cursore" style={{ left: `${((g - 1) / 29) * 100}%` }} aria-hidden="true">
        {g}
      </span>
      {RIGHELLO.map(([d, t]) => (
        <span className="cf-giorno" key={d} style={{ left: `${((d - 1) / 29) * 100}%` }} data-on={g >= d ? "1" : "0"}>
          <b>{d}</b>
          {t}
        </span>
      ))}
    </div>
  );
}

export default function ChiFaCosa() {
  const [mode, setMode] = useState<Mode>("servizi");
  const [handsOpen, setHandsOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  const areas = useMemo(() => AREAS.filter((a) => a.modes.includes(mode)), [mode]);
  const open: Area | undefined = useMemo(() => (openId ? AREAS.find((a) => a.id === openId) : undefined), [openId]);
  const ops = useMemo(() => (open ? open.ops.filter((o) => !o.mode || o.mode === mode) : []), [open, mode]);

  const byStage = (id: StageId) => {
    const ord = STAGE_ORDER[id];
    return areas.filter((a) => a.stage === id && ord.includes(a.id)).sort((a, b) => ord.indexOf(a.id) - ord.indexOf(b.id));
  };

  function close() {
    setOpenId(null);
    setAnchor(null);
  }
  function openArea(id: string, el: HTMLElement) {
    const target = AREAS.find((a) => a.id === id);
    if (target && !target.modes.includes(mode)) setMode(target.modes[0]);
    setAnchor(el.getBoundingClientRect());
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

  /* La scheda si apre di fianco all'elemento cliccato, mai sopra */
  const popStyle = useMemo((): React.CSSProperties => {
    if (!anchor) return {};
    const vw = window.innerWidth;
    if (vw <= 860) return { left: 12, right: 12, bottom: 12, top: "auto", maxHeight: "74vh" };
    const w = Math.min(520, Math.round(vw * 0.44));
    const toTheRight = anchor.left + anchor.width / 2 < vw / 2;
    const left = toTheRight ? Math.min(anchor.right + 24, vw - w - 24) : Math.max(24, anchor.left - 24 - w);
    return { left, width: w, top: "50%", transform: "translateY(-50%)", maxHeight: "80vh" };
  }, [anchor]);

  const effortOf = (id: Effort) => EFFORTS.find((e) => e.id === id)!;
  const stageLabel = (id: StageId) => (id === "base" ? BASE_STAGE.label : STAGES.find((s) => s.id === id)?.label);

  const Pill = ({ a, big }: { a: Area; big?: boolean }) => (
    <button
      type="button"
      className={big ? "cf-pilastro" : "cf-pill"}
      data-on={openId === a.id ? "1" : "0"}
      data-eff={a.effort}
      aria-haspopup="dialog"
      onClick={(ev) => openArea(a.id, ev.currentTarget)}
    >
      <span className="cf-dot" data-eff={a.effort} aria-hidden="true" />
      <span className="cf-pill-t">{big ? a.title : a.short}</span>
      {big && <span className="cf-pill-c">{a.claim}</span>}
      <span className="cf-piu" aria-hidden="true">
        +
      </span>
    </button>
  );

  return (
    <div className="cf">
      <style>{`
        /* ══ CHI FA COSA · LA ROTTA · Brand Nicola Serrao v2.0 ══
           I token vengono dal layout documento (Manrope, chiaro e scuro). */
        .cf{--max:1200px}
        .cf-wrap{max-width:var(--max);margin:0 auto;padding:0 24px}
        .cf-kicker{font:700 12px/1.3 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
        .cf h1{font:800 clamp(40px,6vw,78px)/1.02 var(--font-manrope),sans-serif;letter-spacing:-.035em;color:var(--ink);margin:16px 0 22px;text-wrap:balance;max-width:14ch}
        .cf h1 em{font-style:normal;color:var(--accent)}
        .cf h2{font:800 clamp(28px,3.4vw,44px)/1.1 var(--font-manrope),sans-serif;letter-spacing:-.025em;color:var(--ink);text-wrap:balance;max-width:24ch;margin:0}
        .cf h3{font:800 20px/1.25 var(--font-manrope),sans-serif;letter-spacing:-.015em;color:var(--ink);margin:0}
        .cf p{margin:0}
        .cf-lead{font-size:clamp(17px,1.5vw,19.5px);line-height:1.6;max-width:56ch;color:var(--body)}
        .cf-hero{padding:56px 0 24px}
        .cf-sec{padding:96px 0 0}
        .cf-sec-l{display:flex;align-items:center;gap:12px;margin-bottom:14px;font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
        .cf-sec-l b{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--accent);color:var(--accent-ink);letter-spacing:0;font-size:12px}
        .cf-sec-l::after{content:"";flex:1;height:1px;background:var(--line)}
        .cf-btn{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:var(--accent-ink);font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 22px;border-radius:10px;text-decoration:none;border:0;cursor:pointer;transition:transform .2s}
        .cf-btn:hover{transform:translateY(-2px)}
        .cf-btn2{display:inline-flex;align-items:center;gap:8px;background:var(--surface);color:var(--ink);font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 20px;border-radius:10px;text-decoration:none;border:1px solid var(--line);cursor:pointer}
        .cf-btn2:hover{border-color:var(--accent);color:var(--accent)}
        .cf :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}

        /* ── la rotta ── */
        .rt-scena{height:300vh;position:relative;margin-top:8px}
        .rt-palco{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:36px;align-items:center;padding:24px 0}
        .rt-fase{font:800 clamp(20px,2vw,26px)/1.25 var(--font-manrope),sans-serif;letter-spacing:-.015em;color:var(--ink);margin-bottom:22px!important;min-height:2.5em}
        .rt-punti{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
        .rt-punti li{display:grid;grid-template-columns:34px 1fr;gap:14px;padding:14px 16px;border-radius:14px;transition:background .35s,opacity .35s;opacity:.42}
        .rt-punti li[data-on="1"]{opacity:1;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .rt-n{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font:800 13px/1 var(--font-manrope),sans-serif;background:var(--soft);color:var(--muted);transition:background .35s,color .35s}
        .rt-punti li[data-on="1"] .rt-n{background:var(--accent);color:var(--accent-ink)}
        .rt-punti b{display:block;font:800 17px/1.3 var(--font-manrope),sans-serif;color:var(--ink);margin-bottom:3px}
        .rt-punti p{font-size:14.5px;line-height:1.55}
        .rt-campo{position:relative;height:min(76vh,640px);border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
        .rt-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
        .rt-svg path{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round}
        .rt-voce{position:absolute;left:0;top:0;white-space:nowrap;font:600 13.5px/1 var(--font-manrope),sans-serif;color:var(--body);padding:8px 12px;border-radius:999px;background:var(--soft);will-change:transform,opacity;transition:background .4s,color .4s}
        .rt-voce[data-ok="1"]{background:var(--accent-soft);color:var(--ink)}
        .rt-nodo{position:absolute;left:0;top:0;width:0;opacity:0;will-change:transform,opacity}
        .rt-nodo b{display:grid;place-items:center;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:var(--accent);color:var(--accent-ink);font:800 14px/1 var(--font-manrope),sans-serif}
        .rt-nodo span{display:block;width:140px;margin:10px 0 0 -70px;text-align:center;font:800 14px/1.2 var(--font-manrope),sans-serif;color:var(--ink)}
        .rt-scaffale{position:absolute;left:24px;right:24px;bottom:18px;border-top:1.5px dashed var(--line);padding-top:10px;font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);opacity:0}
        .cf-limite{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;padding:20px 22px;border-radius:16px;background:var(--accent-soft);margin-top:8px}
        .cf-limite b{font:700 11px/1.6 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);white-space:nowrap}
        .cf-limite p{color:var(--ink);font-size:16px;line-height:1.65;max-width:70ch}

        /* ── il cervello e io ── */
        .cf-duo{margin-top:34px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .cf-col{padding:24px 26px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .cf-col.io{box-shadow:inset 0 0 0 2px var(--accent)}
        .cf-col h3{font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
        .cf-col.io h3{color:var(--accent)}
        .cf-col ul{list-style:none;margin:0;padding:0}
        .cf-col li{padding:13px 0;border-top:1px solid var(--line);font-size:16.5px;line-height:1.45;color:var(--ink)}
        .cf-col li:first-child{border-top:0}

        /* ── il ritmo ── */
        .cf-righello{position:relative;height:96px;margin:40px 0 44px}
        .cf-tacche{position:absolute;left:0;right:0;top:34px;height:14px;display:flex;justify-content:space-between}
        .cf-tacche i{width:2px;height:100%;border-radius:1px;background:var(--line);transition:background .2s}
        .cf-tacche i[data-on="1"]{background:var(--accent)}
        .cf-cursore{position:absolute;top:22px;width:38px;height:38px;margin-left:-19px;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font:800 13px/1 var(--font-manrope),sans-serif;font-variant-numeric:tabular-nums}
        .cf-giorno{position:absolute;top:66px;transform:translateX(-50%);white-space:nowrap;font:600 12.5px/1.3 var(--font-manrope),sans-serif;color:var(--muted);text-align:center;transition:color .3s}
        .cf-giorno b{display:block;color:var(--ink);font-weight:800}
        .cf-giorno[data-on="1"]{color:var(--ink)}
        .cf-giorno:first-of-type{transform:none}
        .cf-giorno:last-of-type{transform:translateX(-90%)}
        .cf-avvio{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:28px;padding:28px;border-radius:22px;background:var(--surface);box-shadow:inset 0 0 0 2px var(--accent)}
        .cf-avvio .quando{font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
        .cf-avvio h3{font-size:28px;margin:10px 0 10px}
        .cf-avvio ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
        .cf-avvio li{display:grid;grid-template-columns:18px 1fr;gap:8px;font-size:15.5px;line-height:1.5;color:var(--ink)}
        .cf-avvio li::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent);margin-top:8px}
        .cf-serve{margin-top:16px;padding:14px 16px;border-radius:12px;background:var(--soft);font-size:15px;color:var(--ink)}
        .cf-serve b{display:block;font:700 11px/1.3 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:3px}
        .cf-ponte{text-align:center;color:var(--muted);font-size:15px;padding:26px 0}
        .cf-mese{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:22px}
        .cf-sett{padding:22px 20px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:10px}
        .cf-sett[data-soft="1"]{background:transparent;box-shadow:inset 0 0 0 1.5px var(--line);box-shadow:none;border:1.5px dashed var(--line)}
        .cf-sett .n{font:700 12px/1 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
        .cf-sett .call{font:700 13px/1.3 var(--font-manrope),sans-serif;color:var(--accent)}
        .cf-sett p{font-size:14.5px;line-height:1.55;flex:1}
        .cf-arriva{font-size:14px;line-height:1.5;padding:10px 12px;border-radius:10px;background:var(--accent-soft);color:var(--ink)}
        .cf-arriva[data-k="milestone"]{background:var(--accent);color:var(--accent-ink)}
        .cf-arriva[data-k="nota"]{background:var(--soft)}
        .cf-arriva small{display:block;font:700 10.5px/1.3 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.75;margin-bottom:2px}
        .cf-nota{margin-top:26px;padding-left:16px;border-left:3px solid var(--accent);font-size:16px;line-height:1.7;max-width:72ch;color:var(--ink)}

        /* ── le mani ── */
        .cf-mani-b{font-size:17px;line-height:1.65;max-width:62ch;margin:18px 0 24px!important}
        .cf-apri{display:inline-flex;align-items:center;gap:10px;font:700 14px/1 var(--font-manrope),sans-serif;padding:13px 18px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer}
        .cf-apri:hover{border-color:var(--accent);color:var(--accent)}
        .cf-apri span{font-size:18px;line-height:1;transition:transform .25s}
        .cf-apri[aria-expanded="true"] span{transform:rotate(45deg)}
        .cf-aree{margin-top:30px}
        .cf-barra{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .cf-seg{display:inline-flex;padding:3px;border-radius:12px;background:var(--soft);gap:2px}
        .cf-seg button{font:700 13.5px/1 var(--font-manrope),sans-serif;border:0;background:transparent;color:var(--muted);padding:10px 16px;border-radius:9px;cursor:pointer}
        .cf-seg button[data-on="1"]{background:var(--surface);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
        .cf-hint{font-size:14px;color:var(--muted);max-width:60ch}
        .cf-effs{display:flex;flex-wrap:wrap;gap:8px 22px;margin:18px 0 26px}
        .cf-effs span{display:inline-flex;align-items:center;gap:8px;font-size:14px}
        .cf-effs b{color:var(--ink)}
        .cf-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;display:inline-block;background:var(--accent)}
        .cf-dot[data-eff="supporto"]{background:linear-gradient(90deg,var(--accent) 50%,transparent 50%);box-shadow:inset 0 0 0 1.5px var(--accent)}
        .cf-dot[data-eff="consulenziale"]{background:transparent;box-shadow:inset 0 0 0 1.5px var(--muted)}
        .cf-tappe{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
        .cf-tappa{padding:18px 16px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:6px}
        .cf-tappa .n{font:700 12px/1 var(--font-manrope),sans-serif;color:var(--accent)}
        .cf-tappa h3{font-size:18px}
        .cf-tappa > p{font-size:13.5px;line-height:1.5;color:var(--muted);margin-bottom:10px!important;min-height:4.5em}
        .cf-pills{display:flex;flex-direction:column;gap:6px}
        .cf-pill,.cf-pilastro{display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:700 14px/1.2 var(--font-manrope),sans-serif;color:var(--ink);background:var(--soft);border:1px solid transparent;border-radius:999px;padding:9px 12px;cursor:pointer;transition:border-color .2s,background .2s}
        .cf-pill:hover,.cf-pilastro:hover{background:var(--surface);border-color:var(--line)}
        .cf-pill[data-on="1"],.cf-pilastro[data-on="1"]{background:var(--accent-soft);border-color:var(--accent)}
        .cf-pill[data-eff="consulenziale"]{background:transparent;border:1px dashed var(--line);color:var(--muted);font-weight:600}
        .cf-pill-t{flex:1}
        .cf-piu{width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:14px;color:var(--muted);box-shadow:inset 0 0 0 1px var(--line)}
        .cf-pilastri{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
        .cf-pilastro{border-radius:18px;padding:18px 20px;flex-wrap:wrap;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line)}
        .cf-pilastro .cf-pill-t{font-size:17px}
        .cf-pill-c{flex-basis:100%;font:500 14px/1.5 var(--font-manrope),sans-serif;color:var(--muted);padding-left:20px}

        /* ── modale ── */
        .cf-back{position:fixed;inset:0;z-index:60;background:color-mix(in srgb,var(--ink) 35%,transparent);backdrop-filter:blur(2px);border:0;width:100%;cursor:zoom-out;animation:cfa .2s ease both}
        @keyframes cfa{from{opacity:0}to{opacity:1}}
        .cf-pop{position:fixed;z-index:62;background:var(--surface);border-radius:20px;box-shadow:0 30px 80px -20px rgba(0,0,0,.35),inset 0 0 0 1px var(--line);padding:26px 26px 22px;overflow-y:auto;animation:cfa .2s ease both}
        .cf-x{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:16px;cursor:pointer}
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
        .cf-faq summary{list-style:none;cursor:pointer;padding:20px 44px 20px 0;position:relative;font:800 18px/1.35 var(--font-manrope),sans-serif;color:var(--ink)}
        .cf-faq summary::-webkit-details-marker{display:none}
        .cf-faq summary::after{content:"+";position:absolute;right:6px;top:16px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--soft);color:var(--accent);font-size:18px;transition:transform .25s}
        .cf-faq details[open] summary::after{transform:rotate(45deg)}
        .cf-faq p{font-size:16px;line-height:1.75;padding:0 44px 22px 0;max-width:78ch}
        .cf-fine{margin:96px 0 72px;padding:40px;border-radius:24px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:grid;grid-template-columns:minmax(0,1.4fr) auto;gap:24px;align-items:end}
        .cf-fine p{font-size:17px;line-height:1.65;margin-top:12px!important;max-width:60ch}
        .cf-fine .azioni{display:flex;gap:10px;flex-wrap:wrap}

        @media (max-width:980px){
          .rt-palco{grid-template-columns:1fr;grid-template-rows:auto 1fr;align-items:stretch;gap:14px;padding:76px 0 16px}
          .rt-testo{align-self:start}
          .rt-punti li{padding:8px 10px}.rt-punti p{display:none}
          .rt-fase{min-height:0;margin-bottom:10px!important;font-size:18px}
          .rt-campo{height:auto;min-height:300px}
          .rt-voce{font-size:11.5px;padding:6px 9px}
          .rt-nodo span{width:86px;margin-left:-43px;font-size:11.5px}
          .cf-tappe{grid-template-columns:1fr 1fr}.cf-mese{grid-template-columns:1fr 1fr}
          .cf-avvio,.cf-fine{grid-template-columns:1fr}
        }
        @media (max-width:640px){
          .cf-duo,.cf-tappe,.cf-mese,.cf-pilastri{grid-template-columns:1fr}
          .cf-giorno{font-size:10.5px}.cf-giorno:nth-of-type(2),.cf-giorno:nth-of-type(4){display:none}
          .cf-fine{padding:26px}
          .cf-limite{grid-template-columns:1fr}
        }
        @media (prefers-reduced-motion:reduce){
          .rt-scena{height:auto}.rt-palco{position:static;height:auto}
          .rt-campo{height:520px}
          .cf *{transition:none!important;animation:none!important}
        }
        @media print{.cf-back,.cf-pop,.cf-apri,.ns-tema{display:none!important}}
      `}</style>

      <div className="cf-wrap">
        {/* ══ HERO ══ */}
        <section className="cf-hero">
          <span className="cf-kicker">{HERO.eyebrow}</span>
          <h1>
            {HERO.title} <em>{HERO.titleEm}</em>
          </h1>
          <p className="cf-lead">{HERO.sub}</p>
        </section>

        {/* ══ 1. LA DIREZIONE, fatta vedere ══ */}
        <section className="cf-sec">
          <div className="cf-sec-l">
            <b>1</b>
            {DIRECTION.label}
          </div>
          <h2>{DIRECTION.title}</h2>
          <Rotta />
          <div className="cf-limite">
            <b>Il limite</b>
            <p>{DIRECTION.limit}</p>
          </div>
        </section>

        {/* ══ IL CERVELLO E IO: chi fa cosa, fra l'AI e me ══ */}
        <section className="cf-sec">
          <div className="cf-sec-l">{BRAIN.label}</div>
          <h2>{BRAIN.title}</h2>
          <p className="cf-lead" style={{ marginTop: 14 }}>
            {BRAIN.body}
          </p>
          <div className="cf-duo">
            <div className="cf-col">
              <h3>Il cervello AI</h3>
              <ul>
                {BRAIN.ai.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="cf-col io">
              <h3>Io</h3>
              <ul>
                {BRAIN.io.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ══ 2. IL RITMO ══ */}
        <section className="cf-sec">
          <div className="cf-sec-l">
            <b>2</b>
            {RHYTHM.label}
          </div>
          <h2>{RHYTHM.title}</h2>

          <div className="cf-avvio" style={{ marginTop: 34 }}>
            <div>
              <span className="quando">
                {OPENING.when} · {OPENING.badge}
              </span>
              <h3>{OPENING.label}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6 }}>{OPENING.claim}</p>
              <div className="cf-serve">
                <b>Cosa serve da te</b>
                {OPENING.need}
              </div>
            </div>
            <ul>
              {OPENING.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="cf-ponte">{OPENING.bridge}</p>

          <h3 style={{ fontSize: 26 }}>Il ciclo mensile</h3>
          <p className="cf-lead" style={{ marginTop: 8 }}>
            {MONTH_INTRO}
          </p>
          <Righello />
          <div className="cf-mese">
            {MONTH.map((w) => (
              <article className="cf-sett" key={w.n} data-soft={w.landsKind === "nota" ? "1" : "0"}>
                <span className="n">{`Settimana ${w.n}`}</span>
                <h3>{w.label}</h3>
                <span className="call">{w.call}</span>
                <p>{w.callNote}</p>
                <span className="cf-arriva" data-k={w.landsKind}>
                  <small>
                    {w.landsKind === "milestone"
                      ? "Cosa si porta a casa"
                      : w.landsKind === "nota"
                      ? "Al posto della call"
                      : "A fine settimana"}
                  </small>
                  {w.lands}
                </span>
              </article>
            ))}
          </div>
          <p className="cf-nota">{MONTH_NOTE}</p>
        </section>

        {/* ══ 3. LE MANI: chiuse, si aprono se servono ══ */}
        <section className="cf-sec">
          <div className="cf-sec-l">
            <b>3</b>
            {HANDS.label}
          </div>
          <h2>{HANDS.title}</h2>
          <p className="cf-mani-b">{HANDS.body}</p>
          <button
            type="button"
            className="cf-apri"
            aria-expanded={handsOpen}
            aria-controls="cf-aree"
            onClick={() => setHandsOpen((v) => !v)}
          >
            <span aria-hidden="true">+</span>
            {handsOpen ? HANDS.close : HANDS.open}
          </button>

          {handsOpen && (
            <div className="cf-aree" id="cf-aree">
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
              <div className="cf-tappe">
                {STAGES.map((st) => (
                  <div className="cf-tappa" key={st.id}>
                    <span className="n">{st.n}</span>
                    <h3>{st.label}</h3>
                    <p>{st.claim}</p>
                    <div className="cf-pills">
                      {byStage(st.id).map((a) => (
                        <Pill a={a} key={a.id} />
                      ))}
                    </div>
                  </div>
                ))}
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
        <section className="cf-sec">
          <div className="cf-sec-l">Domande vere</div>
          <h2 style={{ marginBottom: 18 }}>Quello che mi chiedono per iscritto</h2>
          <div className="cf-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ══ CHIUSURA ══ */}
        <section className="cf-fine">
          <div>
            <h2>{CLOSING.title}</h2>
            <p>{CLOSING.body}</p>
          </div>
          <div className="azioni">
            <a className="cf-btn" href={`mailto:${SITE.email}`}>
              Scrivimi
            </a>
            <a className="cf-btn2" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* ══ MODALE ══ */}
      {open && (
        <>
          <button type="button" className="cf-back" aria-label="Chiudi" onClick={close} />
          <div className="cf-pop" role="dialog" aria-modal="true" aria-label={open.title} style={popStyle}>
            <button type="button" className="cf-x" onClick={close} aria-label="Chiudi">
              ×
            </button>
            <span className="tappa">{stageLabel(open.stage)}</span>
            <h3>{open.title}</h3>
            <p className="claim">{open.claim}</p>
            <div className="eff">
              <span className="cf-dot" data-eff={open.effort} />
              <span>
                <b>{effortOf(open.effort).label}.</b> {effortOf(open.effort).body}
              </span>
            </div>
            <ul className="cf-ops">
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
              <div className="serve">
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
