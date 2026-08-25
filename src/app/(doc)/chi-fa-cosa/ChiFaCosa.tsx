"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AREAS,
  BASE_STAGE,
  BREAKS,
  CYCLE_LOAD,
  EFFORTS,
  EFFORT_NEST,
  FAQ,
  MODES,
  MONTH,
  MONTH_INTRO,
  MONTH_NOTE,
  OPENING,
  RHYTHM_LABEL,
  SETUPS,
  SETUPS_CLAIM,
  SETUPS_LABEL,
  SIMULTANEITA,
  STAGES,
  WHO_LABEL,
  type Area,
  type Effort,
  type Mode,
  type PersonIcon,
  type Rhythm,
  type StageId,
  type WeekIcon,
} from "./data";

/* ── Icone dei tre livelli di impegno ── */
function EffortIcon({ id }: { id: Effort }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  if (id === "operativo")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    );
  if (id === "supporto")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden="true">
      <path d="M12 10.9c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm2.2 12.2L6 18l3.8-8.2L18 6l-3.8 8.2z" />
    </svg>
  );
}

type IconName = WeekIcon | PersonIcon | "flag" | "loop" | "tap" | "clock";

const PATHS: Record<IconName, string> = {
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  camera: "M9 2 7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  megaphone: "M18 11v2h4v-2h-4zm-2 6.6c.96.71 2.21 1.65 3.2 2.4.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.07-1.2 1.6zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.75-2.24 1.69-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z",
  palette: "M12 22a1 1 0 0 0 1-1 1 1 0 0 0-.25-.66 1 1 0 0 1-.24-.65c0-.55.45-1 1-1H15c3.31 0 6-2.69 6-6 0-4.42-4.03-8-9-8s-9 3.58-9 8 4.03 8 9 8zM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  code: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  headset: "M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62zM9 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  tap: "M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.44-.72c-.37-.08-.76.04-1.03.31l-.79.8 4.94 4.94c.27.27.65.43 1.04.43h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.09-.61-.23-1.2-.86-1.58z",
  call: "M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2a15.1 15.1 0 0 1-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z",
  check: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8z",
  gear: "M19.4 13c0-.3.1-.6.1-1s0-.7-.1-1l2.1-1.6c.2-.1.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-1L14.4 2.4c0-.2-.2-.4-.4-.4h-4c-.2 0-.4.2-.5.4L9.1 5.1c-.6.3-1.2.6-1.7 1l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.5.1.6L4.5 11c0 .3-.1.6-.1 1s0 .7.1 1l-2.1 1.6c-.2.1-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7 1l.4 2.7c.1.2.3.4.5.4h4c.2 0 .4-.2.5-.4l.4-2.7c.6-.3 1.2-.6 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z",
  chart: "M5 9.2h3V19H5zm5.6-4.2h2.8v14h-2.8zm5.6 8H19v6h-2.8z",
  flag: "M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z",
  loop: "M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6 0 1-.3 2-.7 2.8l1.5 1.5C19.5 15.1 20 13.6 20 12c0-4.4-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6 0-1 .3-2 .7-2.8L5.2 7.7C4.5 8.9 4 10.4 4 12c0 4.4 3.6 8 8 8v3l4-4-4-4v3z",
};

function Ico({ n, s = 13 }: { n: IconName; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={PATHS[n]} />
    </svg>
  );
}

/* ordine di lettura dentro ogni tappa: le cose non mie vanno in fondo */
const STAGE_ORDER: Record<StageId, string[]> = {
  traffico: ["messaggio", "organico", "seo", "ads", "pubblici", "creativita", "social", "produzione"],
  sito: ["pagine", "negozio", "cro", "sviluppo"],
  conversione: ["vendita", "checkout", "economia"],
  relazione: ["email", "newsletter", "ritorno"],
  base: ["misura", "conduzione"],
};

const VIEWS = [
  { id: "percorso", label: "Il percorso", hint: "Tutto quello che serve, e chi se ne occupa pezzo per pezzo." },
  { id: "ritmo", label: "Il ritmo", hint: "Come funziona un mese normale: quando ci si sente e quando si consegna." },
] as const;

type View = (typeof VIEWS)[number]["id"];

