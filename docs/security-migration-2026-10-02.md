# Migracion de seguridad y compatibilidad

Lote local del 2 de octubre de 2026. Sin commit, push, deploy, solicitud de
AdSense, activacion de anuncios ni escrituras en la base de datos real.

## Motivo y alcance

Se corrigen las alertas de dependencias detectadas en el lote editorial
anterior. Next.js 14.2.35 se sustituye por 15.5.27, junto con React y React DOM
19.3.0 y sus tipos. Sharp queda en 0.35.4, Vitest en 4.1.11 y lucide-react en
0.468.0, compatible con React 19 sin reemplazar los iconos existentes.

PostCSS se fija en 8.5.28. El override global referencia esa dependencia
directa: el override limitado a Next dejo inicialmente una copia 8.4.31
invalida en el arbol instalado. El lockfile final elimina esa copia y npm ls
confirma la deduplicacion. No se usa npm audit fix --force.

Referencias tecnicas consultadas:

- https://nextjs.org/docs/app/guides/upgrading/version-15
- https://nextjs.org/docs/app/guides/upgrading/codemods
- https://github.com/vercel/next.js/releases/tag/v15.5.27
- https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36
- https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4

Estos enlaces son documentacion interna, no un nuevo bloque publico.

## Adaptacion de solicitudes

El codemod oficial next-async-request-api convierte params y searchParams
en promesas. Las paginas y metadata de servidor esperan sus valores; la
pagina cliente de envio de replay los resuelve con React.use.

La factoria de Supabase de servidor espera cookies() y sus 33 consumidores
esperan createClient(). Las factorias de navegador y administracion no se
convierten. Se conservan lectura/escritura de cookies, getUser, comprobaciones
de rol y filtros de pertenencia de pedidos. Dos enlaces de dashboard pasan a
Next Link para cumplir la regla de lint de la nueva version.

Los GET administrativos utilizan autenticacion y cookies, por lo que no se
dependia de cache estatica. Sitemap y cron ya declaran force-dynamic. Las
paginas publicas prerenderizadas mantienen sus rutas. No se modifica la
formula de comisiones ni la configuracion de destination charges.

## Aislamiento de artefactos

Playwright escucha expresamente en 127.0.0.1:3011. Sus artefactos siguen en
.next-e2e, separados de .next-verify y del preview. TypeScript excluye reports
y los snapshots para no compilar copias de seguridad como si fueran codigo
de la aplicacion; se conserva la comprobacion de src y tests.

El inventario omite /_not-found solo al extraer rutas del manifest: Next 15
prerenderiza esa ruta interna. No se excluye de enlaces o inventarios previos,
de modo que un enlace publico erroneo hacia ella seguiria generando un aviso.
Una prueba verifica la exclusion de la ruta interna del manifest.

## Resultados comprobados

- npm audit: cero vulnerabilidades conocidas en el paquete raiz.
- npm ls: sin dependencias invalidas; PostCSS 8.5.28 deduplicado.
- npm ci --dry-run --ignore-scripts: correcto. No es una instalacion limpia
  ejecutada ni una prueba independiente de todos los scripts de instalacion.
- Lint: sin errores ni avisos de reglas. Next informa de la futura retirada
  de next lint en la version 16; seguimos usando la version 15.
- Unit tests: 235 en 17 archivos, todos correctos.
- TypeScript sin incremental: correcto.
- Build de verificacion y build de E2E: correctos, 193 paginas generadas.
- npm run verify: 418 E2E desktop/mobile correctos en 6.2 minutos.
- Nueva suite private-access: 18 E2E adicionales correctos sobre el snapshot
  de produccion del preview. Se ejecuta por separado de los 418 anteriores.
- git diff --check: correcto, con avisos de conversion LF/CRLF de Git.

Los tests nuevos de sesion comprueban cookies asincronas y su adaptador de
lectura/escritura. Los de pagos simulan Stripe y la base de datos: validan
rechazo sin usuario, restriccion de onboarding por rol, filtros de propiedad,
totales, comision, destino y on_behalf_of para ES y CL. No equivalen a un cobro,
reembolso ni onboarding real en Stripe.

La suite HTTP real comprueba redirects al login de dashboard, experto, admin,
perfil y envio de replay, ademas del 401 de checkout, onboarding, envio y
reembolso sin sesion. No envia credenciales ni crea transacciones.

## Rastreo y navegador

Informe final: reports/adsense-local-2026-10-02-security-final.json.
330 URLs publicas HTTP 200; 99 en sitemap; 100 indexables y 230 noindex.
159 rutas publicas del manifest cubiertas y ninguna en la cola pendiente.

Comparado con el informe version-gate-main-final: mismas rutas, status,
title, description, canonical, robots, numero de palabras e inclusion en
sitemap. No hay diferencias. Los 27 avisos editoriales automaticos anteriores
siguen presentes: no se ocultan ni se consideran resueltos por esta migracion.

Preview: http://127.0.0.1:3012, PID 7548 al crearlo; snapshot en
.next-editorial-built-preview/security-migration-2026-10-02/artifact.
Logs: reports/security-migration-preview.log y su fichero -error.log.
El snapshot anterior version-gate-main se conserva, pero su servidor se detuvo
antes de actualizar las dependencias. No se mezcla un build Next 14 con el
runtime Next 15.

Agent-browser comprueba home, contenido, controles y consola sin errores.
Se inspecciona reports/security-migration-home-desktop.png: fondo oscuro,
retratos visibles y sin pantalla blanca. En el navegador interno se filtra
Kiriko, se abre su guia desde el resultado y se revisa a 390px: un H1, ninguna
imagen rota, sin overflow, sin anuncios ni errores de consola. Se restaura el
viewport al terminar.

## Estado de AdSense y siguiente trabajo

La seguridad no resuelve por si sola el rechazo por contenido de poco valor.
Siguen pendientes 32 counters genericos y /roles/flex, revision individual de
articulos indexables y control de version para contenido estatico. Los datos
reales del titular y domicilio profesional, CMP certificada, verificacion de
produccion y Search Console siguen sin completarse.

El preview registra errores StripeAuthenticationError al consultar algunas
cuentas conectadas con las credenciales locales existentes. No se cambian las
claves ni se presenta como validado un checkout real.

No se considera la web lista para solicitar AdSense. El objetivo permanece
activo; este lote cierra la migracion tecnica, no la auditoria editorial.
