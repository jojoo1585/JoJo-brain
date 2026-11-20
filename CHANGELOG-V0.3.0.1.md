# Changelog — JoJo Brain V0.3.0.1

## Hotfix reason

A real Samsung installed-PWA screenshot showed that the V0.3 shell loaded, but the neural engine never completed bootstrap. The boot label remained visible and static shell controls such as the brand, back button, ROOT/LIVE chips and close button leaked through without graph nodes.

## Root cause

Two frontend conditions could produce that exact state:

1. `neural-engine.js` treated `ResizeObserver` as mandatory. A Samsung Internet/WebView without that API throws in the engine constructor before `render()` and before the boot screen is dismissed.
2. The previous service worker cached unversioned JavaScript and CSS cache-first. During an installed-PWA update, a fresh V0.3 HTML document could temporarily run an older cached `app.js`, creating a mixed application shell.

The fixed 520 px minimum viewport also did not represent the actual visual viewport in Samsung standalone mode.

## Fixed

- optional `ResizeObserver` with `resize`, `orientationchange` and `visualViewport` fallback;
- Samsung standalone viewport height/width synchronized through CSS custom properties before CSS loads;
- graph engine now measures the actual visual viewport and no longer forces a 420/520 px minimum;
- `CSS.escape` dependency removed from the animation loop;
- canvas context has a compatibility fallback;
- critical CSS/JS/manifest/icon URLs are release-versioned;
- service worker cache updated to `jojo-brain-v0.3.0.1`;
- navigation remains network-first and bypasses HTTP cache;
- new service worker activates immediately, removes only previous JoJo caches, claims the installed PWA and triggers one bounded reload;
- service-worker registration uses `updateViaCache: none` and an explicit release URL;
- bootstrap is guarded with validation, one bounded recovery reload and deterministic ready state;
- static header/drawer/dock fallback elements stay hidden until graph initialization succeeds;
- drawer placeholders are empty in HTML, preventing ROOT/LIVE/X leakage before initialization;
- boot screen is dismissed only after JoJo and its graph nodes render.

## Preserved

- V0.3 Living Neural Universe design;
- spring physics, draggable nodes and physical connection response;
- particle background and animated signal lines;
- Sport & Health, Home and Development hierarchy;
- V0.2 installability and offline foundation;
- phone-oriented particle and DPR limits;
- privacy boundary and empty local URLs.
