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
    badge: "AI-Powered",
    title: "Diagnosi Marketing",
    subtitle: "Quanto è solido il tuo sistema di misurazione?",
    description:
      "10 domande sul tuo setup analytics, tracking e reporting. L'AI analizza i gap e ti dà 3 priorità concrete.",
    deliverables: [
      "Score 0–10 con profilo del tuo livello attuale",
      "Analisi AI personalizzata dei tuoi gap",
      "3 priorità concrete su cui intervenire subito",
    ],
    time: "5 min",
    cta: "Fai il quiz",
    href: "/risorse/audit-score",
  },
  {
    slug: "kpi-calculator",
    badge: "AI-Powered",
    title: "KPI Calculator",
    subtitle: "I tuoi numeri dicono la verità?",
    description:
      "Inserisci budget, fatturato e margine. L'AI calcola break-even ROAS, CPA max e 3 scenari di crescita.",
    deliverables: [
      "Break-even ROAS e CPA massimo sostenibile",
      "3 scenari: attuale, ottimizzato, scalato",
      "Analisi AI su dove stai perdendo margine",
    ],
    time: "3 min",
    cta: "Calcola ora",
    href: "/risorse/kpi-calculator",
  },
  {
    slug: "fractional-cmo",
    badge: "AI-Powered",
    title: "Fractional CMO Check",
    subtitle: "Ti serve davvero un Fractional CMO?",
    description:
      "Self-assessment in 3 step. L'AI analizza fase, team e obiettivi e ti dice quale figura ti serve — e perché.",
    deliverables: [
      "Profilo personalizzato (Fractional CMO, Consulente spot, Agenzia)",
      "Diagnosi della tua situazione specifica",
      "Radar chart su 5 dimensioni del tuo business",
    ],
    time: "5 min",
    cta: "Scopri il tuo profilo",
    href: "/risorse/fractional-cmo",
  },
];

export default function RisorsePage() {
  return (
    <>
      <style>{`
        .risorse-header {
          max-width: 680px;
          margin: 0 auto 64px;
        }

        .risorse-desc {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.85;
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

        .risorse-badge-ai {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 3px 9px;
          border-radius: 3px;
          background: var(--teal-dim);
        }

        .risorse-badge-ai svg {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
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

        @media (max-width: 900px) {
          .risorse-card { padding: 24px 20px; }
          .risorse-note { padding: 16px; }
        }

        @media (max-width: 480px) {
          .risorse-card { padding: 20px 16px; }
        }
      `}</style>

      <div className="s-page">

        {/* HEADER */}
        <div className="risorse-header">
          <div className="s-eyebrow">Strumenti gratuiti</div>
          <h1 className="s-h2">
            Utile anche se<br /><em>non lavoriamo insieme.</em>
          </h1>
          <p className="risorse-desc">
            Strumenti pratici per chi fa marketing con i numeri. Niente lead magnet vuoti &mdash;
            ogni risorsa è qualcosa che uso o ho usato direttamente con i clienti.
          </p>
        </div>

        <div className="s-divider" style={{ marginBottom: 48 }} />

        {/* RESOURCE CARDS */}
        <div className="risorse-grid">
          {resources.map((r) => (
            <Link key={r.slug} href={r.href} className="risorse-card">
              <div className="risorse-card-top">
                <span className="risorse-badge-ai">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {r.badge}
                </span>
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
            Tutte le risorse sono alimentate da AI (Anthropic Claude) e forniscono risposte personalizzate in tempo reale.
            Hai bisogno di qualcosa di pi&ugrave; specifico?{" "}
            <Link href="/#contatto">Scrivimi</Link>.
          </p>
        </div>

      </div>
    </>
  );
}
