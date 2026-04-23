import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Study: Lancio Yoga | Nicola Serrao",
  description:
    "3.000 iscritti a €1 CPL, 20% show-up e €19.000 di revenue da €3.000 di budget. Come ho lanciato un info-product yoga da zero con Meta Ads.",
  openGraph: {
    title: "Case Study: Lancio Yoga | Nicola Serrao",
    description:
      "3.000 iscritti a €1 CPL, 20% show-up e €19.000 di revenue da €3.000 di budget. Come ho lanciato un info-product yoga da zero con Meta Ads.",
    url: `${SITE.url}/cosa-ho-fatto/lancio-yoga`,
  },
};

export default function LancioYogaPage() {
  return (
    <>
      <style>{`
        .cs-hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .cs-context-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        .cs-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 32px 0; }
        .cs-step-num { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--teal); opacity: 0.4; margin-bottom: 8px; }
        .cs-step-title { font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: var(--text); margin-bottom: 6px; }
        .cs-step-desc { font-size: 12px; color: var(--text-dim); line-height: 1.8; }
        .cs-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 32px 0; }
        .cs-cta-buttons { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
        .cs-funnel-wrap { margin: 40px 0; display: flex; justify-content: center; }
        @media (max-width: 900px) {
          .cs-context-grid, .cs-steps-grid { grid-template-columns: 1fr; }
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
          Lancio Yoga<br /><em>&euro;19k da &euro;3k di budget</em>
        </h1>
        <div className="cs-hero-badges animate-fade-up delay-200">
          <span className="s-badge">Info-Product</span>
          <span className="s-badge">Lancio da zero</span>
          <span className="s-pill">Yoga / Wellness</span>
          <span className="s-pill">Meta Ads</span>
        </div>

        <div className="s-divider" style={{ margin: "48px 0" }} />

        {/* CONTESTO */}
        <section className="s-section">
          <div className="s-eyebrow">Il contesto</div>
          <h2 className="s-h2">Un lancio da zero.<br />Budget: <em>&euro;3.000</em></h2>
          <div className="cs-context-grid">
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>IL PRODOTTO</div>
              <div className="s-metric-value" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>Info-product yoga</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Corso online nel settore yoga. Nessun lancio precedente, nessuna lista, tutto da costruire da zero.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>IL BUDGET</div>
              <div className="s-metric-value">&euro;3.000</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Budget totale per acquisizione iscritti e conversione. Ogni euro doveva essere speso con precisione chirurgica.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="s-section">
          <div className="s-eyebrow">La sfida</div>
          <h2 className="s-h2">Zero lista, zero storico,<br /><em>tutto da costruire</em></h2>
          <p className="s-subtitle" style={{ marginBottom: 32 }}>
            Nessun database di contatti, nessun lancio precedente da cui partire. Serviva una strategia che portasse iscritti qualificati, li tenesse caldi fino al giorno del lancio e li convertisse in acquirenti &mdash; tutto con &euro;3.000.
          </p>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* STRATEGIA */}
        <section className="s-section">
          <div className="s-eyebrow">La strategia</div>
          <h2 className="s-h2">Un sistema in <em>6 fasi</em></h2>

          <div className="cs-steps-grid">
            <div className="s-card">
              <div className="cs-step-num">01</div>
              <div className="cs-step-title">Campagne Meta con ottimizzazione manuale</div>
              <div className="cs-step-desc">
                Prime 72h di gestione manuale intensiva. CPL iniziale &euro;6-7, abbattuto progressivamente attraverso testing rapido su audience e creative.
              </div>
            </div>
            <div className="s-card">
              <div className="cs-step-num">02</div>
              <div className="cs-step-title">CBO consolidato</div>
              <div className="cs-step-desc">
                Campaign Budget Optimization con allocazione intelligente del budget sui giorni ad alta conversione, massimizzando ogni euro investito.
              </div>
            </div>
            <div className="s-card">
              <div className="cs-step-num">03</div>
              <div className="cs-step-title">Google Calendar + Email strutturate</div>
              <div className="cs-step-desc">
                Strategia show-up: invito a salvare la data su Google Calendar, email strutturate per mantenere l&apos;engagement fino al giorno del lancio.
              </div>
            </div>
            <div className="s-card">
              <div className="cs-step-num">04</div>
              <div className="cs-step-title">Retargeting 24h + Push</div>
              <div className="cs-step-desc">
                Retargeting mirato nelle 24 ore prima del lancio combinato con push notification per massimizzare la presenza live.
              </div>
            </div>
            <div className="s-card">
              <div className="cs-step-num">05</div>
              <div className="cs-step-title">Early bird strategico</div>
              <div className="cs-step-desc">
                Offerta early bird strutturata per creare urgenza senza deprezzare il brand. Il valore percepito restava alto.
              </div>
            </div>
            <div className="s-card">
              <div className="cs-step-num">06</div>
              <div className="cs-step-title">Live Q&amp;A finale</div>
              <div className="cs-step-desc">
                Sessione live di domande e risposte come ultimo touchpoint prima della chiusura. Conversione diretta durante il live.
              </div>
            </div>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* RISULTATI */}
        <section className="s-section">
          <div className="s-eyebrow">I risultati</div>
          <h2 className="s-h2">Da &euro;3k a &euro;19k.<br /><em>Return 6.3x</em></h2>

          <div className="cs-metrics-grid">
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">3.000</div>
              <div className="s-metric-label">Iscritti acquisiti<br />a €1 CPL</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">&euro;1</div>
              <div className="s-metric-label">Costo per lead<br />da €6-7 iniziali</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">20%</div>
              <div className="s-metric-label">Show-up rate<br />al lancio live</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">&euro;19k</div>
              <div className="s-metric-label">Revenue totale<br />da €3k budget</div>
            </div>
          </div>

          {/* SVG Funnel Visualization */}
          <div className="cs-funnel-wrap">
            <svg viewBox="0 0 400 280" width="100%" style={{ maxWidth: 440 }} aria-label="Funnel: da budget 3k a 3000 iscritti a 600 partecipanti a 19k revenue">
              {/* Funnel shape */}
              <polygon points="40,20 360,20 310,90 90,90" fill="rgba(0,255,252,0.12)" stroke="var(--teal)" strokeWidth="1" />
              <polygon points="90,95 310,95 280,155 120,155" fill="rgba(0,255,252,0.09)" stroke="var(--teal)" strokeWidth="1" strokeOpacity="0.6" />
              <polygon points="120,160 280,160 260,220 140,220" fill="rgba(0,255,252,0.06)" stroke="var(--teal)" strokeWidth="1" strokeOpacity="0.4" />
              <polygon points="140,225 260,225 245,265 155,265" fill="rgba(0,255,252,0.18)" stroke="var(--teal)" strokeWidth="1.5" />
              {/* Labels */}
              <text x="200" y="50" fill="var(--text)" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">€3.000 BUDGET</text>
              <text x="200" y="66" fill="rgba(232,245,242,0.4)" fontSize="9" textAnchor="middle" fontFamily="monospace">Meta Ads</text>
              <text x="200" y="120" fill="var(--text)" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">3.000 ISCRITTI</text>
              <text x="200" y="136" fill="rgba(232,245,242,0.4)" fontSize="9" textAnchor="middle" fontFamily="monospace">€1 CPL</text>
              <text x="200" y="186" fill="var(--text)" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">600 LIVE</text>
              <text x="200" y="202" fill="rgba(232,245,242,0.4)" fontSize="9" textAnchor="middle" fontFamily="monospace">20% show-up</text>
              <text x="200" y="250" fill="var(--teal)" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">€19.000 REVENUE</text>
            </svg>
          </div>
        </section>

        {/* QUOTE PLACEHOLDER */}
        <section className="s-section">
          <div className="s-quote">
            <p className="s-body" style={{ position: "relative", zIndex: 1, fontStyle: "italic" }}>
              &ldquo;Testimonianza del cliente in arrivo. Questo spazio &egrave; riservato per una citazione diretta sul lancio.&rdquo;
            </p>
            <p className="s-metric-label" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
              &mdash; Fondatore, Progetto Yoga
            </p>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* CTA */}
        <section className="s-cta">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>Prossimo passo</div>
            <h2 className="s-h2">Stai lanciando <em>qualcosa</em>?</h2>
            <p className="s-subtitle" style={{ margin: "0 auto 32px", textAlign: "center" }}>
              Se hai un prodotto da lanciare e un budget limitato, parliamone. La strategia fa la differenza tra bruciare soldi e generare revenue.
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
