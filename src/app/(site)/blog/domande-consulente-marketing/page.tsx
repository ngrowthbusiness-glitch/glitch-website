import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "16 domande da fare al tuo consulente marketing | Nicola Serrao",
  description:
    "16 domande concrete divise per area per valutare un consulente marketing prima di firmare. Con la spiegazione del perch\u00e9 ogni risposta rivela qualcosa.",
  openGraph: {
    title: "16 domande da fare al tuo consulente marketing | Nicola Serrao",
    description:
      "16 domande concrete divise per area per valutare un consulente marketing prima di firmare qualsiasi accordo.",
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
  headline: "16 domande da fare al tuo consulente marketing",
  description:
    "16 domande concrete divise per area per valutare un consulente marketing prima di firmare qualsiasi accordo.",
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
  datePublished: "2026-04-22",
  url: "https://nicolaserrao.com/blog/domande-consulente-marketing",
};

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function DomandeConsulentArticlePage() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <style>{`

        /* ══════════════════════════════════════════
           LAYOUT
        ══════════════════════════════════════════ */

        .art-page {
          max-width: 1100px;
        }

        .art-col {
          max-width: 680px;
          margin: 0 auto;
        }

        .art-col-wide {
          max-width: 880px;
          margin: 0 auto;
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
           QUESTION CARDS
        ══════════════════════════════════════════ */

        .art-q-group {
          margin-bottom: 56px;
        }

        .art-q-group-header {
          margin-bottom: 20px;
        }

        .art-q-group-cat {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 6px;
        }

        .art-q-group-intro {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .art-q-item {
          border: 1px solid rgba(232,245,242,0.07);
          border-radius: 6px;
          padding: 20px 24px;
          margin-bottom: 10px;
          background: rgba(232,245,242,0.02);
        }

        .art-q-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .art-q-why {
          font-size: 11px;
          color: var(--text-dim);
          line-height: 1.7;
          padding-left: 12px;
          border-left: 2px solid rgba(0,255,252,0.2);
        }

        .art-q-why-label {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 4px;
        }

        .art-q-redflag .art-q-item {
          border-color: rgba(255,100,100,0.12);
          background: rgba(255,80,80,0.03);
        }

        .art-q-redflag .art-q-why {
          border-left-color: rgba(255,100,100,0.3);
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
          content: '\u2192';
          color: var(--teal);
          flex-shrink: 0;
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          margin-top: 1px;
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

        .art-lm-cta-wa {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--teal);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 28px;
          border-radius: 5px;
          border: 1px solid var(--teal-border);
          text-decoration: none;
          transition: opacity 0.2s, background 0.2s;
          position: relative;
        }

        .art-lm-cta-wa:hover {
          opacity: 0.85;
          background: rgba(0,255,252,0.04);
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
           RESPONSIVE
        ══════════════════════════════════════════ */

        @media (max-width: 768px) {
          .art-lead-magnet { padding: 28px 24px; }
          .art-q-item { padding: 16px 18px; }
        }

        @media (max-width: 480px) {
          .art-sig-link { display: none; }
        }

      `}</style>

      <div className="s-page art-page">

        {/* ════════════════════════════════════════
            BREADCRUMB
        ════════════════════════════════════════ */}
        <div className="art-col">
          <nav className="art-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="art-breadcrumb-sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="art-breadcrumb-sep">/</span>
            <span>16 domande consulente marketing</span>
          </nav>
        </div>

        {/* ════════════════════════════════════════
            HEADER
        ════════════════════════════════════════ */}
        <div className="art-col">
          <div className="art-eyebrow">Strategia</div>

          <h1 className="art-h1">
            16 domande da fare al tuo<br />
            consulente marketing<br />
            <em>prima di firmare.</em>
          </h1>

          <p className="art-subtitle">
            Non serve metterlo alla prova. Serve capire cosa aspettarti
            &mdash; e queste domande ti dicono pi&ugrave; di qualsiasi presentazione.
          </p>

          <div className="art-author-bar">
            <span className="art-author-name">Nicola Serrao</span>
            <span className="art-meta-dot" />
            <span className="art-author-role">Digital Business Advisor</span>
            <span className="art-meta-dot" />
            <span className="art-meta-item">10 min lettura</span>
            <span className="art-meta-dot" />
            <span className="art-meta-item">22 Aprile 2026</span>
            <span className="art-meta-tag">Strategia</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            TABLE OF CONTENTS
        ════════════════════════════════════════ */}
        <div className="art-col">
          <nav className="art-toc" aria-label="Indice">
            <div className="art-toc-label">In questo articolo</div>
            <ol>
              <li><a href="#perche-queste-domande">Perch&eacute; queste domande contano</a></li>
              <li><a href="#prima-del-contratto">Prima del contratto</a></li>
              <li><a href="#metodo-di-lavoro">Metodo di lavoro</a></li>
              <li><a href="#struttura-responsabilita">Struttura e responsabilit&agrave;</a></li>
              <li><a href="#segnali-allarme">Segnali d&rsquo;allarme (red flag)</a></li>
              <li><a href="#conclusione">Il consulente giusto non ha paura di queste domande</a></li>
            </ol>
          </nav>
        </div>

        {/* ════════════════════════════════════════
            INTRO
        ════════════════════════════════════════ */}
        <div className="art-col">
          <p className="art-lead" id="perche-queste-domande">
            Stai per investire migliaia di euro in una consulenza marketing.
            Il consulente ha fatto un&rsquo;ottima presentazione, ha mostrato casi studio,
            ha detto le cose giuste. Ma <strong>le cose giuste dette bene non sono la stessa
            cosa delle cose giuste fatte bene.</strong>
          </p>
          <p className="art-p">
            Queste 16 domande non servono a &ldquo;testare&rdquo; il consulente. Servono a te,
            come imprenditore, per capire cosa stai comprando prima di firmarlo.
            Sono divise in 4 aree: cosa chiedere prima del contratto, come capire il suo
            metodo reale, chi risponde quando le cose non funzionano, e i segnali
            che dovrebbero farti fermare prima di iniziare.
          </p>
          <p className="art-p">
            Per ogni domanda c&rsquo;&egrave; la spiegazione di cosa rivela la risposta &mdash;
            cos&igrave; sai esattamente cosa cercare.
          </p>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 1 — PRIMA DEL CONTRATTO
        ════════════════════════════════════════ */}
        <div className="art-col art-section">
          <div className="art-q-group" id="prima-del-contratto">
            <h2 className="art-h2">Prima del contratto</h2>
            <div className="art-q-group-header">
              <div className="art-q-group-intro">Le domande da fare prima di firmare qualsiasi accordo.</div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">1. Quante settimane prevede per la fase di analisi prima di proporre una strategia?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Un consulente serio impiega 2-4 settimane solo per capire la situazione. Se risponde &ldquo;iniziamo subito&rdquo;, stai ricevendo una strategia template.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">2. Chieder&agrave; accesso ai miei analytics esistenti prima di presentare qualsiasi piano?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Senza guardare i dati storici, qualsiasi strategia proposta si basa sulle sue ipotesi, non sulla tua realt&agrave;.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">3. Pu&ograve; mostrarmi risultati concreti &mdash; numeri, non solo testimonial &mdash; di progetti simili?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                I numeri contano. Un CPA migliorato del X%, un CPL ridotto di Y&euro;. Se non ha dati, ha solo storie.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">4. Cosa succede se i risultati non arrivano entro i tempi previsti?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                La risposta rivela quanto il consulente si sente responsabile dei risultati &mdash; non solo delle attivit&agrave; svolte.
              </div>
            </div>
          </div>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 2 — METODO DI LAVORO
        ════════════════════════════════════════ */}
        <div className="art-col art-section">
          <div className="art-q-group" id="metodo-di-lavoro">
            <h2 className="art-h2">Metodo di lavoro</h2>
            <div className="art-q-group-header">
              <div className="art-q-group-intro">Come lavora davvero, non come lo descrive nella presentazione.</div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">5. Come viene condotta la fase di analisi dati? Quali strumenti usa e cosa cerca per prima cosa?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                La risposta deve essere specifica: funnel per step, CPA per canale, drop-off, LTV. Se &egrave; vaga, il metodo non c&rsquo;&egrave;.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">6. Intervister&agrave; anche il team interno &mdash; commerciale, operativo, customer care &mdash; oltre a me?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Le informazioni pi&ugrave; utili sul cliente reale non stanno nell&rsquo;imprenditore. Stanno nelle persone che parlano con i clienti ogni giorno.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">7. Con quale frequenza e in quale formato ricever&ograve; aggiornamenti sulle performance?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Report mensili con dati di piattaforma non bastano. Deve essere chiaro cosa viene misurato, ogni quanto, e come viene presentato.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">8. Chi decide quali KPI usiamo per misurare il successo &mdash; e quando vengono stabiliti?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                I KPI devono essere decisi all&rsquo;inizio, non scelti a posteriori in base a cosa &egrave; andato bene.
              </div>
            </div>
          </div>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 3 — STRUTTURA E RESPONSABILITA
        ════════════════════════════════════════ */}
        <div className="art-col art-section">
          <div className="art-q-group" id="struttura-responsabilita">
            <h2 className="art-h2">Struttura e responsabilit&agrave;</h2>
            <div className="art-q-group-header">
              <div className="art-q-group-intro">Chi lavora davvero sul tuo progetto &mdash; e chi risponde quando qualcosa non funziona.</div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">9. Chi lavora concretamente sul mio progetto? Il consulente con cui parlo o un team junior?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Spesso il senior vende, il junior esegue. Non &egrave; necessariamente un problema &mdash; ma devi saperlo prima.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">10. Se le campagne non performano, come viene gestita la revisione della strategia?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                La risposta dice tutto sulla cultura di accountability. &ldquo;Ottimizziamo&rdquo; &egrave; diverso da &ldquo;ri-analizziamo le premesse&rdquo;.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">11. Qual &egrave; il processo decisionale per modificare il budget o fermare una campagna che non funziona?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Deve esserci un processo chiaro. Budget bruciato senza trigger di stop &egrave; un problema di governance, non di creativit&agrave;.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">12. Come distingue tra risultati non raggiunti per colpa della strategia e risultati non raggiunti per fattori esterni?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Un consulente maturo sa distinguere cosa dipende da lui e cosa no. E sa documentarlo.
              </div>
            </div>
          </div>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            SEZIONE 4 — SEGNALI D'ALLARME
        ════════════════════════════════════════ */}
        <div className="art-col art-section">
          <div className="art-q-group art-q-redflag" id="segnali-allarme">
            <h2 className="art-h2">Segnali d&rsquo;allarme <em>(red flag)</em></h2>
            <div className="art-q-group-header">
              <div className="art-q-group-intro">Le risposte che devono farti alzare la mano.</div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">13. Garantisce risultati specifici &mdash; un ROAS minimo, un numero di lead garantiti?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Nessun consulente onesto garantisce risultati in advertising. Il marketing opera su variabili che nessuno controlla completamente.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">14. Propone una strategia completa gi&agrave; al secondo incontro, senza aver visto i tuoi dati?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Impossibile fare una strategia fondata in meno di 2-3 settimane di analisi. Se arriva subito, &egrave; un template con il tuo nome.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">15. Non ha mai chiesto accesso agli analytics o agli account pubblicitari esistenti?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Lavorare senza guardare i dati storici significa iniziare da zero ogni volta. &Egrave; inefficiente e costoso.
              </div>
            </div>

            <div className="art-q-item">
              <div className="art-q-text">16. Parla solo di metriche di piattaforma (ROAS, CPM, CTR) e mai di KPI di business?</div>
              <div className="art-q-why">
                <div className="art-q-why-label">Perch&eacute; chiederlo</div>
                Le metriche di piattaforma misurano azioni, non risultati. Se il consulente non distingue, c&rsquo;&egrave; un problema di comprensione del business.
              </div>
            </div>
          </div>
        </div>

        <div className="art-col">
          <div className="art-divider" />
        </div>

        {/* ════════════════════════════════════════
            CONCLUSIONE
        ════════════════════════════════════════ */}
        <div className="art-col" id="conclusione">
          <div className="art-conclusion">
            <div className="art-conclusion-label">In sintesi</div>
            <div className="art-conclusion-title">
              Il consulente giusto non ha paura di queste domande.
            </div>
            <div className="art-conclusion-points">
              <div className="art-conclusion-point">
                Un professionista serio accoglie queste domande come segnale di un cliente consapevole &mdash; non come un interrogatorio.
              </div>
              <div className="art-conclusion-point">
                Le risposte vaghe o evasive sono gi&agrave; una risposta. Se non sa spiegarti il suo metodo, probabilmente non ne ha uno.
              </div>
              <div className="art-conclusion-point">
                Non esiste il consulente perfetto. Esiste quello che sa dirti cosa non sa fare, quanto tempo gli serve, e come misurerete il successo insieme.
              </div>
              <div className="art-conclusion-point">
                Porta queste domande al prossimo incontro. Non devi farle tutte &mdash; ma sapere cosa cercare nelle risposte cambia tutto.
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CTA
        ════════════════════════════════════════ */}
        <div className="art-col-wide">
          <div className="art-lead-magnet">
            <div className="art-lm-eyebrow">Prossimo passo</div>
            <div className="art-lm-title">
              Vuoi capire cosa pu&ograve; fare un consulente per il tuo business?
            </div>
            <div className="art-lm-desc">
              Scopri come lavoro, quali problemi risolvo e se ha senso parlarne.
              Nessun impegno &mdash; solo una conversazione onesta sui numeri.
            </div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <Link href="/cosa-posso-fare" className="art-lm-cta">
                Cosa posso fare per te
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/393516737345"
                target="_blank"
                rel="noopener noreferrer"
                className="art-lm-cta-wa"
              >
                Scrivimi su WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
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
            {["Consulenza", "Strategia", "Metodo", "Due diligence", "Marketing"].map(tag => (
              <span key={tag} className="art-tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
