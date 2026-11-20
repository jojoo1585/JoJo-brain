(() => {
  'use strict';
  const graph = window.JOJO_GRAPH;
  const config = window.JOJO_CONFIG || { links: {} };
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));
  let currentId = graph[location.hash.slice(1)] ? location.hash.slice(1) : 'jojo';
  let selectedId = currentId;
  let installPrompt = null;

  const pathFor = (id) => {
    const path = []; let item = graph[id];
    while (item) { path.unshift(item); item = item.parent ? graph[item.parent] : null; }
    return path;
  };

  const universe = new window.NeuralUniverse({
    viewport: $('#graph-viewport'), canvas: $('#space-canvas'), layer: $('#node-layer'), data: graph,
    onActivate: (id) => activate(id), onSelect: (id) => showDetail(id, true)
  });

  function renderBreadcrumbs() {
    $('#breadcrumbs').innerHTML = pathFor(currentId).map((node, i, all) => `<li><button type="button" data-node="${esc(node.id)}" ${i === all.length-1 ? 'aria-current="page"' : ''}>${esc(node.short)}</button></li>`).join('');
  }

  function showDetail(id, open = false) {
    const node = graph[id] || graph.jojo;
    selectedId = node.id;
    $('#detail-domain').textContent = node.domain;
    $('#detail-status').textContent = node.status;
    $('#detail-eyebrow').textContent = node.eyebrow;
    $('#detail-title').textContent = node.title;
    $('#detail-description').textContent = node.description;
    $('#detail-flow').innerHTML = `<small>FLOW</small><strong>${esc(node.flow)}</strong>`;
    $('#detail-points').innerHTML = node.points.map((point) => `<li>${esc(point)}</li>`).join('');
    const url = node.linkKey ? config.links?.[node.linkKey] : '';
    const actions = [];
    if (url) actions.push(`<a class="primary-action" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(node.linkLabel || `Open ${node.title}`)} <span>↗</span></a>`);
    else if (node.linkKey) actions.push(`<span class="disabled-action">${esc(node.linkLabel || node.title)} configureren <span>↗</span></span>`);
    if (node.children?.length && node.id !== currentId) actions.push(`<button class="secondary-action" type="button" data-node="${esc(node.id)}">Focus deze cluster <span>◎</span></button>`);
    $('#detail-actions').innerHTML = actions.join('');
    $('#privacy-note').textContent = node.privacy || (node.linkKey && !url ? 'Deze private of lokale link blijft bewust leeg in de publieke configuratie.' : 'JoJo bewaart hier geen accountgegevens of externe data.');
    const drawer = $('#info-drawer');
    ['accent-cyan','accent-magenta','accent-green','accent-violet','accent-orange'].forEach((name) => drawer.classList.remove(name));
    drawer.classList.add(`accent-${node.accent}`);
    if (open) {
      drawer.classList.remove('is-collapsed');
      drawer.classList.add('is-open');
    }
  }

  function updateClusterTitle() {
    const node = graph[currentId];
    $('#cluster-title').innerHTML = `<small>${esc(node.eyebrow)}</small><strong>${esc(node.id === 'jojo' ? 'Alles verbonden.' : node.title)}</strong>`;
    document.documentElement.dataset.cluster = node.domain.toLowerCase();
  }

  function render(id, { history = true } = {}) {
    currentId = graph[id] ? id : 'jojo'; selectedId = currentId;
    universe.setGraph(currentId);
    renderBreadcrumbs(); updateClusterTitle(); showDetail(currentId, false);
    document.title = `${graph[currentId].title} · JoJo`;
    document.querySelectorAll('[data-action="back"]').forEach((button) => { button.disabled = !graph[currentId].parent; });
    if (history) {
      const hash = currentId === 'jojo' ? '' : `#${currentId}`;
      if (location.hash !== hash) historyPush(hash);
    }
  }

  function historyPush(hash) { window.history.pushState({ id: currentId }, '', `${location.pathname}${location.search}${hash}`); }
  function activate(id) {
    const node = graph[id]; if (!node) return;
    if (id === currentId) { showDetail(id, true); return; }
    if (node.children?.length || ['jojo','sport-health','home','development'].includes(id)) render(id);
    else showDetail(id, true);
  }

  document.addEventListener('click', (event) => {
    const node = event.target.closest('[data-node]'); if (node) { activate(node.dataset.node); return; }
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'root') render('jojo');
    if (action === 'back') render(graph[currentId].parent || 'jojo');
    if (action === 'close-drawer') {
      $('#info-drawer').classList.remove('is-open');
      $('#info-drawer').classList.add('is-collapsed');
    }
    if (action === 'toggle-drawer') {
      $('#info-drawer').classList.remove('is-collapsed');
      $('#info-drawer').classList.toggle('is-open');
    }
  });
  window.addEventListener('popstate', () => render(location.hash.slice(1) || 'jojo', { history: false }));
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1) || 'jojo'; if (id !== currentId) render(id, { history: false }); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { if ($('#info-drawer').classList.contains('is-open')) $('#info-drawer').classList.remove('is-open'); else if (graph[currentId].parent) render(graph[currentId].parent); }
    if (event.key === 'Home' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) render('jojo');
  });

  function updateConnection() {
    const online = navigator.onLine, el = $('#connection-status');
    el.classList.toggle('is-offline', !online); el.querySelector('span').textContent = online ? 'ONLINE' : 'OFFLINE';
  }
  addEventListener('online', updateConnection); addEventListener('offline', updateConnection); updateConnection();

  addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); installPrompt = event; $('#install-button').hidden = false; });
  $('#install-button').addEventListener('click', async () => { if (!installPrompt) return; installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; $('#install-button').hidden = true; });
  addEventListener('appinstalled', () => { $('#install-button').hidden = true; });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch((error) => console.warn('Service worker:', error)));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) $('#motion-mode').textContent = 'CALM';

  render(currentId, { history: false });
  requestAnimationFrame(() => setTimeout(() => $('#boot-screen').classList.add('is-hidden'), 420));
})();
