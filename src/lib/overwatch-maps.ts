import { CONTROL_MAP_PILLARS } from './overwatch-control-maps'
import { ESCORT_MAP_PILLARS } from './overwatch-escort-maps'
import { FLASHPOINT_MAP_PILLARS } from './overwatch-flashpoint-maps'
import { HYBRID_MAP_PILLARS } from './overwatch-hybrid-maps'
import { PUSH_MAP_PILLARS } from './overwatch-push-maps'

export type MapRole = 'tank' | 'dps' | 'support'

export type MapPillar = {
  slug: string
  name: string
  mode: string
  location: string
  image: string
  imageAlt: string
  seoTitle: string
  seoDescription: string
  publishedAtIso?: string
  updatedAtIso: string
  updatedAt: string
  intro: string[]
  quickRead: { title: string; body: string }[]
  phases: { name: string; attack: string; defense: string; vodReview: string }[]
  attackPlan: { title: string; body: string }[]
  defensePlan: { title: string; body: string }[]
  heroPicks: { name: string; slug: string; role: MapRole; reason: string }[]
  compositions: { name: string; lineup: string[]; plan: string; weakness: string }[]
  mistakes: string[]
  vodChecklist: string[]
  faq: { question: string; answer: string }[]
  conclusion?: string
  relatedLinks: { href: string; label: string }[]
}

