# Security — JoJo Brain

JoJo Brain is een publieke statische navigatie-PWA.

## Nooit committen

- tokens, wachtwoorden, API-sleutels, cookies of credentials;
- lokale NAS-, dashboard-, database- of serviceadressen;
- TCX-, FIT-, GPX- of andere persoonlijke bestanden;
- databases, exports, `.env`-bestanden, certificaten of private keys.

## Links

`config.js` bevat alleen publieke of bewust veilig gepubliceerde URL's. Externe links gebruiken `noopener noreferrer`.

## Runtime

- geen analytics;
- geen remote scripts of frontend-CDN;
- geen accountdata;
- service worker cachet uitsluitend first-party statische assets;
- physics en particles draaien volledig lokaal op het toestel.
