(() => {
  'use strict';

  const COLORS = {
    cyan: [53, 234, 210], magenta: [255, 47, 157], green: [101, 230, 155],
    violet: [154, 121, 255], orange: [255, 156, 90], blue: [76, 151, 255]
  };
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const esc = (value) => String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));

  class NeuralUniverse {
    constructor({ viewport, canvas, layer, data, onActivate, onSelect }) {
      this.viewport = viewport;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true, desynchronized: true }) || canvas.getContext('2d');
      if (!this.ctx) throw new Error('Canvas 2D context is niet beschikbaar');
      this.layer = layer;
      this.data = data;
      this.onActivate = onActivate;
      this.onSelect = onSelect;
      this.nodes = new Map();
      this.nodeElements = new Map();
      this.edges = [];
      this.particles = [];
      this.currentId = 'jojo';
      this.running = true;
      this.last = 0;
      this.elapsed = 0;
      this.mobile = matchMedia('(max-width: 760px)').matches;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.lowPower = this.mobile || this.reduced;
      this.dpr = Math.min(devicePixelRatio || 1, this.mobile ? 1.25 : 1.6);
      this.drag = null;
      this.focusPulse = 0;
      this.handleResize = () => this.resize();
      if (typeof window.ResizeObserver === 'function') {
        this.resizeObserver = new window.ResizeObserver(this.handleResize);
        this.resizeObserver.observe(viewport);
      } else {
        /* Samsung Internet/WebView fallback: ResizeObserver is not universal. */
        this.resizeObserver = null;
        window.addEventListener('resize', this.handleResize, { passive: true });
        window.addEventListener('orientationchange', this.handleResize, { passive: true });
        if (window.visualViewport) window.visualViewport.addEventListener('resize', this.handleResize, { passive: true });
      }
      this.resize();
      document.addEventListener('visibilitychange', () => { this.running = !document.hidden; if (this.running) requestAnimationFrame((t) => this.frame(t)); });
      requestAnimationFrame((t) => this.frame(t));
    }

    resize() {
      const rect = this.viewport.getBoundingClientRect();
      const visualHeight = window.visualViewport && window.visualViewport.height ? window.visualViewport.height : window.innerHeight;
      this.width = Math.max(280, rect.width || window.innerWidth || 320);
      this.height = Math.max(280, Math.min(rect.height || visualHeight || 480, visualHeight || rect.height || 480));
      this.mobile = this.width <= 760;
      this.lowPower = this.mobile || this.reduced;
      this.dpr = Math.min(devicePixelRatio || 1, this.mobile ? 1.25 : 1.6);
      this.canvas.width = Math.round(this.width * this.dpr);
      this.canvas.height = Math.round(this.height * this.dpr);
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.seedParticles();
      if (this.currentId) this.setGraph(this.currentId, { initial: false, resize: true });
    }

    seedParticles() {
      const count = this.reduced ? 18 : (this.mobile ? 32 : 62);
      this.particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * this.width, y: Math.random() * this.height,
        r: .45 + Math.random() * 1.25, a: .12 + Math.random() * .42,
        vx: (Math.random() - .5) * (this.mobile ? .06 : .1),
        vy: (Math.random() - .5) * (this.mobile ? .05 : .08),
        phase: i * .71
      }));
    }

    pathFor(id) {
      const path = [];
      let item = this.data[id];
      while (item) { path.unshift(item.id); item = item.parent ? this.data[item.parent] : null; }
      return path;
    }

    visibleFor(id) {
      const current = this.data[id] || this.data.jojo;
      let ids = [...this.pathFor(current.id), ...(current.children || [])];
      /* The mobile dock already provides a persistent JoJo route; hide that remote ancestor in deep views. */
      if (this.mobile && current.id !== 'sport-health' && current.parent) ids = ids.filter((nodeId) => nodeId !== 'jojo');
      /* Keep the other Sport & Health hubs visible as dimmed context while one hub is open. */
      if (!this.mobile && current.parent === 'sport-health') {
        const siblings = this.data['sport-health']?.children || [];
        ids.push(...siblings);
      }
      return [...new Set(ids)];
    }

    computeTargets(ids, focusId) {
      const targets = new Map();
      const w = this.width, h = this.height;
      const compact = this.mobile;
      const shortViewport = h <= 540;
      const cx = w * .5;
      const cy = shortViewport ? h * .55 : (compact ? h * .43 : h * .49);
      const focus = this.data[focusId];
      targets.set(focusId, { x: cx, y: cy });

      const ancestors = this.pathFor(focusId).slice(0, -1).reverse();
      ancestors.forEach((id, index) => {
        const step = shortViewport ? Math.min(w * .25, 210) : (compact ? Math.min(w * .27, 108) : Math.min(Math.max(w * .18, 190), 220));
        const angle = compact ? -1.86 : -2.35;
        const distance = step * (index + 1);
        targets.set(id, {
          x: cx + Math.cos(angle) * distance,
          y: cy + Math.sin(angle) * distance * (shortViewport || compact ? 1 : .75)
        });
      });

      const children = focus.children || [];
      const radiusX = compact ? (children.length >= 5 ? Math.min(w * .37, 146) : Math.min(w * .41, 162)) : Math.min(w * .27, 315);
      const radiusY = shortViewport ? Math.min(h * .24, 115) : (compact ? Math.min(h * .245, 205) : Math.min(h * .3, 250));
      const start = children.length === 1 ? 0 : (compact && children.length === 4 ? -Math.PI / 4 : -Math.PI / 2);
      children.forEach((id, index) => {
        const angle = children.length === 1 ? 0 : start + index * (Math.PI * 2 / children.length);
        targets.set(id, { x: cx + Math.cos(angle) * radiusX, y: cy + Math.sin(angle) * radiusY });
      });

      const context = ids.filter((id) => !targets.has(id));
      context.forEach((id, index) => {
        const count = context.length;
        const angle = -.35 + index * (Math.PI * 1.2 / Math.max(1, count - 1));
        const outerX = compact ? Math.min(w * .43, 168) : Math.min(w * .39, 430);
        const outerY = compact ? Math.min(h * .34, 230) : Math.min(h * .38, 315);
        targets.set(id, { x: cx + Math.cos(angle) * outerX, y: cy + Math.sin(angle) * outerY });
      });

      ids.forEach((id, index) => {
        if (!targets.has(id)) targets.set(id, { x: cx + (index - ids.length / 2) * 70, y: cy + 170 });
      });
      return targets;
    }

    setGraph(id, options = {}) {
      const focusId = this.data[id] ? id : 'jojo';
      const previousFocus = this.currentId;
      this.currentId = focusId;
      const visibleIds = this.visibleFor(focusId);
      const targets = this.computeTargets(visibleIds, focusId);
      const previousNodes = this.nodes;
      const next = new Map();
      const origin = previousNodes.get(focusId) || previousNodes.get(this.data[focusId].parent) || { x: this.width / 2, y: this.height / 2 };

      visibleIds.forEach((nodeId, index) => {
        const data = this.data[nodeId];
        const old = previousNodes.get(nodeId);
        const target = targets.get(nodeId);
        next.set(nodeId, {
          id: nodeId, data, targetX: target.x, targetY: target.y,
          x: old?.x ?? origin.x + (Math.random() - .5) * 24,
          y: old?.y ?? origin.y + (Math.random() - .5) * 24,
          vx: old?.vx ?? 0, vy: old?.vy ?? 0,
          phase: old?.phase ?? index * 1.73,
          fixed: old?.fixed ?? false,
          role: nodeId === focusId ? 'focus' : (
            this.pathFor(focusId).includes(nodeId) ? 'ancestor' :
            data.parent === focusId ? 'child' : 'context'
          )
        });
      });
      this.nodes = next;
      this.edges = [];
      visibleIds.forEach((nodeId) => {
        const parent = this.data[nodeId].parent;
        if (parent && next.has(parent)) this.edges.push({ a: parent, b: nodeId, phase: Math.random() * 6.28, semantic: false });
      });
      (this.data[focusId].connections || []).forEach((connection) => {
        if (!next.has(connection.from) || !next.has(connection.to)) return;
        this.edges.push({
          a: connection.from, b: connection.to, phase: Math.random() * 6.28,
          semantic: true, accent: connection.accent, label: connection.label || ''
        });
      });
      this.renderNodes();
      if (!options.resize && previousFocus !== focusId) {
        this.focusPulse = 1;
        this.viewport.classList.remove('is-focusing');
        void this.viewport.offsetWidth;
        this.viewport.classList.add('is-focusing');
      }
    }

    renderNodes() {
      this.layer.innerHTML = [...this.nodes.values()].map((node) => {
        const d = node.data;
        const size = node.role === 'focus' ? 'focus' : (d.size || node.role);
        return `<button class="neural-node role-${node.role} size-${esc(size)} accent-${esc(d.accent)}" type="button" data-node-id="${esc(d.id)}" aria-label="${esc(d.title)} openen">
          <span class="node-halo" aria-hidden="true"></span>
          <span class="node-symbol" aria-hidden="true">${esc(d.icon)}</span>
          <span class="node-text"><small>${esc(d.eyebrow)}</small><strong>${esc(d.short)}</strong><em>${esc(d.status)}</em></span>
        </button>`;
      }).join('');

      this.nodeElements.clear();
      this.layer.querySelectorAll('.neural-node').forEach((element) => {
        const id = element.dataset.nodeId;
        this.nodeElements.set(id, element);
        let startX = 0, startY = 0, moved = false;
        element.addEventListener('pointerdown', (event) => {
          if (event.button !== 0) return;
          startX = event.clientX; startY = event.clientY; moved = false;
          element.setPointerCapture(event.pointerId);
          this.startDrag(id, event.clientX, event.clientY);
          element.classList.add('is-dragging');
        });
        element.addEventListener('pointermove', (event) => {
          if (!this.drag || this.drag.id !== id) return;
          if (Math.hypot(event.clientX - startX, event.clientY - startY) > 5) moved = true;
          this.dragTo(event.clientX, event.clientY);
        });
        const finish = (event) => {
          if (!this.drag || this.drag.id !== id) return;
          this.endDrag(); element.classList.remove('is-dragging');
          if (!moved) this.onActivate?.(id);
          else this.onSelect?.(id);
          try { element.releasePointerCapture(event.pointerId); } catch {}
        };
        element.addEventListener('pointerup', finish);
        element.addEventListener('pointercancel', () => { this.endDrag(); element.classList.remove('is-dragging'); });
        element.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); this.onActivate?.(id); }
        });
      });
    }

    pointerToLocal(clientX, clientY) {
      const rect = this.viewport.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }
    startDrag(id, clientX, clientY) {
      const node = this.nodes.get(id); if (!node) return;
      const p = this.pointerToLocal(clientX, clientY);
      this.drag = { id, dx: node.x - p.x, dy: node.y - p.y };
      node.fixed = true; node.vx = 0; node.vy = 0;
    }
    dragTo(clientX, clientY) {
      const node = this.nodes.get(this.drag?.id); if (!node) return;
      const p = this.pointerToLocal(clientX, clientY);
      const nx = p.x + this.drag.dx, ny = p.y + this.drag.dy;
      node.vx = nx - node.x; node.vy = ny - node.y;
      node.x = nx; node.y = ny;
    }
    endDrag() {
      const node = this.nodes.get(this.drag?.id);
      if (node) { node.fixed = false; node.vx *= .55; node.vy *= .55; }
      this.drag = null;
    }

    physics(dt) {
      const nodes = [...this.nodes.values()];
      const strength = this.lowPower ? .015 : .02;
      nodes.forEach((n) => {
        if (n.fixed) return;
        n.vx += (n.targetX - n.x) * strength * dt;
        n.vy += (n.targetY - n.y) * strength * dt;
        if (!this.reduced) n.vy += Math.sin(this.elapsed * .0007 + n.phase) * .0025 * dt;
      });

      this.edges.forEach((edge) => {
        const a = this.nodes.get(edge.a), b = this.nodes.get(edge.b); if (!a || !b) return;
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.max(1, Math.hypot(dx, dy));
        const target = Math.hypot(b.targetX - a.targetX, b.targetY - a.targetY);
        const force = (dist - target) * .0028 * dt;
        const fx = dx / dist * force, fy = dy / dist * force;
        if (!a.fixed) { a.vx += fx; a.vy += fy; }
        if (!b.fixed) { b.vx -= fx; b.vy -= fy; }
      });

      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        const dist2 = Math.max(900, dx * dx + dy * dy);
        if (dist2 > 52000) continue;
        const dist = Math.sqrt(dist2), force = 130 / dist2 * dt;
        dx /= dist; dy /= dist;
        if (!a.fixed) { a.vx -= dx * force; a.vy -= dy * force; }
        if (!b.fixed) { b.vx += dx * force; b.vy += dy * force; }
      }

      const marginX = this.mobile ? 58 : 90, marginY = this.mobile ? 90 : 76;
      nodes.forEach((n) => {
        if (n.fixed) return;
        n.vx *= Math.pow(.84, dt); n.vy *= Math.pow(.84, dt);
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < marginX) n.vx += (marginX - n.x) * .02;
        if (n.x > this.width - marginX) n.vx -= (n.x - (this.width - marginX)) * .02;
        if (n.y < marginY) n.vy += (marginY - n.y) * .02;
        if (n.y > this.height - marginY) n.vy -= (n.y - (this.height - marginY)) * .02;
      });
    }

    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);
      const focus = this.nodes.get(this.currentId);
      if (focus) {
        const glow = ctx.createRadialGradient(focus.x, focus.y, 0, focus.x, focus.y, this.mobile ? 220 : 360);
        const c = COLORS[focus.data.accent] || COLORS.cyan;
        glow.addColorStop(0, `rgba(${c.join(',')},.075)`); glow.addColorStop(.45, `rgba(${c.join(',')},.025)`); glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow; ctx.fillRect(0, 0, this.width, this.height);
      }

      this.particles.forEach((p) => {
        if (!this.reduced) { p.x += p.vx; p.y += p.vy; }
        if (p.x < -3) p.x = this.width + 3; if (p.x > this.width + 3) p.x = -3;
        if (p.y < -3) p.y = this.height + 3; if (p.y > this.height + 3) p.y = -3;
        const pulse = .55 + Math.sin(this.elapsed * .0006 + p.phase) * .25;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(170,200,225,${p.a * pulse})`; ctx.fill();
      });

      this.edges.forEach((edge, index) => {
        const a = this.nodes.get(edge.a), b = this.nodes.get(edge.b); if (!a || !b) return;
        const c = COLORS[edge.accent || b.data.accent] || COLORS.cyan;
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, `rgba(${c.join(',')},${edge.semantic ? '.18' : '.08'})`);
        gradient.addColorStop(.55, `rgba(${c.join(',')},${edge.semantic ? '.68' : '.42'})`);
        gradient.addColorStop(1, `rgba(${c.join(',')},${edge.semantic ? '.24' : '.16'})`);
        ctx.beginPath(); ctx.moveTo(a.x, a.y);
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const bend = Math.sin(index * 2.1 + .5) * 18;
        ctx.quadraticCurveTo(mx - (b.y-a.y)/180*bend, my + (b.x-a.x)/180*bend, b.x, b.y);
        ctx.strokeStyle = gradient; ctx.lineWidth = edge.semantic ? 1.5 : (edge.a === 'jojo' ? 1.25 : .85);
        ctx.setLineDash(edge.semantic ? [5, 7] : []); ctx.stroke(); ctx.setLineDash([]);
        if (!this.reduced) {
          const t = (this.elapsed * (edge.semantic ? .00018 : .00012) + edge.phase) % 1;
          const x = (1-t)*(1-t)*a.x + 2*(1-t)*t*mx + t*t*b.x;
          const y = (1-t)*(1-t)*a.y + 2*(1-t)*t*my + t*t*b.y;
          ctx.beginPath(); ctx.arc(x, y, this.mobile ? (edge.semantic ? 2 : 1.45) : (edge.semantic ? 2.4 : 1.8), 0, Math.PI*2);
          ctx.fillStyle = `rgba(${c.join(',')},.9)`; ctx.shadowColor = `rgb(${c.join(',')})`; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        }
        if (edge.semantic && edge.label && !this.mobile) {
          ctx.save();
          ctx.font = '700 8px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          const labelWidth = ctx.measureText(edge.label).width + 14;
          ctx.fillStyle = 'rgba(5,7,13,.82)';
          ctx.fillRect(mx - labelWidth / 2, my - 8, labelWidth, 16);
          ctx.fillStyle = `rgba(${c.join(',')},.88)`;
          ctx.fillText(edge.label, mx, my + .5);
          ctx.restore();
        }
      });
    }

    updateDom() {
      this.nodes.forEach((node) => {
        const el = this.nodeElements.get(node.id);
        if (!el) return;
        el.style.transform = `translate3d(${node.x}px,${node.y}px,0) translate(-50%,-50%)`;
      });
    }

    frame(time) {
      if (!this.running) return;
      const raw = this.last ? (time - this.last) / 16.667 : 1;
      const dt = clamp(raw, .35, 2.2);
      this.last = time; this.elapsed = time;
      this.physics(dt); this.draw(); this.updateDom();
      requestAnimationFrame((t) => this.frame(t));
    }
  }

  window.NeuralUniverse = NeuralUniverse;
})();
