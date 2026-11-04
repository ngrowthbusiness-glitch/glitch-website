"use client";

import { useEffect, useRef, useState } from "react";
import Icona from "@/components/Icona";
import { DIRECTION, RUMORE, RUMORE_FASI } from "./data";

/* La direzione, fatta vedere: una scena alta con un palco fermo.
   Mentre si scorre, il rumore di un'azienda si mette in colonna sotto i quattro punti
   e quello che non conta adesso va sullo scaffale «aspetta». Il progresso segue lo scroll
   con un piccolo ritardo, cosi' il movimento resta liscio anche con la rotellina a scatti;
   ogni voce parte un po' dopo l'altra, come uno stormo e non come un blocco.
   Il disegno gira solo mentre la scena e' in vista. Con il movimento ridotto: stato finale. */

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const back = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const tra = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const FASI_DA = [0, 0.2, 0.42, 0.82];

export default function Rotta() {
  const scena = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLDivElement>(null);
  const voci = useRef<(HTMLSpanElement | null)[]>([]);
  const nodi = useRef<(HTMLDivElement | null)[]>([]);
  const linea = useRef<SVGPathElement>(null);
  const testa = useRef<SVGCircleElement>(null);
  const scaffale = useRef<HTMLDivElement>(null);
  const barre = useRef<(HTMLElement | null)[]>([]);
  const [fase, setFase] = useState(0);
  const [attivo, setAttivo] = useState(-1);

  useEffect(() => {
    const calma = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seme = 7;
    const r = () => {
      seme = (seme * 9301 + 49297) % 233280;
      return seme / 233280;
    };
    /* z = profondita' nel caos (piu' piccola e piu' tenue), d = quanto tardi parte */
    const caos = RUMORE.map(() => ({ x: r(), y: r(), ph: r() * 6.28, sp: 0.4 + r() * 0.6, z: 0.8 + r() * 0.2, d: r() }));
    let W = 0,
      H = 0,
      dove: { x: number; y: number; w: number; h: number }[] = [],
      xs: number[] = [],
      ny = 0,
      L = 0;

    function misura() {
      const c = campo.current;
      if (!c) return;
      W = c.clientWidth;
      H = c.clientHeight;
      xs = [0, 1, 2, 3].map((i) => W * (0.14 + i * 0.24));
      ny = H * 0.14;
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

    let P = calma ? 1 : 0,
      Pd = P,
      fineFase = -1,
      fineAtt = -2,
      raf = 0,
      gira = false,
      prima = performance.now();
    const t0 = prima;

    function disegna(now: number) {
      const dt = Math.min(0.05, (now - prima) / 1000);
      prima = now;
      Pd = calma ? 1 : Pd + (P - Pd) * (1 - Math.exp(-dt * 9));
      if (Math.abs(P - Pd) < 0.0004) Pd = P;
      const t = (now - t0) / 1000;

      RUMORE.forEach(([, a], i) => {
        const el = voci.current[i],
          d = dove[i],
          c = caos[i];
        if (!el || !d) return;
        const da = 0.16 + c.d * 0.12;
        const m = ease(tra(Pd, da, da + 0.42));
        const dx = Math.sin(t * c.sp + c.ph) * 14 * (1 - m),
          dy = Math.cos(t * c.sp * 0.8 + c.ph) * 10 * (1 - m);
        const x0 = c.x * (W - d.w),
          y0 = c.y * (H - d.h);
        const sc = c.z + (1 - c.z) * m;
        const op0 = 0.35 + 0.65 * (c.z - 0.8) * 5;
        el.style.transform = `translate(${x0 + (d.x - x0) * m + dx}px, ${y0 + (d.y - y0) * m + dy}px) scale(${sc})`;
        el.style.opacity = String(op0 + ((a < 0 ? 0.62 : 1) - op0) * m);
        el.dataset.ok = a >= 0 && m > 0.97 ? "1" : "0";
        el.dataset.wait = a < 0 && m > 0.9 ? "1" : "0";
      });

      const nIn = [0.42, 0.52, 0.62, 0.72];
      nodi.current.forEach((n, i) => {
        if (!n) return;
        const k = tra(Pd, nIn[i], nIn[i] + 0.07);
        n.style.opacity = String(Math.min(1, k * 1.6));
        n.style.transform = `translate(${xs[i]}px, ${ny}px)`;
        const b = n.firstElementChild as HTMLElement | null;
        if (b) b.style.transform = `scale(${0.4 + 0.6 * back(k)})`;
      });

      const lp = tra(Pd, 0.5, 0.82);
      if (linea.current && L) {
        linea.current.style.strokeDashoffset = String(L * (1 - lp));
        const h = testa.current;
        if (h) {
          const pt = linea.current.getPointAtLength(L * lp);
          h.setAttribute("cx", String(pt.x));
          h.setAttribute("cy", String(pt.y));
          h.style.opacity = lp > 0.01 && lp < 0.99 ? "1" : "0";
        }
      }
      if (scaffale.current) scaffale.current.style.opacity = String(tra(Pd, 0.6, 0.75));
      barre.current.forEach((b, i) => {
        if (b) b.style.transform = `scaleX(${tra(Pd, FASI_DA[i], FASI_DA[i + 1])})`;
      });

      const f = Pd < 0.2 ? 0 : Pd < 0.42 ? 1 : 2;
      const a = Pd < 0.42 ? -1 : Math.min(3, Math.floor((Pd - 0.42) / 0.1));
      if (f !== fineFase) {
        fineFase = f;
        setFase(f);
      }
      if (a !== fineAtt) {
        fineAtt = a;
        setAttivo(calma ? 4 : a);
      }
      if (gira) raf = requestAnimationFrame(disegna);
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
    if (calma) {
      disegna(performance.now());
      return () => removeEventListener("resize", misura);
    }
    /* il disegno gira solo mentre la scena e' sullo schermo */
    const vista = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !gira) {
        gira = true;
        prima = performance.now();
        raf = requestAnimationFrame(disegna);
      } else if (!e.isIntersecting) {
        gira = false;
        cancelAnimationFrame(raf);
      }
    });
    if (scena.current) vista.observe(scena.current);
    addEventListener("scroll", progresso, { passive: true });
    progresso();
    Pd = P;
    disegna(performance.now());
    return () => {
      vista.disconnect();
      removeEventListener("resize", misura);
      removeEventListener("scroll", progresso);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rt-scena" ref={scena}>
      <div className="rt-palco">
        <div className="rt-testo">
          <div className="rt-barre" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} data-on={fase >= i ? "1" : "0"}>
                <i
                  ref={(el) => {
                    barre.current[i] = el;
                  }}
                />
              </span>
            ))}
          </div>
          <p className="rt-fase" aria-live="polite" key={fase}>
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
            <circle ref={testa} r="5" className="rt-testa" />
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
            <Icona n="hourglass" size={13} stroke={2} />
            Aspetta, e c&apos;è scritto perché
          </div>
        </div>
      </div>
    </div>
  );
}
