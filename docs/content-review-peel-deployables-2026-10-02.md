# Revision de peel, hook y desplegables

Fecha: 2 de octubre de 2026. El objetivo de preparar el sitio para AdSense
sigue activo. Este lote no acredita aprobacion de Google ni calidad de toda
la web. No se efectua commit, push, deploy o solicitud de revision.

## Contenido revisado

Se sustituyen cuatro fichas genericas por analisis individuales:

- Brigitte: dividir el peel con dos angulos, apoyar el dive sobre el segundo
  Support, leer Whip Shot y Bash, y decidir si toca ceder durante Rally.
  Se corrige durante la lectura una recomendacion imposible: Repair Pack
  no puede dirigirse a la propia Brigitte en el kit normal de ranked.
- Roadhog: identificar el seguimiento del hook, preparar el cruce despues
  de un fallo y coordinar anticuracion, Wraith o Suzu con el equipo. El
  rework de Season 5 se presenta como pendiente, no como kit ya disponible.
  No se inventan combos de lanzamiento ni valores de dano.
- Symmetra: limpiar el acceso antes del engage, vigilar a quienes ya han
  cruzado el TP y revisar las lineas cortadas por Photon Barrier. Sentry
  Capacity, Perfect Alignment, Shield Battery y Hovering Barrier se
  distinguen de las habilidades base.
- Torbjorn: coordinar la limpieza de la torreta con el flanker, evitar
  prolongar el duelo durante Overload y preparar otra ruta ante Molten
  Core. Anchor Bolts, Overloaded Turret y Pre-Heated son opciones de perk.
  Matrix no elimina los charcos que ya estan colocados en el suelo.

Cada articulo conserva su URL, retrato y enlaces relacionados. Los ejemplos
de mapas son situaciones editoriales posibles, no partidas personales ni
pruebas de rendimiento. Autor: Replaid Lab. La fecha visible y dateModified
reflejan esta revision; no se inventa una fecha de publicacion original.

Se corrige tambien "Discute su vuelo" en el resumen anterior de Echo. El
texto pasa a "Presiona su vuelo", coherente con el analisis de su articulo.

## Comprobacion de mecanicas

Referencias internas consultadas, no secciones de fuentes en las paginas:

- https://overwatch.blizzard.com/en-us/heroes/brigitte/
- https://overwatch.blizzard.com/en-gb/heroes/brigitte/
- https://overwatch.blizzard.com/en-us/heroes/roadhog/
- https://overwatch.blizzard.com/en-us/heroes/symmetra/
- https://overwatch.blizzard.com/en-us/heroes/torbjorn/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/04/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/

Las aperturas directas de fichas respondieron 403. Se contrastaron los
extractos oficiales indexados. No equivale a una lectura del cuerpo completo
inaccesible o una prueba personal en el juego. Las fichas contienen tambien
poderes de Stadium y las notas incluyen cambios de Community Crafted; no
se importan esas variantes a las recomendaciones normales de ranked.

## Indexacion e inventario

El registro reviewedCounters contiene quince revisiones. Las cuatro nuevas
siguen noindex, follow, sin anuncios y fuera del sitemap. No se cambian las
listas de aprobacion por slug ni se promociona contenido por longitud.

Informe: reports/adsense-local-2026-10-02-counter-peel-deployables-final.json.

- 330 rutas publicas, todas HTTP 200.
- 99 URLs en sitemap, 100 indexables y 230 noindex.
- 159 rutas publicas del manifest cubiertas; cola pendiente vacia.
- Avisos automaticos: 22, frente a 27 antes del lote.
- Fichas clasificadas como genericas: 29, frente a 33; quedan 28 counters
  genericos y /roles/flex.
- La mayor similitud pendiente es Moira/Reaper (0.381). El umbral no cambia.

La comparacion con el informe security-final no registra altas o bajas en
sitemap ni cambios de status, canonical o robots. Cambian title, description
y palabras visibles solo en los cuatro counters nuevos. Echo recibe una
correccion de frase que no altera esos campos medidos.

Palabras visibles del parser: Brigitte 1692, Roadhog 1691, Symmetra 1697,
Torbjorn 1701. No presentan avisos automaticos en ese informe. La longitud
y ausencia de avisos no equivalen a aprobacion editorial o de AdSense.

## Verificacion

Npm run verify completo y correcto: lint sin errores, 237 pruebas unitarias,
build de verificacion y build de E2E con 193 paginas generadas, y 444 pruebas
Playwright desktop/mobile correctas en 6.3 minutos. TypeScript sin
incremental y git diff --check tambien pasan. Git avisa de conversion
LF/CRLF; no registra errores de espacios. Las advertencias de deprecacion
de next lint y configuracion de Vite no son fallos de la suite.

Se revisan manualmente las cuatro paginas en navegador interno a 1440x900
y 390x844, con sus FAQ abiertas, retratos cargados, un H1, sin overflow ni
errores de consola observados. Se restaura el viewport al terminar. Los
tests cubren ademas enlaces internos, metadatos, fechas, JSON-LD, FAQ y
ausencia de anuncios. Agent-browser confirma carga y controles del preview.
Se inspeccionan las capturas producidas por Playwright del build final.
La suite incluye comprobaciones de acceso privado y rechazo de operaciones
sin sesion, no una validacion de transacciones reales.

Preview: http://127.0.0.1:3012, PID 16392 al crearlo. Usa un snapshot aislado
en .next-editorial-built-preview/counter-peel-deployables-2026-10-02.
Los artefactos de desarrollo, verificacion y E2E permanecen separados.
Se conservan los snapshots anteriores y sus informes.

## Limites y siguiente trabajo

No se prueban cobros reales. El preview sigue mostrando errores locales
StripeAuthenticationError al consultar cuentas conectadas; no se cambian
credenciales ni se escribe en Stripe o en la base de datos.

Siguen pendientes los counters restantes, revision individual del contenido
indexable y registro de aprobacion por version para contenido estatico.
Tambien faltan datos reales del titular y domicilio profesional, CMP
certificada, verificacion de produccion y Search Console. No es momento
de presentar la web como lista para una nueva solicitud de AdSense.
