# Revision de counters e inventario completo

Fecha: 2 de octubre de 2026. El objetivo de preparar el sitio para AdSense
sigue activo. Este lote no certifica la calidad de toda la web ni la
aprobacion de Google.

## Inventario ampliado

El rastreo anterior dependia del sitemap, enlaces e inventario inicial.
No alcanzaba varias rutas publicas generadas por el build. El auditor
ahora acepta AUDIT_BUILD_MANIFEST con el prerender-manifest.json de Next
y recorre sus rutas HTML, sin incluir API, dashboard u otras areas privadas.
No se publica el manifiesto ni sus claves de preview en los informes.

Se mantienen las rutas historicas aunque ya no esten enlazadas. El informe
expone rutas pendientes cuando llega al limite, y advierte que las rutas
dinamicas no prerenderizadas necesitan enlaces o inventario adicional.
No es una prueba de cobertura total de la base de datos.

Los filtros de heroes/guias/expertos se distinguen de los articulos. Un
filtro breve no se rellena para superar un minimo de palabras. Se conserva
su comprobacion tecnica y queda pendiente su revision funcional. Los
perfiles reales tambien se distinguen del analisis editorial. El auditor
no etiqueta automaticamente ninguna pagina como terminada.

- reports/adsense-local-2026-10-02-full-build-inventory.json: 330 URLs,
  frente a las 247 del inventario anterior; 159 rutas del build.
- 105 URLs en sitemap, 106 respuestas indexables y 224 noindex.
- Las 330 respuestas son HTTP 200. No quedan rutas en la cola de este
  inventario; eso no acredita rutas dinamicas que nunca se hayan descubierto.
- La ampliacion revela similitudes reales, principalmente entre fichas
  genericas de composiciones, que el rastreo anterior no podia comparar.
- El aviso antiguo de 78 paginas genericas mezclaba filtros y perfiles
  con articulos. No debe interpretarse como 78 articulos pendientes.

## Contenido trabajado

Se sustituyen las fichas genericas de /counters/dmon y /counters/doomfist
por dos articulos individuales. Incluyen respuesta inicial, cuatro opciones
de matchup con senal y respuesta, ventanas de recursos, adaptacion por rol,
errores, situaciones de mapas, checklist, FAQ y enlaces relacionados.
No hay estadisticas inventadas, winrates ni experiencia personal atribuida.
No se han promocionado al sitemap: ambos siguen noindex y sin anuncios.

Se corrige el punto de vista en las tarjetas existentes de Shion, Tracer,
Zarya y Domina. Antes algunas respuestas explicaban como el objetivo debia
evitar al counter, pese a estar en una guia para jugar contra ese objetivo.
Ahora indican que hacer con el pick recomendado. Se elimina en Ana la
accion imposible de despertar a un aliado con dano de su propio equipo.

Los counters editoriales usan su titulo y descripcion propios en el head
y Article, en lugar de la descripcion automatica del registro de heroes.
Se eliminan tres consejos de cabecera generados e intercambiables que
duplicaban el resumen especifico de cada articulo.

Las cinco correcciones conservan su fecha de publicacion original en
Article y reciben fecha real de revision. El sitemap lee schemaDate del
counter cuando existe, sin cambiar la pertenencia de ninguna URL.
La fecha de revision de lenguaje no implica un nuevo balance comprobado:
el campo de parche sigue indicando el contexto que realmente fue revisado.

## Comprobacion

Las pruebas nuevas cubren contenido distinto, enlaces de mapas validos,
policy sin anuncios, metadatos propios, FAQ visibles que coinciden con
schema, fechas, robots efectivos en meta y cabecera HTTP, imagen cargada,
ausencia de overflow y errores de JavaScript, y pertenencia al sitemap.

Las primeras diez pruebas de los counters existentes exigian una etiqueta
literal index, follow. Next omite esa etiqueta cuando se permite indexar
por defecto. Se corrigio la comprobacion para detectar noindex, nofollow
o none efectivos, conservando la comprobacion de sitemap y fecha.
Otro selector de prueba buscaba Ana en todo el texto de las tarjetas,
por lo que tambien coincidia con una mencion dentro de Cassidy. Ahora
selecciona la tarjeta por su heading exacto, sin retirar la comprobacion
de cada respuesta.

