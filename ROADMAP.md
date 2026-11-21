# Roadmap — JoJo Brain

## Actuele baseline: V0.4.0

Sport & Health is het eerste volwassen JoJo-blok:

- Runnix als trainingsengine;
- Garmin als health- en devicebron zonder Runnix-overlap;
- Strava voor Activities, Trends en Volume zonder Segments-focus;
- Health als uitbreidbare aggregator;
- semantische datalijnen en een sterkere mobile-first space/neural experience.

## Acceptatie V0.4.0

- praktijktest op de doeltelefoon;
- controle van nodeafstand in portrait en landscape;
- validatie van sleep/tapgedrag;
- PWA-update testen zonder reinstall;
- alleen visuele of functionele fixes binnen Sport & Health.

## V0.5 — Security + eerste live koppeling

- private/self-hosted JoJo;
- authenticatie en eigen backend;
- secrets veilig buiten de frontend;
- GitHub-repository private;
- eerste read-only Runnix-koppeling;
- geen Garmin/Strava/Health-integratie vóór de securitygrens staat.

## V0.6 — My Day

- aparte hoofdtak, niet onder Health;
- privé- en werkagenda in één chronologische tijdlijn;
- duidelijke bronkleur en privacyfiltering;
- Google Calendar en werkagenda via veilige connectors;
- later optioneel trainingsplanning uit Runnix als derde laag.

## Blijvende regel

Geen secrets, tokens, persoonsgegevens of private netwerkadressen in de publieke statische build.
