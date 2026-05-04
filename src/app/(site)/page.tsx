import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import BrainCompanySection from "@/components/sections/BrainCompanySection";
import HeroLocationLive from "@/components/layout/HeroLocationLive";
import HeroGlitchTagline from "@/components/layout/HeroGlitchTagline";
import ContactCTAButton from "@/components/layout/ContactCTAButton";

/* ───────────────────────────────────────────────────────
   HOMEPAGE — nicolaserrao.com
   Sezioni:
   1. Hero
   2. Fractional CMO (confronto 3 colonne)
   3. Numbers Ticker
   4. Primi 30 giorni (timeline)
   5. Brain Company (AI)
   6. Case Studies + Recensioni (unified carousel)
   9. CTA finale
   + Custom cursor (desktop only)
   + Popup (50% scroll / 15s)
─────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          GLOBAL STYLES
      ══════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Layout ── */
        .hp-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .hp-wrap-narrow {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 60px;
        }
        .hp-section {
          margin-bottom: 120px;
        }

        /* ── Typography helpers ── */
        .hp-eyebrow {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 24px;
        }
        .hp-h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 16px;
        }
        .hp-h2 em { font-style: italic; color: var(--teal); }
        .hp-subtitle {
          font-size: 14px;
          color: var(--text-dim);
          line-height: 1.8;
          max-width: 680px;
        }

        /* ── Divider ── */
        .hp-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 0 0 120px;
        }

        /* ── Buttons ── */
        .hp-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 28px; border-radius: 5px; text-decoration: none;
          transition: opacity 0.2s, transform 0.2s; white-space: nowrap;
        }
        .hp-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .hp-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--teal);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 28px; border-radius: 5px;
          border: 1px solid var(--teal-border); text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s; white-space: nowrap;
        }
        .hp-btn-secondary:hover { background: var(--teal-dim); border-color: var(--teal); transform: translateY(-2px); }

        /* ═══════════════════════════════════
           1. HERO
        ═══════════════════════════════════ */
        .hero-grid {
          position: relative;
          width: 100%;
          max-width: 1400px; margin: 0 auto; padding: 120px 60px 100px;
          display: flex; flex-direction: column;
        }
        .hero-left { display: flex; flex-direction: column; gap: 24px; width: 100%; }
        .hero-h1-wrap { max-width: calc(100% - 260px); }

        .hero-pre {
          font-size: 11px; letter-spacing: 1px;
          color: var(--text-dim); text-transform: uppercase;
        }
        .hero-h1 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(40px, 5.5vw, 68px);
          font-weight: 700; line-height: 1.05; color: var(--text);
        }
        .hero-sub {
          font-size: clamp(14px, 1.6vw, 17px);
          color: var(--text); line-height: 1.7; max-width: 680px;
          font-weight: 400;
        }
        .hero-sub-strong {
          font-size: clamp(16px, 1.9vw, 20px);
          font-weight: 500; line-height: 1.45;
          margin-top: -4px;
        }

        /* Pills */
        .hero-pills-main { display: flex; flex-wrap: wrap; gap: 10px; }
        .hero-pill-teal {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); padding: 7px 16px; border-radius: 5px;
          border: 1px solid rgba(0,255,252,0.5); background: rgba(0,255,252,0.08);
          font-weight: 500;
        }
        .hero-pills-grey { display: flex; flex-wrap: wrap; gap: 8px; }
        .hero-pill-grey {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); padding: 4px 10px; border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
        }

        /* Right column — absolute on desktop (vertically centered), stacks on top in mobile */
        .hero-right {
          position: absolute; top: 50%; right: 60px;
          transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 20px;
        }
        .hero-photo-wrap { position: relative; width: 220px; height: 220px; flex-shrink: 0; }

        /* Live status */
        .hero-status {
          border: 1px solid var(--teal-border); border-radius: 8px;
          background: var(--teal-dim); padding: 12px 18px;
          display: flex; flex-direction: column; gap: 6px; min-width: 200px;
        }
        .hero-status-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: var(--text-dim);
        }
        .hero-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--teal); animation: pulse 2s ease-in-out infinite;
        }
        .hero-status-label {
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--text-faint);
        }

        /* ═══════════════════════════════════
           2. FRACTIONAL CMO — asymmetric layout
           Left: FCMO main (large, with bullets)
           Right: Agenzia + Dipendente stacked
        ═══════════════════════════════════ */
        .fcmo-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 20px;
          margin-top: 40px;
          align-items: stretch;
        }
        .fcmo-col {
          border-radius: 10px; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .fcmo-col-main { grid-column: 1; padding: 40px 36px; }
        .fcmo-side-stack {
          grid-column: 2;
          display: flex; flex-direction: column; gap: 20px;
        }
        .fcmo-col-side-1, .fcmo-col-side-2 {
          flex: 1; padding: 24px 22px;
        }
        .fcmo-col-side-1 .fcmo-col-icon svg,
        .fcmo-col-side-2 .fcmo-col-icon svg { width: 36px; height: 36px; }
        .fcmo-col-side-1 .fcmo-col-title,
        .fcmo-col-side-2 .fcmo-col-title { font-size: 15px; }
        .fcmo-col-side-1 .fcmo-col-body,
        .fcmo-col-side-2 .fcmo-col-body { font-size: 12px; line-height: 1.7; }
        .fcmo-col-main .fcmo-col-title { font-size: 24px; }
        .fcmo-col-main .fcmo-col-body { font-size: 14px; }
        .fcmo-bullets {
          list-style: none; padding: 0; margin: 6px 0 0 0;
          display: flex; flex-direction: column; gap: 12px;
        }
        .fcmo-bullets li {
          font-size: 13px; color: var(--text); line-height: 1.55;
          padding-left: 26px; position: relative;
        }
        .fcmo-bullets li::before {
          content: ""; position: absolute; left: 0; top: 5px;
          width: 14px; height: 14px; border-radius: 50%;
          background: rgba(0,255,252,0.15);
          border: 1px solid var(--teal);
        }
        .fcmo-bullets li::after {
          content: ""; position: absolute; left: 4px; top: 9px;
          width: 6px; height: 3px;
          border-left: 1.5px solid var(--teal);
          border-bottom: 1.5px solid var(--teal);
          transform: rotate(-45deg);
        }
        .fcmo-bullets strong { color: var(--text); font-weight: 600; }

        /* Carosello esempi sotto le 3 colonne FCMO */
        .fcmo-cases-wrap {
          margin-top: 56px;
          position: relative;
        }
        .fcmo-cases-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px; margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .fcmo-cases-eyebrow {
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--teal);
          margin-bottom: 8px;
          display: flex; align-items: center; gap: 12px;
        }
        .fcmo-cases-eyebrow::before {
          content: ""; width: 22px; height: 1px;
          background: var(--teal); opacity: 0.55;
        }
        .fcmo-cases-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700; color: var(--text);
          line-height: 1.25; margin: 0;
          max-width: 600px;
        }
        .fcmo-cases-nav {
          display: flex; gap: 8px;
        }
        .fcmo-cases-nav button {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid var(--teal-border);
          background: transparent;
          color: var(--teal);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .fcmo-cases-nav button:hover {
          background: var(--teal-dim);
          border-color: var(--teal);
          transform: translateY(-2px);
        }
        .fcmo-cases-track {
          display: flex; gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-padding: 0 4px;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 12px;
          scrollbar-width: thin;
          scrollbar-color: var(--teal-border) transparent;
        }
        .fcmo-cases-track::-webkit-scrollbar { height: 6px; }
        .fcmo-cases-track::-webkit-scrollbar-track { background: transparent; }
        .fcmo-cases-track::-webkit-scrollbar-thumb {
          background: var(--teal-border); border-radius: 3px;
        }
        .fcmo-case {
          flex: 0 0 360px;
          scroll-snap-align: start;
          border: 1px solid rgba(0,255,252,0.18);
          border-radius: 12px;
          padding: 28px 26px;
          background: rgba(0,255,252,0.03);
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .fcmo-case:hover {
          border-color: rgba(0,255,252,0.45);
          background: rgba(0,255,252,0.07);
          transform: translateY(-2px);
        }
        .fcmo-case-tag {
          font-size: 10px; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--teal);
          padding: 4px 10px;
          border: 1px solid var(--teal-border);
          border-radius: 4px;
          background: var(--teal-dim);
          width: fit-content;
          font-weight: 600;
        }
        .fcmo-case-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px; font-weight: 700;
          color: var(--text); line-height: 1.3;
        }
        .fcmo-case-scenario {
          font-size: 13.5px; color: var(--text);
          line-height: 1.6;
          flex: 1;
        }
        .fcmo-case-action {
          font-size: 12px; color: var(--teal);
          letter-spacing: 0.5px;
          padding-top: 14px;
          border-top: 1px solid rgba(0,255,252,0.12);
          font-weight: 500;
          margin-top: auto;
        }
        .fcmo-col-dim {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .fcmo-col-teal {
          border: 1px solid rgba(0,255,252,0.3);
          background: rgba(0,255,252,0.04);
          box-shadow: 0 0 40px rgba(0,255,252,0.06);
        }
        .fcmo-col-icon {
          margin-bottom: 8px; opacity: 0.9;
        }
        .fcmo-col-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px; font-weight: 700; line-height: 1.2;
        }
        .fcmo-col-dim .fcmo-col-title { color: var(--text-dim); }
        .fcmo-col-teal .fcmo-col-title { color: var(--teal); }
        .fcmo-col-body {
          font-size: 13px; line-height: 1.8;
        }
        .fcmo-col-dim .fcmo-col-body { color: var(--text-faint); }
        .fcmo-col-teal .fcmo-col-body { color: var(--text-dim); }
        .fcmo-col-verdict {
          font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          margin-top: auto; padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .fcmo-col-dim .fcmo-col-verdict { color: rgba(255,100,100,0.6); }
        .fcmo-col-teal .fcmo-col-verdict { color: var(--teal); }
        /* ═══════════════════════════════════
           3. NUMBERS TICKER
        ═══════════════════════════════════ */
        .ticker-wrap {
          overflow: hidden; border-top: 1px solid var(--teal-border);
          border-bottom: 1px solid var(--teal-border);
          padding: 20px 0; margin-bottom: 120px;
        }
        .ticker-track {
          display: flex; gap: 60px; width: max-content;
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-item {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; color: var(--text-dim); white-space: nowrap;
          flex-shrink: 0;
        }
        .ticker-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: var(--teal);
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ═══════════════════════════════════
           4. PRIMI 30 GIORNI — Mese 1 + Pixel Flow + Mese 2-3
        ═══════════════════════════════════ */
        .tl-month-flow {
          display: flex;
          align-items: stretch;
          gap: 0;
          margin-top: 32px;
          position: relative;
        }
        .tl-month-box {
          flex: 1;
          border: 1px solid rgba(0,255,252,0.18);
          border-radius: 14px;
          padding: 32px 28px;
          background: rgba(0,255,252,0.03);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .tl-month-1 {
          background: rgba(0,255,252,0.06);
          border-color: rgba(0,255,252,0.4);
          box-shadow: 0 0 40px rgba(0,255,252,0.05);
        }
        .tl-month-2 {
          background: rgba(0,255,252,0.02);
          border-color: rgba(0,255,252,0.18);
        }
        .tl-month-header {
          display: flex; align-items: center; gap: 14px;
          flex-wrap: wrap;
        }
        .tl-month-period {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); font-weight: 600;
          padding: 5px 11px;
          border: 1px solid var(--teal-border);
          border-radius: 4px;
          background: var(--teal-dim);
        }
        .tl-month-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          color: var(--text); line-height: 1.25;
        }
        .tl-activities {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 14px;
        }
        .tl-activity {
          display: flex; gap: 14px; align-items: flex-start;
        }
        .tl-activity-icon {
          flex-shrink: 0;
          width: 34px; height: 34px;
          border-radius: 7px;
          background: rgba(0,255,252,0.08);
          border: 1px solid rgba(0,255,252,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
        }
        .tl-activity-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .tl-activity-title {
          font-size: 14px; font-weight: 600;
          color: var(--text); line-height: 1.3;
        }
        .tl-activity-desc {
          font-size: 13px; color: var(--text);
          line-height: 1.55; opacity: 0.85;
        }

        /* Pixel flow animation tra i 2 mesi */
        .tl-pixel-flow {
          width: 90px; flex-shrink: 0;
          position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .tl-pixel-flow::before {
          content: ""; position: absolute;
          top: 50%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, var(--teal-border), var(--teal), var(--teal-border));
          opacity: 0.3;
        }
        .tl-pixel {
          position: absolute;
          width: 4px; height: 4px;
          background: var(--teal);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--teal);
          animation: tl-pixel-fly 2.6s linear infinite;
        }
        @keyframes tl-pixel-fly {
          0%   { transform: translateX(-40px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(50px); opacity: 0; }
        }

        /* ═══════════════════════════════════
           6. UNIFIED CASE STUDIES CAROUSEL
        ═══════════════════════════════════ */
        .uc-stage {
          position: relative;
          height: 520px;
          overflow: visible;
          margin-top: 40px;
        }
        .uc-track {
          position: relative;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .uc-card {
          position: absolute;
          width: 500px; max-width: 90vw;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 32px 28px; background: rgba(12,16,15,0.95);
          display: flex; flex-direction: column; gap: 14px;
          transition: all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }
        .uc-card.uc-center {
          transform: translateX(-50%) scale(1);
          left: 50%; opacity: 1; z-index: 4;
          border-color: rgba(0,255,252,0.3);
          box-shadow: 0 0 60px rgba(0,255,252,0.1), 0 0 120px rgba(0,255,252,0.04);
        }
        .uc-card.uc-left {
          transform: translateX(calc(-50% - 480px)) scale(0.85);
          left: 50%; opacity: 0.3; z-index: 2;
        }
        .uc-card.uc-right {
          transform: translateX(calc(-50% + 480px)) scale(0.85);
          left: 50%; opacity: 0.3; z-index: 2;
        }
        .uc-card.uc-exit-left {
          transform: translateX(calc(-50% - 900px)) scale(0.7);
          left: 50%; opacity: 0; z-index: 0; pointer-events: none;
        }
        .uc-card.uc-exit-right {
          transform: translateX(calc(-50% + 900px)) scale(0.7);
          left: 50%; opacity: 0; z-index: 0; pointer-events: none;
        }
        /* Gradient overlay for side cards */
        .uc-card.uc-left::after,
        .uc-card.uc-right::after {
          content: ''; position: absolute; inset: 0; border-radius: 12px;
          pointer-events: none;
        }
        .uc-card.uc-left::after {
          background: linear-gradient(90deg, rgba(10,14,13,0.8), transparent);
        }
        .uc-card.uc-right::after {
          background: linear-gradient(-90deg, rgba(10,14,13,0.8), transparent);
        }
        /* Card inner elements */
        .uc-top-row {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;
        }
        .uc-badges { display: flex; flex-wrap: wrap; gap: 6px; }
        .uc-badge {
          font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); border: 1px solid var(--teal-border);
          padding: 3px 8px; border-radius: 3px; background: var(--teal-dim);
        }
        .uc-kpi {
          text-align: right; flex-shrink: 0;
        }
        .uc-kpi-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 32px; font-weight: 700; color: var(--teal); line-height: 1;
        }
        .uc-kpi-sub {
          font-size: 10px; color: var(--text-dim); margin-top: 2px;
        }
        .uc-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text);
        }
        .uc-quote {
          font-size: 13px; color: var(--text); line-height: 1.8;
          font-style: italic; padding-left: 16px;
          border-left: 2px solid rgba(0,255,252,0.4);
        }
        .uc-strategy-label {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--teal); font-weight: 600; margin-bottom: -8px;
        }
        .uc-strategy {
          font-size: 12px; color: var(--text-dim); line-height: 1.8;
        }
        .uc-metrics-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
        }
        .uc-metric-box {
          border: 1px solid rgba(255,255,255,0.06); border-radius: 6px;
          padding: 10px 8px; background: rgba(255,255,255,0.02);
          text-align: center;
        }
        .uc-metric-val {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--teal); line-height: 1.2;
        }
        .uc-metric-lbl {
          font-size: 9px; color: var(--text-dim); margin-top: 4px; line-height: 1.3;
        }
        .uc-link {
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); text-decoration: none; opacity: 0.8;
          transition: opacity 0.2s;
        }
        .uc-link:hover { opacity: 1; }
        /* Navigation */
        .uc-nav {
          display: flex; justify-content: center; align-items: center;
          gap: 16px; margin-top: 28px;
        }
        .uc-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: var(--text-dim); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .uc-arrow:hover {
          border-color: var(--teal-border); color: var(--teal);
          background: var(--teal-dim);
        }
        .uc-dots {
          display: flex; align-items: center; gap: 8px;
        }
        .uc-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.12); transition: all 0.3s;
          border: none; cursor: pointer; padding: 0;
        }
        .uc-dot[data-active="true"] {
          background: var(--teal); width: 22px; border-radius: 4px;
          box-shadow: 0 0 8px rgba(0,255,252,0.4);
        }

        /* ═══════════════════════════════════
           9. CTA FINALE
        ═══════════════════════════════════ */
        .hp-cta {
          border: 1px solid var(--teal-border); border-radius: 10px;
          padding: 56px 48px; background: var(--teal-dim);
          text-align: center; position: relative; overflow: hidden;
        }
        .hp-cta::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,252,0.06), transparent);
          pointer-events: none;
        }

        /* ═══════════════════════════════════
           POPUP
        ═══════════════════════════════════ */
        .hp-popup-overlay {
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.4s;
          pointer-events: none;
        }
        .hp-popup-overlay.visible {
          opacity: 1; pointer-events: auto;
        }
        .hp-popup-card {
          background: var(--bg, #0a0e0d); border: 1px solid var(--teal-border);
          border-radius: 12px; padding: 48px 40px; max-width: 480px; width: 90%;
          position: relative; text-align: center;
          transform: translateY(20px) scale(0.96);
          transition: transform 0.4s cubic-bezier(.25,.46,.45,.94);
        }
        .hp-popup-overlay.visible .hp-popup-card {
          transform: translateY(0) scale(1);
        }
        .hp-popup-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: var(--text-dim); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .hp-popup-close:hover {
          border-color: var(--teal-border); color: var(--teal);
        }
        .hp-popup-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; color: var(--text);
          margin-bottom: 8px;
        }
        .hp-popup-subtitle {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--teal);
          margin-bottom: 16px;
        }
        .hp-popup-body {
          font-size: 14px; color: var(--text-dim); line-height: 1.8;
          margin-bottom: 28px;
        }

        /* ═══════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 1200px) {
          .hero-grid { gap: 48px; }
          .uc-card { width: 420px; }
          .uc-card.uc-left { transform: translateX(calc(-50% - 380px)) scale(0.85); }
          .uc-card.uc-right { transform: translateX(calc(-50% + 380px)) scale(0.85); }
        }
        @media (max-width: 900px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 32px; }
          .hero-grid {
            padding: 140px 24px 64px;
            gap: 26px; text-align: center;
            justify-content: flex-start;
          }
          .hero-h1-wrap { max-width: 100%; }
          .hero-left { align-items: center; }
          .hero-right {
            position: static;
            transform: none;
            order: -1; flex-direction: row; align-items: center; justify-content: center; gap: 20px;
          }
          .hero-photo-wrap { width: 120px !important; height: 120px !important; }
          .hero-pills-main, .hero-pills-grey { justify-content: center; }
          .hero-sub { margin-left: auto; margin-right: auto; }
          /* FCMO mobile: 2 elementi swipeable centrati
             — Card 1: Fractional CMO main
             — Card 2: side-stack con Agenzia + Dipendente in colonna */
          .fcmo-grid {
            display: flex !important;
            grid-template-columns: none;
            grid-template-rows: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-snap-stop: always;
            -webkit-overflow-scrolling: touch;
            gap: 14px;
            padding-bottom: 12px;
            margin-left: -32px;
            margin-right: -32px;
            padding-left: 6vw;
            padding-right: 6vw;
            scrollbar-width: thin;
            scrollbar-color: var(--teal-border) transparent;
            align-items: stretch;
          }
          .fcmo-grid::-webkit-scrollbar { height: 4px; }
          .fcmo-grid::-webkit-scrollbar-thumb { background: var(--teal-border); border-radius: 2px; }
          .fcmo-col-main, .fcmo-side-stack {
            grid-column: auto !important;
            grid-row: auto !important;
            flex: 0 0 88vw;
            max-width: 88vw;
            scroll-snap-align: center;
            min-width: 0;
          }
          .fcmo-col-main { padding: 30px 24px; }
          .fcmo-side-stack {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .fcmo-col-side-1, .fcmo-col-side-2 {
            flex: 1;
            padding: 22px 20px;
          }
          .fcmo-col-main .fcmo-col-title { font-size: 22px; }
          .fcmo-col-side-1 .fcmo-col-title,
          .fcmo-col-side-2 .fcmo-col-title { font-size: 17px; }
          .fcmo-bullets li { font-size: 13px; }

          /* CasesCarousel: forza overflow hidden per evitare scroll laterale */
          .uc-stage { overflow: hidden; }
          .tl-month-flow { flex-direction: column; gap: 0; }
          .tl-pixel-flow {
            width: 100%; height: 80px; padding: 0;
          }
          .tl-pixel-flow::before {
            top: 0; bottom: 0; left: 50%; right: auto;
            width: 1px; height: 100%;
            background: linear-gradient(180deg, var(--teal-border), var(--teal), var(--teal-border));
          }
          .tl-pixel { animation-name: tl-pixel-fly-vert; }
          @keyframes tl-pixel-fly-vert {
            0%   { transform: translate(-50%, -30px); opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { transform: translate(-50%, 50px); opacity: 0; }
          }
          .tl-month-box { padding: 26px 22px; }
          .tl-month-title { font-size: 20px; }
          .fcmo-cases-nav { display: none; }
          .fcmo-case { flex: 0 0 290px; padding: 24px 22px; }
          .fcmo-case-title { font-size: 17px; }
          /* Recensioni 3 card → slider orizzontale su mobile */
          .reviews-grid-3 {
            grid-template-columns: none !important;
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 12px !important;
            margin-left: -32px;
            margin-right: -32px;
            padding: 0 32px 10px !important;
            scrollbar-width: thin;
            scrollbar-color: var(--teal-border) transparent;
          }
          .reviews-grid-3::-webkit-scrollbar { height: 4px; }
          .reviews-grid-3::-webkit-scrollbar-thumb { background: var(--teal-border); border-radius: 2px; }
          .reviews-grid-3 > * {
            flex: 0 0 86% !important;
            scroll-snap-align: start;
            min-width: 0;
          }
          /* Cases carousel mobile: tutte le card swipeable, prima card centrata */
          .uc-stage {
            height: auto; min-height: auto;
            overflow: hidden;
            margin-left: -32px;
            margin-right: -32px;
            margin-top: 24px;
          }
          .uc-track {
            display: flex !important;
            flex-direction: row;
            position: relative;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-snap-stop: always;
            scroll-padding-inline: 6vw;
            -webkit-overflow-scrolling: touch;
            gap: 14px;
            padding: 0 6vw 14px;
            scrollbar-width: thin;
            scrollbar-color: var(--teal-border) transparent;
            height: auto;
            align-items: stretch;
            justify-content: flex-start;
          }
          .uc-track::-webkit-scrollbar { height: 4px; }
          .uc-track::-webkit-scrollbar-thumb { background: var(--teal-border); border-radius: 2px; }
          .uc-card {
            position: relative !important;
            left: auto !important;
            transform: none !important;
            opacity: 1 !important;
            display: flex !important;
            flex: 0 0 88vw !important;
            max-width: 88vw !important;
            width: auto !important;
            scroll-snap-align: start;
            box-shadow: none !important;
          }
          .uc-card.uc-left::after,
          .uc-card.uc-right::after { display: none; }
          /* Nascondi navigation buttons e dots: lo swipe touch è nativo */
          [data-uc-nav], .uc-dots, .uc-nav-btn { display: none !important; }
          .uc-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .brain-svg-wrap { min-height: 280px; }
          .brain-svg-container { width: 260px; height: 260px; }

          /* ── Typography upgrade tablet/mobile ── */
          .hp-section { margin-bottom: 80px; }
          .hp-divider { margin-bottom: 80px; }
          .hero-pre        { font-size: 12px; }
          .hero-h1         { font-size: clamp(32px, 7.5vw, 44px); line-height: 1.08; letter-spacing: -0.5px; }
          .hero-sub        { font-size: clamp(15px, 2vw, 17px); max-width: 360px; margin-left: auto; margin-right: auto; }
          .hero-sub-strong { font-size: clamp(16px, 4.6vw, 20px); max-width: 320px; line-height: 1.4; }
          .hero-pill-teal  { font-size: 11px; padding: 7px 14px; }
          .hero-pill-grey  { font-size: 10px; padding: 5px 11px; }
          .hp-eyebrow      { font-size: 11px; letter-spacing: 3px; }
          .hp-h2           { font-size: clamp(28px, 5.5vw, 42px); }
          .hp-subtitle     { font-size: 15px; line-height: 1.7; }
          .hp-btn-primary,
          .hp-btn-secondary { font-size: 12px; letter-spacing: 1.8px; padding: 14px 24px; }
          .fcmo-col-title  { font-size: 19px; }
          .fcmo-col-body   { font-size: 14px; line-height: 1.75; }
          .fcmo-col-verdict { font-size: 12px; }
          .ticker-value    { font-size: 20px; }
          .ticker-item     { font-size: 14px; }
          .brain-note          { font-size: 13px; }
          .uc-title        { font-size: 18px; }
          .uc-quote        { font-size: 14px; }
          .uc-strategy     { font-size: 13px; }
          .uc-strategy-label { font-size: 11px; }
          .uc-badge        { font-size: 11px; }
        }
        @media (max-width: 480px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 20px; }
          .hero-grid { padding: 40px 20px 48px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions a { justify-content: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; font-size: 13px; padding: 16px 20px; }
          .tl-pixel-flow { height: 60px; }
          .tl-month-period { font-size: 9px; }

          /* ── Typography mobile-first ── */
          .hero-pre        { font-size: 11px; letter-spacing: 1.5px; }
          .hero-h1         { font-size: clamp(28px, 8vw, 38px); line-height: 1.1; }
          .hero-sub        { font-size: 15px; }
          .hero-grid       { padding: 120px 20px 56px; }
          .hero-pill-teal  { font-size: 11px; padding: 6px 14px; }
          .hero-pill-grey  { font-size: 10px; }
          .hp-eyebrow      { font-size: 11px; letter-spacing: 2.5px; }
          .hp-h2           { font-size: clamp(26px, 7.5vw, 34px); line-height: 1.2; }
          .hp-subtitle     { font-size: 14px; }
          .fcmo-col-title  { font-size: 18px; }
          .fcmo-col-body   { font-size: 14px; }
          .ticker-value    { font-size: 19px; }
          .uc-title        { font-size: 17px; }
          .uc-quote        { font-size: 14px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          CUSTOM CURSOR (desktop only, injected via script)
      ══════════════════════════════════════════════════════ */}
      {/* cursor is now in layout.tsx */}

      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center">
        <div className="hero-grid">
          {/* ── Left ── */}
          <div className="hero-left">
            <div className="hero-pre">Per aziende B2B, E-commerce e Startup</div>

            <div className="hero-h1-wrap">
              <h1 className="hero-h1">
                Il mio lavoro &egrave; portare<br />
                <span style={{ color: "var(--teal)" }}>crescita nelle aziende.</span>
              </h1>
            </div>

            <p className="hero-sub hero-sub-strong">
              Un <strong style={{ color: "var(--teal)", fontWeight: 600 }}>direttore marketing senior</strong> nella tua azienda, senza assumerlo: strategia, numeri e responsabilit&agrave; piena sui risultati, a una <strong style={{ color: "var(--text)", fontWeight: 600 }}>frazione del costo di un&apos;agenzia</strong>.
            </p>

            {/* Teal pills + glitch tagline */}
            <div className="hero-pills-main">
              <span className="hero-pill-teal">Fractional CMO</span>
              <HeroGlitchTagline />
            </div>

            {/* Grey pills */}
            <div className="hero-pills-grey">
              {["E-commerce", "B2B Lead Gen", "Growth", "Revenue Strategy", "CRO"].map((tag) => (
                <span key={tag} className="hero-pill-grey">{tag}</span>
              ))}
            </div>

            {/* CTA universale */}
            <div className="hero-actions">
              <ContactCTAButton
                buttonClassName="hp-btn-primary"
                microcopy="Sempre un forte piacere conoscere nuovi contesti."
              />
            </div>
          </div>

          {/* ── Right ── */}
          <div className="hero-right">
            <div className="hero-photo-wrap">
              <div className="absolute rounded-full" style={{ inset: "-3px", background: "conic-gradient(var(--teal) 0deg, transparent 120deg, var(--teal) 240deg, transparent 360deg)", animation: "spin 6s linear infinite", opacity: 0.5 }} />
              <div className="absolute rounded-full" style={{ inset: "3px", background: "var(--bg)", zIndex: 1 }} />
              <Image src="/images/nicola.png" alt="Nicola Serrao" width={208} height={208} priority className="absolute rounded-full object-cover object-top" style={{ inset: "6px", width: "calc(100% - 12px)", height: "calc(100% - 12px)", zIndex: 2 }} />
            </div>
            <div className="hero-status">
              <div className="hero-status-row">
                <span className="hero-status-dot" />
                <span>Lavoro con un <strong style={{ color: "var(--teal)" }}>massimo di {SITE.liveStatus.max} clienti</strong></span>
              </div>
              <span className="hero-status-label">Disponibile per nuovi progetti</span>
            </div>
            <HeroLocationLive />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          2. FRACTIONAL CMO — confronto 3 colonne
          Order: Agenzia | Fractional CMO (center) | Dipendente
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">Perch&eacute; un Fractional CMO</div>
        <h2 className="hp-h2">
          Un direttore marketing senior nella tua azienda.<br /><em>Senza assumerlo.</em>
        </h2>

        <div className="fcmo-grid">
          {/* Fractional CMO — main, large with bullet benefits */}
          <div className="fcmo-col fcmo-col-teal fcmo-col-main">
            <div className="fcmo-col-icon">
              <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="10" stroke="rgba(0,255,252,0.3)" strokeWidth="1.5"/>
                <circle cx="24" cy="24" r="4" fill="rgba(0,255,252,0.15)" stroke="rgba(0,255,252,0.4)" strokeWidth="1"/>
                <circle cx="24" cy="8" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="24" y="10" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">S</text>
                <circle cx="38" cy="18" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="38" y="20" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">N</text>
                <circle cx="38" cy="32" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="38" y="34" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">E</text>
                <circle cx="24" cy="40" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="24" y="42" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">A</text>
                <circle cx="10" cy="32" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="10" y="34" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">D</text>
                <circle cx="10" cy="18" r="3" stroke="rgba(0,255,252,0.25)" strokeWidth="1"/><text x="10" y="20" textAnchor="middle" fontSize="5" fill="rgba(0,255,252,0.5)">C</text>
                <line x1="24" y1="14" x2="24" y2="11" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
                <line x1="32" y1="18" x2="35" y2="18" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
                <line x1="32" y1="30" x2="35" y2="32" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
                <line x1="24" y1="34" x2="24" y2="37" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
                <line x1="16" y1="30" x2="13" y2="32" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
                <line x1="16" y1="18" x2="13" y2="18" stroke="rgba(0,255,252,0.15)" strokeWidth="0.5"/>
              </svg>
            </div>
            <div className="fcmo-col-title">Fractional CMO</div>
            <div className="fcmo-col-body">
              Da &euro;1.500/mese. Strategia, numeri e responsabilit&agrave; piena sui risultati. Pochi clienti, massima cura.
            </div>
            <ul className="fcmo-bullets">
              <li><strong>Direzione marketing senior</strong> &mdash; strategia + coordinamento dell&apos;esecuzione</li>
              <li><strong>Visione completa</strong> &mdash; ADV, e-commerce, CRO, lead gen, analytics</li>
              <li><strong>Margini, non solo metriche</strong> &mdash; responsabilit&agrave; sui numeri reali</li>
              <li><strong>Brain Company AI inclusa</strong> &mdash; il sistema operativo del tuo marketing</li>
              <li><strong>Massimo 5 clienti</strong> &mdash; cura maniacale, niente economia di scala</li>
            </ul>
            <div className="fcmo-col-verdict">&#10003; Costo frazionato, impatto pieno</div>
          </div>

          {/* Side stack: Agenzia + Dipendente impilati nella colonna destra */}
          <div className="fcmo-side-stack">
          {/* Agenzia — top-right, compact */}
          <div className="fcmo-col fcmo-col-dim fcmo-col-side-1">
            <div className="fcmo-col-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="18" width="8" height="22" rx="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <rect x="20" y="12" width="8" height="28" rx="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <rect x="32" y="22" width="8" height="18" rx="1" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <circle cx="12" cy="14" r="2" fill="rgba(255,255,255,0.12)"/>
                <circle cx="24" cy="8" r="2" fill="rgba(255,255,255,0.2)"/>
                <circle cx="36" cy="18" r="2" fill="rgba(255,255,255,0.08)"/>
                <path d="M12 14L24 8L36 18" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3"/>
              </svg>
            </div>
            <div className="fcmo-col-title">Agenzia</div>
            <div className="fcmo-col-body">
              Il senior vende, il junior esegue. Ottimizzano ROAS e CTR &mdash; nessuno guarda i tuoi margini.
            </div>
            <div className="fcmo-col-verdict">&#10007; Nessuno guarda i margini</div>
          </div>

          {/* Dipendente — bottom-right, compact */}
          <div className="fcmo-col fcmo-col-dim fcmo-col-side-2">
            <div className="fcmo-col-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="16" r="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M24 28v-4" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2"/>
              </svg>
            </div>
            <div className="fcmo-col-title">Dipendente</div>
            <div className="fcmo-col-body">
              60&ndash;80K/anno per una skill sola. Aspetta che gli dici cosa fare. Se non funziona, sei bloccato.
            </div>
            <div className="fcmo-col-verdict">&#10007; Costo alto, rischio alto</div>
          </div>
          </div>
          {/* /fcmo-side-stack */}
        </div>

        {/* Carosello esempi: cosa significa avere un Fractional CMO in azienda */}
        <div className="fcmo-cases-wrap">
          <div className="fcmo-cases-header">
            <div>
              <div className="fcmo-cases-eyebrow">In azione</div>
              <h3 className="fcmo-cases-title">Cosa significa farmi entrare in azienda.</h3>
            </div>
            <div className="fcmo-cases-nav">
              <button type="button" data-fcmo-prev aria-label="Precedente">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button type="button" data-fcmo-next aria-label="Successivo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <div className="fcmo-cases-track" data-fcmo-track>
            <div className="fcmo-case">
              <span className="fcmo-case-tag">B2B</span>
              <div className="fcmo-case-title">Azienda con vendita complessa.</div>
              <div className="fcmo-case-scenario">
                Hanno bisogno di un sistema di lead generation prevedibile &mdash; non pi&ugrave; solo passaparola o fiere.
              </div>
              <div className="fcmo-case-action">
                &rarr; Costruisco tracking, qualificazione e nurturing
              </div>
            </div>

            <div className="fcmo-case">
              <span className="fcmo-case-tag">E-commerce</span>
              <div className="fcmo-case-title">Fatturato fermo, non sanno dove guardare.</div>
              <div className="fcmo-case-scenario">
                Stanno spendendo in Ads, email, marketplace &mdash; ma non sanno cosa funziona davvero e cosa va tagliato.
              </div>
              <div className="fcmo-case-action">
                &rarr; Piano trimestrale priorizzato, area dopo area
              </div>
            </div>

            <div className="fcmo-case">
              <span className="fcmo-case-tag">Premium / Luxury</span>
              <div className="fcmo-case-title">Brand forte, digital ancora marginale.</div>
              <div className="fcmo-case-scenario">
                Hanno un nome riconoscibile e un prodotto solido, ma il digital &egrave; un canale fantasma. Vogliono renderlo strategico.
              </div>
              <div className="fcmo-case-action">
                &rarr; Strategia digital end-to-end, dal positioning ai canali
              </div>
            </div>

            <div className="fcmo-case">
              <span className="fcmo-case-tag">Info-prodotto</span>
              <div className="fcmo-case-title">Lancio sotto le aspettative.</div>
              <div className="fcmo-case-scenario">
                Primo lancio andato male, vogliono farlo bene la seconda volta &mdash; budget pi&ugrave; chiaro, scelte motivate.
              </div>
              <div className="fcmo-case-action">
                &rarr; Setup tecnico, budget, creativi, pacing del lancio
              </div>
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var track = document.querySelector('[data-fcmo-track]');
            var prev = document.querySelector('[data-fcmo-prev]');
            var next = document.querySelector('[data-fcmo-next]');
            if (!track || !prev || !next) return;
            function scrollAmount() {
              var card = track.querySelector('.fcmo-case');
              if (!card) return 360;
              return card.offsetWidth + 16;
            }
            prev.addEventListener('click', function() {
              track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            });
            next.addEventListener('click', function() {
              track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            });
          })();
        `}} />
      </div>

      {/* ════════════════════════════════════════
          3. NUMBERS TICKER
      ════════════════════════════════════════ */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: "60px" }}>
              <div className="ticker-item"><span className="ticker-value">30+</span> aziende seguite</div>
              <div className="ticker-item"><span className="ticker-value">&euro;5M+</span> budget Ads gestito</div>
              <div className="ticker-item"><span className="ticker-value">15+</span> settori diversi</div>
              <div className="ticker-item"><span className="ticker-value">+200%</span> fatturato (caso reale)</div>
              <div className="ticker-item"><span className="ticker-value">ROAS 16</span> pneumatici B2C</div>
              <div className="ticker-item"><span className="ticker-value">&euro;4,50</span> CPL autonoleggio</div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          4. PRIMI 30 GIORNI — Timeline
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">Come lavoro</div>
        <h2 className="hp-h2">
          Cosa cambia per te <em>dal giorno 1</em>
        </h2>
        <p className="hp-subtitle" style={{ marginBottom: "40px" }}>
          Impegno minimo: 3 mesi. Ecco cosa succede nei primi 30 giorni.
        </p>

        <div className="tl-month-flow">
          {/* MESE 1 — Costruzione del sistema */}
          <div className="tl-month-box tl-month-1">
            <div className="tl-month-header">
              <span className="tl-month-period">Mese 1</span>
              <div className="tl-month-title">Costruzione del sistema</div>
            </div>
            <ul className="tl-activities">
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2"/>
                    <path d="M7 9h10M7 13h7M7 17h5"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Analisi risorse</div>
                  <div className="tl-activity-desc">Team, canali, budget. Capisco subito cosa serve da fuori.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Tracking audit</div>
                  <div className="tl-activity-desc">GA4, Pixel Meta, Consent Mode. Dati puliti prima di decidere.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2"/>
                    <path d="M8 7h8M8 11h8M8 15h4"/>
                    <circle cx="14" cy="15" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Unit economics</div>
                  <div className="tl-activity-desc">Margine reale, scenari di crescita, forecasting concreto.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M16 8l-2 6-6 2 2-6z"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Strategia</div>
                  <div className="tl-activity-desc">Roadmap a 3 mesi con priorit&agrave; chiare e KPI definiti.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4a4 4 0 014 4c0 1.5-.8 2.7-1.5 3.5C15 12 16 13 16 14.5a3.5 3.5 0 01-7 0c0-.5.1-1 .3-1.5"/>
                    <path d="M9 7c-2 0-3 2-3 4 0 1.5 1 2.7 2 3.5"/>
                    <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Brain Company setup</div>
                  <div className="tl-activity-desc">Il tuo cervello digitale, costruito sul tuo business.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* PIXEL FLOW: dissolvenza pixel da Mese 1 → Mese 2-3 */}
          <div className="tl-pixel-flow" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="tl-pixel"
                style={{
                  top: `${10 + i * 7}%`,
                  animationDelay: `${i * 0.22}s`,
                }}
              />
            ))}
          </div>

          {/* MESE 2-3 — Si va sul mercato */}
          <div className="tl-month-box tl-month-2">
            <div className="tl-month-header">
              <span className="tl-month-period">Mese 2&ndash;3</span>
              <div className="tl-month-title">Si va sul mercato</div>
            </div>
            <ul className="tl-activities">
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19l3-7 3 4 4-9 4 12"/>
                    <circle cx="14" cy="7" r="2"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Lancio campagne</div>
                  <div className="tl-activity-desc">Budget controllato, creativi testati, tracking attivo.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3v6l-5 9a2 2 0 002 3h12a2 2 0 002-3l-5-9V3"/>
                    <path d="M8 3h8"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Test reali, non ipotesi</div>
                  <div className="tl-activity-desc">A/B test, varianti, validazione su mercato vero.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h11M4 12h11M4 18h11"/>
                    <circle cx="18" cy="6" r="2.5"/>
                    <circle cx="18" cy="12" r="2.5"/>
                    <circle cx="18" cy="18" r="2.5"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Calibrazione su dati</div>
                  <div className="tl-activity-desc">Ogni settimana: ottimizzo ci&ograve; che funziona, taglio il resto.</div>
                </div>
              </li>
              <li className="tl-activity">
                <div className="tl-activity-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l6-6 4 4 7-9"/>
                    <path d="M14 6h6v6"/>
                  </svg>
                </div>
                <div className="tl-activity-text">
                  <div className="tl-activity-title">Scalata graduale</div>
                  <div className="tl-activity-desc">Quando un canale converte, si scala. Non prima.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          5. BRAIN COMPANY (AI) — Full-width section with bg
      ════════════════════════════════════════ */}
      <BrainCompanySection />

      {/* ════════════════════════════════════════
          6. CASE STUDIES — Unified Carousel
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">CASE STUDY</div>
        <h2 className="hp-h2">
          Casi reali.<br /><em>Numeri reali.</em>
        </h2>
        <p className="hp-subtitle" style={{ marginBottom: "8px" }}>
          Quattro progetti, quattro modi diversi di entrare in azienda. Numeri concreti, scelte motivate, risultati misurabili.
        </p>

        <CasesCarousel />
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          8b. RECENSIONI — dal punto di vista dell'imprenditore
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="hp-eyebrow">Chi ha lavorato con me</div>
          <h2 className="hp-h2">
            Non ti dico io <em>come lavoro.</em><br />Te lo dicono loro.
          </h2>
        </div>
        <div className="reviews-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <div style={{ border: "1px solid rgba(0,255,252,0.12)", borderRadius: "10px", padding: "28px 24px", background: "rgba(0,255,252,0.02)" }}>
            <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "40px", color: "var(--teal)", opacity: 0.2, lineHeight: 1 }}>&ldquo;</div>
            <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.8, fontStyle: "italic", margin: "8px 0 20px" }}>
              La cosa che mi ha colpito &egrave; che non ha provato a vendermi nulla. Mi ha ascoltato, ha analizzato i numeri e mi ha detto esattamente dove stavo sbagliando. In 4 mesi il fatturato &egrave; triplicato.
            </p>
            <div style={{ borderTop: "1px solid rgba(0,255,252,0.08)", paddingTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,255,252,0.08)", border: "1px solid rgba(0,255,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "var(--teal)" }}>MR</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>Marco R.</div>
                <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Imprenditore, E-commerce</div>
              </div>
            </div>
          </div>
          <div style={{ border: "1px solid rgba(0,255,252,0.12)", borderRadius: "10px", padding: "28px 24px", background: "rgba(0,255,252,0.02)" }}>
            <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "40px", color: "var(--teal)", opacity: 0.2, lineHeight: 1 }}>&ldquo;</div>
            <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.8, fontStyle: "italic", margin: "8px 0 20px" }}>
              Finalmente qualcuno che parla la mia lingua. Non mi ha sommerso di sigle &mdash; mi ha spiegato dove andavano i miei soldi e cosa potevamo fare meglio. Mi sono sentito capito, non venduto.
            </p>
            <div style={{ borderTop: "1px solid rgba(0,255,252,0.08)", paddingTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,255,252,0.08)", border: "1px solid rgba(0,255,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "var(--teal)" }}>AB</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>Andrea B.</div>
                <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Founder, Corso Online</div>
              </div>
            </div>
          </div>
          <div style={{ border: "1px solid rgba(0,255,252,0.12)", borderRadius: "10px", padding: "28px 24px", background: "rgba(0,255,252,0.02)" }}>
            <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "40px", color: "var(--teal)", opacity: 0.2, lineHeight: 1 }}>&ldquo;</div>
            <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.8, fontStyle: "italic", margin: "8px 0 20px" }}>
              Avevo gi&agrave; provato due agenzie. Con Nicola &egrave; stato diverso: mi ha detto subito che met&agrave; di quello che facevo era inutile. Duro da sentire, ma era vero. Ora spendo meno e guadagno di pi&ugrave;.
            </p>
            <div style={{ borderTop: "1px solid rgba(0,255,252,0.08)", paddingTop: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,255,252,0.08)", border: "1px solid rgba(0,255,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "var(--teal)" }}>FD</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>Francesca D.</div>
                <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Imprenditrice, Retail</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          9. CTA FINALE
      ════════════════════════════════════════ */}
      <div className="hp-wrap" style={{ marginBottom: "120px" }}>
        <div className="hp-cta">
          <h2 className="hp-h2" style={{ position: "relative", marginBottom: "12px" }}>Conosciamoci. Senza impegno.</h2>
          <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "32px", position: "relative" }}>
            Mandami un messaggio, ci sentiamo, e ti dico onestamente se posso aiutarti<br />
            &mdash; o se non ne hai bisogno. Nessuna presentazione, nessun preventivo.
          </p>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <ContactCTAButton
              buttonClassName="hp-btn-primary"
              microcopy="Sempre un forte piacere conoscere nuovi contesti."
              align="center"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          POPUP — 50% scroll / 15s trigger
      ════════════════════════════════════════ */}
      <div className="hp-popup-overlay" id="hp-popup">
        <div className="hp-popup-card">
          <button className="hp-popup-close" id="hp-popup-close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="hp-popup-title">Sei un imprenditore?</div>
          <div className="hp-popup-subtitle">Perch&eacute; non ci conosciamo?</div>
          <div className="hp-popup-body">
            15 minuti per conoscerci e parlare del tuo progetto. Nella peggiore delle ipotesi, ti do dei consigli utili.
          </div>
          <ContactCTAButton
            buttonClassName="hp-btn-primary"
            microcopy="Sempre un forte piacere conoscere nuovi contesti."
            align="center"
          />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var shown = false;
          function showPopup() {
            if (shown) return;
            if (sessionStorage.getItem('hp-popup-shown')) return;
            shown = true;
            sessionStorage.setItem('hp-popup-shown', '1');
            var el = document.getElementById('hp-popup');
            if (el) el.classList.add('visible');
          }
          function closePopup() {
            var el = document.getElementById('hp-popup');
            if (el) el.classList.remove('visible');
          }
          // Close button
          document.addEventListener('click', function(e) {
            if (e.target.closest('#hp-popup-close')) { closePopup(); return; }
            // Click on overlay (not card) closes
            if (e.target.id === 'hp-popup') closePopup();
          });
          // 15s timer
          setTimeout(showPopup, 15000);
          // 50% scroll
          window.addEventListener('scroll', function() {
            var scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            if (scrollPct >= 0.5) showPopup();
          });
        })();
      `}} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   UNIFIED CASES CAROUSEL
