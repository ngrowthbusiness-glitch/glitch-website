"use client";

import { useEffect, type RefObject } from "react";

/* Le comparse delle pagine del sito: ogni elemento con data-rv sale quando entra in vista, una volta.
   Si armano solo con JavaScript e senza movimento ridotto (classe rv-on sul contenitore):
   senza, la pagina e' gia' tutta li'. Lo stile sta in globals.css. */
export default function useComparse(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("rv-on");
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = "1";
          obs.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    el.querySelectorAll("[data-rv]").forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [root]);
}
