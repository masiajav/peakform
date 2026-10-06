# Revision de composiciones: 2 de octubre de 2026

## Alcance realizado

Se sustituyen las fichas genericas de Ashe, Sigma, Pharah y Mercy por
articulos individuales en reviewed-team-compositions.ts. Se mantienen
las rutas y el renderer existentes, sin cambios de pagos, base de datos
o funcionamiento del marketplace.

- Ashe: angulos con Sigma y Tracer, seguimiento de un salto de Winston,
  tareas distintas de Reinhardt y D.Va en 6v6 y trayectoria de B.O.B.
- Sigma: presion desde dos lineas, defensa de la backline, uso de barrera
  y Grasp durante cruces y coordinacion con Winston en 6v6.
- Pharah: rutas con cobertura, aterrizaje para recuperar combustible,
  juego sin Mercy, ayuda contra el hitscan y preparacion de Barrage.
- Mercy: ventanas reales de damage boost, reparto de ayuda con el otro
  Support, destinos de Guardian Angel y decisiones sobre Resurrect.

Cada articulo tiene dos propuestas 5v5 y una 6v6, limitaciones, cambios
de plan al sustituir un heroe, ejemplos, checklist, FAQ y enlaces propios.
No se presentan como equipos probados personalmente ni como listas con
victorias aseguradas. No se inventan estadisticas ni valores de balance.

Se corrigio durante la revision una mencion a Flux en una propuesta sin
Sigma. El texto usa ahora las ultimates de los heroes presentes. Tambien
se corrigio un enlace inexistente de Sigma y se enlaza directamente la
guia revisada de Pharah, evitando pasar por su alias de video.

## Metadatos e indexacion

Titles, descriptions, H1 y FAQ son especificos. La revision visible y
dateModified corresponden al 2 de octubre de 2026; Doomfist y D.Mon
conservan su revision del 1 de octubre. La autoria publica es Replaid Lab.

Las cuatro rutas conservan noindex, follow, estan fuera del sitemap y
no sirven anuncios. No se cambia la lista de aprobaciones publicas por
haber redactado un articulo largo o superado una prueba tecnica.

## Verificacion realizada

La primera ejecucion de npm run verify termino con lint, 175 pruebas
unitarias y los builds correctos, pero 12 fallos de navegador: una nueva
expectativa de title no contemplaba el sufijo de marca del layout.
Se corrigio la expectativa para comprobar el title completo, sin cambiar
los metadatos de la aplicacion ni omitir la prueba.

La segunda ejecucion completa termino con codigo 0:

- Lint sin errores ni warnings de ESLint.
- 175 pruebas unitarias en 12 archivos.
- Builds .next-verify y .next-e2e completos, con 194 rutas generadas.
- 314 pruebas Playwright, escritorio y movil.

Las pruebas de las seis composiciones revisadas verifican tres lineups,
roles 1/2/2 en 5v5 y 2/2/2 en 6v6, heroes conocidos sin duplicados,
metadatos propios, canonical, noindex, enlaces HTTP 200, imagenes cargadas,
FAQ abierta con su respuesta y schema coincidente, fechas, contraste de
texto auxiliar, ausencia de anuncios y overflow.

El navegador interno reviso Ashe y Sigma en escritorio, Pharah y Mercy
en 390x844, incluyendo una FAQ de Mercy. Se restablecio el viewport.
No se observaron imagenes rotas, pantalla blanca ni overflow. Habia logs
antiguos de prefetch cuando el anterior servidor local no estaba activo;
la revision posterior a la nueva navegacion no registra errores nuevos.
Las capturas de Playwright estan en reports/reviewed-compositions.

Preview aislado: http://127.0.0.1:3012/team-comps/sigma.
Proceso comprobado: node PID 24976, usando
.next-editorial-built-preview/compositions-2026-10-02. Se copiaron
artefactos de un build terminado y se conservaron los snapshots anteriores.
El PID y su disponibilidad son una comprobacion puntual, no persistencia
garantizada despues de reiniciar el equipo.

Los logs de la auditoria incluyen StripeAuthenticationError al consultar
estados de expertos con las credenciales locales. No se realizaron cobros
ni verificaciones financieras reales; las pruebas unitarias de Stripe no
acreditan el funcionamiento de una cuenta de produccion.

## Inventario y pendientes reales

reports/adsense-local-2026-10-02-compositions-final.json audita 330 rutas
con el inventario anterior, sitemap, enlaces descubiertos y manifiesto
del build. Todas responden HTTP 200 y no queda cola del inventario conocido.
Las URLs dinamicas de base de datos sin enlaces ni registro previo siguen
fuera de esta cobertura; no se declara una auditoria exhaustiva de la BD.

Se comparo la pertenencia al sitemap con counter-dps-final.json: cero
altas y cero bajas. Permanecen 105 URLs en sitemap, 106 indexables y
224 noindex. Los avisos automaticos bajan de 76 a 72, pero no certifican
calidad ni aprobacion de Google.

Palabras visibles: Ashe 1703, Sigma 1667, Pharah 1692 y Mercy 1733.
Las cuatro rutas no tienen avisos de los heuristicas actuales. Las parejas
Ashe/Sigma y Pharah/Mercy dejan de superar el umbral de similitud 0.36,
sin modificar el umbral ni excluir rutas del inventario.

Siguen pendientes 38 counters genericos, 38 composiciones genericas,
/roles/flex, 70 filtros, 6 perfiles y revision individual de contenido
indexable. El siguiente grupo de alta similitud es Mei, Moira y Reaper.
Los hubs con avisos de extension no se rellenaran solo para superar
un contador de palabras.

Faltan un registro explicito de aprobacion editorial, los datos reales
del titular, CMP certificada antes de servir publicidad en Europa,
revision de produccion y exportaciones de Search Console. No se hizo
commit, push, deploy ni solicitud de revision de AdSense.
El objetivo integral permanece activo e incompleto.

## Referencias internas de comprobacion

Las habilidades se contrastaron con las paginas oficiales y su contexto;
las recomendaciones tacticas son analisis editorial, no testimonios.
Los enlaces se documentan aqui, no en un bloque artificial del articulo.

- https://overwatch.blizzard.com/en-us/heroes/ashe/
- https://overwatch.blizzard.com/en-us/heroes/sigma/
- https://overwatch.blizzard.com/en-gb/heroes/pharah/
- https://overwatch.blizzard.com/en-gb/heroes/mercy/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/

Flash Heal se comprueba en notas oficiales porque la lista principal de
Mercy no enumera de forma consistente todas sus habilidades. Se distingue
el kit normal de cambios temporales de April Fools, Arcade o Community
Crafted; no se trasladan estos ultimos a una recomendacion de ranked.

## Segundo lote: Mei, Moira y Reaper

Se sustituyen otras tres fichas genericas sin cambiar rutas ni permitir
su indexacion o publicidad. Cada una tiene dos propuestas 5v5 y una
6v6, responsabilidades, limites, ejemplos, checklist, FAQ y enlaces propios.

- Mei: comprobar seguimiento y vision antes del muro, cancelar si corta
  ayuda, preparar la salida de Cryo y distinguir ralentizacion basica de
  la congelacion que depende de Deep Freeze.
- Moira: guardar recurso para el cruce, repartir la curacion con el otro
  Support, elegir rebotes utiles y reconocer que Fade no limpia aliados.
  Reversal y Destruction's Divide se explican como decisiones de perks.
- Reaper: preparar Shadow Step antes del compromiso, conservar Wraith
  para una vuelta accesible, participar con Dire Triggers y comprobar
  control y absorcion antes de Blossom.

