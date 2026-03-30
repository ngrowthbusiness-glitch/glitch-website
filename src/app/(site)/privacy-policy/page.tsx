import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sulla privacy e cookie policy di nicolaserrao.com.",
  openGraph: {
    title: "Privacy Policy | Nicola Serrao",
    url: `${SITE.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-[60px] py-20 max-md:px-8 max-[480px]:px-5">
      <div className="text-[9px] tracking-[3px] uppercase text-primary mb-4">
        Legale
      </div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-10">
        Privacy &amp; Cookie Policy
      </h1>

      <div className="space-y-10 text-xs text-dimmed leading-relaxed">
        {/* Titolare */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Titolare del trattamento
          </h2>
          <p>
            <strong className="text-foreground">Nicola Serrao</strong>
            <br />
            {SITE.address.street}, {SITE.address.cap} {SITE.address.city} ({SITE.address.province})
            <br />
            P.IVA: {SITE.piva} &mdash; C.F.: {SITE.cf}
            <br />
            Email:{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary no-underline">
              {SITE.email}
            </a>
          </p>
        </section>

        {/* Dati raccolti */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Dati raccolti
          </h2>
          <p className="mb-3">Attraverso questo sito possono essere raccolti:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-foreground">Dati forniti volontariamente:</strong> nome,
              email, azienda, telefono, messaggio (tramite il modulo di contatto)
            </li>
            <li>
              <strong className="text-foreground">Dati di navigazione:</strong> indirizzo IP
              (anonimizzato), pagine visitate, durata della visita, browser e dispositivo
              utilizzati
            </li>
            <li>
              <strong className="text-foreground">Feedback:</strong> risposte al popup di
              feedback (anonimizzate)
            </li>
          </ul>
        </section>

        {/* Finalità */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Finalit&agrave; del trattamento
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Rispondere alle richieste di contatto</li>
            <li>Inviare comunicazioni relative ai servizi offerti (previo consenso)</li>
            <li>Analizzare il traffico e migliorare l&apos;esperienza utente</li>
            <li>Adempiere ad obblighi di legge</li>
          </ul>
        </section>

        {/* Cookie */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Cookie
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Cookie tecnici (necessari)
              </h3>
              <p>
                <code className="text-primary bg-[rgba(0,255,252,0.08)] px-1.5 py-0.5 rounded text-[11px]">
                  ns_cookie_consent
                </code>{" "}
                &mdash; Memorizza la scelta sui cookie. Durata: 365 giorni.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Cookie di profilazione (previo consenso)
              </h3>
              <p>
                Installati tramite Google Tag Manager (GTM) previo consenso esplicito.
                Includono Meta Pixel per analisi del traffico e remarketing.
              </p>
            </div>
          </div>
        </section>

        {/* Terze parti */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Terze parti
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-foreground">Brevo (Sendinblue):</strong> gestione contatti e
              invio email. I dati vengono trasferiti ai server Brevo (UE).
            </li>
            <li>
              <strong className="text-foreground">Google (GTM, Analytics):</strong> analisi del
              traffico. Solo previo consenso esplicito.
            </li>
            <li>
              <strong className="text-foreground">Meta (Facebook Pixel):</strong> remarketing e
              analisi. Solo previo consenso esplicito.
            </li>
            <li>
              <strong className="text-foreground">Vercel:</strong> hosting del sito. I dati
              transitano attraverso la rete CDN di Vercel.
            </li>
          </ul>
        </section>

        {/* Diritti */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            I tuoi diritti (GDPR)
          </h2>
          <p className="mb-3">
            Hai diritto di accesso, rettifica, cancellazione, limitazione, portabilit&agrave; e
            opposizione al trattamento. Per esercitare questi diritti, scrivi a:{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary no-underline">
              {SITE.email}
            </a>
          </p>
          <p>
            Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati
            Personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary no-underline"
            >
              garanteprivacy.it
            </a>
            ).
          </p>
        </section>

        {/* Conservazione */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Conservazione dei dati
          </h2>
          <p>
            I dati personali vengono conservati per il tempo strettamente necessario alle
            finalit&agrave; per cui sono stati raccolti e comunque non oltre 24 mesi dall&apos;ultimo
            contatto, salvo obblighi di legge.
          </p>
        </section>

        {/* Aggiornamento */}
        <section>
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">
            Aggiornamento della policy
          </h2>
          <p>
            Questa policy pu&ograve; essere aggiornata periodicamente. L&apos;ultima modifica risale
            al <strong className="text-foreground">30 marzo 2026</strong>.
          </p>
        </section>

        {/* Reset cookie */}
        <section className="pt-4 border-t border-border">
          <ResetCookieButton />
        </section>
      </div>
    </div>
  );
}

function ResetCookieButton() {
  return (
    <form
      action={async () => {
        "use server";
      }}
    >
      <button
        type="button"
        className="text-[10px] tracking-[2px] uppercase text-primary bg-transparent border border-border px-5 py-3 rounded cursor-pointer hover:bg-[rgba(0,255,252,0.08)] hover:border-primary transition-all duration-200 font-[inherit]"
        data-action="reset-cookies"
      >
        Resetta preferenze cookie
      </button>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelector('[data-action="reset-cookies"]').addEventListener('click',function(){document.cookie='ns_cookie_consent=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';window.location.reload();})`,
        }}
      />
    </form>
  );
}
