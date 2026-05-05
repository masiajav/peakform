-- Expanded Overwatch guide library for Replaid Lab.
-- Original Spanish content inspired by common hero-guide and meta-guide structures.
-- Stadium is intentionally excluded; each guide stays focused on standard play with a short 6v6 note.

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
  'Dive: cómo entrar sin regalar la pelea',
  'dive-composicion-overwatch-entrar-sin-regalar',
  $md$
## Qué busca una composición dive

Dive no significa saltar todos a la vez y esperar que alguien muera. La idea es aislar una zona débil del rival, forzar recursos defensivos y salir antes de que el equipo enemigo pueda girarse con comodidad.

## Piezas importantes

- Tank con movilidad para iniciar o absorber la primera respuesta.
- DPS capaces de atacar desde ángulos distintos.
- Supports que puedan acompañar el tempo sin quedarse expuestos.
- Comunicación simple: objetivo, cuenta atrás y salida.

## Error común

Entrar sobre un objetivo que todavía tiene todos sus recursos. Si Ana tiene sleep y granada, Kiriko tiene suzu y el rival mantiene peel, la dive no está preparada: primero hay que provocar algo.

> **6V6**
> En 6v6 la dive necesita más paciencia. Hay más peel, más cuerpos bloqueando rutas y más recursos para salvar al objetivo. La entrada buena suele llegar después de una primera oleada de presión, no al inicio.
$md$,
  'Composiciones',
  true,
  'Guía de composición dive en Overwatch: timing, objetivos, recursos y errores comunes al entrar.',
  'Guía de composición Dive en Overwatch',
  'Aprende a jugar composiciones dive en Overwatch con timing, foco, cooldowns y salidas claras.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','dive','macro','tempo','6v6'],
  'guide',
  '2026-05-05 11:00:00+00',
  '2026-05-05 11:00:00+00'
),
(
  'Poke: ganar antes de que empiece el brawl',
  'poke-composicion-overwatch-angulos-distancia',
  $md$
## La ventaja está en la distancia

Poke juega a convertir líneas de visión en presión constante. No necesitas correr al rival: necesitas obligarle a cruzar zonas incómodas, gastar recursos antes de tiempo y llegar tocado a la pelea real.

## Prioridades

- Mantén ángulos cruzados sin quedarte aislado.
- Castiga rotaciones, no solo escudos o tanks.
- Guarda cooldowns defensivos para cuando el rival consiga acercarse.
- Reposiciona antes de que la pelea se vuelva corta.

## Cuándo falla

El poke pierde valor cuando todos disparan desde la misma línea o cuando el equipo retrocede sin plan. Si el rival cruza gratis, tu composición deja de jugar a distancia y entra en una pelea que no quería.

> **6V6**
> En 6v6 el poke puede ser muy fuerte, pero también más lento. Hay más barreras y más sustain, así que importa mucho castigar rotaciones y no gastar ultimates en peleas que el rival ya estaba dispuesto a ceder.
$md$,
  'Composiciones',
  true,
  'Guía de composición poke en Overwatch: ángulos, distancia, presión y rotaciones.',
  'Guía de composición Poke en Overwatch',
  'Aprende a jugar poke en Overwatch usando distancia, líneas de visión y presión antes del brawl.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','poke','angulos','mapas','6v6'],
  'guide',
  '2026-05-05 11:05:00+00',
  '2026-05-05 11:05:00+00'
),
(
  'Flyers: jugar alrededor de Pharah y Echo',
  'flyers-composicion-pharah-echo-overwatch',
  $md$
## Presión vertical

Las composiciones con flyers obligan al rival a mirar arriba, romper su formación y dedicar recursos a controlar el cielo. Pharah y Echo no solo buscan kills: buscan dividir atención para que el resto del equipo avance.

## Qué necesita funcionar

- Supports capaces de sostener desde posiciones seguras.
- Un tank que no dependa de recibir todas las curas.
- DPS o support secundario que aproveche al rival mirando hacia arriba.
- Mapas con coberturas altas, tejados o líneas de visión rotas.

## Cómo se castiga

Hitscans, D.Va, presión coordinada sobre el support que acompaña al flyer y rotaciones bajo techo pueden reducir mucho su impacto. El objetivo no siempre es matar a Pharah o Echo: a veces basta con negarles ángulos cómodos.

> **6V6**
> En 6v6 hay más recursos para contestar flyers, pero también más caos visual. Las flyers ganan cuando fuerzan miradas y su equipo terrestre acelera justo en esa ventana.
$md$,
  'Composiciones',
  true,
  'Guía para jugar y responder composiciones con Pharah, Echo y presión vertical en Overwatch.',
  'Guía de Flyers en Overwatch: Pharah y Echo',
  'Aprende a jugar composiciones con flyers en Overwatch y a castigar equipos que dependen de Pharah o Echo.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','pharah','echo','flyers','6v6'],
  'guide',
  '2026-05-05 11:10:00+00',
  '2026-05-05 11:10:00+00'
),
(
  'Rush y brawl: acelerar sin perder recursos',
  'rush-brawl-composicion-overwatch-tempo',
  $md$
## Ganar en corto

Brawl quiere pelear donde sus cooldowns tienen valor inmediato: esquinas, chokes, puntos cerrados y zonas donde el rival no puede kitear eternamente. La clave no es correr siempre, sino elegir cuándo acelerar.

## Señales para entrar

- El rival ya gastó movilidad o una cura fuerte.
- Tu equipo está agrupado y puede seguir al tank.
- La ruta tiene cobertura suficiente para no llegar medio muerto.
- Tus ultimates empiezan la pelea, no la arreglan tarde.

## Error común

Gastar speed, escudos y defensivos solo para cruzar un espacio que no lleva a nada. Si después de entrar no puedes pegar, capturar o forzar recursos, has acelerado hacia una mala pelea.

> **6V6**
> En 6v6 el brawl puede apoyarse en dos tanks, pero también se castiga más el exceso. Si ambos tanks consumen recursos para el mismo metro de espacio, el rival puede ganar la pelea alargando.
$md$,
  'Composiciones',
  true,
  'Guía de rush y brawl en Overwatch: cuándo acelerar, cómo cruzar chokes y qué recursos cuidar.',
  'Guía de Rush y Brawl en Overwatch',
  'Aprende a jugar composiciones rush y brawl en Overwatch con tempo, cobertura y recursos claros.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','rush','brawl','lucio','6v6'],
  'guide',
  '2026-05-05 11:15:00+00',
  '2026-05-05 11:15:00+00'
),
(
  'Anti-dive: sobrevivir al primer golpe',
  'anti-dive-overwatch-sobrevivir-primer-golpe',
  $md$
## No ganar por reflejos, ganar por preparación

Anti-dive consiste en hacer que la entrada rival cueste demasiado. Si el equipo enemigo salta sobre tu backline y obtiene una baja gratis, llegaste tarde. La respuesta empieza antes: posición, cooldowns guardados y rutas de escape.

## Herramientas clave

- CC o boops para cortar movilidad.
- Supports con defensivos listos para el primer foco.
- Ángulos donde el DPS pueda castigar al que entra.
- Comunicación simple: quién recibe dive y qué recurso lo salva.

## Pregunta de replay

Cuando muere tu backline, mira diez segundos antes: ¿estaba aislado?, ¿gastó su defensivo sin presión?, ¿el equipo tenía línea de visión para ayudar?

> **6V6**
> En 6v6 anti-dive suele tener más peel disponible. La trampa es confiarse: si todos reaccionan tarde, más recursos solo significan más cooldowns gastados después de la baja.
$md$,
  'Composiciones',
  true,
  'Guía anti-dive en Overwatch: peel, cooldowns, posicionamiento y respuestas al primer foco.',
  'Anti-dive en Overwatch: cómo sobrevivir al dive',
  'Aprende a responder composiciones dive en Overwatch con posicionamiento, peel y cooldowns preparados.',
  'Replaid Lab',
  null,
  'flex',
  null,
  array['composiciones','anti-dive','peel','cooldowns','6v6'],
  'guide',
  '2026-05-05 11:20:00+00',
  '2026-05-05 11:20:00+00'
),
(
  'D.Va: matrix, peel y presión flexible',
  'dva-guia-overwatch-matrix-peel-presion',
  $md$
## D.Va cambia de trabajo muy rápido

D.Va puede iniciar, negar daño, cubrir a un aliado o castigar una altura en cuestión de segundos. Su valor viene de esa flexibilidad: estar donde el rival quería que no estuvieras.

## Prioridades

- Usa Defense Matrix para negar cooldowns importantes, no daño aleatorio.
- Entra a high ground cuando puedas salir después.
- Protege a supports cuando el rival compromete movilidad.
- No gastes boosters sin una ruta clara de vuelta.

## Cómo te castigan

Beams, CC al salir y equipos que te fuerzan a mirar demasiados ángulos reducen mucho tu margen. Si Matrix desaparece antes de que empiece la pelea, D.Va pierde su mejor argumento.

> **6V6**
> En 6v6 D.Va brilla como off-tank: puede proteger, negar ultimates y contestar flancos sin abandonar por completo la línea principal.
$md$,
  'Héroe',
  true,
  'Guía de D.Va en Overwatch: Defense Matrix, peel, high ground y errores comunes.',
  'Guía de D.Va en Overwatch',
  'Aprende a jugar D.Va en Overwatch usando Matrix, movilidad, peel y control de high ground.',
  'Replaid Lab',
  'dva',
  'tank',
  null,
  array['dva','tank','matrix','peel','6v6'],
  'guide',
  '2026-05-05 11:25:00+00',
  '2026-05-05 11:25:00+00'
),
(
  'Winston: dive con paciencia y salida clara',
  'winston-guia-overwatch-dive-burbuja',
  $md$
## Winston no salta para morir

Winston crea caos controlado. Su salto abre espacio, su burbuja corta líneas de visión y su presencia obliga al rival a elegir entre girarse o perder terreno.

## Prioridades

- Salta cuando tu equipo pueda presionar contigo.
- Usa la burbuja para dividir curas y daño, no solo para cubrirte.
- Ataca objetivos que ya gastaron movilidad o defensivos.
- Guarda una salida mental antes de entrar.

## Errores comunes

Entrar demasiado profundo, tirar burbuja tarde o pelear dentro de espacios donde el rival tiene todo el burst listo. Winston gana por tempo, no por aguantar de pie contra cinco.

> **6V6**
> En 6v6 Winston necesita coordinarse con el otro tank. Si uno inicia y el otro no amenaza otra zona, el rival puede dedicar demasiado peel a la misma entrada.
$md$,
  'Héroe',
  true,
  'Guía de Winston en Overwatch: dive, burbuja, timing y objetivos correctos.',
  'Guía de Winston en Overwatch',
  'Aprende a jugar Winston en Overwatch con entradas coordinadas, burbuja útil y salidas limpias.',
  'Replaid Lab',
  'winston',
  'tank',
  null,
  array['winston','tank','dive','burbuja','6v6'],
  'guide',
  '2026-05-05 11:30:00+00',
  '2026-05-05 11:30:00+00'
),
(
  'Sigma: controlar espacio sin moverte de más',
  'sigma-guia-overwatch-poke-escudo',
  $md$
## Sigma gana por ritmo

Sigma no necesita correr al rival. Controla líneas, corta ángulos con escudo, absorbe burst y castiga a quien cruza espacios abiertos sin respeto.

## Prioridades

- Recoloca el escudo para negar ángulos concretos.
- Guarda Kinetic Grasp para burst real o ultimates previsibles.
- Usa Accretion para cortar entradas, no como poke sin plan.
- Juega cerca de cobertura para no depender siempre del escudo.

## Cuándo sufre

Sufre contra equipos que le entran muy rápido o le rodean por varios ángulos. Si Sigma mira al frente mientras el daño llega por los lados, pierde su control natural.

> **6V6**
> En 6v6 Sigma encaja muy bien como tank de control. Puede sostener una línea mientras el otro tank disputa espacio más agresivo.
$md$,
  'Héroe',
  true,
  'Guía de Sigma en Overwatch: poke, escudo, Grasp, Accretion y control de líneas.',
  'Guía de Sigma en Overwatch',
  'Aprende a jugar Sigma en Overwatch controlando distancia, ángulos y cooldowns defensivos.',
  'Replaid Lab',
  'sigma',
  'tank',
  null,
  array['sigma','tank','poke','escudo','6v6'],
  'guide',
  '2026-05-05 11:35:00+00',
  '2026-05-05 11:35:00+00'
),
(
  'Zarya: cargar energía sin regalar la pelea',
  'zarya-guia-overwatch-burbujas-energia',
  $md$
## La energía no lo justifica todo

Zarya puede convertir presión rival en daño propio, pero solo si sus burbujas protegen una jugada útil. Cargar energía y perder el espacio no es buen intercambio.

## Prioridades

- Usa burbujas para salvar timings importantes, no por costumbre.
- Castiga después de absorber recursos enemigos.
- Juega cerca de esquinas mientras no tienes burbuja.
- Coordina Graviton con daño real, no con esperanza.

## Cómo te castigan

El rival puede ignorar burbujas, kitear tu rango o forzarte a gastar ambas antes de entrar. Sin cooldowns, Zarya pasa de amenaza a objetivo fácil.

> **6V6**
> En 6v6 Zarya gana valor protegiendo a un tank agresivo. La clave es burbujear acciones que conquistan espacio, no solo daño recibido.
$md$,
  'Héroe',
  true,
  'Guía de Zarya en Overwatch: energía, burbujas, Graviton y control de recursos.',
  'Guía de Zarya en Overwatch',
  'Aprende a jugar Zarya en Overwatch cargando energía sin desperdiciar burbujas ni tempo.',
  'Replaid Lab',
  'zarya',
  'tank',
  null,
  array['zarya','tank','burbujas','energia','6v6'],
  'guide',
  '2026-05-05 11:40:00+00',
  '2026-05-05 11:40:00+00'
),
(
  'Orisa: aguantar espacio sin volverte estática',
  'orisa-guia-overwatch-fortify-javelin',
  $md$
## Orisa castiga el exceso rival

Orisa es fuerte cuando el rival tiene que pasar por ella. Puede negar entradas, aguantar burst y castigar errores de posicionamiento, pero pierde valor si solo se queda disparando al tank.

## Prioridades

- Usa Javelin para cortar habilidades o empujar al rival fuera de cobertura.
- Guarda Fortify para la ventana de burst, no para poke ligero.
- Avanza por esquinas, no por espacios abiertos eternos.
- Obliga al rival a mirarte mientras tu equipo toma ángulos.

## Errores comunes

Jugar demasiado atrás o gastar todos los defensivos antes de que el rival comprometa recursos. Orisa aguanta mucho, pero no crea valor si nadie puede seguir su presión.

> **6V6**
> En 6v6 Orisa puede ser ancla de frontline mientras otro tank busca ángulos o peel. Si ambos se quedan estáticos, el equipo pierde iniciativa.
$md$,
  'Héroe',
  true,
  'Guía de Orisa en Overwatch: Fortify, Javelin, frontline y control de espacio.',
  'Guía de Orisa en Overwatch',
  'Aprende a jugar Orisa en Overwatch aguantando espacio, cortando entradas y evitando quedarte estático.',
  'Replaid Lab',
  'orisa',
  'tank',
  null,
  array['orisa','tank','frontline','javelin','6v6'],
  'guide',
  '2026-05-05 11:45:00+00',
  '2026-05-05 11:45:00+00'
),
(
  'Doomfist: entrar, forzar y salir vivo',
  'doomfist-guia-overwatch-entradas-cooldowns',
  $md$
## Doomfist vive de ventanas pequeñas

Doomfist no necesita matar en cada entrada. Su trabajo muchas veces es forzar cooldowns, separar al equipo rival y volver con vida para repetir la presión.

## Prioridades

- Entra con una ruta de escape preparada.
- Usa Power Block cuando el rival ya decidió castigarte.
- No gastes todos los cooldowns para llegar al objetivo.
- Castiga supports o DPS sin movilidad, no tanks imposibles.

## Cómo se pierde valor

Si entras sin información, recibes CC y sales sin cooldowns, tu equipo juega la pelea sin tank. Doomfist exige paciencia: pokea, provoca y entra cuando el rival ya enseñó recursos.

> **6V6**
> En 6v6 Doomfist puede jugar más agresivo si otro tank sostiene la línea, pero también hay más CC y peel esperándole.
$md$,
  'Héroe',
  true,
  'Guía de Doomfist en Overwatch: entradas, Power Block, cooldowns y objetivos.',
  'Guía de Doomfist en Overwatch',
  'Aprende a jugar Doomfist en Overwatch forzando recursos, entrando con salida y evitando morir gratis.',
  'Replaid Lab',
  'doomfist',
  'tank',
  null,
  array['doomfist','tank','dive','cooldowns','6v6'],
  'guide',
  '2026-05-05 11:50:00+00',
  '2026-05-05 11:50:00+00'
),
(
  'Junker Queen: tempo, heridas y peleas cortas',
  'junker-queen-guia-overwatch-tempo-heridas',
  $md$
## Queen quiere peleas decididas

Junker Queen funciona cuando convierte una ventaja pequeña en pelea rápida. Su sustain depende de golpear, herir y mantener al rival dentro de su rango.

## Prioridades

- Usa Commanding Shout para entrar o salvar una ventana crítica.
- Lanza Knife para arrastrar objetivos fuera de cobertura.
- No pelees eternamente contra poke si no puedes cerrar distancia.
- Guarda Rampage para cortar sustain o iniciar con seguimiento.

## Cuándo cambiar el ritmo

Si el rival te kitea, no corras en línea recta. Busca una esquina, una rotación o una entrada donde tu equipo pueda acompañar el grito.

> **6V6**
> En 6v6 Queen puede funcionar como tank de presión mientras otro controla espacio. Su valor sube si Rampage corta varios recursos defensivos a la vez.
$md$,
  'Héroe',
  true,
  'Guía de Junker Queen en Overwatch: heridas, Shout, Knife, Rampage y tempo.',
  'Guía de Junker Queen en Overwatch',
  'Aprende a jugar Junker Queen en Overwatch con peleas cortas, heridas y presión coordinada.',
  'Replaid Lab',
  'junker-queen',
  'tank',
  null,
  array['junker-queen','tank','brawl','tempo','6v6'],
  'guide',
  '2026-05-05 11:55:00+00',
  '2026-05-05 11:55:00+00'
),
(
  'Ashe: ángulos, dinamita y presión constante',
  'ashe-guia-overwatch-angulos-dinamita',
  $md$
## Ashe gana con presión ordenada

Ashe castiga equipos que cruzan mal y supports que se exponen demasiado. Su dinamita fuerza curas, rompe posiciones y prepara bajas antes de que empiece la pelea.

## Prioridades

- Juega ángulos con cobertura y salida.
- Usa Coach Gun para reposicionarte, no solo para escapar tarde.
- Lanza dinamita cuando el rival está agrupado o sin cleanse.
- Invoca a B.O.B. para capturar espacio, no solo para buscar highlights.

## Cómo te castigan

Dive coordinado, flancos sin marcar y mapas sin líneas largas reducen su impacto. Si gastas Coach Gun para daño y te entran después, te quedas sin respuesta.

> **6V6**
> En 6v6 Ashe puede farmear más presión sobre grupos, pero necesita más paciencia: hay más escudos, más peel y más cuerpos bloqueando tiros limpios.
$md$,
  'Héroe',
  true,
  'Guía de Ashe en Overwatch: dinamita, Coach Gun, ángulos y B.O.B.',
  'Guía de Ashe en Overwatch',
  'Aprende a jugar Ashe en Overwatch con presión desde ángulos, dinamita y control de espacio.',
  'Replaid Lab',
  'ashe',
  'dps',
  null,
  array['ashe','dps','hitscan','dinamita','6v6'],
  'guide',
  '2026-05-05 12:00:00+00',
  '2026-05-05 12:00:00+00'
),
(
  'Cassidy: castigar movilidad y jugar con cobertura',
  'cassidy-guia-overwatch-cobertura-cooldowns',
  $md$
## Cassidy no necesita perseguir

Cassidy gana cuando obliga al rival a respetar un rango medio peligroso. Puede castigar flankers, cortar entradas y convertir errores de movilidad en bajas.

## Prioridades

- Juega cerca de esquinas para resetear duelos.
- Guarda Magnetic Grenade para amenazas reales.
- Dispara a objetivos que tu equipo ya presiona.
- Usa Deadeye para zona, recarga o presión, no solo para multikills.

## Errores comunes

Caminar demasiado abierto buscando duelos justos o gastar granada en el primer objetivo visible. Cassidy es fuerte cuando el rival entra en su zona, no cuando corre detrás de todos.

> **6V6**
> En 6v6 Cassidy aporta mucho como seguro anti-dive. Hay más amenazas entrando, así que guardar cooldowns defensivos gana más valor.
$md$,
  'Héroe',
  true,
  'Guía de Cassidy en Overwatch: cobertura, granada, duelos y Deadeye.',
  'Guía de Cassidy en Overwatch',
  'Aprende a jugar Cassidy en Overwatch castigando movilidad y usando cobertura en rango medio.',
  'Replaid Lab',
  'cassidy',
  'dps',
  null,
  array['cassidy','dps','hitscan','anti-dive','6v6'],
  'guide',
  '2026-05-05 12:05:00+00',
  '2026-05-05 12:05:00+00'
),
(
  'Sojourn: railgun, presión y confirmación',
  'sojourn-guia-overwatch-railgun-presion',
  $md$
## Sojourn convierte presión en amenaza

Sojourn no juega solo a cargar railgun: juega a crear miedo. Cuando el rival sabe que una ventana puede terminar en baja instantánea, cambia cómo asoma, rota y gasta recursos.

## Prioridades

- Carga railgun con seguridad antes de buscar duelos largos.
- Usa Slide para tomar ángulos o salir, no para entrar sin plan.
- Disruptor Shot controla rutas y fuerza al rival a moverse.
- Overclock necesita línea de visión y paciencia, no prisa.

## Cómo se pierde impacto

Si siempre disparas desde la misma posición, el rival te fuerza cobertura o dive. Sojourn necesita cambiar ángulos y aparecer cuando la pelea ya está presionada.

> **6V6**
> En 6v6 hay más cuerpos para cargar, pero también más barreras. El valor real sigue estando en confirmar objetivos importantes, no en inflar daño.
$md$,
  'Héroe',
  true,
  'Guía de Sojourn en Overwatch: railgun, Slide, Disruptor Shot y Overclock.',
  'Guía de Sojourn en Overwatch',
  'Aprende a jugar Sojourn en Overwatch convirtiendo presión en bajas con railgun y ángulos.',
  'Replaid Lab',
  'sojourn',
  'dps',
  null,
  array['sojourn','dps','railgun','hitscan','6v6'],
  'guide',
  '2026-05-05 12:10:00+00',
  '2026-05-05 12:10:00+00'
),
(
  'Soldier: 76: consistencia, sprint y off-angles',
  'soldier-76-guia-overwatch-off-angles',
  $md$
## Soldier gana por constancia útil

Soldier no necesita jugadas espectaculares para tener impacto. Su valor llega de presionar desde ángulos laterales, castigar rotaciones y reposicionarse antes de que el rival le cierre.

## Prioridades

- Toma off-angles que puedas abandonar con Sprint.
- Usa Biotic Field para sostener una posición, no para tankear sin cobertura.
- Dispara a objetivos que estén cruzando o sin recursos.
- Tactical Visor funciona mejor cuando el rival ya gastó defensivos.

## Errores comunes

Jugar toda la partida detrás del tank. Si Soldier no abre una línea secundaria, el rival solo necesita mirar al frente.

> **6V6**
> En 6v6 Soldier puede aportar presión constante desde ángulos seguros. Como hay más peel, importa mucho no obsesionarse con duelos imposibles.
$md$,
  'Héroe',
  true,
  'Guía de Soldier: 76 en Overwatch: off-angles, Sprint, Biotic Field y Visor.',
  'Guía de Soldier 76 en Overwatch',
  'Aprende a jugar Soldier: 76 en Overwatch con consistencia, ángulos laterales y presión útil.',
  'Replaid Lab',
  'soldier-76',
  'dps',
  null,
  array['soldier-76','dps','hitscan','off-angles','6v6'],
  'guide',
  '2026-05-05 12:15:00+00',
  '2026-05-05 12:15:00+00'
),
(
  'Genji: entrar tarde y salir con recursos',
  'genji-guia-overwatch-dash-deflect',
  $md$
## Genji castiga ventanas, no equipos enteros

Genji brilla cuando entra después de que el rival ha gastado recursos. Su movilidad le permite confirmar bajas, pero si inicia demasiado pronto suele absorber todo el peel.

## Prioridades

- Guarda Dash para confirmar o salir.
- Usa Deflect contra daño previsible, no por nervios.
- Busca objetivos tocados o aislados.
- Dragonblade necesita recursos aliados o cooldowns enemigos gastados.

## Pregunta de replay

Antes de cada muerte, mira si entraste cuando tu equipo también presionaba. Si nadie podía seguirte, probablemente no era una entrada: era una apuesta.

> **6V6**
> En 6v6 Genji encuentra más peel y menos kills gratis. Suele sacar más valor entrando tarde, cuando los tanks ya han fijado miradas.
$md$,
  'Héroe',
  true,
  'Guía de Genji en Overwatch: Dash, Deflect, Dragonblade y timing de entrada.',
  'Guía de Genji en Overwatch',
  'Aprende a jugar Genji en Overwatch entrando en la ventana correcta y saliendo con recursos.',
  'Replaid Lab',
  'genji',
  'dps',
  null,
  array['genji','dps','dive','dragonblade','6v6'],
  'guide',
  '2026-05-05 12:20:00+00',
  '2026-05-05 12:20:00+00'
),
(
  'Echo: burst vertical y copias con propósito',
  'echo-guia-overwatch-burst-vertical',
  $md$
## Echo amenaza desde ángulos raros

Echo funciona cuando aparece desde una línea que el rival no puede controlar gratis. Su burst castiga objetivos tocados y su movilidad le permite cambiar de altura con facilidad.

## Prioridades

- Entra desde cobertura, no volando en línea recta.
- Usa Sticky Bombs cuando el objetivo no pueda esconderse rápido.
- Focusing Beam remata, no inicia.
- Duplicate debe copiar una herramienta útil para esa pelea, no solo un héroe llamativo.

## Cómo te contestan

Hitscans, D.Va, presión sobre tu support y mapas cerrados pueden limitarte. Echo necesita elegir bien sus ventanas para no convertirse en daño gratis.

> **6V6**
> En 6v6 Echo tiene más objetivos y más caos, pero también más recursos para bajarla. Duplicate gana valor cuando copia un tank o support que cambia el tempo.
$md$,
  'Héroe',
  true,
  'Guía de Echo en Overwatch: vuelo, burst, Focusing Beam y Duplicate.',
  'Guía de Echo en Overwatch',
  'Aprende a jugar Echo en Overwatch con presión vertical, burst y copias que cambian peleas.',
  'Replaid Lab',
  'echo',
  'dps',
  null,
  array['echo','dps','flyers','burst','6v6'],
  'guide',
  '2026-05-05 12:25:00+00',
  '2026-05-05 12:25:00+00'
),
(
  'Pharah: presión aérea sin quedarte vendida',
  'pharah-guia-overwatch-presion-aerea',
  $md$
## Pharah juega con líneas de visión

Pharah no gana por estar siempre en el cielo. Gana cuando usa paredes, tejados y esquinas para asomar desde ángulos incómodos y desaparecer antes de recibir todo el foco.

## Prioridades

- Usa cobertura vertical, no solo altura.
- Castiga grupos y supports sin movilidad.
- Cambia el ángulo después de cada presión fuerte.
- Barrage necesita setup: CC aliado, recursos enemigos gastados o sorpresa.

## Cómo te castigan

Hitscans, D.Va, presión coordinada y mapas cerrados limitan mucho tu margen. Si el rival siempre sabe desde dónde vas a aparecer, Pharah pierde la sorpresa.

> **6V6**
> En 6v6 Pharah puede dividir mucha atención, pero hay más herramientas para contestarla. Su mejor ventana aparece cuando el equipo terrestre también presiona.
$md$,
  'Héroe',
  true,
  'Guía de Pharah en Overwatch: presión aérea, cobertura vertical y Barrage.',
  'Guía de Pharah en Overwatch',
  'Aprende a jugar Pharah en Overwatch usando líneas de visión, presión aérea y timing de Barrage.',
  'Replaid Lab',
  'pharah',
  'dps',
  null,
  array['pharah','dps','flyers','barrage','6v6'],
  'guide',
  '2026-05-05 12:30:00+00',
  '2026-05-05 12:30:00+00'
),
(
  'Widowmaker: amenaza, paciencia y líneas limpias',
  'widowmaker-guia-overwatch-lineas-vision',
  $md$
## Widow gana antes de disparar

Widowmaker cambia la partida cuando obliga al rival a moverse distinto. A veces el valor no es la kill inmediata, sino negar una calle entera o forzar una rotación lenta.

## Prioridades

- Cambia posición después de enseñar una línea fuerte.
- No busques duelos si el rival ya te está esperando.
- Usa Grapple como vida extra, no como capricho.
- Infra-Sight gana peleas cuando tu equipo usa la información para tomar espacio.

## Cómo te presionan

Dive, shields, spam y rutas cerradas pueden sacarte de la partida. Si no puedes encontrar líneas limpias, quizá toca cambiar o jugar más cerca de tu equipo.

> **6V6**
> En 6v6 hay más barreras y más cuerpos, así que Widow necesita más paciencia. Una sola baja sigue cambiando peleas, pero encontrar la línea cuesta más.
$md$,
  'Héroe',
  true,
  'Guía de Widowmaker en Overwatch: líneas de visión, Grapple, presión y rotaciones.',
  'Guía de Widowmaker en Overwatch',
  'Aprende a jugar Widowmaker en Overwatch creando amenaza con líneas limpias y buen reposicionamiento.',
  'Replaid Lab',
  'widowmaker',
  'dps',
  null,
  array['widowmaker','dps','sniper','mapas','6v6'],
  'guide',
  '2026-05-05 12:35:00+00',
  '2026-05-05 12:35:00+00'
),
(
  'Kiriko: suzu, presión y tempo de support',
  'kiriko-guia-overwatch-suzu-tempo',
  $md$
## Kiriko decide ventanas

Kiriko no es solo una support evasiva. Suzu puede negar la jugada clave del rival, Swift Step corrige posiciones y Kunai amenaza a quien juega demasiado cómodo.

## Prioridades

- Guarda Suzu para habilidades que cambian peleas.
- Usa Swift Step para reposicionarte antes de quedar atrapada.
- Alterna curas y presión cuando tu equipo está estable.
- Kitsune Rush necesita seguimiento inmediato, no contemplación.

## Errores comunes

Gastar Suzu por daño ligero o teletransportarte a un aliado que ya está muerto. Kiriko tiene margen, pero si quema sus dos respuestas, el rival puede castigarla.

> **6V6**
> En 6v6 Suzu gana todavía más valor por la cantidad de ultimates y CC. La prioridad es identificar qué recurso enemigo merece tu cleanse.
$md$,
  'Héroe',
  true,
  'Guía de Kiriko en Overwatch: Suzu, Swift Step, Kunai y Kitsune Rush.',
  'Guía de Kiriko en Overwatch',
  'Aprende a jugar Kiriko en Overwatch usando Suzu, movilidad y presión sin perder tempo de curas.',
  'Replaid Lab',
  'kiriko',
  'support',
  null,
  array['kiriko','support','suzu','tempo','6v6'],
  'guide',
  '2026-05-05 12:40:00+00',
  '2026-05-05 12:40:00+00'
),
(
  'Lúcio: speed, peel y peleas con ritmo',
  'lucio-guia-overwatch-speed-peel',
  $md$
## Lúcio cambia el tempo del equipo

Lúcio no se mide solo por curación. Speed abre peleas, salva rotaciones y permite que composiciones de brawl lleguen donde quieren antes de perder recursos.

## Prioridades

- Usa speed para cruzar espacios peligrosos o perseguir ventajas.
- Cambia a heal cuando el equipo necesita estabilizar, no por inercia.
- Boop corta entradas, salva aliados y desplaza objetivos.
- Sound Barrier debe responder a burst real o asegurar una entrada decisiva.

## Errores comunes

Irte de flanco cuando tu equipo necesitaba speed o quedarte curando lento mientras el rival kitea. Lúcio vale por ritmo, no por números bonitos.

> **6V6**
> En 6v6 Speed puede coordinar dos tanks y hacer el brawl muy difícil de frenar. También hay más ultimates que exigen un Beat disciplinado.
$md$,
  'Héroe',
  true,
  'Guía de Lúcio en Overwatch: speed, boop, peel y Sound Barrier.',
  'Guía de Lúcio en Overwatch',
  'Aprende a jugar Lúcio en Overwatch controlando el tempo con speed, peel y buenas ultimates.',
  'Replaid Lab',
  'lucio',
  'support',
  null,
  array['lucio','support','speed','brawl','6v6'],
  'guide',
  '2026-05-05 12:45:00+00',
  '2026-05-05 12:45:00+00'
),
(
  'Baptiste: cooldowns defensivos y daño útil',
  'baptiste-guia-overwatch-lamp-window',
  $md$
## Baptiste sostiene y amenaza

Baptiste puede salvar peleas con Immortality Field, curar grupos y aportar daño real desde posiciones seguras. Su valor cae cuando gasta cooldowns antes de que el rival comprometa nada.

## Prioridades

- Guarda Lamp para burst, ultimates o una entrada decisiva.
- Usa Regenerative Burst cuando varios aliados reciben presión.
- Dispara entre curas si tu equipo está estable.
- Amplification Matrix funciona mejor con una línea clara y un plan.

## Cómo se revisa

Mira cada Lamp: ¿salvó una muerte probable o solo retrasó daño normal? Si no cambia la pelea, era demasiado temprano.

> **6V6**
> En 6v6 Baptiste puede curar mucho más volumen, pero Lamp también recibe más presión. Colocarlo detrás de cobertura se vuelve todavía más importante.
$md$,
  'Héroe',
  true,
  'Guía de Baptiste en Overwatch: Immortality Field, Burst, daño y Matrix.',
  'Guía de Baptiste en Overwatch',
  'Aprende a jugar Baptiste en Overwatch con cooldowns defensivos, curas de grupo y daño útil.',
  'Replaid Lab',
  'baptiste',
  'support',
  null,
  array['baptiste','support','lamp','matrix','6v6'],
  'guide',
  '2026-05-05 12:50:00+00',
  '2026-05-05 12:50:00+00'
),
(
  'Brigitte: peel, espacio corto y anti-dive',
  'brigitte-guia-overwatch-peel-anti-dive',
  $md$
## Brigitte protege zonas pequeñas

Brigitte no quiere perseguir al rival por todo el mapa. Quiere hacer que entrar sobre su backline sea caro, molesto y lento.

## Prioridades

- Mantén Inspire activo sin regalar tu vida.
- Guarda Whip Shot para cortar entradas o negar distancia.
- Usa Repair Packs antes de que el aliado esté a un golpe de morir.
- Rally gana valor cuando tu equipo puede avanzar con seguridad.

## Errores comunes

Jugar como si fueras un tank o alejarte del compañero al que debías proteger. Brigitte gana por presencia disciplinada, no por duelos largos.

> **6V6**
> En 6v6 Brigitte puede proteger mucho mejor a supports inmóviles, pero también recibe más daño frontal. Su posición tiene que ser aún más cuidadosa.
$md$,
  'Héroe',
  true,
  'Guía de Brigitte en Overwatch: peel, Inspire, Whip Shot y Rally.',
  'Guía de Brigitte en Overwatch',
  'Aprende a jugar Brigitte en Overwatch protegiendo backline y frenando dives.',
  'Replaid Lab',
  'brigitte',
  'support',
  null,
  array['brigitte','support','anti-dive','peel','6v6'],
  'guide',
  '2026-05-05 12:55:00+00',
  '2026-05-05 12:55:00+00'
),
(
  'Mercy: pocket, resurrecciones y decisiones de tempo',
  'mercy-guia-overwatch-pocket-resurrect',
  $md$
## Mercy potencia la mejor amenaza

Mercy no consiste en curar al que grita más. Su valor aparece cuando identifica qué aliado puede convertir daño aumentado, movilidad y supervivencia en presión real.

## Prioridades

- Pocketea al aliado que esté creando amenaza, no siempre al mismo.
- Usa Guardian Angel para reposicionarte con cobertura.
- Resurrect solo vale si no regalas otra muerte.
- Valkyrie puede iniciar presión o estabilizar, según el estado de la pelea.

## Pregunta de replay

Cuando pierdes una pelea, revisa a quién estabas potenciando. Si ese aliado no podía disparar, tu beam estaba sosteniendo una jugada sin impacto.

> **6V6**
> En 6v6 Mercy puede tener más objetivos que sostener, pero su prioridad sigue siendo potenciar la condición de victoria, no repartir beam por cortesía.
$md$,
  'Héroe',
  true,
  'Guía de Mercy en Overwatch: pocket, Guardian Angel, Resurrect y Valkyrie.',
  'Guía de Mercy en Overwatch',
  'Aprende a jugar Mercy en Overwatch tomando mejores decisiones de pocket, movilidad y resurrección.',
  'Replaid Lab',
  'mercy',
  'support',
  null,
  array['mercy','support','pocket','resurrect','6v6'],
  'guide',
  '2026-05-05 13:00:00+00',
  '2026-05-05 13:00:00+00'
),
(
  'Zenyatta: discord, ángulos y supervivencia',
  'zenyatta-guia-overwatch-discord-transcendence',
  $md$
## Zenyatta gana con presión invisible

Discord Orb cambia qué objetivos puede castigar tu equipo. Zenyatta no cura como otros supports, pero convierte pequeñas ventanas de daño en amenazas enormes.

## Prioridades

- Coloca Discord sobre el objetivo que tu equipo puede pegar.
- Juega lejos, pero con ruta de escape y línea de visión.
- Usa volleys para castigar esquinas previsibles.
- Transcendence debe responder a ultimates o asegurar una pelea ganada.

## Cómo te castigan

Dive, flancos y falta de peel. Si mueres primero repetidamente, no es solo problema mecánico: tu posición probablemente no tenía salida.

> **6V6**
> En 6v6 Discord puede definir qué tank cae primero, pero Zenyatta necesita peel más claro. Hay más amenazas que pueden llegarle.
$md$,
  'Héroe',
  true,
  'Guía de Zenyatta en Overwatch: Discord Orb, ángulos, volleys y Transcendence.',
  'Guía de Zenyatta en Overwatch',
  'Aprende a jugar Zenyatta en Overwatch usando Discord, presión y posicionamiento seguro.',
  'Replaid Lab',
  'zenyatta',
  'support',
  null,
  array['zenyatta','support','discord','poke','6v6'],
  'guide',
  '2026-05-05 13:05:00+00',
  '2026-05-05 13:05:00+00'
),
(
  'Illari: pilón, daño y control de ángulos',
  'illari-guia-overwatch-pilon-dano',
  $md$
## Illari castiga desde posiciones fuertes

Illari combina curación automática con amenaza de daño. Su pilón permite sostener una zona, pero si lo colocas donde el rival lo rompe gratis, pierdes media identidad.

## Prioridades

- Coloca el pilón detrás de cobertura y con línea útil.
- Usa tu daño para presionar ángulos, no para abandonar al equipo.
- Cambia de posición si el rival ya encontró el pilón.
- Captive Sun necesita seguimiento o targets sin cleanse.

## Errores comunes

Dejar el pilón en el mismo sitio toda la ronda o asomar como DPS sin plan de salida. Illari pega mucho, pero sigue siendo support.

> **6V6**
> En 6v6 el pilón puede sostener más volumen, aunque también hay más spam para romperlo. La colocación importa todavía más.
$md$,
  'Héroe',
  true,
  'Guía de Illari en Overwatch: pilón, daño, ángulos y Captive Sun.',
  'Guía de Illari en Overwatch',
  'Aprende a jugar Illari en Overwatch con buen pilón, presión desde ángulos y curas eficientes.',
  'Replaid Lab',
  'illari',
  'support',
  null,
  array['illari','support','pilon','dano','6v6'],
  'guide',
  '2026-05-05 13:10:00+00',
  '2026-05-05 13:10:00+00'
),
(
  'Moira: recursos, supervivencia y valor real',
  'moira-guia-overwatch-recursos-supervivencia',
  $md$
## Moira no es solo sobrevivir

Moira tiene mucha autonomía, pero eso no significa jugar desconectada. Su valor está en sostener peleas largas, castigar objetivos bajos y sobrevivir a presión que rompería a otros supports.

## Prioridades

- Gestiona biotic energy antes de que la pelea se alargue.
- Usa Fade para sobrevivir o reposicionarte, no para entrar sin salida.
- Alterna orbes según el plan: daño para presión, curación para estabilizar.
- Coalescence puede iniciar tempo o salvar una pelea rota.

## Error común

Buscar duelos mientras tu equipo pierde recursos. Si tu daño no termina en baja, espacio o cooldowns enemigos, quizá solo estás abandonando tu función.

> **6V6**
> En 6v6 Moira puede curar muchísimo volumen, pero debe evitar gastar todo antes de la pelea real. La gestión de recursos pesa más.
$md$,
  'Héroe',
  true,
  'Guía de Moira en Overwatch: biotic energy, Fade, orbes y Coalescence.',
  'Guía de Moira en Overwatch',
  'Aprende a jugar Moira en Overwatch gestionando recursos, supervivencia y daño útil.',
  'Replaid Lab',
  'moira',
  'support',
  null,
  array['moira','support','recursos','supervivencia','6v6'],
  'guide',
  '2026-05-05 13:15:00+00',
  '2026-05-05 13:15:00+00'
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