La guia existente de Reaper incorpora Dire Triggers en el kit basico y
explica por separado Trigger Finger. Conserva su URL, autor publico y
fecha original de publicacion; ultima revision: 2 de octubre de 2026.

La primera verificacion de este lote paso lint, 176 pruebas unitarias y
los builds, pero fallo en las 18 comprobaciones de composiciones por
un 404 de /_vercel/insights/script.js. El build local de produccion
intentaba cargar Analytics sin la infraestructura de Vercel.

Se limita el componente Analytics a process.env.VERCEL === '1' desde
el layout servidor. No se desactiva en los despliegues de Vercel.
Se elimina tambien la excepcion de Analytics en public-seo.spec.ts:
las pruebas ahora registran todos los errores de consola y HTTP.
No se oculta el fallo ni se modifica el criterio para pasarlo.

La segunda ejecucion completa de npm run verify termina con codigo 0:

- Lint sin errores ni warnings de ESLint.
- 176 pruebas unitarias, 12 archivos.
- Builds de verificacion y E2E terminados, 194 rutas generadas.
- 320 pruebas Playwright en escritorio y movil, sin fallos.

El navegador interno reviso Mei en escritorio, Moira y Reaper en
390x844, respuestas FAQ abiertas y el enlace hacia la guia de Reaper.
La guia muestra su publicacion original y la nueva seccion de Dire
Triggers. Viewport restablecido; no pantalla blanca, texto cortado ni
imagenes rotas observados. Desde la navegacion al snapshot corregido
no hay nuevos errores ni warnings de consola.

Preview final: http://127.0.0.1:3012/team-comps/mei, snapshot aislado
.next-editorial-built-preview/compositions-brawl-analytics-2026-10-02,
PID comprobado al arrancar: 29408. No se comparten artefactos con
el build de Playwright y se conservan los snapshots anteriores.

reports/adsense-local-2026-10-02-brawl-final.json audita el contenido de
este lote antes de corregir Analytics: 330 rutas conocidas, todas HTTP
200, sin cola pendiente del inventario. Su sitemap coincide con el
reporte anterior: cero altas, cero bajas, 105 URLs. Permanecen 106
indexables y 224 noindex. La correccion posterior de Analytics no
cambia contenido, metadatos ni pertenencia al sitemap.

Mei tiene 1699 palabras visibles, Moira 1715 y Reaper 1709. No tienen
avisos automaticos y sus tres parejas dejan de superar el umbral de
similitud, que no se ha modificado. Esto es evidencia diagnostica,
no una aprobacion editorial ni de AdSense.

Los avisos automaticos bajan de 72 a 69. Aun quedan 38 counters y
35 composiciones genericas, ademas de /roles/flex y otras revisiones.
El siguiente grupo repetido incluye Bastion, Doctrine, Domina, Freja,
Lifeweaver, Sierra y Wuyang. Siguen pendientes la revision del contenido
indexable, registro explicito de aprobaciones, identidad legal real,
CMP certificada y comprobaciones de produccion y Search Console.
No se hizo commit, push, deploy, cobro ni solicitud de AdSense.

Referencias internas consultadas para el segundo lote:

- https://overwatch.blizzard.com/en-us/heroes/mei/
- https://overwatch.blizzard.com/en-gb/heroes/moira/
- https://overwatch.blizzard.com/en-gb/heroes/reaper/
- https://overwatch.blizzard.com/en-us/news/24266795/
- https://overwatch.blizzard.com/en-us/news/24266793/

Algunas aperturas directas del sitio oficial devolvieron 403; se
contrastaron extractos indexados oficiales, sin dar por leido un cuerpo
inaccesible. Dire Triggers se confirma en Director's Take porque la
lista de habilidades de Reaper no lo enumera de forma consistente.
No se usan experimentos de 2021 ni Overwatch Classic para describir
el kit normal actual. No se anade un bloque de fuentes a las guias.

## Tercer lote: Bastion y Lifeweaver

Se reescriben dos fichas mas del grupo repetido. No se cambian el
quality gate, sitemap, rutas, pagos ni permisos de publicidad.

- Bastion: una ventana de Assault debe permitir ganar un objetivo o
  una posicion, con presion desde otra direccion y cobertura al volver
  a Recon. Artillery necesita una posicion protegida. Self-Repair y
  Lindholm Explosives se distinguen como perks alternativos.
- Lifeweaver: Grip se decide por el destino y la jugada del aliado,
  Petal por el acceso que alguien utilizara y Tree por la disputa que
  todavia puede sostenerse. Se explican la falta de peel de ciertas
  parejas y la demanda de curacion de dos Tanks, sin recomendar el pick
  como respuesta universal. Grip limpia un objetivo retirado, no un grupo.

Cada articulo tiene tres propuestas de composicion, escenarios propios
y FAQ. No se presentan como recomendaciones de meta basadas en datos
de victorias ni experiencia personal inventada.

npm run verify termina con codigo 0: lint, 176 pruebas unitarias,
ambos builds de 194 rutas y 324 pruebas Playwright desktop/mobile.
Las 11 composiciones revisadas se incluyen automaticamente en la suite.
El navegador interno reviso Bastion en escritorio, Lifeweaver en
390x844 y su FAQ de Grip. No hay nuevos errores de consola desde la
navegacion al nuevo snapshot. Viewport restablecido al finalizar.

Preview final de este lote: http://127.0.0.1:3012/team-comps/bastion.
Snapshot .next-editorial-built-preview/compositions-utility-2026-10-02,
node PID 1232 comprobado al arrancar. El snapshot anterior se conserva.

reports/adsense-local-2026-10-02-utility-final.json recorre 330 rutas
conocidas, todas HTTP 200, sin rutas pendientes del inventario. Comparado
con brawl-final.json hay cero altas y cero bajas de sitemap. Mantiene
105 URLs en sitemap, 106 indexables y 224 noindex. No se afirma cobertura
de rutas dinamicas de BD que no aparezcan en inventario o enlaces.

Los avisos automaticos bajan de 69 a 67. Bastion tiene 1677 palabras
visibles y Lifeweaver 1770; ambos sin avisos automaticos. Sus anteriores
parejas repetidas dejan de superar el mismo umbral de similitud.
Siguen pendientes 38 counters genericos, 33 composiciones genericas y
/roles/flex, ademas de la revision de indexables, filtros y perfiles.
La clasificacion automatica conserva las nuevas rutas como pendientes:
no se sustituye una aprobacion individual por un contador de palabras.

Referencias internas del tercer lote:

- https://overwatch.blizzard.com/en-us/heroes/bastion/
- https://overwatch.blizzard.com/en-us/heroes/lifeweaver/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/4/
- https://us.forums.blizzard.com/en/overwatch/t/overwatch-retail-patch-notes-%E2%80%93-april-14-2026/1013448/1

Los extractos oficiales de abril confirman la limpieza en el kit de
Grip; no se confunde con el perk antiguo ni las bromas de April Fools.
Las aperturas directas de varias paginas devolvieron 403 y se registro
esa limitacion, contrastando extractos oficiales disponibles. No se
publican apartados artificiales de fuentes. No se hizo commit, push,
deploy, solicitud de AdSense ni prueba financiera real.

## Cuarto lote: Freja, Sierra y Wuyang

Se sustituyen tres composiciones del grupo repetido por analisis propios.
Freja prepara una linea de Take Aim antes del engage y conserva una
salida con Quick Dash; Sierra elige un objetivo marcado accesible y
un destino util para Anchor Drone; Wuyang reparte Stream, conserva
recurso y prepara Tidal Blast contando con su detonacion posterior.
Se distinguen las funciones de Guardian Wave de Suzu y Lamp.

