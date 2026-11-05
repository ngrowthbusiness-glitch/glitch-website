import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/* La sitemap (ticket 11, 2026-11-05). Le date sono quelle dell'ultima modifica vera del contenuto:
   quando una pagina cambia, si aggiorna la sua data qui. Niente new Date(), che dichiarerebbe
   tutte le pagine cambiate a ogni rilascio.
   Fuori: le pagine in redirect (Metodo GLITCH, Perché conoscerci, Risorse, i casi vecchi), /chi-fa-cosa
   (ha come originale /il-metodo) e le pagine outreach, che sono noindex. */
const PAGINE: { path: string; data: string; freq: "weekly" | "monthly" | "yearly"; prio: number }[] = [
  { path: "", data: "2026-11-05", freq: "monthly", prio: 1 },
  { path: "/fractional-cmo", data: "2026-11-05", freq: "monthly", prio: 0.9 },
  { path: "/il-metodo", data: "2026-11-05", freq: "monthly", prio: 0.8 },
  { path: "/blog", data: "2026-04-23", freq: "weekly", prio: 0.8 },
  { path: "/blog/prime-settimane-consulente-marketing", data: "2026-04-17", freq: "yearly", prio: 0.7 },
  { path: "/blog/test-ab-significanza-statistica", data: "2026-04-17", freq: "yearly", prio: 0.7 },
  { path: "/blog/roas-non-e-un-kpi", data: "2026-04-17", freq: "yearly", prio: 0.7 },
  { path: "/blog/domande-consulente-marketing", data: "2026-04-22", freq: "yearly", prio: 0.7 },
  { path: "/privacy-policy", data: "2026-04-23", freq: "yearly", prio: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINE.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: new Date(`${p.data}T00:00:00Z`),
    changeFrequency: p.freq,
    priority: p.prio,
  }));
}
