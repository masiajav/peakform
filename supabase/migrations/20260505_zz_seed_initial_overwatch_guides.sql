-- Initial Overwatch guide library for Replaid Lab.
-- Original Spanish seed content inspired by common editorial topic structures.
-- Stadium is intentionally excluded; 6v6 is covered as contextual callouts.

insert into guides (
  title,
  slug,
  body,
  category,
  published,
  excerpt,
  seo_title,
  seo_description,
  author,
  hero,
  role,
  map,
  tags,
  content_type,
  created_at,
  updated_at
) values
(
  'Fundamentos de Overwatch 5v5 para revisar tus partidas',
  'fundamentos-overwatch-5v5-revisar-partidas',
  $md$
## La partida se decide antes del highlight

En Overwatch la mecánica importa, claro. Pero muchas peleas se pierden antes de que nadie falle un disparo: por entrar tarde, gastar mal un recurso o pelear desde un ángulo que no amenaza nada. Antes de culparte solo por el aim, revisa tres cosas: dónde estaba tu equipo, qué cooldown acababa de salir y si tu posición obligaba al rival a respetarte.

## Ciclo básico de una pelea

1. **Preparación:** mira composiciones, rutas y ultimates probables sin regalar media vida.
2. **Entrada:** alguien fuerza espacio, un cooldown clave o una primera ventaja.
3. **Conversión:** si el rival ya gastó movilidad, escudo, cleanse o burst heal, toca acelerar.
4. **Salida:** si la pelea está perdida, morir tarde solo retrasa la siguiente.

## Checklist para VOD review

- Primera muerte: ¿era evitable o el rival tuvo que invertir mucho para sacarla?
- Ultimates: ¿iniciaron una pelea, respondieron una amenaza o se tiraron cuando ya no hacía falta?
- Ángulos: ¿tu daño o tu sanación cambiaban algo, o estabas jugando desde una línea cómoda para el rival?
- Tempo: ¿estabas listo cuando tu equipo entró, o llegaste cuando la pelea ya estaba rota?

> **6V6**
> En 6v6 hay más cuerpos, más peel y más recursos defensivos. No mires solo quién muere primero: muchas ventajas nacen cuando la pareja de tanks rival gasta demasiado, cuando un support queda fuera de línea o cuando una rotación se vuelve lenta.
$md$,
  'Fundamentos',
  true,
  'Guía base para revisar partidas de Overwatch 5v5: tempo, recursos, posicionamiento y errores repetidos.',
  'Fundamentos de Overwatch 5v5 para VOD review',
  'Aprende a revisar tus partidas de Overwatch 5v5 con un marco simple de tempo, recursos, ángulos y decisiones.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['fundamentos','vod-review','macro','5v5','6v6'],
  'guide',
  '2026-05-05 09:00:00+00',
  '2026-05-05 09:00:00+00'
),
(
  'Roles y subroles: cómo entender tu función real',
  'roles-subroles-overwatch-funcion-real',
  $md$
## El rol no cuenta toda la historia

Tank, DPS y Support son etiquetas útiles, pero se quedan cortas. Dos héroes del mismo rol pueden tener trabajos completamente distintos. Mejoras más rápido cuando dejas de preguntar "¿qué rol juego?" y empiezas a preguntar "¿qué problema tiene que resolver mi héroe en esta composición?".

## Tank

El tank marca por dónde se puede jugar. A veces inicia, a veces aguanta una zona y a veces solo fuerza al rival a mirar al sitio equivocado. La pregunta clave no es cuánto daño aguantaste, sino si tu presencia hizo más fácil la pelea para los demás.

## DPS

El DPS no existe para inflar daño. Existe para crear amenaza real: abrir un ángulo, castigar una rotación, forzar curas o cerrar una baja cuando el rival ya no tiene salida.

## Support

Support no significa jugar escondido esperando barras de vida. Un buen support decide peleas con utilidad, tempo y supervivencia. Curar tarde un error suele valer menos que negar la jugada antes de que explote.

> **6V6**
> En 6v6 el trabajo del tank se reparte. Uno puede iniciar mientras el otro protege, niega ángulos o cubre la retirada. DPS y supports tienen que leer esa segunda capa antes de resumir la pelea en "faltaron kills" o "faltó healing".
$md$,
  'Roles',
  true,
  'Resumen original de roles y subroles para entender qué aporta cada héroe en una partida de Overwatch.',
  'Roles y subroles en Overwatch',
  'Entiende el trabajo real de tanks, DPS y supports en Overwatch para revisar mejor tus decisiones.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['roles','subroles','heroes','macro','6v6'],
  'guide',
  '2026-05-05 09:10:00+00',
  '2026-05-05 09:10:00+00'
),
(
  'Cómo leer una tier list sin jugar en piloto automático',
  'como-leer-tier-list-overwatch',
  $md$
## Una tier list no sustituye tu contexto

Una tier list sirve para orientarte, no para apagar el cerebro. Te dice qué héroes están fuertes en general, pero no explica por qué perdiste esa pelea concreta. Un pick top puede ser malo si el mapa, tu composición o tu timing no le dan espacio para trabajar.

## Tres filtros antes de cambiar de pick

1. **Mapa:** ¿necesitas rango, movilidad, control de choke o aguante en corto?
2. **Composición aliada:** ¿tu pick acompaña el plan del equipo o lo parte en dos?
3. **Amenaza rival:** ¿quién está mandando en la partida y qué recurso lo frena de verdad?

## Señales de que un pick funciona

- El rival tiene que cambiar su posición por tu presencia.
- Fuerzas cooldowns antes de que tu equipo gaste ultimates.
- Sobrevives sin absorber toda la atención de tus supports.
- Una ventaja pequeña termina en espacio, objetivo o pelea ganada.

> **6V6**
> En 6v6 las sinergias de tanks pesan mucho más. Un héroe puede subir si encaja con una dupla concreta y bajar si depende de aislar objetivos que ahora reciben más peel.
$md$,
  'Meta',
  true,
  'Marco práctico para usar tier lists de Overwatch sin perder de vista mapa, composición y ejecución.',
  'Cómo leer tier lists de Overwatch',
  'Usa tier lists de Overwatch como orientación: mapa, composición, counters y señales reales de valor.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['tier-list','meta','draft','counters','6v6'],
  'guide',
  '2026-05-05 09:20:00+00',
  '2026-05-05 09:20:00+00'
),
(
  'Composiciones: dive, brawl y poke',
  'composiciones-dive-brawl-poke-overwatch',
  $md$
## El plan de equipo decide tus ángulos

Las composiciones no son recetas cerradas. Son una forma de ponerse de acuerdo sobre cómo ganar espacio, cuándo gastar recursos y desde dónde amenazar.

## Dive

Dive busca caer sobre un objetivo vulnerable antes de que el rival pueda estabilizarse. La clave no es entrar primero: es llegar juntos y salir antes de que la respuesta rival te encierre.

## Brawl

Brawl quiere pelea corta, ritmo alto y distancia pequeña. Funciona cuando el mapa te deja cerrar espacio sin cruzar una avenida entera comiendo daño.

## Poke

Poke gana antes del choque directo. Controla líneas, desgasta vida y fuerza recursos hasta que el rival entra tarde, bajo de vida o sin herramientas para responder.

> **6V6**
> En 6v6 la pareja de tanks define muchísimo. Dive puede separar iniciador y protector; brawl tiene más capas defensivas; poke necesita disciplina para desgastar sin regalar metros gratis.
$md$,
  'Composiciones',
  true,
  'Guía introductoria a dive, brawl y poke para decidir ángulos, tempo y condiciones de victoria.',
  'Composiciones de Overwatch: dive, brawl y poke',
  'Aprende las bases de composiciones dive, brawl y poke en Overwatch y cómo aplicarlas en tus partidas.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','dive','brawl','poke','6v6'],
  'guide',
  '2026-05-05 09:30:00+00',
  '2026-05-05 09:30:00+00'
),
(
  'Tank: crear espacio sin regalar tu vida',
  'tank-crear-espacio-sin-regalar-vida',
  $md$
## Crear espacio no es recibir daño infinito

Un buen tank no solo aguanta daño: cambia dónde puede jugar el rival. Si entras y todos te pegan, pero tu equipo no puede avanzar ni castigar nada, no has creado espacio; solo has comprado tiempo caro.

## Prioridades

- Decide antes de entrar cuál es tu salida.
- Usa cobertura antes de gastar defensivos.
- Fuerza cooldowns clave antes de pedir ultimates.
- Comprueba si tus supports pueden verte antes de cruzar espacio abierto.

## Preguntas de replay

Cuando mueres primero, rebobina diez segundos. ¿Había cobertura cerca? ¿Tenías defensivo? ¿Tu equipo podía seguirte? ¿El rival gastó algo importante o simplemente te encontró solo?

> **6V6**
> En 6v6 el espacio no depende de una sola persona. Revisa si tu jugada complementaba a tu otro tank o si los dos gastasteis recursos para pelear exactamente por el mismo sitio.
$md$,
  'Rol',
  true,
  'Fundamentos de tank en Overwatch: espacio, cooldowns, cobertura, tempo y revisión de muertes tempranas.',
  'Guía de Tank en Overwatch: crear espacio',
  'Mejora como Tank en Overwatch aprendiendo a crear espacio sin regalar recursos ni morir antes de tiempo.',
  'Replaid Lab',
  null,
  'tank',
  null,
  array['tank','espacio','cooldowns','posicionamiento','6v6'],
  'guide',
  '2026-05-05 09:40:00+00',
  '2026-05-05 09:40:00+00'
),
(
  'DPS: presión útil, final blows y control de ángulos',
  'dps-presion-final-blows-control-angulos',
  $md$
## El daño que importa cambia decisiones

Hacer mucho daño al tank puede quedar bonito en el marcador y aun así no abrir la pelea. El DPS que gana partidas crea ángulos incómodos, fuerza recursos y aparece cuando el rival ya no puede mirar a todo.

## Tres trabajos del DPS

1. **Presionar:** obligar al rival a curar, cubrirse o gastar defensivos.
2. **Amenazar:** estar en un ángulo que no puedan ignorar gratis.
3. **Cerrar:** confirmar la baja cuando falta movilidad, vida o soporte.

## Error común

Jugar toda la ronda pegado al ángulo de tu tank. A veces toca, pero si nadie obliga al rival a girarse, la pelea se convierte en una carrera de números.

> **6V6**
> En 6v6 los objetivos importantes tienen más protección. Para un DPS, forzar una burbuja, matriz, escudo o peel puede valer tanto como buscar la kill inmediata.
$md$,
  'Rol',
  true,
  'Guía inicial de DPS para transformar daño en presión real, eliminaciones y control de ángulos.',
  'Guía de DPS en Overwatch: presión y ángulos',
  'Aprende a jugar DPS en Overwatch con presión útil, ángulos, cooldowns y criterio para cerrar eliminaciones.',
  'Replaid Lab',
  null,
  'dps',
  null,
  array['dps','aim','angulos','presion','6v6'],
  'guide',
  '2026-05-05 09:50:00+00',
  '2026-05-05 09:50:00+00'
),
(
  'Support: tempo, utilidad y supervivencia',
  'support-tempo-utilidad-supervivencia',
  $md$
## Curar es una parte del rol, no todo el rol

El support gana peleas cuando mantiene vivo el plan de su equipo y corta el plan rival. A veces eso es curar mucho; otras es una granada, un speed boost, una discord, un cleanse o simplemente sobrevivir dos segundos más.

## Prioridades

- Juega donde puedas ayudar sin ser la primera baja gratis.
- Usa utilidad antes de que la pelea ya esté decidida.
- Vigila los cooldowns que amenazan tu backline.
- No gastes todo para salvar una jugada que ya estaba perdida.

## Pregunta clave

¿Qué habilidad mía podía cambiar la pelea y en qué segundo tenía que aparecer?

> **6V6**
> En 6v6 hay más vida que sostener y más amenazas a la vez. La prioridad no es curar a todos por igual, sino entender qué línea mantiene viva la condición de victoria.
$md$,
  'Rol',
  true,
  'Guía de Support centrada en utilidad, supervivencia y tempo para impactar más allá de la sanación.',
  'Guía de Support en Overwatch: tempo y utilidad',
  'Mejora como Support en Overwatch usando utilidad, posicionamiento y tempo para ganar peleas.',
  'Replaid Lab',
  null,
  'support',
  null,
  array['support','utilidad','supervivencia','tempo','6v6'],
  'guide',
  '2026-05-05 10:00:00+00',
  '2026-05-05 10:00:00+00'
),
(
  'Ana: primeros hábitos para impactar más',
  'ana-primeros-habitos-impactar-mas',
  $md$
## Ana castiga el mal tempo

Ana decide peleas desde lejos, pero no perdona malas posiciones. Su gran valor está en dormir una amenaza, negar curación con la granada o sostener a alguien justo cuando el rival quería cerrar la kill.

## Hábitos iniciales

- Juega siempre con una esquina cerca.
- Si el rival tiene dive, no regales sleep en objetivos sin peligro.
- Usa la granada para ganar tempo, no solo para arreglar tarde una mala pelea.
- Cambia de posición cuando el rival ya sabe desde dónde estás curando.

## Nano Boost

Nano no tiene que ser una jugada de montaje. Puede iniciar, salvar a tu tank o acelerar a un DPS que ya tiene ángulo. Lo importante es que el objetivo pueda actuar durante la ventana, no que el combo sea perfecto.

> **6V6**
> En 6v6 Ana encuentra más granadas grupales, pero también más barreras y peel rival. Sleep gana muchísimo valor contra dives coordinados o tanks que cruzan demasiado.
$md$,
  'Héroe',
  true,
  'Guía inicial de Ana con posicionamiento, uso de grenade, sleep dart y revisión de muertes.',
  'Guía de Ana en Overwatch',
  'Aprende los primeros hábitos de Ana en Overwatch: posicionamiento, biotic grenade, sleep dart y Nano Boost.',
  'Replaid Lab',
  'ana',
  'support',
  null,
  array['ana','support','cooldowns','nano-boost','6v6'],
  'guide',
  '2026-05-05 10:10:00+00',
  '2026-05-05 10:10:00+00'
),
(
  'Tracer: presión lateral sin morir gratis',
  'tracer-presion-lateral-sin-morir-gratis',
  $md$
## Tracer gana por atención, no solo por eliminaciones

Una buena Tracer no mata en cada entrada. Lo que hace es mucho más molesto: obliga al rival a mirar atrás, gastar cooldowns y jugar con miedo justo cuando tu equipo presiona de frente.

## Prioridades

- Entra por un lateral, no por la línea principal.
- Guarda recall para las entradas de verdad peligrosas.
- Cuenta cooldowns que te niegan: sleep, suzu, whip shot, burst heal o movilidad.
- Sal antes de quedarte sin blinks y sin plan.

## Pulse Bomb

Busca objetivos sin movilidad o después de forzar defensivos. Una Pulse que no mata pero obliga recursos puede ganar la pelea si tu equipo acelera después.

> **6V6**
> En 6v6 Tracer encuentra más peel y más cuerpos entre ella y los supports. Suele sacar más valor entrando tarde, cuando los tanks ya fijaron miradas y se gastaron recursos defensivos.
$md$,
  'Héroe',
  true,
  'Guía inicial de Tracer centrada en timing, blinks, recall, Pulse Bomb y presión lateral.',
  'Guía de Tracer en Overwatch',
  'Aprende a jugar Tracer en Overwatch con presión lateral, control de cooldowns, recall y timing.',
  'Replaid Lab',
  'tracer',
  'dps',
  null,
  array['tracer','dps','flanker','timing','6v6'],
  'guide',
  '2026-05-05 10:20:00+00',
  '2026-05-05 10:20:00+00'
),
(
  'Reinhardt: controlar chokes y acelerar peleas',
  'reinhardt-controlar-chokes-acelerar-peleas',
  $md$
## Reinhardt no es un escudo movil

Reinhardt no gana por tener escudo; gana cuando convierte distancia corta en amenaza inmediata. Si avanzas con el escudo levantado hasta que se rompe, estás gastando la herramienta que necesitabas para entrar.

## Prioridades

- Usa el escudo para cruzar zonas malas, no para vivir eternamente.
- Juega esquinas donde tu martillo obligue al rival a respetarte.
- Acelera cuando el rival gasta movilidad o defensivos.
- No cargues si tu equipo no puede convertir la jugada.

## Earthshatter

Shatter no tiene que tirar a cinco. Si derriba al objetivo que sostiene la pelea rival, ya hizo su trabajo. Mira escudos, stuns, cleanses y movilidad antes de buscarlo.

> **6V6**
> En 6v6 Reinhardt depende mucho de su pareja de tank. Puede jugar más agresivo si tiene cobertura secundaria, pero tiene que coordinar recursos para no gastar escudo y defensivos a la vez sin convertir nada.
$md$,
  'Héroe',
  true,
  'Guía inicial de Reinhardt para controlar chokes, gestionar escudo y decidir cuándo acelerar una pelea.',
  'Guía de Reinhardt en Overwatch',
  'Aprende a jugar Reinhardt en Overwatch con mejor control de chokes, escudo, engages y Earthshatter.',
  'Replaid Lab',
  'reinhardt',
  'tank',
  null,
  array['reinhardt','tank','brawl','chokes','6v6'],
  'guide',
  '2026-05-05 10:30:00+00',
  '2026-05-05 10:30:00+00'
)
on conflict (slug) do update set
  title = excluded.title,
  body = excluded.body,
  category = excluded.category,
  published = excluded.published,
  excerpt = excluded.excerpt,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  author = excluded.author,
  hero = excluded.hero,
  role = excluded.role,
  map = excluded.map,
  tags = excluded.tags,
  content_type = excluded.content_type,
  updated_at = excluded.updated_at;
