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
  publishedAt: '2026-05-10',
  modifiedAt: '2026-09-05',
  updatedAt: '5 de septiembre de 2026',
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
    quickAnswer: 'Ana gana partidas cuando puede curar y amenazar desde una cobertura segura. Busca una posición con visión de tu Tank, una esquina para cortar daño y una ruta de salida. No gastes Sleep Dart y Biotic Grenade a la vez por miedo: uno de los dos suele ser lo que te permite sobrevivir al siguiente dive.',
    intro: [
      'Jugar Ana bien no consiste en quedarse lo más lejos posible ni en acertar un Sleep espectacular cada pelea. Su valor aparece cuando mantiene a su equipo estable, obliga al rival a respetar la granada y sigue viva cuando llega la presión.',
      'En ranked tendrás peleas desordenadas y compañeros que salen de tu línea de visión. Esta guía se centra en las decisiones que sí dependen de ti: posición, orden de cooldowns, selección de objetivo y lectura del tempo de la pelea.',
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
          'Sleep Dart frena una amenaza concreta. Guárdalo contra un Winston que aún no ha saltado, una Tracer sin Recall o una ultimate que puedas cortar. Lanzarlo a un Tank protegido al principio de la pelea puede dar una baja, pero también deja la puerta abierta al engage que de verdad te mata.',
          'Biotic Grenade cambia el ritmo. Úsala ofensivamente cuando tu equipo puede disparar al objetivo durante el anti-heal; tirarla sobre cinco rivales detrás de una esquina solo genera un marcador bonito. En defensa, una granada propia puede ser mejor que buscar el anti si te permite aguantar hasta recibir peel.',
        ],
      },
      {
        title: 'Nano Boost necesita un plan sencillo',
        paragraphs: [
          'El mejor Nano no siempre va al héroe con la combinación más famosa. Mira quién puede llegar al rival en ese momento y qué recurso enemigo queda. Un Genji sin Dash a veinte metros no aprovechará el Nano aunque tenga Blade; un Winston ya dentro de la backline quizá sí convierta la pelea.',
          'También puedes usarlo para mantener el tempo. Salvar a tu Tank cuando el rival ha invertido recursos puede daros la esquina y la siguiente pelea. Evita esperar la jugada perfecta hasta que el mapa se termine. Si Nano lleva dos peleas listo, revisa qué condición imposible estás exigiendo.',
        ],
      },
      {
        title: 'Errores que parecen mecánicos y no lo son',
        paragraphs: ['Fallará algún disparo, pero muchas derrotas vienen de asomarse sin necesidad, curar al objetivo equivocado o gastar ambos cooldowns contra la primera amenaza. Si mueres primero, revisa los diez segundos anteriores: casi siempre hubo una posición mejor o una señal de peligro que ignoraste.'],
        points: ['Recargar con un aliado crítico todavía en pantalla.', 'Seguir curando al Tank mientras tu otro Support recibe el dive.', 'Buscar daño desde una posición que pierde visión del equipo.', 'Usar Sleep y granada sobre el mismo objetivo sin un motivo claro.'],
      },
    ],
    vodQuestions: ['¿Tenía una esquina cerca en mi primera muerte?', '¿Qué amenaza justificaba guardar Sleep Dart?', '¿Mi granada tenía follow-up o solo golpeó a mucha gente?', '¿El objetivo de Nano podía entrar o disparar en ese instante?', '¿Me recolocaba con la pelea o reaccionaba tarde?'],
    checklist: ['Sé desde dónde curaré la siguiente esquina.', 'No gasto los dos cooldowns por la misma presión.', 'Miro a mi otro Support cuando entra un flanker.', 'Tengo un objetivo de Nano y una alternativa.', 'Cambio de posición antes de perder la línea de visión.'],
    faqs: [
      { question: '¿Ana sirve para subir de rango?', answer: 'Sí, si puedes mantener una posición segura y usar sus cooldowns con intención. Tiene mucho impacto, pero castiga los errores de colocación más que otros supports.' },
      { question: '¿Cuándo debo usar la granada de forma ofensiva?', answer: 'Cuando un aliado pueda presionar al objetivo durante el anti-heal. Si nadie tiene ángulo o recursos para seguir, conserva la granada para la siguiente entrada.' },
      { question: '¿A quién debería dar Nano Boost?', answer: 'Al aliado que pueda convertirlo de inmediato. Comprueba distancia, cooldowns, vida y línea de visión antes de elegir por costumbre.' },
    ],
    links: [
      { href: '/heroes/ana', label: 'Guía completa de Ana' },
      { href: '/counters/ana', label: 'Counters de Ana' },
      { href: '/team-comps/ana', label: 'Composiciones con Ana' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/roles/support', label: 'Fundamentos de Support' },
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
    quickAnswer: 'Kiriko rinde mejor cuando juega cerca de cobertura, intercala kunais entre tandas de curación y conserva al menos una salida. Suzu no debe responder a todo: úsalo contra el efecto o el burst que realmente decide la pelea, y evita hacer Swift Step hacia un aliado que ya está perdido.',
    intro: [
      'Kiriko puede arreglar errores, pero si intentas arreglarlos todos acabas sin Suzu, sin teleport y en medio del rival. La diferencia entre sobrevivir una pelea y regalar dos muertes suele estar en reconocer qué compañero todavía se puede salvar.',
      'Su daño importa, aunque no a costa de abandonar la curación. El objetivo es encontrar pequeños huecos para lanzar kunais y obligar al rival a respetarte mientras mantienes listo el recurso que la pelea necesita.',
    ],
    sections: [
      {
        title: 'Cura con ritmo y dispara en los huecos',
        paragraphs: [
          'Los ofuda tardan en llegar. Envíalos antes de que tu Tank esté crítico y usa el viaje de los papeles para mirar otra amenaza o lanzar uno o dos kunais. Si esperas a que todos estén bajos, pasarás la pelea entera curando tarde.',
          'Busca cabezas en chokes y ángulos previsibles, no duelos eternos. Un kunai que obliga a Cassidy a cubrirse ya reduce presión. Si para disparar tienes que perder de vista a tus aliados durante varios segundos, el ángulo no compensa.',
        ],
      },
      {
        title: 'Suzu se guarda para el momento que cambia la pelea',
        paragraphs: [
          'Antes del engage, decide qué quieres limpiar: una granada de Ana, un control, una ultimate o el burst sobre tu Tank. Tener una prioridad evita lanzar Suzu al primer punto de daño y quedarte sin respuesta para el recurso importante.',
          'No necesitas acertar a todo el equipo. Salvar a dos jugadores que aún pueden pelear vale más que golpear a cinco cuando la pelea ya está perdida. Y si puedes evitar el peligro con una esquina o Swift Step, quizá Suzu deba seguir disponible.',
        ],
        points: ['Espera el efecto importante, no solo daño.', 'Mira dónde caerá el Suzu, no únicamente al aliado.', 'No lo uses para prolongar una pelea perdida.'],
      },
      {
        title: 'Swift Step es una salida, no una invitación al desastre',
        paragraphs: [
          'Teleportarte a un flanker profundo puede convertir una muerte en dos. Antes de pulsar, mira la vida del aliado, cuántos rivales hay y si tienes una cobertura al llegar. Cuando la respuesta es mala, sigue sosteniendo al resto del equipo.',
          'En una entrada agresiva, juega un ángulo desde el que puedas volver a tu backline. Esa amenaza lateral funciona porque el rival debe mirarte sabiendo que puedes desaparecer. Si gastas Swift Step para llegar al ángulo, pierdes precisamente esa ventaja.',
        ],
      },
      {
        title: 'Kitsune Rush debe cruzar el espacio que vais a usar',
        paragraphs: [
          'Coloca Kitsune por una ruta que tu equipo pueda recorrer, preferiblemente desde cobertura y hacia la siguiente esquina. Tirarlo perpendicular al avance o dentro de una sala que el rival puede abandonar reduce mucho su valor.',
          'No esperes siempre una combinación perfecta. Kitsune puede servir para tomar el punto, recuperar el tempo o forzar defensivas. Comunica la dirección y entra con el equipo; usarlo mientras todos recargan o rotan suele desperdiciar los primeros segundos.',
        ],
      },
    ],
    vodQuestions: ['¿Qué recurso rival quería responder con Suzu?', '¿Mi Swift Step me sacó del peligro o me llevó a otro?', '¿Podía lanzar un kunai entre dos tandas de ofuda?', '¿Kitsune cruzaba la ruta real de mi equipo?', '¿Intenté salvar a alguien que ya no tenía salida?'],
    checklist: ['Tengo un aliado seguro al que volver.', 'Sé qué efecto merece Suzu.', 'Intercalo daño sin perder curación importante.', 'No uso Swift Step para perseguir una baja dudosa.', 'Kitsune apunta hacia la zona que el equipo va a ocupar.'],
    faqs: [
      { question: '¿Cuándo debo usar Suzu?', answer: 'Cuando evita el control, el anti-heal o el burst que decidiría la pelea. No lo gastes por daño que puede resolverse con curación y cobertura.' },
      { question: '¿Kiriko debe hacer mucho daño?', answer: 'Debe amenazar con kunais en los huecos de curación. El daño es útil si no deja sin sostén al compañero que está recibiendo el engage.' },
      { question: '¿Cuándo es malo usar Swift Step?', answer: 'Cuando llegas a una posición sin cobertura, sin Suzu o junto a un aliado que ya está rodeado. Poder teleportarte no significa que el destino sea seguro.' },
    ],
    links: [
      { href: '/heroes/kiriko', label: 'Guía completa de Kiriko' },
      { href: '/counters/kiriko', label: 'Counters de Kiriko' },
      { href: '/team-comps/kiriko', label: 'Composiciones con Kiriko' },
      { href: '/guides/como-usar-ultimates-overwatch', label: 'Cómo usar ultimates' },
      { href: '/heroes/ana', label: 'Comparar con Ana' },
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
    quickAnswer: 'Genji no necesita abrir cada pelea. Presiona desde un ángulo seguro, espera a que el Tank o el rival gaste recursos y usa Dash cuando exista una baja probable o una salida clara. Si entras con Dash y dependes de conseguir el reset para sobrevivir, asegúrate de que tu equipo pueda tocar el mismo objetivo.',
    intro: [
      'El Genji que parece imposible de atrapar casi nunca está improvisando. Ha visto un objetivo tocado, sabe qué cooldown defensivo falta y entra cuando otra amenaza ya ocupa la atención del rival.',
      'En ranked es fácil confundir actividad con impacto: saltar, lanzar shuriken y buscar la backline no sirve si cada entrada llega antes que la presión de tu equipo. Tu recurso más importante es el timing.',
    ],
    sections: [
      {
        title: 'Prepara el engage sin regalar vida',
        paragraphs: [
          'Antes de entrar, usa high ground, paredes y ángulos cortos para lanzar shuriken sin quedarte expuesto. Buscas información y daño previo, no ganar el duelo desde lejos. Si pierdes media vida antes del dive, obligas a tus supports a gastar atención y retrasas la entrada.',
          'Mira a tu Tank. Cuando Winston salta o Reinhardt cruza la esquina, el rival debe repartir la cámara. Ese medio segundo es mejor que cualquier combo ejecutado mientras cinco jugadores te están esperando.',
        ],
      },
      {
        title: 'Dash necesita objetivo y salida',
        paragraphs: [
          'Usa Dash para cerrar una baja, atravesar a varios objetivos cuando sabes dónde terminarás o escapar. Entrar sobre un enemigo a vida completa con todos sus cooldowns convierte tu supervivencia en una apuesta.',
          'El reset es una consecuencia de elegir bien, no el plan entero. Si Ana está tocada pero Kiriko conserva Suzu, piensa qué ocurrirá después del Dash. A veces basta con amenazar, forzar el recurso y guardar la entrada real para la siguiente ventana.',
        ],
        points: ['Confirma la vida del objetivo.', 'Cuenta la respuesta defensiva más cercana.', 'Elige dónde acabarás antes de pulsar Dash.'],
      },
      {
        title: 'Deflect compra tiempo, no invulnerabilidad',
        paragraphs: [
          'Deflect permite cruzar una línea peligrosa, responder a burst previsible o ganar el segundo que necesita tu equipo. No protege de todo y tampoco arregla una entrada sin cobertura. Si lo gastas para pokear, la backline sabrá que puede castigarte al acercarte.',
          'Cancélalo cuando ya cumplió su trabajo. Mantenerlo por costumbre puede dar tiempo al rival para rodearte. Contra habilidades que no refleja, usa pared o doble salto para romper la línea en lugar de confiar en una animación que no te salva.',
        ],
      },
      {
        title: 'Dragonblade empieza antes de desenvainar',
        paragraphs: [
          'Localiza al objetivo, pregunta qué defensivas quedan y acércate sin gastar todos los recursos. Una Blade desde la otra punta obliga a usar Dash solo para llegar y hace evidente tu ruta. Entrar desde altura o desde un lateral cercano conserva opciones.',
          'No persigas una pentakill. Una baja sobre el support correcto o dos recursos mayores ya pueden ganar el objetivo. Si el rival usa una ultimate defensiva, decide rápido si puedes cambiar de objetivo o si toca salir vivo.',
        ],
      },
    ],
    vodQuestions: ['¿Entré antes o después de mi Tank?', '¿Dash tenía una baja probable o dependía de un milagro?', '¿Gasté Deflect durante poke sin necesidad?', '¿Qué defensiva rival quedaba para mi Blade?', '¿Podía salir tras conseguir la primera baja?'],
    checklist: ['Mantengo vida mientras preparo el ángulo.', 'No entro antes de que exista presión aliada.', 'Dash termina cerca de cobertura.', 'Conservo Deflect para una amenaza concreta.', 'Sé qué recurso quiero forzar con Dragonblade.'],
    faqs: [
      { question: '¿Cuándo debo entrar con Dash?', answer: 'Cuando puedes cerrar una baja, acompañar un engage real o terminar en una posición segura. Evita usarlo sobre objetivos sanos con todas sus respuestas disponibles.' },
      { question: '¿Cómo saco valor de Dragonblade?', answer: 'Acércate antes de activarla, cuenta defensivas y busca una primera baja realista. No necesitas eliminar a todo el equipo para ganar la pelea.' },
      { question: '¿Genji funciona sin Ana?', answer: 'Sí. Nano facilita Blade, pero Genji puede jugar con dive, velocidad o daño previo de otros compañeros. La coordinación importa más que una pareja obligatoria.' },
    ],
    links: [
      { href: '/heroes/genji', label: 'Guía completa de Genji' },
      { href: '/counters/genji', label: 'Counters de Genji' },
      { href: '/team-comps/genji', label: 'Composiciones con Genji' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo funciona el dive' },
      { href: '/heroes/ana', label: 'Sinergia con Ana' },
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
    quickAnswer: 'Cassidy quiere pelear a media distancia, cerca de una esquina y de su equipo. Ocupa un ángulo que cruce fuego con tu Tank sin aislarte, guarda tu recurso de control para la amenaza que debe acercarse y usa Combat Roll para mantener posición o terminar un duelo, no para comenzar uno que no puedes abandonar.',
    intro: [
      'Cassidy parece directo porque su arma resuelve muchas situaciones, pero su movilidad limitada castiga cada mala rotación. Llegar tarde a una esquina o perseguir un flanco demasiado largo te deja fuera de la pelea aunque aciertes los disparos.',
      'Su trabajo cambia con la composición: puede proteger a los supports, castigar al Tank que cruza o abrir un segundo ángulo. Elegir uno de esos trabajos antes de la pelea da más consistencia que buscar duelos al azar.',
    ],
    sections: [
      {
        title: 'Controla una zona, no todo el mapa',
        paragraphs: [
          'Juega alrededor del rango donde tus disparos siguen siendo peligrosos y la cobertura está cerca. En una calle larga contra Widowmaker no ganas por insistir desde main; cambia de ruta o espera que tu Tank corte su visión. En una sala corta contra Reaper tampoco debes regalarle su distancia favorita.',
          'Un buen ángulo de Cassidy permite disparar a quien mira a tu Tank y volver con tus supports en pocos pasos. Si necesitas dos cooldowns para regresar, te has alejado demasiado.',
        ],
      },
      {
        title: 'Tu utilidad depende de la paciencia',
        paragraphs: [
          'Cuando el rival tiene Tracer, Genji o Shion, mostrarte cerca de la backline ya cambia sus rutas. No lances el control al primer movimiento; espera a que gasten movilidad o se comprometan con un objetivo. Forzar Recall y volver a disparar al frente suele ser mejor que perseguir a Tracer por un health pack.',
          'Combat Roll te permite recargar, esquivar burst y conservar una esquina. Rodar hacia el rival por un disparo extra solo funciona si la baja es segura y sabes qué amenaza queda después.',
        ],
      },
      {
        title: 'Dispara al objetivo que puede morir',
        paragraphs: [
          'No conviertas cada pelea en un concurso de daño contra el Tank. Si el Tank rival usa una esquina y recibe dos supports, cambia la cámara hacia el DPS que asoma o el support que cruza. Cassidy destaca castigando errores breves.',
          'La precisión mejora cuando tu posición te da tiempo. Una mira nerviosa suele ser el síntoma de estar demasiado abierto o demasiado cerca. Corrige primero la distancia y luego juzga la mecánica.',
        ],
      },
      {
        title: 'Deadeye puede ganar sin disparar cinco veces',
        paragraphs: [
          'Úsalo para expulsar al rival de una zona, cubrir una captura o castigar una rotación sin cobertura. Activarlo desde un flanco lejano suele anunciarse antes de que tengas línea de visión y deja al equipo peleando sin ti.',
          'Busca una altura o una esquina ya controlada y acepta un objetivo realista. También puedes cancelarlo si ya forzó defensivas o reposicionamiento; sobrevivir conserva la presión para la siguiente pelea.',
        ],
      },
    ],
    vodQuestions: ['¿Jugaba dentro de mi rango útil?', '¿Mi ángulo podía volver al equipo sin una rotación larga?', '¿Gasté el control antes de que entrara el flanker?', '¿Disparé al Tank porque era el objetivo correcto o porque era fácil?', '¿Deadeye buscaba una baja o una zona concreta?'],
    checklist: ['Tengo una esquina a un paso.', 'Mi ángulo cruza con la presión del Tank.', 'Guardo utilidad si hay un flanker activo.', 'No ruedo hacia una pelea sin salida.', 'Deadeye tiene una función antes de activarlo.'],
    faqs: [
      { question: '¿Cassidy debe jugar con sus supports?', answer: 'A menudo sí, sobre todo contra dive. Puede separarse para crear un ángulo, pero necesita una vuelta corta porque no tiene movilidad vertical ni escape largo.' },
      { question: '¿Cómo uso Deadeye en ranked?', answer: 'Para controlar una zona, castigar una rotación o asegurar una baja desde cobertura. Esperar una jugada de cinco eliminaciones suele reducir su valor.' },
      { question: '¿Qué hago contra héroes de largo alcance?', answer: 'No aceptes el duelo desde una calle abierta. Rota por cobertura, juega otro ángulo o espera a que tu Tank corte la línea de visión.' },
    ],
    links: [
      { href: '/heroes/cassidy', label: 'Guía completa de Cassidy' },
      { href: '/counters/cassidy', label: 'Counters de Cassidy' },
      { href: '/team-comps/cassidy', label: 'Composiciones con Cassidy' },
      { href: '/counters/tracer', label: 'Cómo jugar contra Tracer' },
      { href: '/roles/dps', label: 'Fundamentos de DPS' },
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
    quickAnswer: 'Reinhardt crea espacio caminando desde una cobertura hasta la siguiente, no sosteniendo el escudo en mitad de una calle. Usa la barrera para cruzar daño peligroso y proteger recursos concretos; al llegar a la esquina, baja el escudo, recupera vida y amenaza con el martillo.',
    intro: [
      'El escudo de Reinhardt no es una pared permanente para que cuatro compañeros disparen detrás. Es el recurso que permite mover al equipo, tapar un cooldown y conservar vida hasta alcanzar la distancia donde el Tank importa.',
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
          'Baja el escudo cuando la cobertura ya bloquea el daño. Esa pausa regenera barrera y permite que tus supports recuperen tu armadura. Volver a asomar con ambos recursos vale más que quedarse a cincuenta de escudo sin capacidad de avanzar.',
          'Protege lo que importa: un Sleep Dart que cruza, la resurrección de Mercy o la retirada de un compañero. Sostener barrera contra poke ligero mientras el rival guarda todo su burst consume el recurso en el momento equivocado.',
        ],
      },
      {
        title: 'Charge debe terminar donde tu equipo pueda jugar',
        paragraphs: [
          'Los pins cortos contra una pared cercana son mucho más fiables que atravesar toda la pelea. Antes de cargar, mira dónde acabarás y quién puede seguirte. Incluso acertar al Tank rival puede ser malo si lo llevas junto a sus supports y tú quedas fuera de visión.',
          'Charge también sirve para volver, cancelar desplazamientos o castigar a alguien ya controlado. No necesita ser la apertura de cada engage.',
        ],
      },
      {
        title: 'Earthshatter se construye con presión',
        paragraphs: [
          'No mires solo al Reinhardt rival. Observa barreras, Suzu, movilidad y esquinas. A veces el Shatter correcto golpea a dos objetivos laterales mientras el otro Tank sigue de pie. Si esas dos bajas ganan la pelea, ha sido suficiente.',
          'Amenazar con martillo y amagos obliga al rival a reaccionar. Lanzar Shatter desde lejos sin haber forzado nada facilita la respuesta. Acércate con recursos y úsalo cuando la pantalla rival ya tenga otra decisión pendiente.',
        ],
      },
    ],
    vodQuestions: ['¿Cuál era la siguiente cobertura que quería tomar?', '¿Gasté escudo antes de empezar el cruce?', '¿Mis supports tenían visión cuando avancé?', '¿Dónde terminaba mi Charge?', '¿Qué recurso podía bloquear o limpiar Earthshatter?'],
    checklist: ['Marco una ruta por coberturas.', 'Espero a que el equipo esté a distancia de seguir.', 'Recupero barrera cuando la esquina me protege.', 'Uso Charge con un final previsto.', 'No necesito golpear a cinco con Earthshatter.'],
    faqs: [
      { question: '¿Cuándo debo bajar el escudo?', answer: 'Cuando la cobertura ya te protege, el daño no amenaza una baja o necesitas regenerarlo para el siguiente cruce. El escudo guardado también crea presión.' },
      { question: '¿Cómo sé si debo avanzar?', answer: 'Comprueba que tus supports tienen visión, que tu equipo está cerca y que el rival ha gastado parte de su presión. Avanza hacia una cobertura concreta.' },
      { question: '¿Cuándo uso Charge?', answer: 'Cuando el recorrido es corto, el final es seguro y tu equipo puede aprovecharlo. Evita cruzar toda la pelea sin línea de curación.' },
    ],
    links: [
      { href: '/heroes/reinhardt', label: 'Guía completa de Reinhardt' },
      { href: '/counters/reinhardt', label: 'Counters de Reinhardt' },
      { href: '/team-comps/reinhardt', label: 'Composiciones con Reinhardt' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Brawl, dive y poke' },
      { href: '/roles/tank', label: 'Fundamentos de Tank' },
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
    quickAnswer: 'D.Va debe estar donde su movilidad cambie la pelea: expulsando a un DPS del high ground, acompañando un dive corto o volviendo a proteger a sus supports. Defense Matrix se usa en ráfagas para negar el recurso importante; mantenerla contra daño pequeño te deja sin respuesta cuando llega la granada, el Sleep o el burst real.',
    intro: [
      'D.Va puede hacer muchas cosas y por eso es fácil hacer la incorrecta. Si persigues cada objetivo, tu backline queda abierta; si solo haces peel, el rival conserva todas las alturas. La decisión central es saber qué zona necesita tu presencia ahora.',
      'Su fortaleza es cambiar de trabajo rápido. Puedes iniciar presión, forzar al rival a moverse y regresar antes de que el flanker complete su engage, pero solo si Boosters y Matrix no se gastan sin plan.',
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
          'Usa pulsaciones cortas para comerte proyectiles importantes y cortar burst sobre un aliado. Granada de Ana, Sleep Dart, disparos durante un engage o una ultimate canalizada tienen prioridad sobre el poke que tus compañeros pueden esquivar.',
          'Colócate de modo que Matrix cruce la línea entre el rival y el objetivo protegido. Mirar al enemigo no basta si el cono no cubre a tu support. Y recuerda que no niega rayos ni ataques cuerpo a cuerpo: contra ellos necesitas distancia, armadura y cobertura.',
        ],
      },
      {
        title: 'Decide entre dive y peel antes del salto rival',
        paragraphs: [
          'Si tu Winston entra y el rival también salta sobre Ana, no puedes hacer las dos cosas a la vez. Decide qué pelea es ganable. Acompañar el dive tiene sentido si podéis cerrar una baja antes; volver tiene sentido si negar la entrada deja al rival sin salida.',
          'La comunicación puede ser mínima: marca el objetivo o avisa de que vuelves. Cambiar de dirección a mitad de Boosters sin que nadie entienda tu plan suele dejar ambos frentes sin apoyo.',
        ],
      },
      {
        title: 'Self-Destruct crea espacio además de bajas',
        paragraphs: [
          'Una bomba útil puede sacar al rival del punto, dividir una defensa o darte un segundo mech. Lánzala donde obligue a abandonar cobertura, no solo hacia arriba sin mirar rutas de escape.',
          'Si estás a punto de perder el mech, comprueba si puedes usar la explosión para mantener presencia. Pero no regales toda tu armadura buscando una bomba de emergencia; a veces conservar el Tank y seguir controlando altura vale más.',
        ],
      },
    ],
    vodQuestions: ['¿Qué posición quería disputar con Boosters?', '¿Perseguí después de haber ganado ya el espacio?', '¿Qué habilidad importante negó Matrix?', '¿Mi equipo necesitaba dive o peel en esa pelea?', '¿La bomba obligaba a moverse a alguien?'],
    checklist: ['Sé qué high ground debo controlar.', 'Boosters termina junto a cobertura.', 'Guardo Matrix para un recurso concreto.', 'No persigo cuando el objetivo ya cedió espacio.', 'Elijo dive o peel según la condición de victoria.'],
    faqs: [
      { question: '¿Cuándo debo hacer peel con D.Va?', answer: 'Cuando negar el engage rival protege la condición de victoria o deja al atacante sin salida. No vuelvas por cada punto de daño si tu equipo puede sostenerse.' },
      { question: '¿Qué debo negar con Defense Matrix?', answer: 'Prioriza cooldowns y burst decisivos: granadas, Sleep Dart, proyectiles de ultimate y daño concentrado sobre un aliado comprometido.' },
      { question: '¿Tengo que matar al DPS del high ground?', answer: 'No. Obligarle a abandonar el ángulo ya crea espacio. Persíguelo solo si la baja es segura y no abandonas una zona más importante.' },
    ],
    links: [
      { href: '/heroes/dva', label: 'Guía completa de D.Va' },
      { href: '/counters/dva', label: 'Counters de D.Va' },
      { href: '/team-comps/dva', label: 'Composiciones con D.Va' },
      { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Cómo revisar cooldowns' },
      { href: '/heroes/winston', label: 'Comparar con Winston' },
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
    quickAnswer: 'Winston entra bien cuando llega con armadura, sabe dónde aterrizar y su equipo puede presionar el mismo sector. Salta a una cobertura o high ground cercano, no necesariamente encima del objetivo. Coloca la burbuja para cortar curación y cooldowns mientras conservas una salida.',
    intro: [
      'Un salto espectacular no es un buen engage si aterrizas sin apoyo y delante de cinco jugadores. Winston necesita preparar la pelea: reconocer una backline alcanzable, acercarse sin perder armadura y esperar la presión que impide al rival mirarle gratis.',
      'En ranked puedes coordinarlo con señales simples. Un ping al objetivo y una cuenta corta suelen bastar. Lo importante es que tus compañeros sepan qué zona vas a ocupar y cuándo deben mirar allí.',
    ],
    sections: [
      {
        title: 'Acércate antes de gastar Jump Pack',
        paragraphs: [
          'Usa pasillos, payload, esquinas y high ground para recortar distancia. Si saltas desde la otra punta del mapa, el rival ve la trayectoria, tus DPS no tienen ángulo y Jump Pack tardará más en volver. Una entrada desde cerca permite reservar el salto para perseguir o salir.',
          'Mantén la armadura durante la preparación. Recibir poke hasta media vida y saltar igualmente obliga a gastar burbuja en supervivencia, no en aislar al objetivo.',
        ],
      },
      {
        title: 'Aterriza en una zona que puedas sostener',
        paragraphs: [
          'No apuntes siempre al cuerpo del support. Un borde alto, una esquina detrás de él o una plataforma lateral puede darte daño sin quedar rodeado. Desde ahí obligas a girar la cámara y eliges si bajar o esperar el siguiente salto.',
          'Mira los cooldowns de escape. Perseguir a Kiriko con Swift Step o Moira con Fade suele alargar un dive malo. Forzar la movilidad y cambiar a un objetivo cercano puede ser la mejor continuación.',
        ],
      },
      {
        title: 'La burbuja corta relaciones',
        paragraphs: [
          'Barrier Projector no solo absorbe daño: separa al Tank de sus supports, bloquea Sleep Dart y obliga al rival a entrar o salir. Colócala entre las líneas enemigas cuando puedas, en vez de dejarla siempre centrada sobre ti.',
          'Baila alrededor del borde para alternar protección y daño. Si sales de la burbuja persiguiendo, pierdes la ventaja que acabas de crear. Espera a que Jump Pack vuelva o a que el objetivo gaste su salida.',
        ],
      },
      {
        title: 'Primal Rage debe tener un destino',
        paragraphs: [
          'Antes de activarla, decide si quieres sobrevivir, sacar a alguien del mapa, separar un support o mantener al rival lejos del objetivo. Golpear sin dirección puede curar ultimates enemigas y alejar al objetivo de tus DPS.',
          'Usa paredes y esquinas para limitar el movimiento. En espacios abiertos, prioriza desplazamiento y control del punto. La ejecución mecánica mejora con práctica, pero el objetivo de la ultimate debe estar claro desde el principio.',
        ],
      },
    ],
    vodQuestions: ['¿Podía acercarme sin usar Jump Pack?', '¿Aterrizaba en cobertura o en medio del equipo?', '¿Qué línea cortó mi burbuja?', '¿Perseguí a un objetivo con movilidad disponible?', '¿Qué quería conseguir con Primal Rage?'],
    checklist: ['Entro con armadura y una ruta de salida.', 'Marco el sector del dive.', 'Aterrizo cerca de cobertura.', 'La burbuja bloquea curación o un cooldown.', 'Primal tiene un objetivo concreto.'],
    faqs: [
      { question: '¿Sobre quién debe saltar Winston?', answer: 'Sobre objetivos alcanzables que pierdan apoyo dentro de la burbuja. A veces conviene ocupar el high ground antes que aterrizar directamente encima de un support.' },
      { question: '¿Cuándo coloco la burbuja?', answer: 'Cuando corta curación, bloquea un cooldown peligroso o te permite sostener la posición hasta recuperar Jump Pack. No la gastes durante la aproximación fácil.' },
      { question: '¿Qué hago si el rival tiene counters?', answer: 'Acorta los engages, fuerza sus cooldowns y cambia el objetivo. Si varios héroes dedican todos sus recursos a frenarte, tu equipo puede aprovechar esa atención.' },
    ],
    links: [
      { href: '/heroes/winston', label: 'Guía completa de Winston' },
      { href: '/counters/winston', label: 'Counters de Winston' },
      { href: '/team-comps/winston', label: 'Composiciones con Winston' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Cómo jugar dive' },
      { href: '/heroes/dva', label: 'Sinergia con D.Va' },
    ],
  },
]

export function getRankedHeroGuide(slug: string) {
  return guides.find(guide => guide.slug === slug) ?? null
}

export const rankedHeroGuides = guides
