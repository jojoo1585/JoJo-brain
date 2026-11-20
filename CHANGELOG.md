# Changelog

## 0.2.0 — Mobile/PWA foundation

### Added

- JoJo als centrale root.
- Hoofddomeinen Sport & Health, Home en Development.
- Drill-downnavigatie waarin de gekozen tak centraal komt te staan.
- Runnix-routes Vandaag, Planning, Progressie, Intelligence en TCX Import.
- Health-routes Recovery, Slaap & HRV en Body.
- Homegroepering Synology, Monitoring en Services.
- Mobiele quick dock, breadcrumbs, terug- en homeknoppen.
- PWA-manifest, app-iconen, maskable iconen en iOS touch icon.
- Service worker, offline app-shell en offline fallback.
- Installatieprompt waar de browser die ondersteunt.
- GitHub Actions-validatie en Pages-deployment.
- Geautomatiseerde statische validatie.

### Changed

- Desktopbrainmap is niet langer Runnix-centrisch; Runnix is nu een onderdeel van Sport & Health.
- Lokale infrastructuur is hiërarchisch gegroepeerd in plaats van als gelijkwaardige losse nodes.
- Development is bewust ondersteunend gepositioneerd.

### Security

- Lokale Runnix-, Synology-, DSM-, Grafana-, InfluxDB- en Container Manager-URL’s blijven leeg.
- Geen persoonlijke data, tokens, credentials of analytics toegevoegd.