export default function ChiFaCosa() {
  const [mode, setMode] = useState<Mode>("servizi");
  const [view, setView] = useState<View>("percorso");
  const [openId, setOpenId] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [setup, setSetup] = useState<string>(SETUPS[0].id);

  const areas = useMemo(() => AREAS.filter((a) => a.modes.includes(mode)), [mode]);
  const open: Area | undefined = useMemo(
    () => (openId ? AREAS.find((a) => a.id === openId) : undefined),
    [openId]
  );
  const ops = useMemo(
    () => (open ? open.ops.filter((o) => !o.mode || o.mode === mode) : []),
    [open, mode]
  );

  const byStage = (id: StageId) => {
    const ord = STAGE_ORDER[id];
    return areas
      .filter((a) => a.stage === id && ord.includes(a.id))
      .sort((a, b) => ord.indexOf(a.id) - ord.indexOf(b.id));
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
    if (vw <= 860) {
      return { left: 12, right: 12, bottom: 12, top: "auto", maxHeight: "72vh" };
    }
    const w = Math.min(520, Math.round(vw * 0.44));
    const toTheRight = anchor.left + anchor.width / 2 < vw / 2;
    const left = toTheRight
      ? Math.min(anchor.right + 28, vw - w - 24)
      : Math.max(24, anchor.left - 28 - w);
    return { left, width: w, top: "50%", transform: "translateY(-50%)", maxHeight: "78vh" };
  }, [anchor]);

  const effortOf = (id: Effort) => EFFORTS.find((e) => e.id === id)!;
  const stageLabel = (id: StageId) =>
    id === "base" ? BASE_STAGE.label : STAGES.find((s) => s.id === id)?.label;

  const Pill = ({ a, big }: { a: Area; big?: boolean }) => {
    const e = effortOf(a.effort);
    return (
      <button
        type="button"
        className={big ? "cfc-pillar" : "cfc-pill"}
        data-on={openId === a.id ? "1" : "0"}
        data-eff={a.effort}
        aria-haspopup="dialog"
        onClick={(ev) => openArea(a.id, ev.currentTarget)}
      >
        <span className="cfc-pill-t">{big ? a.title : a.short}</span>
        {big && <span className="cfc-pillar-c">{a.claim}</span>}
        <span className="cfc-pill-r">
          <span className="cfc-eff" title={e.body}>
            <EffortIcon id={a.effort} />
            <span>{e.short}</span>
          </span>
          <span className="cfc-more" aria-hidden="true">
            {"+"}
          </span>
        </span>
      </button>
    );
  };

  return (
    <>
      <style>{`
        /* ══ CHI FA COSA ══ */
        .cfc-hero-sub { font-size: 14.5px; color: var(--text-dim); line-height: 1.95; max-width: 680px; }

        .cfc-bar { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .cfc-seg { display: inline-flex; gap: 3px; padding: 3px; border: 1px solid var(--teal-border); border-radius: 8px; background: rgba(232,245,242,0.02); }
        .cfc-seg button {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          padding: 10px 20px; border-radius: 5px; border: none;
          background: transparent; color: var(--text-dim); cursor: pointer;
          transition: background .25s, color .25s; white-space: nowrap;
        }
        .cfc-seg button:hover { color: var(--text); }
        .cfc-seg button[data-on="1"] { background: var(--teal); color: #0a0e0d; font-weight: 500; }
        .cfc-bar-hint { font-size: 11.5px; color: var(--text-faint); line-height: 1.7; margin: 12px 0 34px; }

        /* ── I tre livelli, una matrioska ── */
        .cfc-nest { border-radius: 12px; padding: 18px 20px 18px; }
        .cfc-nest[data-lv="1"] {
          border: 1px solid var(--teal); background: rgba(0,255,252,0.07);
          box-shadow: 0 0 26px rgba(0,255,252,.08);
        }
        .cfc-nest[data-lv="2"] { border: 1px solid var(--teal-border); background: rgba(0,255,252,0.05); margin-top: 4px; }
        .cfc-nest[data-lv="3"] { border: 1px dashed rgba(232,245,242,0.22); background: rgba(10,14,13,0.5); margin-top: 4px; position: relative; }
        .cfc-nest-h { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--teal); }
        .cfc-nest[data-lv="3"] .cfc-nest-h { color: rgba(232,245,242,0.5); }
        .cfc-nest-t { font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; }
        .cfc-nest-b { font-size: 12px; color: var(--text-dim); line-height: 1.75; margin-bottom: 14px; max-width: 720px; }
        .cfc-nest-core {
          position: absolute; top: 14px; right: 16px;
          font-size: 8.5px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-faint);
        }
        .cfc-nest-note {
          font-size: 12px; color: var(--text-dim); line-height: 1.85;
          margin: 14px 0 34px; padding-left: 16px;
          border-left: 2px solid var(--teal-border); max-width: 780px;
        }

        /* ── Segnale che le voci si aprono ── */
        .cfc-tap {
          display: flex; align-items: flex-start; gap: 8px; margin-bottom: 14px; line-height: 1.7;
        }
        .cfc-tap svg { flex-shrink: 0; margin-top: 1px; }
        .cfc-tap {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: .75;
        }
        .cfc-more {
          width: 17px; height: 17px; border-radius: 50%; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid rgba(232,245,242,0.20); color: var(--text-faint);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px; line-height: 1; padding-bottom: 1px;
          transition: border-color .2s, color .2s, background .2s;
        }
        .cfc-pill:hover .cfc-more, .cfc-pill[data-on="1"] .cfc-more,
        .cfc-pillar:hover .cfc-more, .cfc-pillar[data-on="1"] .cfc-more {
          border-color: var(--teal); color: var(--teal); background: var(--teal-dim);
        }

        /* ── L'asse ── */
        .cfc-axis { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
        .cfc-axis-l { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-faint); white-space: nowrap; }
        .cfc-axis-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(0,255,252,0.15), var(--teal)); position: relative; }
        .cfc-axis-line::after { content: ""; position: absolute; right: -1px; top: -3px; border-left: 7px solid var(--teal); border-top: 3.5px solid transparent; border-bottom: 3.5px solid transparent; }

        /* ── Il funnel ── */
        .cfc-fn { position: relative; }
        .cfc-fn-shape { position: absolute; left: -16px; top: 122px; width: calc(100% + 32px); height: calc(100% - 110px); z-index: 0; pointer-events: none; }
        .cfc-fn-cols { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .cfc-fn-col { display: flex; flex-direction: column; }
        .cfc-fn-head { min-height: 120px; padding-right: 8px; }
        .cfc-fn-n { font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 9px; letter-spacing: 2.5px; color: var(--teal); opacity: .6; display: block; margin-bottom: 8px; }
        .cfc-fn-t { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 21px; font-weight: 700; color: var(--text); line-height: 1.15; margin-bottom: 8px; }
        .cfc-fn-c { font-size: 11px; color: var(--text-faint); line-height: 1.65; }
        .cfc-fn-pills { flex: 1; display: flex; flex-direction: column; gap: 8px; justify-content: center; min-height: 340px; padding: 18px 0; }

        /* ── Pastiglie ── */
        .cfc-pill, .cfc-pillar {
          position: relative; text-align: left; cursor: pointer;
          font-family: inherit; color: inherit;
          border: 1px solid rgba(0,255,252,0.26); border-radius: 8px;
          background: rgba(10,14,13,0.92);
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .cfc-pill { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 11px 13px; }
        .cfc-pill:hover, .cfc-pillar:hover { border-color: var(--teal); background: rgba(0,255,252,0.09); box-shadow: 0 0 16px rgba(0,255,252,0.2); }
        .cfc-pill[data-on="1"], .cfc-pillar[data-on="1"] { border-color: var(--teal); background: rgba(0,255,252,0.15); box-shadow: 0 0 26px rgba(0,255,252,0.35); z-index: 61; }
        .cfc-pill[data-eff="consulenziale"], .cfc-pillar[data-eff="consulenziale"] { border-style: dashed; border-color: rgba(232,245,242,0.20); background: transparent; opacity: .72; }
        .cfc-pill[data-eff="consulenziale"]:hover, .cfc-pill[data-eff="consulenziale"][data-on="1"],
        .cfc-pillar[data-eff="consulenziale"]:hover, .cfc-pillar[data-eff="consulenziale"][data-on="1"] { opacity: 1; border-style: solid; border-color: var(--teal); }
        .cfc-pill-t { font-size: 12px; line-height: 1.3; color: var(--text); letter-spacing: .2px; }

        .cfc-pill-r { display: inline-flex; align-items: center; gap: 9px; flex-shrink: 0; }
        .cfc-eff {
          display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0;
          font-size: 8.5px; letter-spacing: 1.4px; text-transform: uppercase;
          color: var(--teal); opacity: .8;
        }
        .cfc-pill[data-eff="supporto"] .cfc-eff, .cfc-pillar[data-eff="supporto"] .cfc-eff { color: rgba(0,255,252,0.72); }
        .cfc-pill[data-eff="consulenziale"] .cfc-eff, .cfc-pillar[data-eff="consulenziale"] .cfc-eff { color: rgba(232,245,242,0.42); }

        /* ── I due pilastri ── */
        .cfc-base { margin-top: 26px; }
        .cfc-base-h { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
        .cfc-base-t { font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--teal); }
        .cfc-base-c { font-size: 11px; color: var(--text-faint); line-height: 1.7; flex: 1 1 300px; }
        .cfc-base-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .cfc-pillar { display: flex; flex-direction: column; align-items: flex-start; gap: 9px; padding: 22px 22px 18px; }
        .cfc-pillar .cfc-pill-t { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 19px; font-weight: 700; }
        .cfc-pillar-c { font-size: 12px; color: var(--text-dim); line-height: 1.7; }

        /* ── Il limite di tempo, nella vista percorso ── */
        .cfc-sim {
          display: grid; grid-template-columns: 34px 1fr; gap: 14px;
          margin-top: 26px; padding: 20px 22px;
          border: 1px solid rgba(232,245,242,0.12); border-radius: 10px;
          background: rgba(232,245,242,0.025);
        }
        .cfc-sim-i {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(232,245,242,0.18); color: var(--text-dim);
        }
        .cfc-sim-l { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-faint); display: block; margin-bottom: 8px; }
        .cfc-sim-b { font-size: 12.5px; color: var(--text-dim); line-height: 1.85; max-width: 760px; margin-bottom: 12px; }

        /* ── Quante persone: le due configurazioni ── */
        .cfc-set { margin-top: 34px; }
        .cfc-set-h { margin-bottom: 18px; }
        .cfc-set-h .cfc-base-c { display: block; margin-top: 8px; max-width: 780px; }
        .cfc-set-body { animation: fadeUp .3s ease both; }
        .cfc-set-count {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text);
          line-height: 1.25; margin: 22px 0 8px;
        }
        .cfc-set-when { font-size: 12.5px; color: var(--text-dim); line-height: 1.85; max-width: 780px; margin-bottom: 22px; }
        .cfc-set-note {
          font-size: 12.5px; color: var(--text-dim); line-height: 1.85;
          margin-top: 18px; padding-left: 16px;
          border-left: 2px solid var(--teal-border); max-width: 800px;
        }

        .cfc-crew { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 10px; }
        .cfc-crew-c {
          position: relative; display: flex; flex-direction: column; gap: 9px;
          border: 1px solid rgba(232,245,242,0.10); border-radius: 10px;
          padding: 20px 18px 18px; background: rgba(232,245,242,0.02);
        }
        .cfc-crew-c[data-me="1"] { border-color: var(--teal); background: rgba(0,255,252,0.07); box-shadow: 0 0 22px rgba(0,255,252,.10); }
        .cfc-crew-c[data-soft="1"] { border-style: dashed; border-color: rgba(232,245,242,0.16); background: transparent; opacity: .78; }
        .cfc-crew-i {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--teal-border); color: var(--teal); background: var(--teal-dim);
        }
        .cfc-crew-c[data-me="1"] .cfc-crew-i { border-color: var(--teal); background: rgba(0,255,252,0.16); box-shadow: 0 0 16px rgba(0,255,252,.25); }
        .cfc-crew-c[data-soft="1"] .cfc-crew-i { border-style: dashed; border-color: rgba(232,245,242,0.20); color: var(--text-faint); background: transparent; }
        .cfc-crew-r {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--text); line-height: 1.2;
        }
        .cfc-crew-n { font-size: 11.5px; color: var(--text-dim); line-height: 1.65; }
        .cfc-crew-tag {
          position: absolute; top: 14px; right: 14px;
          font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-faint);
        }
        .cfc-crew-tag[data-me="1"] { color: var(--teal); opacity: .8; }

        /* ── Modale ── */
        .cfc-back {
          position: fixed; inset: 0; z-index: 60;
          background: rgba(6,9,9,0.78); backdrop-filter: blur(3px);
          animation: cfcfade .2s ease both; border: none; cursor: zoom-out; width: 100%;
        }
        @keyframes cfcfade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cfcin { from { opacity: 0; transform: translateY(-50%) scale(.985) } to { opacity: 1 } }
        @keyframes cfcup { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
        .cfc-pop {
          position: fixed; z-index: 62;
          border: 1px solid var(--teal); border-radius: 12px;
          background: #0c1110; box-shadow: 0 24px 70px rgba(0,0,0,.6), 0 0 40px rgba(0,255,252,.12);
          padding: 28px 28px 24px; overflow-y: auto;
          animation: cfcin .22s ease both;
        }
        .cfc-pop-x {
          position: absolute; top: 14px; right: 14px;
          width: 28px; height: 28px; border-radius: 6px; cursor: pointer;
          border: 1px solid rgba(232,245,242,0.14); background: transparent;
          color: var(--text-dim); font-size: 15px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          transition: border-color .2s, color .2s;
        }
        .cfc-pop-x:hover { border-color: var(--teal); color: var(--teal); }
        .cfc-pop-s { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--teal); opacity: .7; margin-bottom: 10px; display: block; padding-right: 34px; }
        .cfc-pop-h { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 23px; font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 10px; padding-right: 34px; }
        .cfc-pop-c { font-size: 13px; color: var(--text-dim); line-height: 1.75; margin-bottom: 18px; }
        .cfc-pop-eff { display: flex; align-items: flex-start; gap: 10px; padding: 13px 15px; border-radius: 8px; border: 1px solid var(--teal-border); background: var(--teal-dim); margin-bottom: 20px; }
        .cfc-pop-eff-i { color: var(--teal); padding-top: 1px; }
        .cfc-pop-eff-t { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); display: block; margin-bottom: 5px; }
        .cfc-pop-eff-b { font-size: 12px; color: var(--text-dim); line-height: 1.7; }
        .cfc-terms { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 20px; }
        .cfc-term { font-size: 9.5px; letter-spacing: .5px; padding: 3px 9px; border-radius: 20px; border: 1px solid rgba(232,245,242,0.12); color: var(--text-dim); }

        .cfc-op { display: grid; grid-template-columns: 16px 1fr; gap: 12px; align-items: start; padding: 11px 0; border-bottom: 1px solid rgba(232,245,242,0.06); }
        .cfc-op:last-of-type { border-bottom: none; }
        .cfc-op-t { font-size: 12.5px; color: var(--text); line-height: 1.7; opacity: .92; }
        .cfc-op[data-w="tu"] .cfc-op-t, .cfc-op[data-w="fuori"] .cfc-op-t { color: var(--text-dim); }
        .cfc-op-meta { grid-column: 2; display: flex; align-items: center; gap: 8px; margin-top: 5px; }
        .cfc-op-who { font-size: 8.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-faint); }
        .cfc-op[data-w="io"] .cfc-op-who { color: var(--teal); }

        .cfc-mk { width: 9px; height: 9px; border-radius: 2px; display: inline-block; margin-top: 5px; }
        .cfc-mk[data-w="io"]      { background: var(--teal); box-shadow: 0 0 8px rgba(0,255,252,.45); }
        .cfc-mk[data-w="insieme"] { background: linear-gradient(135deg, var(--teal) 50%, transparent 50%); border: 1px solid var(--teal-border); }
        .cfc-mk[data-w="tu"]      { background: transparent; border: 1px solid rgba(232,245,242,0.55); }
        .cfc-mk[data-w="fuori"]   { background: transparent; border: 1px dashed rgba(232,245,242,0.22); }
        .cfc-r { width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 8.5px; border: 1px solid var(--teal-border); color: var(--teal); background: var(--teal-dim); }

        .cfc-need { margin-top: 20px; padding: 15px 17px; border-left: 2px solid var(--teal); border-radius: 0 6px 6px 0; background: rgba(0,255,252,0.06); }
        .cfc-need-l { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); margin-bottom: 6px; display: block; }
        .cfc-need-b { font-size: 12.5px; color: var(--text-dim); line-height: 1.8; }
        .cfc-legend { display: flex; flex-wrap: wrap; gap: 7px 16px; margin-top: 18px; padding-top: 15px; border-top: 1px solid rgba(232,245,242,0.06); }
        .cfc-legend-item { display: inline-flex; align-items: center; gap: 7px; font-size: 9.5px; color: var(--text-faint); }
        .cfc-legend-item .cfc-mk { margin-top: 0; }

        /* ── L'avvio: lineare, con la banda piena a sinistra ── */
        .cfc-open {
          display: grid; grid-template-columns: 92px 1fr; gap: 0;
          border: 1px solid var(--teal); border-radius: 12px;
          background: rgba(0,255,252,0.05); overflow: hidden; margin-bottom: 0;
        }
        .cfc-open-side {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          padding: 26px 10px; background: rgba(0,255,252,0.10);
          border-right: 1px solid var(--teal-border);
        }
        .cfc-open-ico {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--teal); color: var(--teal); background: var(--bg);
          box-shadow: 0 0 18px rgba(0,255,252,.28);
        }
        .cfc-open-badge {
          writing-mode: vertical-rl; transform: rotate(180deg);
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); opacity: .8;
        }
        .cfc-open-body { padding: 26px 28px 24px; }
        .cfc-open-when { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; }
        .cfc-open-claim { font-size: 13px; color: var(--text-dim); line-height: 1.75; margin-bottom: 18px; max-width: 640px; }
        .cfc-open-steps { list-style: none; display: grid; grid-template-columns: repeat(2, 1fr); gap: 9px 26px; margin-bottom: 20px; }

        /* ── Il ponte fra avvio e ciclo ── */
        .cfc-bridge { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 22px 0 26px; }
        .cfc-bridge-a { width: 1px; height: 34px; background: linear-gradient(var(--teal), rgba(0,255,252,0.2)); position: relative; }
        .cfc-bridge-a::after {
          content: ""; position: absolute; left: -4px; bottom: -1px;
          border-top: 8px solid rgba(0,255,252,0.55);
          border-left: 4.5px solid transparent; border-right: 4.5px solid transparent;
        }
        .cfc-bridge-t { font-size: 11.5px; color: var(--text-faint); line-height: 1.7; text-align: center; max-width: 520px; }

        /* ── Intestazione del ciclo ── */
        .cfc-cyc-h { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .cfc-cyc-ico {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px dashed var(--teal); color: var(--teal); background: var(--teal-dim);
        }
        .cfc-cyc-badge { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--teal); opacity: .8; }
        .cfc-cyc-load { display: flex; align-items: center; gap: 10px; margin-top: 46px; }

        /* ── L'arco che chiude il ciclo ── */
        .cfc-arc {
          position: relative; height: 44px; margin-top: 16px;
          border: 1px dashed rgba(0,255,252,0.4); border-top: none;
          border-radius: 0 0 16px 16px;
        }
        .cfc-arc::before {
          content: ""; position: absolute; left: -4.5px; top: -1px;
          border-bottom: 9px solid var(--teal);
          border-left: 5px solid transparent; border-right: 5px solid transparent;
        }
        .cfc-arc-l {
          position: absolute; left: 50%; bottom: -10px; transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bg); padding: 0 14px; white-space: nowrap;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: .8;
        }

        .cfc-brk { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

        /* ── Il mese ── */
        .cfc-mo { position: relative; margin-bottom: 60px; }
        .cfc-mo-rail { position: absolute; left: 0; right: 0; top: 27px; height: 1px; background: linear-gradient(90deg, var(--teal), rgba(0,255,252,0.18)); }
        .cfc-mo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; position: relative; }
        .cfc-mo-col { display: flex; flex-direction: column; }
        .cfc-mo-dot { width: 13px; height: 13px; border-radius: 50%; border: 1px solid var(--teal); background: var(--bg); box-shadow: 0 0 12px rgba(0,255,252,.5); margin: 21px 0 22px; position: relative; z-index: 2; }
        .cfc-mo-dot[data-soft="1"] { border-style: dashed; box-shadow: none; opacity: .55; }
        .cfc-mo-card { border: 1px solid rgba(232,245,242,0.08); border-radius: 10px; padding: 22px 20px; background: rgba(232,245,242,0.02); flex: 1; display: flex; flex-direction: column; }
        .cfc-mo-top { display: flex; align-items: center; gap: 9px; margin-bottom: 10px; }
        .cfc-mo-badge {
          width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--teal-border); color: var(--teal); background: var(--teal-dim);
        }
        .cfc-mo-badge[data-soft="1"] { border-style: dashed; border-color: rgba(232,245,242,0.2); color: var(--text-faint); background: transparent; }
        .cfc-mo-n { font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 9px; letter-spacing: 2.5px; color: var(--teal); opacity: .6; display: block; }
        .cfc-mo-t { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 16px; }
        .cfc-mo-call { display: flex; align-items: center; gap: 7px; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; }
        .cfc-mo-call[data-soft="1"] { color: var(--text-faint); }
        .cfc-mo-cn { font-size: 11.5px; color: var(--text-dim); line-height: 1.7; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid rgba(232,245,242,0.07); }
        .cfc-mo-ops { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-bottom: 18px; flex: 1; }
        .cfc-mo-op { font-size: 11.5px; color: var(--text); opacity: .85; line-height: 1.65; padding-left: 14px; position: relative; }
        .cfc-mo-op::before { content: ""; position: absolute; left: 0; top: 7px; width: 4px; height: 4px; border-radius: 1px; background: var(--teal); opacity: .7; }
        .cfc-mo-l { display: block; font-size: 11px; line-height: 1.6; padding: 10px 12px; border-radius: 7px; border: 1px solid var(--teal-border); background: var(--teal-dim); color: var(--teal); }
        .cfc-mo-l[data-k="milestone"] { background: rgba(0,255,252,0.14); border-color: var(--teal); }
        .cfc-mo-l[data-k="nota"] { background: transparent; border-style: dashed; border-color: rgba(232,245,242,0.2); color: var(--text-dim); }
        .cfc-mo-lk { display: block; font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase; opacity: .65; margin-bottom: 4px; }
        .cfc-mo-note { font-size: 12.5px; color: var(--text-dim); line-height: 1.85; max-width: 780px; padding-left: 16px; border-left: 2px solid var(--teal-border); margin-top: 30px; }

        /* ── Le fasi lunghe ── */
        .cfc-tl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .cfc-tl-card { border: 1px solid rgba(232,245,242,0.08); border-radius: 10px; padding: 24px 22px; background: rgba(232,245,242,0.02); height: 100%; }
        .cfc-tl-when { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--teal); margin-bottom: 8px; }
        .cfc-tl-claim { font-size: 12px; color: var(--text-dim); line-height: 1.75; margin-bottom: 18px; }
        .cfc-tl-steps { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-bottom: 20px; }
        .cfc-tl-step { font-size: 12px; color: var(--text); opacity: .88; line-height: 1.65; padding-left: 16px; position: relative; }
        .cfc-tl-step::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 1px; background: var(--teal); opacity: .8; }
        .cfc-load { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .cfc-load-bars { display: flex; gap: 3px; }
        .cfc-load-b { width: 16px; height: 6px; border-radius: 1px; background: rgba(232,245,242,0.12); }
        .cfc-load-b[data-on="1"] { background: var(--teal); box-shadow: 0 0 6px rgba(0,255,252,.45); }
        .cfc-load-l { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-faint); }
        .cfc-load-note { font-size: 11.5px; color: var(--text-dim); line-height: 1.75; }

        /* ── FAQ ── */
        .cfc-faq details { border-bottom: 1px solid rgba(232,245,242,0.08); }
        .cfc-faq summary {
          list-style: none; cursor: pointer; padding: 20px 40px 20px 0; position: relative;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 17px; font-weight: 700; color: var(--text); line-height: 1.35; transition: color .2s;
        }
        .cfc-faq summary::-webkit-details-marker { display: none; }
        .cfc-faq summary:hover { color: var(--teal); }
        .cfc-faq summary::after { content: "+"; position: absolute; right: 8px; top: 18px; font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 20px; color: var(--teal); }
        .cfc-faq details[open] summary::after { content: "\\2013"; }
        .cfc-faq-a { font-size: 13px; color: var(--text-dim); line-height: 1.9; padding: 0 40px 24px 0; max-width: 860px; }

        /* ── Responsive ── */
        @media (max-width: 1080px) {
          .cfc-fn-cols { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .cfc-fn-shape { display: none; }
          .cfc-fn-head { min-height: 0; margin-bottom: 12px; }
          .cfc-fn-pills { min-height: 0; padding: 0; justify-content: flex-start; }
          .cfc-fn-col { border-left: 1px solid var(--teal-border); padding-left: 18px; }
          .cfc-mo-grid, .cfc-tl-grid { grid-template-columns: repeat(2, 1fr); }
          .cfc-mo-rail, .cfc-arc { display: none; }
          .cfc-crew { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .cfc-pop { border-radius: 14px 14px 0 0; animation: cfcup .22s ease both; transform: none !important; }
        }
        @media (max-width: 820px) {
          .cfc-hero-sub { font-size: 15.5px; }
          .cfc-fn-cols { grid-template-columns: 1fr; }
          .cfc-base-list, .cfc-mo-grid, .cfc-tl-grid, .cfc-brk { grid-template-columns: 1fr; }
          .cfc-crew { grid-template-columns: repeat(2, 1fr); }
          .cfc-sim { grid-template-columns: 1fr; }
          .cfc-sim-b, .cfc-set-when, .cfc-set-note { font-size: 14px; }
          .cfc-crew-n { font-size: 13px; }
          .cfc-set-count { font-size: 19px; }
          .cfc-open { grid-template-columns: 1fr; }
          .cfc-open-side { flex-direction: row; justify-content: flex-start; padding: 16px 22px; border-right: none; border-bottom: 1px solid var(--teal-border); }
          .cfc-open-badge { writing-mode: horizontal-tb; transform: none; }
          .cfc-open-body { padding: 22px 20px 20px; }
          .cfc-open-steps { grid-template-columns: 1fr; }
          .cfc-open-claim, .cfc-bridge-t { font-size: 14px; }
          .cfc-pop { padding: 24px 20px 20px; }
          .cfc-op-t, .cfc-need-b, .cfc-tl-step, .cfc-tl-claim, .cfc-mo-op, .cfc-mo-cn, .cfc-mo-note, .cfc-pillar-c { font-size: 14px; }
          .cfc-pill-t { font-size: 13.5px; }
          .cfc-fn-c, .cfc-base-c, .cfc-bar-hint, .cfc-load-note, .cfc-pop-eff-b { font-size: 13px; }
          .cfc-nest-b, .cfc-nest-note { font-size: 14px; }
          .cfc-nest { padding: 16px 15px; }
          .cfc-nest-core { display: none; }
          .cfc-tap { font-size: 11.5px; }
          .cfc-legend-item, .cfc-term { font-size: 12px; }
          .cfc-faq summary { font-size: 16px; }
          .cfc-faq-a { font-size: 14px; }
          .cfc-mo-dot { display: none; }
        }
        @media (max-width: 560px) {
          .cfc-seg { width: 100%; }
          .cfc-seg button { flex: 1; padding: 11px 6px; font-size: 10.5px; letter-spacing: .5px; }
          .cfc-axis-l { font-size: 8px; letter-spacing: 1px; }
        }

        @media print {
          .cfc-seg, .cfc-back, .cfc-pop { display: none !important; }
          .cfc-fn-shape { display: none; }
        }
      `}</style>

      <div className="s-page" style={{ paddingTop: "48px" }}>
        {/* ══ HERO ══ */}
        <section style={{ marginBottom: "56px" }} className="animate-fade-up">
          <div className="s-eyebrow">Chi fa cosa</div>
          <h1 className="s-h1" style={{ maxWidth: "900px" }}>
            {"Il mio approccio di lavoro, "}
            <em>{"lungo tutto il funnel"}</em>
          </h1>
          <p className="cfc-hero-sub">
            {
              "Una mappa di tutte le aree che tengono in piedi un business online, e di quanto in là si spinge il mio lavoro su ognuna. Dove non arrivo io c'è scritto chi ci arriva, così non restano zone grigie da scoprire al terzo mese."
            }
          </p>
        </section>

        {/* ══ SISTEMA ══ */}
        <section>
          <div className="cfc-bar">
            <div className="cfc-seg" role="tablist" aria-label="Vista">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={view === v.id}
                  data-on={view === v.id ? "1" : "0"}
                  onClick={() => setView(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>
            {view === "percorso" && (
              <div className="cfc-seg" role="tablist" aria-label="Tipo di business">
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
            )}
          </div>
          <p className="cfc-bar-hint">
            {view === "percorso"
              ? `${VIEWS[0].hint}  ·  ${MODES.find((m) => m.id === mode)?.hint}`
              : VIEWS.find((v) => v.id === view)?.hint}
          </p>

          {/* ────────── IL PERCORSO ────────── */}
          {view === "percorso" && (
            <>
              {/* le tre modalità, una dentro l'altra */}
              <div className="cfc-nest" data-lv="1">
                <div className="cfc-nest-h">
                  <EffortIcon id="operativo" />
                  <span className="cfc-nest-t">{EFFORTS[0].label}</span>
                </div>
                <p className="cfc-nest-b">{EFFORTS[0].body}</p>

                <div className="cfc-nest" data-lv="2">
                  <div className="cfc-nest-h">
                    <EffortIcon id="supporto" />
                    <span className="cfc-nest-t">{EFFORTS[1].label}</span>
                  </div>
                  <p className="cfc-nest-b">{EFFORTS[1].body}</p>

                  <div className="cfc-nest" data-lv="3">
                    <div className="cfc-nest-h">
                      <EffortIcon id="consulenziale" />
                      <span className="cfc-nest-t">{EFFORTS[2].label}</span>
                    </div>
                    <p className="cfc-nest-b" style={{ marginBottom: 0 }}>
                      {EFFORTS[2].body}
                    </p>
                    <span className="cfc-nest-core">Il nucleo, sempre presente</span>
                  </div>
                </div>
              </div>
              <p className="cfc-nest-note">{EFFORT_NEST}</p>

              <p className="cfc-tap">
                <Ico n="tap" s={14} />
                {"Tocca una voce per vedere cosa c'è dentro"}
              </p>

              <div className="cfc-axis">
                <span className="cfc-axis-l">Non ti conosce</span>
                <span className="cfc-axis-line" aria-hidden="true" />
                <span className="cfc-axis-l">Cliente che torna</span>
              </div>

              <div className="cfc-fn">
                <svg className="cfc-fn-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polygon
                    points="0,0 100,24 100,76 0,100"
                    fill="rgba(0,255,252,0.035)"
                    stroke="rgba(0,255,252,0.32)"
                    strokeWidth="1"
                    strokeDasharray="5 5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="cfc-fn-cols">
                  {STAGES.map((st) => (
                    <div className="cfc-fn-col" key={st.id}>
                      <div className="cfc-fn-head">
                        <span className="cfc-fn-n">{st.n}</span>
                        <div className="cfc-fn-t">{st.label}</div>
                        <p className="cfc-fn-c">{st.claim}</p>
                      </div>
                      <div className="cfc-fn-pills">
                        {byStage(st.id).map((a) => (
                          <Pill a={a} key={a.id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cfc-base">
                <div className="cfc-base-h">
                  <span className="cfc-base-t">{BASE_STAGE.label}</span>
                  <span className="cfc-base-c">{BASE_STAGE.claim}</span>
                </div>
                <div className="cfc-base-list">
                  {byStage("base").map((a) => (
                    <Pill a={a} key={a.id} big />
                  ))}
                </div>
              </div>

              {/* il limite di tempo, detto qui e approfondito nella terza vista */}
              <div className="cfc-sim">
                <span className="cfc-sim-i">
                  <Ico n="clock" s={15} />
                </span>
                <div>
                  <span className="cfc-sim-l">{SIMULTANEITA.label}</span>
                  <p className="cfc-sim-b" style={{ marginBottom: 0 }}>
                    {SIMULTANEITA.body}
                  </p>
                </div>
              </div>

              {/* quante persone servono: due configurazioni, uno switch */}
              <div className="cfc-set">
                <div className="cfc-set-h">
                  <span className="cfc-base-t">{SETUPS_LABEL}</span>
                  <span className="cfc-base-c">{SETUPS_CLAIM}</span>
                </div>

                <div className="cfc-seg" role="tablist" aria-label="Configurazione">
                  {SETUPS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={setup === s.id}
                      data-on={setup === s.id ? "1" : "0"}
                      onClick={() => setSetup(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {SETUPS.filter((s) => s.id === setup).map((s) => (
                  <div className="cfc-set-body" key={s.id}>
                    <div className="cfc-set-count">{s.count}</div>
                    <p className="cfc-set-when">{s.when}</p>

                    <div className="cfc-crew">
                      {s.people.map((p) => (
                        <div
                          className="cfc-crew-c"
                          key={p.role}
                          data-me={p.me ? "1" : "0"}
                          data-soft={p.soft ? "1" : "0"}
                        >
                          <span className="cfc-crew-i">
                            <Ico n={p.icon} s={20} />
                          </span>
                          <span className="cfc-crew-r">{p.role}</span>
                          <span className="cfc-crew-n">{p.note}</span>
                          {(p.tag || p.me) && (
                            <span className="cfc-crew-tag" data-me={p.me ? "1" : "0"}>
                              {p.me ? "Sempre" : p.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="cfc-set-note">{s.note}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ────────── IL RITMO ────────── */}
          {view === "ritmo" && (
            <>
              {/* ── 1. L'avvio: lineare, una volta sola ── */}
              <div className="cfc-open">
                <div className="cfc-open-side">
                  <span className="cfc-open-ico">
                    <Ico n="flag" s={17} />
                  </span>
                  <span className="cfc-open-badge">{OPENING.badge}</span>
                </div>
                <div className="cfc-open-body">
                  <div className="cfc-open-when">{OPENING.when}</div>
                  <h2 className="s-h2" style={{ fontSize: "26px", marginBottom: "10px" }}>
                    {OPENING.label}
                  </h2>
                  <p className="cfc-open-claim">{OPENING.claim}</p>
                  <ul className="cfc-open-steps">
                    {OPENING.steps.map((s) => (
                      <li className="cfc-tl-step" key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="cfc-need" style={{ marginTop: 0 }}>
                    <span className="cfc-need-l">Cosa serve da te</span>
                    <p className="cfc-need-b">{OPENING.need}</p>
                  </div>
                </div>
              </div>

              <div className="cfc-bridge">
                <span className="cfc-bridge-a" aria-hidden="true" />
                <span className="cfc-bridge-t">{OPENING.bridge}</span>
              </div>

              {/* ── 2. Il ciclo: da lì in poi ogni mese è uguale ── */}
              <div className="cfc-cyc-h">
                <span className="cfc-cyc-ico">
                  <Ico n="loop" s={17} />
                </span>
                <div>
                  <span className="cfc-cyc-badge">Dal mese 2 in poi, ogni mese uguale</span>
                  <h2 className="s-h2" style={{ fontSize: "26px", margin: "6px 0 0" }}>
                    {"Il ciclo mensile"}
                  </h2>
                </div>
              </div>
              <p className="s-subtitle" style={{ marginBottom: "10px" }}>
                {MONTH_INTRO}
              </p>

              <div className="cfc-mo">
                <div className="cfc-mo-rail" aria-hidden="true" />
                <div className="cfc-mo-grid">
                  {MONTH.map((w) => {
                    const soft = w.landsKind === "nota";
                    return (
                      <div className="cfc-mo-col" key={w.n}>
                        <div className="cfc-mo-dot" data-soft={soft ? "1" : "0"} aria-hidden="true" />
                        <div className="cfc-mo-card">
                          <div className="cfc-mo-top">
                            <span className="cfc-mo-badge" data-soft={soft ? "1" : "0"}>
                              <Ico n={w.icon} s={13} />
                            </span>
                            <span className="cfc-mo-n">{`Settimana ${w.n}`}</span>
                          </div>
                          <div className="cfc-mo-t">{w.label}</div>
                          <div className="cfc-mo-call" data-soft={soft ? "1" : "0"}>
                            <Ico n="call" s={12} />
                            {w.call}
                          </div>
                          <p className="cfc-mo-cn">{w.callNote}</p>
                          <ul className="cfc-mo-ops">
                            {w.ops.map((o) => (
                              <li className="cfc-mo-op" key={o}>
                                {o}
                              </li>
                            ))}
                          </ul>
                          <span className="cfc-mo-l" data-k={w.landsKind}>
                            <span className="cfc-mo-lk">
                              {w.landsKind === "milestone"
                                ? "Cosa si porta a casa"
                                : w.landsKind === "nota"
                                ? "Al posto della call"
                                : "A fine settimana"}
                            </span>
                            {w.lands}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* il ritorno: chiude il ciclo su se stesso */}
                <div className="cfc-arc" aria-hidden="true">
                  <span className="cfc-arc-l">
                    <Ico n="loop" s={12} />
                    {"il mese dopo si ricomincia da qui"}
                  </span>
                </div>

                <div className="cfc-cyc-load">
                  <span className="cfc-load-bars" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span className="cfc-load-b" key={n} data-on={n <= CYCLE_LOAD ? "1" : "0"} />
                    ))}
                  </span>
                  <span className="cfc-load-l">Carico di un mese normale</span>
                </div>

                <p className="cfc-mo-note">{MONTH_NOTE}</p>
              </div>

              {/* ── 3. Quando il ciclo cambia passo ── */}
              <h2 className="s-h2" style={{ fontSize: "24px", marginBottom: "8px" }}>
                {"Quando il ciclo cambia passo"}
              </h2>
              <p className="s-subtitle" style={{ marginBottom: "28px" }}>
                {
                  "La forma del mese resta questa. Cambia quanto pesa, e succede in due casi soli."
                }
              </p>
              <div className="cfc-brk">
                {BREAKS.map((b) => (
                  <div className="cfc-tl-card" key={b.label}>
                    <div className="cfc-tl-when">{b.when}</div>
                    <h3 className="s-h3" style={{ fontSize: "20px", marginBottom: "10px" }}>
                      {b.label}
                    </h3>
                    <p className="cfc-tl-claim">{b.claim}</p>
                    <div className="cfc-load">
                      <span className="cfc-load-bars" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span className="cfc-load-b" key={n} data-on={n <= b.load ? "1" : "0"} />
                        ))}
                      </span>
                      <span className="cfc-load-l">Carico</span>
                    </div>
                    <p className="cfc-load-note">{b.note}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <div className="s-divider" style={{ margin: "96px 0 72px" }} />

        {/* ══ FAQ ══ */}
        <section>
          <div className="s-eyebrow">Domande vere</div>
          <h2 className="s-h2" style={{ marginBottom: "32px" }}>
            {"Quello che mi chiedono per iscritto"}
          </h2>
          <div className="cfc-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="cfc-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {/* ══ MODALE ══ */}
      {open && (
        <>
          <button
            type="button"
            className="cfc-back"
            aria-label="Chiudi"
            onClick={close}
          />
          <div className="cfc-pop" role="dialog" aria-modal="true" aria-label={open.title} style={popStyle}>
            <button type="button" className="cfc-pop-x" onClick={close} aria-label="Chiudi">
              {"×"}
            </button>
            <span className="cfc-pop-s">{stageLabel(open.stage)}</span>
            <div className="cfc-pop-h">{open.title}</div>
            <p className="cfc-pop-c">{open.claim}</p>

            <div className="cfc-pop-eff">
              <span className="cfc-pop-eff-i">
                <EffortIcon id={open.effort} />
              </span>
              <span>
                <span className="cfc-pop-eff-t">{effortOf(open.effort).label}</span>
                <span className="cfc-pop-eff-b">{effortOf(open.effort).body}</span>
              </span>
            </div>

            <div className="cfc-terms">
              {open.terms.map((t) => (
                <span className="cfc-term" key={t}>
                  {t}
                </span>
              ))}
            </div>

            <div>
              {ops.map((o, i) => (
                <div className="cfc-op" data-w={o.who} key={`${open.id}-${i}`}>
                  <span className="cfc-mk" data-w={o.who} />
                  <span className="cfc-op-t">{o.t}</span>
                  <span className="cfc-op-meta">
                    <span className="cfc-op-who">{WHO_LABEL[o.who]}</span>
                    <span className="cfc-r" title={RHYTHM_LABEL[o.r]}>
                      {o.r}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {open.need && (
              <div className="cfc-need">
                <span className="cfc-need-l">Cosa serve da te</span>
                <p className="cfc-need-b">{open.need}</p>
              </div>
            )}

            <div className="cfc-legend">
              {(["io", "insieme", "tu", "fuori"] as const).map((w) => (
                <span className="cfc-legend-item" key={w}>
                  <span className="cfc-mk" data-w={w} />
                  {WHO_LABEL[w]}
                </span>
              ))}
              {([1, 2, 3, 4] as Rhythm[]).map((r) => (
                <span className="cfc-legend-item" key={r}>
                  <span className="cfc-r">{r}</span>
                  {RHYTHM_LABEL[r]}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
