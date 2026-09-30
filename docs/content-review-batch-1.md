# Revision de contenido: primer lote

Revision editorial: 30 de septiembre de 2026. Verificacion final: 1 de octubre de 2026.

## Contenido revisado

Se han escrito ocho articulos independientes para Orisa, Doomfist, Sigma, Ashe,
Sojourn, Baptiste, Mercy y Moira. Cada uno incluye una respuesta inicial,
decisiones de partida, ejemplos por mapa, errores, preguntas para revisar una
VOD, FAQ y enlaces relacionados. No se atribuye experiencia personal inventada.

Las revisiones viven en `src/lib/reviewed-guide-revisions.ts`; no se han alterado
registros de produccion. Se conserva la fecha de publicacion original. La autoria
del nuevo texto es Replaid Lab y la fecha de revision es la real del lote.

Cada antigua guia de video redirige con HTTP 308 a su correspondiente articulo.
Se conserva el video original y su creador, sin atribuirle el texto nuevo.
Las 16 rutas originales quedan atendidas por ocho articulos, no por redirecciones
genericas al hub. La politica y las pruebas enumeran los ocho pares concretos.

## Navegacion y metadatos

- `/guides`, sus filtros y los archivos por tema utilizan la misma seleccion.
- Los filtros ya no vuelven a promocionar plantillas pendientes de revision.
- Las consultas en mayusculas funcionan como las consultas en minusculas.
- Cinco guias de fundamentos tienen descripciones propias, sin la coletilla
  generica sobre checklist y enlaces internos. Sus cuerpos no se han reescrito
  en este lote ni se han cambiado sus fechas de revision.
- `/counters` muestra los once enlaces que declara su ItemList.
- El manifiesto de politica no importa los cuerpos de los articulos en cliente.

Los ocho articulos siguen accesibles con `noindex, follow`, fuera del sitemap y
sin anuncios. Su disponibilidad para lectores no implica autorizacion automatica
para indexarlos ni monetizarlos. No se han cambiado pagos, perfiles ni areas
privadas, ni se han realizado transacciones de prueba.

## Verificacion

- Lint superado.
- 141 pruebas unitarias superadas, incluidas originalidad entre los nuevos
  textos, politica, videos y descubrimiento.
- Build de produccion superado durante la preparacion de Playwright.
- 34 pruebas de navegador superadas en escritorio y movil: los ocho articulos,
  redirecciones, filtros, enlaces internos, schema, ausencia de anuncios y
  muestras de home, Shion, Ana ranked, roles, counters, expertos y privacidad.
- Comprobacion visual en navegador interno: fondo oscuro, sin pantalla blanca
  ni desbordamiento horizontal en la muestra de Orisa.
- Sitemap local comparado con la linea base: 105 URLs, ninguna anadida o retirada.

La suite ignora unicamente el aviso de Permissions Policy de compute-pressure
emitido desde el iframe de YouTube. Los demas errores de consola y pagina siguen
siendo fallos. No se afirma haber probado cada servicio externo ni el cobro real.

Una cache de fetch local antigua ocultaba dos URLs validas del sitemap. Se
preservo en `reports/fetch-cache-before-guide-review` y se reinicio solamente
el servidor de prueba creado para este lote. La comprobacion con cache renovada
coincide con las 105 URLs de la linea base. Los reportes son locales e ignorados
por Git; no deben publicarse porque pueden contener respuestas cacheadas.

## Pendiente

Este lote atiende 16 de las 59 rutas cortas detectadas originalmente. Quedan
43 de aquellas rutas y las dos guias de rol que requieren revision separada.
Tambien queda revisar las parejas de composiciones similares, actualidad
caducada y el resto de las prioridades del diagnostico inicial.

La seleccion de navegacion no sustituye la mejora del contenido que permanece
accesible directamente. El quality gate general aun necesita controles
editoriales adicionales para el contenido que no se ha revisado aqui.

No se ha hecho push ni se ha solicitado otra revision de AdSense. Este lote no
certifica la calidad de todo el sitio ni garantiza aprobacion.
