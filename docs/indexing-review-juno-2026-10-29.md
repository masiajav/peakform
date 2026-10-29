# Revisión individual de Juno: guía y composiciones

Revisión del 29 de octubre de 2026 por Codex. Se leen completos ambos artículos y se comparan con el inventario antes de editar. El vídeo ya pertenece a la fila canónica de la guía; no se crea otro artículo ni se inventa un alias. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/juno-guia-video-overwatch` | Cobertura y movilidad con salida, recorrido de Hyper Ring, prioridades de Mediblaster, fijación e impactos de torpedos, trayectoria y seguimiento de Orbital Ray, respuesta al dive, VOD, tres FAQ y enlaces. | Corrige el título conocido del vídeo y contextualiza los cambios de elección de perks desde la grabación. Añade decisiones de los cuatro perks actuales. Conserva publicación del 6 de mayo y revisa el texto el 29 de octubre. | `518d6739392213c2ba06cbcb28ac89313c57571ce39849dc3c5cf1d33905246c` |
| `/team-comps/juno` | Ramattra/Mei/Reaper/Kiriko, Orisa/Cassidy/Mei/Brigitte y Reinhardt/Zarya/Mei/Cassidy/Kiriko en 6v6. Todos los argumentos, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, formatos y roles. No se inventa primera publicación. | `9228b6af1b1576a7c6d3283d1b4c38b8737d5454e70a59dae3660ef1680812f1` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Juno](https://overwatch.blizzard.com/en-gb/heroes/juno/): arma que cura o daña, torpedos con fijación, anillo que acelera el paso, Glide Boost horizontal, doble salto/hover y rayo que avanza con curación y aumento de daño. Las composiciones no importan Hyper Healer o Stellar Focus de Stadium ni cuentan triple salto y disparo continuo como efectos base.

Familiar Vitals acelera la fijación sobre aliados, mientras Locked On reduce cooldown por enemigos alcanzados. La guía distingue objetivos marcados de impactos reales. Lift Off añade un tercer salto y Faster Blaster permite disparo continuo durante Glide Boost; son alternativas major. Se explican rutas y cobertura para usar cada opción sin sumar sus ventajas. El [Weekly Recall oficial sobre los cambios de Season 18](https://overwatch.blizzard.com/en-us/news/24226732/repaso-semanal-2-ventajas-2-furias/) confirma el traslado de Locked On al nivel minor y su competencia con Familiar Vitals, además de la introducción de Faster Blaster. Ese cambio posterior a julio de 2025 se contextualiza antes del vídeo.

## Vídeo y versión

El [vídeo de oatmilk_ow](https://www.youtube.com/watch?v=IJUYdqTJYS8) y oEmbed responden 200, playability `OK`, título «THIS Is How To Play Juno In Overwatch 2 || 23 Tips to Rank Up on Juno» y fecha 16 de julio de 2025. Se leen descripción y capítulos de torpedos, anillo, Glide Boost, Orbital Ray y prioridades generales. La descripción avisa de un tramo con audio aislado tras retirar música; no se promete una calidad de audio uniforme ni se presenta la creadora como profesional. El reproductor identifica inglés original `en-US.4`. No se afirma haber visto íntegros los 789 segundos. La corrección de título exige el ID revisado y el título antiguo conocido; cualquier cambio inesperado de medios invalida la revisión.

Huella de cuerpo y medios finales: `ef54455a9d2c4ddac889acee8aacf4e1f67fc80a550e096e82e9f9742bc3c1c3`.

## Presentación y publicación

La copia aislada parte de `e3bb6b6`, sin cambios locales ajenos. Pasan seis casos iniciales de los dos artículos aún excluidos y disponibilidad del botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: jerarquía, texto, equipos, imagen, vídeo, FAQ y fechas correctos, sin anuncios ni desbordamientos. Evidencia en `reports/indexing-review-2026-10-27/batch-thirty/` y `release-batch-thirty/`.

Falta comprobar las versiones finales y su publicación. Solo se proponen estas dos URLs con su versión exacta, manteniendo las demás exclusiones y la configuración de anuncios.

## Validación final local

Pasan 708 pruebas unitarias, lint, ocho casos finales de ambos artículos, catálogo/sitemap y filtros y seis de regresión sobre Mercy y el modo de revisión de anuncios. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía final; las composiciones conservan el texto cuya presentación se inspeccionó en ambos tamaños. Se verifican todos los párrafos, FAQ, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de desbordamientos y anuncios.

## Resultado público

Vercel confirma el commit `589ac54` en [este despliegue de producción](https://vercel.com/masiajavs-projects/peakform/GPgh4n9UNtddKEmPRNhN73jBTYDY). Pasan las 76 respuestas HTTP y la redirección de control: ambas URLs responden 200, sin noindex, incluidas en sitemap, con fechas correctas y sin anuncios. Los 70 artículos anteriores y cuatro controles conservan su estado. Pasan cuatro casos adicionales de navegador contra producción en móvil y escritorio. El registro conserva respuesta, huella, fecha, commit y despliegue por URL: **72 de 140 artículos habilitados y verificados; 68 pendientes**.
