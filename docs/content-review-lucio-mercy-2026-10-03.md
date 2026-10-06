# Lucio y Mercy: revision de counters

3 de octubre de 2026. Autor publico: Replaid Lab. Ejemplos hipoteticos,
sin atribuir experiencia personal. Se mantienen rutas, marketplace y pagos.

## Contenido y contraste

Lucio: destino del rush, retirada compartida, aislamiento con Wall, boops,
responsabilidad de peel y decisiones ante Beat segun el estado del objetivo.
Mercy: segundo angulo contra pocket, llegada de Guardian Angel, Flash Heal,
control de cuerpos y respuesta al casteo de Resurrect, incluso en Valkyrie.

Referencias primarias consultadas:

- https://overwatch.blizzard.com/en-gb/heroes/lucio/
- https://overwatch.blizzard.com/en-us/heroes/mercy/
- https://overwatch.blizzard.com/en-us/heroes/mei/
- https://overwatch.blizzard.com/en-us/heroes/cassidy/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/04/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2017/11/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2018/1/

Las aperturas directas de algunas paginas oficiales devolvieron 403. Se leyo
el texto oficial indexado, distinguiendo las secciones del juego normal de
Stadium, April Fools y Community Crafted. No se incorporan poderes de esos
modos ni tiempos de cooldown o porcentajes de balance innecesarios.

Flash Heal es baseline desde abril de 2026; Double Dose modifica cargas.
Winged Reach sustituye al antiguo Divine Momentum. Chain Boost y Double Dose
son alternativas. Beat Drop de ranked mantiene Amp durante Sound Barrier;
no es la explosion de Stadium. Sound Barrier da exceso de salud temporal,
no una barrera ni una limpieza. Los perks se presentan como opcionales.
Valkyrie dejo de hacer instantaneo Resurrect en enero de 2018. La recomendacion
de Sleep se aplica a Mercy durante el casteo, nunca al cuerpo ni despues.

## Estado de verificacion

Lectura completa de las dos paginas renderizadas y relectura tras simplificar
la explicacion de Beat, una recomendacion de Sleep y dos frases del resumen
de Mercy. El navegador interno comprobo escritorio 1440x900 y movil 390x844,
retratos cargados, fondo oscuro, ausencia de overflow y errores de consola,
FAQ desplegables y navegacion real a la guia de cada heroe. Las secciones de
cooldowns se comprobaron tambien visualmente en escritorio. Las diecinueve
rutas y filtros internos comprobados respondieron HTTP 200.

Un H1 por pagina, canonical propio, fecha real y Article/BreadcrumbList/FAQPage
validos. El build de revision `Sb6AaiY02EYnFURPFFhSQ` permanece aislado en
`.next-editorial-built-preview/lucio-mercy-review2-2026-10-03`; ambas paginas
eran noindex durante la revision, antes del registro.

Inspector de contenido de solo lectura, versiones comprobadas:

- Lucio: `2d5cbe9be488ac6f94f100c9e9b135b88f1e3f0fbe3358ca9e60c1a1f0a145e9`.
- Mercy: `59ce49e3e4b0d6662f0993e63c6a1270fc1fc13695ca155ece1cda47ab5b2bcd`.

Registro individual de esas dos versiones con intencion index_no_ads.
No certifica otras paginas ni una aceptacion de Google.

Build final aislado: `W8ajpREtuv_VjEj0H9Iwc`, servido en 3012 desde
`.next-editorial-built-preview/lucio-mercy-final-2026-10-03`. Comprobacion
posterior al registro en el navegador interno: robots index, follow,
canonical propio, un H1, retratos cargados, Article/BreadcrumbList/FAQPage
con fecha de revision real, ninguna publicidad ni overflow. Navegacion
real desde el catalogo hacia Lucio. El catalogo contiene 19 enlaces,
incluyendo ambas rutas, y el ItemList se contrasta en E2E.

Rastreo final: `reports/adsense-local-2026-10-03-lucio-mercy-final.json`.
330 respuestas HTTP 200; 88 URLs en sitemap; 89 respuestas indexables
incluidas variantes canonicalizadas; 241 noindex; 159 rutas del manifiesto
cubiertas y cola agotada. Quedan 5 avisos: similitud en Orisa, Ramattra y
Sigma, y extension de /news y /counters. Las dos nuevas versiones no tienen
avisos; no equivale a certificar el sitio. Quedan 19 fichas genericas.

Lint, 263 unitarios, build, TypeScript y diff check correctos. Primera
ejecucion E2E: 542 pasaron y dos fallaron porque el test nuevo esperaba
`L\u00facio`, mientras el directorio conserva "Lucio" sin acento.
Se ajusto exclusivamente esa expectativa al nombre existente; no se
relajaron controles de enlaces, imagenes, schema o publicidad. Informe
inicial conservado en `reports/verification-lucio-mercy-2026-10-03-initial`.
Reejecucion completa: 544 E2E correctas en escritorio y Pixel 7, sin retries.
Informe final, capturas y estado passed conservados en
`reports/verification-lucio-mercy-2026-10-03`.
Inspeccion visual de capturas completas y de primer viewport; no se
aprecian solapes de texto ni retratos rotos. El XML final incluye ambas
rutas con lastmod `2026-10-03T00:00:00.000Z`, no una fecha renovada por build.
El inspector de solo lectura confirma los hashes registrados tras las pruebas.

No se activa publicidad ni se solicita revision a AdSense. No se han
realizado compras ni probado transacciones reales en Stripe.
