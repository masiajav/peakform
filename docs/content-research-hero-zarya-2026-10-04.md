# Investigacion individual de Zarya - 4 de octubre de 2026

Ruta conservada: /heroes/zarya. Autor publico: Replaid Lab.
Este documento prepara la revision; no aprueba una pagina ni publicidad.

## Lectura previa

Leidos completos el modelo antiguo de hero-pillars.ts y su main renderizado,
incluidas las cinco FAQ. Leidos ZARYA_COUNTER y ZARYA_TEAM_COMP de
seo-clusters.ts. La ficha repite facts, mezcla consejos para jugar Zarya con
counterplay y usa expresiones como "energia de ego" en lugar de explicar la
decision. No distingue los Tanks aliados de 6v6 de la composicion 5v5.
Faltan perks actuales, Energy y Bruiser. "Limpiar presion" no identifica una
interaccion; Suzu, Lamp y Matrix aparecen como respuestas equivalentes a Grav
sin separar lanzamiento, supervivencia y seguimiento.

La composicion vinculada tambien afirma que Zarya baja la burbuja al llegar
a cobertura, como si pudiera cancelarla manualmente. Necesita revision propia;
un enlace HTTP 200 no certifica su contenido. El counter contiene un ejemplo
que conecta Suzu lejos del Tank con la imposibilidad de salvarlo mediante una
burbuja sin explicar esa conclusion. No aprobar esos destinos por este lote.

Leidos los apartados de Oasis en overwatch-control-maps.ts y Eichenwalde en
overwatch-hybrid-maps.ts para preparar ejemplos distintos: puertas de
University y el paso del puente al castillo. No son pruebas de coordenadas,
ni certifican las fichas completas de esos mapas.

## Referencias primarias comprobadas

- https://overwatch.blizzard.com/en-us/heroes/zarya/
  Ficha actual indexada: Particle Cannon tiene beam corto y granadas de
  energia; Particle Barrier protege a Zarya y Projected Barrier a un aliado;
  Graviton Surge atrae enemigos. Energy aumenta el dano del canon mediante
  dano bloqueado. Bruiser aporta resistencia a criticos y velocidad a baja
  salud. No extrapolar valores antiguos ni describir toda defensa como
  penetrable por el beam.
- Misma ficha: Minor Jump-Ups y Spotter; Major Extra Oomph y Energy Lance.
  Spotter activa regeneracion del aliado y velocidad; Extra Oomph genera
  energia con dano del beam mientras hay una barrera activa; Energy Lance
  atraviesa enemigos, no dice que atraviese todas las barreras.
- https://overwatch.blizzard.com/en-gb/news/patch-notes/live/2026/02/
  Spotter pasa a Minor; Energy Converter se retira; Energy Lance deja de
  exigir 50 de energia; Extra Oomph se incorpora. Esas opciones antiguas no
  se presentaran como actuales.
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/02/
  Cambios de subroles y correccion de Extra Oomph. No publicar la generacion
  de energia erronea ni bonus de supervivencia generales de otra epoca.
- https://overwatch.blizzard.com/en-us/news/patch-notes/live/2026/6/
  Distinguir retail, Community Crafted y Stadium. La movilidad de Projected
  Barrier en el evento no es su funcionamiento normal.

La ficha contiene ademas Here To Spot You, Fission Field, No Limits,
Containment Shield y otros poderes de Stadium. No llevar curacion periodica,
teleport hacia el aliado, burbuja multiple ni energia 150 a ranked normal.
Las notas de Classic, beta de 2022 y pruebas de 6v6 no prueban el inventario
actual de cargas y cooldowns en todos los modos. Evitar valores exactos y
afirmaciones universales de cargas mientras no se contrasten.

Consulta actual del 4 de octubre realizada en buscador web sobre dominios
oficiales; el acceso directo a algunas paginas devolvio error/403. No afirmar
pruebas dentro del juego. No publicar interacciones especificas de cleanse,
Matrix con el proyectil de Grav o cancelacion de movilidad basadas solo en
notas antiguas. Se pueden explicar defensas durante el seguimiento sin
inventar esa interaccion.

## Criterio de reescritura

Una burbuja puede proteger un cruce sin recibir dano; no es un fallo automatico
por no cargar energia. Energia alta sin salud, cobertura o ayuda no justifica
perseguir. Cada ejemplo debe seguir la posicion de Supports y DPS, no solo
la barra de energia. Separar combinaciones 5v5 de un segundo Tank en 6v6.
En Grav, comprobar alcance, municion y seguimiento real sin exigir capturar
a todo el equipo rival. No inventar experiencia personal ni promesas de rango.

## Implementacion y contraste adicional

Modelo individual implementado en reviewed-hero-zarya.ts. Leido el main
completo del primer build aislado. Se corrigio una instruccion de redaccion
en Particle Cannon por la decision de disparo frente a Matrix, y se preciso
Extra Oomph para no dejar ambiguo que hace falta dano del beam a rango.

Contraste adicional: https://overwatch.blizzard.com/en-gb/heroes/dva/
describe Matrix como bloqueo de proyectiles; la ficha de Zarya diferencia
beam y granadas. El evento Community Crafted de 2024 anadia mitigacion de
beams a Matrix (https://overwatch.blizzard.com/en-us/news/24104274/), no se
lleva esa regla especial al kit normal. No se anade una afirmacion sobre
absorber el proyectil de Grav basada solo en una nota de 2019.
https://overwatch.blizzard.com/en-gb/heroes/zenyatta/ confirma curacion de
Transcendence; https://overwatch.blizzard.com/en-us/news/patch-notes/
describe Immortality Field como dispositivo destruible. No publicar los
valores de vida o cooldown de notas antiguas ni afirmar bajas garantizadas.

Pendientes relectura de correcciones en build posterior, apertura y lectura
de seis FAQ, QA visual, enlaces, metadata, registro exacto y suite antes de
indexar. Los destinos no quedan certificados por este articulo.
# Cierre del lote

Lectura individual, correcciones y QA documentadas en
content-review-hero-zarya-2026-10-04.md. Verificacion completa correcta:
lint, 325 unitarios, build, TypeScript y 684 Playwright desktop/movil sin
retries (10.5 min). Capturas finales inspeccionadas e informes archivados
en reports/verification-hero-zarya-2026-10-04. Rastreo final: 330 URLs HTTP
200; solo Zarya se anade al sitemap frente a Tracer. No equivale a una
aprobacion del sitio para AdSense ni verifica checkout en produccion.
