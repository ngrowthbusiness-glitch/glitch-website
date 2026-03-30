import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Metodo GLITCH",
  description:
    "Il Metodo GLITCH: un framework strutturato per far crescere il tuo business online con metodo, misura e onest\u00e0.",
  openGraph: {
    title: "Metodo GLITCH \u2013 Nicola Serrao",
    description:
      "Il Metodo GLITCH: un framework strutturato per far crescere il tuo business online con metodo, misura e onest\u00e0.",
    url: `${SITE.url}/metodo-glitch`,
  },
};

const STEPS = [
  {
    letter: "G",
    phase: "Fase 1",
    name: "Grounding",
    subtitle: "Piedi a terra",
    description:
      "Prima di qualsiasi strategia, analizo la situazione reale: com\u0027\u00e8 strutturato il business oggi, dove si trovano i rischi, com\u0027\u00e8 la solidit\u00e0 finanziaria. Non parto mai da slide ottimiste \u2014 parto dai dati. Capire dove sei davvero \u00e8 l\u0027unico modo per decidere dove andare.",
  },
  {
    letter: "L",
    phase: "Fase 2",
    name: "Loops",
    subtitle: "Feedback e tracciamento scientifico",
    description:
      "Installo i sistemi di ascolto: analytics, tracciamento delle conversioni, feedback loops su ogni touchpoint. Se non misuri, non puoi migliorare. In questa fase costruiamo gli occhi del progetto \u2014 quelli che ti diranno la verit\u00e0 anche quando non la vuoi sentire.",
  },
  {
    letter: "I",
    phase: "Fase 3",
    name: "Insight",
    subtitle: "Strategia, messaggio, direzione",
    description:
      "Con i dati in mano, definiamo la strategia: il messaggio differenziante, il posizionamento, i KPI target reali \u2014 non numeri fantasia. \u00c8 la fase in cui si decide cosa dire, a chi dirlo e come farlo nel modo pi\u00f9 efficace possibile.",
  },
  {
    letter: "T",
    phase: "Fase 4",
    name: "Testing",
    subtitle: "Velocit\u00e0 di validazione",
    description:
      "Le ipotesi non si discutono \u2014 si testano. Con budget controllato e creativit\u00e0 iterativa, portiamo il messaggio sul mercato e osserviamo cosa succede davvero. Niente campagne da centomila euro prima di sapere cosa funziona.",
  },
  {
    letter: "C",
    phase: "Fase 5",
    name: "Calibration",
    subtitle: "Correzione rapida di rotta",
    description:
      "I dati parlano. Noi ascoltiamo. Se qualcosa non combacia con gli obiettivi, correggiamo subito \u2014 senza aspettare la fine del mese o la riunione di revisione trimestrale. La velocit\u00e0 di risposta \u00e8 uno dei vantaggi competitivi pi\u00f9 sottovalutati nel digital marketing.",
  },
  {
    letter: "H",
    phase: "Fase 6",
    name: "Harvest",
    subtitle: "Il Raccolto",
    description:
      "Quando i test confermano ci\u00f2 che funziona, si scala. Budget, creativit\u00e0, canali \u2014 tutto viene amplificato in modo sostenibile. \u00c8 qui che il lavoro delle fasi precedenti si trasforma in fatturato reale e crescita misurabile.",
  },
] as const;

