# Test Report — JoJo Brain V0.3.0.1

**Datum:** 20 november 2026  
**Scope:** Samsung/PWA bootstrap hotfix  
**Resultaat:** geslaagd voor publicatie.

## 1. Diagnose gereproduceerd

V0.3.0 kon vóór de eerste graphrender stoppen wanneer `ResizeObserver` ontbrak. In die toestand bleef het bootscherm staan en kon de statische shell zichtbaar worden. Een V0.3.0 service worker hield bovendien onversioned cache-first assets vast, waardoor een bestaande PWA een gemengde release kon laden.

## 2. Samsung compatibility test

Getest met Samsung Galaxy S24 Ultra-achtige user agent, 412 × 915 viewport en touchscreenmodus.

Expliciet uitgeschakeld vóór paginalaad:

- `window.ResizeObserver`;
- `CSS.escape`.

Resultaat:

- `app-ready` bereikt;
- `is-booting` verwijderd;
- JoJo zichtbaar als echte centrale node;
- Sport & Health, Home en Development zichtbaar;
- canvas bevatte 6.908 bemonsterde niet-transparante pixels: particles en connections renderden;
- drag veroorzaakte 2,11 px meetbare fysieke reactie van de verbonden centrale node;
- geen JavaScript- of consolefouten;
- bootscherm verborgen;
- drawer bleef ingeklapt en statische placeholders lekten niet.

## 3. Samsung visual viewport

De viewport werd tijdens runtime gewijzigd van 412 × 915 naar 412 × 790.

- `--app-height`: 915 → 790 px;
- universehoogte: 915 → 790 px;
- canvas en graph bleven actief;
- vier rootnodes bleven aanwezig.

## 4. Bestaande-PWA-upgrade zonder reinstall

Een persistent browserprofiel installeerde eerst de originele V0.3.0 service worker en cache. Daarna werden op dezelfde origin de V0.3.0.1-bestanden gepubliceerd en werd de bestaande client herladen.

Resultaat:

- oude cache vóór update: `jojo-brain-v0.3.0`;
- nieuwe cache na update: `jojo-brain-v0.3.0.1`;
- oude cache automatisch verwijderd;
- 14 release-versioned assetrequests waargenomen;
- V0.3.0.1 zichtbaar zonder verwijderen/herinstalleren;
- vier rootnodes gerenderd;
- bootscherm verborgen;
- geen consolefouten.

## 5. Responsive en offline regressie

| Viewport | Rootnodes | Sportnodes | Offline nodes | Service worker | Fouten |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 desktop | 4 | 6 | 6 | actief | 0 |
| 412 × 915 Samsung portrait | 4 | 6 | 6 | actief | 0 |
| 915 × 412 Samsung landscape | 4 | 6 | 6 | actief | 0 |

## 6. Statische validatie

- 30 vereiste app- en documentatiebestanden;
- 34 geldige graphnodes;
- versieconsistentie: `0.3.0.1`;
- versioned CSS/JS-assets;
- service-worker no-store navigatie en versioned assetcache;
- geen verplichte `CSS.escape`-dependency;
- optionele `ResizeObserver` met fallback;
- geen secrets of private IP-adressen;
- syntaxcontroles geslaagd.

## 7. Resterende praktijktest

Na Pages-deployment hoeft de bestaande Samsung-PWA niet verwijderd te worden. Open de app online en laat de eenmalige update/reload voltooien. Controleer daarna visueel dat de echte toestelstatus overeenkomt met deze regressietest.
