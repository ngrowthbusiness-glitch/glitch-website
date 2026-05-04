"use client";

import { useEffect, useState } from "react";

/**
 * Hero location/live: 2 righe sotto la box clienti.
 * Riga 1: luogo + coordinate
 * Riga 2: data + ora live con secondi
 * Tick ogni 1s per i secondi che scorrono.
 */
export default function HeroLocationLive() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    // placeholder per evitare layout shift e hydration mismatch
    return <div style={{ minHeight: "44px", width: "100%" }} aria-hidden="true" />;
  }

  const dateShort = now.toLocaleDateString("it-IT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Rome",
  });
  const time = now.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Rome",
  });

  return (
    <div
      style={{
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {/* Riga 1: luogo + coordinate */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: 1.8,
          color: "var(--text-dim)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "var(--text)" }}>Agugliano (AN)</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>43.5°N 13.4°E</span>
      </div>

      {/* Riga 2: data + ora live con secondi */}
      <div
        style={{
          fontSize: 12,
          letterSpacing: 1.6,
          color: "var(--text-dim)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <span>{dateShort}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>
          {time}
        </span>
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--teal)",
            animation: "pulse 2s ease-in-out infinite",
            flexShrink: 0,
            marginLeft: 4,
          }}
        />
        <span style={{ color: "var(--teal)", fontWeight: 500 }}>LIVE</span>
      </div>
    </div>
  );
}
