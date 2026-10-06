# Revision editorial vinculada a la version

Trabajo local del 2 de octubre de 2026. No se realiza commit, push,
deploy, solicitud de revision de AdSense ni activacion de publicidad.
No se modifica el marketplace, el checkout ni las cuentas de Stripe.

## Control de guias, noticias y patch notes en base de datos

- Una extension suficiente, un slug conocido o una etiqueta escrita a
  mano ya no aprueban una guia o noticia para el sitemap.
- El administrador debe confirmar cuatro comprobaciones: especificidad,
  exactitud, enlaces y revision visual. Tambien se aplican las comprobaciones
  tecnicas existentes. Estos controles no certifican calidad ante Google.
- El servidor registra la identidad del administrador, fecha y hash SHA256
  de los campos editoriales, multimedia y etiquetas publicas revisados.
- Un cambio en esos campos invalida la aprobacion. El timestamp operativo
  updated_at y el toggle published no alteran por si solos el contenido.
- El formulario reinicia las comprobaciones al cambiar el articulo o abrir
  otra edicion. La API elimina etiquetas reservadas enviadas por el cliente.
- Las ediciones de contenido publicado pueden conservar su URL publica,
  pero pierden indexacion y publicidad si su version no esta aprobada.
  Se conserva la validacion adicional existente para patch notes publicados.
- El mecanismo usa tags existentes, sin migraciones ni tablas nuevas.
  No se han escrito aprobaciones ni otros datos en la base real durante el lote.
- Todos los consumidores del quality gate seleccionan los mismos campos
  necesarios para calcular la version. Las etiquetas internas no se muestran
  en los formularios ordinarios de etiquetas ni en el contenido publico.

## Catalogo y transicion

La navegacion y la indexacion son decisiones distintas. Las guias publicadas
utiles siguen visibles en el catalogo aunque su aprobacion este pendiente.
Las guias revisadas en el repositorio conservan sus tarjetas especificas.
Se anade main al catalogo: antes los enlaces existian, pero la comprobacion
semantica main a no podia encontrarlos. No se ocultan enlaces para pasar tests.

El sitemap local pasa de 105 a 99 URLs. No se anade ninguna y se excluyen
estas seis guias de base de datos hasta revisar y aprobar sus versiones:

1. /guides/como-usar-ultimates-overwatch
2. /guides/como-mejorar-en-overwatch-revisando-vod
3. /guides/como-mejorar-como-tank-overwatch
4. /guides/cuando-cambiar-de-heroe-overwatch
5. /guides/como-revisar-cooldowns-overwatch
6. /guides/como-elegir-composicion-dive-poke-brawl

No se borran articulos ni rutas. Se verifican los seis enlaces en el catalogo
y la navegacion movil real a ultimates: canonical propio, noindex, follow,
sin anuncios, sin overflow y sin errores de consola en la comprobacion.

## Verificacion

226 pruebas unitarias pasan, incluyendo normalizacion del hash, cambios,
etiquetas falsas, aprobaciones antiguas, publicacion, borradores y checklist.
Los tests de API simulan autenticacion y almacenamiento: no equivalen a
una aprobacion real ejecutada por un administrador autenticado en produccion.
Se configura la transformacion JSX automatica de OXC para los tests React 18.
Lint y build de verificacion pasan; TypeScript sin incremental tambien pasa.

La primera ejecucion completa detecto dos expectativas antiguas de sitemap.
La siguiente detecto 12 fallos por ausencia del landmark main en el hub.
Se corrige la estructura y se repite npm.cmd run verify completo: lint sin
avisos, 226 unit tests, build y 418 pruebas desktop/mobile correctas (6.3 min
para E2E). TypeScript sin incremental y git diff --check tambien pasan.
No se cuenta ninguna de las ejecuciones fallidas como verificacion correcta.

Rastreo final: reports/adsense-local-2026-10-02-version-gate-main-final.json.
330 respuestas HTTP 200, 99 URLs en sitemap, 100 indexables, 230 noindex, 27 paginas con
avisos automaticos, 159 rutas del manifest cubiertas y cola vacia.
La clasificacion automatica aun senala 33 fichas genericas: 32 counters y
/roles/flex. No certifica ni condena la calidad individual del resto.

Preview aislado: http://127.0.0.1:3012, PID 6988, build s297GECzkhWOWtDwSIZKP,
.next-editorial-built-preview/version-gate-main-2026-10-02.
Se conservan snapshots anteriores. Logs: reports/editorial-version-gate-main-preview.log
y reports/editorial-version-gate-main-preview-error.log. Captura de escritorio:
reports/editorial-version-gate-main-guides-desktop.png.
Tambien se inspecciona reports/editorial-version-gate-main-ultimates-desktop.png.
Se confirma fondo oscuro, navegacion conservada y ausencia de pantallas
blancas en la muestra manual. Se restaura el viewport del navegador interno
y se cierra la sesion CLI de agent-browser al terminar.

## Seguridad y pendientes

Actualizacion posterior: el lote tecnico documentado en
security-migration-2026-10-02.md corrige las alertas siguientes, adapta Next 15
y repite la verificacion. El snapshot anterior se conserva; el servidor activo
ya utiliza el snapshot security-migration en el mismo puerto 3012.
Los parrafos siguientes registran el estado historico de este lote editorial.

npm audit informa 15 alertas en las dependencias actuales, incluida Next.js
14.2.35. No se ejecuta audit fix --force ni se migra una version mayor en mitad
de la verificacion editorial. Se debe resolver en un lote tecnico separado.
Los advisories del mantenedor confirman un riesgo especifico en servidores
Windows y otro en optimizacion de imagenes AVIF. El preview esta limitado a
127.0.0.1; esto reduce exposicion, pero no equivale al parche recomendado.
El servidor temporal de Playwright se cierra al terminar la suite. Su comando
todavia usa el bind por defecto; debe limitarse expresamente a loopback antes
de la siguiente ejecucion, ademas de actualizar las dependencias vulnerables.

- https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36
- https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4
- https://support.google.com/adsense/answer/7299563?hl=es

Siguen pendientes las fichas genericas, la revision individual del contenido
indexable y un registro equivalente para articulos estaticos. Tambien faltan
datos reales del titular y domicilio profesional, CMP certificada, verificacion
de produccion y Search Console. El preview sigue registrando un error local
de autenticacion Stripe al consultar cuentas: no se han probado cobros reales.
No se considera la web lista para solicitar AdSense y el objetivo sigue abierto.
