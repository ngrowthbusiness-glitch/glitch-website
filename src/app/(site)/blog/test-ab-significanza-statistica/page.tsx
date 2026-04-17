import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Test A/B e significanza statistica — Il tuo test probabilmente non prova nulla",
  description:
    "Stagionalità, competitor, giorno del mese: le variabili nascoste che falsano ogni test. Quanti utenti servono davvero e come interpretare i risultati senza ingannare te stesso.",
  openGraph: {
    title: "Test A/B e significanza statistica — Il tuo test probabilmente non prova nulla",
    description:
      "Stagionalità, competitor, giorno del mese: le variabili nascoste che falsano ogni test A/B. Come fare test che contano davvero.",
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
  headline:
    "Test A/B e significanza statistica — Il tuo test probabilmente non prova nulla",
  description:
    "Stagionalità, competitor, giorno del mese: le variabili nascoste che falsano ogni test. Quanti utenti servono davvero e come interpretare i risultati.",
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
  url: "https://nicolaserrao.com/blog/test-ab-significanza-statistica",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quanti utenti servono per un test A/B valido?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dal tasso di conversione attuale e dall'effetto minimo che vuoi rilevare. Con un CR del 2% e un obiettivo di miglioramento del 20%, servono circa 20.000 utenti per variante — 40.000 in totale. La maggior parte delle PMI non raggiunge questi volumi in meno di 4-8 settimane.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto deve durare un test A/B?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Almeno 2 settimane complete, inclusi due weekend. Questo elimina i bias da giorno della settimana. Se il volume di traffico è basso, considera 3-4 settimane. Evita di fermare un test appena vedi un risultato positivo: è quasi sempre rumore statistico.",
      },
    },
    {
      "@type": "Question",
      name: "Cos'è la significanza statistica e perché conta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La significanza statistica (tipicamente al 95%) indica che c'è solo un 5% di probabilità che il risultato osservato sia dovuto al caso. Senza raggiungerla, non puoi distinguere un miglioramento reale dal rumore. La maggior parte degli strumenti di A/B test mostra il dato, ma pochi capiscono cosa significa.",
      },
    },
    {
      "@type": "Question",
      name: "Posso fare A/B test con poco traffico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puoi fare test, ma devi abbassare le aspettative. Con poco traffico, rileva solo effetti grandi (>30-40% di miglioramento). Effetti piccoli richiedono campioni enormi. Concentra i test sulle pagine con più traffico — homepage e checkout ricevono più visite di qualsiasi altra pagina.",
      },
    },
    {
      "@type": "Question",
      name: "Stagionalità e test A/B: come gestirle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La stagionalità invalida un test quando il comportamento degli utenti cambia significativamente durante il periodo. La soluzione: documenta sempre quando inizi e finisci un test, evita periodi di picco (Black Friday, Natale, saldi) e fai girare i test su finestre complete di 7 giorni multipli.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function TestAbPage() {
  return (
    <>
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

        .ab-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 60px 120px;
        }
        .ab-col       { max-width: 680px; margin: 0 auto; }
        .ab-col-wide  { max-width: 880px; margin: 0 auto; }

        /* ── BREADCRUMB ── */
        .ab-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 48px;
        }
        .ab-breadcrumb a { color: var(--teal); text-decoration: none; transition: opacity .2s; }
        .ab-breadcrumb a:hover { opacity: .7; }
        .ab-breadcrumb-sep { color: var(--text-faint); }

        /* ── HEADER ── */
        .ab-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
        }
        .ab-h1 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px); font-weight: 700;
          line-height: 1.15; color: var(--text); margin-bottom: 24px;
        }
        .ab-h1 em { font-style: italic; color: var(--teal); }
        .ab-subtitle {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(15px, 2vw, 18px); font-style: italic;
          color: var(--text-dim); line-height: 1.7; margin-bottom: 32px;
        }
        .ab-author-bar {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--teal-border);
          border-bottom: 1px solid var(--teal-border);
          margin-bottom: 48px; flex-wrap: wrap;
        }
        .ab-author-name { font-size: 11px; font-weight: 500; letter-spacing: 1px; color: var(--text); }
        .ab-author-role { font-size: 10px; color: var(--text-dim); letter-spacing: .5px; }
        .ab-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--teal-border); flex-shrink: 0; }
        .ab-meta-item { font-size: 10px; letter-spacing: 1px; color: var(--text-dim); text-transform: uppercase; }
        .ab-meta-tag {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--teal); border: 1px solid var(--teal-border);
          padding: 3px 8px; border-radius: 3px; background: var(--teal-dim);
        }

        /* ── TOC ── */
        .ab-toc {
          border: 1px solid var(--teal-border); border-radius: 8px;
          background: var(--teal-dim); padding: 24px 28px; margin-bottom: 56px;
        }
        .ab-toc-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--teal); margin-bottom: 16px; }
        .ab-toc ol { list-style: none; counter-reset: toc; display: flex; flex-direction: column; gap: 10px; }
        .ab-toc li { counter-increment: toc; display: flex; align-items: baseline; gap: 12px; }
        .ab-toc li::before {
          content: counter(toc, decimal-leading-zero);
          font-size: 10px; color: var(--teal); opacity: .7; flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }
        .ab-toc a { font-size: 12px; color: var(--text-dim); text-decoration: none; transition: color .2s; line-height: 1.5; }
        .ab-toc a:hover { color: var(--teal); }

        /* ── BODY ── */
        .ab-lead {
          font-size: clamp(14px, 1.6vw, 16px); color: var(--text-dim);
          line-height: 1.9; margin-bottom: 48px;
        }
        .ab-lead strong { color: var(--text); font-weight: 500; }
        .ab-h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 28px); font-weight: 700;
          color: var(--text); margin-bottom: 20px;
          scroll-margin-top: 88px; line-height: 1.25;
        }
        .ab-h2 em { font-style: italic; color: var(--teal); }
        .ab-p { font-size: 13px; color: var(--text-dim); line-height: 1.9; margin-bottom: 20px; }
        .ab-p strong { color: var(--text); font-weight: 500; }
        .ab-p em { font-style: italic; color: var(--text); }
        .ab-section { margin-bottom: 72px; }
        .ab-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 56px 0;
        }
        .ab-callout {
          border-left: 2px solid var(--teal); padding: 16px 20px;
          background: rgba(0,255,252,0.04); border-radius: 0 6px 6px 0; margin: 24px 0;
        }
        .ab-callout p { font-size: 13px; color: var(--text-dim); line-height: 1.8; margin: 0; }
        .ab-callout p strong { color: var(--text); font-weight: 500; }
        .ab-callout--warn {
          border-left-color: rgba(255,180,50,0.8);
          background: rgba(255,180,50,0.04);
        }
        .ab-internal-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; letter-spacing: .5px; color: var(--teal);
          text-decoration: none; border-bottom: 1px solid var(--teal-border);
          padding-bottom: 1px; transition: opacity .2s;
        }
        .ab-internal-link:hover { opacity: .7; }

        /* ══════════════════════════════════════════
           VISUAL 1 — FUNNEL SEGMENTATO
        ══════════════════════════════════════════ */

        .ab-funnel-wrap { margin: 32px 0; }
        .ab-funnel-label {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
        }
        .ab-funnel-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .ab-funnel-col-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 12px; padding: 6px 12px; border-radius: 4px; text-align: center;
        }
        .ab-funnel-col--bad .ab-funnel-col-label {
          color: rgba(255,180,50,0.9); background: rgba(255,180,50,0.06);
          border: 1px solid rgba(255,180,50,0.2);
        }
        .ab-funnel-col--good .ab-funnel-col-label {
          color: var(--teal); background: var(--teal-dim); border: 1px solid var(--teal-border);
        }
        .ab-funnel-steps { display: flex; flex-direction: column; gap: 4px; }
        .ab-funnel-step {
          border-radius: 5px; padding: 14px 16px;
          display: flex; align-items: center;
        }
        .ab-funnel-step-info {
          display: flex; align-items: center;
          justify-content: space-between; width: 100%; gap: 12px;
        }
        .ab-funnel-step-name { font-size: 11px; font-weight: 500; color: var(--text); }
        .ab-funnel-step-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .ab-funnel-step-n {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px; color: var(--text-dim);
        }
        .ab-funnel-step-pct {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px; font-weight: 500; min-width: 36px; text-align: right;
        }
        .ab-funnel-drop-hint {
          padding: 3px 0 3px 16px; font-size: 10px;
          color: rgba(255,110,90,0.6);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }
        .ab-funnel-single-stat {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 5px; margin-top: 16px;
        }
        .ab-funnel-single-label { font-size: 11px; color: var(--text-dim); }
        .ab-funnel-single-value {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px; font-weight: 500; color: var(--text);
        }

        /* ══════════════════════════════════════════
           VISUAL 2 — VARIABILI CONFONDENTI
        ══════════════════════════════════════════ */

        .ab-vars-label {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
        }
        .ab-vars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 12px; margin: 32px 0;
        }
        .ab-var-card {
          border: 1px solid rgba(232,245,242,0.06); border-radius: 8px;
          padding: 16px 18px; background: rgba(232,245,242,0.02);
          transition: border-color .2s, background .2s; position: relative;
        }
        .ab-var-card:hover { border-color: var(--teal-border); background: rgba(0,255,252,0.03); }
        .ab-var-card--high { border-color: rgba(255,100,80,0.15); }
        .ab-var-card--high:hover { border-color: rgba(255,100,80,0.3); background: rgba(255,100,80,0.04); }
        .ab-var-icon { font-size: 22px; margin-bottom: 10px; line-height: 1; }
        .ab-var-name { font-size: 11px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
        .ab-var-desc { font-size: 10px; color: var(--text-dim); line-height: 1.6; }
        .ab-var-impact {
          position: absolute; top: 10px; right: 10px;
          font-size: 8px; letter-spacing: 1px; text-transform: uppercase;
          padding: 2px 6px; border-radius: 2px;
        }
        .ab-impact-high {
          color: rgba(255,110,90,0.9); background: rgba(255,100,80,0.1);
          border: 1px solid rgba(255,100,80,0.2);
        }
        .ab-impact-med {
          color: rgba(255,200,60,0.9); background: rgba(255,200,50,0.08);
          border: 1px solid rgba(255,200,50,0.2);
        }

        /* ══════════════════════════════════════════
           VISUAL 3 — CONFIDENCE METER + SAMPLE TABLE
        ══════════════════════════════════════════ */

        .ab-conf-label {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
        }
        .ab-conf-meter-wrap { position: relative; padding-top: 28px; margin-bottom: 4px; }
        .ab-conf-meter {
          position: relative; height: 36px; border-radius: 6px;
          overflow: hidden; border: 1px solid rgba(232,245,242,0.06);
        }
        .ab-conf-track { position: absolute; inset: 0; display: flex; }
        .ab-conf-zone { height: 100%; display: flex; align-items: center; justify-content: center; }
        .ab-conf-zone--red  { width: 70%; background: rgba(255,100,80,0.12); }
        .ab-conf-zone--yellow { width: 20%; background: rgba(255,200,50,0.10); }
        .ab-conf-zone--green  { width: 10%; background: rgba(0,255,252,0.08); }
        .ab-conf-zone-label {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }
        .ab-conf-zone--red .ab-conf-zone-label    { color: rgba(255,110,90,0.7); }
        .ab-conf-zone--yellow .ab-conf-zone-label { color: rgba(255,200,60,0.7); }
        .ab-conf-zone--green .ab-conf-zone-label  { color: var(--teal); opacity: .8; }
        .ab-conf-marker {
          position: absolute; top: 0; bottom: 0; width: 2px;
          background: var(--teal); left: 90%;
          box-shadow: 0 0 8px rgba(0,255,252,0.4);
        }
        .ab-conf-marker::after {
          content: '95%';
          position: absolute; top: -24px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; color: var(--teal); white-space: nowrap;
        }
        .ab-conf-axis {
          display: flex; justify-content: space-between; padding: 6px 0 16px;
        }
        .ab-conf-axis-label {
          font-size: 9px; color: var(--text-faint);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
        }
        .ab-sample-table {
          width: 100%; border-collapse: collapse;
          border: 1px solid rgba(232,245,242,0.06);
          border-radius: 8px; overflow: hidden; margin-top: 8px;
        }
        .ab-sample-table thead th {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-faint); font-weight: 400; padding: 10px 16px;
          text-align: left; background: rgba(232,245,242,0.02);
          border-bottom: 1px solid rgba(232,245,242,0.06);
        }
        .ab-sample-table tbody tr {
          border-bottom: 1px solid rgba(232,245,242,0.04); transition: background .2s;
        }
        .ab-sample-table tbody tr:last-child { border-bottom: none; }
        .ab-sample-table tbody tr:hover { background: rgba(232,245,242,0.02); }
        .ab-sample-table tbody td {
          padding: 14px 16px;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 12px; color: var(--text-dim);
        }
        .ab-sample-table tbody td:first-child { color: var(--text); font-weight: 500; }
        .ab-sv {
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          padding: 3px 8px; border-radius: 3px; white-space: nowrap;
        }
        .ab-sv--green { color: var(--teal); background: var(--teal-dim); border: 1px solid var(--teal-border); }
        .ab-sv--yellow { color: rgba(255,200,60,.9); background: rgba(255,200,50,.08); border: 1px solid rgba(255,200,50,.2); }
        .ab-sv--red    { color: rgba(255,110,90,.9); background: rgba(255,100,80,.10); border: 1px solid rgba(255,100,80,.2); }

        /* ══════════════════════════════════════════
           VISUAL 4 — TIMELINE TEST A/B
        ══════════════════════════════════════════ */

        .ab-timeline-wrap {
          margin: 32px 0; border: 1px solid rgba(232,245,242,0.06);
          border-radius: 8px; overflow: hidden;
        }
        .ab-tl-header {
          padding: 14px 20px; background: rgba(232,245,242,0.02);
          border-bottom: 1px solid rgba(232,245,242,0.06);
          display: flex; align-items: center; gap: 12px;
        }
        .ab-tl-header-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--teal); }
        .ab-tl-header-sub   { font-size: 10px; color: var(--text-dim); }
        .ab-tl-body { padding: 20px 24px; }

        /* week labels */
        .ab-tl-weeks {
          display: grid; grid-template-columns: 88px repeat(4, 1fr);
          margin-bottom: 12px;
        }
        .ab-tl-week-label {
          text-align: center; font-size: 9px; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text-faint);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          padding-bottom: 8px; border-bottom: 1px solid rgba(232,245,242,0.06);
        }

        /* events row */
        .ab-tl-row {
          display: grid; grid-template-columns: 88px repeat(4, 1fr);
          gap: 4px; margin: 10px 0; min-height: 60px; align-items: center;
        }
        .ab-tl-row-label {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-faint); padding-right: 12px;
          display: flex; align-items: center;
        }
        .ab-tl-event {
          background: rgba(255,180,50,0.08); border: 1px solid rgba(255,180,50,0.2);
          border-radius: 4px; padding: 7px 8px;
          font-size: 9px; color: rgba(255,200,60,0.9); text-align: center; line-height: 1.45;
        }
        .ab-tl-event--high {
          background: rgba(255,100,80,0.08); border-color: rgba(255,100,80,0.25);
          color: rgba(255,110,90,0.9);
        }
        .ab-tl-empty { /* empty cell */ }

        /* variant bars */
        .ab-tl-bar {
          grid-column: 2 / -1; height: 32px; border-radius: 4px;
          display: flex; align-items: center; padding: 0 14px;
        }
        .ab-tl-bar--a {
          background: rgba(232,245,242,0.04); border: 1px solid rgba(232,245,242,0.10);
        }
        .ab-tl-bar--b {
          background: rgba(0,255,252,0.04); border: 1px solid var(--teal-border);
        }
        .ab-tl-bar-text { font-size: 10px; color: var(--text-dim); }
        .ab-tl-bar--b .ab-tl-bar-text { color: var(--teal); opacity: .8; }

        /* result */
        .ab-tl-result {
          margin-top: 16px; padding: 12px 16px;
          background: rgba(232,245,242,0.02); border: 1px solid rgba(232,245,242,0.08);
          border-radius: 6px; display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .ab-tl-result-text { font-size: 12px; color: var(--text-dim); }
        .ab-tl-result-text strong { color: var(--text); }
        .ab-tl-result-badge {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: rgba(255,180,50,0.9); background: rgba(255,180,50,0.08);
          border: 1px solid rgba(255,180,50,0.2); padding: 4px 10px; border-radius: 4px;
        }

        /* ══════════════════════════════════════════
           VISUAL 5 — 4 SÌ CHECKLIST
        ══════════════════════════════════════════ */

        .ab-4si-label {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
        }
        .ab-4si-wrap { display: flex; flex-direction: column; gap: 8px; margin: 32px 0; }
        .ab-4si-item {
          display: grid; grid-template-columns: auto 1fr auto;
          gap: 16px; align-items: center;
          padding: 16px 20px; border-radius: 6px; border: 1px solid;
        }
        .ab-4si-item--yes {
          border-color: var(--teal-border); background: rgba(0,255,252,0.03);
        }
        .ab-4si-num {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; opacity: .35;
          line-height: 1; color: var(--teal);
        }
        .ab-4si-title { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
        .ab-4si-desc  { font-size: 11px; color: var(--text-dim); line-height: 1.6; }
        .ab-4si-badge {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 4px 10px; border-radius: 3px; white-space: nowrap; flex-shrink: 0;
          color: var(--teal); background: var(--teal-dim); border: 1px solid var(--teal-border);
        }
        .ab-4si-fail {
          padding: 14px 20px; border-radius: 6px; margin-top: 4px;
          background: rgba(255,100,80,0.06); border: 1px solid rgba(255,100,80,0.2);
        }
        .ab-4si-fail p {
          font-size: 12px; color: rgba(255,180,160,0.8);
          margin: 0; line-height: 1.7;
        }
        .ab-4si-fail strong { color: rgba(255,140,120,0.9); }

        /* ══════════════════════════════════════════
           METHOD STEPS
        ══════════════════════════════════════════ */

        .ab-method-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 48px; }
        .ab-method-item {
          display: grid; grid-template-columns: auto 1fr; gap: 20px;
          padding: 20px 24px; border: 1px solid rgba(232,245,242,0.06);
          border-radius: 8px; background: rgba(232,245,242,0.02);
        }
        .ab-method-num {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 28px; font-weight: 700; color: var(--teal);
          opacity: .35; line-height: 1; padding-top: 2px; min-width: 28px;
        }
        .ab-method-title { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
        .ab-method-desc  { font-size: 12px; color: var(--text-dim); line-height: 1.8; }

        /* ══════════════════════════════════════════
           LEAD MAGNET
        ══════════════════════════════════════════ */

        .ab-lead-magnet {
          border: 1px solid var(--teal-border); border-radius: 10px;
          background: var(--teal-dim); padding: 36px 40px;
          margin: 64px 0; position: relative; overflow: hidden;
        }
        .ab-lead-magnet::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,252,0.05), transparent);
          pointer-events: none;
        }
        .ab-lead-magnet::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
        }
        .ab-lm-eyebrow { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--teal); margin-bottom: 16px; position: relative; }
        .ab-lm-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px); font-weight: 700; color: var(--text);
          margin-bottom: 12px; position: relative; line-height: 1.3;
        }
        .ab-lm-desc { font-size: 13px; color: var(--text-dim); line-height: 1.8; margin-bottom: 28px; position: relative; max-width: 520px; }
        .ab-lm-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: var(--bg);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 28px; border-radius: 5px; text-decoration: none;
          transition: opacity .2s, transform .2s; position: relative;
        }
        .ab-lm-cta:hover { opacity: .85; transform: translateY(-2px); }
        .ab-lm-meta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; color: var(--text-dim); margin-left: 20px; position: relative;
        }

        /* ══════════════════════════════════════════
           FAQ
        ══════════════════════════════════════════ */

        .ab-faq-wrap { display: flex; flex-direction: column; gap: 8px; margin: 32px 0; }
        .ab-faq-item {
          border: 1px solid rgba(232,245,242,0.08); border-radius: 6px;
          overflow: hidden; transition: border-color .2s;
        }
        .ab-faq-item:hover { border-color: var(--teal-border); }
        .ab-faq-item summary {
          padding: 18px 20px; font-size: 13px; font-weight: 500; color: var(--text);
          cursor: pointer; list-style: none; display: flex;
          justify-content: space-between; align-items: center; gap: 16px;
          background: rgba(232,245,242,0.02); user-select: none; transition: background .2s;
        }
        .ab-faq-item summary:hover { background: rgba(232,245,242,0.04); }
        .ab-faq-item summary::-webkit-details-marker { display: none; }
        .ab-faq-icon {
          flex-shrink: 0; width: 16px; height: 16px;
          color: var(--teal); opacity: .6; transition: transform .2s;
        }
        .ab-faq-item[open] .ab-faq-icon { transform: rotate(45deg); }
        .ab-faq-answer {
          padding: 16px 20px 18px; font-size: 12px; color: var(--text-dim);
          line-height: 1.85; border-top: 1px solid rgba(232,245,242,0.06);
        }

        /* ══════════════════════════════════════════
           CONCLUSION
        ══════════════════════════════════════════ */

        .ab-conclusion {
          border: 1px solid var(--teal-border); border-radius: 8px;
          background: rgba(0,255,252,0.04); padding: 32px 36px; margin: 56px 0 48px;
        }
        .ab-conclusion-label {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 16px;
        }
        .ab-conclusion-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px); font-weight: 700;
          color: var(--text); margin-bottom: 20px;
        }
        .ab-conclusion-points { display: flex; flex-direction: column; gap: 10px; }
        .ab-conclusion-point {
          display: flex; gap: 12px; align-items: flex-start;
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
        }
        .ab-conclusion-point::before {
          content: '→'; color: var(--teal); flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace; margin-top: 1px;
        }

        /* ══════════════════════════════════════════
           SIGNATURE / TAGS / REFERENCES
        ══════════════════════════════════════════ */

        .ab-signature {
          display: flex; align-items: center; gap: 20px;
          padding: 24px 0;
          border-top: 1px solid rgba(232,245,242,0.06);
          border-bottom: 1px solid rgba(232,245,242,0.06);
          margin-bottom: 32px; flex-wrap: wrap;
        }
        .ab-sig-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          border: 1px solid var(--teal-border); flex-shrink: 0;
          background: var(--teal-dim); display: flex; align-items: center; justify-content: center;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--teal);
        }
        .ab-sig-name { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
        .ab-sig-role { font-size: 11px; color: var(--text-dim); line-height: 1.5; }
        .ab-sig-link {
          margin-left: auto; font-size: 10px; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--teal); text-decoration: none; transition: opacity .2s;
        }
        .ab-sig-link:hover { opacity: .7; }

        .ab-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 56px; align-items: center; }
        .ab-tags-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-faint); margin-right: 4px; }
        .ab-tag {
          font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--text-dim); border: 1px solid rgba(232,245,242,0.08);
          padding: 4px 10px; border-radius: 3px; background: rgba(232,245,242,0.02);
          text-decoration: none; transition: border-color .2s, color .2s;
        }
        .ab-tag:hover { border-color: var(--teal-border); color: var(--teal); }

        .ab-references { padding-top: 24px; border-top: 1px solid rgba(232,245,242,0.06); }
        .ab-ref-label {
          font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--text-faint); margin-bottom: 14px;
        }
        .ab-ref-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .ab-ref-item { font-size: 11px; color: var(--text-dim); line-height: 1.6; display: flex; gap: 10px; }
        .ab-ref-num { color: var(--text-faint); flex-shrink: 0; font-family: var(--font-dm-mono), 'DM Mono', monospace; }
        .ab-ref-item a { color: var(--text-dim); text-decoration: underline; text-decoration-color: rgba(232,245,242,0.15); transition: color .2s; }
        .ab-ref-item a:hover { color: var(--teal); }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */

        @media (max-width: 768px) {
          .ab-page { padding: 40px 24px 80px; }
          .ab-funnel-cols { grid-template-columns: 1fr; }
          .ab-vars-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-lead-magnet { padding: 28px 24px; }
          .ab-lm-meta { margin-left: 0; margin-top: 12px; display: flex; }
          .ab-tl-weeks, .ab-tl-row { display: none; }
        }

        @media (max-width: 480px) {
          .ab-page { padding: 32px 16px 64px; }
          .ab-vars-grid { grid-template-columns: 1fr; }
          .ab-sig-link { display: none; }
          .ab-4si-item { grid-template-columns: auto 1fr; }
          .ab-4si-badge { display: none; }
        }

      `}</style>

      <div className="ab-page">

        {/* ════ BREADCRUMB ════ */}
        <div className="ab-col">
          <nav className="ab-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="ab-breadcrumb-sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="ab-breadcrumb-sep">/</span>
            <span>Test A/B e significanza statistica</span>
          </nav>
        </div>

        {/* ════ HEADER ════ */}
        <div className="ab-col">
          <div className="ab-eyebrow">Analytics &amp; KPI</div>

          <h1 className="ab-h1">
            Il tuo test A/B ha mostrato +18%.<br />
            <em>Probabilmente non significa niente.</em>
          </h1>

          <p className="ab-subtitle">
            Stagionalità, finestre temporali, numero di utenti, competitor in azione:
            le variabili che rendono quasi ogni test ambiguo &mdash; e come fare test
            che invece dicono qualcosa di utile.
          </p>

          <div className="ab-author-bar">
            <span className="ab-author-name">Nicola Serrao</span>
            <span className="ab-meta-dot" />
            <span className="ab-author-role">Digital Business Advisor</span>
            <span className="ab-meta-dot" />
            <span className="ab-meta-item">9 min lettura</span>
            <span className="ab-meta-dot" />
            <span className="ab-meta-item">17 Aprile 2026</span>
            <span className="ab-meta-tag">Analytics</span>
          </div>
        </div>

        {/* ════ TOC ════ */}
        <div className="ab-col">
          <nav className="ab-toc" aria-label="Indice">
            <div className="ab-toc-label">In questo articolo</div>
            <ol>
              <li><a href="#intuizione-e-dati">Intuizione e dati: perché servono entrambi</a></li>
              <li><a href="#segmentare">Perché segmentare ogni step cambia tutto</a></li>
              <li><a href="#variabili">Le variabili che nessuno conta</a></li>
              <li><a href="#significanza">Significanza statistica: il concetto che manca</a></li>
              <li><a href="#quando-fidarsi">Quando puoi fidarti di un test: i 4 sì</a></li>
              <li><a href="#metodo">Il metodo minimo per testare bene</a></li>
            </ol>
          </nav>
        </div>

        {/* ════ INTRO ════ */}
        <div className="ab-col">
          <p className="ab-lead">
            Hai cambiato la headline della landing page. Le conversioni sono salite del 18%
            in due settimane. L&rsquo;agenzia &egrave; entusiasta. Hai validato la variante.{" "}
            <strong>Probabilmente hai preso una decisione sbagliata.</strong>{" "}
            Non perch&eacute; i dati mentano &mdash; ma perch&eacute; nel periodo del test sono
            successe almeno tre cose che non hai misurato. E quel 18% potrebbe non avere niente
            a che fare con la tua headline.
          </p>
        </div>

        {/* ════ SEZIONE 1 ════ */}
        <div className="ab-col ab-section">
          <h2 id="intuizione-e-dati" className="ab-h2">
            Intuizione e dati: <em>perch&eacute; servono entrambi</em>
          </h2>

          <p className="ab-p">
            Gli imprenditori bravi hanno un polso buono sulla loro azienda. Sanno da dove
            arrivano i clienti, quali prodotti funzionano, in quale periodo dell&rsquo;anno
            le vendite crescono. Quella conoscenza &egrave; reale e preziosa &mdash; non va ignorata.
          </p>

          <p className="ab-p">
            Il problema &egrave; che l&rsquo;intuizione funziona bene per le tendenze grandi e lente.
            Riconosce pattern che si ripetono nel tempo. Ma non &egrave; attrezzata per rispondere
            a domande precise come: <em>questa modifica specifica ha migliorato questo step del
            funnel del 12%?</em> Per quello servono i dati segmentati &mdash; e servono bene raccolti.
          </p>

          <div className="ab-callout">
            <p>
              <strong>Intuizione e dati non sono in competizione.</strong>{" "}
              L&rsquo;intuizione ti dice dove guardare. I dati ti dicono cosa vedi quando guardi.
              Il problema nasce quando uno dei due sostituisce l&rsquo;altro: decisioni solo di pancia,
              oppure A/B test interpretati senza contesto.
            </p>
          </div>
        </div>

        {/* ════ SEZIONE 2 — SEGMENTARE ════ */}
        <div className="ab-col">
          <h2 id="segmentare" className="ab-h2">
            Perch&eacute; segmentare ogni step <em>cambia tutto</em>
          </h2>

          <p className="ab-p">
            Il totale &egrave; il numero pi&ugrave; facile da guardare e il meno utile per capire
            cosa succede. Un e-commerce con 10.000 sessioni mensili e 320 acquisti
            conosce il tasso di conversione globale: 3,2%. Ma non sa dove si perde
            il 96,8% degli utenti.
          </p>

          <p className="ab-p">
            Segmentare ogni step del funnel &mdash; dalla sessione alla scheda prodotto,
            al carrello, al checkout, all&rsquo;acquisto &mdash; mostra esattamente dove si rompe
            il percorso. E spesso rivela che il problema non &egrave; dove si pensava.
          </p>
        </div>

        {/* VISUAL 1 — FUNNEL */}
        <div className="ab-col-wide">
          <div className="ab-funnel-wrap">
            <div className="ab-funnel-label">Stesso sito, stessi 10.000 utenti &mdash; due modi di leggerlo</div>
            <div className="ab-funnel-cols">

              {/* Senza segmentazione */}
              <div className="ab-funnel-col ab-funnel-col--bad">
                <div className="ab-funnel-col-label">Senza segmentazione</div>
                <div className="ab-funnel-steps">
                  <div className="ab-funnel-step" style={{ background: "rgba(232,245,242,0.03)", border: "1px solid rgba(232,245,242,0.08)" }}>
                    <div className="ab-funnel-step-info">
                      <div className="ab-funnel-step-name">Sessioni totali</div>
                      <div className="ab-funnel-step-right">
                        <div className="ab-funnel-step-n">10.000</div>
                        <div className="ab-funnel-step-pct" style={{ color: "var(--text-faint)" }}>100%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-faint)", fontFamily: "var(--font-dm-mono), 'DM Mono', monospace" }}>??? (dati non disponibili)</span>
                  </div>
                  <div className="ab-funnel-step" style={{ background: "rgba(232,245,242,0.03)", border: "1px solid rgba(232,245,242,0.08)" }}>
                    <div className="ab-funnel-step-info">
                      <div className="ab-funnel-step-name">Acquisti</div>
                      <div className="ab-funnel-step-right">
                        <div className="ab-funnel-step-n">320</div>
                        <div className="ab-funnel-step-pct" style={{ color: "var(--text-dim)" }}>3,2%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ab-funnel-single-stat" style={{ background: "rgba(232,245,242,0.02)", border: "1px solid rgba(232,245,242,0.08)" }}>
                  <span className="ab-funnel-single-label">Cosa vedi</span>
                  <span className="ab-funnel-single-value">CR 3,2% &mdash; ok o no?</span>
                </div>
              </div>

              {/* Con segmentazione */}
              <div className="ab-funnel-col ab-funnel-col--good">
                <div className="ab-funnel-col-label">Con segmentazione per step</div>
                <div className="ab-funnel-steps">
                  {[
                    { name: "Sessioni", n: "10.000", pct: "100%", drop: null, warn: false },
                    { name: "→ Scheda prodotto", n: "4.200", pct: "42%", drop: "−58% drop &mdash; il problema è qui", warn: true },
                    { name: "→ Aggiunge al carrello", n: "1.100", pct: "26%", drop: null, warn: false },
                    { name: "→ Inizia checkout", n: "680", pct: "62%", drop: null, warn: false },
                    { name: "→ Acquisto", n: "320", pct: "47%", drop: null, warn: false },
                  ].map((s, i) => (
                    <div key={i}>
                      <div
                        className="ab-funnel-step"
                        style={{
                          background: s.warn ? "rgba(255,100,80,0.06)" : "rgba(0,255,252,0.03)",
                          border: s.warn ? "1px solid rgba(255,100,80,0.18)" : "1px solid var(--teal-border)",
                        }}
                      >
                        <div className="ab-funnel-step-info">
                          <div className="ab-funnel-step-name" style={{ color: s.warn ? "rgba(255,210,200,0.85)" : "var(--text)" }}>
                            {s.name}
                          </div>
                          <div className="ab-funnel-step-right">
                            <div className="ab-funnel-step-n">{s.n}</div>
                            <div className="ab-funnel-step-pct" style={{ color: s.warn ? "rgba(255,110,90,0.9)" : "var(--teal)" }}>
                              {s.pct}
                            </div>
                          </div>
                        </div>
                      </div>
                      {s.drop && (
                        <div className="ab-funnel-drop-hint" dangerouslySetInnerHTML={{ __html: "↑ " + s.drop }} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="ab-funnel-single-stat" style={{ background: "rgba(0,255,252,0.04)", border: "1px solid var(--teal-border)" }}>
                  <span className="ab-funnel-single-label">Cosa vedi</span>
                  <span className="ab-funnel-single-value" style={{ color: "var(--teal)" }}>Lavora sulla scheda prodotto</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="ab-col ab-section">
          <p className="ab-p">
            Stesso sito, stesse 10.000 sessioni. Senza segmentazione, il CR del 3,2% sembra
            un numero da ottimizzare genericamente. Con la segmentazione, il problema diventa
            preciso: il 58% degli utenti esce alla scheda prodotto. L&rsquo;intervento da fare
            non &egrave; sulla headline, non &egrave; sul checkout &mdash; &egrave; sulle schede prodotto.
          </p>

          <p className="ab-p">
            Senza dati segmentati, il rischio &egrave; ottimizzare il posto sbagliato.
            E farlo con un test A/B che misura conversioni totali &mdash; che includono il rumore
            di tutti gli step &mdash; invece di isolare lo step che conta.
          </p>

          <p className="ab-p">
            <Link href="/blog/roas-non-e-un-kpi" className="ab-internal-link">
              ↗ Sul tema della gerarchia dei dati: ROAS non &egrave; un KPI
            </Link>
          </p>
        </div>

        {/* ════ SEZIONE 3 — VARIABILI ════ */}
        <div className="ab-col">
          <h2 id="variabili" className="ab-h2">Le variabili che <em>nessuno conta</em></h2>

          <p className="ab-p">
            Supponiamo che tu abbia segmentato il funnel e identificato il problema.
            Decidi di testare una nuova scheda prodotto contro quella attuale.
            Due settimane dopo, la variante B ha il 22% di conversioni in pi&ugrave;.
            Prima di dichiarare il vincitore, considera quante cose sono cambiate
            nel frattempo senza che tu le abbia registrate.
          </p>
        </div>

        {/* VISUAL 2 — VARIABILI CONFONDENTI */}
        <div className="ab-col-wide">
          <div className="ab-vars-label">Variabili confondenti in un test A/B tipico</div>
          <div className="ab-vars-grid">
            {[
              { icon: "📅", name: "Stagionalità", desc: "Il comportamento d'acquisto cambia mese su mese. Un test tra marzo e aprile può riflettere la primavera, non la variante.", impact: "high" },
              { icon: "💳", name: "Ciclo stipendi", desc: "La settimana del 25–10 del mese sposta significativamente il comportamento d'acquisto su molte categorie.", impact: "high" },
              { icon: "📢", name: "Azioni competitor", desc: "Un competitor che lancia una promozione durante il test può spostare traffico qualificato — o toglierlo.", impact: "high" },
              { icon: "👥", name: "Dimensione campione", desc: "Con pochi utenti, differenze anche del 30% possono essere puro rumore statistico. Senza volume, nessun risultato è affidabile.", impact: "high" },
              { icon: "⚙️", name: "Algoritmo piattaforma", desc: "Meta e Google aggiornano gli algoritmi continuamente. Un cambio mid-test modifica la qualità del traffico indipendentemente dalla variante.", impact: "med" },
              { icon: "🌡️", name: "Meteo e periodo", desc: "Prodotti fisici, abbigliamento, outdoor: il meteo influenza domanda e engagement in modo misurabile.", impact: "med" },
              { icon: "📱", name: "Mix device / browser", desc: "Se la distribuzione mobile/desktop cambia durante il test (es. nuova campagna più mobile), cambia il comportamento d'acquisto.", impact: "med" },
              { icon: "🏷️", name: "Promozioni attive", desc: "Un codice sconto inviato via email durante il test aumenta le conversioni di entrambe le varianti — ma non in modo uniforme.", impact: "med" },
            ].map((v) => (
              <div key={v.name} className={`ab-var-card${v.impact === "high" ? " ab-var-card--high" : ""}`}>
                <div className="ab-var-icon">{v.icon}</div>
                <div className="ab-var-name">{v.name}</div>
                <div className="ab-var-desc">{v.desc}</div>
                <span className={`ab-var-impact ab-impact-${v.impact}`}>
                  {v.impact === "high" ? "Impatto alto" : "Impatto medio"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-col ab-section">
          <p className="ab-p">
            La cosa paradossale &egrave; che questo non significa che i test siano inutili.
            Significa che un test condotto senza controllare queste variabili{" "}
            <strong>non ha risposto alla domanda che pensi abbia risposto.</strong>{" "}
            Ha misurato qualcosa &mdash; ma non sai bene cosa.
          </p>

          <div className="ab-callout ab-callout--warn">
            <p>
              <strong>Il caso più comune:</strong> un test che gira tra il 25 del mese e il 10
              del mese successivo. Sette giorni con stipendi appena arrivati, sette giorni con
              wallet scarchi. Se le due varianti non vengono bilanciate temporalmente,
              stai misurando il ciclo degli stipendi &mdash; non la variante.
            </p>
          </div>
        </div>

        {/* ════ SEZIONE 4 — SIGNIFICANZA ════ */}
        <div className="ab-col">
          <h2 id="significanza" className="ab-h2">
            Significanza statistica: <em>il concetto che manca</em>
          </h2>

          <p className="ab-p">
            Quando uno strumento di A/B testing dice &ldquo;95% di confidenza&rdquo;, significa che
            c&rsquo;&egrave; solo un 5% di probabilit&agrave; che il risultato osservato sia dovuto al caso &mdash;
            supponendo che tutte le altre variabili siano costanti. Non &egrave; un voto
            di qualit&agrave; del test. &Egrave; un limite inferiore di affidabilit&agrave;.
          </p>

          <p className="ab-p">
            Il problema pratico: per raggiungere quel 95% con un effetto piccolo
            (es. +10% di conversioni), servono molti pi&ugrave; utenti di quanti la maggior
            parte delle PMI italiane riceva in un mese intero.
          </p>
        </div>

        {/* VISUAL 3 — CONFIDENCE + SAMPLE SIZE */}
        <div className="ab-col-wide">
          <div className="ab-conf-label">Livello di confidenza statistica &mdash; dove stai operando?</div>

          <div className="ab-conf-meter-wrap">
            <div className="ab-conf-meter">
              <div className="ab-conf-track">
                <div className="ab-conf-zone ab-conf-zone--red">
                  <span className="ab-conf-zone-label">Rumore statistico</span>
                </div>
                <div className="ab-conf-zone ab-conf-zone--yellow">
                  <span className="ab-conf-zone-label">Incerto</span>
                </div>
                <div className="ab-conf-zone ab-conf-zone--green">
                  <span className="ab-conf-zone-label">Sì</span>
                </div>
              </div>
              <div className="ab-conf-marker" />
            </div>
          </div>

          <div className="ab-conf-axis">
            <span className="ab-conf-axis-label">0% &mdash; casuale</span>
            <span className="ab-conf-axis-label">70%</span>
            <span className="ab-conf-axis-label">90%</span>
            <span className="ab-conf-axis-label">95%+ &mdash; soglia</span>
          </div>

          <p style={{ fontSize: "12px", color: "var(--text-dim)", lineHeight: "1.75", marginBottom: "20px" }}>
            La soglia del 95% &egrave; la convenzione accettata nel testing digitale.
            Sotto quella soglia, il risultato pu&ograve; essere reale &mdash; ma potresti stare
            misurando rumore. La maggior parte dei test dichiarati &ldquo;vincitori&rdquo; nelle PMI
            non la raggiunge mai: non ci sono abbastanza utenti.
          </p>

          <table className="ab-sample-table">
            <thead>
              <tr>
                <th>CR base</th>
                <th>Miglioramento target</th>
                <th>Utenti / variante</th>
                <th>Totale utenti</th>
                <th>PMI italiane</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1%</td>
                <td>+50% (→ 1,5%)</td>
                <td>~6.500</td>
                <td>~13.000</td>
                <td><span className="ab-sv ab-sv--green">Fattibile</span></td>
              </tr>
              <tr>
                <td>2%</td>
                <td>+20% (→ 2,4%)</td>
                <td>~20.000</td>
                <td>~40.000</td>
                <td><span className="ab-sv ab-sv--yellow">Difficile</span></td>
              </tr>
              <tr>
                <td>3%</td>
                <td>+15% (→ 3,45%)</td>
                <td>~23.000</td>
                <td>~46.000</td>
                <td><span className="ab-sv ab-sv--red">Mesi di dati</span></td>
              </tr>
              <tr>
                <td>5%</td>
                <td>+10% (→ 5,5%)</td>
                <td>~30.000</td>
                <td>~60.000</td>
                <td><span className="ab-sv ab-sv--red">Non realistico</span></td>
              </tr>
              <tr>
                <td>10%</td>
                <td>+10% (→ 11%)</td>
                <td>~33.000</td>
                <td>~66.000</td>
                <td><span className="ab-sv ab-sv--red">Non realistico</span></td>
              </tr>
            </tbody>
          </table>

          <p style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "10px", lineHeight: "1.6" }}>
            Calcolato con 95% confidenza, 80% potenza statistica (standard ricerca). Metodo: Evan Miller &mdash;{" "}
            <a href="https://www.evanmiller.org/ab-testing/sample-size.html" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)", textDecoration: "underline" }}>
              evanmiller.org
            </a>
          </p>
        </div>

        <div className="ab-col ab-section">
          <p className="ab-p">
            Un e-commerce italiano con 300 ordini al mese e un tasso di conversione del 2%
            ha circa 15.000 sessioni mensili. Per testare un miglioramento del 20% con
            significanza statistica, servono 40.000 utenti &mdash; quasi tre mesi di traffico,
            in condizioni perfettamente stabili.{" "}
            <strong>In tre mesi cambiano molte cose.</strong>
          </p>
          <p className="ab-p">
            La soluzione non &egrave; smettere di testare. &Egrave; testare cose pi&ugrave; grandi &mdash;
            variazioni che producono effetti visibili anche con campioni piccoli &mdash;
            e calibrare le aspettative sui test di micro-ottimizzazione.
          </p>
        </div>

        {/* VISUAL 4 — TIMELINE */}
        <div className="ab-col-wide">
          <div className="ab-timeline-wrap">
            <div className="ab-tl-header">
              <span className="ab-tl-header-label">Scenario test reale &mdash; 4 settimane</span>
              <span className="ab-tl-header-sub">cosa succede mentre il test gira</span>
            </div>
            <div className="ab-tl-body">

              {/* Week labels */}
              <div className="ab-tl-weeks">
                <div />
                {["Sett. 1", "Sett. 2", "Sett. 3", "Sett. 4"].map(w => (
                  <div key={w} className="ab-tl-week-label">{w}</div>
                ))}
              </div>

              {/* Events row */}
              <div className="ab-tl-row">
                <div className="ab-tl-row-label">Esterni</div>
                <div className="ab-tl-event">💳 Inizio mese<br />stipendi arrivano</div>
                <div className="ab-tl-event ab-tl-event--high">📢 Competitor<br />lancia promo &minus;20%</div>
                <div className="ab-tl-event">⚙️ Meta algo<br />update</div>
                <div className="ab-tl-event">📅 Fine mese<br />wallet scarchi</div>
              </div>

              {/* Variant A */}
              <div className="ab-tl-row" style={{ minHeight: "auto", margin: "6px 0" }}>
                <div className="ab-tl-row-label">Var. A</div>
                <div className="ab-tl-bar ab-tl-bar--a" style={{ gridColumn: "2 / -1" }}>
                  <span className="ab-tl-bar-text">Originale &mdash; in esecuzione continua</span>
                </div>
              </div>

              {/* Variant B */}
              <div className="ab-tl-row" style={{ minHeight: "auto", margin: "6px 0" }}>
                <div className="ab-tl-row-label">Var. B</div>
                <div className="ab-tl-bar ab-tl-bar--b" style={{ gridColumn: "2 / -1" }}>
                  <span className="ab-tl-bar-text">Nuova scheda prodotto &mdash; in test</span>
                </div>
              </div>

              {/* Result */}
              <div className="ab-tl-result">
                <div className="ab-tl-result-text">
                  Risultato dichiarato: <strong>Variante B +22% conversioni</strong>.
                  Confidenza raggiunta: 78%.
                </div>
                <div className="ab-tl-result-badge">Risultato non affidabile</div>
              </div>

            </div>
          </div>
        </div>

        <div className="ab-col ab-section">
          <p className="ab-p">
            In questo scenario la settimana 2 ha probabilmente frenato entrambe le varianti
            a causa del competitor in promozione. La settimana 3 ha alterato la qualit&agrave; del
            traffico paid. Le settimane 1 e 4 hanno distribuzioni d&rsquo;acquisto molto diverse
            per il ciclo stipendi. La confidenza &egrave; al 78% &mdash; sotto la soglia accettabile.
            Hai dichiarato un vincitore su dati non puliti e non sufficienti.
          </p>
        </div>

        {/* LEAD MAGNET */}
        <div className="ab-col-wide">
          <div className="ab-lead-magnet">
            <div className="ab-lm-eyebrow">Strumento gratuito</div>
            <div className="ab-lm-title">Il tuo marketing sta misurando le cose giuste?</div>
            <div className="ab-lm-desc">
              10 domande per capire se stai costruendo decisioni su dati solidi o su rumore.
              Ricevi un profilo della tua situazione attuale con i punti critici
              da correggere prima del prossimo test.
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/#contatti" className="ab-lm-cta">
                Fai l&rsquo;Audit Score gratuito
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="ab-lm-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                3 minuti &middot; Gratuito &middot; Nessun impegno
              </span>
            </div>
          </div>
        </div>

        {/* ════ SEZIONE 5 — 4 SÌ ════ */}
        <div className="ab-col">
          <h2 id="quando-fidarsi" className="ab-h2">
            Quando puoi fidarti di un test: <em>i 4 s&igrave;</em>
          </h2>

          <p className="ab-p">
            Prima di dichiarare un vincitore, fai questa verifica. Se una sola risposta
            &egrave; &ldquo;no&rdquo;, il risultato del test &egrave; indicativo al massimo &mdash;
            non &egrave; una decisione da implementare con certezza.
          </p>
        </div>

        <div className="ab-col-wide">
          <div className="ab-4si-wrap">
            <div className="ab-4si-label">Checklist validit&agrave; test A/B</div>

            {[
              {
                n: "01",
                title: "Campione statisticamente sufficiente",
                desc: "Hai raggiunto il numero di utenti per variante necessario per il tuo CR base e l'effetto minimo che vuoi rilevare? Vedi la tabella sopra per i numeri reali.",
                badge: "Verifica prima",
              },
              {
                n: "02",
                title: "Durata minima di 2 settimane complete",
                desc: "Il test è girato per almeno 14 giorni interi, includendo almeno due weekend completi? I weekend hanno pattern di acquisto diversi dai giorni feriali.",
                badge: "Verifica durata",
              },
              {
                n: "03",
                title: "Nessun evento esterno rilevante nel periodo",
                desc: "Nel periodo non ci sono stati: promozioni via email, campagne extra, update dell'algoritmo ad, azioni significative di competitor, festività o picchi stagionali.",
                badge: "Verifica contesto",
              },
              {
                n: "04",
                title: "Una sola variabile modificata per volta",
                desc: "Stai testando una sola cosa — headline, immagine, CTA, layout — non più variazioni contemporaneamente. Ogni variabile aggiuntiva rende impossibile attribuire il risultato.",
                badge: "Verifica isolamento",
              },
            ].map((item) => (
              <div key={item.n} className="ab-4si-item ab-4si-item--yes">
                <div className="ab-4si-num">{item.n}</div>
                <div>
                  <div className="ab-4si-title">{item.title}</div>
                  <div className="ab-4si-desc">{item.desc}</div>
                </div>
                <span className="ab-4si-badge">{item.badge}</span>
              </div>
            ))}

            <div className="ab-4si-fail">
              <p>
                <strong>Se uno o più di questi è &ldquo;no&rdquo;:</strong>{" "}
                il risultato è un segnale da investigare, non una decisione da implementare.
                Documentalo, tienilo come ipotesi, pianifica un test più pulito.
              </p>
            </div>
          </div>
        </div>

        <div className="ab-col ab-section">
          <p className="ab-p">
            Nella pratica quotidiana, soddisfare tutti e quattro i criteri &egrave; difficile
            per la maggior parte delle PMI. Non &egrave; un motivo per non fare test &mdash;
            &egrave; un motivo per avere aspettative calibrate e per non prendere decisioni
            irreversibili basate su un singolo test.
          </p>
        </div>

        {/* ════ SEZIONE 6 — METODO ════ */}
        <div className="ab-col">
          <h2 id="metodo" className="ab-h2">
            Il metodo minimo <em>per testare bene</em>
          </h2>

          <p className="ab-p">
            Detto tutto questo, i test A/B restano lo strumento pi&ugrave; potente per migliorare
            in modo misurabile. L&rsquo;alternativa &mdash; non testare e decidere solo per intuizione &mdash;
            &egrave; peggio. Ma c&rsquo;&egrave; un metodo che rende i test pi&ugrave; utili anche con volumi bassi.
          </p>
        </div>

        <div className="ab-col-wide">
          <div className="ab-method-list">
            {[
              {
                n: "1",
                title: "Testa cose grandi prima di cose piccole",
                desc: "Con volumi bassi, testa variazioni che producono effetti del 30–50% o più. Una redesign completa della scheda prodotto, un cambio di offerta, un reframe totale del messaggio. Le micro-ottimizzazioni (colore del bottone, font) richiedono campioni enormi per produrre segnali puliti.",
              },
              {
                n: "2",
                title: "Segmenta prima, poi testa",
                desc: "Identifica lo step del funnel con il drop più alto — poi concentra il test su quel punto specifico. Testare la conversione totale è rumoroso. Testare lo step problematico è preciso. Risparmia mesi di raccolta dati.",
              },
              {
                n: "3",
                title: "Documenta tutto quello che cambia",
                desc: "Ogni test ha un log: data inizio, data fine, variante A, variante B, eventi esterni rilevati nel periodo, note contestuali. Senza questo, non puoi interpretare i risultati in contesto. Un foglio condiviso è sufficiente.",
              },
              {
                n: "4",
                title: "Usa i test come bussola, non come verdetto",
                desc: "Un risultato positivo non validato statisticamente è un segnale — non una prova. Dice \"vai in questa direzione e approfondisci\", non \"implementa e scala\". Accumula segnali coerenti su più test prima di fare scelte irreversibili di budget o struttura.",
              },
            ].map((item) => (
              <div key={item.n} className="ab-method-item">
                <div className="ab-method-num">{item.n}</div>
                <div>
                  <div className="ab-method-title">{item.title}</div>
                  <div className="ab-method-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-col">
          <div className="ab-callout">
            <p>
              <strong>Il paradosso del testing:</strong> più è difficile fare un test pulito,
              più è importante farlo. Il costo di una decisione sbagliata &mdash; implementata
              con sicurezza su dati non affidabili &mdash; è molto più alto del costo di un test
              condotto con metodo, anche se richiede più tempo.
            </p>
          </div>
        </div>

        <div className="ab-col" style={{ marginBottom: "48px" }}>
          <div className="ab-divider" />
        </div>

        {/* ════ FAQ ════ */}
        <div className="ab-col">
          <h2 className="ab-h2" style={{ marginBottom: "24px" }}>Domande frequenti</h2>
          <div className="ab-faq-wrap">
            {[
              {
                q: "Quanti utenti servono per un test A/B valido?",
                a: "Dipende dal tasso di conversione attuale e dall'effetto minimo che vuoi rilevare. Con un CR del 2% e un obiettivo di miglioramento del 20%, servono circa 20.000 utenti per variante — 40.000 in totale. La maggior parte delle PMI non raggiunge questi volumi in meno di 4-8 settimane.",
              },
              {
                q: "Quanto deve durare un test A/B?",
                a: "Almeno 2 settimane complete, inclusi due weekend. Questo elimina i bias da giorno della settimana. Se il volume di traffico è basso, considera 3-4 settimane. Evita di fermare un test appena vedi un risultato positivo: è quasi sempre rumore statistico.",
              },
              {
                q: "Cos'è la significanza statistica e perché conta?",
                a: "La significanza statistica (tipicamente al 95%) indica che c'è solo un 5% di probabilità che il risultato osservato sia dovuto al caso. Senza raggiungerla, non puoi distinguere un miglioramento reale dal rumore. La maggior parte degli strumenti di A/B test mostra il dato, ma pochi lo spiegano in modo comprensibile.",
              },
              {
                q: "Posso fare A/B test con poco traffico?",
                a: "Puoi fare test, ma devi abbassare le aspettative. Con poco traffico, rileva solo effetti grandi (>30-40% di miglioramento). Effetti piccoli richiedono campioni enormi. Concentra i test sulle pagine con più traffico — homepage e checkout ricevono più visite di qualsiasi altra pagina.",
              },
              {
                q: "Stagionalità e test A/B: come gestirle?",
                a: "La stagionalità invalida un test quando il comportamento degli utenti cambia significativamente durante il periodo. La soluzione: documenta sempre quando inizi e finisci un test, evita i periodi di picco (Black Friday, Natale, saldi) e fai girare i test su finestre di 7 giorni multipli.",
              },
            ].map((faq) => (
              <details key={faq.q} className="ab-faq-item">
                <summary>
                  {faq.q}
                  <svg className="ab-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="ab-faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* ════ CONCLUSIONE ════ */}
        <div className="ab-col">
          <div className="ab-conclusion">
            <div className="ab-conclusion-label">In sintesi</div>
            <div className="ab-conclusion-title">
              Testa sempre. Ma sappi cosa stai misurando davvero.
            </div>
            <div className="ab-conclusion-points">
              {[
                "I dati aggregati nascondono i problemi reali. Segmenta ogni step del funnel prima di decidere dove intervenire.",
                "Le variabili confondenti — stagionalità, competitor, ciclo stipendi, aggiornamenti algoritmo — influenzano ogni test. Documentarle è l'unico modo per interpretarle.",
                "La significanza statistica al 95% richiede campioni molto più grandi di quelli che la maggior parte delle PMI raccoglie in 2 settimane.",
                "Testa variazioni grandi con poco traffico, micro-ottimizzazioni solo con volumi adeguati.",
                "I 4 sì (campione, durata, nessun evento esterno, variabile isolata) sono la soglia minima per fidarsi di un risultato.",
                "Un test con risultato non significativo non è un test fallito — dice che l'effetto è troppo piccolo per essere rilevato con quel volume. È informazione.",
              ].map((pt, i) => (
                <div key={i} className="ab-conclusion-point">{pt}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ SIGNATURE ════ */}
        <div className="ab-col">
          <div className="ab-signature">
            <div className="ab-sig-avatar">N</div>
            <div>
              <div className="ab-sig-name">Nicola Serrao</div>
              <div className="ab-sig-role">
                Digital Business Advisor &mdash; Strategia, KPI, Direzione operativa
              </div>
            </div>
            <Link href="/#contatti" className="ab-sig-link">
              Lavoriamo insieme &rarr;
            </Link>
          </div>
        </div>

        {/* ════ TAGS ════ */}
        <div className="ab-col">
          <div className="ab-tags">
            <span className="ab-tags-label">Tag:</span>
            {["Analytics", "A/B Test", "Dati", "Significanza statistica", "Funnel", "KPI", "Misurazione"].map(tag => (
              <span key={tag} className="ab-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* ════ REFERENCES ════ */}
        <div className="ab-col">
          <div className="ab-references">
            <div className="ab-ref-label">Fonti e riferimenti</div>
            <ul className="ab-ref-list">
              <li className="ab-ref-item">
                <span className="ab-ref-num">[1]</span>
                <span>
                  Evan Miller, <em>How Not To Run an A/B Test</em> (2010) e <em>Sample Size Calculator</em>:
                  metodologia standard per il calcolo della dimensione campione con significanza statistica al 95%.{" "}
                  <a href="https://www.evanmiller.org/ab-testing/sample-size.html" target="_blank" rel="noopener noreferrer">
                    evanmiller.org
                  </a>
                </span>
              </li>
              <li className="ab-ref-item">
                <span className="ab-ref-num">[2]</span>
                <span>
                  Ronny Kohavi, Alex Deng et al., <em>Online Controlled Experiments at Large Scale</em>,
                  KDD 2013: ricerca di Microsoft su variabili confondenti e dimensione campione
                  nei test A/B in produzione.
                </span>
              </li>
              <li className="ab-ref-item">
                <span className="ab-ref-num">[3]</span>
                <span>
                  CXL Institute, <em>A/B Testing Guide</em>: analisi degli errori più comuni nei test
                  condotti da team di marketing senza background statistico.{" "}
                  <a href="https://cxl.com/blog/ab-testing-guide/" target="_blank" rel="noopener noreferrer">
                    cxl.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}