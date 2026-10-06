# Revision individual: Venture, Vendetta y Anran

Fecha: 2026-10-03. Revisor: Codex. Autoria publica: Replaid Lab.

## Alcance

- `/counters/venture`: seguir Burrow, preparar peel al salir, distinguir escudos personales y movilidad, responder a las ondas. Cassidy, Brigitte, Ana y Pharah.
- `/counters/vendetta`: evitar el combo cercano, vigilar Soaring Slice, abrir un tiro distinto al bloqueo frontal y separar la llegada de sus supports. Pharah, Ashe, Mei y Ana.
- `/counters/anran`: esperar Dancing Blaze, ayudar contra el burn durante la retirada, distinguir limpieza y proteccion, comprobar la reaparicion sin perder el objetivo. Kiriko, Cassidy, Ashe y Lucio.

Se conservan rutas y funcionalidades. Ejemplos hipoteticos propios, sin atribuir partidas o experiencia personal a Ivajpro. No se ha probado el kit dentro del juego ni se prometen picks que garanticen una victoria.

## Contraste

Las aperturas directas de fichas devolvieron 403; se contrasto el contenido oficial indexado, no se presenta la apertura como exitosa.

- `https://overwatch.blizzard.com/en-gb/heroes/venture/`: invulnerabilidad subterranea y Dash con cooldown acelerado; opciones minor Deep Burrow/Excavation Exhilaration y major SMART Extender/Covered In Dirt.
- `https://overwatch.blizzard.com/en-us/news/24069290/`: Clobber, escudos personales de Explorer's Resolve y ondas con empuje, no knockdown de Earthshatter. Se usa el anuncio para estas mecanicas, no para numeros de balance actuales.
- `https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2025/08/`: sustitucion de perks antiguos. No se atribuyen Seismic Sense o SMART-R Excavator al kit actual.
- `https://overwatch.blizzard.com/en-us/heroes/vendetta/`: bloqueo frontal, desvio melee y energia; Projected Edge, salto, giro, combo y ultimate; minor Extra Edge/Raging Storm, major Siphoning Strike/Relentless. No se reutiliza el reparto de perks del anuncio original.
- `https://overwatch.blizzard.com/heroes/anran`: burn, invulnerabilidad y curacion de Dancing Blaze, Rush, dos formas de ultimate; minor Smoulder/Heat Shield, major Short Fuse/Hungering Blaze.
- `https://overwatch.blizzard.com/en-gb/heroes/kiriko/`: proteccion breve y limpieza de Suzu, Swift Step a un aliado. No se confunde una limpieza con prevencion permanente del burn.
- `https://overwatch.blizzard.com/en-gb/heroes/cassidy/`: Flashbang y Roll, sin granada magnetica ni poderes de Stadium en ranked.

Los consejos de posiciones y seguimiento son analisis propio condicionado a mapa, ayudas y recursos. No se publican breakpoints de dano, duraciones exactas o interacciones de barreras no recertificadas.

## Lectura y QA antes de registrar

- Build `GFyt2zyGd_5LiplmjjGeP`, aislado en `.next-editorial-built-preview/venture-vendetta-anran-review2-2026-10-03`, puerto 3012.
- Lectura completa de las tres fichas renderizadas; FAQs abiertas y respuestas leidas. Guia relacionada abierta por click y H1 correcto para cada heroe.
- Escritorio 1440x900 y movil 390x844; cabeceras, tarjetas y ejemplos comprobados. Sin overflow horizontal, retratos rotos o errores de consola observados.
- Un H1, title/description propios, canonical y schema coherentes; autor Replaid Lab y fecha real sin inventar fecha de publicacion.
- 21 destinos internos comprobados HTTP 200. Filtros de heroes sin pagina pilar siguen llevando al catalogo correspondiente.
- La lectura detecto frases forzadas de Vendetta y Anran. Se corrigieron y reconstruyeron; las partes cambiadas se releyeron en la nueva version antes del registro.
- Noindex y ausencia de anuncios antes de registrar. No se aprueba por longitud ni por pertenecer a una lista.

## Versiones autorizadas

- Venture: `824c3bed89467932eb0c4bc9d5e14eb6678f72b0b7a25784b3b006367a1c2625`.
- Vendetta: `2bd37278866ff90817bfcfc108d673c801dbee46480f97feae7f87a1574b1fd8`.
- Anran: `479561f3ec4ceef746bbd7a445044b7482dfad630e1f48bfad32b928ee436c65`.

Registro manual de la version concreta. Una edicion invalida la aprobacion hasta nueva revision. Indexacion permitida; anuncios no permitidos.

## Verificacion final

- `npm.cmd run verify` cerrado con exit 0: lint, 278 pruebas unitarias, build y 634 E2E correctos (8.2 minutos), sin retries. TypeScript y diff check correctos.
- Build final `97Nk9Gm1h5LQwM_o12eO3`, preservado en `.next-editorial-built-preview/venture-vendetta-anran-final-2026-10-03`.
- Comprobacion final en navegador interno del hub y sus tres enlaces: un H1, `index, follow`, sin anuncios ni errores de consola observados; 34 enlaces visibles en el catalogo.
- Rastreo cerrado: 330 URLs HTTP 200, 103 URLs en sitemap, 104 respuestas indexables con variantes canonical y 226 noindex. Cuatro fichas siguen clasificadas como genericas. Los dos avisos de extension en hubs no justifican relleno.
- Evidencia preservada en `reports/verification-venture-vendetta-anran-2026-10-03`; inventario en `reports/adsense-local-2026-10-03-venture-vendetta-anran-final.json`.
- No se han ejecutado compras. La consulta local a Stripe presenta errores de autenticacion; las pruebas de acceso anonimo no certifican pagos reales.
- No se ha hecho push, deploy ni solicitud de AdSense.

El objetivo global sigue activo: este lote no certifica heroes, mapas, guias o composiciones pendientes, ni identidad legal, CMP, pagos reales o estado del sitio desplegado.
