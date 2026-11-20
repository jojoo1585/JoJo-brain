# Neural Engine — V0.3.0

## Verantwoordelijkheid

`neural-engine.js` visualiseert een kleine zichtbare subgraph en behandelt physics, pointerdragging en canvasrendering. De engine bevat geen domeinlogica en opent zelf geen externe links.

## Zichtbare subgraph

Voor focusnode `F`:

```text
visible = path(JoJo → F) + directChildren(F)
```

Daardoor blijft de graph leesbaar en het rekenwerk begrensd, terwijl JoJo als oorsprong zichtbaar blijft.

## Simulatiestap

- target-attractie naar een responsieve clusterlayout;
- springcorrectie langs zichtbare edges;
- repulsie binnen een beperkte afstand;
- velocity damping;
- viewport-boundaries;
- optionele sinusvormige micro-float.

Slepen zet de node tijdelijk vast. Omdat de springberekening blijft lopen, reageren gekoppelde nodes fysiek. Bij loslaten krijgt de node opnieuw target-attractie.

## Rendering

- canvas: achtergrondparticles, focusglow, curved edges en pulse dots;
- DOM: nodecards en toegankelijke labels;
- CSS: halos, focusstijl en focusovergang.

## Adaptatie

| Modus | DPR-cap | Particles | Micro-float |
|---|---:|---:|---:|
| Desktop | 1.6 | 62 | ja |
| Phone | 1.25 | 32 | ja |
| Reduced motion | apparaatcap | 18 | nee |

## Niet-doelen

- geen algemene graph-editor;
- geen persistente nodeposities;
- geen 3D/WebGL;
- geen externe physicsdependency;
- geen integratiedata of accountstatus.
