# JoJo Brain V0.3.0.1 — Living Neural Universe Hotfix

JoJo Brain is een mobile-first persoonlijke navigatie-PWA. V0.3.0 veranderde de vaste V0.2-kaart een levend ruimtelijk universum waarin JoJo het centrale anker blijft en domeinen als fysiek verbonden clusters reageren.

## Hoofdstructuur

- **JoJo** — centrale root en persoonlijk control center.
- **Sport & Health** — eerste volledig uitgewerkte cluster met Runnix, Garmin, Strava en Health.
- **Home** — secundaire hoofdtak voor lokale infrastructuur en monitoring.
- **Development** — secundaire hoofdtak voor broncode, releases en JoJo-projectdocumentatie.

## V0.3.0 in het kort

- full-screen spatial graph;
- lichte springfysica zonder externe library;
- sleepbare nodes, waarbij verbonden nodes fysiek reageren;
- subtiele zweefbeweging en bewegende signaalpulsen;
- canvas-gebaseerde sterren- en neurale achtergrond;
- focus/zoomovergang wanneer een cluster opent;
- toegankelijke DOM-buttons bovenop de canvaslaag;
- begrensde pixel ratio en lager particle-budget op telefoons;
- `prefers-reduced-motion`-ondersteuning;
- behouden PWA-installatie, appiconen, offline cache en GitHub Pages-workflow.

## Gebruiken

- **Tik/klik** op een node om de cluster te focussen of het detail te openen.
- **Sleep** een node. De veren trekken verbonden nodes mee en brengen het geheel geleidelijk terug naar de clusterlayout.
- Gebruik **Terug**, de breadcrumbs of de JoJo-knop om naar een hoger niveau te gaan.
- Op mobiel opent detailinformatie als een bottom sheet.

## Lokaal uitvoeren

```bash
npm run serve
```

Open `http://localhost:8080`.

## Testen

```bash
npm test
```

Zie `TESTING.md` voor de volledige verificatiematrix.

## Links configureren

Alle configureerbare URL's staan in `config.js`. Publieke links mogen worden ingevuld. Lokale of private adressen blijven leeg in de publieke repository. Voeg nooit tokens, wachtwoorden, cookies of persoonsgegevens toe.

## Documentatie

- `ARCHITECTURE.md` — actuele componenten, datastroom en grenzen;
- `ENGINE.md` — fysica- en renderengine;
- `ROADMAP.md` — volgende ontwikkelstappen;
- `TESTING.md` — geautomatiseerde en manuele checks;
- `TEST_REPORT-V0.3.0.md` — uitgevoerd testresultaat voor deze build;
- `VERSION_HISTORY.md` — versie-overzicht;
- `CONVERSATION_LOG.md` — beslissingen per build;
- `CHANGELOG.md` en `CHANGELOG-V0.3.0.md` — concrete wijzigingen.


## V0.3.0.1 hotfix

Herstelt Samsung installed-PWA-initialisatie, gebruikt de werkelijke visual viewport en voorkomt gemengde oude/nieuwe cached assets. Een bestaande installatie werkt zichzelf bij; opnieuw installeren is niet vereist. Zie `CHANGELOG-V0.3.0.1.md`.