El navegador interno confirma D.Mon en escritorio y Doomfist en movil,
con FAQ abierta, imagen correcta, fondo oscuro y sin errores observados.
No se han probado cobros reales ni publicado registros de base de datos.

El primer lote termina con npm run verify correcto: lint, 174 pruebas
unitarias, build de comprobacion, build aislado de navegador y 300 pruebas
Playwright en escritorio y movil. Los builds generan 194 rutas. Esto no
certifica la revision manual de todas las URLs ni operaciones de cobro.

El preview de produccion esta en http://127.0.0.1:3012, PID 7812 en esta
sesion. Usa una copia aislada en
.next-editorial-built-preview/counters-2026-10-02. Cambios posteriores de
codigo no se reflejan alli automaticamente. Un intento de reemplazar la
copia anterior fue rechazado por el entorno; se conservo y se creo otra
copia sin borrar la anterior. Desarrollo, build y pruebas siguen aislados.

## Resultado y trabajo pendiente

reports/adsense-local-2026-10-02-counter-final.json repite las 330 rutas.
Todas responden 200. No se anade ni elimina ninguna URL del sitemap.
D.Mon tiene 1503 palabras visibles y Doomfist 1468, sin avisos automaticos;
esto es una medicion, no el criterio suficiente para aprobar su calidad.

Tras el primer lote seguian 41 counters genericos, 42 composiciones
genericas y /roles/flex.
Hay 70 filtros y 6 perfiles pendientes de revision funcional individual,
ademas de contenido indexable que necesita revision editorial completa.
Las similitudes detectadas siguen siendo pendientes reales; no se han
ocultado cambiando el umbral ni quitando rutas de la auditoria.

Falta un registro explicito de aprobacion editorial antes de habilitar
anuncios. Tambien faltan los datos reales del titular, CMP certificada,
revision de produccion y datos de Search Console. No se ha realizado
commit, push, deploy, activado anuncios ni solicitado revision de AdSense.

## Segundo lote: Ashe, Bastion y Mei

Se sustituyen otras tres fichas breves por contenido individual:

- Ashe: disputar la altura, presionar durante el cruce, identificar la
  ayuda de Mercy y responder a B.O.B. sin regalar otra linea al rifle.
  Coach Gun no se da por agotado sin comprobar Double-Barreled y los
  cambios de cooldown del subrol.
- Bastion: esperar Assault con un plan posterior, escalonar Matrix y
  Grasp, presionar con Hanzo o Ana y distinguir el cruce del duelo.
  Artillery corresponde al kit normal. El cambio a Configuration: Tank
  en junio pertenecia al modo temporal Community Crafted, no a ranked.
- Mei: recuperar una columna del muro, preparar la salida de Cryo-Freeze,
  evitar el aislamiento y usar Suzu para una salida de Blizzard. No se
  promete inmunidad permanente dentro del area ni atravesar Wall con
  Fortify.

Las tres rutas conservan noindex, follow y no entran en sitemap. No se
anaden rutas ni se activa publicidad. Se conserva el filtro de heroes
revisados al resolver enlaces a fichas que aun no tienen calidad suficiente.

Se corrige tambien el auditor para excluir rutas privadas con query,
caracteres escapados o un origen externo. La prueba incluye dashboard y
login con parametros y una API con el nombre escapado. Es una correccion
del rastreo, no un cambio de autorizacion de la aplicacion.

La segunda ejecucion de npm run verify termina correctamente: lint,
175 pruebas unitarias, build de comprobacion y build de navegador con
194 rutas, y 306 pruebas Playwright desktop/mobile. Los cinco articulos
nuevos pasan metadatos, contenido propio, FAQ/schema, imagenes, enlaces,
robots, ausencia de anuncios y overflow. No se han probado cobros reales.

El navegador interno confirma Ashe y Bastion en escritorio y Mei en
390x844 con la FAQ abierta. No aparecen errores de consola ni anuncios;
el viewport se restablece al terminar. Playwright guarda capturas en
reports/reviewed-counters. El preview aislado sigue en el puerto 3012,
ahora PID 14128 y .next-editorial-built-preview/counter-dps-2026-10-02.
Se conserva la copia anterior; no se borran artefactos ajenos.

