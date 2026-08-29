export type EvergreenFaq = {
  question: string
  answer: string
}

export type EvergreenLink = {
  href: string
  label: string
}

export type EvergreenSection = {
  title: string
  body: string[]
  bullets?: string[]
}

export type EvergreenGuide = {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  h1: string
  kicker: string
  updatedAt: string
  publishedAtIso: string
  modifiedAtIso: string
  quickAnswer: string
  intro: string[]
  sections: EvergreenSection[]
  checklist: string[]
  faqs: EvergreenFaq[]
  links: EvergreenLink[]
}

export const evergreenGuides: Record<string, EvergreenGuide> = {
  'como-subir-de-rango-overwatch': {
    slug: 'como-subir-de-rango-overwatch',
    title: 'Cómo subir de rango en Overwatch',
    seoTitle: 'Cómo subir de rango en Overwatch: ranked, errores y método real',
    seoDescription: 'Guía para subir de rango en Overwatch sin depender solo del aim: prioridades por rol, VOD, counters, tilt, composiciones y rutina semanal.',
    h1: 'Cómo subir de rango en Overwatch sin jugar en piloto automático',
    kicker: 'Ranked, mental y decisiones',
    updatedAt: '29 de agosto de 2026',
    publishedAtIso: '2026-08-29',
    modifiedAtIso: '2026-08-29',
    quickAnswer: 'Para subir de rango necesitas reducir errores repetidos, no ganar una partida perfecta. Elige un rol, limita tu pool, revisa tus primeras muertes, aprende cuándo cambiar de héroe y mide una sola mejora por semana.',
    intro: [
      'Subir en ranked no va de encontrar el pick mágico ni de culpar al matchmaking cada noche. Hay partidas imposibles, claro, pero a largo plazo subes cuando tus errores caros aparecen menos que los del lobby.',
      'La mejora real suele ser poco espectacular: morir una vez menos por mapa, guardar un cooldown defensivo, entrar medio segundo más tarde, no gastar ultimate en una pelea perdida o cambiar de héroe antes de que el matchup te coma.',
      'Esta guía está pensada para jugadores que quieren ordenar su ranked. No promete un salto gratis de rango; te da una forma clara de entrenar, revisar y tomar mejores decisiones partida a partida.',
    ],
    sections: [
      {
        title: 'Empieza por tu rol, no por la tier list',
        body: [
          'Una tier list puede darte contexto, pero no te dice por qué estás perdiendo. Antes de cambiar de main cada semana, decide qué función cumple tu rol. Tank crea espacio y fuerza recursos; DPS convierte presión en kills o ángulos incómodos; Support mantiene vivo el plan del equipo y niega la win condition rival.',
          'Si juegas Tank y entras sin que tu equipo pueda verte, no es problema de healer. Si juegas DPS y solo disparas al tank desde main, no estás creando amenaza real. Si juegas Support y gastas Suzu, Sleep, Lamp o Fade por ansiedad, el rival ya te está controlando antes de iniciar.',
        ],
        bullets: [
          'Tank: revisa si tus engages crean espacio o solo gastan vida.',
          'DPS: revisa si tus ángulos obligan al rival a girarse.',
          'Support: revisa si tus cooldowns niegan algo importante o solo apagan fuegos.',
        ],
      },
      {
        title: 'Limita tu pool de héroes',
        body: [
          'Para subir, necesitas suficientes respuestas sin convertir cada derrota en ruleta. Un pool sano suele tener dos picks cómodos y una respuesta de emergencia. Por ejemplo: Ana y Kiriko en Support, con Moira si el mapa o el dive te están hundiendo. Genji y Tracer en DPS, con Cassidy si necesitas controlar flankers.',
          'Cambiar de héroe no es rendirse. Cambiar sin entender por qué, sí. Si pierdes porque tu posición es mala, cambiar de pick solo maquilla el problema. Si pierdes porque el rival te niega todas las ventanas y tu kit no responde, cambiar puede ser la decisión correcta.',
        ],
      },
      {
        title: 'La primera muerte explica más que el marcador',
        body: [
          'El marcador final mezcla demasiadas cosas: damage, healing, kills basura, ultimates tiradas tarde y peleas ya decididas. La primera muerte de cada teamfight suele ser más limpia. Pregunta qué pasó antes: estabas sin cobertura, entraste antes de tiempo, gastaste movilidad para hacer daño, no respetaste una amenaza o perseguiste una kill que no tocaba.',
          'Si en tres peleas perdidas mueres primero por la misma razón, ahí está tu próxima mejora. No hace falta revisar la partida entera. Con diez minutos bien mirados tienes material de sobra para una semana de ranked.',
        ],
      },
      {
        title: 'Aprende a cerrar peleas ganadas',
        body: [
          'Muchos jugadores no suben porque ganan una ventaja y luego la regalan. Haces una kill, persigues otra, te separas, gastas ultimate tarde y el rival te da la vuelta. Cuando ganas la primera baja, tu trabajo cambia: ya no necesitas una jugada heroica, necesitas cerrar espacio, negar resets y sobrevivir.',
          'También pasa al revés. Si tu equipo pierde dos jugadores, gastar ultimate por orgullo casi siempre retrasa la siguiente pelea. Resetear rápido es aburrido, pero sube más rango que intentar salvar una pelea muerta.',
        ],
      },
      {
        title: 'Rutina semanal sencilla',
        body: [
          'No intentes arreglarlo todo el mismo día. Una semana puede ser solo posicionamiento; otra, cooldowns; otra, ultimates; otra, cambios de héroe. Si mezclas cinco objetivos, no sabrás qué funcionó.',
          'La rutina buena es corta: calienta, juega pocas partidas con intención, revisa dos peleas y escribe una frase. Algo tan simple como "esta semana no uso dash para entrar si no tengo salida" cambia más partidas que ver diez guías y jugar igual.',
        ],
      },
    ],
    checklist: [
      'Tengo un pool limitado y sé cuándo usar cada pick.',
      'Reviso primeras muertes, no solo estadísticas finales.',
      'No gasto ultimate en peleas perdidas.',
      'Cambio de héroe por matchup, no por tilt.',
      'Juego una prioridad de mejora por semana.',
      'Uso una VOD corta para comprobar si el error se repite.',
    ],
    faqs: [
      { question: '¿Cuál es la forma más rápida de subir de rango?', answer: 'Reducir tus muertes evitables. Si sobrevives más peleas con cooldowns disponibles, tendrás más oportunidades de ganar sin depender de una jugada perfecta.' },
      { question: '¿Debería jugar el héroe meta aunque no me guste?', answer: 'Solo si entiendes por qué funciona y puedes ejecutarlo. En ranked suele rendir más un pick fuerte que dominas que un pick meta jugado sin timing.' },
      { question: '¿Cuántas partidas debería revisar?', answer: 'Con una o dos VODs por semana basta. Mira tres peleas perdidas y busca patrones repetidos: primera muerte, cooldowns, ultimates o posición.' },
      { question: '¿Cuándo cambio de héroe?', answer: 'Cambia cuando tu plan ya no puede ejecutarse por mapa, composición o matchup. Si el problema es posicionamiento, primero corrige eso.' },
    ],
    links: [
      { href: '/guides/como-mejorar-en-overwatch', label: 'Cómo mejorar en Overwatch' },
      { href: '/guides/review-vod-overwatch-espanol', label: 'Revisar una VOD' },
      { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar de héroe' },
      { href: '/counters', label: 'Counters por héroe' },
      { href: '/team-comps', label: 'Composiciones' },
      { href: '/experts', label: 'Pedir review a un experto' },
    ],
  },
  'mejores-heroes-overwatch': {
    slug: 'mejores-heroes-overwatch',
    title: 'Mejores héroes de Overwatch',
    seoTitle: 'Mejores héroes de Overwatch para ranked: picks seguros por rol',
    seoDescription: 'Cómo elegir los mejores héroes de Overwatch para ranked sin depender de una tier list: tanks, DPS, supports, mapas, counters y nivel real.',
    h1: 'Mejores héroes de Overwatch para ranked: cómo elegir sin perseguir la tier list',
    kicker: 'Picks fuertes, comfort y contexto',
    updatedAt: '29 de agosto de 2026',
    publishedAtIso: '2026-08-29',
    modifiedAtIso: '2026-08-29',
    quickAnswer: 'El mejor héroe no es siempre el más alto de una tier list. Para ranked, elige un pick que puedas jugar bien, que encaje con el mapa y que tenga una respuesta clara si el rival te counterea.',
    intro: [
      'La búsqueda de "mejores héroes de Overwatch" suele esconder una pregunta más práctica: qué puedo jugar hoy para ganar más ranked sin sentir que voy vendido desde el draft.',
      'La respuesta cambia con parches, mapas y composiciones, así que esta página no intenta congelar una tier list falsa. La idea es darte criterios para elegir picks estables y entender cuándo un héroe es bueno para ti, no solo bueno en teoría.',
      'Si hay cambios fuertes de temporada, actualizaremos las páginas de héroes concretos. Esta guía funciona como base evergreen para decidir mejor antes de entrar a cola.',
    ],
    sections: [
      {
        title: 'Qué hace bueno a un héroe en ranked',
        body: [
          'Un héroe fuerte para ranked necesita tres cosas: impacto claro, margen de error razonable y capacidad de adaptarse al lobby. Un pick puede ser buenísimo en competitivo coordinado y sentirse horrible en solo queue si depende de timing perfecto o recursos que nadie te va a dar.',
          'Por eso conviene valorar tu comfort. Si aciertas poco con Widowmaker, la teoría no te salva. Si eres consistente con Soldier, Cassidy, Ana, Kiriko, D.Va o Reinhardt, puedes ganar más simplemente tomando mejores decisiones con un kit que ya controlas.',
        ],
      },
      {
        title: 'Tank: espacio antes que ego',
        body: [
          'Los tanks buenos para ranked son los que crean espacio entendible. D.Va puede pelear high ground y proteger backline; Winston fuerza supports y abre dive; Reinhardt simplifica brawl cuando el mapa tiene esquinas; Zarya castiga equipos que disparan burbujas sin pensar.',
          'D.Mon entra en esta conversación como Tank de melee y barrera frontal: puede ser muy atractiva para jugadores que quieren presionar de cerca, pero necesita aprender sus ventanas antes de asumir que gana todos los duelos.',
        ],
        bullets: [
          'Elige D.Va si el mapa tiene altura y necesitas peel.',
          'Elige Winston si tu equipo puede seguir una entrada dive.',
          'Elige Reinhardt si hay esquinas y el rival no puede kitearte gratis.',
          'Elige Zarya si puedes castigar daño mal dirigido y jugar tempo de burbujas.',
        ],
      },
      {
        title: 'DPS: presión que obliga a responder',
        body: [
          'Un DPS bueno no solo hace damage. Obliga al rival a girarse, gastar cooldowns o ceder espacio. Tracer y Genji funcionan cuando hay timing; Cassidy y Ashe dan control de rango medio o largo; Shion castiga laterales y enemigos tocados; Sojourn premia buena gestión de rail.',
          'Si no sabes qué jugar, escoge un DPS que responda al problema real. Contra flankers, control y rango medio. Contra poke, movilidad o dive coordinado. Contra supports libres, presión lateral con salida.',
        ],
      },
      {
        title: 'Support: sobrevivir y negar la jugada clave',
        body: [
          'En Support, el mejor pick suele ser el que te permite vivir y negar la win condition rival. Ana gana peleas con Sleep, anti-nade y Nano. Kiriko salva errores con Suzu y movilidad. Mercy potencia picks fuertes, pero sufre si el equipo no aprovecha el pocket. Brigitte puede ser la diferencia contra dive.',
          'Curar mucho no siempre significa jugar bien. Si el rival gana por una ultimate, un dive o un cooldown concreto, tu valor está en responder a eso, no en inflar números al final.',
        ],
      },
      {
        title: 'Cómo usar esta guía sin autoengañarte',
        body: [
          'Hazte tres preguntas antes de cambiar: qué me está matando, qué necesita mi equipo y qué héroe puedo ejecutar ahora mismo. Si las tres respuestas apuntan al mismo pick, adelante. Si solo cambias porque viste una tier list, probablemente repetirás el mismo error con otro personaje.',
          'Las mejores páginas para complementar esta son counters, composiciones y guías por héroe. Ahí puedes bajar de "qué es bueno" a "cómo se juega este matchup".',
        ],
      },
    ],
    checklist: [
      'El pick encaja con el mapa.',
      'Tengo una win condition clara.',
      'Sé qué cooldown rival quiero forzar.',
      'Puedo sobrevivir si el rival me counterea.',
      'Mi equipo puede seguir mi ritmo.',
      'No cambio solo por tilt después de una pelea mala.',
    ],
    faqs: [
      { question: '¿Cuál es el mejor héroe de Overwatch?', answer: 'No hay uno universal. Para ranked, el mejor héroe es el que combina impacto, mapa favorable, matchup jugable y comfort personal.' },
      { question: '¿Sirven las tier lists?', answer: 'Sirven como contexto, pero no reemplazan la decisión. Una tier list no sabe tu rango, tu mapa, tu aim ni si tu equipo puede seguir un dive.' },
      { question: '¿Qué rol tiene más impacto para subir?', answer: 'Todos pueden cargar partidas de formas distintas. Tank marca espacio, DPS convierte presión y Support niega jugadas clave. Lo importante es entender tu función.' },
      { question: '¿D.Mon será buen pick para ranked?', answer: 'Tiene pinta de Tank con mucho potencial si aprendes sus ventanas de melee, barrera y movilidad. Aun así, conviene tratarla como pick en aprendizaje hasta estabilizar matchups.' },
    ],
    links: [
      { href: '/heroes', label: 'Todos los héroes' },
      { href: '/heroes/dmon', label: 'D.Mon' },
      { href: '/heroes/shion', label: 'Shion' },
      { href: '/roles/tank', label: 'Tank' },
      { href: '/roles/dps', label: 'DPS' },
      { href: '/roles/support', label: 'Support' },
      { href: '/counters', label: 'Counters' },
      { href: '/guides/como-subir-de-rango-overwatch', label: 'Subir de rango' },
    ],
  },
  'counters-overwatch-guia-completa': {
    slug: 'counters-overwatch-guia-completa',
    title: 'Counters de Overwatch',
    seoTitle: 'Counters de Overwatch: cómo elegir picks y jugar matchups',
    seoDescription: 'Guía completa de counters en Overwatch: cuándo cambiar, cómo jugar matchups difíciles, counters por rol y errores comunes en ranked.',
    h1: 'Counters de Overwatch: cómo cambiar sin tirar tu partida',
    kicker: 'Matchups, picks y adaptación',
    updatedAt: '29 de agosto de 2026',
    publishedAtIso: '2026-08-29',
    modifiedAtIso: '2026-08-29',
    quickAnswer: 'Un counter sirve si cambia la pelea que estás perdiendo. Antes de swapear, identifica si el problema es el héroe rival, tu posición, tus cooldowns o que tu equipo no está jugando la misma win condition.',
    intro: [
      'Counterear en Overwatch no significa abrir una tabla y obedecerla sin pensar. Un pick puede ser buen counter en papel y no resolver nada si lo juegas en el mapa equivocado o sin entender la ventana que quieres castigar.',
      'La idea buena es simple: detectar qué te está ganando, elegir una respuesta y jugar alrededor de esa respuesta. Si el rival juega Tracer, no basta con escoger Cassidy; tienes que guardar control, proteger la backline y no regalar tu posición.',
      'Esta guía funciona como base para usar la página interactiva de counters con más criterio.',
    ],
    sections: [
      {
        title: 'Counter de héroe vs counter de plan',
        body: [
          'A veces pierdes contra un héroe. Otras veces pierdes contra un plan. Si Winston entra cada pelea y tu backline cae, puedes responder con Brigitte, Reaper, Bastion o D.Va según rol. Pero si el problema es que nadie mira el dive, cambiar un pick no basta.',
          'Pregunta qué gana el rival: espacio, burst, poke, flank, sustain o ultimate. Esa respuesta define mejor el cambio que el nombre del héroe enemigo.',
        ],
      },
      {
        title: 'Cuándo cambiar de héroe',
        body: [
          'Cambia cuando tu kit no puede ejecutar su función. Si juegas Pharah contra doble hitscan con buen aim y sin cobertura vertical, estás forzando demasiado. Si juegas Ana contra dive constante y nadie puede darte peel, Kiriko, Moira o Brigitte pueden estabilizar.',
          'No cambies después de una sola muerte rara. Revisa dos o tres peleas. Si el mismo problema aparece de nuevo, entonces el swap tiene sentido.',
        ],
        bullets: [
          'Cambia si no puedes tomar espacio, curar o hacer daño sin morir.',
          'Cambia si tu ultimate no va a resolver la siguiente pelea.',
          'Cambia si el mapa niega tu plan principal.',
          'No cambies si el problema era gastar mal un cooldown.',
        ],
      },
      {
        title: 'Counters por rol',
        body: [
          'Como Tank, counterear suele ir de negar espacio o cortar la salida rival. D.Va puede contestar high ground, Zarya castiga daño mal dirigido, Reinhardt fuerza brawl en mapas cerrados y Winston rompe backlines estáticas.',
          'Como DPS, necesitas elegir entre control, burst, poke o flank. Cassidy controla movilidad, Tracer fuerza supports, Genji castiga cooldowns gastados y hitscans presionan héroes aéreos.',
          'Como Support, counterear no siempre es matar. Ana niega curación, Kiriko limpia efectos, Brigitte protege la backline y Lucio cambia el ritmo de una pelea.',
        ],
      },
      {
        title: 'Errores típicos al buscar counters',
        body: [
          'El error más común es pensar que el counter juega solo. Si cambias a Reaper contra Winston pero te quedas lejos, no estás countereando nada. Si cambias a Sombra contra Doomfist pero hackeas tarde, el rival ya hizo su trabajo.',
          'Otro error es abandonar una ultimate fuerte por tilt. Si tienes una ultimate lista que puede ganar la siguiente pelea, piensa antes de cambiar. A veces lo correcto es usarla con plan y swapear después.',
        ],
      },
      {
        title: 'Cómo entrenar matchups',
        body: [
          'Escoge un matchup que se repita mucho en tus partidas. Por ejemplo: Zarya contra D.Va, Genji contra Ana, Tracer contra Cassidy o D.Mon contra tanks de brawl. Mira tres peleas y apunta cuál es la ventana ganadora.',
          'Cuando sabes la ventana, el counter deja de ser una lista y se convierte en una decisión jugable: espero Sleep, fuerzo burbuja, corto high ground, guardo Suzu, rompo barrera o kiteo la ultimate.',
        ],
      },
    ],
    checklist: [
      'Sé qué problema exacto quiero resolver.',
      'El mapa permite jugar mi counter.',
      'No abandono una ultimate ganadora sin pensarlo.',
      'Guardo el cooldown que hace que el counter funcione.',
      'Comunico la amenaza en vez de perseguirla solo.',
      'Reviso si el swap mejoró la pelea siguiente.',
    ],
    faqs: [
      { question: '¿Qué es un counter en Overwatch?', answer: 'Es un pick, posición o plan que reduce mucho el valor de un héroe rival. No siempre implica matar a ese héroe; a veces basta con negar su entrada.' },
      { question: '¿Cuándo debo cambiar de héroe?', answer: 'Cuando tu héroe ya no puede cumplir su función por matchup, mapa o composición. Si el error es de posición o cooldowns, primero corrige eso.' },
      { question: '¿Los counters ganan partidas solos?', answer: 'No. Ayudan, pero necesitan ejecución. Un counter mal jugado puede aportar menos que tu main bien jugado.' },
      { question: '¿Dónde veo counters concretos?', answer: 'Usa la página de counters por héroe para bajar esta teoría a matchups concretos como Zarya, Tracer, Genji, Ana, Shion o D.Mon.' },
    ],
    links: [
      { href: '/counters', label: 'Página interactiva de counters' },
      { href: '/counters/zarya', label: 'Counters de Zarya' },
      { href: '/counters/tracer', label: 'Counters de Tracer' },
      { href: '/counters/genji', label: 'Counters de Genji' },
      { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar' },
      { href: '/guides/como-subir-de-rango-overwatch', label: 'Subir de rango' },
    ],
  },
  'composiciones-overwatch-5v5-6v6': {
    slug: 'composiciones-overwatch-5v5-6v6',
    title: 'Composiciones de Overwatch 5v5 y 6v6',
    seoTitle: 'Composiciones de Overwatch: dive, poke, brawl, 5v5 y 6v6',
    seoDescription: 'Guía de composiciones de Overwatch para ranked: dive, poke, brawl, rush, anti-dive, flyers, 5v5, 6v6 y cómo elegir según mapa.',
    h1: 'Composiciones de Overwatch: cómo elegir entre dive, poke, brawl, 5v5 y 6v6',
    kicker: 'Team comps sin hablar raro',
    updatedAt: '29 de agosto de 2026',
    publishedAtIso: '2026-08-29',
    modifiedAtIso: '2026-08-29',
    quickAnswer: 'Una composición buena no es una lista perfecta de héroes; es un plan compartido. Dive entra junto, poke gana espacio con ángulos, brawl pelea cerca y anti-dive protege la backline.',
    intro: [
      'En ranked casi nadie juega una composición perfecta, y aún así entender los estilos cambia muchísimo la partida. Si todos saben si quieren divear, pokear o brawlear, las peleas dejan de ser cinco personas improvisando a la vez.',
      'Esta guía traduce las comps a decisiones simples: dónde jugar, cuándo entrar, qué cooldown esperar y qué héroe cambiar si el plan no funciona.',
      'También conecta con la página interactiva de composiciones, donde puedes seleccionar un héroe y ver lineups posibles para 5v5 y 6v6.',
    ],
    sections: [
      {
        title: 'Dive',
        body: [
          'Dive busca entrar rápido sobre un objetivo vulnerable. Winston, D.Va, Genji, Tracer, Sombra, Ana, Kiriko o Lucio pueden encajar según el mapa. La clave no es saltar todos a la vez porque sí; es forzar un cooldown defensivo y convertir esa ventana en kill.',
          'Dive falla cuando entra demasiado pronto, cuando cada jugador ataca un objetivo distinto o cuando nadie tiene salida. Si tu dive no mata, al menos debe forzar recursos y volver vivo.',
        ],
      },
      {
        title: 'Poke',
        body: [
          'Poke gana con distancia, sightlines y daño antes de que empiece el brawl. Sigma, Ashe, Widowmaker, Hanzo, Sojourn, Zenyatta, Baptiste o Ana pueden crear mucha presión si el mapa tiene líneas largas.',
          'El error típico es quedarse pokeando cuando el rival ya cruzó. Si una comp de brawl llega encima de ti con recursos, tu ventaja desaparece. Poke necesita rotar, kitear y no regalar ángulos gratis.',
        ],
      },
      {
        title: 'Brawl y rush',
        body: [
          'Brawl quiere pelear cerca. Reinhardt, Ramattra, Junker Queen, Mei, Reaper, Cassidy, Lucio, Kiriko o Moira suelen encajar porque pueden aguantar y cerrar distancia. Rush es la versión más directa: acelerar, entrar y decidir rápido.',
          'Estas comps funcionan mejor en mapas con esquinas, chokes y espacios donde el rival no pueda kitear eternamente. Si juegas brawl en una calle larguísima contra poke, vas a gastar vida antes de tocar a nadie.',
        ],
      },
      {
        title: 'Anti-dive y peel',
        body: [
          'Anti-dive no siempre busca iniciar. Busca que el rival falle su entrada. Brigitte, Cassidy, D.Va, Torbjorn, Ana o Kiriko pueden proteger una backline y castigar a quien entra sin salida.',
          'La paciencia es parte del plan. Si persigues al flanker demasiado lejos, dejas de hacer anti-dive y regalas justo el caos que el rival quería crear.',
        ],
      },
      {
        title: '5v5 frente a 6v6',
        body: [
          'En 5v5, el Tank concentra mucho peso: si entra mal, el equipo se queda sin frente. En 6v6 hay más peel, más recursos y más margen para jugar doble amenaza, pero también cuesta más cerrar una kill si no se coordinan los cooldowns.',
          'La lectura práctica es esta: en 5v5 necesitas elegir muy bien la ventana principal; en 6v6 necesitas contar más recursos antes de comprometerte. No es solo añadir otro Tank, es cambiar el tempo de la pelea.',
        ],
      },
    ],
    checklist: [
      'Nuestro equipo sabe si quiere entrar, pokear o aguantar.',
      'El mapa favorece el rango al que queremos pelear.',
      'Tenemos una respuesta si nos divean.',
      'Los supports pueden jugar la distancia que pide la comp.',
      'No estamos mezclando cinco planes incompatibles.',
      'Sabemos que ultimate abre o cierra la siguiente pelea.',
    ],
    faqs: [
      { question: '¿Cuál es la mejor composición de Overwatch?', answer: 'Depende del mapa, del rango y de los héroes que el equipo sepa jugar. Dive, poke y brawl pueden funcionar si todos entienden la misma win condition.' },
      { question: '¿Qué significa dive?', answer: 'Entrar rápido sobre un objetivo concreto, forzar cooldowns y salir o rematar antes de que el rival estabilice.' },
      { question: '¿Qué cambia en 6v6?', answer: 'Hay más recursos defensivos y más peel. Las ventanas individuales son menos gratis, pero se pueden crear planes con dos tanks y más control de espacio.' },
      { question: '¿Debo copiar composiciones profesionales?', answer: 'Puedes usarlas como referencia, pero en ranked importa más ejecutar un plan simple que copiar cinco picks sin comunicación.' },
    ],
    links: [
      { href: '/team-comps', label: 'Explorador de composiciones' },
      { href: '/team-comps/dmon', label: 'Comps con D.Mon' },
      { href: '/team-comps/genji', label: 'Comps con Genji' },
      { href: '/team-comps/ana', label: 'Comps con Ana' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Dive, poke o brawl' },
      { href: '/guides/counters-overwatch-guia-completa', label: 'Counters' },
    ],
  },
  'review-vod-overwatch-espanol': {
    slug: 'review-vod-overwatch-espanol',
    title: 'Review de VOD en Overwatch',
    seoTitle: 'Review de VOD en Overwatch: cómo analizar tus partidas en español',
    seoDescription: 'Aprende a hacer review de VOD en Overwatch: primeras muertes, cooldowns, posicionamiento, ultimates, cambios de héroe y checklist por rol.',
    h1: 'Review de VOD en Overwatch: cómo analizar tus partidas sin perderte',
    kicker: 'Método práctico en español',
    updatedAt: '29 de agosto de 2026',
    publishedAtIso: '2026-08-29',
    modifiedAtIso: '2026-08-29',
    quickAnswer: 'Una buena review de VOD no revisa toda la partida al detalle. Mira tres peleas perdidas, encuentra el patrón que se repite y convierte ese patrón en una regla concreta para tus próximas ranked.',
    intro: [
      'Revisar una VOD puede sonar pesado, pero no tiene que ser una clase de dos horas. La mayoría de mejoras salen de momentos muy concretos: primera muerte, cooldown mal gastado, mala rotación, ultimate tarde o un cambio de héroe que llegó demasiado tarde.',
      'El objetivo no es demostrar que jugaste mal. Es encontrar una acción que puedas repetir mejor. Si sales de la review con diez errores, probablemente no vas a corregir ninguno. Si sales con una regla simple, tienes algo que entrenar.',
      'Esta página te da un método para revisar tus partidas solo o preparar una VOD para que un experto la analice.',
    ],
    sections: [
      {
        title: 'No empieces por la partida entera',
        body: [
          'Elige una derrota cerrada, no una stompeada absurda. Salta a tres peleas perdidas y mira los veinte segundos anteriores a la primera muerte. Ahí suele estar la información buena: posición, cooldowns, línea de visión, timing y objetivo.',
          'Si intentas revisar cada segundo, te vas a cansar antes de llegar a una conclusión. Una review útil es pequeña y accionable.',
        ],
      },
      {
        title: 'Primera muerte',
        body: [
          'La primera muerte importa porque rompe el plan de la pelea. Pregunta si era evitable. A veces mueres porque el rival acierta una jugada buena; otras, porque estabas sin cobertura, gastaste movilidad hacia delante o ignoraste una amenaza que ya habías visto.',
          'Marca la causa con una frase corta: "entré antes que mi Tank", "usé Recall tarde", "gasté Suzu sin anti-nade", "me quedé curando desde main". Esa frase es más valiosa que una lista larga de culpas.',
        ],
      },
      {
        title: 'Cooldowns',
        body: [
          'Cada cooldown importante debe tener motivo. Sleep Dart, Suzu, Lamp, Defense Matrix, burbujas, Dash, Recall, Power Barrier o Fade cambian peleas. Si los gastas porque sí, el rival decide cuándo pelear.',
          'Durante la review, clasifica cada uso como bueno, tarde, pronto o innecesario. Si muchos caen en pronto, tu mejora será esperar. Si muchos caen en tarde, tu mejora será leer antes la amenaza.',
        ],
      },
      {
        title: 'Ultimates',
        body: [
          'Una ultimate no es buena por matar mucho; es buena si gana una pelea que importaba o niega la win condition rival. Revisa si la usaste cuando tu equipo podía seguir, si el rival tenía respuestas y si la pelea ya estaba ganada o perdida.',
          'Muchos rangos se suben simplemente dejando de tirar ultimates en peleas muertas. Resetear duele menos que regalar treinta segundos de carga.',
        ],
      },
      {
        title: 'Qué enviar a un experto',
        body: [
          'Si vas a pedir una review, manda contexto. Di tu rol, rango, héroe principal, mapa y qué quieres mejorar. No hace falta esconder errores: cuanto más claro sea el problema, más útil será el feedback.',
          'Una buena petición sería: "Soy support en Platino, juego Ana/Kiriko y muero mucho contra dive. Quiero saber si es posicionamiento, cooldowns o mal pick". Eso permite al experto ir directo al patrón.',
        ],
      },
    ],
    checklist: [
      'Elijo una derrota cerrada y reciente.',
      'Miro tres peleas perdidas.',
      'Anoto la primera muerte y su causa.',
      'Clasifico cooldowns importantes.',
      'Reviso si mis ultimates cambiaron peleas reales.',
      'Salgo con una sola regla para entrenar.',
    ],
    faqs: [
      { question: '¿Cuánto dura una buena review de VOD?', answer: 'Para empezar, 15 o 20 minutos bastan. Lo importante es encontrar un patrón repetido, no revisar toda la partida como si fuera una final.' },
      { question: '¿Qué partida debo revisar?', answer: 'Una derrota ajustada donde sentiste que podías haber hecho más. Las stompeadas extremas suelen enseñar menos al principio.' },
      { question: '¿Puedo revisar mis propias partidas?', answer: 'Sí. Mira primeras muertes, cooldowns y ultimates. Un experto ayuda cuando no ves el patrón o necesitas prioridad clara.' },
      { question: '¿Qué pongo al pedir una review?', answer: 'Rol, rango, héroes, mapa, código de repetición y una pregunta concreta. Cuanto más específica sea la duda, mejor será el feedback.' },
    ],
    links: [
      { href: '/guides/como-mejorar-en-overwatch', label: 'Método de mejora' },
      { href: '/guides/como-subir-de-rango-overwatch', label: 'Subir de rango' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Revisar cooldowns' },
      { href: '/guides/como-usar-ultimates-overwatch', label: 'Usar ultimates' },
      { href: '/experts', label: 'Ver expertos' },
    ],
  },
}

export const evergreenGuideList = [
  evergreenGuides['como-subir-de-rango-overwatch'],
  evergreenGuides['mejores-heroes-overwatch'],
  evergreenGuides['counters-overwatch-guia-completa'],
  evergreenGuides['composiciones-overwatch-5v5-6v6'],
  evergreenGuides['review-vod-overwatch-espanol'],
]
