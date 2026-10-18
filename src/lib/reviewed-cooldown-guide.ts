import type { EvergreenGuide } from './evergreen-guides'

export const reviewedCooldownGuide: EvergreenGuide = {
  slug: 'como-revisar-cooldowns-overwatch',
  title: 'Cómo revisar tus cooldowns en Overwatch',
  seoTitle: 'Cómo revisar cooldowns en Overwatch: cuándo usarlos o guardarlos',
  seoDescription: 'Revisa Suzu, Sleep, Matrix y Dash en tu VOD: qué resolvió cada habilidad, qué alternativa tenías y cuándo guardarla también fue un error.',
  h1: 'Cómo revisar tus cooldowns en Overwatch sin juzgar solo el resultado',
  kicker: 'Habilidades y revisión de VOD',
  publishedAtIso: '2026-06-21',
  modifiedAtIso: '2026-10-18',
  updatedAt: '18 de octubre de 2026',
  quickAnswer: 'Pausa antes de usar la habilidad y comprueba qué veías, qué querías conseguir y qué otra opción tenías. Después mira qué cambió. Un cooldown puede estar bien usado aunque mueras más tarde; también puedes perder una pelea por guardarlo cuando hacía falta. Compara dos situaciones parecidas antes de convertir un fallo en una regla.',
  intro: [
    'Si Kiriko gasta Suzu y Ana acierta una granada después, es tentador concluir que había que guardarla. Pero falta una pregunta: ¿el compañero habría sobrevivido sin la primera Suzu? La VOD permite ver ambas jugadas; durante la partida solo conocías lo que estaba ocurriendo en ese momento.',
    'Revisar cooldowns sirve para distinguir una decisión arriesgada, un fallo de ejecución y una situación que ya estaba perdida. No necesitas terminar la partida con todos los botones disponibles ni recordar el tiempo de recarga de cada héroe.',
  ],
  sections: [
    {
      title: 'Una habilidad no tiene que reservarse para una emergencia',
      body: [
        'Puedes gastar un cooldown para salvar, abrir una oportunidad o cambiar de posición. Una granada ofensiva de Ana puede obligar al rival a retirarse; Boosters puede permitir que D.Va dispute una altura. Que nadie estuviera a punto de morir no convierte esos usos en un error.',
        'Lo que necesitas revisar es si había una oportunidad que pudieras aprovechar. Dormir a un enemigo lejos del equipo puede no producir una baja, pero sí interrumpir una entrada o darte tiempo para salir. En cambio, acertar Sleep por unos puntos de daño y quedarte después sin cobertura quizá no compense. Mira la situación completa, no solo la animación del acierto.',
      ],
    },
    {
      title: 'Pausa antes del botón, no siempre cinco segundos antes de morir',
      body: [
        'Empieza por una muerte o una pelea que te genere dudas y retrocede hasta la decisión. A veces basta con mirar el disparo anterior; otras tendrás que volver a la rotación con la que perdiste la línea de curación. Cinco segundos son una referencia para buscar el momento, no un límite del análisis.',
        'Reproduce primero desde tu cámara y con tu HUD. Apunta lo que podías ver u oír antes de consultar la posición de los cinco rivales. Luego cambia de cámara para entender lo que pasó. Descubrir que Genji esperaba detrás de una pared no demuestra que tuvieras esa información cuando gastaste Sleep.',
      ],
      bullets: [
        'Qué querías conseguir: una baja, un cruce, una retirada o salvar a alguien.',
        'Qué información tenías: daño recibido, aliados a la vista, sonido de una ultimate o un aviso del equipo.',
        'Qué alternativa era posible desde esa posición: esperar, usar cobertura, disparar o pedir ayuda.',
        'Qué cambió después: posición ganada, compañero salvado, recurso rival forzado o una salida que perdiste.',
      ],
    },
    {
      title: 'Kiriko: Suzu puede estar bien usada antes del anti',
      body: [
        'Imagina a vuestro Tank cruzando una calle con poca vida mientras tú recargas y el otro Support no tiene visión. Si Suzu permite alcanzar una esquina, guardarla para una posible granada de Ana puede costar la pelea antes de que llegue ese anti. No decidas por una cantidad fija de vida perdida: mira el daño que está entrando y las otras formas de ayudar.',
        'El caso cambia si el Tank ya está a salvo y puedes seguir curándolo con ofudas. Gastar Suzu ahí puede dejar menos respuestas para el siguiente contacto. Si el anti llega después, revisa también si el compañero podía taparse: limpiar no es la única salida. Y si usaste Swift Step para acercarte, comprueba dónde terminaste; tener Suzu no hace seguro cualquier TP.',
      ],
    },
    {
      title: 'Ana: separa el Sleep mal elegido del Sleep fallado',
      body: [
        'Una Tracer entra sobre ti, tienes una pared cerca y otro aliado puede ayudarte. Buscar Sleep puede ser una respuesta razonable aunque falles el tiro. Revisa la puntería y la salida que conservabas, sin concluir que debías haberlo guardado. Si intentaste acertarlo cruzando sola hacia la Tracer, el riesgo empieza antes del disparo.',
        'Tampoco tienes que reservarlo toda la ronda por una posible Blade. Si Genji está lejos y un Tank se ha comprometido en una entrada que podéis castigar, Sleep puede abrir una oportunidad. Después de usarlo, adapta tu posición mientras vuelve. En King’s Row, quedarte en la misma puerta tras enseñar la habilidad puede ser más importante que haber elegido al Tank como objetivo.',
      ],
    },
    {
      title: 'D.Va: revisa el recurso de Matrix y el destino de Boosters',
      body: [
        'Matrix tiene un recurso que gestionas, no solo un botón que está listo o gastado. Mira cuánto conservabas y hacia dónde la orientaste. Usarla contra disparos de presión puede permitir que un Support cruce sin perder vida; mantenerla hacia una pared cuando tu compañero ya está cubierto quizá no cambie nada. Si una granada pasa por otro ángulo, comprueba si estabas mirando esa línea y si podía entrar en el área que cubrías.',
        'El disparo principal de Tesla y el haz de Zarya no se frenan con Matrix. No anotes «me faltó más Matrix» para ese daño. Con Boosters, revisa la llegada y el regreso: en el hangar de Gibraltar, subir a expulsar a un tirador puede dar espacio aunque no lo mates. Si después vuelas detrás de él y dejas a Ana sin ayuda, esa persecución es otra decisión, no una prueba de que nunca debías haber subido.',
      ],
    },
    {
      title: 'Genji: gastar Dash para entrar no siempre es apostar a un reset',
      body: [
        'Dash puede servir para llegar a una posición desde la que aún puedas jugar una esquina, trepar o recibir ayuda. Es distinto de atravesar al equipo rival y necesitar una eliminación para recuperar la salida. Antes de juzgar la entrada, mira dónde terminaste y qué podían hacer tus compañeros desde allí.',
        'Las eliminaciones reinician Swift Strike, pero no puedes dar por hecho que llegará una. Los perks también pueden cambiar la recuperación: Swift Cuts permite reducirla con melee. Comprueba la elección y el HUD de esa partida en lugar de aplicar un cronómetro de otra versión. No uses poderes de Stadium para explicar un Dash de una partida normal.',
      ],
    },
    {
      title: 'Revisa también la habilidad que no usaste',
      body: [
        'Busca una pelea en la que conservaras el recurso y aun así el equipo no pudiera actuar. Quizá Ana tuvo una granada disponible mientras varios enemigos cruzaban juntos por la línea de tiro de un DPS aliado. Quizá D.Va esperó una ultimate y no ayudó a un compañero que recibía daño normal. Esas situaciones no prueban por sí solas que hubiera que pulsar el botón: comprueba la trayectoria, el seguimiento y la respuesta que podía dar el rival.',
        'El reloj también importa. En overtime, gastar movilidad para tocar puede ser la única manera de seguir disputando, aunque no haya una retirada segura. Pregunta si existía relevo y si llegabais a tiempo. Una regla como «nunca entro sin salida» deja de ser útil si aplicarla significa perder el objetivo sin intentarlo.',
      ],
    },
    {
      title: 'Cuenta lo que has visto, no cooldowns que estás adivinando',
      body: [
        'Para tus propias habilidades, usa el HUD del momento que revisas. Para las rivales, parte de lo que viste salir y de los avisos del equipo. «Ana usó Sleep en el último cruce» es información; «seguro que todavía no lo tiene» puede ser una suposición si ha pasado otra rotación.',
        'No necesitas controlar todos los botones enemigos. Elige la respuesta que condiciona tu siguiente acción: el Sleep que puede cortar tu entrada, la movilidad que permite escapar a tu objetivo o la defensa que impediría el daño. Si no sabes si sigue disponible, prepara una entrada que puedas cancelar o una forma de comprobarlo sin gastar toda tu salida.',
      ],
    },
    {
      title: 'Compara dos usos y elige una corrección que puedas reconocer jugando',
      body: [
        'En el cuaderno de VOD, guarda un momento en el que el cooldown cumplió su función y otro en el que dudaste. Intenta comparar la misma habilidad ante una amenaza parecida, no una Suzu defensiva en una pelea completa con otra usada para tocar en overtime. Anota el minuto del replay, tu posición, lo que sabías y la alternativa que podrías haber ejecutado.',
        'Una nota útil sería: «Después del primer Sleep, roté hacia la pared que podía cubrir Brigitte; en el segundo me quedé en la puerta». La prueba para la siguiente partida es comprobar esa salida cuando gastes Sleep. Si la corrección te hace abandonar una buena posición sin motivo, ajústala. No te impongas esperar medio segundo en todas las habilidades ni demostrar un patrón con un número fijo de partidas.',
        'Al volver a revisar, mira si resolviste el problema sin crear otro. Conservar Suzu no es mejorar si ahora dejas morir al Tank para tenerla lista; sobrevivir detrás de dos paredes tampoco ayuda si ya no puedes curar. Elige la decisión que quieres cambiar y comprueba su efecto en una situación comparable.',
      ],
    },
  ],
  checklist: [
    'Encuentro el momento de la decisión, aunque sea anterior al último cruce.',
    'Anoto lo que sabía desde mi cámara antes de mirar a los rivales.',
    'Distingo el objetivo del cooldown de si acerté su ejecución.',
    'Compruebo mi alternativa: cobertura, disparo, espera o ayuda disponible.',
    'Comparo un uso con una situación parecida en la que lo guardé o lo usé de otra forma.',
    'Pruebo una corrección concreta y reviso si también me está haciendo perder oportunidades.',
  ],
  faqs: [
    { question: '¿Tengo que guardar siempre mis cooldowns defensivos?', answer: 'No. Guardarlos tiene sentido ante una amenaza concreta, pero puedes necesitarlos antes para salvar a alguien o completar un cruce. Revisa qué habría pasado sin usarlos y qué otra respuesta tenías. Terminar con todos disponibles no demuestra que hayas jugado bien.' },
    { question: '¿Morir después de usar una habilidad significa que la gasté mal?', answer: 'No necesariamente. Puede haber evitado una baja, permitido tocar el objetivo o ganado tiempo para el equipo. Separa esa función de la decisión posterior: quedarte expuesto, perseguir o volver a cruzar. También puede haber un fallo de ejecución dentro de una respuesta bien elegida.' },
    { question: '¿Siempre debo pausar cinco segundos antes de morir?', answer: 'No. Retrocede hasta la decisión que quieras entender. Puede estar en el intercambio anterior o en la rotación con la que perdiste ayuda. Empieza desde tu cámara para no atribuirte información que solo has descubierto al revisar la repetición.' },
    { question: '¿Cómo cuento los cooldowns rivales?', answer: 'Empieza por la habilidad que condiciona tu siguiente entrada y por lo que has visto o te han comunicado. Si no sabes si ya volvió, conserva una forma de retirarte o fuerza una respuesta antes de comprometerte. No hace falta llevar un cronómetro de todo el equipo rival.' },
    { question: '¿Qué diferencia hay entre Matrix y un cooldown normal?', answer: 'Además de cuándo la activas, importa el recurso que conservas y la orientación. Mira qué proyectil podía interceptar realmente. No bloquea el principal de Tesla ni el haz de Zarya, así que gastar más recurso no corrige esos dos ataques.' },
    { question: '¿Sirve el mismo análisis para Stadium y para partidas normales?', answer: 'Puedes comparar intención, posición y resultado en ambos, pero las habilidades y sus mejoras pueden ser distintas. Revisa el HUD y las elecciones de esa partida. No expliques un tiempo de recuperación normal con un poder de Stadium ni presupongas que todos llevan el mismo perk.' },
  ],
  links: [
    { href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: 'Comparar dos usos en el cuaderno de VOD' },
    { href: '/heroes/kiriko', label: 'Suzu y Swift Step con Kiriko' },
    { href: '/heroes/ana', label: 'Sleep y posición con Ana' },
    { href: '/heroes/dva', label: 'Matrix y desplazamientos con D.Va' },
    { href: '/heroes/genji', label: 'Entradas y salidas con Genji' },
    { href: '/maps/watchpoint-gibraltar', label: 'Alturas del hangar de Gibraltar' },
    { href: '/maps/kings-row', label: 'Esquinas y rutas de King’s Row' },
    { href: '/guides/como-usar-ultimates-overwatch', label: 'Revisar una ultimate y su seguimiento' },
  ],
}
