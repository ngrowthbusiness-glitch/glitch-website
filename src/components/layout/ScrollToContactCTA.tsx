"use client";

import { useEffect, useState } from "react";

/**
 * Pillola fissa in basso al CENTRO dello schermo.
 * - Compare dopo il 30% di scroll
 * - Sparisce dopo l'88% (target già visibile, sarebbe ridondante)
 * - Click → scroll smooth all'elemento [data-scroll-target="contact-cta"]
 * - Se nella pagina non esiste il target, il bottone non si attiva mai
 * - Z-index 89 (sotto i float bubbles WhatsApp/Mail che sono 90-91)
 */
export default function ScrollToContactCTA({
  label = "Consulenza gratuita reale",
}: {
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasTarget, setHasTarget] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = document.querySelector('[data-scroll-target="contact-cta"]');
    setHasTarget(!!target);
    if (!target) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? scrollY / total : 0;
        setVisible(pct >= 0.3 && pct <= 0.88);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const target = document.querySelector('[data-scroll-target="contact-cta"]');
    if (!target) return;
    const navH = 64;
    const top =
      (target as HTMLElement).getBoundingClientRect().top +
      window.scrollY -
      navH -
      24;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!mounted || !hasTarget) return null;

  return (
    <>
      <style>{`
        .scta-btn {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translate(-50%, 16px);
          z-index: 89;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 24px;
          background: var(--teal);
          color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px; font-weight: 600;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          border: none; border-radius: 100px;
          cursor: pointer;
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(0,255,252,0.35),
                      0 0 0 1px rgba(0,255,252,0.4) inset;
          white-space: nowrap;
          max-width: calc(100vw - 140px);
        }
        .scta-btn.scta-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }
        .scta-btn:hover {
          transform: translate(-50%, -3px);
          box-shadow: 0 8px 28px rgba(0,255,252,0.55),
                      0 0 0 1px rgba(0,255,252,0.5) inset;
        }
        .scta-btn svg { transition: transform 0.2s; }
        .scta-btn:hover svg { transform: translateY(2px); }

        @media (max-width: 600px) {
          .scta-btn {
            bottom: 22px;
            font-size: 10px;
            letter-spacing: 1.4px;
            padding: 11px 18px;
            gap: 8px;
            max-width: calc(100vw - 130px);
          }
        }
        @media (max-width: 380px) {
          .scta-btn {
            font-size: 9.5px;
            padding: 10px 14px;
            letter-spacing: 1.2px;
          }
        }
      `}</style>
      <button
        type="button"
        className={`scta-btn${visible ? " scta-visible" : ""}`}
        onClick={handleClick}
        aria-label={`Vai a: ${label}`}
        aria-hidden={!visible}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </>
  );
}
