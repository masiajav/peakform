# Revision individual: counters de Freja y Pharah

3 de octubre de 2026. Cambios locales, sin commit, push, deploy, solicitud
de AdSense, activacion de publicidad ni modificaciones de pagos.

## Contenido y contraste

El informe anterior marcaba ambas rutas entre los pares mas similares.
Se sustituye su vista generica por dos modelos editoriales distintos.
Cada articulo tiene cuatro matchups razonados, cuatro ventanas, adaptaciones,
errores, tres situaciones hipoteticas, checklist, FAQ y enlaces contextuales.
Los ejemplos no son partidas personales ni se presentan como resultados medidos.

- Freja: segundo Take Aim tras Quick Dash, llegada a altura con seguimiento,
  limites de la persecucion y ayuda separada ante Bola Shot. Rising Winds,
  Momentum Boost y Aerial Recovery son opciones, no todo el kit a la vez.
- Pharah: posicion sostenible del hitscan, ayuda contra el flanker, eleccion
  de objetivo con Mercy, combustible y respuesta al Barrage con movimiento.
  No se perpetua la idea de que la ultimate la deja completamente inmovil.
- No se usan cambios de Community Crafted, April Fools ni poderes de Stadium.
  No se inventan breakpoints, salud, cooldowns o porcentajes.
- Interceptar un proyectil con Matrix no elimina un efecto ya aplicado;
  tampoco se promete absorber toda una ultimate ni ganar por elegir un pick.
- El ejemplo con Winston y D.Va juntos se identifica como 6v6. Los otros no
  dependen de tener dos Tanks en una partida de 5v5.

Referencias internas, no bloques publicos explicando fuentes:

- https://overwatch.blizzard.com/en-gb/heroes/freja/
- https://overwatch.blizzard.com/en-gb/heroes/pharah/
- https://overwatch.blizzard.com/en-gb/heroes/dva/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/09/

El lector devuelve 403 en los fetch directos de algunas paginas; el buscador
recupera contenido indexado del dominio oficial. Se distingue el parche de
abril que mueve Drift Thrusters al kit de la lista de cambios de broma, y los
cambios de septiembre de Freja de las modificaciones temporales de junio.
El documento de septiembre se recupera en resultados del dominio oficial;
no se usa una fuente secundaria como confirmacion de cifras actuales.

## Revision real antes del registro

Build aislado de 193 paginas completado. Preview preservado en
`.next-editorial-built-preview/freja-pharah-review-2026-10-03`, PID 20980,
puerto 3012. Las paginas seguian noindex mientras se revisaban.

- Lectura de ambas paginas renderizadas en navegador interno, 1440x900 y
  390x844: intro, matchups, ventanas, ejemplos, FAQ y enlaces.
- Un H1, canonical propio, imagen cargada, fondo oscuro, sin overflow ni anuncios.
- Article/Breadcrumb/FAQ presentes y JSON-LD parseable.
- FAQ de Take Aim y Barrage abiertas y leidas. Navegacion real hacia Gibraltar
  y Eichenwalde, con sus paginas de mapa cargadas.
- Comprobacion HTTP de los 17 destinos internos distintos de ambas paginas:
  todos 200, incluidos filtros de Ashe y Soldier y guias relacionadas.
- Consola sin errores o advertencias observados en ambas paginas.
- Captura CLI preservada: `reports/freja-review-desktop-2026-10-03.png`.

Versiones exactas registradas tras estas comprobaciones:

- /counters/freja: c5d2e98bf0c63719facc63d2f0d0c897a5d7d8519cfbc780d23fecc06a354792
- /counters/pharah: 7c69599d001bb98be7d2860add576bf849638c1abc490b7a1fad4bf776f98f21

Se anade intencion de indexacion solo para estos dos articulos terminados;
el registro de la version sigue siendo necesario. Sin anuncios. No se crean
rutas nuevas, no se aprueban automaticamente otros slugs ni se inventa
datePublished. La revision del contenido es la del dia real.

## Hub de counters

Se elimina la afirmacion global de "guias revisadas" y su fecha antigua;
disponibilidad en el catalogo no equivale a aprobacion de una version.
Los 13 enlaces visibles coinciden con el ItemList. Se ofrecen Freja y Pharah
sin retirar las guias previas. Se corrige copy de migracion interna a Pick Lab
y se conserva la via de comunicar errores.

La lectura en movil descubre que el boton estrecha excesivamente el titulo
de Pick Lab: se anade un layout de una columna bajo 640px. En el build final
se comprueba el titulo legible y el boton debajo, con una columna calculada
de 290px. La captura movil de Playwright confirma el resultado; no se da por
validado solo por ausencia de overflow.
Sitemap lastModified del hub actualizado por este cambio real.

## Verificacion final

- `npm.cmd run verify`: lint, 257 unitarios en 20 archivos, build de 193
  paginas y 508 pruebas E2E desktop/movil correctos. Exit code 0.
- `npx.cmd tsc --noEmit --incremental false` y `git diff --check`: correctos.
  Git avisa de normalizacion LF/CRLF, no de errores de whitespace.
- Reporte E2E preservado: `reports/freja-pharah-e2e-final-2026-10-03`.
  `test-results/.last-run.json` indica passed, sin tests fallidos.
- Capturas finales de ambas paginas y del hub en
  `reports/reviewed-counters`: lectura visual sin pantalla blanca,
  imagenes rotas o textos cortados. FAQ, metadatos, enlaces, ausencia de
  anuncios y sitemap comprobados en ambas variantes de navegador.
- Preview aislado final: puerto 3012, PID 24632, directorio
  `.next-editorial-built-preview/freja-pharah-final-2026-10-03`, BUILD_ID
  `PFEiSOFLFjehf95N0QvKw`. No comparte artefactos con los builds de pruebas.
- Rastreo `reports/adsense-local-2026-10-03-freja-pharah-final.json`:
  330 respuestas HTTP 200, 82 URLs en sitemap, 83 respuestas indexables,
  247 noindex. Cobertura de las 159 rutas del manifiesto y cola agotada.
- 16 avisos: 14 de similitud de counters y dos de extension de hubs.
  El aviso de Vendetta tambien deja de superar el umbral del comparador,
  aunque ese articulo no se ha cambiado ni aprobado. Una variacion de
  similitud no sustituye la lectura y revision individual.
- Comparacion con el inventario anterior: cambios de campos de contenido,
  SEO o navegacion solo en /counters, /counters/freja y /counters/pharah.
  Las demas rutas mantienen sus campos comparados y estado HTTP.

Este lote no certifica el sitio para AdSense: siguen pendientes otras paginas,
Legal/Privacidad, CMP y verificacion del despliegue y Search Console.
Las pruebas anonimas de acceso y los contratos de pagos pasan, pero no se
han ejecutado compras ni se certifica una transaccion real con Stripe.
