# Revision individual de la ficha de Reinhardt

Estado: texto reescrito, contrastado y leido en navegador interno. QA manual,
suite completa y rastreo final cerrados.

## Alcance

Solo /heroes/reinhardt: barrera, martillo, Charge, Fire Strike, Earthshatter,
perks, matchups, composiciones, errores y revision de VOD. Ejemplos hipoteticos
de calles en King's Row y primera recta de Circuit Royal. No se inventan
partidas, experiencia personal, cifras de balance ni resultados garantizados.
Autor/publisher Replaid Lab, publicacion original 2026-06-26 y revision real
2026-10-04. Fechas visibles y enlace para comunicar correcciones.

## Contraste y limites

Contenido oficial indexado consultado el 2026-10-04:
- https://overwatch.blizzard.com/es-es/heroes/reinhardt/
- https://overwatch.blizzard.com/en-gb/heroes/Reinhardt/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/05/
- https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/4/
- https://overwatch.blizzard.com/en-us/heroes/orisa/
- https://overwatch.blizzard.com/en-us/heroes/ramattra/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2024/10/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2024/06/

Las fichas actuales coinciden en Minor Crusader's Fire/Crusader's Resolve
y Major Shield Slam/Ignited Fury. Una nota de abril llama Minor a Shield
Slam al describir su binding; se priorizan las dos fichas actuales coincidentes.
No se afirma haber verificado esa discrepancia in-game. El control live de
2023 confirma cancelacion de Charge; no se copian valores numericos de beta.
Se distinguen poderes de Stadium de perks normales. Ramattra vuelve a
atravesar barreras con Pummel en la revision posterior de octubre de 2024,
no se usa la nota anterior de ese mes que habia retirado ese comportamiento.
Suzu no elimina el derribo de Earthshatter ya aplicado; si puede proteger
del dano posterior. No se afirma haber comprobado todo el ultimo parche.

Los consejos de recorrido, recursos, composicion y seguimiento son analisis
de situaciones hipoteticas, no sesiones de juego certificadas.

## Lectura y QA manual

- Lectura completa del main renderizado; seis FAQ abiertas y leidas.
- Escritorio 1440x900 y movil 390x844: cabecera, habilidades y perks
  inspeccionados, imagen cargada, un H1, sin overflow ni anuncios.
- Sin errores de consola en navegador interno y CLI.
- Dieciseis destinos internos distintos HTTP 200. Esto no aprueba sus textos.
- Habilidades -> guia ranked -> atras probado en escritorio y movil:
  recupera el H1 correcto y el hash de habilidades.
- Axe 4.12.1, solo main: 0 violations, 22 passes, 0 incomplete.
  No certifica la accesibilidad completa del sitio.
- Formato compartido existente; sin cambios de pagos, autenticacion,
  base de datos, variables de entorno ni nuevas rutas.

Version comprobada:
`88c5478b5b05d72f4625ae72260a07874c699fa5e1ae8264d3a89899baf88635`.
El registro solo habilita esta version, no cualquier texto del mismo slug.
Sin anuncios. Preview de lectura aislada:
`.next-editorial-built-preview/hero-reinhardt-draft-2026-10-04`.

## Pendiente separado

La guia ranked enlazada conserva una pregunta sobre que puede "limpiar"
Earthshatter, ambigua tras el cambio de Suzu. Debe corregirse en su revision
individual; no recibe aprobacion por responder HTTP 200. No se certifican
produccion, CMP, compras reales ni aceptacion de Google.

## Rastreo del build final

Preview .next-editorial-built-preview/hero-reinhardt-final-2026-10-04.
Canonical, un H1, fechas, schema y robots explicito index/follow comprobados
otra vez en navegador interno. Acceso real desde /heroes y vuelta a la home
correctos; no hay overflow ni errores de consola ni anuncios. Hay 58 imagenes
en main de la home, sin imagenes cargadas fallidas; las imagenes lazy fuera
de pantalla no se certifican solo por contarlas.

reports/adsense-local-2026-10-04-hero-reinhardt-final.json: 330 URLs HTTP 200,
97 URLs en sitemap, 98 respuestas indexables (incluidas variantes canonical),
232 noindex. Cubiertas 159 rutas del manifiesto, cola agotada. La unica
diferencia de sitemap frente al lote final de Genji es /heroes/reinhardt;
ninguna URL eliminada. Dos avisos heurísticos de extension de hubs /news
y /counters no representan un minimo de palabras de Google ni justifican
relleno. Ningun par supera el umbral de similitud, lo que no aprueba los
textos pendientes. Reinhardt mide 3316 palabras, 16 enlaces y una imagen,
sin avisos; la aprobacion se basa en lectura y QA, no en esa longitud.

305 unitarios, TypeScript sin emitir y diff check correctos. Ocho recorridos
focalizados de Ana, Kiriko, Genji y Reinhardt pasan en escritorio/movil;
informes en reports/verification-hero-reinhardt-2026-10-04-focused.
Suite completa npm.cmd run verify correcta: lint, 305 unitarios, build de
produccion aislado y 684 Playwright escritorio/movil, sin retries (8.6 minutos
E2E). Informes finales en reports/verification-hero-reinhardt-2026-10-04;
last-run passed, failedTests vacio. Capturas de cabecera desktop/movil
inspeccionadas; habilidades y perks tambien comprobados en navegador interno.
Los hashes de Ana, Kiriko y Genji no cambian. No hay push, deploy ni solicitud
a AdSense. La consulta local a Stripe conserva StripeAuthenticationError con
identificadores redactados; no se cambian credenciales ni se certifican pagos
reales autenticados. Las pruebas privadas cubren acceso anonimo y las pruebas
unitarias de pagos usan mocks.
