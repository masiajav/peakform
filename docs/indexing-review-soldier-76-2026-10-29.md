# Revisión individual de Soldier 76: guía y composiciones

Revisión del 29 de octubre de 2026 por Codex. Se leen completos ambos artículos. Sus modelos y la fila pública de la guía coinciden con el inventario antes de editar. El vídeo se incorpora desde el alias, cuya redirección se conserva. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/soldier-76-guia-overwatch-off-angles` | Lateral recuperable y timing, tracking y Helix, rotación con Sprint, Field y cobertura, Visor ante Matrix y barreras, VOD, tres FAQ y enlaces. | Contextualiza el vídeo de 2022, corrige su título conocido, añade recarga durante Sprint y decisiones de los cuatro perks, diferenciando Field compartido de Stim Pack personal. Conserva publicación del 5 de mayo y revisa contenido el 29 de octubre. | `4074bb7f1391d505d8189db86fe465665eeb9c5ebf3f401e625f4840d11370e4` |
| `/team-comps/soldier-76` | Equipos Winston/Tracer, Sigma/Cassidy y Reinhardt/D.Va/Mei en 6v6; todos los argumentos, responsabilidades, rotaciones, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, formatos y roles. Se corrige el validador para reconocer «Soldier: 76» y «Soldier-76» como el mismo héroe, sin cambiar su nombre correcto ni las revisiones exigidas. No se inventa primera fecha de publicación. | `5fa6cc9c494bec1e1aa0a1d5af78c640d93a54c5a5c311047c601b112dd45ff4` |

## Exactitud y fuentes

Se descarga y lee la ficha oficial de [Soldier: 76](https://overwatch.blizzard.com/en-gb/heroes/soldier-76/). Se confirman rifle, Sprint, Field, Helix y Visor, además de Helix Propulsion y Tactical Salvo como minor y Full Stride y Stim Pack como major. El texto diferencia velocidad del proyectil de daño, cooldown durante Visor, aumento progresivo de Sprint y reemplazo del campo por curación personal y velocidad de ataque. Las [notas oficiales del 14 de abril de 2026](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/04/) confirman recarga durante Sprint y su penalización temporal de velocidad; ya no se atribuye esa posibilidad a un perk antiguo. No se adoptan cambios de Community Crafted o Stadium para ranked.

El validador comparaba nombres sin normalizar puntuación, mientras que el catálogo usa `Soldier-76`. Ahora identifica los héroes con la misma normalización de nombres usada en las comprobaciones independientes de equipos. La detección de duplicados también usa esa identidad: dos variantes del nombre no cuentan como dos DPS distintos. Se mantienen los requisitos de roles, tamaño, revisión exacta y candidato individual; esto no aprueba otros artículos.

## Vídeo y versión

El [tutorial de Metro](https://www.youtube.com/watch?v=YbZP-K67QDw) y oEmbed responden 200 con playability `OK`, título real «How to play Soldier 76 (Best Method) | In-Depth Tutorial (Overwatch 2)» y fecha del 29 de octubre de 2022. El reproductor confirma original inglés y subtítulos automáticos ingleses. Se leen descripción y capítulos de fundamentos, movimiento, puntería, campo, alturas, Visor y combos. No se afirma haber visto íntegros los 1035 segundos. El contexto visible diferencia la grabación anterior a los perks actuales y no promete trasladar cifras, ajustes ni cancelaciones históricas. La corrección solo afecta al título antiguo conocido del ID revisado.

Huella de cuerpo y medios finales: `3831631372b91f7ecf6c0c59d95de7c4ee1acef7f85198f144c91fd07146d8ef`.

## Presentación y publicación

La copia aislada parte de `d21cbd6`, sin cambios locales ajenos. Pasan seis casos iniciales de ambos artículos aún excluidos y el botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: texto, estructura, imagen, equipos, FAQ y fechas correctos, sin anuncios ni desbordamientos. Falta comprobar las versiones finales y su publicación. Evidencia en `reports/indexing-review-2026-10-27/batch-twenty-two/` y `release-batch-twenty-two/`.

Solo estas dos URLs se proponen para publicación con su versión exacta. Los demás pendientes conservan noindex y la configuración de anuncios permanece igual.

## Validación final local

Pasan 707 pruebas unitarias, lint, ocho casos finales de ambas páginas, catálogo y filtros y seis de regresión sobre Widowmaker, Wuyang y el modo de revisión de anuncios. La prueba de identidad construye versiones de prueba con huella válida para demostrar que se rechazan duplicados con distinta puntuación, héroes desconocidos y roles incorrectos incluso después del control de revisión exacta. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía corregida; las composiciones conservan el contenido cuya presentación ya se inspeccionó en ambos tamaños. Texto íntegro, FAQ, equipos, fechas, enlaces, imágenes, vídeo e idioma, botón de reproducción, sitemap y ausencia de desbordamientos y anuncios correctos. Falta desplegar y comprobar las URLs públicas.
