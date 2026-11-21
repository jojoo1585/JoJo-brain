# Publiceren — JoJo Brain V0.4.0.2

## Canonical URL

`https://jojo1585.github.io/jojo-brain/`

De repositorynaam wordt in de publieke URL als lowercase `jojo-brain` gebruikt. Gebruik de afsluitende slash.

## Plaatsen

1. Pak `JoJo-Brain-v0.4.0.2-Sport-Health.zip` uit.
2. Kopieer de **volledige inhoud** van `JoJo-Brain-v0.4.0.2` naar de root van de bestaande repository.
3. Vervang ook `.github/workflows/deploy-pages.yml`.
4. Commit bijvoorbeeld: `JoJo v0.4.0.2 gestures and Runnix adapter`.
5. Push naar `main`.

## Verwachte workflow

1. **Validate and upload Pages artifact**
   - checkout;
   - Node 20;
   - `npm test`;
   - Configure Pages;
   - stage site in `_site`;
   - upload exact artifact `github-pages`.
2. **Deploy to GitHub Pages**
   - start na `needs: build`;
   - deployt artifact `github-pages`.

Beide jobs moeten groen zijn. De `_site`-root bevat de app-shell direct op artifactniveau, dus niet in een extra projectmap.

## Na deployment

1. Open uitsluitend de canonical URL.
2. Controleer header `V0.4.0.2`.
3. Controleer in Sport & Health de Runnix-status `LOCAL-ONLY`.
4. Test drag en tap met mouse.
5. Open de geïnstalleerde PWA online voor de update.
6. Test drag en tap met touch.

Opnieuw installeren is normaal niet nodig. De PWA gebruikt een nieuwe cachekey en release-versioned assets.
