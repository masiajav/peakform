# Revisión individual de Lúcio: guía y composiciones

Revisión del 29 de octubre de 2026 por Codex. Se leen completos ambos artículos canónicos y se comparan con el inventario antes de editar. El vídeo se incorpora desde su alias, cuya redirección se conserva. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/lucio-guia-overwatch-speed-peel` | Destino del speed, cambio de canción según necesidad, ayuda al segundo Support, Amp antes de presión o cruce, Wall Ride y boop para peel, activación y seguimiento de Barrier, VOD, tres FAQ y enlaces. | Añade decisiones de los cuatro perks y contextualiza la grabación de Season 18. Conserva primera publicación del 5 de mayo y revisa el texto el 29 de octubre. | `d675360aa8265888fd592ed97ae11a8d3a559740682b81a749c4c5606ccbca9f` |
| `/team-comps/lucio` | Reinhardt/Mei/Cassidy/Baptiste, Ramattra/Mei/Sojourn/Kiriko y Reinhardt/Zarya/Mei/Cassidy/Baptiste en 6v6. Todos los argumentos, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, roles y formatos. Su enlace a la guía pasa por el alias conservado. No se inventa primera publicación. | `0e0b0adf772966f3266e7d09ca6a654cc9c138502cf30c7da4f1fe8fba4f8645` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Lúcio](https://overwatch.blizzard.com/en-gb/heroes/lucio/): proyectiles, canciones de ayuda próxima, Amp sobre la canción actual, Soundwave, salud temporal de Barrier y Wall Ride. No se presenta la salud temporal como limpieza de anticuración ni invulnerabilidad. Las composiciones exigen destino, munición, apoyo de los DPS y posición del segundo Support antes de acelerar al Tank, con reparto propio de recursos en 6v6.

Los minor actuales son Soundwave Rider, que potencia el siguiente Soundwave después de Wall Ride, y Beat Drop, que activa Amp cuatro segundos tras Barrier. Los major son Noise Violation, que amplía Crossfade solo durante Amp, y Accelerando, que aumenta el ataque personal durante la canción de speed, más durante Amp. La guía explica esas condiciones y sus decisiones de posición y canción, sin sumar ambos major ni atribuir velocidad de ataque a todo el equipo. Las FAQ de composiciones ya distinguen estos efectos opcionales y se conservan.

## Vídeo y versión

El [vídeo de ohwell](https://www.youtube.com/watch?v=tcABXj7t6IE) y oEmbed responden 200; playability `OK`, título «The ULTIMATE 2025 Lucio Guide.» y fecha 3 de septiembre de 2025. Se leen descripción y capítulos de introducción, habilidades, mecánicas, decisiones de equipo y consejos de ranked; la descripción identifica Season 18. Hay subtítulos automáticos ingleses, sin pista de audio con nombre original detectada. No se afirma haber visto íntegros los 976 segundos. El contexto visible diferencia esa versión de los perks contrastados para el artículo y evita trasladar automáticamente cifras o secuencias históricas.

Huella de cuerpo y medios finales: `5d420f0c8e4714d07e52f8771d8cf00577b858a14be202df74424b0a98dde4e4`.

## Presentación y publicación

La copia aislada parte de `a9f18dd`, sin cambios locales ajenos. Pasan seis casos iniciales de ambos artículos aún excluidos y disponibilidad del botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: jerarquía, texto, equipos, vídeo, imagen, FAQ y fechas correctos, sin anuncios ni desbordamientos. Evidencia en `reports/indexing-review-2026-10-27/batch-twenty-seven/` y `release-batch-twenty-seven/`.

Falta comprobar las versiones finales y su publicación. Solo se proponen estas dos URLs con su versión exacta, manteniendo las demás exclusiones y la configuración de anuncios.

## Validación final local

Pasan 708 pruebas unitarias y lint tras corregir la etiqueta del fixture para usar `brawl`, que es la etiqueta real conservada de la fila pública. El control de versión exacta había rechazado correctamente la etiqueta incorrecta del fixture; no se relaja la comprobación ni se cambia la fila de origen. Pasan ocho casos finales de ambos artículos, catálogo/sitemap y filtros y seis de regresión sobre Illari y el modo de revisión de anuncios. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía final; las composiciones conservan el contenido cuya presentación se inspeccionó en ambos tamaños. Se verifican todos los párrafos, FAQ, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de desbordamientos y anuncios.

## Resultado público

Vercel confirma el commit `9e0decd` en [este despliegue de producción](https://vercel.com/masiajavs-projects/peakform/Fhh2orAaiGmYEJX1sDDTTp7cF6eS). Pasan las 70 respuestas HTTP y la redirección del alias: ambas URLs responden 200, sin noindex, incluidas en sitemap, con fechas correctas y sin anuncios. Los 64 artículos anteriores y cuatro controles conservan su estado. Pasan cuatro casos adicionales de navegador contra producción en móvil y escritorio. El registro conserva respuesta, huella, fecha, commit y despliegue por URL: **66 de 140 artículos habilitados y verificados; 74 pendientes**.
