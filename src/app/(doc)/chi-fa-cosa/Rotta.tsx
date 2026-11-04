"use client";

import { useEffect, useRef, useState } from "react";
import { DIRECTION, RUMORE, RUMORE_FASI } from "./data";

/* La direzione, fatta vedere: una scena alta con un palco fermo.
   Mentre si scorre, il rumore di un'azienda si mette in colonna sotto i quattro punti
   e quello che non conta adesso va sullo scaffale «aspetta». Con il movimento ridotto
   si vede subito lo stato finale. */

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const tra = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

export default function Rotta() {
  const scena = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const voci = useRef<(HTMLSpanElement | null)[]>([]);
  const nodi = useRef<(HTMLDivElement | null)[]>([]);
  const linea = useRef<SVGPathElement>(null);
  const scaffale = useRef<HTMLDivElement>(null);
  const [fase, setFase] = useState(0);
  const [attivo, setAttivo] = useState(-1);

  useEffect(() => {
    const calma = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seme = 7;
    const r = () => {
      seme = (seme * 9301 + 49297) % 233280;
      return seme / 233280;
    };
    const caos = RUMORE.map(() => ({ x: r(), y: r(), ph: r() * 6.28, sp: 0.4 + r() * 0.6 }));
    let W = 0,
      H = 0,
      dove: { x: number; y: number; w: number; h: number }[] = [],
      L = 0;

    function misura() {
      const c = campo.current;
      if (!c) return;
      W = c.clientWidth;
      H = c.clientHeight;
      const xs = [0, 1, 2, 3].map((i) => W * (0.14 + i * 0.24));
      const ny = H * 0.14;
      const pila = [0, 0, 0, 0];
      let att = 0;
      dove = RUMORE.map(([, a], i) => {
        const el = voci.current[i];
        const w = el?.offsetWidth ?? 80,
          h = el?.offsetHeight ?? 28;
        if (a >= 0) {
          const k = pila[a]++;
          return { x: xs[a] - w / 2, y: ny + 96 + k * (h + 8), w, h };
        }
        const per = Math.max(3, Math.floor((W - 48) / 112)),
          k = att++;
        return { x: 24 + (k % per) * ((W - 48) / per), y: H - 92 - Math.floor(k / per) * (h + 8), w, h };
      });
      nodi.current.forEach((n, i) => {
        if (n) n.style.transform = `translate(${xs[i]}px, ${ny}px)`;
      });
      const p = linea.current;
      if (p) {
        p.setAttribute(
          "d",
          `M ${xs[0]} ${ny + 17} C ${xs[0] + 60} ${ny - 24}, ${xs[1] - 60} ${ny + 58}, ${xs[1]} ${ny + 17} S ${xs[2] - 40} ${ny - 18}, ${xs[2]} ${ny + 17} S ${xs[3] - 50} ${ny + 52}, ${xs[3]} ${ny + 17}`
        );
        L = p.getTotalLength();
        p.style.strokeDasharray = String(L);
      }
    }

    let P = calma ? 1 : 0;
    let fineFase = -1,
      fineAtt = -2,
      raf = 0;
    const t0 = performance.now();

    function disegna(now: number) {
      const t = (now - t0) / 1000;
      const m = ease(tra(P, 0.18, 0.7));
      RUMORE.forEach(([, a], i) => {
        const el = voci.current[i],
          d = dove[i],
          c = caos[i];
        if (!el || !d) return;
        const dx = Math.sin(t * c.sp + c.ph) * 14 * (1 - m),
          dy = Math.cos(t * c.sp * 0.8 + c.ph) * 10 * (1 - m);
        const x0 = c.x * (W - d.w),
          y0 = c.y * (H - d.h);
        el.style.transform = `translate(${x0 + (d.x - x0) * m + dx}px, ${y0 + (d.y - y0) * m + dy}px)`;
        el.style.opacity = String(a < 0 ? 1 - m * 0.5 : 1);
        el.dataset.ok = a >= 0 && m > 0.95 ? "1" : "0";
      });
      const nIn = [0.42, 0.52, 0.62, 0.72];
      nodi.current.forEach((n, i) => {
        if (n) n.style.opacity = String(tra(P, nIn[i], nIn[i] + 0.06));
      });
      if (linea.current) linea.current.style.strokeDashoffset = String(L * (1 - tra(P, 0.5, 0.82)));
      if (scaffale.current) scaffale.current.style.opacity = String(tra(P, 0.6, 0.75));
      const f = P < 0.2 ? 0 : P < 0.42 ? 1 : 2;
      const a = P < 0.42 ? -1 : Math.min(3, Math.floor((P - 0.42) / 0.1));
      if (f !== fineFase) {
        fineFase = f;
        setFase(f);
      }
      if (a !== fineAtt) {
        fineAtt = a;
        setAttivo(calma ? 4 : a);
      }
      if (!calma) raf = requestAnimationFrame(disegna);
    }

    function progresso() {
      const s = scena.current;
      if (!s) return;
      const b = s.getBoundingClientRect(),
        tot = s.offsetHeight - innerHeight;
      P = Math.min(1, Math.max(0, -b.top / Math.max(1, tot)));
    }

    misura();
    addEventListener("resize", misura);
    if (!calma) {
      addEventListener("scroll", progresso, { passive: true });
      progresso();
      raf = requestAnimationFrame(disegna);
    } else disegna(0);
    return () => {
      removeEventListener("resize", misura);
      removeEventListener("scroll", progresso);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rt-scena" ref={scena}>
      <div className="rt-palco">
        <div className="rt-testo">
          <p className="rt-fase" aria-live="polite">
            {RUMORE_FASI[fase]}
          </p>
          <ol className="rt-punti">
            {DIRECTION.points.map((p, i) => (
              <li key={p.t} data-on={attivo >= i ? "1" : "0"}>
                <span className="rt-n">{i + 1}</span>
                <div>
                  <b>{p.t}</b>
                  <p>{p.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rt-campo" ref={campo} aria-hidden="true">
          <svg className="rt-svg">
            <path ref={linea} />
          </svg>
          {DIRECTION.points.map((p, i) => (
            <div
              className="rt-nodo"
              key={p.t}
              ref={(el) => {
                nodi.current[i] = el;
              }}
            >
              <b>{i + 1}</b>
              <span>{p.t}</span>
            </div>
          ))}
          {RUMORE.map(([t, a], i) => (
            <span
              className="rt-voce"
              data-a={a}
              key={t}
              ref={(el) => {
                voci.current[i] = el;
              }}
            >
              {t}
            </span>
          ))}
          <div className="rt-scaffale" ref={scaffale}>
            Aspetta, e c&apos;è scritto perché
          </div>
        </div>
      </div>
    </div>
  );
}
