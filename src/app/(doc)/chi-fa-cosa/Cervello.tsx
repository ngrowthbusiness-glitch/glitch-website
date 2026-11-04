"use client";

import { useEffect, useRef, useState } from "react";
import Icona, { type NomeIcona } from "@/components/Icona";
import { BRAIN } from "./data";

/* Il cervello e io, fatto vedere: una call che diventa piano.
   Il cervello ascolta e sottolinea, scrive task e decisioni sulla pagina del progetto,
   prepara la bozza e ricorda il perché. Poi decido io. Parte quando entra in vista,
   una volta; con il movimento ridotto si vede subito lo stato finale.
   Le due colonne sotto sono il testo vero: si accendono mentre la scena le racconta. */

/* gli istanti della scena, in ms dall'ingresso in vista; il passo s = quanti ne sono passati */
const SEQ = [300, 1000, 1600, 2200, 2900, 3500, 3900, 4200, 4800, 5400, 6100, 6800, 7700, 8500, 9300];
const FINE = SEQ.length;
const RIGA = [1, 2, 3, 4, 5]; // passo in cui compare ogni riga della call
const SEGNO = [2, 5, 6]; // passo in cui il cervello sottolinea le tre frasi che contano
const USCITA = [8, 9, 12]; // passo in cui la riga arriva sulla pagina (prima lo scheletro)
const TESTO = [9, 10, 12]; // passo in cui lo scheletro diventa testo

/* quando si accende ogni voce delle colonne: [da, a) e' "adesso", dopo e' "fatto" */
const AI_ST: [number, number][] = [[1, 7], [7, 11], [11, 12], [12, 13]];
const IO_ST: [number, number][] = [[13, 14], [2, 7], [14, 15], [15, 99]];
const AI_ICO: NomeIcona[] = ["audio-lines", "list-todo", "file-pen-line", "bookmark"];
const IO_ICO: NomeIcona[] = ["signpost", "message-circle", "eye", "target"];

/* altezze dell'onda, arrotondate: server e browser devono scrivere lo stesso numero */
const ONDA = Array.from({ length: 34 }, (_, i) => Math.round((0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75) * 100) / 100);

const fase = (s: number) => (s === 0 ? 0 : s < 7 ? 1 : s < 11 ? 2 : s < 12 ? 3 : s < 13 ? 4 : s < FINE ? 5 : 6);
const stato = (s: number, [a, b]: [number, number]) => (s >= b ? "fatto" : s >= a ? "adesso" : "spento");

