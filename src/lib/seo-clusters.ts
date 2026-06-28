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

export function getCounterPillar(slug: string) {
  return [SHION_COUNTER, ANA_COUNTER].find(pillar => pillar.slug === slug) ?? null
}

export function getTeamCompPillar(slug: string) {
  return [SHION_TEAM_COMP, ANA_TEAM_COMP].find(pillar => pillar.slug === slug) ?? null
}
