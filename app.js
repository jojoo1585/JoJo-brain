(() => {
  'use strict';

  const config = window.JOJO_CONFIG || { links: {} };
  const nodes = {
    jojo: {
      id: 'jojo', title: 'JoJo', short: 'JoJo', icon: 'J', domain: 'ROOT', accent: 'cyan', status: 'LIVE',
      eyebrow: 'PERSONAL CONTROL CENTER',
      description: 'Jouw centrale startpunt. Kies een leefdomein, zet het centraal en ga van daaruit verder naar een app, dienst of volgende route.',
      flow: 'Sport & Health · Home · Development',
      points: ['Persoonlijke mobiele cockpit', 'Drill-downnavigatie zonder drukke menu’s', 'Veilig fundament voor latere koppelingen'],
      children: ['sport-health', 'home', 'development']
    },
    'sport-health': {
      id: 'sport-health', parent: 'jojo', title: 'Sport & Health', short: 'Sport & Health', icon: '◉', domain: 'SPORT', accent: 'magenta', status: 'ACTIVE',
      eyebrow: 'BEWEGING · HERSTEL · INZICHT',
      description: 'Alle routes rond trainen, uitvoeren, analyseren en herstellen. Runnix blijft het trainingsbrein; Garmin en Strava zijn bronnen en bestemmingen.',
      flow: 'Plan → Execute → Learn → Recover',
      points: ['Runnix als primaire trainingshub', 'Garmin en Strava rechtstreeks bereikbaar', 'Health voorbereid voor hersteldata'],
      children: ['runnix', 'garmin', 'strava', 'health']
    },
    runnix: {
      id: 'runnix', parent: 'sport-health', title: 'Runnix', short: 'Runnix', icon: 'R', domain: 'SPORT', accent: 'cyan', status: 'LOCAL',
      eyebrow: 'RUNNING INTELLIGENCE',
      description: 'Jouw eigen trainingsplatform voor planning, uitvoering, feedback en adaptatie.',
      flow: 'Plan → Execute → Learn',
      points: ['Stabiele baseline V5.8.0.10.6', 'Lokale trainingsomgeving', 'Centrale route voor toekomstige TCX-enrichment'],
      children: ['today', 'planning', 'progress', 'intelligence', 'tcx'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    },
    today: {
      id: 'today', parent: 'runnix', title: 'Vandaag', short: 'Vandaag', icon: '↗', domain: 'RUNNIX', accent: 'cyan', status: 'ROUTE',
      eyebrow: 'DAGELIJKS OVERZICHT', description: 'De kortste route naar de geplande of uitgevoerde training van vandaag.',
      flow: 'Vandaag → Training → Feedback', points: ['Planning in één oogopslag', 'Uitvoering naast het plan', 'Feedback na de training'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    },
    planning: {
      id: 'planning', parent: 'runnix', title: 'Planning', short: 'Planning', icon: 'P', domain: 'RUNNIX', accent: 'violet', status: 'ROUTE',
      eyebrow: 'ADAPTIVE PLANNER', description: 'Route naar trainingsopbouw, zones en volgende sessies.',
      flow: 'Context → Plan → Workout', points: ['Adaptieve planning', 'Tempo- en trainingszones', 'Progressieve trainingsopbouw'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    },
    progress: {
      id: 'progress', parent: 'runnix', title: 'Progressie', short: 'Progressie', icon: '↗', domain: 'RUNNIX', accent: 'green', status: 'ROUTE',
      eyebrow: 'ONTWIKKELING', description: 'Bekijk hoe trainingen, belasting en uitvoering zich doorheen de tijd ontwikkelen.',
      flow: 'Trainingen → Trends → Progressie', points: ['Historiek', 'Belasting en herstelcontext', 'Ontwikkeling doorheen de tijd'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    },
    intelligence: {
      id: 'intelligence', parent: 'runnix', title: 'Intelligence', short: 'Intelligence', icon: 'I', domain: 'RUNNIX', accent: 'magenta', status: 'ROUTE',
      eyebrow: 'CLOSED LOOP', description: 'Analyseer uitvoering en feedback, en vertaal die inzichten naar de volgende planning.',
      flow: 'Uitvoering → Analyse → Adaptatie', points: ['Execution Intelligence', 'Analyse & Trends', 'Closed-loopfeedback'], linkKey: 'runnix', linkLabel: 'Open Runnix'
    },
    tcx: {
      id: 'tcx', parent: 'runnix', title: 'TCX Import', short: 'TCX', icon: '↑', domain: 'RUNNIX', accent: 'magenta', status: 'NEXT',
      eyebrow: 'ENRICHMENT', description: 'Voorbereide route voor het importeren en analyseren van gedetailleerde trainingsdata.',
      flow: 'TCX → Trackpoints → Blokanalyse', points: ['Tempo, HR, cadans en power', 'Laps en trackpoints', 'Proof-of-concept voor een volgende Runnix-versie'], privacy: 'Nog geen uploadfunctie in JoJo; trainingsbestanden blijven buiten de publieke app.'
    },
    garmin: {
      id: 'garmin', parent: 'sport-health', title: 'Garmin', short: 'Garmin', icon: 'G', domain: 'SPORT', accent: 'magenta', status: 'ACTIVE',
      eyebrow: 'TRAINING & HEALTH BRON', description: 'Open Garmin Connect voor activiteiten, planning, toestellen en gezondheidscontext.',
      flow: 'Device → Garmin → Runnix', points: ['Trainingen en activiteiten', 'Health- en recoverycontext', 'Toestellen en synchronisatie'], linkKey: 'garmin', linkLabel: 'Open Garmin Connect'
    },
    strava: {
      id: 'strava', parent: 'sport-health', title: 'Strava', short: 'Strava', icon: 'S', domain: 'SPORT', accent: 'orange', status: 'EXTERNAL',
      eyebrow: 'SOCIAL & STREAMS', description: 'Open Strava vandaag al rechtstreeks. Een datakoppeling blijft een aparte toekomstige stap.',
      flow: 'Runnix ↔ Activity streams ↔ Strava', points: ['Activiteiten en segmenten', 'Sociale trainingsfeed', 'MCP/API-ready, maar niet afhankelijk van integratie'], linkKey: 'strava', linkLabel: 'Open Strava'
    },
    health: {
      id: 'health', parent: 'sport-health', title: 'Health', short: 'Health', icon: '♥', domain: 'HEALTH', accent: 'green', status: 'FUTURE',
      eyebrow: 'HERSTELCONTEXT', description: 'Toekomstige verzamelroute voor herstel, slaap, HRV en lichaamsdata.',
      flow: 'Sleep · HRV · Body · Recovery', points: ['Herstel en slaap', 'HRV en rusthartslag', 'Gewicht en lichaamscontext'], children: ['recovery', 'sleep', 'body']
    },
    recovery: {
      id: 'recovery', parent: 'health', title: 'Recovery', short: 'Recovery', icon: '↺', domain: 'HEALTH', accent: 'green', status: 'PLANNED',
      eyebrow: 'TRAININGSBEREIDHEID', description: 'Voorbereide plaats voor herstelgevoel, belasting en trainingsbereidheid.',
      flow: 'Load → Recovery → Readiness', points: ['Subjectieve feedback', 'Belastingscontext', 'Beslissingssteun voor planning']
    },
    sleep: {
      id: 'sleep', parent: 'health', title: 'Slaap & HRV', short: 'Slaap', icon: '☾', domain: 'HEALTH', accent: 'violet', status: 'PLANNED',
      eyebrow: 'NACHTELIJK HERSTEL', description: 'Voorbereide route voor slaapkwaliteit, HRV en rusthartslag.',
      flow: 'Night → Signals → Context', points: ['Slaapduur en kwaliteit', 'HRV-trend', 'Rusthartslag']
    },
    body: {
      id: 'body', parent: 'health', title: 'Body', short: 'Body', icon: 'B', domain: 'HEALTH', accent: 'magenta', status: 'PLANNED',
      eyebrow: 'LICHAAMSCONTEXT', description: 'Voorbereide plaats voor gewicht en andere relevante lichaamsmetingen.',
      flow: 'Measurements → Trend → Context', points: ['Gewichtstrend', 'Lichaamsmetingen', 'Context, geen los doel']
    },
    home: {
      id: 'home', parent: 'jojo', title: 'Home', short: 'Home', icon: '⌂', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'THUISOMGEVING', description: 'Toegangspoort naar je lokale infrastructuur, monitoring en self-hosted diensten.',
      flow: 'Synology → Runtime → Data → Observe', points: ['Lokale diensten logisch gegroepeerd', 'Monitoring apart van hosting', 'Geen privé-adressen in publieke code'],
      children: ['synology', 'monitoring', 'services']
    },
    synology: {
      id: 'synology', parent: 'home', title: 'Synology', short: 'Synology', icon: 'N', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'HOST & STORAGE', description: 'Centrale host voor je lokale diensten en opslag.',
      flow: 'DSM → Storage → Services', points: ['DSM-beheer', 'Opslag', 'Host voor containers en diensten'], children: ['dsm', 'storage'], linkKey: 'synology', linkLabel: 'Open Synology'
    },
    dsm: {
      id: 'dsm', parent: 'synology', title: 'DSM', short: 'DSM', icon: 'D', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'NAS MANAGEMENT', description: 'Lokale beheerroute naar Synology DSM.',
      flow: 'JoJo → Veilige lokale route → DSM', points: ['Beheer', 'Status', 'Configuratie'], linkKey: 'dsm', linkLabel: 'Open DSM'
    },
    storage: {
      id: 'storage', parent: 'synology', title: 'Storage', short: 'Storage', icon: '▤', domain: 'HOME', accent: 'cyan', status: 'LOCAL',
      eyebrow: 'DATA & CAPACITEIT', description: 'Voorbereide route naar opslagstatus en capaciteit.',
      flow: 'Volumes → Capacity → Health', points: ['Volumeoverzicht', 'Capaciteit', 'Gezondheidsstatus']
    },
    monitoring: {
      id: 'monitoring', parent: 'home', title: 'Monitoring', short: 'Monitoring', icon: '⌁', domain: 'HOME', accent: 'cyan', status: 'LOCAL',
      eyebrow: 'OBSERVE', description: 'Dashboard- en tijdreekslaag voor lokale observatie.',
      flow: 'InfluxDB → Grafana → Insight', points: ['Metrics verzamelen', 'Dashboards tonen', 'Lokale status zichtbaar maken'], children: ['grafana', 'influxdb']
    },
    grafana: {
      id: 'grafana', parent: 'monitoring', title: 'Grafana', short: 'Grafana', icon: '⌁', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'DASHBOARDS', description: 'Lokale route naar observatie en dashboards.',
      flow: 'Metrics → Panels → Observe', points: ['Visualisaties', 'Dashboards', 'Operationeel overzicht'], linkKey: 'grafana', linkLabel: 'Open Grafana'
    },
    influxdb: {
      id: 'influxdb', parent: 'monitoring', title: 'InfluxDB', short: 'InfluxDB', icon: 'I', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'TIME SERIES', description: 'Tijdreekslaag achter monitoring en andere lokale data.',
      flow: 'Signals → Time series → Query', points: ['Tijdreeksdata', 'Bron voor Grafana', 'Lokale opslag'], linkKey: 'influxdb', linkLabel: 'Open InfluxDB'
    },
    services: {
      id: 'services', parent: 'home', title: 'Services', short: 'Services', icon: '▦', domain: 'HOME', accent: 'violet', status: 'LOCAL',
      eyebrow: 'SELF-HOSTED', description: 'Verzamelroute voor lokale containers en toekomstige diensten.',
      flow: 'Host → Containers → Apps', points: ['Container runtime', 'Self-hosted apps', 'Uitbreidbaar zonder de startpagina te overladen'], children: ['containers']
    },
    containers: {
      id: 'containers', parent: 'services', title: 'Containers', short: 'Containers', icon: 'C', domain: 'HOME', accent: 'green', status: 'LOCAL',
      eyebrow: 'RUNTIME', description: 'Lokale runtime voor Runnix en andere diensten.',
      flow: 'Image → Container → Service', points: ['Container Manager', 'Diensten starten en beheren', 'Ondersteunende runtime'], linkKey: 'containers', linkLabel: 'Open Container Manager'
    },
    development: {
      id: 'development', parent: 'jojo', title: 'Development', short: 'Development', icon: '</>', domain: 'DEV', accent: 'violet', status: 'SUPPORT',
      eyebrow: 'SOURCE & MEMORY', description: 'De ondersteunende technische laag: broncode, releases en documentatie.',
      flow: 'Code → Version → Release → Memory', points: ['GitHub als source of truth', 'Runnix en JoJo apart versioneren', 'Documentatie als technisch geheugen'],
      children: ['github', 'runnix-repo', 'jojo-repo', 'releases', 'docs']
    },
    github: {
      id: 'github', parent: 'development', title: 'GitHub', short: 'GitHub', icon: '</>', domain: 'DEV', accent: 'violet', status: 'ACTIVE',
      eyebrow: 'SOURCE OF TRUTH', description: 'Centrale toegang tot repositories, Actions en versiebeheer.',
      flow: 'Local → Commit → GitHub', points: ['Versiebeheer', 'GitHub Actions', 'Veilige scheiding tussen projecten'], linkKey: 'github', linkLabel: 'Open GitHub'
    },
    'runnix-repo': {
      id: 'runnix-repo', parent: 'development', title: 'Runnix repository', short: 'Runnix repo', icon: 'R', domain: 'DEV', accent: 'cyan', status: 'PRIVATE',
      eyebrow: 'RUNNIX SOURCE', description: 'Route naar de geversioneerde broncode en stabiele Runnix-baseline.',
      flow: 'Code → Tag → Release', points: ['Private repository', 'Stabiele versies', 'Rollback en geschiedenis'], linkKey: 'runnixRepo', linkLabel: 'Open repository'
    },
    'jojo-repo': {
      id: 'jojo-repo', parent: 'development', title: 'JoJo Brain repository', short: 'JoJo repo', icon: 'J', domain: 'DEV', accent: 'magenta', status: 'PUBLIC',
      eyebrow: 'JOJO SOURCE', description: 'Route naar de broncode en Pages-deployment van deze app.',
      flow: 'Main → Actions → GitHub Pages', points: ['Publieke statische app', 'Automatische deployment', 'Geen secrets of lokale URL’s'], linkKey: 'jojoRepo', linkLabel: 'Open repository'
    },
    releases: {
      id: 'releases', parent: 'development', title: 'Releases', short: 'Releases', icon: '↗', domain: 'DEV', accent: 'violet', status: 'VERSIONED',
      eyebrow: 'VERSIONS', description: 'Route naar gepubliceerde en terugvindbare versies.',
      flow: 'Baseline → Tag → Release notes', points: ['Versioned baselines', 'Release notes', 'Herleidbare wijzigingen'], linkKey: 'releases', linkLabel: 'Open releases'
    },
    docs: {
      id: 'docs', parent: 'development', title: 'Documentation', short: 'Docs', icon: 'D', domain: 'DEV', accent: 'violet', status: 'MEMORY',
      eyebrow: 'TECHNICAL MEMORY', description: 'Architectuur, roadmap, tests en versiehistoriek als blijvend geheugen.',
      flow: 'Decision → Document → Reuse', points: ['Architecture', 'Roadmap en testing', 'Changelogs en version history'], linkKey: 'docs', linkLabel: 'Open documentatie'
    }
  };

  const $ = (selector) => document.querySelector(selector);
  const stage = $('#node-stage');
  const breadcrumbs = $('#breadcrumbs');
  const hint = $('#context-hint');
  const mapLabel = $('#map-label');
  let currentId = 'jojo';
  let installPrompt = null;

  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

  function pathFor(id) {
    const path = [];
    let cursor = nodes[id];
    while (cursor) {
      path.unshift(cursor);
      cursor = cursor.parent ? nodes[cursor.parent] : null;
    }
    return path;
  }

  function renderStage(node) {
    const childIds = node.children || [];
    const children = childIds.map((id, index) => {
      const child = nodes[id];
      return `
        <button class="brain-node child-node accent-${esc(child.accent)}" type="button" data-node="${esc(child.id)}" style="--i:${index};--count:${childIds.length}" aria-label="Open ${esc(child.title)}">
          <span class="node-icon" aria-hidden="true">${esc(child.icon)}</span>
          <span class="node-copy"><small>${esc(child.eyebrow)}</small><strong>${esc(child.short)}</strong></span>
          <span class="node-status">${esc(child.status)}</span>
        </button>`;
    }).join('');

    stage.innerHTML = `
      <div class="focus-wrap accent-${esc(node.accent)}">
        <div class="connector-layer" aria-hidden="true">${childIds.map((_, i) => `<span style="--i:${i};--count:${childIds.length}"></span>`).join('')}</div>
        <div class="brain-node focus-node" aria-current="page">
          <span class="focus-kicker">${esc(node.eyebrow)}</span>
          <span class="focus-icon" aria-hidden="true">${esc(node.icon)}</span>
          <strong>${esc(node.title)}</strong>
          <span>${esc(node.flow)}</span>
          <small>${childIds.length ? `${childIds.length} ROUTES` : node.status}</small>
        </div>
        <div class="child-nodes" style="--count:${childIds.length}">${children}</div>
      </div>`;

    stage.classList.toggle('has-many', childIds.length > 4);
    stage.classList.toggle('is-leaf', childIds.length === 0);
    $('#brain-map').classList.toggle('is-leaf', childIds.length === 0);
  }

  function renderBreadcrumbs(node) {
    const path = pathFor(node.id);
    breadcrumbs.innerHTML = path.map((item, index) => `
      <li>
        <button type="button" data-node="${esc(item.id)}" ${index === path.length - 1 ? 'aria-current="page"' : ''}>${esc(item.short)}</button>
      </li>`).join('');
    hint.textContent = node.children?.length ? 'Kies een route om die centraal te zetten' : 'Eindpunt van deze route';
  }

  function renderDetail(node) {
    $('#detail-domain').textContent = node.domain;
    $('#detail-status').textContent = node.status;
    $('#detail-eyebrow').textContent = node.eyebrow;
    $('#detail-title').textContent = node.title;
    $('#detail-description').textContent = node.description;
    $('#detail-flow').innerHTML = `<small>FLOW</small><strong>${esc(node.flow)}</strong>`;
    $('#detail-points').innerHTML = node.points.map((point) => `<li>${esc(point)}</li>`).join('');

    const configuredUrl = node.linkKey ? config.links?.[node.linkKey] : '';
    const hasChildren = Boolean(node.children?.length);
    const actions = [];
    if (configuredUrl) {
      actions.push(`<a class="primary-action" href="${esc(configuredUrl)}" target="_blank" rel="noopener noreferrer">${esc(node.linkLabel || `Open ${node.title}`)} <span aria-hidden="true">↗</span></a>`);
    } else if (node.linkKey) {
      actions.push(`<span class="disabled-action">${esc(node.linkLabel || `${node.title}-link`)} configureren <span aria-hidden="true">↗</span></span>`);
    }
    if (hasChildren) {
      actions.push(`<button class="secondary-action" type="button" data-node="${esc(node.children[0])}">Start met ${esc(nodes[node.children[0]].short)} <span aria-hidden="true">→</span></button>`);
    }
    $('#detail-actions').innerHTML = actions.join('');

    const privacy = node.privacy || (node.linkKey && !configuredUrl
      ? 'Deze link is bewust leeg in config.js. Voeg geen tokens, credentials of publieke NAS-adressen toe.'
      : 'JoJo bewaart hier geen accountgegevens of externe data.');
    $('#privacy-note').textContent = privacy;
    $('#detail-panel').className = `detail-panel accent-${node.accent}`;
  }

  function render(id) {
    const node = nodes[id] || nodes.jojo;
    currentId = node.id;
    document.documentElement.dataset.domain = node.domain.toLowerCase();
    mapLabel.textContent = node.domain === 'ROOT' ? 'JOJO' : `${node.domain} · ${node.short}`;
    renderStage(node);
    renderBreadcrumbs(node);
    renderDetail(node);
    document.title = `${node.title} · JoJo`;
    document.querySelectorAll('[data-action="back"]').forEach((button) => { button.disabled = !node.parent; });
  }

  function navigate(id, options = {}) {
    if (!nodes[id]) id = 'jojo';
    const hash = id === 'jojo' ? '' : `#${id}`;
    if (options.history !== false && location.hash !== hash) history.pushState({ id }, '', `${location.pathname}${location.search}${hash}`);
    render(id);
    if (options.focus) $('#brain-map')?.focus({ preventScroll: true });
  }

  document.addEventListener('click', (event) => {
    const nodeTarget = event.target.closest('[data-node]');
    if (nodeTarget) {
      navigate(nodeTarget.dataset.node);
      return;
    }
    const jumpTarget = event.target.closest('[data-jump]');
    if (jumpTarget) {
      navigate(jumpTarget.dataset.jump);
      return;
    }
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'home') navigate('jojo');
    if (action === 'back') navigate(nodes[currentId].parent || 'jojo');
  });

  window.addEventListener('popstate', () => render(location.hash.slice(1) || 'jojo'));
  window.addEventListener('hashchange', () => render(location.hash.slice(1) || 'jojo'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nodes[currentId].parent) navigate(nodes[currentId].parent);
    if (event.key === 'Home' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) navigate('jojo');
  });

  function updateConnection() {
    const online = navigator.onLine;
    const status = $('#connection-status');
    status.classList.toggle('is-offline', !online);
    status.querySelector('span:last-child').textContent = online ? 'ONLINE' : 'OFFLINE';
  }
  window.addEventListener('online', updateConnection);
  window.addEventListener('offline', updateConnection);
  updateConnection();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    $('#install-button').hidden = false;
  });
  $('#install-button').addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    $('#install-button').hidden = true;
  });
  window.addEventListener('appinstalled', () => { $('#install-button').hidden = true; });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch((error) => console.warn('Service worker kon niet registreren:', error)));
  }

  render(location.hash.slice(1) || 'jojo');
})();
