# Testing — JoJo Brain V0.4.0.2

## Standaardvalidatie

```bash
npm test
```

Dit voert static releasevalidatie en pure regressietests uit.

### Pointer mouse/touch

- drempel exact 6 px;
- 5,66 px blijft tap;
- 6 px wordt drag;
- drag blijft gelatcht na terugbewegen;
- cancel activeert nooit;
- engine activeert alleen bij resultaat `tap`;
- drag voert `endDrag()` uit zonder detailcallback.

### Runnix-adapter

- lege endpoint geeft `local-only/disconnected`;
- local-only bevat geen preview;
- cross-origin endpoint wordt geweigerd;
- same-origin endpoint wordt geaccepteerd;
- fetch is GET, same-origin en no-store;
- bounded contract: Vandaag, laatste uitvoering, progressie;
- Garmin-healthvelden verschijnen niet in output.

### Pages en PWA

- canonical URL: `https://jojo1585.github.io/jojo-brain/`;
- basepath: `/jojo-brain/`;
- manifest start/scope relatief;
- `404.html` herstelt naar canonical root;
- workflow behoudt `build` + `deploy` en `needs: build`;
- `_site` bevat index, 404, `.nojekyll` en runtimeassets;
- artifact heet exact `github-pages`;
- service worker bevat pointer- en Runnix-adapter.

### Visual regression

- globale surface-, text- en accenttokens exact gecontroleerd;
- canvas-RGB en CSS-palette blijven uitgelijnd;
- Runnix-node en preview bevatten de gedeelde accentrail;
- preview is zichtbaar in Sport & Health en toont `LOCAL-ONLY`;
- desktop- en mobile-baselines worden geschreven naar `tests/reports/V0.4.0.2-*.png`;
- Garmin/Health/Strava blijven binnen blue/cyan/rose sourcevarianten;
- Home en Development krijgen geen eigen structurele restyle.

### Leakage

Alle tekstbestanden worden gecontroleerd op:

- credentialassignments;
- private IPv4-URL's;
- geconfigureerde publieke Runnix-endpoint;
- trainingbestanden in repository;
- ontbrekende releaseversies.

## Browserregressie

```bash
JOJO_CHROMIUM_PATH=/pad/naar/chrome npm run test:browser
```

Test desktop mouse en mobile touch in een echte browser:

1. drag Runnix 24 px;
2. hash blijft `#sport-health`;
3. drawer blijft gesloten;
4. genuine tap van 2 px focust `#runnix`;
5. geen page errors.

## Handmatige doeltoesteltest

1. Push en wacht op twee groene Pages-jobs.
2. Open `https://jojo1585.github.io/jojo-brain/`.
3. Bevestig V0.4.0.2 en `LOCAL-ONLY` Runnix-preview.
4. Sleep elke Sport & Health-node; geen bottom sheet mag openen.
5. Tik Runnix; cluster moet focussen.
6. Tik de gefocuste Runnix-core; detailpaneel mag nu openen.
7. Open de geïnstalleerde PWA online en laat de service-workerupdate voltooien.
8. Herhaal drag/tap met touch.
9. Test daarna offline startup.

Zie `TEST_REPORT-V0.4.0.2.md`.
