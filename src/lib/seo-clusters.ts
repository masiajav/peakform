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

const ANA_COUNTER: CounterPillar = {
  slug: 'ana',
  name: 'Ana',
  role: 'Support',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, Into the Tiger\'s Den',
  seoTitle: 'Counters de Ana en Overwatch: cómo presionarla en ranked',
  seoDescription: 'Aprende a jugar contra Ana en Overwatch: mejores counters, ventanas tras Sleep Dart y Granada Biótica, adaptaciones por rol y errores que debes evitar.',
  h1: 'Counters de Ana en Overwatch: cómo presionarla en ranked',
  intro: [
    'Ana controla una pelea cuando puede verla desde una posición cómoda. Desde ahí sostiene a su Tank, corta curación con Granada Biótica y conserva Sleep Dart para cualquier entrada. La forma más fiable de frenarla no es lanzarse sobre ella sin pensar, sino obligarla a mirar dos amenazas y gastar uno de sus cooldowns antes del engage importante.',
    'También conviene distinguir entre molestar a Ana y regalarle una baja. Un flanker que entra solo, recibe Sleep y obliga a su equipo a retroceder no la está countereando. La presión funciona cuando tiene timing, una ruta de salida y alguien preparado para aprovechar el recurso que Ana acaba de gastar.',
  ],
  summary: [
    'Corta su línea de visión antes de comprometer recursos.',
    'Fuerza Sleep Dart antes de la entrada principal.',
    'Ataca después de Granada Biótica, no mientras aún la conserva.',
    'No despiertes a un aliado dormido sin poder protegerlo.',
  ],
  threats: [
    {
      name: 'Winston',
      href: '/heroes/winston',
      danger: 'Su salto y Barrier Projector aíslan a Ana de su equipo y hacen incómodo acertar Sleep o recibir ayuda desde la frontal.',
      signal: 'Ana juega lejos de su segundo support o ha gastado Granada Biótica en la frontline.',
      response: 'Salta con una ruta de vuelta y coloca la barrera entre Ana y sus aliados. Si no cae rápido, fuerza recursos y sal antes de quedarte sin armadura.',
    },
    {
      name: 'D.Va',
      href: '/heroes/dva',
      danger: 'Defense Matrix puede negar Granada Biótica y parte de su curación mientras Boosters permiten contestar posiciones elevadas.',
      signal: 'Ana asoma sin cobertura cercana o prepara la granada para salvar a un aliado bajo presión.',
      response: 'Usa Matrix con intención, no durante toda la entrada. Niega el recurso importante, acércate y conserva Boosters para volver con tu equipo.',
    },
    {
      name: 'Tracer',
      href: '/heroes/tracer',
      danger: 'Puede repetir ángulos cortos, obligar a Ana a girarse y forzar granada defensiva sin comprometer una entrada larga.',
      signal: 'Sleep Dart ya no está disponible o el otro support se ha separado para ayudar a la frontline.',
      response: 'Alterna presión y salida. Si fuerzas granada o atención, no necesitas terminar la baja: vuelve a tiempo para aprovechar la ventaja creada.',
    },
    {
      name: 'Genji',
      href: '/heroes/genji',
      danger: 'La verticalidad y Deflect complican los disparos de Ana y pueden devolver un cooldown lanzado con prisa.',
      signal: 'Ana ha usado Sleep o está mirando al Tank mientras Genji ya tiene acceso a su altura.',
      response: 'Entra después de la primera distracción y no abras con Deflect. Guárdalo para el momento en que Ana intente responder con disparo, granada o Sleep.',
    },
    {
      name: 'Sombra',
      href: '/heroes/sombra',
      danger: 'Puede negar la preparación de Ana, revelar una posición aislada y coordinar un foco antes de que llegue peel.',
      signal: 'Ana repite la misma cobertura y su equipo depende de ella para sostener una pelea larga.',
      response: 'No dispares por inercia al primer hack. Avisa, confirma que tu equipo puede seguir la presión y sal si aparece el segundo support.',
    },
    {
      name: 'Kiriko',
      href: '/heroes/kiriko',
      danger: 'Protection Suzu elimina la anti-curación y su movilidad le permite acompañar un ángulo agresivo contra Ana.',
      signal: 'Ana gasta la granada para abrir una ventana y su equipo intenta entrar inmediatamente.',
      response: 'Limpia solo cuando el efecto cambia la pelea. Después puedes buscar un ángulo corto, pero conserva Swift Step si Ana aún tiene Sleep.',
    },
  ],
  cooldownWindows: [
    { title: 'Sleep Dart fallado', body: 'Es la ventana más clara para dive o flank. Ana sigue teniendo daño y granada, así que entra desde cobertura y evita convertir la oportunidad en una persecución larga.' },
    { title: 'Granada defensiva', body: 'Si Ana se cura a sí misma con Granada Biótica, pierde su mejor herramienta para cortar la curación de tu Tank. Presiona su equipo o repite la entrada cuando termine el efecto.' },
    { title: 'Línea de visión rota', body: 'Una barrera, una esquina o una rotación vertical pueden desconectar a Ana de su objetivo. No hace falta eliminarla: varios segundos sin curación ya pueden decidir la frontline.' },
    { title: 'Nano Boost comprometido', body: 'Cuando Nano ya tiene objetivo, decide rápido si puedes kitear, usar una defensiva o castigar a Ana. Dividir daño entre el aliado nano y la backline suele ser peor que seguir un plan claro.' },
  ],
  adaptations: [
    'Juega alrededor de coberturas que corten su mira. Una esquina obliga a Ana a moverse o deja de curar al objetivo que presionas.',
    'Finge una entrada para provocar Sleep y vuelve con tu movilidad disponible. La segunda amenaza será mucho más difícil de detener.',
    'Si eres Tank, no cruces una zona abierta con anti-curación. Espera, usa cobertura y vuelve a tomar espacio cuando termine el efecto.',
    'Si eres Support, guarda limpieza o una defensiva para la granada que realmente acompaña un engage, no para cualquier punto de daño.',
    'Cambia de ruta después de que Ana te haya leído. Repetir el mismo salto o flank hace que un proyectil difícil se convierta en un disparo preparado.',
    'Cambia de héroe solo si el mapa y el matchup impiden cumplir tu función incluso después de ajustar timing, ruta y objetivo.',
  ],
  mistakes: [
    'Entrar solo mientras Ana conserva Sleep y granada.',
    'Despertar inmediatamente a un aliado dormido y regalar una baja fácil.',
    'Seguir disparando a un Tank nanoestimulado sin una condición clara.',
    'Usar toda la movilidad para llegar hasta Ana y no conservar salida.',
    'Pelear en una línea larga donde Ana ve a todo su equipo sin moverse.',
    'Cambiar a un flanker por obligación aunque no conozcas sus rutas ni timing.',
  ],
  examples: [
    { title: 'Dive sobre una altura', body: 'Winston muestra el salto, Ana lanza Sleep y falla contra la barrera. Genji espera ese momento para subir. Aunque Ana use granada y sobreviva, la frontline rival se queda varios segundos sin apoyo y debe retroceder.' },
    { title: 'Presión sin buscar la baja', body: 'Tracer obliga a Ana a usar granada defensiva y sale con Recall. Su Tank avanza entonces sobre el rival, que ya no puede recibir anti ni el aumento de curación. La jugada útil fue forzar el recurso, no insistir en el duelo.' },
    { title: 'Adaptación sin cambiar', body: 'Reinhardt recibe dos granadas al cruzar la misma calle. En la tercera pelea rota por cobertura, espera a que D.Va fuerce la granada y entra después. El pick no cambió; cambió el orden de los recursos.' },
  ],
  checklist: [
    'Sé desde qué cobertura está jugando Ana.',
    'Conozco el estado de Sleep Dart antes de entrar.',
    'Tengo una salida después de forzar granada.',
    'No despierto a un aliado sin poder salvarlo.',
    'Corto su línea de visión cuando no puedo alcanzarla.',
    'Distingo entre forzar recursos y perseguir una baja.',
  ],
  faqs: [
    { question: '¿Cuál es el mejor counter de Ana?', answer: 'Winston, D.Va, Tracer y Genji pueden presionarla de formas distintas, pero ninguno funciona entrando solo. El mejor counter es el que puede acceder a su posición, forzar recursos y salir con el equipo preparado para aprovecharlo.' },
    { question: '¿Cómo evito Sleep Dart?', answer: 'Varía el timing, entra desde un ángulo menos obvio y usa cobertura o barreras. También puedes amagar la entrada para provocar el disparo antes de comprometer movilidad.' },
    { question: '¿Qué hago cuando Ana usa Granada Biótica sobre mi Tank?', answer: 'Deja de invertir curación inútil, usa cobertura y espera a que termine si no hay limpieza disponible. Entrar más profundo mientras el Tank no puede recibir curación suele convertir una desventaja corta en una pelea perdida.' },
    { question: '¿Kiriko anula por completo a Ana?', answer: 'No. Suzu responde a la granada, pero tiene otros usos y Ana puede forzarlo antes de un engage. El matchup depende de quién consigue que el rival gaste primero su recurso importante.' },
    { question: '¿Tengo que jugar dive contra Ana?', answer: 'No siempre. También puedes romper su línea de visión con barreras, poke desde un ángulo que la obligue a moverse o una rotación que acerque la pelea. Lo importante es que no juegue cómoda desde el mismo sitio.' },
  ],
  links: [
    { href: '/heroes/ana', label: 'Guía completa de Ana' },
    { href: '/team-comps/ana', label: 'Composiciones con Ana' },
    { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar de héroe' },
    { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
    { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Cómo revisar una VOD' },
    { href: '/experts', label: 'Revisar una partida con un experto' },
  ],
}

const ANA_TEAM_COMP: TeamCompPillar = {
  slug: 'ana',
  name: 'Ana',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, Into the Tiger\'s Den',
  seoTitle: 'Composiciones con Ana en Overwatch: dive, brawl y 6v6',
  seoDescription: 'Descubre composiciones con Ana en Overwatch para dive, brawl y 6v6: lineups, Nano Boost, rotaciones, responsabilidades, debilidades y sustituciones.',
  h1: 'Composiciones con Ana en Overwatch: dive, brawl y 6v6',
  intro: [
    'Ana encaja mejor en equipos que le ofrecen una línea de visión estable y convierten sus cooldowns en una acción inmediata. Sleep Dart detiene una entrada, Granada Biótica abre una ventana y Nano Boost acelera a un aliado que ya está listo. Si el equipo no puede aprovechar ninguna de esas tres cosas, Ana termina curando desde lejos sin cambiar el rumbo de la pelea.',
    'Una buena composición con Ana también debe pensar en su supervivencia. No necesita que cuatro jugadores permanezcan pegados a ella, pero sí una ruta de retirada, alguien capaz de responder a dive y un frente que no desaparezca detrás de dos paredes cada vez que empieza el engage.',
  ],
  summary: [
    'Una frontline visible que no obligue a Ana a cruzar zonas abiertas.',
    'Un objetivo claro para Nano Boost antes de empezar la pelea.',
    'Peel o presión cruzada cuando el rival juega dive.',
    'Capacidad para aprovechar una buena granada en pocos segundos.',
  ],
  compositions: [
    {
      name: 'Dive con Nano coordinado',
      format: '5v5',
      style: 'Dive',
      lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Brigitte'],
      winCondition: 'Winston y los DPS fuerzan atención sobre la misma zona mientras Ana prepara daño, granada o Nano. Brigitte evita que la respuesta rival llegue gratis hasta Ana.',
      engagePlan: 'Winston marca el objetivo y entra con una salida prevista. Ana no lanza la granada por rutina: espera a que la barrera aisle al objetivo o a que aparezca el primer recurso defensivo. Genji y Tracer llegan después del salto, no antes.',
      goodMaps: 'Mapas con alturas, laterales y coberturas desde las que Ana pueda ver la entrada sin quedarse en la ruta directa del rival.',
      weakAgainst: 'Dive que alcanza a Ana antes de que su equipo esté colocado, rotaciones muy rápidas y peleas que cruzan varias paredes.',
      substitutions: 'D.Va por Winston para más peel; Echo por Tracer en mapas verticales; Kiriko por Brigitte cuando limpiar anti o control sea más importante.',
    },
    {
      name: 'Brawl con control de esquina',
      format: '5v5',
      style: 'Brawl',
      lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Ana', 'Lúcio'],
      winCondition: 'El equipo rota unido hasta una esquina, fuerza una pelea corta y usa Granada Biótica o Nano Boost para romper el intercambio frontal.',
      engagePlan: 'Lúcio guarda velocidad para cerrar el último tramo. Reinhardt toma la esquina, Mei corta la salida y Ana busca una granada cuando ambos equipos ya están comprometidos. Nano sirve para mantener el avance, no para iniciar desde demasiado lejos.',
      goodMaps: 'Calles, puntos cerrados y zonas con coberturas consecutivas donde Ana pueda avanzar de una esquina a otra.',
      weakAgainst: 'Poke desde varias alturas, flancos largos y equipos que pueden separar a Ana de la frontline antes del engage.',
      substitutions: 'Junker Queen por Reinhardt para más ritmo; Reaper por Cassidy en espacios muy cortos; Kiriko por Lúcio si el rival depende de anti-curación o control.',
    },
    {
      name: 'Doble Tank con backline protegida',
      format: '6v6',
      style: 'Dive',
      lineup: ['Winston', 'D.Va', 'Genji', 'Tracer', 'Ana', 'Brigitte'],
      winCondition: 'Winston abre la pelea, D.Va decide entre acompañar el dive y proteger a Ana, y los DPS atacan la reacción que fuerce el primer salto.',
      engagePlan: 'Ana y Brigitte fijan una posición con salida. Winston entra primero; D.Va conserva parte de Matrix para Sleep, granada o la retirada. Nano llega cuando Genji o Winston ya tienen contacto real con el objetivo.',
      goodMaps: 'Escenarios con varias alturas y rutas donde los Tanks puedan crear dos capas de presión sin perder completamente la línea de visión de Ana.',
      weakAgainst: 'Brawl cerrado que llegue junto hasta la backline y poke que obligue a Ana a moverse antes de que el dive esté preparado.',
      substitutions: 'Zarya por D.Va para proteger una entrada concreta; Echo por Tracer para presión vertical; Juno por Brigitte si el equipo necesita rotar más rápido y el dive rival no amenaza directamente a Ana.',
    },
  ],
  responsibilities: [
    { title: 'Tank', body: 'Debe pelear dentro de una línea de visión razonable y avisar antes de cruzar una esquina. Ana puede sostener una entrada agresiva, pero no puede curar a través del mapa.' },
    { title: 'DPS', body: 'Tienen que aprovechar anti-curación, Sleep y Nano. Si Ana fuerza dos recursos y nadie cambia de objetivo, su utilidad se convierte en una oportunidad perdida.' },
    { title: 'Segundo Support', body: 'Equilibra la debilidad de Ana. Brigitte aporta peel, Lúcio ayuda a rotar y Kiriko limpia efectos; la elección depende del mapa y de cómo amenaza el rival.' },
    { title: 'Ana', body: 'Juega una cobertura desde la que pueda ver la entrada y también retirarse. Su objetivo no es mantener a todos al máximo, sino conservar al equipo durante la ventana decisiva y usar utilidad con intención.' },
  ],
  rotationPlan: [
    'Elige primero la cobertura de Ana y la siguiente posición a la que puede avanzar.',
    'Rota sin gastar la movilidad o velocidad que hará falta para cerrar el engage.',
    'Muestra presión frontal y descubre qué héroe puede llegar hasta Ana.',
    'Fuerza un cooldown con el Tank o un ángulo DPS antes de lanzar la granada importante.',
    'Entra sobre el efecto de anti-curación, Sleep o Nano y termina la pelea antes de que el rival recupere recursos.',
  ],
  weaknesses: [
    'El Tank desaparece detrás de una pared y obliga a Ana a abandonar su cobertura.',
    'Granada Biótica se usa para curar daño leve antes de cada engage.',
    'Nano Boost se lanza a un aliado que todavía no puede tocar a nadie.',
    'El segundo Support sigue a la frontline y deja a Ana sola contra flankers.',
    'El equipo rota por una zona abierta sin velocidad, barrera ni presión previa.',
    'Todos esperan que Sleep Dart resuelva una entrada que nadie estaba vigilando.',
  ],
  examples: [
    { title: 'Nano con contacto real', body: 'Winston salta y obliga a Kiriko a usar Suzu. Ana espera a que la burbuja aisle a dos rivales y usa Nano cuando Winston ya está pegando. El recurso amplifica una pelea iniciada en lugar de pedir al Tank que recorra medio mapa.' },
    { title: 'Brawl que cuida la mira', body: 'Reinhardt avanza hasta una esquina y se detiene antes de cruzar la siguiente pared. Ana cambia de cobertura, Lúcio conserva velocidad y el equipo entra cuando todos vuelven a tener visión. La pausa evita una muerte que parecía falta de curación.' },
    { title: 'Peel sin abandonar la pelea', body: 'Tracer rival entra sobre Ana. Brigitte usa Whip Shot y Ana conserva Sleep. No persiguen la baja: fuerzan Recall y vuelven a mirar al frente, donde su equipo todavía puede aprovechar la ventaja de recursos.' },
  ],
  checklist: [
    'Ana tiene una cobertura y una ruta de retirada.',
    'El Tank sabe qué esquinas cortan la línea de visión.',
    'Hay un objetivo razonable para Nano Boost.',
    'Alguien puede responder al primer dive sobre la backline.',
    'La composición puede aprovechar anti-curación rápidamente.',
    'El segundo Support compensa la necesidad real del mapa.',
  ],
  faqs: [
    { question: '¿Cuál es la mejor composición con Ana?', answer: 'Ana funciona muy bien en dive coordinado y en brawl que avanza de cobertura en cobertura. La mejor composición es la que mantiene su línea de visión, aprovecha granada y Nano, y no la deja sola contra la amenaza rival.' },
    { question: '¿Qué Tank combina mejor con Ana?', answer: 'Winston aprovecha Nano y granada en dive; Reinhardt crea un frente estable en brawl; D.Va puede protegerla y negar recursos. El mapa y el estilo del equipo importan más que una pareja fija.' },
    { question: '¿Qué Support debería acompañar a Ana?', answer: 'Brigitte es útil contra dive, Lúcio facilita rotaciones y Kiriko aporta limpieza y movilidad. Elige según la amenaza que impide a Ana jugar, no solo por una combinación popular.' },
    { question: '¿Ana sirve con equipos muy móviles?', answer: 'Sí, si las entradas son previsibles y conserva visión de la zona donde terminan. Si cada aliado salta a una dirección distinta, Ana tendrá que exponerse o perderá valor.' },
    { question: '¿Cuándo debería cambiar Ana dentro de esta composición?', answer: 'Cuando el mapa o el rival le impiden sobrevivir y mantener visión incluso después de ajustar posición y pedir peel. La guía de cambio de héroe ayuda a separar un problema de pick de un problema de ejecución.' },
  ],
  links: [
    { href: '/heroes/ana', label: 'Guía completa de Ana' },
    { href: '/counters/ana', label: 'Counters de Ana' },
    { href: '/guides/como-jugar-ana-ranked-overwatch', label: 'Cómo jugar Ana en ranked' },
    { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar de héroe' },
    { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo elegir una composición' },
    { href: '/experts', label: 'Revisar una composición en tu VOD' },
  ],
}

const GENJI_COUNTER: CounterPillar = {
  slug: 'genji',
  name: 'Genji',
  role: 'DPS',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, Into the Tiger\'s Den',
  seoTitle: 'Counters de Genji en Overwatch: cómo frenar su dive',
  seoDescription: 'Aprende a jugar contra Genji en Overwatch: mejores counters, ventanas tras Swift Strike y Deflect, cómo responder a Dragonblade y errores que evitar.',
  h1: 'Counters de Genji en Overwatch: cómo frenar su dive',
  intro: [
    'Genji gana cuando convierte una vida baja en un reset de Swift Strike y usa ese impulso para encadenar la pelea. Por eso, jugar contra él no consiste en perseguir sus saltos ni en disparar todo contra Deflect. La respuesta fiable es negarle el primer remate, guardar una herramienta para su entrada real y obligarlo a salir sin reset.',
    'Dragonblade cambia el ritmo, pero la idea es la misma: separar al equipo suele facilitarle el trabajo. Cobertura, peel cercano y defensivas usadas después de que Genji se comprometa valen más que cinco jugadores corriendo en direcciones distintas.',
  ],
  summary: [
    'No dispares proyectiles importantes contra Deflect.',
    'Protege al objetivo que puede darle el primer reset.',
    'Castiga Swift Strike cuando no consigue una eliminación.',
    'Guarda una respuesta concreta para Dragonblade.',
  ],
  threats: [
    {
      name: 'Winston',
      href: '/heroes/winston',
      danger: 'Tesla Cannon mantiene presión sin depender de proyectiles que Genji pueda devolver y el salto permite seguir su movilidad vertical.',
      signal: 'Genji entra sobre un support, usa Deflect y espera una vida baja para salir con reset.',
      response: 'Salta para cortar el remate, no para perseguirlo por todo el mapa. Una vez que Genji abandone la backline, vuelve a la pelea principal.',
    },
    {
      name: 'Zarya',
      href: '/heroes/zarya',
      danger: 'Su haz atraviesa Deflect y las barreras protegen al aliado que Genji necesita eliminar para recuperar Swift Strike.',
      signal: 'Genji entra con Dash sobre un objetivo tocado o activa Dragonblade cerca de un aliado sin movilidad.',
      response: 'Reserva una barrera para el momento de contacto. Si niegas la primera baja, Genji pierde el ritmo y debe gastar movilidad para salir.',
    },
    {
      name: 'Symmetra',
      href: '/heroes/symmetra',
      danger: 'El haz y las torretas hacen incómodas las rutas cortas, revelan entradas repetidas y reducen el valor de Deflect.',
      signal: 'Genji usa siempre la misma puerta, altura o health pack para preparar el flank.',
      response: 'Coloca utilidad en la ruta, no encima del objetivo. La meta es que llegue tarde o sin recursos, no convertirte en otra persecución.',
    },
    {
      name: 'Mei',
      href: '/heroes/mei',
      danger: 'Su presión cercana no depende de proyectiles y Ice Wall puede separar a Genji del support que esperaba rematar o de su ruta de salida.',
      signal: 'Genji entra profundo después de Dash y su equipo todavía no puede seguirlo.',
      response: 'Corta la retirada o protege al objetivo vulnerable. No uses el muro demasiado pronto: espera a que Genji se comprometa.',
    },
    {
      name: 'Moira',
      href: '/heroes/moira',
      danger: 'Mantiene presión fiable a corta distancia y Fade le permite sobrevivir a una entrada o evitar parte de Dragonblade.',
      signal: 'Genji busca un duelo aislado y depende de Deflect para ganar tiempo.',
      response: 'No lo persigas después de que salga. Sobrevive, fuerza su retirada y vuelve a sostener a tu equipo mientras no tiene una ventana limpia.',
    },
    {
      name: 'Brigitte',
      href: '/heroes/brigitte',
      danger: 'Whip Shot rompe el rango de Genji, el escudo absorbe presión puntual y su presencia protege al support que él quiere aislar.',
      signal: 'Genji se acerca con doble salto o Dash y todavía no ha recibido peel.',
      response: 'Juega a una distancia desde la que puedas ayudar sin estar pegada al objetivo. Expulsarlo antes del remate ya es una buena respuesta.',
    },
  ],
  cooldownWindows: [
    { title: 'Swift Strike sin reset', body: 'Cuando Dash no consigue una baja, Genji pierde su salida más rápida. Concéntrate en él durante esa ventana, pero no abandones cobertura para perseguirlo si aún conserva ayuda.' },
    { title: 'Deflect terminado', body: 'Espera a que termine antes de usar Sleep, granada, proyectiles fuertes o burst. Forzar Deflect con daño ligero y guardar lo importante suele ganar el intercambio.' },
    { title: 'Entrada antes que su Tank', body: 'Un Genji que llega solo debe recibir atención coordinada. No hace falta que todos lo persigan: una respuesta defensiva y dos fuentes de daño bastan para obligarlo a salir.' },
    { title: 'Dragonblade sin preparación', body: 'Si activa la ultimate sin Nano, Kitsune, speed o cooldowns rivales forzados, el equipo puede agruparse alrededor de peel y negar el primer objetivo. La prioridad es sobrevivir al primer corte.' },
  ],
  adaptations: [
    'Juega a una distancia en la que un compañero pueda ayudarte sin que ambos recibáis el mismo daño.',
    'Usa disparos ligeros o presión no reflectable para provocar Deflect antes del cooldown importante.',
    'Si eres Tank, protege al aliado tocado en lugar de perseguir a Genji hacia su equipo.',
    'Si eres DPS, vigila la ruta por la que llega y presiónalo antes de que alcance la backline con toda la vida.',
    'Si eres Support, conserva movilidad o peel hasta que Genji use Dash; gastar la salida antes le regala el engage.',
    'Contra Dragonblade, decide antes de la pelea qué recurso la responde y quién debe recibirlo.',
  ],
  mistakes: [
    'Vaciar el cargador contra Deflect y recibir tu propio burst.',
    'Dejar a un aliado con poca vida aislado y regalar el primer reset.',
    'Usar todos los cooldowns cuando Genji solo está provocando una reacción.',
    'Separarse durante Dragonblade y ofrecer objetivos consecutivos.',
    'Perseguirlo después de que abandone la pelea y perder la frontline.',
    'Cambiar de héroe sin corregir una posición que deja libre la misma ruta.',
  ],
  examples: [
    { title: 'Dash sin baja', body: 'Genji entra sobre Ana, pero Zarya guarda una barrera para el contacto. La baja no llega y Swift Strike no se reinicia. En vez de correr detrás, el equipo mantiene el foco durante un segundo y lo obliga a gastar Deflect para salir.' },
    { title: 'Blade con respuesta', body: 'Genji activa Dragonblade y busca a Baptiste. Immortality Field no sale al escuchar la voz, sino cuando Genji entra en rango. Brigitte lo expulsa después y la ultimate termina sin el primer reset.' },
    { title: 'Sin necesidad de counterpick', body: 'Cassidy muere dos veces por jugar solo en una altura. En la siguiente pelea baja cerca de su support y guarda su herramienta de control para después de Deflect. El matchup cambia sin abandonar el héroe.' },
  ],
  checklist: [
    'Sé por dónde puede entrar Genji.',
    'No gasto mi recurso principal contra Deflect.',
    'Puedo proteger al aliado que le daría el primer reset.',
    'Conozco la respuesta de mi equipo a Dragonblade.',
    'No persigo a Genji cuando ya ha salido de la pelea.',
    'Diferencio una amenaza real de una entrada para provocar cooldowns.',
  ],
  faqs: [
    { question: '¿Cuál es el mejor counter de Genji?', answer: 'Winston y Zarya mantienen presión sin depender de proyectiles; Mei, Symmetra y Brigitte dificultan su entrada; Moira puede sobrevivir a sus duelos. El mejor counter depende del mapa y de qué aliado necesite protección.' },
    { question: '¿Qué habilidades atraviesan Deflect?', answer: 'Los haces y ciertos ataques que no son proyectiles no se devuelven. Aun así, no necesitas construir todo el equipo alrededor de eso: también puedes esperar a que termine y guardar tu burst.' },
    { question: '¿Cómo paro Dragonblade?', answer: 'Niega el primer objetivo con peel, distancia, una defensiva o control usado cuando Genji ya está comprometido. Si no obtiene la primera baja, pierde buena parte de la cadena que busca.' },
    { question: '¿Debo separarme cuando Genji usa Blade?', answer: 'No de forma desordenada. Evita apilarte, pero mantén distancia de ayuda con tu equipo. Correr cada uno hacia un lado suele dejarle objetivos sin peel.' },
    { question: '¿Tengo que cambiar de héroe contra Genji?', answer: 'No si puedes protegerte, guardar el cooldown correcto y jugar cerca de ayuda. Cambia cuando el mapa y la composición te impiden cumplir tu función incluso después de adaptar posición y timing.' },
  ],
  links: [
    { href: '/heroes/genji', label: 'Guía completa de Genji' },
    { href: '/team-comps/genji', label: 'Composiciones con Genji' },
    { href: '/guides/como-jugar-genji-ranked-overwatch', label: 'Cómo jugar Genji en ranked' },
    { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar de héroe' },
    { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
    { href: '/experts', label: 'Revisar una partida con un experto' },
  ],
}

const GENJI_TEAM_COMP: TeamCompPillar = {
  slug: 'genji',
  name: 'Genji',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, Into the Tiger\'s Den',
  seoTitle: 'Composiciones con Genji en Overwatch: dive y Dragonblade',
  seoDescription: 'Composiciones recomendadas con Genji en Overwatch: dive, brawl híbrido y 6v6, planes de engage, Nano Blade, rotaciones, debilidades y sustituciones.',
  h1: 'Composiciones con Genji en Overwatch: dive y Dragonblade',
  intro: [
    'Genji rinde mejor cuando otra amenaza inicia la pelea y le entrega una vida baja, un cooldown forzado o un ángulo desatendido. Si el equipo espera que abra solo, suele gastar Swift Strike para entrar, Deflect para sobrevivir y quedarse sin una forma limpia de terminar la jugada.',
    'Las composiciones más útiles no existen únicamente para cargar Dragonblade. Deben darle presión vertical, objetivos claros y una retirada posible durante todas las peleas. Nano Blade es una condición fuerte, pero el equipo también necesita ganar las peleas en las que ambas ultimates aún no están disponibles.',
  ],
  summary: [
    'Un Tank que inicie antes de que Genji use Dash.',
    'Daño cruzado que prepare objetivos para el reset.',
    'Supports capaces de acompañar o proteger la retirada.',
    'Un plan para Dragonblade que no dependa siempre de Nano.',
  ],
  compositions: [
    {
      name: 'Dive de doble ángulo',
      format: '5v5',
      style: 'Dive',
      lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
      winCondition: 'Winston fuerza atención y recursos en una zona; Genji y Tracer atacan el objetivo que pierde movilidad o recibe daño durante el salto.',
      engagePlan: 'Ana prepara daño o granada, Winston salta con salida prevista y Genji entra después de ver la primera respuesta. Kiriko conserva Suzu o Swift Step para estabilizar una entrada que no consiga baja inmediata.',
      goodMaps: 'Mapas con alturas, laterales cortos y coberturas que permitan preparar el salto sin cruzar una línea abierta.',
      weakAgainst: 'Anti-dive compacto, varias herramientas de peel y equipos que sobreviven al primer salto sin gastar recursos importantes.',
      substitutions: 'D.Va por Winston para más peel; Sombra por Tracer para preparar un foco; Brigitte por Kiriko cuando la backline necesite protección constante.',
    },
    {
      name: 'Brawl híbrido con reset',
      format: '5v5',
      style: 'Brawl',
      lineup: ['Junker Queen', 'Genji', 'Mei', 'Lúcio', 'Kiriko'],
      winCondition: 'Junker Queen y Mei cierran el espacio, Lúcio acelera la entrada y Genji convierte el primer objetivo tocado en un reset sin tener que iniciar solo.',
      engagePlan: 'El equipo rota unido hasta una esquina. Mei corta la retirada, Junker Queen marca el objetivo y Genji usa Dash cuando la baja ya es plausible. Kitsune Rush permite repetir cooldowns y mantener el ritmo.',
      goodMaps: 'Control, calles y puntos con rutas cortas donde el rival no pueda mantener distancia durante toda la pelea.',
      weakAgainst: 'Poke en mapas abiertos, alturas difíciles de contestar y composiciones capaces de kitear sin ceder el objetivo.',
      substitutions: 'Reinhardt por Junker Queen para un frente más estable; Cassidy por Mei si falta control de rango medio; Ana por Kiriko cuando Nano Blade sea una condición más clara que la limpieza.',
    },
    {
      name: 'Doble Tank para Nano Blade',
      format: '6v6',
      style: 'Dive',
      lineup: ['Winston', 'D.Va', 'Genji', 'Tracer', 'Ana', 'Brigitte'],
      winCondition: 'Winston y D.Va dividen la atención, Ana prepara Nano y Brigitte protege la posición desde la que el equipo sostiene las entradas.',
      engagePlan: 'La primera oleada fuerza Suzu, Sleep, control o defensivas. Genji no activa Blade por calendario: espera a que falte al menos una respuesta y entra con un Tank capaz de cortar el peel rival.',
      goodMaps: 'Escenarios verticales con varias rutas de dive y una posición desde la que Ana pueda ver la zona de contacto.',
      weakAgainst: 'Brawl cerrado con control acumulado y equipos que guardan todas sus defensivas exclusivamente para Dragonblade.',
      substitutions: 'Zarya por D.Va para proteger el primer corte; Kiriko por Brigitte si la limpieza es esencial; Echo por Tracer para añadir presión aérea.',
    },
  ],
  responsibilities: [
    { title: 'Tank', body: 'Debe iniciar una amenaza visible antes de que Genji se comprometa. Su trabajo es forzar atención, una barrera o un cooldown que el DPS pueda leer.' },
    { title: 'Segundo DPS', body: 'Prepara objetivos desde otro ángulo. No necesita seguir a Genji por la misma ruta; necesita que el rival no pueda mirar a ambos a la vez.' },
    { title: 'Supports', body: 'Mantienen visión de la zona donde termina la entrada, no de cada salto. También deben acordar qué recurso acompaña Dragonblade y cuál queda para sobrevivir.' },
    { title: 'Genji', body: 'Busca la segunda acción de la pelea. Usa Dash cuando exista una baja posible, conserva Deflect para el momento peligroso y abandona la entrada si no aparece el reset.' },
  ],
  rotationPlan: [
    'Ocupa una cobertura desde la que el equipo pueda ver la primera entrada.',
    'Muestra presión frontal y lateral sin gastar todavía Swift Strike.',
    'Haz que el Tank fuerce movilidad, barrera o una defensiva importante.',
    'Entra sobre el mismo sector y convierte una vida baja en reset.',
    'Si no hay baja, sal con recursos y prepara una segunda oleada en lugar de perseguir.',
  ],
  weaknesses: [
    'Genji usa Dash para llegar antes de que el Tank haya empezado la pelea.',
    'El equipo solo parece coordinado cuando Nano y Dragonblade están disponibles.',
    'Ana pierde línea de visión porque el dive cruza demasiadas paredes.',
    'Dos DPS atacan objetivos distintos y ninguno consigue una vida baja.',
    'Deflect se gasta durante la preparación y falta cuando aparece el burst real.',
    'La composición insiste en dive contra varias respuestas cerradas sin cambiar de ritmo.',
  ],
  examples: [
    { title: 'La entrada llega por orden', body: 'Winston salta sobre Ana y fuerza Sleep contra la barrera. Tracer presiona a Kiriko y Genji espera medio segundo. Cuando Suzu sale, Dash entra sobre el objetivo tocado y el reset permite abandonar la backline.' },
    { title: 'Blade sin Nano', body: 'Mei divide al Tank rival y Lúcio acelera la pelea. Genji usa Dragonblade sobre dos supports que ya han gastado movilidad. Nano no era necesario porque la composición había preparado una ventana limpia.' },
    { title: 'Segunda oleada', body: 'El primer dive no consigue baja, pero fuerza granada y Suzu. Genji sale sin perseguir y el equipo espera unos segundos. La siguiente entrada llega antes de que vuelvan ambos recursos y sí encuentra el reset.' },
  ],
  checklist: [
    'El Tank puede iniciar antes que Genji.',
    'Existe daño capaz de preparar el primer reset.',
    'Los supports ven la zona de entrada sin exponerse.',
    'Dragonblade tiene un plan y una respuesta rival identificada.',
    'Genji conserva una salida cuando no aparece una baja.',
    'La composición puede ganar sin esperar siempre a Nano Blade.',
  ],
  faqs: [
    { question: '¿Cuál es la mejor composición con Genji?', answer: 'Dive con Winston, otro DPS móvil y supports capaces de preparar o acompañar la entrada suele ser su entorno más natural. Un brawl rápido también funciona si crea objetivos tocados y peleas cortas.' },
    { question: '¿Genji necesita a Ana?', answer: 'No. Nano Boost potencia Dragonblade y Ana puede preparar objetivos, pero Genji también funciona con Kitsune Rush, velocidad o un dive coordinado. La composición debe ser útil entre ultimates.' },
    { question: '¿Qué Tank combina mejor con Genji?', answer: 'Winston crea una distracción clara; D.Va acompaña y protege; Junker Queen abre brawls cortos. La elección depende del mapa y de cómo quiera entrar el equipo.' },
    { question: '¿Qué Support acompaña mejor a Genji?', answer: 'Ana ofrece Nano y utilidad a distancia, Kiriko puede seguir una entrada y Lúcio mejora el ritmo. Brigitte ayuda cuando la backline necesita protección frente al dive rival.' },
    { question: '¿Cuándo no conviene jugar Genji?', answer: 'Cuando el mapa niega sus rutas y el rival acumula varias respuestas cercanas que tu equipo no puede forzar. Antes de cambiar, comprueba si el problema es el pick o una entrada demasiado temprana.' },
  ],
  links: [
    { href: '/heroes/genji', label: 'Guía completa de Genji' },
    { href: '/counters/genji', label: 'Counters de Genji' },
    { href: '/guides/como-jugar-genji-ranked-overwatch', label: 'Cómo jugar Genji en ranked' },
    { href: '/guides/como-usar-ultimates-overwatch', label: 'Cómo usar ultimates' },
    { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo elegir una composición' },
    { href: '/experts', label: 'Revisar una composición en tu VOD' },
  ],
}

const KIRIKO_COUNTER: CounterPillar = {
  slug: 'kiriko',
  name: 'Kiriko',
  role: 'Support',
  updatedAt: '28 de junio de 2026',
  reviewedPatch: 'Season 3, Into the Tiger\'s Den',
  seoTitle: 'Counters de Kiriko en Overwatch: fuerza Suzu y Paso ligero',
  seoDescription: 'Aprende a jugar contra Kiriko en Overwatch: mejores counters, cómo forzar Suzu y Swift Step, respuestas a Kitsune Rush y errores habituales.',
  h1: 'Counters de Kiriko en Overwatch: fuerza Suzu y Paso ligero',
  intro: [
    'Kiriko resulta difícil de eliminar cuando conserva Suzu de protección y Paso ligero. Puede limpiar el efecto que abría tu pelea, evitar un instante de daño y escapar hacia un aliado antes de que llegue el segundo intento. Por eso, el matchup no se gana lanzando todos los cooldowns a la vez, sino obligándola a elegir qué amenaza responde primero.',
    'También conviene vigilar el destino de su teletransporte. Cuando Kiriko usa Paso ligero para salvar a un compañero, deja de tener una salida gratuita y su posición se vuelve más previsible. Ese es el momento de cambiar el foco o cerrar la ruta, no de seguir disparando al Tank que acaba de recibir Suzu.',
  ],
  summary: [
    'Fuerza Suzu antes del engage que realmente quieres ganar.',
    'Presiona a Kiriko después de Paso ligero.',
    'No apiles todos los efectos que puede limpiar con un solo recurso.',
    'Sal de la ruta de Kitsune Rush o córtala con cobertura.',
  ],
  threats: [
    {
      name: 'Winston',
      href: '/heroes/winston',
      danger: 'Barrier Projector corta la línea de sus Ofuda y obliga a Kiriko a decidir entre gastar Paso ligero o pelear dentro de la burbuja.',
      signal: 'Kiriko juega separada de su Tank o usa Swift Step hacia una posición que no tiene otra salida cercana.',
      response: 'Salta con una ruta de vuelta, coloca la barrera entre Kiriko y sus aliados y sal si la presión rival llega antes de forzar recursos.',
    },
    {
      name: 'D.Va',
      href: '/heroes/dva',
      danger: 'Defense Matrix niega parte de la curación y puede bloquear el proyectil de Suzu mientras Boosters contestan sus ángulos.',
      signal: 'Kiriko se acerca para lanzar Suzu o mantiene una línea clara de Ofuda hacia un aliado bajo presión.',
      response: 'Usa Matrix durante la ventana importante, no por rutina. Si niegas Suzu o una ráfaga de curación, tu equipo debe entrar en ese momento.',
    },
    {
      name: 'Tracer',
      href: '/heroes/tracer',
      danger: 'Repite presión sin invertir una entrada larga y puede forzar Swift Step o Suzu antes de que empiece la pelea principal.',
      signal: 'Kiriko juega un lateral para buscar kunáis y su aliado de escape está lejos de cobertura.',
      response: 'Alterna disparos y salida. Si fuerza un cooldown, no necesitas perseguir el teletransporte: vuelve y aprovecha la ventaja con tu equipo.',
    },
    {
      name: 'Sombra',
      href: '/heroes/sombra',
      danger: 'Hack limita temporalmente su acceso a las dos herramientas defensivas y permite coordinar un foco sobre una posición que parecía segura.',
      signal: 'Kiriko repite una altura o juega lejos del compañero al que usaría como destino de Paso ligero.',
      response: 'Coordina la entrada antes de revelar tu posición. Un hack sin daño que lo acompañe solo avisa a Kiriko de que debe jugar más cerca.',
    },
    {
      name: 'Cassidy',
      href: '/heroes/cassidy',
      danger: 'Controla el rango medio, castiga una salida previsible de Paso ligero y obliga a Kiriko a respetar los ángulos en los que busca kunáis.',
      signal: 'Kiriko usa Swift Step sobre un aliado comprometido y aparece cerca de la frontline sin otra cobertura.',
      response: 'No gastes todo antes de Suzu. Mantén la esquina, fuerza el recurso y usa tu presión cuando termine la breve ventana defensiva.',
    },
    {
      name: 'Genji',
      href: '/heroes/genji',
      danger: 'Puede acceder a sus alturas, devolver kunáis con Deflect y seguir el ritmo de una Kiriko que juega ángulos agresivos.',
      signal: 'Suzu ya se ha usado o Kiriko ha gastado Paso ligero para ayudar a otro aliado.',
      response: 'Entra después de ver uno de los dos recursos. Si conserva ambos, limita tu presión a forzar una respuesta y guarda Dash para salir.',
    },
  ],
  cooldownWindows: [
    { title: 'Después de Suzu', body: 'Es la ventana principal para anti-curación, control, burst o una ultimate. Espera a que termine la protección y entra antes de que el cooldown vuelva.' },
    { title: 'Paso ligero comprometido', body: 'Kiriko ya no puede corregir una posición agresiva de inmediato. Mira dónde aparece y presiona esa zona junto al aliado que intentaba salvar.' },
    { title: 'Ofuda sin línea de visión', body: 'Barreras, esquinas y cambios de altura pueden cortar la curación antes de que llegue. No hace falta matar a Kiriko si su Tank deja de recibir ayuda durante el engage.' },
    { title: 'Kitsune Rush sin espacio', body: 'La ultimate necesita una ruta útil. Cobertura, una retirada lateral o una barrera que corte el frente pueden reducir su valor sin pelear de cara dentro del camino.' },
  ],
  adaptations: [
    'Separa tus amenazas en el tiempo para que Suzu no limpie dos condiciones de victoria a la vez.',
    'Vigila qué aliado utiliza Kiriko como destino de Paso ligero y presiona la posición final, no el punto de origen.',
    'Si eres Tank, usa barreras y esquinas para cortar Ofuda mientras fuerzas espacio sobre la frontline.',
    'Si eres DPS, amenaza un ángulo que la obligue a girarse antes de que tu equipo comprometa el engage principal.',
    'Si eres Support, no lances anti-curación o control inmediatamente después de un efecto que Kiriko ya quiere limpiar.',
    'Contra Kitsune Rush, sal de la ruta si puedes y conserva defensivas para el momento en que el rival cierre distancia.',
  ],
  mistakes: [
    'Apilar anti-curación, control y ultimate antes de que salga Suzu.',
    'Perseguir a Kiriko después de Paso ligero sin saber dónde están sus aliados.',
    'Ignorar sus ángulos de kunái porque aparece como Support en el marcador.',
    'Pelear de frente durante todo Kitsune Rush sin una defensiva clara.',
    'Gastar movilidad para alcanzarla cuando aún conserva ambas salidas.',
    'Cambiar de héroe sin coordinar qué recurso debe forzar primero el equipo.',
  ],
  examples: [
    { title: 'Dos amenazas, un Suzu', body: 'Ana lanza Granada Biótica y Kiriko limpia inmediatamente. Reinhardt no había usado Earthshatter: espera a que termine la protección y entra mientras Suzu sigue fuera. El orden convierte dos recursos en dos ventanas distintas.' },
    { title: 'Castigo al destino', body: 'Kiriko usa Paso ligero sobre su Tank para salvarlo. Tracer no persigue el lugar desde el que desapareció; rota hacia la frontline, donde Kiriko ha aparecido sin otra salida y fuerza su retirada.' },
    { title: 'Kitsune sin pelea frontal', body: 'El rival activa Kitsune Rush en una calle. El equipo retrocede a una esquina lateral y usa una barrera para cortar la visión. Cuando termina la parte más fuerte del avance, vuelve a contestar el objetivo con sus cooldowns intactos.' },
  ],
  checklist: [
    'Sé si Suzu está disponible antes de usar mi recurso principal.',
    'Vigilo el destino posible de Paso ligero.',
    'No entrego varias amenazas a una sola limpieza.',
    'Corto Ofuda con cobertura o barreras cuando entro.',
    'Tengo un plan para salir o sobrevivir a Kitsune Rush.',
    'No persigo a Kiriko hacia una posición con ayuda rival.',
  ],
  faqs: [
    { question: '¿Cuál es el mejor counter de Kiriko?', answer: 'Winston y D.Va pueden cortar su curación y acceder a su posición; Tracer, Sombra y Genji fuerzan sus salidas; Cassidy castiga apariciones previsibles. El valor está en forzar Suzu y Paso ligero con orden.' },
    { question: '¿Cómo fuerzo Suzu de protección?', answer: 'Presenta una amenaza que Kiriko no pueda ignorar sin gastar todos tus recursos. Una vida baja, anti-curación, control o presión sobre ella pueden provocarlo; guarda la siguiente condición para después.' },
    { question: '¿Puedo bloquear Suzu?', answer: 'Es un proyectil y ciertas herramientas como Defense Matrix pueden negarlo. Aun así, la respuesta más repetible es forzarlo antes de la acción importante.' },
    { question: '¿Cómo juego contra Kitsune Rush?', answer: 'Evita pelear de cara dentro de toda la ruta. Usa cobertura lateral, distancia, barreras o una defensiva para sobrevivir al avance y vuelve a entrar cuando el rival haya gastado movilidad y cooldowns.' },
    { question: '¿Debo centrar siempre a Kiriko?', answer: 'No. Si gastó Suzu y Paso ligero, también puedes ganar eliminando al aliado que ya no puede salvar. El objetivo correcto es el que queda sin recursos, no siempre la propia Kiriko.' },
  ],
  links: [
    { href: '/heroes/kiriko', label: 'Guía completa de Kiriko' },
    { href: '/guides/como-jugar-kiriko-ranked-overwatch', label: 'Cómo jugar Kiriko en ranked' },
    { href: '/counters/ana', label: 'Counters de Ana' },
    { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
    { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar de héroe' },
    { href: '/experts', label: 'Revisar una partida con un experto' },
  ],
}

export function getCounterPillar(slug: string) {
  return [SHION_COUNTER, ANA_COUNTER, GENJI_COUNTER, KIRIKO_COUNTER].find(pillar => pillar.slug === slug) ?? null
}

export function getTeamCompPillar(slug: string) {
  return [SHION_TEAM_COMP, ANA_TEAM_COMP, GENJI_TEAM_COMP].find(pillar => pillar.slug === slug) ?? null
}