══════════════════════════════════════════════════════════ */
function CasesCarousel() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-uc-nav]');
          if (!btn) return;
          var wrap = btn.closest('[data-uc]');
          if (!wrap) return;
          var dir = btn.getAttribute('data-uc-nav');
          var cards = wrap.querySelectorAll('[data-uc-card]');
          var total = cards.length;
          var curr = parseInt(wrap.getAttribute('data-uc-current') || '0');
          var next = dir === 'next' ? (curr + 1) % total : (curr - 1 + total) % total;
          wrap.setAttribute('data-uc-current', next);
          ucUpdate(wrap, next, total);
        });
        document.addEventListener('click', function(e) {
          var dot = e.target.closest('[data-uc-dot]');
          if (!dot) return;
          var wrap = dot.closest('[data-uc]');
          var idx = parseInt(dot.getAttribute('data-uc-dot'));
          var total = wrap.querySelectorAll('[data-uc-card]').length;
          wrap.setAttribute('data-uc-current', idx);
          ucUpdate(wrap, idx, total);
        });
        function ucUpdate(wrap, curr, total) {
          var cards = wrap.querySelectorAll('[data-uc-card]');
          var dots = wrap.querySelectorAll('[data-uc-dot]');
          cards.forEach(function(c, i) {
            c.className = 'uc-card';
            var diff = i - curr;
            if (diff === 0) c.classList.add('uc-center');
            else if (diff === 1 || diff === -(total - 1)) c.classList.add('uc-right');
            else if (diff === -1 || diff === (total - 1)) c.classList.add('uc-left');
            else if (diff > 1) c.classList.add('uc-exit-right');
            else c.classList.add('uc-exit-left');
          });
          dots.forEach(function(d, i) {
            d.setAttribute('data-active', i === curr ? 'true' : 'false');
          });
        }
      `}} />
      <div data-uc="" data-uc-current="0">
        <div className="uc-stage">
          <div className="uc-track">

            {/* Card 1 — Balance Nutrition */}
            <div className="uc-card uc-center" data-uc-card="0">
              <div className="uc-top-row">
                <div className="uc-badges">
                  <span className="uc-badge">E-Commerce</span>
                  <span className="uc-badge">Nutrition</span>
                </div>
                <div className="uc-kpi">
                  <div className="uc-kpi-value">+200%</div>
                  <div className="uc-kpi-sub">in 4 mesi</div>
                </div>
              </div>
              <div className="uc-title">Balance Nutrition: da &euro;45K a &euro;150K/mese</div>
              <div className="uc-quote">
                &ldquo;Non sapevamo da dove partire. In 4 mesi ha triplicato il fatturato con un metodo che ci fa finalmente capire i numeri.&rdquo;
              </div>
              <div className="uc-strategy-label">Come ci siamo riusciti:</div>
              <div className="uc-strategy">
                Analisi completa del business, unit economics precisi, ottimizzazione budget Ads. Non abbiamo speso di pi&ugrave; &mdash; abbiamo speso meglio.
              </div>
              <div className="uc-metrics-grid">
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;150K</div><div className="uc-metric-lbl">fatturato / mese</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">+33%</div><div className="uc-metric-lbl">AOV</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">10%</div><div className="uc-metric-lbl">margini netti</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">4</div><div className="uc-metric-lbl">mesi</div></div>
              </div>
              <Link href="/cosa-ho-fatto/balance-nutrition" className="uc-link">Leggi il caso completo &rarr;</Link>
            </div>

            {/* Card 2 — Lancio Yoga */}
            <div className="uc-card uc-right" data-uc-card="1">
              <div className="uc-top-row">
                <div className="uc-badges">
                  <span className="uc-badge">Corso Online</span>
                  <span className="uc-badge">Meta Ads</span>
                  <span className="uc-badge">Lancio</span>
                </div>
                <div className="uc-kpi">
                  <div className="uc-kpi-value">6.3x</div>
                  <div className="uc-kpi-sub">Return on Ad Spend</div>
                </div>
              </div>
              <div className="uc-title">Yoga: &euro;3K &rarr; &euro;19K</div>
              <div className="uc-quote">
                &ldquo;Budget limitato, nessuna lista, nessun pubblico caldo. Avevamo solo il prodotto. In 14 giorni abbiamo riempito il corso.&rdquo;
              </div>
              <div className="uc-strategy-label">Come ci siamo riusciti:</div>
              <div className="uc-strategy">
                Consulenza strategica dall&apos;inizio alla fine: timing, email, ads, pricing, gestione del lancio.
              </div>
              <div className="uc-metrics-grid">
                <div className="uc-metric-box"><div className="uc-metric-val">3.000</div><div className="uc-metric-lbl">lead a &euro;1 CPL</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;19K</div><div className="uc-metric-lbl">incassato</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;3K</div><div className="uc-metric-lbl">budget investito</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;297</div><div className="uc-metric-lbl">prezzo corso</div></div>
              </div>
              <Link href="/cosa-ho-fatto/lancio-yoga" className="uc-link">Leggi il caso completo &rarr;</Link>
            </div>

            {/* Card 3 — Pneumatici */}
            <div className="uc-card uc-exit-right" data-uc-card="2">
              <div className="uc-top-row">
                <div className="uc-badges">
                  <span className="uc-badge">E-Commerce</span>
                  <span className="uc-badge">Gomme</span>
                  <span className="uc-badge">ROAS</span>
                </div>
                <div className="uc-kpi">
                  <div className="uc-kpi-value">ROAS 16</div>
                  <div className="uc-kpi-sub">Obiettivo era 12</div>
                </div>
              </div>
              <div className="uc-title">Pneumatici: ROAS 16</div>
              <div className="uc-quote">
                &ldquo;Per essere profittevole devo avere almeno ROAS 12 &mdash; marginalit&agrave; 7%, target quasi impossibile.&rdquo;
              </div>
              <div className="uc-strategy-label">Come ci siamo riusciti:</div>
              <div className="uc-strategy">
                Studio mercato e competitor. Amplificato ci&ograve; che il business poteva dare in pi&ugrave;: copy su consigli &ldquo;segreti&rdquo; che solo un esperto conosce.
              </div>
              <div className="uc-metrics-grid">
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;11</div><div className="uc-metric-lbl">CPA</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;180</div><div className="uc-metric-lbl">AOV medio</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">16</div><div className="uc-metric-lbl">ROAS vs 12</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">14gg</div><div className="uc-metric-lbl">di test</div></div>
              </div>
              <Link href="/cosa-ho-fatto/pneumatici" className="uc-link">Leggi il caso completo &rarr;</Link>
            </div>

            {/* Card 4 — Autonoleggio */}
            <div className="uc-card uc-exit-left" data-uc-card="3">
              <div className="uc-top-row">
                <div className="uc-badges">
                  <span className="uc-badge">Lead Gen</span>
                  <span className="uc-badge">Noleggio Auto</span>
                  <span className="uc-badge">B2B</span>
                </div>
                <div className="uc-kpi">
                  <div className="uc-kpi-value">-84%</div>
                  <div className="uc-kpi-sub">Riduzione CPL</div>
                </div>
              </div>
              <div className="uc-title">Noleggio: &euro;25 &rarr; &euro;4 CPL</div>
              <div className="uc-quote">
                &ldquo;Costo per lead altissimo, qualit&agrave; bassa. Il team commerciale perdeva tempo su contatti non qualificati.&rdquo;
              </div>
              <div className="uc-strategy-label">Come ci siamo riusciti:</div>
              <div className="uc-strategy">
                Consulenza totale: gestione Ads, creative, ottimizzazione pagina. Focus qualit&agrave; del lead, non solo sul volume.
              </div>
              <div className="uc-metrics-grid">
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;4</div><div className="uc-metric-lbl">CPL finale</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">&euro;25</div><div className="uc-metric-lbl">CPL di partenza</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">Alta</div><div className="uc-metric-lbl">qualit&agrave; lead</div></div>
                <div className="uc-metric-box"><div className="uc-metric-val">-84%</div><div className="uc-metric-lbl">riduzione costo</div></div>
              </div>
              <Link href="/cosa-ho-fatto/autonoleggio" className="uc-link">Leggi il caso completo &rarr;</Link>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="uc-nav">
          <button className="uc-arrow" data-uc-nav="prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="uc-dots">
            <button className="uc-dot" data-uc-dot="0" data-active="true" />
            <button className="uc-dot" data-uc-dot="1" data-active="false" />
            <button className="uc-dot" data-uc-dot="2" data-active="false" />
            <button className="uc-dot" data-uc-dot="3" data-active="false" />
          </div>
          <button className="uc-arrow" data-uc-nav="next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