export default function Cervello() {
  const box = useRef<HTMLDivElement>(null);
  const ponte = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  const [giro, setGiro] = useState(0);
  const [mis, setMis] = useState({ w: 128, h: 320 });

  /* il ponte si disegna alle misure vere, cosi' le linee non si deformano */
  useEffect(() => {
    const el = ponte.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setMis({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setS(FINE);
      return;
    }
    const timers: number[] = [];
    const parti = () => SEQ.forEach((ms, i) => timers.push(window.setTimeout(() => setS(i + 1), ms)));
    if (giro > 0) {
      parti();
    } else {
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          parti();
        },
        /* parte quando la cima e' entrata di un terzo: vale anche sul telefono, dove il blocco e' piu' alto dello schermo */
      { rootMargin: "0px 0px -33% 0px" }
      );
      io.observe(el);
      return () => {
        io.disconnect();
        timers.forEach(clearTimeout);
      };
    }
    return () => timers.forEach(clearTimeout);
  }, [giro]);

  function rivedi() {
    setS(0);
    setGiro((g) => g + 1);
  }

  const ascolta = s >= 1 && s < 7;
  const pensa = s >= 2 && s < 12;

  return (
    <div className="cv" ref={box} data-s={s}>
      <div className="cv-scena" aria-hidden="true">
        {/* ── la call ── */}
        <div className="cv-pan">
          <div className="cv-head">
            <Icona n="mic" size={16} />
            <b>{BRAIN.call}</b>
            <span className="cv-live" data-on={ascolta ? "1" : "0"}>
              <i />
              {s >= 7 ? "ascoltata" : "in ascolto"}
            </span>
          </div>
          <div className="cv-onda" data-on={ascolta ? "1" : "0"}>
            {Array.from({ length: 34 }, (_, i) => (
              <i key={i} style={{ "--i": i, "--h": ONDA[i] } as React.CSSProperties} />
            ))}
          </div>
          <ol className="cv-righe">
            {BRAIN.righe.map((r, i) => {
              const k = BRAIN.righe.slice(0, i + 1).filter((x) => x.key).length - 1;
              const [pre, post] = r.key ? r.t.split(r.key) : [r.t, ""];
              return (
                <li key={i} data-on={s >= RIGA[i] ? "1" : "0"} data-segno={r.key ? "1" : "0"}>
                  <span className="chi" data-io={r.chi === "Io" ? "1" : "0"}>
                    {r.chi}
                  </span>
                  <p>
                    {pre}
                    {r.key && <mark data-on={s >= SEGNO[k] ? "1" : "0"}>{r.key}</mark>}
                    {post}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── il cervello, in mezzo ── */}
        <div className="cv-ponte" ref={ponte}>
          <svg viewBox={`0 0 ${mis.w} ${mis.h}`}>
            {[0.24, 0.5, 0.76].map((k, i) => {
              const { w, h } = mis,
                y = h * k,
                c = h / 2,
                m = w / 2;
              const sx = `M0 ${y} C ${m * 0.55} ${y}, ${m * 0.5} ${c}, ${m} ${c}`;
              const dx = `M${m} ${c} C ${m * 1.5} ${c}, ${m * 1.45} ${y}, ${w} ${y}`;
              return (
                <g key={i}>
                  <path className="base" d={sx} pathLength={100} />
                  <path className="flusso" data-go={s >= SEGNO[i] ? "1" : "0"} d={sx} pathLength={100} />
                  <path className="base" d={dx} pathLength={100} />
                  <path className="flusso" data-go={s >= USCITA[i] ? "1" : "0"} d={dx} pathLength={100} />
                </g>
              );
            })}
          </svg>
          <div className="cv-nodo" data-on={pensa ? "1" : "0"} data-fine={s >= FINE ? "1" : "0"}>
            <span className="anello" />
            <span className="anello b" />
            <Icona n="brain" size={26} stroke={1.6} />
          </div>
        </div>

        {/* ── la pagina del progetto ── */}
        <div className="cv-pan">
          <div className="cv-head">
            <Icona n="file-text" size={16} />
            <b>{BRAIN.pagina}</b>
            <span className="cv-agg" data-on={s >= USCITA[0] ? "1" : "0"}>
              {s >= FINE ? "aggiornata" : "si aggiorna"}
            </span>
          </div>
          <ul className="cv-uscite">
            {BRAIN.uscite.map((u, i) => {
              const st = s >= TESTO[i] ? "testo" : s >= USCITA[i] ? "scheletro" : "vuoto";
              const timbro = s >= 13 && u.timbro;
              const k = u.tipo === "Memoria" ? "memoria" : !timbro ? "task" : u.timbro === "Aspetta" ? "aspetta" : "adesso";
              return (
                <li key={i} data-st={st} data-k={k}>
                  <span className="tipo">
                    <Icona n={u.tipo === "Memoria" ? "bookmark" : "list-todo"} size={13} stroke={2} />
                    {u.tipo}
                  </span>
                  <div className="corpo">
                    <span className="skel">
                      <i />
                      <i />
                    </span>
                    <p>{u.t}</p>
                    {u.bozza && (
                      <span className="sotto" data-on={s >= 11 ? "1" : "0"} data-ok={s >= 14 ? "1" : "0"}>
                        <Icona n={s >= 14 ? "circle-check" : "file-pen-line"} size={13} stroke={2} />
                        {s >= 14 ? "Bozza controllata da me" : u.bozza}
                      </span>
                    )}
                    {u.perche && (
                      <span className="sotto" data-on={timbro ? "1" : "0"}>
                        <Icona n="hourglass" size={13} stroke={2} />
                        {u.perche}
                      </span>
                    )}
                  </div>
                  {u.timbro && (
                    <span className="timbro" data-on={timbro ? "1" : "0"} data-k={u.timbro === "Aspetta" ? "aspetta" : "adesso"}>
                      {u.timbro === "Aspetta" ? <Icona n="hourglass" size={12} stroke={2.2} /> : <Icona n="check" size={12} stroke={2.6} />}
                      {u.timbro}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="cv-fase" key={fase(s)}>
          {fase(s) > 0 && fase(s) < 6 && <Icona n={fase(s) === 5 ? "user-round" : "sparkle"} size={14} stroke={2} />}
          {BRAIN.fasi[fase(s)]}
        </p>
        <button type="button" className="cv-rivedi" data-on={s >= FINE ? "1" : "0"} onClick={rivedi} tabIndex={-1}>
          <Icona n="rotate-ccw" size={14} stroke={2} />
          Rivedi
        </button>
      </div>

      {/* ── il testo vero, che la scena accende ── */}
      <div className="cv-duo">
        <div className="cv-col">
          <h3>
            <span className="cv-cerv">
              <Icona n="brain" size={16} stroke={2} />
            </span>
            Il cervello AI
          </h3>
          <ul>
            {BRAIN.ai.map((t, i) => (
              <li key={t} data-st={stato(s, AI_ST[i])}>
                <span className="ico">
                  <Icona n={AI_ICO[i]} size={16} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="cv-col io">
          <h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cv-foto" src="/images/nicola.png" alt="" width={30} height={30} loading="lazy" />
            Io
          </h3>
          <ul>
            {BRAIN.io.map((t, i) => (
              <li key={t} data-st={stato(s, IO_ST[i])}>
                <span className="ico">
                  <Icona n={IO_ICO[i]} size={16} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
