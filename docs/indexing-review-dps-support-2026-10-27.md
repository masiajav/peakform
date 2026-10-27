# Revisión individual de DPS y Support para indexación

Fecha: 27 de octubre de 2026. Revisión automatizada asistida por lectura e inspección de capturas; no implica haber jugado partidas ni aprobación de Google.

## URLs y versiones

| URL existente | SHA-256 del modelo editorial revisado |
| --- | --- |
| `/guides/como-mejorar-como-dps-overwatch` | `873f2be8f4e7b16461312a6dcc3db077f0c1ce58d88e28bb2e1723c587865a42` |
| `/guides/como-mejorar-como-support-overwatch` | `55bd803a79a37909107bac3a1d747e228af16fa075e4c685634456a9df1d8168` |

Se leyeron completos ambos artículos de `reviewed-role-guides.ts`, sus cinco FAQ por artículo y los modelos efectivos del inventario actual. La revisión anterior del 18 de octubre había corregido consejos absolutos y verificado la presentación, pero mantuvo explícitamente el bloqueo de indexación. No se trataba de un rechazo individual de Google.

## DPS: utilidad y contraste

La guía responde a decisiones de ángulos, objetivos, momento de entrada y revisión de repeticiones, con ejemplos distintos de Gibraltar y Numbani. Explica cuándo conservar una altura, cambiar de objetivo o arriesgar un toque en overtime. Distingue ejecución mecánica de elección del duelo y no identifica una muerte temprana con un error automáticamente. Las FAQ añaden respuestas a dudas de foco, profundidad del flanco y Recall; no son copias literales de los párrafos.

Se contrastó Recall con la descripción oficial de Tracer (posición y vida anteriores) y el reinicio de Swift Strike con la de Genji (depende de eliminaciones). La guía evita asumir el reinicio antes de conseguir una eliminación y explica que la posición a la que vuelve Recall puede dejar de ser segura. El uso de Deadeye para amenazar un cruce es un ejemplo táctico condicionado por exposición y apoyo, no una garantía de eliminación. No incluye cifras de balance, tier lists, porcentajes de victoria ni poderes de Stadium.

## Support: utilidad y contraste

La guía desarrolla posición y retirada, urgencia de curación, combinación de daño y utilidad, defensa ante dive, reparto con el otro apoyo y uso de ultimates. Ejemplifica la conexión entre alcance, visión, cobertura y posibilidad real de ayudar, sin exigir seguir al tank por una línea peligrosa. No impone guardar siempre Suzu ni gastar un solo recurso por entrada.

Se consultaron las páginas oficiales actuales de Ana, Mercy, Kiriko, Baptiste, Lúcio y Zenyatta: proyectiles y curación de Ana, funciones del bastón y desplazamiento hacia aliados de Mercy, ofuda/kunai/teleport/limpieza de Kiriko, curación de área y campo destruible de Baptiste, velocidad y protección temporal de Lúcio y curación próxima de Trascendencia. El texto no presenta estas herramientas como protección universal ni prescribe proporciones fijas de curación y daño. Sus ejemplos de recorrido y coordinación son análisis editorial, no recomendaciones oficiales de Blizzard.

## Fuentes primarias leídas

- [Tracer](https://overwatch.blizzard.com/en-gb/heroes/tracer/).
- [Genji](https://overwatch.blizzard.com/en-gb/heroes/genji/).
- [Cassidy](https://overwatch.blizzard.com/en-gb/heroes/cassidy/).
- [Ana](https://overwatch.blizzard.com/en-gb/heroes/ana/).
- [Mercy](https://overwatch.blizzard.com/en-gb/heroes/mercy/).
- [Kiriko](https://overwatch.blizzard.com/en-gb/heroes/kiriko/).
- [Baptiste](https://overwatch.blizzard.com/en-gb/heroes/baptiste/).
- [Lúcio](https://overwatch.blizzard.com/en-gb/heroes/lucio/).
- [Zenyatta](https://overwatch.blizzard.com/en-gb/heroes/zenyatta/).

Las ocho consultas directas de habilidades terminaron en HTTP 200 y se conservaron en `reports/indexing-review-2026-10-27/role-sources.json`, con sus originales HTML. Cassidy se contrastó además en el resultado de búsqueda oficial. No se extrapolaron cifras de parches antiguos ni apartados de Stadium.

## Presentación y enlaces

Las cuatro comprobaciones de navegador previas al desbloqueo pasaron en escritorio y móvil: H1, canonical, fechas reales, cinco FAQ visibles iguales al JSON-LD, enlaces del cuerpo con respuesta 200, precios y condiciones de expertos, ausencia de anuncios, ausencia de errores del navegador y navegación efectiva al cuaderno gratuito. Se inspeccionaron las capturas de escritorio y las vistas móviles; el resumen y los metadatos se ajustan al ancho disponible. La publicación original de junio y la modificación del texto del 18 de octubre se conservan: revisar la indexación no se presenta como una nueva edición del contenido.

## Cambio de control

La regla que bloqueaba todas las guías revisadas se sustituye por una comprobación de versión exacta y de coincidencia del texto renderizado. Solo estas dos revisiones reciben registro. Las guías sin revisión vigente y sus alias no se incorporan automáticamente al sitemap. Se mantiene `adsAllowed: false` en esta familia, incluso después de permitir indexación.

Evidencia local previa al desbloqueo: `reports/indexing-review-2026-10-27/release/role-review-before.log` y `release/reports/role-guide-decisions/`. La validación local final y la comprobación pública posterior se detallan a continuación.

## Validación final local

La copia aislada del lote pasa lint, las 700 pruebas unitarias y 18 casos de navegador en escritorio y móvil, incluidos robots, sitemap, FAQ, navegación, recomendaciones de expertos y bloqueo de anuncios. La compilación de producción usada por esos casos también termina correctamente. Una primera ejecución esperaba una etiqueta explícita `index, follow`; el comportamiento válido de esta ruta es retirar la restricción. Se comprobó por tanto que ni las metaetiquetas robots/googlebot ni la cabecera X-Robots-Tag contengan noindex/none, además de exigir las dos URLs en sitemap. Se conserva el resultado fallido de esa expectativa inicial en `role-review-after.log`; la ejecución corregida está en `role-review-final.log`.

Las pruebas de versión comprueban que editar el cuerpo del modelo, el texto renderizado o el título invalida el permiso; otra guía o un alias no reciben aprobación. Las fechas de edición y la elegibilidad de anuncios no cambian por este desbloqueo.

## Despliegue y comprobación pública

El commit `c08cc7c` se publicó en `main` y Vercel confirmó su despliegue correcto. Se verificaron ambas URLs públicas con HTTP 200, sin restricciones noindex en HTML ni cabeceras, con pertenencia al sitemap y sin slots ni script de anuncios. Como controles negativos, la guía de Mauga, el filtro de Ana y el counter de Moira conservaron noindex y quedaron fuera del sitemap.

Se repitieron contra producción los cuatro recorridos completos de DPS y Support en escritorio y móvil; todos pasaron. Incluyen canonical, fechas, cinco FAQ y sus datos estructurados, lectura de los apartados, enlaces internos, condiciones de expertos y navegación al cuaderno. Evidencia: `first-batch-production.json` y `release/role-review-production.log` en `reports/indexing-review-2026-10-27/`. El registro por URL marca estas dos revisiones como habilitadas y verificadas; no afirma que Google ya las haya incorporado a su índice.
