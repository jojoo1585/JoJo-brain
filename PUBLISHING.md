# Publiceren — JoJo Brain V0.3.0.1

1. Pak `JoJo-Brain-v0.3.0.1.zip` uit.
2. Open in GitHub Desktop de bestaande lokale `jojo-brain` repository via **Repository → Show in Explorer**.
3. Kopieer de volledige inhoud van de uitgepakte map naar de repositorymap en vervang de bestaande bestanden.
4. Controleer dat je in de repository `jojo-brain` staat.
5. Commit summary: `JoJo Brain v0.3.0.1 - Samsung PWA bootstrap hotfix`.
6. Klik **Commit to main** en daarna **Push origin**.
7. Controleer onder **Actions** dat validatie en Pages-deployment groen worden.
8. Open de Pages-site opnieuw.

## Cache na update

V0.3.0.1 gebruikt een nieuwe cachekey en release-versioned assets. Laat de Pages-deployment eerst groen worden, open daarna de bestaande geïnstalleerde app online en laat de eenmalige update/reload voltooien. Verwijderen of opnieuw installeren is niet nodig.

## Installeren

- Android/Chrome: **App installeren** of **Toevoegen aan startscherm**.
- iPhone/Safari: **Deel → Zet op beginscherm**.


## Bestaande geïnstalleerde PWA

Niet verwijderen. Open de bestaande JoJo-app online na de groene Pages-deployment. De nieuwe service worker activeert en herlaadt de app maximaal één keer. Daarna moet V0.3.0.1 zichtbaar zijn en de graph onmiddellijk initialiseren.