Cada ficha tiene dos propuestas de 5v5 y una de 6v6, responsabilidades,
situaciones de ranked, errores, checklist, FAQ y enlaces contextuales.
No se inventan estadisticas, experiencia personal ni victorias de meta.
No se modifican rutas, pagos, permisos de publicidad ni aprobaciones
editoriales. Las tres rutas siguen noindex, follow y sin anuncios.

npm run verify finaliza con codigo 0: lint, 176 pruebas unitarias,
build:verify y build:e2e de 194 rutas y 330 pruebas de Playwright.
La suite comprueba automaticamente las 14 composiciones revisadas
en escritorio y movil, incluidos enlaces, imagenes, FAQ, metadata,
JSON-LD, contraste, overflow, consola y ausencia de publicidad.

Navegador interno: Freja en escritorio, Sierra y Wuyang en 390x844,
incluidas FAQ abiertas. No hay errores ni warnings nuevos en la consola.
El viewport se restablece al terminar. Capturas automatizadas guardadas
en reports/reviewed-compositions. Preview de este lote en 3012 con
snapshot .next-editorial-built-preview/compositions-mobility-2026-10-02,
node PID 2192; los snapshots anteriores se conservan.

reports/adsense-local-2026-10-02-mobility-final.json comprueba 330 rutas
conocidas: todas responden 200 y remainingPaths esta vacio. Sigue habiendo
105 URLs en sitemap, 106 indexables y 224 noindex. Comparar con el lote
anterior devuelve cero altas y cero bajas en sitemap. La cobertura no
incluye fichas dinamicas de BD sin enlace ni registro en el inventario.

Los avisos automaticos bajan de 67 a 64 sin cambiar los umbrales. Freja
tiene 1647 palabras visibles, Sierra 1641 y Wuyang 1698; no tienen
avisos y sus antiguas parejas repetidas dejan de superar el umbral.
No se usa ese recuento como aprobacion editorial ni prueba de AdSense.
Quedan 38 counters, 30 composiciones genericas y /roles/flex. La pareja
mas repetida pendiente es Doctrine/Domina. Siguen pendientes revision
individual de indexables, registro de aprobaciones, datos legales reales,
CMP certificada, produccion y Search Console. No se hizo commit, push,
deploy, cobro ni solicitud de revision a Google.

Referencias internas contrastadas mediante extractos oficiales indexados:

- https://overwatch.blizzard.com/en-gb/heroes/freja/
- https://overwatch.blizzard.com/en-gb/heroes/sierra/
- https://overwatch.blizzard.com/en-us/heroes/wuyang/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/7/

Varias aperturas directas devolvieron 403. No se da por leido ese cuerpo
inaccesible. La ficha de Sierra y los parches no coinciden en todos los
perks: no se publican afirmaciones sobre ellos ni cifras de balance.
Las recomendaciones son analisis de situaciones basadas en las funciones
del kit, no citas extensas ni conclusiones de pruebas personales.
No se anade un bloque artificial de fuentes al contenido publico.

El log del preview sigue mostrando StripeAuthenticationError al consultar
cuentas con las credenciales locales. No se han modificado pagos ni
realizado cobros. Las pruebas verdes no prueban transacciones reales
ni resuelven esa limitacion de la comprobacion local del marketplace.

## Quinto lote: Doctrine, Domina y Jetpack Cat

Se escriben tres analisis individuales. Doctrine distingue las propuestas
basadas en el trial del balance de estreno todavia pendiente. Domina
necesita contestar las lineas que su barrera segmentada no cubre y preparar
seguimiento tras sus desplazamientos. Jetpack Cat transporta a un aliado
con un destino y una vuelta acordados; no sustituye la velocidad de grupo.
No se inventan cifras, resultados de pruebas personales ni un meta de
Doctrine antes del lanzamiento. Cada ficha mantiene tres lineups, ejemplos,
responsabilidades, FAQ y enlaces relacionados.

Se corrige ademas el retrato estirado en composiciones: marco cuadrado,
alineado arriba. El cambio es especifico de TeamCompPillarPage y no altera
retratos de counters ni guias. Playwright comprueba la proporcion en las
17 composiciones revisadas, tanto en escritorio como en movil.

La ultima pasada de texto corrige dos frases: Cassidy sigue recargando
en el ejemplo de Doctrine y una pared tapa el tiro de Freja cuando
Winston pelea al otro lado. npm run verify del texto final termina con
codigo 0: lint, 177 pruebas unitarias, dos builds de 194 rutas y 336
pruebas de navegador. No se modifica el quality gate ni el sitemap.

Revision manual: Doctrine y Domina en escritorio; Jetpack Cat y Doctrine
en 390x844, incluidas FAQ abiertas. El viewport se restablece al terminar.
Tras recargar la version final de Doctrine, se comprueba el ejemplo
corregido, retrato de 352.94 x 352.94, sin overflow ni nuevos errores o
warnings de consola. Capturas en reports/reviewed-compositions.

Preview final: http://127.0.0.1:3012/team-comps/doctrine, snapshot
.next-editorial-built-preview/compositions-control-clean-2026-10-02,
node PID 26548. Se conservan los snapshots anteriores.

reports/adsense-local-2026-10-02-control-clean-final.json recorre 330
rutas conocidas: todas HTTP 200 y remainingPaths vacio. Mantiene 105
URLs en sitemap, 106 indexables y 224 noindex; cero altas o bajas
comparado con mobility-final.json. No cubre rutas dinamicas de BD que
no figuren en inventario ni enlaces. Los avisos bajan de 64 a 61 sin
alterar umbrales; las tres nuevas fichas no tienen avisos automaticos.
Esto no prueba aprobacion editorial ni aceptacion de AdSense.

Quedan 38 counters, 27 composiciones genericas y /roles/flex, ademas de
la revision individual de indexables, filtros y perfiles. Las fichas
nuevas siguen noindex, follow, sin publicidad y fuera del sitemap.
Siguen pendientes identidad legal real, CMP certificada, comprobacion
de produccion y Search Console. Las limitaciones de Stripe local no se
resuelven con una suite verde. No hubo cobros, commit, push, deploy ni
solicitud de AdSense.

Referencias internas:

- https://overwatch.blizzard.com/en-us/heroes/domina/
- https://overwatch.blizzard.com/en-us/heroes/jetpack-cat/
- https://news.blizzard.com/en-us/article/24294376/sink-your-teeth-into-overwatch-s-blizzcon-reveals

Las aperturas directas de fichas devolvieron 403; se contrastaron
extractos oficiales indexados, sin dar por leido el cuerpo inaccesible.
El articulo de Blizzard confirma fechas de Doctrine, no todos los
detalles del kit. Esos detalles proceden de la captura de habilidades
aportada anteriormente por el usuario y del contenido existente. La
copia temporal de esa captura ya no esta disponible: no se afirma una
nueva inspeccion del archivo. No hay apartado artificial de fuentes
en las fichas publicas.

## Sexto lote: Symmetra y Torbjorn

Se reemplaza el contenido compartido por dos planes distintos. Symmetra
coordina el destino, el reparto de jugadores y la curacion al utilizar
TP; diferencia un cruce de brawl de una rotacion individual y no trata
Photon Barrier como un obstaculo fisico. Torbjorn reparte vigilancia de
torreta y participacion con el arma, mueve el dispositivo al ganar espacio
y usa Molten Core sobre un acceso que el enemigo necesita utilizar.
Incluye ataque, defensa y respuesta a flancos, sin prometer que la torreta
resuelva el duelo sola. Ambos mantienen dos ejemplos de 5v5 y uno de 6v6.

