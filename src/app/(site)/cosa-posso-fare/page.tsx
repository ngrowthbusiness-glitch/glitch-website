import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cosa posso fare per te \u2013 Nicola Serrao",
  description:
    "Prima ti ascolto, poi capiamo insieme cosa ti serve. Strategia, digital marketing, e-commerce, CRO e lead generation.",
  openGraph: {
    title: "Cosa posso fare per te \u2013 Nicola Serrao",
    description:
      "Prima ti ascolto, poi capiamo insieme cosa ti serve. Strategia, digital marketing, e-commerce, CRO e lead generation.",
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
          padding-top: calc(var(--nav-h) + 72px);
        }

        /* ── HERO ── */
        .cpf-hero-sub {
          font-size: 12px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.9;
          max-width: 560px;
          margin-bottom: 56px;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.2s;
        }

        /* ── SECTION LABEL ── */
        .section-label {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 28px;
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

        /* ── PROCESS ── */
        .process { margin-bottom: 72px; }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
          margin-top: 28px;
        }

        .process-steps::before {
          content: '';
          position: absolute;
          top: 27px;
          left: calc(16.6% + 20px);
          right: calc(16.6% + 20px);
          height: 1px;
          background: var(--teal-border);
          z-index: 0;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .step-number {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid var(--teal-border);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--teal);
          margin-bottom: 18px;
          transition: background 0.3s, border-color 0.3s;
        }

        .step:hover .step-number {
          background: var(--teal-dim);
          border-color: var(--teal);
        }

        .step-title {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text);
          margin-bottom: 10px;
        }

        .step-desc {
          font-size: 11px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.75;
        }

        .step-badge {
          display: inline-block;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          border: 1px solid var(--teal-border);
          padding: 3px 8px;
          border-radius: 2px;
          margin-top: 10px;
          background: var(--teal-dim);
        }

        /* ── TRUTH ── */
        .cpf-truth { margin-bottom: 56px; }

        .truth-text {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.65;
          color: var(--text);
          position: relative;
          z-index: 1;
          max-width: 720px;
        }

        .truth-text strong {
          color: var(--teal);
          font-style: normal;
        }

        /* ── CTA ── */
        .cta-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .cta-text h3 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }

        .cta-text p {
          font-size: 11px;
          font-weight: 300;
          color: var(--text-dim);
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 14px;
          flex-shrink: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .cpf-page { padding-top: calc(var(--nav-h) + 48px); }
          .skills-grid { grid-template-columns: 1fr 1fr; }
          .process-steps { grid-template-columns: 1fr; gap: 36px; }
          .process-steps::before { display: none; }
          .cta-section { flex-direction: column; align-items: flex-start; }
          .cta-buttons { flex-wrap: wrap; }
          .cpf-truth { padding: 28px 28px; }
        }

        @media (max-width: 480px) {
          .cpf-page { padding-top: calc(var(--nav-h) + 36px); }
          .skills-grid { grid-template-columns: 1fr; }
          .cta-buttons { flex-direction: column; width: 100%; }
          .cpf-truth { padding: 24px 20px; }
        }
      `}</style>

      <div className="cpf-page s-page">
        {/* Hero */}
        <div className="s-eyebrow animate-fade-up">Cosa posso fare per te</div>
        <h1 className="s-h1 animate-fade-up delay-100">
          Prima ti ascolto.<br />
          <em>Poi capiamo insieme</em><br />
          cosa ti serve davvero.
        </h1>
        <p className="cpf-hero-sub">
          Non ho un listino prezzi. Non ho pacchetti preconfezionati.<br />
          Ho un metodo, esperienza, e la volont&agrave; di capire il tuo business prima di dirti qualsiasi cosa.
        </p>

        {/* Aree */}
        <div className="section-label">Le aree in cui lavoro</div>
        <div className="skills-grid">

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div className="skill-title">Strategia &amp; Consulenza</div>
            <div className="skill-desc">Analisi del business, definizione degli obiettivi e costruzione di una direzione chiara &mdash; prima di spendere un euro in advertising.</div>
          </div>

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <div className="skill-title">Digital Marketing &amp; ADV</div>
            <div className="skill-desc">Campagne Meta, Google, TikTok. Budget gestito con criterio, non bruciato. Ogni euro deve avere un perch&eacute;.</div>
          </div>

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="skill-title">E-commerce</div>
            <div className="skill-desc">Ottimizzazione dello shop, strategie di acquisizione e retention. Vendere di pi&ugrave; con quello che hai gi&agrave;.</div>
          </div>

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="skill-title">CRO</div>
            <div className="skill-desc">Conversion Rate Optimization: analisi del comportamento utente, A/B test, UX e copy per trasformare pi&ugrave; visite in clienti.</div>
          </div>

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="skill-title">Lead Generation</div>
            <div className="skill-desc">Costruzione di sistemi per attrarre contatti qualificati. Non lead a caso &mdash; persone che hanno davvero bisogno di te.</div>
          </div>

          <div className="skill-card">
            <svg className="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="skill-title">Metodo GLITCH</div>
            <div className="skill-desc">Il framework con cui lavoro: un approccio strutturato, misurabile e adattabile alla realt&agrave; della tua azienda.</div>
          </div>

        </div>

        <div className="s-divider" style={{ margin: '56px 0' }}></div>

        {/* Processo */}
        <div className="process">
          <div className="section-label">Come funziona</div>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-title">Chiacchierata</div>
              <div className="step-desc">Una call informale. Nessuna presentazione, nessun pitch. Solo due persone che si parlano.</div>
              <span className="step-badge">Gratuita</span>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-title">Analisi</div>
              <div className="step-desc">Guardo il tuo business, i tuoi numeri, i tuoi canali. Capisco dove sei e dove potresti arrivare.</div>
              <span className="step-badge">Gratuita</span>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-title">Proposta</div>
              <div className="step-desc">Solo se ha senso per entrambi, ti dico esattamente cosa farei &mdash; e perch&eacute;. Senza fuffa.</div>
              <span className="step-badge">Su misura</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="s-quote cpf-truth">
          <p className="truth-text">
            &ldquo;Un imprenditore ha bisogno di qualcuno che gli dica <strong>la verit&agrave;</strong>. Non proiezioni senza fondamenta. Non numeri gonfiati. Il mio obiettivo &egrave; uno solo: <strong>far emergere il potenziale reale del tuo business online.</strong>&rdquo;
          </p>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-text">
            <h3>Prenota la tua chiacchierata.</h3>
            <p>Zero impegno. Zero pressione.<br />Solo una conversazione onesta sul tuo business.</p>
          </div>
          <div className="cta-buttons">
            <a href={SITE.whatsapp} className="s-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Scrivimi su WA
            </a>
            <a href={`mailto:${SITE.email}`} className="s-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Inviami una mail
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
