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
   6. Case Studies (3D orbital carousel)
   7. Blog preview
   8. Risorse gratuite
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
           4. PRIMI 30 GIORNI — Dual Timeline
        ═══════════════════════════════════ */
        .dtl-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; margin-top: 32px; position: relative;
        }
        .dtl-col {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative;
        }
        /* Top row: what I do */
        .dtl-top {
          padding: 0 12px 28px; min-height: 120px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .dtl-period {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: 0.7;
        }
        .dtl-action-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 15px; font-weight: 700; color: var(--text);
        }
        .dtl-action-desc {
          font-size: 11px; color: var(--text-dim); line-height: 1.7;
          max-width: 240px;
        }
        /* Center: dot + connector */
        .dtl-center {
          position: relative; height: 48px;
          display: flex; align-items: center; justify-content: center;
        }
        .dtl-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: rgba(0,255,252,0.2); border: 2px solid var(--teal);
          position: relative; z-index: 2;
          box-shadow: 0 0 12px rgba(0,255,252,0.2);
        }
        .dtl-connector {
          position: absolute; top: 50%; left: 0; right: 0;
          height: 1px; z-index: 1;
          background: linear-gradient(90deg, rgba(0,255,252,0.05), rgba(0,255,252,0.2), rgba(0,255,252,0.05));
          transform: translateY(-50%);
        }
        .dtl-col:first-child .dtl-connector { left: 50%; }
        .dtl-col:last-child .dtl-connector { right: 50%; }
        /* Bottom row: what it means for you */
        .dtl-bottom {
          padding: 28px 12px 0; min-height: 100px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .dtl-impact-label {
          font-size: 8px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); opacity: 0.5; margin-bottom: 4px;
        }
        .dtl-impact-text {
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
          max-width: 220px;
        }
        .dtl-impact-text strong { color: var(--text); font-weight: 500; }

        /* ═══════════════════════════════════
           5. BRAIN COMPANY (AI)
        ═══════════════════════════════════ */
        .brain-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center;
        }
        .brain-benefit-cards {
          display: flex; flex-direction: column; gap: 16px;
          margin-top: 24px;
        }
        .brain-benefit {
          border: 1px solid rgba(0,255,252,0.15); border-radius: 10px;
          padding: 24px 24px; background: rgba(0,255,252,0.03);
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
        .brain-benefit-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px; font-weight: 700; color: var(--teal);
          margin-bottom: 8px;
        }
        .brain-benefit-desc {
          font-size: 13px; color: var(--text-dim); line-height: 1.7;
        }

        /* ── Brain SVG illustration ── */
        .brain-svg-wrap {
          display: flex; align-items: center; justify-content: center;
          min-height: 380px;
        }
        .brain-svg-container {
          position: relative; width: 340px; height: 340px;
        }
        .brain-svg-float {
          animation: brain-float 6s ease-in-out infinite;
        }
        @keyframes brain-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .brain-orbit-label {
          position: absolute;
          display: flex; align-items: center; justify-content: center;
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(0,255,252,0.06);
          border: 1px solid rgba(0,255,252,0.2);
          font-size: 8px; letter-spacing: 0.5px; color: var(--text-dim);
          font-weight: 500; white-space: nowrap;
          animation: brain-pulse 3s ease-in-out infinite;
        }
        .brain-orbit-label:nth-child(2) { animation-delay: 0.5s; }
        .brain-orbit-label:nth-child(3) { animation-delay: 1s; }
        .brain-orbit-label:nth-child(4) { animation-delay: 1.5s; }
        .brain-orbit-label:nth-child(5) { animation-delay: 2s; }
        .brain-orbit-label:nth-child(6) { animation-delay: 2.5s; }
        @keyframes brain-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* ── Reviews carousel ── */
        .reviews-track-wrap {
          position: relative; overflow: hidden;
          margin: 0 -60px; padding: 0 60px;
        }
        .reviews-track {
          display: flex; gap: 24px; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
          padding: 20px 0;
        }
        .review-card {
          flex: 0 0 calc(50% - 12px); min-width: 340px;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
          padding: 28px 24px; background: rgba(255,255,255,0.02);
          display: flex; flex-direction: column; gap: 12px;
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
          opacity: 0.35; transform: scale(0.95);
        }
        .review-card[data-active="true"] {
          opacity: 1; transform: scale(1);
          border-color: rgba(0,255,252,0.2);
          background: rgba(0,255,252,0.03);
          box-shadow: 0 0 40px rgba(0,255,252,0.04);
        }
        .review-card[data-adjacent="true"] {
          opacity: 0.6; transform: scale(0.97);
        }
        .review-quote-icon {
          color: var(--teal); opacity: 0.3; line-height: 1;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 48px; font-weight: 700; margin-bottom: -12px;
        }
        .review-text {
          font-size: 15px; color: var(--text); line-height: 1.8;
          font-style: italic;
        }
        .review-author {
          display: flex; align-items: center; gap: 12px; margin-top: auto;
        }
        .review-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(0,255,252,0.08); border: 1px solid rgba(0,255,252,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--teal);
          font-family: var(--font-playfair), 'Playfair Display', serif;
        }
        .review-author-info { display: flex; flex-direction: column; gap: 2px; }
        .review-author-name {
          font-size: 13px; font-weight: 500; color: var(--text);
        }
        .review-author-role {
          font-size: 10px; color: var(--text-dim); letter-spacing: 0.5px;
        }
        .reviews-nav {
          display: flex; justify-content: center; gap: 12px; margin-top: 28px;
        }
        .reviews-nav-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: var(--text-dim); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .reviews-nav-btn:hover {
          border-color: var(--teal-border); color: var(--teal);
          background: var(--teal-dim);
        }
        .reviews-dots {
          display: flex; align-items: center; gap: 8px;
        }
        .reviews-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.12); transition: all 0.3s;
          border: none; cursor: pointer; padding: 0;
        }
        .reviews-dot[data-active="true"] {
          background: var(--teal); width: 24px; border-radius: 4px;
        }

        /* ═══════════════════════════════════
           6. CASE STUDIES — 3D Orbital Carousel
        ═══════════════════════════════════ */
        .orbital-stage {
          perspective: 1400px;
          height: 400px;
          position: relative;
          overflow: visible;
          margin-top: 40px;
        }
        .orbital-track {
          position: relative;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .orbital-card {
          position: absolute;
          width: 480px; max-width: 90vw;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
          padding: 32px 28px; background: rgba(255,255,255,0.02);
          display: flex; flex-direction: column; gap: 16px;
          transition: all .65s cubic-bezier(.25,.46,.45,.94);
          will-change: transform, opacity;
        }
        .orbital-card.pos-center {
          transform: translateX(-50%) translateZ(0) rotateY(0deg) scale(1);
          left: 50%; opacity: 1; z-index: 4;
          border-color: rgba(0,255,252,0.25);
          box-shadow: 0 0 60px rgba(0,255,252,0.08);
        }
        .orbital-card.pos-left {
          transform: translateX(-380px) translateX(-50%) scale(0.78) rotateY(12deg);
          left: 50%; opacity: 0.4; z-index: 2;
        }
        .orbital-card.pos-right {
          transform: translateX(380px) translateX(-50%) scale(0.78) rotateY(-12deg);
          left: 50%; opacity: 0.4; z-index: 2;
        }
        .orbital-card.pos-exit-left {
          transform: translateX(-700px) translateX(-50%) scale(0.6) rotateY(20deg);
          left: 50%; opacity: 0; z-index: 0; pointer-events: none;
        }
        .orbital-card.pos-exit-right {
          transform: translateX(700px) translateX(-50%) scale(0.6) rotateY(-20deg);
          left: 50%; opacity: 0; z-index: 0; pointer-events: none;
        }
        /* Gradient overlay for left/right cards */
        .orbital-card.pos-left::after,
        .orbital-card.pos-right::after {
          content: ''; position: absolute; inset: 0; border-radius: 10px;
          pointer-events: none;
        }
        .orbital-card.pos-left::after {
          background: linear-gradient(90deg, rgba(10,14,13,0.7), transparent);
        }
        .orbital-card.pos-right::after {
          background: linear-gradient(-90deg, rgba(10,14,13,0.7), transparent);
        }
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
        /* Carousel arrows */
        .orbital-arrows {
          display: flex; justify-content: center; align-items: center;
          gap: 16px; margin-top: 24px;
        }
        .orbital-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: var(--text-dim); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .orbital-arrow:hover {
          border-color: var(--teal-border); color: var(--teal);
          background: var(--teal-dim);
        }
        .orbital-dots {
          display: flex; align-items: center; gap: 8px;
        }
        .orbital-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.12); transition: all 0.3s;
          border: none; cursor: pointer; padding: 0;
        }
        .orbital-dot[data-active="true"] {
          background: var(--teal); width: 24px; border-radius: 4px;
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
          .orbital-card { width: 400px; }
          .orbital-card.pos-left { transform: translateX(-300px) translateX(-50%) scale(0.78) rotateY(12deg); }
          .orbital-card.pos-right { transform: translateX(300px) translateX(-50%) scale(0.78) rotateY(-12deg); }
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
          .dtl-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .dtl-connector { display: none; }
          .orbital-stage { height: auto; min-height: 400px; perspective: none; }
          .orbital-card { position: relative; left: auto; width: 100%; max-width: 100%;
            transform: none !important; opacity: 1 !important; display: none; }
          .orbital-card.pos-center { display: flex; }
          .blog-grid { grid-template-columns: 1fr; }
          .risorse-grid { grid-template-columns: 1fr; }
          .brain-svg-wrap { min-height: 280px; }
          .brain-svg-container { width: 260px; height: 260px; }
          .reviews-track-wrap { margin: 0 -32px; padding: 0 32px; }
          .review-card { flex: 0 0 calc(80% - 12px); min-width: 280px; }
        }
        @media (max-width: 480px) {
          .hp-wrap, .hp-wrap-narrow { padding: 0 20px; }
          .hero-grid { padding: 40px 20px 48px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .hero-actions a { justify-content: center; }
          .hp-btn-primary, .hp-btn-secondary { width: 100%; justify-content: center; }
          .dtl-grid { grid-template-columns: 1fr; }
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

        {/* Row labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--teal)", opacity: 0.6 }}>&#9650; Cosa faccio io</div>
        </div>

        <div className="dtl-grid">
          {/* Col 1 */}
          <div className="dtl-col">
            <div className="dtl-top">
              <div className="dtl-period">Settimana 1</div>
              <div className="dtl-action-title">Analisi risorse</div>
              <div className="dtl-action-desc">Mappo team, canali, budget. Ti dico subito cosa serve da fuori.</div>
            </div>
            <div className="dtl-center">
              <div className="dtl-connector" />
              <div className="dtl-dot" />
            </div>
            <div className="dtl-bottom">
              <div className="dtl-impact-label">Per te</div>
              <div className="dtl-impact-text"><strong>Chiarezza immediata</strong> su dove stai spendendo e cosa manca.</div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="dtl-col">
            <div className="dtl-top">
              <div className="dtl-period">Settimana 1&ndash;2</div>
              <div className="dtl-action-title">Tracking audit</div>
              <div className="dtl-action-desc">GA4, Pixel Meta, Consent Mode, GDPR. Dati puliti prima di decidere.</div>
            </div>
            <div className="dtl-center">
              <div className="dtl-connector" />
              <div className="dtl-dot" />
            </div>
            <div className="dtl-bottom">
              <div className="dtl-impact-label">Per te</div>
              <div className="dtl-impact-text"><strong>Decisioni basate su dati reali</strong>, non su numeri sporchi.</div>
            </div>
          </div>

          {/* Col 3 */}
          <div className="dtl-col">
            <div className="dtl-top">
              <div className="dtl-period">Settimana 2&ndash;4</div>
              <div className="dtl-action-title">Unit economics</div>
              <div className="dtl-action-desc">Margine reale per vendita. Tre scenari di crescita e forecasting.</div>
            </div>
            <div className="dtl-center">
              <div className="dtl-connector" />
              <div className="dtl-dot" />
            </div>
            <div className="dtl-bottom">
              <div className="dtl-impact-label">Per te</div>
              <div className="dtl-impact-text"><strong>Sai esattamente quanto investire</strong> e cosa aspettarti.</div>
            </div>
          </div>

          {/* Col 4 */}
          <div className="dtl-col">
            <div className="dtl-top">
              <div className="dtl-period">Setup</div>
              <div className="dtl-action-title">Brain Company</div>
              <div className="dtl-action-desc">Notion + Claude AI + Drive. Il cervello operativo del tuo progetto.</div>
            </div>
            <div className="dtl-center">
              <div className="dtl-connector" />
              <div className="dtl-dot" />
            </div>
            <div className="dtl-bottom">
              <div className="dtl-impact-label">Per te</div>
              <div className="dtl-impact-text"><strong>Tutto in un posto</strong>, sempre aggiornato. Zero email perse.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-faint)" }}>&#9660; Cosa significa per la tua azienda</div>
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.8, marginTop: "32px", maxWidth: "780px" }}>
          <strong style={{ color: "var(--text)" }}>Mese 2&ndash;3:</strong> si testa sul mercato, si trova dove il funnel perde, si calibra. Entro 90 giorni sai gi&agrave; se la macchina funziona &mdash; o cosa va cambiato.
        </p>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          5. BRAIN COMPANY (AI) — Rewritten
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
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
        <p className="hp-subtitle" style={{ marginBottom: "16px", maxWidth: "600px" }}>
          Il cervello digitale della tua azienda. Se inizi una collaborazione con me, te lo costruisco. &Egrave; il mio modo di lavorare.
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-faint)", marginBottom: "48px" }}>
          Powered by Anthropic Claude &mdash; il modello AI pi&ugrave; avanzato al mondo.
        </p>

        <div className="brain-grid">
          {/* Left — 3 benefit cards */}
          <div>
            <div className="brain-benefit-cards">
              <div className="brain-benefit">
                <div className="brain-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div className="brain-benefit-title">~20h risparmiate al mese</div>
                <div className="brain-benefit-desc">
                  Addio preventivi manuali, report ripetitivi, email di routine. L&apos;AI se ne occupa.
                </div>
              </div>
              <div className="brain-benefit">
                <div className="brain-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><path d="M12 2a4 4 0 014 4c0 1.95-2 4-4 6-2-2-4-4.05-4-6a4 4 0 014-4z"/><path d="M12 12v10M8 22h8"/></svg>
                </div>
                <div className="brain-benefit-title">Un assistente AI che conosce tutto del tuo business</div>
                <div className="brain-benefit-desc">
                  Ogni numero, ogni decisione, ogni cliente. Sempre aggiornato. Ti risponde in secondi su qualsiasi aspetto della tua azienda.
                </div>
              </div>
              <div className="brain-benefit">
                <div className="brain-benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div className="brain-benefit-title">Operativo dal giorno 1</div>
                <div className="brain-benefit-desc">
                  Si configura in un giorno. Gmail, Slack, Notion, CRM, fatturazione &mdash; tutto collegato, tutto che parla.
                </div>
              </div>
            </div>
          </div>

          {/* Right — SVG brain illustration */}
          <div className="brain-svg-wrap">
            <div className="brain-svg-container brain-svg-float">
              {/* Abstract constellation/network brain SVG */}
              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer glow */}
                <defs>
                  <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(0,255,252,0.08)"/>
                    <stop offset="100%" stopColor="rgba(0,255,252,0)"/>
                  </radialGradient>
                </defs>
                <circle cx="170" cy="170" r="120" fill="url(#brain-glow)"/>
                {/* Network lines */}
                <line x1="170" y1="100" x2="120" y2="140" stroke="rgba(0,255,252,0.15)" strokeWidth="1"/>
                <line x1="170" y1="100" x2="220" y2="140" stroke="rgba(0,255,252,0.15)" strokeWidth="1"/>
                <line x1="120" y1="140" x2="140" y2="190" stroke="rgba(0,255,252,0.12)" strokeWidth="1"/>
                <line x1="220" y1="140" x2="200" y2="190" stroke="rgba(0,255,252,0.12)" strokeWidth="1"/>
                <line x1="140" y1="190" x2="200" y2="190" stroke="rgba(0,255,252,0.15)" strokeWidth="1"/>
                <line x1="140" y1="190" x2="130" y2="230" stroke="rgba(0,255,252,0.1)" strokeWidth="1"/>
                <line x1="200" y1="190" x2="210" y2="230" stroke="rgba(0,255,252,0.1)" strokeWidth="1"/>
                <line x1="130" y1="230" x2="170" y2="250" stroke="rgba(0,255,252,0.12)" strokeWidth="1"/>
                <line x1="210" y1="230" x2="170" y2="250" stroke="rgba(0,255,252,0.12)" strokeWidth="1"/>
                <line x1="170" y1="100" x2="170" y2="170" stroke="rgba(0,255,252,0.08)" strokeWidth="1" strokeDasharray="4 4"/>
                <line x1="120" y1="140" x2="100" y2="170" stroke="rgba(0,255,252,0.08)" strokeWidth="1"/>
                <line x1="220" y1="140" x2="240" y2="170" stroke="rgba(0,255,252,0.08)" strokeWidth="1"/>
                <line x1="100" y1="170" x2="140" y2="190" stroke="rgba(0,255,252,0.1)" strokeWidth="1"/>
                <line x1="240" y1="170" x2="200" y2="190" stroke="rgba(0,255,252,0.1)" strokeWidth="1"/>
                {/* Brain nodes */}
                <circle cx="170" cy="100" r="5" fill="rgba(0,255,252,0.3)" stroke="rgba(0,255,252,0.5)" strokeWidth="1"/>
                <circle cx="120" cy="140" r="4" fill="rgba(0,255,252,0.2)" stroke="rgba(0,255,252,0.4)" strokeWidth="1"/>
                <circle cx="220" cy="140" r="4" fill="rgba(0,255,252,0.2)" stroke="rgba(0,255,252,0.4)" strokeWidth="1"/>
                <circle cx="140" cy="190" r="5" fill="rgba(0,255,252,0.3)" stroke="rgba(0,255,252,0.5)" strokeWidth="1"/>
                <circle cx="200" cy="190" r="5" fill="rgba(0,255,252,0.3)" stroke="rgba(0,255,252,0.5)" strokeWidth="1"/>
                <circle cx="170" cy="170" r="6" fill="rgba(0,255,252,0.15)" stroke="rgba(0,255,252,0.4)" strokeWidth="1.5"/>
                <circle cx="100" cy="170" r="3" fill="rgba(0,255,252,0.15)" stroke="rgba(0,255,252,0.3)" strokeWidth="1"/>
                <circle cx="240" cy="170" r="3" fill="rgba(0,255,252,0.15)" stroke="rgba(0,255,252,0.3)" strokeWidth="1"/>
                <circle cx="130" cy="230" r="4" fill="rgba(0,255,252,0.2)" stroke="rgba(0,255,252,0.4)" strokeWidth="1"/>
                <circle cx="210" cy="230" r="4" fill="rgba(0,255,252,0.2)" stroke="rgba(0,255,252,0.4)" strokeWidth="1"/>
                <circle cx="170" cy="250" r="5" fill="rgba(0,255,252,0.3)" stroke="rgba(0,255,252,0.5)" strokeWidth="1"/>
                {/* Center label */}
                <text x="170" y="174" textAnchor="middle" fontSize="7" fill="rgba(0,255,252,0.6)" fontWeight="600" letterSpacing="1">AI</text>
              </svg>
              {/* Orbiting labels */}
              <div className="brain-orbit-label" style={{ top: "16px", left: "50%", marginLeft: "-26px" }}>Gmail</div>
              <div className="brain-orbit-label" style={{ top: "60px", right: "8px" }}>Slack</div>
              <div className="brain-orbit-label" style={{ bottom: "60px", right: "8px" }}>Notion</div>
              <div className="brain-orbit-label" style={{ bottom: "16px", left: "50%", marginLeft: "-26px" }}>CRM</div>
              <div className="brain-orbit-label" style={{ bottom: "60px", left: "8px" }}>Analytics</div>
              <div className="brain-orbit-label" style={{ top: "60px", left: "8px" }}>Billing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          6. CASE STUDIES — 3D Orbital Carousel
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div className="hp-eyebrow">Risultati reali</div>
        <h2 className="hp-h2">
          Numeri, non promesse.
        </h2>

        <CasesCarousel />

        <div style={{ marginTop: "24px" }}>
          <Link href="/cosa-ho-fatto" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", textDecoration: "none" }}>
            Vedi tutti i casi &rarr;
          </Link>
        </div>
      </div>

      <div className="hp-wrap"><div className="hp-divider" /></div>

      {/* ════════════════════════════════════════
          6b. RECENSIONI — Orbital Carousel
      ════════════════════════════════════════ */}
      <div className="hp-wrap hp-section">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="hp-eyebrow">Chi ha lavorato con me</div>
          <h2 className="hp-h2">
            Le parole <em>dei clienti.</em>
          </h2>
        </div>
        <ReviewsCarousel />
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
   CASES CAROUSEL — 3D Orbital