Se simplifican tres encabezados comunes de la plantilla: preparar la
siguiente pelea, decisiones que cambian una pelea y checklist antes de
empezar. Se retira la traduccion literal "bloquear la composicion" y el
comentario sobre convertir la partida en una scrim. Una asercion E2E evita
que reaparezca ese encabezado y comprueba el nuevo en las 19 fichas.

npm run verify del estado final termina con codigo 0: lint, 178 pruebas
unitarias, build:verify y build:e2e de 194 rutas, 340 pruebas Playwright
de escritorio y movil. Se comprueban contenido propio, lineups, enlaces,
imagenes, FAQ, schema, robots, canonical, contraste, overflow y consola.
git diff --check termina con codigo 0; solo avisa de conversion LF/CRLF.

Revision manual en navegador interno: Symmetra en escritorio y en 390x844,
FAQ del uso del teleporter abierta; Torbjorn en movil con FAQ de Molten
Core abierta. Retratos cargados y texto legible, sin overflow observado.
Se restaura el viewport y, al recargar el snapshot final, se confirma el
nuevo encabezado de checklist y ausencia de errores o warnings nuevos.
Capturas finales en reports/reviewed-compositions; se inspecciona tambien
symmetra-desktop-chromium-viewport.png.

Preview final: http://127.0.0.1:3012/team-comps/torbjorn, snapshot
.next-editorial-built-preview/compositions-builders-readable-2026-10-02,
node PID 8940 confirmado por su comando. Snapshots anteriores conservados.

reports/adsense-local-2026-10-02-builders-readable-final.json comprueba
330 rutas conocidas, todas HTTP 200, sin remainingPaths. Mantiene 105
URLs en sitemap, 106 indexables y 224 noindex. Cero altas o bajas en
sitemap comparado con control-clean-final.json. Los avisos automaticos
bajan de 61 a 59; ambas fichas sin avisos, 1750 y 1788 palabras antes del
ajuste de encabezados. Ni la extension ni esa ausencia aprueban AdSense.
No se modifican umbrales, permisos publicitarios ni aprobaciones del gate:
las dos fichas siguen noindex, follow, sin anuncios y fuera del sitemap.

Quedan 38 counters, 25 composiciones y /roles/flex genericos. La siguiente
familia repetida es Emre/Hanzo/Sojourn/Widowmaker/Soldier 76. Tambien siguen
pendientes revision individual de indexables, filtros, perfiles y registro
de aprobacion. Hay que completar identidad legal real, CMP antes de activar
anuncios, comprobacion de produccion y datos de Search Console.

Referencias internas contrastadas:

- https://overwatch.blizzard.com/en-gb/heroes/symmetra/
- https://overwatch.blizzard.com/en-us/heroes/torbjorn/

Las aperturas directas devolvieron error. Se utilizaron extractos oficiales
indexados, sin afirmar haber leido el cuerpo inaccesible. No se trasladan
datos de Classic, Experimental ni poderes de Stadium al kit de ranked,
ni se publican cifras de perks o balance sin verificar. Las situaciones y
recomendaciones son analisis propios del uso del kit, no partidas vividas
ni citas extensas. No se anade un apartado publico artificial de fuentes.

El log local mantiene StripeAuthenticationError al consultar cuentas con
las credenciales disponibles. No se modifican pagos ni se realizan cobros;
estas pruebas no verifican una transaccion real del marketplace. No hubo
commit, push, deploy, activacion de publicidad ni solicitud a Google.

## Septimo lote: Hanzo, Widowmaker, Sojourn, Soldier 76 y Emre

Se sustituyen cinco fichas cortas compartidas por composiciones individuales.
Hanzo convierte Sonic Arrow en informacion para el siguiente movimiento y
reserva respuesta al dive; Widowmaker prepara una linea relevante, retirada
con gancho y ayuda razonable sin exigir un headshot antes de cada avance.
Sojourn prepara energia, municion y un tiro al engage. Soldier limita el
recorrido del off-angle para llegar durante la pelea. Emre completa rafagas
desde cobertura, comprueba el rebote y vuelve de una pausa a tiempo.

Cada ficha contiene dos lineups de 5v5 y una de 6v6, sus responsabilidades,
limitaciones, sustituciones, mapas, ejemplos, checklist, FAQ y enlaces utiles.
No se presentan como meta obligatorio ni experiencia personal. Se distingue
Disruptor Shot de Deceleration Field, Biotic Field de su reemplazo Stim Pack,
y Cyber Frag de Cyber Adhesion. Siphon no se describe como invulnerabilidad
ni como respuesta garantizada a la anticuracion. Las combinaciones de
ultimates no se convierten en requisito para utilizar cada habilidad.

El estado final supera npm run verify con codigo 0: lint, 179 pruebas
unitarias, build:verify y build:e2e de 194 rutas, 350 pruebas Playwright en
escritorio y movil. Los bucles de composiciones cubren las 24 revisadas:
contenido, lineups, enlaces internos, retratos, FAQ, datos estructurados,
robots, canonical, ausencia de anuncios, contraste, consola y overflow.

Revision manual en navegador interno: Hanzo y Widowmaker en escritorio;
Sojourn, Soldier y Emre en 390x844, con FAQ abiertas sobre ralentizacion,
curacion compartida y adhesion. Retratos cargados y textos legibles. Hanzo
mide 350.94 x 350.94 y su imagen tiene naturalWidth 144. No aparecen nuevos
errores ni warnings de consola desde el inicio de esta revision. Se
restablece el viewport al terminar. Capturas de la suite en
reports/reviewed-compositions; no se afirma revisar visualmente todas las
330 rutas solo por haberlas recorrido mediante el auditor.

Preview final: http://127.0.0.1:3012/team-comps/emre, snapshot
.next-editorial-built-preview/compositions-ranged-2026-10-02,
node PID 10652. Se conserva el snapshot anterior; no se comparten los
artefactos de verificacion y preview con el servidor de desarrollo.

reports/adsense-local-2026-10-02-ranged-final.json recorre 330 rutas
conocidas, todas HTTP 200, sin remainingPaths. Mantiene 105 URLs en sitemap,
106 indexables y 224 noindex. Comparacion de sitemap sin altas ni bajas.
Las cinco fichas nuevas tienen entre 1701 y 1780 palabras y ningun aviso
automatico. Esto no demuestra que cumplan por si solas el criterio de
AdSense: ni la extension ni un umbral de similitud sustituyen la revision.

Los avisos pasan de 59 a 53. No son seis aprobaciones individuales: al
cambiar el conjunto de textos tambien cambian comparaciones de similitud.
Quedan 38 counters, 20 composiciones y /roles/flex clasificados como
genericos. La siguiente familia repetida incluye Anran, Vendetta, Mizuki
y Mauga; Hazard y Venture tambien conservan una similitud elevada.
Siguen pendientes revision de indexables, dos hubs, filtros, perfiles y
registro de aprobacion individual. Las cinco nuevas fichas permanecen
noindex, follow, fuera del sitemap y sin anuncios. No se cambian umbrales
de auditoria ni permisos de monetizacion para mejorar artificialmente el
resultado.

Referencias internas contrastadas:

- https://overwatch.blizzard.com/en-us/heroes/hanzo/
- https://overwatch.blizzard.com/en-us/Heroes/widowmaker/
- https://overwatch.blizzard.com/heroes/sojourn/
- https://overwatch.blizzard.com/en-gb/heroes/soldier-76/
- https://overwatch.blizzard.com/en-us/heroes/emre/
- https://overwatch.blizzard.com/en-us/news/24246206/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/05/

