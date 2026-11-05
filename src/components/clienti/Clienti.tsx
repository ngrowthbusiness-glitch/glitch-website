"use client";

import { useEffect, useRef, useState } from "react";
import ContactCTAButton from "@/components/layout/ContactCTAButton";
import useComparse from "@/components/useComparse";
import { CLIENTI, ESITI, TESTA, TORNA, type Icona } from "./testi";

/* La pagina Clienti, concept «La regia» (scelto da Nicola il 2026-11-05).
   Per ogni cliente la rete delle persone e degli strumenti: «Prima» i fili non si toccano, «Adesso»
   passano tutti dalla regia, e il punto che frena si accende di caldo. Il palco parte da solo la prima
   volta che entra in vista; con il movimento ridotto si vede subito l'adesso. */

/* icone dei nodi: tracciati Lucide (licenza ISC), come in components/Icona.tsx */
const ICO: Record<Icona, string> = {
  persona: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  gruppo:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  megafono:
    '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>',
  modulo:
    '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  fogli:
    '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  ingranaggio:
    '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
  pagina: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  ripeti: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  pacco:
    '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  busta: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  chat: '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
  negozio:
    '<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>',
  sconto:
    '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
  conti: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
};

/* due geometrie: larga (desktop) e stretta e alta (telefono), con le stesse cinque posizioni */
type Geo = { W: number; H: number; c: [number, number]; r: number; sx: number; sparsi: [number, number][]; nodo: number; font: number };
const LARGA: Geo = { W: 560, H: 440, c: [280, 200], r: 150, sx: 1.18, sparsi: [[96, 92], [452, 70], [478, 300], [150, 330], [300, 128]], nodo: 34, font: 13 };
const STRETTA: Geo = { W: 380, H: 500, c: [190, 250], r: 122, sx: 1.05, sparsi: [[78, 96], [300, 82], [306, 330], [92, 372], [196, 206]], nodo: 30, font: 13.5 };
const intorno = (g: Geo) =>
  [0, 1, 2, 3, 4].map((i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [g.c[0] + g.r * Math.cos(a) * g.sx, g.c[1] + g.r * Math.sin(a)] as [number, number];
  });

