# Revision individual de la ficha de Kiriko

Estado: texto contrastado, reescrito y leido en navegador interno. QA manual,
suite completa y rastreo cerrados.

## Contenido y alcance

Solo `/heroes/kiriko`: decisiones de ofudas, kunais, Suzu, teleport, Rush,
Wall Climb, perks, amenazas y composiciones. Ejemplos distintos de Garden en
Lijiang y las alturas de Dorado; errores, ejercicios de VOD, seis FAQ y cierre
propios. No se simula experiencia personal ni se promete subir de rango.
Autor y publisher Replaid Lab, fechas visibles y enlace de correcciones.
Publicacion 2026-06-26, primer commit `4dd7ca4` del sprint original;
revision real 2026-10-03. Comprobar enlaces no aprueba sus textos.

## Contraste del kit

Consulta de fichas oficiales indexadas el 2026-10-03:
- https://overwatch.blizzard.com/en-gb/heroes/kiriko/?mobile-app=true&theme=false%29
- https://overwatch.blizzard.com/es-es/heroes/kiriko/
- https://overwatch.blizzard.com/fr-fr/heroes/kiriko/
- https://news.blizzard.com/en-us/article/23841483/let-the-kitsune-guide-you-a-first-look-at-kiriko-s-concept-and-playstyle
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2024/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2023/8/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/

Suzu limpia Sleep y anti, pero no un derribo ya aplicado como Earthshatter.
Rush incluye recuperacion de cooldowns. Teleport requiere aliado, aunque
atraviese paredes. Se incluye Wall Climb y la curacion de Suzu, sin cifras
de duracion, alcance, dano o sanacion tomadas de parches antiguos.

Urgent Care y Fortune Teller son alternativas Minor; Ready Step y Foxtrot
son alternativas Major. No se traslada el segundo teleport de un kit antiguo
a Ready Step ni los poderes de Stadium al kit normal. Las fichas indexadas
y un parche anterior difieren sobre un efecto adicional de Foxtrot: se
describe el aumento de movimiento coincidente, sin dar porcentaje o duracion.
Las aperturas directas de algunas paginas oficiales devolvieron 403. El
contraste usa contenido oficial indexado, no una prueba in-game ni una
afirmacion de haber comprobado todos los cambios del ultimo parche.

## Lectura y QA manual

- Texto renderizado completo leido en el navegador interno. Segunda lectura
  tras corregir una frase interna sobre Shatter y explicar mejor la salida
  frente a dive. Sin bloques publicos de fuentes o estrategia SEO.
- Las seis FAQ se abrieron y leyeron; seis respuestas en FAQPage coincidentes.
- Trece destinos internos distintos HTTP 200, incluidos Lijiang y Dorado.
- Navegacion real Habilidades -> guia ranked -> atras: recupera Kiriko,
  su H1 y el hash, tambien en movil.
- Escritorio 1440x900 y movil 390x844: cabecera, habilidades y perks legibles,
  sin overflow horizontal, imagen cargada, un H1, sin errores de consola.
- Axe 4.12.1 limitado a main: 0 violations, 22 passes, 0 incomplete.
  Esto no certifica todo el sitio ni todas las necesidades de accesibilidad.
- Componente de servidor compartido; se agrega solo un cierre opcional,
  sin nuevos hooks, tablas, variables ni cambios en pagos.

Version revisada:
`1d63e6d82c7f277decb9df7c09ccf1bc09b7b2228f6871b7fc9a0ff02dea5904`.
La ficha solo conserva indexacion con intencion y revision de esa version.
No se renueva aprobacion por slug, longitud o un build correcto. Sin anuncios.

## Verificacion final

Lint, 297 unitarios y build aislado correctos. TypeScript sin emitir y diff
check correctos. Prueba focalizada de Ana y Kiriko: cuatro recorridos pasan
en desktop/movil, archivados en
`reports/verification-hero-kiriko-2026-10-03-focused`.
La primera ejecucion focalizada se detuvo por un error sintactico al ampliar
el archivo de tests; no ejecuto casos ni certifico nada. Se reescribio el test,
se comprobo TypeScript y se repitio la ejecucion conservando FAQ, enlaces,
metadata, sitemap y el recorrido de volver atras, sin quitar assertions.

Rastreo final de este build:
`reports/adsense-local-2026-10-03-hero-kiriko-final.json`.
330 URLs, todas HTTP 200; 159 rutas del manifiesto cubiertas y cola agotada.
95 URLs en sitemap, 96 respuestas indexables (incluidas variantes canonical),
234 noindex. Diferencia frente al lote final de Ana: solo vuelve Kiriko al
sitemap. No se crean ni borran rutas. Kiriko tiene 3311 palabras medidas por
el inventario y ningun aviso; esto no es un umbral de calidad de Google.
Los dos avisos heurísticos restantes son /counters (408) y /news (496).
No justifican relleno ni aprueban por si mismos el resto de textos.

Preview aislado:
`.next-editorial-built-preview/hero-kiriko-final-2026-10-03`.
Imagen, canonical, un H1, robots explicito index/follow y ausencia de anuncios
comprobados de nuevo en navegador interno sobre el build final.
`npm.cmd run verify` final: lint, 297 unitarios, build de produccion aislado
y 684 Playwright desktop/movil correctos, sin retries (8.1 minutos E2E).
Informes y capturas finales:
`reports/verification-hero-kiriko-2026-10-03`.
Las capturas de cabecera desktop/movil se inspeccionaron; habilidades y perks
se revisaron tambien en navegador interno. El hash de Ana no cambia y el de
Kiriko coincide con el registro. Sin push, deploy ni solicitud a AdSense.

El servidor local registra StripeAuthenticationError al consultar cuentas
conectadas, igual que en el lote previo. No se cambian pagos ni se certifican
compras reales por pasar pruebas publicas y controles de acceso anonimo.
No se certifican produccion, CMP, compras autenticadas ni aprobacion de Google.
