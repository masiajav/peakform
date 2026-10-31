# Revisión individual de las guías de Domina y Jetpack Cat

Revisión por Codex el 31 de octubre de 2026. Se leen completas y por separado ambas guías, se revalidan sus modelos frente al inventario y se contrastan habilidades, perks y vídeos con fuentes primarias. Son dos vídeos nativos; no hay aliases adicionales. Sus counters y composiciones ya eran indexables y no reciben otra aprobación.

| URL | Lectura y utilidad | Correcciones | Versión revisada |
| --- | --- | --- | --- |
| `/guides/domina-guia-video-overwatch` | Cobertura antes de barrera, paneles y ángulos, secuencia de Photon Magnum, repulsión contra pared o peel, detonación con seguimiento, Panopticon, VOD, tres FAQ y enlaces. | Título real y contexto de febrero; cuatro perks actuales, diferenciando escudos propios de paneles, alcance de daño, explosión que conecta y recolocación única. Corporate Retreat sustituye a Power Move del vídeo. | `97c1b2f443f35648255fe3296d2bbd89f4340be34a4e68b3a6418ce771b2825c` |
| `/guides/jetpack-cat-guia-video-overwatch` | Rutas aéreas cubiertas, reserva de combustible, destino compartido, curación/daño según urgencia, Purr junto al equipo, Catnapper con salida, VOD, tres FAQ y enlaces. | Contexto de febrero y cambios posteriores; cuatro perks actuales, distinguiendo curación del arma de otras fuentes y escudos propios de protección al pasajero. Se añade interrupción de Lifeline por control sobre el transportado. | `50728caf5f1b62a96f340b4eca2a7c02c769f3d01ad3f97f2ae37f65bbec0bac` |

Ambas conservan su primera publicación del 6 de mayo de 2026 y actualizan la revisión del texto al 31 de octubre. Las huellas del cuerpo y medios finales son `6f23a75ed74cbfc056ab3d01587dc0be49744b4d6c5a742cb53c491735515e09` para Domina y `4bc299d8e348cf1a4500d4b754aa27237166944a3f92502da986569f74230f20` para Jetpack Cat.

## Fuentes y exactitud de Domina

Se lee la [ficha oficial de Domina](https://overwatch.blizzard.com/en-gb/heroes/domina/): secuencia de arma, barrera segmentada, empuje con stun contra pared, cristal detonable y encierro que explota al terminar. La guía combina esas herramientas con cobertura y seguimiento; no promete que barrera o ultimate resuelvan una exposición lateral.

Efficient Design recupera escudos propios y activa regeneración después de Barrier Array, sin reparar por ello los paneles. Extended Power amplía alcance, sin añadir daño. Disruptive Detonation exige que la explosión alcance al enemigo. Corporate Retreat permite un traslado de la barrera mientras esté activa. Se leen las [notas oficiales del 16 de junio](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/06/), que añaden Corporate Retreat y eliminan Power Move, y se separan las notas de Community Crafted del 30 de junio y los poderes de Stadium de ranked.

## Fuentes y exactitud de Jetpack Cat

Se lee la [ficha oficial de Jetpack Cat](https://overwatch.blizzard.com/en-gb/heroes/jetpack-cat/): curación/daño del arma, aceleración y recuperación más lenta al transportar, Lifeline que cura y acelera al aliado, pulsos de Purr con empuje inicial y Catnapper que engancha al enemigo más cercano al impacto. La guía mantiene prioridades de soporte y rutas de regreso.

Ulterior Motive recupera combustible de la curación de Biotic Pawjectiles, sin trasladarlo al daño o Purr. Transport Shielding protege al propio Cat mientras lleva a otro héroe, sin prometer invulnerabilidad al pasajero. Purrfect Form añade tres ondas por pulso. Claws Out potencia un melee periódico que hiere y ralentiza, como alternativa major, sin justificar perseguir fuera de ayuda.

Se leen las notas oficiales de [10 de marzo](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/03/), con retirada de Territorial, cambio de Claws Out y nueva Ulterior Motive; [16 de junio](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/06/), con combustible y Transport Shielding; [11 de agosto](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/08/), que sustituye Headbutt por Purrfect Form; [8 y 10 de septiembre](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/09/), sobre desconexión de Lifeline por control y Purr frente a barreras; y [6 de octubre](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/10/), sobre Deadeye y tamaños de impacto. No se presenta el transporte como garantía contra todo control ni se copian las cifras anteriores del vídeo. Community Crafted y Stadium mantienen su contexto propio.

## Vídeos

El [vídeo de KarQ](https://www.youtube.com/watch?v=jNbnhZRZx2I) responde 200 y playability `OK`, con oEmbed coincidente: «Overwatch - EVERY DOMINA ABILITY | Full Breakdown Guide & Tips», 14 de febrero de 2026, 411 segundos. Se lee su descripción completa y capítulos, incluido Power Move a 6:12. Se corrige únicamente el título antiguo conocido del vídeo revisado, sin aceptar otra identidad. El [vídeo de Awkward](https://www.youtube.com/watch?v=DaR2n3jkLSM) también responde 200 y `OK`, título almacenado correcto, 26 de febrero y 1360 segundos; se lee su descripción completa, sin capítulos. No se afirma haber visto íntegro ninguno.

Ambos tienen subtítulos automáticos ingleses y pista «Inglés (US) original». En las respuestas observadas se selecciona español automático por defecto; el contexto visible explica esa posibilidad y mantiene `en` como idioma original revisado. Los vídeos no se toman como evidencia de mecánicas posteriores a febrero.

## Presentación y validación

La copia aislada parte de `b19c5fc`, sin cambios locales ajenos. Pasan ocho casos iniciales de ambas páginas todavía excluidas y sus reproductores en móvil/escritorio. Se inspeccionan ambas capturas completas de escritorio y cabeceras móviles: texto y jerarquía legibles, fechas correctas, sin desbordamientos ni anuncios. El marco negro del iframe en las capturas completas se contrasta con sus comprobaciones específicas de botón de reproducción.

Evidencia en `reports/indexing-review-2026-10-27/batch-forty/` y `release-batch-forty/`.

## Validación final local

Pasan 708 pruebas unitarias y lint, seis casos finales de ambas guías y filtros en móvil/escritorio y ocho de regresión de Vendetta, las dos composiciones del lote anterior y el modo de revisión de anuncios. Se inspeccionan seis capturas finales: páginas completas de escritorio y móvil y cabeceras móviles de ambas guías. El contexto añadido y los nuevos párrafos conservan jerarquía y lectura, sin desbordamientos.

Las comprobaciones cubren todos los párrafos, las tres FAQ y sus respuestas estructuradas, enlaces, fechas, metadatos, atribución e idioma original de vídeos, iframe y botón de reproducción, sitemap y ausencia de anuncios. Las pruebas de versión rechazan cambios posteriores inesperados en contenido, medios, rol o etiquetas y no habilitan otra guía ni filtros.

## Publicación comprobada

El commit `ef194f63676c924720908b82c7e472efd6d1d97a` tiene [despliegue Vercel correcto](https://vercel.com/masiajavs-projects/peakform/2NFHYQ74iYmLCsspHgZ213oETmfn). Pasan 99 comprobaciones HTTP y la redirección previa de Pharah, más cuatro casos de navegador contra producción. Ambas URLs responden 200, conservan canonical, fechas e identidad revisada de vídeos, están en sitemap y permiten indexación. Los 93 artículos anteriores y los cuatro controles mantienen su estado. Total: 95 de 140 habilitados y verificados, con 45 pendientes de revisión. Las demás exclusiones y la configuración de anuncios se mantienen.
