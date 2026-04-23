import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Case Study: Pneumatici B2C | Nicola Serrao",
  description:
    "ROAS 16 con €200k+ di budget su 7 paesi. Come ho reso il digital marketing il primo canale worldwide per un luxury brand italiano.",
  openGraph: {
    title: "Case Study: Pneumatici B2C | Nicola Serrao",
    description:
      "ROAS 16 con €200k+ di budget su 7 paesi. Come ho reso il digital marketing il primo canale worldwide per un luxury brand italiano.",
    url: `${SITE.url}/cosa-ho-fatto/pneumatici`,
  },
};

export default function PneumaticiPage() {
  return (
    <>
      <style>{`
        .cs-hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
        .cs-context-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; margin-bottom: 32px; }
        .cs-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 32px 0; }
        .cs-strategy-points { display: flex; flex-direction: column; gap: 20px; margin: 32px 0; }
        .cs-cta-buttons { display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap; }
        .cs-gauge-wrap { margin: 40px 0; display: flex; justify-content: center; }
        .cs-countries { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0; }
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
          Pneumatici B2C<br /><em>ROAS 16 su 7 paesi</em>
        </h1>
        <div className="cs-hero-badges animate-fade-up delay-200">
          <span className="s-badge">Meta Ads Strategico</span>
          <span className="s-badge">4 anni</span>
          <span className="s-pill">Luxury Brand</span>
          <span className="s-pill">Internazionale</span>
        </div>

        <div className="s-divider" style={{ margin: "48px 0" }} />

        {/* CONTESTO */}
        <section className="s-section">
          <div className="s-eyebrow">Il contesto</div>
          <h2 className="s-h2">Un luxury brand italiano.<br /><em>Scala mondiale.</em></h2>
          <div className="cs-context-grid">
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>BUDGET</div>
              <div className="s-metric-value">&euro;200k+</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Ogni 6 mesi. Un investimento serio che richiedeva risultati altrettanto seri.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>MERCATI</div>
              <div className="s-metric-value">7 paesi</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Campagne multi-paese con creativit&agrave; e messaggi adattati per ogni mercato.
              </p>
            </div>
            <div className="s-card">
              <div className="s-metric-label" style={{ marginBottom: 8 }}>DURATA</div>
              <div className="s-metric-value">4 anni</div>
              <p className="s-body" style={{ marginTop: 12 }}>
                Una collaborazione di lungo termine che ha trasformato il rapporto del brand con il digital.
              </p>
            </div>
          </div>
          <div className="cs-countries">
            <span className="s-pill">Italia</span>
            <span className="s-pill">Francia</span>
            <span className="s-pill">Germania</span>
            <span className="s-pill">Spagna</span>
            <span className="s-pill">UK</span>
            <span className="s-pill">USA</span>
            <span className="s-pill">Giappone</span>
          </div>
        </section>

        {/* PROBLEMA */}
        <section className="s-section">
          <div className="s-eyebrow">La situazione</div>
          <h2 className="s-h2">Prima del 2022:<br /><em>nessuna fiducia nel digital</em></h2>
          <p className="s-subtitle" style={{ marginBottom: 32 }}>
            Un brand con una storia e un prodotto straordinari, ma che non aveva mai creduto nel digital marketing come canale di acquisizione. Le campagne precedenti erano state complicate, sovra-ingegnerizzate e con risultati mediocri. Serviva un approccio diverso.
          </p>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* STRATEGIA */}
        <section className="s-section">
          <div className="s-eyebrow">La strategia</div>
          <h2 className="s-h2">Semplificare, non <em>complicare</em></h2>

          <div className="cs-strategy-points">
            <div className="s-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
              <div className="s-metric-value" style={{ fontSize: 24, opacity: 0.4 }}>01</div>
              <div>
                <h3 className="s-h3" style={{ marginBottom: 8 }}>Sfruttare il brand</h3>
                <p className="s-body">
                  Il brand aveva gi&agrave; un posizionamento luxury riconosciuto. Invece di costruire awareness da zero, ho sfruttato il valore del marchio come leva principale nelle campagne. Il brand era il messaggio.
                </p>
              </div>
            </div>
            <div className="s-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
              <div className="s-metric-value" style={{ fontSize: 24, opacity: 0.4 }}>02</div>
              <div>
                <h3 className="s-h3" style={{ marginBottom: 8 }}>Collezioni stagionali</h3>
                <p className="s-body">
                  Allineamento delle campagne con i lanci stagionali del brand. Ogni collezione diventava un momento di acquisizione con creativit&agrave; dedicata, senza dover inventare angoli artificiali.
                </p>
              </div>
            </div>
            <div className="s-card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
              <div className="s-metric-value" style={{ fontSize: 24, opacity: 0.4 }}>03</div>
              <div>
                <h3 className="s-h3" style={{ marginBottom: 8 }}>Senza sovra-complicare</h3>
                <p className="s-body">
                  Struttura campagne pulita, audience ampie, budget allocato sui mercati che performavano. Nessuna sovra-segmentazione, nessun funnel a 12 step. Semplicit&agrave; esecutiva con rigore strategico.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* RISULTATI */}
        <section className="s-section">
          <div className="s-eyebrow">I risultati</div>
          <h2 className="s-h2">Digital marketing:<br /><em>primo canale worldwide</em></h2>

          <div className="cs-metrics-grid">
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">ROAS 16</div>
              <div className="s-metric-label">Return on<br />Ad Spend</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">7</div>
              <div className="s-metric-label">Paesi<br />coperti</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">4 anni</div>
              <div className="s-metric-label">Di collaborazione<br />continuativa</div>
            </div>
            <div className="s-card-teal" style={{ textAlign: "center", padding: "32px 20px" }}>
              <div className="s-metric-value">#1</div>
              <div className="s-metric-label">Canale di acquisizione<br />worldwide</div>
            </div>
          </div>

          {/* SVG ROAS Gauge */}
          <div className="cs-gauge-wrap">
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 340 }} aria-label="ROAS gauge: 16x return">
              <defs>
                <linearGradient id="pn-gauge-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,100,100,0.4)" />
                  <stop offset="40%" stopColor="rgba(255,200,100,0.4)" />
                  <stop offset="70%" stopColor="rgba(0,255,252,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,255,252,0.6)" />
                </linearGradient>
              </defs>
              {/* Background arc */}
              <path d="M 40 160 A 110 110 0 0 1 260 160" fill="none" stroke="rgba(232,245,242,0.06)" strokeWidth="20" strokeLinecap="round" />
              {/* Filled arc — ~85% of semicircle for ROAS 16 */}
              <path d="M 40 160 A 110 110 0 0 1 252 128" fill="none" stroke="url(#pn-gauge-grad)" strokeWidth="20" strokeLinecap="round" />
              {/* Needle endpoint */}
              <circle cx="252" cy="128" r="6" fill="var(--teal)" />
              {/* Labels */}
              <text x="40" y="180" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">0x</text>
              <text x="150" y="60" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">10x</text>
              <text x="260" y="180" fill="rgba(232,245,242,0.3)" fontSize="9" textAnchor="middle" fontFamily="monospace">20x</text>
              {/* Center value */}
              <text x="150" y="130" fill="var(--teal)" fontSize="36" textAnchor="middle" fontWeight="bold" fontFamily="'Playfair Display', serif">16x</text>
              <text x="150" y="150" fill="rgba(232,245,242,0.4)" fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="2">ROAS</text>
            </svg>
          </div>
        </section>

        {/* QUOTE PLACEHOLDER */}
        <section className="s-section">
          <div className="s-quote">
            <p className="s-body" style={{ position: "relative", zIndex: 1, fontStyle: "italic" }}>
              &ldquo;Testimonianza del cliente in arrivo. Questo spazio &egrave; riservato per una citazione diretta dal team del brand.&rdquo;
            </p>
            <p className="s-metric-label" style={{ marginTop: 12, position: "relative", zIndex: 1 }}>
              &mdash; Marketing Director, Luxury Brand
            </p>
          </div>
        </section>

        <div className="s-divider" style={{ margin: "0 0 80px" }} />

        {/* CTA */}
        <section className="s-cta">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="s-eyebrow" style={{ justifyContent: "center" }}>Prossimo passo</div>
            <h2 className="s-h2">Hai un brand da <em>scalare</em>?</h2>
            <p className="s-subtitle" style={{ margin: "0 auto 32px", textAlign: "center" }}>
              Se hai un brand forte e un budget serio, possiamo fare cose importanti. La complessit&agrave; non &egrave; sinonimo di efficacia.
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
