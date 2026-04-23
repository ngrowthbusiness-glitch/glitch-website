import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Strategia, KPI e Digital Marketing",
  description:
    "Articoli su strategia digitale, KPI reali, advertising e come far crescere un business senza sprecare budget. Niente teorie generiche — solo metodo e numeri.",
};

const posts = [
  {
    slug: "prime-settimane-consulente-marketing",
    date: "17 Aprile 2026",
    category: "Metodo & Consulenza",
    title: "Prima della strategia, si mappa. Cosa fa davvero un buon consulente marketing nelle prime settimane.",
    excerpt:
      "Audit dei dati, intervista interna, benchmark di mercato: le tre macro aree che un buon consulente copre prima di toccare il budget. Niente slide, niente proposte — prima si capisce.",
    readTime: "7 min",
    tags: ["Consulenza", "Metodo", "Analytics"],
  },
  {
    slug: "test-ab-significanza-statistica",
    date: "17 Aprile 2026",
    category: "Analytics & KPI",
    title: "Il tuo test A/B ha mostrato +18%. Probabilmente non significa niente.",
    excerpt:
      "Stagionalità, ciclo stipendi, azioni dei competitor: le variabili che falsano quasi ogni test. Quanti utenti servono davvero per un risultato affidabile — e come testare bene con volumi bassi.",
    readTime: "9 min",
    tags: ["A/B Test", "Dati", "Significanza statistica"],
  },
  {
    slug: "roas-non-e-un-kpi",
    date: "17 Aprile 2026",
    category: "Analytics & KPI",
    title: "Il ROAS non è un KPI. Ecco cosa guardare invece.",
    excerpt:
      "Il ROAS misura un'azione, non un risultato di business. Scopri come calcolare il tuo break-even ROAS reale e quali KPI guardare davvero per valutare le tue campagne.",
    readTime: "8 min",
    tags: ["Analytics", "ROAS", "E-commerce"],
  },
  {
    slug: "domande-consulente-marketing",
    date: "22 Aprile 2026",
    category: "Strategia",
    title: "16 domande da fare al tuo consulente marketing prima di firmare.",
    excerpt:
      "16 domande concrete divise per area — prima del contratto, metodo di lavoro, struttura e responsabilità, e i segnali di allarme da riconoscere subito. Con la spiegazione del perché ogni risposta rivela qualcosa.",
    readTime: "10 min",
    tags: ["Consulenza", "Strategia", "Metodo"],
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <style>{`
        .blog-header {
          max-width: 680px;
          margin: 0 auto 64px;
        }

        .blog-desc {
          font-size: 13px;
          color: var(--text-dim);
          line-height: 1.85;
        }

        .blog-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .blog-card {
          border: 1px solid rgba(232,245,242,0.08);
          border-radius: 8px;
          padding: 28px 32px;
          background: rgba(232,245,242,0.02);
          text-decoration: none;
          display: block;
          transition: border-color 0.2s, background 0.2s;
        }

        .blog-card:hover {
          border-color: var(--teal-border);
          background: var(--teal-dim);
        }

        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .blog-card-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-faint);
        }

        .blog-card-date {
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.5px;
        }

        .blog-card-read {
          font-size: 10px;
          color: var(--text-dim);
        }

        .blog-card-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .blog-card-excerpt {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .blog-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .blog-card-tag {
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-faint);
          border: 1px solid rgba(232,245,242,0.06);
          padding: 2px 8px;
          border-radius: 2px;
        }

        .blog-card-arrow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          margin-top: 16px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .blog-card:hover .blog-card-arrow {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .blog-card { padding: 24px; }
        }

        @media (max-width: 480px) {
          .blog-card { padding: 20px; }
        }
      `}</style>

      <div className="s-page">
        <div className="blog-header">
          <div className="s-eyebrow">Insights &amp; Metodo</div>
          <h1 className="s-h2">
            Numeri reali.<br /><em>Zero vanity metrics.</em>
          </h1>
          <p className="blog-desc">
            Articoli su strategia digitale, KPI e come far crescere un business senza sprecare budget.
            Niente teorie generiche &mdash; solo meccanismi concreti e numeri che puoi usare.
          </p>
        </div>

        <div className="s-divider" style={{ marginBottom: 48 }} />

        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              <div className="blog-card-meta">
                <span className="s-badge">{post.category}</span>
                <span className="blog-card-dot" />
                <span className="blog-card-date">{post.date}</span>
                <span className="blog-card-dot" />
                <span className="blog-card-read">{post.readTime} lettura</span>
              </div>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-excerpt">{post.excerpt}</div>
              <div className="blog-card-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-card-tag">{tag}</span>
                ))}
              </div>
              <div className="blog-card-arrow">
                Leggi l&rsquo;articolo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
