export type HeroPillarCard = {
  title: string
  body: string
}

export type HeroPillarLink = {
  href: string
  label: string
}

export type HeroPillar = {
  slug: 'ana' | 'kiriko' | 'genji' | 'reinhardt' | 'dva' | 'winston' | 'cassidy'
  name: string
  role: 'Tank' | 'Support' | 'DPS'
  roleSlug: 'tank' | 'support' | 'dps'
  updatedAt: string
  seoTitle: string
  seoDescription: string
  h1: string
  kicker: string
  intro: string[]
  facts: HeroPillarCard[]
  rankedPlan: string[]
  sections: HeroPillarCard[]
  abilities: HeroPillarCard[]
  mistakes: string[]
  counters: HeroPillarCard[]
  counterplay: string[]
  compositions: HeroPillarCard[]
  vodReview: string[]
  checklist: string[]
  faqs: Array<{ question: string; answer: string }>
  links: HeroPillarLink[]
}

export const HERO_PILLARS: Record<string, HeroPillar> = {
  ana: {
    slug: 'ana',
    name: 'Ana',
    role: 'Support',
    roleSlug: 'support',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Ana Overwatch Guide: cómo jugarla, counters y consejos ranked',
    seoDescription: 'Guía completa de Ana en Overwatch: posicionamiento, Sleep Dart, Biotic Grenade, Nano Boost, counters, errores comunes y consejos para ranked.',
    h1: 'Ana en Overwatch: guía completa para ranked',
    kicker: 'Support de utilidad, control y anti-heal',
    intro: [
      'Ana es una support de alto impacto porque puede cambiar una pelea con un solo cooldown. Sleep Dart puede detener un dive o una ultimate, Biotic Grenade puede negar curación al equipo rival y Nano Boost puede convertir una entrada normal en una pelea ganada.',
      'Pero Ana también castiga muchísimo los errores de posición. Si juegas demasiado abierta, gastas Sleep sin amenaza real o usas granada solo para curarte por ansiedad, vas a sentir que cada flanker juega gratis contra ti.',
      'Esta guía está pensada para ranked: cómo colocarte, cuándo usar tus cooldowns, qué errores evitar, qué counters respetar y qué revisar en tus VODs para saber si estás muriendo por mecánicas o por decisiones.',
    ],
    facts: [
      { title: 'Rol', body: 'Support' },
      { title: 'Estilo', body: 'Curación a distancia, utilidad, control y anti-heal.' },
      { title: 'Punto fuerte', body: 'Ganar peleas con Sleep Dart, Biotic Grenade y Nano Boost.' },
      { title: 'Punto débil', body: 'Vulnerable si juega sin cobertura o sin cooldowns.' },
      { title: 'Ideal en', body: 'Mapas con líneas de visión largas y posiciones seguras.' },
      { title: 'Sufre contra', body: 'Dive coordinado, snipers y flankers si está aislada.' },
    ],
    rankedPlan: [
      'Colócate con cobertura antes de que empiece la pelea. Si puedes curar pero no puedes romper línea de visión cuando te miran, estás demasiado vendida.',
      'Mantén línea de visión con tu equipo, pero no persigas a un tank que cruza sin recursos. Ana gana más sobreviviendo que forzando una cura imposible.',
      'Guarda Sleep Dart para amenazas reales: Genji con Dragonblade, Winston entrando, Doomfist comprometido, Reaper con ultimate o Shion gastando movilidad.',
      'Usa Biotic Grenade para ganar peleas, no solo para curarte. Si cada pelea gastas granada en ti misma, probablemente el problema empieza en tu posición.',
      'Nano Boost necesita intención. Antes de usarlo, decide si salva a un aliado que crea espacio, inicia una pelea ganable o combina con una ultimate concreta.',
    ],
    sections: [
      {
        title: 'Posicionamiento con Ana',
        body: 'Ana necesita distancia, pero no aislamiento. Busca esquinas, high ground seguro, ruta de escape y línea limpia hacia tu tank. Estar lejos no sirve si nadie puede ayudarte cuando entra un flanker.',
      },
      {
        title: 'Cómo aportar daño sin regalarte',
        body: 'Si tu equipo está estable, Ana puede presionar supports o DPS expuestos. El valor no está en hacer daño todo el rato, sino en alternar curación y castigo cuando el rival cruza mal.',
      },
      {
        title: 'Cuándo rotar',
        body: 'Si el rival cambia a Winston, Tracer, Genji o Sombra, tu antigua posición puede dejar de ser buena. Rota antes de que te diveen, no después de morir dos veces.',
      },
    ],
    abilities: [
      {
        title: 'Biotic Rifle',
        body: 'Cura aliados y daña enemigos. No necesitas disparar siempre al tank: si tu equipo está estable, busca daño sobre supports, DPS expuestos o enemigos que cruzan una línea abierta.',
      },
      {
        title: 'Sleep Dart',
        body: 'Es uno de los cooldowns defensivos más importantes del juego. No lo tires en poke solo por probar. Guárdalo para ultimates, dives y enemigos que ya se han comprometido.',
      },
      {
        title: 'Biotic Grenade',
        body: 'Puede ganar una pelea contra tank, negar curación rival o salvar aliados bajo presión. Usarla solo como autocuración reduce muchísimo el impacto de Ana.',
      },
      {
        title: 'Nano Boost',
        body: 'No es un botón de pánico sin plan. Úsalo para salvar a quien está creando espacio, potenciar un engage claro o combinar con una ultimate que pueda llegar al rival.',
      },
    ],
    mistakes: [
      'Jugar en campo abierto porque quieres verlo todo.',
      'Gastar Sleep Dart antes de la amenaza real.',
      'Usar Biotic Grenade siempre para curarte a ti misma.',
      'No rotar cuando el rival cambia a dive.',
      'Mirar solo barras de vida y no amenazas laterales.',
      'Usar Nano Boost cuando la pelea ya está perdida.',
      'Quedarte demasiado lejos para recibir ayuda.',
    ],
    counters: [
      { title: 'Sombra', body: 'Castiga a Ana si juega aislada y sin peel. Si te fuerza cooldowns antes de la pelea, ya ha generado valor.' },
      { title: 'Genji', body: 'Puede obligarte a gastar Sleep y granada. Contra Dragonblade, contar cooldowns es obligatorio.' },
      { title: 'Winston', body: 'Te corta línea de visión y fuerza movimiento. Si saltas tarde de posición, te encierra con burbuja.' },
      { title: 'Tracer', body: 'Te desgasta, fuerza ansiedad y castiga granadas mal usadas. Jugar cerca de cobertura y peel reduce mucho su amenaza.' },
      { title: 'Widowmaker', body: 'Te obliga a respetar ángulos largos. Si curas desde main sin cobertura, puedes morir antes de usar utilidad.' },
    ],
    counterplay: [
      'Juega cerca de una esquina, no en medio del mapa.',
      'Pide peel antes de que el rival entre, no cuando ya estás a 20 de vida.',
      'Contra dive, guarda Sleep para el segundo real de compromiso.',
      'Contra snipers, cambia de línea de visión y cura desde ángulos más cortos.',
      'Si te obligan a gastar granada defensiva cada pelea, revisa tu posición inicial.',
    ],
    compositions: [
      { title: 'Dive controlado', body: 'Winston o D.Va con Genji, Tracer o Echo. Ana aporta curación a distancia, anti-nade y Nano para acelerar entradas.' },
      { title: 'Poke', body: 'Sigma, Ashe, Hanzo, Widowmaker o Sojourn. Ana encaja bien si puede jugar líneas largas sin quedar expuesta.' },
      { title: 'Brawl lento', body: 'Reinhardt o Ramattra con DPS de presión estable. Nano puede convertir el avance del tank en una pelea ganada.' },
    ],
    vodReview: [
      'Mira tus primeras muertes: ¿moriste por estar en campo abierto, por no tener Sleep o por jugar demasiado lejos de tu equipo?',
      'Revisa cada Biotic Grenade. Marca si fue ofensiva, defensiva o de pánico. Si casi todas son de pánico, hay un patrón claro.',
      'Revisa tus Nano Boost. Pregunta si el objetivo podía hacer algo con él o si solo lo usaste porque estaba disponible.',
      'Mira si cambiaste de posición cuando el rival cambió composición. Ana no puede jugar igual contra poke que contra dive.',
    ],
    checklist: [
      'Tengo cobertura cerca.',
      'Sé quién me puede entrar.',
      'No tiro Sleep sin amenaza real.',
      'Uso granada para ganar peleas, no solo para sobrevivir.',
      'Nano tiene objetivo y timing.',
      'Roto si cambia la amenaza rival.',
    ],
    faqs: [
      { question: '¿Ana es buena para ranked?', answer: 'Sí. Ana puede ganar peleas con utilidad, pero exige buen posicionamiento y gestión de cooldowns. Si mueres primera a menudo, no estás pudiendo usar su valor real.' },
      { question: '¿Cuál es el error más común con Ana?', answer: 'Jugar en campo abierto o gastar Sleep Dart antes de que llegue la amenaza importante. Sin cobertura y sin Sleep, Ana se vuelve muy fácil de castigar.' },
      { question: '¿Cuándo debo usar Biotic Grenade?', answer: 'Cuando puede ganar una pelea, forzar recursos o salvar a un aliado bajo presión real. Si la usas siempre para curarte, revisa primero tu posición.' },
      { question: '¿A quién debo usar Nano Boost?', answer: 'A un aliado que pueda aprovecharlo inmediatamente: tank creando espacio, DPS con ultimate, o jugador comprometido en una pelea aún ganable.' },
      { question: '¿Cómo sobrevivo contra dive?', answer: 'Juega cerca de cobertura, guarda Sleep, no te aísles y rota antes de que Winston, Genji, Tracer o Shion tengan una entrada limpia.' },
    ],
    links: [
      { href: '/guides/como-jugar-ana-ranked-overwatch', label: 'Guía ranked de Ana' },
      { href: '/counters/ana', label: 'Counters de Ana' },
      { href: '/team-comps/ana', label: 'Composiciones con Ana' },
      { href: '/roles/support', label: 'Guías de Support' },
      { href: '/heroes/kiriko', label: 'Kiriko' },
      { href: '/heroes/genji', label: 'Genji' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Cómo revisar una VOD' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  kiriko: {
    slug: 'kiriko',
    name: 'Kiriko',
    role: 'Support',
    roleSlug: 'support',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Kiriko Overwatch Guide: cómo jugarla, Suzu, counters y ranked',
    seoDescription: 'Guía completa de Kiriko en Overwatch: cómo usar Suzu, Swift Step, Kitsune Rush, daño con kunai, counters, errores comunes y consejos ranked.',
    h1: 'Kiriko en Overwatch: guía completa para ranked',
    kicker: 'Support móvil con Suzu, kunais y tempo',
    intro: [
      'Kiriko es una support de mucha movilidad, gran capacidad defensiva y daño explosivo si aciertas kunais. Puede salvar peleas con Protection Suzu, escapar con Swift Step y abrir engages con Kitsune Rush.',
      'Precisamente por tener tantas herramientas, Kiriko se juega mal muy fácilmente. Muchos jugadores gastan Suzu por ansiedad, se teletransportan a aliados que ya están muertos o buscan daño cuando el equipo necesitaba estabilidad.',
      'Esta guía se centra en ranked: cuándo curar, cuándo hacer daño, cómo guardar Suzu, cómo usar Swift Step sin suicidarte y qué mirar en una VOD para detectar si tus recursos llegan tarde o demasiado pronto.',
    ],
    facts: [
      { title: 'Rol', body: 'Support' },
      { title: 'Estilo', body: 'Movilidad, limpieza, burst defensivo y daño de precisión.' },
      { title: 'Punto fuerte', body: 'Negar condiciones de victoria con Protection Suzu.' },
      { title: 'Punto débil', body: 'Puede desperdiciar recursos por exceso de confianza.' },
      { title: 'Ideal en', body: 'Dive, brawl rápido y equipos que necesitan cleanse.' },
      { title: 'Sufre contra', body: 'Control constante, focus coordinado y malos destinos de teleport.' },
    ],
    rankedPlan: [
      'Mantén al equipo estable con Healing Ofuda, pero no persigas a un aliado que ya se ha condenado por posición.',
      'Busca kunais cuando no haya presión real. El daño de Kiriko es muy valioso, pero no si tu equipo muere mientras haces un duelo innecesario.',
      'Guarda Suzu para la amenaza importante: anti-heal, ultimate, stun, burst o una entrada que de verdad decide la pelea.',
      'Usa Swift Step para resetear o reposicionarte, no para morir con un aliado que está 1v5.',
      'Kitsune Rush tiene que abrir camino. Si tu equipo no puede avanzar por la línea, espera un segundo más y úsala cuando haya compromiso real.',
    ],
    sections: [
      {
        title: 'Curar o hacer daño',
        body: 'Kiriko no es solo healing ni solo kunais. Cura cuando tu equipo está tomando espacio o puede morir; busca daño cuando hay estabilidad, cobertura y una ventana segura.',
      },
      {
        title: 'Prioridad de Suzu',
        body: 'Suzu no es una cura pequeña. Es una respuesta a condiciones de victoria. Si lo gastas por 60 de vida, luego no lo tendrás contra anti-nade, Blade, stun o burst.',
      },
      {
        title: 'Teleport con cabeza',
        body: 'Antes de usar Swift Step, pregunta dónde vas a aparecer. Teletransportarte a un aliado mal posicionado puede convertir una muerte en dos.',
      },
    ],
    abilities: [
      {
        title: 'Healing Ofuda',
        body: 'Talismanes de curación que mantienen estabilidad. Son fuertes, pero no arreglan una mala posición. No sigas a un aliado suicida solo porque puedes curarle.',
      },
      {
        title: 'Kunai',
        body: 'Proyectil con mucho valor en crítico. Dispara a esquinas, puertas, rutas de rotación y supports que asoman, sin abandonar tu función principal.',
      },
      {
        title: 'Swift Step',
        body: 'Teleport hacia un aliado. Úsalo para sobrevivir, cambiar ángulo o resetear. Mal usado, te mete en una pelea perdida sin salida.',
      },
      {
        title: 'Protection Suzu',
        body: 'Invulnerabilidad breve y limpieza de efectos negativos. Guárdalo para anti-heal, control, ultimates de burst y aliados que realmente van a morir.',
      },
      {
        title: 'Kitsune Rush',
        body: 'Ultimate de tempo. Acelera movimiento, ataques y recargas. Funciona mejor cuando tu equipo puede avanzar por el camino y pelear de verdad.',
      },
    ],
    mistakes: [
      'Gastar Suzu porque alguien perdió poca vida.',
      'Usar Swift Step hacia un aliado que ya está muerto en la práctica.',
      'Buscar kunais mientras tu tank necesita estabilidad.',
      'Tirar Kitsune Rush cuando nadie puede avanzar.',
      'Jugar tan lejos que tu teleport siempre es defensivo.',
      'No respetar Sombra, Tracer o Winston cuando te aíslas.',
      'Curar por inercia sin mirar qué cooldown rival está por venir.',
    ],
    counters: [
      { title: 'Sombra', body: 'Castiga a Kiriko cuando juega separada y puede forzar Suzu o teleport antes de la pelea real.' },
      { title: 'Winston', body: 'Corta espacio, fuerza Swift Step y complica los ángulos si Kiriko no tiene aliado seguro para salir.' },
      { title: 'Tracer', body: 'Presiona constantemente y puede obligarte a gastar Suzu por ansiedad si juegas sin cobertura.' },
      { title: 'Cassidy', body: 'Castiga teleports predecibles y duelos mal tomados. Kiriko no necesita pelearle en línea recta.' },
      { title: 'Ana', body: 'Su anti-nade es una de las razones principales para guardar Suzu. Si lo gastas antes, Ana gana mucho valor.' },
    ],
    counterplay: [
      'No gastes Suzu hasta ver la condición real que quieres negar.',
      'Antes de usar Swift Step, identifica si el aliado de destino está seguro.',
      'Contra Sombra o Tracer, juega con cobertura y cerca de una salida clara.',
      'Contra Ana, guarda Suzu para anti-nade o Sleep decisivo.',
      'Si el rival fuerza tu Suzu gratis, juega más paciente la siguiente pelea.',
    ],
    compositions: [
      { title: 'Dive', body: 'Winston o D.Va con Genji, Tracer o Sombra. Kiriko aporta movilidad, limpieza y supervivencia para acompañar entradas rápidas.' },
      { title: 'Brawl / Rush', body: 'Reinhardt, Ramattra o Junker Queen con Lucio. Kitsune Rush puede acelerar el engage y convertir cooldowns rápidos en pelea ganada.' },
      { title: 'Poke flexible', body: 'Sigma o DPS de ángulos con Kiriko como support móvil. Funciona si alterna curación segura y presión con kunais.' },
    ],
    vodReview: [
      'Revisa cada Suzu: ¿negó algo importante o fue una cura de ansiedad?',
      'Mira tus Swift Step. Pregunta si el destino era seguro o si solo llegaste tarde a morir con otro.',
      'Cuenta cuántas veces haces daño cuando tu equipo está estable y cuántas lo haces cuando alguien necesitaba ayuda.',
      'Revisa tus Kitsune Rush. ¿Tu equipo caminó por la ultimate o la tiraste sin compromiso?',
    ],
    checklist: [
      'Sé qué amenaza rival necesita Suzu.',
      'No uso Swift Step sin mirar destino.',
      'Alterno curación y daño según la pelea.',
      'Disparo kunais desde cobertura.',
      'Kitsune Rush tiene camino y follow-up.',
      'No persigo aliados perdidos.',
    ],
    faqs: [
      { question: '¿Kiriko debe curar o hacer daño?', answer: 'Debe alternar. Cura cuando tu equipo está bajo presión y busca daño cuando hay estabilidad, cobertura y una ventana clara para presionar.' },
      { question: '¿Cuál es el error más común con Kiriko?', answer: 'Gastar Suzu demasiado pronto. Si lo usas por una cura pequeña, no lo tendrás cuando llegue anti-heal, una ultimate o el burst que decide la pelea.' },
      { question: '¿Cuándo uso Suzu?', answer: 'Cuando niega una condición importante: anti-nade, control, burst, ultimate o una muerte segura. No debe ser tu primera respuesta a cualquier daño pequeño.' },
      { question: '¿Cómo uso Kitsune Rush?', answer: 'Úsala cuando tu equipo pueda avanzar por el camino y pelear. Si nadie puede seguirla, espera a tener mejor posición o compromiso.' },
      { question: '¿Kiriko es buena para ranked?', answer: 'Sí. Es flexible, móvil y puede salvar peleas, pero requiere priorizar bien recursos. Una Kiriko que gasta todo por ansiedad pierde gran parte de su valor.' },
    ],
    links: [
      { href: '/guides/como-jugar-kiriko-ranked-overwatch', label: 'Guía ranked de Kiriko' },
      { href: '/counters/kiriko', label: 'Counters de Kiriko' },
      { href: '/team-comps/kiriko', label: 'Composiciones con Kiriko' },
      { href: '/roles/support', label: 'Guías de Support' },
      { href: '/heroes/ana', label: 'Ana' },
      { href: '/heroes/genji', label: 'Genji' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Cómo revisar una VOD' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  genji: {
    slug: 'genji',
    name: 'Genji',
    role: 'DPS',
    roleSlug: 'dps',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Genji Overwatch Guide: cómo jugarlo, counters y Dragonblade',
    seoDescription: 'Guía completa de Genji en Overwatch: cómo usar Dash, Deflect, Dragonblade, presión lateral, counters, errores comunes y consejos para ranked.',
    h1: 'Genji en Overwatch: guía completa para ranked',
    kicker: 'DPS flanker de resets, timing y Dragonblade',
    intro: [
      'Genji es uno de los DPS más populares de Overwatch, pero también uno de los más fáciles de jugar mal. Su movilidad invita a entrar constantemente, pero un buen Genji no entra primero sin información: espera cooldowns, busca objetivos tocados y usa Dash para confirmar, resetear o salir.',
      'La diferencia entre un Genji útil y un Genji que feedea está en el timing. Si entras antes de que tu equipo presione, el rival puede girarse y borrarte. Si entras cuando alguien ya gastó movilidad, Suzu, Sleep, Lamp o peel, puedes convertir una pelea en una cadena de resets.',
      'Esta guía se centra en ranked: cómo pokear antes de entrar, cuándo usar Swift Strike, cómo no malgastar Deflect y cómo preparar Dragonblade para que no sea una apuesta desesperada.',
    ],
    facts: [
      { title: 'Rol', body: 'DPS' },
      { title: 'Subrol', body: 'Flanker' },
      { title: 'Estilo', body: 'Movilidad, presión lateral y limpieza.' },
      { title: 'Punto fuerte', body: 'Confirmar kills y resetear con Swift Strike.' },
      { title: 'Punto débil', body: 'Sufre contra control, beams, peel y mal timing.' },
      { title: 'Ideal en', body: 'Dive o peleas con objetivos tocados.' },
    ],
    rankedPlan: [
      'Pokea desde off-angle antes de entrar. No necesitas comprometerte cada vez que ves un support.',
      'Observa cooldowns defensivos: Sleep, Suzu, Lamp, Fade, boops, stuns y cualquier recurso que pueda negar tu entrada.',
      'Entra cuando un objetivo esté tocado o aislado. Genji no es Cassidy ni Soldier; tu valor está en convertir oportunidades, no en tradear daño infinito.',
      'Usa Dash con intención: confirmar una baja, resetear o salir. Si usas Dash y no hay kill ni escape, probablemente te comprometiste de más.',
      'Guarda Deflect para el momento peligroso. Muchas veces no gana la pelea por devolver daño, sino por darte un segundo más para vivir.',
    ],
    sections: [
      {
        title: 'Poke antes de entrar',
        body: 'Usa shurikens para cargar ultimate, molestar ángulos y buscar enemigos tocados. El poke prepara tu entrada; no es excusa para quedarte afk lejos de la pelea.',
      },
      {
        title: 'Dash con intención',
        body: 'Swift Strike debe confirmar, resetear o reposicionarte. Usarlo solo para acercarte a un objetivo full vida sin saber cómo sales es la receta clásica para morir primero.',
      },
      {
        title: 'Deflect no es decoración',
        body: 'Deflect puede devolver proyectiles, pero su valor más fiable es sobrevivir al burst tras entrar. No lo gastes en poke si vas a necesitarlo dos segundos después.',
      },
    ],
    abilities: [
      {
        title: 'Shuriken',
        body: 'El disparo primario es más preciso y el secundario funciona mejor a corta distancia. Usa primario para poke y secundario cuando ya estás encima del objetivo.',
      },
      {
        title: 'Deflect',
        body: 'Desvía proyectiles y ayuda a sobrevivir al burst. Pregunta qué daño o cooldown quieres negar antes de usarlo por reflejo.',
      },
      {
        title: 'Swift Strike',
        body: 'Dash que daña y se reinicia con eliminaciones. No existe buen Genji sin reset: si entras y no hay baja ni salida, te has pasado de compromiso.',
      },
      {
        title: 'Dragonblade',
        body: 'Puede ganar peleas, pero se niega con muchos recursos. Antes de usarla, cuenta Sleep, Suzu, Beat, Transcendence, Lamp y peel disponible.',
      },
      {
        title: 'Cyber-Agility',
        body: 'Doble salto y wall climb. Úsalo para tomar ángulos, cambiar rutas y evitar entrar siempre desde el mismo sitio.',
      },
    ],
    mistakes: [
      'Entrar primero sin presión del equipo.',
      'Usar Dash solo para acercarte a un objetivo full vida.',
      'Gastar Deflect en poke y no tenerlo al comprometerte.',
      'Usar Dragonblade sin contar Suzu, Sleep o Lamp.',
      'Pelear contra beams y control como si fueran duelos favorables.',
      'No salir después de forzar recursos.',
      'Buscar highlight en vez de confirmar una baja simple.',
    ],
    counters: [
      { title: 'Brigitte', body: 'Protege al objetivo que quieres matar y castiga entradas previsibles. No hace falta que te persiga para negarte valor.' },
      { title: 'Moira', body: 'Tiene sustain, daño fácil de aplicar y Fade para negar compromiso. Forzarla sin ayuda suele ser mala idea.' },
      { title: 'Winston', body: 'Te presiona con cleave y te corta rutas. Si te obliga a gastar movilidad defensiva, pierdes amenaza.' },
      { title: 'Symmetra', body: 'Los beams y torretas dificultan entradas limpias. No juegues sus zonas estrechas sin información.' },
      { title: 'Mei', body: 'Puede frenarte, aislarte y castigar tu salida. Respeta pared y slow antes de entrar.' },
      { title: 'Cassidy', body: 'Castiga entradas rectas y puede obligarte a gastar Deflect temprano.' },
      { title: 'Zarya', body: 'Los beams no se reflejan y las burbujas pueden negar tus resets. Elige mejor objetivo.' },
    ],
    counterplay: [
      'No fuerces duelos contra beams o supports protegidos.',
      'Entra cuando el rival ya haya gastado peel, no cuando todo está disponible.',
      'Si Brigitte protege a Ana o Kiriko, cambia de ángulo o fuerza recursos antes.',
      'Contra Cassidy, evita entrar en línea recta si aún puede castigarte.',
      'Si no hay reset claro, sal y vuelve a pokear.',
    ],
    compositions: [
      { title: 'Dive', body: 'Winston o D.Va con Tracer, Sombra, Echo o Kiriko. Genji gana valor cuando entra junto a presión real, no cuando va solo.' },
      { title: 'Nano Blade', body: 'Ana + Genji sigue siendo una condición fuerte si cuentas recursos rivales antes de usar Blade.' },
      { title: 'Brawl con presión lateral', body: 'Reinhardt, Ramattra o Junker Queen pueden ocupar la frontal mientras Genji amenaza laterales y remates.' },
    ],
    vodReview: [
      'Revisa tus muertes tempranas. ¿Entraste antes de que tu equipo presionara?',
      'Marca cada Dash. ¿Confirmó una baja, forzó reset o te dejó vendido?',
      'Mira tus Deflect. ¿Negaron daño importante o los gastaste por costumbre?',
      'Revisa Dragonblade. ¿Habías contado Sleep, Suzu, Lamp o Beat antes de sacarla?',
    ],
    checklist: [
      'Pokeo antes de entrar.',
      'Sé qué cooldown quiero forzar.',
      'Dash tiene kill, reset o salida.',
      'Deflect está disponible para el momento peligroso.',
      'No uso Blade contra todas las respuestas rivales disponibles.',
      'Cambio de ruta si ya me están esperando.',
    ],
    faqs: [
      { question: '¿Genji es bueno para ranked?', answer: 'Sí, pero depende mucho del timing. Genji castiga errores y confirma bajas, pero sufre si entra solo contra todos los recursos rivales.' },
      { question: '¿Cuál es el error más común con Genji?', answer: 'Usar Dash para entrar sin objetivo vulnerable ni plan de salida. Si no hay reset o ayuda del equipo, esa entrada suele convertirse en muerte gratis.' },
      { question: '¿Cómo uso mejor Dragonblade?', answer: 'Prepárala contando cooldowns defensivos. Una Blade después de Suzu, Sleep o Lamp tiene mucho más valor que una Blade lanzada contra todo disponible.' },
      { question: '¿Qué héroes counterean a Genji?', answer: 'Brigitte, Moira, Winston, Symmetra, Mei, Cassidy y Zarya son amenazas habituales por peel, beams, control o capacidad para castigar entradas.' },
      { question: '¿Genji necesita Nano?', answer: 'No siempre, pero Nano facilita muchísimo Dragonblade. Sin Nano, necesitas mejores objetivos tocados, rutas limpias y recursos rivales gastados.' },
    ],
    links: [
      { href: '/guides/como-jugar-genji-ranked-overwatch', label: 'Guía ranked de Genji' },
      { href: '/counters/genji', label: 'Counters de Genji' },
      { href: '/team-comps/genji', label: 'Composiciones con Genji' },
      { href: '/roles/dps', label: 'Guías de DPS' },
      { href: '/heroes/ana', label: 'Ana' },
      { href: '/heroes/kiriko', label: 'Kiriko' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Cómo revisar una VOD' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  reinhardt: {
    slug: 'reinhardt',
    name: 'Reinhardt',
    role: 'Tank',
    roleSlug: 'tank',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Reinhardt Overwatch Guide: cómo jugarlo, counters y ranked',
    seoDescription: 'Guía completa de Reinhardt en Overwatch: posicionamiento, Barrier Field, Charge, Fire Strike, Earthshatter, counters, composiciones y consejos ranked.',
    h1: 'Reinhardt en Overwatch: guía completa para ranked',
    kicker: 'Tank de brawl, escudo y control de esquinas',
    intro: [
      'Reinhardt parece sencillo porque su kit se entiende rápido: martillo, escudo, carga, proyectil y una ultimate enorme. En ranked, sin embargo, no gana por levantar Barrier Field hasta que se rompe. Gana cuando toma espacio esquina por esquina y convierte una pelea cercana en ventaja real para su equipo.',
      'El error típico es caminar por main con el escudo levantado esperando que el equipo haga todo detrás. Eso no es crear espacio; es perder recursos antes de que la pelea empiece. Reinhardt usa el escudo para cruzar zonas peligrosas, tapar momentos concretos y llegar vivo a la esquina donde puede pegar.',
      'Esta guía está pensada para ranked: ruta de entrada, uso del escudo, cuándo hacer Charge, cómo preparar Earthshatter y qué revisar en tus VODs para saber si estás liderando la pelea o solo recibiendo daño.',
    ],
    facts: [
      { title: 'Rol', body: 'Tank' },
      { title: 'Estilo', body: 'Brawl, rush, control de esquinas y presión cuerpo a cuerpo.' },
      { title: 'Punto fuerte', body: 'Peleas cortas, mapas cerrados y engages con equipo.' },
      { title: 'Punto débil', body: 'Mapas abiertos, poke constante y composiciones que kitean bien.' },
      { title: 'Ideal en', body: 'Calles, pasillos, chokes y zonas con cobertura cercana.' },
      { title: 'Sufre contra', body: 'Poke largo, slows, boops, verticalidad y control bien guardado.' },
    ],
    rankedPlan: [
      'Elige una esquina antes de avanzar. Reinhardt necesita ruta, no una caminata lenta por main hasta quedarse sin escudo.',
      'Usa Barrier Field para rotar, cubrir cooldowns importantes o ayudar al equipo a cruzar. Si lo mantienes levantado por costumbre, llegas a la pelea sin recurso.',
      'Busca presión de martillo cuando tu equipo puede seguir. Si pegas solo y tus supports no te ven, no estás creando espacio: estás regalando una muerte.',
      'Charge debe tener pared cercana, objetivo claro o salida razonable. Si no sabes dónde acabas, no cargues.',
      'Earthshatter funciona cuando has contado escudos, stuns, boops y follow-up. Una Shatter bonita sin equipo cerca suele ser una pelea perdida con estilo.',
    ],
    sections: [
      {
        title: 'Juega esquina por esquina',
        body: 'Reinhardt necesita cobertura para cortar daño cuando baja el escudo. Una buena esquina te permite esperar curación, amenazar martillo, preparar Fire Strike y esconder Earthshatter sin regalar vida.',
      },
      {
        title: 'Crear espacio no es absorber daño',
        body: 'Si avanzas y el rival gasta recursos para frenarte, tu equipo gana margen. Si solo te disparan mientras retrocedes, no has creado espacio: has dado ultimate charge y has perdido escudo.',
      },
      {
        title: 'Cuándo cambiar el plan',
        body: 'Si el rival juega Pharah, Echo, Zen, Ana y mucho poke, insistir por main puede ser inútil. Busca rutas cortas, espera speed, rota o cambia el ritmo antes de repetir el mismo engage fallido.',
      },
    ],
    abilities: [
      {
        title: 'Rocket Hammer',
        body: 'Es tu amenaza real en corto. Pega cuando tu equipo puede acompañar y cuando no te separas de tus supports. Perseguir cada kill suele romper tu propia frontline.',
      },
      {
        title: 'Barrier Field',
        body: 'No es una segunda barra de vida. Úsalo para cruzar líneas peligrosas, proteger una rotación, bloquear una habilidad clave o tapar una retirada. Si se rompe antes de la pelea, algo ha ido mal.',
      },
      {
        title: 'Charge',
        body: 'Puede confirmar kills o castigar un mal posicionamiento, pero también puede tirar una pelea. Prioriza pins cortos contra pared cercana y evita cargas largas hacia el fondo del mapa.',
      },
      {
        title: 'Fire Strike',
        body: 'Sirve para cargar ultimate, presionar líneas previsibles y castigar rotaciones. Tiene más valor cuando atraviesa varios objetivos o fuerza movimiento antes del engage.',
      },
      {
        title: 'Earthshatter',
        body: 'Puede ganar peleas enteras, pero necesita contexto. Cuenta escudos, control, boops y si tu equipo puede confirmar las bajas antes de pulsar la ultimate.',
      },
    ],
    mistakes: [
      'Caminar por main con el escudo hasta romperlo.',
      'Hacer Charge larga sin saber dónde acabas.',
      'Ignorar esquinas y cobertura.',
      'Usar Earthshatter contra escudo o control disponible.',
      'Perseguir kills mientras tu backline muere.',
      'Cruzar espacios abiertos sin speed, ruta o plan.',
      'Entrar sin comprobar línea de visión de supports.',
    ],
    counters: [
      { title: 'Orisa', body: 'Corta engages, aguanta presión frontal y hace que cerrar distancia sea más caro.' },
      { title: 'Ramattra', body: 'Puede pelear en rango medio y castigar a Reinhardt si no logra una pelea corta favorable.' },
      { title: 'Pharah y Echo', body: 'Obligan a depender del equipo para controlar verticalidad. Si el cielo juega gratis, tu presión frontal pierde valor.' },
      { title: 'Mei', body: 'Puede separar a Reinhardt con muro y castigar avances predecibles.' },
      { title: 'Ana', body: 'Biotic Grenade y Sleep Dart castigan entradas sin recursos contados.' },
      { title: 'Zenyatta', body: 'Discord Orb convierte cada cruce abierto en una amenaza seria.' },
    ],
    counterplay: [
      'Contra poke, no cruces main sin ruta ni cobertura.',
      'Contra Mei, respeta muro antes de comprometerte.',
      'Contra Ana, intenta forzar Sleep o granada antes del engage fuerte.',
      'Si hay Pharah o Echo, no ignores lo que está sufriendo tu backline.',
      'Cuando no puedas llegar, rota o espera recursos en vez de gastar escudo gratis.',
    ],
    compositions: [
      { title: 'Rush / Brawl clásico', body: 'Reinhardt con Mei, Reaper, Cassidy o Symmetra y supports como Lucio, Kiriko o Baptiste. La condición es cerrar distancia juntos.' },
      { title: 'Brawl con control', body: 'Mei y Cassidy ayudan a aislar objetivos mientras Reinhardt ocupa la esquina y fuerza al rival a pelear corto.' },
      { title: 'Doble tank si aplica', body: 'Con un segundo tank gana protección, pero debe coordinar entradas para no gastar escudo antes de que el equipo esté listo.' },
    ],
    vodReview: [
      'Mira si tu escudo se rompe antes de que empiece la pelea real.',
      'Revisa cada Charge: ¿acabaste cerca del equipo o aislado?',
      'Comprueba si tus supports podían verte cuando entraste.',
      'Marca cada Earthshatter y pregunta si tenía follow-up.',
      'Busca si repetiste el mismo engage fallido sin cambiar ruta.',
    ],
    checklist: [
      'Juego esquina por esquina.',
      'Uso escudo para rotar, no para quedarme quieto.',
      'Charge tiene pared, objetivo o salida.',
      'Miro línea de visión de supports.',
      'Cuento escudos y control antes de Shatter.',
      'No fuerzo brawl en mapa abierto sin recursos.',
    ],
    faqs: [
      { question: '¿Reinhardt es bueno para ranked?', answer: 'Sí, sobre todo en mapas cerrados y con equipos que puedan jugar brawl o rush. Sufre más en mapas abiertos o contra rivales que kitean bien.' },
      { question: '¿Cuál es el error más común con Reinhardt?', answer: 'Usar Barrier Field como una barra de vida infinita y caminar por main hasta que el escudo se rompe.' },
      { question: '¿Cuándo debo usar Charge?', answer: 'Cuando tienes un pin corto, una pared cercana o una confirmación clara. Evita cargas largas que te separan del equipo.' },
      { question: '¿Cómo uso mejor Earthshatter?', answer: 'Espera a que el rival gaste escudos, control o movilidad, y úsala solo si tu equipo puede seguir la jugada.' },
      { question: '¿Qué composición va mejor con Reinhardt?', answer: 'Rush o brawl con Lucio, Mei, Cassidy, Reaper, Kiriko o Baptiste suele encajar bien, según mapa y meta.' },
    ],
    links: [
      { href: '/guides/como-jugar-reinhardt-ranked-overwatch', label: 'Guía ranked de Reinhardt' },
      { href: '/counters/reinhardt', label: 'Counters de Reinhardt' },
      { href: '/team-comps/reinhardt', label: 'Composiciones con Reinhardt' },
      { href: '/roles/tank', label: 'Guías de Tank' },
      { href: '/heroes/dva', label: 'D.Va' },
      { href: '/heroes/winston', label: 'Winston' },
      { href: '/guides/como-mejorar-como-tank-overwatch', label: 'Cómo mejorar como Tank' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  dva: {
    slug: 'dva',
    name: 'D.Va',
    role: 'Tank',
    roleSlug: 'tank',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'D.Va Overwatch Guide: cómo jugarla, Matrix, counters y ranked',
    seoDescription: 'Guía completa de D.Va en Overwatch: Defense Matrix, Boosters, Micro Missiles, Self-Destruct, counters, composiciones y consejos ranked.',
    h1: 'D.Va en Overwatch: guía completa para ranked',
    kicker: 'Tank flexible de movilidad, Matrix y control de high ground',
    intro: [
      'D.Va puede contestar high ground, proteger supports, negar daño clave con Defense Matrix y castigar objetivos aislados con Boosters y Micro Missiles. Esa flexibilidad es su mayor fuerza, pero también la razón por la que muchos jugadores la usan sin plan.',
      'Una buena D.Va no está siempre delante ni siempre detrás. Está donde Matrix cambia la pelea: a veces negando burst sobre un support, a veces expulsando a un DPS de high ground y a veces acompañando un dive para que la entrada tenga salida.',
      'Esta guía se centra en ranked: qué hacer con Boosters, cuándo guardar Matrix, cómo evitar perder mech antes de tiempo y cómo revisar si estás protegiendo a tu equipo o persiguiendo kills que no importan.',
    ],
    facts: [
      { title: 'Rol', body: 'Tank' },
      { title: 'Estilo', body: 'Movilidad, peel, control de high ground y mitigación puntual.' },
      { title: 'Punto fuerte', body: 'Negar daño clave y contestar ángulos que otros tanks no alcanzan.' },
      { title: 'Punto débil', body: 'Beams, control y persecuciones demasiado largas.' },
      { title: 'Ideal en', body: 'Mapas con verticalidad, rutas laterales y high ground.' },
      { title: 'Sufre contra', body: 'Zarya, Symmetra, Mei y composiciones que castigan su mech de cerca.' },
    ],
    rankedPlan: [
      'Antes de cada pelea, decide si tu trabajo es contestar high ground, proteger backline, negar una habilidad clave o acompañar un dive.',
      'Usa Boosters con entrada y salida. Si vuelas hacia delante sin Matrix o sin ruta de vuelta, tu mech desaparece antes de crear valor.',
      'Defense Matrix debe bloquear amenazas reales: granadas, Sleep Dart, burst, ultimates de proyectil o follow-up sobre un aliado vulnerable.',
      'No dispares a burbujas de Zarya por inercia y no intentes pelear beams como si Matrix los bloqueara.',
      'Self-Destruct no necesita multikill. Puede zonear, forzar movimiento, ganar overtime o permitirte recuperar mech en una pelea ganable.',
    ],
    sections: [
      {
        title: 'La pregunta de D.Va',
        body: 'Antes de gastar recursos, pregúntate dónde aporta más valor tu Matrix. Si la respuesta está en tu backline, no persigas. Si está en high ground, sube y expulsa al DPS.',
      },
      {
        title: 'Control de high ground',
        body: 'D.Va puede subir donde otros tanks no llegan. Contestar a Ashe, Soldier, Sojourn o un support en altura puede cambiar más la pelea que disparar al tank en bajo.',
      },
      {
        title: 'Peel sin jugar pasiva',
        body: 'Proteger a tus supports no significa quedarte inmóvil. Significa reconocer cuándo el rival va a entrar y estar lo bastante cerca para negar el burst o empujar al flanker fuera.',
      },
    ],
    abilities: [
      {
        title: 'Fusion Cannons',
        body: 'Funcionan mejor de cerca. No intentes ganar duelos largos a distancia; usa tu movilidad para cerrar sobre objetivos vulnerables o expulsar amenazas.',
      },
      {
        title: 'Boosters',
        body: 'Son entrada, salida, peel y control de altura. El mal uso clásico es perseguir una kill hasta perder la conexión con el equipo.',
      },
      {
        title: 'Defense Matrix',
        body: 'Bloquea proyectiles delante de D.Va. Tiene más valor cuando niega una habilidad importante que cuando absorbe spam sin amenaza.',
      },
      {
        title: 'Micro Missiles',
        body: 'Añaden burst a corta distancia. Combínalos con Boosters para castigar objetivos aislados, no solo para disparar al tank por costumbre.',
      },
      {
        title: 'Self-Destruct',
        body: 'Puede matar, zonear, forzar cobertura, ganar overtime o habilitar remech. No midas su valor solo por multikills.',
      },
    ],
    mistakes: [
      'Gastar Matrix contra spam sin valor.',
      'Perseguir kills y abandonar backline.',
      'No contestar high ground.',
      'Usar Boosters hacia delante sin plan de vuelta.',
      'Pelear beams como si Matrix los bloqueara.',
      'Perder mech antes de la pelea real.',
      'Tirar Self-Destruct sin objetivo claro.',
    ],
    counters: [
      { title: 'Zarya', body: 'Sus beams no se bloquean con Matrix y sus burbujas castigan disparos automáticos.' },
      { title: 'Symmetra', body: 'El beam y las torretas dificultan entradas limpias si no limpias la zona antes.' },
      { title: 'Mei', body: 'Puede ralentizar, separar y castigar a D.Va cuando se compromete demasiado.' },
      { title: 'Winston', body: 'Presiona backline y obliga a decidir entre contestar o proteger. El timing decide el matchup.' },
      { title: 'Brigitte', body: 'Hace más difícil divear supports y castiga entradas predecibles.' },
      { title: 'Zenyatta', body: 'Discord Orb puede hacer que pierdas mech muy rápido si te quedas expuesta.' },
    ],
    counterplay: [
      'Contra Zarya, evita cargar energía gratis y juega más con cobertura.',
      'Contra Symmetra, limpia torretas antes de entrar.',
      'Contra Mei, no uses Boosters hacia una zona donde puedas quedar aislada.',
      'Contra Discord, expónte menos tiempo y busca entradas más cortas.',
      'No necesitas matar al counter: necesitas negar el valor que intenta crear.',
    ],
    compositions: [
      { title: 'Dive flexible', body: 'D.Va con Tracer, Genji, Sombra, Echo o Shion y supports como Kiriko, Lucio, Brigitte o Ana. Entra sobre objetivos vulnerables y protege la salida con Matrix.' },
      { title: 'Anti-dive / peel', body: 'Cassidy, Mei, Torbjörn o Sombra con supports resistentes. D.Va protege backline y castiga al rival cuando entra.' },
      { title: 'Poke con high ground', body: 'Ashe, Sojourn, Cassidy o Soldier aprovechan que D.Va expulsa amenazas de altura y niega burst puntual.' },
    ],
    vodReview: [
      'Mira si Matrix bloqueó algo importante o solo spam.',
      'Revisa tus pérdidas de mech antes de la pelea real.',
      'Marca cada Boosters y pregunta si tenía salida.',
      'Comprueba si abandonaste a tus supports contra dive.',
      'Evalúa si Self-Destruct tuvo objetivo: kill, zoneo, overtime o remech.',
    ],
    checklist: [
      'Matrix bloquea amenazas reales.',
      'Boosters tienen entrada y salida.',
      'Contesto high ground.',
      'No abandono backline contra dive.',
      'No peleo beams sin plan.',
      'Self-Destruct tiene propósito claro.',
    ],
    faqs: [
      { question: '¿D.Va es buena para ranked?', answer: 'Sí. Es muy flexible y puede adaptarse a dive, peel y control de high ground, pero exige buena lectura de Matrix y Boosters.' },
      { question: '¿Cuál es el error más común con D.Va?', answer: 'Perseguir kills demasiado lejos y no estar disponible para proteger a tu equipo cuando importa.' },
      { question: '¿Defense Matrix bloquea todo?', answer: 'No. Bloquea proyectiles en un área frontal, pero no bloquea beams como Zarya o Symmetra.' },
      { question: '¿Cuándo uso Self-Destruct?', answer: 'Para matar, zonear, forzar movimiento, ganar overtime o recuperar mech. No necesita siempre multikill.' },
      { question: '¿D.Va es dive o peel?', answer: 'Puede ser ambas. La clave es decidir qué necesita la pelea: entrar, contestar high ground o proteger backline.' },
    ],
    links: [
      { href: '/guides/como-jugar-dva-ranked-overwatch', label: 'Guía ranked de D.Va' },
      { href: '/counters/dva', label: 'Counters de D.Va' },
      { href: '/team-comps/dva', label: 'Composiciones con D.Va' },
      { href: '/roles/tank', label: 'Guías de Tank' },
      { href: '/heroes/reinhardt', label: 'Reinhardt' },
      { href: '/heroes/winston', label: 'Winston' },
      { href: '/guides/como-mejorar-como-tank-overwatch', label: 'Cómo mejorar como Tank' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  winston: {
    slug: 'winston',
    name: 'Winston',
    role: 'Tank',
    roleSlug: 'tank',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Winston Overwatch Guide: cómo jugarlo, dive, counters y ranked',
    seoDescription: 'Guía completa de Winston en Overwatch: Jump Pack, Barrier Projector, Primal Rage, dive, counters, composiciones y consejos ranked.',
    h1: 'Winston en Overwatch: guía completa para ranked',
    kicker: 'Tank de dive, presión sobre backline y burbuja',
    intro: [
      'Winston no gana por saltar sobre cinco enemigos y esperar sobrevivir. Gana cuando elige un objetivo vulnerable, entra con timing, corta recursos con Barrier Projector y sale vivo después de forzar cooldowns.',
      'Un Winston útil no siempre mata. Muchas veces gana una pelea porque obliga a dos supports a girarse, fuerza Suzu, Sleep o movilidad, y permite que su equipo avance mientras el rival está dividido.',
      'Esta guía cubre el ciclo básico de Winston en ranked: preparar posición, saltar con objetivo, colocar burbuja, forzar recursos, salir vivo y revisar si tus engages tienen sentido.',
    ],
    facts: [
      { title: 'Rol', body: 'Tank' },
      { title: 'Estilo', body: 'Dive, presión sobre backline y control de high ground.' },
      { title: 'Punto fuerte', body: 'Entrar sobre objetivos vulnerables y dividir atención.' },
      { title: 'Punto débil', body: 'Burst, anti-dive y counters de corto rango.' },
      { title: 'Ideal en', body: 'Mapas con verticalidad y backlines expuestas.' },
      { title: 'Sufre contra', body: 'Reaper, Bastion, Brigitte, D.Va, Roadhog, Mauga y mucho peel.' },
    ],
    rankedPlan: [
      'Antes de saltar, identifica objetivo, cooldowns que pueden pararte, si tu equipo puede seguir, dónde pondrás burbuja y cómo sales.',
      'No saltes “al equipo rival”. Salta sobre un support, un DPS aislado, un sniper o una zona que quieras negar.',
      'Barrier Projector no es solo protección: corta curas, bloquea daño y divide al objetivo del resto del equipo.',
      'Si fuerzas Suzu, Sleep, Fade, Coach Gun, Lamp o movilidad, ya has generado valor. No necesitas morir buscando la kill.',
      'Primal Rage necesita objetivo: sobrevivir, desplazar, ganar overtime o confirmar una baja. Activarla sin plan suele empujar enemigos a zonas seguras.',
    ],
    sections: [
      {
        title: 'Prepara antes de saltar',
        body: 'Toma high ground o una ruta lateral antes del engage. Winston no tiene por qué empezar todas las peleas desde main recibiendo daño frontal.',
      },
      {
        title: 'El valor está en la ventana',
        body: 'Tu salto debe abrir una ventana para el equipo. Si entras antes de que puedan seguirte, el rival solo tiene que girarse y dispararte.',
      },
      {
        title: 'Salir también es ganar',
        body: 'Un Winston vivo puede volver a entrar. Si ya has forzado recursos y no hay kill clara, salir a tiempo suele ser la decisión que gana la siguiente pelea.',
      },
    ],
    abilities: [
      {
        title: 'Tesla Cannon',
        body: 'Hace daño en cono frontal y funciona bien contra héroes móviles. No tiene burst enorme, así que úsalo para presionar, limpiar objetivos tocados y forzar recursos.',
      },
      {
        title: 'Jump Pack',
        body: 'Es entrada, salida y reposicionamiento. Saltar sin objetivo, sin burbuja o sin saber dónde aterrizas convierte a Winston en una batería de ultimate rival.',
      },
      {
        title: 'Barrier Projector',
        body: 'Corta curas, bloquea daño, divide al target y te compra tiempo hasta que vuelva Jump Pack. Ponerla tarde reduce muchísimo su valor.',
      },
      {
        title: 'Primal Rage',
        body: 'Sirve para sobrevivir, desplazar enemigos, ganar overtime o confirmar kills. Decide a quién quieres mover antes de activarla.',
      },
    ],
    mistakes: [
      'Saltar antes de que el equipo esté listo.',
      'Entrar sin objetivo claro.',
      'Usar burbuja tarde.',
      'Quedarte después de forzar recursos.',
      'Saltar contra Reaper o Bastion con todo disponible.',
      'No usar high ground.',
      'Activar Primal Rage sin objetivo.',
    ],
    counters: [
      { title: 'Reaper', body: 'Castiga a Winston en corto rango y le obliga a jugar entradas mucho más pacientes.' },
      { title: 'Bastion', body: 'Puede derretirlo si entra sin contar configuración o sin cobertura.' },
      { title: 'Brigitte', body: 'Protege backline y hace más difícil convertir un dive sobre supports.' },
      { title: 'D.Va', body: 'Puede contestar entradas, negar daño y proteger al objetivo que Winston quiere presionar.' },
      { title: 'Roadhog', body: 'Hook castiga saltos predecibles y entradas sin burbuja.' },
      { title: 'Mauga', body: 'Castiga peleas frontales largas si Winston no divide bien la atención.' },
    ],
    counterplay: [
      'Contra Reaper o Bastion, no saltes directo sin forzar recursos.',
      'Contra Brigitte, no intentes matar al support protegido de primeras.',
      'Contra D.Va, divide su atención: si protege backline, tu equipo puede ganar espacio por otro lado.',
      'Busca objetivos vulnerables, no duelos de ego contra counters listos.',
      'Si no puedes matar, fuerza recursos y sal vivo.',
    ],
    compositions: [
      { title: 'Dive clásico', body: 'Winston con Tracer, Genji, Sombra, Echo o Shion y supports como Ana, Kiriko, Lucio o Brigitte. La clave es presión simultánea.' },
      { title: 'Dive con Nano', body: 'Ana puede acelerar un engage con Nano Winston o reservarlo para Nano Blade, según la pelea.' },
      { title: 'Anti-poke', body: 'Winston funciona bien contra poke si puede saltar sobre snipers o supports sin cruzar main a pie.' },
    ],
    vodReview: [
      'Revisa si saltaste sobre un objetivo concreto.',
      'Comprueba si tu equipo podía seguir la entrada.',
      'Mira si pusiste burbuja antes o después de recibir el burst.',
      'Marca si forzaste recursos y saliste vivo.',
      'Evalúa si Primal Rage desplazó a alguien útil.',
    ],
    checklist: [
      'Salto con objetivo claro.',
      'Sé qué cooldown rival me puede parar.',
      'Pongo burbuja para cortar curas o daño.',
      'Tengo ruta de salida.',
      'No salto si mi equipo no puede seguir.',
      'Primal tiene objetivo concreto.',
    ],
    faqs: [
      { question: '¿Winston es bueno para ranked?', answer: 'Sí, especialmente en mapas con verticalidad y contra backlines vulnerables. Requiere timing y saber cuándo salir.' },
      { question: '¿Cuál es el error más común con Winston?', answer: 'Saltar sin objetivo ni salida, antes de que el equipo pueda aprovechar la presión.' },
      { question: '¿Winston necesita coordinación?', answer: 'Ayuda mucho, pero en ranked puede generar valor si fuerza recursos y sobrevive, incluso sin dive perfecto.' },
      { question: '¿Cómo uso mejor la burbuja?', answer: 'Para cortar curas, bloquear daño clave y aislar el objetivo. No la pongas tarde cuando ya recibiste todo el burst.' },
      { question: '¿Cuándo uso Primal Rage?', answer: 'Para sobrevivir, desplazar enemigos, ganar overtime o confirmar kills. No la uses sin saber a quién quieres mover.' },
    ],
    links: [
      { href: '/guides/como-jugar-winston-ranked-overwatch', label: 'Guía ranked de Winston' },
      { href: '/counters/winston', label: 'Counters de Winston' },
      { href: '/team-comps/winston', label: 'Composiciones con Winston' },
      { href: '/roles/tank', label: 'Guías de Tank' },
      { href: '/heroes/reinhardt', label: 'Reinhardt' },
      { href: '/heroes/dva', label: 'D.Va' },
      { href: '/heroes/genji', label: 'Genji' },
      { href: '/guides/como-mejorar-como-tank-overwatch', label: 'Cómo mejorar como Tank' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
  cassidy: {
    slug: 'cassidy',
    name: 'Cassidy',
    role: 'DPS',
    roleSlug: 'dps',
    updatedAt: '26 de junio de 2026',
    seoTitle: 'Cassidy Overwatch Guide: cómo jugarlo, counters y ranked',
    seoDescription: 'Guía completa de Cassidy en Overwatch: Peacekeeper, Combat Roll, Deadeye, posicionamiento, counters, anti-flanker y consejos ranked.',
    h1: 'Cassidy en Overwatch: guía completa para ranked',
    kicker: 'DPS hitscan de rango medio y anti-flanker',
    intro: [
      'Cassidy castiga errores. No necesita flanquear como Tracer ni jugar líneas larguísimas como Widowmaker. Su valor aparece cuando controla ángulos, amenaza duelos, protege a su backline de flankers y convierte recursos mal gastados del rival en kills.',
      'El error más común es confundir daño con impacto. Disparar al tank toda la partida puede inflar números, pero no siempre gana peleas. Cassidy necesita daño útil: presionar supports, castigar movilidad, controlar rutas y confirmar objetivos tocados.',
      'Esta guía se centra en ranked: posición a rango medio, uso de Combat Roll, cuándo Deadeye tiene valor y cómo revisar si tus ángulos están generando kills o solo estadística vacía.',
    ],
    facts: [
      { title: 'Rol', body: 'DPS' },
      { title: 'Subrol', body: 'Hitscan, rango medio y anti-flanker.' },
      { title: 'Punto fuerte', body: 'Duelos a rango medio y castigo de entradas previsibles.' },
      { title: 'Punto débil', body: 'Menos movilidad que flankers y mala vida en campo abierto.' },
      { title: 'Ideal en', body: 'Mapas con ángulos medios, esquinas y rutas de control.' },
      { title: 'Sufre contra', body: 'Snipers en líneas largas, dive coordinado y spam que lo saca de posición.' },
    ],
    rankedPlan: [
      'Juega desde rango medio y con cobertura cercana. Si estás en main sin esquina, el rival sabe exactamente cómo forzarte.',
      'Toma ángulos laterales seguros para dividir atención sin desconectarte de tus supports.',
      'Guarda Combat Roll para reposicionarte, sobrevivir a burst o ganar un duelo corto. Usarlo solo para recargar suele dejarte vendido.',
      'Mide tu daño por impacto: recurso forzado, flanker castigado, support presionado o kill confirmada.',
      'Deadeye puede matar, zonear o forzar cobertura. No la uses por desesperación delante de escudos y control disponibles.',
    ],
    sections: [
      {
        title: 'Daño útil contra daño vacío',
        body: 'Daño vacío es disparar siempre al tank con supports curándolo. Daño útil es forzar Suzu, castigar un flanker sin salida o rematar el objetivo que tu tank aisló.',
      },
      {
        title: 'Anti-flanker con disciplina',
        body: 'Cassidy no necesita perseguir a Genji, Tracer o Shion por todo el mapa. Puede controlar rutas, jugar cerca de supports y castigar cuando el flanker gasta movilidad.',
      },
      {
        title: 'Ángulos sin suicidarte',
        body: 'Un ángulo bueno tiene línea de visión, esquina cercana, rango medio y ruta de vuelta. Si tus supports no pueden ayudarte nunca, no es un ángulo: es una apuesta.',
      },
    ],
    abilities: [
      {
        title: 'Peacekeeper',
        body: 'El disparo principal es la base de Cassidy. El secundario puede servir en corto o contra objetivos grandes, pero el primario bien colocado suele generar más valor a rango medio.',
      },
      {
        title: 'Combat Roll',
        body: 'Rueda, reduce daño y recarga. Úsalo para esquivar burst, volver a cobertura o sobrevivir a una entrada, no solo para recargar por comodidad.',
      },
      {
        title: 'Deadeye',
        body: 'Puede matar, zonear, cerrar overtime o forzar recursos defensivos. Tiene menos valor si la activas sin cobertura o contra respuestas obvias.',
      },
    ],
    mistakes: [
      'Jugar en campo abierto.',
      'Usar Combat Roll solo para recargar.',
      'Disparar al tank toda la partida.',
      'Forzar duelos largos contra snipers.',
      'No controlar rutas de flanco.',
      'Usar Deadeye sin revisar escudos o cobertura.',
      'Separarte tanto que tus supports no puedan ayudarte.',
    ],
    counters: [
      { title: 'Widowmaker', body: 'Gana líneas largas donde Cassidy no puede competir cómodamente.' },
      { title: 'Hanzo', body: 'Amenaza ángulos y castiga asomos previsibles.' },
      { title: 'Winston', body: 'Puede saltar sobre Cassidy y forzarlo a gastar Roll o retroceder.' },
      { title: 'D.Va', body: 'Defense Matrix niega daño clave y puede expulsarlo de ángulos.' },
      { title: 'Sigma', body: 'Controla líneas con escudo y dificulta encontrar targets reales.' },
      { title: 'Tracer, Genji y Shion', body: 'Castigan a Cassidy si gasta Roll mal o juega aislado.' },
    ],
    counterplay: [
      'No persigas flankers demasiado lejos.',
      'Guarda Combat Roll si sabes que el rival puede entrar.',
      'Juega cerca de supports cuando tu backline está bajo presión.',
      'Controla rutas de flanco, no solo main.',
      'Contra snipers, cambia ángulo en vez de aceptar su rango favorito.',
    ],
    compositions: [
      { title: 'Brawl / Rush', body: 'Reinhardt, Ramattra o Junker Queen con Cassidy y Mei, Reaper o Shion. Cassidy castiga objetivos en rango medio mientras el equipo avanza.' },
      { title: 'Anti-dive', body: 'D.Va, Orisa o Sigma con Cassidy, Mei, Sombra o Torbjörn. La idea es proteger backline y castigar entradas.' },
      { title: 'Poke medio', body: 'Sigma o Ramattra con Ashe, Soldier o Sojourn. Cassidy controla ángulos y convierte recursos forzados en kills.' },
    ],
    vodReview: [
      'Revisa si tu daño generó kills o solo números.',
      'Comprueba si jugaste con cobertura cercana.',
      'Mira cada Combat Roll: ¿te salvó o lo gastaste sin amenaza?',
      'Marca si controlaste rutas de flanco.',
      'Evalúa si Deadeye tuvo objetivo real: kill, zoneo o recursos.',
    ],
    checklist: [
      'Juego rango medio.',
      'Tengo una esquina cerca.',
      'Combat Roll no se gasta por ansiedad.',
      'No disparo solo al tank.',
      'Controlo rutas de flanco.',
      'Deadeye tiene objetivo claro.',
      'Cambio de ángulo si mi daño no genera impacto.',
    ],
    faqs: [
      { question: '¿Cassidy es bueno para ranked?', answer: 'Sí. Es fuerte si controlas rango medio, juegas con cobertura y castigas entradas de flankers.' },
      { question: '¿Cuál es el error más común con Cassidy?', answer: 'Jugar en campo abierto y usar Combat Roll solo para recargar, quedándote sin herramienta defensiva.' },
      { question: '¿Cassidy counterea a Genji o Tracer?', answer: 'Puede castigarlos si guardas recursos y controlas rutas, pero no los counterea automáticamente si estás aislado o sin Roll.' },
      { question: '¿Cómo uso Deadeye?', answer: 'Úsala para matar, zonear, forzar cobertura o cerrar overtime. Revisa antes escudos, stuns y líneas de visión.' },
      { question: '¿Cassidy debe flanquear?', answer: 'Puede tomar ángulos laterales, pero no debería jugar como flanker profundo. Necesita conexión con su equipo.' },
    ],
    links: [
      { href: '/guides/como-jugar-cassidy-ranked-overwatch', label: 'Guía ranked de Cassidy' },
      { href: '/counters/cassidy', label: 'Counters de Cassidy' },
      { href: '/team-comps/cassidy', label: 'Composiciones con Cassidy' },
      { href: '/roles/dps', label: 'Guías de DPS' },
      { href: '/heroes/genji', label: 'Genji' },
      { href: '/heroes/shion', label: 'Shion' },
      { href: '/guides/como-mejorar-como-dps-overwatch', label: 'Cómo mejorar como DPS' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/experts', label: 'Revisar mi partida con un experto' },
    ],
  },
}

export function getHeroPillar(slug: string) {
  return HERO_PILLARS[slug] ?? null
}
