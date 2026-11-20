(() => {
  'use strict';

  const config = window.JOJO_BRAIN_CONFIG || { links: {} };
  const meta = {
    runnix: {
      title: 'Runnix', domain: 'running', kicker: 'PRIMARY HUB', flow: 'Plan → Execute → Learn',
      description: 'De centrale running intelligence-laag: planning, uitvoering, feedback en adaptatie.',
      facts: ['Stabiele baseline V5.8.0.10.6', 'Lokale trainingsomgeving', 'Centraal in alle datastromen']
    },
    garmin: {
      title: 'Garmin', domain: 'running', kicker: 'TRAINING BRON', flow: 'Garmin → Runnix',
      description: 'Bron voor activiteit, fysiologie, laps en dagelijkse trainingscontext.',
      facts: ['Bestaande actieve bron', 'Training + health data', 'TCX-export biedt extra detail']
    },
    strava: {
      title: 'Strava', domain: 'running', kicker: 'FUTURE ADAPTER', flow: 'Strava ⇢ Adapter ⇢ Runnix',
      description: 'Toekomstige bron voor activities, laps en streams via MCP of de Strava API.',
      facts: ['OAuth hoort achter een adapter', 'MCP-ready, niet MCP-afhankelijk', 'Geen secrets in JoJo Brain']
    },
    tcx: {
      title: 'TCX Import', domain: 'running', kicker: 'EXECUTION ENRICHMENT', flow: 'TCX → Trackpoints → Intelligence',
      description: 'Handmatige verrijking met tempo, hartslag, cadans, power en gedetailleerde trackpoints.',
      facts: ['Aanvullend op Garmin-sync', 'Geen dubbele activiteit', 'Basis voor blokniveau-analyse']
    },
    github: {
      title: 'GitHub', domain: 'development', kicker: 'SOURCE OF TRUTH', flow: 'Commit → Tag → Release',
      description: 'Private ontwikkel- en versiebeheerlaag voor Runnix en JoJo Brain.',
      facts: ['Gescheiden repositories', 'Reviewbare historie', 'Geen runtime- of trainingsdata']
    },
    releases: {
      title: 'Runnix Releases', domain: 'development', kicker: 'ROLLBACK', flow: 'Tag → ZIP → NAS',
      description: 'Gevalideerde builds met changelog, checksum en expliciet rollbackpunt.',
      facts: ['Eerste tag: v5.8.0.10.6', 'Build-artifact via Actions', 'NAS-deploy blijft bewust handmatig']
    },
    docs: {
      title: 'Runnix Docs', domain: 'development', kicker: 'TECHNICAL MEMORY', flow: 'Decision → Document → Verify',
      description: 'Architectuur, engine, roadmap, tests, versiehistorie en changelogs bij elkaar.',
      facts: ['Architectuur en engine', 'Testing en testverslagen', 'Versie- en conversatiehistorie']
    },
    synology: {
      title: 'Synology', domain: 'home', kicker: 'LOCAL HOST', flow: 'Release → Synology → Runnix',
      description: 'Lokale hostinglaag voor Runnix en de bestaande home-infrastructuur.',
      facts: ['Blijft lokaal in V1', 'Geen open routerpoort', 'Remote access is apart securityproject']
    },
    grafana: {
      title: 'Grafana', domain: 'home', kicker: 'OBSERVABILITY', flow: 'InfluxDB → Grafana',
      description: 'Dashboards voor het verkennen van de bestaande running- en tijdreeksdata.',
      facts: ['Lokale navigatie', 'Geen data in Brainmap', 'Bestaande visualisatielaag']
    },
    containers: {
      title: 'Container Manager', domain: 'home', kicker: 'RUNTIME', flow: 'Image → Container → Service',
      description: 'Beheer van de services die Runnix en de ondersteunende stack lokaal draaien.',
      facts: ['Lokale beheerfunctie', 'Geen publieke beheerlink', 'Los van GitHub Pages']
    },
    influx: {
      title: 'InfluxDB', domain: 'home', kicker: 'TIME SERIES', flow: 'Garmin data → InfluxDB → Runnix',
      description: 'Bestaande tijdreeksbron. Runnix gebruikt deze als read-only gegevenslaag.',
      facts: ['Read-only applicatiepad', 'Geen credentials in frontend', 'Directe link optioneel']
    }
  };

  const relations = [
    { from: 'garmin', to: 'runnix', type: 'active', curve: -0.12 },
    { from: 'tcx', to: 'runnix', type: 'active', curve: 0.14 },
    { from: 'strava', to: 'runnix', type: 'planned', curve: 0.12 },
    { from: 'github', to: 'runnix', type: 'development', curve: -0.04 },
    { from: 'github', to: 'releases', type: 'navigation', curve: 0.08 },
    { from: 'github', to: 'docs', type: 'navigation', curve: -0.08 },
    { from: 'releases', to: 'synology', type: 'planned', curve: -0.08 },
    { from: 'synology', to: 'runnix', type: 'home', curve: -0.10 },
    { from: 'containers', to: 'synology', type: 'home', curve: 0.06 },
    { from: 'influx', to: 'runnix', type: 'active', curve: 0.08 },
    { from: 'influx', to: 'grafana', type: 'home', curve: -0.06 }
  ];

  const domainLabels = { running: 'RUNNING', development: 'DEVELOPMENT', home: 'HOME' };
  const domainColors = { running: '#ff3ca6', development: '#8d6cff', home: '#74e291' };
  const availabilityLabels = { local: 'LOCAL', external: 'EXTERNAL', planned: 'PLANNED' };
  let activeFilter = 'all';
  let selected = 'runnix';

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const nodeElement = id => document.querySelector(`[data-node="${id}"]`);

  function configuredLink(id) {
    return config.links?.[id] || { url: '', label: `Open ${meta[id]?.title || id}`, availability: 'planned' };
  }

  function updateInspector(id) {
    const item = meta[id];
    if (!item) return;
    selected = id;
    $$('.brain-node').forEach(node => node.classList.toggle('is-selected', node.dataset.node === id));

    const link = configuredLink(id);
    const pill = $('#inspectorDomain');
    pill.textContent = domainLabels[item.domain];
    pill.className = `domain-pill ${item.domain}`;
    $('#inspectorAvailability').textContent = availabilityLabels[link.availability] || String(link.availability || 'PLANNED').toUpperCase();
    $('#inspectorKicker').textContent = item.kicker;
    $('#inspectorTitle').textContent = item.title;
    $('#inspectorDescription').textContent = item.description;
    $('#inspectorFlow strong').textContent = item.flow;
    $('#inspectorFacts').innerHTML = item.facts.map(fact => `<li>${escapeHtml(fact)}</li>`).join('');

    const action = $('#inspectorAction');
    const hint = $('#inspectorHint');
    if (link.url) {
      action.href = link.url;
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
      action.removeAttribute('aria-disabled');
      action.classList.remove('is-disabled');
      action.innerHTML = `${escapeHtml(link.label || `Open ${item.title}`)} <span>↗</span>`;
      hint.textContent = link.availability === 'local'
        ? 'Lokale link: beschikbaar wanneer je thuisnetwerk bereikbaar is.'
        : 'Externe navigatielink; opent in een nieuw tabblad.';
    } else {
      action.href = '#';
      action.removeAttribute('target');
      action.setAttribute('aria-disabled', 'true');
      action.classList.add('is-disabled');
      action.innerHTML = `${escapeHtml(item.title)}-link configureren <span>↗</span>`;
      hint.innerHTML = 'Voeg de URL toe in <code>config.js</code>. Plaats daar nooit tokens of credentials.';
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  }

  function drawConnections() {
    const svg = $('#connections');
    const map = $('#brainMap');
    if (!svg || !map || getComputedStyle(map).display === 'none') return;
    const box = map.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = `
      <defs>
        <linearGradient id="activeGradient" x1="0" x2="1"><stop offset="0" stop-color="#ff3ca6"/><stop offset="1" stop-color="#38ead6"/></linearGradient>
      </defs>`;

    relations.forEach((relation, index) => {
      const from = nodeElement(relation.from);
      const to = nodeElement(relation.to);
      if (!from || !to || from.classList.contains('is-dimmed') || to.classList.contains('is-dimmed')) return;
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = a.left - box.left + a.width / 2;
      const y1 = a.top - box.top + a.height / 2;
      const x2 = b.left - box.left + b.width / 2;
      const y2 = b.top - box.top + b.height / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const bend = relation.curve || 0;
      const cx = (x1 + x2) / 2 - dy * bend;
      const cy = (y1 + y2) / 2 + dx * bend;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
      path.setAttribute('class', `connection ${relation.type}`);
      path.setAttribute('data-relation', `${relation.from}-${relation.to}`);
      svg.appendChild(path);

      if (relation.type === 'active') {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '2.3');
        dot.setAttribute('class', 'connection-dot');
        const motion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        motion.setAttribute('dur', `${3.4 + index * .22}s`);
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('path', `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
        dot.appendChild(motion);
        svg.appendChild(dot);
      }
    });
  }

  function applyFilter(domain) {
    activeFilter = domain;
    $$('.filter-button').forEach(button => {
      const active = button.dataset.filter === domain;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('.brain-node').forEach(node => node.classList.toggle('is-dimmed', domain !== 'all' && node.dataset.domain !== domain));
    $$('.mobile-card').forEach(card => card.hidden = domain !== 'all' && card.dataset.domain !== domain);
    if (domain !== 'all' && meta[selected]?.domain !== domain) {
      const fallback = Object.keys(meta).find(id => meta[id].domain === domain);
      if (fallback) updateInspector(fallback);
    }
    requestAnimationFrame(drawConnections);
  }

  function buildMobileGrid() {
    const grid = $('#mobileGrid');
    grid.innerHTML = Object.entries(meta).map(([id, item]) => {
      const link = configuredLink(id);
      const disabled = !link.url;
      const tag = disabled ? 'button' : 'a';
      const attrs = disabled ? 'type="button"' : `href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"`;
      return `<${tag} class="mobile-card${disabled ? ' is-disabled' : ''}" data-mobile-node="${id}" data-domain="${item.domain}" ${attrs} style="--card-color:${domainColors[item.domain]}">
        <span class="node-icon" style="--domain:${domainColors[item.domain]}">${escapeHtml(item.title.slice(0,1))}</span>
        <span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.kicker)} · ${disabled ? 'nog configureren' : (availabilityLabels[link.availability] || 'open')}</small></span>
        <span class="arrow">${disabled ? '···' : '↗'}</span>
      </${tag}>`;
    }).join('');
    $$('[data-mobile-node]').forEach(card => card.addEventListener('click', event => {
      if (card.classList.contains('is-disabled')) {
        event.preventDefault();
        updateInspector(card.dataset.mobileNode);
        $('#inspectorTitle')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }));
  }

  function init() {
    $('#appTitle').textContent = config.title || 'JoJo Brain';
    $('#appSubtitle').textContent = config.subtitle || 'Runnix Control Center';
    document.title = `${config.title || 'JoJo Brain'} · ${config.subtitle || 'Runnix Control Center'}`;

    $$('.brain-node').forEach(node => node.addEventListener('click', () => updateInspector(node.dataset.node)));
    $$('.filter-button').forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
    buildMobileGrid();
    updateInspector('runnix');
    applyFilter('all');

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawConnections, 90);
    });
    window.addEventListener('load', drawConnections, { once: true });
    document.fonts?.ready.then(drawConnections);
  }

  init();
})();
