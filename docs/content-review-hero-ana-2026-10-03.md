# Revision individual de la ficha de Ana

Estado: reescrita, leida y revisada en navegador; revision individual de
contenido registrada. Suite final completa y rastreo cerrados.

## Alcance

- Solo `/heroes/ana` recibe la nueva redaccion y presentacion en este lote.
- Kit, posicion, scope, Sleep, granada, Nano, perks, amenazas, composiciones,
  ejemplos de Gibraltar y King's Row, errores, VOD y FAQ con decisiones propias.
- Sin experiencia personal inventada, cifras de balance no verificadas ni
  promesas de rango. Los ejemplos son situaciones para razonar, no partidas
  afirmadas como jugadas por el autor.
- Autor y publisher: Replaid Lab. Enlace visible para comunicar errores.
- Publicacion 2026-06-26: primer commit de las fichas Ana/Kiriko/Genji,
  `4dd7ca4`, consultado con git log. Revision real: 2026-10-03.
- No se aprueban los textos de las paginas enlazadas por comprobar su enlace.

## Contraste de habilidades

Ficha oficial consultada el 2026-10-03:
`https://overwatch.blizzard.com/en-us/heroes/ana/?mobile-app=true&theme=false`.
Rifle, Sleep, granada y Nano contrastados con la descripcion oficial.
Groggy y Speed Serum son Minor; Biotic Bounce y Headhunter son Major.
Headhunter aplica a enemigos, no a curas. No se mezclan poderes de Stadium.
Las variantes regionales indexadas discrepaban en el porcentaje de Speed
Serum: no se afirma una cifra ni una verificacion del ultimo parche completo.
La respuesta directa de otra variante oficial fue 403; se deja esta limitacion.

Deflect contrastado con la ficha oficial de Genji:
`https://overwatch.blizzard.com/en-gb/heroes/genji/`.
La aplicacion al dardo de Sleep sigue la mecanica de desviar proyectiles;
no se afirma prueba in-game de este lote.

## Control de publicacion

Las fichas de heroe requieren intencion de publicacion y revision individual
de la version exacta, ademas de contenido, fechas y estructura completos.
Un slug conocido ya no constituye aprobacion. Las fichas pendientes siguen
accesibles y enlazadas, noindex/follow, sin anuncios y fuera del sitemap.
La lista de rutas publicas no cambia. El HTML y el sitemap utilizan el mismo
control. Esto no convierte una pagina noindex en contenido apto para AdSense.

## Lectura y verificacion manual

- Texto completo leido en el navegador interno en el segundo build. Se
  corrigieron las frases abstractas detectadas en el primero; no se dio por
  revisado el contenido solo por leer el modelo o medir su extension.
- Las cinco FAQ se abrieron y leyeron; mismas respuestas en FAQPage.
- 13 destinos internos distintos: HTTP 200. Navegacion real a la guia ranked.
- Escritorio 1440x900 y movil 390x844: cabecera, perks y habilidades legibles,
  imagen cargada, un H1, sin overflow horizontal ni errores de consola.
- Texto principal #b3b3b3 sobre #0a0a0a; anclas tactiles de 44px. No certifica
  por si mismo el contraste de todos los elementos del sitio.
- La primera comprobacion de back en navegador interno cambio URL sin restaurar
  la vista. Una ida/vuelta sin ancla en Chromium funcionaba, pero Playwright
  reprodujo el fallo al pasar por Habilidades antes de abrir la guia ranked.
  Se sustituyeron las cinco anclas nativas por Link de Next.js. Recorrido exacto
  comprobado despues en navegador interno y Playwright desktop/movil: vuelve
  a Ana con su H1 correcto y el hash de la seccion. No se omite esta prueba.
- Plantilla Server Component, sin hooks/estado nuevo ni efectos sobre pagos.
  Secciones sin tarjetas anidadas, fechas desde el modelo y JSON-LD coincidente.

Version registrada despues de lectura y QA:
`84ad06a22431d2eea78d1b61a987c0651bf65d2f337fc5b0927995480ba07628`.

## Verificacion final

Primera pasada completa: lint, 293 unit y build correctos; 680 E2E correctos
y cuatro fallos. Ana permitia indexacion por defecto pero no emitia robots
explicito; se corrige su metadata. La prueba de actualidad esperaba aun la
ficha pendiente de Doctrine en sitemap; se cambia a comprobar su exclusion,
manteniendo el anuncio y el archivo BlizzCon. Evidencia del diagnostico en
`reports/verification-hero-ana-2026-10-03-diagnostic`.

Segunda pasada completa: 682 E2E correctos y dos fallos de navegacion atras,
en ambos viewports. Evidencia en
`reports/verification-hero-ana-2026-10-03-back-diagnostic`.
Prueba focalizada tras corregir las anclas: dos tests correctos, archivados en
`reports/verification-hero-ana-2026-10-03-back-fix`.
Una ejecucion intermedia se interrumpio antes de arrancar Playwright; no se
cuenta como verificacion completa ni se atribuye a un fallo editorial.

Ejecucion final de `npm.cmd run verify`: lint, 293 unitarios, build de
produccion aislado y 684 E2E correctos, cero reintentos (8.0 minutos E2E).
Informes finales: `reports/verification-hero-ana-2026-10-03`.
TypeScript sin emitir y diff check correctos; hash editorial sin cambios.
Capturas desktop/movil inspeccionadas, imagen cargada, FAQ/schema coincidentes,
enlaces y regreso a la ficha comprobados. Axe 4.12.1 sobre main de Ana:
cero violations, 22 passes, cero incomplete; no certifica otras paginas.

Rastreo final: `reports/adsense-local-2026-10-03-hero-ana-navigation-final.json`.
330 URLs, todas HTTP 200; 159 rutas del manifiesto cubiertas; cola agotada.
94 URLs en sitemap, 95 respuestas permiten indexacion (incluidas variantes
canonical), 235 noindex. Ana mantiene su URL en sitemap con lastmod real
2026-10-03. Las once fichas sin revision exacta salen solo del sitemap y siguen
accesibles y enlazadas. No se elimina contenido ni se considera esta exclusion
una solucion suficiente para AdSense.
Dos avisos heurísticos de extension en /news y /counters; no justifican relleno.

Preview aislado:
`.next-editorial-built-preview/hero-ana-navigation-final-2026-10-03`.
URL local: `http://127.0.0.1:3012/heroes/ana`.
Sin push, despliegue, activacion de anuncios ni solicitud de revision.

No se certifican compras autenticadas, Stripe, CMP real, produccion ni una
aprobacion futura de Google con este lote.
