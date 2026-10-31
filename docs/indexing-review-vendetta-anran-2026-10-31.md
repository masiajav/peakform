# Revisión individual de Vendetta y composiciones de Anran

Revisión por Codex el 31 de octubre de 2026. Se revalidan los modelos contra el inventario, se leen los tres artículos por separado y se contrastan sus decisiones con fuentes primarias. El vídeo de Vendetta es nativo de la guía, sin alias adicional. La guía de Anran y ambos counters ya eran indexables y no reciben otra aprobación.

| URL | Lectura y utilidad | Correcciones y fechas | Versión revisada |
| --- | --- | --- | --- |
| `/guides/vendetta-guia-video-overwatch` | Aproximación cubierta, combo de Palatine Fang, guardia y energía compartida, aterrizaje de Soaring Slice, Dash, elección de perks, Sundering, VOD, tres FAQ y enlaces. | Título real y contexto promocional del vídeo anterior al lanzamiento; aplicación de las cuatro alternativas actuales de perks. Primera publicación del 6 de mayo conservada; revisión del texto el 31 de octubre. | `501ce0dc6c7bc9fa714594c3506686227e38159fc86c7525a14c3caad9c66afe` |
| `/team-comps/vendetta` | Reinhardt/Cassidy/Lúcio/Kiriko, Zarya/Ashe/Baptiste/Kiriko y Winston/D.Va/Tracer/Ana/Brigitte en 6v6. Se leen todos los argumentos, sustituciones, responsabilidades, rotación, debilidades, ejemplos, checklist, tres FAQ y enlaces. | Texto y fecha del 2 de octubre conservados. Guardia frontal individual, energía compartida, atención dividida, seguimiento de rango y destino con salida coherentes. No se inventa primera publicación. | `e4ee3551980d1f836d98be9ca870a54286f3787d66d3b4d6ab0b4eec5326b728` |
| `/team-comps/anran` | Queen/Cassidy/Lúcio/Kiriko, Winston/Tracer/Ana/Brigitte y Reinhardt/D.Va/Mei/Baptiste/Lúcio en 6v6. Se leen todos los campos de los equipos y las demás secciones, FAQ y enlaces. | Texto y fecha del 2 de octubre conservados. Dancing Blaze evita daño y cura de base; se prepara ayuda al terminar, sin prometer seguimiento ni Revival útil en toda muerte. No se inventa primera publicación. | `da736c18b831e02429a3dbef66103f193a3a82040243fa9f9d7f240aa3663eef` |

## Exactitud y fuentes

La [ficha oficial de Vendetta](https://overwatch.blizzard.com/en-gb/heroes/vendetta/) confirma combo con golpe descendente, protección frontal y devolución de melee, energía consumida al bloquear y con Projected Edge, movilidad y ultimate que atraviesa la mayoría de defensas. La guía evita presentar la guardia como barrera colectiva o Sundering como garantía universal.

Se explican Extra Edge y Raging Storm como alternativas minor, y Siphoning Strike y Relentless como alternativas major. Reducir el coste no elimina el consumo defensivo; prolongar los giros exige mantener el contacto; el robo de vida corresponde al golpe descendente; tres acumulaciones adicionales de Onslaught no justifican perseguir sin ayuda. No se inventan condiciones de generación del pasivo que la ficha no detalla.

Las [notas del 10 de marzo de 2026](https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/03/) cambiaron Raging Storm a minor y Siphoning Strike a major. Las [notas del 16 de junio](https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/) modifican Onslaught y coste de ultimate. Se leen los encabezados: las modificaciones del 30 de junio son Community Crafted y los poderes de Stadium no se trasladan a ranked. El tráiler de 2025 no representa automáticamente esos ajustes posteriores.

La [ficha oficial de Anran](https://overwatch.blizzard.com/en-gb/heroes/anran/) confirma quemaduras, Fan the Flames sobre enemigos ya ardiendo, Dancing Blaze que evita daño y cura por enemigo, movilidad y elección ofensiva o Revival después de morir. Las composiciones ya distinguen curación base de mejoras opcionales y mantienen visión, cobertura y ayuda al terminar. Roles y formatos de los seis equipos son coherentes. No se necesitan cambios en esos dos textos.

## Vídeo y versión exacta

El [vídeo oficial de PlayOverwatch](https://www.youtube.com/watch?v=c3guhZL477Q) y oEmbed responden 200, playability `OK`, título real «Vendetta | New Hero Gameplay Trailer | Overwatch 2», fecha 20 de noviembre de 2025 y 119 segundos. Se lee la descripción completa, con prueba de noviembre y estreno de diciembre anunciados. Hay subtítulos ingleses manuales y automáticos; no se identifica una pista con nombre de audio original. No se afirma haber visto íntegro el vídeo. La corrección del título solo acepta el valor antiguo conocido y la identidad revisada; cambios imprevistos invalidan la aprobación.

Huella del cuerpo y medios finales de la guía: `4451584269475b6b6cc2a95c18e1bf58879e387a6dd4dae0083d3372a16bc19a`.

## Presentación y comprobaciones

La copia aislada parte de `50216f4`, con archivos propios explícitos y sin cambios locales ajenos. Pasan ocho casos iniciales de las tres páginas y reproductor en móvil/escritorio. Se inspeccionan las capturas completas de escritorio y las cabeceras móviles de cada página: jerarquía, texto, fechas, imágenes y equipos legibles, sin anuncios ni desbordamientos. El marco negro del reproductor en la captura completa se contrasta con su comprobación específica de iframe y botón de reproducción.

Evidencia en `reports/indexing-review-2026-10-27/batch-thirty-nine/` y `release-batch-thirty-nine/`.

## Validación final local

Pasan 708 pruebas unitarias y lint. Pasan seis casos finales de la guía, catálogo de composiciones/sitemap y filtros, más cuatro casos específicos de las dos composiciones, todos en móvil y escritorio. La selección inicial del comando no incluyó esos cuatro casos; se completan después con la misma construcción verificada y su propio registro, sin contarlos antes de ejecutarlos. Las regresiones añaden cuatro casos de Mizuki y dos del modo de revisión de anuncios. Se inspeccionan la guía corregida completa en escritorio y móvil y su cabecera móvil, además de las composiciones completas en ambos tamaños. Fechas, texto, jerarquía y distribución correctos, sin desbordamientos.

Las comprobaciones cubren los párrafos y argumentos completos, equipos, FAQ y respuestas estructuradas, enlaces internos, imágenes, fechas, identidad e idioma del vídeo y botón de reproducción, canonical, robots y sitemap.

## Publicación comprobada

El commit `b19c5fc644f896f3233b4b631b216eef293a7672` tiene [despliegue Vercel correcto](https://vercel.com/masiajavs-projects/peakform/EAn3PPt3LZgtUjwjP5iTyo4WHwDS). Pasan 97 comprobaciones HTTP y la redirección previa de Pharah, más seis casos de navegador contra producción. Las tres URLs responden 200, conservan canonical y fechas, están en sitemap y permiten indexación. Los 90 artículos anteriores y los cuatro controles conservan su estado. Total: 93 de 140 habilitados y verificados, con 47 pendientes de revisión. No quedan composiciones pendientes del inventario inicial. Las demás exclusiones y la configuración de anuncios se mantienen.
