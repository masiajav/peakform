# Revision individual: Jetpack Cat, Wuyang y Zenyatta

Fecha: 2026-10-03. Revisor: Codex. Autoria publica: Replaid Lab.

## Alcance

- `/counters/jetpack-cat`: disputarle el aire desde cobertura sin abandonar el frente, llegadas de Lifeline, Purr y Catnapper.
- `/counters/wuyang`: coordinar entrada y seguimiento tras Torrent y Wave, responder a Tidal Blast sin perder el objetivo.
- `/counters/zenyatta`: cortar Discord, coordinar dive, respetar volley y Snap Kick, diferenciar invulnerabilidad personal de curacion de aliados.

Cada texto se ha leido individualmente en el navegador. Los ejemplos son situaciones hipoteticas de ranked, no partidas atribuidas a una persona. No se ha realizado una prueba dentro del juego ni se afirma experiencia personal. No se han cambiado rutas, pagos, tablas ni perfiles privados en este lote.

## Investigacion y limites

Se consultaron los textos indexados del sitio oficial. El acceso directo a algunas fichas devolvio 403; no se presenta como lectura directa satisfactoria ni como prueba en el juego.

- `https://overwatch.blizzard.com/en-gb/heroes/jetpack-cat/`: kit, combustible y perks. Vuelo permanente contrastado con el anuncio oficial Overwatch Spotlight de 2026. No se mezclan poderes de Stadium con ranked.
- `https://overwatch.blizzard.com/en-gb/heroes/wuyang/`: kit, Overflow, Balance, Ebb and Flow y Falling Rain. No se afirma que Guardian Wave limpie anti. No se pudo contrastar con una referencia oficial especifica la interaccion Matrix-Wave, por lo que no se publica una afirmacion categorica sobre ella.
- `https://overwatch.blizzard.com/en-gb/heroes/zenyatta/`: Transcendence da invulnerabilidad al propio Zenyatta y curacion a los aliados; Snap Kick, Discordant Repair, Ascendance, Focused Destruction y Dual Harmony.
- `https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/10/`: cobertura y reaplicacion de Discord. Se evita publicar duraciones numericas no recertificadas con el parche actual.
- `https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/02/`: sustitucion de Transcendent Condemnation por Discordant Repair.
- `https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/`: las variantes Community Crafted y Stadium son modos distintos; sus efectos no se incorporan al consejo de ranked.

Los nombres de perks se identifican como elecciones opcionales minor/major, no como habilidades simultaneas garantizadas. Las recomendaciones tacticas son analisis propio condicionado a mapa, ayuda y estado del objetivo. No se prometen resultados de rango.

## Comprobacion antes de registrar la revision

Build previo a indexacion: `K2MpbNxuLAJJR5buTxpLz`, conservado en `.next-editorial-built-preview/air-water-discord-review2-2026-10-03`, servido en el puerto 3012.

- Lectura integral de los tres textos renderizados y apertura de todas sus FAQs.
- Inspeccion visual de cabeceras en 1440x900 y 390x844; FAQs y enlaces inferiores tambien en movil. Sin pantalla blanca, overflow horizontal o retratos rotos en las comprobaciones realizadas.
- Canonical propio, un H1, title y description propios, Article/BreadcrumbList/FAQPage parseables, fecha real de revision y autoria Replaid Lab.
- Las tres rutas permanecian `noindex, follow` antes del registro, sin anuncios ni placeholders.
- 23 destinos internos unicos comprobados por HTTP: todos 200, incluidos filtros de guias. Click y confirmacion del H1 de las tres guias relacionadas.
- Sin errores de consola en las comprobaciones del navegador interno. Los tests completos comprobaran de nuevo cada pagina.
- Se corrigieron las frases sobre el melee de Jetpack Cat, el DPS expuesto de Wuyang y la segunda entrada despues de Transcendence antes de generar los hashes.

## Versiones autorizadas

- Jetpack Cat: `7bea1e27f357fef688f773ea01d6770058e2f4f67363467e4fac48d749d92e95`.
- Wuyang: `09644f33c9629f375b207bb72570618d9bdc9576a64ddcc47c09ee10b67c809c`.
- Zenyatta: `14f902b6326290c155fa978b72e3c2d745436e28fceabde6a3c9399770d52d14`.

Los hashes solo inspeccionan contenido; la aprobacion se registra manualmente. Una modificacion posterior invalidara esa revision. Se permite indexacion de estas versiones, no publicidad ni aprobacion global del sitio.

## Verificacion cerrada

- `npm.cmd run verify`: lint correcto, 269 unitarios, build correcto y 580 E2E pasados, sin retries (7.3 minutos de navegador).
- Se corrigio una errata en el guard de `grenade launcher` y se repitieron los 269 unitarios, correctos.
- `npx.cmd tsc --noEmit --incremental false` y `git diff --check`: exit 0.
- Build final `whnMUGVwG_bH-ute8C7RZ`, conservado en `.next-editorial-built-preview/air-water-discord-final-2026-10-03`, puerto 3012. Navegador interno confirma `index, follow` en las tres rutas y ausencia de anuncios. Catalogo comprobado en desktop y movil: 25 enlaces, sin overflow.
- Capturas y reporte: `reports/verification-jetpack-cat-wuyang-zenyatta-2026-10-03`; `.last-run.json` registra passed y ninguna prueba fallida.
- Rastreo `reports/adsense-local-2026-10-03-air-water-discord-final.json`: 330 respuestas 200, 94 rutas en sitemap, 95 respuestas indexables incluidas variantes canonical, 235 noindex, 159 rutas de manifiesto cubiertas y ninguna ruta descubierta pendiente.
- Quedan dos avisos de extension de hubs (/news y /counters), no incidencias de metadatos, H1, schema o texto interno detectadas por el rastreo. No se han rellenado hubs para cumplir un numero de palabras.
- Quedan 13 fichas genericamente clasificadas y revisiones antiguas sin recertificar. Cero pares sobre el umbral de similitud no certifica originalidad o calidad del resto.
- El log local conserva StripeAuthenticationError al consultar estado de cuentas. No se han realizado compras, transferencias o cambios de onboarding; el flujo real de pagos no queda certificado por esta revision editorial.

Progreso, no cierre del objetivo global. Identidad legal autorizada, CMP certificado, contenido restante y comprobacion desplegada siguen pendientes.
