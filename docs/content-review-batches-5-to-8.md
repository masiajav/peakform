# Revision editorial: lotes quinto a octavo

Revision realizada el 1 de octubre de 2026. El objetivo de preparar todo el
sitio para AdSense sigue activo; este documento registra un avance, no una
certificacion de calidad global ni una aprobacion de Google.

## Guias completadas en este tramo

Trece articulos propios reemplazan las fichas breves de Symmetra, Hazard,
Freja, Wuyang, Sierra, Domina, Mizuki, Jetpack Cat, Anran, Vendetta, Roadhog,
Sombra y Emre. El conjunto de ocho lotes contiene 42 guias revisadas.

Cada texto trata habilidades y decisiones del heroe concreto, rutas o
situaciones de mapa, errores de ranked, revision de VOD y FAQ propias. Se
conservan las rutas, ID, fecha original y video con atribucion a su canal.
El texto pertenece a Replaid Lab, no al autor del video. No se ha inventado
experiencia personal ni resultados de partidas.

Sombra y Roadhog distinguen expresamente el kit disponible el 1 de octubre
de los reworks anunciados para Season 5 el 6 de octubre. No se presentan
los anuncios futuros como cambios ya aplicados.

Las 42 guias siguen accesibles, noindex y sin anuncios durante la revision
global. No entran en sitemap solo por haberse ampliado.

Se han revisado tambien las guias generales de DPS y Support, con ejemplos
de seleccion de objetivo, off-angles, timing, prioridades de curacion,
peel, ultimates y revision de VOD. Conservan rutas y fechas originales;
el conjunto de revisiones contiene ahora 44 articulos. Las dos guias de
rol ya eran noindex y permanecen asi.

## Correcciones descubiertas al verificar

Una primera version de Symmetra enlazaba a Hanamura, sin pagina publicada
y fuera de los ejemplos apropiados para ranked. Playwright detecto el 404
en ambos formatos. Se sustituyo por un caso de Lijiang Tower y enlaces
existentes. Una prueba unitaria comprueba ahora todos los enlaces de mapa
de las revisiones contra el inventario publicado.

D.Mon seguia mezclando disponibilidad con frases de prelanzamiento y
comentarios sobre busquedas y hubs. Su ficha explica ahora el kit actual,
la diferencia entre piloto y mech, barrera, combustible, Limit Break,
altura y seguimiento. Conserva su publicacion original; revision visible,
schema y sitemap reflejan el 1 de octubre.

Las composiciones de D.Mon y Doomfist ya no rellenan todos los estilos con
el nombre del Tank. Se han escrito planes distintos con tres propuestas
por pagina, funciones del equipo, rutas, sustituciones con sus limites,
ejemplos, FAQ y enlaces pertinentes. Permanecen noindex y sin anuncios;
no se ha ampliado la lista de paginas aprobadas ni creado rutas nuevas.

La revision visual detecto poco contraste en textos secundarios y fechas
de las paginas pilar. Los colores secundarios se aclaran solo dentro de
.seo-pillar-page, sin modificar colores de dashboard o administracion.
Playwright comprueba contraste de introduccion, fechas y enlaces.

El mismo ajuste se aplica al detalle de guias. No se reserva una columna
vacia cuando no se puede servir el anuncio lateral. Hay un unico main,
contenido centrado y anchura de lectura estable en escritorio y movil.

Los enlaces de cierre de 36 guias se separan de la FAQ con un encabezado
visible. El schema ya no incorpora lecturas relacionadas en la ultima
respuesta. Se conservan guiones como el de anti-heal en el texto del schema.
Las pruebas comparan todas las preguntas y respuestas con el texto visible.
Las tarjetas de guias ranked usan el titulo y resumen del articulo real,
no las antiguas descripciones de la base de datos.

El selector general de composiciones deja de insertar cualquier heroe en
los seis estilos. Solo ofrece ejemplos cuando el heroe figura en el pool
del estilo para su rol. No presenta Anran como DPS aereo. Los filtros sin
ejemplos muestran una respuesta clara y un enlace a la guia, sin inventar
otra combinacion. Los dos formatos conservan numero de jugadores, roles
y ausencia de heroes repetidos. Esto corrige recomendaciones incompatibles,
pero no convierte las fichas restantes en analisis propios completos.

## Publicacion de patch notes

Se ha cerrado un fallo de validacion: antes, PATCH solo comprobaba calidad
cuando la peticion incluia published=true. Una edicion de una entrada ya
publicada podia saltar el control. POST tampoco aplicaba ese control.

Ahora ambos endpoints validan cualquier resultado que vaya a permanecer
publicado. Siguen permitiendo guardar borradores y ocultar entradas
incompletas. Cambiar una patch note publicada a noticia requiere ocultarla
primero; la autorizacion de administrador permanece intacta.