Las aperturas directas devolvieron 403 o error; se utilizaron extractos
oficiales indexados, sin afirmar haber leido cuerpos inaccesibles. El
anuncio de Reign of Talon describe el lifesteal de Siphon, omitido en la
lista de habilidades del extracto de la ficha. No se trasladan cambios
de April Fools, Community Crafted o Stadium al kit base ni se reutiliza
el slow descrito en la presentacion antigua de Sojourn como efecto base
actual. No se anaden cifras de balance ni apartados artificiales de
fuentes en el contenido publico.

Identidad legal real, CMP certificada antes de activar publicidad,
comprobacion en produccion y datos de Search Console siguen pendientes.
El servidor local conserva StripeAuthenticationError con las credenciales
disponibles. No se cambia el flujo de pagos ni se realizan cobros. No hubo
commit, push, deploy, activacion de anuncios ni solicitud de AdSense. El
objetivo global sigue abierto: aun no se considera lista para solicitar
una nueva revision.

## Octavo lote: Anran, Vendetta y Mizuki

Se sustituyen otras tres fichas cortas compartidas por propuestas propias.
Anran prepara una llegada de suelo compatible con el engage, seguimiento
de quemaduras y ayuda al terminar Dancing Blaze; diferencia una disputa
viable con Revival de una segunda muerte sin continuacion. Vendetta
reparte energia entre guardia y Projected Edge, combina melee con un tiro
de rango y conserva una salida cuando el rival kitea. Mizuki distribuye
Healing Kasa y la respuesta de Binding Chain sin abrir toda su posicion,
revisa ambos extremos de Katashiro y no presupone speed colectivo.

Las tres mantienen dos propuestas de 5v5 y una de 6v6, con responsabilidades,
mapas, limites, sustituciones, ejemplos, checklist, FAQ y enlaces. Se anade
una regresion unitaria que impide tratar Quickstep como efecto base, la
guardia de Vendetta como barrera colectiva, Kekkai como limpieza de
anticuracion o Revival como permiso para entrar contando con morir.
No se presentan combinaciones como meta probado ni partidas personales.

npm run verify del estado final termina con codigo 0: lint, 180 pruebas
unitarias, build:verify y build:e2e de 194 rutas, 356 pruebas de navegador.
La suite de composiciones comprueba las 27 revisadas en escritorio y movil:
contenido, roles de lineups, FAQ, metadatos, schema, enlaces internos,
imagenes, proporcion del retrato, contraste, ausencia de anuncios,
overflow y errores de consola. Las capturas quedan en
reports/reviewed-compositions. Los tests no certifican la transaccion
real del marketplace ni la calidad editorial de cada URL del inventario.

Revision manual en navegador interno: Anran en 1440x900 y en 390x844;
Vendetta y Mizuki en 390x844. Se abren las FAQ sobre Revival, energia
de Projected Edge y Quickstep. Retratos cargados y texto legible,
sin solapes observados ni nuevos errores o warnings de consola desde
el inicio de esta revision. El retrato de Anran tiene naturalWidth 144.
El viewport se restablece al terminar. No se afirma haber inspeccionado
visualmente cada una de las 330 rutas solo por el recorrido del auditor.

Preview final: http://127.0.0.1:3012/team-comps/anran, snapshot
.next-editorial-built-preview/compositions-close-range-2026-10-02,
node PID 16276. El snapshot previo permanece conservado. Los builds de
verificacion, E2E y preview mantienen directorios separados.

reports/adsense-local-2026-10-02-close-range-final.json comprueba 330
rutas conocidas, todas HTTP 200 y sin remainingPaths. Mantiene 105 URLs
en sitemap, 106 indexables y 224 noindex; comparacion sin altas ni bajas.
Anran tiene 1758 palabras, Vendetta 1736 y Mizuki 1778; ninguna presenta
avisos automaticos. Esas cifras son evidencia de alcance, no requisitos
de Google ni prueba de aprobacion. Las tres siguen noindex, follow,
fuera del sitemap y sin anuncios hasta revision individual del gate.

Los avisos generales pasan de 53 a 49. La variacion adicional no es una
cuarta pagina aprobada: al cambiar el conjunto tambien cambian pares
de similitud. Quedan 38 counters, 17 composiciones y /roles/flex genericos.
La pareja de composiciones mas similar ahora es Hazard/Venture, seguida
de Junker Queen/Lucio y Sombra/Wrecking Ball. No se rebajan umbrales ni
se habilita indexacion por la longitud de estas nuevas fichas.

Referencias internas contrastadas:

- https://overwatch.blizzard.com/heroes/anran
- https://overwatch.blizzard.com/en-us/heroes/vendetta/
- https://overwatch.blizzard.com/en-gb/heroes/mizuki/

Las aperturas directas devuelven 403; se contrastan extractos oficiales
indexados de habilidades y perks, sin afirmar haber leido cuerpos
inaccesibles. Se evita trasladar los cambios de Community Crafted y los
poderes de Stadium al kit base. No se publican cifras de dano, curacion,
duracion o cooldown no necesarias para estas decisiones. Las
recomendaciones son analisis propios del uso del kit, no citas extensas.
No se anaden apartados artificiales de fuentes a las paginas publicas.

Siguen pendientes revision de indexables, hubs, filtros, perfiles y el
registro de aprobacion individual, ademas de identidad legal real,
CMP certificada antes de activar anuncios, produccion y Search Console.
No se modifica el flujo de pagos ni se realizan cobros. No hubo commit,
push, deploy, activacion publicitaria ni solicitud de AdSense. El objetivo
completo permanece activo e incompleto; no se considera lista aun.

## Noveno lote: Hazard, Venture y Mauga

Se reemplazan tres fichas genericas por articulos individuales. Hazard
comprueba las lineas aliadas antes de Jagged Wall y la ayuda al aterrizar;
Venture adapta la aparicion de Burrow al engage disponible; Mauga revisa
si el dano frontal cambia una posicion o solo consume curacion. Cada uno
tiene dos propuestas 5v5 y una 6v6, responsabilidades, rotaciones, limites,
sustituciones, ejemplos, checklist, FAQ y enlaces contextuales.

Se diferencia Anarchic Zeal del Spike Guard base, SMART Extender del
alcance habitual de Venture y Kinetic Bandolier/Firewalker de Overrun
sin perks. Cardiac no se presenta como reduccion de dano para los aliados.
No se usan cambios experimentales de Community Crafted o April Fools
como reglas de ranked. La regresion mecanica especifica se anade a unit.

npm run verify finaliza con codigo 0: lint, 181 unitarias, build:verify,
build:e2e (194 rutas) y 362 pruebas de navegador. Las 30 composiciones
revisadas tienen cobertura desktop/mobile, metadatos, schema, FAQ,
enlaces internos, retratos, contraste, noindex y ausencia de anuncios.
Las capturas estan en reports/reviewed-compositions. No certifican cobros
reales ni revision editorial manual del inventario completo.

Revision manual de las tres en 1440x900 y 390x844, con retratos cargados,
sin overflow observado. Se abren las FAQ de lifesteal de Hazard, alcance
de Venture y Cardiac de Mauga. Sin nuevos errores ni warnings de consola
desde el inicio de esta revision. Viewport restablecido al terminar.
Preview: http://127.0.0.1:3012/team-comps/mauga, snapshot
.next-editorial-built-preview/compositions-entry-2026-10-02, PID 29572.
Se conserva el snapshot anterior; desarrollo y builds siguen separados.

reports/adsense-local-2026-10-02-entry-final.json comprueba 330 rutas
conocidas, todas 200 y sin remainingPaths. Sitemap sin altas ni bajas:
105 URLs, 106 indexables y 224 noindex. Hazard 1772 palabras, Venture
1756 y Mauga 1832, sin avisos automaticos. Longitud no equivale a calidad
ni a una regla de Google. Siguen noindex, follow, sin sitemap ni anuncios.