export default function MetodoGlitchPage() {
  return (
    <>
      <style>{`
        /* ── HERO ── */
        .mg-hero-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 20px;
          animation: fadeUp 0.5s ease both;
        }

        .mg-hero-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 700; line-height: 1.05;
          color: var(--text); margin-bottom: 24px;
          animation: fadeUp 0.6s ease both; animation-delay: 0.1s;
        }

        .mg-hero-title .letter {
          color: var(--teal);
          font-style: italic;
        }

        .mg-hero-sub {
          font-size: 13px; font-weight: 300;
          color: var(--text-dim); line-height: 1.9;
          max-width: 580px; margin-bottom: 72px;
          animation: fadeUp 0.6s ease both; animation-delay: 0.2s;
        }

        /* ── STEPS ── */
        .mg-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 80px;
          animation: fadeUp 0.7s ease both; animation-delay: 0.3s;
        }

        .mg-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0;
          position: relative;
        }

        /* Vertical connecting line */
        .mg-step:not(:last-child) .mg-step-line {
          position: absolute;
          left: 39px;
          top: 64px;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--teal-border), transparent);
          z-index: 0;
        }

        .mg-step-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 8px;
          position: relative;
          z-index: 1;
        }

        .mg-step-letter-wrap {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 1px solid var(--teal-border);
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          position: relative;
          transition: border-color 0.3s, background 0.3s;
          flex-shrink: 0;
        }

        .mg-step:hover .mg-step-letter-wrap {
          border-color: var(--teal);
          background: var(--teal-dim);
        }

        .mg-step-letter {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 26px; font-weight: 700;
          color: var(--teal);
          line-height: 1;
        }

        .mg-step-right {
          padding: 4px 0 52px 32px;
        }

        .mg-step:last-child .mg-step-right {
          padding-bottom: 0;
        }

        .mg-step-keyword {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 8px;
          opacity: 0.7;
        }

        .mg-step-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700; color: var(--text);
          margin-bottom: 12px; line-height: 1.2;
        }

        .mg-step-title em {
          font-style: italic;
          color: var(--text-dim);
          font-size: 0.75em;
          display: block;
          margin-top: 4px;
        }

        .mg-step-desc {
          font-size: 12px; font-weight: 300;
          color: var(--text-dim); line-height: 1.85;
          max-width: 600px;
        }

        /* ── DIVIDER ── */
        .mg-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, var(--teal-border) 0%, transparent 80%);
          margin: 56px 0;
        }

        /* ── TRUTH BLOCK ── */
        .mg-truth-block {
          border: 1px solid var(--teal-border);
          border-radius: 10px;
          padding: 40px 44px;
          background: var(--teal-dim);
          position: relative; overflow: hidden;
          margin-bottom: 56px;
        }
        .mg-truth-block::before {
          content: '\\201C';
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 160px; color: rgba(0,255,252,0.06);
          position: absolute; top: -20px; left: 20px;
          line-height: 1; pointer-events: none;
        }
        .mg-truth-text {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-style: italic; font-size: clamp(16px, 2vw, 20px);
          line-height: 1.65; color: var(--text);
          position: relative; z-index: 1; max-width: 700px;
        }
        .mg-truth-text strong { color: var(--teal); font-style: normal; }

        /* ── CTA ── */
        .mg-cta-section {
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px;
        }
        .mg-cta-text h3 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700; color: var(--text); margin-bottom: 10px;
        }
        .mg-cta-text p { font-size: 11px; font-weight: 300; color: var(--text-dim); line-height: 1.8; }
        .mg-cta-buttons { display: flex; gap: 14px; flex-shrink: 0; }

        .mg-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: #0a0e0d;
          font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 10px;
          font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 24px; border-radius: 5px; text-decoration: none;
          transition: opacity 0.2s, transform 0.2s; white-space: nowrap;
        }
        .mg-btn-primary:hover { opacity: 0.85; transform: translateY(-2px); }

        .mg-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--teal);
          font-family: var(--font-dm-mono), 'DM Mono', monospace; font-size: 10px;
          font-weight: 400; letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 24px; border-radius: 5px;
          border: 1px solid var(--teal-border); text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s; white-space: nowrap;
        }
        .mg-btn-secondary:hover { background: var(--teal-dim); border-color: var(--teal); transform: translateY(-2px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .mg-page { padding: calc(var(--nav-h) + 48px) 32px 60px !important; }
          .mg-step { grid-template-columns: 60px 1fr; }
          .mg-step:not(:last-child) .mg-step-line { left: 29px; }
          .mg-step-letter-wrap { width: 46px; height: 46px; }
          .mg-step-letter { font-size: 20px; }
          .mg-step-right { padding: 2px 0 40px 24px; }
          .mg-cta-section { flex-direction: column; align-items: flex-start; }
          .mg-cta-buttons { flex-wrap: wrap; }
          .mg-truth-block { padding: 28px 28px; }
        }

        @media (max-width: 480px) {
          .mg-page { padding: calc(var(--nav-h) + 36px) 20px 48px !important; }
          .mg-cta-buttons { flex-direction: column; width: 100%; }
          .mg-btn-primary, .mg-btn-secondary { justify-content: center; }
          .mg-truth-block { padding: 24px 20px; }
          .mg-step-right { padding-left: 16px; }
        }
      `}</style>

      <div
        className="mg-page"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "calc(var(--nav-h) + 80px) 60px 80px",
        }}
      >
        <div className="mg-hero-eyebrow">Il mio approccio</div>
        <h1 className="mg-hero-title">
          Metodo{" "}
          <span className="letter">G</span>
          <span className="letter">L</span>
          <span className="letter">I</span>
          <span className="letter">T</span>
          <span className="letter">C</span>
          <span className="letter">H</span>
        </h1>
        <p className="mg-hero-sub">
          Non esiste una formula magica per far crescere un business.<br />
          Esiste per&ograve; un metodo: strutturato, misurabile, onesto.<br />
          Sei lettere che rappresentano il modo in cui lavoro &mdash; con ogni azienda, senza eccezioni.
        </p>

        {/* STEPS */}
        <div className="mg-steps">
          {STEPS.map((step, i) => (
            <div key={step.letter} className="mg-step">
              {i < STEPS.length - 1 && <div className="mg-step-line" />}
              <div className="mg-step-left">
                <div className="mg-step-letter-wrap">
                  <span className="mg-step-letter">{step.letter}</span>
                </div>
              </div>
              <div className="mg-step-right">
                <div className="mg-step-keyword">{step.phase}</div>
                <div className="mg-step-title">
                  {step.name}
                  <em>{step.subtitle}</em>
                </div>
                <p className="mg-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mg-truth-block">
          <p className="mg-truth-text">
            &ldquo;Il metodo non &egrave; una gabbia &mdash; &egrave; una bussola. Ogni azienda &egrave; diversa, ogni mercato &egrave; diverso. Ma{" "}
            <strong>lavorare senza metodo &egrave; solo improvvisazione ben pagata.</strong>&rdquo;
          </p>
        </div>

        <div className="mg-divider" />

        {/* CTA */}
        <div className="mg-cta-section">
          <div className="mg-cta-text">
            <h3>Vuoi applicarlo al tuo business?</h3>
            <p>
              Iniziamo con una chiacchierata gratuita.<br />
              Ti spiego come adatto il metodo alla tua realt&agrave;.
            </p>
          </div>
          <div className="mg-cta-buttons">
            <a href={SITE.whatsapp} className="mg-btn-primary" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Parliamoci
            </a>
            <a href="/cosa-posso-fare" className="mg-btn-secondary">
              Cosa posso fare &rarr;
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
