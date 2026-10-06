# Control de version de counters y composiciones

Implementado el 2 de octubre de 2026; verificacion retomada el dia 3.
Trabajo local. Sin commit, push, deploy ni solicitud de revision de AdSense.

## Cambios

- La lista de slugs expresa intencion de publicar, no aprobacion editorial.
- El registro fija el hash SHA256 del modelo completo, la fecha, el revisor,
  cuatro comprobaciones y un documento de evidencia. Cambiar texto,
  metadata, enlaces o fechas invalida esa revision.
- No se aprueba un modelo nuevo por longitud ni se renuevan hashes desde
  un build. scripts/static-review-version.mjs solo calcula la version.
- Solo Moira y Reaper tienen revision registrada en este lote. No entran
  en sitemap porque no tienen intencion de indexacion en la lista actual.
- Se mantienen las URLs y todo el contenido publico de los 21 articulos
  antes indexados. Temporalmente pasan a noindex, follow y salen del sitemap.
  Deben recuperarse individualmente despues de leer y verificar su revision.

Counters pendientes: Shion, Ana, Genji, Kiriko, Reinhardt, D.Va, Winston,
Cassidy, Zarya, Tracer y Domina. Composiciones pendientes: Shion, Ana,
Genji, Kiriko, Reinhardt, D.Va, Winston, Cassidy, Tracer y Zarya.

## Publicidad

El layout deja de cargar el script de anuncios globalmente. Se conserva
google-adsense-account para verificacion y el ads.txt existente.
AdSlot y AdSenseScript requieren permiso editorial explicito, configuracion
valida, aprobacion, CMP preparada y modo de revision desactivado.
Un path editorial por si solo no autoriza publicidad. Hubs, perfiles,
heroes, mapas, legal y areas privadas quedan excluidos incluso si un
consumidor les pasa permiso por error. No se activan anuncios reales.

Separar la politica ligera de anuncios del inventario editorial reduce
First Load JS de home de 192 kB a 117 kB en el informe de build. No se
presenta esta diferencia como una medicion de Core Web Vitals.

## Resultados del lote del dia 2

- Lint, builds de verificacion/E2E y TypeScript sin incremental correctos.
- 248 unit tests en verify; 253 tras agregar pruebas de render de AdSlot.
- 490 E2E correctos, sin flakies ni skips, escritorio y movil. Se recupera
  la confirmacion desde report.json embebido en playwright-report/index.html
  tras perderse el handle de terminal; no se da por correcto un timeout.
- reports/adsense-local-2026-10-02-static-review-gate-final.json:
  330 respuestas 200; 78 URLs en sitemap; 79 indexables; 251 noindex;
  159 rutas del manifest cubiertas, sin cola restante; 19 avisos automaticos.
- Comparado con counter-fade-wraith-final-reviewed, solo cambian robots
  y pertenencia a sitemap en las 21 URLs citadas. No cambia el contenido.

El dia 3 se abre el preview aislado en navegador interno y se comprueba
que Ana sigue siendo legible. Esa lectura detecta un error adicional en su
resumen, corregido en el siguiente lote: el dano aliado no despierta Sleep.
Las pruebas de este lote no certifican exactitud de todos los articulos.

## Pendientes

El registro aun no cubre heroes, mapas, roles ni los articulos estaticos de
guias/noticias. Siguen pendientes fichas genericas, revisiones individuales,
datos reales del titular y domicilio profesional, CMP certificada, produccion
y Search Console. Noindex no impide que AdSense lea las paginas ni sustituye
la mejora editorial. No se considera el objetivo completo.