Los avisos pasan de 49 a 46 y quedan 53 paginas clasificadas genericas:
38 counters, 14 composiciones y /roles/flex. Las variaciones incluyen
pares de similitud, no aprobaciones editoriales adicionales. La pareja
mas similar ahora es Junker Queen/Lucio, seguida de Sombra/Wrecking Ball.

Referencias internas contrastadas:

- https://overwatch.blizzard.com/en-us/heroes/hazard/
- https://overwatch.blizzard.com/en-gb/heroes/venture/?mobile-app=true&theme=dark
- https://overwatch.blizzard.com/en-us/heroes/mauga/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2025/03/

Las aperturas directas fallan; se contrastan extractos oficiales indexados,
sin afirmar haber leido cuerpos inaccesibles. El hotfix de marzo de 2025
y la ficha actual corroboran la ausencia de reduccion aliada de Cardiac.
No se publican cifras innecesarias ni bloques artificiales de fuentes.

Pendientes: articulos y hubs restantes, revision de indexables, filtros,
perfiles y registro de aprobacion individual; identidad legal real, CMP
antes de publicidad, comprobacion en produccion y Search Console. No se
toca el flujo de pagos ni se realizan cobros, commit, push, deploy,
activacion publicitaria o solicitud de AdSense. Objetivo aun incompleto.

## Decimo lote: Junker Queen y Lucio

Se reescriben individualmente las dos composiciones que tenian la mayor
similitud del inventario. Queen prepara una llegada cercana compatible
con el DPS y conserva ayuda despues de Shout. Lucio decide entre cruce,
rotacion, peel y retirada, comprobando quien recibe el aura y como llegara
el segundo Support. No son dos versiones del mismo texto de rush.

Cada articulo conserva dos lineups 5v5 y uno 6v6 con reparto de recursos,
mapas, sustituciones y limites. Hay ejemplos distintos de ranked, FAQ,
checklist y enlaces relacionados. La curacion aliada de Thrill of Battle
se identifica como poder de Stadium, no pasiva base de Queen. Recarga
de Shout y Unstoppable de Rampage se distinguen de los perks opcionales.
Beat no se presenta como limpieza o invulnerabilidad; Beat Drop y Noise
Violation no se confunden con el comportamiento base, ni Accelerando
con velocidad de ataque colectiva. Una prueba unitaria cubre estos limites.

Verificacion: lint, 182 unitarias y dos builds de 194 rutas; 366 pruebas
E2E pasan en escritorio y movil. La suite recorre las 32 composiciones
revisadas, con contenido, FAQ, metadata, canonicals, JSON-LD, enlaces,
imagenes, contraste, ausencia de anuncios y overflow. Se mantiene
noindex y exclusion del sitemap. No son pruebas de una transaccion real.
Capturas en reports/reviewed-compositions, incluyendo lucio y junker-queen.

Revision manual de ambas en 1440x900 y 390x844, retratos cargados y texto
legible, sin solapes observados. FAQ de curacion de heridas y de Beat
abiertas y comprobadas. No hay nuevos errores ni warnings de consola
desde el inicio de esta revision. Viewport restablecido. Preview en
http://127.0.0.1:3012/team-comps/lucio, node PID 6596, snapshot
.next-editorial-built-preview/compositions-rush-2026-10-02. Snapshots
anteriores conservados y separados de los builds de verificacion/E2E.

reports/adsense-local-2026-10-02-rush-final.json recorre 330 rutas conocidas,
todas 200, sin remainingPaths. Sitemap comparado sin altas ni bajas:
105 URLs, 106 indexables y 224 noindex. Queen tiene 1747 palabras y Lucio
1752, sin avisos automaticos; esas cifras no prueban calidad para Google.
Ambas siguen fuera del sitemap, noindex, follow y sin anuncios.

Los avisos generales bajan de 46 a 43; quedan 51 genericas: 38 counters,
12 composiciones y /roles/flex. El tercer aviso menos procede del cambio
en los pares de similitud, no de una tercera reescritura ni una aprobacion.
La mayor similitud de composiciones pasa a Sombra/Wrecking Ball; tambien
queda Baptiste/Illari. No se modifica ningun umbral para producir la mejora.

Referencias internas: fichas oficiales actuales de Junker Queen y Lucio,
https://overwatch.blizzard.com/en-us/heroes/junker-queen/ y
https://overwatch.blizzard.com/en-gb/heroes/lucio/, mas el articulo oficial
de presentacion de Queen (news/23820711) para el funcionamiento de Gracie.
Las aperturas directas de las fichas devuelven error; se contrastan
extractos oficiales indexados. No se atribuye lectura a cuerpos
inaccesibles ni se trasladan poderes de Stadium o reglas de Community
Crafted al kit de ranked. No se introducen valores numericos de balance
ni apartados artificiales de fuentes en las paginas publicas.

El objetivo completo sigue activo: falta revisar el resto del inventario,
terminar el registro de aprobacion individual y comprobar la publicacion
y rastreo reales. Tambien siguen pendientes identidad legal real y CMP
certificada antes de activar anuncios. No hubo cambios en pagos, cobros,
commit, push, deploy, solicitud de AdSense ni activacion publicitaria.

## Undecimo lote: Sombra, Wrecking Ball, Baptiste e Illari

Cuatro articulos propios sustituyen las fichas genericas. Sombra coordina
Hack y EMP con un objetivo al que el equipo llegue; Ball prepara el
seguimiento de Piledriver sin abandonar a los supports; Baptiste comprueba
curacion, municion y rotacion antes de Lamp o Window; Illari coloca Pylon
para la pelea actual y prepara seguimiento para Captive Sun. Cada pagina
tiene dos lineups 5v5, uno 6v6, responsabilidades, limites, ejemplos,
checklist, FAQ y enlaces diferentes. Se mantienen las rutas existentes.

La revision de Sombra corresponde al DPS disponible el 2 de octubre, no
al rework de Support anunciado para Season 5 el 6 de octubre. Ese limite
aparece al comienzo y en la FAQ. Encrypted Upload no se presenta como
Hack invisible por defecto. La transferencia de vida temporal de Ball
se distingue de Adaptive Barrier; las minas detonadas a mano pertenecen
a Community Crafted, no al kit base. Lamp no limpia anticuracion y el
dash horizontal de Rocket Boots es opcional. Solar Flare y Sunburn no
se confunden con habilidades base de Illari. No se usan cifras de balance
innecesarias ni experiencia personal inventada.

Lint, 184 pruebas unitarias y los builds de verificacion y E2E pasan.
La primera suite E2E termina con 367 aprobadas y siete timeouts, incluidos
setup de request y cierre de contextos. Se conservan sus informes en
reports/playwright-dive-sustain-first-run y
reports/test-results-dive-sustain-first-run. Se limita Playwright a dos
workers para no saturar el escritorio durante las capturas completas;
no se amplian timeouts, se habilitan retries ni se retira ningun control.
La repeticion completa termina con 374 pruebas aprobadas en 6,6 minutos,
sin retries. Incluye las 36 composiciones revisadas en movil y escritorio,
FAQ, metadata, JSON-LD, imagenes, contraste, enlaces internos, noindex,
exclusion del sitemap y ausencia de anuncios. Lint y las 184 unitarias
se repiten al final y pasan. git diff --check termina sin errores;
los avisos de conversion LF/CRLF no son fallos de contenido.

