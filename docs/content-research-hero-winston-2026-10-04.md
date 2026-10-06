# Preparacion de la revision de Winston - 4 de octubre de 2026

No es aprobacion editorial ni cambia el quality gate.

Lectura completa del modelo actual y del main renderizado en navegador interno.
La ficha sigue noindex y enlazada. Detectado:
- Resumen automatico "Para jugar contra Winston: respeta a Reaper", que mezcla
  la intencion de jugar contra el heroe con sus propias amenazas.
- Duplicacion de hechos entre cabecera y resumen; frases intercambiables
  sobre ventanas, recursos y salir vivo.
- Tesla Cannon no explica el disparo secundario cargado.
- No hay perks ni ejemplos concretos de mapa. Amenazas y errores muy breves.
- "Corta curas" presentado como absoluto: necesita distinguir trayectorias
  y posicion del Support; no todas las curas son un disparo interceptable.
- Forzar un cooldown no basta por si solo: explicar el coste de entrar,
  la ayuda disponible y el seguimiento real del grupo.

## Contraste oficial inicial

Ficha inglesa https://overwatch.blizzard.com/en-us/heroes/winston/
y espanola https://overwatch.blizzard.com/es-es/heroes/winston/ consultadas
mediante busqueda el 2026-10-04. La apertura directa en-gb devolvio 403;
el resultado indexado de esa ficha estaba rastreado el dia anterior.

Ambas describen el disparo secundario cargado, dano al aterrizar con Jump
Pack, cupula de Barrier Projector y Primal limitado a saltos y golpes.
Minor actuales: Electric Charge (velocidad al danar con el primario) y
Heavy Landing (mejora del aterrizaje durante Primal). Major: Chain Lightning
(rebotes del secundario completamente cargado) y Revitalizing Barrier
(curacion de aliados dentro). Mantener cualitativo, sin fijar cifras.
Stadium tiene poderes diferentes que anaden resets, curacion al aterrizar
o barreras adicionales; no describirlos como kit normal.

La nota de junio 2026 sobre segundo Jump Pack aparece en un modo modificado;
se confirma por el encabezado Community Crafted de la nota del 30 de junio:
https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/.
El segundo impulso y despliegue diferido de burbuja no se importan al kit
normal. La burbuja automatica al activar Primal procede del evento de 2024:
https://overwatch.blizzard.com/en-us/news/24104274/.
La apertura directa de la nota de junio dio 403; la busqueda oficial devuelve
el encabezado y la seccion correspondiente. El perk antiguo Short Circuit
de febrero 2025 no coincide con la Minor actual Electric Charge.

La revision individual requiere investigacion mecanica especifica, redaccion
propia, lectura completa, FAQ, enlaces, screenshots desktop/movil, schema,
tests y registro de version exacta. No inventar pruebas personales ni prometer rango.

Borrador propio implementado en reviewed-hero-winston.ts, con ejemplos de
Numbani primer punto y Lijiang Garden, seguimiento del segundo Support,
distincion de lineas de curacion y balance de recursos gastados al entrar.
Leidos render completo y seis FAQ. Corregidas dos expresiones sobre "ayudar
a morir" y una frase que llamaba "quitar" a forzar Suzu. Las correcciones se
releyeron renderizadas antes del registro. Tambien se aclaro el label del
enlace al counter y se comprobo el destino. Lectura completa, FAQ abiertas,
16 enlaces HTTP 200 y QA visual de cabecera, habilidades y perks en desktop
y movil completados. Se comprobaron recorridos reales a la guia y vuelta.
El modelo exacto se registra sin anuncios; el cierre tecnico y su evidencia
se conservan en content-review-hero-winston-2026-10-04.md. Esta investigacion
no aprueba otras paginas, el despliegue ni una solicitud de AdSense.
