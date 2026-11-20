# JoJo Brain

Een losgekoppelde, statische en responsive **Running + Development + Home**-navigatiekaart met Runnix centraal.

## V1

- organische brainmap op desktop;
- compacte domeinkaarten op mobiel;
- Running: Runnix, Garmin, Strava en TCX Import;
- Development: GitHub, Releases en Docs;
- Home: Synology, Grafana, Container Manager en InfluxDB;
- onderscheid tussen actieve, lokale en toekomstige verbindingen;
- geen secrets, accounts of persoonlijke trainingsdata.

## Configuratie

Pas alleen `config.js` aan. Lege URL's blijven veilig zichtbaar als **Nog configureren**. Zet geen tokens, credentials of gevoelige queryparameters in dit bestand: alles in een statische website is leesbaar voor bezoekers.

## Lokaal openen

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Valideren

```bash
node scripts/validate.mjs
```

## Publicatie

De repository bevat een Pages-workflow. GitHub Pages is alleen geschikt als de map geen geheimen of privédata bevat. Lokale NAS-links werken buiten het thuisnetwerk pas nadat veilige externe toegang afzonderlijk is ontworpen.
