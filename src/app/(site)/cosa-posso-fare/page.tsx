import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ContactCTAButton from "@/components/layout/ContactCTAButton";

export const metadata: Metadata = {
  title: "Perché conoscerci – Nicola Serrao",
  description:
    "Prima ti ascolto, poi capiamo insieme cosa ti serve davvero. Strategia, digital marketing, e-commerce, CRO e lead generation.",
  openGraph: {
    title: "Perché conoscerci – Nicola Serrao",
    description:
      "Prima ti ascolto, poi capiamo insieme cosa ti serve davvero. Strategia, digital marketing, e-commerce, CRO e lead generation.",
    url: `${SITE.url}/cosa-posso-fare`,
  },
};

export default function CosaPossoFarePage() {
  return (
    <>
      <style>{`
        /* ── PAGE ── */
        .cpf-page {
          position: relative;
          z-index: 1;
        }

        /* ── HERO TWO-COL ── */
        .cpf-hero {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 60px;
          align-items: start;
          margin-bottom: 100px;
        }

        .cpf-hero-body {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.9;
          max-width: 560px;
          margin-bottom: 32px;
        }

        .cpf-hero-subtitle {
          font-size: 16px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 24px;
        }

        .cpf-steps-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: var(--text);
          margin-bottom: 16px;
        }

        .cpf-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cpf-steps li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.7;
        }

        .cpf-step-num {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid var(--teal-border);
          background: var(--teal-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--teal);
        }

        /* ── WA CTA BLOCK ── */
        .cpf-wa-block {
          border: 1px solid var(--teal-border);
          border-radius: 12px;
          background: var(--teal-dim);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          position: sticky;
          top: calc(var(--nav-h) + 32px);
        }

        .cpf-wa-icon {
          width: 56px;
          height: 56px;
          color: #25D366;
        }

        .cpf-wa-note {
          font-size: 10px;
          font-weight: 300;
          color: var(--text-faint);
          letter-spacing: 0.5px;
        }

        /* ── SKILLS GRID ── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 72px;
        }

        .skill-card {
          border: 1px solid var(--teal-border);
          border-radius: 8px;
          padding: 24px 20px;
          background: var(--teal-dim);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          animation: fadeUp 0.6s ease both;
        }

        .skill-card:hover {
          border-color: var(--teal);
          background: rgba(0,255,252,0.15);
          transform: translateY(-4px);
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--teal), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .skill-card:hover::before { opacity: 1; }

        .skill-card:nth-child(1) { animation-delay: 0.10s; }
        .skill-card:nth-child(2) { animation-delay: 0.17s; }
        .skill-card:nth-child(3) { animation-delay: 0.24s; }
        .skill-card:nth-child(4) { animation-delay: 0.31s; }
        .skill-card:nth-child(5) { animation-delay: 0.38s; }
        .skill-card:nth-child(6) { animation-delay: 0.45s; }

        .skill-icon {
          width: 34px;
          height: 34px;
          margin-bottom: 14px;
          color: var(--teal);
        }

        .skill-title {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: var(--text);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .skill-desc {
          font-size: 11px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.75;
        }

        /* ── QUOTE ── */
        .cpf-quote {
          margin-bottom: 72px;
        }

        .cpf-quote p {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.65;
          color: var(--text);
          position: relative;
          z-index: 1;
          max-width: 720px;
        }

        .cpf-quote p strong {
          color: var(--teal);
          font-style: normal;
        }

        /* ── CTA SECTION ── */
        .cpf-cta-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }

        .cpf-cta-desc {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.8;
          margin-bottom: 28px;
        }

        .cpf-cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .cpf-hero { grid-template-columns: 1fr; gap: 40px; }
          .cpf-wa-block { position: static; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .cpf-cta-buttons { flex-wrap: wrap; }
        }

        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; }
          .cpf-cta-buttons { flex-direction: column; width: 100%; }
        }
      `}</style>

      <div className="cpf-page s-page">

        {/* ─── Section 1: Hero ─── */}
        <div className="cpf-hero">
          <div>
            <div className="s-eyebrow animate-fade-up">Il primo passo</div>
            <h1 className="s-h1 animate-fade-up delay-100">Prima ti ascolto.</h1>
            <p className="cpf-hero-subtitle animate-fade-up delay-200">
              Poi capiamo insieme cosa ti serve davvero.
            </p>
            <p className="cpf-hero-body animate-fade-up delay-200">
              Non sono un venditore. Sono pi&ugrave; vicino a un dottore: ascolto, analizzo, e ti dico cosa penso &mdash; anche se significa dirti che non hai bisogno di me. Pi&ugrave; della met&agrave; delle volte &egrave; esattamente quello che succede.
            </p>
            <div className="cpf-steps-label animate-fade-up delay-200">Cosa succede quando mi scrivi:</div>
            <ol className="cpf-steps animate-fade-up delay-200">
              <li>
                <span className="cpf-step-num">1</span>
                <span>Mi racconti la tua situazione in 2 minuti</span>
              </li>
              <li>
                <span className="cpf-step-num">2</span>
                <span>Ci sentiamo in call (15-30 minuti) e capiamo cosa ti pu&ograve; servire</span>
              </li>
              <li>
                <span className="cpf-step-num">3</span>
                <span>Ti dico onestamente se posso aiutarti o no</span>
              </li>
            </ol>
          </div>

          <div className="cpf-wa-block animate-fade-up delay-300">
            <ContactCTAButton
              buttonClassName="s-btn-primary"
              microcopy="Ho sempre un grande interesse nel conoscere nuovi contesti."
              align="center"
            />
          </div>
        </div>

        <div className="s-divider" style={{ margin: '0 0 72px' }}></div>

        {/* ─── Section 2: Le aree in cui lavoro ─── */}
        <div className="s-eyebrow">Competenze</div>
        <h2 className="s-h2" style={{ marginBottom: '32px' }}>Le aree in cui lavoro.</h2>
        <div className="skills-grid">

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div className="skill-title">Strategia &amp; Consulenza</div>
            <div className="skill-desc">Analisi del business, definizione degli obiettivi e costruzione di una direzione chiara &mdash; prima di spendere un euro in advertising.</div>
          </div>

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <div className="skill-title">Digital Marketing &amp; ADV</div>
            <div className="skill-desc">Campagne Meta, Google, TikTok. Budget gestito con criterio, non bruciato. Ogni euro deve avere un perch&eacute;.</div>
          </div>

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="skill-title">E-commerce</div>
            <div className="skill-desc">Ottimizzazione dello shop, strategie di acquisizione e retention. Vendere di pi&ugrave; con quello che hai gi&agrave;.</div>
          </div>

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="skill-title">CRO</div>
            <div className="skill-desc">Conversion Rate Optimization: analisi del comportamento utente, A/B test, UX e copy per trasformare pi&ugrave; visite in clienti.</div>
          </div>

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="skill-title">Lead Generation</div>
            <div className="skill-desc">Costruzione di sistemi per attrarre contatti qualificati. Non lead a caso &mdash; persone che hanno davvero bisogno di te.</div>
          </div>

          <div className="skill-card s-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="skill-title">AI &amp; Automazione</div>
            <div className="skill-desc">Integrazione di intelligenza artificiale e automazioni nei processi di marketing per scalare risultati senza scalare i costi.</div>
          </div>

        </div>

        {/* ─── Section 3: Quote ─── */}
        <div className="s-quote cpf-quote">
          <p>
            &ldquo;Il mio lavoro non &egrave; venderti campagne. &Egrave; dirti <strong>la verit&agrave; sui tuoi numeri</strong> e costruire un piano che funziona &mdash; anche se non ti piace quello che senti.&rdquo;
          </p>
        </div>

        {/* ─── Section 4: CTA ─── */}
        <div className="s-cta">
          <h3 className="cpf-cta-title">20 minuti. La tua situazione.</h3>
          <p className="cpf-cta-desc">Una conversazione per capire se ha senso lavorare insieme. Nessun pitch, nessun preventivo.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ContactCTAButton
              buttonClassName="s-btn-primary"
              microcopy="Ho sempre un grande interesse nel conoscere nuovi contesti."
              align="center"
            />
          </div>
        </div>
      </div>
    </>
  );
}
