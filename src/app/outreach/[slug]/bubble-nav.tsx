"use client";

import { useEffect, useState } from "react";

export default function BubbleNav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 80) setVisible(false);
        else setVisible(true);
        setLastY(y);
        ticking = false;
      });
    };
    // capture lastY in closure via ref-like pattern
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <nav
      className="cr-bubble-nav"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
      <div className="cr-bubble-logo">
        <img src="/favicon.png" alt="" width={28} height={28} />
        <span>NS</span>
      </div>
      <div className="cr-bubble-links">
        <a href="#chi-sono">Chi sono</a>
        <a href="#il-progetto">Il progetto</a>
        <a href="#competenze">Competenze</a>
        <a href="#parliamone">Parliamone</a>
      </div>
    </nav>
  );
}
