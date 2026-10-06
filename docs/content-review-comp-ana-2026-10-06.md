# Revision individual de la composicion de Ana

Estado: contenido reescrito, leido en navegador y verificacion final cerrada.

## Alcance

Solo `/team-comps/ana`. No se crean rutas ni se cambian pagos, marketplace,
anuncios, perfiles o las otras composiciones. Autoria Replaid Lab; no se
inventa experiencia personal, una fecha de primera publicacion ni haber
contrastado todo el ultimo parche. Revision real del texto: 2026-10-06.

Se mantienen dos equipos 5v5 y uno 6v6. La revision concreta contempla:
vision del aterrizaje, peel durante el salto, Nano sin esperar siempre Blade,
granada defensiva, pared aliada de Mei, perdida de velocidad al sustituir
Lucio y reparto de tareas entre Winston y D.Va. Matrix se describe contra
proyectiles enemigos, no como proteccion de utilidad aliada ni de todo dano.

Los ejemplos son situaciones hipoteticas de ranked, no partidas observadas.
Gibraltar, Numbani y King's Row dan contexto a las rutas; cinco preguntas
de VOD y seis FAQ complementan las decisiones sin prometer victorias.

## Contraste privado

Consulta oficial indexada el 2026-10-06:
- https://overwatch.blizzard.com/en-us/heroes/ana/?mobile-app=true&theme=false
- https://overwatch.blizzard.com/en-gb/heroes/ana/
- https://overwatch.blizzard.com/en-us/heroes/dva/?source=post_page---------------------------
- https://overwatch.blizzard.com/es-mx/heroes/kiriko/

Ana cura a aliados con el rifle; granada mejora curacion aliada y niega
curacion enemiga; Nano aumenta dano y reduce dano recibido. Matrix bloquea
proyectiles delante de D.Va. Swift Step de Kiriko requiere aliado y Suzu
limpia la mayoria de efectos, no cualquiera. No se usan cifras historicas
ni se trasladan poderes de Stadium al kit normal. Las aperturas oficiales
en-us sin parametros devolvieron 403: el contraste utiliza el contenido
oficial indexado, no una prueba in-game ni un bypass de acceso.

Las recomendaciones de composicion y tradeoffs son analisis propios,
condicionados a acceso, salud, cooldowns y posicion; no una tier list
oficial ni una conclusion sobre todo el balance actual.

## Publicacion

Contenido renderizado completo leido en el navegador interno, incluidas las
seis FAQ abiertas. Segunda lectura del plan de retirada cambia una frase
forzada por "salid y reagrupaos". Cabecera 1440x900 y 412x915, lineup y FAQ
movil revisados visualmente: sin solapes, imagen cargada y un H1.
Navegacion real al enlace de Gibraltar y regreso a Ana comprobados.
Consola sin errores; nueve destinos relacionados HTTP 200 en las pruebas.
Dos pruebas focalizadas desktop/movil correctas antes de registrar la
revision. La suite final debe confirmar metadata, sitemap y regresiones.

Revision exacta registrada:
`8b72d504f8b6ec22e3d515e503700418bccfba996a67f85f7de11f87c20d854a`.
Solo esta composicion vuelve al sitemap; cualquier cambio de su objeto
invalida la aprobacion. Los otros textos no quedan aprobados por similitud,
longitud ni por los tests de esta pagina. AdSense sigue bloqueado; el gate
devuelve index_no_ads incluso con esta revision valida. No se certifican
CMP, compras reales, todo el sitio ni aprobacion de Google.

## Verificacion final

`npm.cmd run verify`: lint sin cache, 375 unitarios, build aislado con
TypeScript y 730 Playwright desktop/movil correctos, sin retries (10.1 min).
La primera ejecucion se detuvo en un test que esperaba la revision antigua
de Ana; se conserva la expectativa de Shion/Genji y se comprueba la fecha
real nueva de Ana sin inventar datePublished. Se repitio la suite completa.
Informes y capturas: `reports/verification-comp-ana-2026-10-06-final` y
`reports/ana-composition`. La frase final de retirada se leyo nuevamente
en el navegador sobre el build final. Sin errores de consola ni anuncios.

Rastreo final: `reports/adsense-local-comp-ana-2026-10-06.json`.
330 URLs HTTP 200; 159 rutas de manifiesto cubiertas y cola agotada.
107 URLs en sitemap, 108 indexables, 222 noindex. Frente al ultimo deploy,
solo Ana cambia description, robots, contenido y pertenencia al sitemap.
No desaparece ninguna URL ni contenido. Los dos avisos de longitud de los
hubs /counters y /news son heuristicas propias, no requisitos de Google.

El preview conserva errores StripeAuthenticationError al consultar cuentas
conectadas, ya presentes en el lote anterior. No se ha tocado el sistema
de pagos ni se certifican transacciones reales por pasar controles anonimos.

Quedan siete composiciones originales y las 44 reescritas sin aprobacion
individual; Kiriko es el siguiente texto identificado. El rastreo y los
tests de esas paginas no equivalen a aprobar su calidad editorial.
