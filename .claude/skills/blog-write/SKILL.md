# /blog-write — Scrivi articolo blog

Crea un nuovo articolo blog completo per nicolaserrao.com con SVG, SEO e aggiornamento indice.

## Trigger
`/blog-write [titolo o topic]`

## Workflow

### 1. Ricerca
- Analizza il topic e identifica l'angolo editoriale
- Cerca dati/statistiche rilevanti per supportare i punti
- Identifica la categoria: Analytics | Metodo | Strategia | AI

### 2. Scrittura
Crea `src/app/(site)/blog/[slug]/page.tsx` seguendo il pattern degli articoli esistenti.

**Struttura articolo:**
```tsx
export const metadata = { title: "...", description: "..." };
// JSON-LD Article + FAQPage schema

export default function ArticlePage() {
  return (
    <div className="s-page">
      <style>{/* stili specifici articolo */}</style>
      {/* Hero: eyebrow categoria + h1 + meta (data, tempo lettura, tags) */}
      {/* Intro: 2-3 paragrafi che agganciano */}
      {/* Corpo: sezioni con h2, paragrafi, visualizzazioni SVG */}
      {/* Conclusione: takeaway pratico */}
      {/* CTA: link a risorse o contatto */}
    </div>
  );
}
```

**Tone of voice:**
- Italiano, diretto, niente fuffa
- Parla a imprenditori, non a marketer
- Usa numeri concreti, non generalizzazioni
- "Ecco cosa dovresti guardare" non "potrebbe essere utile considerare"
- Ammetti quando qualcosa e complesso — non semplificare troppo

**Elementi visivi (obbligatori):**
- Almeno 1 SVG data visualization inline (grafico, funnel, confronto)
- Blocchi grafici per concetti chiave (formula box, confronto prima/dopo)
- Niente immagini esterne — tutto SVG/CSS generato

### 3. SEO
- Title tag: max 60 caratteri, keyword in apertura
- Meta description: max 155 caratteri, call to curiosity
- JSON-LD: Article schema + FAQPage se ci sono domande
- H1 unico, H2 per sezioni, struttura gerarchica
- Alt text su elementi grafici (aria-label)

### 4. Aggiornamento indice
Aggiungi l'articolo all'array in `src/app/(site)/blog/page.tsx`:
```js
{ slug: "...", category: "...", title: "...", readTime: "X min" }
```
Inserisci in cima all'array (articolo piu recente per primo).

### 5. Verifica
- `npm run build` deve passare
- L'articolo deve apparire nell'indice blog
- I link devono funzionare

## Categorie disponibili
- **Analytics**: dati, KPI, misurazione, tracking
- **Metodo**: processo di lavoro, framework, operativita
- **Strategia**: posizionamento, crescita, decisioni business
- **AI**: automazione, Brain Company, tool AI
