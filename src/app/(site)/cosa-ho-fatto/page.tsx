import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cosa ho fatto \u2013 Nicola Serrao",
  description:
    "Casi reali, risultati reali. Scopri cosa ha fatto Nicola Serrao per imprese italiane.",
  openGraph: {
    title: "Cosa ho fatto \u2013 Nicola Serrao",
    description:
      "Casi reali, risultati reali. Scopri cosa ha fatto Nicola Serrao per imprese italiane.",
    url: `${SITE.url}/cosa-ho-fatto`,
  },
};

export default function CosaHoFattoPage() {
  return (
    <>
      <style>{`
        /* HERO */
        .chf-hero-eyebrow { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--teal); margin-bottom: 20px; animation: chfFadeUp 0.5s ease both; }
        .chf-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(36px, 6vw, 64px); font-weight: 700; line-height: 1.05; margin-bottom: 24px; animation: chfFadeUp 0.6s ease both; animation-delay: 0.1s; }
        .chf-hero-title em { font-style: italic; color: var(--teal); }
        .chf-hero-sub { font-size: 13px; font-weight: 300; color: var(--text-dim); line-height: 1.9; max-width: 580px; margin-bottom: 48px; animation: chfFadeUp 0.6s ease both; animation-delay: 0.2s; }

        /* NUMBERS BAR */
        .chf-numbers-bar { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--teal-border); border-radius: 10px; background: var(--teal-dim); padding: 32px 40px; margin-bottom: 56px; animation: chfFadeUp 0.6s ease both; animation-delay: 0.3s; }
        .chf-number-item { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; flex: 1; }
        .chf-number-value { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 40px); font-weight: 700; color: var(--teal); line-height: 1; }
        .chf-number-label { font-size: 10px; letter-spacing: 1px; color: var(--text-dim); line-height: 1.6; }
        .chf-number-label em { display: block; font-style: italic; color: var(--text-faint); font-size: 9px; margin-top: 3px; }
        .chf-number-divider { width: 1px; height: 48px; background: var(--teal-border); flex-shrink: 0; margin: 0 20px; }

        /* CASES */
        .chf-cases-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 56px; animation: chfFadeUp 0.7s ease both; animation-delay: 0.4s; }
        .chf-case-card { border: 1px solid var(--teal-border); border-radius: 10px; overflow: hidden; background: rgba(232,245,242,0.02); transition: border-color 0.3s; }
        .chf-case-card:hover { border-color: rgba(0,255,252,0.5); }
        .chf-case-bar { height: 3px; background: linear-gradient(90deg, var(--teal) 0%, transparent 100%); }
        .chf-case-inner { display: grid; grid-template-columns: 1fr 1fr; }
        .chf-case-left { padding: 32px; border-right: 1px solid var(--teal-border); }
        .chf-case-right { padding: 32px; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }
        .chf-case-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
        .chf-case-badge { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--teal); border: 1px solid var(--teal-border); padding: 4px 10px; border-radius: 3px; background: var(--teal-dim); }
        .chf-case-badge.chf-sector { color: var(--text-dim); border-color: rgba(232,245,242,0.1); background: transparent; }
        .chf-case-brand { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .chf-case-market { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-faint); margin-bottom: 20px; }
        .chf-case-situation-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-faint); margin-bottom: 8px; }
        .chf-case-situation { font-size: 12px; font-weight: 300; color: var(--text-dim); line-height: 1.85; }
        .chf-case-results-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-faint); margin-bottom: 16px; }
        .chf-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .chf-metric { display: flex; flex-direction: column; gap: 4px; }
        .chf-metric-value { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--teal); line-height: 1; }
        .chf-metric-label { font-size: 10px; color: var(--text-dim); line-height: 1.5; }
        .chf-case-what { font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.8; border-top: 1px solid var(--teal-border); padding-top: 16px; }
        .chf-case-what strong { color: var(--text); font-weight: 500; }

        /* MARKET TAGS */
        .chf-markets-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
        .chf-market-tag { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-dim); border: 1px solid rgba(232,245,242,0.12); padding: 3px 9px; border-radius: 3px; background: rgba(232,245,242,0.03); }

        /* DIVIDER */
        .chf-divider { width: 100%; height: 1px; background: linear-gradient(90deg, var(--teal-border) 0%, transparent 80%); margin: 56px 0; }

        /* SECTION LABEL */
        .chf-section-label { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--text-faint); margin-bottom: 28px; }

        /* SKILLS GRID */
        .chf-skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 56px; }
        .chf-skill-card { border: 1px solid var(--teal-border); border-radius: 8px; padding: 24px 20px; background: var(--teal-dim); transition: border-color 0.3s, background 0.3s, transform 0.3s; }
        .chf-skill-card:hover { border-color: var(--teal); background: rgba(0,255,252,0.15); transform: translateY(-3px); }
        .chf-skill-icon { width: 32px; height: 32px; margin-bottom: 12px; color: var(--teal); }
        .chf-skill-title { font-size: 10px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text); margin-bottom: 8px; }
        .chf-skill-desc { font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.75; }

        /* TOOLS GRID */
        .chf-tools-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px; }
        .chf-tool-item { display: flex; flex-direction: column; gap: 3px; border: 1px solid rgba(232,245,242,0.1); border-radius: 6px; padding: 12px 20px; background: rgba(232,245,242,0.03); transition: border-color 0.2s, background 0.2s; }
        .chf-tool-item:hover { border-color: var(--teal-border); background: var(--teal-dim); }
        .chf-tool-item-special { border-color: var(--teal-border) !important; background: var(--teal-dim) !important; }
        .chf-tool-name { font-size: 11px; font-weight: 500; color: var(--text); letter-spacing: 0.5px; }
        .chf-tool-desc { font-size: 9px; color: var(--text-faint); letter-spacing: 1px; text-transform: uppercase; }

        /* COMING SOON */
        .chf-coming-soon { border: 1px dashed var(--teal-border); border-radius: 10px; padding: 40px; text-align: center; margin-bottom: 56px; }
        .chf-cs-icon { font-size: 28px; color: var(--teal); margin-bottom: 16px; letter-spacing: 8px; }
        .chf-coming-soon p { font-size: 12px; font-weight: 300; color: var(--text-dim); line-height: 1.9; }

        /* CTA */
        .chf-cta-section { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .chf-cta-text h3 { font-family: 'Playfair Display', serif; font-size: clamp(22px, 3vw, 30px); font-weight: 700; margin-bottom: 10px; }
        .chf-cta-text p { font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.8; }
        .chf-cta-buttons { display: flex; gap: 14px; flex-shrink: 0; }
        .chf-btn-primary { display: inline-flex; align-items: center; gap: 10px; background: var(--teal); color: #0a0e0d; font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; border-radius: 5px; text-decoration: none; transition: opacity 0.2s, transform 0.2s; white-space: nowrap; }
        .chf-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }
        .chf-btn-secondary { display: inline-flex; align-items: center; gap: 10px; background: transparent; color: var(--teal); font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; padding: 14px 24px; border-radius: 5px; border: 1px solid var(--teal-border); text-decoration: none; transition: background 0.2s, border-color 0.2s, transform 0.2s; white-space: nowrap; }
        .chf-btn-secondary:hover { background: var(--teal-dim); border-color: var(--teal); transform: translateY(-2px); }

        @keyframes chfFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .chf-case-inner { grid-template-columns: 1fr; }
          .chf-case-left { border-right: none; border-bottom: 1px solid var(--teal-border); }
          .chf-skills-grid { grid-template-columns: 1fr; }
          .chf-numbers-bar { flex-direction: column; gap: 24px; padding: 24px 20px; }
          .chf-number-divider { width: 48px; height: 1px; margin: 0; }
          .chf-cta-section { flex-direction: column; align-items: flex-start; }
          .chf-cta-buttons { flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .chf-case-left, .chf-case-right { padding: 24px 20px; }
          .chf-case-metrics { grid-template-columns: 1fr 1fr; }
          .chf-cta-buttons { flex-direction: column; width: 100%; }
          .chf-btn-primary, .chf-btn-secondary { justify-content: center; }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "80px 60px" }}>

        {/* HERO */}
        <div className="chf-hero-eyebrow">Cosa ho fatto</div>
        <h1 className="chf-hero-title">Numeri reali.<br /><em>Aziende reali.</em></h1>
        <p className="chf-hero-sub">
          Non ho casi studio inventati n&eacute; slide patinate con proiezioni fantasy.<br />
          Questi sono progetti in cui ho lavorato davvero &mdash; con budget reali, problemi reali e risultati che si possono misurare.
        </p>

        {/* NUMERI IN EVIDENZA */}
        <div className="chf-numbers-bar">
          <div className="chf-number-item">
            <span className="chf-number-value">30+</span>
            <span className="chf-number-label">Clienti gestiti</span>
          </div>
          <div className="chf-number-divider"></div>
          <div className="chf-number-item">
            <span className="chf-number-value">6 mesi</span>
            <span className="chf-number-label">Durata media del rapporto<br /><em>3 collaborazioni oltre i 2 anni</em></span>
          </div>
          <div className="chf-number-divider"></div>
          <div className="chf-number-item">
            <span className="chf-number-value">&euro;5M+</span>
            <span className="chf-number-label">Budget Adv gestito su Meta</span>
          </div>
        </div>

        {/* CASES */}
        <div className="chf-cases-list">

          {/* CASO 1: Balance Nutrition */}
          <div className="chf-case-card">
            <div className="chf-case-bar"></div>
            <div className="chf-case-inner">
              <div className="chf-case-left">
                <div className="chf-case-meta">
                  <span className="chf-case-badge">E-commerce &amp; Strategia</span>
                  <span className="chf-case-badge chf-sector">Nutrition / Wellness</span>
                </div>
                <div className="chf-case-brand">Balance Nutrition</div>
                <div className="chf-case-market">Mercato italiano &mdash; B2C</div>
                <div className="chf-case-situation-label">Situazione iniziale</div>
                <div className="chf-case-situation">
                  Brand nel settore nutrition con un fatturato mensile di 45k, campagne Ads non ottimizzate e un AOV basso che limitava i margini. Potenziale alto, esecuzione da ricostruire completamente.
                </div>
              </div>
              <div className="chf-case-right">
                <div>
                  <div className="chf-case-results-label">Risultati &mdash; in 4 mesi</div>
                  <div className="chf-case-metrics">
                    <div className="chf-metric">
                      <span className="chf-metric-value">+200%</span>
                      <span className="chf-metric-label">Fatturato mensile (da 45k a 150k)</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">+33%</span>
                      <span className="chf-metric-label">AOV con strategia bundle</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">10%</span>
                      <span className="chf-metric-label">Margini netti consolidati</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">4</span>
                      <span className="chf-metric-label">Mesi per triplicare il fatturato</span>
                    </div>
                  </div>
                </div>
                <div className="chf-case-what">
                  <strong>Cosa ho fatto:</strong> Strategia di scala sulle Ads Meta, ristrutturazione del catalogo prodotti con bundle ad alto AOV, ottimizzazione del funnel di acquisizione. Il risultato ha trasformato il rapporto: da collaborazione su singole campagne a Growth Strategist a lungo termine.
                </div>
              </div>
            </div>
          </div>

          {/* CASO 2: Avantgrade */}
          <div className="chf-case-card">
            <div className="chf-case-bar"></div>
            <div className="chf-case-inner">
              <div className="chf-case-left">
                <div className="chf-case-meta">
                  <span className="chf-case-badge">Meta ADV</span>
                  <span className="chf-case-badge chf-sector">Luxury &amp; E-commerce</span>
                </div>
                <div className="chf-case-brand">Avantgrade</div>
                <div className="chf-case-market">Gestione Ads Meta per clienti corporate</div>
                <div className="chf-case-situation-label">Clienti gestiti</div>
                <div className="chf-case-situation">
                  Collaborazione con agenzia su clienti di alto profilo: un importante brand del lusso nel settore tessile e un e-commerce nel mercato dei mobili da bagno. Contesti esigenti, standard elevati, zero margine di errore.
                </div>
              </div>
              <div className="chf-case-right">
                <div>
                  <div className="chf-case-results-label">Contesto</div>
                  <div className="chf-case-metrics">
                    <div className="chf-metric">
                      <span className="chf-metric-value">Luxury</span>
                      <span className="chf-metric-label">Brand tessile di alto profilo</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">E-com</span>
                      <span className="chf-metric-label">Vendita mobili da bagno</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">Meta</span>
                      <span className="chf-metric-label">Canale gestito end-to-end</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">Zero</span>
                      <span className="chf-metric-label">Margine di errore accettato</span>
                    </div>
                  </div>
                </div>
                <div className="chf-case-what">
                  <strong>Cosa ho fatto:</strong> Pianificazione e gestione campagne Meta per brand con posizionamento premium. Audience research, creative strategy e ottimizzazione continua mantenendo la coerenza con il brand identity di ciascun cliente.
                </div>
              </div>
            </div>
          </div>

          {/* CASO 3: Clienti tramite Agenzie */}
          <div className="chf-case-card">
            <div className="chf-case-bar"></div>
            <div className="chf-case-inner">
              <div className="chf-case-left">
                <div className="chf-case-meta">
                  <span className="chf-case-badge">Meta Strategist</span>
                  <span className="chf-case-badge chf-sector">Multi-settore</span>
                </div>
                <div className="chf-case-brand">Clienti gestiti tramite Agenzie</div>
                <div className="chf-case-market">Freelance &mdash; Strategist Meta Ads</div>
                <div className="chf-case-situation-label">Una precisazione</div>
                <div className="chf-case-situation">
                  Per correttezza professionale non nomino i brand. Ma ogni cliente lo seguivo io, direttamente e completamente, per la parte Strategist Meta &mdash; dalla strategia all&apos;esecuzione, dall&apos;analisi dei dati all&apos;ottimizzazione creativa. Nessun intermediario tra me e i risultati.
                </div>
                <div className="chf-case-situation-label" style={{ marginTop: 20 }}>Mercati toccati</div>
                <div className="chf-markets-tags">
                  <span className="chf-market-tag">Fitness &amp; Attrezzature</span>
                  <span className="chf-market-tag">Dieta Chetogenica</span>
                  <span className="chf-market-tag">Servizi HR B2B</span>
                  <span className="chf-market-tag">E-com Pneumatici</span>
                  <span className="chf-market-tag">Infobusiness</span>
                  <span className="chf-market-tag">Mammabilingue</span>
                  <span className="chf-market-tag">Oggetti di Lusso</span>
                  <span className="chf-market-tag">Profumi E-com</span>
                  <span className="chf-market-tag">Corsi Yoga B2C</span>
                  <span className="chf-market-tag">e altri...</span>
                </div>
              </div>
              <div className="chf-case-right">
                <div>
                  <div className="chf-case-results-label">Il perimetro</div>
                  <div className="chf-case-metrics">
                    <div className="chf-metric">
                      <span className="chf-metric-value">15+</span>
                      <span className="chf-metric-label">Clienti gestiti in totale</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">15</span>
                      <span className="chf-metric-label">Mercati e settori diversi</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">Lead</span>
                      <span className="chf-metric-label">B2B, HR, Tech, Servizi professionali</span>
                    </div>
                    <div className="chf-metric">
                      <span className="chf-metric-value">E-com</span>
                      <span className="chf-metric-label">Lusso, Nutrition, Moda, Benessere</span>
                    </div>
                  </div>
                </div>
                <div className="chf-case-what">
                  <strong>Cosa ho fatto:</strong> Gestione end-to-end delle campagne Meta &mdash; strategia, audience, creativit&agrave;, budget, ottimizzazione e report. In settori che vanno dal B2B puro all&apos;e-commerce consumer, con obiettivi ogni volta completamente diversi.
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="chf-divider"></div>

        {/* COMPETENZE */}
        <div className="chf-section-label">Competenze &amp; Specializzazioni</div>
        <div className="chf-skills-grid">
          <div className="chf-skill-card">
            <svg className="chf-skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <div className="chf-skill-title">Meta Specialist</div>
            <div className="chf-skill-desc">Oltre 5 milioni di euro di budget gestito su Meta Ads. Campagne di acquisizione, retargeting, scaling e ottimizzazione del ROAS in settori B2B e B2C.</div>
          </div>
          <div className="chf-skill-card">
            <svg className="chf-skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <div className="chf-skill-title">Shopify Specialist</div>
            <div className="chf-skill-desc">Ottimizzazione dello store, gestione catalogo, CRO sul checkout e integrazione con i canali di advertising per massimizzare le conversioni.</div>
          </div>
          <div className="chf-skill-card">
            <svg className="chf-skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <div className="chf-skill-title">Klaviyo Specialist</div>
            <div className="chf-skill-desc">Email marketing e automazioni per e-commerce: flussi di benvenuto, abbandono carrello, post-acquisto e campagne di retention per aumentare il LTV.</div>
          </div>
          <div className="chf-skill-card">
            <svg className="chf-skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <div className="chf-skill-title">AI &amp; Automazione</div>
            <div className="chf-skill-desc">Focus crescente sull&apos;AI applicata al business &mdash; costruendo agenti affidabili per sostituire l&apos;operativit&agrave; che erode tempo e creare asset digitali autonomi per le PMI.</div>
          </div>
        </div>

        <div className="chf-divider"></div>

        {/* STRUMENTI */}
        <div className="chf-section-label">Strumenti che uso ogni giorno</div>
        <div className="chf-tools-grid">
          <div className="chf-tool-item"><span className="chf-tool-name">N8N</span><span className="chf-tool-desc">Automazioni</span></div>
          <div className="chf-tool-item"><span className="chf-tool-name">Shopify</span><span className="chf-tool-desc">E-commerce</span></div>
          <div className="chf-tool-item"><span className="chf-tool-name">Klaviyo</span><span className="chf-tool-desc">Email &amp; CRM</span></div>
          <div className="chf-tool-item"><span className="chf-tool-name">Notion</span><span className="chf-tool-desc">Organizzazione</span></div>
          <div className="chf-tool-item"><span className="chf-tool-name">Slack</span><span className="chf-tool-desc">Comunicazione</span></div>
          <div className="chf-tool-item"><span className="chf-tool-name">Canva</span><span className="chf-tool-desc">Visual</span></div>
          <div className="chf-tool-item chf-tool-item-special"><span className="chf-tool-name">Buon senso</span><span className="chf-tool-desc">Lo strumento pi&ugrave; raro</span></div>
        </div>

        {/* COMING SOON */}
        <div className="chf-coming-soon">
          <div className="chf-cs-icon">&#8943;</div>
          <p>Altri casi studio in arrivo.<br />Ogni progetto &egrave; una storia diversa &mdash; e merita di essere raccontata bene.</p>
        </div>

        <div className="chf-divider"></div>

        {/* CTA */}
        <div className="chf-cta-section">
          <div className="chf-cta-text">
            <h3>Vuoi essere il prossimo caso?</h3>
            <p>Iniziamo con una chiacchierata gratuita.<br />Nessun impegno, solo una conversazione onesta.</p>
          </div>
          <div className="chf-cta-buttons">
            <a href={SITE.whatsapp} className="chf-btn-primary" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Conosciamoci
            </a>
            <a href="/cosa-posso-fare" className="chf-btn-secondary">Cosa posso fare &rarr;</a>
          </div>
        </div>

      </div>
    </>
  );
}
