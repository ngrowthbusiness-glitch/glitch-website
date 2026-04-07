"use client";

import { useState } from "react";

export default function NetImpiantiForm() {
  const [expanded, setExpanded] = useState(false);

  return (
    <form className="ni-form" onSubmit={(e) => e.preventDefault()}>
      <div className="ni-form-grid">
        <div className="ni-field">
          <label className="ni-label">Nome e cognome *</label>
          <input type="text" className="ni-input" placeholder="Mario Rossi" />
        </div>
        <div className="ni-field">
          <label className="ni-label">Telefono *</label>
          <input type="tel" className="ni-input" placeholder="+39 071 ..." />
        </div>
        <div className="ni-field ni-field-full">
          <label className="ni-label">Email *</label>
          <input type="email" className="ni-input" placeholder="info@azienda.it" />
        </div>
        <div className="ni-field ni-field-full">
          <label className="ni-label">Descrivi brevemente il progetto</label>
          <textarea className="ni-textarea" rows={3} placeholder="Di cosa hai bisogno?" />
        </div>
      </div>

      {/* Accordion per info aggiuntive */}
      <button
        type="button"
        className={`ni-accordion-toggle ${expanded ? "ni-accordion-open" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <span>Vuoi dare maggiori informazioni per una risposta pi&ugrave; dettagliata?</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="ni-accordion-icon"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="ni-accordion-body">
          <div className="ni-form-grid">
            <div className="ni-field">
              <label className="ni-label">Tipo di cliente</label>
              <select className="ni-select">
                <option value="">Seleziona...</option>
                <option value="azienda">Azienda</option>
                <option value="privato">Privato</option>
                <option value="ente">Ente pubblico</option>
                <option value="professionista">Professionista</option>
              </select>
            </div>
            <div className="ni-field">
              <label className="ni-label">Tipo di lavoro</label>
              <select className="ni-select">
                <option value="">Seleziona...</option>
                <option value="civile">Impianto civile</option>
                <option value="industriale">Impianto industriale</option>
                <option value="telecom">Telecomunicazioni</option>
                <option value="manutenzione">Manutenzione</option>
                <option value="rinnovabili">Energie rinnovabili</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div className="ni-field">
              <label className="ni-label">Fase del progetto</label>
              <select className="ni-select">
                <option value="">Seleziona...</option>
                <option value="idea">Sto valutando</option>
                <option value="preventivo">Ho bisogno di un preventivo</option>
                <option value="progetto">Progetto in corso</option>
                <option value="urgente">Intervento urgente</option>
              </select>
            </div>
            <div className="ni-field">
              <label className="ni-label">Budget indicativo</label>
              <select className="ni-select">
                <option value="">Seleziona...</option>
                <option value="small">&lt; 10.000 &euro;</option>
                <option value="medium">10.000 — 50.000 &euro;</option>
                <option value="large">50.000 — 200.000 &euro;</option>
                <option value="xlarge">&gt; 200.000 &euro;</option>
              </select>
            </div>
            <div className="ni-field ni-field-full">
              <label className="ni-label">Nome azienda / Ragione sociale</label>
              <input type="text" className="ni-input" placeholder="Es. Costruzioni Adriatica S.r.l." />
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="ni-submit">
        Richiedi Preventivo Gratuito
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
