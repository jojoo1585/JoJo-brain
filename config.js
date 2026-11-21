/**
 * Publieke linkconfiguratie voor JoJo Brain.
 *
 * VEILIGHEIDSREGEL:
 * - Voeg hier nooit wachtwoorden, tokens, API-sleutels of credentials toe.
 * - Laat lokale/private adressen leeg in de publieke repository.
 * - Publieke webadressen mogen wel worden ingevuld.
 */
window.JOJO_CONFIG = Object.freeze({
  version: '0.4.0.2',
  site: Object.freeze({
    canonicalUrl: 'https://jojo1585.github.io/jojo-brain/',
    basePath: '/jojo-brain/'
  }),
  sources: Object.freeze({
    runnix: Object.freeze({
      mode: 'local-only',
      /* Future secured/self-hosted JoJo may set a same-origin read-only bridge. Never place a NAS URL or token here. */
      previewEndpoint: '',
      timeoutMs: 4500
    })
  }),
  links: Object.freeze({
    garmin: 'https://connect.garmin.com/',
    strava: 'https://www.strava.com/dashboard',
    github: 'https://github.com/',

    // Bewust leeg: pas lokaal of via een veilige toegangspoort configureren.
    runnix: '',
    synology: '',
    dsm: '',
    grafana: '',
    influxdb: '',
    containers: '',

    // Repositoryspecifieke links mogen worden ingevuld zodra hun zichtbaarheid klopt.
    runnixRepo: '',
    jojoRepo: '',
    releases: '',
    docs: ''
  })
});
