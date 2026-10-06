# Revision del directorio de heroes - 4 de octubre de 2026

Ruta /heroes conservada. Esta revision no certifica los destinos enlazados.

## Lectura inicial y cambios

Codigo y main anterior leidos completos. Detectados catalogo despues de FAQ
y explicaciones de uso, promesa de mejores picks sin tier list, y confusion de
subroles oficiales con dive/poke/brawl. ItemList enumeraba doce fichas mientras
el catalogo mostraba 54 heroes con destinos directos o filtros de guias.

Contraste oficial: resultado de busqueda completo de Weekly Recall: Sub-Role
Call, https://overwatch.blizzard.com/en-gb/news/24243646/, consultado 4 octubre.
Open devuelve 403. Subroles con pasivas compartidas distintos de estilos de
composicion; se evitan valores de parches antiguos. Doctrine se mantiene como
preview del trial terminado, sin afirmar disponibilidad de lanzamiento.

Catalogo de tres roles primero, recursos y FAQ despues. Se conservan 54
tarjetas, retratos, destinos y enlaces relacionados. Textos propios breves,
ejemplos de altura/seguimiento y criterios de swap; sin experiencia personal
inventada, fuentes artificiales o instrucciones internas visibles.

CSS encapsulado, tamanos estables, foco y enlaces tactiles. ItemList coincide
con nombres, orden y destinos de todas las tarjetas visibles; CollectionPage
con fecha real, no Article ficticio. Canonical base y noindex de queries con
role conservados. Fecha sitemap /heroes fijada al cambio real; ningun alta o
baja de URL prevista. No anuncios, APIs, cuentas o pagos modificados.

Un build limpio descubre seis enlaces literales de AppNav que incumplen la
regla de Next y no aparecian en lint con cache. Reproducido con --no-cache.
Cambios limitados a esos enlaces publicos: Link y prefetch=false, destinos
conservados. Panel, perfil, Discord y logout no cambian. Prueba unitaria de
destinos por rol; no equivale a una sesion privada autenticada. verify ahora
ejecuta lint sin cache. No se desactiva ninguna regla.

## Fallos encontrados y correcciones comprobadas

Lectura del main nuevo completa, incluidas las cuatro FAQ. Inspeccion visual
1280x720 y 390x844. La navegacion manual descubre un fallo real: un anchor
nativo cambia URL pero deja el estado de Next desincronizado al abrir Ana y
volver; permanece main de Ana bajo /heroes#support. Logs de ese servidor sin
errores. Cambiados anchors de rol a Link, como en el renderer de heroes ya
corregido; reforzada la prueba de back para verificar main, no solo URL.
La correccion se ha comprobado en un build posterior. La primera suite no
certifica ese cambio posterior.

Primera suite: 343 unitarios, build y 692 Playwright correctos, cuatro fallos
en 10.5 min. Dos reproducen back con main antiguo; dos son la expectativa de
un meta robots que antes no existia (ausencia no implica noindex). Ahora se
declara index/follow explicitamente en la base, sin cambiar la politica de
queries. Evidencia previa archivada en
reports/verification-heroes-index-first-pass-2026-10-04. No se eliminan tests
ni se introduce retry para ocultar fallos.

QA del build corregido confirma back al main del catalogo con #support.
Axe detecta contraste insuficiente en los cuatro parrafos de FAQ: 4.29:1,
#7a7a7a sobre #141414. Override local --text2 en main a #b3b3b3; no cambio de
paleta global. Prueba browser de contraste sobre color/background efectivos.
En el preview final de puerto 3015, axe 4.12.1 WCAG 2 A/AA limitado a main
da cero infracciones, diez comprobaciones correctas y cero incompletas.
Informe reports/heroes-index-final-axe.json. No equivale a accesibilidad
perfecta de todos los documentos o areas privadas.

Suite intermedia: lint, 344 unitarios en 36 ficheros, build y 696 Playwright
correctos en 9.9 min, sin retries. Archivada en
reports/verification-heroes-index-pre-contrast-2026-10-04. Su build y los
tests ya cargados eran anteriores al ultimo override de contraste y a su
assertion nueva. No se usa esa suite como certificado de la version final.

