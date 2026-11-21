# Conversation log — JoJo Brain

## V0.4.0.2 — Interaction + Runnix read-only foundation

### Vraag

1. Draggen en loslaten mag het detailpaneel nooit openen.
2. Begin echte data-integratie uitsluitend met Runnix.
3. Publiceer geen private infrastructuur of persoonlijke data.
4. Maak het GitHub Pages-repositorypad robuust en documenteer de canonical URL.
5. Breng JoJo visueel dichter bij Runnix zonder het spatial/neural karakter te verliezen.

### Beslissingen

- Eén gestureclassifier voor desktop mouse en mobile touch.
- Drempel van 6 px; dragstatus blijft gelatcht.
- Physics start pas na de drempel en blijft verder ongewijzigd.
- Alleen genuine tap activeert een node.
- Runnix wordt de eerste en enige adapterbron.
- De publieke build heeft geen endpoint en toont daarom `Local-only`.
- Een toekomstige integratie mag alleen via een same-origin read-only bridge lopen.
- Alleen Vandaag, laatste uitvoering en progressie horen in de compacte preview.
- Garmin-specifieke healthdata horen niet in de Runnix-preview.
- Geen live Garmin, Strava, Health, Calendar, Home of Development in deze release.
- Canonical Pages-URL is `https://jojo1585.github.io/jojo-brain/`.
- De succesvolle twee-jobs Pages-flow blijft behouden; `_site` maakt de artifactroot expliciet.
- Runnix bepaalt de near-black, blue-violet-magenta/rose en selectieve cyan palette foundation.
- Runnix-node en read-only preview krijgen herkenbare card-, border- en accentrail-styling.
- Garmin, Health en Strava behouden alleen subtiele blue/cyan/rose bronaccenten; een rainbow-effect wordt vermeden.
- Home en Development wijzigen alleen via gedeelde globale thematokens.

### Resultaat

V0.4.0.2 is veilig bruikbaar als publieke PWA, lost de ongewenste dragselectie op en legt een testbare Runnix-contractgrens vast zonder te doen alsof publieke live toegang al bestaat.

## V0.4.0.1 — GitHub Pages deployment hotfix

- Artifactupload en deployment opgesplitst in afhankelijke jobs.
- Expliciete artifactnaam `github-pages`.
- Sport & Health-code ongewijzigd.

## V0.4.0 — Sport & Health

- Runnix, Garmin, Strava en Health kregen onderscheiden rollen.
- Semantische datalijnen en energy-core visuals.
