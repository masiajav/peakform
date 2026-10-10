export type EvergreenFaq = { question: string; answer: string }
export type EvergreenLink = { href: string; label: string }
export type EvergreenSection = { title: string; body: string[]; bullets?: string[] }
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
  'como-mejorar-en-overwatch': {
    slug: 'como-mejorar-en-overwatch', title: 'Cómo mejorar en Overwatch',
    seoTitle: 'Cómo mejorar en Overwatch: posición, cooldowns y práctica',
    seoDescription: 'Detecta el error que repites y aprende a corregirlo: ejemplos por rol, revisión de cooldowns y una rutina sencilla para practicar en tus partidas.',
    h1: 'Cómo mejorar en Overwatch: detecta qué te hace perder peleas', kicker: 'Decisiones y práctica',
    publishedAtIso: '2026-06-01', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'Empieza por dos peleas de una repetición reciente. Mira dónde estabas, qué habilidades habías gastado y qué podía hacer tu equipo cuando entraste. Elige un error que puedas corregir y comprueba en otra partida si lo has repetido; el marcador final no explica todo eso.',
    intro: [
      'Puedes fallar un disparo y haber tomado una buena decisión. También puedes conseguir una baja después de entrar solo y dejar al equipo sin opciones. Para mejorar necesitas separar esas dos cosas, no juzgar cada jugada únicamente por su resultado.',
      'El objetivo es reconocer una situación antes de que termine mal. No hace falta revisar cada segundo ni cambiar de main tras cada derrota.',
    ],
    sections: [
      { title: 'Revisa lo que ocurrió antes de morir', body: [
        'Retrocede hasta antes de salir de la cobertura o gastar movilidad. Si juegas Ana y un Genji te alcanza, no mires solo el Sleep fallado: comprueba si otro aliado podía ayudarte. Cruzar una puerta detrás del Tank puede ser el error anterior al disparo.',
        'La primera muerte es un buen punto de partida, pero no tiene por qué ser tuya ni explicar toda la pelea. Un DPS puede morir después del Tank porque nadie lo vio avanzar por otro ángulo. Busca la decisión que dejó al equipo sin una respuesta razonable.',
      ] },
      { title: 'Distingue un fallo de aim de una mala posición', body: [
        'Ashe falla dos tiros desde una altura, pero tiene cobertura y puede retirarse por detrás: ahí sí merece la pena practicar el disparo. Si permanece en el borde mientras Winston llega, acertar más no resuelve por sí solo la falta de salida.',
        'Haz dos preguntas: ¿podía acertar mejor desde aquí? ¿Debía seguir aquí? Practicar mecánicas ayuda a ejecutar una buena jugada; no convierte cualquier duelo en uno favorable.',
      ] },
      { title: 'Qué mirar según tu rol', body: [
        'Con Tank, pausa antes de avanzar y mira qué espacio vas a ganar. En Gibraltar, expulsar a un tirador de la altura puede permitir que el equipo cruce aunque no lo mates. Saltar detrás de él hasta perder la línea de visión de Ana es otra decisión, con otro riesgo.',
        'Con DPS, comprueba si tu ángulo coincide con la presión del equipo. Tracer puede llegar detrás del rival sin disparar todavía; empezar mientras los aliados vuelven del spawn permite que la defensa se gire hacia ella.',
        'Con Support, no necesitas ver a todo el equipo desde campo abierto. Una esquina desde la que puedas curar al frente y retroceder hacia el otro Support suele ser más útil que una vista perfecta sin cobertura.',
      ] },
      { title: 'Un cooldown acertado también puede estar mal gastado', body: [
        'Dormir a un Tank al que nadie puede seguir presionando puede dejarte sin Sleep cuando aparece el flanker. No significa que nunca debas dormirlo: puede estar usando una ultimate o amenazando una baja inmediata. Importa el motivo y lo que ocurre después.',
        'Anota qué amenaza resolvió el cooldown y cuál quedó sin respuesta. Si Kiriko gasta Suzu en un aliado a salvo, el siguiente anti-nade puede obligar al equipo a retroceder. Si impide una muerte inmediata, guardarlo habría sido peor.',
      ] },
      { title: 'En 6v6, comprueba quién cubre a quién', body: [
        'En un equipo con dos Tanks puede haber uno que avance y otro que proteja o controle un lateral. Esa ayuda no es automática: D.Va puede estar en otra altura cuando Winston salta. Mira su posición antes de contar con Matrix.',
        'Forzar una habilidad defensiva no hace segura la siguiente entrada. El rival puede conservar otro recurso y tu equipo puede necesitar curarse o rotar. Revisa qué ha cambiado, no solo qué botón ha gastado el enemigo.',
      ] },
      { title: 'Convierte la revisión en una tarea pequeña', body: [
        'Una tarea útil describe algo reconocible jugando: "antes de usar Boosters para perseguir, miro si mi backline está siendo atacada". "Jugar mejor D.Va" no te dice cuándo actuar.',
        'Prueba esa regla y vuelve a una repetición. Si ahora te quedas atrás incluso cuando el equipo puede avanzar, ajústala; corregir un error no consiste en irte al extremo contrario. Comprueba si conservas una posición útil, no solo si sobrevives más.',
      ] },
    ],
    checklist: ['Elijo dos peleas comparables.', 'Retrocedo hasta la decisión, no solo hasta la muerte.', 'Compruebo cobertura, salida y aliados.', 'Distingo mecánica de riesgo innecesario.', 'Escribo una tarea reconocible durante la partida.', 'Vuelvo a una repetición para comprobarla.'],
    faqs: [
      { question: '¿Debo mejorar el aim antes del posicionamiento?', answer: 'Puedes trabajar ambos, pero distingue sus errores. Si tienes cobertura y tiempo para disparar, practica la mecánica; si necesitas acertarlo todo para sobrevivir, revisa primero el duelo elegido.' },
      { question: '¿Reviso solo las derrotas?', answer: 'No. Una victoria puede esconder entradas sin apoyo o ultimates mal gastadas. Compara una pelea ganada y una perdida para ver qué decisión cambió, no solo quién acertó más.' },
      { question: '¿Cómo sé si estoy mejorando?', answer: 'Busca si el error elegido aparece menos en situaciones parecidas y si la corrección permite al equipo actuar. Sobrevivir lejos de toda la pelea no es necesariamente mejorar.' },
      { question: '¿Cuándo pido una VOD review?', answer: 'Cuando no identificas por qué falla una situación repetida o qué error corregir primero. Lleva una pregunta y una partida representativa; no hace falta esperar a tocar techo en un rango.' },
    ],
    links: [{ href: '/guides/como-subir-de-rango-overwatch', label: 'Aplicarlo a ranked' }, { href: '/guides/review-vod-overwatch-espanol', label: 'Revisar una VOD' }, { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Revisión de cooldowns' }, { href: '/roles/tank', label: 'Tank' }, { href: '/roles/dps', label: 'DPS' }, { href: '/roles/support', label: 'Support' }],
  },
  'como-subir-de-rango-overwatch': {
    slug: 'como-subir-de-rango-overwatch', title: 'Cómo subir de rango en Overwatch',
    seoTitle: 'Cómo subir de rango en Overwatch: decisiones y rutina ranked',
    seoDescription: 'Deja de repetir errores en ranked: prepara peleas con el equipo, decide cuándo cambiar y revisa una partida sin obsesionarte con el marcador.',
    h1: 'Cómo subir de rango en Overwatch sin jugar en piloto automático', kicker: 'Ranked',
    publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'Elige un rol y unos pocos héroes que controles, prepara las peleas con el equipo y trabaja un error recurrente en tus repeticiones. Una rutina puede ayudarte a decidir mejor, pero no garantiza un rango ni un número de victorias.',
    intro: ['Hay partidas que se escapan aunque juegues bien. Puedes entrenar cómo llegar a la siguiente pelea con más opciones: una posición útil, un cooldown disponible y una idea de qué necesita tu equipo.', 'Cambiar de pick tras cada muerte o jugar por enfado hace difícil reconocer qué falla. Empieza por una situación concreta en vez de intentar arreglar todo tu juego en una noche.'],
    sections: [
      { title: 'Un main y una alternativa para otro problema', body: [
        'Un pool pequeño permite aprender distancias, salidas y matchups. Ana y Kiriko no se sustituyen porque una tenga más curación en el marcador: Kiriko ofrece otra movilidad cuando Ana no consigue mantenerse conectada al equipo. El cambio solo ayuda si sabes usar esa salida.',
        'No necesitas aprender todos los counters. Busca una alternativa cómoda para los mapas o amenazas que peor llevas. Si escoges Winston por primera vez para echar a Widowmaker de una altura, tendrás que aprender también cómo volver; el nombre del pick no ejecuta el dive.',
      ] },
      { title: 'Antes de entrar, comprueba tres cosas', body: [
        'Mira quién está listo, desde dónde puede ayudarte y qué respuesta rival condiciona la entrada. Tener Dash no basta si Ana todavía vuelve del spawn. Como Reinhardt, cruzar una calle mientras los DPS siguen rotando puede gastar tu barrera sin que nadie aproveche el avance.',
        'En King’s Row, una esquina puede servir para reagruparse y esperar al Support antes de acercarse. No es quedarse pasivo: evita pagar la misma entrada dos veces. Si el reloj no deja tiempo, el plan cambia y alguien debe tocar el objetivo.',
      ], bullets: ['¿Qué aliados pueden intervenir ahora?', '¿Dónde puedo retirarme si falla la entrada?', '¿Qué respuesta del rival debo respetar?'] },
      { title: 'Una baja no elimina el peligro', body: [
        'Con ventaja numérica, controla la salida del rival sin separarte. Si Cassidy consigue una baja y luego corre detrás de Tracer por dos esquinas, puede perder el ángulo desde el que su equipo cerraba la pelea.',
        'Con desventaja, comprueba si aún podéis disputar el objetivo. Fuera de overtime, retirarse juntos puede conservar recursos. En la última pelea quizá necesites una ultimate para sostener el punto aunque las probabilidades sean malas; "nunca ulties con dos muertos" no es una regla universal.',
      ] },
      { title: 'Cambia por una limitación concreta', body: [
        'Si Ana muere porque sigue en la misma posición después de ser localizada, prueba una rotación. Si las posiciones útiles quedan aisladas y no llega ayuda contra dive, un Support con otra movilidad puede darte una respuesta distinta.',
        'Valora también el recorrido hasta el objetivo y la ultimate que conservas. Nano listo puede justificar una pelea más si tienes un objetivo y una entrada viables. No obliga a mantener Ana cuando no consigues llegar viva a usarlo.',
      ] },
      { title: 'Revisa una decisión, no la reputación del lobby', body: [
        'Escoge dos peleas en las que te hayas sentido sin opciones. Con D.Va, mira si gastaste Boosters para perseguir cuando tus Supports ya estaban siendo atacados. Con Kiriko, revisa si el compañero al que te teleportaste tenía una salida.',
        'El marcador ayuda a encontrar un momento, pero no demuestra quién causó la derrota. Mucha curación puede venir de sostener una pelea perdida; poco daño puede venir de caminar tras morir primero. Busca qué podías hacer con la información disponible entonces.',
      ] },
      { title: 'Una rutina que puedas mantener', body: [
        'Antes de entrar a cola, elige una tarea: "cuando cambie de altura, compruebo desde dónde me puede curar Ana". Calienta lo necesario para controlar el héroe y juega mientras puedas atender a esa tarea, no hasta recuperar todos los puntos perdidos.',
        'Después guarda una repetición y una nota. Si empiezas a perseguir bajas o cambiar por enfado, descansar puede servir más que acumular partidas. Compara la misma decisión en otra sesión; el rango de una tarde no mide por sí solo lo aprendido.',
      ] },
    ],
    checklist: ['Sé qué aporta mi alternativa.', 'Espero al equipo cuando el tiempo lo permite.', 'Entro desde una posición con salida.', 'No persigo a costa de perder la ventaja.', 'Valoro ultimate y reloj antes de cambiar.', 'Reviso una decisión que pueda repetir mejor.'],
    faqs: [
      { question: '¿Qué héroe garantiza subir de rango?', answer: 'Ninguno. Un pick puede encajar mejor en un mapa o matchup, pero necesita ejecución y ayuda. Empieza por héroes que controles y aprende qué situaciones no resuelven bien.' },
      { question: '¿Cuántas partidas debería jugar al día?', answer: 'No hay una cifra universal. Una sesión corta con atención puede servir más que seguir cansado. Para cuando dejes de aplicar la tarea que querías entrenar.' },
      { question: '¿Cambio después de perder dos peleas?', answer: 'No necesariamente. Mira si se repite una limitación del kit o un error de ejecución. El reloj, el objetivo y tu ultimate pueden justificar cambiar antes o mantener el pick.' },
      { question: '¿Cómo aprovecho una derrota?', answer: 'Elige dos peleas y retrocede hasta tu primera decisión arriesgada. Anota una alternativa ejecutable con la información que tenías y pruébala cuando vuelva a aparecer esa situación.' },
    ],
    links: [{ href: '/guides/como-mejorar-en-overwatch', label: 'Detectar errores' }, { href: '/guides/review-vod-overwatch-espanol', label: 'Revisar una partida' }, { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Cuándo cambiar' }, { href: '/counters', label: 'Matchups por héroe' }, { href: '/team-comps', label: 'Planes de equipo' }, { href: '/experts', label: 'VOD review con un experto' }],
  },
  'mejores-heroes-overwatch': {
    slug: 'mejores-heroes-overwatch', title: 'Mejores héroes de Overwatch',
    seoTitle: 'Mejores héroes de Overwatch para ranked: cómo elegir por rol',
    seoDescription: 'Elige Tank, DPS o Support según mapa, equipo y matchups. Ejemplos de picks y alternativas para ranked, sin confundir una tier list con una victoria segura.',
    h1: 'Mejores héroes de Overwatch para ranked: elige según la partida', kicker: 'Picks por rol',
    publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'No hay un mejor héroe para todos los mapas y jugadores. Elige uno que controles, que pueda pelear a la distancia que pide el mapa y que cubra una necesidad del equipo. En Season 5, Sombra y Doctrine son Supports: Sombra ya no ocupa una plaza de DPS.',
    intro: ['Una tier list puede señalar tendencias, pero no sabe si tu equipo acompaña un dive ni si tú puedes mantener el ángulo. Aquí encontrarás criterios para elegir, no un ranking de rendimiento que no podamos demostrar.', 'Son ejemplos de uso del kit. Una respuesta útil no gana automáticamente el matchup ni demuestra que el héroe encabece el meta de Season 5.'],
    sections: [
      { title: 'Tank: el mapa cambia lo que necesitas', body: [
        'En alturas como las de Gibraltar, D.Va puede disputar a un tirador y volver hacia sus Supports. Winston puede presionar una posición elevada, pero necesita un aterrizaje desde el que el equipo intervenga. Detrás de otra esquina, Ana puede perderlo de vista.',
        'En un tramo cerrado de King’s Row, Reinhardt puede acercarse usando esquinas sin cruzar todo el tiempo campo abierto. Si el rival ocupa varias alturas, llevar barrera no resuelve la separación. Zarya ofrece otra forma de sostener intercambios cercanos, pero sus burbujas no sustituyen una ruta hasta el enemigo.',
      ], bullets: ['Alturas: acceso, apoyo y vuelta antes de comprometerte.', 'Distancia corta: esquinas para acercarte sin gastar todos los recursos.', 'Peel: identifica qué aliado necesita ayuda y si puedes llegar.'] },
      { title: 'DPS: una amenaza que puedas mantener', body: [
        'Soldier: 76 permite reposicionarse y mantener presión, pero no hace buena una línea de tiro sin cobertura. Ashe puede aprovechar altura y rango; si Winston la alcanza, necesita espacio para retirarse o ayuda.',
        'Tracer y Genji pueden castigar una backline distraída. No los elijas solo porque el rival juega Ana: junto a Brigitte, con Sleep y cubierta por el Tank, no está aislada. Cassidy puede ayudar contra un flanker a una distancia en la que acierte y reciba apoyo; perseguirlo lejos cambia el duelo.',
        'Si ya juegas Shion u otro DPS con confianza, pregunta qué ángulo puedes sostener y cómo volverás. Cambiar a un héroe desconocido para copiar una tabla puede dejarte con menos opciones.',
      ] },
      { title: 'Support: quién necesita ayuda y desde dónde', body: [
        'Ana encaja cuando ve al frente desde una posición protegida. Kiriko puede recolocarse con Swift Step y responder a efectos negativos con Suzu, pero teleportarse sobre un compañero atrapado no garantiza salvar a ninguno.',
        'Brigitte puede proteger a otro Support frente a una entrada cercana. Salir a perseguir al flanker puede abandonar precisamente al compañero que querías ayudar. Lúcio facilita cambios de posición, pero su velocidad no arregla que medio equipo siga lejos.',
        'Sombra ocupa ahora un slot de Support. Weaken reduce el daño y la curación que produce el enemigo afectado; no es el antiguo Hack que bloqueaba habilidades ni el anti-heal de Ana. Doctrine también es Support. Revisa qué curación, movilidad y protección conserva la pareja, no solo cuánto daño hace.',
      ] },
      { title: 'Dos decisiones de selección en ranked', body: [
        'Tu equipo lleva Winston y los Supports pueden mantenerlo mientras disputa una altura. Un DPS que presione al mismo objetivo puede ayudar; también un tirador que cubra su aterrizaje desde otro ángulo. No todos necesitan saltar para coordinar la presión.',
        'Tu Reinhardt quiere avanzar, pero los DPS mantienen una posición lejana. Antes de exigir un swap, espera su rotación y prueba otra esquina. Si el mapa mantiene separados esos rangos de pelea, cambiar un pick puede simplificar el plan.',
      ] },
      { title: 'Alternativas, no una colección de counters', body: [
        'Escoge una alternativa para un problema frecuente: llegar a una altura, sobrevivir a una entrada o presionar desde otra distancia. Practícala donde puedas aprender su salida, no solo en la última pelea de ranked.',
        'Después del cambio, comprueba si cumples tu función. Si sigues muriendo por salir solo de cobertura, añadir héroes no corrige esa decisión. El mejor pick para esa partida es el que puedes ejecutar con tu equipo, no necesariamente el más nuevo.',
      ] },
    ],
    checklist: ['Sé a qué distancia quiero pelear.', 'Puedo llegar a la posición sin aislarme.', 'El pick ocupa el rol correcto.', 'Conozco una salida.', 'Mi alternativa resuelve otro problema.', 'No trato ejemplos como un ranking demostrado.'],
    faqs: [
      { question: '¿Cuál es el mejor héroe de Season 5?', answer: 'Esta guía no establece un número uno sin datos comparables del parche. Ayuda a elegir por mapa, rol y ejecución. Un héroe nuevo o reworkeado no es automáticamente el mejor para ti.' },
      { question: '¿Sombra sigue siendo DPS?', answer: 'No. En Season 5 es Support. Debe ocupar un puesto de Support, no sustituir a Tracer o Genji dentro de los dos DPS de cola por roles.' },
      { question: '¿Qué héroe es más fácil para empezar?', answer: 'Depende de qué controles ya. Un kit conocido y una posición con cobertura simplifican la partida. Aprende primero distancia, función y salida, en vez de asumir que un pick evita todos los errores.' },
      { question: '¿Abandono mi main si no aparece en la tier list?', answer: 'No por ese motivo solamente. Comprueba si puedes aportar en ese mapa y contra ese equipo. Mantén una alternativa para situaciones en las que tu main no cumpla su función.' },
    ],
    links: [{ href: '/heroes', label: 'Todos los héroes' }, { href: '/heroes/dva', label: 'Alturas con D.Va' }, { href: '/heroes/winston', label: 'Preparar el salto' }, { href: '/heroes/ana', label: 'Posición de Ana' }, { href: '/heroes/kiriko', label: 'Decisiones de Kiriko' }, { href: '/heroes/doctrine', label: 'Kit de Doctrine' }, { href: '/counters/sombra', label: 'Sombra Support' }, { href: '/guides/como-subir-de-rango-overwatch', label: 'Aplicarlo a ranked' }],
  },
  'counters-overwatch-guia-completa': {
    slug: 'counters-overwatch-guia-completa', title: 'Counters de Overwatch',
    seoTitle: 'Counters de Overwatch: matchups y cuándo cambiar de héroe',
    seoDescription: 'Responde a dive, alturas y cooldowns enemigos: ejemplos de D.Va, Zarya, Ana y Sombra Support para decidir cuándo adaptar tu juego o cambiar.',
    h1: 'Counters de Overwatch: cuándo cambiar y cómo jugar el matchup', kicker: 'Matchups',
    publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'Un counter sirve si responde a la jugada que te hace perder. Identifica esa jugada, comprueba qué puedes cambiar de posición o cooldowns y elige otro héroe si su kit ofrece una respuesta que puedas ejecutar. Un pick favorable no gana el duelo por ti.',
    intro: ['Si Winston salta sobre Ana cada pelea, la pregunta no termina en "¿qué counterea a Winston?". Importa dónde aterriza, qué ayuda recibe y si Ana ha quedado separada del otro Support.', 'Cambiar a un héroe con movilidad, proteger la entrada o mover la backline son respuestas distintas. Elige la que resuelva lo que pasa en tu partida.'],
    sections: [
      { title: 'D.Va contra Zarya: posición antes que swap', body: [
        'El haz de Zarya no se detiene con Defense Matrix. Quedarte delante esperando que Matrix absorba su daño es jugar mal esa interacción. Sin embargo, una Zarya en el suelo no ocupa automáticamente todas las alturas.',
        'En Gibraltar, D.Va puede disputar una altura o ayudar a su backline en vez de mantener un duelo frontal. Si los Supports quedan al alcance de Zarya y te marchas sin avisar, la altura no compensa perderlos. Comprueba si puedes presionar y volver; si el tramo exige un intercambio cercano que no sostienes, valora otro Tank.',
      ] },
      { title: 'Genji contra Ana: Sleep no cuenta toda la historia', body: [
        'Ver que Ana ha gastado Sleep facilita algunas entradas, pero puede tener granada, otro Support cerca o un Tank cubriéndola. Un Dash detrás de una pared también puede cortar la ayuda de tus propios Supports.',
        'Como Ana, juega desde donde puedas recibir peel y rota cuando Genji te localice. No gastes la granada sin motivo antes del dive. Si ninguna posición útil permite sostener al equipo, un cambio de Support puede ser razonable; no tienes que esperar a fallar otro Sleep sola.',
      ] },
      { title: 'Sombra Support no es el antiguo counter de Hack', body: [
        'Desde Season 5, Sombra es Support y no conserva el Hack normal sobre héroes. No la elijas pensando que una habilidad básica va a desactivar Doomfist en cada entrada. EMP mantiene hack, pero es una ultimate, no una respuesta para todas las peleas.',
        'Weaken reduce el daño y la curación que produce el rival afectado. No bloquea habilidades ni reduce directamente la curación que recibe. Aplicarlo durante una entrada puede limitar lo que produce el atacante; no garantiza una baja ni sustituye curar y proteger al equipo.',
      ] },
      { title: 'Defiende del dive sin perseguir a todos', body: [
        'Cassidy puede ayudar contra Tracer manteniendo un ángulo cerca de sus Supports. Si la persigue hasta perder al equipo de vista, el rival puede entrar por otro lado mientras sigue buscando el duelo.',
        'Brigitte puede hacer más difícil atacar la posición de Ana. El objetivo no es seguir a Winston cuando salta fuera, sino conservar una zona desde la que Ana juegue. Si el atacante se retira y sobrevives sin ceder el objetivo, no necesitas una kill para que la defensa haya servido.',
      ] },
      { title: 'Cuándo merece la pena cambiar', body: [
        'Cambia si tu kit no permite una posición útil o responder a una amenaza repetida. Pharah contra tiradores que controlan sus rutas puede necesitar otro plan; antes comprueba si hay cobertura, otra entrada y apoyo para mantenerte.',
        'Valora ultimate, reloj y recorrido desde spawn. Puedes usar una ultimate antes del swap si queda una pelea viable. En overtime, un cambio que te impida tocar puede ser peor aunque el matchup sea favorable. No hay un número fijo de derrotas que obligue a cambiar; una muerte aislada tampoco demuestra un problema de pick.',
      ] },
      { title: 'Comprueba si el ajuste ha servido', body: [
        'Compara la siguiente pelea: ¿el rival usó otra ruta? ¿Tu Support mantuvo la posición? ¿Guardaste el cooldown que permite responder o lo gastaste antes de la amenaza?',
        'Elige algo reconocible: no usar Matrix contra el haz, no entrar sobre Ana sin mirar su compañía o no perseguir a Tracer fuera del alcance del equipo. El matchup se aprende con decisiones, no memorizando una flecha entre retratos.',
      ] },
    ],
    checklist: ['Identifico la jugada que me castiga.', 'Compruebo posición y aliados antes del swap.', 'Sé qué hace y qué no hace mi defensa.', 'No confundo Sombra con su kit anterior.', 'Valoro ultimate, reloj y vuelta al objetivo.', 'Reviso qué cambió en la siguiente pelea.'],
    faqs: [
      { question: '¿Qué es un counter en Overwatch?', answer: 'Una respuesta que limita el valor de una jugada o héroe rival. Puede ser un pick, una posición o guardar una habilidad. No exige matar al enemigo para ser útil.' },
      { question: '¿Tengo que cambiar D.Va contra Zarya?', answer: 'No siempre. Matrix no bloquea su haz, así que no dependas de ella en el duelo frontal. Comprueba alturas y ayuda al equipo; si debes sostener un intercambio que no puedes jugar, considera cambiar.' },
      { question: '¿Sombra sigue bloqueando habilidades con Hack?', answer: 'Su Hack normal sobre héroes se ha eliminado en Season 5. EMP mantiene hack, pero requiere la ultimate. Weaken reduce el daño y la curación que produce el enemigo, no bloquea sus botones.' },
      { question: '¿Guardo mi ultimate antes de cambiar?', answer: 'Solo si hay un uso viable que justifique quedarte. Cargarla no sirve si no llegas vivo a usarla. Comprueba también si el swap permite volver al objetivo a tiempo.' },
      { question: '¿Cómo sé si funciona el counter?', answer: 'Mira si ahora cumples tu función y si el rival tiene menos acceso a la jugada que te castigaba. No lo midas únicamente por las kills contra ese héroe.' },
    ],
    links: [{ href: '/counters', label: 'Counters por héroe' }, { href: '/counters/dva', label: 'Matchups de D.Va' }, { href: '/counters/zarya', label: 'Matchups de Zarya' }, { href: '/counters/ana', label: 'Proteger a Ana' }, { href: '/counters/genji', label: 'Responder a Genji' }, { href: '/counters/sombra', label: 'Sombra en Season 5' }, { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Decidir un cambio' }],
  },
  'composiciones-overwatch-5v5-6v6': {
    slug: 'composiciones-overwatch-5v5-6v6', title: 'Composiciones de Overwatch 5v5 y 6v6',
    seoTitle: 'Composiciones de Overwatch: ejemplos de dive, poke y brawl',
    seoDescription: 'Ejemplos de composiciones 5v5 y 6v6: quién entra, quién ayuda y cuándo retirarse. Adapta dive, poke y brawl al mapa y a los picks de tu equipo.',
    h1: 'Composiciones de Overwatch: dive, poke y brawl en 5v5 y 6v6', kicker: 'Planes de equipo',
    publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'En 5v5 de cola por roles hay un Tank, dos DPS y dos Supports. Dive presiona una posición con movilidad; poke aprovecha distancia y ángulos; brawl busca una pelea cercana. Elige el estilo que podéis ejecutar en ese tramo. Son planes posibles, no el mejor equipo garantizado del parche.',
    intro: ['Si Winston salta mientras Tracer vuelve y Ana no lo ve, escribir "dive" no arregla la entrada. Dos equipos con los mismos picks pueden jugar de formas muy distintas.', 'No hace falta copiar una comp profesional. Busca una posición común, un objetivo al que podáis presionar y una retirada que no deje solos a los Supports.'],
    sections: [
      { title: 'Dive 5v5: Winston, Tracer, Genji, Ana y Kiriko', body: [
        'Winston es el Tank; Tracer y Genji, los DPS; Ana y Kiriko, los Supports. En una altura de Gibraltar, prepara el ángulo de Ana y deja que los DPS lleguen donde puedan intervenir. El salto señala la entrada, pero no obliga a gastar Dash o Swift Step hacia delante.',
        'Si el rival usa una defensa y sostiene la posición, puede convenir retirarse. No persigas hasta cortar la visión de Ana. Kiriko debe conservar una salida: teleportarse sobre un Winston aislado puede poner a ambos en peligro.',
        'Cambiar Winston por D.Va conserva acceso a alturas, pero cambia la protección: Matrix absorbe proyectiles, no funciona como una barrera ni detiene haces o melee. Comprueba desde dónde podrán disparar y curar los aliados antes de repetir el dive.',
      ] },
      { title: 'Poke 5v5: Sigma, Ashe, Hanzo, Baptiste y Zenyatta', body: [
        'Sigma es el Tank; Ashe y Hanzo, los DPS; Baptiste y Zenyatta, los Supports. El ejemplo busca presión desde posiciones separadas que puedan ayudarse. En líneas largas como las de Circuit Royal, Sigma disputa el frente mientras un DPS sostiene un lateral con cobertura.',
        'Rota antes de que el rival llegue encima de los Supports. Una altura sin salida no es segura solo porque al principio esté lejos. Si gastáis todas las defensas intentando mantenerla, quizá no quede respuesta a la siguiente entrada.',
        'Cambiar Ashe por Widowmaker altera cuánto dependes de un tiro concreto. Añadir más protección cercana desde Support puede ayudar contra dive, pero no sustituye una retirada: pedir más curación sin moveros conserva el problema.',
      ] },
      { title: 'Brawl 5v5: Reinhardt, Mei, Cassidy, Lúcio y Kiriko', body: [
        'Reinhardt ocupa Tank; Mei y Cassidy, DPS; Lúcio y Kiriko, Support. En tramos cerrados de King’s Row podéis reuniros detrás de una esquina y usar velocidad para acercaros sin cruzar separados.',
        'Mei puede separar a un rival al alcance del equipo, pero una pared que impida disparar a Cassidy también corta la presión propia. Reinhardt no necesita cargar hasta el fondo: avanzar a una esquina que todos puedan ocupar puede bastar.',
        'Rush suele describir una entrada rápida para cerrar distancia, no pulsar todos los botones a la vez. Si el rival retrocede a una altura inaccesible, cambia la ruta o el plan. Perseguir por una calle abierta puede gastar barrera y Suzu antes de llegar.',
      ] },
      { title: 'Peel sin abandonar el frente', body: [
        'Ana y Brigitte pueden mantener una zona desde la que Ana vea el frente y Brigitte responda cerca. Si llega Tracer, no necesitan salir ambas detrás: conservar la posición y seguir ayudando limita su valor.',
        'D.Va puede volver a proteger un ángulo mientras los DPS presionan. Si todos miran al mismo flanker, el rival gana espacio por delante. Decide quién responde cerca y quién conserva el frente.',
      ] },
      { title: '6v6: dos Tanks con tareas distintas', body: [
        'Para un formato de dos Tanks, dos DPS y dos Supports, un ejemplo es Winston y D.Va; Tracer y Genji; Ana y Kiriko. Winston inicia en una altura y D.Va disputa otro ángulo o cubre la vuelta. Si ambos saltan detrás de la misma esquina, no aparece peel por añadir otro Tank.',
        'Otro ejemplo es Reinhardt y Zarya; Mei y Cassidy; Lúcio y Kiriko. Una burbuja puede ayudar a Reinhardt, pero Zarya debe decidir qué uso protege y cuál mantiene presión. No cuentes con una burbuja sin comprobar si está disponible.',
        'Una Suzu gastada no garantiza que el siguiente dive mate: pueden quedar otra defensa, una rotación o un Support fuera de alcance. Estos ejemplos no describen las reglas de cola abierta o Stadium.',
      ] },
      { title: 'Sombra y Doctrine son Supports en Season 5', body: [
        'Sombra no es un tercer DPS ni sustituye a Tracer dentro de los DPS de cola por roles. Weaken reduce lo que produce el rival afectado, pero no es anti-heal ni el antiguo Hack normal.',
        'Doctrine también es Support. Si cambias uno de los Supports por él o por Sombra, revisa desde dónde ayudarán y qué respuesta pierdes. Sin Kiriko no cuentes con Suzu; sin Ana no mantengas un plan dependiente de Sleep y granada.',
      ] },
      { title: 'Un ajuste para la siguiente pelea', body: [
        '"Ana no ve el aterrizaje" es más fácil de corregir que "nos falta dive". Acerca el salto, rota antes al Support o presiona otra posición. El swap es una opción, no la única.',
        'Acordad dónde vais a pelear antes de salir del spawn. Si el mapa o los picks no permiten intervenir en el mismo intercambio, simplifica. Una comp menos vistosa que podéis ejecutar sirve más que cinco picks correctos peleando separados.',
      ] },
    ],
    checklist: ['Respetamos los roles del formato.', 'El mapa permite nuestra distancia de pelea.', 'Los Supports tienen ayuda y salida.', 'Los DPS están listos cuando entra el Tank.', 'Alguien responde al flanker sin abandonar el frente.', 'Sabemos qué respuesta cambia al sustituir un pick.'],
    faqs: [
      { question: '¿Cuál es la mejor composición de Overwatch?', answer: 'Ninguna gana en todos los mapas y parches. Elige un plan que sepáis ejecutar y comprueba cómo entrar, ayudaros y retiraros en ese tramo.' },
      { question: '¿Qué diferencia dive, poke y brawl?', answer: 'Dive usa movilidad para presionar una posición; poke mantiene presión desde distancia y ángulos; brawl busca intercambios cercanos. Puedes cambiar de forma de jugar durante una ronda.' },
      { question: '¿Qué cambia en 6v6?', answer: 'En los ejemplos de cola por roles pasas de un Tank a dos. Hay opciones para dividir entrada y protección, pero no seguridad automática: comprueba posiciones y recursos.' },
      { question: '¿Dónde encaja Sombra en Season 5?', answer: 'En un puesto de Support, no de DPS. Reparte la ayuda con el otro Support y no bases la entrada en el antiguo Hack normal sobre héroes.' },
      { question: '¿Copio una composición profesional?', answer: 'Puedes aprender de su plan, pero necesitas picks que el equipo controle. Una ruta y un objetivo compartidos sirven más que copiar nombres sin entender sus tareas.' },
    ],
    links: [{ href: '/team-comps', label: 'Composiciones por héroe' }, { href: '/team-comps/winston', label: 'Preparar la entrada' }, { href: '/team-comps/dva', label: 'Alturas y peel' }, { href: '/team-comps/reinhardt', label: 'Brawl con Reinhardt' }, { href: '/team-comps/ana', label: 'Ayuda para Ana' }, { href: '/team-comps/sombra', label: 'Sombra Support' }, { href: '/team-comps/doctrine', label: 'Doctrine en equipo' }, { href: '/maps', label: 'Posiciones por mapa' }],
  },
  'review-vod-overwatch-espanol': {
    slug: 'review-vod-overwatch-espanol', title: 'Review de VOD en Overwatch',
    seoTitle: 'Review de VOD en Overwatch: cómo analizar una partida',
    seoDescription: 'Revisa una repetición paso a paso: posición, cooldowns y ultimates. Ejemplos por rol y materiales que preparar para una review de Overwatch en español.',
    h1: 'Review de VOD en Overwatch: qué mirar y qué corregir', kicker: 'Análisis de partidas',
    publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10', updatedAt: '10 de octubre de 2026',
    quickAnswer: 'Elige una partida reciente, pausa antes de dos peleas importantes y compara posición, ayuda y cooldowns. Termina con una decisión que puedas practicar. Para una review con un experto, prepara la repetición, tu nombre dentro de la partida, rol, héroes y una pregunta concreta.',
    intro: ['Una VOD puede ser una grabación; una repetición del juego permite observar desde distintos puntos de vista. Ambas ayudan, pero tu cámara conserva mejor lo que estabas mirando y la información disponible en ese momento.', 'Una revisión útil no enumera todos los fallos: explica por qué una decisión era arriesgada, qué alternativa había y cómo reconocer otra situación parecida jugando.'],
    sections: [
      { title: 'Elige una partida que responda a tu pregunta', body: [
        'Una derrota ajustada ofrece decisiones comparables, pero una victoria puede mostrar un error no castigado. Para revisar defensa contra dive, elige una partida con varias entradas sobre tu backline, no una ronda sin esa situación.',
        'Comprueba que el código o la grabación se abre. Las actualizaciones pueden dejar inaccesibles repeticiones anteriores; guarda una grabación si necesitas conservar un momento. No envíes contraseñas ni acceso a tu cuenta para que alguien revise la partida.',
      ] },
      { title: 'Pausa antes de que empiece el problema', body: [
        'Detente antes del engage. Anota dónde están los aliados, qué posición quieres disputar y por dónde volverías. Después avanza hasta el momento en que te quedaste sin salida.',
        'Con Winston, compara el aterrizaje con la línea de visión de Ana. Detrás de una pared, ¿podía Ana rotar sin exponerse? No atribuyas falta de curación a una decisión que la dejaba sin acceso al Tank.',
      ] },
      { title: 'Lo que sabías no es todo lo que muestra el replay', body: [
        'La cámara libre descubre enemigos detrás de paredes que quizá no podías localizar. Vuelve a tu perspectiva y busca sonidos, una aparición previa o una habilidad reconocible.',
        'Si Cassidy persigue a un flanker al que vio retirarse, pregunta si necesitaba hacerlo. Si Tracer aparece sin aviso desde otra ruta, no concluyas "debías saberlo": revisa la cobertura y la ayuda que podías preparar sin conocer su posición.',
      ] },
      { title: 'Cooldowns: motivo, resultado y coste', body: [
        'Escribe qué intentabas resolver, qué ocurrió y qué quedó sin respuesta. Sleep puede frenar una amenaza aunque el rival sobreviva. Suzu puede acertar y estar mal usada si el aliado estaba a salvo antes del efecto que necesitabas limpiar.',
        'Con D.Va, separa orientar Matrix hacia un proyectil de intentar absorber un haz o melee. Con Genji, mira si Dash tenía salida o dependía de una eliminación no asegurada. Explica qué información habría cambiado tu decisión, no solo "pronto" o "tarde".',
      ] },
      { title: 'Ultimates y reloj: conserva el contexto', body: [
        'Mira si tus aliados podían aprovechar la ultimate, qué defensas quedaban y si debías actuar ya. En overtime, sostener el punto puede justificar usarla sin conseguir una baja. En otra pelea, gastarla tras morir todos puede retrasar el siguiente intento.',
        'Revisa también una pelea donde no la usaste. Guardarla toda la ronda por esperar una ocasión perfecta puede perder opciones. Pregunta qué intento viable ofrecía, no si produjo una jugada destacada.',
      ] },
      { title: 'Qué preparar para un experto', body: [
        'Consulta qué incluye el servicio y qué materiales pide el perfil. Duración, formato y plazos dependen de la oferta; esta guía no promete una entrega idéntica para todos.',
        'Incluye rol, rango aproximado, héroes, mapa, nombre en la partida y un código o enlace accesible. Añade una pregunta: "con Ana pierdo la posición cuando Winston salta; quiero saber cuándo rotar y cuándo guardar Sleep". Señalar dos momentos facilita el análisis sin decidir de antemano quién tiene la culpa.',
        'La review puede priorizar errores y proponer práctica. No garantiza subir de rango ni controla el matchmaking. Si el replay deja de abrirse, avisa al experto y acuerda otro material.',
      ] },
      { title: 'Sal del análisis con una tarea', body: [
        'Escribe situación y acción: "cuando el rival ocupe mi altura, roto por detrás antes de gastar movilidad hacia él". Busca ese momento en otra partida y comprueba si conservas una posición útil.',
        'Si la corrección falla, revisa qué condición faltaba: quizá la ruta estaba ocupada o el equipo avanzó por otro lado. No buscas una regla infalible, sino tomar la siguiente decisión con más información.',
      ] },
    ],
    checklist: ['Compruebo que el material se abre.', 'Elijo una pregunta y dos peleas relacionadas.', 'Pauso antes de salir de cobertura.', 'Distingo cámara libre de información disponible.', 'Explico motivo y coste de cada habilidad.', 'Reviso reloj y equipo al analizar ultimates.', 'Termino con una tarea para practicar.'],
    faqs: [
      { question: '¿Puedo revisar mis propias partidas?', answer: 'Sí. Compara dos situaciones similares: posición, recursos y ayuda. Un experto puede servir cuando no ves el patrón o no sabes qué error priorizar.' },
      { question: '¿Tengo que revisar toda la partida?', answer: 'No para empezar. Dos peleas contextualizadas pueden darte una tarea. Amplía si necesitas entender una rotación anterior o comprobar un patrón.' },
      { question: '¿Qué envío para una VOD review en español?', answer: 'Un código o enlace accesible, tu nombre en la partida, rol, héroes, mapa y una pregunta. Comprueba en el perfil del experto qué formato pide y qué incluye.' },
      { question: '¿Por qué no se abre mi replay?', answer: 'Una actualización puede invalidar repeticiones anteriores. Comprueba el código en el juego y prepara otro replay reciente o una grabación para compartir el análisis.' },
      { question: '¿Una review garantiza subir de rango?', answer: 'No. Puede ayudarte a elegir qué practicar, pero no garantiza un resultado ni sustituye entrenar y comprobar de nuevo tus decisiones.' },
    ],
    links: [{ href: '/guides/como-mejorar-en-overwatch', label: 'Elegir un error' }, { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Revisar habilidades' }, { href: '/guides/como-usar-ultimates-overwatch', label: 'Decidir una ultimate' }, { href: '/heroes/ana', label: 'Posición con Ana' }, { href: '/heroes/dva', label: 'Decisiones con D.Va' }, { href: '/experts', label: 'Servicios de review' }],
  },
}

export const evergreenGuideList = [
  evergreenGuides['como-subir-de-rango-overwatch'],
  evergreenGuides['mejores-heroes-overwatch'],
  evergreenGuides['counters-overwatch-guia-completa'],
  evergreenGuides['composiciones-overwatch-5v5-6v6'],
  evergreenGuides['review-vod-overwatch-espanol'],
]
