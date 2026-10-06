export type RankedGuideSection = {
  title: string
  paragraphs: string[]
  points?: string[]
}

export type RankedHeroGuide = {
  slug: string
  heroSlug: string
  heroName: string
  role: 'tank' | 'dps' | 'support'
  roleLabel: string
  title: string
  seoTitle: string
  seoDescription: string
  quickAnswer: string
  intro: string[]
  sections: RankedGuideSection[]
  vodQuestions: string[]
  checklist: string[]
  faqs: { question: string; answer: string }[]
  links: { href: string; label: string }[]
  publishedAt: string
  modifiedAt: string
  updatedAt: string
}

const commonDates = {
  publishedAt: '2026-06-21',
  modifiedAt: '2026-10-05',
  updatedAt: '5 de octubre de 2026',
}

const guides: RankedHeroGuide[] = [
  {
    ...commonDates,
    slug: 'como-jugar-ana-ranked-overwatch',
    heroSlug: 'ana',
    heroName: 'Ana',
    role: 'support',
    roleLabel: 'Support',
    title: 'Cómo jugar Ana en ranked: posición, cooldowns y Nano Boost',
    seoTitle: 'Cómo jugar Ana en ranked: posición, Sleep y Nano Boost',
    seoDescription: 'Guía de Ana para ranked en Overwatch: dónde colocarte, cuándo usar Sleep Dart y Biotic Grenade, cómo elegir Nano Boost y qué revisar en tus VOD.',
    quickAnswer: 'Con Ana, prepara la posición desde la que podrás curar el próximo avance y escapar del dive. Si aciertas Sleep, aprovecha para alejarte o pedir que rematen al objetivo; si lanzas una granada ofensiva, comprueba que alguien puede seguirla. Reservar un cooldown ayuda, pero gastar ambos para sobrevivir es correcto cuando no tienes otra salida.',
    intro: [
      'Jugar Ana bien no consiste en quedarse lo más lejos posible ni en acertar un Sleep espectacular cada pelea. Su valor aparece cuando mantiene a su equipo estable, obliga al rival a respetar la granada y sigue viva cuando llega la presión.',
      'El problema más habitual no es fallar un disparo: es llegar tarde a una rotación, perder de vista al compañero que recibe el engage o quedarse quieto después de acertar Sleep. Aquí veremos cómo encadenar esas decisiones, incluso cuando el equipo no se coordina por voz.',
    ],
    sections: [
      {
        title: 'Elige una posición que puedas abandonar',
        paragraphs: [
          'Antes de empezar la pelea, comprueba tres cosas: ves el espacio que quiere tomar tu Tank, tienes una esquina a un paso y puedes retroceder sin cruzar una zona abierta. Una posición alta es buena solo si no te encierra. En Gibraltar, por ejemplo, el high ground pierde valor cuando el dive rival puede alcanzarte y tu única salida es saltar delante de él.',
          'Muévete cuando tu equipo cambia de esquina, no cuando ya está a punto de morir. Si Reinhardt cruza un choke y tú sigues mirando desde la sala anterior, la curación no llegará aunque tu puntería sea perfecta. Recolocarte pronto suele evitar más muertes que forzar un disparo adicional.',
        ],
        points: ['Cobertura a un paso, no a tres metros.', 'Visión del objetivo que va a recibir presión.', 'Una retirada clara si aparece un flanker.'],
      },
      {
        title: 'Sleep Dart y granada no hacen el mismo trabajo',
        paragraphs: [
          'Si Winston está preparando el salto, evita gastar Sleep sobre otro enemigo protegido desde lejos. Cuando aterrice, busca una línea de tiro que no corte la burbuja. Si lo duermes, retrocede hacia tus compañeros: quedarte a su lado esperando una baja permite que vuelva a presionarte al despertar. Un ping al objetivo ayuda a que nadie lo despierte antes de tiempo.',
          'Una granada ofensiva necesita una continuación. Si Reinhardt ya está a distancia de martillo y el rival ha perdido su cobertura, el anti puede decidir el duelo. Si tus DPS están rotando y nadie ve a ese enemigo, guardarla suele ser mejor. Después de lanzarla, cambia de prioridad: cura a quien está aprovechando el anti, en vez de seguir disparando al mismo objetivo mientras tu aliado se queda sin vida.',
          'Contra una Tracer que te ha cerrado la retirada, Sleep y granada pueden ser necesarios en la misma pelea. El error no es usar dos botones, sino gastarlos sin conseguir distancia ni ayuda. Revisa dónde estabas al terminar ambas animaciones y si seguías expuesta al siguiente atacante.',
        ],
      },
      {
        title: 'Nano Boost necesita un plan sencillo',
        paragraphs: [
          'Antes de dar Nano, mira alcance, ruta y defensivas. Genji puede tener Blade y aun así no llegar a nadie; Winston puede estar dentro de la backline pero sin burbuja ni un compañero que le siga. Elige al aliado que pueda atacar o sostener una posición ahora, no solo al que tenga la combinación más conocida.',
          'Para un Nano defensivo, comprueba que todavía podéis continuar la pelea. Mantener vivo a Reinhardt junto a una esquina con el equipo detrás puede recuperar el control; salvarlo cuando sois dos contra cinco solo retrasa el reset. Si queréis combinar ultimates, acordad el objetivo y espera a ver la entrada, no únicamente el icono de ultimate disponible.',
          'Guardar Nano durante dos peleas no demuestra por sí solo que lo hayas usado mal. Revisa si había una oportunidad aprovechable, cuánto quedaba de ronda y qué costaba esperar. En overtime, conservarlo para una Blade futura no ayuda si perdéis el objetivo antes.',
        ],
      },
      {
        title: 'Errores que parecen mecánicos y no lo son',
        paragraphs: ['En el replay, separa un disparo fallado de una decisión que te dejó sin opciones. Si tenías munición, visión y cobertura, toca revisar la mecánica. Si tu Tank dobló la esquina y tú seguías en la anterior, mejorar el aim no resolverá esa muerte. Tampoco basta con señalar que faltó peel: busca un cambio de posición que pudieras hacer antes de que entrara el flanker.'],
        points: ['Recargar cuando puedes hacerlo a cubierto y no cuando empieza el burst.', 'Mirar a tu otro Support tras oír o ver un flanker en la backline.', 'Dejar de buscar daño cuando pierdes visión del aliado que recibe la presión.', 'Recolocarte después de usar Sleep en vez de esperar inmóvil el resultado.'],
      },
      {
        title: 'Una rotación en Gibraltar, paso a paso',
        paragraphs: [
          'Imagina que tu equipo pasa bajo el primer high ground y tú sigues atrás, con buena visión de la entrada pero no de la siguiente esquina. Antes de que el Tank desaparezca de tu pantalla, avanza por cobertura hacia una línea desde la que puedas seguir curándolo. No hace falta acompañarlo al centro de la pelea: hace falta llegar al siguiente ángulo antes de necesitarlo.',
          'Si durante ese movimiento aparece un Genji, acortar la distancia hacia tu otro Support suele ser más útil que correr hacia el Tank por una zona abierta. Usa Sleep para frenar la persecución y conserva la granada si aún puedes curarte con ayuda. Si el engage ya te obliga a gastar ambos, termina la secuencia detrás de cobertura. En la VOD, compara tu posición antes y después: el cooldown debe comprar una retirada, no solo unos segundos en el mismo sitio.',
        ],
      },
    ],
    vodQuestions: ['¿Tenía una esquina cerca en mi primera muerte?', '¿Qué amenaza justificaba guardar Sleep Dart?', '¿Mi granada tenía follow-up o solo golpeó a mucha gente?', '¿El objetivo de Nano podía entrar o disparar en ese instante?', '¿Me recolocaba con la pelea o reaccionaba tarde?'],
    checklist: ['Sé desde dónde curaré la siguiente esquina.', 'Después de Sleep busco distancia, ayuda o un remate coordinado.', 'Miro a mi otro Support cuando entra un flanker.', 'Tengo un objetivo de Nano y una alternativa.', 'Cambio de posición antes de perder la línea de visión.'],
    faqs: [
      { question: '¿Ana sirve para subir de rango?', answer: 'Puede encajar si te gusta decidir peleas con Sleep, granada y Nano, pero elegirla no garantiza subir. Si mueres antes de poder usar esos recursos, trabaja la posición y las rotaciones. Si sobrevives pero los gastas sin continuación, revisa qué podían aprovechar tus compañeros.' },
      { question: '¿Cuándo debo usar la granada de forma ofensiva?', answer: 'Cuando un aliado pueda presionar al objetivo durante el anti-heal. Si nadie tiene ángulo o recursos para seguir, conserva la granada para la siguiente entrada.' },
      { question: '¿A quién debería dar Nano Boost?', answer: 'Al aliado que pueda convertirlo de inmediato. Comprueba distancia, cooldowns, vida y línea de visión antes de elegir por costumbre.' },
      { question: '¿Es un error gastar Sleep y granada para salvarme?', answer: 'No si ambas son necesarias para sobrevivir y volver con el equipo. Revisa si te permitieron escapar o si las gastaste desde una posición que seguía siendo indefendible. Guardar un cooldown mientras mueres tampoco aporta valor.' },
    ],
    links: [
      { href: '/heroes/ana', label: 'Guía completa de Ana' },
      { href: '/counters/ana', label: 'Counters de Ana' },
      { href: '/team-comps/ana', label: 'Composiciones con Ana' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/roles/support', label: 'Fundamentos de Support' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una pelea en tu VOD' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-kiriko-ranked-overwatch',
    heroSlug: 'kiriko',
    heroName: 'Kiriko',
    role: 'support',
    roleLabel: 'Support',
    title: 'Cómo jugar Kiriko en ranked: Suzu, kunais y Kitsune Rush',
    seoTitle: 'Cómo jugar Kiriko en ranked: Suzu, kunais y Kitsune Rush',
    seoDescription: 'Aprende a jugar Kiriko en ranked: cuándo usar Suzu y Swift Step, cómo alternar curación y daño, y qué decisiones revisar en una VOD.',
    quickAnswer: 'Con Kiriko, cura antes de que el daño deje a un aliado sin margen y busca kunais cuando esa curación pueda sostenerlo. Antes de separarte, elige un destino seguro para Swift Step. Suzu sirve para responder a anti-heal, Sleep o burst; no elimina cualquier control ni convierte un teleport hacia cinco rivales en una buena entrada.',
    intro: [
      'Kiriko puede arreglar errores, pero si intentas arreglarlos todos acabas sin Suzu, sin teleport y en medio del rival. La diferencia entre sobrevivir una pelea y regalar dos muertes suele estar en reconocer qué compañero todavía se puede salvar.',
      'Su daño importa, aunque no a costa de abandonar la curación. El objetivo es encontrar pequeños huecos para lanzar kunais y obligar al rival a respetarte mientras mantienes listo el recurso que la pelea necesita.',
    ],
    sections: [
      {
        title: 'Cura con ritmo y dispara en los huecos',
        paragraphs: [
          'Los ofuda no llegan de inmediato. Si tu Tank se dispone a cruzar una zona abierta, empieza a curarlo antes de que esté crítico. No uses el tiempo de viaje como permiso para disparar siempre: con mucho daño entrante puede necesitar otra tanda de curación, y a larga distancia el margen será menor.',
          'Entre tandas, un kunai hacia una puerta previsible puede obligar al rival a cubrirse sin desatender al equipo. Si buscas un segundo ángulo, comprueba cuánto tardarás en volver a ver a tu Tank. En una pelea con presión baja puedes ser agresiva; cuando varios aliados están recibiendo el engage, prioriza estabilizarlos. No hay una proporción fija de daño y curación que sirva para todas las partidas.',
        ],
      },
      {
        title: 'Suzu se guarda para el momento que cambia la pelea',
        paragraphs: [
          'Si Ana tiene granada y tu Tank va a entrar, reserva Suzu para el anti cuando ese Tank esté recibiendo presión. Si el anti cae sobre un aliado que ya está a cubierto y puede esperar, quizá no haga falta. Con Sleep, considera qué puede pasar antes de que despierte: un compañero a salvo detrás de una pared no exige la misma respuesta que uno rodeado de enemigos.',
          'No trates Suzu como una limpieza universal. Puede eliminar Sleep y anti-heal, pero no levanta a un aliado que ya está derribado por Earthshatter. La protección breve puede evitar un impacto si llega a tiempo; eso es distinto de limpiar el derribo después. Contra Shatter, la colocación y la cobertura siguen siendo la primera defensa.',
          'Después de usar Suzu, reduce la exposición del equipo hasta tener otra respuesta. Curar desde una esquina y avisar de que no tienes Suzu es mejor que seguir un flanco como si aún pudieras salvarlo todo. Cuando estás atrapada tú, usarlo para sobrevivir puede ser correcto: la prioridad cambia si la alternativa es perder un Support.',
        ],
        points: ['Valora el peligro después del efecto, no solo el icono de anti-heal.', 'Comprueba que el lanzamiento llegará al aliado y no a una pared intermedia.', 'Tras usar Suzu, juega con menos exposición hasta recuperar una respuesta.'],
      },
      {
        title: 'Swift Step es una salida, no una invitación al desastre',
        paragraphs: [
          'Antes de teleportarte, busca algo más que la silueta de un aliado. Mira qué enemigos le rodean, dónde podrás cubrirte al llegar y si quedará alguien que sostenga al resto del equipo. Un Genji crítico detrás de la backline rival puede necesitar una retirada, no otro Support atrapado a su lado.',
          'Puedes usar Swift Step para entrar si el destino es controlable y el equipo va a continuar allí. No es siempre un botón exclusivamente defensivo. Pero al llegar debes contar con cobertura, Suzu o ayuda mientras vuelve el teleport. Si solo buscabas un ángulo para kunais, intenta alcanzarlo a pie o escalando y conservar un aliado seguro al que regresar.',
        ],
      },
      {
        title: 'Kitsune Rush debe cruzar el espacio que vais a usar',
        paragraphs: [
          'Coloca Kitsune por una ruta que tu equipo pueda recorrer, preferiblemente desde cobertura y hacia la siguiente esquina. Tirarlo perpendicular al avance o dentro de una sala que el rival puede abandonar reduce mucho su valor.',
          'No esperes siempre una combinación perfecta. Kitsune puede servir para tomar el punto, recuperar el tempo o forzar defensivas. Comunica la dirección y entra con el equipo; usarlo mientras todos recargan o rotan suele desperdiciar los primeros segundos.',
        ],
      },
      {
        title: 'Qué hacer después de gastar Suzu en King’s Row',
        paragraphs: [
          'En el primer ataque, imagina que tu Reinhardt sale del hotel, recibe anti y usas Suzu para que pueda seguir peleando. Si el rival retrocede, no te adelantes a buscar kunais por la estatua dejando al Tank fuera de vista. Mantén una línea de curación mientras gana la esquina y espera a que el equipo ocupe el espacio.',
          'Si aparece Tracer por detrás, decide el teleport antes de quedarte crítica. Volver a tu otro Support en una zona protegida puede conservar la pelea; teleportarte al Reinhardt que aún está rodeado solo cambia quién te dispara. En el replay, revisa el tramo entre Suzu y Swift Step: ¿había un destino seguro que dejaste de mirar por seguir buscando daño?',
        ],
      },
    ],
    vodQuestions: ['¿Qué recurso rival quería responder con Suzu?', '¿Mi Swift Step me sacó del peligro o me llevó a otro?', '¿Podía lanzar un kunai entre dos tandas de ofuda?', '¿Kitsune cruzaba la ruta real de mi equipo?', '¿Intenté salvar a alguien que ya no tenía salida?'],
    checklist: ['Tengo un aliado seguro al que volver.', 'Sé qué efecto merece Suzu.', 'Intercalo daño sin perder curación importante.', 'No uso Swift Step para perseguir una baja dudosa.', 'Kitsune apunta hacia la zona que el equipo va a ocupar.'],
    faqs: [
      { question: '¿Cuándo debo usar Suzu?', answer: 'Cuando limpia anti-heal o Sleep bajo presión, o su protección evita un burst decisivo. No elimina todos los controles: un derribo de Earthshatter ya aplicado no se limpia. Si el aliado está a salvo y puede recibir curación, no hace falta gastarlo por costumbre.' },
      { question: '¿Kiriko debe hacer mucho daño?', answer: 'Debe amenazar con kunais en los huecos de curación. El daño es útil si no deja sin sostén al compañero que está recibiendo el engage.' },
      { question: '¿Cuándo es malo usar Swift Step?', answer: 'Cuando llegas a una posición sin cobertura, sin Suzu o junto a un aliado que ya está rodeado. Poder teleportarte no significa que el destino sea seguro.' },
      { question: '¿Cuántos kunais debo lanzar entre curaciones?', answer: 'Depende del daño entrante, la distancia de los ofuda y la vida de tus aliados. Prueba un disparo cuando tengas margen, vuelve a comprobar la pelea y cura si lo necesita. Forzar siempre dos kunais puede dejar llegar tarde la siguiente tanda.' },
    ],
    links: [
      { href: '/heroes/kiriko', label: 'Guía completa de Kiriko' },
      { href: '/counters/kiriko', label: 'Counters de Kiriko' },
      { href: '/team-comps/kiriko', label: 'Composiciones con Kiriko' },
      { href: '/guides/como-usar-ultimates-overwatch', label: 'Cómo usar ultimates' },
      { href: '/heroes/ana', label: 'Comparar con Ana' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar decisiones de Support en tu VOD' },
      { href: '/roles/support', label: 'Posicionamiento de Support' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-genji-ranked-overwatch',
    heroSlug: 'genji',
    heroName: 'Genji',
    role: 'dps',
    roleLabel: 'DPS',
    title: 'Cómo jugar Genji en ranked: timing, Dash y Dragonblade',
    seoTitle: 'Cómo jugar Genji en ranked: Dash, Deflect y Dragonblade',
    seoDescription: 'Guía de Genji para ranked: cómo preparar el dive, conseguir resets de Dash, usar Deflect y sacar valor de Dragonblade sin entrar solo.',
    quickAnswer: 'Con Genji, prepara un ángulo sin perder vida y entra cuando haya presión aliada sobre el mismo sector. Antes de Dash, comprueba la vida del objetivo, su respuesta defensiva y dónde acabarás. Si no llega la baja, debes poder retirarte sin depender de un reset que todavía no has conseguido.',
    intro: [
      'Con Genji puedes llegar a la backline y seguir sin tener una buena pelea. Si el objetivo conserva su escape, recibe ayuda de sus Supports y nadie más le está presionando, entrar con Dash te deja vendido. Alcanzarlo no significa que puedas rematarlo.',
      'El timing importa, pero no es simplemente esperar a que salte tu Tank. Debes ver qué enemigo está expuesto, quién puede seguir el daño y dónde terminarás si no consigues el reset. Esa lectura hace más repetibles las entradas y menos dependientes de una jugada espectacular.',
    ],
    sections: [
      {
        title: 'Prepara el engage sin regalar vida',
        paragraphs: [
          'Antes de entrar, usa high ground, paredes y ángulos cortos para lanzar shuriken sin quedarte expuesto. Buscas información y daño previo, no ganar el duelo desde lejos. Si pierdes media vida antes del dive, obligas a tus supports a gastar atención y retrasas la entrada.',
          'Mira qué cambia cuando entra tu Tank. Si Winston aterriza lejos del objetivo que tú quieres atacar, no está creando la distracción que necesitas. Si Reinhardt cruza y dos rivales se giran para frenarlo, sí puede abrirse un lateral. No cuentes un retraso fijo: entra cuando veas atención dividida y un objetivo alcanzable.',
        ],
      },
      {
        title: 'Dash necesita objetivo y salida',
        paragraphs: [
          'Usa Dash para cerrar una baja, atravesar a varios objetivos cuando sabes dónde terminarás o escapar. Entrar sobre un enemigo a vida completa con todos sus cooldowns convierte tu supervivencia en una apuesta.',
          'Dash se recupera con una eliminación, pero no puedes contar con ella antes de ver cómo responde el rival. Si Ana está tocada y Kiriko conserva Suzu, el remate puede desaparecer al entrar. Mantén una pared o plataforma cerca y prepara una salida sin reset. Forzar Suzu ayuda solo si tú o el equipo podéis aprovechar su ausencia después.',
        ],
        points: ['Confirma la vida del objetivo.', 'Cuenta la respuesta defensiva más cercana.', 'Elige dónde acabarás antes de pulsar Dash.'],
      },
      {
        title: 'Deflect compra tiempo, no invulnerabilidad',
        paragraphs: [
          'Deflect responde a disparos y proyectiles que lleguen de frente; no te protege de un enemigo que ya te está disparando por detrás ni de rayos como el de Zarya. Al retirarte, orienta la cámara hacia la amenaza y busca cobertura. Saltar de espaldas confiando en Deflect no resuelve ese daño.',
          'Usarlo durante poke puede ser razonable si protege una rotación o devuelve un recurso importante. El problema es entrar inmediatamente después sin recuperarlo y sin otra defensa. Si ya has cruzado hasta una pared, cancelarlo permite recuperar tu ataque; si aún estás expuesto, acabar antes la animación también puede abrir una oportunidad al rival.',
        ],
      },
      {
        title: 'Dragonblade empieza antes de desenvainar',
        paragraphs: [
          'Localiza al objetivo, pregunta qué defensivas quedan y acércate sin gastar todos los recursos. Una Blade desde la otra punta obliga a usar Dash solo para llegar y hace evidente tu ruta. Entrar desde altura o desde un lateral cercano conserva opciones.',
          'No persigas una pentakill. Tras la primera baja, mira si el siguiente objetivo está cerca y qué escape conserva. Forzar una ultimate defensiva puede ser un buen intercambio, pero no gana la pelea automáticamente: si mueres y el equipo pierde el punto, el recurso forzado no basta. Cuando no hay un segundo objetivo viable, usa el reset para volver a cobertura.',
        ],
      },
      {
        title: 'Después de la primera baja en Dorado',
        paragraphs: [
          'Supón que atacas el primer tramo, tu equipo presiona el high ground y rematas a un DPS que se había separado. Recuperas Dash y ves a Kiriko retirarse hacia otro aliado. Perseguirla hasta el interior puede dejarte solo frente a Suzu y varios enemigos, aunque acabes de ganar el duelo inicial.',
          'Si conservas el high ground y ayudas a disparar al rival que impide mover el payload, la baja ya tiene una continuación útil. En la VOD, pausa al conseguir el reset: compara los enemigos visibles, tu vida y la distancia al equipo. La pregunta no es si podías hacer otro Dash, sino si ese segundo Dash mejoraba una pelea que ya empezaba a estar de vuestro lado.',
        ],
      },
    ],
    vodQuestions: ['¿Entré antes o después de mi Tank?', '¿Dash tenía una baja probable o dependía de un milagro?', '¿Gasté Deflect durante poke sin necesidad?', '¿Qué defensiva rival quedaba para mi Blade?', '¿Podía salir tras conseguir la primera baja?'],
    checklist: ['Mantengo vida mientras preparo el ángulo.', 'No entro antes de que exista presión aliada.', 'Dash termina cerca de cobertura.', 'Conservo Deflect para una amenaza concreta.', 'Sé qué recurso quiero forzar con Dragonblade.'],
    faqs: [
      { question: '¿Cuándo debo entrar con Dash?', answer: 'Cuando puedes cerrar una baja, acompañar un engage real o terminar en una posición segura. Evita usarlo sobre objetivos sanos con todas sus respuestas disponibles.' },
      { question: '¿Cómo saco valor de Dragonblade?', answer: 'Acércate antes de activarla, cuenta defensivas y busca una primera baja realista. No necesitas eliminar a todo el equipo para ganar la pelea.' },
      { question: '¿Genji funciona sin Ana?', answer: 'Sí. Nano facilita Blade, pero Genji puede jugar con dive, velocidad o daño previo de otros compañeros. La coordinación importa más que una pareja obligatoria.' },
      { question: '¿Debo seguir atacando después de conseguir un reset?', answer: 'Solo si el siguiente objetivo es alcanzable y no te deja aislado. Un reset también sirve para salir, recuperar vida y mantener una posición útil. Conseguir una baja y morir persiguiendo otra puede devolver al rival una pelea que ya teníais favorable.' },
    ],
    links: [
      { href: '/heroes/genji', label: 'Guía completa de Genji' },
      { href: '/counters/genji', label: 'Counters de Genji' },
      { href: '/team-comps/genji', label: 'Composiciones con Genji' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo funciona el dive' },
      { href: '/heroes/ana', label: 'Sinergia con Ana' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar entradas y salidas en tu VOD' },
      { href: '/roles/dps', label: 'Elegir objetivos como DPS' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-cassidy-ranked-overwatch',
    heroSlug: 'cassidy',
    heroName: 'Cassidy',
    role: 'dps',
    roleLabel: 'DPS',
    title: 'Cómo jugar Cassidy en ranked: rango, ángulos y Deadeye',
    seoTitle: 'Cómo jugar Cassidy en ranked: rango, aim y Deadeye',
    seoDescription: 'Guía de Cassidy para ranked: cómo controlar el rango medio, elegir ángulos, proteger la backline y usar Deadeye con objetivos realistas.',
    quickAnswer: 'Con Cassidy, elige una esquina desde la que puedas disparar y volver con tus Supports sin una rotación larga. Flashbang ayuda contra una entrada cercana, pero no garantiza el remate. Usa Roll para recargar o alcanzar cobertura y decide antes de cada pelea si tu prioridad es un ángulo de daño o proteger la backline.',
    intro: [
      'Cassidy parece directo porque su arma resuelve muchas situaciones, pero su movilidad limitada castiga cada mala rotación. Llegar tarde a una esquina o perseguir un flanco demasiado largo te deja fuera de la pelea aunque aciertes los disparos.',
      'Su trabajo cambia con la composición: puede proteger a los supports, castigar al Tank que cruza o abrir un segundo ángulo. Elegir uno de esos trabajos antes de la pelea da más consistencia que buscar duelos al azar.',
    ],
    sections: [
      {
        title: 'Controla una zona, no todo el mapa',
        paragraphs: [
          'Juega alrededor del rango donde tus disparos siguen siendo peligrosos y la cobertura está cerca. En una calle larga contra Widowmaker no ganas por insistir desde main; cambia de ruta o espera que tu Tank corte su visión. En una sala corta contra Reaper tampoco debes regalarle su distancia favorita.',
          'Un buen ángulo permite disparar a quien mira a tu Tank y volver con tus Supports en pocos pasos. Roll no es un escape largo ni te sube a otra plataforma. Si tu retirada cruza una calle abierta que el rival controla, el problema está en la ruta, aunque todavía tengas el cooldown disponible.',
        ],
      },
      {
        title: 'Flashbang necesita una continuación',
        paragraphs: [
          'Si Tracer entra sobre Ana, acércate lo suficiente para amenazar con Flashbang sin abandonar tu cobertura. El Hinder limita su movilidad, pero no es el stun completo de la antigua granada ni una baja automática. Necesitas munición y una línea de tiro para aprovecharlo. Si consigues que use Recall y se vaya, puedes volver al frente en vez de perseguirla hasta un health pack.',
          'Combat Roll recarga y reduce el daño recibido durante el movimiento. Úsalo hacia una esquina, no hacia el centro del duelo solo porque necesitas balas. Tampoco eres invulnerable: si varios enemigos ya te ven, rodar unos metros no sustituye una retirada a tiempo.',
        ],
      },
      {
        title: 'Dispara al objetivo que puede morir',
        paragraphs: [
          'No conviertas cada pelea en un concurso de daño contra el Tank. Si el Tank rival usa una esquina y recibe dos supports, cambia la cámara hacia el DPS que asoma o el support que cruza. Cassidy destaca castigando errores breves.',
          'Para revisar el aim, elige también disparos desde una posición estable. Si fallas allí, hay un aspecto mecánico que trabajar. Si todos tus duelos empiezan bajo fuego cruzado, corrige la exposición y la distancia además de practicar la puntería. Una buena esquina te da margen, pero no convierte por sí sola los fallos en aciertos.',
        ],
      },
      {
        title: 'Cambiar de trabajo durante una pelea en Midtown',
        paragraphs: [
          'En el primer ataque, puedes acompañar la presión del Tank desde una entrada lateral de la estación. Si Tracer empieza a atacar a tus Supports por detrás, volver por una ruta corta puede mantener vivo el avance. No hace falta quedarte pegado a Ana toda la ronda; sí hace falta no estar al otro lado del mapa cuando llega el flanco.',
          'Tras expulsar a Tracer, vuelve a buscar un ángulo hacia la zona que el equipo está ocupando. Quedarte mirando la puerta por la que se fue también tiene un coste si el rival ya está presionando delante. En el replay, revisa cuándo cambiaste la cámara y cuánto tardaste en retomar daño útil, no solo si acertaste la granada.',
        ],
      },
      {
        title: 'Deadeye: una baja o una rotación forzada',
        paragraphs: [
          'Úsalo para expulsar al rival de una zona, cubrir una captura o castigar una rotación sin cobertura. Activarlo desde un flanco lejano suele anunciarse antes de que tengas línea de visión y deja al equipo peleando sin ti.',
          'Busca una altura o una esquina ya controlada y acepta un objetivo realista. También puedes cancelarlo si ya forzó defensivas o reposicionamiento; sobrevivir conserva la presión para la siguiente pelea.',
        ],
      },
    ],
    vodQuestions: ['¿Jugaba dentro de mi rango útil?', '¿Mi ángulo podía volver al equipo sin cruzar fuego?', '¿Tenía munición y visión para aprovechar Flashbang?', '¿Disparé al Tank porque era el objetivo correcto o porque era fácil?', '¿Deadeye cambió una rotación o solo hizo que el rival esperase a cubierto?'],
    checklist: ['Tengo una esquina a un paso.', 'Mi ángulo cruza con la presión del Tank.', 'Guardo utilidad si hay un flanker activo.', 'No ruedo hacia una pelea sin salida.', 'Deadeye tiene una función antes de activarlo.'],
    faqs: [
      { question: '¿Flashbang sigue siendo un stun?', answer: 'No es el antiguo stun completo: aplica Hinder, que limita la movilidad del objetivo. El rival todavía puede responder con daño. Antes de lanzarla, comprueba que tienes munición y que puedes seguir el impacto sin salir de cobertura; acertarla no garantiza la baja.' },
      { question: '¿Cómo uso Deadeye en ranked?', answer: 'Para controlar una zona, castigar una rotación o asegurar una baja desde cobertura. Esperar una jugada de cinco eliminaciones suele reducir su valor.' },
      { question: '¿Qué hago contra héroes de largo alcance?', answer: 'No aceptes el duelo desde una calle abierta. Rota por cobertura, juega otro ángulo o espera a que tu Tank corte la línea de visión.' },
      { question: '¿Tengo que quedarme siempre junto a mis Supports?', answer: 'No. Puedes tomar un ángulo corto cuando la backline no está bajo presión. Si un flanker entra repetidamente y tu vuelta es demasiado larga, acércate antes del siguiente engage. La distancia adecuada depende de qué amenaza está activa, no de una posición fija toda la ronda.' },
    ],
    links: [
      { href: '/heroes/cassidy', label: 'Guía completa de Cassidy' },
      { href: '/counters/cassidy', label: 'Counters de Cassidy' },
      { href: '/team-comps/cassidy', label: 'Composiciones con Cassidy' },
      { href: '/counters/tracer', label: 'Cómo jugar contra Tracer' },
      { href: '/roles/dps', label: 'Fundamentos de DPS' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar selección de objetivos en tu VOD' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-reinhardt-ranked-overwatch',
    heroSlug: 'reinhardt',
    heroName: 'Reinhardt',
    role: 'tank',
    roleLabel: 'Tank',
    title: 'Cómo jugar Reinhardt en ranked: esquinas, escudo y engages',
    seoTitle: 'Cómo jugar Reinhardt en ranked: espacio, escudo y Shatter',
    seoDescription: 'Guía de Reinhardt para ranked: cómo tomar espacio con esquinas, administrar el escudo, elegir engages y encontrar Earthshatter sin abandonar al equipo.',
    quickAnswer: 'Con Reinhardt, avanza hacia una cobertura concreta cuando tu equipo pueda seguirte. Usa barrera durante el cruce y recupérala cuando la pared ya te proteja. No bajes el escudo solo por haber llegado a una esquina: antes comprueba si siguen entrando disparos por otro ángulo o si debes proteger a un aliado.',
    intro: [
      'Reinhardt no puede sostener la barrera en mitad de una calle durante toda la pelea. Necesita usarla para cruzar, bloquear amenazas concretas y llegar con vida hasta una esquina desde la que pueda presionar con el martillo.',
      'En ranked no siempre habrá una composición perfecta de brawl. Aun así, puedes dar una lectura clara: marcar la ruta, esperar a tus supports y decidir cuándo caminar o cuándo dejar que el rival entre en tu esquina.',
    ],
    sections: [
      {
        title: 'Gana la siguiente esquina',
        paragraphs: [
          'Divide cada avance en tramos de cobertura. Cruza cuando el rival recarga, cambia de ángulo o gasta burst. Si levantas barrera desde demasiado lejos, llegarás a la pelea sin escudo y sin armadura. Si caminas sin mirar a tu equipo, llegarás solo.',
          'En defensa no necesitas retener cada metro. Retroceder a una esquina mejor mantiene tu amenaza y acorta la línea de curación. Morir en una puerta imposible por orgullo solo entrega carga de ultimate.',
        ],
      },
      {
        title: 'Alterna armadura, escudo y cobertura',
        paragraphs: [
          'Cuando una pared ya te protege, baja el escudo para recuperarlo y deja que tus Supports te curen. No basta con estar junto a una esquina: un DPS en altura o un segundo ángulo puede seguir viéndote. Si tienes que mantener barrera por esa amenaza, cambia de cobertura antes de quedarte sin recursos.',
          'También puedes usar la barrera durante una retirada aliada o para bloquear un Sleep que viene de frente. No necesitas sostenerla contra cada disparo si el equipo puede cubrirse. Si te quedas con poca vida, no la bajes solo para recuperar escudo: corta la línea de tiro, recibe curación y prepara el siguiente cruce.',
        ],
      },
      {
        title: 'Charge debe terminar donde tu equipo pueda jugar',
        paragraphs: [
          'Los pins cortos contra una pared cercana son mucho más fiables que atravesar toda la pelea. Antes de cargar, mira dónde acabarás y quién puede seguirte. Incluso acertar al Tank rival puede ser malo si lo llevas junto a sus supports y tú quedas fuera de visión.',
          'Puedes cancelar Charge antes de terminar el recorrido para quedarte junto a una cobertura o evitar entrar demasiado lejos. También puede ayudarte a volver hacia el equipo si la ruta es segura. Decide ese final antes de empezar: acertar un pin no obliga a continuar hasta el fondo del mapa.',
        ],
      },
      {
        title: 'Earthshatter se construye con presión',
        paragraphs: [
          'Busca una línea que no corte una barrera y comprueba qué aliados pueden seguir el derribo. Kiriko puede proteger a alguien si anticipa el impacto con Suzu, pero no limpia Earthshatter una vez aplicado. No des por cancelada toda la ultimate porque tenga Suzu disponible, ni por ganada la pelea solo porque lo haya gastado.',
          'Un Shatter lateral sobre dos jugadores puede servir más que intentar atravesar al Tank. Si tus DPS tienen ángulo y tú puedes acercarte sin morir, hay follow-up. Si están rotando detrás de una pared, quizá los enemigos se levanten antes de recibir presión. Usa el martillo y los amagos para obligar al rival a defenderse, pero mira la línea real del Shatter antes de lanzarlo.',
        ],
      },
      {
        title: 'Cuándo ceder la esquina en King’s Row',
        paragraphs: [
          'En defensa del primer punto, imagina que el rival ocupa el hotel y abre otro ángulo hacia tu posición. Mantenerte delante de la estatua puede obligarte a tapar dos direcciones que la misma barrera no cubre. Si tus Supports ya han retrocedido, ceder hacia una cobertura con mejor visión permite seguir amenazando a quien entre.',
          'Avísalo con un ping de retirada y protege el cruce del compañero más expuesto si puedes. No hagas Charge hacia el hotel solo para recuperar el espacio: te separa de la curación y puede dejar el punto libre. En el replay, busca el momento en que apareció el segundo ángulo. Una retirada hecha entonces cuesta menos que hacerlo después de perder barrera y armadura.',
        ],
      },
    ],
    vodQuestions: ['¿Cuál era la siguiente cobertura que quería tomar?', '¿Había un segundo ángulo cuando bajé la barrera?', '¿Mis Supports tenían visión cuando avancé?', '¿Podía cancelar Charge en una posición mejor?', '¿Qué barrera o protección podía evitar Shatter y quién podía seguirlo?'],
    checklist: ['Marco una ruta por coberturas.', 'Espero a que el equipo esté a distancia de seguir.', 'Recupero barrera cuando la esquina me protege.', 'Uso Charge con un final previsto.', 'No necesito golpear a cinco con Earthshatter.'],
    faqs: [
      { question: '¿Cuándo debo bajar el escudo?', answer: 'Cuando la cobertura ya corta las líneas peligrosas y tus compañeros no dependen de la barrera para cruzar. Si necesitas regenerarlo pero sigues bajo fuego, busca una retirada a cubierto; bajarlo por necesidad no evita el daño. Comprueba también los ángulos laterales antes de volver a asomar.' },
      { question: '¿Cómo sé si debo avanzar?', answer: 'Comprueba que tus supports tienen visión, que tu equipo está cerca y que el rival ha gastado parte de su presión. Avanza hacia una cobertura concreta.' },
      { question: '¿Cuándo uso Charge?', answer: 'Cuando el recorrido es corto, el final es seguro y tu equipo puede aprovecharlo. Evita cruzar toda la pelea sin línea de curación.' },
      { question: '¿Debo aguantar la misma esquina toda la defensa?', answer: 'No si el rival ya tiene fuego cruzado o tu equipo ha perdido la línea de curación. Ceder unos metros hacia una cobertura mejor puede conservar barrera, vida y compañeros. Valora qué puedes sostener después de la retirada, no solo el espacio que acabas de perder.' },
    ],
    links: [
      { href: '/heroes/reinhardt', label: 'Guía completa de Reinhardt' },
      { href: '/counters/reinhardt', label: 'Counters de Reinhardt' },
      { href: '/team-comps/reinhardt', label: 'Composiciones con Reinhardt' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Brawl, dive y poke' },
      { href: '/roles/tank', label: 'Fundamentos de Tank' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar avances y retiradas en tu VOD' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-dva-ranked-overwatch',
    heroSlug: 'dva',
    heroName: 'D.Va',
    role: 'tank',
    roleLabel: 'Tank',
    title: 'Cómo jugar D.Va en ranked: Matrix, peel y control de altura',
    seoTitle: 'Cómo jugar D.Va en ranked: Matrix, peel y Boosters',
    seoDescription: 'Guía de D.Va para ranked: cómo controlar high ground, usar Defense Matrix, elegir entre dive y peel, y revisar tus engages en una VOD.',
    quickAnswer: 'Con D.Va, decide qué importa más en la siguiente entrada: expulsar a un DPS de altura, apoyar el dive o proteger a tus Supports. Usa Matrix para negar proyectiles peligrosos y termina Boosters junto a cobertura. Si ya has ganado la posición, no necesitas perseguir al rival hasta perder el mech.',
    intro: [
      'Con D.Va debes elegir dónde hace falta tu presencia. Perseguir un objetivo puede dejar abierta la backline; quedarte junto a tus Supports cuando nadie les amenaza permite que el rival conserve una altura importante. Mira qué posición o compañero está condicionando la pelea antes de gastar movilidad.',
      'Los Boosters permiten cambiar de zona, pero no estar en dos peleas a la vez. Si acabas de subir a una plataforma y el rival entra sobre tus Supports, quizá no llegues a tiempo. La decisión de volver debe empezar antes de que alguien esté crítico, no después de ver la muerte en el feed.',
    ],
    sections: [
      {
        title: 'Usa Boosters para disputar una posición',
        paragraphs: [
          'Volar contra un objetivo no obliga a perseguirlo hasta matarlo. Si Soldier abandona el high ground y pierde su ángulo, ya has creado espacio. Aterriza junto a cobertura y conserva Matrix para la respuesta; seguirlo dentro de una sala puede convertir una buena expulsión en un demech.',
          'Antes de despegar, mira dónde están tus supports y qué amenaza puede entrar mientras te vas. En mapas verticales, una ruta corta que te permita volver suele ser mejor que un dive profundo.',
        ],
      },
      {
        title: 'Defense Matrix se mide por lo que niega',
        paragraphs: [
          'Reserva carga para los proyectiles que cambian la pelea: una granada de Ana que viaja hacia el equipo, Sleep o fuego concentrado sobre un compañero expuesto. Usa pulsaciones cortas cuando el daño permita hacerlo; si un aliado cruza bajo burst continuo, puede necesitar más cobertura. No hay que soltar Matrix por sistema mientras sigue en peligro.',
          'Matrix elimina proyectiles dentro de su zona, no cualquier ultimate por estar canalizándose. Puede negar disparos de Tactical Visor, pero no el rayo de Coalescence ni Earthshatter. Contra rayos o martillo tendrás que usar distancia y cobertura, o presionar otra zona. Mira la trayectoria que estás protegiendo: girarte hacia el rival no basta si el disparo sigue llegando a tu Support por fuera de Matrix.',
        ],
      },
      {
        title: 'Decide entre dive y peel antes del salto rival',
        paragraphs: [
          'En 5v5 eres el único Tank del equipo. Si Genji presiona al Support rival mientras un Winston enemigo salta sobre Ana, compara lo que puede terminar antes. Volver tiene sentido si Ana está aislada y perderla os deja sin sostén; seguir el dive puede funcionar si ella tiene ayuda y vosotros podéis cerrar una baja. No vuelvas automáticamente por cualquier daño, pero tampoco presupongas que la backline aguantará sola.',
          'Antes de salir, mira la posición del flanker enemigo y cómo están tus Supports. Un ping al objetivo o una llamada de que vuelves bastan para que el DPS no espere una entrada que has cancelado. Si Boosters aún no está disponible, Matrix y una posición intermedia pueden ayudar, pero no prometen que llegues a cubrir ambos frentes.',
        ],
      },
      {
        title: 'Self-Destruct crea espacio además de bajas',
        paragraphs: [
          'Self-Destruct obliga a los enemigos expuestos a buscar cobertura, pero una pared cercana puede resolverla sin que abandonen la zona que necesitas. Elige la trayectoria según dónde tendrán que moverse y qué podrá hacer tu equipo durante ese movimiento. Una explosión vistosa detrás del rival no sirve si todos se cubren y mantienen el punto.',
          'Planifica también dónde quedará la piloto y desde dónde llamarás al mech. Usar bomba al perder armadura puede darte otra oportunidad, pero te deja vulnerable fuera de él. En overtime, comprueba quién seguirá tocando: ni la explosión ni una llamada de mech interrumpida garantizan mantener el objetivo.',
        ],
      },
      {
        title: 'Expulsar a un DPS sin regalar el mech en Gibraltar',
        paragraphs: [
          'Imagina que un Soldier controla una plataforma y está frenando el payload. Puedes subir con Boosters, tapar parte de sus disparos y obligarlo a retirarse. Si cae hacia su equipo, no hace falta bajar detrás: conservar la plataforma abre un ángulo a tus DPS y le impide volver gratis.',
          'Antes de perseguir, mira a tu backline. Si el dive enemigo empieza mientras has gastado Boosters, quedarte en el borde puede dejarte sin salida y fuera de rango para ayudar. En la VOD, compara lo que ganaste al expulsar al Soldier con lo que arriesgaste después. Muchas pérdidas de mech empiezan con una entrada útil que se alarga un duelo de más.',
        ],
      },
    ],
    vodQuestions: ['¿Qué posición quería disputar con Boosters?', '¿Perseguí después de haber ganado ya el espacio?', '¿Qué habilidad importante negó Matrix?', '¿Mi equipo necesitaba dive o peel en esa pelea?', '¿La bomba obligaba a moverse a alguien?'],
    checklist: ['Sé qué high ground debo controlar.', 'Boosters termina junto a cobertura.', 'Guardo Matrix para un recurso concreto.', 'No persigo cuando el objetivo ya cedió espacio.', 'Elijo dive o peel según la condición de victoria.'],
    faqs: [
      { question: '¿Cuándo debo hacer peel con D.Va?', answer: 'Cuando negar el engage rival protege la condición de victoria o deja al atacante sin salida. No vuelvas por cada punto de daño si tu equipo puede sostenerse.' },
      { question: '¿Qué debo negar con Defense Matrix?', answer: 'Prioriza cooldowns y burst decisivos: granadas, Sleep Dart, proyectiles de ultimate y daño concentrado sobre un aliado comprometido.' },
      { question: '¿Tengo que matar al DPS del high ground?', answer: 'No. Obligarle a abandonar el ángulo ya crea espacio. Persíguelo solo si la baja es segura y no abandonas una zona más importante.' },
      { question: '¿Defense Matrix bloquea cualquier ultimate?', answer: 'No. Niega proyectiles que entren en su zona, como disparos de Tactical Visor, pero no rayos como Coalescence ni Earthshatter. Identifica cómo llega el daño antes de gastar toda la carga intentando proteger una amenaza que Matrix no puede parar.' },
    ],
    links: [
      { href: '/heroes/dva', label: 'Guía completa de D.Va' },
      { href: '/counters/dva', label: 'Counters de D.Va' },
      { href: '/team-comps/dva', label: 'Composiciones con D.Va' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/heroes/winston', label: 'Comparar con Winston' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar el destino de Boosters en tu VOD' },
      { href: '/roles/tank', label: 'Decisiones del Tank en 5v5' },
    ],
  },
  {
    ...commonDates,
    slug: 'como-jugar-winston-ranked-overwatch',
    heroSlug: 'winston',
    heroName: 'Winston',
    role: 'tank',
    roleLabel: 'Tank',
    title: 'Cómo jugar Winston en ranked: preparación, salto y burbuja',
    seoTitle: 'Cómo jugar Winston en ranked: dive, salto y burbuja',
    seoDescription: 'Guía de Winston para ranked: cómo preparar un dive, escoger objetivos, usar Barrier Projector y convertir Primal Rage en espacio y bajas.',
    quickAnswer: 'Con Winston, elige un aterrizaje que puedas sostener hasta salir: cobertura cercana, una altura o un borde de la pelea. Entra con vida y con presión aliada hacia ese sector. La burbuja puede bloquear disparos y ciertos recursos, pero no toda la curación; decide qué línea necesitas cortar y cómo escaparás si no llega la baja.',
    intro: [
      'Un salto espectacular no es un buen engage si aterrizas sin apoyo y delante de cinco jugadores. Winston necesita preparar la pelea: reconocer una backline alcanzable, acercarse sin perder armadura y esperar la presión que impide al rival mirarle gratis.',
      'En ranked puedes coordinarlo con señales simples. Un ping al objetivo y una cuenta corta suelen bastar. Lo importante es que tus compañeros sepan qué zona vas a ocupar y cuándo deben mirar allí.',
    ],
    sections: [
      {
        title: 'Acércate antes de gastar Jump Pack',
        paragraphs: [
          'Usa pasillos, payload, esquinas y high ground para recortar distancia. Un salto largo puede anunciar tu entrada y dejar a tus DPS demasiado lejos para seguirla. La distancia no cambia por sí sola el cooldown de Jump Pack. Acercarte antes sirve para elegir mejor el aterrizaje o para entrar caminando y conservar el salto como salida.',
          'Mantén la armadura durante la preparación. Recibir poke hasta media vida y saltar igualmente obliga a gastar burbuja en supervivencia, no en aislar al objetivo.',
        ],
      },
      {
        title: 'Aterriza en una zona que puedas sostener',
        paragraphs: [
          'No apuntes siempre al cuerpo del support. Un borde alto, una esquina detrás de él o una plataforma lateral puede darte daño sin quedar rodeado. Desde ahí obligas a girar la cámara y eliges si bajar o esperar el siguiente salto.',
          'Si Kiriko usa Swift Step o Moira gasta Fade, comprueba a dónde ha ido antes de perseguir. Cambiar a otro objetivo que siga a tu alcance puede mantener la presión sin gastar una segunda entrada. Forzar un escape solo ayuda si el rival pierde una posición o el equipo puede aprovecharlo; si todos siguen disparando desde el mismo sitio, todavía tienes trabajo por hacer.',
        ],
      },
      {
        title: 'Coloca la burbuja entre el objetivo y la amenaza',
        paragraphs: [
          'Si una Ana rival cura al objetivo al que estás presionando, colocar barrera entre ambos puede cortar sus disparos y un Sleep que venga por esa línea. No bloquea todos los tipos de curación ni aísla automáticamente a nadie: los enemigos pueden cruzarla o buscar otro ángulo. Mira qué recurso quieres negar y dónde deben quedar los rivales respecto al borde.',
          'Juega alrededor del borde para interponer la barrera entre tú y el atacante. Seguir a un objetivo fuera de ella pierde esa protección y puede dejarte expuesto antes de recuperar Jump Pack. Si la burbuja está a punto de romperse, prepara la salida; no esperes a que desaparezca para empezar a buscar un aterrizaje seguro.',
        ],
      },
      {
        title: 'Primal Rage debe tener un destino',
        paragraphs: [
          'Antes de activar Primal, decide si necesitas sobrevivir, separar a un Support o sacar al rival del objetivo. Empujar a un enemigo hacia su equipo puede salvarlo del daño de tus DPS. Dar golpes sin dirección también puede dejar libre el punto que necesitabas defender.',
          'Una pared cercana permite mantener a un objetivo en una zona más controlable. En terreno abierto, desplazar al Tank para que tus compañeros crucen puede ser más útil que intentar un combo difícil. Revisa dónde termina el enemigo y quién ocupa el objetivo al acabar Primal: sobrevivir durante la ultimate no demuestra por sí solo que la hayas aprovechado.',
        ],
      },
      {
        title: 'Preparar la salida antes de saltar en Numbani',
        paragraphs: [
          'En el primer ataque, imagina que quieres disputar una plataforma ocupada por un DPS y un Support. Si tus compañeros todavía cruzan por abajo, aterrizar en el centro de ambos enemigos los deja pelear contigo sin otra presión. Esperar en cobertura a que el DPS aliado tenga ángulo, o subir a un borde desde el que puedas retirarte, ofrece una entrada menos arriesgada.',
          'Cuando uses burbuja, identifica una zona a la que puedas volver con Jump Pack. Si el Support escapa y te quedas persiguiendo bajo otra línea de tiro, el dive se alarga sin una baja probable. En la VOD, pausa antes del salto y después del escape rival: comprueba si tu salida seguía disponible o si la perdiste al cambiar de objetivo.',
        ],
      },
    ],
    vodQuestions: ['¿Podía acercarme sin usar Jump Pack?', '¿Aterrizaba en cobertura o en medio del equipo?', '¿Qué línea cortó mi burbuja?', '¿Perseguí a un objetivo con movilidad disponible?', '¿Qué quería conseguir con Primal Rage?'],
    checklist: ['Entro con armadura y una ruta de salida.', 'Marco el sector del dive.', 'Aterrizo cerca de cobertura.', 'Sé qué disparos o cooldowns debe bloquear la burbuja.', 'Primal tiene un objetivo concreto.'],
    faqs: [
      { question: '¿Sobre quién debe saltar Winston?', answer: 'Sobre objetivos alcanzables que pierdan apoyo dentro de la burbuja. A veces conviene ocupar el high ground antes que aterrizar directamente encima de un support.' },
      { question: '¿Cuándo coloco la burbuja?', answer: 'Cuando bloquea una línea concreta, como disparos de Ana o Sleep, o te permite sostener el aterrizaje hasta salir. No corta toda la curación. Colocarla durante una aproximación sin presión puede dejarte sin ella donde realmente la necesitas.' },
      { question: '¿Qué hago si el rival tiene counters?', answer: 'Prueba entradas más cortas y disputa posiciones sin perseguir el remate. Si sigues perdiendo vida y burbuja antes de que el equipo pueda aprovechar tu presión, cambia la ruta o valora otro Tank. Absorber atención mientras mueres no es automáticamente un buen intercambio.' },
      { question: '¿Tengo que conseguir una baja en cada dive?', answer: 'No. Expulsar a un DPS de una altura o interrumpir una línea de curación puede permitir que el equipo avance. Comprueba el resultado: si nadie gana espacio y sales sin recursos, el dive ha costado más de lo que ha aportado.' },
    ],
    links: [
      { href: '/heroes/winston', label: 'Guía completa de Winston' },
      { href: '/counters/winston', label: 'Counters de Winston' },
      { href: '/team-comps/winston', label: 'Composiciones con Winston' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo jugar dive' },
      { href: '/heroes/dva', label: 'Comparar movilidad y peel con D.Va' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar un dive en tu VOD' },
      { href: '/roles/tank', label: 'Espacio y responsabilidad del Tank' },
    ],
  },
]

export function getRankedHeroGuide(slug: string) {
  return guides.find(guide => guide.slug === slug) ?? null
}

export const rankedHeroGuides = guides
