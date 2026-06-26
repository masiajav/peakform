export type HeroPillarCard = {
  title: string
  body: string
}

export type HeroPillarLink = {
  href: string
  label: string
}

export type HeroPillar = {
  slug: 'ana' | 'kiriko' | 'genji'
  name: string
  role: 'Support' | 'DPS'
  roleSlug: 'support' | 'dps'
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
}

export function getHeroPillar(slug: string) {
  return HERO_PILLARS[slug] ?? null
}
