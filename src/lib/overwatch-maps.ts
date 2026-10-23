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
    seoTitle: 'Dorado en Overwatch: alturas, rutas de ataque y defensa',
    seoDescription: 'Cómo atacar y defender Dorado: salir hacia el mercado, disputar la altura del juzgado y cerrar LumériCo. Rutas, opciones de equipo y ejercicios para tu replay.',
    updatedAtIso: '2026-10-20',
    updatedAt: '20 de octubre de 2026',
    intro: [
      'En Dorado, mira quién puede disparar al siguiente tramo de la carga antes de acompañarla hasta allí. En el mercado y en la zona del juzgado, un enemigo en altura puede mantener al equipo frenado sin bajar a disputar. Puedes echarlo de esa posición, obligarlo a cubrirse o avanzar por una ruta que le corte el tiro. No todas las peleas exigen subir a todos los tejados.',
      'Tampoco estás obligado a llevar Winston o D.Va. Los accesos por tierra importan: el segundo tramo tiene una escalera para alcanzar la altura y un acceso atacante al juzgado, añadidos en la reforma de 2024. La pregunta es cuánto tardas en llegar y qué ocurre con tus compañeros mientras subes. Si preparas la ruta cuando ya están recibiendo todo el daño, tener acceso no significa llegar a tiempo.',
    ],
    quickRead: [
      { title: 'Disputa la altura que os frena', body: 'Si Ashe dispara libremente a la carga, busca cómo quitarle ese tiro. Si ya se ha retirado y no llega a la pelea, no pierdas el avance persiguiéndola por otro tejado.' },
      { title: 'Subir no siempre exige un salto', body: 'En el segundo tramo puedes preparar el acceso por la escalera y el juzgado. Comprueba la ruta antes de la pelea: salir tarde puede dejar al resto esperando debajo.' },
      { title: 'No dejes solo al que empuja', body: 'Tras ganar, algunos pueden preparar la siguiente esquina. Mira quién sigue vivo en el rival y quién cubre la carga; no mandes a cuatro por delante por costumbre.' },
    ],
    phases: [
      {
        name: 'Salida, mercado y primer checkpoint',
        attack: 'Desde la salida, identifica qué posición elevada tiene tiro sobre vuestro recorrido hacia el mercado. Si D.Va la disputa, Cassidy puede avanzar hacia una cobertura mientras la defensa la atiende; si Cassidy sigue recargando en la salida, quizá nadie aproveche esa subida. Sin movilidad vertical, prepara el recorrido por tierra o presiona desde otro ángulo antes de exponerte bajo el balcón. Si el rival se retira, acompaña la carga hasta una cobertura útil en vez de gastar otros dos cooldowns para perseguirlo.',
        defense: 'Desde arriba puedes presionar la salida sin bajar a cada asomo. Mira también por dónde podrías retirarte hacia el mercado cuando el ataque alcance tu posición. Si Winston llega y el resto del ataque puede seguirlo, caer hacia tus Supports puede conservar la pelea; saltar al lado contrario solo para seguir disparando puede dejarte sin ayuda. Antes de abandonar la zona, comprueba cuánto falta para el checkpoint y si alguien puede disputarlo: no des por hecho que habrá otro intento.',
        vodReview: 'Pausa antes de pasar bajo la primera altura. ¿Quién tenía tiro sobre la carga y qué hizo cambiar su posición? Mira después si el jugador que disputó arriba tuvo ayuda o llegó solo mientras el equipo permanecía en la salida.',
      },
      {
        name: 'Juzgado y acceso a la central',
        attack: 'En la zona del juzgado, la escalera y el acceso al edificio permiten preparar una disputa por tierra. Por ejemplo, Cassidy puede subir mientras Winston amenaza desde abajo, siempre que ambos puedan participar cuando empiece el intercambio. No confundas esa preparación con salir por tu cuenta a buscar a Ana. Si el Tank gira siguiendo la carga, el Support también necesita llegar a una línea desde la que verlo; doblar el edificio mientras él aún cruza la calle puede cortar toda la curación.',
        defense: 'Si el ataque usa el acceso al juzgado, decide si puedes contenerlo con ayuda o si conviene cambiar de cobertura. Quedarte en el balcón tiene sentido mientras mantengas tiro y una retirada. Si la carga pasa y tu único objetivo ya ha desaparecido detrás del edificio, esa altura puede dejar de aportar. No bajéis todos sobre el primer atacante: uno puede disputar mientras los demás mantienen tiro sobre quien lo cura o lo acompaña.',
        vodReview: 'Compara dos avances por la misma curva. Anota cuándo subió el DPS, desde dónde curaba el Support y quién acompañaba la carga. ¿Pudiste disparar desde el lateral mientras tu Tank aún peleaba o llegaste cuando ya había caído?',
      },
      {
        name: 'Interior de LumériCo',
        attack: 'Al entrar en LumériCo, usa la cobertura después del choke para no resolver toda la pelea desde la puerta. Mira qué frena el avance: puede ser una defensiva concreta, un enemigo que dispara desde otro nivel o que nadie acompaña al Tank. Forzar Suzu antes de Blade puede ayudar, pero no es un requisito si tienes otra oportunidad clara. Con el reloj cerca de cero o en la última pelea, usa los recursos que permitan cruzar y mantener la carga; reservar una ultimate para un intento que no llegará no mejora el ataque.',
        defense: 'Mira quién puede llegar a disputar antes de que la carga complete el tramo. Si vuelven dos compañeros y alguien puede aguantar, puedes preparar una respuesta con ellos. Si ese toque será el último, gastar una ultimate para sostenerlo puede ser lo correcto. Quien no esté tocando puede disparar desde cobertura: entrar todos en la misma zona facilita el daño rival y no garantiza comprar más tiempo.',
        vodReview: 'Revisa el reloj y la distancia restante antes de juzgar cada ultimate. ¿Podía existir otra pelea? Si un jugador tocó solo, comprueba si evitó perder en ese instante o si se adelantó innecesariamente a sus compañeros.',
      },
    ],
    attackPlan: [
      { title: 'Localiza quién os dispara desde arriba', body: 'No basta con decir «hay alguien arriba». Identifica al enemigo que impide pasar y comprueba si puedes desplazarlo desde otra línea sin perseguirlo hasta el fondo.' },
      { title: 'Prepara la subida al juzgado', body: 'Si vais a disputar por tierra, acercaos a la escalera antes del engage. Avisa si todavía no puedes participar para que el Tank no empiece una pelea distinta debajo.' },
      { title: 'Cubre al jugador de la carga', body: 'Tras una baja, busca la siguiente cobertura sin perder de vista a quien empuja. Si queda un flanker detrás, quizá haga falta acompañarlo en vez de avanzar todos.' },
      { title: 'Mira qué necesita el último avance', body: 'En LumériCo, una ultimate puede servir para abrir paso o sostener al que escolta. Elige por esa necesidad y por el tiempo restante, no por una secuencia fija de dos ultimates.' },
    ],
    defensePlan: [
      { title: 'No te quedes arriba sin tiro', body: 'La altura del juzgado no vale por sí sola. Cuando el ataque pase tu línea, cambia de cobertura a tiempo para seguir ayudando en vez de esperar allí al próximo duelo.' },
      { title: 'Cuenta los que pueden volver', body: 'Antes de retirarte, mira quién reaparece y cuánto puede avanzar la carga. Esperar puede daros una defensa conjunta o haceros perder sin disputar; el checkpoint decide la urgencia.' },
      { title: 'Presiona la rotación del Support', body: 'Si Ana tiene que cruzar para volver a ver a su Tank, puedes obligarla a cubrirse. Hazlo desde una posición que no te deje aislado si el ataque se gira.' },
      { title: 'Ayuda al primer toque', body: 'Quien llega a la carga necesita saber desde dónde tendrá daño o curación. Si compra unos segundos, utilízalos para intervenir, no para esperar a que caiga y repetirlo solo.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar un balcón y regresar hacia la carga. Antes de usar Boosters, mira si necesitas Matrix para cubrir al compañero que cruza por debajo.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Puede alcanzar al enemigo que sostiene la altura del mercado o del juzgado. El salto necesita tiro o presión de sus compañeros, no solo un destino al que pueda llegar.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Puede preparar el acceso por tierra al segundo tramo y mantener un ángulo cercano a la carga. Si sube tarde, su alcance no arregla una pelea que ya ocurrió abajo.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Puede usar la verticalidad para coincidir con la disputa del Tank. Conserva una salida si el rival cede el tejado: Dash detrás de él puede sacarte de toda ayuda.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Puede sostener una entrada desde otra cobertura, pero los edificios cortan sus disparos. Mueve la posición antes del giro de la carga y comprueba dónde aterrizará Winston.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Puede seguir un cambio de nivel con Swift Step. Mira dónde terminarás: llegar al juzgado junto a un aliado aislado también puede dejarte sin retirada.' },
    ],
    compositions: [
      {
        name: 'Dive para disputar altura',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Winston amenaza la altura cuando Genji puede verla y Tracer está en condiciones de presionar desde otro lado. Ana busca tiro al destino del salto; Kiriko atiende la respuesta sin abandonar automáticamente a Ana. Cuando la defensa se mueva, comprueba quién escolta y quién puede vigilar la siguiente esquina.',
        weakness: 'Si Winston salta detrás del juzgado y Ana no ve el aterrizaje, que ambos DPS estén cerca no garantiza sostener al Tank. También puede fallar si Tracer sigue una retirada mientras Genji ya disputa la carga.',
      },
      {
        name: 'Control de rango medio',
        lineup: ['Sigma', 'Cassidy', 'Ashe', 'Ana', 'Kiriko'],
        plan: 'Sigma avanza de cobertura en cobertura mientras Ashe mantiene tiro sobre la posición elevada que os frena. Cassidy puede preparar la escalera o cubrir la carga según la amenaza. Ana y Kiriko necesitan una ruta que siga viendo al frente cuando el recorrido gire; no tienen que permanecer siempre en la calle anterior.',
        weakness: 'Si el rival llega a los Supports antes de que puedan rotar, la presión a distancia puede desaparecer aunque los DPS tengan una buena posición. En LumériCo, quedarse mirando la puerta sin alcanzar otra cobertura deja al equipo sin espacio para responder.',
      },
    ],
    mistakes: [
      'Empezar la subida al juzgado cuando el resto del equipo ya ha gastado sus recursos en la calle.',
      'Perseguir al enemigo que abandonó un tejado aunque ya no tenga tiro sobre la carga.',
      'Adelantarse tras ganar y dejar al único jugador que empuja frente a un rival que seguía vivo.',
      'Quedarse en la cobertura anterior con Ana cuando el Tank ya ha girado detrás del edificio.',
      'Guardar una ultimate para otra defensa sin comprobar si la carga llegará antes de que podáis volver.',
    ],
    vodChecklist: [
      '¿Qué enemigo tenía tiro desde arriba y qué cambió cuando lo disputasteis?',
      '¿La escalera o el juzgado te permitían participar antes de que empezase la pelea?',
      '¿Quién cubría al compañero que empujaba después de ganar?',
      '¿Desde dónde podía curarte Ana al doblar la curva?',
      '¿Tu retirada conservó otra disputa o cedió el checkpoint sin tiempo para volver?',
      '¿Había realmente otro intento cuando decidiste guardar la ultimate?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Dorado?', answer: 'Es un mapa de Escolta situado en México. El ataque acompaña la carga por el mercado, la zona del juzgado y el interior de LumériCo. Durante la partida, mira la distancia al próximo checkpoint junto al reloj: ceder una esquina no cuesta lo mismo si todavía podéis volver que si entrega el tramo.' },
      { question: '¿Es obligatorio jugar Winston o D.Va en Dorado?', answer: 'No. Su movilidad facilita disputar alturas, pero el segundo tramo también tiene acceso por escalera y por el juzgado. Puedes preparar una ruta por tierra, presionar al rival desde otro ángulo o cruzar fuera de su tiro. Lo importante es que ese plan llegue a tiempo y no deje a la carga sin ayuda.' },
      { question: '¿Cuántos jugadores deben quedarse empujando?', answer: 'No hay un reparto fijo. Después de ganar, puede bastar uno mientras otros preparan el siguiente contacto; si queda un flanker detrás o el pusher está expuesto, necesita cobertura. Cerca del checkpoint o con poco tiempo también puede interesar que más compañeros acompañen el avance. Comprueba la amenaza y la urgencia antes de separaros.' },
      { question: '¿Hay que guardar una ultimate para el final de LumériCo?', answer: 'Depende de si habrá otra pelea y de qué necesita la actual. Con tiempo puedes preparar una respuesta para la siguiente disputa. Si estáis en el último intento, gastarla para cruzar o mantener vivo al que empuja puede ser mejor que perder con ella disponible.' },
      { question: '¿Qué comparo en una VOD de Dorado?', answer: 'Elige dos intentos de pasar la misma altura. Mira cuándo comenzó la subida o el salto, quién podía ayudar y si la carga avanzó durante esa presión. Después revisa el giro del Support: perder la curación al doblar el juzgado puede explicar una derrota que parecía un fallo del Tank.' },
    ],
    conclusion: 'En tu próxima partida de Dorado, prepara una disputa del segundo tramo antes de que empiece. Decide si subirás por tierra, saltarás con ayuda o presionarás desde la calle, y comprueba quién acompaña la carga. En el replay, mira si llegaste a intervenir mientras tus compañeros aún podían pelear. Ese momento dice más que haber terminado arriba con una baja cuando el resto ya había muerto.',
    relatedLinks: [
      { href: '/heroes/dva', label: 'Disputar una altura con D.Va' },
      { href: '/heroes/ana', label: 'Preparar la rotación de Ana' },
      { href: '/team-comps/winston', label: 'Coordinar la entrada de Winston' },
      { href: '/guides/composiciones-overwatch-5v5-6v6', label: 'Elegir un plan que podáis seguir' },
      { href: '/guides/review-vod-overwatch-espanol#cuaderno-vod', label: 'Comparar dos intentos en tu VOD' },
    ],
  },
]

export const MAP_PILLAR_SLUGS = MAP_PILLARS.map(map => map.slug)

export function getMapPillar(slug: string) {
  return MAP_PILLARS.find(map => map.slug === slug)
}
