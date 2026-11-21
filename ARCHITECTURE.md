# Architecture — JoJo Brain V0.4.0.1

**Status:** Sport & Health-baseline  
**Laatst bijgewerkt:** 21 november 2026

## 1. Doel en grens

JoJo Brain is in V0.4.0.1 een publieke, statische navigatie-PWA. De app visualiseert relaties tussen systemen, maar bewaart geen accountdata, trainingsbestanden of persoonlijke healthwaarden en voert geen private integraties uit.

V0.4.0.1 wijzigt de Sport & Health-runtime niet. De hotfix wijzigt uitsluitend de publicatiearchitectuur.

## 2. Conceptuele hiërarchie

```text
JoJo
├── Sport & Health
│   ├── Runnix
│   │   ├── Vandaag
│   │   ├── Planning
│   │   ├── Execution
│   │   └── Progressie
│   ├── Garmin
│   │   ├── Health signals
│   │   └── Devices
│   ├── Strava
│   │   ├── Activities
│   │   ├── Trends
│   │   └── Volume
│   └── Health (Health-aggregator)
│       ├── Sleep
│       ├── HRV
│       ├── Resting HR
│       ├── Weight
│       └── Recovery
├── Home (ongewijzigd)
└── Development (ongewijzigd)
```

## 3. Semantische datalijnen

De boomstructuur bepaalt navigatie. `connections` in `graph-data.js` voegen betekenisvolle, niet-hiërarchische relaties toe:

- Garmin → Health: health signals;
- Health → Runnix: recovery context;
- Strava → Runnix: activity check;
- Vandaag → Execution → Progressie → Planning: Runnix closed loop.

Een verbinding wordt alleen getekend wanneer beide eindpunten zichtbaar zijn. De engine kent de betekenis niet; label en kleur komen uit het datamodel.

## 4. Runtime-lagen

### App-shell — `index.html`

Full-screen shell met header, breadcrumbs, graph viewport, signaalegenda, detail drawer, mobiele dock en boot-state.

### Inhoudsmodel — `graph-data.js`

Bron voor nodes, parent/children, inhoud, links en optionele semantische `connections`.

### Spatial engine — `neural-engine.js`

- canvas voor particles, glow, verbindingen, semantische labels en signaalpulsen;
- toegankelijke DOM-buttons voor nodes;
- springfysica, lokale repulsie, damping en grenzen;
- desktopcontext: zusterhubs blijven gedimd zichtbaar;
- mobiel: kleinere directe subgraph om overlap te beperken;
- adaptief particle-budget en device-pixel-ratio.

### Orchestratie — `app.js`

Beheert clusterfocus, geschiedenis, breadcrumbs, detail drawer, online/offline-indicatie, installatie en service-workerupdates.

### Configuratie — `config.js`

Publieke URL-configuratie. Lokale en private adressen blijven leeg. Er is geen token- of credentialmodel.

### PWA — manifest en service worker

Release-versioned app-shell, network-first navigatie, cached fallback en onmiddellijke upgrade zonder reinstall.

## 5. Rollen in Sport & Health

- Runnix interpreteert en adviseert.
- Garmin levert brondata en devicecontext.
- Health aggregeert brononafhankelijke lichamelijke context.
- Strava geeft een onafhankelijke activiteit- en volumeblik.
- JoJo orkestreert navigatie en visualiseert relaties; JoJo is geen tweede trainingsengine.

## 6. Performance en toegankelijkheid

- geen externe visualisatie- of physicslibrary;
- maximaal 1.25 DPR mobiel en 1.6 desktop;
- 32 particles mobiel, 62 desktop en 18 bij reduced motion;
- semantische lijnlabels alleen op desktop;
- `prefers-reduced-motion` blijft ondersteund;
- nodes blijven echte buttons met toetsenbordbediening.

## 7. Security- en privacygrens

De publieke build bevat geen lokale infrastructuuradressen, persoonsgegevens, trainingsbestanden, OAuth-secrets of API-tokens. Live data en authenticatie horen in V0.5 bij een aparte veilige backend/self-hosted laag.

## 8. GitHub Pages-publicatie

De workflow gebruikt twee jobs binnen één workflowrun:

1. `build` checkt uit, configureert Node 20, voert `npm test` uit, configureert Pages en uploadt een Pages-compatibel artifact met de expliciete naam `github-pages`.
2. `deploy` heeft `needs: build`, gebruikt environment `github-pages` en deployt expliciet `artifact_name: github-pages`.

De jobscheiding voorkomt een artifactmetadata-race tussen finalisatie en onmiddellijke lookup. De uploader maakt de vereiste gzip/tar-structuur; JoJo bouwt dat archief niet zelf.
