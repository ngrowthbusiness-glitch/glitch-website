import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Le prime settimane di un consulente marketing — Prima della strategia, si mappa",
  description:
    "Audit dei dati, intervista interna, benchmark di mercato: le tre macro aree che un buon consulente copre prima di toccare il budget. Niente slide, niente proposte — prima si capisce.",
  openGraph: {
    title: "Le prime settimane di un consulente marketing — Prima della strategia, si mappa",
    description:
      "Cosa fa davvero un buon consulente marketing nelle prime settimane. Prima di qualsiasi strategia, mappa tre cose precise.",
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
    "Le prime settimane di un consulente marketing — Prima della strategia, si mappa",
  description:
    "Audit dei dati, intervista interna, benchmark di mercato: le tre macro aree che un buon consulente copre prima di toccare il budget.",
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
  url: "https://nicolaserrao.com/blog/prime-settimane-consulente-marketing",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quanto durano le prime settimane di un consulente marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dalla dimensione del progetto e dalla disponibilità dei dati. In media, la fase di mapping — audit analytics, intervista interna, benchmark — richiede 2-4 settimane. Per progetti più complessi con più canali e team, può arrivare a 6. Saltare questa fase per 'partire subito' è la causa numero uno di strategie che non funzionano.",
      },
    },
    {
      "@type": "Question",
      name: "Un consulente marketing che non chiede dati prima di proporre una strategia è un segnale di allarme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Qualsiasi strategia proposta senza aver prima analizzato i dati esistenti, capito gli obiettivi reali dell'imprenditore e mappato il contesto competitivo è una strategia costruita sulle ipotesi del consulente — non sulla tua realtà. Può funzionare per caso, ma non è metodo.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa produce concretamente la fase di mapping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non una strategia — almeno non ancora. Produce una fotografia condivisa: dove sei ora, cosa funziona e cosa no, quali sono i vincoli reali, dove sono i competitor. Solo da questa base è possibile costruire una strategia che abbia senso per la tua azienda specifica, non per un'azienda generica del tuo settore.",
      },
    },
    {
      "@type": "Question",
      name: "Quali dati analytics guarda per primo un buon consulente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nell'ordine: fonti di traffico e loro trend nel tempo, funnel di conversione per step (non solo il totale), costo per acquisizione per canale, lifetime value dei clienti esistenti, pagine con maggior drop-off. Non tutti i dati hanno lo stesso peso: spesso una singola metrica racconta più di un report completo.",
      },
    },
    {
      "@type": "Question",
      name: "Perché un consulente deve intervistare il team interno, non solo l'imprenditore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'imprenditore ha la visione, ma il team ha la realtà operativa. Chi risponde alle email dei clienti sa quali obiezioni tornano sempre. Chi gestisce le spedizioni sa dove si rompono le aspettative. Queste informazioni non esistono nei dati analytics — esistono nelle persone. Ignorarle significa costruire una strategia su metà delle informazioni.",
      },
    },
  ],
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ArticleConsulentePage() {
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
        /* ── LAYOUT ── */
        .mk-article-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 60px 120px;
        }
        .mk-col      { max-width: 680px; margin: 0 auto; }
        .mk-col-wide { max-width: 880px; margin: 0 auto; }

        /* ── BREADCRUMB ── */
        .mk-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 48px;
        }
        .mk-breadcrumb a { color: var(--teal); text-decoration: none; transition: opacity .2s; }
        .mk-breadcrumb a:hover { opacity: .7; }
        .mk-breadcrumb-sep { color: var(--text-faint); }

        /* ── HEADER ── */
        .mk-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
        }
        .mk-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(28px, 4.5vw, 52px);
          font-weight: 700; color: var(--text);
          line-height: 1.12; margin-bottom: 28px;
        }
        .mk-title em { font-style: italic; color: var(--teal); }
        .mk-meta {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          font-size: 10px; color: var(--text-dim); margin-bottom: 40px;
        }
        .mk-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--text-faint); }
        .mk-intro {
          font-size: 14px; color: var(--text-dim); line-height: 1.95;
          border-left: 2px solid var(--teal-border); padding-left: 20px;
          margin-bottom: 64px;
        }
        .mk-intro strong { color: var(--text); font-weight: 600; }

        /* ── DIVIDER ── */
        .mk-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 56px 0;
        }

        /* ── BODY TEXT ── */
        .mk-body { font-size: 13px; color: var(--text-dim); line-height: 1.95; margin-bottom: 32px; }
        .mk-body strong { color: var(--text); font-weight: 600; }
        .mk-body em { font-style: italic; color: var(--teal); }
        .mk-h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 2.8vw, 28px); font-weight: 700;
          color: var(--text); margin-bottom: 20px; line-height: 1.25;
        }
        .mk-h2 em { font-style: italic; color: var(--teal); }
        .mk-h3 {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 16px;
        }
        .mk-section { margin-bottom: 72px; }

        /* ═══════════════════════════════════════
           VISUAL 1 — CONFRONTO CONSULENTE
        ═══════════════════════════════════════ */
        .mk-compare-wrap {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
          margin: 40px 0;
        }
        .mk-compare-card {
          border-radius: 8px; padding: 28px;
          border: 1px solid rgba(232,245,242,0.08);
        }
        .mk-compare-card.mk-bad {
          background: rgba(255,80,80,0.04);
          border-color: rgba(255,80,80,0.15);
        }
        .mk-compare-card.mk-good {
          background: var(--teal-dim);
          border-color: var(--teal-border);
        }
        .mk-compare-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 18px; font-weight: 600;
        }
        .mk-compare-card.mk-bad .mk-compare-label { color: rgba(255,100,100,0.8); }
        .mk-compare-card.mk-good .mk-compare-label { color: var(--teal); }
        .mk-compare-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--text);
          margin-bottom: 16px; line-height: 1.3;
        }
        .mk-compare-list { list-style: none; padding: 0; margin: 0; }
        .mk-compare-list li {
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
          padding: 6px 0 6px 18px; position: relative;
          border-bottom: 1px solid rgba(232,245,242,0.05);
        }
        .mk-compare-list li:last-child { border-bottom: none; }
        .mk-compare-list li::before {
          content: ''; position: absolute; left: 0; top: 14px;
          width: 8px; height: 8px; border-radius: 50%;
        }
        .mk-bad .mk-compare-list li::before { background: rgba(255,100,100,0.5); }
        .mk-good .mk-compare-list li::before { background: var(--teal); }

        /* ═══════════════════════════════════════
           VISUAL 2 — MACRO AREE GRID
        ═══════════════════════════════════════ */
        .mk-areas-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          margin: 40px 0;
        }
        .mk-area-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px; padding: 28px 24px;
          background: rgba(232,245,242,0.02);
          position: relative; overflow: hidden;
        }
        .mk-area-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--teal);
          opacity: 0.6;
        }
        .mk-area-number {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 32px; font-weight: 700; color: var(--teal);
          opacity: 0.25; line-height: 1; margin-bottom: 16px;
        }
        .mk-area-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 16px; font-weight: 700; color: var(--text);
          margin-bottom: 12px; line-height: 1.3;
        }
        .mk-area-desc {
          font-size: 11px; color: var(--text-dim); line-height: 1.75;
          margin-bottom: 18px;
        }
        .mk-area-items { list-style: none; padding: 0; margin: 0; }
        .mk-area-items li {
          font-size: 11px; color: var(--text-dim); padding: 4px 0 4px 14px;
          position: relative; border-top: 1px solid rgba(232,245,242,0.05);
        }
        .mk-area-items li:first-child { border-top: none; }
        .mk-area-items li::before {
          content: '→'; position: absolute; left: 0;
          color: var(--teal); font-size: 10px; top: 5px;
        }

        /* ═══════════════════════════════════════
           VISUAL 3 — DOMANDE INTERVISTA INTERNA
        ═══════════════════════════════════════ */
        .mk-questions-wrap {
          border: 1px solid var(--teal-border);
          border-radius: 8px; overflow: hidden;
          background: var(--teal-dim); margin: 40px 0;
        }
        .mk-questions-header {
          padding: 20px 28px;
          border-bottom: 1px solid var(--teal-border);
          display: flex; align-items: center; gap: 12px;
        }
        .mk-questions-header-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(0,255,252,0.1); border: 1px solid var(--teal-border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .mk-questions-header-title {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); font-weight: 600;
        }
        .mk-questions-header-sub {
          font-size: 11px; color: var(--text-dim); margin-left: auto;
        }
        .mk-q-group { padding: 20px 28px; border-bottom: 1px solid rgba(232,245,242,0.06); }
        .mk-q-group:last-child { border-bottom: none; }
        .mk-q-category {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-faint); margin-bottom: 12px;
        }
        .mk-q-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .mk-q-list li {
          font-size: 12px; color: var(--text-dim); line-height: 1.6;
          padding: 10px 14px;
          background: rgba(232,245,242,0.03);
          border-radius: 4px;
          border-left: 2px solid rgba(0,255,252,0.2);
        }
        .mk-q-list li strong { color: var(--text); font-weight: 600; }

        /* ═══════════════════════════════════════
           VISUAL 4 — OUTPUT DEL MAPPING
        ═══════════════════════════════════════ */
        .mk-output-wrap {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px; overflow: hidden; margin: 40px 0;
        }
        .mk-output-header {
          padding: 18px 28px; background: rgba(232,245,242,0.04);
          border-bottom: 1px solid rgba(232,245,242,0.08);
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--text-dim);
        }
        .mk-output-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
        }
        .mk-output-item {
          padding: 22px 28px;
          border-bottom: 1px solid rgba(232,245,242,0.06);
          border-right: 1px solid rgba(232,245,242,0.06);
        }
        .mk-output-item:nth-child(even) { border-right: none; }
        .mk-output-item:nth-last-child(-n+2) { border-bottom: none; }
        .mk-output-check {
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 6px;
          display: flex; align-items: center; gap: 6px;
        }
        .mk-output-check::before {
          content: '✓'; font-size: 11px;
        }
        .mk-output-label {
          font-size: 13px; font-weight: 600; color: var(--text);
          margin-bottom: 6px;
        }
        .mk-output-desc {
          font-size: 11px; color: var(--text-dim); line-height: 1.7;
        }
        .mk-output-footer {
          padding: 18px 28px;
          background: rgba(0,255,252,0.04);
          border-top: 1px solid var(--teal-border);
          font-size: 12px; color: var(--text-dim); line-height: 1.7;
        }
        .mk-output-footer strong { color: var(--teal); }

        /* ── NUMBERED LIST ── */
        .mk-numbered { list-style: none; padding: 0; margin: 0 0 32px; counter-reset: mk-counter; }
        .mk-numbered li {
          counter-increment: mk-counter;
          display: flex; gap: 16px; align-items: flex-start;
          padding: 16px 0; border-bottom: 1px solid rgba(232,245,242,0.06);
          font-size: 13px; color: var(--text-dim); line-height: 1.75;
        }
        .mk-numbered li:last-child { border-bottom: none; }
        .mk-numbered li::before {
          content: counter(mk-counter, decimal-leading-zero);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px; color: var(--teal); flex-shrink: 0;
          padding-top: 3px; min-width: 24px;
        }
        .mk-numbered li strong { color: var(--text); font-weight: 600; }

        /* ── LEAD MAGNET ── */
        .mk-cta-block {
          border: 1px solid var(--teal-border);
          border-radius: 8px; padding: 36px 40px;
          background: var(--teal-dim); margin: 64px 0;
          display: flex; align-items: flex-start; gap: 32px;
        }
        .mk-cta-body { flex: 1; }
        .mk-cta-tag {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 12px;
        }
        .mk-cta-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text);
          margin-bottom: 12px; line-height: 1.3;
        }
        .mk-cta-text { font-size: 12px; color: var(--text-dim); line-height: 1.8; }
        .mk-cta-action { flex-shrink: 0; padding-top: 8px; }
        .mk-cta-btn {
          display: inline-block;
          padding: 12px 24px;
          border: 1px solid var(--teal);
          border-radius: 4px; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); text-decoration: none;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .mk-cta-btn:hover { background: var(--teal); color: var(--bg); }

        /* ── FAQ ── */
        .mk-faq-wrap { margin: 0 0 56px; }
        .mk-faq-item {
          border-bottom: 1px solid rgba(232,245,242,0.08);
          padding: 24px 0;
        }
        .mk-faq-item:first-child { border-top: 1px solid rgba(232,245,242,0.08); }
        .mk-faq-q {
          font-size: 13px; font-weight: 600; color: var(--text);
          margin-bottom: 12px; line-height: 1.4;
        }
        .mk-faq-a { font-size: 12px; color: var(--text-dim); line-height: 1.85; }

        /* ── SIGNATURE ── */
        .mk-signature {
          display: flex; align-items: center; gap: 16px;
          padding: 28px 0; border-top: 1px solid rgba(232,245,242,0.08);
          margin-bottom: 32px;
        }
        .mk-sig-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid var(--teal-border); flex-shrink: 0;
          background: var(--teal-dim); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: var(--teal);
        }
        .mk-sig-name { font-size: 12px; font-weight: 600; color: var(--text); }
        .mk-sig-role { font-size: 11px; color: var(--text-dim); }

        /* ── TAGS ── */
        .mk-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
        .mk-tag {
          font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          color: var(--text-faint); border: 1px solid rgba(232,245,242,0.08);
          padding: 4px 10px; border-radius: 3px;
        }

        /* ── REFERENCES ── */
        .mk-references { padding-top: 24px; border-top: 1px solid rgba(232,245,242,0.06); }
        .mk-ref-title {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--text-faint); margin-bottom: 12px;
        }
        .mk-ref-list { list-style: none; padding: 0; margin: 0; }
        .mk-ref-list li { font-size: 11px; color: var(--text-faint); line-height: 1.7; padding: 3px 0; }
        .mk-ref-list a { color: var(--text-faint); text-decoration: underline; text-underline-offset: 3px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .mk-areas-grid { grid-template-columns: 1fr; }
          .mk-compare-wrap { grid-template-columns: 1fr; }
          .mk-output-grid { grid-template-columns: 1fr; }
          .mk-output-item { border-right: none; }
          .mk-output-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(232,245,242,0.06); }
          .mk-output-item:last-child { border-bottom: none; }
          .mk-cta-block { flex-direction: column; gap: 20px; }
        }
        @media (max-width: 768px) {
          .mk-article-wrap { padding: 100px 24px 80px; }
          .mk-questions-header { flex-wrap: wrap; gap: 6px; }
          .mk-questions-header-sub { margin-left: 0; }
        }
        @media (max-width: 480px) {
          .mk-article-wrap { padding: 90px 16px 64px; }
          .mk-area-card { padding: 20px; }
          .mk-q-group { padding: 16px 20px; }
          .mk-cta-block { padding: 24px 20px; }
        }
      `}</style>

      <div className="mk-article-wrap">

        {/* BREADCRUMB */}
        <nav className="mk-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="mk-breadcrumb-sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="mk-breadcrumb-sep">/</span>
          <span>Prime settimane consulente marketing</span>
        </nav>

        {/* HEADER */}
        <div className="mk-col">
          <div className="mk-eyebrow">Metodo &amp; Consulenza</div>
          <h1 className="mk-title">
            Prima della strategia,<br />
            <em>si mappa.</em>
          </h1>
          <div className="mk-meta">
            <span>Nicola Serrao</span>
            <span className="mk-meta-dot" />
            <span>17 Aprile 2026</span>
            <span className="mk-meta-dot" />
            <span>7 min lettura</span>
            <span className="mk-meta-dot" />
            <span style={{ color: "var(--teal)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase" }}>Metodo &amp; Consulenza</span>
          </div>
          <p className="mk-intro">
            Il consulente che arriva con le slide pronte al primo incontro ti sta vendendo
            la sua strategia ideale, non la tua. <strong>Prima di proporre qualsiasi cosa,
            un buon consulente marketing copre tre aree precise</strong> — audit dei dati,
            intervista interna, benchmark di mercato. Non è burocrazia: è la differenza tra
            una strategia costruita sulla tua realtà e una costruita sull&apos;intuizione di
            qualcun altro.
          </p>
        </div>

        {/* SECTION 1 — IL PROBLEMA */}
        <div className="mk-section mk-col">
          <h2 className="mk-h2">
            Due tipi di <em>primo mese</em>
          </h2>
          <p className="mk-body">
            Esiste un pattern ricorrente in quasi ogni progetto di consulenza marketing.
            Il consulente ha ascoltato il brief, ha capito il settore, ha avuto un&apos;idea
            di quello che va fatto. A quel punto può fare due cose: <strong>proporre subito
            o mappare prima</strong>.
          </p>
          <p className="mk-body">
            Il primo approccio sembra più efficiente. Prima si parte, prima si vedono i
            risultati. In realtà è il modo più rapido per costruire attività su premesse
            sbagliate — e scoprirlo solo dopo tre mesi di budget bruciato.
          </p>
        </div>

        {/* VISUAL 1 — CONFRONTO */}
        <div className="mk-col-wide">
          <div className="mk-compare-wrap">
            <div className="mk-compare-card mk-bad">
              <div className="mk-compare-label">Consulente che parte subito</div>
              <div className="mk-compare-title">Proposta al secondo incontro.</div>
              <ul className="mk-compare-list">
                <li>Strategia costruita sulle sue esperienze precedenti</li>
                <li>Benchmark basati su settori simili, non sulla tua azienda</li>
                <li>KPI decisi prima di capire cosa misuri già tu</li>
                <li>Ottimizzazioni su campagne che forse andrebbero fermate</li>
                <li>Nessuna conoscenza delle obiezioni reali dei tuoi clienti</li>
              </ul>
            </div>
            <div className="mk-compare-card mk-good">
              <div className="mk-compare-label">Consulente che mappa prima</div>
              <div className="mk-compare-title">Fotografia prima della cura.</div>
              <ul className="mk-compare-list">
                <li>Capisce dove sei prima di dire dove andare</li>
                <li>Identifica cosa funziona già e va protetto</li>
                <li>Scopre i vincoli reali (budget, team, tecnologia)</li>
                <li>Mappa le aspettative vere dell&apos;imprenditore</li>
                <li>Costruisce una base condivisa con il cliente</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mk-divider" />

        {/* SECTION 2 — LE TRE AREE */}
        <div className="mk-section mk-col">
          <h2 className="mk-h2">
            Le tre macro aree <em>del mapping</em>
          </h2>
          <p className="mk-body">
            Non si tratta di un processo rigido, e il peso di ciascuna area cambia in base
            al progetto. Ma in quasi ogni ingresso in un nuovo progetto, queste tre aree
            ricorrono sempre. Saltarne anche solo una significa lavorare con un quadro
            incompleto.
          </p>
        </div>

        {/* VISUAL 2 — MACRO AREE GRID */}
        <div className="mk-col-wide">
          <div className="mk-areas-grid">
            <div className="mk-area-card">
              <div className="mk-area-number">01</div>
              <div className="mk-area-title">Audit dati &amp; analytics</div>
              <div className="mk-area-desc">
                Prima di toccare qualsiasi campagna o canale, si guardano i dati esistenti.
                Non per avere tutto chiaro — ma per capire cosa non torna.
              </div>
              <ul className="mk-area-items">
                <li>Fonti di traffico e trend nel tempo</li>
                <li>Funnel di conversione per step</li>
                <li>Costo per acquisizione per canale</li>
                <li>Pagine con maggior drop-off</li>
                <li>LTV dei clienti esistenti</li>
                <li>Campagne attive e loro performance reale</li>
              </ul>
            </div>
            <div className="mk-area-card">
              <div className="mk-area-number">02</div>
              <div className="mk-area-title">Intervista interna</div>
              <div className="mk-area-desc">
                I dati dicono cosa succede. Le persone dicono perché. L&apos;intervista interna
                è la fonte di informazioni che non esiste in nessun dashboard.
              </div>
              <ul className="mk-area-items">
                <li>Obiettivi reali dell&apos;imprenditore</li>
                <li>Cosa è già stato provato (e fallito)</li>
                <li>Vincoli di budget, team e tecnologia</li>
                <li>Obiezioni tipiche dei clienti</li>
                <li>Cosa differenzia davvero l&apos;azienda</li>
                <li>Aspettative sulla consulenza</li>
              </ul>
            </div>
            <div className="mk-area-card">
              <div className="mk-area-number">03</div>
              <div className="mk-area-title">Benchmark di mercato</div>
              <div className="mk-area-desc">
                Capire il contesto competitivo prima di proporre qualsiasi strategia.
                Non per copiare, ma per sapere dove ci sono spazi liberi.
              </div>
              <ul className="mk-area-items">
                <li>Posizionamento dei competitor principali</li>
                <li>Canali che usano e con che budget stimato</li>
                <li>Messaggi e angoli che dominano il settore</li>
                <li>Cosa nessuno sta dicendo (gap di posizionamento)</li>
                <li>Aspettative di settore su prezzi e offerta</li>
                <li>Trend di ricerca sui temi rilevanti</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mk-divider" />

        {/* SECTION 3 — AREA 1: DATI */}
        <div className="mk-section mk-col">
          <div className="mk-h3">Macro area 01 — Audit dati &amp; analytics</div>
          <h2 className="mk-h2">
            I dati non mentono.<br />
            <em>Ma vanno letti bene.</em>
          </h2>
          <p className="mk-body">
            La prima cosa che faccio entrando in un progetto è chiedere accesso agli
            strumenti di analytics. Non per mostrare che so usare Google Analytics —
            ma perché <strong>i dati esistenti sono la prova di cosa funziona e cosa no
            nella tua realtà specifica</strong>, non in un caso studio generico del settore.
          </p>
          <p className="mk-body">
            Il dato che cerco per primo non è il totale delle visite. È il funnel
            per step: quante persone entrano, dove abbandonano, dove si fermano.
            Quasi sempre, un singolo step con un drop-off anomalo spiega più di
            tre mesi di campagne ottimizzate male. <strong>Trovare quel collo di bottiglia
            vale più di qualsiasi nuova campagna.</strong>
          </p>
          <p className="mk-body">
            Il secondo dato critico è il costo per acquisizione per canale — non aggregato.
            Spesso un&apos;azienda ha un CPA medio accettabile, ma quando lo scomponi per
            canale scopri che un canale è estremamente efficiente e un altro brucia budget
            senza risultati. Senza questa analisi, si ottimizza la media invece di
            rinforzare ciò che funziona.
          </p>
        </div>

        <div className="mk-divider" />

        {/* SECTION 4 — AREA 2: INTERVISTA */}
        <div className="mk-section mk-col">
          <div className="mk-h3">Macro area 02 — Intervista interna</div>
          <h2 className="mk-h2">
            Le domande che <em>nessuno fa.</em>
          </h2>
          <p className="mk-body">
            I dati raccontano i numeri. Le persone raccontano il perché. L&apos;intervista
            interna — all&apos;imprenditore, ma anche al team commerciale e operativo —
            è la fonte di informazioni più sottovalutata in qualsiasi consulenza marketing.
          </p>
          <p className="mk-body">
            Chi risponde alle email dei clienti sa esattamente quali obiezioni tornano
            sempre. Chi gestisce le spedizioni sa dove si rompono le aspettative.
            Chi fa le vendite sa cosa convince davvero. <strong>Nessuna di queste
            informazioni esiste nel CRM o in Google Analytics.</strong> Esiste nelle persone.
          </p>
        </div>

        {/* VISUAL 3 — DOMANDE INTERVISTA */}
        <div className="mk-col-wide">
          <div className="mk-questions-wrap">
            <div className="mk-questions-header">
              <div className="mk-questions-header-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{color:"var(--teal)"}}>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="mk-questions-header-title">Domande dell&apos;intervista interna</div>
              <div className="mk-questions-header-sub" style={{fontSize:"10px", color:"var(--text-faint)"}}>
                Le domande che faccio sempre — e che pochi consulenti chiedono
              </div>
            </div>

            <div className="mk-q-group">
              <div className="mk-q-category">Obiettivi reali</div>
              <ul className="mk-q-list">
                <li><strong>Tra 12 mesi, cosa deve essere cambiato per dire che questo progetto ha funzionato?</strong> — Non in termini di KPI, ma di situazione concreta.</li>
                <li><strong>Quali sono le priorità in ordine?</strong> Più clienti, clienti migliori, o clienti in un segmento specifico?</li>
              </ul>
            </div>

            <div className="mk-q-group">
              <div className="mk-q-category">Storico tentativi</div>
              <ul className="mk-q-list">
                <li><strong>Cos&apos;avete già provato negli ultimi 2 anni in termini di marketing?</strong> Cosa ha funzionato, cosa no, e perché avete smesso?</li>
                <li><strong>C&apos;è stata un&apos;agenzia o un consulente precedente?</strong> Cosa è andato storto?</li>
              </ul>
            </div>

            <div className="mk-q-group">
              <div className="mk-q-category">Vincoli reali</div>
              <ul className="mk-q-list">
                <li><strong>Qual è il budget massimo che potete allocare al marketing senza sentire stress?</strong> Non quello che pensate sia giusto — quello che non vi crea ansia.</li>
                <li><strong>Chi nel team può dedicare tempo a questa collaborazione?</strong> Quante ore alla settimana, realisticamente?</li>
              </ul>
            </div>

            <div className="mk-q-group">
              <div className="mk-q-category">Voce del cliente</div>
              <ul className="mk-q-list">
                <li><strong>Qual è l&apos;obiezione che sentite più spesso prima che un cliente compri?</strong> E quella più comune dopo che ha comprato?</li>
                <li><strong>Se chiedessimo ai vostri migliori 5 clienti perché scelgono voi, cosa direbbero?</strong> L&apos;avete mai chiesto esplicitamente?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mk-divider" />

        {/* SECTION 5 — AREA 3: BENCHMARK */}
        <div className="mk-section mk-col">
          <div className="mk-h3">Macro area 03 — Benchmark di mercato</div>
          <h2 className="mk-h2">
            Non per copiare.<br />
            <em>Per trovare i vuoti.</em>
          </h2>
          <p className="mk-body">
            Il benchmark competitivo non serve per replicare quello che fa chi è davanti
            a te. Serve per capire <strong>quali messaggi saturano già il mercato</strong>
            — e quindi dove c&apos;è spazio per un posizionamento diverso.
          </p>
          <p className="mk-body">
            Se tutti i competitor parlano di &quot;qualità&quot; e &quot;esperienza&quot;, allora quelle
            parole non differenziano più nessuno. Il lavoro non è fare lo stesso meglio:
            è trovare la dimensione su cui il mercato non si sta ancora giocando.
            A volte è il servizio, a volte è il target, a volte è semplicemente
            comunicare in modo più specifico ciò che tutti offrono in modo generico.
          </p>
          <p className="mk-body">
            Il benchmark guarda anche i canali: <strong>quanto stanno investendo i
            competitor, dove, e con quali messaggi</strong>. Non per avere un budget
            comparabile, ma per capire dove c&apos;è meno affollamento e più spazio per
            emergere con budget inferiore.
          </p>
        </div>

        <div className="mk-divider" />

        {/* SECTION 6 — OUTPUT */}
        <div className="mk-section mk-col">
          <div className="mk-h3">Output del mapping</div>
          <h2 className="mk-h2">
            Non una strategia ancora.<br />
            <em>Una fotografia.</em>
          </h2>
          <p className="mk-body">
            Al termine di queste tre aree, non si produce una strategia. Si produce
            una fotografia condivisa — un documento che descrive dove si trova l&apos;azienda
            oggi, cosa funziona e cosa no, quali sono i vincoli reali e dove sono
            le opportunità concrete. <strong>Solo da questo punto ha senso costruire
            una strategia.</strong>
          </p>
        </div>

        {/* VISUAL 4 — OUTPUT */}
        <div className="mk-col-wide">
          <div className="mk-output-wrap">
            <div className="mk-output-header">Output della fase di mapping</div>
            <div className="mk-output-grid">
              <div className="mk-output-item">
                <div className="mk-output-check">Dati</div>
                <div className="mk-output-label">Situazione analytics documentata</div>
                <div className="mk-output-desc">Funnel per step, CPA per canale, pagine critiche, benchmark di traffico nel tempo.</div>
              </div>
              <div className="mk-output-item">
                <div className="mk-output-check">Persone</div>
                <div className="mk-output-label">Obiettivi e vincoli chiariti</div>
                <div className="mk-output-desc">Priorità condivise, budget realistico, risorse disponibili, storico tentativi.</div>
              </div>
              <div className="mk-output-item">
                <div className="mk-output-check">Mercato</div>
                <div className="mk-output-label">Mappa competitiva</div>
                <div className="mk-output-desc">Posizionamento dei competitor, messaggi dominanti, canali usati, gap di comunicazione.</div>
              </div>
              <div className="mk-output-item">
                <div className="mk-output-check">Opportunità</div>
                <div className="mk-output-label">Priorità di intervento</div>
                <div className="mk-output-desc">Le 2-3 aree dove intervenire prima, con un ordine logico basato su impatto e fattibilità.</div>
              </div>
            </div>
            <div className="mk-output-footer">
              <strong>Nota:</strong> Il mapping non è un deliverable fine a sé stesso. È la base da cui nasce una strategia che ha senso per la tua azienda specifica — non per un caso studio di qualcun altro.
            </div>
          </div>
        </div>

        <div className="mk-divider" />

        {/* SECTION 7 — SEGNALI DI ALLARME */}
        <div className="mk-section mk-col">
          <h2 className="mk-h2">
            Quattro segnali che il consulente<br />
            <em>sta saltando il mapping.</em>
          </h2>
          <p className="mk-body">
            Se stai valutando o hai già assunto un consulente marketing,
            questi sono i segnali che qualcosa non va nel metodo:
          </p>
          <ol className="mk-numbered">
            <li>
              <div><strong>Proposta strategica entro la prima settimana.</strong> Impossibile avere una strategia fondata in meno di 2-3 settimane di analisi. Se arriva subito, è una strategia template.</div>
            </li>
            <li>
              <div><strong>Non ti ha mai chiesto accesso agli analytics.</strong> Qualsiasi lavoro fatto senza guardare i dati storici è lavoro costruito sull&apos;intuizione, non sulla tua realtà.</div>
            </li>
            <li>
              <div><strong>Non ha parlato con il team operativo.</strong> Se ha intervistato solo te e non chi lavora ogni giorno a contatto con i clienti, manca metà delle informazioni.</div>
            </li>
            <li>
              <div><strong>Non ti ha chiesto cosa avete già provato.</strong> Riproporre una strategia già fallita in un contesto leggermente diverso è uno degli errori più comuni — e più costosi.</div>
            </li>
          </ol>
        </div>

        {/* LEAD MAGNET */}
        <div className="mk-col">
          <div className="mk-cta-block">
            <div className="mk-cta-body">
              <div className="mk-cta-tag">Risorsa gratuita</div>
              <div className="mk-cta-title">
                Le domande da fare al tuo consulente<br />prima di firmare il contratto.
              </div>
              <div className="mk-cta-text">
                Una lista delle domande concrete da fare per capire se il consulente
                che stai valutando lavora con metodo o a intuito — e cosa aspettarti
                nelle prime settimane di collaborazione.
              </div>
            </div>
            <div className="mk-cta-action">
              <Link href="/risorse/domande-consulente" className="mk-cta-btn">Ricevi la lista</Link>
            </div>
          </div>
        </div>

        <div className="mk-divider" />

        {/* FAQ */}
        <div className="mk-col">
          <div className="mk-h3">Domande frequenti</div>
          <h2 className="mk-h2" style={{marginBottom:"32px"}}>FAQ</h2>
          <div className="mk-faq-wrap">
            {[
              {
                q: "Quanto durano le prime settimane di un consulente marketing?",
                a: "Dipende dalla dimensione del progetto e dalla disponibilità dei dati. In media, la fase di mapping — audit analytics, intervista interna, benchmark — richiede 2-4 settimane. Per progetti più complessi con più canali e team, può arrivare a 6. Saltare questa fase per \"partire subito\" è la causa numero uno di strategie che non funzionano.",
              },
              {
                q: "Un consulente marketing che non chiede dati prima di proporre una strategia è un segnale di allarme?",
                a: "Sì. Qualsiasi strategia proposta senza aver prima analizzato i dati esistenti, capito gli obiettivi reali e mappato il contesto competitivo è costruita sulle ipotesi del consulente — non sulla tua realtà. Può funzionare per caso, ma non è metodo.",
              },
              {
                q: "Cosa produce concretamente la fase di mapping?",
                a: "Non una strategia — almeno non ancora. Produce una fotografia condivisa: dove sei ora, cosa funziona e cosa no, quali sono i vincoli reali, dove sono i competitor. Solo da questa base è possibile costruire una strategia che abbia senso per la tua azienda specifica.",
              },
              {
                q: "Perché intervistare il team interno e non solo l'imprenditore?",
                a: "L'imprenditore ha la visione, ma il team ha la realtà operativa. Chi risponde alle email dei clienti sa quali obiezioni tornano sempre. Chi gestisce le spedizioni sa dove si rompono le aspettative. Queste informazioni non esistono nei dati analytics — esistono nelle persone.",
              },
              {
                q: "Il benchmark competitivo serve davvero? Non basta conoscere il proprio settore?",
                a: "Conoscere il settore non è la stessa cosa di analizzare sistematicamente cosa comunicano i competitor in questo momento su ogni canale. Il benchmark trova i messaggi saturi — quelli che usano tutti e che quindi non differenziano più nessuno — e i gap che nessuno sta coprendo.",
              },
            ].map((item, i) => (
              <div key={i} className="mk-faq-item">
                <div className="mk-faq-q">{item.q}</div>
                <div className="mk-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mk-divider" />

        {/* CONCLUSION */}
        <div className="mk-col">
          <h2 className="mk-h2">In sintesi</h2>
          <p className="mk-body">
            Un buon consulente marketing nelle prime settimane non produce campagne,
            non lancia A/B test, non cambia il sito. Mappa. Guarda i dati esistenti,
            fa le domande difficili alle persone giuste, capisce dove si trova il
            mercato. <strong>Solo dopo questa fase ha senso parlare di strategia.</strong>
          </p>
          <p className="mk-body">
            Il paradosso è che questa fase rallenta l&apos;inizio — ma accelera i risultati.
            Perché ogni azione che viene dopo è costruita su una base reale, non su
            ipotesi. E ogni euro di budget va dove c&apos;è una ragione concreta per farlo
            funzionare.
          </p>
          <p className="mk-body">
            Se il consulente che hai assunto non ti ha fatto ancora nessuna di queste
            domande, <Link href="/blog/test-ab-significanza-statistica" style={{color:"var(--teal)", textDecoration:"underline", textUnderlineOffset:"3px"}}>
            probabilmente sta già ottimizzando senza sapere cosa ottimizzare</Link>.
          </p>
        </div>

        {/* SIGNATURE */}
        <div className="mk-col">
          <div className="mk-signature">
            <div className="mk-sig-avatar">N</div>
            <div>
              <div className="mk-sig-name">Nicola Serrao</div>
              <div className="mk-sig-role">Consulente marketing digitale — GLITCH</div>
            </div>
          </div>

          <div className="mk-tags">
            {["Consulenza", "Metodo", "Marketing", "Strategia", "Analytics"].map(t => (
              <span key={t} className="mk-tag">{t}</span>
            ))}
          </div>

          <div className="mk-references">
            <div className="mk-ref-title">Letture correlate</div>
            <ul className="mk-ref-list">
              <li>Ritson, M. (2023). &ldquo;The briefing problem in marketing consultancy.&rdquo; — Marketing Week</li>
              <li>Binet, L. &amp; Field, P. (2013). <em>The Long and Short of It</em>. IPA.</li>
              <li>Sharp, B. (2010). <em>How Brands Grow</em>. Oxford University Press.</li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}
