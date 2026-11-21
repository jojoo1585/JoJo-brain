(() => {
  'use strict';

  const EMPTY_STATE = Object.freeze({
    source: 'Runnix', mode: 'local-only', status: 'disconnected', connected: false,
    reason: 'secure-endpoint-not-configured', preview: null, updatedAt: null
  });

  const text = (value, max = 80) => typeof value === 'string' ? value.trim().slice(0, max) : '';
  const integer = (value, min, max) => Number.isInteger(value) && value >= min && value <= max ? value : null;

  function safeEndpoint(value) {
    if (!value || typeof value !== 'string' || location.protocol === 'file:') return null;
    try {
      const url = new URL(value, location.href);
      /* Public JoJo never calls a NAS/private/cross-origin address. A future secured host exposes a same-origin bridge. */
      if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return null;
      return url;
    } catch {
      return null;
    }
  }

  function sanitizePreview(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid-payload');
    const today = payload.today && typeof payload.today === 'object' ? {
      title: text(payload.today.title),
      type: text(payload.today.type, 40),
      durationMinutes: integer(payload.today.durationMinutes, 0, 1440)
    } : null;
    const execution = payload.lastExecution && typeof payload.lastExecution === 'object' ? {
      label: text(payload.lastExecution.label),
      status: text(payload.lastExecution.status, 32)
    } : null;
    const progress = payload.progress && typeof payload.progress === 'object' ? {
      label: text(payload.progress.label),
      completedSessions: integer(payload.progress.completedSessions, 0, 99)
    } : null;
    const preview = {
      today: today && (today.title || today.type || today.durationMinutes !== null) ? today : null,
      lastExecution: execution && (execution.label || execution.status) ? execution : null,
      progress: progress && (progress.label || progress.completedSessions !== null) ? progress : null
    };
    if (!preview.today && !preview.lastExecution && !preview.progress) throw new Error('empty-preview');
    return Object.freeze(preview);
  }

  function createRunnixAdapter(options = {}) {
    const endpoint = safeEndpoint(options.previewEndpoint || '');
    const timeoutMs = integer(options.timeoutMs, 500, 15000) || 4500;
    let state = endpoint ? Object.freeze({ ...EMPTY_STATE, mode: 'same-origin-read-only', reason: 'not-loaded' }) : EMPTY_STATE;
    const subscribers = new Set();
    const publish = (next) => { state = Object.freeze(next); subscribers.forEach((callback) => callback(state)); return state; };

    async function refresh() {
      if (!endpoint) return publish(EMPTY_STATE);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(endpoint.href, {
          method: 'GET', credentials: 'same-origin', cache: 'no-store',
          headers: { Accept: 'application/json' }, signal: controller.signal
        });
        if (!response.ok) throw new Error(`http-${response.status}`);
        const preview = sanitizePreview(await response.json());
        return publish({
          source: 'Runnix', mode: 'same-origin-read-only', status: 'connected', connected: true,
          reason: '', preview, updatedAt: new Date().toISOString()
        });
      } catch (error) {
        return publish({
          source: 'Runnix', mode: 'same-origin-read-only', status: 'unavailable', connected: false,
          reason: error && error.name === 'AbortError' ? 'timeout' : 'request-failed', preview: null, updatedAt: null
        });
      } finally {
        clearTimeout(timer);
      }
    }

    return Object.freeze({
      getState: () => state,
      refresh,
      subscribe(callback) {
        if (typeof callback !== 'function') return () => {};
        subscribers.add(callback); callback(state);
        return () => subscribers.delete(callback);
      }
    });
  }

  const api = Object.freeze({ createRunnixAdapter, sanitizePreview, safeEndpoint, EMPTY_STATE });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.JOJO_RUNNIX = api;
})();