Se valida enlace HTTPS a las patch notes oficiales, fecha interpretable,
titulo, autor, extracto, metadatos, secciones distintas, enlaces visibles,
etiqueta de revision y ausencia de marcadores, repeticion o relleno. La
elegibilidad de indexacion usa el mismo control y rechaza published=false.
Esto sigue siendo necesario pero no suficiente para calidad editorial:
no comprueba por si solo la veracidad o utilidad del analisis.

El editor permite completar autor, enlace y fecha oficiales. Los errores
de guardar muestran las carencias concretas. El panel de calidad consulta
los campos necesarios. No se han publicado ni editado registros reales
de la base de datos, ni cambiado tablas, cron, pagos o pedidos.

## Evidencia y limites

- Un primer npm run verify termino con lint, 163 tests unitarios, build y
  274 pruebas Playwright superadas para las 42 guias y las rutas existentes.
- Las primeras cuatro pruebas nuevas de composiciones fallaron porque
  el lector de JSON-LD no contemplaba arrays. Se corrigio la lectura, no
  se retiro la comprobacion de Article, autor, fecha ni FAQ.
- El control final npm run verify supera lint, 170 tests unitarios, build
  de 194 rutas y 286 pruebas Playwright de escritorio y movil.
- La primera comprobacion nueva de FAQ/colores encontro dos supuestos
  incorrectos del test: Ashe tiene dos FAQ reales, y CSS minificado escribe
  #999 en lugar de #999999. Se verifican las preguntas efectivas y colores
  computados, no el formato de serializacion. No se quito la comprobacion
  de respuestas ni la de legibilidad.
- reports/adsense-local-2026-10-01-compositions.json rastrea las 247 URLs
  de la linea base. Hay 105 rutas en sitemap, 106 respuestas indexables y
  141 noindex. La pertenencia al sitemap no cambia frente a la linea base.
- La auditoria baja de 16 avisos del lote anterior a 2. Son avisos de
  longitud en /news y /counters, no infracciones demostradas de Google.
  No se ha rellenado un directorio solo para alcanzar 500 palabras.
- La clasificacion automatica aun senala 78 respuestas genericas. Es una
  pista para continuar, no un certificado de revision ni una medida de
  todo el valor del sitio.
- Navegador interno: Emre en escritorio, Sombra en movil, D.Mon en
  escritorio y Doomfist en movil. No se han observado pantallas blancas,
  solapes o errores de JavaScript en esas comprobaciones.
- El rastreo del preview dev encontro un 500 en metodologia con un error
  de runtime de React. La pagina pasaba en el build de produccion. Se
  sustituyo el preview dev por una copia independiente del build verificado
  en .next-editorial-built-preview. No se modifico React ni la pagina para
  esconder el error.
- reports/adsense-local-2026-10-01-built-final.json repite el rastreo de las
  247 rutas sobre ese build: todas responden 200, solo quedan los dos avisos
  de longitud de hubs y no hay cambios de pertenencia al sitemap.
- El preview sigue en http://127.0.0.1:3012, ahora con next start. Un build
  posterior no modifica sus artefactos. Para mostrar nuevas ediciones hay
  que refrescar expresamente esa copia; ya no depende de HMR.

## Siguiente trabajo real

Revisar individualmente los counters y las composiciones que aun muestran
plantilla, las fichas de heroes pendientes y la frescura del resto de
noticias y temporadas. El selector ya no fuerza estilos incompatibles,
pero sus ejemplos limitados no sustituyen a una pagina editorial completa.

Completar un registro explicito de aprobacion editorial antes de permitir
anuncios; las heuristicas y los slugs por si solos no prueban calidad.
Noindex o retirar enlaces no equivale a mejorar una pagina publica.

Siguen sin confirmarse titular y domicilio profesional para el aviso
legal, algunos detalles de conservacion y operativa contractual. No se
han deducido datos privados ni inventado informacion. Falta configurar y
verificar una CMP certificada antes de publicidad en Europa.

No se ha realizado push, desplegado, solicitado revision de AdSense,
activado anuncios ni probado compras reales. Las pruebas no certifican
el funcionamiento financiero en produccion. Tras publicar cambios
autorizados, faltara auditar produccion y comprobar rastreo e indexacion.

## Referencias internas de comprobacion

Se consultaron paginas oficiales de habilidades de los trece heroes y
el anuncio oficial de Season 5. Las recomendaciones de posicionamiento
y composiciones son analisis editorial, no resultados de pruebas propias.

- https://overwatch.blizzard.com/en-us/heroes/emre/
- https://news.blizzard.com/en-us/article/24246206/overwatch-spotlight-the-reign-of-talon-begins
- https://overwatch.blizzard.com/en-us/heroes/dmon/
- https://overwatch.blizzard.com/en-gb/news/24294376/
- https://support.google.com/adsense/answer/12176698?hl=en
- https://support.google.com/adsense/answer/7299563?hl=en-EN
- https://support.google.com/adsense/answer/13554116?hl=en

Estas referencias no se convierten en bloques artificiales de fuentes
dentro de las guias de jugadores.
