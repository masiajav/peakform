# Revision por version antes de monetizar guias evergreen

## Evidencia del problema

La plantilla `EvergreenGuideArticle` enviaba `allowAds=true` a `AdSlot` para
cualquier guia recibida. Las cinco rutas que usan esta plantilla son:

- `/guides/como-subir-de-rango-overwatch`
- `/guides/mejores-heroes-overwatch`
- `/guides/counters-overwatch-guia-completa`
- `/guides/composiciones-overwatch-5v5-6v6`
- `/guides/review-vod-overwatch-espanol`

En produccion los anuncios siguen desactivados por las condiciones globales.
No se demuestra que se hayan servido anuncios en estas rutas ni que este
problema explique el rechazo de Google por contenido de poco valor.

Antes del cambio, ocho de los nueve casos nuevos fallaron: la plantilla
aprobaba contenido sin registro, cambiado, de otra ruta o con revision
incompleta. El control positivo paso, por lo que no se confunde ausencia de
anuncios con una prueba de autorizacion correcta.

## Correccion acotada

La plantilla reutiliza `hasCurrentStaticEditorialReview`, con el path canonico
y el objeto completo del articulo. El registro debe corresponder al checksum
de esa version y tener los cuatro controles editoriales completos.

Solo se pasa ese resultado al espacio publicitario. No se anaden registros de
aprobacion ficticios, ni se aprueban las guias por existir o tener muchas
palabras. No cambian los textos, fechas publicas, rutas, metadata, sitemap,
indexacion, marketplace, pagos ni variables de entorno.

Las condiciones de aprobacion de AdSense, consentimiento y review mode siguen
siendo necesarias. Una revision editorial valida no activa publicidad por si
sola, y una bandera CMP_READY no configura ni verifica la CMP real.

## Pruebas

- Unitarios: 372 casos en 42 archivos correctos, incluidos nueve casos nuevos.
- Lint sin cache: correcto.
- Build aislado `.next-verify`: correcto, 193 paginas generadas y TypeScript.
- Nuevo bloque Playwright para las cinco rutas en escritorio y movil:
  comprueba contenido, respuesta rapida, canonical, description, robots,
  fechas y autoria en JSON-LD, FAQ, contraste de fondo, overflow, consola
  y ausencia de slots y loader. No sustituye la prueba real de una CMP.
  Resultado final: diez casos correctos, sin retries, en 35,9 segundos
  (incluido el build aislado del servidor de pruebas).

Es una comprobacion dirigida a las cinco rutas afectadas por una sola plantilla,
no una repeticion completa de las 728 pruebas de navegador. Los 372 unitarios
si se han ejecutado en conjunto. No se declara pasada una suite no ejecutada.

El resultado terminal de Playwright y cualquier publicacion posterior se
conservan en los informes de `reports`, fuera del repositorio publico.
El primer bloque de navegador fallo en sus diez casos por exigir una etiqueta
robots presente para comprobar indexacion permitida. Las rutas existentes
omiten esa etiqueta (index/follow por defecto); no contenian noindex. Se
corrige la comprobacion para examinar robots/googlebot cuando existen y la
cabecera X-Robots-Tag, rechazando tanto noindex como none. No se elimina el
control ni se altera metadata para hacer pasar el test. Evidencia del primer
intento en `reports/verification-evergreen-ad-review-2026-10-06-initial`.

## Cuenta y condiciones pendientes

La comprobacion directa de AdSense en el navegador interno termina en el
login de Google; no hay sesion autenticada accesible ni conector AdSense.
Se ha dejado esa pestana preparada para que el propietario inicie sesion.
No se han introducido credenciales, modificado ajustes de cuenta, publicado
mensajes de consentimiento ni solicitado otra revision.

Siguen sin verificarse el estado actual del sitio en AdSense, su CMP real,
las preferencias y revocacion de consentimiento. La identificacion fiscal
autorizada del titular sigue pendiente. La auditoria editorial integral y
las pruebas autenticadas del marketplace tampoco quedan certificadas por este
cambio. El objetivo general no se declara completo.
