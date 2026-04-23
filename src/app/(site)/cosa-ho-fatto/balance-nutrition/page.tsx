import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Study: Balance Nutrition | Nicola Serrao",
  description:
    "Da €45k a €150k al mese in 5 mesi. Come ho triplicato il fatturato di un e-commerce alimentazione con unit economics, forecasting e ottimizzazione ROAS.",
  openGraph: {
    title: "Case Study: Balance Nutrition | Nicola Serrao",
    description:
      "Da €45k a €150k al mese in 5 mesi. Come ho triplicato il fatturato di un e-commerce alimentazione con unit economics, forecasting e ottimizzazione ROAS.",
    url: `${SITE.url}/cosa-ho-fatto/balance-nutrition`,
  },
};

export default function BalanceNutritionPage() {
  return (
    <>
      <style>{`
        .cs-hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .cs-context-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        .cs-timeline { position: relative; padding-left: 32px; margin: 32px 0; }
        .cs-timeline::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 1px; background: var(--teal-border); }
        .cs-timeline-step { position: relative; margin-bottom: 28px; }
        .cs-timeline-step:last-child { margin-bottom: 0; }
        .cs-timeline-dot { position: absolute; left: -32px; top: 2px; width: 15px; height: 15px; border-radius: 50%; border: 2px solid var(--teal); background: var(--bg); }
        .cs-timeline-title { font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: var(--text); margin-bottom: 6px; }
        .cs-timeline-desc { font-size: 12px; color: var(--text-dim); line-height: 1.8; }
        .cs-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 32px 0; }
        .cs-insight { border-left: 2px solid var(--teal); padding-left: 20px; margin: 32px 0; }
        .cs-insight p { font-size: 13px; color: var(--text-dim); line-height: 1.8; font-style: italic; }
        .cs-cta-buttons { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
        .cs-chart-wrap { margin: 32px 0; display: flex; justify-content: center; }
        @media (max-width: 900px) {
          .cs-context-grid { grid-template-columns: 1fr; }
          .cs-metrics-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .cs-metrics-grid { grid-template-columns: 1fr 1fr; }
          .cs-cta-buttons { flex-direction: column; width: 100%; }
        }
      `}</style>

      <div className="s-page" style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <div className="s-eyebrow animate-fade-up">Case Study</div>
        <h1 className="s-h1 animate-fade-up delay-100">
          Balance Nutrition<br /><em>Da €45k a €150k/mese</em>
        </h1>
        <div className="cs-hero-badges animate-fade-up delay-200">
          <span className="s-badge">E-commerce</span>
          <span className="s-badge">Strategia</span>
          <span className="s-pill">Nutrition / Wellness</span>
          <span className="s-pill">5 mesi</span>
        </div>

        <div className="s-divider" style={{ margin: "48px 0" }} />

        {/* CONTESTO */}
        <section className="s-section">
          <div className="s-eyebrow">Il contesto</div>
          <h2 className="s-h2">Un business sano,<br />una crescita <em>bloccata</em></h2>
          <div className="cs-context-grid">
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>FATTURATO DI PARTENZA</div>
              <div className="s-metric-value">&euro;45k/mese</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                E-commerce nel settore alimentazione con prodotti validati e margini sani.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>IL TEAM</div>
              <div className="s-metric-value" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>2 soci + e-com manager</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Due soci, un e-commerce manager focalizzato su logistica. Google Ads specialist in arrivo.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="s-section">
          <div className="s-eyebrow">Il problema</div>
          <h2 className="s-h2">Crescita bloccata nonostante<br />un <em>business sano</em></h2>
          <p className="s-subtitle" style={{ marginBottom: 32 }}>
            Il prodotto funzionava. Il team c&apos;era. I margini erano positivi. Ma il fatturato restava fermo a &euro;45k/mese senza una direzione chiara per scalare. Mancava una visione strategica che collegasse numeri, budget e decisioni.
          </p>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* STRATEGIA */}
        <section className="s-section">
          <div className="s-eyebrow">La strategia</div>
          <h2 className="s-h2">Cosa ho fatto &mdash; <em>passo dopo passo</em></h2>

          <div className="cs-timeline">
            <div className="cs-timeline-step">
              <div className="cs-timeline-dot" />
              <div className="cs-timeline-title">Unit Economics completi</div>
              <div className="cs-timeline-desc">
                Mappatura di ogni costo: prodotto, spedizione, resi, commissioni, ads. Per la prima volta il business aveva una fotografia chiara dei margini reali per ordine.
              </div>
            </div>
            <div className="cs-timeline-step">
              <div className="cs-timeline-dot" />
              <div className="cs-timeline-title">Forecasting scenari</div>
              <div className="cs-timeline-desc">
                Costruzione di modelli predittivi con diversi livelli di budget e ROAS attesi. Ogni scenario mostrava impatto su fatturato, margine e profitto netto.
              </div>
            </div>
            <div className="cs-timeline-step">
              <div className="cs-timeline-dot" />
              <div className="cs-timeline-title">Soglia minima di budget</div>
              <div className="cs-timeline-desc">
                Identificazione del budget minimo per coprire i costi fissi. Sotto quella soglia, qualsiasi ottimizzazione era inutile. Sopra, ogni euro in pi&ugrave; generava profitto.
              </div>
            </div>
            <div className="cs-timeline-step">
              <div className="cs-timeline-dot" />
              <div className="cs-timeline-title">Ottimizzazione ROAS +30%</div>
              <div className="cs-timeline-desc">
                Ristrutturazione campagne, creative testing, audience segmentation. Il ROAS &egrave; migliorato del 30% come base per poter poi scalare il budget.
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHT */}
        <section className="s-section">
          <div className="s-eyebrow">L&apos;insight chiave</div>
          <div className="cs-insight">
            <p>
              &ldquo;Spendere di pi&ugrave; abbassava il ROAS ma aumentava il profitto assoluto. Controintuitivo, ma corretto. Il ROAS non &egrave; un obiettivo &mdash; &egrave; un vincolo da capire, non da massimizzare.&rdquo;
            </p>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* RISULTATI */}
        <section className="s-section">
          <div className="s-eyebrow">I risultati</div>
          <h2 className="s-h2">I numeri parlano <em>da soli</em></h2>

          <div className="cs-metrics-grid">
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">+200%</div>
              <div className="s-metric-label">Fatturato mensile<br />da €45k a €150k</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">+33%</div>
              <div className="s-metric-label">AOV<br />con strategia bundle</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">5 mesi</div>
              <div className="s-metric-label">Per triplicare<br />il fatturato</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">10%</div>
              <div className="s-metric-label">Margini netti<br />&gt;€18k/mese</div>
            </div>
          </div>

          {/* SVG Growth Chart */}
          <div className="cs-chart-wrap">
            <svg viewBox="0 0 480 200" width="100%" style={{ maxWidth: 520 }} aria-label="Grafico crescita fatturato da 45k a 150k in 5 mesi">
              <defs>
                <linearGradient id="bn-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,255,252,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,255,252,0)" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="50" y1="20" x2="50" y2="170" stroke="rgba(232,245,242,0.08)" strokeWidth="1" />
              <line x1="50" y1="170" x2="460" y2="170" stroke="rgba(232,245,242,0.08)" strokeWidth="1" />
              <line x1="50" y1="120" x2="460" y2="120" stroke="rgba(232,245,242,0.05)" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="70" x2="460" y2="70" stroke="rgba(232,245,242,0.05)" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="20" x2="460" y2="20" stroke="rgba(232,245,242,0.05)" strokeWidth="1" strokeDasharray="4" />
              {/* Y-axis labels */}
              <text x="44" y="174" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€0</text>
              <text x="44" y="124" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€50k</text>
              <text x="44" y="74" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€100k</text>
              <text x="44" y="24" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€150k</text>
              {/* X-axis labels */}
              <text x="50" y="188" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">M0</text>
              <text x="152" y="188" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">M1</text>
              <text x="255" y="188" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">M2</text>
              <text x="357" y="188" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">M3</text>
              <text x="460" y="188" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">M5</text>
              {/* Area fill */}
              <path d="M50,125 L152,110 L255,85 L357,55 L460,20 L460,170 L50,170 Z" fill="url(#bn-grad)" />
              {/* Line */}
              <polyline points="50,125 152,110 255,85 357,55 460,20" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Dots */}
              <circle cx="50" cy="125" r="4" fill="var(--bg)" stroke="var(--teal)" strokeWidth="2" />
              <circle cx="152" cy="110" r="4" fill="var(--bg)" stroke="var(--teal)" strokeWidth="2" />
              <circle cx="255" cy="85" r="4" fill="var(--bg)" stroke="var(--teal)" strokeWidth="2" />
              <circle cx="357" cy="55" r="4" fill="var(--bg)" stroke="var(--teal)" strokeWidth="2" />
              <circle cx="460" cy="20" r="5" fill="var(--teal)" stroke="var(--teal)" strokeWidth="2" />
              {/* Start / End labels */}
              <text x="50" y="140" fill="rgba(232,245,242,0.5)" fontSize="10" textAnchor="middle" fontFamily="monospace">€45k</text>
              <text x="460" y="14" fill="var(--teal)" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">€150k</text>
            </svg>
          </div>
        </section>

        {/* QUOTE PLACEHOLDER */}
        <section className="s-section">
          <div className="s-quote">
            <p className="s-body" style={{ position: "relative", zIndex: 1, fontStyle: "italic" }}>
              &ldquo;Testimonianza del cliente in arrivo. Questo spazio &egrave; riservato per una citazione diretta del fondatore di Balance Nutrition.&rdquo;
            </p>
            <p className="s-metric-label" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
              &mdash; Fondatore, Balance Nutrition
            </p>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* CTA */}
        <section className="s-cta">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>Prossimo passo</div>
            <h2 className="s-h2">Vuoi risultati <em>simili</em>?</h2>
            <p className="s-subtitle" style={{ margin: "0 auto 32px", textAlign: "center" }}>
              Iniziamo con una chiacchierata gratuita. Nessun impegno, solo una conversazione onesta sui tuoi numeri.
            </p>
            <div className="cs-cta-buttons" style={{ justifyContent: "center" }}>
              <a href={SITE.whatsapp} className="s-btn-primary" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Parliamone
              </a>
              <Link href="/cosa-ho-fatto" className="s-btn-secondary">
                &larr; Tutti i casi
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
