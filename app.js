(() => {
  'use strict';
  const RELEASE = '0.3.0.1';
  const root = document.documentElement;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value == null ? '' : value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));
  let universe = null;
  let graph = null;
  let config = { links: {} };
  let currentId = 'jojo';
  let installPrompt = null;

  function markReady() {
    clearTimeout(window.__JOJO_BOOT_GUARD__);
    root.classList.remove('is-booting');
    root.classList.add('app-ready');
    const boot = $('#boot-screen');
    if (boot) boot.classList.add('is-hidden');
  }

  function showFatal(error) {
    console.error('JoJo bootstrap:', error);
    root.classList.remove('is-booting');
    root.classList.add('app-failed');
    const boot = $('#boot-screen');
    if (!boot) return;
    boot.classList.remove('is-hidden');
    const status = boot.querySelector('p');
    if (status) status.textContent = navigator.onLine ? 'UPDATE WORDT OPNIEUW GELADEN…' : 'OFFLINE · VERBIND OM BIJ TE WERKEN';
    /* One bounded recovery reload; never loop. */
    if (navigator.onLine && !sessionStorage.getItem('jojo-bootstrap-retry-' + RELEASE)) {
      sessionStorage.setItem('jojo-bootstrap-retry-' + RELEASE, '1');
      setTimeout(() => location.reload(), 1200);
    }
  }

  function pathFor(id) {
    const path = [];
    let item = graph[id];
    while (item) { path.unshift(item); item = item.parent ? graph[item.parent] : null; }
    return path;
  }

  function renderBreadcrumbs() {
    $('#breadcrumbs').innerHTML = pathFor(currentId).map((node, index, all) => `<li><button type="button" data-node="${esc(node.id)}" ${index === all.length - 1 ? 'aria-current="page"' : ''}>${esc(node.short)}</button></li>`).join('');
  }

  function showDetail(id, open = false) {
    const node = graph[id] || graph.jojo;
    $('#detail-domain').textContent = node.domain;
    $('#detail-status').textContent = node.status;
    $('#detail-eyebrow').textContent = node.eyebrow;
    $('#detail-title').textContent = node.title;
    $('#detail-description').textContent = node.description;
    $('#detail-flow').innerHTML = `<small>FLOW</small><strong>${esc(node.flow)}</strong>`;
    $('#detail-points').innerHTML = node.points.map((point) => `<li>${esc(point)}</li>`).join('');
    const url = node.linkKey ? config.links && config.links[node.linkKey] : '';
    const actions = [];
    if (url) actions.push(`<a class="primary-action" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(node.linkLabel || `Open ${node.title}`)} <span>↗</span></a>`);
    else if (node.linkKey) actions.push(`<span class="disabled-action">${esc(node.linkLabel || node.title)} configureren <span>↗</span></span>`);
    if (node.children && node.children.length && node.id !== currentId) actions.push(`<button class="secondary-action" type="button" data-node="${esc(node.id)}">Focus deze cluster <span>◎</span></button>`);
    $('#detail-actions').innerHTML = actions.join('');
    $('#privacy-note').textContent = node.privacy || (node.linkKey && !url ? 'Deze private of lokale link blijft bewust leeg in de publieke configuratie.' : 'JoJo bewaart hier geen accountgegevens of externe data.');
    const drawer = $('#info-drawer');
    ['accent-cyan','accent-magenta','accent-green','accent-violet','accent-orange'].forEach((name) => drawer.classList.remove(name));
    drawer.classList.add(`accent-${node.accent}`);
    if (open) { drawer.classList.remove('is-collapsed'); drawer.classList.add('is-open'); }
  }

  function updateClusterTitle() {
    const node = graph[currentId];
    $('#cluster-title').innerHTML = `<small>${esc(node.eyebrow)}</small><strong>${esc(node.id === 'jojo' ? 'Alles verbonden.' : node.title)}</strong>`;
    root.dataset.cluster = node.domain.toLowerCase();
  }

  function pushHistory(hash) {
    window.history.pushState({ id: currentId }, '', `${location.pathname}${location.search}${hash}`);
  }

  function render(id, options) {
    const useHistory = !options || options.history !== false;
    currentId = graph[id] ? id : 'jojo';
    universe.setGraph(currentId);
    renderBreadcrumbs();
    updateClusterTitle();
    showDetail(currentId, false);
    document.title = `${graph[currentId].title} · JoJo`;
    document.querySelectorAll('[data-action="back"]').forEach((button) => { button.disabled = !graph[currentId].parent; });
    if (useHistory) {
      const hash = currentId === 'jojo' ? '' : `#${currentId}`;
      if (location.hash !== hash) pushHistory(hash);
    }
  }

  function activate(id) {
    const node = graph[id];
    if (!node) return;
    if (id === currentId) { showDetail(id, true); return; }
    if ((node.children && node.children.length) || ['jojo','sport-health','home','development'].includes(id)) render(id);
    else showDetail(id, true);
  }

  function bindUi() {
    document.addEventListener('click', (event) => {
      const node = event.target.closest('[data-node]');
      if (node) { activate(node.dataset.node); return; }
      const actionElement = event.target.closest('[data-action]');
      const action = actionElement ? actionElement.dataset.action : '';
      if (action === 'root') render('jojo');
      if (action === 'back') render(graph[currentId].parent || 'jojo');
      if (action === 'close-drawer') { $('#info-drawer').classList.remove('is-open'); $('#info-drawer').classList.add('is-collapsed'); }
      if (action === 'toggle-drawer') { $('#info-drawer').classList.remove('is-collapsed'); $('#info-drawer').classList.toggle('is-open'); }
    });
    addEventListener('popstate', () => render(location.hash.slice(1) || 'jojo', { history: false }));
    addEventListener('hashchange', () => { const id = location.hash.slice(1) || 'jojo'; if (id !== currentId) render(id, { history: false }); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if ($('#info-drawer').classList.contains('is-open')) $('#info-drawer').classList.remove('is-open');
        else if (graph[currentId].parent) render(graph[currentId].parent);
      }
      if (event.key === 'Home' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) render('jojo');
    });
  }

  function updateConnection() {
    const online = navigator.onLine;
    const element = $('#connection-status');
    element.classList.toggle('is-offline', !online);
    element.querySelector('span').textContent = online ? 'ONLINE' : 'OFFLINE';
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      const key = 'jojo-controller-' + RELEASE;
      if (sessionStorage.getItem(key)) return;
      reloading = true;
      sessionStorage.setItem(key, '1');
      location.reload();
    });
    try {
      const registration = await navigator.serviceWorker.register(`./service-worker.js?v=${RELEASE}`, { scope: './', updateViaCache: 'none' });
      if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) worker.postMessage({ type: 'SKIP_WAITING' });
        });
      });
      registration.update().catch(() => {});
    } catch (error) {
      console.warn('Service worker:', error);
    }
  }

  function bindPwa() {
    addEventListener('online', updateConnection);
    addEventListener('offline', updateConnection);
    updateConnection();
    addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); installPrompt = event; $('#install-button').hidden = false; });
    $('#install-button').addEventListener('click', async () => { if (!installPrompt) return; installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; $('#install-button').hidden = true; });
    addEventListener('appinstalled', () => { $('#install-button').hidden = true; });
    registerServiceWorker();
  }

  function bootstrap() {
    try {
      graph = window.JOJO_GRAPH;
      config = window.JOJO_CONFIG || { links: {} };
      if (!graph || !graph.jojo) throw new Error('Graph data ontbreekt');
      if (typeof window.NeuralUniverse !== 'function') throw new Error('Neural engine ontbreekt');
      if (window.__JOJO_SYNC_VIEWPORT__) window.__JOJO_SYNC_VIEWPORT__();
      currentId = graph[location.hash.slice(1)] ? location.hash.slice(1) : 'jojo';
      universe = new window.NeuralUniverse({
        viewport: $('#graph-viewport'), canvas: $('#space-canvas'), layer: $('#node-layer'), data: graph,
        onActivate: (id) => activate(id), onSelect: (id) => showDetail(id, true)
      });
      bindUi();
      bindPwa();
      const reducedQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
      if (reducedQuery.matches) $('#motion-mode').textContent = 'CALM';
      render(currentId, { history: false });
      requestAnimationFrame(() => requestAnimationFrame(markReady));
    } catch (error) {
      showFatal(error);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  else bootstrap();
})();