reports/adsense-local-2026-10-02-counter-dps-final.json repite las 330
rutas, todas HTTP 200, sin cola pendiente del inventario conocido. Tiene
76 rutas con avisos automaticos, frente a 82 en el inventario ampliado
inicial. Las tres fichas nuevas tienen 1635, 1591 y 1658 palabras visibles,
respectivamente; la extension sigue sin acreditar por si sola calidad.

La comparacion confirma cero URLs anadidas o retiradas del sitemap.
Quedan 38 counters genericos, 42 composiciones genericas y /roles/flex,
ademas de los perfiles, filtros y paginas indexables pendientes de
revision individual. Falta validar produccion despues de un despliegue
autorizado. No se solicita una nueva revision de AdSense todavia.

## Comprobacion documental del kit

Se consultaron estas paginas oficiales para las habilidades descritas.
Las decisiones tacticas son analisis editorial, no testimonios de pruebas.

- https://overwatch.blizzard.com/heroes/doomfist/
- https://overwatch.blizzard.com/en-gb/heroes/dmon/
- https://overwatch.blizzard.com/en-us/news/23798984/legend-of-talon-and-hero-of-numbani-doomfist-and-orisa-s-tank-overhauls/
- https://overwatch.blizzard.com/en-us/heroes/ashe/
- https://overwatch.blizzard.com/en-us/heroes/bastion/
- https://overwatch.blizzard.com/en-us/heroes/mei/
- https://overwatch.blizzard.com/en-us/heroes/ana/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/

Algunas aperturas directas de Blizzard respondieron 403; se contrastaron
los extractos oficiales indexados. Se consulto el contexto de Community
Crafted expresamente para no mezclar sus habilidades con el kit normal.

Estos enlaces permanecen en la documentacion interna y no se convierten
en un bloque artificial de fuentes dentro de la guia.

## Tercer lote: Hanzo, Widowmaker, Sojourn y Emre

Se sustituyen cuatro respuestas breves y muy similares por analisis propios.
El registro reviewedCounters contiene ahora nueve articulos; no se amplian
las listas de slugs indexables ni se habilitan anuncios.

- Hanzo: Sonic en el acceso, aproximacion frente a Storm Arrows, destino
  de Lunge, altura ganada y separacion de curacion con Dragonstrike. Se
  distingue el rebote normal de Storm de los perks Scatter y Frost Arrow.
- Widowmaker: cruce coordinado con el diver, posicion final de Grapple,
  funcion de speed y retirada durante Infra-Sight. Seeker Mine puede seguir
  activa despues de disparar; no se garantiza un duelo ganado ni se exige
  un mirror de sniper.
- Sojourn: lateral del Railgun, defensas escalonadas, salida de Disruptor
  y separacion de cuerpos durante Overclock. Deceleration Field aporta el
  slow opcional; Dual Thrusters y Friction Generators no son ambos el kit
  base. Los poderes de Stadium no se mezclan con ranked.
- Emre: limitar impactos utiles de Siphon, aplicar anticuracion con ayuda,
  reconocer el rebote o contacto de Cyber Frag y ceder cobertura frente a
  Override. Heat Sink, Cyber Adhesion y Suppressive Security se identifican
  como perks, no como efectos que tenga toda partida.

Las decisiones tacticas son analisis editorial y los ejemplos son
situaciones ilustrativas, no partidas propias o resultados medidos.
No se publican cifras nuevas de dano, win rate o cooldowns.

Tambien se corrigen las fechas del componente de counters: solo se incluye
datePublished cuando existe una fecha documentada; no se inventa junio de
2026 para rutas sin historial conocido. dateModified, el time visible y el
sitemap comparten la fecha real de revision. Genji y Kiriko conservan su
revision de 28 de junio; no se actualizan por haber tocado el componente.
Las cinco fechas originales ya documentadas en el lote anterior se mantienen.

