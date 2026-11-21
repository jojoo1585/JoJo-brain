# Testing — JoJo Brain V0.4.0

## Geautomatiseerd

```bash
npm test
```

De validatie controleert:

- bestanden, releaseversies en versioned assets;
- manifest, icons en service worker;
- graphhiërarchie en semantische datalijnen;
- goedgekeurde Sport & Health-rollen;
- Garmin zonder Runnix-overlap;
- Strava zonder prominente Segments-node;
- Health-aggregator met vijf signalen;
- privacyregels en afwezigheid van private IP-adressen;
- performance- en compatibilityguards.

## Syntax

```bash
node --check app.js
node --check graph-data.js
node --check neural-engine.js
node --check service-worker.js
```

## Handmatige matrix

### Mobiel portrait

- JoJo → Sport & Health;
- vier hoofdhubs leesbaar;
- Runnix met vier routes;
- Garmin met twee bronroutes;
- Strava met drie routes zonder Segments;
- Health met vijf signalen zonder onbruikbare overlap;
- drawer opent en sluit boven de dock;
- node sleep en tap blijven onderscheidbaar.

### Mobiel landscape

- visual viewport blijft correct;
- topbar, dock en focusnode blijven bereikbaar;
- geen scrollbars of afgesneden nodes.

### Desktop

- signaalegenda verschijnt alleen bij Sport & Health;
- semantische datalijnlabels zijn leesbaar;
- zusterhubs blijven gedimd zichtbaar bij hubfocus;
- toetsenbord: Tab, Enter, Spatie, Escape en Home.

### PWA

- update vanuit V0.3.0.1 zonder reinstall;
- cache bevat V0.4.0-assets;
- offline app-shell start;
- reduced motion verwijdert decoratieve animatie.

Zie `TEST_REPORT-V0.4.0.md` voor het uitgevoerde resultaat.
