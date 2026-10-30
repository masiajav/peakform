# Revisión individual de Emre: guía, counter y composiciones

Revisión del 30 de octubre de 2026 por Codex. Se retoma la lectura completa registrada en [la revisión preliminar](indexing-review-emre-preliminary-2026-10-30.md), se revalida cada modelo contra el inventario y se completan las fuentes de las interacciones propuestas. El vídeo es nativo de la URL de la guía: no existe un alias adicional que deba aprobarse.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/emre-guia-video-overwatch` | Ráfagas, Take Aim, Siphon con salida, Cyber Frag, Altered Vitals, Override, VOD, tres FAQ y enlaces. | Contexto del vídeo de marzo, condiciones y alternativas de los cuatro perks y distinción del rebote base frente a adhesión. Conserva publicación del 6 de mayo; revisión del texto el 30 de octubre. | `c05c7ab7b36ac4edb363cd02b4a65aaf1ee5e006aedff96aef34ffeebd9e578b` |
| `/counters/emre` | D.Va, Genji, Ana y Sigma: peligro, señal y respuesta; cuatro ventanas, adaptaciones por rol y 6v6, errores, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados tras contrastar defensas, anticuración, impactos, adhesión y ralentización opcional. No se inventa primera publicación. | `665c98c1a893c90c1f516124133db834582e3f960ef8da60f1df5c21e12dc1a7` |
| `/team-comps/emre` | Sigma/Genji/Baptiste/Brigitte, Ramattra/Mei/Lúcio/Kiriko y Reinhardt/D.Va/Ashe/Baptiste/Lúcio en 6v6. Todos los argumentos, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados. Roles y formatos coherentes, con seguimiento y recursos compartidos sin convertir la recuperación personal en invulnerabilidad. | `c2a844ba90dcdbcde434dc2b7e7f37321021509427fbfb197b05aefb7a249677` |

## Exactitud y fuentes

Se descarga y lee la [ficha oficial de Emre](https://overwatch.blizzard.com/en-gb/heroes/emre/), junto con su [presentación oficial](https://overwatch.blizzard.com/en-us/news/24246206/) y las [notas de mayo de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/). La presentación confirma el arma temporal explosiva con robo de vida, movimiento y salto, y los dos tipos de ataque de Override. Las notas posteriores reducen la conversión de curación de Siphon; se evita trasladar la supervivencia del vídeo de marzo a la versión actual.

Enhanced Agility exige no estar disparando; Suppressive Security afecta a los disparos ligeros de Override. Heat Sink exige impactos directos y modifica calor/duración; Cyber Adhesion cambia el rebote por contacto y añade daño al enemigo adherido. La guía aplica cada alternativa a cobertura, seguimiento y retirada, sin sumar ambas mejoras de un nivel ni prometer duración infinita.

Se leen también las habilidades de las fichas oficiales de [D.Va](https://overwatch.blizzard.com/en-gb/heroes/dva/), [Genji](https://overwatch.blizzard.com/en-gb/heroes/genji/), [Ana](https://overwatch.blizzard.com/en-gb/heroes/ana/) y [Sigma](https://overwatch.blizzard.com/en-gb/heroes/sigma/). Matrix, Deflect y Grasp son defensas dirigidas frente a proyectiles, no garantías frente a toda explosión lateral; Grenade impide curación y Sleep exige seguimiento acordado. El counter ya expresa esas condiciones y las composiciones no presuponen que Siphon reemplace a los supports.

## Vídeo y versión

El [vídeo de Awkward](https://www.youtube.com/watch?v=AtlaU2S8ci8) y oEmbed responden 200, playability `OK`, título exacto «How To Carry on Emre», fecha 4 de marzo de 2026 y pista original inglesa `en-US.4`. Se lee la descripción completa, sin capítulos. No se afirma haber visto íntegros sus 1604 segundos. Título y fecha almacenados correctos; se conserva su identidad y se añade contexto visible anterior a los ajustes de Siphon.

Huella del cuerpo y medios finales: `ca7bcf9b7002a2396cb38e3bba78ccacee6b8ffe9e044bb4bdc91f3bcf55ceac`.

## Presentación y publicación

La copia aislada parte de `a0d6aac`, sin cambios locales ajenos. Pasan ocho casos iniciales de las tres páginas aún excluidas y reproductor en móvil/escritorio. Se inspeccionan las capturas completas en ambos tamaños y sus cabeceras móviles: jerarquía, texto, equipos, imagen, FAQ, fechas y vídeo correctos, sin anuncios ni desbordamientos. La fuente y modelos se revalidan antes de editar. Evidencia en `reports/indexing-review-2026-10-27/batch-thirty-six/` y `release-batch-thirty-six/`.

## Validación final local

Pasan 708 pruebas unitarias y lint, doce casos finales de las tres páginas, catálogos/sitemap y filtros, y seis de regresión sobre Pharah y el modo de revisión de anuncios. Se inspeccionan las capturas completa de escritorio y móvil y cabecera móvil de la guía corregida. Counter y composiciones mantienen el texto cuya presentación se inspeccionó inicialmente en ambos tamaños.

Las comprobaciones finales cubren todos los párrafos y argumentos, FAQ y respuestas estructuradas, enlaces, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, metadatos, sitemap y ausencia de anuncios y desbordamientos. Las demás exclusiones y la configuración de anuncios se mantienen.

## Resultado público

Despliegue correcto del commit `2610764d33f4cec547f8826717add69161a427dc`. Pasan 89 respuestas HTTP: las tres páginas de Emre, las 82 anteriores y cuatro controles excluidos. Se comprueba además la redirección 308 del alias de Pharah como regresión; Emre no tiene alias adicional. Las tres URLs son indexables, están en el sitemap, conservan fechas y medios revisados y no ejecutan anuncios. Pasan seis casos de navegador contra producción en móvil y escritorio. Total acumulado: **85 habilitados y verificados, 55 pendientes**.