══════════════════════════════════════════════════════════ */
function CasesCarousel() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-case-nav]');
          if (!btn) return;
          var wrap = btn.closest('[data-cases]');
          if (!wrap) return;
          var dir = btn.getAttribute('data-case-nav');
          var cards = wrap.querySelectorAll('[data-case-card]');
          var total = cards.length;
          var curr = parseInt(wrap.getAttribute('data-case-current') || '0');
          var next = dir === 'next' ? (curr + 1) % total : (curr - 1 + total) % total;
          wrap.setAttribute('data-case-current', next);
          updateCasePositions(wrap, next, total);
        });
        document.addEventListener('click', function(e) {
          var dot = e.target.closest('[data-case-dot]');
          if (!dot) return;
          var wrap = dot.closest('[data-cases]');
          var idx = parseInt(dot.getAttribute('data-case-dot'));
          var total = wrap.querySelectorAll('[data-case-card]').length;
          wrap.setAttribute('data-case-current', idx);
          updateCasePositions(wrap, idx, total);
        });
        function updateCasePositions(wrap, curr, total) {
          var cards = wrap.querySelectorAll('[data-case-card]');
          var dots = wrap.querySelectorAll('[data-case-dot]');
          cards.forEach(function(c, i) {
            c.className = 'orbital-card';
            var diff = i - curr;
            if (diff === 0) c.classList.add('pos-center');
            else if (diff === 1 || diff === -(total - 1)) c.classList.add('pos-right');
            else if (diff === -1 || diff === (total - 1)) c.classList.add('pos-left');
            else if (diff > 1) c.classList.add('pos-exit-right');
            else c.classList.add('pos-exit-left');
          });
          dots.forEach(function(d, i) {
            d.setAttribute('data-active', i === curr ? 'true' : 'false');
          });
        }
      `}} />
      <div data-cases="" data-case-current="0">
        <div className="orbital-stage">
          <div className="orbital-track">
            {/* Case 1 */}
            <div className="orbital-card pos-center" data-case-card="0">
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
            </div>

            {/* Case 2 */}
            <div className="orbital-card pos-right" data-case-card="1">
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
            </div>

            {/* Case 3 */}
            <div className="orbital-card pos-exit-right" data-case-card="2">
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
            </div>

            {/* Case 4 */}
            <div className="orbital-card pos-exit-left" data-case-card="3">
              <div className="case-badges">
                <span className="case-badge">B2C</span>
                <span className="case-badge">Pneumatici</span>
              </div>
              <div className="case-name">Pneumatici &mdash; ROAS 16</div>
              <div className="case-desc">
                Settore commodity. Meta Ads con strategia stagionale e segmentazione per tipologia veicolo.
              </div>
              <div className="case-metrics">
                <div>
                  <div className="case-metric-value">ROAS 16</div>
                  <div className="case-metric-label">Return on Ad Spend</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows + dots */}
        <div className="orbital-arrows">
          <button className="orbital-arrow" data-case-nav="prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="orbital-dots">
            <button className="orbital-dot" data-case-dot="0" data-active="true" />
            <button className="orbital-dot" data-case-dot="1" data-active="false" />
            <button className="orbital-dot" data-case-dot="2" data-active="false" />
            <button className="orbital-dot" data-case-dot="3" data-active="false" />
          </div>
          <button className="orbital-arrow" data-case-nav="next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   REVIEWS CAROUSEL — Manual scroll, orbital fading
══════════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    text: "Nicola ha preso in mano il marketing quando non sapevamo nemmeno da dove partire. In 4 mesi ha triplicato il fatturato con un metodo che finalmente ci fa capire i numeri.",
    name: "Marco R.",
    role: "CEO, Brand Nutrition",
    initials: "MR",
    caseHref: "/cosa-ho-fatto/balance-nutrition",
    metric: "+200% fatturato",
  },
  {
    text: "Budget di 3mila euro e ci ha portato 19mila di revenue. Il lancio \u00e8 stato chirurgico: CPL a 1 euro, 3000 iscritti, show-up al 20%. Non avevo mai visto numeri cos\u00ec.",
    name: "Andrea B.",
    role: "Founder, Corso Yoga Online",
    initials: "AB",
    caseHref: "/cosa-ho-fatto/lancio-yoga",
    metric: "\u20ac19K da \u20ac3K",
  },
  {
    text: "Pagavamo 25 euro a lead e i competitor stavano a 10. Nicola ha rifatto landing e creative da zero. Adesso siamo a 4,50 con l\u201980% di lead qualificati.",
    name: "Laura M.",
    role: "Direttrice Marketing, Autonoleggio",
    initials: "LM",
    caseHref: "/cosa-ho-fatto/autonoleggio",
    metric: "CPL \u20ac4,50",
  },
  {
    text: "Il setup AI che ci ha costruito ci fa risparmiare almeno 15 ore a settimana. Non pensavo fosse possibile avere tutto il contesto aziendale sempre accessibile cos\u00ec.",
    name: "Giovanni T.",
    role: "COO, SaaS Startup",
    initials: "GT",
    metric: "~15h/sett",
  },
  {
    text: "ROAS 16 su un settore commodity come i pneumatici. La strategia stagionale che ha impostato funziona da sola, mese dopo mese.",
    name: "Francesca D.",
    role: "E-commerce Manager, Pneumatici",
    initials: "FD",
    caseHref: "/cosa-ho-fatto/pneumatici",
    metric: "ROAS 16",
  },
];

function ReviewsCarousel() {
  return (
    <div>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-review-nav]');
          if (!btn) return;
          var wrap = btn.closest('[data-reviews]');
          if (!wrap) return;
          var dir = btn.getAttribute('data-review-nav');
          var track = wrap.querySelector('[data-review-track]');
          var cards = track.querySelectorAll('[data-review-card]');
          var total = cards.length;
          var curr = parseInt(track.getAttribute('data-current') || '0');
          var next = dir === 'next' ? Math.min(curr + 1, total - 1) : Math.max(curr - 1, 0);
          track.setAttribute('data-current', next);
          // Update active states
          cards.forEach(function(c, i) {
            c.setAttribute('data-active', i === next ? 'true' : 'false');
            c.setAttribute('data-adjacent', (i === next - 1 || i === next + 1) ? 'true' : 'false');
          });
          // Update dots
          wrap.querySelectorAll('[data-review-dot]').forEach(function(d, i) {
            d.setAttribute('data-active', i === next ? 'true' : 'false');
          });
          // Scroll
          var cardWidth = cards[0].offsetWidth + 24;
          var wrapWidth = track.parentElement.offsetWidth;
          var offset = (cardWidth * next) - (wrapWidth / 2) + (cards[0].offsetWidth / 2);
          track.style.transform = 'translateX(' + (-Math.max(0, Math.min(offset, track.scrollWidth - wrapWidth))) + 'px)';
        });
        // Dot click
        document.addEventListener('click', function(e) {
          var dot = e.target.closest('[data-review-dot]');
          if (!dot) return;
          var wrap = dot.closest('[data-reviews]');
          var idx = parseInt(dot.getAttribute('data-review-dot'));
          var track = wrap.querySelector('[data-review-track]');
          var cards = track.querySelectorAll('[data-review-card]');
          track.setAttribute('data-current', idx);
          cards.forEach(function(c, i) {
            c.setAttribute('data-active', i === idx ? 'true' : 'false');
            c.setAttribute('data-adjacent', (i === idx - 1 || i === idx + 1) ? 'true' : 'false');
          });
          wrap.querySelectorAll('[data-review-dot]').forEach(function(d, i) {
            d.setAttribute('data-active', i === idx ? 'true' : 'false');
          });
          var cardWidth = cards[0].offsetWidth + 24;
          var wrapWidth = track.parentElement.offsetWidth;
          var offset = (cardWidth * idx) - (wrapWidth / 2) + (cards[0].offsetWidth / 2);
          track.style.transform = 'translateX(' + (-Math.max(0, Math.min(offset, track.scrollWidth - wrapWidth))) + 'px)';
        });
      `}} />
      <div data-reviews="">
        <div className="reviews-track-wrap">
          <div className="reviews-track" data-review-track="" data-current="0">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="review-card"
                data-review-card=""
                data-active={i === 0 ? "true" : "false"}
                data-adjacent={i === 1 ? "true" : "false"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="review-quote-icon">&ldquo;</div>
                {r.metric && (
                  <div style={{ fontSize: "11px", letterSpacing: "1px", color: "var(--teal)", fontWeight: 600, padding: "4px 10px", borderRadius: "4px", border: "1px solid rgba(0,255,252,0.2)", background: "rgba(0,255,252,0.05)", whiteSpace: "nowrap" }}>
                    {r.metric}
                  </div>
                )}
              </div>
                <div className="review-text">{r.text}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <div className="review-author">
                    <div className="review-avatar">{r.initials}</div>
                    <div className="review-author-info">
                      <div className="review-author-name">{r.name}</div>
                      <div className="review-author-role">{r.role}</div>
                    </div>
                  </div>
                  {r.caseHref && (
                    <a href={r.caseHref} style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--teal)", textDecoration: "none", opacity: 0.7, transition: "opacity 0.2s" }}>
                      Caso studio &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reviews-nav">
          <button className="reviews-nav-btn" data-review-nav="prev">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="reviews-dots">
            {REVIEWS.map((_, i) => (
              <button key={i} className="reviews-dot" data-review-dot={i} data-active={i === 0 ? "true" : "false"} />
            ))}
          </div>
          <button className="reviews-nav-btn" data-review-nav="next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
