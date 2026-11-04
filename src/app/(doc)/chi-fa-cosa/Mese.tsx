"use client";

import { useEffect, useRef, useState } from "react";
import Icona, { type NomeIcona } from "@/components/Icona";
import { MONTH, RIGHELLO, RIGHELLO_LEGENDA, type DayMark, type Week } from "./data";

/* Il ciclo mensile: un righello di quattro settimane allineato alle quattro card.
   Quando entra in vista il giorno corre da 1 a 28, si ferma un attimo sul 14 (la cosa grossa
   chiusa) e accende la settimana su cui passa. Con il movimento ridotto: mese gia' finito. */

const MARK_ICO: Record<DayMark, NomeIcona> = {
  call: "phone",
  online: "send",
  chiusa: "flag",
  nota: "file-pen-line",
  riga: "chart-line",
};
const ARRIVA_ICO: Record<Week["landsKind"], NomeIcona> = {
  consegna: "send",
  milestone: "circle-check",
  nota: "file-pen-line",
  punto: "file-text",
};

const io = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function Mese() {
  const box = useRef<HTMLDivElement>(null);
  const [d, setD] = useState(0); // 0 = non ancora partito; poi giorno con la virgola, da 1 a 28

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setD(28);
      return;
    }
    let raf = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        /* 1 → 14 in 2,6 s, fermo sul 14 per 0,7 s, 14 → 28 in 2,6 s */
        const va = (now: number) => {
          const t = now - t0;
          let g: number;
          if (t < 2600) g = 1 + io(t / 2600) * 13;
          else if (t < 3300) g = 14;
          else g = 14 + io(Math.min(1, (t - 3300) / 2600)) * 14;
          setD(g);
          if (t < 5900) raf = requestAnimationFrame(va);
        };
        raf = requestAnimationFrame(va);
      },
      /* parte quando la cima e' entrata di un terzo: vale anche sul telefono, dove il blocco e' piu' alto dello schermo */
      { rootMargin: "0px 0px -33% 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const parte = d > 0;
  const g = parte ? Math.max(1, Math.floor(d + 0.001)) : 1;
  const sett = Math.min(3, Math.floor((g - 1) / 7));
  const finito = d >= 28;

  return (
    <div className="ms" ref={box} data-parte={parte ? "1" : "0"}>
      <div className="ms-testa">
        <div className="ms-oggi" aria-hidden="true">
          <span>Giorno</span>
          <b>{parte ? g : 1}</b>
          <small>di 28</small>
        </div>
        <ul className="ms-leg">
          {RIGHELLO_LEGENDA.map((l) => (
            <li key={l.k} data-k={l.k}>
              <span className="mk">
                <Icona n={MARK_ICO[l.k]} size={12} stroke={2.2} />
              </span>
              {l.t}
            </li>
          ))}
        </ul>
      </div>

      {/* il righello: quattro tratti da sette giorni, sopra le quattro settimane */}
      <div className="ms-righello" aria-label="Il mese in quattro settimane">
        {MONTH.map((w, wi) => {
          const da = wi * 7 + 1;
          const pieno = !parte ? 0 : Math.min(1, Math.max(0, (d - da + 0.5) / 7));
          return (
            <div className="ms-seg" key={w.n} data-on={!parte || g >= da ? "1" : "0"}>
              <span className="ms-base" aria-hidden="true">
                <i style={{ transform: `scaleX(${parte ? pieno : 1})` }} />
              </span>
              {Array.from({ length: 7 }, (_, k) => {
                const giorno = da + k;
                const m = RIGHELLO[giorno];
                const acceso = !parte || g >= giorno;
                return (
                  <span className="slot" key={giorno} data-on={acceso ? "1" : "0"} data-k={m?.k} data-oggi={parte && !finito && giorno === g ? "1" : "0"}>
                    {m ? (
                      <span className="mk" title={`Giorno ${giorno}: ${m.t}`}>
                        <Icona n={MARK_ICO[m.k]} size={m.k === "chiusa" ? 15 : 12} stroke={2.2} />
                      </span>
                    ) : (
                      <i />
                    )}
                    {m?.k === "chiusa" && <em className="ms-14">Giorno 14</em>}
                  </span>
                );
              })}
              <span className="ms-range" aria-hidden="true">
                giorni {da}-{da + 6}
              </span>
            </div>
          );
        })}
      </div>

      <div className="ms-grid">
        {MONTH.map((w, wi) => (
          <article
            className="ms-sett"
            key={w.n}
            data-on={!parte || g >= wi * 7 + 1 ? "1" : "0"}
            data-now={parte && !finito && sett === wi ? "1" : "0"}
            data-k={w.landsKind}
          >
            <div className="ms-top">
              <span className="ms-ico">
                <Icona n={w.icon} size={20} />
              </span>
              <span className="n">Settimana {w.n}</span>
            </div>
            <h3>{w.label}</h3>
            <span className="call">
              <Icona n="phone" size={14} stroke={2} />
              {w.call}
            </span>
            <p>{w.callNote}</p>
            <div className="ms-arriva" data-k={w.landsKind}>
              <small>
                <Icona n={ARRIVA_ICO[w.landsKind]} size={13} stroke={2.2} />
                {w.when}
              </small>
              {w.lands}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