Revision manual de las cuatro paginas en 1440x900 y 390x844, con retratos
cargados y sin overflow observado. FAQ comprobadas: version DPS de
Sombra, barrera/minas de Ball, Lamp y detonacion de Captive Sun. Sin
nuevos errores o warnings de consola desde el inicio de la revision.
Viewport restablecido. Preview en http://127.0.0.1:3012/team-comps/illari,
snapshot .next-editorial-built-preview/compositions-dive-sustain-2026-10-02,
PID 11048. El snapshot previo se conserva, separado del build de E2E.

reports/adsense-local-2026-10-02-dive-sustain-final.json recorre 330 rutas
conocidas, todas 200, sin remainingPaths. Sitemap comparado sin altas ni
bajas: 105 URLs, 106 indexables y 224 noindex. Baptiste tiene 1666 palabras,
Illari 1712, Sombra 1752 y Ball 1727; ninguna tiene avisos automaticos.
Estas cifras no prueban calidad ni cumplen un supuesto minimo de Google.
Las cuatro siguen noindex, follow, fuera del sitemap y sin anuncios.
Los avisos pasan de 43 a 39 y quedan 47 genericas: 38 counters, ocho
composiciones y /roles/flex. Pendiente de revision no significa aprobada.

Referencias internas contrastadas mediante extractos oficiales indexados:

- https://overwatch.blizzard.com/en-us/heroes/sombra/?t=1
- https://overwatch.blizzard.com/en-gb/heroes/wrecking-ball/
- https://overwatch.blizzard.com/en-gb/heroes/baptiste/
- https://overwatch.blizzard.com/en-gb/heroes/illari/
- https://overwatch.blizzard.com/en-gb/news/24294376/

Las aperturas directas de Sombra, Ball y la noticia fallan; no se atribuye
lectura a cuerpos inaccesibles. Se evitan valores disputados de Regenerative
Burst. No se copian reglas de Stadium o Community Crafted al ranked.
Las recomendaciones tacticas son condicionales, no una tier list demostrada.

Politicas de Google consultadas de nuevo el 2 de octubre:
https://support.google.com/adsense/answer/7299563?hl=es y
https://support.google.com/publisherpolicies/answer/11112688?hl=es.
Exigen utilidad, originalidad y navegacion; no establecen que nuestros
umbrales, el noindex o una suite verde garanticen aprobar todo el sitio.

El objetivo sigue incompleto: faltan los articulos restantes, revision
individual de indexables, hubs, filtros y perfiles, registro de aprobacion,
identidad legal real, CMP antes de activar anuncios y comprobacion en
produccion/Search Console. No se han realizado cobros, commit, push,
deploy, solicitud de AdSense ni activacion publicitaria.

La comprobacion HTTP de perfiles no certifica Stripe: el preview local
sigue registrando StripeAuthenticationError al consultar estados de
cuentas. No se cambian claves ni se intentan transacciones para este lote.

## Duodecimo lote: Brigitte, Zenyatta, Juno y Echo

Revision individual del 2 de octubre de 2026. Se sustituyen las cuatro
fichas genericas por propuestas con dos equipos 5v5 y uno 6v6, responsabilidades,
rotaciones, limites, ejemplos de decisiones, checklist y FAQ propias.
Hay 40 registros revisados en reviewed-team-compositions.ts. Las cuatro
rutas conservan noindex, follow, exclusion del sitemap y ausencia de anuncios;
la reescritura no equivale a una aprobacion automatica de indexacion.

Brigitte distingue proteger a Ana o Zenyatta de seguir al Tank, explica
el coste de gastar packs antes del dive y no atribuye invulnerabilidad a
Rally. Inspiring Strike se identifica como perk, no como Bash base.
Zenyatta trata objetivos accesibles de Discord, la siguiente exposicion
que necesita Harmony y la rotacion anticipada; Transcendence no limpia
anticuracion ni hace invulnerable al grupo. Dual Harmony y Ascendance
son elecciones opcionales y Flying Kick no se copia de Stadium.

Juno coloca Hyper Ring en una ruta compartida y comprueba la curacion
despues del cruce. La vida temporal de Hyper-Healer y el rayo que sigue
a Juno con Stellar Focus pertenecen a Stadium. Lift Off y Faster Blaster
se distinguen del kit base. Echo prepara un angulo curable, conserva
salida cuando las bombas fallan y elige Duplicate por utilidad inmediata;
Partial Scan y Focused Rush no se presentan como comportamiento por defecto.
No se inventan cifras de balance, partidas reales ni experiencia personal.

Referencias internas consultadas mediante extractos oficiales indexados:

- https://overwatch.blizzard.com/en-us/heroes/brigitte/
- https://overwatch.blizzard.com/en-gb/heroes/zenyatta/
- https://overwatch.blizzard.com/en-gb/heroes/juno/
- https://overwatch.blizzard.com/en-us/heroes/echo/

Las cuatro aperturas directas devuelven 403; no se atribuye lectura a
cuerpos inaccesibles. Se descartan resultados de reglas antiguas,
Community Crafted y Stadium cuando no corresponden a ranked. Los equipos
son propuestas condicionales, no una afirmacion de meta comprobado.

Revision manual en navegador interno de home y las cuatro paginas, con
1440x900 y 390x844. Retratos visibles, sin solapes observados y FAQ abiertas
para Rally, Transcendence, Orbital Ray y Duplicate. Sin nuevos errores o
warnings de consola durante la revision. Se restablece el viewport.
Captura movil de Juno guardada por E2E e inspeccionada visualmente.
Preview aislado: .next-editorial-built-preview/compositions-peel-air-2026-10-02,
http://127.0.0.1:3012, PID 27296. No se comparte salida con los builds E2E.

reports/adsense-local-2026-10-02-peel-air-final.json recorre 330 rutas
conocidas, todas 200, sin remainingPaths. Comparacion del sitemap sin
altas ni bajas: 105 URLs, 106 indexables y 224 noindex. Las cuatro paginas
tienen un H1, canonical correcto, tres bloques JSON-LD y ningun aviso
automatico. Brigitte tiene 1675 palabras, Zenyatta 1645, Juno 1660 y Echo
1708. El recuento no certifica calidad ni constituye un requisito de Google.

Quedan 43 fichas genericas: 38 counters, cuatro composiciones (Junkrat,
Orisa, Ramattra y Roadhog) y /roles/flex. Los avisos pasan de 39 a 36;
las categorias automaticas no sustituyen la revision individual pendiente
de las paginas indexables, hubs, filtros y perfiles.

La ejecucion completa npm.cmd run verify termina con exit code 0:
lint, 186 pruebas unitarias, build de verificacion, build E2E y 382 pruebas
Playwright aprobadas en 6,4 minutos, sin retries. Incluye las 40 composiciones
revisadas en escritorio y movil, enlaces, imagenes, FAQ, contraste,
metadata, schema, noindex y ausencia de anuncios. git diff --check termina sin errores,
con avisos de conversion LF/CRLF. El preview conserva el error local
StripeAuthenticationError; no se certifican cobros ni se cambian claves.
El objetivo sigue activo: faltan revision editorial restante, registro de
aprobacion, identidad legal real, CMP antes de activar anuncios y pruebas
en produccion/Search Console. Sin commit, push, deploy, solicitud de AdSense
ni activacion publicitaria.

## Decimotercer lote: Junkrat, Orisa, Ramattra y Roadhog

Revision individual del 2 de octubre de 2026. Se completan las cuatro
composiciones que seguian genericas en el inventario conocido. Hay 44
registros revisados; las diez composiciones pilar originales requieren
todavia su auditoria individual. No se confunde terminar estas fichas
con aprobar todo el bloque de composiciones o el sitio para AdSense.

