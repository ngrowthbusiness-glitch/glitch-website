"use client";

import { useEffect, useRef, useState } from "react";
import Icona from "@/components/Icona";
import { AREAS, EFFORTS, HANDS, type Effort } from "./data";

/* Le mani, in breve: una scala da "le mie mani" a "le mani di altri, il mio controllo".
   Tre livelli, ognuno con il suo segno (pieno, a meta', vuoto) che si riempie quando entra
   in vista, e qualche area d'esempio che si apre con un clic. */

function Glifo({ eff }: { eff: Effort }) {
  return (
    <svg className="mn-glifo" data-eff={eff} viewBox="0 0 44 44" aria-hidden="true">
      <circle className="ring" cx="22" cy="22" r="19" pathLength={100} />
      {eff === "operativo" && <circle className="pieno" cx="22" cy="22" r="13" />}
      {eff === "supporto" && <path className="pieno" d="M22 9 A13 13 0 0 0 22 35 Z" />}
    </svg>
  );
}

export default function Mani({ onOpen, openId }: { onOpen: (id: string, el: HTMLElement) => void; openId: string | null }) {
  const box = useRef<HTMLDivElement>(null);
  /* riposo = come arriva dal server, tutto visibile; pronto = armato, in attesa di entrare in vista */
  const [st, setSt] = useState<"riposo" | "pronto" | "via">("riposo");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSt("pronto");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        setSt("via");
      },
      /* parte quando la cima e' entrata di un terzo: vale anche sul telefono, dove il blocco e' piu' alto dello schermo */
      { rootMargin: "0px 0px -33% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="mn" ref={box} data-st={st}>
      <div className="mn-capi" aria-hidden="true">
        <span>{HANDS.ends[0]}</span>
        <span>{HANDS.ends[1]}</span>
      </div>
      <div className="mn-livelli">
        <span className="mn-binario" aria-hidden="true">
          <i />
        </span>
        {HANDS.levels.map((l, i) => {
          const e = EFFORTS.find((x) => x.id === l.id)!;
          return (
            <div className="mn-liv" key={l.id} data-eff={l.id} style={{ "--i": i } as React.CSSProperties}>
              <Glifo eff={l.id} />
              <span className="mn-nome">{e.label}</span>
              <h3>{l.says}</h3>
              <p>{l.body}</p>
              <div className="mn-aree">
                {l.areas.map((id) => {
                  const a = AREAS.find((x) => x.id === id)!;
                  return (
                    <button
                      type="button"
                      key={id}
                      className="mn-area"
                      data-on={openId === id ? "1" : "0"}
                      aria-haspopup="dialog"
                      onClick={(ev) => onOpen(id, ev.currentTarget)}
                    >
                      {a.short}
                      <Icona n="plus" size={13} stroke={2.2} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
