# Revisión individual de Illari: guía y composiciones

Revisión del 29 de octubre de 2026 por Codex. Se leen completos los dos artículos canónicos y se comparan sus modelos con el inventario antes de editar. La guía incorpora el vídeo desde su alias, cuya redirección se conserva. El counter ya era indexable y no recibe otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/illari-guia-overwatch-pilon-dano` | Pylon según la disputa, accesos enemigos, cambio de prioridades al perderlo, disparo cargado y energía del beam, destino de Outburst, seguimiento y respuestas a Captive Sun, VOD, tres FAQ y enlaces. | Añade decisiones de los cuatro perks y contexto del vídeo de 2025; distingue el título de su serie de cualquier garantía de resultados. Conserva publicación del 5 de mayo y revisa el texto el 29 de octubre. | `bbe35151ba7d1f5b0b88b09333d58585fd7c0c7cfc555693a067dd381d9dc8e8` |
| `/team-comps/illari` | Sigma/Ashe/Sojourn/Baptiste, Orisa/Cassidy/Mei/Kiriko y Sigma/D.Va/Ashe/Cassidy/Baptiste en 6v6. Todos los argumentos, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar kit, roles y formatos. No se inventa primera publicación. | `fe7da4bb17a1d3a9fcf8771b35822e0de36a858a682129e117b145b1aaeb8bd9` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Illari](https://overwatch.blizzard.com/en-gb/heroes/illari/): rifle de carga automática, beam con energía, pilón, movimiento de Outburst y marcas de Captive Sun que necesitan recibir daño para explotar. La curación y la movilidad no eximen de conservar alcance, cobertura y una retirada. Las composiciones reservan ayuda durante el cambio de esquina y separan las dos amenazas de 6v6 sin prometer que Pylon pueda curar peleas lejanas.

Los minor actuales son Rapid Construction, que acelera construcción y reduce cooldown, y Summer Solstice, que aumenta velocidad de ataque y vuelo y duración de vuelo durante la ultimate. Los major son Solar Flare para curación frontal al usar el beam y Sunburn para quemadura de Outburst. La guía convierte esos efectos en decisiones de posición y ayuda; no cuenta ambos major a la vez, no promete una baja inmediata con la quemadura ni vuelve seguro un pilón expuesto por instalarlo más rápido. La FAQ de composiciones ya distingue los major de efectos base y se conserva.

## Vídeo y versión

El [vídeo de ChoseN](https://www.youtube.com/watch?v=fS1XT6P3XJM) y oEmbed responden 200, playability `OK`, título «Educational Unranked To GM Illari Only (100% Winrate)» y fecha 11 de octubre de 2025. Se lee la descripción, sin capítulos, y se comprueban subtítulos automáticos ingleses. No se detectan pistas de audio con nombre original y no se afirma ese dato. Tampoco se afirma haber visto íntegros los 10347 segundos. El contexto visible explica su antigüedad respecto de los perks contrastados y que el porcentaje pertenece al título de la serie, sin garantizar resultados propios. El cuerpo y los medios finales quedan vinculados a `cc0ce7a338273fae6bb857037bbdc63467595e78319a54468e76c7061c10b5cd`.

## Presentación y publicación

La copia aislada parte de `2bd2644`, sin cambios locales ajenos. Pasan seis casos iniciales de los artículos aún excluidos y disponibilidad del botón de reproducción en móvil y escritorio. Se inspeccionan las dos capturas completas de escritorio y las dos cabeceras móviles: jerarquía, texto, equipos, vídeo, imagen, FAQ y fechas correctos, sin desbordamientos ni anuncios.

Evidencia en `reports/indexing-review-2026-10-27/batch-twenty-six/` y `release-batch-twenty-six/`. Falta comprobar las versiones finales y la publicación. Solo se proponen estas dos URLs con revisión de sus huellas exactas, manteniendo las demás exclusiones y la configuración de anuncios.

## Validación final local

Pasan 708 pruebas unitarias, lint, ocho casos finales de ambos artículos, catálogo/sitemap y filtros y seis de regresión sobre Baptiste y el modo de revisión de anuncios. Se inspeccionan la captura completa de escritorio y cabecera móvil de la guía final; las composiciones conservan el contenido cuya presentación ya se inspeccionó en ambos tamaños. Se verifican todos los párrafos, FAQ, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de desbordamientos y anuncios.

## Resultado público

Vercel confirma el commit `a9f18dd` en [este despliegue de producción](https://vercel.com/masiajavs-projects/peakform/87QGoCzGyfxjvHSPeoGRTkLqiRgA). Pasan las 68 respuestas HTTP y la redirección del alias: ambas URLs responden 200, sin noindex, incluidas en sitemap, con fechas correctas y sin anuncios. Los 62 artículos anteriores y cuatro controles conservan su estado. Pasan cuatro casos adicionales de navegador contra producción en móvil y escritorio. El registro conserva respuesta, huella, fecha, commit y despliegue por URL: **64 de 140 artículos habilitados y verificados; 76 pendientes**.
