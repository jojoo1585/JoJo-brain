# Publiceren via GitHub Desktop

Deze versie vervangt alleen de bestanden van de aparte **jojo-brain** repository. Er wordt niets gewijzigd aan Runnix.

1. Pak `JoJo-Brain-v0.2.0.zip` uit in een tijdelijke map.
2. Open je bestaande lokale `jojo-brain` repository via **Repository → Show in Explorer** in GitHub Desktop.
3. Kopieer de volledige inhoud van de uitgepakte map `JoJo-Brain-v0.2.0` naar die bestaande repositorymap.
4. Kies **bestanden vervangen** wanneer Windows dat vraagt.
5. Controleer in GitHub Desktop dat de wijzigingen alleen in de repository **jojo-brain** staan.
6. Gebruik als commit summary: `JoJo Brain v0.2.0 - Mobile PWA foundation`.
7. Klik **Commit to main** en daarna **Push origin**.
8. Open op GitHub het tabblad **Actions**. De workflows **Validate JoJo Brain** en **Deploy JoJo Brain to Pages** moeten groen worden.
9. Open daarna de bestaande Pages-link opnieuw.

## Als de oude versie nog zichtbaar blijft

De PWA gebruikt bewust een cache voor offline gebruik. Sluit het browsertabblad of de geïnstalleerde app volledig en open opnieuw. Indien nodig: vernieuw de pagina één keer hard of verwijder de oude snelkoppeling en installeer JoJo opnieuw.

## Installeren op gsm

- **Android/Chrome:** gebruik de knop **Installeer app** wanneer die verschijnt, of het browsermenu **App installeren / Toevoegen aan startscherm**.
- **iPhone/Safari:** kies **Deel → Zet op beginscherm**.

## Links

Publieke Garmin-, Strava- en GitHub-links werken direct. Lokale Runnix-, Synology-, Grafana-, InfluxDB- en Container Manager-links blijven veilig leeg in `config.js`.