Junkrat explica cambios de ruta, segundo rango de dano, minas para salir,
trampas vigilables y seguimiento de Tire. Mine Recycling no se presenta
como reset por defecto y Rip Roll no se copia de Stadium a ranked.
Orisa distribuye frente, lateral y peel entre los roles; Protective
Barrier reemplaza Spin, no suma ambos recursos. Fortify no se atribuye
a todo el equipo y Terra Surge no garantiza un encierro sin respuesta.

Ramattra prepara el cruce en forma omnica, transforma a distancia util
y distingue presion con Pummel de defensa frontal con Block. Nanite Repair
es opcional y no se presenta Vortex como curacion base o limpieza.
Roadhog conserva explicitamente el limite temporal: revision anterior
al rework de Season 5 anunciado para el 6 de octubre. Se trabaja
seguimiento del hook, retirada a cobertura y control con Whole Hog.
No se adelantan modos de disparo, Pig Pen, perks de lanzamiento ni cifras
del rework. Tampoco se promete una baja por conectar Hook o limpieza
de anticuracion con Breather.

Cada pagina tiene dos propuestas 5v5 y una 6v6, limites y sustituciones
razonadas, responsabilidades, ejemplos ilustrativos, checklist y FAQ.
No se inventa experiencia personal ni se presenta ninguna propuesta
como composicion de meta demostrada. Las cuatro conservan noindex,
follow, exclusion del sitemap y ausencia de anuncios.

Referencias internas mediante extractos oficiales indexados:

- https://overwatch.blizzard.com/en-us/heroes/junkrat/
- https://overwatch.blizzard.com/en-gb/heroes/orisa/
- https://overwatch.blizzard.com/en-us/heroes/ramattra/
- https://overwatch.blizzard.com/en-us/heroes/roadhog/
- https://overwatch.blizzard.com/en-gb/news/24294376/

Las aperturas directas de las cuatro fichas devuelven 403; no se declara
lectura de cuerpos inaccesibles. La ficha indexada de Hog muestra
mecanicas que no deben tratarse como kit live previo al rework.
Se evita resolver esa discrepancia inventando detalles. Los resultados
de Community Crafted, Stadium y Experimental no justifican habilidades
base. No se publican cifras de balance de versiones dudosas.

Revision manual en 1440x900 y 390x844: home y las cuatro paginas, retratos
cargados, sin solapes observados. FAQ abiertas para Tire, Protective
Barrier, Nanite Repair y fecha del rework de Hog. Se corrige una frase
imprecisa de Orisa sobre una barra de recursos; se reconstruye el snapshot
y se comprueba la redaccion corregida en ambos tamanos. Sin nuevos
errores o warnings de consola durante la revision; viewport restablecido.

Preview final en http://127.0.0.1:3012/team-comps/orisa, snapshot
.next-editorial-built-preview/compositions-corner-copy-final-2026-10-02,
PID 33244. Se conservan los snapshots anteriores y el build E2E permanece
separado del preview. La auditoria previa a la ultima correccion tambien
se conserva en reports/adsense-local-2026-10-02-corner-final.json.

La auditoria final reports/adsense-local-2026-10-02-corner-copy-final.json
recorre 330 rutas conocidas, todas 200, sin remainingPaths. El sitemap se
compara con el lote anterior sin altas ni bajas: 105 URLs, 106 indexables
y 224 noindex. Las cuatro tienen un H1, canonical correcto y tres bloques
JSON-LD, sin avisos automaticos. Junkrat tiene 1674 palabras, Orisa 1651,
Ramattra 1655 y Hog 1730; no se trata el recuento como certificado de calidad.

Quedan 39 genericas: 38 counters y /roles/flex. Ninguna composicion
permanece en esa categoria automatica. Los avisos pasan de 36 a 34,
principalmente por dejar de repetir contenido entre Orisa y Hog.
Siguen pendientes la revision individual de indexables, hubs, filtros
y perfiles y un registro de aprobacion que no dependa solo del slug.

Lint y 189 unitarias pasan; el build final, posterior a la correccion
de Orisa, termina correctamente. La suite E2E completa termina con
390 pruebas aprobadas en 6,2 minutos, sin reintentos y con exit 0.
Su snapshot inicial precede a esa correccion de una frase, verificada
despues en el build final y el navegador interno.
El preview conserva StripeAuthenticationError al consultar cuentas:
esta comprobacion HTTP no certifica pagos. Sin cambios de claves,
cobros, commit, push, deploy, activacion de anuncios o solicitud de AdSense.

El problema de fechas detectado al cerrar este lote se resuelve en la
siguiente comprobacion, sin inventar fechas historicas.

## Fechas de composiciones: publicacion y revision independientes

TeamCompPillar admite publishedDate por separado. Article deja de usar
schemaDate como datePublished y ya no tiene una fecha historica por
defecto. Cuando no existe evidencia de la primera publicacion, JSON-LD
omite ese dato, en lugar de afirmar que la revision acaba de crear la
pagina. No se asigna una fecha de lanzamiento a partir de un commit.

Se conserva dateModified con el dato conocido de revision. Shion, Ana
y Genji pasan a declarar explicitamente 2026-06-28, que coincide con la
fecha visible que ya tenian; no reciben una revision editorial ficticia.
Las otras composiciones conservan tambien su fecha real registrada.
La cabecera usa time con datetime para que la fecha visible y Article
se puedan contrastar. El sitemap consulta schemaDate de la composicion
igual que ya hacia con counters, sin ampliar ni reducir las URLs.

Las pruebas de las 44 fichas revisadas comprueban la ausencia de una
fecha de publicacion inventada y la coincidencia de fecha visible con
schema. Otra prueba recorre las diez composiciones indexables existentes
y compara Article, time y lastmod. Ninguna prueba de fechas certifica
el contenido de esas diez fichas: su revision individual sigue pendiente.

Referencias tecnicas revisadas el 2 de octubre:

- https://developers.google.com/search/docs/appearance/structured-data/article
- https://support.google.com/adsense/answer/7299563?hl=es
- https://support.google.com/publisherpolicies/answer/11112688?hl=es

Google documenta datePublished como dato recomendado cuando aplica,
no como motivo para rellenar una fecha desconocida. Sus criterios de
valor y navegacion no se convierten en un minimo de palabras propio.

Preview aislado de .next-verify en
.next-editorial-built-preview/composition-dates-2026-10-02, PID 28272,
http://127.0.0.1:3012. Se conservan los snapshots anteriores. Revision
manual de Orisa en escritorio y movil, FAQ abierta y schema inspeccionado;
tambien se comprueba home en movil y la fecha antigua de Shion en
escritorio. Sin overflow observado ni anuncios, sin errores nuevos de
consola. Viewport restablecido y tab conservada para continuar.

reports/adsense-local-2026-10-02-composition-dates.json repite las 330
rutas conocidas, 159 del manifiesto, sin cola pendiente. Todas responden
200. Siguen 105 URLs del sitemap, 106 indexables y 224 noindex. Sin
altas ni bajas frente al informe previo. Hay 34 URLs con avisos y 39
genericas (38 counters y Flex); el cambio de fechas no borra sus problemas.

Lint y 190 unitarias pasan. El build de comprobacion termina correctamente.
La suite completa aprueba sus 390 casos en 5,9 minutos, sin reintentos.
La prueba de fechas, incorporada despues de arrancar esa suite, se ejecuta
por separado y aprueba ambos proyectos (dos casos en 23,4 segundos).
Ambos comandos terminan con exit 0. No se han activado anuncios,
publicado cambios, pedido una
revision de AdSense ni realizado transacciones. Siguen pendientes los
datos reales del titular, el CMP certificado antes de servir publicidad
y la auditoria editorial del contenido indexable. El error local de
autenticacion al consultar cuentas Stripe sigue observado; estas pruebas
no acreditan cobros ni una configuracion de produccion de Stripe.
