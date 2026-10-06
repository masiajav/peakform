# Preparacion de revision individual de Tracer - 4 de octubre de 2026

Leidos por completo el modelo antiguo de hero-pillars.ts y el main
renderizado de /heroes/tracer en la preview final de Cassidy, incluidas las
cinco FAQ visibles (no son details). Tracer sigue noindex/follow y sin anuncios.
Este documento no aprueba la ficha ni sustituye su reescritura y QA.

## Problemas observados

Facts duplicados y tres resumenes del mismo asunto. Mezcla aprender Tracer
con jugar contra ella. No describe los perks actuales ni la pasiva Flanker.
"La mayoria de Tracers" es una afirmacion estadistica sin prueba. Los medios
segundos y segundos de retraso recomendados no forman una regla de engage.
Recall temprano puede evitar una muerte o retirar una amenaza: no es siempre
una mala entrada, ni requiere haber forzado un cooldown para estar justificado.
"Cerrar una jugada buena" y "seguro de tempo" no explican el destino ni el
estado de salud al volver. Pulse Bomb necesita respuesta a defensas concretas,
no una promesa de que forzar Lamp/Beat siempre gana valor. El rival puede
mantener la pelea aunque alguien se gire: comprobar que el equipo aprovecha
la atencion, en lugar de presentar toda distraccion como una ventaja.

## Referencias primarias consultadas

- https://overwatch.blizzard.com/en-us/heroes/tracer/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/02/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/08/
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/06/

Ficha actual recuperada en busqueda oficial, rastreada hoy: Pulse Pistols de
corto alcance, Blink en direccion de movimiento, Recall hacia posicion y
salud anteriores, Pulse Bomb explosivo adhesivo. Flanker aumenta la salud
que restauran los packs. Minor Temporal Regen acelera la activacion de la
regeneracion pasiva y Kinetic Reload recarga municion al conectar melee.
Major Blink Packs restaura una carga de Blink al recoger un pack; Quantum
Entanglement da exceso de salud y municion temporal despues de Recall.
No confundir packs que restauran un Blink con una recarga de todos los Blinks.

La ficha actual separa estos perks de poderes de Stadium: Auto Recall,
Chrono Stabilizer, Blink Hop, Temportal y Pulse Bomb al usar Recall no son
habilidades normales. Community Crafted de junio permite compartir Recall
y convertir Blink Packs en Ult Packs; es un evento, no el kit de ranked.
La nota de febrero retira Flashback y mueve Blink Packs a Major. La nota
de agosto retira Chronal Dash y introduce Temporal Regen. La cifra de esa
nota difiere de la ficha actual, por lo que no se usara como dato presente.
Abrir directamente las notas de junio devuelve 403; se pudo consultar su
contenido indexado, no se declara una lectura directa exitosa o prueba in-game.
No usar notas experimentales de 2021 o April Fools para afirmar que Recall
restaura todas las cargas, permite Recall aliado o atrae enemigos.

## Destinos y planteamiento inicial

Leidos los modelos TRACER_COUNTER y TRACER_TEAM_COMP en seo-clusters.ts.
El counter explica jugar contra Tracer; la comp reparte entrada frontal,
lateral y ayuda. No se certifican por esa lectura parcial de preparacion.
Posibles ejemplos propios: hotel/estatua de King's Row sin perseguir dentro,
interiores de Esperanca junto a la pelea de TS-1, o suelo de hangar de
Gibraltar sin presentar Blink como acceso vertical automatico. Elegir dos,
contrastar sus rutas y no copiar los mismos ejemplos de otro heroe.

Reescribir sobre llegada con municion, seguimiento tras el giro rival,
destino de Recall, seguridad de health packs y preparacion de Pulse Bomb.
Incluir errores observables desde replay, amenazas con decisiones distintas,
FAQ y conclusion propia. No rellenar palabras ni aprobar porque existe una
plantilla. Pendiente reescritura, lectura completa nueva, contraste de
interacciones que se mencionen, enlaces HTTP, QA visual y registro exacto.

## Implementacion y contraste adicional

La preparacion anterior describe el estado previo, no el actual. Modelo
individual implementado en reviewed-hero-tracer.ts. Se eligieron Esperanca
y Gibraltar, tras leer sus recorridos existentes, sin coordenadas inventadas.
Ficha oficial de Kiriko y notas vigentes contrastan kunais, Swift Step y
proteccion breve de Suzu; no se afirma que limpiar la bomba sea necesario
ni que Suzu siempre impida una baja. Matrix se describe contra disparos,
sin anadir una afirmacion no contrastada sobre bloquear Pulse Bomb.

Referencia adicional: https://overwatch.blizzard.com/en-us/heroes/kiriko/
y https://overwatch.blizzard.com/en-us/news/patch-notes/.
La ficha actual de Tracer se recupero otra vez mediante busqueda oficial
el 4 de octubre; el acceso directo devuelve 403. Confirma las cuatro
opciones presentes y el bonus temporal de Quantum Entanglement. No se
declara una prueba dentro del juego ni un acceso directo exitoso.

Leidos modelo nuevo y render completo, abiertas las seis FAQ y releidas las
correcciones de lenguaje en un build posterior. QA y registro exacto en
content-review-hero-tracer-2026-10-04.md. Suite final cerrada: lint, 321
unitarios, build y 684 Playwright sin retries, TypeScript y diff check.
Inventario final y evidencia archivados; no supone aprobacion de AdSense.