export const MAP_PILLARS: MapPillar[] = [
  ...CONTROL_MAP_PILLARS,
  ...ESCORT_MAP_PILLARS,
  ...FLASHPOINT_MAP_PILLARS,
  ...HYBRID_MAP_PILLARS,
  ...PUSH_MAP_PILLARS,
  {
    slug: 'neon-junction',
    name: 'Neon Junction',
    mode: 'Híbrido',
    location: 'Tokio, Japón',
    image: '/maps/neon-junction.png',
    imageAlt: 'Calles iluminadas y edificios de Neon Junction en Overwatch',
    seoTitle: 'Neon Junction: cómo atacar, defender y cruzar el tren',
    seoDescription: 'Prepara la captura y la escolta de Neon Junction: cruza la zona del tren, reparte los laterales y decide cuándo tocar o guardar recursos. Con planes de equipo.',
    updatedAtIso: '2026-10-19',
    updatedAt: '19 de octubre de 2026',
    intro: [
      'En Neon Junction, prepara una entrada que tu equipo pueda seguir y comprueba quién se queda atendiendo el objetivo. Primero capturas la zona inicial; después escoltas a ANDROMEDA III por las calles de Tokio hasta el teatro Zuiko-za. Ganar un duelo en un callejón no sirve de mucho si la carga se queda parada o tus Supports pierden de vista al frente al doblar la esquina.',
      'El segundo sector tiene bastante juego a ras de suelo, una plataforma de tren y una curva en pendiente antes del punto. No necesitas cambiar a dive en cuanto capturas ni llevar siempre un héroe con movilidad vertical. Mira qué posición rival os está frenando, desde dónde podéis disputarla y quién puede ayudaros al cruzar. El tren también importa: comprueba por dónde pasa antes de seguir un duelo a través de la vía.',
    ],
    quickRead: [
      { title: 'Quién toca y quién lo cubre', body: 'Con tiempo, puedes preparar otro ángulo antes de entrar. Si debes disputar ya, acuerda quién toca y desde dónde lo ayudaréis; no pierdas el objetivo esperando una entrada perfecta.' },
      { title: 'Mira la vía antes de cruzar', body: 'El tren atraviesa parte del recorrido. Comprueba si se acerca y qué cobertura tendrás al otro lado, en vez de seguir mirando al rival mientras cruzas.' },
      { title: 'La escolta no exige cambiar de héroe', body: 'Si seguís llegando a una buena posición, conservad el plan. Cambiad si una distancia, un lateral o la presión sobre vuestros Supports os impide participar, no solo porque habéis capturado.' },
    ],
    phases: [
      {
        name: 'Captura inicial',
        attack: 'Antes de salir, localiza la posición que dispara a vuestra entrada y la cobertura a la que quieres llegar. Un DPS puede enseñar un lateral mientras el Tank amenaza el acceso principal, siempre que ambos puedan participar en la misma pelea. Si la defensa abandona el punto para conteneros, tocar puede obligarla a volver. Con el reloj agotándose, decide quién disputa y quién lo cubre: rodear otro edificio quizá ya no sea una opción.',
        defense: 'Elige qué acceso puedes vigilar sin perder la vuelta al punto. Si Tracer se retira por un callejón, no hace falta que dos jugadores la sigan y dejen pasar al Tank. Puedes mantener tiro sobre la entrada mientras otro compañero atiende el lateral. Si debes retroceder, comprueba que alguien pueda disputar antes de ceder también la captura; no confundas retirarte con abandonar el objetivo sin avisar.',
        vodReview: 'Pausa antes del primer cruce. ¿Quién podía seguir al Tank y quién vigilaba el punto? Compara una entrada con tiempo para preparar el lateral y otra en la que había que tocar ya.',
      },
      {
        name: 'Tren y curva hacia el segundo punto',
        attack: 'La plataforma del tren puede ofrecer una línea sobre la calle, pero buena parte del intercambio ocurre en el suelo. Decide si necesitas echar a quien dispara desde allí o si podéis avanzar con otra cobertura. Al llegar a la curva en pendiente, comprueba que tus Supports también puedan girar. Ganar el duelo de delante y doblar solo puede dejarte sin ayuda justo cuando vuelve la defensa.',
        defense: 'Desde la plataforma, mira dónde termina realmente tu línea de tiro antes de decidir quedarte. La curva y las coberturas próximas al punto pueden impedir que sigas disparando a la carga. Si el ataque ya ha pasado tu ángulo, rota a una posición desde la que puedas volver a participar. Al cruzar la vía, atiende al tren y a la salida que deja libre; no intentes terminar primero un duelo que puedes continuar desde cobertura.',
        vodReview: 'Revisa el momento en que la carga gira. ¿Quién seguía teniendo tiro o curación y quién se quedó al otro lado? Si alguien cayó al cruzar la vía, comprueba qué información tenía sobre el tren.',
      },
      {
        name: 'Acceso a Zuiko-za',
        attack: 'Al acercarte a Zuiko-za, distingue abrir una pelea de completar el último avance. Si la defensa puede volver a tocar, alguien tendrá que mantener la carga mientras otros impiden que se acerque. Usa la ultimate que responda a esa situación: no hay una cantidad fija que debas gastar o guardar. Joyride puede servir para disputar o presionar una entrada, pero Shion sigue necesitando que sus compañeros puedan aprovechar lo que obligue a hacer al rival.',
        defense: 'Decide quién puede tocar y quién tendrá tiro sobre el jugador que escolta. Salir todos sobre la carga facilita que el ataque concentre daño; tampoco sirve preparar un flanco que llega después de perder. Si un compañero compra unos segundos, utilízalos para llegar con ayuda, no para repetir una entrada aislada desde el mismo sitio.',
        vodReview: 'Compara la primera disputa del tramo final y la última. ¿Qué necesitaba cada una: una baja, sobrevivir unos segundos o mantener la carga en movimiento? Juzga las ultimates según esa necesidad, no solo por las eliminaciones.',
      },
    ],
    attackPlan: [
      { title: 'Llegad al mismo intercambio', body: 'Si Tracer tarda en preparar el callejón, Winston puede esperar desde cobertura o elegir otro intento. Saltar mientras ella todavía cruza el mapa divide el daño y la ayuda.' },
      { title: 'No esperes siempre otro cooldown', body: 'Forzar una defensiva puede facilitar el engage. Pero si el rival ya ha dejado una posición accesible o el punto exige tocar, actúa sobre esa oportunidad en vez de seguir esperando una señal concreta.' },
      { title: 'Comprueba quién empuja', body: 'Tras ganar el primer intercambio, deja a alguien atendiendo la carga y prepara la curva siguiente sin perderlo de vista. Si cuatro perseguís una baja que no retrasa la defensa, podéis acabar con la carga parada y sin posiciones.' },
      { title: 'Cambia para resolver algo', body: 'Si el problema es llegar juntos a la curva, otro héroe no sustituye la rotación. Si nadie puede contestar una plataforma que os dispara libremente, entonces sí puede tener sentido cambiar una herramienta del equipo.' },
    ],
    defensePlan: [
      { title: 'Retírate hacia la próxima disputa', body: 'Desde tu cobertura, identifica dónde volverás a disparar si la carga gira. Retroceder a un callejón sin visión puede mantenerte vivo y aun así dejar al equipo sin tu ayuda.' },
      { title: 'Ayuda sin vaciar el frente', body: 'Si Shion entra sobre Ana por un lateral, comprueba quién puede intervenir desde su posición. No mandes a medio equipo a perseguirlo mientras el ataque cruza la calle sin oposición.' },
      { title: 'Valora la pelea que queda', body: 'Con dos aliados volviendo, quizá puedas ceder una esquina y preparar su llegada. Si la carga está a punto de completar el tramo, habrá que organizar una disputa antes. La misma retirada no sirve en ambos momentos.' },
      { title: 'Avisa quién va a tocar', body: 'Quien llegue primero a la carga debe saber desde dónde recibirá ayuda. Si toca y obliga al ataque a girarse, el resto necesita aprovecharlo antes de que ese compañero caiga.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede contestar la plataforma y volver hacia sus Supports. Elige qué proyectiles cubrir con Matrix durante el cruce; no puede proteger a la vez todos los ángulos de la calle.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Puede alcanzar una posición desde la que el rival sostiene la defensa. Antes de saltar, comprueba si Ana verá el destino y si los DPS ya están en condiciones de seguir.' },
      { name: 'Shion', slug: 'shion', role: 'dps', reason: 'Puede amenazar un acceso lateral o acompañar la entrada de Winston. Evade no convierte cualquier callejón en una salida segura: mira dónde terminas y quién puede ayudarte después.' },
      { name: 'Tracer', slug: 'tracer', role: 'dps', reason: 'Puede presionar al compañero que sostiene una esquina desde otro lado. Si la defensa cede, ocupa un ángulo útil para la carga en vez de perseguir hasta perder la siguiente pelea.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Puede atender al frente desde una cobertura anterior, pero la curva corta esa ayuda si rota tarde. Prepara el siguiente sitio desde el que curar antes de que Winston o la carga desaparezcan de tu línea.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Puede corregir una separación con Swift Step y responder a una amenaza con Suzu. Comprueba dónde acabará el teletransporte: llegar a un aliado al otro lado de la curva no garantiza que ambos podáis salir.' },
    ],
    compositions: [
      {
        name: 'Dive móvil',
        lineup: ['Winston', 'Tracer', 'Shion', 'Ana', 'Kiriko'],
        plan: 'Winston elige el destino del salto cuando Tracer y Shion pueden participar. Ana busca una cobertura con tiro al aterrizaje; Kiriko decide si atiende el frente o conserva ayuda sobre Ana. Si desplazáis a la defensa, comprobad quién puede escoltar mientras el resto prepara la curva.',
        weakness: 'Si Winston dobla la esquina antes de que Ana pueda rotar, el Tank puede quedarse sin curación aunque los DPS hayan llegado bien. También puede fallar si Tracer y Shion abren dos callejones que nadie del equipo puede atender a la vez.',
      },
      {
        name: 'Brawl flexible',
        lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
        plan: 'Aprovechad el recorrido a ras de suelo para avanzar de una cobertura a otra. Lúcio prepara el cruce, Reinhardt disputa cerca y Mei usa el muro sin separar a sus Supports. Cassidy mantiene tiro sobre un lateral próximo mientras Kiriko atiende una amenaza concreta, no todo el daño por costumbre.',
        weakness: 'Si la plataforma os dispara sin respuesta, caminar más deprisa por la misma línea quizá solo acelere la muerte. Necesitáis cobertura, otro ángulo o una sustitución que resuelva esa posición. El muro también puede perjudicaros si tapa la curación al llegar a la curva.',
      },
    ],
    mistakes: [
      'Cruzar la vía mirando un duelo y no el tren que se aproxima.',
      'Doblar la curva sin comprobar si el Support también puede hacerlo.',
      'Ganar un lateral y olvidar quién mantiene la carga en movimiento.',
      'Esperar siempre otro cooldown mientras se pierde el punto sin disputa.',
      'Juzgar una ultimate solo por sus bajas, aunque haya permitido completar o negar el último avance.',
    ],
    vodChecklist: [
      '¿Qué información tenías sobre el tren antes de cruzar la vía?',
      '¿Desde dónde podía ayudarte el Support después de la curva?',
      '¿El lateral te daba tiro a la pelea o te alejaba de ella?',
      '¿Quién empujó durante el tiempo ganado con la primera baja?',
      '¿Tocar antes habría cambiado algo o te habría dejado sin ayuda?',
      '¿Qué necesitaba la última disputa y cómo contribuyó cada ultimate?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Neon Junction?', answer: 'Es un mapa híbrido de Tokio: primero se captura una zona y después se escolta a ANDROMEDA III hasta Zuiko-za. Separa esas fases al revisar una partida; ganar la captura no decide quién empujará ni desde dónde recibirás ayuda al comenzar la escolta.' },
      { question: '¿Hay que jugar dive en Neon Junction?', answer: 'No. Winston y D.Va pueden contestar posiciones que frenan al equipo, pero parte del segundo sector permite jugar cerca del suelo. Un equipo con Reinhardt y Lúcio puede avanzar por coberturas si tiene respuesta al ángulo que le dispara. Elige según lo que os falta, no por una etiqueta del mapa.' },
      { question: '¿Tengo que limpiar un lateral antes de tocar el primer punto?', answer: 'No siempre. Con tiempo y una defensa bien colocada puede convenir preparar otra línea. Si la defensa se ha separado o hay que disputar ya, tocar con ayuda puede ser mejor. Acordad quién toca y quién mantiene tiro sobre él para que no se convierta en una entrada aislada.' },
      { question: '¿Qué debo mirar al cruzar la zona del tren?', answer: 'Comprueba si se aproxima el tren, qué cobertura hay al salir de la vía y si tus aliados cruzarán contigo. Un duelo que parece favorable puede dejar de serlo si el grupo acaba separado. No dependas de memorizar una cuenta para decidir si puedes cruzar ahora.' },
      { question: '¿Cómo reviso una VOD de Neon Junction?', answer: 'Compara dos intentos sobre el mismo tramo. Pausa antes de la entrada o del giro de la carga y anota quién podía ayudar, qué sabía cada jugador y cuánto tiempo quedaba. Después comprueba si ganar el duelo produjo avance o si faltó alguien que escoltara.' },
    ],
    conclusion: 'En la próxima partida, fíjate en una transición: la curva antes del segundo punto. Antes de doblarla, mira quién te puede ayudar y quién seguirá empujando. Después compara si llegaste con recursos a la siguiente pelea. Si el equipo quedó separado, prepara esa rotación antes de cambiar todos los picks o buscar otro callejón por el que entrar.',
    relatedLinks: [
      { href: '/heroes/shion', label: 'Entradas y salidas con Shion' },
      { href: '/team-comps/shion', label: 'Preparar la ayuda al flanco de Shion' },
      { href: '/guides/composiciones-overwatch-5v5-6v6', label: 'Repartir las tareas de la composición' },
      { href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: 'Comparar dos intentos en el cuaderno de VOD' },
      { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Decidir si hace falta cambiar de héroe' },
      { href: '/overwatch-temporada-3-into-the-tigers-den', label: 'El lanzamiento de Neon Junction en Season 3' },
    ],
  },
  {
    slug: 'kings-row',
    name: "King's Row",
    mode: 'Híbrido',
    location: 'Londres, Reino Unido',
    image: '/maps/kings-row.png',
    imageAlt: "Estatua y calles nocturnas de King's Row en Overwatch",
    seoTitle: "King's Row: hotel, calles y defensa del último punto",
    seoDescription: "Prepara el ataque y la defensa de King's Row: cuándo usar hotel, cómo escoltar por las calles y qué hacer en la última disputa. Equipos y preguntas para tu VOD.",
    updatedAtIso: '2026-10-19',
    updatedAt: '19 de octubre de 2026',
    intro: [
      "En King's Row, decide cómo cruzar la entrada del punto A antes de gastar la barrera. Hotel puede abrir otra línea sobre la estatua, pero su salida también puede estar vigilada. Tras capturar, cambia la tarea: alguien debe escoltar mientras el resto prepara la esquina siguiente sin alejarse de quien cura. Reinhardt encaja en esos cruces cortos; no es obligatorio si tu equipo puede disputar las posiciones de otra forma.",
      'El problema cambia entre calles y fundición. En calles, puedes ganar una pelea y aun así no avanzar porque nadie se quedó con la carga. En el último tramo, quizá tengas que usar una ultimate para mantener la disputa sin conseguir una baja. Revisa qué necesitaba cada momento antes de concluir que faltaba daño o que había que cambiar toda la composición.',
    ],
    quickRead: [
      { title: 'Hotel no es un atajo gratis', body: 'Comprueba la salida antes de meter al grupo. Si Mei puede separar al primero del resto, prepara ayuda desde la entrada principal o elige otro cruce.' },
      { title: 'Avisa quién empuja después de ganar', body: 'Puedes adelantarte para impedir que la defensa vuelva a colocarse, pero deja a alguien empujando y conserva una línea de ayuda. No hace falta perseguir hasta su spawn.' },
      { title: 'La última disputa depende del reloj', body: 'Con tiempo, prepara una entrada conjunta. Si la carga va a terminar, acuerda quién toca y cómo lo cubriréis; guardar una ultimate para después no evita perder ahora.' },
    ],
    phases: [
      {
        name: 'Punto A: hotel y estatua',
        attack: 'Desde la entrada, localiza quién dispara a la puerta y quién vigila la salida de hotel. Si Cassidy puede asomarse por hotel mientras Reinhardt amenaza el acceso principal, la defensa tendrá que atender dos líneas próximas. Si todos atravesáis hotel, comprobad que el primero no quede aislado por un muro. La estatua puede cortar parte del tiro mientras cambiáis de lado, pero no protege de todos los ángulos. Si el rival abandona el punto, tocar con ayuda puede obligarlo a volver: no necesitas esperar siempre a que gaste Suzu.',
        defense: 'Vigilar hotel no significa quedarse dentro esperando un duelo. Desde una posición con vuelta a la estatua puedes avisar del cruce y seguir ayudando al frente. Si el Tank atacante ya ha pasado, decide si puedes frenarlo desde cobertura o si debes volver al punto. Perseguir al DPS que se retira por hotel puede dejar una captura libre; retroceder todos demasiado pronto también. Mira quién puede disputar antes de abandonar la posición que tenías.',
        vodReview: 'Pausa antes de la salida de hotel y mira tu cámara, no solo la vista libre. ¿Sabías dónde estaba Mei? ¿Tu compañero podía ayudarte desde la puerta principal? Compara ese intento con otro por estatua y el tiempo que quedaba.',
      },
      {
        name: 'Calles y segundo tramo',
        attack: 'Al comenzar la escolta, acordad quién empuja antes de salir a buscar el siguiente duelo. El resto puede preparar la curva y vigilar los accesos elevados que miran la calle. Aunque Ana esté cerca, no podrá curar a Reinhardt si queda al otro lado de la curva: hay que preparar el giro de ambos. Tampoco hace falta limpiar todos los edificios. Disputa la posición que impide avanzar o usa cobertura para reducir su tiro; una persecución por un interior puede alejarte de la carga más de lo que parece.',
        defense: 'Elige una curva desde la que puedas disparar y volver si el ataque se acerca. Si un DPS ocupa una altura, comprueba quién puede ayudarlo cuando Winston salte sobre él. Al perder ese ángulo, rota hacia la siguiente disputa en vez de seguir disparando a una calle por la que la carga ya pasó. Ceder una esquina puede permitir reagruparse; si está a punto de alcanzarse el checkpoint, tendréis que valorar una disputa antes de que cambie el tramo.',
        vodReview: 'Busca una pelea ganada tras capturar A. ¿Cuánto avanzó la carga mientras preparabais la curva? Si alguien cayó después, comprueba si salió de la línea de Ana o si nadie había vigilado el acceso que lo atacó.',
      },
      {
        name: 'Fundición y tramo final',
        attack: 'En la fundición, mira los huecos junto al recorrido antes de terminar una Charge o perseguir a alguien que sale de la carga. El último avance puede exigir mantener vivo al jugador que escolta mientras otros frenan las salidas defensivas. Usa Blizzard, Nano o Kitsune según lo que falte en esa disputa, no por completar una combinación. Si una sola ultimate permite seguir empujando, quizá puedas guardar otra; si se acaba el tiempo, úsala cuando todavía pueda cambiar el intento.',
        defense: 'La posibilidad de volver desde spawn no garantiza otra pelea. Comprueba si llegas antes de que termine la escolta y desde dónde te pueden cubrir. D.Va puede ganar tiempo tocando mientras Cassidy dispara desde una esquina, pero si Cassidy está volviendo, ese toque tendrá otra utilidad y otro riesgo. No salgas por turnos por la misma puerta sin mirar qué posiciones mantiene el ataque. Puedes gastar una defensiva para conservar la disputa aunque no produzca eliminaciones.',
        vodReview: 'Separa el primer intento de frenar la carga del último. Anota quién podía llegar, qué tiro tenían sus aliados y si quedaba tiempo para reagruparse. No juzgues una ultimate por una siguiente pelea que ya no iba a existir.',
      },
    ],
    attackPlan: [
      { title: 'Prepara la salida de hotel', body: 'Si Mei rival vigila el acceso, no gastéis velocidad para que solo pase Reinhardt. Comprobad que el resto pueda cruzar o amenazad desde la entrada principal mientras un DPS asoma por hotel.' },
      { title: 'Deja a alguien con la carga', body: 'Antes de adelantaros por calles, avisad quién escolta y desde dónde recibirá ayuda si vuelve un flanker. Quedarse solo no es un papel fijo del Support que llegó el último.' },
      { title: 'Haz el giro con tus Supports', body: 'Si Ana debe cruzar para recuperar visión, cubrid ese movimiento antes de abrir otro duelo. Kiriko puede corregir una separación con Swift Step, pero no arregla por sí sola dos líneas sin cobertura.' },
      { title: 'Decide qué falta en el final', body: 'Si el rival ya no puede acercarse, no necesitas otra ultimate sobre la carga. Si quien empuja va a caer y el reloj se acaba, ayudarlo ahora puede valer más que reservar una combinación.' },
    ],
    defensePlan: [
      { title: 'No dejes libre el acceso principal', body: 'Si dos aliados persiguen a Tracer dentro de hotel, comprueba quién sigue viendo el acceso principal y quién vuelve al punto. Contener el lateral desde una esquina puede bastar sin ganarle el duelo.' },
      { title: 'No defiendas una calle vacía', body: 'Cuando la carga gira, la altura que ocupabas puede perder el tiro. Cambia de cobertura mientras aún puedes hacerlo, en lugar de descubrirlo cuando un enemigo ya te corta la retirada.' },
      { title: 'Comprueba dónde volveréis a defender', body: 'Mira la distancia al checkpoint y a tus compañeros. Retroceder para reagruparte tiene sentido si todavía habrá dónde frenar; no sirve como regla automática cuando el rival está terminando el tramo.' },
      { title: 'Reparte el toque y el daño', body: 'En fundición, el primero que llega debe saber quién puede cubrirlo. Si toca D.Va, Cassidy no necesita bajar también si conserva tiro desde una esquina; si el ataque tapa esa línea, debe buscar otra.' },
    ],
    heroPicks: [
      { name: 'Reinhardt', slug: 'reinhardt', role: 'tank', reason: 'Puede llevar el combate a la salida de hotel o a una curva de calles. La barrera ayuda a cruzar, pero antes de avanzar comprueba que los Supports puedan seguirte sin quedar al otro lado del muro de Mei.' },
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar un acceso elevado de calles y regresar hacia la carga. Decide si Matrix está cubriendo el cruce de Ana o el daño que recibe quien escolta; no cubre ambos lugares si están separados.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Puede vigilar hotel y mantener tiro sobre una curva sin acompañar cada persecución. Si el Tank gira y desaparece de tu ángulo, cambia de posición para seguir ayudando.' },
      { name: 'Mei', slug: 'mei', role: 'dps', reason: 'Puede separar a quien sale tarde de hotel o cruza una esquina. Antes de levantar Muro, mira la línea de tus Supports: aislar al rival también puede impedir que curen a Reinhardt.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Desde una cobertura próxima puede atender la salida de hotel o una entrada de Winston. En calles necesita preparar el giro antes de perder visión; Nano no sustituye esa rotación.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Puede responder a anticuración con Suzu y cambiar de lado con Swift Step. Mira dónde termina el aliado al que vas: llegar a alguien junto a un hueco de fundición no garantiza una salida segura.' },
    ],
    compositions: [
      {
        name: 'Brawl de esquinas',
        lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
        plan: 'En A, elegid si el grupo cruza por hotel o si Cassidy abre tiro desde allí mientras Reinhardt entra por la zona de estatua. Lúcio acompaña el movimiento elegido; Mei comprueba que su muro no corte a Kiriko. En calles, mantened ese reparto entre esquina, lateral y carga sin exigir que los cinco estén pegados al Tank.',
        weakness: 'Si la salida de hotel está bloqueada o un rival dispara desde una altura que Cassidy no ve, acelerar por la misma ruta puede gastar todos los recursos antes del contacto. Buscad otra ruta o un ángulo que lo obligue a cubrirse. Si nadie puede disputarlo, puede hacer falta una sustitución; más curación no elimina ese tiro.',
      },
      {
        name: 'Dive sobre backline',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Winston señala una posición cercana a estatua o un acceso de calles que Ana pueda atender. Genji y Tracer preparan su entrada sin dar por hecho que deban gastar toda la movilidad a la vez. Kiriko decide si acompaña o protege a Ana; antes de saltar, comprobad quién sostiene la carga y qué haréis si la defensa cede sin pelear.',
        weakness: 'Si Ana se queda detrás de la curva y Kiriko sigue a Winston, el Tank puede entrar sin ayuda y Ana quedar sola ante el flanker. En fundición, revisad los destinos junto a los huecos y la vuelta a cobertura; tener movilidad no convierte cualquier salto en una buena entrada.',
      },
    ],
    mistakes: [
      'Meter al grupo en hotel sin comprobar la salida y dejar al Tank separado por un muro.',
      'Adelantarse por calles después de capturar sin avisar quién empuja ni cómo se le ayudará.',
      'Pedir curación después de doblar una curva que Ana todavía no puede cruzar.',
      'Perseguir al DPS que se retira por hotel y dejar que el rival toque por el acceso principal.',
      'Guardar una defensiva para otra pelea cuando la carga está a punto de terminar y nadie más puede disputar.',
    ],
    vodChecklist: [
      '¿Qué sabías sobre la salida de hotel antes de entrar?',
      '¿Quién amenazaba la zona de estatua mientras el DPS asomaba por hotel?',
      '¿Cuánto avanzó la carga durante la ventaja que habíais conseguido?',
      '¿Desde dónde podía curarte Ana después de la siguiente curva?',
      '¿La retirada dejaba tiempo para otra disputa antes del checkpoint?',
      '¿Qué necesitaba el toque de fundición y qué ayuda llegó de verdad?',
    ],
    faq: [
      { question: "¿Qué tipo de mapa es King's Row?", answer: 'Es un mapa híbrido de Londres. El ataque captura A y después escolta la carga por calles hasta la fundición. Tras la captura, acordad quién empuja: ganar la pelea no pone la carga en marcha si todos os habéis adelantado.' },
      { question: "¿Hay que llevar Reinhardt en King's Row?", answer: 'No. Puede jugar cerca de las esquinas con Lúcio y Mei, pero necesita llegar con ayuda. Winston o D.Va pueden servir si hace falta disputar otra posición. Cambia por el problema que no podéis resolver, no porque otro jugador diga que este es siempre el mapa de Reinhardt.' },
      { question: '¿Es mejor entrar por hotel o por estatua?', answer: 'Depende de quién vigile cada salida y de cómo pueda seguirte tu equipo. Hotel puede dar otro ángulo, pero un muro puede separar al primero. Estatua ofrece cobertura parcial, no protección de todos los lados. Un DPS por hotel y presión desde la entrada principal pueden funcionar sin mandar a los cinco por la misma puerta.' },
      { question: '¿Cuántas ultimates hay que guardar para el último punto?', answer: 'No hay una cifra fija. Mira el reloj, quién puede tocar y qué respuesta necesita esa disputa. Si ya no habrá otra pelea, reservar una ultimate útil puede perder el intento. Si la carga sigue avanzando sin oposición, gastarla por costumbre tampoco aporta.' },
      { question: "¿Cómo reviso una VOD de King's Row?", answer: 'Compara dos entradas por hotel o dos giros de calles. Pausa antes de decidir y anota qué sabías, desde dónde podían ayudarte y cuánto quedaba. En fundición, separa la primera disputa de la última: no tienen por qué pedir los mismos recursos.' },
    ],
    conclusion: 'En calles, elige una pelea que ganasteis pero no se convirtió en avance. Mira quién estaba con la carga y cuándo Ana perdió de vista al frente. La próxima vez, avisa quién escolta y prepara el giro antes de abrir otro duelo. No hace falta cambiar los cinco héroes si el problema era cómo os movíais después de ganar.',
    relatedLinks: [
      { href: '/heroes/reinhardt', label: 'Cruzar y retroceder con Reinhardt' },
      { href: '/team-comps/reinhardt', label: 'Repartir velocidad, muro y curación' },
      { href: '/heroes/ana', label: 'Preparar la siguiente línea de Ana' },
      { href: '/counters/reinhardt', label: 'Responder al daño que frena el cruce' },
      { href: '/guides/como-usar-ultimates-overwatch', label: 'Decidir qué ultimate necesita la disputa' },
      { href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: 'Comparar dos entradas en el cuaderno de VOD' },
    ],
  },
  {
    slug: 'lijiang-tower',
    name: 'Lijiang Tower',
    mode: 'Control',
    location: 'China',
    image: '/maps/lijiang-tower.png',
    imageAlt: 'Pagoda iluminada y accesos al punto de Lijiang Tower en Overwatch',
    seoTitle: 'Lijiang Tower: entradas, puente y recuperación del punto',
    seoDescription: 'Juega Night Market, Garden y Control Center con un plan: entradas, riesgo del puente, recuperación del punto y elección de héroes. Con ejemplos para revisar tu VOD.',
    updatedAtIso: '2026-10-19',
    updatedAt: '19 de octubre de 2026',
    intro: [
      'En Lijiang Tower, prepara la entrada según el escenario. Night Market pide mirar las puertas del edificio del punto; Garden obliga a valorar el puente y los empujones; Control Center concentra el cruce en accesos interiores. No cambies de héroe solo porque empezó otra ronda: mira si todavía puedes llegar a una posición desde la que ayudar y si el rival está frenando siempre la misma ruta.',
      'Para recuperar, comprueba el porcentaje y dónde están tus aliados antes de salir corriendo al objetivo. Si podéis reagruparos sin perder la ronda, preparad juntos el siguiente intento. Si hay que disputar ya, decide quién llega y desde dónde recibirá ayuda. Esperar siempre a los cinco también puede ser un error cuando el punto está a punto de cerrar.',
    ],
    quickRead: [
      { title: 'Mira la salida, no solo la puerta', body: 'En Night Market y Control Center, comprueba quién podrá seguirte al cruzar. Una entrada abierta no ayuda si un muro deja al Tank solo dentro.' },
      { title: 'Prepara la vuelta antes de cruzar el puente', body: 'En Garden, localiza al héroe que puede empujarte y conserva una forma de volver. Si no puedes cruzar con ayuda, prepara otra entrada en vez de repetir el salto.' },
      { title: 'Decide el toque con el porcentaje a la vista', body: 'Agruparse permite una entrada más fuerte si queda tiempo. Si la ronda va a terminar, acordad quién toca primero y qué puede hacer el resto para ayudarlo.' },
    ],
    phases: [
      {
        name: 'Night Market',
        attack: 'El edificio del objetivo permite presionar una puerta mientras un DPS enseña otro acceso cercano. No necesitas mandar a Genji a rodear todo el mercado: comprueba si desde el lateral verá la pelea cuando Reinhardt cruce. Si Mei rival vigila vuestra puerta, preparad qué haréis con el muro antes de gastar velocidad. Si la defensa sale a perseguir, puede abrir una entrada sin que tengáis que forzar antes otra habilidad. Con el porcentaje agotándose, prioriza una disputa a la que pueda llegar ayuda.',
        defense: 'Elige una esquina del edificio desde la que puedas vigilar la entrada y volver al punto. Un compañero puede controlar otra puerta sin quedarse tan lejos que no puedas ayudarlo. Si Tracer aparece por detrás, avisa y comprueba quién puede atenderla desde su posición; no vacíes la entrada principal para perseguirla por el mercado. Cuando el ataque cruce, mira si puedes mantener el tiro desde dentro o necesitas cambiar de lado para no quedar aislado.',
        vodReview: 'Antes del cruce, comprueba qué veía cada jugador desde su puerta. Si el lateral no disparó, distingue llegar tarde de tener la línea tapada. No atribuyas la derrota solo a que todos usasteis el mismo acceso.',
      },
      {
        name: 'Garden',
        attack: 'Antes de cruzar el puente, localiza a Lúcio o a otro rival con desplazamiento y decide dónde recuperarás cobertura. Winston puede saltarse parte del recorrido, pero Ana no atraviesa las paredes para curarlo: el destino debe quedar a su alcance o contar con otra ayuda. Si el puente está controlado, mira qué otra entrada puede usar vuestro grupo y cuánto tardará. No conviertas el atajo individual de Genji en una ruta que todos puedan seguir por obligación.',
        defense: 'Desde cerca del puente puedes amenazar un empujón sin perseguir hasta el borde. Mira también la entrada que dejas de ver al hacerlo. Si el ataque cambia de lado, rota por cobertura y mantén a alguien en condiciones de disputar. Un salto de Winston puede intentar sacaros del punto mientras Tracer toca por otro acceso; decidir quién atiende cada amenaza importa más que ir todos detrás del Tank.',
        vodReview: 'En una caída, pausa antes de acercarte al borde. ¿Habías visto al héroe que te empujó? ¿Qué opción de salida conservabas? Compara con un cruce que sí funcionó, sin dar por hecho que toda muerte ambiental era evitable.',
      },
      {
        name: 'Control Center',
        attack: 'En los accesos interiores, una pared de Mei puede separar al primer jugador antes de que el resto vea el punto. Puedes provocar ese muro y esperar desde cobertura, usar otra entrada o cruzar con una herramienta que tu grupo pueda aprovechar. No hace falta sacar también Suzu si ya tenéis un paso viable. Al entrar, reparte el tiro entre coberturas de la sala: llegar al punto no obliga a quedarse los cinco en el centro. Si no queda tiempo para otra rotación, prepara el toque en vez de rodear de nuevo.',
        defense: 'Mantén una cobertura desde la que puedas contestar el acceso sin exponerte a todo el grupo atacante. Si Reinhardt cruza solo, mira si puedes castigarlo sin quedar cortado por su Mei. Si entra el equipo entero, cambia de esquina para conservar la ayuda de tus Supports. Un enemigo que sale de la sala puede estar buscando que lo persigas mientras otro disputa; antes de seguirlo, comprueba quién mantiene el objetivo.',
        vodReview: 'Pausa cuando el primer aliado atraviesa la puerta. ¿El muro cortó la curación o el Support todavía estaba rotando? Si el grupo entró junto pero perdió, revisa los tiros disponibles dentro, no solo la velocidad del cruce.',
      },
    ],
    attackPlan: [
      { title: 'El lateral debe llegar a la misma pelea', body: 'En Night Market, avisa desde qué puerta podrás disparar cuando el Tank cruce. Un recorrido más largo solo merece la pena si queda tiempo y aporta un tiro que antes no tenías.' },
      { title: 'No copies el salto de tu Tank', body: 'En Garden, decide qué recorrido pueden seguir los Supports y dónde verán a Winston al aterrizar. Si Ana pierde el tiro detrás del edificio, cambia el destino o prepara su rotación.' },
      { title: 'Prueba otra respuesta al muro', body: 'En Control Center, anota qué entrada está vigilando Mei. Puedes cambiar de puerta o forzar su muro desde cobertura; no gastes velocidad cada vez para comprobar que vuelve a separaros.' },
      { title: 'Mira quién puede tocar a tiempo', body: 'Antes de pedir otro reagrupamiento, mira el porcentaje y la distancia de los aliados. El compañero que llega primero necesita saber desde dónde lo cubrirán los que todavía están entrando.' },
    ],
    defensePlan: [
      { title: 'Vigila una puerta sin perder la vuelta', body: 'En Night Market, comprueba quién puede ayudarte si aparece otro enemigo por el acceso que cubres. Retroceder hacia el punto puede ser mejor que aceptar un duelo fuera sin apoyo.' },
      { title: 'No persigas fuera del punto', body: 'En Garden, amenazar el empujón no exige perseguir a quien retrocede. Mira si el ataque cambió de entrada mientras seguías al mismo jugador.' },
      { title: 'Protege el tiro de tus Supports', body: 'En Control Center, no cruces a otra sala suponiendo que Kiriko también se teletransportará. Si no puede ayudarte desde donde está, prepara el cambio antes de iniciar el duelo.' },
      { title: 'Cubre el acceso mientras otro disputa', body: 'Si un rival entra para mantener overtime mientras los demás llegan por otra puerta, decide quién lo frena sin perder la entrada principal. No bajes a los cinco sobre el primer objetivo que toca.' },
    ],
    heroPicks: [
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Puede cambiar de lado en Garden o alcanzar al rival que sostiene una entrada. El salto necesita un destino al que llegue ayuda; una ruta que evita el puente también puede dejarte sin visión de Ana.' },
      { name: 'Reinhardt', slug: 'reinhardt', role: 'tank', reason: 'Puede disputar cerca de las puertas de Night Market y Control Center con ayuda de velocidad. Comprueba que el cruce no termine al otro lado de un muro sin tus Supports.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Puede asomarse por otra entrada del edificio o acompañar un salto en Garden. Usa la movilidad para llegar al intercambio, no para abrir un duelo del que el equipo no ve ni al objetivo.' },
      { name: 'Mei', slug: 'mei', role: 'dps', reason: 'Puede cortar un acceso de Control Center o separar a quien atraviesa una puerta de Night Market. Mira ambos lados del muro: también puedes tapar el tiro de Cassidy o la curación aliada.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Puede atender una entrada desde otra cobertura y responder a anticuración con Suzu. En Garden, no uses Swift Step sin mirar dónde termina el aliado; aparecer junto al borde también te expone.' },
      { name: 'Lúcio', slug: 'lucio', role: 'support', reason: 'Puede acompañar un cruce de Control Center y amenazar empujones en Garden. Decide cuándo quedarte con el grupo: buscar una caída fuera no ayuda al Tank que está entrando sin velocidad.' },
    ],
    compositions: [
      {
        name: 'Rush para espacios cerrados',
        lineup: ['Reinhardt', 'Mei', 'Cassidy', 'Lúcio', 'Kiriko'],
        plan: 'En Control Center, preparad la puerta y el muro rival antes del cruce con Lúcio. Cassidy mantiene tiro sobre el acceso o una cobertura próxima; no necesita acompañar a Reinhardt hasta el centro. En Night Market puede mirar otra puerta si sigue a distancia de ayudar. Kiriko decide si hace falta Suzu o basta con conservar una línea de curación.',
        weakness: 'En Garden, una amenaza sobre el puente puede impedir que el grupo cierre distancia por la misma ruta. Si Lúcio busca el empujón solo o Mei corta a Kiriko al entrar, Reinhardt se queda sin el apoyo que justificaba el rush. Cambia primero ese reparto si el equipo todavía tiene un cruce viable.',
      },
      {
        name: 'Dive coordinado',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'En Garden, Winston elige un destino que Ana pueda atender y comprueba cuándo Genji o Tracer tendrán tiro sobre ese lado. Kiriko puede acompañar o quedarse ayudando a Ana según la amenaza rival. Si el salto obliga a la defensa a salir del punto, Tracer puede aprovechar para tocar sin que los cinco tengan que perseguir al mismo Support.',
        weakness: 'Si Ana queda al otro lado del edificio, Winston puede perder la curación al aterrizar aunque todos hayan salido a la vez. En Control Center, Genji y Tracer necesitan una entrada que no los deje aislados dentro; abrir tres puertas sin ayuda compartida no es coordinación por sí solo.',
      },
    ],
    mistakes: [
      'Perseguir por el mercado mientras el rival entra por la puerta que acabas de dejar libre.',
      'Cruzar el puente de Garden sin localizar al rival que puede empujarte ni conservar una salida.',
      'Repetir la entrada de Control Center con velocidad aunque Mei siga separando al mismo jugador.',
      'Pedir otro reagrupamiento cuando el porcentaje ya no permite llegar a tiempo.',
      'Cambiar de héroe entre rondas sin identificar qué posición o herramienta necesitas resolver.',
    ],
    vodChecklist: [
      '¿El lateral de Night Market tenía tiro cuando cruzó el Tank?',
      '¿Qué sabías del empujón rival antes de cruzar el puente de Garden?',
      '¿Ana podía ver el destino del salto o quedó al otro lado del edificio?',
      '¿Qué separó al primer jugador en la puerta de Control Center?',
      '¿Quedaba porcentaje para reagruparse o había que preparar el toque?',
      '¿Cambiar de héroe resolvió una ruta o repitió la misma entrada con otro pick?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Lijiang Tower?', answer: 'Es un mapa de Control. Los equipos disputan un objetivo y deben ganar dos rondas. Esta guía trata el recorrido normal de Control, no las reglas ni los poderes de Stadium.' },
      { question: '¿Qué cambia entre Night Market, Garden y Control Center?', answer: 'Night Market gira alrededor de las entradas del edificio del punto. Garden añade el riesgo de las rutas junto al vacío y el puente. Control Center concentra las entradas en interiores donde un muro puede separar al primero. Revisa la ruta que necesitas; cambiar de escenario no obliga a cambiar de héroe.' },
      { question: '¿Hay que entrar por el puente de Garden?', answer: 'No. Mira quién lo controla, qué salida conservas y qué otra entrada puede seguir el grupo. Winston o Genji pueden evitar parte del recorrido, pero sus Supports necesitan ver el destino o llegar por su propia ruta. El atajo del Tank no es automáticamente el del equipo.' },
      { question: '¿Cuándo conviene tocar antes de reagruparse?', answer: 'Cuando el porcentaje o el overtime ya no deja preparar otro intento completo. Acordad quién llega primero y qué ayuda tendrá. Si todavía podéis esperar, una entrada con recursos puede ser mejor que repetir toques aislados; ninguna de las dos opciones sirve siempre.' },
      { question: '¿Por qué falla una entrada con Lúcio en Control Center?', answer: 'La velocidad no evita que un muro corte al Tank ni que los Supports pierdan el tiro en otra sala. Comprueba qué herramienta detuvo el cruce y dónde quedó cada compañero antes de pedir más daño o cambiar la composición entera.' },
    ],
    conclusion: 'Revisa una recuperación en Control Center antes de la próxima partida. Pausa al cruzar la puerta y mira quién podía ayudar al primero, qué muro estaba disponible y cuánto porcentaje quedaba. Prueba una corrección concreta: preparar otra entrada, guardar ayuda para ese cruce o tocar antes. Después comprueba si cambió la situación, no solo el resultado de la ronda.',
    relatedLinks: [
      { href: '/heroes/winston', label: 'Elegir el destino del salto de Winston' },
      { href: '/heroes/kiriko', label: 'Atender la entrada sin perder la salida con Kiriko' },
      { href: '/team-comps/reinhardt', label: 'Coordinar un cruce con Lúcio y Mei' },
      { href: '/counters/winston', label: 'Qué puede frenar el salto en Garden' },
      { href: '/guides/cuando-cambiar-de-heroe-overwatch', label: 'Decidir si hace falta cambiar entre rondas' },
      { href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: 'Comparar dos recuperaciones en tu VOD' },
    ],
  },
  {
    slug: 'dorado',
    name: 'Dorado',
    mode: 'Escolta',
    location: 'México',
    image: '/maps/dorado.png',
    imageAlt: 'Plaza nocturna y calles de Dorado en Overwatch',
    seoTitle: 'Guía de Dorado en Overwatch: rutas, héroes y defensa',
    seoDescription: 'Guía de Dorado en Overwatch: cómo atacar y defender los tres tramos, controlar las alturas, elegir héroes y revisar errores en tus VOD.',
    updatedAtIso: '2026-07-04',
    updatedAt: '4 de julio de 2026',
    intro: [
      'Dorado tiene una costumbre muy clara: coloca la carga debajo de la posición que la defensa quiere ocupar. Sucede al salir, vuelve a ocurrir entre los tejados y se repite al entrar en LumériCo. Si el ataque mira únicamente al coche, acabará recibiendo daño desde arriba durante todo el recorrido y preguntándose por qué nunca encuentra una pelea limpia.',
      'La solución no consiste en mandar a todo el equipo a perseguir un DPS por los tejados. Basta con desplazarlo, cortar su visión y ocupar la esquina que protege la carga. Después, una persona empuja mientras las demás preparan la siguiente calle. Dorado se vuelve mucho más sencillo cuando altura y objetivo dejan de ser dos tareas separadas y empiezan a formar parte del mismo avance.',
    ],
    quickRead: [
      { title: 'Mira dónde pasará la carga', body: 'Si hay un balcón o tejado encima de la ruta, resuélvelo antes de llegar debajo. Allí la defensa tendrá todos los ángulos y tú ninguno.' },
      { title: 'Desplazar ya es ganar', body: 'No necesitas perseguir una eliminación por los tejados. Obliga al rival a retroceder, toma su posición y vuelve a mirar el objetivo.' },
      { title: 'Una persona empuja', body: 'Tras ganar una pelea, adelanta cuatro jugadores hasta la siguiente esquina. La carga avanzará y la defensa perderá su colocación favorita.' },
    ],
    phases: [
      {
        name: 'Salida y primer punto de control',
        attack: 'La defensa suele comenzar con altura y visión sobre la ruta de la carga. El ataque debe decidir si disputa esa posición o si cruza rápido por una cobertura que reduzca su valor. Permanecer debajo disparando hacia arriba favorece al rival. Un Tank puede absorber la primera atención mientras un DPS toma un ángulo lateral corto; ambos movimientos tienen que coincidir para que la defensa no los resuelva por separado.',
        defense: 'La defensa quiere infligir presión desde arriba y retirarse antes de quedar rodeada. Mantén una salida hacia la siguiente esquina y no sacrifiques a todo el equipo por conservar la posición inicial unos segundos más. Una retirada ordenada permite otra pelea completa antes del punto de control; morir tarde puede regalar también buena parte del segundo tramo.',
        vodReview: 'Fíjate en qué momento el ataque miró o subió a la altura. Si la carga avanzó mientras cuatro jugadores disparaban desde abajo sin cambiar de ruta, señala el instante en que dejaron de crear una amenaza real.',
      },
      {
        name: 'Calles y plaza central',
        attack: 'El tramo medio mezcla calles estrechas con balcones y accesos laterales. El equipo atacante necesita ocupar la siguiente esquina antes de amontonarse en la carga. Los supports deben rotar pronto para conservar visión; esperar a que el Tank ya haya girado suele obligarlos a cruzar una zona peligrosa sin ayuda. Tras una pelea ganada, limpia el ángulo más cercano y evita perseguir hasta perder el objetivo.',
        defense: 'La defensa puede usar las esquinas para detener el avance, pero debe elegir dónde reagruparse. Saltar desde altura de uno en uno alimenta definitivas y elimina la ventaja posicional. Espera a que el rival cruce, presiona su línea de apoyo y usa el edificio o la cobertura para cortar la conexión entre la carga y quienes intentan tomar espacio.',
        vodReview: 'Comprueba si la carga se detuvo porque nadie la empujaba o porque nadie controló la siguiente esquina. Son errores distintos: el primero es de asignación; el segundo, de conversión de una pelea ganada.',
      },
      {
        name: 'Interior de LumériCo',
        attack: 'El tramo final reduce el espacio y hace más previsible la entrada. Necesitas forzar primero la habilidad capaz de negar tu combinación y después usar una o dos definitivas con funciones compatibles. Entrar por la misma puerta sin presión lateral permite a la defensa concentrar todo el daño. Incluso un ángulo corto puede obligar a girarse y abrir el paso del Tank.',
        defense: 'La defensa reaparece cerca, pero eso no convierte cada toque en una buena pelea. Decide quién gana tiempo y quién prepara daño desde cobertura. Conserva una herramienta para el segundo contacto y evita gastar todas las definitivas cuando la carga todavía está lejos del final. Una salida tardía de la zona de reaparición puede dividir el equipo durante varios intentos.',
        vodReview: 'Separa los intentos del final y anota qué recurso inició cada uno. Revisa si había un objetivo común, si los supports podían ver la entrada y cuánto tiempo real compró cada último intento defensivo.',
      },
    ],
    attackPlan: [
      { title: 'Mira arriba primero', body: 'Antes de acompañar la carga, localiza la altura defensiva y decide cómo negarla: movilidad, presión a distancia o un cruce rápido por cobertura.' },
      { title: 'Rota antes del Tank', body: 'Los supports y DPS de poca movilidad deben cambiar de posición antes de perder visión. Esperar al último segundo convierte una esquina normal en un cruce peligroso.' },
      { title: 'Convierte cada ventaja', body: 'Cuando cae un rival, ocupa la siguiente esquina y deja a un jugador seguro con la carga. El espacio impide que la defensa se reorganice gratis.' },
      { title: 'Ordena el tramo final', body: 'Elige una definitiva para abrir y otra para responder. Evita lanzar todo sobre la primera persona que toque la carga.' },
    ],
    defensePlan: [
      { title: 'Altura con salida', body: 'Empieza donde puedas presionar y retirarte. Una posición elevada deja de ser buena si obliga a morir cuando el ataque finalmente la alcanza.' },
      { title: 'Reagrupa en una esquina', body: 'Después de ceder terreno, marca la siguiente defensa completa. Entrar desde la zona de reaparición sin esperar solo entrega carga de definitiva.' },
      { title: 'Ataca la conexión', body: 'No dispares siempre al Tank. Busca el momento en que la esquina separa a la primera línea de sus supports y castiga esa rotación.' },
      { title: 'Recontesta con funciones', body: 'Asigna a quien toca, quien protege y quien aporta daño. Tres jugadores saltando solos a la carga no forman una defensa.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar balcones, negar proyectiles durante un cruce y regresar rápido a proteger a sus supports.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Amenaza posiciones elevadas y divide líneas de tiro, siempre que no salte fuera del alcance de su equipo.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Su rango medio funciona alrededor de las esquinas y ofrece una respuesta estable contra héroes de flanco.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Accede a las alturas y puede rematar objetivos aislados cuando la defensa empieza a retroceder.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Aprovecha sightlines largas y puede castigar entradas previsibles, aunque debe rotar pronto antes de perder visión.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Su movilidad ayuda a seguir los cambios de altura y Suzu estabiliza cruces castigados por control o daño explosivo.' },
    ],
    compositions: [
      {
        name: 'Dive para disputar altura',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Ana mantiene presión desde una cobertura segura; Winston corta la visión y los DPS entran sobre el mismo sector. Kiriko conserva movilidad para sostener la retirada o limpiar el control rival.',
        weakness: 'Se rompe si Winston salta demasiado lejos, Genji y Tracer eligen objetivos distintos o Ana no dispone de una rotación antes de que la carga gire la esquina.',
      },
      {
        name: 'Control de rango medio',
        lineup: ['Sigma', 'Cassidy', 'Ashe', 'Ana', 'Kiriko'],
        plan: 'Sigma protege el cruce y ocupa la esquina; Ashe y Cassidy distribuyen ángulos sin alejarse de la ayuda. Ana busca presión desde el fondo y Kiriko cubre la rotación o la entrada agresiva.',
        weakness: 'Sufre si una composición móvil alcanza la backline, si los DPS renuncian a toda la altura o si el equipo intenta pelear a corta distancia sin haber desgastado recursos.',
      },
    ],
    mistakes: [
      'Ignorar la altura del primer tramo y empujar la carga mientras la defensa dispara sin oposición.',
      'Mantener a varios jugadores sobre el objetivo después de ganar, dejando libre la siguiente esquina.',
      'Rotar tarde con un support y perder visión del Tank justo cuando empieza la entrada.',
      'Defender una altura sin ruta de retirada y morir cuando el ataque termina de alcanzarla.',
      'Convertir el tramo final en una sucesión de toques individuales sin esperar una pelea posible.',
    ],
    vodChecklist: [
      '¿Quién controlaba la altura antes de cada punto de control?',
      '¿La carga avanzaba mientras el resto tomaba la siguiente posición?',
      '¿Tus supports rotaron antes o después de perder visión de la primera línea?',
      '¿La defensa murió tarde intentando conservar una posición ya rodeada?',
      '¿Qué habilidad se forzó antes de usar una definitiva ofensiva?',
      '¿Cada último intento tenía apoyo y una función concreta?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Dorado?', answer: 'Dorado es un mapa de Escolta. El ataque debe acompañar la carga a través de tres tramos hasta LumériCo, mientras la defensa intenta detenerla y agotar el tiempo.' },
      { question: '¿Qué es lo más importante para atacar Dorado?', answer: 'Controlar o negar la altura antes de que la carga llegue debajo. También conviene adelantar la formación después de cada pelea y dejar solo a un jugador empujando cuando sea seguro.' },
      { question: '¿Qué héroes funcionan bien en Dorado?', answer: 'D.Va, Winston, Cassidy, Genji, Ana y Kiriko tienen herramientas útiles para las alturas y rotaciones del mapa. La elección final debe encajar con el plan del equipo y no solo con una lista fija.' },
      { question: '¿Qué debo revisar en una VOD de Dorado?', answer: 'Revisa el control de altura, las rotaciones de los supports, la conversión de peleas ganadas, las muertes defensivas tardías y si los últimos intentos del final podían recibir ayuda.' },
    ],
    relatedLinks: [
      { href: '/heroes/dva', label: 'Guía de D.Va' },
      { href: '/heroes/ana', label: 'Guía de Ana' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Elegir composición' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' },
    ],
  },
]

export const MAP_PILLAR_SLUGS = MAP_PILLARS.map(map => map.slug)

export function getMapPillar(slug: string) {
  return MAP_PILLARS.find(map => map.slug === slug)
}
