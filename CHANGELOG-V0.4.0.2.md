# Changelog — JoJo Brain V0.4.0.2

## Runnix product-family alignment

- Near-black/dark-navy surfaces en neutralere borders vormen de globale basis.
- Primaire accenten volgen Runnix: blue → violet → magenta/rose.
- Cyan blijft gereserveerd voor data-, status- en healthsignalen.
- Healthgroen is verschoven naar cyan/teal; Strava-oranje naar een gedempte rose/coral, zodat source-accenten herkenbaar blijven zonder rainbow-effect.
- Glow is terughoudender op nodes, topbar en panels.
- De Runnix-node gebruikt een magenta-violet-blue accentrail en cardachtige focusvorm.
- De Runnix read-only preview gebruikt dezelfde dark card, border, typography en accentrail als Runnix.
- Home en Development behouden hun structuur; alleen gedeelde globale thematokens wijzigen.

## Pointer/touch interaction

- Nieuwe gedeelde `pointer-gesture.js` met een drempel van 6 px voor mouse en touch.
- Een beweging onder de drempel blijft een tap.
- Zodra de maximale verplaatsing 6 px bereikt, blijft de gesture een drag, ook wanneer de pointer terug naar het begin beweegt.
- Een drag laat de node los in de bestaande springphysics maar opent geen detailpaneel en wijzigt geen clusterfocus.
- Alleen een genuine tap activeert of focust een node.
- `pointercancel` activeert nooit een node.
- De physics, edge springs en connected-node response blijven behouden.

## Runnix read-only foundation

- Nieuwe `runnix-adapter.js` als afgebakende bronlaag.
- Publieke configuratie staat standaard op `local-only` met een lege endpoint.
- Alleen een toekomstige same-origin bridge wordt geaccepteerd; cross-origin/NAS-calls worden geweigerd.
- Geen token, credential of infrastructuuradres in frontendcode.
- De adapter accepteert alleen beperkte Runnix-trainingscontext: Vandaag, laatste uitvoering en progressie.
- Garmin-specifieke healthvelden worden genegeerd.
- Sport & Health toont een kleine read-only Runnix-preview met de eerlijke status `Local-only` zolang geen veilige bridge bestaat.
- Er worden geen fallbacktrainingen, persoonlijke waarden of voorbeeldmetrics verzonnen.

## GitHub Pages en repositorypad

- Canonical URL vastgelegd als `https://jojo1585.github.io/jojo-brain/`.
- Canonical metadata en een repository-aware `404.html` toegevoegd.
- De bestaande succesvolle build/upload/deploy-jobs blijven behouden.
- De buildjob stageert nu uitsluitend de echte siteshell in `_site` en uploadt die map als `github-pages` artifact.
- `.nojekyll`, index, 404-shell, PWA-assets en de twee nieuwe runtimebestanden worden expliciet gecontroleerd.

## Niet in deze build

- geen live Garmin-, Strava- of Health-data;
- geen Google Calendar;
- geen Home- of Development-data;
- geen publieke NAS- of rechtstreekse Runnix-verbinding;
- geen trainingbestanden of persoonlijke healthwaarden.
