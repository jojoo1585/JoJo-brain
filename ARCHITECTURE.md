# Architecture — JoJo Brain V0.4.0.2

**Status:** Sport & Health met veilige Runnix read-only foundation  
**Laatst bijgewerkt:** 21 november 2026

## 1. Doel en grens

JoJo Brain blijft een publieke statische navigatie-PWA. V0.4.0.2 voegt geen private integratie toe, maar introduceert wel het contract waarmee een latere beveiligde/self-hosted JoJo een kleine read-only Runnix-preview kan leveren.

De publieke build bevat geen NAS-URL, credentials, tokens, private IP-adressen, trainingbestanden of persoonlijke healthwaarden.

## 2. Sport & Health

```text
Sport & Health
├── Runnix — training intelligence + read-only previewstatus
│   ├── Vandaag
│   ├── Planning
│   ├── Execution
│   └── Progressie
├── Garmin — bronrol, geen live data in V0.4.0.2
├── Strava — externe rol, geen live data in V0.4.0.2
└── Health — aggregatorconcept, geen live data in V0.4.0.2
```

Alle V0.4-visuals, kleuren, semantische lijnen en springphysics blijven bestaan.

### Product-family theme

JoJo behoudt zijn spatial/neural compositie, maar gebruikt Runnix als palette foundation:

- surfaces: near-black en dark navy;
- intelligence: magenta/rose;
- planning/context: violet en blue;
- data/health signal: selectief cyan/teal;
- typography: hoog contrast licht met rustige muted labels;
- cards: compacte borders, kleine radii en restrained glow.

Garmin blijft subtiel blue, Health cyan/teal en Strava gedempt rose/coral. Daardoor blijven bronnen herkenbaar zonder een brede rainbowpalette. Home en Development krijgen alleen dezelfde globale basis- en typographytokens.

## 3. Runtime-lagen

### App-shell — `index.html`

Full-screen shell met graph viewport, detail drawer, mobiele dock en een kleine Runnix-preview. De preview verschijnt alleen in de Sport & Health-focus.

### Gesture classifier — `pointer-gesture.js`

Domeinonafhankelijke state machine voor mouse en touch:

- pending onder 6 px;
- drag vanaf 6 px maximale verplaatsing;
- dragstatus blijft gelatcht;
- cancel activeert nooit;
- alleen resultaat `tap` mag een node activeren.

### Spatial engine — `neural-engine.js`

Start physics-dragging pas zodra de gestureclassifier `dragging` meldt. Bij release wordt `endDrag()` uitgevoerd en neemt target-attractie de node opnieuw over. Een drag roept geen selectie- of detailcallback aan.

### Runnix-adapter — `runnix-adapter.js`

De adapter is de enige runtimegrens naar Runnix:

```text
Runnix/self-hosted backend
        │
        │ same-origin GET, read-only, no-store
        ▼
/api/.../preview bridge
        │
        ▼
runnix-adapter.js
        │ sanitize + bounded contract
        ▼
Runnix preview UI
```

Publieke V0.4.0.2-configuratie:

- `mode: local-only`;
- `previewEndpoint: ''`;
- geen request en geen gefabriceerde data.

Een toekomstige endpoint moet same-origin zijn. De adapter verwerkt uitsluitend:

- `today`: titel/type/duur;
- `lastExecution`: label/status;
- `progress`: label/aantal voltooide sessies.

Onbekende velden, inclusief Garmin-specifieke healthdata, worden niet gerenderd. Authenticatie en endpointpublicatie zijn verantwoordelijkheden van de latere beveiligde host, niet van GitHub Pages.

### Orchestratie — `app.js`

Bindt graphnavigatie, PWA, detail drawer en Runnix-adapter. Disconnected/unavailable states blijven expliciet en bevatten geen fallbackmetrics.

### Configuratie — `config.js`

Bevat publieke links, canonical Pages-metadata en een lege Runnix-bronconfiguratie. Secrets en private routes zijn verboden.

## 4. GitHub Pages-publicatie

Canonical URL:

`https://jojo1585.github.io/jojo-brain/`

De bestaande workflowstructuur blijft:

1. `build`: checkout → Node 20 → `npm test` → Configure Pages → stage `_site` → upload `github-pages`;
2. `deploy`: `needs: build` → deploy exact `github-pages`.

De expliciete `_site`-staging maakt de artifactroot gelijk aan de repositorysite-root. `index.html`, `404.html`, `.nojekyll`, PWA-runtime en assets worden gecontroleerd vóór upload. `404.html` herstelt een onbekend repositorypad naar de canonical root.

## 5. PWA

Manifest `start_url` en `scope` blijven `./`, zodat installatie onder het repositorypad werkt. Alle runtimebestanden dragen releaseversie V0.4.0.2 en zitten in de service-worker app-shell.

## 6. Security- en privacygrens

- geen rechtstreekse browsercall naar NAS of private host;
- geen cross-origin Runnix-endpoint;
- geen bearer token, API-key, cookiecode of client secret;
- geen TCX/FIT/GPX-bestanden;
- geen Garmin-, Strava-, Health-, Calendar-, Home- of Development-data;
- geen persoonlijke waarden als demo of fallback.
