(() => {
  'use strict';

  const DEFAULT_THRESHOLD = 6;

  function finite(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function begin({ pointerId = 0, pointerType = 'mouse', clientX = 0, clientY = 0, threshold = DEFAULT_THRESHOLD } = {}) {
    return {
      pointerId,
      pointerType: String(pointerType || 'mouse'),
      startX: finite(clientX),
      startY: finite(clientY),
      lastX: finite(clientX),
      lastY: finite(clientY),
      threshold: Math.max(1, finite(threshold, DEFAULT_THRESHOLD)),
      maxDistance: 0,
      dragging: false,
      cancelled: false
    };
  }

  function move(session, clientX, clientY) {
    if (!session || session.cancelled) return session;
    session.lastX = finite(clientX, session.lastX);
    session.lastY = finite(clientY, session.lastY);
    const distance = Math.hypot(session.lastX - session.startX, session.lastY - session.startY);
    session.maxDistance = Math.max(session.maxDistance, distance);
    if (session.maxDistance >= session.threshold) session.dragging = true;
    return session;
  }

  function cancel(session) {
    if (session) session.cancelled = true;
    return session;
  }

  function finish(session, clientX, clientY) {
    if (!session) return Object.freeze({ kind: 'cancel', distance: 0, pointerType: 'unknown' });
    move(session, clientX, clientY);
    const kind = session.cancelled ? 'cancel' : (session.dragging ? 'drag' : 'tap');
    return Object.freeze({ kind, distance: session.maxDistance, pointerType: session.pointerType });
  }

  const api = Object.freeze({ DEFAULT_THRESHOLD, begin, move, cancel, finish });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.JOJO_POINTER_GESTURE = api;
})();
