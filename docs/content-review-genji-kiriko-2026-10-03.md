# Revision individual: counters de Genji y Kiriko

3 de octubre de 2026. Trabajo local, sin commit, push, deploy, solicitud
de AdSense, activacion de anuncios ni modificaciones del marketplace.

## Revision editorial

Se leen las versiones previas y se reescriben las dos paginas como
analisis separados, no intercambiando nombres en una plantilla.
Cada una tiene seis matchups con riesgo, senal y respuesta, ventanas de
cooldowns, adaptaciones, errores, tres situaciones, checklist y FAQ.
Los ejemplos de Gibraltar, King's Row y Midtown son hipoteticos; no
se presentan como partidas personales, testimonios o evidencia medida.

Genji: proteger la primera vida baja, distinguir eliminacion de last hit,
Deflect contra proyectiles/melee, melee fuera de Rally, defensas escalonadas
y limitaciones de Immortality Field. Swift Cuts, Meditation y Dragon's
Thirst se identifican como elecciones opcionales, no como kit universal.

Kiriko: seguimiento real para forzar Suzu, mirar el destino de Swift Step,
prevenir dano frente a limpiar estados, Sleep frente a knockdowns y
Kitsune cuando hay que tocar. Matrix intercepta el proyectil, no deshace
la proteccion ya aplicada. Ready Step y Urgent Care son perks opcionales.
No se importan clones/Two-Zu de Stadium ni cambios de Community Crafted.

Investigacion interna, sin bloques de fuentes en las paginas publicas:

- https://overwatch.blizzard.com/en-gb/heroes/genji/
- https://overwatch.blizzard.com/en-gb/heroes/kiriko/
- https://overwatch.blizzard.com/en-gb/heroes/brigitte/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2024/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2020/06/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/

El fetch directo del lector devuelve 403 en algunas fichas. El buscador
recupera su contenido indexado. Se separan los cambios de Arcade del kit
de ranked y se evitan cifras de dano/cooldowns no necesarias para el consejo.
No se afirma que un pick garantice ganar el duelo o frenar toda Blade.

## Control individual

Se registra solo la version de estas dos paginas despues de revisar
texto, enlaces, metadata, render y FAQ en preview de produccion aislado.
No se generan aprobaciones para el resto del inventario.

- /counters/genji: 16537bce83c8d26af41e993640eb0beef27f492e2c7f5970f9a65e60ee1d2da0
- /counters/kiriko: 6a8d2fd43657941f29349ec334a8a79a232729236a23bb07b62c2ea1944f6be5

Se recuperan como index, follow y sin anuncios por coincidir el registro
con el modelo y tener intencion de publicacion previa. La fecha de revision
es real; no se inventa datePublished cuando el modelo anterior no lo tenia.

## Correccion adicional de Ana

La lectura real del resumen detecta una frase que decia despertar a un
aliado dormido. Se corrige: el dano aliado no lo despierta; hay que cubrirlo.
Se mejora tambien la retirada de Winston sin condicionarla a quedarse
sin armadura. Se conserva la fecha de publicacion existente y se actualiza
la de correccion. Ana no se aprueba: aun necesita revision completa.

## Comprobaciones previas al registro

- HTTP 200 y todos los enlaces de main correctos en ambas paginas.
- Un H1, metadata propia y canonical; Article/Breadcrumb/FAQ parseables.
- Imagen cargada, fondo oscuro, sin overflow ni anuncios.
- Navegador interno: 1440x900 y 390x844; intro, matchups, ventanas,
  ejemplos y FAQ; apertura real de respuestas y logs sin errores.
- Preview r1 y r2 preservados; r2 incluye las ultimas mejoras de lenguaje.
- Capturas CLI: reports/genji-review-desktop-2026-10-03.png y
  reports/kiriko-review-desktop-2026-10-03.png.

## Verificacion posterior

- Primer `npm run verify`: 255 unitarios, lint y builds correctos; 484 E2E
  correctos y diez fallos por ausencia de robots explicito en Genji/Kiriko.
  El helper compartido omite robots cuando permite indexacion; la ruta ahora
  expresa index, follow para esas paginas sin cambiar la politica compartida.
  Informe del primer intento preservado en
  `reports/genji-kiriko-e2e-first-run-2026-10-03`.
- Segundo `npm run verify`: exit 0; lint, 255 unitarios, dos builds aislados
  y 494 E2E desktop/movil correctos, sin reintentos fallidos.
- `npx tsc --noEmit --incremental false` y `git diff --check`: exit 0.
- Rastreo final: 330 HTTP 200, 80 sitemap, 81 respuestas indexables,
  249 noindex, 19 avisos. Informe:
  `reports/adsense-local-2026-10-03-explicit-robots-final.json`.
- Frente al rastreo anterior al fix solo cambia robots en las dos paginas,
  entre status, title, description, canonical, H1, robots, palabras y sitemap.
- Preview final: `.next-editorial-built-preview/genji-kiriko-explicit-robots-2026-10-03`,
  BUILD_ID `p73Hu9PIPX-iwftzjrqor`, PID 1644, puerto 3012.
- Navegador interno final: robots, canonical, H1, imagen, ausencia de
  inventario publicitario y overflow; Ana mantiene noindex y el resumen corregido.
  Home oscura, imagenes cargadas y consola sin errores observados.
- Capturas E2E Genji/Kiriko desktop y movil inspeccionadas; captura CLI final
  `reports/genji-explicit-robots-desktop-2026-10-03.png`. Sesion CLI cerrada.

La suite comprueba proteccion anonima y contratos de rutas privadas; no
ejecuta compras. El preview registra StripeAuthenticationError al consultar
cuentas de expertos con la configuracion local. No se modifican credenciales
ni cuentas, y no se certifica el cobro real con estas pruebas.

Esto aprueba dos versiones editoriales locales, no certifica la web para
Google ni elimina pendientes legales, CMP, produccion o Search Console.
