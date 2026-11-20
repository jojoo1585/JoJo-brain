# Testing — JoJo Brain V0.3.0

De uitgevoerde buildresultaten staan in `TEST_REPORT-V0.3.0.md`.

## 1. Geautomatiseerde validatie

Uitvoeren met:

```bash
npm test
```

Controleert:

- vereiste app-, engine-, data-, PWA- en documentatiebestanden;
- versies in config, manifest, service worker en `VERSION`;
- manifesticonen en shortcuts;
- lege lokale/private URL's;
- hoofdclusters en volledige Sport & Health-satellieten;
- service-worker app-shell;
- vereiste documentatie per build.

## 2. Syntax

```bash
node --check app.js
node --check graph-data.js
node --check neural-engine.js
node --check config.js
node --check service-worker.js
```

## 3. Functionele browsertests

### Root

- JoJo staat centraal.
- Sport & Health, Home en Development zijn zichtbaar.
- Nodes zweven subtiel zonder drift uit de viewport.

### Physics

- sleep Sport & Health;
- de verbinding volgt de node;
- JoJo en de verbonden cluster reageren fysiek;
- na loslaten keert de node gecontroleerd terug;
- een korte tik na het slepen opent niet per ongeluk een andere cluster.

### Focus

- open Sport & Health;
- focusovergang speelt;
- JoJo blijft als ancestor zichtbaar;
- Runnix, Garmin, Strava en Health verschijnen als satellieten;
- breadcrumbs en back werken.

### Detail en links

- publieke Garmin-, Strava- en GitHub-links openen extern;
- lokale links tonen alleen een configuratiemelding;
- detail drawer werkt op desktop;
- detail bottom sheet opent en sluit op mobiel.

### PWA

- manifest wordt geladen;
- service worker wordt actief;
- app-shell werkt na offline herladen;
- start-url en shortcuts werken onder een repositorysubpad;
- installatie werkt via browser of beginschermactie.

## 4. Viewports

Minimaal testen:

- 390 × 844 phone portrait;
- 844 × 390 phone landscape;
- 768 × 1024 tablet portrait;
- 1440 × 900 desktop.

## 5. Performanceacceptatie

- geen JavaScriptfouten;
- geen node buiten de bruikbare viewport na stabilisatie;
- sleepinteractie blijft responsief op phone emulation;
- canvas-DPR blijft begrensd;
- mobiel particle-budget is 32 of lager;
- reduced motion gebruikt 18 particles en geen micro-float.

## 6. Securityregressie

Zoek vóór publicatie naar tokens, wachtwoorden, private keys, lokale hostnamen, TCX/FIT/GPX-data en `.env`-bestanden.
