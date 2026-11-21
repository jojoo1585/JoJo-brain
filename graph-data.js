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
      parent: 'jojo', title: 'Sport & Health', short: 'Sport & Health', icon: '◉', domain: 'SPORT', accent: 'cyan', status: 'V0.4', size: 'energy',
      eyebrow: 'MOVE · RECOVER · LEARN',
      description: 'Een persoonlijke sport- en gezondheidsconstellatie: Runnix interpreteert, Health bundelt lichaamscontext, Garmin voedt de signalen en Strava biedt een onafhankelijke activiteitenblik.',
      flow: 'Signals → Context → Intelligence → Progress',
      points: ['Runnix blijft de trainingsengine', 'Garmin overlapt niet met Runnix Vandaag', 'Health kan later meerdere bronnen samenbrengen', 'Strava focust op activiteit, trends en volume'],
      children: ['runnix', 'garmin', 'strava', 'health'],
      connections: [
        { from: 'garmin', to: 'health', accent: 'blue', label: 'HEALTH SIGNALS' },
        { from: 'health', to: 'runnix', accent: 'green', label: 'RECOVERY CONTEXT' },
        { from: 'strava', to: 'runnix', accent: 'orange', label: 'ACTIVITY CHECK' }
      ],
      privacy: 'V0.4 visualiseert alleen de architectuur. Er wordt nog geen persoonlijke Garmin-, Strava-, Health- of Runnix-data opgehaald.'
    }),

    runnix: n('runnix', {
      parent: 'sport-health', title: 'Runnix', short: 'Runnix', icon: 'R', domain: 'RUNNIX', accent: 'magenta', status: 'ENGINE', size: 'hub',
      eyebrow: 'TRAINING INTELLIGENCE',
      description: 'De interpretatie- en trainingsengine. Runnix brengt planning, uitvoering, feedback en progressie samen zonder die data in JoJo te dupliceren.',
      flow: 'Plan → Execute → Learn → Adapt',
      points: ['Vandaag blijft de operationele dagweergave', 'Planning bepaalt de trainingsopbouw', 'Execution vergelijkt plan en uitvoering', 'Progressie bewaakt ontwikkeling doorheen de tijd'],
      children: ['today', 'planning', 'execution', 'progress'], linkKey: 'runnix', linkLabel: 'Open Runnix',
      connections: [
        { from: 'today', to: 'execution', accent: 'cyan', label: 'EXECUTE' },
        { from: 'execution', to: 'progress', accent: 'magenta', label: 'LEARN' },
        { from: 'progress', to: 'planning', accent: 'violet', label: 'ADAPT' }
      ]
    }),
    today: n('today', {
      parent: 'runnix', title: 'Vandaag', short: 'Vandaag', icon: '↗', domain: 'RUNNIX', accent: 'cyan', status: 'ROUTE', size: 'route',
      eyebrow: 'DAILY VIEW', description: 'De operationele route naar de training, context en feedback van vandaag.',
      flow: 'Context → Training → Feedback', points: ['Dagsessie en advies', 'Actuele trainingscontext', 'Feedback na uitvoering'], linkKey: 'runnix', linkLabel: 'Open Vandaag in Runnix'
    }),
    planning: n('planning', {
      parent: 'runnix', title: 'Planning', short: 'Planning', icon: 'P', domain: 'RUNNIX', accent: 'violet', status: 'ROUTE', size: 'route',
      eyebrow: 'ADAPTIVE PLANNER', description: 'De route naar trainingsopbouw en volgende sessies.',
      flow: 'Context → Plan → Workout', points: ['Trainingsopbouw', 'Zones en sessiedoel', 'Volgende trainingen'], linkKey: 'runnix', linkLabel: 'Open Planning in Runnix'
    }),
    execution: n('execution', {
      parent: 'runnix', title: 'Execution', short: 'Execution', icon: 'E', domain: 'RUNNIX', accent: 'magenta', status: 'TCX', size: 'route',
      eyebrow: 'EXECUTION INTELLIGENCE', description: 'Plan en echte uitvoering worden in Runnix vergeleken en verrijkt met de gekoppelde TCX-data.',
      flow: 'Plan + TCX → Compare → Explain', points: ['Tempo en hartslag uit TCX', 'Plan tegenover uitvoering', 'Laps, zones en execution verdict'], linkKey: 'runnix', linkLabel: 'Open Execution in Runnix',
      privacy: 'TCX blijft in Runnix op de NAS. JoJo bevat of uploadt geen trainingsbestand.'
    }),
    progress: n('progress', {
      parent: 'runnix', title: 'Progressie', short: 'Progressie', icon: '↗', domain: 'RUNNIX', accent: 'green', status: 'ROUTE', size: 'route',
      eyebrow: 'DEVELOPMENT', description: 'De route naar trends en ontwikkeling doorheen de tijd.',
      flow: 'Training → Trend → Progressie', points: ['Historiek en trends', 'Belastingscontext', 'Ontwikkeling doorheen de tijd'], linkKey: 'runnix', linkLabel: 'Open Progressie in Runnix'
    }),

    garmin: n('garmin', {
      parent: 'sport-health', title: 'Garmin', short: 'Garmin', icon: 'G', domain: 'GARMIN', accent: 'blue', status: 'SOURCE', size: 'satellite',
      eyebrow: 'HEALTH SIGNAL SOURCE',
      description: 'Garmin is bron en ecosysteem, geen mini-Runnix. Trainingsadvies, Vandaag, planning en execution blijven exclusief bij Runnix.',
      flow: 'Device → Signals → Health',
      points: ['Levert slaap-, HRV-, rusthartslag- en lichaamsdata', 'Toestellen en synchronisatiestatus', 'Geen duplicatie van Runnix Vandaag of Planning'],
      children: ['garmin-signals', 'garmin-devices'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect'
    }),
    'garmin-signals': n('garmin-signals', {
      parent: 'garmin', title: 'Health signals', short: 'Health signals', icon: '≈', domain: 'GARMIN', accent: 'blue', status: 'SOURCE', size: 'route',
      eyebrow: 'PHYSIOLOGY FEED', description: 'Toekomstige bronroute naar Health voor slaap, HRV, rusthartslag en lichaamsmetingen.',
      flow: 'Garmin → Health → Context', points: ['Slaap', 'HRV en rusthartslag', 'Body/weight indien beschikbaar'], linkKey: 'garmin', linkLabel: 'Open Health in Garmin'
    }),
    'garmin-devices': n('garmin-devices', {
      parent: 'garmin', title: 'Devices', short: 'Devices', icon: 'D', domain: 'GARMIN', accent: 'cyan', status: 'EXTERNAL', size: 'route',
      eyebrow: 'HARDWARE & SYNC', description: 'Gekoppelde toestellen, sensoren en synchronisatie blijven bereikbaar via Garmin Connect.',
      flow: 'Device → Sync → Source', points: ['Horloge en sensoren', 'Synchronisatiestatus', 'Garmin Connect-instellingen'], linkKey: 'garmin', linkLabel: 'Open Devices in Garmin'
    }),

    strava: n('strava', {
      parent: 'sport-health', title: 'Strava', short: 'Strava', icon: 'S', domain: 'STRAVA', accent: 'orange', status: 'EXTERNAL', size: 'satellite',
      eyebrow: 'ACTIVITY · PERFORMANCE',
      description: 'Een onafhankelijke activiteiten- en performanceblik. Segmenten staan bewust niet prominent in JoJo.',
      flow: 'Activity → Trend → Cross-check',
      points: ['Laatste activiteiten', 'Persoonlijke trends', 'Trainingsvolume als onafhankelijke controlebron'],
      children: ['strava-activities', 'strava-trends', 'strava-volume'], linkKey: 'strava', linkLabel: 'Open Strava'
    }),
    'strava-activities': n('strava-activities', {
      parent: 'strava', title: 'Activities', short: 'Activities', icon: 'A', domain: 'STRAVA', accent: 'orange', status: 'EXTERNAL', size: 'route',
      eyebrow: 'ACTIVITY FEED', description: 'Route naar je recente activiteitenoverzicht.',
      flow: 'Record → Upload → Review', points: ['Recente activiteiten', 'Activiteitdetails', 'Directe toegang tot Strava'], linkKey: 'strava', linkLabel: 'Open Activities in Strava'
    }),
    'strava-trends': n('strava-trends', {
      parent: 'strava', title: 'Trends', short: 'Trends', icon: '↗', domain: 'STRAVA', accent: 'orange', status: 'LATER', size: 'route',
      eyebrow: 'PERFORMANCE', description: 'Voorbereide plaats voor persoonlijke prestaties en trends, zonder Runnix-interpretatie te dupliceren.',
      flow: 'Activities → Trend → Perspective', points: ['Persoonlijke prestaties', 'Langetermijntrend', 'Onafhankelijke blik'], linkKey: 'strava', linkLabel: 'Open Progress in Strava'
    }),
    'strava-volume': n('strava-volume', {
      parent: 'strava', title: 'Volume', short: 'Volume', icon: 'Σ', domain: 'STRAVA', accent: 'orange', status: 'LATER', size: 'route',
      eyebrow: 'CROSS-CHECK', description: 'Voorbereide controlelaag voor week- en maandvolume.',
      flow: 'Activities → Aggregate → Check', points: ['Weekvolume', 'Maandvolume', 'Geen trainingsadvies'], linkKey: 'strava', linkLabel: 'Open Training Log in Strava'
    }),

    health: n('health', {
      parent: 'sport-health', title: 'Health', short: 'Health', icon: '♥', domain: 'HEALTH', accent: 'green', status: 'AGGREGATOR', size: 'satellite',
      eyebrow: 'BODY CONTEXT',
      description: 'De uitbreidbare gezondheidslaag waar fysiologische signalen van Garmin en later andere bronnen samenkomen.',
      flow: 'Sources → Signals → Context → Runnix',
      points: ['Brononafhankelijk datamodel', 'Slaap, HRV, rusthartslag en gewicht', 'Recoverycontext stroomt naar Runnix'],
      children: ['sleep', 'hrv', 'resting-hr', 'weight', 'recovery']
    }),
    sleep: n('sleep', {
      parent: 'health', title: 'Sleep', short: 'Sleep', icon: '☾', domain: 'HEALTH', accent: 'violet', status: 'PLANNED', size: 'metric',
      eyebrow: 'NIGHT SIGNAL', description: 'Voorbereide plaats voor slaapduur, kwaliteit en trend.',
      flow: 'Night → Sleep → Context', points: ['Slaapduur', 'Slaapkwaliteit', 'Trend zonder medische interpretatie']
    }),
    hrv: n('hrv', {
      parent: 'health', title: 'HRV', short: 'HRV', icon: '≈', domain: 'HEALTH', accent: 'cyan', status: 'PLANNED', size: 'metric',
      eyebrow: 'AUTONOMIC SIGNAL', description: 'Voorbereide plaats voor HRV-status en persoonlijke trend.',
      flow: 'Signal → Baseline → Context', points: ['Persoonlijke baseline', 'Nachtelijke trend', 'Context voor herstel']
    }),
    'resting-hr': n('resting-hr', {
      parent: 'health', title: 'Resting HR', short: 'Resting HR', icon: '♥', domain: 'HEALTH', accent: 'green', status: 'PLANNED', size: 'metric',
      eyebrow: 'REST SIGNAL', description: 'Voorbereide plaats voor rusthartslag en afwijking van de persoonlijke trend.',
      flow: 'Rest → Baseline → Context', points: ['Rusthartslag', 'Persoonlijke trend', 'Context, geen diagnose']
    }),
    weight: n('weight', {
      parent: 'health', title: 'Weight', short: 'Weight', icon: 'W', domain: 'HEALTH', accent: 'blue', status: 'PLANNED', size: 'metric',
      eyebrow: 'BODY SIGNAL', description: 'Voorbereide plaats voor gewicht en relevante lichaamsmetingen.',
      flow: 'Measure → Trend → Context', points: ['Gewichtstrend', 'Uitbreidbare bron', 'Geen publieke persoonlijke waarden']
    }),
    recovery: n('recovery', {
      parent: 'health', title: 'Recovery', short: 'Recovery', icon: '↺', domain: 'HEALTH', accent: 'green', status: 'PLANNED', size: 'metric',
      eyebrow: 'RECOVERY CONTEXT', description: 'Een samengestelde contextlaag voor herstel; Runnix blijft verantwoordelijk voor trainingsbeslissingen.',
      flow: 'Signals → Recovery context → Runnix', points: ['Combineert relevante signalen', 'Geen tweede readiness-engine', 'Context naar Runnix']
    }),

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
