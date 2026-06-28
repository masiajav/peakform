export type EditorialFaq = {
  question: string
  answer: string
}

export type EditorialLink = {
  href: string
  label: string
}

export type CounterThreat = {
  name: string
  href: string
  danger: string
  signal: string
  response: string
}

export type CounterPillar = {
  slug: string
  name: string
  role: string
  updatedAt: string
  reviewedPatch: string
  seoTitle: string
  seoDescription: string
  h1: string
  intro: string[]
  summary: string[]
  threats: CounterThreat[]
  cooldownWindows: { title: string; body: string }[]
  adaptations: string[]
  mistakes: string[]
  examples: { title: string; body: string }[]
  checklist: string[]
  faqs: EditorialFaq[]
  links: EditorialLink[]
}

export type TeamComposition = {
  name: string
  format: '5v5' | '6v6'
  style: string
  lineup: string[]
  winCondition: string
  engagePlan: string
  goodMaps: string
  weakAgainst: string
  substitutions: string
}

export type TeamCompPillar = {
  slug: string
  name: string
  updatedAt: string
  reviewedPatch: string
  seoTitle: string
  seoDescription: string
  h1: string
  intro: string[]
  summary: string[]
  compositions: TeamComposition[]
  responsibilities: { title: string; body: string }[]
  rotationPlan: string[]
  weaknesses: string[]
  examples: { title: string; body: string }[]
  checklist: string[]
  faqs: EditorialFaq[]
  links: EditorialLink[]
}

