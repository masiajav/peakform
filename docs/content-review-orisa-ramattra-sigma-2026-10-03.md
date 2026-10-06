# Orisa, Ramattra y Sigma: revision individual de counters

3 de octubre de 2026. Autor publico: Replaid Lab. Los ejemplos son situaciones
hipoteticas de ranked, no experiencia personal atribuida. No se cambian pagos,
marketplace ni rutas publicas.

## Revision de contenido

Orisa: presion a su ayuda durante Fortify, Zarya frente a Spin sin ignorar
la reduccion de dano, Wall para aislar y Matrix contra Javelin. Sleep no
corta Fortify ni la carga de Terra Surge. Protective Barrier sustituye Spin;
los perks son elecciones opcionales, no cuatro mejoras simultaneas.

Ramattra: retirada preparada antes de Nemesis, Pummel atraviesa barreras,
Block frontal y respuesta a Vortex. Sleep se usa para separar o coordinar
dano, no para asegurar que Annihilation termine. Hay excepciones de overtime
y responsabilidad de tocar. Ejemplos propios en Shambali, Lijiang y Midtown.

Sigma: segundo angulo, altura con seguimiento, contacto con Nemesis y Wall
para aislar. Hook no se absorbe con Grasp, pero lo bloquea Barrier. Hyper
Regeneration requiere dano a heroes, no a otra barrera. Flux levanta antes
de estrellar; no se mezcla con el efecto del modo Community Crafted.

Referencias primarias consultadas para contrastar mecanicas:

- https://overwatch.blizzard.com/en-us/heroes/orisa/
- https://overwatch.blizzard.com/en-us/heroes/ramattra/
- https://overwatch.blizzard.com/en-gb/heroes/sigma/?blzcmp=app
- https://overwatch.blizzard.com/en-us/news/23875436/
- https://overwatch.blizzard.com/en-us/news/23798984/legend-of-talon-and-hero-of-numbani-doomfist-and-orisa-s-tank-overhauls/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2024/10/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2019/10/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/

Algunas aperturas oficiales devolvieron 403; se leyo el texto oficial indexado.
Se separaron cambios de ranked de Stadium, April Fools y Community Crafted.
No se inventan porcentajes, cooldowns, pruebas personales ni cambios nuevos.
La reversion de octubre de 2024 conserva la penetracion de Pummel. El cambio
de abril de 2026 limita Hyper Regeneration al dano contra heroes.

## Comprobacion previa al registro

Lectura completa de las tres paginas renderizadas en navegador interno.
Revision de escritorio 1440x900 y movil 390x844: fondo oscuro, retratos
cargados, H1 sin corte, FAQ desplegables, sin overflow ni errores de consola
observados. Se simplifico la respuesta de Ana ante Annihilation y el consejo
sobre Flux; relectura de ambos tras el segundo build. Las guias relacionadas
se abrieron con navegacion real, incluida la redireccion de la guia de Sigma.
Los 25 enlaces internos distintos de las tres paginas responden HTTP 200.

Build previo al registro: `Jw5VkEkvcxjnSx605r-YK` en
`.next-editorial-built-preview/tank-counters-review2-2026-10-03`.
Robots noindex, follow durante la revision; un H1, canonical propio,
Article, BreadcrumbList y FAQPage validos y fecha real de revision.
No se inventa datePublished y no aparecen anuncios ni placeholders.

Versiones obtenidas con inspector de solo lectura y registradas manualmente:

- Orisa: `9f05b9e0ed2fdfe6361ed1d7d9c9f108438accec1eb85cd2450bdb5dd804b74d`.
- Ramattra: `ef8e1592337b5955df426fd6fc0b5b8e732d5fc6337050d78b5f5dc167abacd6`.
- Sigma: `b60342b78111ba05a4c8d91a502d8cc861d4de58c212a953b7b1bbfce5574657`.

Solo esas versiones recuperan index_no_ads. La revision no certifica otras
paginas ni la aprobacion de Google.

## Verificacion final

`npm.cmd run verify` completo: lint sin errores, 266 pruebas unitarias,
build y 562 E2E correctas en escritorio y Pixel 7, sin retries (7,1 minutos).
TypeScript sin emit y diff check correctos. Informe, capturas y estado passed
guardados en `reports/verification-orisa-ramattra-sigma-2026-10-03`.
Inspeccion adicional de capturas de primer viewport en movil y escritorio,
y de una captura completa de Ramattra para revisar la distribucion general.

Build final `UQcCz0hfOA2YucE9SyZFZ`, servido en 3012 desde
`.next-editorial-built-preview/tank-counters-final-2026-10-03` sin compartir
artefactos con desarrollo o el servidor de Playwright. Gut-check de navegador
CLI sin errores. Relectura final en navegador interno: las tres rutas usan
index, follow, canonical propio y no muestran publicidad. Navegacion real
desde el catalogo a Orisa. El catalogo contiene 22 enlaces y el ItemList
coincide con ellos en las pruebas de escritorio y movil. El inspector de
solo lectura vuelve a devolver los tres hashes registrados.

Rastreo final: `reports/adsense-local-2026-10-03-tank-counters-final.json`.
330 respuestas HTTP 200; 91 URLs en sitemap; 92 respuestas indexables
(incluidas variantes canonicalizadas), 238 noindex; 159 rutas del manifiesto
cubiertas y cola agotada. No hay pares por encima del umbral comparativo.
Persisten dos avisos de extension en /news y /counters y 16 fichas genericas.
El XML incluye las tres nuevas revisiones con lastmod de 3 de octubre;
las pruebas contrastan la fecha y la mantienen separada de datePublished.
No se rellena un hub para satisfacer un umbral automatico de palabras.

No se activan anuncios, no se solicita revision y no se publica un deploy.
No se realizan compras ni transacciones reales. El rastreo de perfiles
anonimos sigue registrando StripeAuthenticationError en el servidor local;
la configuracion de cobros exige comprobacion separada, no esta certificada
por las pruebas editoriales. Las paginas restantes necesitan revision
individual y siguen pendientes los datos autorizados de titular/domicilio,
el CMP certificado y la verificacion del despliegue y Search Console.
