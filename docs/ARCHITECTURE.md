# JoJo Brain V1-architectuur

## Doel

Eén visuele voordeur naar het persoonlijke running-ecosysteem, zonder Runnix of de NAS-architectuur te koppelen aan de levenscyclus van het dashboard.

## Domeinen

- **Running**: Runnix, Garmin, Strava, TCX Import
- **Development**: GitHub, Runnix Releases, documentatie
- **Home**: Synology DSM, Grafana, Container Manager, InfluxDB

Work is bewust uitgesloten.

## Relaties

- Effen cyan/magenta datalijnen: actief of bestaand
- Gestippelde lijnen: gepland/toekomstig
- Paarse lijnen: development/release
- Groene lijnen: home/hosting

## Beveiligingsgrens

JoJo Brain bevat alleen navigatieconfiguratie. Geen tokens, health data, databasecredentials, NAS-secrets of ingebedde API-responses. Strava/MCP wordt later via een adapter achter Runnix gekoppeld; nooit rechtstreeks met een geheim vanuit deze statische frontend.

## Repositories

`runnix` en `jojo-brain` blijven gescheiden. Een Brain-release kan daardoor geen Runnix-release of planner-engine breken.
