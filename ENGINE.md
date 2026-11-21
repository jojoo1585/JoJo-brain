# Neural Engine — V0.4.0.2

## Verantwoordelijkheid

`neural-engine.js` visualiseert de zichtbare subgraph en behandelt physics, nodepositionering en canvasrendering. `pointer-gesture.js` bepaalt onafhankelijk of input een tap, drag of cancel is.

## Pointer lifecycle

```text
pointerdown
   │
   ▼
pending ── beweging < 6 px ──> pending
   │
   ├── pointerup ─────────────> tap → activate/focus
   │
   └── max distance ≥ 6 px ──> drag (latched)
                                  │
                                  └── pointerup → endDrag, geen detail
```

De maximale afstand sinds pointerdown bepaalt de classificatie. Terugbewegen naar het startpunt maakt een drag dus niet opnieuw tot tap. Mouse en touch gebruiken exact hetzelfde contract. `pointercancel` eindigt zonder activatie.

## Physics tijdens drag

Physics-dragging start pas na het overschrijden van de drempel. De gesleepte node wordt tijdelijk `fixed`; edge springs blijven verbonden nodes beïnvloeden. Bij release:

1. `endDrag()` verwijdert `fixed`;
2. een deel van de pointervelocity blijft behouden;
3. damping en target-attractie brengen de layout terug;
4. geen detail- of selectiecallback wordt uitgevoerd.

Daarmee blijft het V0.4 springgedrag behouden zonder ongewenste bottom sheet.

## Simulatiestap

- target-attractie naar responsieve clustertargets;
- springcorrectie langs zichtbare edges;
- lokale repulsie;
- velocity damping;
- viewport-boundaries;
- optionele micro-float.

## Rendering

- canvas: particles, focusglow, curved edges en pulse dots;
- DOM: toegankelijke nodebuttons;
- CSS: halos, focusstijl en clustertransities;
- Runnix-preview staat buiten de physicslaag en onderschept geen pointerinput.

### Runnix-family theme

Canvas en DOM delen één begrensde palette:

- `#07080d` / `#0c0f17` voor achtergrond en cards;
- blue `#3b82f6`, violet `#8b5cf6`, magenta/rose `#f43fa6` voor productintelligence;
- cyan `#2dd4bf` voor signalen en healthcontext;
- sourcevarianten blijven binnen blue/cyan/rose in plaats van losstaande regenboogkleuren.

De canvas-RGB-waarden zijn gelijk aan de CSS-tokens. Glow blijft decoratief en laag in opacity; leesbaarheid komt uit bordercontrast en lichte typografie.

## Adaptatie

| Modus | DPR-cap | Particles | Gesture |
|---|---:|---:|---|
| Desktop | 1.6 | 62 | Pointer/mouse, 6 px |
| Phone/PWA | 1.25 | 32 | Pointer/touch, 6 px |
| Reduced motion | apparaatcap | 18 | zelfde classificatie |

## Compatibility boundary

- `ResizeObserver` blijft optioneel;
- `visualViewport` blijft leidend in standalone PWA;
- pointer capture wordt per gesture gebruikt;
- toetsenbord Enter/Spatie activeert rechtstreeks en wordt niet als drag behandeld;
- de engine bevat geen Runnix- of andere domeindata.
