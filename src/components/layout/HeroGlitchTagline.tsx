"use client";

import { useEffect, useState } from "react";

/**
 * Frase a fianco della pill "Fractional CMO":
 * "Ti aiuto con [PAROLA]" dove [PAROLA] cambia ogni 2s con effetto glitch.
 * Effetto: scramble di 4 frame + flicker + RGB split via pseudo-element.
 */

const WORDS = [
  "Lead Generation",
  "E-commerce",
  "Automazione interna",
  "Email marketing",
  "Crescita aziendale",
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function scramble(target: string): string {
  return Array.from(target)
    .map((c) =>
      c === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
    )
    .join("");
}

export default function HeroGlitchTagline() {
  const [mounted, setMounted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState(WORDS[0]);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const cycle = setInterval(() => {
      const nextIndex = (wordIndex + 1) % WORDS.length;
      const target = WORDS[nextIndex];

      setGlitching(true);
      let frame = 0;
      const totalFrames = 5;
      const frameId = setInterval(() => {
        frame++;
        if (frame < totalFrames) {
          setDisplay(scramble(target));
        } else {
          clearInterval(frameId);
          setDisplay(target);
          setWordIndex(nextIndex);
          // mantieni il glitch wrap per altri 120ms (RGB split residuo)
          setTimeout(() => setGlitching(false), 120);
        }
      }, 55);
    }, 2200);
    return () => clearInterval(cycle);
  }, [mounted, wordIndex]);

  if (!mounted) {
    return (
      <span className="hg-tagline-mount">
        <span className="hg-static">Ti aiuto con</span>
        <span className="hg-dynamic">{WORDS[0]}</span>
      </span>
    );
  }

  return (
    <>
      <style>{`
        .hg-tagline-mount {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.5px;
          color: var(--text);
          line-height: 1;
          flex-wrap: wrap;
        }
        .hg-static {
          color: var(--text-dim);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.8px;
        }
        .hg-dynamic {
          color: var(--teal);
          font-weight: 600;
          position: relative;
          display: inline-block;
          min-width: 1ch;
          font-variant-numeric: tabular-nums;
        }
        .hg-dynamic.glitching {
          animation: hg-shake 0.4s ease;
        }
        .hg-dynamic.glitching::before,
        .hg-dynamic.glitching::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .hg-dynamic.glitching::before {
          color: #ff2bd6;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-1.5px, 0);
          opacity: 0.85;
        }
        .hg-dynamic.glitching::after {
          color: #00fffc;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(1.5px, 0);
          opacity: 0.85;
        }
        @keyframes hg-shake {
          0%, 100% { transform: translate(0); }
          15% { transform: translate(-1px, 1px); }
          30% { transform: translate(1px, -1px); }
          45% { transform: translate(-1.5px, -1px); }
          60% { transform: translate(1px, 1px); }
          75% { transform: translate(-1px, 0); }
        }
        @media (max-width: 480px) {
          .hg-tagline-mount {
            font-size: 12px;
          }
          .hg-static { font-size: 11px; letter-spacing: 1.5px; }
        }
      `}</style>
      <span className="hg-tagline-mount" aria-live="polite">
        <span className="hg-static">Ti aiuto con</span>
        <span
          className={`hg-dynamic${glitching ? " glitching" : ""}`}
          data-text={display}
        >
          {display}
        </span>
      </span>
    </>
  );
}
