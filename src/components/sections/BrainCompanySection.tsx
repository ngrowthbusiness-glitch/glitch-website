"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export default function BrainCompanySection() {
  const [open, setOpen] = useState(false);

  // ESC chiude il modal + lock dello scroll quando aperto
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════
           BRAIN COMPANY — Hero split
        ═══════════════════════════════════ */
        .bc-section {
          position: relative;
          background: #0a0e0d;
          border-top: 1px solid rgba(0,255,252,0.08);
          border-bottom: 1px solid rgba(0,255,252,0.08);
          padding: 120px 0;
          margin-bottom: 120px;
          overflow: hidden;
        }

        /* Immagine: contenuta nella colonna destra del grid, centrata.
           SVG wrapper con filter feColorMatrix per killare lo sfondo bianco del PNG. */
        .bc-image-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
          aspect-ratio: 5 / 4;
          margin: 0 auto;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 40px rgba(0,255,252,0.2));
        }
        .bc-image-wrap svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .bc-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 80px;
          align-items: center;
          min-height: 620px;
          position: relative;
          z-index: 2;
        }
        .bc-content {
          display: flex;
          flex-direction: column;
          gap: 28px;
          grid-column: 1;
        }

        .bc-eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 500;
        }
        .bc-eyebrow::before {
          content: "";
          width: 22px; height: 1px;
          background: var(--teal); opacity: 0.55;
        }

        .bc-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(46px, 6vw, 76px);
          font-weight: 700;
          line-height: 1;
          color: var(--text);
          margin: 0;
        }
        .bc-title-dot { color: var(--teal); }

        .bc-sub-primary {
          font-size: clamp(16px, 1.7vw, 19px);
          color: var(--text);
          font-weight: 500;
          line-height: 1.5;
          max-width: 560px;
          margin: 0;
        }
        .bc-sub-secondary {
          font-size: 14px;
          color: var(--text);
          line-height: 1.7;
          max-width: 540px;
          margin: 0;
          opacity: 0.85;
        }

        .bc-pillars {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
        }
        .bc-pillar {
          border: 1px solid rgba(0,255,252,0.18);
          border-radius: 10px;
          padding: 22px 24px;
          background: rgba(0,255,252,0.03);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          max-width: 540px;
        }
        .bc-pillar:hover {
          border-color: rgba(0,255,252,0.45);
          background: rgba(0,255,252,0.07);
          transform: translateY(-2px);
        }
        .bc-pillar-header {
          display: flex; gap: 14px; align-items: center;
        }
        .bc-pillar-icon {
          width: 42px; height: 42px;
          border-radius: 8px;
          background: rgba(0,255,252,0.1);
          border: 1px solid rgba(0,255,252,0.3);
          display: flex; align-items: center; justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }
        .bc-pillar-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.25;
          flex: 1;
        }
        .bc-pillar-body {
          font-size: 13.5px;
          color: var(--text);
          line-height: 1.6;
        }
        .bc-pillar-out {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          margin-top: 2px;
          font-weight: 500;
          padding-top: 10px;
          border-top: 1px solid rgba(0,255,252,0.12);
        }

        .bc-cta-wrap {
          display: flex; flex-direction: column; gap: 10px;
          margin-top: 8px;
        }
        .bc-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: var(--teal);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 16px 28px;
          border-radius: 5px;
          border: 1px solid var(--teal-border);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, gap 0.2s;
          width: fit-content;
        }
        .bc-cta:hover {
          background: var(--teal-dim);
          border-color: var(--teal);
          transform: translateY(-2px);
          gap: 14px;
        }
        .bc-cta svg { transition: transform 0.2s; }
        .bc-cta-microcopy {
          font-size: 12px;
          color: var(--text);
          line-height: 1.55;
          max-width: 420px;
        }
        .bc-cta-microcopy strong { color: var(--teal); font-weight: 500; }

        .bc-note {
          font-size: 12px;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 540px;
          border-top: 1px solid rgba(0,255,252,0.12);
          padding-top: 20px;
          margin-top: 12px;
        }

        /* ═══════════════════════════════════
           MODAL — Tutte le aree di utilizzo
        ═══════════════════════════════════ */
        .bc-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,14,13,0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: calc(var(--nav-h) + 32px) 24px 32px;
          overflow-y: auto;
          animation: bc-fade-in 0.25s ease;
        }
        @keyframes bc-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bc-modal-card {
          background: #0a0e0d;
          border: 1px solid rgba(0,255,252,0.3);
          border-radius: 14px;
          padding: 56px;
          max-width: 1100px;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 0 80px rgba(0,255,252,0.15);
          animation: bc-slide-up 0.3s ease;
        }
        @keyframes bc-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bc-modal-close {
          position: absolute; top: 20px; right: 20px;
          background: transparent;
          border: 1px solid rgba(232,245,242,0.1);
          color: var(--text-dim);
          cursor: pointer;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .bc-modal-close:hover {
          color: var(--teal);
          border-color: var(--teal);
          background: var(--teal-dim);
        }

        .bc-modal-eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
          font-weight: 500;
        }
        .bc-modal-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 14px;
          line-height: 1.15;
        }
        .bc-modal-sub {
          font-size: 14px;
          color: var(--text);
          line-height: 1.7;
          max-width: 720px;
          margin: 0 0 36px;
        }

        .bc-modal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .bc-area-wide { grid-column: 1 / -1; }
        .bc-area {
          border: 1px solid rgba(0,255,252,0.2);
          border-radius: 10px;
          padding: 28px 26px;
          background: rgba(0,255,252,0.03);
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .bc-area:hover {
          border-color: rgba(0,255,252,0.5);
          background: rgba(0,255,252,0.07);
          transform: translateY(-2px);
        }
        .bc-area-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 19px;
          font-weight: 700;
          color: var(--teal);
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .bc-area-list {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .bc-area-list li {
          font-size: 13.5px;
          color: var(--text);
          padding-left: 22px;
          position: relative;
          line-height: 1.55;
        }
        .bc-area-list li::before {
          content: "";
          position: absolute;
          left: 0; top: 8px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 8px rgba(0,255,252,0.5);
        }

        .bc-modal-cta-row {
          display: flex;
          justify-content: center;
          margin-top: 36px;
          padding-top: 28px;
          border-top: 1px solid rgba(0,255,252,0.12);
        }

        /* ═══════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 1100px) {
          .bc-grid { gap: 48px; }
          .bc-image-wrap { width: 52%; right: -8%; }
        }
        /* ═══════════════════════════════════
           MOBILE — Brain Company custom
           Stack verticale, tutto centrato, immagine piccola decorativa,
           pilastri stack (no slider), CTA centrata
        ═══════════════════════════════════ */
        @media (max-width: 900px) {
          .bc-section {
            padding: 64px 0 72px;
            margin-bottom: 60px;
            overflow: hidden;
            position: relative;
            background:
              radial-gradient(circle at 50% 0%, rgba(0,255,252,0.10), transparent 55%),
              radial-gradient(circle at 50% 100%, rgba(0,255,252,0.06), transparent 55%),
              radial-gradient(circle at 1px 1px, rgba(0,255,252,0.14) 1px, transparent 0),
              #0a0e0d;
            background-size: 100% 100%, 100% 100%, 26px 26px, 100% 100%;
          }
          /* Linee accent verticali tech (decorative) */
          .bc-section::before,
          .bc-section::after {
            content: "";
            position: absolute;
            top: 10%; bottom: 10%;
            width: 1px;
            background: linear-gradient(180deg, transparent, rgba(0,255,252,0.3), transparent);
            pointer-events: none;
            z-index: 1;
          }
          .bc-section::before { left: 16px; }
          .bc-section::after  { right: 16px; }
          .bc-grid {
            display: flex;
            flex-direction: column;
            grid-template-columns: none;
            gap: 0;
            min-height: auto;
            align-items: center;
            text-align: center;
          }
          .bc-content {
            grid-column: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 18px;
            width: 100%;
            max-width: 540px;
            margin: 0 auto;
          }
          /* Immagine: NASCOSTA su mobile (sostituita da texture background tech) */
          .bc-image-wrap,
          .bc-image-fade,
          .bc-image-fade-right { display: none !important; }

          .bc-eyebrow {
            justify-content: center;
            font-size: 10px;
          }
          .bc-title {
            font-size: clamp(36px, 9vw, 48px);
            text-align: center;
            line-height: 1;
          }
          .bc-sub-primary {
            font-size: 16px;
            text-align: center;
            max-width: 100%;
            line-height: 1.5;
          }
          .bc-sub-secondary {
            text-align: center;
            max-width: 100%;
            font-size: 13.5px;
          }

          /* Pilastri: stack verticale pulito (NO slider, sono solo 3) */
          .bc-pillars {
            display: flex;
            flex-direction: column;
            overflow: visible;
            gap: 12px;
            width: 100%;
            margin: 4px 0;
            padding: 0;
          }
          .bc-pillar {
            flex: none;
            width: 100%;
            max-width: 100%;
            text-align: left;
            padding: 22px 22px;
            min-width: 0;
          }
          .bc-pillar-header { gap: 12px; }
          .bc-pillar-icon { width: 38px; height: 38px; }
          .bc-pillar-title { font-size: 16px; }
          .bc-pillar-body { font-size: 13.5px; }
          .bc-pillar-out { font-size: 10.5px; }

          .bc-cta-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
            margin-top: 12px;
          }
          .bc-cta {
            font-size: 12px;
            padding: 14px 24px;
          }
          .bc-cta-microcopy {
            text-align: center;
            max-width: 100%;
            font-size: 12px;
          }
          .bc-note {
            text-align: center;
            max-width: 100%;
            font-size: 12px;
          }

          /* Modal */
          .bc-modal-card { padding: 44px 28px; }
          .bc-modal-grid { grid-template-columns: 1fr; }
          .bc-area-wide { grid-column: 1; }
        }
        @media (max-width: 480px) {
          .bc-section { padding: 56px 0 64px; }
          .bc-title { font-size: clamp(32px, 9vw, 42px); }
          .bc-sub-primary { font-size: 15px; }
          .bc-pillar { padding: 20px 18px; }
          .bc-pillar-title { font-size: 15.5px; }
          .bc-modal-card { padding: 32px 18px; }
          .bc-modal-close { top: 12px; right: 12px; width: 32px; height: 32px; }
          .bc-area { padding: 20px 18px; }
          .bc-area-list li { font-size: 12.5px; }
        }
      `}</style>

      <section className="bc-section">
        <div className="hp-wrap">
          <div className="bc-grid">
            <div className="bc-content">
              <div className="bc-eyebrow">Powered by Anthropic Claude</div>

              <h1 className="bc-title">
                Brain Company<span className="bc-title-dot">.</span>
              </h1>

              <p className="bc-sub-primary">
                Le mie competenze di marketing fuse con l&apos;AI pi&ugrave; avanzata al mondo.
              </p>

              <div className="bc-pillars">
                <div className="bc-pillar">
                  <div className="bc-pillar-header">
                    <div className="bc-pillar-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
                        <circle cx="13" cy="10" r="0.8" fill="currentColor"/>
                        <circle cx="17" cy="10" r="0.8" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="bc-pillar-title">Conversazioni che chiudono.</div>
                  </div>
                  <div className="bc-pillar-body">
                    Un agente AI parla con i tuoi lead in tempo reale &mdash; qualifica, segue, fissa l&apos;appuntamento. Spesso meglio del customer care medio.
                  </div>
                  <div className="bc-pillar-out">&rarr; + appuntamenti, + chiusure, &minus; lead persi</div>
                </div>

                <div className="bc-pillar">
                  <div className="bc-pillar-header">
                    <div className="bc-pillar-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18"/>
                        <path d="M7 14l4-4 4 4 5-6"/>
                        <circle cx="11" cy="10" r="1.2" fill="currentColor"/>
                        <circle cx="15" cy="14" r="1.2" fill="currentColor"/>
                        <circle cx="20" cy="8" r="1.2" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="bc-pillar-title">Tutti i numeri in un posto.</div>
                  </div>
                  <div className="bc-pillar-body">
                    Brand, campagne, analytics, CRM, vendite. Brain Company li integra e ti d&agrave; il quadro quando serve &mdash; ora, non domani.
                  </div>
                  <div className="bc-pillar-out">&rarr; Decisioni in tempo reale, su dati reali</div>
                </div>

                <div className="bc-pillar">
                  <div className="bc-pillar-header">
                    <div className="bc-pillar-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    </div>
                    <div className="bc-pillar-title">Un team in una persona.</div>
                  </div>
                  <div className="bc-pillar-body">
                    Il marketing serio richiede un senior con due junior. Con Brain Company faccio quel lavoro da solo &mdash; qualit&agrave; senior, costo Fractional.
                  </div>
                  <div className="bc-pillar-out">&rarr; Output da team, costo da freelance</div>
                </div>
              </div>

              <div className="bc-cta-wrap">
                <button className="bc-cta" onClick={() => setOpen(true)} type="button">
                  Tutte le aree di utilizzo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="bc-cta-microcopy">
                  Oppure <strong>scrivimi per saperne di pi&ugrave;</strong>: ti spiego come potrebbe funzionare per te &mdash; senza pitch.
                </div>
              </div>

              <div className="bc-note">
                Brain Company &egrave; incluso nel servizio Fractional CMO. Non &egrave; un upsell &mdash; &egrave; il modo in cui lavoro.
              </div>
            </div>

            {/* Colonna destra: immagine cervello (PNG con sfondo già trasparente) */}
            <div className="bc-image-wrap">
              <Image
                src="/images/Brain Company full.png"
                alt="Brain Company — cervello AI stilizzato"
                width={1000}
                height={800}
                priority={false}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODAL: tutte le aree di utilizzo ─── */}
      {open && (
        <div
          className="bc-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="bc-modal-card">
            <button
              className="bc-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="bc-modal-eyebrow">Brain Company</div>
            <h3 className="bc-modal-title">Tutte le aree di utilizzo</h3>
            <p className="bc-modal-sub">
              Cinque aree, una sola direzione: che il marketing del tuo business funzioni meglio, pi&ugrave; in fretta, con meno errori. Tutto orchestrato da un unico cervello digitale costruito sul tuo business.
            </p>

            <div className="bc-modal-grid">
              <div className="bc-area">
                <div className="bc-area-title">Customer Acquisition</div>
                <ul className="bc-area-list">
                  <li>Outbound: identificazione e contatto prospect ideali</li>
                  <li>Agente AI conversazionale per qualificare i lead</li>
                  <li>Appointment setting automatizzato</li>
                  <li>Sequenze di nurturing personalizzate</li>
                </ul>
              </div>

              <div className="bc-area">
                <div className="bc-area-title">Business Intelligence</div>
                <ul className="bc-area-list">
                  <li>Integrazione dati: CRM, GA4, Meta Ads, Shopify</li>
                  <li>Dashboard in tempo reale</li>
                  <li>Forecasting e scenario planning</li>
                  <li>Anomaly detection sui KPI</li>
                </ul>
              </div>

              <div className="bc-area">
                <div className="bc-area-title">Marketing Operations</div>
                <ul className="bc-area-list">
                  <li>Lancio e gestione campagne ADV</li>
                  <li>A/B test setup e analisi statistica</li>
                  <li>Generazione copy con review umano</li>
                  <li>Reporting automatico settimanale</li>
                </ul>
              </div>

              <div className="bc-area">
                <div className="bc-area-title">Strategic Intelligence</div>
                <ul className="bc-area-list">
                  <li>Competitor monitoring continuo</li>
                  <li>Market trend detection</li>
                  <li>Customer journey mapping</li>
                  <li>ROI optimization per canale</li>
                </ul>
              </div>

              <div className="bc-area bc-area-wide">
                <div className="bc-area-title">Knowledge Management</div>
                <ul className="bc-area-list">
                  <li>Brand context: valori, target, posizionamento, tone of voice</li>
                  <li>Storico decisioni: cosa &egrave; stato fatto, cosa ha funzionato e perch&eacute;</li>
                  <li>Single source of truth (no email perse, no Drive sparsi)</li>
                  <li>Sempre aggiornato, sempre disponibile &mdash; anche fuori dall&apos;orario di lavoro</li>
                </ul>
              </div>
            </div>

            <div className="bc-modal-cta-row">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="s-btn-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.122 1.529 5.855L0 24l6.335-1.502A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.662-.523-5.172-1.432l-.371-.22-3.762.892.946-3.653-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Scrivimi per saperne di pi&ugrave;
                </a>
                <div style={{ fontSize: "12px", color: "var(--text)", lineHeight: 1.55, textAlign: "center", maxWidth: "440px" }}>
                  Niente vendita. Solo capire se ha senso costruirlo nel tuo caso.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
