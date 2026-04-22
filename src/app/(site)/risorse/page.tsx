import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Risorse gratuite — Strumenti per chi fa marketing con i numeri",
  description:
    "Strumenti gratuiti per imprenditori e marketing manager: quiz di autovalutazione, guide pratiche e checklist. Niente teoria — solo strumenti concreti da usare subito.",
};

const resources = [
  {
    slug: "audit-score",
    badge: "Quiz interattivo",
    badgeColor: "teal",
    title: "Diagnosi marketing in 10 domande",
    subtitle: "Quanto è solido il tuo sistema di misurazione?",
    description:
      "10 domande secche sul tuo setup analytics, tracking, attribuzione e reporting. Alla fine sai esattamente dove stai perdendo soldi senza accorgertene.",
    deliverables: [
      "Score 0–10 con valutazione del tuo livello attuale",
      "Analisi gap: cosa manca nel tuo sistema di misurazione",
      "3 priorità concrete su cui intervenire subito",
    ],
    time: "5 min",
    cta: "Fai il quiz",
    href: "/risorse/audit-score",
  },
  {
    slug: "domande-consulente",
    badge: "Guida pratica",
    badgeColor: "teal",
    title: "Le domande da fare prima di assumere un consulente",
    subtitle: "Come separare chi sa fare da chi sa vendere.",
    description:
      "Una lista strutturata di domande — divisa per fase del rapporto — per valutare un consulente marketing prima di firmare qualsiasi accordo. Con la spiegazione del perché ogni risposta rivela qualcosa.",
    deliverables: [
      "Domande pre-contratto: cosa chiedere prima di iniziare",
      "Domande sul metodo: come lavora davvero, non come lo descrive",
      "Domande sui risultati: come valutare performance e accountability",
    ],
    time: "10 min lettura",
    cta: "Leggi la guida",
    href: "/risorse/domande-consulente",
  },
];

export default function RisorsePage() {
  return (
    <>
      <style>{`
        .risorse-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 60px 120px;
        }

        .risorse-header {
          max-width: 680px;
          margin: 0 auto 64px;
        }

        .risorse-eyebrow {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
        }

        .risorse-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .risorse-title em {
          font-style: italic;
          color: var(--teal);
        }

        .risorse-desc {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.85;
        }

        .risorse-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin-bottom: 48px;
        }

        .risorse-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .risorse-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          padding: 32px 36px;
          background: rgba(232,245,242,0.02);
          text-decoration: none;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }

        .risorse-card:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
        }

        .risorse-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .risorse-badge {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 3px 8px;
          border-radius: 3px;
          background: var(--teal-dim);
        }

        .risorse-free {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(34,197,94,0.8);
          border: 1px solid rgba(34,197,94,0.2);
          padding: 3px 8px;
          border-radius: 3px;
          background: rgba(34,197,94,0.06);
        }

        .risorse-card-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-faint);
        }

        .risorse-card-time {
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.5px;
        }

        .risorse-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .risorse-card-subtitle {
          font-size: 12px;
          color: var(--teal);
          margin-bottom: 14px;
          letter-spacing: 0.3px;
        }

        .risorse-card-description {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .risorse-deliverables {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
          padding: 16px 18px;
          border-left: 2px solid var(--teal-border);
          background: rgba(0,255,252,0.02);
          border-radius: 0 6px 6px 0;
        }

        .risorse-deliverable {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 11.5px;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .risorse-deliverable-icon {
          color: var(--teal);
          flex-shrink: 0;
          margin-top: 2px;
          opacity: 0.7;
        }

        .risorse-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal);
          transition: gap 0.2s;
        }

        .risorse-card:hover .risorse-card-cta {
          gap: 12px;
        }

        .risorse-coming-soon {
          border: 1px dashed rgba(232,245,242,0.08);
          border-radius: 8px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0.5;
          max-width: 800px;
          margin: 0 auto;
        }

        .risorse-cs-icon {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: rgba(232,245,242,0.04);
          border: 1px solid rgba(232,245,242,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .risorse-cs-title {
          font-size: 13px;
          color: var(--text-dim);
          margin-bottom: 4px;
        }

        .risorse-cs-badge {
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-faint);
          border: 1px solid rgba(232,245,242,0.06);
          padding: 2px 7px;
          border-radius: 3px;
        }

        .risorse-note {
          max-width: 800px;
          margin: 48px auto 0;
          padding: 20px 24px;
          border: 1px solid rgba(232,245,242,0.06);
          border-radius: 8px;
          background: rgba(232,245,242,0.01);
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .risorse-note-icon {
          color: var(--teal);
          flex-shrink: 0;
          opacity: 0.6;
          margin-top: 1px;
        }

        .risorse-note-text {
          font-size: 11.5px;
          color: var(--text-dim);
          line-height: 1.75;
        }

        .risorse-note-text a {
          color: var(--teal);
          text-decoration: none;
          border-bottom: 1px solid var(--teal-border);
          transition: border-color 0.2s;
        }

        .risorse-note-text a:hover {
          border-color: var(--teal);
        }

        @media (max-width: 768px) {
          .risorse-page { padding: 40px 24px 80px; }
          .risorse-card { padding: 24px 20px; }
          .risorse-coming-soon { padding: 20px; }
          .risorse-note { padding: 16px; }
        }

        @media (max-width: 480px) {
          .risorse-page { padding: 32px 16px 64px; }
        }
      `}</style>

      <div className="risorse-page">

        {/* HEADER */}
        <div className="risorse-header">
          <div className="risorse-eyebrow">Strumenti gratuiti</div>
          <h1 className="risorse-title">
            Utile anche se<br /><em>non lavoriamo insieme.</em>
          </h1>
          <p className="risorse-desc">
            Strumenti pratici per chi fa marketing con i numeri. Niente lead magnet vuoti &mdash;
            ogni risorsa è qualcosa che uso o ho usato direttamente con i clienti.
          </p>
        </div>

        <div className="risorse-divider" />

        {/* RESOURCE CARDS */}
        <div className="risorse-grid">
          {resources.map((r) => (
            <Link key={r.slug} href={r.href} className="risorse-card">
              <div className="risorse-card-top">
                <span className="risorse-badge">{r.badge}</span>
                <span className="risorse-free">Gratis</span>
                <span className="risorse-card-dot" />
                <span className="risorse-card-time">{r.time}</span>
              </div>

              <div className="risorse-card-title">{r.title}</div>
              <div className="risorse-card-subtitle">{r.subtitle}</div>
              <div className="risorse-card-description">{r.description}</div>

              <div className="risorse-deliverables">
                {r.deliverables.map((d, i) => (
                  <div key={i} className="risorse-deliverable">
                    <svg
                      className="risorse-deliverable-icon"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {d}
                  </div>
                ))}
              </div>

              <div className="risorse-card-cta">
                {r.cta}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}

          {/* COMING SOON */}
          <div className="risorse-coming-soon">
            <div className="risorse-cs-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-faint)" }}>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>
            <div>
              <div className="risorse-cs-title">Checklist E-commerce — dalla scheda prodotto al checkout</div>
              <span className="risorse-cs-badge">In arrivo</span>
            </div>
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="risorse-note">
          <svg
            className="risorse-note-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="risorse-note-text">
            Hai bisogno di qualcosa di più specifico?{" "}
            <Link href="/#contatto">Scrivimi</Link> — se è un problema che ho già risolto
            per qualcun altro, probabilmente ho qualcosa di pronto.
          </p>
        </div>

      </div>
    </>
  );
}
