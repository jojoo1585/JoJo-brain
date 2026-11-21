# Roadmap — JoJo Brain

## Actuele baseline: V0.4.0.2

Sport & Health bevat nu:

- de volledige V0.4-constellatie en visuals;
- betrouwbare 6 px tap-versus-dragclassificatie voor mouse en touch;
- springphysics zonder detailpaneel na drag;
- een afgebakende Runnix read-only adapter;
- een eerlijke Local-only preview op de publieke site;
- een robuuste Pages-site-root voor `/jojo-brain/`.
- een gedeelde Runnix/JoJo product-family palette met restrained glow en herkenbare dark cards.

## V0.4.0.2 acceptatie

- desktop mouse drag opent geen drawer;
- installed mobile PWA touch drag opent geen bottom sheet;
- genuine tap focust/opent wel;
- canonical URL toont V0.4.0.2;
- PWA werkt bij zonder reinstall;
- geen request naar Runnix wanneer endpoint leeg is;
- geen private of persoonlijke data in repository/artifact.
- desktop- en mobile-screenshots volgen de vastgelegde Runnix-family thematokens zonder rainbow-effect.

## V0.5 — Secure Runnix bridge

Pas na private/self-hosted beveiliging:

- authenticatie en eigen backend;
- same-origin read-only route volgens het V0.4.0.2-adaptercontract;
- expliciete CORS- en sessionpolicy;
- secrets alleen server-side;
- echte Runnix-preview voor Vandaag, Execution en Progressie;
- fout- en stale-state zonder Garmin-healthduplicatie.

## Later

### Andere Sport & Health-bronnen

Garmin, Strava en Health blijven uitgeschakeld totdat iedere bron een afzonderlijk beveiligings-, privacy- en datacontract heeft.

### My Day

Google Calendar en werkagenda blijven een aparte toekomstige hoofdtak. Ze komen niet in Sport & Health en niet vóór de securitylaag.

### Home en Development

Geen live statusdata totdat JoJo private/self-hosted is.

## Blijvende regel

Geen secrets, tokens, persoonsgegevens, trainingbestanden of private infrastructuuradressen in de publieke statische build.
