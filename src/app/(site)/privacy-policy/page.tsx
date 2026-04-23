import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy & Cookie Policy — ${SITE.name}`,
  robots: { index: false, follow: true },
  openGraph: {
    title: `Privacy & Cookie Policy — ${SITE.name}`,
    url: `${SITE.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const today = new Date();
  const updated = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pp-wrapper {
  position: relative; z-index: 1;
  max-width: 760px;
}
.pp-wrapper .page-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--teal); border: 1px solid var(--teal-border);
  padding: 5px 12px; border-radius: 3px; background: var(--teal-dim);
  margin-bottom: 24px;
}
.pp-wrapper .page-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700; line-height: 1.1;
  margin-bottom: 12px;
}
.pp-wrapper .page-title em { font-style: italic; color: var(--teal); }
.pp-wrapper .page-updated {
  font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--text-faint); margin-bottom: 56px; display: block;
}
.pp-wrapper .section-divider {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, var(--teal-border), transparent);
  margin: 40px 0;
}
.pp-wrapper h2 {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 700;
  margin-bottom: 14px; margin-top: 40px;
  color: var(--text);
}
.pp-wrapper h2:first-of-type { margin-top: 0; }
.pp-wrapper p {
  font-size: 12px; line-height: 1.9;
  color: var(--text-dim); margin-bottom: 14px;
}
.pp-wrapper p strong { color: var(--text); }
.pp-wrapper ul {
  padding-left: 0; list-style: none; margin-bottom: 14px;
}
.pp-wrapper ul li {
  font-size: 12px; line-height: 1.85; color: var(--text-dim);
  padding: 6px 0 6px 20px; position: relative;
  border-bottom: 1px solid rgba(232,245,242,0.05);
}
.pp-wrapper ul li::before {
  content: '→';
  position: absolute; left: 0;
  color: var(--teal); font-size: 11px;
}
.pp-wrapper ul li strong { color: var(--text); }
.pp-wrapper .info-box {
  border: 1px solid var(--teal-border);
  border-radius: 6px; padding: 20px 24px;
  background: var(--teal-dim); margin: 24px 0;
}
.pp-wrapper .info-box p { margin-bottom: 6px; font-size: 12px; }
.pp-wrapper .info-box p:last-child { margin-bottom: 0; }
.pp-wrapper .cookie-reset-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: var(--teal);
  font-family: 'DM Mono', monospace; font-size: 10px;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 12px 22px; border-radius: 5px;
  border: 1px solid var(--teal-border); cursor: pointer;
  transition: background 0.2s, border-color 0.2s; margin-top: 8px;
}
.pp-wrapper .cookie-reset-btn:hover { background: var(--teal-dim); border-color: var(--teal); }
.pp-wrapper a { color: var(--teal); text-decoration: none; }
.pp-wrapper a:hover { opacity: 0.75; }
@media (max-width: 900px) {
}
@media (max-width: 480px) {
}
`,
        }}
      />
      <div className="s-page pp-wrapper">
        <div className="page-label">Informativa legale</div>
        <h1 className="page-title">
          Privacy &amp;
          <br />
          <em>Cookie Policy</em>
        </h1>
        <span className="page-updated">Ultimo aggiornamento: {updated}</span>

        {/* 1. TITOLARE */}
        <h2>1. Titolare del trattamento</h2>
        <div className="info-box">
          <p>
            <strong>{SITE.name}</strong> — {SITE.title}
          </p>
          <p>
            {SITE.address.street}, {SITE.address.cap} {SITE.address.city} ({SITE.address.province})
          </p>
          <p>
            P.IVA: {SITE.piva} &nbsp;|&nbsp; CF: {SITE.cf}
          </p>
          <p>
            Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>

        <div className="section-divider" />

        {/* 2. DATI RACCOLTI */}
        <h2>2. Dati raccolti e finalità</h2>
        <p>Il sito raccoglie dati nelle seguenti modalità:</p>
        <ul>
          <li>
            <strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate,
            orari di accesso. Raccolti automaticamente dai server e usati esclusivamente per
            finalità tecniche e di sicurezza.
          </li>
          <li>
            <strong>Dati forniti volontariamente:</strong> nome, email, telefono, azienda e
            messaggio inviati tramite il modulo di contatto. Usati esclusivamente per rispondere
            alla richiesta.
          </li>
          <li>
            <strong>Dati di marketing (solo con consenso):</strong> cookie di profilazione tramite
            Meta Pixel (Facebook/Instagram Ads) gestiti via Google Tag Manager.
          </li>
        </ul>

        <div className="section-divider" />

        {/* 3. COOKIE */}
        <h2>3. Cookie utilizzati</h2>

        <p>
          <strong>Cookie tecnici (sempre attivi)</strong> — necessari al funzionamento del sito, non
          richiedono consenso:
        </p>
        <ul>
          <li>
            <strong>ns_cookie_consent</strong> — salva la tua scelta relativa ai cookie. Durata: 365
            giorni. Nessun dato personale.
          </li>
        </ul>

        <p>
          <strong>Cookie di profilazione / marketing (solo con consenso)</strong>:
        </p>
        <ul>
          <li>
            <strong>Meta Pixel (_fbp, _fbc)</strong> — gestito da Meta Platforms Ireland Ltd.
            Permette di misurare l&apos;efficacia delle campagne pubblicitarie su Facebook e
            Instagram e di mostrare annunci pertinenti. Durata: fino a 90 giorni.{" "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy Meta &rarr;
            </a>
          </li>
          <li>
            <strong>Google Tag Manager</strong> — container che gestisce e attiva i tag di terze
            parti solo dopo il consenso esplicito. Non raccoglie dati autonomamente.
          </li>
        </ul>

        <p>Puoi revocare o modificare il tuo consenso in qualsiasi momento:</p>
        <button className="cookie-reset-btn" id="resetCookieConsent">
          ↺ Modifica preferenze cookie
        </button>

        <div className="section-divider" />

        {/* 4. BASE GIURIDICA */}
        <h2>4. Base giuridica del trattamento</h2>
        <ul>
          <li>
            <strong>Cookie tecnici:</strong> legittimo interesse (art. 6.1.f GDPR)
          </li>
          <li>
            <strong>Dati del form di contatto:</strong> esecuzione di misure precontrattuali su
            richiesta dell&apos;interessato (art. 6.1.b GDPR)
          </li>
          <li>
            <strong>Cookie di marketing:</strong> consenso esplicito (art. 6.1.a GDPR)
          </li>
        </ul>

        <div className="section-divider" />

        {/* 5. CONSERVAZIONE */}
        <h2>5. Conservazione dei dati</h2>
        <p>
          I dati inviati tramite form sono conservati nei sistemi Brevo (Sendinblue) per un periodo
          non superiore a 24 mesi dalla raccolta, salvo diversa richiesta da parte
          dell&apos;interessato. I dati di navigazione tecnica sono conservati per un massimo di 30
          giorni.
        </p>

        <div className="section-divider" />

        {/* 6. TERZE PARTI */}
        <h2>6. Trasferimento a terze parti</h2>
        <p>
          I dati non sono ceduti a terzi per finalità commerciali. I fornitori di servizi tecnici
          utilizzati sono:
        </p>
        <ul>
          <li>
            <strong>Brevo (Sendinblue)</strong> — gestione contatti e invio email. Sede: Francia.{" "}
            <a
              href="https://www.brevo.com/it/legal/privacypolicy/"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy &rarr;
            </a>
          </li>
          <li>
            <strong>Google Tag Manager / Google LLC</strong> — gestione tag. Sede: USA (Privacy
            Shield / SCC).{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy &rarr;
            </a>
          </li>
          <li>
            <strong>Meta Platforms Ireland Ltd</strong> — pixel pubblicitario (solo con consenso).{" "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noopener"
            >
              Privacy Policy &rarr;
            </a>
          </li>
        </ul>

        <div className="section-divider" />

        {/* 7. DIRITTI */}
        <h2>7. I tuoi diritti (GDPR artt. 15-22)</h2>
        <p>In qualità di interessato, hai il diritto di:</p>
        <ul>
          <li>
            <strong>Accesso:</strong> ottenere conferma del trattamento e copia dei dati che ti
            riguardano
          </li>
          <li>
            <strong>Rettifica:</strong> correggere dati inesatti o incompleti
          </li>
          <li>
            <strong>Cancellazione:</strong> richiedere la rimozione dei tuoi dati (&quot;diritto
            all&apos;oblio&quot;)
          </li>
          <li>
            <strong>Limitazione:</strong> chiedere la sospensione del trattamento in determinati
            casi
          </li>
          <li>
            <strong>Portabilità:</strong> ricevere i tuoi dati in formato strutturato e leggibile
          </li>
          <li>
            <strong>Opposizione:</strong> opporti al trattamento per motivi legittimi
          </li>
          <li>
            <strong>Revoca del consenso:</strong> revocare in qualsiasi momento il consenso
            prestato, senza pregiudicare la liceità del trattamento precedente
          </li>
        </ul>
        <p>
          Per esercitare i tuoi diritti scrivi a{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Hai anche il diritto di proporre
          reclamo al{" "}
          <a
            href="https://www.garanteprivacy.it"
            target="_blank"
            rel="noopener"
          >
            Garante per la Protezione dei Dati Personali
          </a>
          .
        </p>

        <div className="section-divider" />

        {/* 8. MODIFICHE */}
        <h2>8. Modifiche alla presente policy</h2>
        <p>
          Questa informativa può essere aggiornata periodicamente. La data di &quot;ultimo
          aggiornamento&quot; in cima alla pagina indica la versione vigente. Ti invitiamo a
          consultarla periodicamente.
        </p>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.getElementById('resetCookieConsent').addEventListener('click',function(){document.cookie='ns_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';location.reload();});`,
        }}
      />
    </>
  );
}
