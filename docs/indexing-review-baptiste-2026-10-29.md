# Revisión individual de Baptiste: guía y composiciones

Revisión del 29 de octubre de 2026 por Codex. Se leen completos los dos artículos canónicos y se contrastan sus modelos con el inventario. La fuente de vídeo reside en el alias, cuya redirección se conserva. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/baptiste-guia-overwatch-lamp-window` | Línea de curación y daño, altura con salida, prioridades y trayectoria de granadas, Lamp protegida y seguimiento, distribución de Burst/Lamp, Boots con destino, Window con disparos y recursos, revisión de VOD, tres FAQ y enlaces. | Corrige el título conocido del vídeo, contextualiza su versión de 2022 y añade decisiones de los cuatro perks actuales. Conserva primera publicación del 5 de mayo y revisa el texto el 29 de octubre. | `9929a028aeba2ac0a229f9f8801953e3d8fe8dc18766e507a5bc2e76304b9d51` |
| `/team-comps/baptiste` | Equipos Sigma/Ashe/Sojourn/Zenyatta, Reinhardt/Mei/Cassidy/Lúcio y Sigma/D.Va/Ashe/Soldier/Brigitte en 6v6. Todos sus argumentos, responsabilidades, rotaciones, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, roles y formatos. No se inventa primera fecha de publicación. | `614db014ddc3f380e601b7a6929570da0e14309846f9422529cd0977c117e38f` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Baptiste](https://overwatch.blizzard.com/en-gb/heroes/baptiste/). Se confirman launcher de daño y granadas de curación, Burst, Lamp destructible, Matrix para proyectiles aliados de daño y curación y salto cargado de Exo Boots. La guía diferencia Expanded Field, que amplía el radio sin proteger el dispositivo, de Assault Burst, que aporta velocidad de ataque personal a Baptiste tras Burst. Los major son alternativas: Automated Healing complementa la recuperación mediante disparos periódicos de la torreta, mientras Rocket Boots permite un desplazamiento horizontal después de saltar con Exo Boots. No se presenta como parte de cualquier salto ni se promete activar curación saltando. Tampoco se aconseja gastar Lamp solo para provocar una cura adicional.

Las composiciones explican por qué Lamp no limpia anticuración ni sustituye cobertura, cómo recuperar al equipo después y cómo conservar visión para curar. Los ejemplos de King's Row, Circuit Royal y Dorado aplican esas limitaciones. Los cinco y seis integrantes corresponden a sus formatos; Soldier: 76 usa la identidad normalizada del catálogo ya corregida en otro lote. No se modifican otros artículos ni sus aprobaciones.

## Vídeo y versión

El [vídeo de LeonDrummer](https://www.youtube.com/watch?v=2QTnQGpyUVc) y oEmbed responden 200; playability es `OK`, título «Guía básica: Baptiste | Overwatch 2» y fecha 14 de octubre de 2022. Se leen descripción y metadatos; no hay capítulos. El reproductor identifica español original `es-US.4` como pista predeterminada e inglés como doblaje automático. No se afirma haber visto íntegros los 401 segundos. El contexto visible distingue el vídeo histórico de la comprobación escrita de perks actuales, sin trasladar automáticamente cifras ni secuencias. La corrección del título exige ID y título antiguo conocidos; cambios inesperados del vídeo invalidan la revisión.

Huella de cuerpo y medios finales: `8e115c0e51304e32670920969a2eb7e5d741f7ae261e19d5e747693b9d727eb2`.

## Presentación y publicación

La copia aislada parte de `ff66665`, sin cambios locales ajenos. Pasan seis casos iniciales de los dos artículos aún excluidos y disponibilidad del botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: estructura, contenido, equipos, imagen, fechas y jerarquía legibles, sin anuncios ni desbordamientos. El rectángulo negro del vídeo en la captura completa después de desplazarse no demuestra un fallo del reproductor; las comprobaciones del iframe y del botón de reproducción pasan en ambos tamaños.

Evidencia en `reports/indexing-review-2026-10-27/batch-twenty-five/` y `release-batch-twenty-five/`. Falta comprobar las versiones finales y su publicación. Solo se proponen estas dos URLs con sus huellas exactas; las demás exclusiones y la configuración de anuncios permanecen igual.

## Validación final local

Pasan 708 pruebas unitarias, lint, seis casos finales de ambos artículos y catálogo/sitemap y diez de regresión sobre Sombra, Anran, filtros por héroe y rol y el modo de revisión de anuncios. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía final; las composiciones conservan el texto cuya presentación se inspeccionó en ambos tamaños. Se verifican todos los párrafos, FAQ, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de anuncios y desbordamientos.

## Resultado público

Vercel confirma el commit `2bd2644` en [este despliegue de producción](https://vercel.com/masiajavs-projects/peakform/BzMfZKJV4dcTVNnxiWVoEz6oMfHW). Pasan las 66 respuestas HTTP y la redirección del alias: ambas URLs responden 200, sin noindex, incluidas en sitemap, con fechas correctas y sin anuncios. Los 60 artículos anteriores y cuatro controles conservan su estado. Pasan cuatro casos adicionales de navegador contra producción en móvil y escritorio. El registro conserva respuesta, huella, fecha, commit y despliegue por URL: **62 de 140 artículos habilitados y verificados; 78 pendientes**.
