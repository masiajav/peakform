# Publicacion para una nueva revision de AdSense

El usuario autoriza publicar los cambios necesarios, sin activar anuncios.
Destino confirmado: repositorio masiajav/peakform, rama main. Antes del commit,
HEAD y origin/main coinciden en f32b374; GitHub registra un deploy Vercel
correcto de ese commit para el proyecto peakform.

## Alcance del lote acumulado

- Revisiones individuales de contenido, registros de versiones y quality gate.
- Navegacion, heroes, composiciones, guias y accesibilidad del contenido.
- Identificacion autorizada en Legal y Privacidad, sin atribuir articulos al
  titular ni inventar identificacion fiscal.
- Verificacion de propiedad separada de anuncios; sin placeholders durante
  revision; inventory restringido a articulos expresamente elegibles.
- Adaptacion de cookies y params a Next 15, conservando autorizacion de pagos
  y pertenencia de pedidos. No se cambia el calculo de comisiones.

No incluir entornos, logs, procesos locales, screenshots, builds ni los archivos
temporales sueltos de la raiz. La informacion del titular forma parte del
contenido autorizado, no de un nuevo fichero de credenciales.

## Comprobacion de esquema y compatibilidad

Las peticiones anonimas de SELECT con limit=0 no leen filas ni hacen escrituras.
La base configurada localmente dispone de las columnas de guia probadas, pero
devuelve 42703 para source_url, source_published_at, source_id y auto_imported
de announcements. Esto no demuestra por si solo que la configuracion de
produccion sea el mismo proyecto.

Una proyeccion editorial que enumerase esas columnas impedia recuperar las
noticias. Listado y sitemap ahora seleccionan la fila real con `*`: incluyen
metadatos oficiales cuando existen y no fallan por columnas opcionales ausentes.
El control de version y la revision editorial se siguen aplicando a cada fila.
No se sustituye un error de esquema por una lista ficticia de noticias.

Las escrituras de noticias nuevas omiten metadatos oficiales vacios. En la
edicion de una fila antigua, no se intentan escribir columnas ausentes con
null. Una fila migrada sigue permitiendo borrar esos valores; los datos no
vacios enviados se conservan y no se descartan silenciosamente. Cuatro tests
adicionales cubren compatibilidad y la invalidacion de revision al anadir un
enlace oficial. La consulta `*` con cero filas responde HTTP 200.

No se ejecuta DDL ni se afirma que el workflow de patch notes este reparado:
para guardar fuentes e importar parches faltan las columnas de la migracion
existente `supabase/migrations/20260512_patch_note_sources.sql`, y debe
comprobarse tambien la migracion editorial de julio. No hay acceso configurado
a la API de administracion de Supabase para aplicarlas en este lote.

## Dependencias

Sharp pasa a 0.35.5, con el parche de librsvg publicado en el aviso oficial.
Se fijan source-map-js 1.2.2 y postcss-selector-parser 7.1.6. Build y pruebas
deben comprobar tambien que el parser actualizado conserva el CSS existente.
Next permanece en 15.5.27 y Tailwind en 3.4.19: no hay migracion mayor de estilos.

`npm audit --omit=dev` devuelve cero vulnerabilidades conocidas. El audit
completo conserva siete avisos altos en la cadena de desarrollo que usa braces
3.0.3. El aviso de recursion de braces no tiene version parcheada disponible
en la comprobacion del registro (latest sigue en 3.0.3). No se fuerza el
downgrade de Next ni el salto a Tailwind 4 que propone npm. Esto es riesgo
residual de herramientas de build/lint/watch sobre patrones de archivos; no
se declara inexistente ni se confunde con un criterio de aprobacion de AdSense.

Referencias internas del parche:
- https://github.com/advisories/GHSA-wq5f-xc86-pv6w
- https://github.com/advisories/GHSA-68fv-2mgg-jv7q
- https://github.com/advisories/GHSA-rj75-hqrm-r3gf
- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

## Estado de verificacion y despliegue

`npm.cmd run verify` completo: lint correcto, 363 tests unitarios de 41
archivos correctos y build limpio en `.next-verify`. La suite de navegador
completo termino con 717 casos correctos y un timeout de 30 segundos en la
comprobacion de enlaces de Ramattra en movil. No se afirma que ese comando
terminase con codigo 0.

La ruta implicada respondio despues HTTP 200 en 229 ms. Se repitio el bloque
completo de guias, sin cambiar codigo, timeout ni assertions:
`npm.cmd run test:e2e -- tests/e2e/reviewed-guides.spec.ts`. Los 90 casos de
escritorio y movil terminaron correctamente, incluido Ramattra (1,4 s).
Esto es evidencia de un fallo puntual no reproducido, no una garantia de
ausencia de futuros timeouts. La evidencia del primer intento se conserva en
`reports/verification-adsense-release-2026-10-06-first-run`, fuera del commit.

El staging contiene 231 archivos de aplicacion, pruebas y documentacion; no
incluye entornos, logs, capturas ni builds. `git diff --cached --check` correcto.
Tras el push: esperar el estado terminal del deploy correspondiente al SHA y
comprobar las rutas publicadas, meta de propiedad, ads.txt, sitemap, imagenes,
navegacion y ausencia de anuncios. Un push no demuestra un despliegue terminado.

La solicitud en AdSense y la configuracion real de consentimiento siguen
siendo acciones de cuenta distintas del deploy. No se hacen compras ni
onboarding real para probar la migracion de sesiones. No se declara terminada
la auditoria integral ni se garantiza que Google vaya a aprobar el sitio.
