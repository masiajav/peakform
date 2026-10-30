# Revisión individual de Sigma: guía y composiciones

Revisión del 30 de octubre de 2026 por Codex. Se leen completos ambos artículos y se comparan sus modelos con el inventario antes de editar. El vídeo se incorpora desde el alias, cuya redirección se conserva. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/sigma-guia-overwatch-poke-escudo` | Distancia y retirada, tarea y recogida de barrera, diferencias entre Grasp y Accretion, rebotes y foco de Hyperspheres, lanzamiento y seguimiento de Flux, señales de exceso de cercanía, tres FAQ y enlaces. | Corrige el título conocido del vídeo, contextualiza marzo de 2025 y añade decisiones de los cuatro perks, incluida la condición de héroes enemigos de Hyper Regeneration. Conserva publicación del 5 de mayo y revisa el texto el 30 de octubre. | `e26ca9f4e928bd7c59fcea432981017687f8421fddecc9e239f6e9e8586ad08e` |
| `/team-comps/sigma` | Hanzo/Torbjörn/Baptiste/Zenyatta, Ashe/Cassidy/Baptiste/Brigitte y Winston/Sojourn/Tracer/Ana/Brigitte en 6v6. Todos los argumentos, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, roles y formatos. No se inventa primera publicación. | `7d393066212c47826f20ab08c296ca3747a8400cd53c300d5904cbf1478037e6` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Sigma](https://overwatch.blizzard.com/en-gb/heroes/sigma/): Hyperspheres, absorción frontal de Grasp, Accretion, barrera recuperable y Flux. El texto no convierte Grasp en defensa universal y mantiene la elección de cobertura, otro ángulo y reparto de frente/dive en 6v6.

Kinetic Cycle requiere absorber proyectiles para recuperar Accretion. Hyper Regeneration recupera barrera con daño de Hyperspheres a héroes enemigos, condición de las [notas oficiales de abril de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/04/). La ficha actual y las [notas de julio de 2026](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/) también evitan adoptar el porcentaje antiguo de otras copias de la ficha. La guía no promete recuperación al disparar a barreras o desplegables.

Hyper Strike exige cinco impactos directos y después un melee que conecte. Levitation es una alternativa de elevación breve. El texto aplica ambas a distancia y cobertura sin sumarlas ni convertirlas en poderes de Stadium. Las composiciones preparan líneas de daño y peel y ya respetan esos límites; se conservan.

## Vídeo y versión

El [vídeo de emongg](https://www.youtube.com/watch?v=Q2SWvV217o0) y oEmbed responden 200; playability `OK`, título «The ULTIMATE Sigma Guide - Everything You Need To Know (Beginner To Advanced) - Overwatch 2» y fecha 21 de marzo de 2025. Se leen descripción y capítulos de habilidades, posición, cooldowns, mapas, matchups y perks. Hay subtítulos automáticos ingleses; no se detecta pista con nombre de audio original. No se afirma haber visto íntegros los 1536 segundos. El contexto visible distingue la selección y cifras de aquella versión. La corrección de título exige el ID revisado y el título antiguo conocido; otros cambios de medios invalidan la revisión.

Huella de cuerpo y medios finales: `52fe8fd8a4314eecefe199f08b06e72c67184022f486e73ccd3cc88f2738579a`.

## Presentación y publicación

La copia aislada parte de `4030a07`, sin cambios locales ajenos. Pasan seis casos iniciales de ambos artículos aún excluidos y disponibilidad del botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: jerarquía, texto, equipos, imagen, vídeo, FAQ y fechas correctos, sin anuncios ni desbordamientos. Evidencia en `reports/indexing-review-2026-10-27/batch-thirty-three/` y `release-batch-thirty-three/`.

Solo se proponen estas dos URLs con su versión exacta, manteniendo las demás exclusiones y la configuración de anuncios.

## Validación final local

Pasan 708 pruebas unitarias y lint, ocho casos finales de ambos artículos, catálogo/sitemap y filtros, y seis de regresión sobre Orisa y el modo de revisión de anuncios. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía final; las composiciones conservan el texto cuya presentación se inspeccionó en ambos tamaños. Se verifican todos los párrafos, FAQ, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de desbordamientos y anuncios.

Las primeras ejecuciones en el aislamiento terminaron con errores EPERM de caché temporal y compilación, sin pruebas ejecutadas. Se repitieron fuera de ese aislamiento y terminaron correctamente; no se cambió la aplicación para eludir las verificaciones. Falta desplegar y comprobar las URLs públicas.
