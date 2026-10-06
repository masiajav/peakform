# Revision individual de Shion - 4 de octubre de 2026

Ruta: /heroes/shion. Autor publico: Replaid Lab.
Version: 839b7a91df36b2a37a1decf8530fa3619ca1263ce0e87309d87337c2a2e0d56c.

## Lectura y revision

Leidos completos el codigo editorial anterior, el main renderizado y las
ocho FAQ antiguas. Reescrito individualmente el modelo; leido completo el
nuevo main y abiertas y leidas sus ocho FAQ. Corregidas frases de redaccion
interna, duplicacion DPS en el kicker y explicacion de Faces of Death;
releidos los bloques corregidos en el build posterior. Se mantiene fecha
original 15 de junio, URL, retrato, video e informacion de origen Hashimoto.

Distinciones: Evade es overhealth breve, no invulnerabilidad ni cleanse
general; Execution tiene aim, dispersion y recuperacion distintos de su
cooldown; la moto puede acertar sin que Shion termine en cobertura. Distraccion
sin seguimiento no se llama automaticamente valor. Ejemplos de la transicion
captura/escolta en Neon Junction y rotacion alrededor del robot en Esperanca,
sin rutas geometricas ni packs inventados. Composiciones y respuesta al peel
con decisiones, no una lista que prometa counters infalibles.

Kit/perks contrastados en pagina oficial. Balance separado por fechas: 25
de junio, 14 de julio, 11 de agosto. Opinion original conservada como lectura
del parche inicial, sin experiencia personal falsa ni estadisticas de rango.
Sombra DPS se separa del rework Support anunciado para Season 5, contrastado
en https://overwatch.blizzard.com/en-gb/news/24294376/.
Investigacion y limitaciones en content-research-hero-shion-2026-10-04.md.

YouTube oEmbed verifica video/titulo/creador. Se corrige titulo ingles y
etiqueta EN no contrastada; el bloque muestra Ivajpro como creador del video,
no como autor del articulo. Retirado VideoObject con uploadDate no verificado;
iframe nocookie y enlace externo conservados. Reproductor con miniatura y
controles observado; no se declara haber visto su contenido o probado juego.

## QA manual

Build corregido aislado en .next-editorial-built-preview/hero-shion-qa-2026-10-04,
puerto 3012. Capturas de cabecera, habilidades, perks, balance y video
inspeccionadas en desktop 1440x900 y movil 390x844. Retrato y miniatura
cargados; sin cortes, solapes ni overflow observados. Al redimensionar, el
iframe tardo en actualizar su contenido; medicion del marco y screenshot
posterior confirman ajuste correcto, no se hizo una correccion CSS artificial.

Click real al ancla Habilidades, guia de cooldowns y vuelta al ancla probado
en ambos tamanos. Dieciocho enlaces internos unicos del main HTTP 200. No
se certifica su contenido por ello. Cero errores de consola, anuncios,
placeholders o script AdSense observados. Axe 4.12.1: WCAG 2 A/AA en main,
0 infracciones, 16 passes, 0 pendientes. El audit completo devuelve dos
avisos best-practice de H1/main en el documento de YouTube lazy vacio;
no son fallos del H1/main de nuestra pagina ni se presentan como audit
global limpio. No se certifica accesibilidad del proveedor externo.

React: campos opcionales no cambian los heroes restantes; renderer sigue
en servidor, sin hooks nuevos ni fetch de video en render. Se reutiliza
GuideVideo existente y aspect ratio; titulo iframe accesible, fechas visibles
y FAQ acordes con Article/BreadcrumbList. No cambios de pagos, auth o DB.

## Verificacion final

Registro manual despues de lectura y QA de esta version exacta. Build final
aislado en .next-editorial-built-preview/hero-shion-final-2026-10-04. Metadata
comprobada en navegador: un H1, title/description propios, canonical correcto,
index/follow, fechas visibles y Article acordes, ocho FAQ. Click desde tarjeta
del directorio de heroes a Shion comprobado; conservar URL y navegacion.

Lint, 329 tests unitarios (32 archivos), build, TypeScript y diff check
correctos. 684 Playwright desktop/movil correctos, sin retries, 11.8 min;
incluyen 20 casos de heroes revisados y los pendientes. Capturas finales de
ambos tamanos inspeccionadas. Informes archivados en
reports/verification-hero-shion-2026-10-04 y captura de cabecera en
reports/hero-shion-final-viewport.png.

Rastreo reports/adsense-local-2026-10-04-hero-shion-final.json: 330 URLs,
103 sitemap, 104 respuestas indexables incluidas variantes canonical,
226 noindex, 159 rutas del manifiesto cubiertas, sin rutas restantes. Solo
/heroes/shion se incorpora frente al lote Zarya; ninguna URL eliminada.
Persisten los dos avisos de extension de hubs /news y /counters; no se
introduce relleno para pasar un umbral ni se toma el rastreo como aprobacion.
Sin anuncios. Sitio completo aun no listo: revision de otras paginas,
datos legales autorizados, CMP real, produccion, Search Console y checkout
real pendientes. Sin push/deploy ni solicitud a Google.
