# Test Report — JoJo Brain V0.3.0

**Datum:** 20 november 2026  
**Build:** Living Neural Universe  
**Resultaat:** geslaagd voor packaging en publicatie.

## Geautomatiseerde bronvalidatie

- 27 vereiste app- en documentatiebestanden gecontroleerd;
- 34 graphnodes met geldige parent/child-relaties;
- manifest, iconen, shortcuts en relatieve Pages-scope gevalideerd;
- versies in `VERSION`, `package.json`, `config.js` en service-worker consistent;
- lokale/private URL's leeg;
- geen ingebedde secrets of private IP-adressen gevonden;
- JavaScript-syntax van alle runtimebestanden geslaagd.

## Browsertest

Uitgevoerd in headless Chromium op vier viewports:

| Viewport | Root | Sport-cluster | Overlap na stabilisatie | Service worker | Offline app-shell | Consolefouten |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 desktop | 4 nodes | 6 nodes | geen | actief | geslaagd | geen |
| 390 × 844 phone | 4 nodes | 6 nodes | geen | actief | geslaagd | geen |
| 844 × 390 phone landscape | 4 nodes | 6 nodes | geen | actief | geslaagd | geen |
| 768 × 1024 tablet | 4 nodes | 6 nodes | geen | actief | geslaagd | geen |

## Physics

Een verbonden node werd 90 px horizontaal en 35 px verticaal gesleept. De centrale gekoppelde node reageerde meetbaar tijdens de drag. Na loslaten stabiliseerde de cluster opnieuw zonder overlap.

## Functioneel gecontroleerd

- JoJo-root en drie hoofdtakken;
- focus naar Sport & Health;
- Runnix-, Garmin-, Strava- en Health-satellieten;
- dragged nodes en reagerende connections;
- mobiele dock en bottom sheet;
- Strava-link;
- hash deep links;
- service-workeractivatie en offline reload.

## Performanceprofiel

De build gebruikt een begrensde canvas-DPR, een lager particle-budget op telefoon, een kleine zichtbare subgraph en geen externe physicslibrary. De browserproeven bleven responsief. Headless callbackmetingen zijn omgevingsafhankelijk en worden niet als echte toestelbenchmark behandeld.

## Openstaande praktijktest

Na publicatie blijft één echte-hardwarecontrole aanbevolen:

- visuele soepelheid op de doeltelefoon;
- Android- of iOS-installatie vanaf de Pages-URL;
- subjectieve beoordeling van nodeafstand, motion en leesbaarheid;
- iOS Safari offline- en beginschermgedrag indien iPhone relevant is.
