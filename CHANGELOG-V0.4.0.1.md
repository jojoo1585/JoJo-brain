# Changelog — JoJo Brain V0.4.0.1

## GitHub Pages deployment hotfix

- De werkende V0.4.0 Sport & Health-code blijft inhoudelijk ongewijzigd.
- De Pages-workflow is opgesplitst in een `build`-job en een afhankelijke `deploy`-job.
- `build` voert checkout, Node 20, `npm test`, Pages-configuratie en artifactupload uit.
- De uploader is bijgewerkt naar `actions/upload-pages-artifact@v5`.
- De artifactnaam is expliciet `github-pages`, exact de standaard die `deploy-pages` verwacht.
- `include-hidden-files: true` behoudt onder meer `.nojekyll`; `.git` en `.github` worden door de Pages-uploader uitgesloten.
- `deploy` heeft `needs: build`, zodat artifactfinalisatie en artifactlookup niet langer onmiddellijk na elkaar in dezelfde job gebeuren.
- `actions/deploy-pages@v4` krijgt expliciet `artifact_name: github-pages`.
- De static-appvalidatie blijft een verplichte gate vóór upload en deployment.

## Aanleiding

De V0.4.0-run voltooide checkout, Node-setup, validatie, Pages-configuratie en upload, maar `deploy-pages` vond onmiddellijk daarna nul artifacts. De vorige V0.3.0.1-deployment bleef daardoor actief. Deze hotfix corrigeert uitsluitend de publicatieketen.
