# 20 november 2026 — V0.3.0.1 Samsung/PWA Bootstrap Hotfix

### Aanleiding

Een echte Samsung/PWA-screenshot toonde V0.3.0, maar geen graph. `NEURAL UNIVERSE INITIALISEREN` bleef staan en statische shellcontrols waren los zichtbaar.

### Diagnose

- bootstrap kon vóór `render()` afbreken door de harde `ResizeObserver`-dependency;
- de onversioned cache-first assets maakten een gemengde oude/nieuwe app-shell mogelijk bij een update van een reeds geïnstalleerde PWA;
- de vaste minimumhoogte week af van de Samsung visual viewport.

### Beslissingen

- geen herontwerp: V0.3 Living Neural Universe blijft de baseline;
- compatibility fallbacks in de engine;
- visual-viewportmeting vóór CSS en tijdens runtime;
- release-versioned assets en atomische service-workerupdate;
- statische fallbackcontrols blijven verborgen tot `app-ready`;
- de bestaande PWA moet zichzelf bijwerken zonder herinstallatie;
- hotfixdocumentatie en upgrade-regressietest worden onderdeel van de release.

---

## Eerdere beslissingen

## 20 november 2026 — V0.3.0 Living Neural Universe

### Aanleiding

De V0.2 PWA-basistests werkten. De goedgekeurde vervolgrichting vroeg om een veel ruimtelijkere, levende ervaring zonder de mobiele prestaties of het installatie/offlinefundament te verliezen.

### Beslissingen

- JoJo blijft het centrale anker in elke zichtbare subgraph.
- De vaste ring-layout wordt vervangen door springfysica.
- Nodes worden sleepbaar; gekoppelde nodes moeten zichtbaar reageren.
- Canvas verzorgt particles en verbindingen; DOM blijft verantwoordelijk voor toegankelijke interactie.
- Alleen de actuele ancestry en directe satellieten worden berekend.
- Sport & Health wordt als eerste cluster volledig uitgewerkt.
- Home en Development blijven secundaire hoofdtakken.
- Geen externe graph- of physicslibrary om telefoonperformance en offline werking beheersbaar te houden.
- Projectdocumentatie wordt voortaan per build bijgewerkt.
- Architectuurwijzigingen vereisen een gelijktijdige update van `ARCHITECTURE.md`.
- Andere projecten worden alleen als integratiereferentie genoemd waar dat functioneel relevant is.

### Scopebewaking

Niet toegevoegd: live accountdata, API-authenticatie, publieke lokale adressen, trainingsbestanden, analytics, 3D/WebGL of persistente nodeposities.

## 20 november 2026 — V0.2.0 Mobile/PWA Foundation

JoJo werd de root met drie hoofddomeinen. Mobiele drill-down, installability, appiconen, offline app-shell en een veilige publieke configuratie werden toegevoegd.

## 20 november 2026 — V0.1.0 Initial Brainmap

Eerste werkende statische brainmap en GitHub Pages-baseline met een detailpaneel, domeinnodes en gescheiden publieke/lokale links.
