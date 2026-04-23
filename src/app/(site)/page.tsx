import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

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
          max-width: 1400px; margin: 0 auto; padding: 80px 60px;
          display: grid; grid-template-columns: 1fr auto;
          gap: 80px; align-items: center;
        }
        .hero-left { display: flex; flex-direction: column; gap: 24px; }

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
          font-size: clamp(13px, 1.5vw, 16px);
          color: var(--text-dim); line-height: 1.7; max-width: 540px;
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

        /* Right column */
        .hero-right { display: flex; flex-direction: column; align-items: center; gap: 20px; }
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
           2. FRACTIONAL CMO — 3 columns
        ═══════════════════════════════════ */
        .fcmo-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin-top: 40px;
        }
        .fcmo-col {
          border-radius: 10px; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 16px;
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
        .fcmo-closer {
          font-size: 14px; color: var(--text-dim); line-height: 1.8;
          max-width: 780px; margin-top: 40px;
        }
        .fcmo-closer strong { color: var(--text); font-weight: 500; }

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
           4. PRIMI 30 GIORNI — Box Cards
        ═══════════════════════════════════ */
        .tl-cards {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 32px;
        }
        .tl-card {
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(0,255,252,0.12);
          transition: border-color 0.3s;
        }
        .tl-card:hover { border-color: rgba(0,255,252,0.3); }
        .tl-card-top {
          background: rgba(10,14,13,0.9);
          padding: 24px 20px; min-height: 140px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .tl-card-period {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: 0.6;
        }
        .tl-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 17px; font-weight: 700; color: var(--text);
        }
        .tl-card-desc {
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
        }
        .tl-card-bottom {
          background: rgba(0,255,252,0.04);
          border-top: 1px solid rgba(0,255,252,0.1);
          padding: 20px 20px; min-height: 100px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .tl-card-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: 0.7; margin-bottom: 4px;
        }
        .tl-card-impact {
          font-size: 14px; color: var(--text); line-height: 1.6;
          font-weight: 500;
        }
        .tl-card-impact-sub {
          font-size: 12px; color: var(--text-dim); line-height: 1.6;
        }
        /* Arrow flow below cards */
        .tl-arrow {
          margin-top: 40px; position: relative;
        }
        .tl-arrow-line {
          display: flex; align-items: center; gap: 0;
        }
        .tl-arrow-seg {
          height: 3px; border-radius: 2px;
        }
        .tl-arrow-label {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          white-space: nowrap; padding: 0 12px;
        }
        .tl-arrow-head {
          width: 0; height: 0; flex-shrink: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 12px solid var(--teal);
        }

        /* ═══════════════════════════════════
           5. BRAIN COMPANY (AI)
        ═══════════════════════════════════ */
        .brain-section {
          background: rgba(0,255,252,0.02);
          border-top: 1px solid rgba(0,255,252,0.08);
          border-bottom: 1px solid rgba(0,255,252,0.08);
          padding: 100px 0;
          margin-bottom: 120px;
        }
        .brain-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 56px;
          align-items: center;
        }
        .brain-benefit-cards {
          display: flex; flex-direction: column; gap: 16px;
          margin-top: 28px;
        }
        .brain-benefit {
          border: 1px solid rgba(0,255,252,0.15); border-radius: 10px;
          padding: 24px 24px; background: rgba(0,255,252,0.03);
          display: flex; gap: 16px; align-items: flex-start;
          transition: border-color 0.3s, background 0.3s;
        }
        .brain-benefit:hover {
          border-color: rgba(0,255,252,0.3); background: rgba(0,255,252,0.06);
        }
        .brain-benefit-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(0,255,252,0.06); border: 1px solid rgba(0,255,252,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .brain-benefit-content { flex: 1; }
        .brain-benefit-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 17px; font-weight: 700; color: var(--teal);
          margin-bottom: 6px;
        }
        .brain-benefit-desc {
          font-size: 13px; color: var(--text-dim); line-height: 1.7;
        }
        .brain-note {
          margin-top: 24px; font-size: 12px; color: var(--text-faint);
          line-height: 1.7; max-width: 480px;
          border-left: 2px solid rgba(0,255,252,0.15); padding-left: 14px;
        }

        /* ── Concentric orbits ── */
        .brain-orbits-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 380px;
        }
        .brain-orbits {
          position: relative; width: 360px; height: 360px;
        }
        .brain-orbit-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(0,255,252,0.08);
          display: flex; align-items: center; justify-content: center;
        }
        .brain-orbit-ring-4 { inset: 0; border-color: rgba(0,255,252,0.06); }
        .brain-orbit-ring-3 { inset: 40px; border-color: rgba(0,255,252,0.1); }
        .brain-orbit-ring-2 { inset: 80px; border-color: rgba(0,255,252,0.15); }
        .brain-orbit-ring-1 { inset: 120px; border-color: rgba(0,255,252,0.2); }
        .brain-orbit-core {
          position: absolute; inset: 140px;
          border-radius: 50%; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 4px;
          background: rgba(0,255,252,0.06);
          border: 1.5px solid rgba(0,255,252,0.35);
          box-shadow: 0 0 30px rgba(0,255,252,0.1);
          z-index: 5;
        }
        .brain-orbit-core-text {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 12px; font-weight: 700; color: var(--teal);
        }
        .brain-orbit-core-sub {
          font-size: 7px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim);
        }
        .brain-ring-label {
          position: absolute; font-size: 8px; letter-spacing: 1px;
          text-transform: uppercase; color: var(--text-faint);
          background: var(--bg); padding: 2px 8px; white-space: nowrap;
        }
        .brain-ring-node {
          position: absolute; width: 32px; height: 32px; border-radius: 50%;
          background: rgba(0,255,252,0.05); border: 1px solid rgba(0,255,252,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 7px; color: var(--text-dim); font-weight: 500;
          z-index: 3;
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
          .brain-grid { grid-template-columns: 1fr; }
          .uc-card { width: 420px; }
          .uc-card.uc-left { transform: translateX(calc(-50% - 380px)) scale(0.85); }
          .uc-card.uc-right { transform: translateX(calc(-50% + 380px)) scale(0.85); }
        }
        @media (max-width: 900px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 32px; }
          .hero-grid {
            grid-template-columns: 1fr; padding: 48px 32px 60px;
            gap: 32px; text-align: center;
          }
          .hero-left { align-items: center; }
          .hero-right { order: -1; flex-direction: row; align-items: center; justify-content: center; gap: 20px; }
          .hero-photo-wrap { width: 120px !important; height: 120px !important; }
          .hero-pills-main, .hero-pills-grey { justify-content: center; }
          .hero-sub { margin-left: auto; margin-right: auto; }
          .fcmo-grid { grid-template-columns: 1fr; }
          .tl-cards { grid-template-columns: repeat(2, 1fr); }
          .brain-grid { grid-template-columns: 1fr; }
          .brain-orbits-wrap { min-height: 300px; }
          .brain-orbits { width: 300px; height: 300px; }
          .uc-stage { height: auto; min-height: 480px; }
          .uc-card { position: relative; left: auto; width: 100%; max-width: 100%;
            transform: none !important; opacity: 1 !important; display: none; }
          .uc-card.uc-center { display: flex; }
          .uc-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .brain-svg-wrap { min-height: 280px; }
          .brain-svg-container { width: 260px; height: 260px; }
        }
        @media (max-width: 480px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 20px; }
          .hero-grid { padding: 40px 20px 48px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions a { justify-content: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; }
          .tl-cards { grid-template-columns: 1fr; }
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

            <h1 className="hero-h1">
              Il mio lavoro &egrave; portare<br />
              <span style={{ color: "var(--teal)" }}>crescita nelle aziende.</span>
            </h1>

            <p className="hero-sub">
              Strategia, numeri e direzione &mdash; senza assumere un team interno.
            </p>

            {/* Teal pills */}
            <div className="hero-pills-main">
              <span className="hero-pill-teal">Fractional CMO</span>
              <span className="hero-pill-teal">AI-Powered</span>
            </div>

            {/* Grey pills */}
            <div className="hero-pills-grey">
              {["E-commerce", "B2B Lead Gen", "Growth", "Revenue Strategy", "CRO"].map((tag) => (
                <span key={tag} className="hero-pill-grey">{tag}</span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap hero-actions" style={{ gap: "14px" }}>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hp-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Prenota 15 minuti
              </a>
              <Link href="/risorse" className="hp-btn-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Risorse Gratis
              </Link>
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
                <span>{SITE.liveStatus.current} clienti su {SITE.liveStatus.max} &mdash; <strong style={{ color: "var(--teal)" }}>disponibile</strong></span>
              </div>
              <span className="hero-status-label">Seguo massimo {SITE.liveStatus.max} aziende alla volta</span>
            </div>
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
          {/* Agenzia */}
          <div className="fcmo-col fcmo-col-dim">
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
              Il senior vende, il junior esegue. Ottimizza metriche di piattaforma &mdash; ROAS, CTR, CPM &mdash; ma nessuno guarda i tuoi margini reali.
            </div>
            <div className="fcmo-col-verdict">&#10007; Nessuno guarda i tuoi margini</div>
          </div>

          {/* Fractional CMO (center, prominent) */}
          <div className="fcmo-col fcmo-col-teal">
            <div className="fcmo-col-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
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
              Da &euro;1.500/mese. Strategia e numeri. Si prende la responsabilit&agrave; dei risultati. Pochi clienti, massima cura.
            </div>
            <div className="fcmo-col-verdict">&#10003; Costo frazionato, impatto pieno</div>
          </div>

          {/* Dipendente */}
          <div className="fcmo-col fcmo-col-dim">
            <div className="fcmo-col-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="16" r="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M24 28v-4" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2"/>
              </svg>
            </div>
            <div className="fcmo-col-title">Dipendente</div>
            <div className="fcmo-col-body">
              60&ndash;80K/anno. Una skill, un ruolo. Ha bisogno di qualcuno che gli dica cosa fare. E se non funziona, sei bloccato.
            </div>
            <div className="fcmo-col-verdict">&#10007; Costo alto, rischio alto</div>
          </div>
        </div>

        <p className="fcmo-closer">
          Entro nella tua azienda, costruisco la strategia, coordino chi esegue, misuro cosa resta in tasca. <strong>Penso ai miei clienti anche fuori dall&apos;orario di lavoro &mdash; non per ossessione, ma perch&eacute; ci tengo davvero.</strong>
        </p>
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

        <div className="tl-cards">
          {/* Card 1 */}
          <div className="tl-card">
            <div className="tl-card-top">
              <div className="tl-card-period">Settimana 1</div>
              <div className="tl-card-title">Analisi risorse</div>
              <div className="tl-card-desc">Mappo team, canali, budget. Ti dico subito cosa serve da fuori.</div>
            </div>
            <div className="tl-card-bottom">
              <div className="tl-card-label">Per te</div>
              <div className="tl-card-impact">Chiarezza immediata</div>
              <div className="tl-card-impact-sub">Sai dove stai spendendo e cosa manca.</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="tl-card">
            <div className="tl-card-top">
              <div className="tl-card-period">Settimana 1&ndash;2</div>
              <div className="tl-card-title">Tracking audit</div>
              <div className="tl-card-desc">GA4, Pixel Meta, Consent Mode, GDPR. Dati puliti prima di decidere.</div>
            </div>
            <div className="tl-card-bottom">
              <div className="tl-card-label">Per te</div>
              <div className="tl-card-impact">Decisioni su dati reali</div>
              <div className="tl-card-impact-sub">Non su numeri sporchi o stime a occhio.</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="tl-card">
            <div className="tl-card-top">
              <div className="tl-card-period">Settimana 2&ndash;4</div>
              <div className="tl-card-title">Unit economics</div>
              <div className="tl-card-desc">Margine reale per vendita. Tre scenari di crescita e forecasting.</div>
            </div>
            <div className="tl-card-bottom">
              <div className="tl-card-label">Per te</div>
              <div className="tl-card-impact">Sai quanto investire</div>
              <div className="tl-card-impact-sub">E cosa aspettarti in termini di ritorno.</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="tl-card">
            <div className="tl-card-top">
              <div className="tl-card-period">Setup</div>
              <div className="tl-card-title">Brain Company</div>
              <div className="tl-card-desc">Notion + Claude AI + Drive. Il cervello operativo del tuo progetto.</div>
            </div>
            <div className="tl-card-bottom">
              <div className="tl-card-label">Per te</div>
              <div className="tl-card-impact">Tutto in un posto</div>
              <div className="tl-card-impact-sub">Sempre aggiornato. Zero email perse.</div>
            </div>
          </div>
        </div>

        {/* Arrow flow: Mese 1 → converge → Mese 2-3 iterazione → risultati */}
        <div className="tl-arrow">
          <div className="tl-arrow-line" style={{ display: "flex", alignItems: "center" }}>
            <div className="tl-arrow-seg" style={{ flex: "0 0 25%", background: "linear-gradient(90deg, rgba(0,255,252,0.1), rgba(0,255,252,0.3))" }} />
            <div className="tl-arrow-label" style={{ color: "var(--teal)", opacity: 0.7 }}>Mese 1</div>
            <div className="tl-arrow-seg" style={{ flex: "0 0 15%", background: "rgba(0,255,252,0.3)" }} />
            <div className="tl-arrow-label" style={{ color: "var(--teal)" }}>Mese 2&ndash;3: test &amp; calibra</div>
            <div className="tl-arrow-seg" style={{ flex: 1, background: "linear-gradient(90deg, rgba(0,255,252,0.3), var(--teal))" }} />
            <div className="tl-arrow-head" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ fontSize: "10px", color: "var(--text-faint)" }}>Costruzione</div>
            <div style={{ fontSize: "10px", color: "var(--text-dim)" }}>Iterazione</div>
            <div style={{ fontSize: "10px", color: "var(--teal)", fontWeight: 500 }}>Risultati</div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          5. BRAIN COMPANY (AI) — Full-width section with bg
      ════════════════════════════════════════ */}
      <div className="brain-section">
        <div className="hp-wrap">
          {/* Product badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 14px", borderRadius: "5px",
              border: "1px solid rgba(0,255,252,0.4)", background: "rgba(0,255,252,0.08)",
              fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
              color: "var(--teal)", fontWeight: 600,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Incluso nel servizio
            </div>
          </div>

          <h2 className="hp-h2" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Brain Company<span style={{ color: "var(--teal)" }}>.</span>
          </h2>
          <p className="hp-subtitle" style={{ marginBottom: "16px", maxWidth: "620px" }}>
            Il cervello digitale della tua azienda. Se inizi una collaborazione con me, te lo costruisco. &Egrave; il mio modo di lavorare &mdash; e diventa tuo.
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-faint)", marginBottom: "48px" }}>
            Powered by Anthropic Claude &mdash; il modello AI pi&ugrave; avanzato al mondo.
          </p>

          <div className="brain-grid">
            {/* Left — benefits + ownership note */}
            <div>
              <div className="brain-benefit-cards">
                <div className="brain-benefit">
                  <div className="brain-benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div className="brain-benefit-content">
                    <div className="brain-benefit-title">~20h risparmiate al mese</div>
                    <div className="brain-benefit-desc">
                      Addio preventivi manuali, report ripetitivi, email di routine. L&apos;AI se ne occupa.
                    </div>
                  </div>
                </div>
                <div className="brain-benefit">
                  <div className="brain-benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><path d="M12 2a4 4 0 014 4c0 1.95-2 4-4 6-2-2-4-4.05-4-6a4 4 0 014-4z"/><path d="M12 12v10M8 22h8"/></svg>
                  </div>
                  <div className="brain-benefit-content">
                    <div className="brain-benefit-title">Un assistente AI costruito sul tuo business</div>
                    <div className="brain-benefit-desc">
                      Servono interviste, analisi, tempo per capire la tua azienda. Ma una volta configurato, conosce ogni numero, ogni decisione, ogni cliente. Sempre aggiornato.
                    </div>
                  </div>
                </div>
                <div className="brain-benefit">
                  <div className="brain-benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div className="brain-benefit-content">
                    <div className="brain-benefit-title">La propriet&agrave; intellettuale &egrave; tua</div>
                    <div className="brain-benefit-desc">
                      Iniziamo col mio sistema. Quando vuoi, tutto passa a te: contesto, skill, automazioni. Costo per te: &euro;90/mese di Anthropic. Il valore che contiene? Inestimabile.
                    </div>
                  </div>
                </div>
              </div>
              <div className="brain-note">
                Usiamo il Brain Company per il bene del progetto. Non &egrave; un upsell &mdash; &egrave; il modo in cui lavoro. Fa parte del servizio di Fractional CMO.
              </div>
            </div>

            {/* Right — Concentric orbits */}
            <div className="brain-orbits-wrap">
              <div className="brain-orbits">
                {/* Ring 4: Automazioni */}
                <div className="brain-orbit-ring brain-orbit-ring-4">
                  <div className="brain-ring-label" style={{ top: "-10px", left: "50%", transform: "translateX(-50%)" }}>Automazioni</div>
                  <div className="brain-ring-node" style={{ top: "10px", right: "40px" }}>N8N</div>
                  <div className="brain-ring-node" style={{ bottom: "10px", left: "40px" }}>Zap</div>
                </div>
                {/* Ring 3: Skills */}
                <div className="brain-orbit-ring brain-orbit-ring-3">
                  <div className="brain-ring-label" style={{ top: "-10px", left: "50%", transform: "translateX(-50%)" }}>Skills</div>
                  <div className="brain-ring-node" style={{ top: "8px", right: "20px" }}>Ads</div>
                  <div className="brain-ring-node" style={{ bottom: "8px", left: "20px" }}>SEO</div>
                </div>
                {/* Ring 2: Tools */}
                <div className="brain-orbit-ring brain-orbit-ring-2">
                  <div className="brain-ring-label" style={{ top: "-10px", left: "50%", transform: "translateX(-50%)" }}>Tools</div>
                  <div className="brain-ring-node" style={{ top: "4px", left: "50%", transform: "translateX(-50%)" }}>GA4</div>
                  <div className="brain-ring-node" style={{ bottom: "4px", right: "10px" }}>CRM</div>
                </div>
                {/* Ring 1: Contesto */}
                <div className="brain-orbit-ring brain-orbit-ring-1">
                  <div className="brain-ring-label" style={{ bottom: "-10px", left: "50%", transform: "translateX(-50%)" }}>Contesto</div>
                </div>
                {/* Core: Brand */}
                <div className="brain-orbit-core">
                  <div className="brain-orbit-core-text">Il tuo brand</div>
                  <div className="brain-orbit-core-sub">Centro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          6. CASE STUDIES — Unified Carousel
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">RISULTATI REALI</div>
        <h2 className="hp-h2">
          Numeri veri.<br /><em>Aziende vere.</em>
        </h2>
        <p className="hp-subtitle" style={{ marginBottom: "8px" }}>
          Non casi di studio generici. Problemi reali, scelte precise, risultati misurabili.
        </p>

        <CasesCarousel />
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          9. CTA FINALE
      ════════════════════════════════════════ */}
      <div className="hp-wrap" style={{ marginBottom: "120px" }}>
        <div className="hp-cta">
          <h2 className="hp-h2" style={{ position: "relative", marginBottom: "12px" }}>15 minuti. Zero pitch.</h2>
          <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "32px", position: "relative" }}>
            Una call per capire se il modello Fractional CMO ha senso per il tuo business.<br />
            Nessuna presentazione, nessun preventivo. Solo una conversazione onesta sui tuoi numeri.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", position: "relative", flexWrap: "wrap" }}>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hp-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Prenota la call
            </a>
            <a href={`mailto:${SITE.email}`} className="hp-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Scrivimi una mail
            </a>
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
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hp-btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Prenota 15 minuti
          </a>
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
