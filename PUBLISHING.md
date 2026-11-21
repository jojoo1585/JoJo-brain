# Publiceren — JoJo Brain V0.4.0.1

## Bestanden plaatsen

1. Pak `JoJo-Brain-v0.4.0.1-Pages-Hotfix.zip` uit.
2. Open de bestaande lokale `jojo-brain` repository.
3. Kopieer de **volledige inhoud** van de uitgepakte map naar de repositoryroot en vervang de bestaande bestanden.
4. Controleer vooral dat `.github/workflows/deploy-pages.yml` is vervangen.
5. Commit bijvoorbeeld met: `Fix JoJo v0.4 Pages artifact deployment`.
6. Push naar `main`.

## Verwachte Actions-run

De workflow toont nu twee jobs:

1. **Validate and upload Pages artifact**
   - Checkout
   - Set up Node.js
   - Validate static app
   - Configure Pages
   - Upload GitHub Pages artifact
2. **Deploy to GitHub Pages**
   - start pas nadat job 1 volledig klaar is;
   - deployt exact artifact `github-pages`.

Beide jobs moeten groen zijn. Start niet handmatig een tweede run terwijl de eerste nog loopt; de concurrencygroep `pages` beheert dit.

## Na groene deployment

1. Open de Pages-site online.
2. Controleer dat de header **V0.4.0.1** toont.
3. Open Sport & Health en controleer Runnix, Garmin, Strava en Health.
4. Open daarna de bestaande geïnstalleerde PWA online zodat de nieuwe service worker activeert.

Opnieuw installeren is normaal niet nodig. De vorige V0.3.0.1-site blijft actief totdat deze workflow succesvol deployt.
