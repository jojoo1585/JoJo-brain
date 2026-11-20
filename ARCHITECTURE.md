# Architecture — JoJo Brain V0.3.0

**Status:** actuele architectuurbaseline  
**Laatst bijgewerkt:** 20 november 2026  
**Architectuurwijziging:** vaste radiale DOM-layout vervangen door een hybride spatial graph.

## 1. Doel

JoJo Brain is een publieke, statische PWA en persoonlijke navigatielaag. De app visualiseert relaties tussen domeinen, maar bewaart geen accountdata en voert geen private integraties uit.

## 2. Conceptuele hiërarchie

```text
JoJo
├── Sport & Health
│   ├── Runnix (integratiereferentie)
│   │   ├── Vandaag
│   │   ├── Planning
│   │   ├── Progressie
│   │   ├── Intelligence
│   │   └── TCX Import
│   ├── Garmin
│   │   ├── Training
│   │   ├── Health data
│   │   └── Devices
│   ├── Strava
│   │   ├── Activities
│   │   ├── Segments
│   │   └── Community
│   └── Health
│       ├── Recovery
│       ├── Slaap & HRV
│       └── Body
├── Home
│   ├── Synology
│   ├── Monitoring
│   └── Services
└── Development
    ├── GitHub
    ├── JoJo repository
    ├── Releases
    └── Documentation
```

Runnix komt alleen voor als gekoppelde bestemming binnen Sport & Health. De interne Runnix-architectuur hoort niet in deze repository.

## 3. Runtime-lagen

### 3.1 App-shell — `index.html`

Semantische full-screen shell met header, breadcrumbs, graph viewport, detail drawer, mobiele dock en boot-state.

### 3.2 Inhoudsmodel — `graph-data.js`

Enige bron voor node-inhoud en hiërarchie. Elke node definieert:

- identiteit, parent en children;
- titel, status, domein en accent;
- beschrijving, flow en kernpunten;
- optionele `linkKey` naar `config.js`.

De engine kent geen domeinspecifieke tekst.

### 3.3 Spatial engine — `neural-engine.js`

Hybride renderlaag:

- `<canvas>` voor particles, glow, verbindingen en signaalpulsen;
- DOM-buttons voor nodes, toetsenbordfocus en pointerinteractie;
- velocity-based springfysica met target-attractie, edge springs, lokale repulsie, damping en grenzen;
- dynamische zichtbare subgraph: ancestors + focusnode + directe children;
- adaptief particle-budget en device-pixel-ratio.

### 3.4 Orchestratie — `app.js`

Beheert:

- clusterfocus, geschiedenis en hash deep links;
- breadcrumbs en detail drawer;
- online/offline-indicatie;
- installprompt en service-workerregistratie;
- reduced-motionmodus.

### 3.5 Presentatie — `styles.css`

Full-screen compositie, glass overlays, neurale nodes, desktopdrawer en mobiele bottom sheet. Animatie blijft decoratief; de engine werkt ook met reduced motion.

### 3.6 Configuratie — `config.js`

Publieke URL-configuratie. Lokale en private adressen blijven leeg. Er is geen token- of credentialmodel.

### 3.7 PWA — `manifest.webmanifest` en `service-worker.js`

- standalone installatie;
- relatieve scope voor GitHub Pages;
- first-party app-shellcache;
- network-first navigatie met cached fallback;
- geen caching van externe pagina's.

## 4. Fysisch model

Per frame worden alleen de zichtbare nodes berekend. De bovengrens is klein: het pad naar de focus plus directe kinderen.

Krachten:

1. **Target attraction** houdt een cluster leesbaar.
2. **Spring edges** laten verbonden nodes reageren op slepen.
3. **Local repulsion** beperkt overlap.
4. **Damping** voorkomt instabiliteit.
5. **Boundary force** houdt nodes binnen de viewport.
6. **Micro-float** geeft subtiele levendigheid en vervalt bij reduced motion.

## 5. Performancegrenzen

- geen externe visualisatie- of physicslibrary;
- maximaal 1.25 device-pixel-ratio op mobiel, 1.6 op desktop;
- 32 particles op mobiel, 62 op desktop, 18 met reduced motion;
- O(n²)-repulsie is veilig omdat alleen de kleine zichtbare subgraph wordt berekend;
- canvascontext gebruikt `desynchronized` waar beschikbaar;
- DOM-updates gebruiken alleen `translate3d`;
- blur/backdrop-effecten zijn op mobiele nodes uitgeschakeld.

## 6. Security- en privacygrens

JoJo Brain is geen proxy, database of authenticatielaag. De publieke build bevat geen lokale infrastructuuradressen, persoonsgegevens, trainingsbestanden, tokens of credentials. Veilige externe toegang moet buiten JoJo worden opgelost.

## 7. Uitbreidingsregels

1. Voeg inhoud toe in `graph-data.js`.
2. Koppel een configureerbare URL uitsluitend via een `linkKey` in `config.js`.
3. Werk `ARCHITECTURE.md` bij wanneer runtimecomponenten, datastromen of grenzen wijzigen.
4. Werk voor iedere build changelog, versiehistoriek, testplan en conversation log bij.