function Rete({ cur, st, stretta }: { cur: number; st: "prima" | "adesso"; stretta: boolean }) {
  const c = CLIENTI[cur];
  const g = stretta ? STRETTA : LARGA;
  const IN = intorno(g);
  const P = st === "prima" ? g.sparsi : IN;
  const sopra = (i: number) => st === "adesso" && IN[i][1] < g.c[1] - 10;
  return (
    <svg className="rg-mappa" viewBox={`0 0 ${g.W} ${g.H}`} role="img" aria-label={`La rete: ${c.nodi.map((n) => n.t.replace("|", " ")).join(", ")}`}>
      {c.fili.map(([a, b], k) => {
        const [x1, y1] = g.sparsi[a],
          [x2, y2] = g.sparsi[b];
        return <path key={`f${k}`} className="rg-filo" d={`M${x1} ${y1} Q ${(x1 + x2) / 2 + 30} ${(y1 + y2) / 2 - 40} ${x2} ${y2}`} />;
      })}
      {IN.map(([x, y], i) => {
        const dx = x - g.c[0],
          dy = y - g.c[1],
          l = Math.hypot(dx, dy),
          ux = dx / l,
          uy = dy / l;
        return (
          <path
            key={`r${i}`}
            className={`rg-raggio${c.freno?.i === i ? " caldo" : ""}`}
            pathLength={100}
            d={`M${g.c[0] + ux * 50} ${g.c[1] + uy * 50} L${x - ux * (g.nodo + 4)} ${y - uy * (g.nodo + 4)}`}
            style={{ transitionDelay: `${i * 90 + 250}ms` }}
          />
        );
      })}
      <g className="rg-centro" style={{ transformOrigin: `${g.c[0]}px ${g.c[1]}px` }}>
        <circle cx={g.c[0]} cy={g.c[1]} r={46} />
        <text x={g.c[0]} y={g.c[1] + 5}>
          La regia
        </text>
      </g>
      {c.nodi.map((n, i) => {
        const [x, y] = P[i];
        const righe = n.t.split("|");
        const freno = st === "adesso" && c.freno?.i === i;
        /* il cartellino del freno resta dentro il disegno anche vicino ai bordi */
        const larg = 172;
        const cx = Math.min(Math.max(0, IN[i][0] - larg / 2 - 8), g.W - larg - 8) + larg / 2 + 8 - IN[i][0];
        return (
          <g
            key={`${c.id}-${i}`}
            className={`rg-nodo${freno ? " freno" : ""}${sopra(i) ? " su" : ""}`}
            data-p={st === "prima" ? n.p ?? "" : ""}
            style={{ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${i * 70}ms`, ["--su" as string]: `${-(g.nodo * 2 + 32) - (righe.length - 1) * 16}px` }}
          >
            <circle className="alone" r={g.nodo} />
            <circle r={g.nodo} />
            <g className="ico" transform="translate(-12,-12)" dangerouslySetInnerHTML={{ __html: ICO[n.ico] }} />
            <g className="et">
              {righe.map((r, k) => (
                <text key={k} y={g.nodo + 20 + k * 16} style={{ fontSize: g.font }}>
                  {r}
                </text>
              ))}
            </g>
            {/* sul telefono il cartellino non ci sta: il freno resta acceso e lo dice la didascalia */}
            {c.freno?.i === i && !stretta && (
              <g className="cartellino" transform={`translate(${cx},${IN[i][1] < g.c[1] - 10 ? -(g.nodo * 2 + 32) - (righe.length - 1) * 16 - 28 : -(g.nodo + 16)})`}>
                <rect x={-larg / 2} y={-14} width={larg} height={24} rx={12} />
                <text y={3}>{c.freno.t}</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const STILE = `
.rg{--e:cubic-bezier(.2,.7,.2,1);--rimbalzo:cubic-bezier(.34,1.56,.64,1)}
.rg-w{max-width:1200px;margin:0 auto;padding:0 24px}
.rg :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}
.rg-k{font:700 12px/1.3 var(--font-manrope),sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.rg h1{font:800 clamp(38px,5vw,64px)/1.04 var(--font-manrope),sans-serif;letter-spacing:-.035em;color:var(--ink);margin:14px 0 20px;text-wrap:balance}
.rg h2{font:800 clamp(26px,3vw,40px)/1.1 var(--font-manrope),sans-serif;letter-spacing:-.025em;color:var(--ink);text-wrap:balance;margin:0}
.rg p{margin:0}
@keyframes rg-su{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

.rg-testa{padding:64px 0 8px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:end}
.rg-testa-t > *{animation:rg-su .8s var(--e) both}
.rg-testa-t > :nth-child(2){animation-delay:.07s}.rg-testa-t > :nth-child(3){animation-delay:.15s}
.rg-sotto{font-size:clamp(16.5px,1.4vw,18.5px);line-height:1.6;max-width:56ch;color:var(--body)}
.rg-leg{padding:20px 22px;border-radius:20px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:14px;animation:rg-su .8s var(--e) .25s both}
.rg-leg small{font:700 11px/1 var(--font-manrope),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.rg-esito{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start}
.rg-esito b{display:block;font:800 15px/1.3 var(--font-manrope),sans-serif;color:var(--ink)}
.rg-esito p{font-size:14px;line-height:1.5;color:var(--muted)}
.rg-pall{width:14px;height:14px;border-radius:50%;margin-top:3px;background:var(--accent);box-shadow:0 0 0 4px var(--accent-soft)}
.rg-pall.caldo{background:var(--warm);box-shadow:0 0 0 4px var(--warm-soft)}
.rg-nota{font-size:13px;color:var(--muted);border-top:1px dashed var(--line);padding-top:12px}

.rg-palco{margin-top:52px;border-radius:28px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
.rg-schede{display:flex;gap:4px;padding:10px;border-bottom:1px solid var(--line);overflow-x:auto;scrollbar-width:none}
.rg-schede button{flex:1;min-width:150px;display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:12px 14px;border:0;border-radius:14px;background:transparent;color:var(--muted);cursor:pointer;text-align:left;font:600 12.5px/1.3 var(--font-manrope),sans-serif;transition:background .25s,color .25s}
.rg-schede button b{display:flex;align-items:center;gap:8px;font:800 14.5px/1.2 var(--font-manrope),sans-serif;color:var(--ink)}
.rg-schede button i{width:9px;height:9px;border-radius:50%;background:var(--accent)}
.rg-schede button i.caldo{background:var(--warm)}
.rg-schede button:hover{background:var(--soft)}
.rg-schede button[aria-selected="true"]{background:var(--accent-soft);color:var(--body)}
.rg-corpo{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);min-height:560px}
.rg-racc{padding:28px 30px;display:flex;flex-direction:column;gap:6px;border-right:1px solid var(--line)}
.rg-chi{font:700 12px/1.4 var(--font-manrope),sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.rg-passo{display:grid;grid-template-columns:28px 1fr;gap:12px;padding:12px 12px 12px 10px;border-radius:14px;transition:background .45s,opacity .45s}
.rg-passo .n{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font:800 12px/1 var(--font-manrope),sans-serif;background:var(--soft);color:var(--muted);transition:background .45s,color .45s}
.rg-passo h3{font:800 13px/1.2 var(--font-manrope),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin:0 0 4px}
.rg-passo p{font-size:15.5px;line-height:1.55;color:var(--ink)}
.rg-racc[data-st="prima"] .rg-passo[data-f="dopo"],.rg-racc[data-st="adesso"] .rg-passo[data-f="prima"]{opacity:.45}
.rg-racc[data-st="prima"] .rg-passo[data-f="prima"],.rg-racc[data-st="adesso"] .rg-passo[data-f="dopo"]{background:var(--soft)}
.rg-racc[data-st="prima"] .rg-passo[data-f="prima"] .n,.rg-racc[data-st="adesso"] .rg-passo[data-f="dopo"] .n{background:var(--accent);color:var(--accent-ink)}
.rg-tag{align-self:flex-start;margin-top:12px;display:inline-flex;align-items:center;gap:8px;font:800 12px/1 var(--font-manrope),sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:9px 12px;border-radius:999px;background:var(--accent-soft);color:var(--accent);transition:transform .5s var(--rimbalzo),opacity .4s}
.rg-tag.caldo{background:var(--warm-soft);color:var(--warm)}
.rg-racc[data-st="prima"] .rg-tag{opacity:0;transform:scale(.7)}

.rg-rete{position:relative;padding:18px 18px 72px;display:flex;flex-direction:column}
.rg-int{display:inline-flex;align-self:flex-start;padding:3px;border-radius:12px;background:var(--soft);gap:2px;position:relative;z-index:2}
.rg-int button{border:0;background:transparent;color:var(--muted);font:700 13.5px/1 var(--font-manrope),sans-serif;padding:10px 16px;border-radius:9px;cursor:pointer;transition:background .25s,color .25s,box-shadow .25s}
.rg-int button[aria-pressed="true"]{background:var(--surface);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.08)}
.rg-mappa{width:100%;flex:1;min-height:400px;display:block;overflow:visible}
.rg-filo{fill:none;stroke:var(--line);stroke-width:2;stroke-linecap:round;stroke-dasharray:4 9;transition:opacity .5s}
.rg-raggio{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset 1s var(--e)}
.rg-raggio.caldo{stroke:var(--warm);stroke-dasharray:6 7}
.rg-nodo{transition:transform 1s var(--e),opacity .6s}
.rg-nodo circle{fill:var(--surface);stroke:var(--line);stroke-width:2;transition:stroke .5s,fill .5s}
.rg-nodo text{font-weight:800;font-family:var(--font-manrope),sans-serif;fill:var(--ink);text-anchor:middle}
.rg-nodo .ico{fill:none;stroke:var(--muted);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:stroke .5s}
.rg-nodo .et{transition:transform .8s var(--e)}
.rg-nodo.su .et{transform:translateY(var(--su))}
.rg-nodo[data-p="spento"]{opacity:.38}
.rg-nodo[data-p="collo"] circle{stroke:var(--warm);stroke-dasharray:5 5}
.rg-nodo.freno circle{stroke:var(--warm);stroke-width:3;fill:var(--warm-soft)}
.rg-nodo.freno .ico{stroke:var(--warm)}
.rg-nodo .alone{fill:none;stroke:var(--warm);stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center}
.rg-nodo.freno .alone{animation:rg-alone 2.2s var(--e) infinite}
@keyframes rg-alone{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.7)}}
.rg-nodo .cartellino{opacity:0;transition:opacity .4s .5s}
.rg-nodo .cartellino rect{fill:var(--warm)}
.rg-nodo .cartellino text{font-size:11.5px;fill:#fff}
.rg-nodo.freno .cartellino{opacity:1}
.rg-centro{transition:transform .9s var(--rimbalzo),opacity .5s}
.rg-centro circle{fill:var(--accent)}
.rg-centro text{font:800 15px var(--font-manrope),sans-serif;fill:var(--accent-ink);text-anchor:middle}
.rg-rete[data-st="prima"] .rg-centro{opacity:0;transform:scale(.3)}
.rg-rete[data-st="adesso"] .rg-raggio{stroke-dashoffset:0}
.rg-rete[data-st="adesso"] .rg-filo{opacity:0}
.rg-dida{position:absolute;left:22px;right:22px;bottom:22px;display:flex;align-items:flex-start;gap:10px;font:700 14.5px/1.45 var(--font-manrope),sans-serif;color:var(--ink);animation:rg-su .5s var(--e) both}
.rg-dida i{flex-shrink:0;width:8px;height:8px;border-radius:50%;background:var(--muted);margin-top:7px}
.rg-rete[data-st="adesso"] .rg-dida i{background:var(--accent)}

.rg-torna{margin-top:112px;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px}
.rg-torna ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;border-top:1px solid var(--line)}
.rg-torna li{display:grid;grid-template-columns:64px 1fr;gap:16px;padding:24px 0;border-bottom:1px solid var(--line)}
.rg-torna li span{font:800 15px/1 var(--font-manrope),sans-serif;color:var(--accent);padding-top:6px;font-variant-numeric:tabular-nums}
.rg-torna li b{display:block;font:800 clamp(20px,2vw,26px)/1.25 var(--font-manrope),sans-serif;letter-spacing:-.015em;color:var(--ink);margin-bottom:6px}
.rg-torna li p{font-size:15.5px;line-height:1.6;max-width:60ch;color:var(--body)}
.rg-fine{margin-top:112px;padding:72px 0 88px;background:var(--accent-soft)}
.rg-fine .rg-w{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.rg-fine img{width:84px;height:84px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px var(--accent-soft),0 0 0 5px var(--accent)}
.rg-fine .tx{flex:1;min-width:260px}
.rg-fine p{margin-top:10px;font-size:17px;color:var(--ink);max-width:52ch}

@media (max-width:980px){
  .rg-testa{grid-template-columns:1fr;gap:24px;padding-top:40px}
  .rg-corpo{grid-template-columns:1fr}
  .rg-racc{border-right:0;border-bottom:1px solid var(--line);padding:22px 18px}
  .rg-torna{grid-template-columns:1fr;gap:20px}
}
@media (max-width:560px){
  .rg-rete{padding:14px 10px 84px}
  .rg-mappa{min-height:0}
  .rg-dida{left:16px;right:16px;font-size:14px}
  .rg-schede button{min-width:132px}
}
@media (prefers-reduced-motion:reduce){.rg *{animation:none!important;transition:none!important}}
`;

export default function Clienti() {
  const root = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLElement>(null);
  const rete = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [st, setSt] = useState<"prima" | "adesso">("prima");
  const [stretta, setStretta] = useState(false);
  const visto = useRef(false);
  const timer = useRef(0);
  useComparse(root);

  const calma = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gioca = () => {
    clearTimeout(timer.current);
    if (calma()) {
      setSt("adesso");
      return;
    }
    setSt("prima");
    timer.current = window.setTimeout(() => setSt("adesso"), 1700);
  };

  /* la geometria della rete segue la larghezza vera del riquadro */
  useEffect(() => {
    const el = rete.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStretta(e.contentRect.width < 520));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* la prima volta parte quando il palco entra in vista */
  useEffect(() => {
    const el = palco.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || visto.current) return;
        visto.current = true;
        obs.disconnect();
        gioca();
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(timer.current);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  function scegli(i: number) {
    visto.current = true;
    setCur(i);
    gioca();
  }
  function stato(s: "prima" | "adesso") {
    visto.current = true;
    clearTimeout(timer.current);
    setSt(s);
  }

  const c = CLIENTI[cur];
  const caldo = c.esito === "blocco";

  return (
    <div className="rg" ref={root}>
      <style>{STILE}</style>
      <div className="rg-w">
        <section className="rg-testa">
          <div className="rg-testa-t">
            <span className="rg-k">{TESTA.k}</span>
            <h1>{TESTA.titolo}</h1>
            <p className="rg-sotto">{TESTA.sotto}</p>
          </div>
          <aside className="rg-leg" aria-label="Come leggere le schede">
            <small>Come va adesso</small>
            {(["regia", "blocco"] as const).map((e) => (
              <div className="rg-esito" key={e}>
                <span className={`rg-pall${e === "blocco" ? " caldo" : ""}`} />
                <div>
                  <b>{ESITI[e].t}</b>
                  <p>{ESITI[e].b}</p>
                </div>
              </div>
            ))}
            <p className="rg-nota">{TESTA.nota}</p>
          </aside>
        </section>

        <section className="rg-palco" ref={palco} aria-label="Il prima e l'adesso, cliente per cliente">
          <div className="rg-schede" role="tablist" aria-label="Clienti">
            {CLIENTI.map((x, i) => (
              <button key={x.id} type="button" role="tab" aria-selected={i === cur} onClick={() => scegli(i)}>
                <b>
                  <i className={x.esito === "blocco" ? "caldo" : undefined} />
                  {x.tab}
                </b>
                {ESITI[x.esito].t}
              </button>
            ))}
          </div>
          <div className="rg-corpo">
            <div className="rg-racc" data-st={st} role="tabpanel">
              <span className="rg-chi">
                {c.chi} · {c.da}
              </span>
              {[
                ["prima", "Prima", c.prima],
                ["prima", "Cosa mancava", c.mancava],
                ["dopo", "Cosa ho fatto", c.fatto],
                ["dopo", "Adesso", c.adesso],
              ].map(([f, t, p], k) => (
                <div className="rg-passo" data-f={f} key={t}>
                  <span className="n">{k + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{p}</p>
                  </div>
                </div>
              ))}
              <span className={`rg-tag${caldo ? " caldo" : ""}`}>{ESITI[c.esito].t}</span>
            </div>
            <div className="rg-rete" ref={rete} data-st={st}>
              <div className="rg-int" role="group" aria-label="Quando">
                <button type="button" aria-pressed={st === "prima"} onClick={() => stato("prima")}>
                  Prima
                </button>
                <button type="button" aria-pressed={st === "adesso"} onClick={() => stato("adesso")}>
                  Adesso
                </button>
              </div>
              <Rete cur={cur} st={st} stretta={stretta} />
              <p className="rg-dida" key={`${cur}-${st}`}>
                <i />
                {st === "prima" ? c.dPrima : c.dAdesso}
              </p>
            </div>
          </div>
        </section>

        <section className="rg-torna">
          <div>
            <span className="rg-k" data-rv>
              Quello che torna
            </span>
            <h2 style={{ marginTop: 12 }} data-rv>
              {TORNA.titolo}
            </h2>
          </div>
          <ol>
            {TORNA.voci.map((v, i) => (
              <li key={v.b} data-rv style={{ "--i": i } as React.CSSProperties}>
                <span>0{i + 1}</span>
                <div>
                  <b>{v.b}</b>
                  <p>{v.t}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="rg-fine">
        <div className="rg-w">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nicola.png" alt="" width={84} height={84} loading="lazy" />
          <div className="tx">
            <h2>Ti riconosci in una di queste?</h2>
            <p>Mandami un messaggio. Ti dico onestamente se posso aiutarti, o se non ne hai bisogno.</p>
          </div>
          <ContactCTAButton label="Scrivimi" microcopy="Rispondo io, non un modulo." buttonClassName="s-btn-primary" />
        </div>
      </section>
    </div>
  );
}