Las pruebas nuevas cubren las distinciones de habilidades y perks, la
ausencia de fechas de publicacion inventadas, los once counters indexables
y los errores de consola en cada counter revisado. Lint, 193 unit tests y
build de verificacion y 402 pruebas desktop/mobile pasan. La lectura final
simplifica el H1 de Emre y distingue la etiqueta de habilidades revisadas
del numero de parche. La segunda ejecucion vuelve a pasar lint, 193 unit
tests y build; registra 398 pruebas de navegador correctas y cuatro
fallos de una expectativa nueva mal aplicada a Doomfist y D.Mon, que si
indican Season 4. Se corrige solo el test para distinguir ambos casos.
La repeticion completa de reviewed-counters.spec.ts termina con 30/30
desktop/mobile sobre un build nuevo, incluyendo los cuatro casos fallidos,
los nueve articulos y las fechas de los once counters indexables. No se
presenta la segunda suite como una ejecucion de 402/402 tras la correccion.

La revision manual del navegador interno comprueba los cuatro articulos
en 1440x900 y 390x844, retratos, texto, FAQ y consola. No se detecta overflow,
pantalla blanca, imagen rota o anuncio. El preview aislado usa el puerto
3012, inicialmente PID 13428. Tras simplificar el H1 de Emre y la etiqueta,
se sirve el build final desde PID 17484 y
.next-editorial-built-preview/counter-range-final-2026-10-02. Se conservan
las copias anteriores y se comprueba de nuevo Emre desktop/mobile y Hanzo.

reports/adsense-local-2026-10-02-counter-range-final-reviewed.json registra las mismas
330 rutas conocidas, todas HTTP 200, con la cola del inventario vacia. El
sitemap conserva 105 URLs y la comparacion confirma cero altas o bajas.
Los cuatro counters siguen noindex, follow, sin sitemap y sin publicidad.
El auditor encuentra 1705 palabras visibles en Hanzo, 1684 en Widowmaker,
1729 en Sojourn y 1761 en Emre. Es una medicion, no un criterio de aprobacion.

Los avisos automaticos bajan de 34 a 30 y las fichas genericas de 39 a 35:
quedan 34 counters y /roles/flex. La mayor similitud pendiente ahora es
Echo/Sierra (0.398); no se cambia el umbral para esconderla. Las categorias
automaticas de revision no demuestran que el resto del sitio este aprobado.

El preview sigue registrando StripeAuthenticationError al consultar estados
de cuentas. No se modifican credenciales ni codigo de pagos y no se efectuan
compras. Un HTTP 200 del perfil no certifica el checkout de produccion.

Referencias internas consultadas para el kit de este lote:

- https://overwatch.blizzard.com/en-us/heroes/hanzo/
- https://overwatch.blizzard.com/en-gb/Heroes/widowmaker/
- https://overwatch.blizzard.com/heroes/sojourn/
- https://overwatch.blizzard.com/en-gb/heroes/sojourn/
- https://overwatch.blizzard.com/en-us/heroes/emre/
- https://overwatch.blizzard.com/en-us/news/24246206/riflettori-su-overwatch-il-regno-di-talon-ha-inizio/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/

Las aperturas directas de las cuatro fichas respondieron 403. Se revisaron
extractos oficiales indexados y se separaron las variantes de Community
Crafted, Stadium y parches experimentales. No equivale a haber leido el
cuerpo completo inaccesible ni a haber probado personalmente el kit.

Siguen pendientes los counters restantes, revision individual de paginas
indexables, registro de aprobacion editorial, datos legales reales, CMP,
revision de produccion y Search Console. No se realiza commit, push,
deploy, activacion de anuncios ni solicitud de revision de AdSense.

## Cuarto lote: Echo y Sierra

Se sustituyen las dos fichas que encabezaban la similitud del ultimo
rastreo (0.398) por analisis independientes del matchup. El registro
reviewedCounters contiene once revisiones, todas fuera del sitemap,
noindex, follow y sin anuncios. No se toca el marketplace ni los pagos.

- Echo: cortar el angulo de Sticky Bombs antes de Beam, ayudar al objetivo
  herido, presionar el vuelo desde cobertura y responder al heroe copiado
  durante Duplicate. La cobertura no quita bombas ya pegadas. Full Salvo,
  Focused Rush, Aerial Munitions y Partial Scan se distinguen del kit base.
- Sierra: buscar cobertura durante Tracking Shot, abrir una segunda linea,
  anticipar el destino de Anchor Drone y abandonar el recorrido de
  Trailblazer. Tremor Charge actua al impactar. Locked In, Tight Grip,
  Full Flight y Medi-Drone se identifican como opciones de perk, sin
  introducir resets del modo Community Crafted ni afirmar limpiezas de
  la marca que no se han comprobado.

