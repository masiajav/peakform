# Revision individual de Cassidy - 4 de octubre de 2026

Ruta: /heroes/cassidy. Autor publico: Replaid Lab.
Version: aca4e74c5a3c654c1d4bba00c591c78c1b077ba22079fb3698fe7a042fa1375e.

## Lectura y comprobacion editorial

Leidos el modelo anterior y su articulo renderizado con sus cinco FAQ.
Reescrito individualmente en reviewed-hero-cassidy.ts; leido todo el main
del nuevo articulo y abiertas y leidas las seis FAQ en el navegador interno.
Despues se corrigieron el titulo de respuesta sobre Deadeye, una frase
sobre alcance de Flashbang y la descripcion de la posicion contra Winston.
Los tres cambios se volvieron a leer en la preview corregida.

Se mantienen publicacion de 26 de junio y revision real de 4 de octubre.
Ejemplos propios: hotel y estatua del primer punto de King's Row y puertas
y vagones de la estacion final de Midtown, contrastados con sus fichas.
Se sustituye la regla absoluta de no disparar al Tank y el rechazo de Roll
para recargar por decisiones segun defensa, municion, posicion y seguimiento.
Peel y Deadeye incluyen limites, errores y comprobaciones de replay concretas.
No se inventan partidas propias, tests dentro del juego ni subida garantizada.

Investigacion primaria registrada en content-research-hero-cassidy-2026-10-04.md.
La ficha oficial actual confirma primario/secundario, Roll con reduccion de
dano, Sharpshooter y las cuatro opciones Minor/Major. Notas oficiales
contrastan Hinder sin stun completo y sustitucion de Fan the Hammer.
No se importan reglas de Community Crafted o Stadium al kit normal.
Se retiro una afirmacion no certificada sobre perforacion de barreras.
No se presentan numeros de balance de parches antiguos como actuales.

## Navegacion y revision visual manual

Preview de build terminado y aislado en
.next-editorial-built-preview/hero-cassidy-corrected-2026-10-04, puerto 3012.
Inspeccionadas capturas de cabecera, habilidades y perks en escritorio
1440x900 y movil 390x844. Texto sin cortes ni solapes observados, fondo
oscuro, retrato cargado y sin overflow horizontal en ambos tamanos.
Click real a Habilidades, enlace a guia ranked y vuelta comprobada en movil;
en escritorio, anclas Habilidades y Perks y guia/vuelta tambien comprobadas.
Las 16 rutas internas unicas del main devuelven HTTP 200. Labels de counter
y composicion coinciden con el asunto de destino; esto no aprueba esos articulos.
No hay anuncios, placeholders, script de AdSense ni errores de consola observados.
Axe 4.12.1 limitado a main: 0 infracciones, 22 comprobaciones correctas,
0 pendientes. No equivale a una auditoria de accesibilidad de todo el sitio.

## Verificacion final

Registro manual de esta version tras lectura y QA. Suite completa, metadata
y sitemap del build posterior al registro cerrados abajo. Mantener sin
anuncios. Esta revision individual no declara el sitio listo para AdSense.

## Cierre del lote

Build final aislado en .next-editorial-built-preview/hero-cassidy-final-2026-10-04.
Comprobados en el navegador interno un solo H1, title y description propios,
canonical, index/follow, fechas y Article/BreadcrumbList/FAQPage validos.
Recorrido real /heroes -> Cassidy -> home correcto. Home: 58 imagenes,
sin imagenes cargadas fallidas, overflow, anuncios o errores de consola
observados; no certifica que toda imagen lazy fuera de pantalla haya cargado.
Inspeccionadas tambien capturas finales automatizadas desktop y movil.

npm.cmd run verify termina exit 0: lint, 317 unitarios en 29 archivos, build,
684 Playwright desktop/movil con dos workers y sin retries (10.0 min).
Los catorce casos de heroes revisados pasan dentro de la suite completa,
incluidos Cassidy desktop/movil con seis FAQ y recorridos ancla/guia/back.
TypeScript sin emitir ni incremental y git diff --check correctos.
last-run passed, failedTests vacio. Archivo de evidencia:
reports/verification-hero-cassidy-2026-10-04, con informe Playwright,
resultados, capturas y verify.log.

Rastreo reports/adsense-local-2026-10-04-hero-cassidy-final.json: 330 URLs
HTTP 200, 100 sitemap, 101 respuestas indexables incluidas variantes
canonical, 229 noindex. Todas las 159 rutas elegibles del manifiesto cubiertas,
cola agotada. Solo Cassidy se anade frente al lote Winston; nada se elimina.
Cassidy: 16 destinos internos, una imagen, tres schemas del articulo y
ningun aviso. Longitud y ausencia de similitudes automaticas no equivalen
a calidad ni a aprobacion de Google. Los dos avisos de hubs por menos de
500 palabras son heuristicas locales; no justifican anadir relleno.

No se cambian APIs, DB, pagos o configuracion de anuncios en este lote.
Los logs locales conservan StripeAuthenticationError con IDs redactados;
los tests de pago usan mocks y no certifican compras reales. Sin push,
deploy o solicitud de AdSense. Datos del titular, CMP certificado,
produccion y revision del resto del contenido siguen pendientes.
Tracer ya tiene lectura inicial e investigacion documentadas, no aprobacion.