Lectura completa del main nuevo, cuatro FAQ incluidas. QA del preview final
http://127.0.0.1:3015/heroes en navegador interno, dimensiones reales 1280x720
y 390x844. Cabecera, retratos Support y PREVIEW de Doctrine sin recortes;
FAQ releidas e inspeccionadas en movil. Clicks reales Support -> Ana -> back
y DPS -> filtro Sierra -> back, en ambos tamanos: URL y main del catalogo
restaurados, sin pantalla antigua bajo otra ruta. Console error/warn vacia
en los recorridos comprobados. No se afirma haber probado una sesion privada.

Rastreo final reports/adsense-local-2026-10-04-heroes-index-final.json:
330 respuestas HTTP 200, 104 URLs sitemap, 105 respuestas indexables incluidas
variantes canonical y 225 noindex. Las 159 rutas del manifiesto quedan
cubiertas. Ningun alta o baja de URL frente al lote Doctrine; solo cambia
lastmod de /heroes. /heroes tiene un H1, index/follow explicito, canonical
correcto, 54 imagenes con alt y schema coincidente. Los avisos automaticos
de extension en /news y /counters siguen pendientes de lectura, no se rellenan
para superar un contador. Las clasificaciones automaticas no certifican ni
invalidan la revision manual.

Suite completa final: lint --no-cache, 344 unitarios en 36 ficheros, build y
696 Playwright desktop/movil correctos en 10.0 min, retries=0. TypeScript sin
errores y git diff --check correcto. Codigo de aplicacion y assertions de
contraste sin cambios durante la ejecucion. Evidencia archivada en
reports/verification-heroes-index-2026-10-04.

Inspeccion de capturas encuentra un problema de evidencia: la captura con
nombre support-desktop mostraba la cabecera/Tank porque se tomo antes de
terminar el scroll de Link. No se usa como prueba visual de Support. El
recorrido manual posterior confirma Support a y=75.7 en movil, sin error de
navegacion. Despues de archivar la suite completa, se refuerzan solo las
pruebas: esperar heading de Support y DPS in viewport antes de continuar o
capturar. No se anade sleep ni retry; el codigo servido no cambia. Nueva
ejecucion focalizada: ocho casos desktop/movil correctos en 43.0 s, build
limpio y retries=0. Capturas de Support ahora muestran su titulo y retratos,
inspeccionadas en ambos tamanos; cabeceras tambien comprobadas. Lint sin
cache repetido despues del cambio de pruebas, correcto. Evidencia adicional
en reports/verification-heroes-index-2026-10-04/anchor-position. La suite
completa anterior sigue separada, no se presenta como ejecutada despues del
ultimo cambio de assertions.

Lote del directorio cerrado localmente. Preview final conserva puerto 3015;
viewport temporal restablecido, pestaña de escritorio temporal cerrada y
navegador CLI cerrado. No push, deploy, solicitud de revision de Google,
activacion de anuncios ni compras. Siguen pendientes otras paginas, datos
reales del titular y CMP certificado; no declarar el sitio listo por este lote.

El error log del preview final registra cuatro StripeAuthenticationError al
consultar el estado de cuentas conectadas durante el rastreo de expertos.
Es comprobacion local de configuracion pendiente, no prueba de cuentas de
expertos mal configuradas ni de un fallo confirmado en produccion. No se
imprimen claves, se modifican cuentas ni se ejecutan pagos para resolverlo.
Las pruebas de navegacion y auth anonima no certifican el checkout autenticado.

Pruebas unitarias de metadata, queries, orden/schema y texto. Playwright de
catalogo completo, 54 imagenes, enlaces, anchors/back, contraste FAQ y movil.
No se registra una aprobacion de los destinos enlazados por comprobar el
directorio; tampoco se aprueba AdSense por escribir tests o recibir HTTP 200.
