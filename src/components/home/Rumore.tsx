"use client";

import { useEffect, useRef, useState } from "react";
import Icona from "@/components/Icona";
import { RUMORE, RUMORE_FASI } from "@/app/(doc)/chi-fa-cosa/data";

/* Il rumore, in testa alla home (concept 01 «La rotta»). Lo stesso rumore di Il metodo, ma qui
   non scorre con la pagina: e' un interruttore, «Oggi» e «Con una direzione». Entrato in vista
   passa da solo all'ordine, una volta; poi lo si rigioca a mano. Ogni voce parte un po' dopo
   l'altra. Con il movimento ridotto si vede subito l'ordine, senza transizioni. */

const NODI = ["Capire dove sei", "Decidere cosa conta", "Dire cosa non si fa", "Tenere la rotta"];

type Pos = { x: number; y: number };

export default function Rumore() {
  const campo = useRef<HTMLDivElement>(null);
  const voci = useRef<(HTMLSpanElement | null)[]>([]);
  const [ordine, setOrdine] = useState(false);
  const [mis, setMis] = useState<{ W: number; H: number; caos: Pos[]; dove: Pos[]; xs: number[]; ny: number } | null>(null);
  const toccato = useRef(false);
  /* vivo: dopo la prima misura, cosi' le voci compaiono gia' al loro posto invece di partire dall'angolo */
  const [vivo, setVivo] = useState(false);

  /* le misure: dove sta ogni voce nel caos e nell'ordine */
  useEffect(() => {
    const c = campo.current;
    if (!c) return;
    let seme = 11;
    const r = () => {
      seme = (seme * 9301 + 49297) % 233280;
      return seme / 233280;
    };
    const rnd = RUMORE.map(() => ({ x: r(), y: r() }));
    const misura = () => {
      const W = c.clientWidth,
        H = c.clientHeight;
      const xs = [0, 1, 2, 3].map((i) => W * (0.14 + i * 0.24));
      const ny = 76;
      const pila = [0, 0, 0, 0];
      const caos: Pos[] = [],
        dove: Pos[] = [];
      const presi: { x: number; y: number; w: number; h: number }[] = [];
      /* le voci in attesa vanno a capo come una riga di testo, dal fondo in su */
      const attesa = RUMORE.map(([, a], i) => (a < 0 ? i : -1)).filter((i) => i >= 0);
      const righe: number[][] = [[]];
      let cx = 20;
      attesa.forEach((i) => {
        const w = (voci.current[i]?.offsetWidth ?? 80) + 8;
        if (cx + w > W - 20 && righe[righe.length - 1].length) {
          righe.push([]);
          cx = 20;
        }
        righe[righe.length - 1].push(i);
        cx += w;
      });
      const posAttesa = new Map<number, Pos>();
      righe.forEach((riga, r) => {
        let x = 20;
        riga.forEach((i) => {
          posAttesa.set(i, { x, y: H - 84 - r * 35 });
          x += (voci.current[i]?.offsetWidth ?? 80) + 8;
        });
      });
      RUMORE.forEach(([, a], i) => {
        const el = voci.current[i];
        const w = el?.offsetWidth ?? 80,
          h = el?.offsetHeight ?? 28;
        /* nel caos le voci non si coprono: si prova un posto a caso finche' e' libero */
        let p = { x: 0, y: 0 };
        for (let k = 0; k < 40; k++) {
          const rx = k === 0 ? rnd[i].x : r(),
            ry = k === 0 ? rnd[i].y : r();
          p = { x: 16 + rx * (W - w - 32), y: 60 + ry * (H - h - 110) };
          if (!presi.some((q) => p.x < q.x + q.w + 6 && p.x + w + 6 > q.x && p.y < q.y + q.h + 4 && p.y + h + 4 > q.y)) break;
        }
        presi.push({ ...p, w, h });
        caos.push(p);
        if (a >= 0) {
          const k = pila[a]++;
          dove.push({ x: xs[a] - w / 2, y: ny + 92 + k * (h + 7) });
        } else dove.push(posAttesa.get(i)!);
      });
      setMis({ W, H, caos, dove, xs, ny });
      requestAnimationFrame(() => requestAnimationFrame(() => setVivo(true)));
    };
    misura();
    const ro = new ResizeObserver(misura);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  /* entrato in vista, una volta: dal rumore all'ordine */
  useEffect(() => {
    const c = campo.current;
    if (!c) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setOrdine(true);
      return;
    }
    let t = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        t = window.setTimeout(() => {
          if (!toccato.current) setOrdine(true);
        }, 1600);
      },
      { threshold: 0.5 }
    );
    obs.observe(c);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  function scegli(v: boolean) {
    toccato.current = true;
    setOrdine(v);
  }

  const linea = mis
    ? `M ${mis.xs[0]} ${mis.ny + 17} C ${mis.xs[0] + 60} ${mis.ny - 22}, ${mis.xs[1] - 60} ${mis.ny + 56}, ${mis.xs[1]} ${mis.ny + 17} S ${mis.xs[2] - 40} ${mis.ny - 16}, ${mis.xs[2]} ${mis.ny + 17} S ${mis.xs[3] - 50} ${mis.ny + 50}, ${mis.xs[3]} ${mis.ny + 17}`
    : "";

  return (
    <div className="rm" data-st={ordine ? "ordine" : "caos"} data-pronto={mis ? "1" : "0"} data-vivo={vivo ? "1" : "0"}>
      <div className="rm-seg" role="radiogroup" aria-label="Il marketing di un'azienda">
        <button type="button" role="radio" aria-checked={!ordine} onClick={() => scegli(false)}>
          Oggi
        </button>
        <button type="button" role="radio" aria-checked={ordine} onClick={() => scegli(true)}>
          Con una direzione
        </button>
      </div>
      <div className="rm-campo" ref={campo} aria-hidden="true">
        <svg className="rm-svg" viewBox={mis ? `0 0 ${mis.W} ${mis.H}` : undefined}>
          <path d={linea} pathLength={100} />
        </svg>
        {NODI.map((t, i) => (
          <div className="rm-nodo" key={t} style={{ left: mis ? mis.xs[i] : 0, top: mis ? mis.ny : 0, "--i": i } as React.CSSProperties}>
            <b>{i + 1}</b>
            <span>{t}</span>
          </div>
        ))}
        {RUMORE.map(([t, a], i) => {
          const p = mis ? (ordine ? mis.dove[i] : mis.caos[i]) : { x: 0, y: 0 };
          return (
            <span
              className="rm-voce"
              key={t}
              data-a={a}
              ref={(el) => {
                voci.current[i] = el;
              }}
              style={
                {
                  transform: `translate(${p.x}px, ${p.y}px)`,
                  "--d": ordine ? Math.round((a < 0 ? 0.5 : (a + 1) * 0.14) * 1000 + (i % 5) * 40) : (i % 7) * 30,
                  "--ph": `${-(i * 0.37).toFixed(2)}s`,
                } as React.CSSProperties
              }
            >
              <i>{t}</i>
            </span>
          );
        })}
        <div className="rm-scaffale">
          <Icona n="hourglass" size={13} stroke={2} />
          Aspetta, e c&apos;è scritto perché
        </div>
      </div>
      <p className="rm-fase" key={ordine ? "o" : "c"}>
        {ordine ? RUMORE_FASI[2] : RUMORE_FASI[0]}
      </p>
    </div>
  );
}