Las recomendaciones y los ejemplos son analisis editorial de situaciones
posibles, no partidas propias, tasas de victoria o pruebas de rendimiento.
No se inventa datePublished; fecha visible y dateModified reflejan la
revision del 2 de octubre de 2026. Se conservan todos los enlaces utiles.

Referencias internas para las mecanicas:

- https://overwatch.blizzard.com/en-us/heroes/echo/
- https://overwatch.blizzard.com/en-gb/heroes/sierra/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/

Las dos aperturas directas de fichas respondieron 403. Se contrastaron
los extractos oficiales indexados, incluyendo habilidades y perks. Las
notas de junio contienen secciones de modos temporales: no se importan
esas variantes a las recomendaciones de ranked. Estos enlaces no se
convierten en una seccion de fuentes en las paginas publicas.

La primera auditoria del lote, anterior al ultimo pulido de lenguaje,
es reports/adsense-local-2026-10-02-counter-air-tracking-final.json:
330 rutas HTTP 200, 159 rutas del manifest cubiertas, 105 URLs en sitemap,
106 indexables, 224 noindex y 27 paginas con avisos automaticos.
Las fichas genericas bajan de 35 a 33: 32 counters y /roles/flex.
La comparacion del sitemap confirma cero altas o bajas. Echo y Sierra
no tienen avisos de HTML en ese rastreo; eso no certifica su aprobacion
editorial ni la de Google.

Durante la lectura visual se simplifican expresiones como "discutir el
angulo" y se retira una comparacion de modo temporal que no aportaba al
lector. Se anaden tests para esas regresiones de lenguaje, junto a las
distinciones de perks, la fecha y la ausencia de mecanicas inventadas.
Se completa npm.cmd run verify sobre el texto final: lint sin avisos,
194 unit tests, build de verificacion y 406 pruebas desktop/mobile
correctas. La ejecucion anterior tambien paso 406 pruebas antes del
ultimo pulido; el resultado final no depende de esa ejecucion anterior.
La suite incluye 34 pruebas de counters, sus enlaces, retratos, metadata,
FAQ visible y JSON-LD, fechas, robots, sitemap, anuncios y consola.

Se comprueban manualmente Echo y Sierra en el navegador interno a
1440x900 y 390x844, incluyendo las FAQ modificadas. El texto final carga
con fondo oscuro, retratos visibles, sin overflow ni errores de consola
durante la revision. Se restauran las dimensiones normales al terminar.
Se inspeccionan tambien las capturas de Playwright del build final.

El preview final permanece en http://127.0.0.1:3012, PID 32332, desde
.next-editorial-built-preview/counter-air-tracking-reviewed-2026-10-02.
Se conserva la copia anterior; no se comparten artefactos con el puerto
3011 de Playwright. Los logs del preview son
reports/editorial-counter-air-tracking-reviewed-preview.log y
reports/editorial-counter-air-tracking-reviewed-preview-error.log.

reports/adsense-local-2026-10-02-counter-air-tracking-final-reviewed.json
repite el inventario final: 330 respuestas HTTP 200, 159 rutas del build
cubiertas, cola vacia, 105 URLs en sitemap y cero altas o bajas respecto
al lote anterior. Echo tiene 1835 palabras visibles y Sierra 1827 segun
el parser del auditor. Ninguna tiene avisos tecnicos en ese informe;
ambas conservan noindex, follow y no se habilita publicidad.
La longitud y la ausencia de avisos no equivalen a calidad certificada.

Quedan 32 counters genericos y /roles/flex. Las mayores similitudes
pendientes son Brigitte/Roadhog y Symmetra/Torbjorn (0.386). La categoria
automatica de 103 paginas indexables que requieren revision no demuestra
que sean 103 articulos defectuosos; cada uno necesita una comprobacion
individual y un registro de aprobacion editorial real.

El preview sigue registrando StripeAuthenticationError al consultar el
estado de cuentas conectadas. No se prueban cobros ni se modifican claves
o logica de Stripe; las pruebas publicas no certifican pagos reales.
Tambien siguen pendientes los datos reales del titular, CMP certificada,
revision de produccion y Search Console. El objetivo permanece abierto:
no hay commit, push, deploy ni solicitud de revision de AdSense en este lote.
