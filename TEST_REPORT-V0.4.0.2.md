# Test report — JoJo Brain V0.4.0.2

**Scope:** pointer/touchcorrectie, Runnix read-only foundation en Pages-repositorypad.  
**Datum:** 21 november 2026.

## Geautomatiseerde static tests

`npm test` controleert:

- 6 px tap/drag-drempel voor `mouse` en `touch`;
- drag blijft gelatcht wanneer de pointer terugbeweegt;
- pointercancel activeert nooit;
- dragroute bevat geen detailselectie;
- local-only Runnix-state bevat geen previewdata;
- alleen same-origin endpoints worden toegelaten;
- het Runnix-contract beperkt zich tot Vandaag, laatste uitvoering en progressie;
- healthvelden lekken niet door naar de preview;
- canonical URL en basepath `/jojo-brain/`;
- `404.html` herstelt naar de canonical repository-URL;
- Pages-workflow behoudt aparte build- en deployjobs;
- `_site` bevat uitsluitend de site-assets en `.nojekyll`;
- service worker cachet de nieuwe interaction- en adapterbestanden;
- geen secrets, private netwerkadressen, geconfigureerde Runnix-endpoint of trainingbestanden.

## Browserregressies

`npm run test:browser` voert dezelfde interactiestroom uit met desktop mouse en mobiele touch:

1. open `#sport-health`;
2. drag Runnix 24 px;
3. bevestig dat hash/focus niet wijzigt en het detailpaneel gesloten blijft;
4. tik Runnix met 2 px beweging;
5. bevestig dat Runnix wordt gefocust;
6. controleer page- en console-errors.

De browsertest controleert daarnaast de exacte Runnix-family thematokens, de zichtbaarheid en `LOCAL-ONLY`-status van de Runnix-preview, en schrijft desktop/mobile visual baselines naar `tests/reports`.

## PWA en path

- V0.4.0.2 gebruikt een nieuwe cachekey en versioned runtimeassets.
- Start-URL en scope blijven relatief voor deployment onder `/jojo-brain/`.
- De canonical desktop-URL is `https://jojo1585.github.io/jojo-brain/`.
- De 404-shell verwijst repositorypaden terug naar de canonical app-root.

## Externe acceptatie

Na push naar `main`:

- buildjob en deployjob moeten groen zijn;
- artifact heet exact `github-pages`;
- de canonical URL toont V0.4.0.2;
- de geïnstalleerde PWA werkt zichzelf online bij zonder reinstall;
- drag op de doeltelefoon opent geen bottom sheet.

## Lokaal uitgevoerd resultaat

- static/releasevalidatie: geslaagd;
- pure mouse/touch gesturetests: geslaagd;
- veilige Runnix-adaptertests: geslaagd;
- desktop Chromium 1440×900: geslaagd;
- mobiele touchcontext 390×844: geslaagd;
- drag opent geen detailpaneel: bevestigd;
- genuine tap focust Runnix: bevestigd;
- Sport & Health toont 6 verwachte nodes: bevestigd;
- Runnix-preview toont eerlijk `LOCAL-ONLY`: bevestigd;
- Runnix-family CSS-tokens: bevestigd;
- service worker beheert client en cache `jojo-brain-v0.4.0.2`: bevestigd;
- offline startup toont V0.4.0.2: bevestigd;
- visual baselines gegenereerd voor desktop en mobile.
- exact workflow-stagingcommando uitgevoerd: 19 sitebestanden in `_site`;
- staged app onder lokaal `/jojo-brain/` geopend: geslaagd;
- alle geladen runtimeassets bleven onder `/jojo-brain/`: bevestigd;
