# JoJo Brain v0.2.0

JoJo is een mobile-first **Personal Control Center** voor drie domeinen:

- **Sport & Health** — Runnix, Garmin, Strava en toekomstige healthcontext;
- **Home** — Synology, monitoring en self-hosted services;
- **Development** — GitHub, repositories, releases en documentatie.

V0.2.0 verandert de app van een Runnix-centrische desktopkaart naar een JoJo-centrische, installeerbare PWA. Een gekozen tak komt centraal te staan; daarna verschijnen alleen de relevante volgende routes.

## Belangrijkste functies

- JoJo als centrale root;
- drill-downnavigatie met breadcrumbs, terug- en homeknop;
- mobiele app-layout plus desktop brainmap;
- mobiele quick dock voor Sport, JoJo, Home en Development;
- dynamisch detailpaneel per node;
- PWA-manifest, app-iconen, installprompt en standalone display;
- service worker en offline app-shell;
- directe publieke links voor Garmin, Strava en GitHub;
- lokale/private links bewust leeg;
- volledig statisch: geen buildstap en geen externe frontenddependencies.

## Lokaal bekijken

Dubbelklikken op `index.html` toont de interface. Voor service-worker- en PWA-tests is een lokale webserver nodig:

```bash
npm run serve
```

Open daarna `http://localhost:8080`.

## Testen

```bash
npm test
```

De validatie controleert onder meer de kernbestanden, manifest-iconen, shortcuts, cacheversie, navigatiestructuur en lege lokale URL’s.

## Links configureren

Open `config.js`.

Publieke links mogen worden ingevuld. Laat adressen voor Runnix, Synology, DSM, Grafana, InfluxDB en Container Manager leeg in een publieke repository, tenzij ze via een bewust beveiligde publieke toegangspoort lopen.

**Nooit toevoegen:** wachtwoorden, tokens, API-sleutels, cookies, NAS-credentials of trainingsbestanden.

## Installeren op een gsm

1. Publiceer via GitHub Pages.
2. Open de Pages-URL op de gsm.
3. Android/Chrome: kies **App installeren** of **Toevoegen aan startscherm**.
4. iPhone/Safari: kies **Deel → Zet op beginscherm**.

De browser bepaalt wanneer de automatische installatieknop zichtbaar wordt. Op iOS verloopt installatie altijd via het Deel-menu.

## Publiceren

De bestaande workflow `.github/workflows/deploy-pages.yml` valideert de app en publiceert de repositoryroot naar GitHub Pages na een push naar `main`.

## Privacy

JoJo v0.2.0 bevat geen persoonlijke trainingsdata, API-integraties, accounts, analytics of secrets. De PWA cachet alleen de statische app-shell op het toestel.
