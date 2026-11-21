# JoJo Brain V0.4.0.1 — Sport & Health Constellation

JoJo Brain is een mobile-first persoonlijke navigatie-PWA. V0.4.0.1 behoudt het volledige **Sport & Health**-blok van V0.4.0 en herstelt de GitHub Pages-publicatie.

## Deployment hotfix

De Pages-workflow valideert en uploadt nu in een afzonderlijke `build`-job. De afhankelijke `deploy`-job ontvangt daarna exact één artifact met naam `github-pages`. Dit voorkomt dat deployment de artifactlookup uitvoert terwijl de uploadmetadata nog niet zichtbaar is.

## Sport & Health

- **Runnix** — trainingsengine met Vandaag, Planning, Execution en Progressie.
- **Garmin** — bron voor healthsignalen en devices; geen duplicatie van Runnix Vandaag.
- **Strava** — Activities, Trends en Volume; Segments staat niet prominent.
- **Health** — uitbreidbare aggregator voor Sleep, HRV, Resting HR, Weight en Recovery.

De bewegende datalijnen leggen de rollen uit:

```text
Garmin ──health signals──> Health ──recovery context──> Runnix
Strava ──activity check───────────────────────────────> Runnix
```

## Privacygrens

V0.4.0.1 toont een architectuur en navigatie, geen persoonlijke data. Er worden geen Garmin-, Strava-, Runnix- of healthwaarden opgehaald. TCX blijft in Runnix op de NAS. Voeg nooit tokens, wachtwoorden, private netwerkadressen of persoonsgegevens toe aan de publieke repository.

## Gebruiken

- Tik/klik op een node om te focussen of details te openen.
- Sleep nodes om de springfysica te voelen.
- Gebruik Terug, breadcrumbs of JoJo om omhoog te navigeren.
- Op mobiel opent detailinformatie als bottom sheet.

## Lokaal uitvoeren

```bash
npm run serve
```

Open `http://localhost:8080`.

## Testen

```bash
npm test
```

Zie `TESTING.md`, `TEST_REPORT-V0.4.0.md` en `TEST_REPORT-V0.4.0.1.md`.

## Volgende blokken

- **V0.5:** private/self-hosted securitylaag en een eerste read-only Runnix-koppeling.
- **V0.6:** My Day met privé- en werkagenda in één tijdlijn.
