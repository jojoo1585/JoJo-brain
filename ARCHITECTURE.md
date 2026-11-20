# Architecture · JoJo Brain v0.2.0

## Navigatiemodel

```text
JoJo
├── Sport & Health
│   ├── Runnix
│   │   ├── Vandaag
│   │   ├── Planning
│   │   ├── Progressie
│   │   ├── Intelligence
│   │   └── TCX Import
│   ├── Garmin
│   ├── Strava
│   └── Health
│       ├── Recovery
│       ├── Slaap & HRV
│       └── Body
├── Home
│   ├── Synology
│   │   ├── DSM
│   │   └── Storage
│   ├── Monitoring
│   │   ├── Grafana
│   │   └── InfluxDB
│   └── Services
│       └── Containers
└── Development
    ├── GitHub
    ├── Runnix repository
    ├── JoJo Brain repository
    ├── Releases
    └── Documentation
```

## Techniek

- `index.html` bevat de semantische app-shell.
- `styles.css` bevat de responsieve desktop- en mobiele presentatie.
- `app.js` bevat het statische navigatiemodel, rendering, history/hashnavigatie, installprompt en status.
- `config.js` is de enige plaats voor configureerbare links.
- `manifest.webmanifest` beschrijft de installeerbare app en shortcuts.
- `service-worker.js` cachet alleen first-party statische assets.
- `offline.html` is de laatste fallback wanneer zelfs de route niet in cache staat.

## Securitygrens

De publieke JoJo-repository is een navigatielaag, geen authenticatie- of integratielaag. Ze bevat daarom geen lokale adressen, secrets of proxylogica. Een toekomstige veilige externe verbinding naar de thuisomgeving hoort achter een aparte authenticatie- en netwerklaag.

## Uitbreiden

Een node wordt toegevoegd aan de `nodes`-map in `app.js` en vervolgens opgenomen in de `children`-lijst van zijn ouder. Een externe actie gebruikt alleen een `linkKey`; de URL zelf blijft in `config.js`.
