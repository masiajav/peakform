# Replaid Coach Overlay

MVP de overlay local para Overwatch sobre Overwolf. El objetivo inicial es validar eventos oficiales, mantener estado de partida en memoria y mostrar recomendaciones explicables sin leer memoria, interceptar red ni automatizar inputs.

## Scripts

```bash
npm run overlay:dev
npm run overlay:typecheck
npm run overlay:test
npm run overlay:build
```

El build genera `apps/replaid-coach-overlay/dist` y copia `manifest.json` dentro de esa carpeta. Para probarlo en Overwolf, carga `dist` como app unpacked/local.

## Alcance del MVP

- Escucha `game_info`, `match_info`, `roster`, `kill`, `assist` y `death` cuando Overwolf los expone.
- Degrada a modo limitado si faltan eventos.
- Usa reglas locales y muestra confianza/razón de cada recomendación.
- No usa Supabase, login, IA generativa en tiempo real, OCR, memoria del proceso, tráfico de red ni automatización de inputs.
