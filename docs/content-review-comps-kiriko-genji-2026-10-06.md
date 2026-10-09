# Revision individual de composiciones: Kiriko y Genji

Estado: redaccion, contraste, lectura renderizada, QA manual y suite final
completados. Publicacion retomada el 2026-10-09 tras una interrupcion.
La fecha de revision del contenido sigue siendo 2026-10-06, no la del push.

## Alcance y limites

Solo `/team-comps/kiriko` y `/team-comps/genji`. Se mantienen sus rutas,
tres equipos y navegacion. Dos equipos 5v5 y uno 6v6 por articulo; no se
tocan pagos, marketplace, datos, anuncios ni otras composiciones.
Autoria Replaid Lab; revision real 2026-10-06. No se inventa datePublished
ni se afirma haber revisado todo el parche actual. No se crea contenido
para nuevas URLs. Cada version se aprueba por separado, no por extension.

## Kiriko

Se elimina la falsa salida inmediata despues de teleport. Se explica la
diferencia entre conservarlo para volver y gastarlo para entrar, la cobertura
del destino y el riesgo de que Winston abandone la plataforma. Suzu puede
evitar una muerte por dano normal, no solo limpiar una granada futura.
Kitsune necesita una ruta aprovechable y no reinicia todos los cooldowns.
Ana, Brig y Lucio no son intercambiables sin cambiar curacion, peel o velocidad.

Ejemplos propios de Dorado, Control Center y Gibraltar en 6v6; seis FAQ,
cinco preguntas de VOD e introduccion y conclusion especificas. No se
atribuyen partidas observadas ni victorias garantizadas. La sustitucion
Sombra DPS se reemplaza por Echo con su tradeoff, sin adivinar el rework.

Version: `0ea898318cef4660eaa2cec30c37d6f45c7e2af4e3ad74b205f6a80ddb6f5de4`.

## Genji

Se elimina la secuencia rigida que garantizaba forzar Sleep, Suzu y reset.
Dash requiere una eliminacion para el reset normal; dano o vida baja no
bastan. Se valora cobertura aunque no haya remate, ayuda durante Blade y
las defensivas que siguen presentes aunque Suzu se haya gastado. Deflect
se describe contra proyectiles y melee, no como proteccion universal.

Equipos dive, brawl con Queen/Mei y dos Tanks en 6v6 con funciones distintas.
Ejemplos hipoteticos de Numbani y King's Row y un Dash fallido. Seis FAQ,
cinco preguntas de VOD, introduccion y cierre propios; sin parrafos copiados
de Kiriko o Ana. La alternativa a Tracer es Echo, no un kit futuro de Sombra.

Version: `317b0b928c60df44b061eb200e57d05a8377800e25202ad36ba5f64831c3189e`.

## Contraste privado

Fuentes oficiales indexadas consultadas el 2026-10-06:
- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/en-gb/heroes/kiriko/?mobile-app=true&theme=false%29
- https://overwatch.blizzard.com/es-mx/heroes/kiriko/?mobile-app=true&theme=false%29
- https://overwatch.blizzard.com/fr-fr/heroes/kiriko/
- https://news.blizzard.com/en-us/article/23841483/let-the-kitsune-guide-you-a-first-look-at-kiriko-s-concept-and-playstyle

Las fichas confirman eliminaciones para Swift Strike, proyectiles y bloqueo
melee para Deflect, teleport a aliado, Suzu para la mayoria de efectos y
aceleracion por la ruta de Kitsune. Our Bikes y Fleet Foot son Stadium,
no efectos automaticos del kit normal. No se usan cifras historicas ni
combos de dano garantizados. La apertura es-mx devolvio 403: se usa el
contenido oficial indexado, sin bypass ni prueba in-game fingida.

Las recomendaciones de composicion, posiciones y tradeoffs son analisis
condicionales propios, no una tier list oficial. No hay fuentes artificiales
ni texto de estrategia SEO en las paginas publicas.

## Lectura y QA manual

Lectura de ambos main completos en navegador interno. Doce FAQ abiertas y
leidas. Segunda lectura corrige tres frases: acercarse escalando con Genji,
Winston ya saltando hacia el equipo y el riesgo de morir por dano normal.
Esos cambios finales se releen en un nuevo build aislado.

Cabeceras 1440x900 y 412x915, lineups y FAQ movil inspeccionados: sin solapes,
texto cortado, imagen rota, overflow o publicidad. Un H1 por pagina y consola
sin errores. Navegacion real Kiriko -> Dorado -> atras y Genji -> Numbani ->
atras correctas. Los veinte destinos relacionados devuelven HTTP 200.

Preview de lectura final:
`.next-editorial-built-preview/comps-kiriko-genji-final-2026-10-06`.
22 tests focalizados correctos antes de registrar revisiones. La suite
final comprobara tambien robots, FAQ/Article, sitemap y regresiones.

Solo estas dos versiones pueden volver al sitemap. Ambas siguen sin
anuncios. Quedan cinco composiciones originales y 44 reescritas sin
aprobacion individual. El rastreo o los tests no aprueban su calidad.
AdSense, CMP, Search Console y compras autenticadas no se certifican aqui.

## Verificacion final recuperada

El 6 de octubre se ejecuto `npm.cmd run verify`: lint sin cache correcto,
381 tests unitarios correctos y build aislado completo. El proceso ya no
existe al retomar el trabajo; no se presenta como una espera viva ni se
reinicia solo porque falte el handle. El informe final de Playwright y
test-results/.last-run.json, escritos el 2026-10-06 a las 21:51, confirman
734 casos correctos, cero fallos, flaky o skipped, escritorio y movil.
Se recupera el JSON estructurado del ZIP del informe, no una lectura parcial
del output. Los hashes de contenido siguen coincidiendo con las revisiones.

Rastreo local del build aprobado:
`reports/adsense-local-comps-kg-2026-10-06.json`. Las 330 URLs responden 200,
159 rutas de build cubiertas y cola agotada. Sitemap 109; 110 indexables y
220 noindex. La comparacion con el deploy de Ana solo cambia description,
robots, wordCount e inSitemap de Kiriko y Genji. No se elimina ninguna URL.
Los dos avisos de los hubs son heuristicas, no un minimo de Google.

El entorno local conserva StripeAuthenticationError en consultas de cuentas
conectadas; no se han cambiado credenciales ni pagos y no se certifican
compras reales. Push, deploy y revision de AdSense son acciones distintas.
