# Security

JoJo Brain is een publieke statische navigatie-app.

## Niet committen

- wachtwoorden, tokens, API-sleutels of cookies;
- lokale NAS-, Runnix-, Grafana-, InfluxDB- of Container Manager-adressen;
- TCX-, FIT-, GPX- of andere persoonlijke trainingsbestanden;
- databasebestanden, exports of `.env`-bestanden;
- private certificaten of sleutels.

## Links

Gebruik `config.js` alleen voor publieke of bewust veilig gepubliceerde URL’s. Externe links openen met `noopener noreferrer`.

## PWA-cache

De service worker cachet alleen first-party statische bestanden. Externe pagina’s en data worden niet door JoJo gecachet.
