(() => {
  'use strict';
  const n = (id, data) => Object.freeze({ id, ...data });
  window.JOJO_GRAPH = Object.freeze({
    jojo: n('jojo', {
      title: 'JoJo', short: 'JoJo', icon: 'J', domain: 'ROOT', accent: 'cyan', status: 'LIVE', size: 'core',
      eyebrow: 'PERSONAL CONTROL CENTER',
      description: 'Jouw levende middelpunt. Sport, gezondheid, thuis en ontwikkeling bewegen als één verbonden persoonlijk universum.',
      flow: 'Observe · Connect · Navigate',
      points: ['Altijd het centrale anker', 'Levende verbindingen tussen je domeinen', 'Mobiele cockpit zonder persoonlijke data op te slaan'],
      children: ['sport-health', 'home', 'development']
    }),
    'sport-health': n('sport-health', {
      parent: 'jojo', title: 'Sport & Health', short: 'Sport & Health', icon: '◉', domain: 'SPORT', accent: 'magenta', status: 'ACTIVE', size: 'domain',
      eyebrow: 'BEWEGING · HERSTEL · INZICHT',
      description: 'De eerste volledig uitgewerkte cluster: trainen, uitvoeren, delen en herstellen als samenhangend geheel.',
      flow: 'Plan → Execute → Learn → Recover',
      points: ['Runnix als trainingsplatform', 'Garmin en Strava als verbonden ecosystemen', 'Health als herstel- en lichaamscontext'],
      children: ['runnix', 'garmin', 'strava', 'health']
    }),
    runnix: n('runnix', {
      parent: 'sport-health', title: 'Runnix', short: 'Runnix', icon: 'R', domain: 'SPORT', accent: 'cyan', status: 'LOCAL', size: 'hub',
      eyebrow: 'RUNNING INTELLIGENCE', description: 'Integratiepunt naar het persoonlijke trainingsplatform voor planning, uitvoering, feedback en adaptatie.',
      flow: 'Plan → Execute → Learn', points: ['Planning en dagelijkse training', 'Execution Intelligence en progressie', 'Voorbereide route voor trainingsdata-import'],
      children: ['today', 'planning', 'progress', 'intelligence', 'tcx'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    }),
    today: n('today', { parent: 'runnix', title: 'Vandaag', short: 'Vandaag', icon: '↗', domain: 'RUNNIX', accent: 'cyan', status: 'ROUTE', eyebrow: 'DAILY VIEW', description: 'Route naar de training en feedback van vandaag.', flow: 'Vandaag → Training → Feedback', points: ['Dagsessie', 'Uitvoering naast plan', 'Feedback'], linkKey: 'runnix', linkLabel: 'Open Runnix' }),
    planning: n('planning', { parent: 'runnix', title: 'Planning', short: 'Planning', icon: 'P', domain: 'RUNNIX', accent: 'violet', status: 'ROUTE', eyebrow: 'ADAPTIVE PLANNER', description: 'Route naar trainingsopbouw en volgende sessies.', flow: 'Context → Plan → Workout', points: ['Trainingsopbouw', 'Tempo- en trainingszones', 'Volgende sessies'], linkKey: 'runnix', linkLabel: 'Open Runnix' }),
    progress: n('progress', { parent: 'runnix', title: 'Progressie', short: 'Progressie', icon: '↗', domain: 'RUNNIX', accent: 'green', status: 'ROUTE', eyebrow: 'DEVELOPMENT', description: 'Route naar trends en ontwikkeling doorheen de tijd.', flow: 'Training → Trend → Progressie', points: ['Historiek', 'Belastingscontext', 'Ontwikkeling'], linkKey: 'runnix', linkLabel: 'Open Runnix' }),
    intelligence: n('intelligence', { parent: 'runnix', title: 'Intelligence', short: 'Intelligence', icon: 'I', domain: 'RUNNIX', accent: 'magenta', status: 'ROUTE', eyebrow: 'CLOSED LOOP', description: 'Route naar analyse en de feedbacklus tussen uitvoering en planning.', flow: 'Uitvoering → Analyse → Adaptatie', points: ['Execution Intelligence', 'Analyse & Trends', 'Closed-loopfeedback'], linkKey: 'runnix', linkLabel: 'Open Runnix' }),
    tcx: n('tcx', { parent: 'runnix', title: 'TCX Import', short: 'TCX', icon: '↑', domain: 'RUNNIX', accent: 'magenta', status: 'NEXT', eyebrow: 'ENRICHMENT', description: 'Voorbereide integratieroute voor gedetailleerde trainingsdata.', flow: 'TCX → Trackpoints → Analyse', points: ['Tempo, HR, cadans en power', 'Laps en trackpoints', 'Geen upload in JoJo zelf'], privacy: 'Trainingsbestanden blijven buiten de publieke JoJo-app.' }),
    garmin: n('garmin', {
      parent: 'sport-health', title: 'Garmin', short: 'Garmin', icon: 'G', domain: 'SPORT', accent: 'magenta', status: 'ACTIVE', size: 'satellite',
      eyebrow: 'TRAINING & HEALTH SOURCE', description: 'Toegang tot activiteiten, toestellen en gezondheidscontext in Garmin Connect.',
      flow: 'Device → Garmin → Ecosystem', points: ['Activiteiten en trainingen', 'Health- en recoverycontext', 'Toestellen en synchronisatie'],
      children: ['garmin-training', 'garmin-health', 'garmin-devices'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect'
    }),
    'garmin-training': n('garmin-training', { parent: 'garmin', title: 'Training', short: 'Training', icon: 'T', domain: 'GARMIN', accent: 'magenta', status: 'EXTERNAL', eyebrow: 'ACTIVITIES', description: 'Route naar activiteiten en trainingsplanning in Garmin Connect.', flow: 'Plan → Device → Activity', points: ['Workouts', 'Activiteiten', 'Synchronisatie'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect' }),
    'garmin-health': n('garmin-health', { parent: 'garmin', title: 'Health data', short: 'Health data', icon: '♥', domain: 'GARMIN', accent: 'green', status: 'EXTERNAL', eyebrow: 'PHYSIOLOGY', description: 'Route naar gezondheids- en herstelcontext in Garmin Connect.', flow: 'Signals → Trends → Context', points: ['Slaap', 'HRV', 'Rusthartslag'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect' }),
    'garmin-devices': n('garmin-devices', { parent: 'garmin', title: 'Devices', short: 'Devices', icon: 'D', domain: 'GARMIN', accent: 'cyan', status: 'EXTERNAL', eyebrow: 'HARDWARE', description: 'Route naar gekoppelde Garmin-toestellen en instellingen.', flow: 'Device → Sync → Data', points: ['Horloge', 'Sensoren', 'Synchronisatie'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect' }),
    strava: n('strava', {
      parent: 'sport-health', title: 'Strava', short: 'Strava', icon: 'S', domain: 'SPORT', accent: 'orange', status: 'EXTERNAL', size: 'satellite',
      eyebrow: 'SOCIAL & STREAMS', description: 'Activiteiten, segmenten en sociale trainingscontext. De publieke route werkt rechtstreeks; data-integratie blijft later.',
      flow: 'Activity → Streams → Community', points: ['Activiteiten', 'Segmenten', 'Sociale trainingsfeed'],
      children: ['strava-activities', 'strava-segments', 'strava-social'], linkKey: 'strava', linkLabel: 'Open Strava'
    }),
    'strava-activities': n('strava-activities', { parent: 'strava', title: 'Activities', short: 'Activities', icon: 'A', domain: 'STRAVA', accent: 'orange', status: 'EXTERNAL', eyebrow: 'ACTIVITY FEED', description: 'Route naar je activiteitenoverzicht.', flow: 'Record → Upload → Review', points: ['Activiteiten', 'Streams', 'Analyse'], linkKey: 'strava', linkLabel: 'Open Strava' }),
    'strava-segments': n('strava-segments', { parent: 'strava', title: 'Segments', short: 'Segments', icon: 'Σ', domain: 'STRAVA', accent: 'orange', status: 'EXTERNAL', eyebrow: 'PERFORMANCE', description: 'Route naar segmenten en prestaties.', flow: 'Route → Segment → Result', points: ['Segmenten', 'Pogingen', 'Vergelijking'], linkKey: 'strava', linkLabel: 'Open Strava' }),
    'strava-social': n('strava-social', { parent: 'strava', title: 'Community', short: 'Community', icon: '◎', domain: 'STRAVA', accent: 'magenta', status: 'EXTERNAL', eyebrow: 'SOCIAL', description: 'Route naar de sociale trainingsfeed.', flow: 'Share → React → Connect', points: ['Feed', 'Kudos', 'Community'], linkKey: 'strava', linkLabel: 'Open Strava' }),
    health: n('health', {
      parent: 'sport-health', title: 'Health', short: 'Health', icon: '♥', domain: 'HEALTH', accent: 'green', status: 'FOUNDATION', size: 'satellite',
      eyebrow: 'RECOVERY CONTEXT', description: 'Herstel, slaap, HRV en lichaamscontext als toekomstige persoonlijke gezondheidslaag.',
      flow: 'Sleep · HRV · Body · Recovery', points: ['Herstel en slaap', 'HRV en rusthartslag', 'Lichaamscontext'], children: ['recovery', 'sleep', 'body']
    }),
    recovery: n('recovery', { parent: 'health', title: 'Recovery', short: 'Recovery', icon: '↺', domain: 'HEALTH', accent: 'green', status: 'PLANNED', eyebrow: 'READINESS', description: 'Voorbereide plaats voor herstelgevoel en trainingsbereidheid.', flow: 'Load → Recovery → Readiness', points: ['Herstelgevoel', 'Belastingscontext', 'Readiness'] }),
    sleep: n('sleep', { parent: 'health', title: 'Slaap & HRV', short: 'Slaap & HRV', icon: '☾', domain: 'HEALTH', accent: 'violet', status: 'PLANNED', eyebrow: 'NIGHT SIGNALS', description: 'Voorbereide route voor slaapkwaliteit, HRV en rusthartslag.', flow: 'Night → Signals → Context', points: ['Slaap', 'HRV-trend', 'Rusthartslag'] }),
    body: n('body', { parent: 'health', title: 'Body', short: 'Body', icon: 'B', domain: 'HEALTH', accent: 'magenta', status: 'PLANNED', eyebrow: 'BODY CONTEXT', description: 'Voorbereide route voor gewicht en andere relevante lichaamsmetingen.', flow: 'Measure → Trend → Context', points: ['Gewichtstrend', 'Metingen', 'Context'] }),
    home: n('home', {
      parent: 'jojo', title: 'Home', short: 'Home', icon: '⌂', domain: 'HOME', accent: 'green', status: 'SECONDARY', size: 'domain',
      eyebrow: 'HOME SYSTEMS', description: 'Secundaire hoofdtak voor lokale infrastructuur, observatie en self-hosted services.',
      flow: 'Host → Runtime → Data → Observe', points: ['Lokale diensten gegroepeerd', 'Monitoring als aparte laag', 'Privé-adressen blijven buiten de publieke code'], children: ['synology', 'monitoring', 'services']
    }),
    synology: n('synology', { parent: 'home', title: 'Synology', short: 'Synology', icon: 'N', domain: 'HOME', accent: 'green', status: 'LOCAL', eyebrow: 'HOST & STORAGE', description: 'Lokale host voor opslag en diensten.', flow: 'DSM → Storage → Services', points: ['DSM', 'Opslag', 'Host'], children: ['dsm', 'storage'], linkKey: 'synology', linkLabel: 'Open Synology' }),
    dsm: n('dsm', { parent: 'synology', title: 'DSM', short: 'DSM', icon: 'D', domain: 'HOME', accent: 'green', status: 'LOCAL', eyebrow: 'NAS MANAGEMENT', description: 'Lokale beheerroute naar DSM.', flow: 'JoJo → Secure route → DSM', points: ['Beheer', 'Status', 'Configuratie'], linkKey: 'dsm', linkLabel: 'Open DSM' }),
    storage: n('storage', { parent: 'synology', title: 'Storage', short: 'Storage', icon: '▤', domain: 'HOME', accent: 'cyan', status: 'LOCAL', eyebrow: 'CAPACITY', description: 'Voorbereide route naar opslagstatus.', flow: 'Volumes → Capacity → Health', points: ['Volumes', 'Capaciteit', 'Status'] }),
    monitoring: n('monitoring', { parent: 'home', title: 'Monitoring', short: 'Monitoring', icon: '⌁', domain: 'HOME', accent: 'cyan', status: 'LOCAL', eyebrow: 'OBSERVE', description: 'Dashboard- en tijdreekslaag voor lokale observatie.', flow: 'InfluxDB → Grafana → Insight', points: ['Metrics', 'Dashboards', 'Status'], children: ['grafana', 'influxdb'] }),
    grafana: n('grafana', { parent: 'monitoring', title: 'Grafana', short: 'Grafana', icon: '⌁', domain: 'HOME', accent: 'green', status: 'LOCAL', eyebrow: 'DASHBOARDS', description: 'Lokale route naar dashboards.', flow: 'Metrics → Panels → Observe', points: ['Visualisaties', 'Dashboards', 'Overzicht'], linkKey: 'grafana', linkLabel: 'Open Grafana' }),
    influxdb: n('influxdb', { parent: 'monitoring', title: 'InfluxDB', short: 'InfluxDB', icon: 'I', domain: 'HOME', accent: 'green', status: 'LOCAL', eyebrow: 'TIME SERIES', description: 'Lokale tijdreekslaag.', flow: 'Signals → Series → Query', points: ['Tijdreeksdata', 'Grafana-bron', 'Lokale opslag'], linkKey: 'influxdb', linkLabel: 'Open InfluxDB' }),
    services: n('services', { parent: 'home', title: 'Services', short: 'Services', icon: '▦', domain: 'HOME', accent: 'violet', status: 'LOCAL', eyebrow: 'SELF-HOSTED', description: 'Verzamelroute voor containers en toekomstige diensten.', flow: 'Host → Containers → Apps', points: ['Runtime', 'Self-hosted apps', 'Uitbreidbaar'], children: ['containers'] }),
    containers: n('containers', { parent: 'services', title: 'Containers', short: 'Containers', icon: 'C', domain: 'HOME', accent: 'green', status: 'LOCAL', eyebrow: 'RUNTIME', description: 'Lokale runtime voor diensten.', flow: 'Image → Container → Service', points: ['Container Manager', 'Services', 'Runtime'], linkKey: 'containers', linkLabel: 'Open Container Manager' }),
    development: n('development', {
      parent: 'jojo', title: 'Development', short: 'Development', icon: '</>', domain: 'DEV', accent: 'violet', status: 'SECONDARY', size: 'domain',
      eyebrow: 'SOURCE & MEMORY', description: 'Secundaire hoofdtak voor broncode, versies, releases en projectdocumentatie.',
      flow: 'Code → Validate → Release → Remember', points: ['GitHub als source of truth', 'JoJo Brain afzonderlijk versioneren', 'Documentatie als blijvend projectgeheugen'], children: ['github', 'jojo-repo', 'releases', 'docs']
    }),
    github: n('github', { parent: 'development', title: 'GitHub', short: 'GitHub', icon: '</>', domain: 'DEV', accent: 'violet', status: 'ACTIVE', eyebrow: 'SOURCE OF TRUTH', description: 'Toegang tot repositories en Actions.', flow: 'Local → Commit → GitHub', points: ['Versiebeheer', 'Actions', 'Pages'], linkKey: 'github', linkLabel: 'Open GitHub' }),
    'jojo-repo': n('jojo-repo', { parent: 'development', title: 'JoJo repository', short: 'JoJo repo', icon: 'J', domain: 'DEV', accent: 'magenta', status: 'PUBLIC', eyebrow: 'JOJO SOURCE', description: 'Broncode en Pages-deployment van JoJo Brain.', flow: 'Main → Validate → Pages', points: ['Publieke statische app', 'Automatische deployment', 'Geen secrets'], linkKey: 'jojoRepo', linkLabel: 'Open repository' }),
    releases: n('releases', { parent: 'development', title: 'Releases', short: 'Releases', icon: '↗', domain: 'DEV', accent: 'violet', status: 'VERSIONED', eyebrow: 'VERSIONS', description: 'Gepubliceerde en terugvindbare versies.', flow: 'Baseline → Tag → Release notes', points: ['Versies', 'Release notes', 'Herleidbaarheid'], linkKey: 'releases', linkLabel: 'Open releases' }),
    docs: n('docs', { parent: 'development', title: 'Documentation', short: 'Docs', icon: 'D', domain: 'DEV', accent: 'violet', status: 'MEMORY', eyebrow: 'PROJECT MEMORY', description: 'Architectuur, roadmap, tests, versiehistoriek en wijzigingslog van JoJo Brain.', flow: 'Decision → Document → Reuse', points: ['Architectuur', 'Roadmap & testing', 'Version & conversation history'], linkKey: 'docs', linkLabel: 'Open documentatie' })
  });
})();
