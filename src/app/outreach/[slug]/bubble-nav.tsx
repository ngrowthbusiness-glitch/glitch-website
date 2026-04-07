"use client";

import { useEffect, useState, useRef } from "react";

export default function BubbleNav() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY.current && y > 80) setVisible(false);
        else setVisible(true);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "min(92%, 860px)",
        padding: "10px 24px",
        borderRadius: 999,
        background: "rgba(10,14,13,0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(0,255,252,0.10)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src="/favicon.png" alt="" width={28} height={28} style={{ borderRadius: 4 }} />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#e8f0ff",
            letterSpacing: "-0.3px",
          }}
        >
          NS
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {["Chi sono", "Il progetto", "Competenze", "Parliamone"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replace(/ /g, "-")}`}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "1.5px",
              textTransform: "uppercase" as const,
              color: "rgba(232,240,255,0.50)",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
