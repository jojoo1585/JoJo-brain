# Changelog — JoJo Brain V0.4.0

## Sport & Health experience

- Sport & Health is herwerkt tot een betekenisvolle constellatie met Runnix, Garmin, Strava en Health.
- Runnix toont exact vier routes: Vandaag, Planning, Execution en Progressie.
- De bestaande TCX Execution Intelligence blijft in Runnix; JoJo dupliceert of uploadt geen TCX-data.
- Garmin is beperkt tot Health Signals en Devices. Vandaag, planning, readiness en execution worden niet gedupliceerd.
- Strava focust op Activities, Trends en Volume. Segments is niet langer een prominente node.
- Health is een uitbreidbare aggregator met Sleep, HRV, Resting HR, Weight en Recovery.

## Visueel en interactie

- Nieuw Garmin-blauw naast cyan, magenta, groen, violet en oranje.
- Semantische datalijnen: Garmin → Health, Health → Runnix en Strava → Runnix.
- Runnix heeft een eigen closed loop tussen Vandaag, Execution, Progressie en Planning.
- Semantische lijnen zijn gestippeld, sterker verlicht en hebben een sneller signaalpartikel.
- Desktop toont compacte labels op datalijnen en gedimde zusterhubs bij focus.
- Mobiel houdt de kleinere directe subgraph om overlap en overbelasting te voorkomen.
- Sport & Health en Runnix kregen onderscheidende energy-core styling.
- Een compacte legenda verklaart Source, Context, Intelligence en Cross-check op grotere schermen.

## Grenzen

- Geen live Garmin-, Strava-, Health- of Runnix-data.
- Geen Google- of Microsoft-agenda.
- Geen authenticatie of backend in deze publieke PWA.
- Home en Development zijn functioneel ongewijzigd.
