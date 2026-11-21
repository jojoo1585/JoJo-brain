# Conversation log — JoJo Brain

## V0.4.0.1 — GitHub Pages deployment hotfix

### Waarneming

De echte V0.4.0 Actions-run slaagde door checkout, Node-setup, static-appvalidatie, Pages-configuratie en artifactupload. `actions/deploy-pages@v4` meldde daarna in dezelfde job `Found 0 artifact(s)` en `No artifacts named "github-pages" were found`.

### Beslissing

1. De Sport & Health-code van V0.4.0 blijft behouden.
2. Upload en deployment komen in afzonderlijke jobs binnen dezelfde workflowrun.
3. `deploy` wacht via `needs: build` op de volledige build/upload-job.
4. De uploader wordt `actions/upload-pages-artifact@v5`.
5. Zowel uploader als deployer gebruiken expliciet de naam `github-pages`.
6. `npm test` blijft een harde gate vóór upload.
7. De workflowstructuur wordt voortaan ook automatisch gevalideerd.

### Resultaat

V0.4.0.1 is een gerichte deploymenthotfix; er zijn geen functionele wijzigingen aan de goedgekeurde Sport & Health-experience.

## V0.4.0 — Sport & Health

- Runnix blijft de trainingsengine met Vandaag, Planning, Execution en Progressie.
- Garmin is bron voor healthsignalen en devices, zonder overlap met Runnix Vandaag.
- Health aggregeert Sleep, HRV, Resting HR, Weight en Recovery.
- Strava focust op Activities, Trends en Volume; Segments is niet prominent.
- Live persoonlijke data en agenda-integratie blijven buiten V0.4.
