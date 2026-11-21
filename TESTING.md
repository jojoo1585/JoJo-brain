# Testing — JoJo Brain V0.4.0.1

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
- de Pages-workflow met afzonderlijke build- en deployjobs;
- `needs: build` als artifactfinalisatiebarrière;
- uploader `actions/upload-pages-artifact@v5` met naam `github-pages`;
- deployer `actions/deploy-pages@v4` met dezelfde artifactnaam.

## Syntax

```bash
node --check app.js
node --check graph-data.js
node --check neural-engine.js
node --check service-worker.js
```

## Pages-workflow

De workflowtest leest `.github/workflows/deploy-pages.yml` en controleert de contractpunten tussen upload en deployment. Externe acceptatie gebeurt na push naar `main`:

1. job **Validate and upload Pages artifact** is groen;
2. de run bevat exact het artifact `github-pages`;
3. job **Deploy to GitHub Pages** start pas na de buildjob;
4. de deployment-URL opent V0.4.0.1.

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
- cache bevat V0.4.0.1-assets;
- offline app-shell start;
- reduced motion verwijdert decoratieve animatie.

Zie `TEST_REPORT-V0.4.0.md` voor de applicatiebaseline en `TEST_REPORT-V0.4.0.1.md` voor de deploymenthotfix.
