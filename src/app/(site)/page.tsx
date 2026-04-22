import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

/* ───────────────────────────────────────────────────────
   HOMEPAGE — nicolaserrao.com
   Sezioni:
   1. Hero
   2. Fractional CMO (confronto 3 colonne)
   3. Numbers Ticker
   4. Primi 30 giorni (tab)
   5. Brain Company (AI)
   6. Case Studies
   7. Blog preview
   8. Risorse gratuite
   9. CTA finale
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
           4. PRIMI 30 GIORNI — Tabs
        ═══════════════════════════════════ */
        .tabs-nav {
          display: flex; gap: 4px; margin-bottom: 0;
        }
        .tabs-btn {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); background: transparent;
          border: 1px solid rgba(255,255,255,0.08); border-bottom: none;
          border-radius: 8px 8px 0 0; padding: 12px 24px;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .tabs-btn:hover { color: var(--text); background: rgba(255,255,255,0.03); }
        .tabs-btn[data-active="true"] {
          color: var(--teal); background: rgba(0,255,252,0.04);
          border-color: var(--teal-border);
        }
        .tabs-panel {
          border: 1px solid var(--teal-border); border-radius: 0 10px 10px 10px;
          padding: 40px; background: rgba(0,255,252,0.02);
          min-height: 280px; display: flex; flex-direction: column; justify-content: center;
        }
        .tab-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: var(--text);
          margin-bottom: 12px;
        }
        .tab-desc {
          font-size: 14px; color: var(--text-dim); line-height: 1.8;
          max-width: 680px; margin-bottom: 28px;
        }
        .tab-pills {
          display: flex; flex-wrap: wrap; gap: 10px;
        }
        .tab-pill {
          font-size: 11px; letter-spacing: 1px;
          color: var(--text); padding: 10px 18px; border-radius: 6px;
          border: 1px solid rgba(0,255,252,0.15); background: rgba(0,255,252,0.04);
          display: flex; align-items: center; gap: 8px;
        }
        .tab-pill-icon { color: var(--teal); font-size: 14px; }

        /* Scenario cards */
        .scenario-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .scenario-card {
          border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
          padding: 24px 20px; background: rgba(255,255,255,0.02);
          text-align: center;
        }
        .scenario-card-active {
          border-color: rgba(0,255,252,0.3); background: rgba(0,255,252,0.04);
        }
        .scenario-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 8px;
        }
        .scenario-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; line-height: 1;
          margin-bottom: 6px;
        }
        .scenario-card .scenario-value { color: var(--text-dim); }
        .scenario-card-active .scenario-value { color: var(--teal); }
        .scenario-note { font-size: 11px; color: var(--text-faint); }

        /* Stack items */
        .stack-list {
          display: flex; flex-direction: column; gap: 12px; max-width: 480px;
        }
        .stack-item {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 8px;
          border: 1px solid rgba(0,255,252,0.12); background: rgba(0,255,252,0.03);
        }
        .stack-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(0,255,252,0.08); border: 1px solid rgba(0,255,252,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); font-size: 14px; flex-shrink: 0;
        }
        .stack-text { font-size: 13px; color: var(--text-dim); line-height: 1.6; }
        .stack-text strong { color: var(--text); font-weight: 500; }

        /* ═══════════════════════════════════
           5. BRAIN COMPANY (AI)
        ═══════════════════════════════════ */
        .brain-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center;
        }
        .brain-tools {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
          margin-top: 24px;
        }
        .brain-tool {
          border: 1px solid rgba(0,255,252,0.12); border-radius: 8px;
          padding: 14px 12px; text-align: center;
          background: rgba(0,255,252,0.03);
          transition: border-color 0.2s, background 0.2s;
        }
        .brain-tool:hover {
          border-color: rgba(0,255,252,0.3); background: rgba(0,255,252,0.06);
        }
        .brain-tool-name {
          font-size: 11px; color: var(--text); font-weight: 500;
        }
        .brain-tool-role {
          font-size: 9px; color: var(--text-faint); margin-top: 4px;
        }
        .brain-cost {
          border: 1px solid var(--teal-border); border-radius: 10px;
          padding: 28px; background: var(--teal-dim);
        }
        .brain-cost-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .brain-cost-item { text-align: center; }
        .brain-cost-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; color: var(--teal); line-height: 1;
        }
        .brain-cost-label {
          font-size: 11px; color: var(--text-dim); margin-top: 6px; line-height: 1.5;
        }

        /* ── Brain orbit ── */
        .brain-orbit-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 340px;
        }
        .brain-orbit {
          position: relative; width: 320px; height: 320px;
        }
        .brain-core {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(0,255,252,0.06);
          border: 1px solid rgba(0,255,252,0.3);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2px;
          z-index: 2;
          box-shadow: 0 0 40px rgba(0,255,252,0.1);
        }
        .brain-core-label {
          font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); font-weight: 500;
        }
        .brain-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid rgba(0,255,252,0.08);
        }
        .brain-ring-1 {
          inset: 30px;
          animation: orbit-spin 20s linear infinite;
        }
        .brain-ring-2 {
          inset: 0px;
          animation: orbit-spin 30s linear infinite reverse;
        }
        .brain-node {
          position: absolute; top: 50%; left: 50%;
          width: 48px; height: 48px; margin: -24px 0 0 -24px;
          transform: rotate(var(--angle)) translateX(calc((320px - 60px) / 2 - 24px)) rotate(calc(-1 * var(--angle)));
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(0,255,252,0.05);
          border: 1px solid rgba(0,255,252,0.2);
          transition: border-color 0.3s, background 0.3s;
        }
        .brain-ring-1 .brain-node {
          transform: rotate(var(--angle)) translateX(calc((320px - 60px) / 2 - 54px)) rotate(calc(-1 * var(--angle)));
        }
        .brain-ring-1 .brain-node { animation: counter-orbit 20s linear infinite; }
        .brain-ring-2 .brain-node { animation: counter-orbit 30s linear infinite reverse; }
        .brain-node:hover { border-color: rgba(0,255,252,0.5); background: rgba(0,255,252,0.1); }
        .brain-node span {
          font-size: 8px; letter-spacing: 0.5px; color: var(--text-dim);
          font-weight: 500; white-space: nowrap;
        }
        @keyframes orbit-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes counter-orbit { 0% { transform: rotate(var(--angle)) translateX(calc((320px - 60px) / 2 - 24px)) rotate(calc(-1 * var(--angle) - 0deg)); } 100% { transform: rotate(var(--angle)) translateX(calc((320px - 60px) / 2 - 24px)) rotate(calc(-1 * var(--angle) - 360deg)); } }

        /* ── Case study mini chart ── */
        .case-chart {
          margin-top: 8px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* ═══════════════════════════════════
           6. CASE STUDIES
        ═══════════════════════════════════ */
        .cases-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .case-card {
          border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
          padding: 32px 28px; background: rgba(255,255,255,0.02);
          display: flex; flex-direction: column; gap: 16px;
          transition: border-color 0.3s;
        }
        .case-card:hover { border-color: var(--teal-border); }
        .case-badges { display: flex; flex-wrap: wrap; gap: 6px; }
        .case-badge {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); border: 1px solid var(--teal-border);
          padding: 3px 8px; border-radius: 3px; background: var(--teal-dim);
        }
        .case-name {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text);
        }
        .case-desc { font-size: 13px; color: var(--text-dim); line-height: 1.8; }
        .case-metrics { display: flex; gap: 24px; flex-wrap: wrap; }
        .case-metric-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 24px; font-weight: 700; color: var(--teal); line-height: 1;
        }
        .case-metric-label { font-size: 10px; color: var(--text-dim); margin-top: 4px; }
        .case-quote {
          font-size: 12px; font-style: italic; color: var(--text-dim);
          border-left: 2px solid var(--teal-border); padding-left: 14px;
          line-height: 1.7;
        }

        /* ═══════════════════════════════════
           7. BLOG PREVIEW
        ═══════════════════════════════════ */
        .blog-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .blog-card {
          border: 1px solid rgba(232,245,242,0.08); border-radius: 8px;
          padding: 24px 22px; background: rgba(232,245,242,0.02);
          text-decoration: none; display: flex; flex-direction: column; gap: 12px;
          transition: border-color 0.2s, background 0.2s;
        }
        .blog-card:hover { border-color: var(--teal-border); background: var(--teal-dim); }
        .blog-card-cat {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); border: 1px solid var(--teal-border);
          padding: 2px 7px; border-radius: 3px; background: var(--teal-dim);
          align-self: flex-start;
        }
        .blog-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--text); line-height: 1.4; flex: 1;
        }
        .blog-card-meta { font-size: 10px; color: var(--text-faint); }
        .blog-card-arrow {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--teal); display: flex; align-items: center; gap: 5px;
          opacity: 0; transition: opacity 0.2s;
        }
        .blog-card:hover .blog-card-arrow { opacity: 1; }

        /* ═══════════════════════════════════
           8. RISORSE GRATUITE
        ═══════════════════════════════════ */
        .risorse-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .risorsa-card {
          border: 1px solid rgba(0,255,252,0.12); border-radius: 10px;
          padding: 28px 24px; background: rgba(0,255,252,0.025);
          display: flex; flex-direction: column; gap: 14px;
          text-decoration: none; position: relative; overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
        }
        .risorsa-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, var(--teal), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .risorsa-card:hover { border-color: rgba(0,255,252,0.3); background: rgba(0,255,252,0.05); transform: translateY(-3px); }
        .risorsa-card:hover::before { opacity: 1; }
        .risorsa-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); border: 1px solid var(--teal-border);
          padding: 3px 8px; border-radius: 3px; background: var(--teal-dim);
          width: fit-content;
        }
        .risorsa-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(0,255,252,0.08); border: 1px solid rgba(0,255,252,0.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal); flex-shrink: 0;
        }
        .risorsa-name {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 17px; font-weight: 700; color: var(--text); line-height: 1.3;
        }
        .risorsa-desc { font-size: 12px; color: var(--text-dim); line-height: 1.7; flex: 1; }
        .risorsa-cta {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); display: flex; align-items: center; gap: 6px;
          transition: gap 0.2s;
        }
        .risorsa-card:hover .risorsa-cta { gap: 10px; }

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
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 1200px) {
          .hero-grid { gap: 48px; }
          .brain-grid { grid-template-columns: 1fr; }
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
          .tabs-nav { overflow-x: auto; }
          .tabs-panel { padding: 28px 24px; }
          .scenario-grid { grid-template-columns: 1fr; }
          .cases-grid { grid-template-columns: 1fr; }
          .blog-grid { grid-template-columns: 1fr; }
          .risorse-grid { grid-template-columns: 1fr; }
          .brain-orbit-wrap { min-height: 280px; }
          .brain-orbit { width: 260px; height: 260px; }
          .brain-cost-grid { grid-template-columns: 1fr; gap: 16px; }
        }
        @media (max-width: 480px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 20px; }
          .hero-grid { padding: 40px 20px 48px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions a { justify-content: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; }
          .tabs-btn { padding: 10px 14px; font-size: 9px; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════ */}
      <div className="min-h-[calc(100vh-var(--nav-h))] flex items-center">
        <div className="hero-grid">
          {/* ── Left ── */}
          <div className="hero-left">
            <div className="hero-pre">Per aziende B2B, E-commerce e Startup</div>

            <h1 className="hero-h1">
              La mente di un ufficio marketing.<br />
              <span style={{ color: "var(--teal)" }}>In una sola persona.</span>
            </h1>

            <p className="hero-sub">
              Strategia, numeri e crescita &mdash; senza assumere un team interno.
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

          {/* Fractional CMO */}
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
          4. PRIMI 30 GIORNI — Tabs
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">Come lavoro</div>
        <h2 className="hp-h2">
          Cosa cambia per te <em>dal giorno 1</em>
        </h2>
        <p className="hp-subtitle" style={{ marginBottom: "40px" }}>
          Impegno minimo: 3 mesi. Ecco cosa succede nei primi 30 giorni.
        </p>

        <TabsClient />

        <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8, marginTop: "32px", maxWidth: "780px" }}>
          <strong style={{ color: "var(--text)" }}>Mese 2&ndash;3:</strong> si testa sul mercato, si trova dove il funnel perde, si calibra. Entro 90 giorni sai gi&agrave; se la macchina funziona &mdash; o cosa va cambiato.
        </p>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          5. BRAIN COMPANY (AI)
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">AI-Powered</div>
        <h2 className="hp-h2">
          Il cervello digitale <em>della tua azienda</em>
        </h2>
        <p className="hp-subtitle" style={{ marginBottom: "48px" }}>
          Creo un progetto AI dedicato al tuo business: testi, dati, procedure, tutto in un posto. Collegato ai tuoi strumenti. Operativo dal giorno 1.
        </p>

        <div className="brain-grid">
          {/* Left — text + impact */}
          <div>
            <div style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8, marginBottom: "32px", maxWidth: "540px" }}>
              Un progetto Claude Code configurato sulla tua azienda: contesto, storico, obiettivi, KPI. Con skill personalizzate e connettori ai tuoi strumenti di lavoro. <strong style={{ color: "var(--text)" }}>Pochissimi lo offrono. &Egrave; integrato nel mio servizio.</strong>
            </div>

            <div className="brain-cost">
              <div style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--teal)", marginBottom: "20px" }}>
                Ipotesi di impatto
              </div>
              <div className="brain-cost-grid">
                <div className="brain-cost-item">
                  <div className="brain-cost-value">~20h</div>
                  <div className="brain-cost-label">Ore risparmiate al mese su task ripetitivi</div>
                </div>
                <div className="brain-cost-item">
                  <div className="brain-cost-value">3&times;</div>
                  <div className="brain-cost-label">Velocit&agrave; di risposta su analisi e report</div>
                </div>
                <div className="brain-cost-item">
                  <div className="brain-cost-value">&euro;0</div>
                  <div className="brain-cost-label">Costo aggiuntivo &mdash; incluso nel servizio</div>
                </div>
                <div className="brain-cost-item">
                  <div className="brain-cost-value">1 giorno</div>
                  <div className="brain-cost-label">Per avere il setup operativo</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Orbit visualization */}
          <div className="brain-orbit-wrap">
            <div className="brain-orbit">
              {/* Center core */}
              <div className="brain-core">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5">
                  <path d="M12 2a4 4 0 014 4c0 1.95-2 4-4 6-2-2-4-4.05-4-6a4 4 0 014-4z"/>
                  <path d="M12 12v10M8 22h8"/>
                </svg>
                <span className="brain-core-label">AI Brain</span>
              </div>
              {/* Orbit ring 1 */}
              <div className="brain-ring brain-ring-1">
                <div className="brain-node" style={{"--angle":"0deg"} as React.CSSProperties}><span>Gmail</span></div>
                <div className="brain-node" style={{"--angle":"120deg"} as React.CSSProperties}><span>Slack</span></div>
                <div className="brain-node" style={{"--angle":"240deg"} as React.CSSProperties}><span>Notion</span></div>
              </div>
              {/* Orbit ring 2 */}
              <div className="brain-ring brain-ring-2">
                <div className="brain-node" style={{"--angle":"60deg"} as React.CSSProperties}><span>CRM</span></div>
                <div className="brain-node" style={{"--angle":"180deg"} as React.CSSProperties}><span>Analytics</span></div>
                <div className="brain-node" style={{"--angle":"300deg"} as React.CSSProperties}><span>Billing</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          6. CASE STUDIES
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">Risultati reali</div>
        <h2 className="hp-h2">
          Numeri, non promesse.
        </h2>

        <div className="cases-grid" style={{ marginTop: "40px" }}>
          {/* Case 1 */}
          <div className="case-card">
            <div className="case-badges">
              <span className="case-badge">E-commerce</span>
              <span className="case-badge">Nutrition</span>
            </div>
            <div className="case-name">Balance Nutrition</div>
            <div className="case-desc">
              E-commerce alimentare. Fatturato bloccato a &euro;45k/mese, campagne non ottimizzate, AOV basso. In 4 mesi: strategia, catalogo, funnel.
            </div>
            <div className="case-metrics">
              <div>
                <div className="case-metric-value">+200%</div>
                <div className="case-metric-label">Fatturato mensile</div>
              </div>
              <div>
                <div className="case-metric-value">+33%</div>
                <div className="case-metric-label">AOV</div>
              </div>
              <div>
                <div className="case-metric-value">4 mesi</div>
                <div className="case-metric-label">Time to result</div>
              </div>
            </div>
            {/* Mini revenue growth chart */}
            <div className="case-chart">
              <svg width="100%" height="48" viewBox="0 0 200 48" preserveAspectRatio="none">
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,255,252,0.2)"/><stop offset="100%" stopColor="rgba(0,255,252,0)"/></linearGradient></defs>
                <path d="M0 44 L40 40 L80 36 L120 28 L160 18 L200 6" fill="none" stroke="var(--teal)" strokeWidth="1.5" opacity="0.6"/>
                <path d="M0 44 L40 40 L80 36 L120 28 L160 18 L200 6 V48 H0 Z" fill="url(#g1)"/>
              </svg>
            </div>
          </div>

          {/* Case 2 */}
          <div className="case-card">
            <div className="case-badges">
              <span className="case-badge">Info-product</span>
              <span className="case-badge">Lancio</span>
            </div>
            <div className="case-name">Lancio Yoga</div>
            <div className="case-desc">
              Lancio corso online da zero. Budget &euro;3.000, strategia Meta completa: CPL ottimizzato, CBO, early bird, retargeting 24h.
            </div>
            <div className="case-metrics">
              <div>
                <div className="case-metric-value">&euro;19K</div>
                <div className="case-metric-label">Revenue da &euro;3K budget</div>
              </div>
              <div>
                <div className="case-metric-value">&euro;1</div>
                <div className="case-metric-label">CPL finale</div>
              </div>
              <div>
                <div className="case-metric-value">3.000</div>
                <div className="case-metric-label">Iscritti</div>
              </div>
            </div>
            {/* Mini funnel chart */}
            <div className="case-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <rect x="0" y="4" width="200" height="8" rx="4" fill="rgba(0,255,252,0.06)"/>
                <rect x="0" y="4" width="200" height="8" rx="4" fill="rgba(0,255,252,0.15)"/>
                <rect x="0" y="18" width="130" height="8" rx="4" fill="rgba(0,255,252,0.25)"/>
                <rect x="0" y="32" width="60" height="8" rx="4" fill="var(--teal)" opacity="0.5"/>
                <text x="204" y="11" fontSize="7" fill="var(--text-faint)">3K iscritti</text>
                <text x="134" y="25" fontSize="7" fill="var(--text-faint)">show-up 20%</text>
                <text x="64" y="39" fontSize="7" fill="var(--teal)">&#8364;19K rev</text>
              </svg>
            </div>
          </div>

          {/* Case 3 */}
          <div className="case-card">
            <div className="case-badges">
              <span className="case-badge">B2B</span>
              <span className="case-badge">Lead Gen</span>
            </div>
            <div className="case-name">Autonoleggio</div>
            <div className="case-desc">
              CPL competitor: &euro;10. CPL di partenza: &euro;25. Landing con angolo differenziante, 10 creative full funnel.
            </div>
            <div className="case-metrics">
              <div>
                <div className="case-metric-value">&euro;4,50</div>
                <div className="case-metric-label">CPL finale</div>
              </div>
              <div>
                <div className="case-metric-value">80%+</div>
                <div className="case-metric-label">Lead quality</div>
              </div>
            </div>
            {/* CPL drop bar chart */}
            <div className="case-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <rect x="10" y="2" width="40" height="36" rx="4" fill="rgba(255,255,255,0.06)"/>
                <rect x="80" y="20" width="40" height="18" rx="4" fill="rgba(0,255,252,0.2)"/>
                <rect x="150" y="28" width="40" height="10" rx="4" fill="var(--teal)" opacity="0.5"/>
                <text x="30" y="16" textAnchor="middle" fontSize="8" fill="var(--text-faint)">&#8364;25</text>
                <text x="100" y="16" textAnchor="middle" fontSize="8" fill="var(--text-dim)">&#8364;10</text>
                <text x="170" y="24" textAnchor="middle" fontSize="8" fill="var(--teal)">&#8364;4,50</text>
              </svg>
            </div>
          </div>

          {/* Case 4 */}
          <div className="case-card">
            <div className="case-badges">
              <span className="case-badge">B2C</span>
              <span className="case-badge">Pneumatici</span>
            </div>
            <div className="case-name">Pneumatici — ROAS 16</div>
            <div className="case-desc">
              Settore commodity. Meta Ads con strategia stagionale e segmentazione per tipologia veicolo.
            </div>
            <div className="case-metrics">
              <div>
                <div className="case-metric-value">ROAS 16</div>
                <div className="case-metric-label">Return on Ad Spend</div>
              </div>
            </div>
            {/* ROAS gauge */}
            <div className="case-chart">
              <svg width="100%" height="40" viewBox="0 0 200 40">
                <rect x="0" y="16" width="200" height="8" rx="4" fill="rgba(255,255,255,0.06)"/>
                <rect x="0" y="16" width="160" height="8" rx="4" fill="var(--teal)" opacity="0.4"/>
                <text x="164" y="14" fontSize="8" fill="var(--teal)">ROAS 16</text>
                <text x="164" y="36" fontSize="7" fill="var(--text-faint)">media settore: 4</text>
                <line x1="50" y1="14" x2="50" y2="26" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2"/>
                <text x="50" y="10" textAnchor="middle" fontSize="6" fill="var(--text-faint)">avg</text>
              </svg>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <Link href="/cosa-ho-fatto" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", textDecoration: "none" }}>
            Vedi tutti i casi &rarr;
          </Link>
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          7. BLOG PREVIEW
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
          <h2 className="hp-h2" style={{ marginBottom: 0 }}>
            Dal campo. <em>Senza filtri.</em>
          </h2>
          <Link href="/blog" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", textDecoration: "none", flexShrink: 0 }}>
            Tutti gli articoli &rarr;
          </Link>
        </div>
        <div className="blog-grid">
          {[
            { slug: "prime-settimane-consulente-marketing", category: "Metodo", title: "Prima della strategia, si mappa. Cosa fa un buon consulente nelle prime settimane.", readTime: "7 min" },
            { slug: "test-ab-significanza-statistica", category: "Analytics", title: "Il tuo test A/B ha mostrato +18%. Probabilmente non significa niente.", readTime: "9 min" },
            { slug: "roas-non-e-un-kpi", category: "Analytics", title: "Il ROAS non \u00e8 un KPI. Ecco cosa guardare invece.", readTime: "8 min" },
          ].map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-card-cat">{post.category}</span>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-meta">{post.readTime} lettura</div>
              <div className="blog-card-arrow">
                Leggi <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          8. RISORSE GRATUITE
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="hp-eyebrow">&#9733; Gratis &mdash; senza registrazione</div>
          <h2 className="hp-h2">
            Strumenti pratici <em>per decidere meglio.</em>
          </h2>
          <p className="hp-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Tre risorse gratuite alimentate da AI. Rispondono alle domande che ogni imprenditore si fa sul proprio marketing.
          </p>
        </div>
        <div className="risorse-grid">
          {/* KPI Calculator */}
          <Link href="/risorse/kpi-calculator" className="risorsa-card">
            <div className="risorsa-badge">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              AI-Powered
            </div>
            <div className="risorsa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <div className="risorsa-name">KPI Calculator</div>
            <div className="risorsa-desc">
              Inserisci budget, fatturato e margine. Ricevi un&apos;analisi AI con 3 scenari di crescita e i KPI che contano davvero.
            </div>
            <div className="risorsa-cta">
              Calcola ora <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>

          {/* Marketing Audit */}
          <Link href="/risorse/audit-score" className="risorsa-card">
            <div className="risorsa-badge">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              AI-Powered
            </div>
            <div className="risorsa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            </div>
            <div className="risorsa-name">Marketing Audit</div>
            <div className="risorsa-desc">
              10 domande sul tuo stack marketing. L&apos;AI diagnostica i gap critici e ti d&agrave; 3 priorit&agrave; concrete.
            </div>
            <div className="risorsa-cta">
              Fai il test <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>

          {/* Fractional CMO Check */}
          <Link href="/risorse/fractional-cmo" className="risorsa-card">
            <div className="risorsa-badge">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              AI-Powered
            </div>
            <div className="risorsa-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div className="risorsa-name">Fractional CMO Check</div>
            <div className="risorsa-desc">
              Self-assessment in 5 minuti. L&apos;AI analizza fase, team e obiettivi e ti dice quale figura ti serve.
            </div>
            <div className="risorsa-cta">
              Scopri il tuo profilo <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </Link>
        </div>
      </div>

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
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   TABS CLIENT COMPONENT — "Primi 30 giorni"
   Inline client component using state for tab switching
══════════════════════════════════════════════════════════ */
function TabsClient() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-tab-btn]');
          if (!btn) return;
          var wrap = btn.closest('[data-tabs]');
          if (!wrap) return;
          var idx = btn.getAttribute('data-tab-btn');
          wrap.querySelectorAll('[data-tab-btn]').forEach(function(b) { b.setAttribute('data-active', 'false'); });
          btn.setAttribute('data-active', 'true');
          wrap.querySelectorAll('[data-tab-panel]').forEach(function(p) {
            p.style.display = p.getAttribute('data-tab-panel') === idx ? 'flex' : 'none';
          });
        });
      `}} />
      <div data-tabs="">
        <div className="tabs-nav">
          <button className="tabs-btn" data-tab-btn="0" data-active="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight:"6px",verticalAlign:"middle"}}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            Settimana 1
          </button>
          <button className="tabs-btn" data-tab-btn="1" data-active="false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight:"6px",verticalAlign:"middle"}}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Settimana 1&ndash;2
          </button>
          <button className="tabs-btn" data-tab-btn="2" data-active="false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight:"6px",verticalAlign:"middle"}}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 4v16"/></svg>
            Settimana 2&ndash;4
          </button>
          <button className="tabs-btn" data-tab-btn="3" data-active="false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginRight:"6px",verticalAlign:"middle"}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Setup operativo
          </button>
        </div>

        {/* Tab 0 — Analisi risorse */}
        <div className="tabs-panel" data-tab-panel="0" style={{ display: "flex" }}>
          <div className="tab-title">Analisi risorse</div>
          <div className="tab-desc">
            Chi fa cosa nella tua azienda. Cosa manca. Cosa serve da fuori &mdash; te lo dico subito, non tra 2 mesi.
          </div>
          <div className="tab-pills">
            <div className="tab-pill"><span className="tab-pill-icon">&#9679;</span> Team interno</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#9679;</span> Canali attivi</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#9679;</span> Budget reale</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#9679;</span> Gap di competenze</div>
          </div>
        </div>

        {/* Tab 1 — Tracking audit */}
        <div className="tabs-panel" data-tab-panel="1" style={{ display: "none" }}>
          <div className="tab-title">Tracking audit</div>
          <div className="tab-desc">
            Se i dati sono sporchi, ogni decisione &egrave; sbagliata. Si sistema prima di analizzare qualsiasi cosa.
          </div>
          <div className="tab-pills">
            <div className="tab-pill"><span className="tab-pill-icon">&#10003;</span> GA4</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#10003;</span> Server-side API</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#10003;</span> Consent Mode</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#10003;</span> Pixel Meta</div>
            <div className="tab-pill"><span className="tab-pill-icon">&#10003;</span> GDPR</div>
          </div>
        </div>

        {/* Tab 2 — Unit economics */}
        <div className="tabs-panel" data-tab-panel="2" style={{ display: "none" }}>
          <div className="tab-title">Unit economics + forecasting</div>
          <div className="tab-desc">
            Non ROAS. Non CPM. Cosa ti resta in tasca per ogni vendita. Tre scenari per decidere dove investire.
          </div>
          <div className="scenario-grid">
            <div className="scenario-card">
              <div className="scenario-label">Scenario A</div>
              <div className="scenario-value">8%</div>
              <div className="scenario-note">Come sei ora</div>
            </div>
            <div className="scenario-card scenario-card-active">
              <div className="scenario-label">Scenario B</div>
              <div className="scenario-value">14%</div>
              <div className="scenario-note">Ottimizzato, +0 budget</div>
            </div>
            <div className="scenario-card">
              <div className="scenario-label">Scenario C</div>
              <div className="scenario-value">12%</div>
              <div className="scenario-note">Scalato con +budget</div>
            </div>
          </div>
        </div>

        {/* Tab 3 — Setup operativo */}
        <div className="tabs-panel" data-tab-panel="3" style={{ display: "none" }}>
          <div className="tab-title">Il cervello del progetto</div>
          <div className="tab-desc">
            Tutto in un posto. Sempre aggiornato. Niente perso in email o chat.
          </div>
          <div className="stack-list">
            <div className="stack-item">
              <div className="stack-icon">N</div>
              <div className="stack-text"><strong>Notion</strong> &mdash; Playbook operativo, task, decisioni</div>
            </div>
            <div className="stack-item">
              <div className="stack-icon">C</div>
              <div className="stack-text"><strong>Claude Project</strong> &mdash; Contesto business sempre accessibile</div>
            </div>
            <div className="stack-item">
              <div className="stack-icon">D</div>
              <div className="stack-text"><strong>Google Drive</strong> &mdash; Documenti, asset, report</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
