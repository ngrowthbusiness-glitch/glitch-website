import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Study: Autonoleggio B2B | Nicola Serrao",
  description:
    "CPL da €25 a €4,50 con qualità lead 80%+. Come ho ristrutturato la lead generation per un'azienda di noleggio auto B2B.",
  openGraph: {
    title: "Case Study: Autonoleggio B2B | Nicola Serrao",
    description:
      "CPL da €25 a €4,50 con qualità lead 80%+. Come ho ristrutturato la lead generation per un'azienda di noleggio auto B2B.",
    url: `${SITE.url}/cosa-ho-fatto/autonoleggio`,
  },
};

export default function AutonoleggoPage() {
  return (
    <>
      <style>{`
        .cs-hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .cs-context-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        .cs-strategy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 32px 0; }
        .cs-metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 32px 0; }
        .cs-cta-buttons { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
        .cs-cpl-wrap { margin: 40px 0; display: flex; justify-content: center; }
        .cs-vs-block { display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; margin: 32px 0; }
        .cs-vs-divider { font-family: var(--font-playfair), 'Playfair Display', serif; font-size: 20px; color: var(--teal); opacity: 0.5; }
        @media (max-width: 900px) {
          .cs-context-grid { grid-template-columns: 1fr; }
          .cs-strategy-grid { grid-template-columns: 1fr; }
          .cs-metrics-grid { grid-template-columns: 1fr 1fr; }
          .cs-vs-block { grid-template-columns: 1fr; text-align: center; }
          .cs-vs-divider { display: none; }
        }
        @media (max-width: 480px) {
          .cs-metrics-grid { grid-template-columns: 1fr; }
          .cs-cta-buttons { flex-direction: column; width: 100%; }
        }
      `}</style>

      <div className="s-page" style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <div className="s-eyebrow animate-fade-up">Case Study</div>
        <h1 className="s-h1 animate-fade-up delay-100">
          Autonoleggio B2B<br /><em>CPL da &euro;25 a &euro;4,50</em>
        </h1>
        <div className="cs-hero-badges animate-fade-up delay-200">
          <span className="s-badge">Lead Generation</span>
          <span className="s-badge">B2B</span>
          <span className="s-pill">Noleggio Auto</span>
          <span className="s-pill">Meta Ads</span>
        </div>

        <div className="s-divider" style={{ margin: "48px 0" }} />

        {/* CONTESTO */}
        <section className="s-section">
          <div className="s-eyebrow">Il contesto</div>
          <h2 className="s-h2">Un CPL fuori controllo<br />in un <em>mercato affollato</em></h2>
          <div className="cs-context-grid">
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>CPL COMPETITOR</div>
              <div className="s-metric-value">&euro;10</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Media di mercato per lead nel settore noleggio auto.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>CPL DI PARTENZA</div>
              <div className="s-metric-value">&euro;25</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                2.5x la media di mercato. Campagne non ottimizzate e posizionamento generico.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>IL SETTORE</div>
              <div className="s-metric-value" style={{ fontSize: "clamp(18px, 3vw, 26px)" }}>Noleggio B2B</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Lead generation per noleggio auto con focus su aziende e professionisti.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="s-section">
          <div className="s-eyebrow">Il problema</div>
          <h2 className="s-h2">Stesso messaggio di tutti.<br /><em>Stesso risultato.</em></h2>
          <p className="s-subtitle" style={{ marginBottom: 32 }}>
            Tutti i competitor spingevano offerte. &ldquo;Noleggio a partire da...&rdquo;, &ldquo;Scopri le nostre offerte...&rdquo;. Il cliente si confondeva in un mare di proposte identiche. Serviva un angolo completamente diverso per emergere.
          </p>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* STRATEGIA */}
        <section className="s-section">
          <div className="s-eyebrow">La strategia</div>
          <h2 className="s-h2">Un angolo <em>differenziante</em></h2>

          {/* VS Block */}
          <div className="cs-vs-block">
            <div className="s-card" style={{ textAlign: "center" }}>
              <div className="s-metric-label" style={{ marginBottom: 12 }}>COMPETITOR</div>
              <p className="s-body" style={{ fontStyle: "italic", fontSize: 14 }}>
                &ldquo;Scopri le nostre offerte&rdquo;
              </p>
              <p className="s-body" style={{ marginTop: 8, color: "rgba(232,245,242,0.3)" }}>
                Stesso messaggio. Stessi risultati. CPL &euro;10+
              </p>
            </div>
            <div className="cs-vs-divider">vs</div>
            <div className="s-card-teal" style={{ textAlign: "center" }}>
              <div className="s-metric-label" style={{ marginBottom: 12 }}>IL NOSTRO ANGOLO</div>
              <p className="s-body" style={{ fontStyle: "italic", fontSize: 14, color: "var(--teal)" }}>
                &ldquo;Troviamo l&apos;auto giusta per te&rdquo;
              </p>
              <p className="s-body" style={{ marginTop: 8 }}>
                Consulenza, non vendita. CPL &euro;4,50
              </p>
            </div>
          </div>

          <div className="cs-strategy-grid">
            <div className="s-card">
              <h3 className="s-h3">Landing page ripensata</h3>
              <p className="s-body">
                Angolo differenziante: non &ldquo;ecco le offerte&rdquo; ma &ldquo;troviamo l&apos;auto giusta per te&rdquo;. Un approccio consulenziale che filtra i lead e attrae chi cerca davvero una soluzione.
              </p>
            </div>
            <div className="s-card">
              <h3 className="s-h3">10 creative full funnel</h3>
              <p className="s-body">
                Copertura di tutti i livelli di consapevolezza: perch&eacute; noleggiare vs comprare (con numeri reali), consulente umano vs agenzia, offerte specifiche per chi era gi&agrave; pronto.
              </p>
            </div>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* RISULTATI */}
        <section className="s-section">
          <div className="s-eyebrow">I risultati</div>
          <h2 className="s-h2">CPL abbattuto. <em>Qualit&agrave; su.</em></h2>

          <div className="cs-metrics-grid">
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">&euro;4,50</div>
              <div className="s-metric-label">CPL finale<br />da €25 iniziali</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">80%+</div>
              <div className="s-metric-label">Lead qualificati<br />pronti per il commerciale</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">-82%</div>
              <div className="s-metric-label">Riduzione CPL<br />rispetto alla partenza</div>
            </div>
          </div>

          {/* SVG CPL Drop Chart */}
          <div className="cs-cpl-wrap">
            <svg viewBox="0 0 400 220" width="100%" style={{ maxWidth: 440 }} aria-label="Grafico riduzione CPL da 25 a 4.50 euro">
              {/* Grid */}
              <line x1="60" y1="30" x2="60" y2="180" stroke="rgba(232,245,242,0.08)" strokeWidth="1" />
              <line x1="60" y1="180" x2="370" y2="180" stroke="rgba(232,245,242,0.08)" strokeWidth="1" />
              {/* Y labels */}
              <text x="54" y="40" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€25</text>
              <text x="54" y="82" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€15</text>
              <text x="54" y="120" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€10</text>
              <text x="54" y="170" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="end" fontFamily="monospace">€4,50</text>
              {/* Horizontal guides */}
              <line x1="60" y1="40" x2="370" y2="40" stroke="rgba(232,245,242,0.05)" strokeWidth="1" strokeDasharray="4" />
              <line x1="60" y1="120" x2="370" y2="120" stroke="rgba(255,100,100,0.15)" strokeWidth="1" strokeDasharray="4" />
              <text x="375" y="124" fill="rgba(255,100,100,0.4)" fontSize="8" fontFamily="monospace">Media competitor</text>
              {/* Bars */}
              <rect x="90" y="40" width="50" height="140" rx="4" fill="rgba(255,100,100,0.2)" stroke="rgba(255,100,100,0.3)" strokeWidth="1" />
              <text x="115" y="195" fill="rgba(232,245,242,0.4)" fontSize="9" textAnchor="middle" fontFamily="monospace">Partenza</text>
              <text x="115" y="35" fill="rgba(255,100,100,0.6)" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">€25</text>
              <rect x="185" y="120" width="50" height="60" rx="4" fill="rgba(232,245,242,0.08)" stroke="rgba(232,245,242,0.15)" strokeWidth="1" />
              <text x="210" y="195" fill="rgba(232,245,242,0.4)" fontSize="9" textAnchor="middle" fontFamily="monospace">Competitor</text>
              <text x="210" y="115" fill="rgba(232,245,242,0.4)" fontSize="10" textAnchor="middle" fontFamily="monospace">€10</text>
              <rect x="280" y="165" width="50" height="15" rx="4" fill="rgba(0,255,252,0.25)" stroke="var(--teal)" strokeWidth="1.5" />
              <text x="305" y="195" fill="var(--teal)" fontSize="9" textAnchor="middle" fontFamily="monospace">Risultato</text>
              <text x="305" y="160" fill="var(--teal)" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">€4,50</text>
            </svg>
          </div>
        </section>

        {/* QUOTE PLACEHOLDER */}
        <section className="s-section">
          <div className="s-quote">
            <p className="s-body" style={{ position: "relative", zIndex: 1, fontStyle: "italic" }}>
              &ldquo;Testimonianza del cliente in arrivo. Questo spazio &egrave; riservato per una citazione diretta sul progetto autonoleggio.&rdquo;
            </p>
            <p className="s-metric-label" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
              &mdash; Responsabile, Autonoleggio
            </p>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* CTA */}
        <section className="s-cta">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>Prossimo passo</div>
            <h2 className="s-h2">Il tuo CPL &egrave; troppo <em>alto</em>?</h2>
            <p className="s-subtitle" style={{ margin: "0 auto 32px", textAlign: "center" }}>
              Spesso non servono pi&ugrave; soldi. Serve un angolo diverso. Parliamone.
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
