# JoJo Brain V0.4.0.2 — Sport & Health

JoJo Brain is een mobile-first persoonlijke navigatie-PWA. V0.4.0.2 behoudt de V0.4-constellatie en voegt twee gerichte verbeteringen toe: correcte tap-versus-draginteractie en de eerste veilige Runnix read-only adapterlaag.

Visueel gebruikt JoJo nu dezelfde product-family foundation als Runnix: near-black/dark navy, blue-violet-magenta/rose, selectief cyan, lichte typografie en rustige cardborders. JoJo blijft daarbij spatial en neural.

## Interactie

- mouse en touch gebruiken dezelfde 6 px bewegingsdrempel;
- draggen behoudt spring- en connected-nodephysics;
- loslaten na drag opent nooit de drawer/bottom sheet;
- alleen een genuine tap focust of opent een node.

## Runnix preview

Sport & Health toont een compacte Runnix read-only preview. Op de publieke Pages-site is de status bewust:

**Local-only · veilige bron niet verbonden**

Er staat geen NAS-URL, token of private endpoint in de repository. De adapter doet pas een request wanneer een toekomstige beveiligde/self-hosted JoJo een same-origin read-only bridge configureert. Zonder bridge wordt geen training of metric verzonnen.

De adapter accepteert alleen beperkte trainingscontext:

- Vandaag;
- laatste uitvoering;
- progressie.

Garmin-healthdata, persoonlijke healthwaarden en trainingbestanden horen niet in deze preview.

## Canonical site

`https://jojo1585.github.io/jojo-brain/`

Gebruik deze volledige URL, inclusief repositorypad en afsluitende slash.

## Niet in V0.4.0.2

- live Garmin, Strava of Health;
- Google Calendar;
- live Home of Development;
- directe browsertoegang tot Runnix/NAS;
- secrets of persoonsgegevens.

## Lokaal

```bash
npm run serve
npm test
```

Browserregressie met een beschikbare Playwright/Chromium-installatie:

```bash
JOJO_CHROMIUM_PATH=/pad/naar/chrome npm run test:browser
```

Zie `ARCHITECTURE.md`, `ENGINE.md`, `TESTING.md` en `TEST_REPORT-V0.4.0.2.md`.
