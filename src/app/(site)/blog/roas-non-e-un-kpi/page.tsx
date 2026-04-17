import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "ROAS non è un KPI — Guida ai numeri che contano davvero",
  description:
    "Il ROAS misura un'azione, non un risultato di business. Scopri come calcolare il tuo break-even ROAS reale e quali KPI guardare per valutare davvero le tue campagne.",
  openGraph: {
    title: "ROAS non è un KPI — Guida ai numeri che contano davvero",
    description:
      "Il ROAS misura un'azione, non un risultato di business. Scopri come calcolare il tuo break-even ROAS reale e quali KPI guardare davvero.",
    type: "article",
    authors: ["Nicola Serrao"],
  },
};

/* ─────────────────────────────────────────────
   STRUCTURED DATA
───────────────────────────────────────────── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ROAS non è un KPI — Guida ai numeri che contano davvero",
  description:
    "Il ROAS misura un'azione, non un risultato di business. Scopri come calcolare il tuo break-even ROAS reale e quali KPI guardare per valutare davvero le tue campagne.",
  author: {
    "@type": "Person",
    name: "Nicola Serrao",
    url: "https://nicolaserrao.com",
  },
  publisher: {
    "@type": "Person",
    name: "Nicola Serrao",
    url: "https://nicolaserrao.com",
  },
  datePublished: "2026-04-17",
  url: "https://nicolaserrao.com/blog/roas-non-e-un-kpi",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Il ROAS va ignorato del tutto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Il ROAS è utile per confrontare campagne tra loro e ottimizzare lo spend. Il problema è usarlo come unico indicatore di salute del business. Va sempre affiancato al margine di contribuzione reale e al CAC.",
      },
    },
    {
      "@type": "Question",
      name: "Qual è un ROAS 'buono'?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non esiste un ROAS universalmente 'buono'. Dipende interamente dal tuo margine di contribuzione reale. Un ROAS di 3 può essere ottimo con margini al 40%, e disastroso con margini al 20%. Calcola prima il tuo break-even ROAS, poi valuta.",
      },
    },
    {
      "@type": "Question",
      name: "Come calcolo il mio margine di contribuzione reale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Parti dal prezzo di vendita e sottrai: costo del prodotto, costi di spedizione e imballo, tasso di resi ponderato, commissioni di piattaforma e gateway. Il numero che ottieni è il margine di contribuzione reale su cui calcolare il break-even ROAS.",
      },
    },
    {
      "@type": "Question",
      name: "Con quale frequenza devo controllare questi KPI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il margine di contribuzione per canale va monitorato mensilmente. Il CAC reale almeno ogni due settimane durante campagne attive. Il tasso di riacquisto a 90 giorni è un indicatore lagging — controllalo mensilmente. Evita di ottimizzare su dati giornalieri: sono troppo rumorosi per essere affidabili.",
      },
    },
    {
      "@type": "Question",
      name: "Il mio e-commerce ha margini bassi — cosa posso fare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prima di aumentare il budget ads, lavora sull'AOV (valore medio ordine) tramite bundle e upsell, sul tasso di riacquisto, e sulla riduzione dei costi operativi. Aumentare la spesa pubblicitaria con margini bassi amplifica il problema, non lo risolve.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function RoasArticlePage() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`

        /* ══════════════════════════════════════════
           LAYOUT
        ══════════════════════════════════════════ */

        .art-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 60px 120px;
        }

        .art-col {
          max-width: 680px;
          margin: 0 auto;
        }

        .art-col-wide {
          max-width: 880px;
          margin: 0 auto;
        }

        .art-col-full {
          max-width: 100%;
        }

        /* ══════════════════════════════════════════
           BREADCRUMB
        ══════════════════════════════════════════ */

        .art-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 48px;
        }
        .art-breadcrumb a {
          color: var(--teal);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .art-breadcrumb a:hover { opacity: 0.7; }
        .art-breadcrumb-sep {
          color: var(--text-faint);
        }

        /* ══════════════════════════════════════════
           HEADER
        ══════════════════════════════════════════ */

        .art-eyebrow {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
        }

        .art-h1 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.15;
          color: var(--text);
          margin-bottom: 24px;
        }

        .art-h1 em {
          font-style: italic;
          color: var(--teal);
        }

        .art-subtitle {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(15px, 2vw, 18px);
          font-style: italic;
          color: var(--text-dim);
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .art-author-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--teal-border);
          border-bottom: 1px solid var(--teal-border);
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .art-author-name {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          color: var(--text);
        }

        .art-author-role {
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.5px;
        }

        .art-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--teal-border);
          flex-shrink: 0;
        }

        .art-meta-item {
          font-size: 10px;
          letter-spacing: 1px;
          color: var(--text-dim);
          text-transform: uppercase;
        }

        .art-meta-tag {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 3px 8px;
          border-radius: 3px;
          background: var(--teal-dim);
        }

        /* ══════════════════════════════════════════
           TABLE OF CONTENTS
        ══════════════════════════════════════════ */

        .art-toc {
          border: 1px solid var(--teal-border);
          border-radius: 8px;
          background: var(--teal-dim);
          padding: 24px 28px;
          margin-bottom: 56px;
        }

        .art-toc-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 16px;
        }

        .art-toc ol {
          list-style: none;
          counter-reset: toc;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .art-toc li {
          counter-increment: toc;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .art-toc li::before {
          content: counter(toc, decimal-leading-zero);
          font-size: 10px;
          color: var(--teal);
          opacity: 0.7;
          flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }

        .art-toc a {
          font-size: 12px;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.5;
        }

        .art-toc a:hover {
          color: var(--teal);
        }

        /* ══════════════════════════════════════════
           BODY TEXT
        ══════════════════════════════════════════ */

        .art-lead {
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 400;
          color: var(--text-dim);
          line-height: 1.9;
          margin-bottom: 48px;
        }

        .art-lead strong {
          color: var(--text);
          font-weight: 500;
        }

        .art-h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 20px;
          scroll-margin-top: 88px;
          line-height: 1.25;
        }

        .art-h2 em {
          font-style: italic;
          color: var(--teal);
        }

        .art-p {
          font-size: 13px;
          font-weight: 400;
          color: var(--text-dim);
          line-height: 1.9;
          margin-bottom: 20px;
        }

        .art-p strong {
          color: var(--text);
          font-weight: 500;
        }

        .art-p em {
          font-style: italic;
          color: var(--text);
        }

        .art-section {
          margin-bottom: 72px;
        }

        .art-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 56px 0;
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 1 — FORMULA
        ══════════════════════════════════════════ */

        .art-formula-wrap {
          border: 1px solid var(--teal-border);
          border-radius: 8px;
          background: rgba(0,255,252,0.04);
          padding: 36px 40px;
          margin: 32px 0;
          position: relative;
          overflow: hidden;
        }

        .art-formula-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal) 0%, transparent 100%);
        }

        .art-formula-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 24px;
        }

        .art-formula {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .art-formula-numerator {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text);
          text-align: center;
        }

        .art-formula-fraction {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .art-formula-bar {
          width: 100%;
          height: 1px;
          background: var(--teal);
          opacity: 0.6;
        }

        .art-formula-denominator {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text-dim);
          text-align: center;
        }

        .art-formula-eq {
          font-size: 28px;
          color: var(--teal);
          font-weight: 300;
        }

        .art-formula-result {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--teal);
          line-height: 1;
        }

        .art-formula-example {
          padding-top: 20px;
          border-top: 1px solid var(--teal-border);
          font-size: 12px;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .art-formula-example code {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          color: var(--teal);
          background: var(--teal-dim);
          padding: 3px 8px;
          border-radius: 3px;
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 2 — DUAL STAT
        ══════════════════════════════════════════ */

        .art-dual-stat {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 32px 0;
        }

        .art-stat-block {
          border: 1px solid var(--teal-border);
          border-radius: 8px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
        }

        .art-stat-block--ok {
          background: rgba(0,255,252,0.04);
        }

        .art-stat-block--warn {
          background: rgba(255,100,80,0.04);
          border-color: rgba(255,100,80,0.25);
        }

        .art-stat-block-label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 12px;
        }

        .art-stat-block-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 12px;
        }

        .art-stat-block--ok .art-stat-block-value {
          color: var(--teal);
        }

        .art-stat-block--warn .art-stat-block-value {
          color: rgba(255, 110, 90, 0.9);
        }

        .art-stat-block-verdict {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 3px;
          margin-bottom: 12px;
        }

        .art-stat-block--ok .art-stat-block-verdict {
          color: var(--teal);
          background: var(--teal-dim);
          border: 1px solid var(--teal-border);
        }

        .art-stat-block--warn .art-stat-block-verdict {
          color: rgba(255, 110, 90, 0.9);
          background: rgba(255,100,80,0.08);
          border: 1px solid rgba(255,100,80,0.2);
        }

        .art-stat-block-note {
          font-size: 11px;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .art-stat-block-note strong {
          color: var(--text);
          font-weight: 500;
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 3 — COST BREAKDOWN
        ══════════════════════════════════════════ */

        .art-cost-breakdown {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          overflow: hidden;
          margin: 28px 0;
        }

        .art-cost-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(232,245,242,0.06);
          gap: 16px;
        }

        .art-cost-row:last-child {
          border-bottom: none;
        }

        .art-cost-row--header {
          background: rgba(232,245,242,0.03);
          padding: 10px 24px;
        }

        .art-cost-row--total {
          background: rgba(0,255,252,0.05);
          border-top: 1px solid var(--teal-border) !important;
        }

        .art-cost-row--result {
          background: rgba(255,100,80,0.05);
          border-top: 1px solid rgba(255,100,80,0.2) !important;
        }

        .art-cost-label {
          font-size: 12px;
          color: var(--text-dim);
        }

        .art-cost-row--header .art-cost-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .art-cost-row--total .art-cost-label,
        .art-cost-row--result .art-cost-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text);
        }

        .art-cost-value {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
          text-align: right;
          white-space: nowrap;
        }

        .art-cost-pct {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px;
          color: var(--text-faint);
          text-align: right;
          white-space: nowrap;
          min-width: 44px;
        }

        .art-cost-row--total .art-cost-value {
          color: rgba(255,110,90,0.9);
          font-weight: 500;
        }

        .art-cost-row--result .art-cost-label {
          color: rgba(255,110,90,0.9);
        }

        .art-cost-row--result .art-cost-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,110,90,0.9);
        }

        .art-cost-row--result .art-cost-pct {
          font-size: 13px;
          color: rgba(255,110,90,0.7);
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 4 — BE ROAS TABLE
        ══════════════════════════════════════════ */

        .art-be-wrap {
          margin: 32px 0;
        }

        .art-be-formula {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 28px;
          background: var(--teal-dim);
          border: 1px solid var(--teal-border);
          border-radius: 8px 8px 0 0;
          border-bottom: none;
          flex-wrap: wrap;
        }

        .art-be-formula-text {
          font-size: 13px;
          color: var(--text-dim);
        }

        .art-be-formula-eq {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          color: var(--teal);
          background: rgba(0,255,252,0.1);
          padding: 6px 14px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .art-be-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 0 0 8px 8px;
          overflow: hidden;
        }

        .art-be-table thead th {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-faint);
          font-weight: 400;
          padding: 12px 20px;
          text-align: left;
          background: rgba(232,245,242,0.02);
          border-bottom: 1px solid rgba(232,245,242,0.06);
        }

        .art-be-table tbody tr {
          border-bottom: 1px solid rgba(232,245,242,0.04);
          transition: background 0.2s;
        }

        .art-be-table tbody tr:last-child {
          border-bottom: none;
        }

        .art-be-table tbody tr:hover {
          background: rgba(232,245,242,0.02);
        }

        .art-be-table tbody tr.zone-red {
          background: rgba(255,100,80,0.04);
        }

        .art-be-table tbody tr.zone-red:hover {
          background: rgba(255,100,80,0.07);
        }

        .art-be-table tbody tr.zone-yellow {
          background: rgba(255,200,50,0.03);
        }

        .art-be-table tbody tr.zone-green {
          background: rgba(0,255,252,0.03);
        }

        .art-be-table tbody td {
          padding: 16px 20px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
        }

        .art-be-table tbody td:first-child {
          color: var(--text);
          font-weight: 500;
        }

        .art-be-roas-value {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
        }

        .zone-red .art-be-roas-value { color: rgba(255,110,90,0.9); }
        .zone-yellow .art-be-roas-value { color: rgba(255,200,60,0.9); }
        .zone-green .art-be-roas-value { color: var(--teal); }

        .art-be-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }

        .badge-red {
          color: rgba(255,110,90,0.9);
          background: rgba(255,100,80,0.1);
          border: 1px solid rgba(255,100,80,0.2);
        }

        .badge-yellow {
          color: rgba(255,200,60,0.9);
          background: rgba(255,200,50,0.08);
          border: 1px solid rgba(255,200,50,0.2);
        }

        .badge-green {
          color: var(--teal);
          background: var(--teal-dim);
          border: 1px solid var(--teal-border);
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 5 — DUAL CHAIN
        ══════════════════════════════════════════ */

        .art-chain-wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 32px 0;
        }

        .art-chain-row {
          border-radius: 8px;
          overflow: hidden;
        }

        .art-chain-header {
          padding: 10px 20px;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .art-chain-row--a .art-chain-header {
          background: rgba(255,100,80,0.1);
          color: rgba(255,110,90,0.9);
          border: 1px solid rgba(255,100,80,0.2);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }

        .art-chain-row--b .art-chain-header {
          background: var(--teal-dim);
          color: var(--teal);
          border: 1px solid var(--teal-border);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }

        .art-chain-steps {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .art-chain-steps::-webkit-scrollbar { display: none; }

        .art-chain-row--a .art-chain-steps {
          background: rgba(255,100,80,0.04);
          border: 1px solid rgba(255,100,80,0.15);
          border-top: none;
          border-radius: 0 0 8px 8px;
        }

        .art-chain-row--b .art-chain-steps {
          background: rgba(0,255,252,0.03);
          border: 1px solid var(--teal-border);
          border-top: none;
          border-radius: 0 0 8px 8px;
          opacity: 0.9;
        }

        .art-chain-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 12px 16px;
          flex-shrink: 0;
          text-align: center;
          min-width: 100px;
        }

        .art-chain-step-icon {
          font-size: 18px;
          line-height: 1;
        }

        .art-chain-step-name {
          font-size: 10px;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
        }

        .art-chain-step-sub {
          font-size: 9px;
          color: var(--text-dim);
          white-space: nowrap;
        }

        .art-chain-arrow {
          font-size: 16px;
          color: var(--text-faint);
          flex-shrink: 0;
          padding: 0 4px;
        }

        .art-chain-row--b .art-chain-arrow {
          color: var(--teal);
          opacity: 0.4;
        }

        .art-chain-step-final {
          border: 1px solid;
          border-radius: 6px;
          padding: 10px 16px !important;
        }

        .art-chain-row--a .art-chain-step-final {
          border-color: rgba(255,100,80,0.3);
          background: rgba(255,100,80,0.08);
        }

        .art-chain-row--a .art-chain-step-final .art-chain-step-name {
          color: rgba(255,110,90,0.9);
        }

        .art-chain-row--b .art-chain-step-final {
          border-color: var(--teal-border);
          background: var(--teal-dim);
        }

        .art-chain-row--b .art-chain-step-final .art-chain-step-name {
          color: var(--teal);
        }

        /* ══════════════════════════════════════════
           VISUAL BLOCK 6 — KPI PYRAMID
        ══════════════════════════════════════════ */

        .art-pyramid {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 32px 0;
        }

        .art-pyramid-level {
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(232,245,242,0.06);
        }

        .art-pyramid-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          gap: 12px;
        }

        .art-pyramid-level--vanity .art-pyramid-header {
          background: rgba(232,245,242,0.03);
        }

        .art-pyramid-level--operative .art-pyramid-header {
          background: rgba(255,200,50,0.04);
          border-color: rgba(255,200,50,0.1);
        }

        .art-pyramid-level--strategic .art-pyramid-header {
          background: rgba(0,207,255,0.05);
          border-color: rgba(0,207,255,0.15);
        }

        .art-pyramid-level--critical .art-pyramid-header {
          background: rgba(0,255,252,0.06);
          border-color: var(--teal-border);
        }

        .art-pyramid-tier {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .art-pyramid-level--vanity .art-pyramid-tier { color: var(--text-faint); }
        .art-pyramid-level--operative .art-pyramid-tier { color: rgba(255,200,60,0.8); }
        .art-pyramid-level--strategic .art-pyramid-tier { color: rgba(0,207,255,0.9); }
        .art-pyramid-level--critical .art-pyramid-tier { color: var(--teal); }

        .art-pyramid-kpis {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .art-pyramid-kpi {
          font-size: 11px;
          color: var(--text-dim);
          padding: 4px 10px;
          border-radius: 3px;
          background: rgba(232,245,242,0.04);
          border: 1px solid rgba(232,245,242,0.06);
          white-space: nowrap;
        }

        .art-pyramid-level--critical .art-pyramid-kpi {
          background: var(--teal-dim);
          border-color: var(--teal-border);
          color: var(--text);
          font-weight: 500;
        }

        .art-pyramid-level--strategic .art-pyramid-kpi {
          background: rgba(0,207,255,0.05);
          border-color: rgba(0,207,255,0.12);
          color: var(--text);
        }

        .art-pyramid-note {
          font-size: 10px;
          color: var(--text-faint);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ══════════════════════════════════════════
           CALLOUT
        ══════════════════════════════════════════ */

        .art-callout {
          border-left: 2px solid var(--teal);
          padding: 16px 20px;
          background: rgba(0,255,252,0.04);
          border-radius: 0 6px 6px 0;
          margin: 24px 0;
        }

        .art-callout p {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.8;
          margin: 0;
        }

        .art-callout p strong {
          color: var(--text);
          font-weight: 500;
        }

        /* ══════════════════════════════════════════
           MINI CHECKLIST (cruscotto)
        ══════════════════════════════════════════ */

        .art-checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 24px 0;
        }

        .art-check-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px 20px;
          border: 1px solid rgba(232,245,242,0.06);
          border-radius: 6px;
          background: rgba(232,245,242,0.02);
          transition: border-color 0.2s;
        }

        .art-check-item:hover {
          border-color: var(--teal-border);
        }

        .art-check-num {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--teal);
          opacity: 0.5;
          line-height: 1;
          flex-shrink: 0;
          padding-top: 2px;
          min-width: 24px;
        }

        .art-check-content {}

        .art-check-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 4px;
        }

        .art-check-desc {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.7;
        }

        /* ══════════════════════════════════════════
           LEAD MAGNET CTA
        ══════════════════════════════════════════ */

        .art-lead-magnet {
          border: 1px solid var(--teal-border);
          border-radius: 10px;
          background: var(--teal-dim);
          padding: 36px 40px;
          margin: 64px 0;
          position: relative;
          overflow: hidden;
        }

        .art-lead-magnet::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,252,0.05), transparent);
          pointer-events: none;
        }

        .art-lead-magnet::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
        }

        .art-lm-eyebrow {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 16px;
          position: relative;
        }

        .art-lm-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          position: relative;
          line-height: 1.3;
        }

        .art-lm-desc {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.8;
          margin-bottom: 28px;
          position: relative;
          max-width: 520px;
        }

        .art-lm-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--teal);
          color: var(--bg);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 5px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          position: relative;
        }

        .art-lm-cta:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }

        .art-lm-meta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--text-dim);
          margin-left: 20px;
          position: relative;
        }

        /* ══════════════════════════════════════════
           FAQ
        ══════════════════════════════════════════ */

        .art-faq-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 32px 0;
        }

        .art-faq-item {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .art-faq-item:hover {
          border-color: var(--teal-border);
        }

        .art-faq-item summary {
          padding: 18px 20px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          background: rgba(232,245,242,0.02);
          user-select: none;
          transition: background 0.2s;
        }

        .art-faq-item summary:hover {
          background: rgba(232,245,242,0.04);
        }

        .art-faq-item summary::-webkit-details-marker { display: none; }

        .art-faq-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: var(--teal);
          opacity: 0.6;
          transition: transform 0.2s;
        }

        .art-faq-item[open] .art-faq-icon {
          transform: rotate(45deg);
        }

        .art-faq-answer {
          padding: 0 20px 18px;
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.85;
          border-top: 1px solid rgba(232,245,242,0.06);
          padding-top: 16px;
        }

        /* ══════════════════════════════════════════
           CONCLUSION
        ══════════════════════════════════════════ */

        .art-conclusion {
          border: 1px solid var(--teal-border);
          border-radius: 8px;
          background: rgba(0,255,252,0.04);
          padding: 32px 36px;
          margin: 56px 0 48px;
        }

        .art-conclusion-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 16px;
        }

        .art-conclusion-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 20px;
        }

        .art-conclusion-points {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .art-conclusion-point {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.7;
        }

        .art-conclusion-point::before {
          content: '→';
          color: var(--teal);
          flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          margin-top: 1px;
        }

        /* ══════════════════════════════════════════
           SIGNATURE
        ══════════════════════════════════════════ */

        .art-signature {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 0;
          border-top: 1px solid rgba(232,245,242,0.06);
          border-bottom: 1px solid rgba(232,245,242,0.06);
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .art-sig-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid var(--teal-border);
          flex-shrink: 0;
          background: var(--teal-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--teal);
        }

        .art-sig-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 2px;
        }

        .art-sig-role {
          font-size: 11px;
          color: var(--text-dim);
          line-height: 1.5;
        }

        .art-sig-link {
          margin-left: auto;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .art-sig-link:hover { opacity: 0.7; }

        /* ══════════════════════════════════════════
           TAGS
        ══════════════════════════════════════════ */

        .art-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 56px;
          align-items: center;
        }

        .art-tags-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-right: 4px;
        }

        .art-tag {
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-dim);
          border: 1px solid rgba(232,245,242,0.08);
          padding: 4px 10px;
          border-radius: 3px;
          background: rgba(232,245,242,0.02);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }

        .art-tag:hover {
          border-color: var(--teal-border);
          color: var(--teal);
        }

        /* ══════════════════════════════════════════
           REFERENCES
        ══════════════════════════════════════════ */

        .art-references {
          padding-top: 24px;
          border-top: 1px solid rgba(232,245,242,0.06);
        }

        .art-references-label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 14px;
        }

        .art-ref-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .art-ref-item {
          font-size: 11px;
          color: var(--text-dim);
          line-height: 1.6;
          display: flex;
          gap: 10px;
        }

        .art-ref-num {
          color: var(--text-faint);
          flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }

        .art-ref-item a {
          color: var(--text-dim);
          text-decoration: underline;
          text-decoration-color: rgba(232,245,242,0.15);
          transition: color 0.2s;
        }

        .art-ref-item a:hover { color: var(--teal); }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */

        @media (max-width: 768px) {
          .art-page { padding: 40px 24px 80px; }
          .art-dual-stat { grid-template-columns: 1fr; }
          .art-chain-header { flex-wrap: wrap; }
          .art-pyramid-header { flex-direction: column; align-items: flex-start; gap: 8px; }
          .art-pyramid-note { display: none; }
          .art-lead-magnet { padding: 28px 24px; }
          .art-lm-meta { margin-left: 0; margin-top: 12px; display: flex; }
          .art-be-table thead th:last-child { display: none; }
          .art-be-table tbody td:last-child { display: none; }
        }

        @media (max-width: 480px) {
          .art-page { padding: 32px 16px 64px; }
          .art-formula { flex-direction: column; align-items: flex-start; }
          .art-cost-row { grid-template-columns: 1fr auto; }
          .art-cost-pct { display: none; }
          .art-sig-link { display: none; }
        }

      `}</style>

      <div className="art-page">

        {/* ════════════════════════════════════════
            BREADCRUMB
        ════════════════════════════════════════ */}
        <div className="art-col">
          <nav className="art-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="art-breadcrumb-sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="art-breadcrumb-sep">/</span>
            <span>ROAS non &egrave; un KPI</span>
          </nav>
        </div>

        {/* ════════════════════════════════════════
            HEADER
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-eyebrow">Analytics &amp; KPI</div>

          <h1 className="art-h1">
            Il ROAS non &egrave; un KPI.<br />
            <em>Ecco cosa guardare invece.</em>
          </h1>

          <p className="art-subtitle">
            Ogni mese il report dice &ldquo;ROAS ottimo&rdquo;. I margini dicono qualcos&rsquo;altro.
            Perch&eacute; guardare solo il ROAS &egrave; il modo pi&ugrave; rapido per perdere soldi sentendosi al sicuro.
          </p>

          <div className="art-author-bar">
            <span className="art-author-name">Nicola Serrao</span>
            <span className="art-meta-dot" />
            <span className="art-author-role">Digital Business Advisor</span>
            <span className="art-meta-dot" />
            <span className="art-meta-item">8 min lettura</span>
            <span className="art-meta-dot" />
            <span className="art-meta-item">17 Aprile 2026</span>
            <span className="art-meta-tag">Analytics</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            TABLE OF CONTENTS
        ════════════════════════════════════════ */}
        <div className="art-col">
          <nav className="art-toc" aria-label="Indice">
            <div className="art-toc-label">In questo articolo</div>
            <ol>
              <li><a href="#cosa-misura-il-roas">Cosa misura davvero il ROAS</a></li>
              <li><a href="#paradosso">Il paradosso: ROAS alto, business in perdita</a></li>
              <li><a href="#break-even">Il tuo ROAS di break-even (con tabella)</a></li>
              <li><a href="#cosa-vede">Cosa vede il ROAS vs cosa conta davvero</a></li>
              <li><a href="#gerarchia-kpi">La gerarchia dei KPI: da vanity a business-critical</a></li>
              <li><a href="#cruscotto">Come costruire un cruscotto minimo</a></li>
            </ol>
          </nav>
        </div>

        {/* ════════════════════════════════════════
            INTRO
        ════════════════════════════════════════ */}
        <div className="art-col">
          <p className="art-lead">
            Ogni mese arriva il report. ROAS 4.2. CTR in crescita. CPC stabile.
            L&rsquo;agenzia &egrave; soddisfatta, i numeri sono &ldquo;buoni&rdquo;. Dovresti esserlo anche tu.
            Eppure i margini non si muovono. Il fatturato cresce, ma non quello che rimane in tasca.
            <strong> Il problema non &egrave; l&rsquo;agenzia. &Egrave; che stai valutando il tuo business con lo strumento sbagliato.</strong>
          </p>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 1 — COSA MISURA IL ROAS
        ════════════════════════════════════════ */}
        <div className="art-col art-section">
          <h2 id="cosa-misura-il-roas" className="art-h2">Cosa misura davvero il ROAS</h2>

          <p className="art-p">
            Il ROAS &mdash; Return On Ad Spend &mdash; misura una sola cosa: quanti euro di fatturato
            generano le tue campagne per ogni euro investito in pubblicit&agrave;.
          </p>
        </div>

        {/* FORMULA VISUAL */}
        <div className="art-col-wide">
          <div className="art-formula-wrap">
            <div className="art-formula-label">La formula</div>
            <div className="art-formula">
              <div className="art-formula-fraction">
                <div className="art-formula-numerator">Fatturato generato dalle ads</div>
                <div className="art-formula-bar" />
                <div className="art-formula-denominator">Spesa pubblicitaria</div>
              </div>
              <div className="art-formula-eq">=</div>
              <div className="art-formula-result">ROAS</div>
            </div>
            <div className="art-formula-example">
              <span>Esempio concreto:</span>
              <code>€4.200 fatturato</code>
              <span style={{ color: "var(--text-faint)" }}>÷</span>
              <code>€1.000 spesa</code>
              <span style={{ color: "var(--text-faint)" }}>=</span>
              <code>ROAS 4.2</code>
            </div>
          </div>
        </div>

        <div className="art-col art-section">
          <p className="art-p">
            Niente di pi&ugrave;. Il ROAS non vede il costo del prodotto. Non vede la logistica,
            i resi, le commissioni di piattaforma, il costo del personale, i tool.
            Non vede niente che sta fuori dalla relazione diretta tra spesa pubblicitaria e ordini generati.
          </p>
          <div className="art-callout">
            <p>
              <strong>Stai valutando la salute economica del tuo business digitale con uno strumento
              che guarda una sola finestra su dieci.</strong> È come leggere solo il fatturato
              di un bilancio e pensare di avere il quadro completo.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 2 — IL PARADOSSO
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 id="paradosso" className="art-h2">Il paradosso: <em>ROAS alto, business in perdita</em></h2>
          <p className="art-p">
            Consideriamo un caso concreto. Un e-commerce vende un prodotto a &euro;100.
            Margine lordo nominale: 40%. ROAS medio delle campagne: 4.2.
            Sulla carta, tutto bene. Poi si apre il conto economico reale.
          </p>
        </div>

        {/* DUAL STAT */}
        <div className="art-col-wide">
          <div className="art-dual-stat">
            <div className="art-stat-block art-stat-block--ok">
              <div className="art-stat-block-label">Report agenzia</div>
              <div className="art-stat-block-value">4.2</div>
              <div className="art-stat-block-verdict">
                <span>✓</span> ROAS — Apparentemente buono
              </div>
              <div className="art-stat-block-note">
                Su &euro;1.000 di spesa, &euro;4.200 di ordini generati.
                Il numero che l&rsquo;agenzia riporta ogni mese.
              </div>
            </div>
            <div className="art-stat-block art-stat-block--warn">
              <div className="art-stat-block-label">Conto economico reale</div>
              <div className="art-stat-block-value">14%</div>
              <div className="art-stat-block-verdict">
                <span>✗</span> Margine reale — Break-even: 7.1
              </div>
              <div className="art-stat-block-note">
                Il margine di contribuzione <strong>reale</strong> dopo logistica,
                resi e commissioni. Con ROAS 4.2 stai perdendo &euro;0.41 per ogni euro speso.
              </div>
            </div>
          </div>
        </div>

        {/* COST BREAKDOWN */}
        <div className="art-col-wide" style={{ margin: "32px auto" }}>
          <div className="art-cost-breakdown">
            <div className="art-cost-row art-cost-row--header">
              <div className="art-cost-label">Voce di costo</div>
              <div className="art-cost-value">€ per ordine</div>
              <div className="art-cost-pct">% su prezzo</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Prezzo di vendita</div>
              <div className="art-cost-value">€ 100,00</div>
              <div className="art-cost-pct">100%</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Costo prodotto (COGS)</div>
              <div className="art-cost-value">− € 60,00</div>
              <div className="art-cost-pct">60%</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Spedizione e logistica</div>
              <div className="art-cost-value">− € 8,00</div>
              <div className="art-cost-pct">8%</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Resi (tasso 12% ponderato)</div>
              <div className="art-cost-value">− € 12,00</div>
              <div className="art-cost-pct">12%</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Commissioni piattaforma + gateway</div>
              <div className="art-cost-value">− € 4,00</div>
              <div className="art-cost-pct">4%</div>
            </div>
            <div className="art-cost-row">
              <div className="art-cost-label">Imballaggio</div>
              <div className="art-cost-value">− € 2,00</div>
              <div className="art-cost-pct">2%</div>
            </div>
            <div className="art-cost-row art-cost-row--result">
              <div className="art-cost-label">Margine di contribuzione reale</div>
              <div className="art-cost-value">€ 14,00</div>
              <div className="art-cost-pct">14%</div>
            </div>
          </div>
        </div>

        <div className="art-col art-section">
          <p className="art-p">
            Con un margine di contribuzione del 14%, il ROAS di break-even non &egrave; 2.5 come
            molti pensano usando il margine lordo nominale. &Egrave; <strong>7.14</strong>.
            Un ROAS di 4.2 in questo scenario significa perdere esattamente &euro;0.41
            per ogni euro speso in advertising.
          </p>
          <p className="art-p">
            L&rsquo;agenzia non sta mentendo. Il ROAS &egrave; davvero 4.2. Il problema &egrave; che quel numero
            non dice niente sulla profittabilit&agrave; del business &mdash; e nessuno lo ha mai chiarito.
          </p>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 3 — BREAK-EVEN ROAS
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 id="break-even" className="art-h2">Il tuo ROAS di break-even</h2>
          <p className="art-p">
            Prima di leggere qualsiasi report, devi conoscere un numero: il tuo ROAS di break-even.
            &Egrave; il minimo sotto cui stai finanziando perdite, non crescita.
            Si calcola con una formula semplice, ma il denominatore &egrave; tutto.
          </p>
        </div>

        {/* BE TABLE */}
        <div className="art-col-wide">
          <div className="art-be-wrap">
            <div className="art-be-formula">
              <span className="art-be-formula-text">ROAS break-even =</span>
              <div className="art-be-formula-eq">1 ÷ Margine di contribuzione reale</div>
              <span className="art-be-formula-text" style={{ color: "var(--text-faint)", fontSize: "11px" }}>
                (margine reale = prezzo &minus; tutto: prodotto, logistica, resi, commissioni)
              </span>
            </div>
            <table className="art-be-table">
              <thead>
                <tr>
                  <th>Margine contrib. reale</th>
                  <th>ROAS break-even</th>
                  <th>Zona</th>
                  <th>Cosa significa per te</th>
                </tr>
              </thead>
              <tbody>
                <tr className="zone-red">
                  <td>10%</td>
                  <td><span className="art-be-roas-value">10.0</span></td>
                  <td><span className="art-be-badge badge-red">⚠ Critico</span></td>
                  <td>Quasi impossibile essere profittabili con ads. Priorità: ridurre costi o alzare prezzi.</td>
                </tr>
                <tr className="zone-red">
                  <td>15%</td>
                  <td><span className="art-be-roas-value">6.7</span></td>
                  <td><span className="art-be-badge badge-red">⚠ Critico</span></td>
                  <td>Ogni fluttuazione del ROAS si traduce in perdita immediata. Zero margine di errore.</td>
                </tr>
                <tr className="zone-red">
                  <td>20%</td>
                  <td><span className="art-be-roas-value">5.0</span></td>
                  <td><span className="art-be-badge badge-red">⚠ Critico</span></td>
                  <td>Difficile. Un ROAS di 4.2 in questa fascia significa perdere il 16% su ogni euro speso.</td>
                </tr>
                <tr className="zone-yellow">
                  <td>30%</td>
                  <td><span className="art-be-roas-value">3.3</span></td>
                  <td><span className="art-be-badge badge-yellow">◆ Attenzione</span></td>
                  <td>Range standard per molti e-commerce. ROAS 4.2 qui è profittabile, ma con poco spazio.</td>
                </tr>
                <tr className="zone-yellow">
                  <td>40%</td>
                  <td><span className="art-be-roas-value">2.5</span></td>
                  <td><span className="art-be-badge badge-yellow">◆ Attenzione</span></td>
                  <td>Margine più sano. Resistenza alle fluttuazioni del mercato. Puoi scalare con più serenità.</td>
                </tr>
                <tr className="zone-green">
                  <td>50%</td>
                  <td><span className="art-be-roas-value">2.0</span></td>
                  <td><span className="art-be-badge badge-green">✓ Sano</span></td>
                  <td>Tipico di prodotti digitali o SaaS. Ampio margine di manovra sul budget advertising.</td>
                </tr>
                <tr className="zone-green">
                  <td>65%+</td>
                  <td><span className="art-be-roas-value">1.5</span></td>
                  <td><span className="art-be-badge badge-green">✓ Sano</span></td>
                  <td>Ogni euro di ads lavora molto di più. Qui si può crescere in modo aggressivo e sostenibile.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="art-col art-section">
          <div className="art-callout">
            <p>
              <strong>La trappola più comune:</strong> usare il margine lordo nominale (prezzo &minus; costo prodotto)
              invece del margine di contribuzione reale. Questo porta a sottostimare il break-even ROAS
              del 30&ndash;60%, e a pensare di essere profittabili quando non lo si è.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 4 — COSA VEDE IL ROAS
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 id="cosa-vede" className="art-h2">Cosa vede il ROAS vs cosa conta davvero</h2>
          <p className="art-p">
            Il ROAS &egrave; utile per confrontare campagne tra loro e ottimizzare lo spend.
            Ma misura solo un segmento &mdash; click &rarr; ordine &mdash;
            di un percorso economico molto pi&ugrave; lungo e complesso.
          </p>
        </div>

        {/* DUAL CHAIN */}
        <div className="art-col-wide">
          <div className="art-chain-wrap">

            {/* Chain A — Cosa vede il ROAS */}
            <div className="art-chain-row art-chain-row--a">
              <div className="art-chain-header">
                <span>✗</span>
                <span>Cosa misura il ROAS</span>
              </div>
              <div className="art-chain-steps">
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">💸</div>
                  <div className="art-chain-step-name">Spesa ads</div>
                  <div className="art-chain-step-sub">€1.000</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">👆</div>
                  <div className="art-chain-step-name">Click</div>
                  <div className="art-chain-step-sub">CTR, CPC</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">🛒</div>
                  <div className="art-chain-step-name">Ordine</div>
                  <div className="art-chain-step-sub">Conversione</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">📊</div>
                  <div className="art-chain-step-name">Fatturato</div>
                  <div className="art-chain-step-sub">€4.200</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step art-chain-step-final">
                  <div className="art-chain-step-name">ROAS 4.2</div>
                  <div className="art-chain-step-sub">Stop qui</div>
                </div>
              </div>
            </div>

            {/* Chain B — Cosa conta davvero */}
            <div className="art-chain-row art-chain-row--b">
              <div className="art-chain-header">
                <span>✓</span>
                <span>Cosa conta davvero</span>
              </div>
              <div className="art-chain-steps">
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">💸</div>
                  <div className="art-chain-step-name">Spesa ads</div>
                  <div className="art-chain-step-sub">€1.000</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">📐</div>
                  <div className="art-chain-step-name">CAC reale</div>
                  <div className="art-chain-step-sub">Costo nuovo cliente</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">💰</div>
                  <div className="art-chain-step-name">Margine</div>
                  <div className="art-chain-step-sub">Per ordine</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step">
                  <div className="art-chain-step-icon">🔄</div>
                  <div className="art-chain-step-name">LTV cliente</div>
                  <div className="art-chain-step-sub">Valore a 12 mesi</div>
                </div>
                <div className="art-chain-arrow">→</div>
                <div className="art-chain-step art-chain-step-final">
                  <div className="art-chain-step-name">Profitto netto</div>
                  <div className="art-chain-step-sub">Quello che resta</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="art-col art-section">
          <p className="art-p">
            Un cliente che compra una volta con ROAS 6 vale meno di un cliente che compra
            tre volte con ROAS 3. Il ROAS non vede il secondo acquisto, il terzo, la recensione,
            il passaparola. Non vede il LTV. Eppure il LTV &egrave; spesso l&rsquo;unica differenza
            tra un business sostenibile e uno che brucia cassa crescendo.
          </p>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 5 — GERARCHIA KPI
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 id="gerarchia-kpi" className="art-h2">La gerarchia dei KPI: da vanity a <em>business-critical</em></h2>
          <p className="art-p">
            Non tutti i KPI guidano le stesse decisioni. Alcuni sono facili da misurare
            e ottimi per i report. Altri richiedono pi&ugrave; lavoro, ma sono quelli che ti dicono
            davvero se stai crescendo o stai perdendo soldi in modo ordinato.
          </p>
        </div>

        {/* KPI PYRAMID */}
        <div className="art-col-wide">
          <div className="art-pyramid">

            {/* Level 1 — Vanity */}
            <div className="art-pyramid-level art-pyramid-level--vanity">
              <div className="art-pyramid-header">
                <div className="art-pyramid-tier">Vanity — Non decidere su questi</div>
                <div className="art-pyramid-kpis">
                  {["CTR", "Impressioni", "CPM", "Follower", "Like", "Visualizzazioni"].map(k => (
                    <span key={k} className="art-pyramid-kpi">{k}</span>
                  ))}
                </div>
                <div className="art-pyramid-note">Facili da misurare, poco utili</div>
              </div>
            </div>

            {/* Level 2 — Operative */}
            <div className="art-pyramid-level art-pyramid-level--operative">
              <div className="art-pyramid-header">
                <div className="art-pyramid-tier">Operative — Ottimizzazione campagne</div>
                <div className="art-pyramid-kpis">
                  {["CPA", "CPL", "ROAS per campagna", "CTR per copy", "CR landing"].map(k => (
                    <span key={k} className="art-pyramid-kpi">{k}</span>
                  ))}
                </div>
                <div className="art-pyramid-note">Utili per test e micro-ottimizzazioni</div>
              </div>
            </div>

            {/* Level 3 — Strategic */}
            <div className="art-pyramid-level art-pyramid-level--strategic">
              <div className="art-pyramid-header">
                <div className="art-pyramid-tier">Strategici — Decisioni di canale e budget</div>
                <div className="art-pyramid-kpis">
                  {["ROAS blended", "Tasso riacquisto 90gg", "Frequenza d&rsquo;acquisto", "CAC payback period"].map(k => (
                    <span key={k} className="art-pyramid-kpi" dangerouslySetInnerHTML={{ __html: k }} />
                  ))}
                </div>
                <div className="art-pyramid-note">Guidano l&rsquo;allocazione del budget</div>
              </div>
            </div>

            {/* Level 4 — Critical */}
            <div className="art-pyramid-level art-pyramid-level--critical">
              <div className="art-pyramid-header">
                <div className="art-pyramid-tier">Business-Critical — Decisioni di business</div>
                <div className="art-pyramid-kpis">
                  {["LTV:CAC ratio", "Margine contrib. per canale", "Profitto netto campagna", "CAC reale (tutto incluso)"].map(k => (
                    <span key={k} className="art-pyramid-kpi">{k}</span>
                  ))}
                </div>
                <div className="art-pyramid-note">Questi guidano la strategia</div>
              </div>
            </div>

          </div>
        </div>

        <div className="art-col art-section">
          <p className="art-p">
            Il ROAS si trova al secondo livello &mdash; utile per ottimizzare campagne,
            non per valutare la salute del business. Il problema &egrave; che nella maggior parte
            delle aziende viene usato come se fosse al quarto.
          </p>
        </div>

        {/* LEAD MAGNET */}
        <div className="art-col-wide">
          <div className="art-lead-magnet">
            <div className="art-lm-eyebrow">Strumento gratuito</div>
            <div className="art-lm-title">
              Quanto &egrave; sano il tuo marketing digitale?
            </div>
            <div className="art-lm-desc">
              10 domande, 3 minuti. Ricevi un profilo della tua situazione attuale
              con i punti di attenzione specifici del tuo business &mdash;
              prima di spendere un altro euro in advertising.
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/#contatti" className="art-lm-cta">
                Fai l&rsquo;Audit Score gratuito
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="art-lm-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                3 minuti &middot; Gratuito &middot; Nessun impegno
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 6 — CRUSCOTTO MINIMO
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 id="cruscotto" className="art-h2">Come costruire un cruscotto minimo</h2>
          <p className="art-p">
            Non serve una suite analytics da decine di migliaia di euro.
            Bastano tre numeri, aggiornati con cadenza regolare, per avere
            una visione reale della tua performance.
          </p>
        </div>

        <div className="art-col-wide">
          <div className="art-checklist">
            <div className="art-check-item">
              <div className="art-check-num">01</div>
              <div className="art-check-content">
                <div className="art-check-title">Margine di contribuzione per canale — ogni mese</div>
                <div className="art-check-desc">
                  Non per campagna, per canale (Meta, Google, organico). Include tutti i costi variabili.
                  &Egrave; l&rsquo;unico numero che ti dice se un canale &egrave; profittabile o ti sta costando pi&ugrave; di quanto porta.
                </div>
              </div>
            </div>
            <div className="art-check-item">
              <div className="art-check-num">02</div>
              <div className="art-check-content">
                <div className="art-check-title">CAC reale (non solo il CPA delle ads) — ogni due settimane</div>
                <div className="art-check-desc">
                  Il CAC reale include tutto il costo marketing: ads + tool + eventuale personale o agenzia.
                  Diviso per i nuovi clienti acquisiti nello stesso periodo. Il CPA dell&rsquo;ads sottostima
                  questo numero del 20&ndash;40% in media.
                </div>
              </div>
            </div>
            <div className="art-check-item">
              <div className="art-check-num">03</div>
              <div className="art-check-content">
                <div className="art-check-title">Tasso di riacquisto a 90 giorni — ogni mese</div>
                <div className="art-check-desc">
                  Quanti clienti del mese scorso hanno comprato di nuovo entro 90 giorni?
                  &Egrave; un indicatore lagging &mdash; ti dice se il prodotto mantiene quello che prometti.
                  Un tasso in calo con ads in crescita &egrave; un segnale di allarme, non di successo.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="art-col art-section">
          <p className="art-p">
            Questi tre numeri ti dicono pi&ugrave; di qualsiasi dashboard con quaranta metriche.
            E soprattutto, ti permettono di avere una conversazione onesta con la tua agenzia
            &mdash; non basata su ROAS, ma su quello che conta davvero per il tuo business.
          </p>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            FAQ
        ════════════════════════════════════════ */}
        <div className="art-col">
          <h2 className="art-h2" style={{ marginBottom: "24px" }}>Domande frequenti</h2>
          <div className="art-faq-wrap">

            <details className="art-faq-item">
              <summary>
                Il ROAS va ignorato del tutto?
                <svg className="art-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="art-faq-answer">
                No. Il ROAS &egrave; utile per confrontare campagne tra loro, ottimizzare lo spend
                e identificare creativit&agrave; o audience che performano meglio. Il problema &egrave; usarlo
                come unico indicatore della salute del business. Va sempre affiancato al margine
                di contribuzione reale e al CAC.
              </div>
            </details>

            <details className="art-faq-item">
              <summary>
                Qual &egrave; un ROAS &ldquo;buono&rdquo;?
                <svg className="art-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="art-faq-answer">
                Non esiste un ROAS universalmente &ldquo;buono&rdquo;. Dipende interamente dal tuo margine
                di contribuzione reale. Un ROAS di 3 pu&ograve; essere ottimo con margini al 40%,
                e disastroso con margini al 20%. Calcola prima il tuo break-even ROAS,
                poi valuta qualsiasi numero rispetto a quello.
              </div>
            </details>

            <details className="art-faq-item">
              <summary>
                Come calcolo il mio margine di contribuzione reale?
                <svg className="art-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="art-faq-answer">
                Parti dal prezzo di vendita e sottrai nell&rsquo;ordine: costo del prodotto (COGS),
                costi di spedizione e imballo, tasso di resi ponderato sul totale ordini,
                commissioni di piattaforma e gateway di pagamento. Il risultato &egrave; il tuo
                margine di contribuzione reale. Non il margine lordo che trovi di default
                nei report &mdash; quello sottostima quasi sempre i costi del 10&ndash;20 punti.
              </div>
            </details>

            <details className="art-faq-item">
              <summary>
                Con quale frequenza devo controllare questi KPI?
                <svg className="art-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="art-faq-answer">
                Il margine di contribuzione per canale va monitorato mensilmente.
                Il CAC reale almeno ogni due settimane durante campagne attive.
                Il tasso di riacquisto a 90 giorni &egrave; un indicatore lagging &mdash; controllalo mensilmente.
                Evita di ottimizzare su dati giornalieri: sono troppo rumorosi per essere affidabili
                e portano a decisioni reattive invece che strategiche.
              </div>
            </details>

            <details className="art-faq-item">
              <summary>
                Il mio e-commerce ha margini bassi &mdash; cosa posso fare?
                <svg className="art-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="art-faq-answer">
                Prima di aumentare il budget ads, lavora sull&rsquo;AOV (valore medio ordine) tramite bundle
                e upsell, sul tasso di riacquisto, e sulla riduzione dei costi operativi.
                Aumentare la spesa pubblicitaria con margini bassi amplifica il problema, non lo risolve.
                Il ROAS sale, ma il margine netto rimane negativo &mdash; solo con pi&ugrave; volume.
              </div>
            </details>

          </div>
        </div>

        {/* ════════════════════════════════════════
            CONCLUSIONE
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-conclusion">
            <div className="art-conclusion-label">In sintesi</div>
            <div className="art-conclusion-title">
              Il ROAS &egrave; un punto di partenza, non un verdetto.
            </div>
            <div className="art-conclusion-points">
              <div className="art-conclusion-point">
                Il ROAS misura l&rsquo;efficienza dello spend pubblicitario, non la profittabilit&agrave; del business.
              </div>
              <div className="art-conclusion-point">
                Il margine di contribuzione reale &egrave; il denominatore di tutto. Calcolalo prima di leggere qualsiasi report.
              </div>
              <div className="art-conclusion-point">
                Il tuo ROAS di break-even &egrave; 1 diviso il tuo margine reale. Sotto quel numero stai finanziando perdite.
              </div>
              <div className="art-conclusion-point">
                Tre KPI bastano per avere una visione onesta: margine per canale, CAC reale, tasso di riacquisto a 90 giorni.
              </div>
              <div className="art-conclusion-point">
                Un&rsquo;agenzia che ti riporta solo ROAS non &egrave; necessariamente disonesta &mdash; ma non ti sta dando
                le informazioni che ti servono per decidere.
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            SIGNATURE
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-signature">
            <div className="art-sig-avatar">N</div>
            <div>
              <div className="art-sig-name">Nicola Serrao</div>
              <div className="art-sig-role">
                Digital Business Advisor &mdash; Strategia, KPI, Direzione operativa
              </div>
            </div>
            <Link href="/#contatti" className="art-sig-link">
              Lavoriamo insieme &rarr;
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════
            TAGS
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-tags">
            <span className="art-tags-label">Tag:</span>
            {["Analytics", "KPI", "ROAS", "Misurazione", "E-commerce", "Advertising", "Margine"].map(tag => (
              <span key={tag} className="art-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            REFERENCES
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-references">
            <div className="art-references-label">Fonti e riferimenti</div>
            <ul className="art-ref-list">
              <li className="art-ref-item">
                <span className="art-ref-num">[1]</span>
                <span>
                  Shopify, <em>Ecommerce Benchmarks 2024</em>: dati su margini medi per categoria,
                  tasso di resi e commissioni di piattaforma nel mercato europeo.{" "}
                  <a href="https://www.shopify.com/enterprise/ecommerce-benchmarks" target="_blank" rel="noopener noreferrer">
                    shopify.com/enterprise/ecommerce-benchmarks
                  </a>
                </span>
              </li>
              <li className="art-ref-item">
                <span className="art-ref-num">[2]</span>
                <span>
                  Meta Business, <em>Advertising Performance Guide</em>: metodologia di attribuzione ROAS
                  e limitazioni del modello last-click nel contesto iOS 14+.
                </span>
              </li>
              <li className="art-ref-item">
                <span className="art-ref-num">[3]</span>
                <span>
                  DataFeedWatch, <em>Shopping Ads Benchmarks Report 2024</em>: ROAS medio per settore
                  in Google Shopping e Meta Advantage+ campagne.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}
