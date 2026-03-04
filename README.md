# LiFePO4 Accuvergelijker — Astro Project

Statische vergelijkingstool voor LiFePO4 lithiumaccu's (LiTime, Redodo, Rebelcell, Powerlit), beschikbaar in **Nederlands** (`/nl/`) en **Duits** (`/de/`).

## Projectstructuur

```
litime-astro/
├── src/
│   ├── data/
│   │   └── products.yaml        ← alle 39 producten (NL + DE beschrijvingen)
│   ├── i18n/
│   │   ├── nl.json              ← Nederlandse UI-teksten
│   │   └── de.json              ← Duitse UI-teksten
│   ├── layouts/
│   │   └── Base.astro           ← HTML shell + globale CSS
│   ├── components/
│   │   └── Comparator.astro     ← sidebar filters + product cards
│   ├── pages/
│   │   ├── index.astro          ← redirect → /nl/
│   │   ├── nl/index.astro       ← Nederlandse pagina
│   │   └── de/index.astro       ← Duitse pagina
│   ├── scripts/
│   │   └── filter.ts            ← client-side filter logica (TypeScript)
│   └── types.ts                 ← TypeScript interfaces
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Producten bijwerken

Open `src/data/products.yaml` en pas de gewenste velden aan. Per product zijn de beschrijvingen opgesplitst:

```yaml
desc:
  nl: "Nederlandse beschrijving"
  de: "Duitse beschrijving"
```

Alle andere velden (prijs, afmetingen, specs) zijn taalneutraal.

## Lokaal starten

**Vereisten:** Node.js 18+ geïnstalleerd.

```bash
# 1. Installeer dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:4321/nl/
# → http://localhost:4321/de/
```

## Bouwen voor productie

```bash
npm run build
# Output staat in dist/
```

De `dist/` map bevat statische HTML-bestanden die je kunt uploaden naar elke webserver of hosting dienst.

## Gratis online zetten (Netlify)

1. Maak een gratis account op [netlify.com](https://netlify.com)
2. Sleep de `dist/` map naar het Netlify dashboard (drag-and-drop deploy)
3. Je site is direct live op een netlify.app subdomein

### Met GitHub + automatisch deployen

1. Maak een account op [github.com](https://github.com)
2. Maak een nieuw repository aan (bv. `litime-vergelijker`)
3. Upload de projectbestanden naar het repository
4. Verbind het repository met Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Elke wijziging die je pusht naar GitHub wordt automatisch gepubliceerd

## Nieuwe taal toevoegen

1. Maak `src/i18n/fr.json` aan (kopieer `nl.json` als basis)
2. Vertaal alle tekstvelden
3. Maak `src/pages/fr/index.astro` aan (kopieer `nl/index.astro`, verander `nl` → `fr`)
4. Voeg `'fr'` toe aan `locales` in `astro.config.mjs`
5. Voeg `fr:` beschrijvingen toe in `products.yaml`
