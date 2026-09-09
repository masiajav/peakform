# Replaid Pick Lab

MVP de Overwolf para elegir heroe antes de jugar. Cruza la composicion aliada, los enemigos visibles y el mapa para recomendar tres picks explicables por sinergia, matchup y encaje en el mapa.

La pantalla completa permite probar composiciones manualmente. El overlay compacto reutiliza el mismo estado y esta pensado para aparecer durante la seleccion de heroe, no durante el combate.

## Estructura

- `src/manifest.json`: manifest de Overwolf.
- `src/background.html` y `src/background.js`: ventana background que activa eventos y hotkeys.
- `src/overlay.html` y `src/overlay.js`: top 3 compacto para la seleccion de heroe.
- `src/debug.html` y `src/debug.js`: Pick Lab completo con selector manual.
- `src/lib/picker-data.js`: heroes, mapas, counters y sinergias del MVP.
- `src/lib/picker-engine.js`: ranking determinista y razones legibles.
- `src/lib/overwolf.js`: adaptador de roster y ventanas de Overwolf.
- `dist`: salida generada que se carga en Overwolf.

## Probar en navegador

Con `dist` servido en local, abre:

- `debug.html` para elegir rol, mapa, aliados y enemigos.
- `overlay.html` para ver la version compacta con el mismo estado.

Los presets Brawl, Dive y Poke permiten validar el ranking rapidamente. Los enemigos son opcionales porque Overwatch no siempre los revela al inicio de la partida.

## Build y tests

```bash
npm run overlay:test
npm run overlay:build
```

El build copia tambien los retratos existentes de `public/heroes`. Despues, carga `apps/replaid-coach-overlay/dist/manifest.json` desde Overwolf.

## Hotkeys

- `Ctrl+Shift+R`: mostrar u ocultar las recomendaciones compactas.
- `Ctrl+Shift+D`: abrir Pick Lab.

## Notas

Dentro de Overwolf, el roster aliado y el rol se sincronizan cuando Game Events Provider los expone. La seleccion manual sigue disponible para desarrollo y para completar informacion que el juego todavia oculta.

Este companion permanece dentro del repo principal mientras comparta marca, flujo de usuario y roadmap con Replaid. Los criterios para separarlo estan en `docs/repository-strategy.md`.
