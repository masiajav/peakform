# Revision de los counters de Moira y Reaper

Fecha: 2 de octubre de 2026. El objetivo de preparar Replaid Lab para
AdSense sigue activo y no esta completado. No se ha hecho commit, push,
deploy, solicitud de revision o activacion de publicidad.

## Contenido y exactitud

Dos fichas genericas pasan a tener analisis propios. Moira se centra en
leer el destino de Fade, separar la presion que puede curar y responder
a Biotic Orb y Coalescence. Reaper se centra en detectar Shadow Step,
preparar el peel, esperar la salida de Wraith y escalonar defensas contra
Death Blossom. Cada una incluye cuatro matchups, adaptaciones sin cambiar
de heroe, ejemplos situacionales, checklist y tres FAQ.

Los perks se distinguen del kit base. No se trasladan poderes de Stadium
ni ajustes de Community Crafted al consejo de ranked. Matrix puede
interceptar el orbe de Moira, no sus beams. Fade puede utilizarse durante
Coalescence. Dire Triggers se presenta como habilidad normal de Reaper,
no como un perk. Suzu no cubre toda la canalizacion de Blossom.

Al leer el HTML se corrigio una frase que podia dar a entender que Fade
atraviesa paredes. La version final dice esconderse detras de una pared.
La prueba unitaria rechaza la frase anterior y las pruebas de navegador
comprueban todos los parrafos de cooldowns contra el modelo editorial.

Autor Replaid Lab; fecha de revision real y dateModified coincidentes.
No se inventa datePublished ni se afirma experiencia personal en partida.

Referencias oficiales consultadas mediante resultados indexados; no se
afirma una lectura directa completa de las paginas que no se abrieron:

- https://overwatch.blizzard.com/en-gb/heroes/moira/
- https://overwatch.blizzard.com/en-us/heroes/reaper/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2025/08/
- https://overwatch.blizzard.com/en-gb/news/21182078/
- https://overwatch.blizzard.com/ru-ru/news/patch-notes/live/2023/04/?mobile-app=true&theme=false

Estas referencias son notas internas, no bloques de fuentes publicados.

## Auditoria final

Informe: reports/adsense-local-2026-10-02-counter-fade-wraith-final-reviewed.json.

- 330 URLs publicas revisadas, todas HTTP 200.
- 99 URLs en sitemap; 100 indexables y 230 noindex.
- 159 rutas del manifest cubiertas, ninguna pendiente en esa cola.
- 19 avisos automaticos frente a 22 del lote anterior.
- 27 fichas genericas restantes: 26 counters y /roles/flex.
- Moira: 1728 palabras visibles; Reaper: 1715. Sin avisos automaticos
  en estas dos fichas. Ni longitud ni ausencia de avisos acreditan calidad.
- Comparacion con counter-peel-deployables-final: no cambia ninguna
  URL, respuesta HTTP, canonical, robots o pertenencia al sitemap. Solo
  Moira y Reaper cambian title, description y palabras visibles.

Ambas siguen noindex, follow, sin anuncios y fuera del sitemap. El registro
reviewedCounters contiene 17 revisiones, no 17 aprobaciones de indexacion.
La categoria automatica de 97 URLs que requieren revision editorial no
significa que se haya demostrado un defecto en todas ellas.

## Verificacion

Npm run verify completo: lint correcto, 239 pruebas unitarias, build de
verificacion y build de E2E correctos (193 paginas), 448 pruebas Playwright
desktop/mobile correctas en 6.2 minutos. Esa suite precede a la ultima
correccion de una frase de Moira.

Despues de esa correccion: nuevo build:verify correcto, 239 unitarias,
lint y TypeScript sin incremental correctos. Preview final aislada en
.next-editorial-built-preview/counter-fade-wraith-reviewed-2026-10-02.
Se ejecutan otras 64 pruebas sobre esa preview final: todos los counters
revisados y acceso privado, correctas en 55.6 segundos. La configuracion
temporal esta en reports/counter-fade-wraith-final.config.ts. No se
presenta esa comprobacion enfocada como una segunda suite completa.

Revision manual de ambas paginas en navegador interno, escritorio y
movil 390x844, incluida apertura de FAQ. Un H1, retratos cargados, sin
overflow, anuncios ni errores de consola observados. Se restaura el
viewport. Capturas finales en reports/reviewed-counters. Agent-browser
tambien verifica la preview y se cierra al terminar. Git diff --check
no registra errores de espacios; avisa de conversion LF/CRLF.

No se realizan pagos reales ni escrituras en la base de datos. Las pruebas
privadas verifican redireccion a login y rechazo de peticiones anonimas;
no certifican una compra autenticada en Stripe.

## Siguiente prioridad

Antes de otro lote de counters, reforzar las aprobaciones del contenido
estatico. Las guias y noticias dinamicas ya comprueban una revision
vinculada al contenido, pero los topics estaticos conservan listas de
slugs y comprobaciones de estructura/longitud. Algunas rutas estaticas
tambien figuran como elegibles para anuncios solo por su pathname.

Se necesita revision documentada de la version concreta, invalidacion
cuando cambie su contenido y elegibilidad publicitaria conservadora,
sin aprobar todo el inventario generando hashes de forma automatica.
Revisar los imports cliente/servidor antes de compartir el registro.

Quedan tambien los counters genericos, /roles/flex, revisiones individuales
de URLs indexables, identidad/direccion profesional legal aportadas por
el titular, CMP certificado y comprobacion en produccion/Search Console.
No solicitar todavia revision de AdSense ni prometer aprobacion.
