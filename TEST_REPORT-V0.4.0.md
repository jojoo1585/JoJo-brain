# Test report — JoJo Brain V0.4.0

**Scope:** eerste inhoudelijke JoJo-blok, Sport & Health.  
**Datum:** 21 november 2026.

## Geautomatiseerd

Uitgevoerd met `npm test`.

Gecontroleerd:

- releaseversies in package, config, manifest, HTML-assets en service worker;
- volledige app-shell en iconenset;
- geldige graphhiërarchie en alle parent/childreferenties;
- Runnix met exact Vandaag, Planning, Execution en Progressie;
- Garmin zonder training/Vandaag-overlap;
- Strava zonder prominente Segments-node;
- Health met vijf uitbreidbare signalen;
- zes semantische datalijnen;
- mobiele performancegrenzen, reduced motion en Samsung/WebView fallback;
- afwezigheid van credentials en private netwerkadressen.

## Browser- en runtimecontrole

- JavaScript-syntax gecontroleerd met `node --check`.
- Headless Chromium gecontroleerd op 1440×900 en 390×844.
- Sport & Health, Runnix, Garmin, Strava en Health afzonderlijk gerenderd.
- Geen console- of page-errors vastgesteld.
- Service worker nam de pagina over en Sport & Health startte daarna succesvol offline.
- Alle lokale assetreferenties in HTML, manifest en service worker bestaan.
- ZIP-inhoud en versieconsistentie worden na packaging opnieuw gecontroleerd.

## Handmatige acceptatie op doeltoestel

Nog uit te voeren na plaatsing op GitHub Pages/PWA:

1. Open Sport & Health en controleer de vier hoofdhubs.
2. Open Runnix en controleer de vier routes.
3. Open Garmin en controleer dat Training/Vandaag niet als node terugkomt.
4. Open Strava en controleer dat Segments niet prominent is.
5. Open Health en controleer de vijf healthsignalen.
6. Sleep nodes en controleer springgedrag en leesbaarheid.
7. Controleer portrait, landscape, geïnstalleerde PWA en update zonder reinstall.

## Resultaat

De lokale geautomatiseerde en statische releasechecks zijn geslaagd. Visuele hardwareacceptatie blijft bewust een aparte stap.
