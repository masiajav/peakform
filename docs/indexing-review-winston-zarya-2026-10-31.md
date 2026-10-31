# Revisión individual de Winston y Zarya

Revisión por Codex el 31 de octubre de 2026. Se retoma [la lectura preliminar](indexing-review-winston-zarya-preliminary-2026-10-31.md), se revalidan las tres filas publicadas y ambos modelos frente al inventario y se completan las correcciones propias de cada artículo. El vídeo de Winston es nativo; el de Zarya procede de su alias, cuya redirección se conserva. Sus counters y composiciones ya eran indexables y no reciben otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/winston-guia-video-overwatch` | Identificación de la parodia, dive con seguimiento y salida, burbuja contra amenaza concreta, límites de persecución y Primal, ejercicio VOD, tres FAQ y enlaces. | Cuerpo, contexto y fecha del 20 de octubre conservados. Se registra la identidad exacta del vídeo y la versión renderizada; primera publicación del 6 de mayo conservada. | `28dac5043c75be3c1d39e8ef59ac56eb0c24b22b01f58f8c61d87e31434bc288` |
| `/guides/zarya-guia-overwatch-burbujas-energia` | Burbuja según amenaza/acción aliada, alcance, energía y cobertura, Graviton con seguimiento, contexto de 2022, VOD, cuatro FAQ, segundo Tank y enlaces. | Título conocido del vídeo corregido; contexto fechado y aplicación de los cuatro perks actuales. Primera publicación canónica del 5 de mayo conservada; revisión del texto el 31 de octubre. | `17b23d70a8db859dcc5f49ce00b0d75ee60e35f8b9db95a718b761e4d86db524` |

Huella del cuerpo y medios finales de Winston: `75f14f4815d8b6d478359ca2919f76ded66a0817c13e44188eef03772189aef0`. La de Zarya: `ae241b3ed116531bab3529d6b3b7028cd246531d15650d0b89d07574d2fd17d1`.

La primera ejecución unitaria detectó dos fallos: una fecha antigua esperada por la prueba de Zarya y una asignación fija de rol en ambas revisiones que ocultaba un cambio posterior en la fuente. Se actualiza la expectativa de fecha y se elimina la asignación redundante: las filas actuales conservan `tank`, mientras que un rol inesperado ya no se normaliza silenciosamente. Las huellas renderizadas actuales no cambian; se registran las nuevas versiones de los objetos de revisión y se repiten las comprobaciones finales.

## Winston: conservar el sentido del artículo

La [ficha oficial de Winston](https://overwatch.blizzard.com/en-gb/heroes/winston/) confirma salto, barrera y Primal. Las decisiones escritas se limitan a posición, seguimiento, bloqueo útil y salida; la burbuja no se presenta como defensa universal. El artículo ya identifica explícitamente la parodia y enlaza la guía competitiva separada. Su utilidad es interpretar el medio sin atribuir recomendaciones literales al creador y proponer un ejercicio de revisión. No se transforma en otro tutorial de perks ni se modifica su fecha por añadir un registro técnico de revisión.

El [vídeo de The WatchOver](https://www.youtube.com/watch?v=QduGAeDb1tM) y oEmbed responden 200 y playability `OK`: título «A Completely Serious Guide To Winston», 3 de abril de 2025, 1071 segundos. Se lee su descripción completa, sin capítulos, que bromea con salto sin escape, burbuja decorativa y errores resultantes. El contexto escrito coincide. Hay subtítulos automáticos ingleses y pista original inglesa, con español automático seleccionado en la respuesta observada. El idioma original `en` es correcto. No se afirma haber visto el vídeo íntegro.

## Zarya: condiciones actuales de perks

La [ficha oficial de Zarya](https://overwatch.blizzard.com/en-gb/heroes/zarya/) confirma arma de corto alcance, granadas, barreras propia/aliada, energía al bloquear y Graviton. La guía mantiene el destino de la protección según amenaza y no trata la energía alta como permiso para abandonar cobertura.

Jump-Ups aumenta empuje propio del secundario y necesita un aterrizaje útil. Spotter activa regeneración y velocidad del aliado que recibe Projected Barrier; no se atribuye a la burbuja propia ni a una curación instantánea. Extra Oomph requiere daño del haz mientras una barrera está activa y no se aplica a cualquier disparo. Energy Lance atraviesa enemigos, sin atravesar paredes ni ampliar por ello el rango. Se presentan como dos alternativas minor y dos major, sin sumarlas.

Se leen las [notas oficiales del 10 de febrero de 2026](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/02/): Spotter pasa de major a minor, Energy Lance deja de exigir energía superior a 50 y Extra Oomph se define por daño de haz durante barrera. Se leen las [del 8 de septiembre](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/09/), que ajustan Particle Barrier en 5v5 y mantienen Projected Barrier. No se copia una cadencia universal del vídeo de 2022 ni se inventan cifras para otros formatos.

El [vídeo de LeonDrummer](https://www.youtube.com/watch?v=ssWnCfolWa0) y oEmbed responden 200 y `OK`: título real «Guía básica: Zarya | Overwatch 2», 14 de octubre de 2022, 281 segundos. Se lee la descripción completa, sin capítulos. Hay subtítulos automáticos españoles, sin pista con nombre de audio original en la respuesta observada. Se mantiene `es` y se corrige solo el título antiguo exacto del vídeo revisado; otra identidad o metadatos imprevistos invalidan la revisión. No se afirma haberlo visto íntegro.

## Presentación y comprobaciones

La copia aislada `release-batch-forty-one` parte de `ef194f6`, sin cambios locales ajenos. Pasan ocho casos iniciales de ambas páginas todavía excluidas y sus reproductores en móvil/escritorio. Se inspeccionaron dos capturas completas de escritorio y dos cabeceras móviles: jerarquía, contexto y texto correctos, sin desbordamientos ni anuncios. La guía canónica de Zarya conserva el vídeo al entrar por el alias.

Evidencia en `reports/indexing-review-2026-10-27/batch-forty-one/` y `release-batch-forty-one/`.

## Validación final local

Tras corregir los dos fallos iniciales, pasan 708 pruebas unitarias y lint, seis casos finales de ambas guías y filtros en móvil/escritorio y seis de regresión de Domina, Jetpack Cat y el modo de revisión de anuncios. Se inspeccionan seis capturas finales: páginas completas de escritorio/móvil y cabeceras móviles de ambas guías. Texto, jerarquía, fechas, vídeo y FAQ legibles, sin anuncios ni desbordamientos.

Las comprobaciones recorren todos los párrafos, las tres FAQ de Winston y cuatro de Zarya con sus respuestas estructuradas, enlaces, metadatos, fechas, identidad e idioma de vídeo y botón de reproducción, canonical, robots y sitemap. Un cambio posterior no revisado de rol, etiquetas o medios invalida la publicación. La fecha del texto conservado de Winston sigue siendo el 20 de octubre; la revisión editorial del 31 no se inventa como modificación visible. Quedan pendientes despliegue y verificación pública.