const SHION_COUNTER: CounterPillar = {
  slug: 'shion',
  name: 'Shion',
  role: 'DPS',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, ajuste de Execution',
  seoTitle: 'Counters de Shion en Overwatch: cómo frenarla en ranked',
  seoDescription: 'Aprende cómo jugar contra Shion en Overwatch: mejores counters, ventanas tras Evade, Joyride y Execution, errores habituales y respuestas por rol.',
  h1: 'Counters de Shion en Overwatch: cómo frenarla en ranked',
  intro: [
    'Shion es más peligrosa cuando encuentra un lateral sin vigilar, entra después de que gastes control y convierte a un enemigo tocado en una baja. Counterearla no consiste en perseguir su moto por todo el mapa. Consiste en quitarle la entrada limpia y castigar el momento en que ya no tiene una salida cómoda.',
    'El último ajuste a Execution ha reducido su margen para cerrar remates, pero sigue castigando mucho a los equipos que se separan o gastan recursos por ansiedad. Aquí tienes respuestas concretas para jugar el matchup sin cambiar automáticamente de héroe.',
  ],
  summary: [
    'Vigila la ruta lateral antes de que empiece la pelea.',
    'Guarda control o peel para cuando termine Evade.',
    'No persigas Joyride si abandonarás a tu backline.',
    'Presiona a Shion después de una Execution fallada.',
  ],
  threats: [
    {
      name: 'Brigitte',
      href: '/heroes/brigitte',
      danger: 'Protege al objetivo que Shion quiere rematar y convierte una entrada agresiva en una pelea larga que no le interesa.',
      signal: 'Shion aparece sobre un support o usa Evade para acercarse.',
      response: 'Mantén distancia de Whip Shot, espera a que Brigitte gaste peel y evita pelear dentro de Inspire sin ayuda.',
    },
    {
      name: 'Cassidy',
      href: '/heroes/cassidy',
      danger: 'Controla el rango medio y castiga una ruta repetida cuando Shion ya ha gastado movilidad.',
      signal: 'Cassidy conserva su recurso de control y juega cerca de la backline.',
      response: 'No entres por el mismo ángulo. Fuerza primero su atención o su cooldown y busca un objetivo distinto.',
    },
    {
      name: 'Ana',
      href: '/heroes/ana',
      danger: 'Sleep Dart puede terminar la entrada y Biotic Grenade elimina el margen de curación en un duelo ajustado.',
      signal: 'Ana aún no ha usado Sleep y tiene visión directa de la ruta de Shion.',
      response: 'Amenaza desde cobertura, espera el disparo o entra cuando Ana esté ocupada respondiendo al engage principal.',
    },
    {
      name: 'D.Va',
      href: '/heroes/dva',
      danger: 'Puede contestar el lateral, cubrir supports y negar parte de la presión sin abandonar del todo la frontline.',
      signal: 'D.Va guarda Boosters y gira en cuanto Shion muestra la entrada.',
      response: 'Haz que decida entre seguirte o proteger el frente. Si te persigue, sal; tu equipo ya ha ganado espacio.',
    },
    {
      name: 'Sombra',
      href: '/heroes/sombra',
      danger: 'Un hack bien medido rompe el timing de Joyride o deja a Shion expuesta después de entrar.',
      signal: 'Sombra no aparece en la frontal y la backline rival juega demasiado tranquila.',
      response: 'Evita entradas largas sin información. Juega cerca de cobertura y conserva Evade hasta confirmar dónde está.',
    },
    {
      name: 'Junkrat',
      href: '/heroes/junkrat',
      danger: 'Mina y trampa convierten pasillos estrechos y rutas previsibles en zonas muy caras para Shion.',
      signal: 'La ruta lateral tiene poca visibilidad o un health pack fácil de preparar.',
      response: 'No repitas ese pasillo. Busca altura, limpia la trampa desde rango o acompaña la entrada de tu Tank.',
    },
  ],
  cooldownWindows: [
    { title: 'Después de Evade', body: 'Es la ventana más sencilla. Si Shion usa Evade hacia delante, pierde una parte importante de su salida. No gastes todo durante la animación: espera a que termine y concentra daño entonces.' },
    { title: 'Execution fallada', body: 'La recuperación añadida deja un momento más claro para responder. Cúbrete del disparo y avanza cuando falle; obligarla a retroceder ya corta el remate que estaba buscando.' },
    { title: 'Joyride comprometida', body: 'No sigas la moto por reflejo. Mira dónde desmonta y quién queda desprotegido. Si dos personas la persiguen, Shion puede ganar la pelea sin conseguir una baja.' },
    { title: 'Ultimate sin objetivos', body: 'Satsuriku Spree necesita una pelea abierta y blancos claros. Separación, cobertura y defensivos guardados reducen mucho su valor. Correr en línea recta suele facilitarle el siguiente avance.' },
  ],
  adaptations: [
    'Juega a una esquina de tu support si eres DPS. No hace falta pegarte a él, pero sí poder girarte cuando Shion enseñe el lateral.',
    'Como Tank, no abandones la frontline para perseguirla. Corta su salida o fuerza al resto del equipo rival mientras Shion está lejos.',
    'Como Support, cambia la posición después de cada pelea. Shion gana mucho valor cuando conoce de antemano tu ruta y tu cobertura.',
    'Si repite el mismo ángulo, prepara la respuesta antes de verla: mira la entrada, conserva el cooldown y comunica la ruta.',
    'Cambia de héroe solo cuando tu kit no puede responder y tampoco puedes corregir posición o timing. Un counter ayuda, pero no arregla una backline siempre aislada.',
  ],
  mistakes: [
    'Perseguir Joyride hasta perder la línea de visión del equipo.',
    'Gastar Sleep, Suzu, boop o control antes de la entrada real.',
    'Dejar al support más vulnerable solo en el mismo lugar cada pelea.',
    'Intentar ganar el duelo con poca vida en vez de retroceder a cobertura.',
    'Mirar únicamente a Shion y regalar espacio al resto de su composición.',
    'Cambiar de héroe después de una muerte sin revisar qué cooldown estaba disponible.',
  ],
  examples: [
    { title: 'Defensa en una calle estrecha', body: 'Shion aparece por un lateral con Joyride. Cassidy no corre detrás: retrocede medio paso, mantiene visión de Ana y espera a que termine Evade. Cuando Shion intenta Execution, ambos la presionan desde dos ángulos y la obligan a salir.' },
    { title: 'Ataque contra una backline móvil', body: 'Shion entra sobre Kiriko, pero D.Va conserva Boosters. En lugar de perseguir hasta el health pack, D.Va corta la vuelta y Kiriko usa Swift Step hacia su equipo. Shion no mata y pierde toda la ventana.' },
    { title: 'Cuando no necesitas cambiar', body: 'Ana muere dos veces por jugar en el mismo high ground sin cobertura lateral. Antes de cambiar a Moira, ajusta la posición, guarda Sleep y pide a su DPS que vigile la ruta. El problema era la preparación, no el pick.' },
  ],
  checklist: [
    'Sé por qué lateral puede entrar Shion.',
    'Conservo una respuesta para después de Evade.',
    'No abandono a mi equipo para perseguir Joyride.',
    'Castigo una Execution fallada sin sobreextenderme.',
    'Cambio de posición si Shion ya ha leído mi ruta.',
    'Reviso si la amenaza real es Shion o el espacio que crea para su equipo.',
  ],
  faqs: [
    { question: '¿Cuál es el mejor counter de Shion?', answer: 'No hay uno universal. Brigitte y Cassidy protegen bien la backline, Ana castiga entradas previsibles y D.Va puede contestar sus laterales. El mejor pick depende del mapa y de quién sea el objetivo de Shion.' },
    { question: '¿Cómo se counterea Joyride?', answer: 'Anticipa la ruta, evita perseguir sin información y guarda control para el desmontaje o la salida. Muchas veces basta con negar la baja y volver a la pelea principal.' },
    { question: '¿Cuándo debo atacar a Shion?', answer: 'Después de Evade, tras una Execution fallada o cuando Joyride la deja lejos de cobertura. Son ventanas más fiables que intentar acertarle todos los recursos durante su movilidad.' },
    { question: '¿Debo cambiar de support contra Shion?', answer: 'Solo si tu héroe no puede sobrevivir ni recibir peel en ese mapa. Primero prueba a variar posición, conservar movilidad y jugar más cerca de una respuesta del equipo.' },
    { question: '¿El nerf de Execution ha eliminado a Shion?', answer: 'No. La hace menos permisiva y deja una respuesta más clara cuando falla, pero su movilidad y presión lateral siguen siendo peligrosas contra equipos desordenados.' },
  ],
  links: [
    { href: '/heroes/shion', label: 'Guía completa de Shion' },
    { href: '/team-comps/shion', label: 'Composiciones con Shion' },
    { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
    { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Cómo revisar una VOD' },
    { href: '/overwatch-temporada-3-into-the-tigers-den', label: 'Todo sobre la Season 3' },
    { href: '/experts', label: 'Revisar una VOD con un experto' },
  ],
}

const SHION_TEAM_COMP: TeamCompPillar = {
  slug: 'shion',
  name: 'Shion',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, ajuste de Execution',
  seoTitle: 'Composiciones con Shion en Overwatch: dive, rush y 6v6',
  seoDescription: 'Composiciones recomendadas con Shion en Overwatch: lineups de dive, rush y 6v6, condición de victoria, rotaciones, sustituciones y errores que evitar.',
  h1: 'Composiciones con Shion en Overwatch: dive, rush y 6v6',
  intro: [
    'Shion necesita que la pelea empiece antes de quedarse sola en el lateral. Sus mejores composiciones crean una distracción clara, fuerzan cooldowns defensivos y le permiten entrar sobre un objetivo ya tocado. Si todo el equipo espera que Shion abra la pelea por sí misma, acaba gastando Joyride o Evade sin una salida limpia.',
    'Estas composiciones son puntos de partida para ranked, no recetas que ganan solas. Ajusta el lineup al mapa, al rival y a los héroes que vuestro equipo pueda jugar con confianza.',
  ],
  summary: [
    'Dive le da objetivos y timing de entrada.',
    'Rush reduce el espacio que el rival tiene para kitear.',
    'En 6v6, el segundo Tank puede cubrir la retirada.',
    'La condición común es entrar juntos, no acumular daño sin objetivo.',
  ],
  compositions: [
    {
      name: 'Dive sobre backline',
      format: '5v5',
      style: 'Dive',
      lineup: ['Winston', 'Shion', 'Tracer', 'Ana', 'Kiriko'],
      winCondition: 'Winston fuerza atención y burbuja; Shion y Tracer convierten el cooldown defensivo que salga primero en una ventana de remate.',
      engagePlan: 'Ana prepara daño o Sleep, Winston salta con salida prevista y Shion entra medio segundo después. Kiriko conserva Suzu o Swift Step para estabilizar la retirada.',
      goodMaps: 'Mapas con altura, laterales y coberturas que permitan preparar el salto sin cruzar una calle abierta.',
      weakAgainst: 'Anti-dive compacto, Brigitte cerca de la backline y equipos que conservan todos sus recursos para el mismo objetivo.',
      substitutions: 'D.Va por Winston para más peel; Genji por Tracer si necesitas burst vertical; Juno por Ana cuando la velocidad de rotación sea más importante.',
    },
    {
      name: 'Rush de pelea corta',
      format: '5v5',
      style: 'Rush',
      lineup: ['Junker Queen', 'Shion', 'Cassidy', 'Lúcio', 'Kiriko'],
      winCondition: 'Cerrar distancia con velocidad, forzar una pelea corta y permitir que Shion ataque el lateral cuando el rival ya mira a Junker Queen.',
      engagePlan: 'Lúcio no gasta speed durante la rotación fácil. El equipo llega a cobertura, Junker Queen marca la entrada y Shion busca el segundo ángulo, no una aventura distinta.',
      goodMaps: 'Control y zonas con esquinas cercanas, rutas cortas y objetivos que obligan al rival a entrar en rango medio.',
      weakAgainst: 'Poke en mapas abiertos, high ground difícil de contestar y composiciones capaces de separarse sin ceder el objetivo.',
      substitutions: 'Reinhardt por Junker Queen en brawl más frontal; Mei por Cassidy para cortar retiradas; Juno por Lúcio si el equipo necesita más alcance en la rotación.',
    },
    {
      name: 'Dive con salida cubierta',
      format: '6v6',
      style: 'Dive',
      lineup: ['Winston', 'D.Va', 'Shion', 'Tracer', 'Ana', 'Juno'],
      winCondition: 'El doble Tank divide la atención: Winston abre la pelea y D.Va decide entre acompañar el dive o proteger la salida de Ana mientras Shion remata.',
      engagePlan: 'Preparad dos oleadas. Winston y Tracer fuerzan recursos primero; Shion entra cuando aparezca una vida baja. D.Va conserva Matrix para la retirada o para negar la respuesta rival.',
      goodMaps: 'Mapas con varias alturas y rutas donde dos Tanks móviles puedan entrar desde ángulos distintos sin perder a sus supports.',
      weakAgainst: 'Brawl muy cerrado, control acumulado y equipos que sobreviven a la primera oleada sin gastar recursos importantes.',
      substitutions: 'Kiriko por Juno para limpieza; Genji por Tracer si el mapa premia verticalidad; Wrecking Ball por Winston si el jugador domina las rutas.',
    },
  ],
  responsibilities: [
    { title: 'Tank', body: 'Debe empezar una amenaza que Shion pueda leer. Entrar sin avisar o permanecer pasivo obliga a la DPS a decidir entre esperar eternamente o suicidarse en el lateral.' },
    { title: 'Segundo DPS', body: 'Presiona desde otro ángulo y evita competir por el mismo objetivo. Tracer, Cassidy o Mei aportan cosas distintas, pero todos deben convertir la atención que Shion desplaza.' },
    { title: 'Supports', body: 'Necesitan visión de la entrada y una respuesta reservada. No hace falta perseguir a Shion por todo el mapa; sí reconocer dónde terminará su ruta y cuándo podrá volver.' },
    { title: 'Shion', body: 'No abre sola por defecto. Espera la primera reacción, elige un objetivo tocado y conserva una herramienta de salida. Su trabajo es cerrar la ventana, no crear una pelea de diez segundos lejos del equipo.' },
  ],
  rotationPlan: [
    'Llega a cobertura sin gastar la velocidad o movilidad que necesitas para el engage.',
    'Muestra presión frontal para descubrir dónde están el control y el peel rival.',
    'Haz que Tank y primer DPS fuercen una reacción antes de comprometer a Shion.',
    'Entra sobre el mismo sector, aunque no todos disparen al mismo objetivo desde el primer segundo.',
    'Si no sale una baja, retrocede con recursos y prepara una segunda oleada; no conviertas el engage en una persecución.',
  ],
  weaknesses: [
    'Cada jugador entra en un momento distinto y el rival recupera cooldowns entre intentos.',
    'Shion usa Joyride para llegar y Evade para entrar, quedándose sin una salida razonable.',
    'Los supports siguen una ruta imposible para mantener visión de una DPS demasiado profunda.',
    'El equipo dispara al Tank mientras Shion amenaza una backline que nadie más puede tocar.',
    'Se insiste en dive dentro de un mapa cerrado contra varias respuestas anti-dive sin adaptar el ritmo.',
    'La composición cambia tres héroes después de una pelea perdida en vez de corregir la coordinación.',
  ],
  examples: [
    { title: 'Dive que sí está coordinado', body: 'Winston marca a Ana, salta y recibe Sleep. Shion no entra antes: espera ese cooldown, usa el lateral y obliga a Kiriko a gastar Suzu. Aunque no haya baja, la segunda entrada llega con dos defensivos menos.' },
    { title: 'Rush en punto cerrado', body: 'Lúcio guarda speed hasta la esquina. Junker Queen acelera sobre Cassidy rival y Shion entra por el lateral corto cuando todos miran al frente. La composición funciona porque las dos amenazas llegan juntas.' },
    { title: 'Una retirada útil', body: 'Shion falla Execution y D.Va rival gira. En vez de insistir, usa Evade para salir mientras Winston mantiene burbuja. El equipo conserva vidas y repite el engage antes de que vuelvan todos los recursos rivales.' },
  ],
  checklist: [
    'La composición tiene una forma clara de iniciar.',
    'Shion sabe qué reacción está esperando antes de entrar.',
    'Los supports pueden mantener visión sin abandonar cobertura.',
    'Hay una respuesta para peel o limpieza.',
    'El equipo conoce la ruta de salida si no aparece una baja.',
    'El mapa permite ejecutar el estilo elegido.',
  ],
  faqs: [
    { question: '¿Cuál es la mejor composición con Shion?', answer: 'Dive suele encajar muy bien porque le da timing y objetivos. Rush también funciona en mapas cerrados. La mejor elección depende del mapa y de si el equipo puede entrar de forma coordinada.' },
    { question: '¿Shion necesita a Winston?', answer: 'No, pero Winston crea una distracción muy clara y puede aislar la zona donde Shion quiere rematar. D.Va, Junker Queen o Reinhardt funcionan con planes distintos.' },
    { question: '¿Qué support combina mejor con Shion?', answer: 'Kiriko aporta limpieza y movilidad; Ana prepara objetivos y Nano; Lúcio o Juno mejoran el ritmo de entrada. No hay una pareja obligatoria.' },
    { question: '¿Shion sirve en poke?', answer: 'Puede aportar un lateral, pero no es donde su kit resulta más natural. Si la composición nunca cierra distancia ni crea caos, Shion tendrá pocas ventanas seguras para rematar.' },
    { question: '¿Qué cambia en 6v6?', answer: 'Hay más peel y recursos defensivos, pero también un segundo Tank que puede cubrir la entrada o la retirada. Conviene pensar en dos oleadas en lugar de invertirlo todo en el primer salto.' },
  ],
  links: [
    { href: '/heroes/shion', label: 'Guía completa de Shion' },
    { href: '/counters/shion', label: 'Counters de Shion' },
    { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo elegir entre dive, poke y brawl' },
    { href: '/guides/como-usar-ultimates-overwatch', label: 'Cómo usar ultimates' },
    { href: '/overwatch-temporada-3-into-the-tigers-den', label: 'Todo sobre la Season 3' },
    { href: '/experts', label: 'Revisar una composición en tu VOD' },
  ],
}

export function getCounterPillar(slug: string) {
  return slug === SHION_COUNTER.slug ? SHION_COUNTER : null
}

export function getTeamCompPillar(slug: string) {
  return slug === SHION_TEAM_COMP.slug ? SHION_TEAM_COMP : null
}
