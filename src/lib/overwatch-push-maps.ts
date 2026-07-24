import type { MapPillar } from './overwatch-maps'

const reviewed = { updatedAtIso: '2026-07-19', updatedAt: '19 de julio de 2026' }

const pushBasics: Pick<MapPillar, 'attackPlan' | 'defensePlan' | 'vodChecklist'> = {
  attackPlan: [
    { title: 'Gana antes de empujar', body: 'El robot no necesita compañía durante toda la pelea. Ocupa primero la cobertura que domina su siguiente recorrido y deja que avance cuando el espacio ya sea seguro.' },
    { title: 'Lee la distancia', body: 'Si vas por delante, no siempre necesitas otra pelea profunda. Si vas por detrás, una victoria sin tiempo para alcanzar la barricada rival puede no cambiar el resultado.' },
    { title: 'Aprovecha el punto de reaparición avanzado', body: 'El punto de control acorta tus regresos, pero solo si terminas la pelea y evitas muertes tardías que mezclen las reapariciones.' },
    { title: 'Sal de la pelea perdida', body: 'Cuando el rival ya tiene bajas y el robot se aleja, retrocede. Morir diez segundos después suele regalar también el siguiente contacto.' },
  ],
  defensePlan: [
    { title: 'Defiende una esquina', body: 'Elige dónde quieres recibir al robot y obliga al rival a cruzar hacia tu equipo. Correr detrás de TS-1 sin cobertura facilita demasiado el avance.' },
    { title: 'Corta la transición', body: 'Después de ganar, busca posición delante del robot sin perseguir hasta la zona de reaparición. La siguiente pelea importa más que una baja improbable.' },
      { title: 'Cuenta las reapariciones', body: 'El avance se rompe con entradas escalonadas. Espera a los cinco cuando haya tiempo y usa el camino central para reagrupar sin regalar otro duelo.' },
    { title: 'Protege la ventaja', body: 'Con más distancia, fuerza al rival a exponerse. No conviertas una situación favorable en una pelea profunda sin salida.' },
  ],
  vodChecklist: [
    '¿La primera pelea empezó sobre una cobertura o alrededor del robot?',
    '¿Quién tomó la posición delante de TS-1 tras cada victoria?',
    '¿Cuántos segundos separaron al primer y al último jugador del reagrupamiento?',
    '¿Las muertes tardías regalaron la siguiente esquina?',
    '¿Se aprovechó el punto de reaparición avanzado después del punto de control?',
    '¿El plan cambió según la distancia y el tiempo restante?',
  ],
}

export const PUSH_MAP_PILLARS: MapPillar[] = [
  {
    slug: 'colosseo', name: 'Colosseo', mode: 'Avance', location: 'Roma, Italia', image: '/maps/colosseo.png', imageAlt: 'Calles, puentes y edificios de Colosseo en Overwatch',
    seoTitle: 'Colosseo en Overwatch: guía de Avance, rutas y héroes', seoDescription: 'Guía de Colosseo en Overwatch: cómo controlar el centro, los puentes y las curvas, mejores héroes, composiciones y revisión de VOD.', ...reviewed,
    intro: [
      'Colosseo tiene una forma muy particular de hacer perder tiempo: el robot está cerca, parece que basta con volver a tocarlo y, de pronto, el equipo lleva tres peleas entrando por el pasillo central sin haber recuperado una sola esquina. Sus calles largas y sus puentes favorecen el daño a distancia, pero los interiores permiten cortar visión y cambiar de lado. El mapa no se gana siguiendo a TS-1; se gana llegando antes al lugar donde TS-1 necesitará protección.',
      'La barricada avanza por curvas que cambian constantemente las líneas de tiro. Después de una victoria, una persona puede quedarse con el robot mientras las demás ocupan la siguiente cobertura. Si los cinco empujan, el rival reaparece con altura y distancia. Si nadie empuja, una buena pelea no se convierte en metros. Colosseo exige repartir ambas tareas y abandonar rápido las peleas que ya no pueden salvarse.',
    ],
    quickRead: [
      { title: 'El centro decide el ritmo', body: 'Ocupa las coberturas laterales antes de pelear sobre TS-1. El equipo que controla las salidas puede elegir cuándo cerrar distancia.' },
      { title: 'Los puentes castigan la prisa', body: 'Comprueba líneas de curación y amenazas laterales antes de cruzar. La movilidad gastada para llegar no estará disponible para salir.' },
      { title: 'No persigas la curva anterior', body: 'Cuando el rival cede, toma la siguiente esquina. Perseguir hacia su zona de reaparición deja al robot parado y rompe tu propia formación.' },
    ],
    phases: [
      { name: 'Centro y primera pelea', attack: 'Acércate por cobertura y reparte al equipo entre dos ángulos cercanos. El Tank no necesita abrazar al robot: debe ocupar la esquina desde la que el rival quiere disparar. Fuerza una habilidad, cruza y enfoca un mismo sector. Quien gane puede empujar con una persona mientras el resto bloquea la ruta corta de regreso.', defense: 'Si pierdes un jugador pronto, sal por el lateral y evita morir alrededor del centro. La distancia inicial es pequeña; evitar muertes escalonadas vale más que un toque desesperado. Al volver, entra por una ruta común y evita convertir el pasillo en una fila de duelos.', vodReview: 'Mira dónde estaba cada equipo cuando TS-1 se activó. ¿Tu primera línea tenía cobertura? ¿Los DPS podían verse entre sí? Después mide cuánto tardó el perdedor en reagruparse de verdad.' },
      { name: 'Puentes y calles largas', attack: 'Toma la esquina antes de que llegue la barricada y desplaza a quien mantiene altura. No hace falta perseguirlo hasta el fondo: obligarlo a abandonar la línea ya permite avanzar. Conserva movilidad para la respuesta rival y deja una ruta visible hacia tus supports.', defense: 'Desgasta desde distancia y retrocede por el puente sin quedar atrapado. El robot obliga al ataque a avanzar, así que no bajes a campo abierto antes de tiempo. Cuando la barricada gire, cambia de cobertura con el núcleo y evita que un jugador quede defendiendo la calle anterior.', vodReview: 'Pausa en cada cruce de puente. Comprueba si la movilidad sirvió para tomar terreno o solo para llegar antes. Revisa también cuántos metros avanzó el robot mientras todos perseguían.' },
      { name: 'Punto de control y tramo profundo', attack: 'El punto de control merece una pelea con recursos, no tres intentos a medias. Espera a que reaparezcan tus compañeros, fuerza la herramienta que frena tu entrada y usa una combinación sencilla. Tras desbloquear el punto de reaparición avanzado, estabiliza antes de lanzarte al tramo final: una muerte tardía puede anular esa ventaja.', defense: 'Cerca de tu zona de reaparición puedes volver a disputar, pero coordina quién toca y quién dispara desde cobertura. Si recuperas el robot, no persigas demasiado; vuelve a tomar la esquina que obliga al rival a exponerse. Con ventaja de distancia, el tiempo trabaja para ti.', vodReview: 'Separa los contactos del punto de control. Anota quién tocó, qué recurso lo sostuvo y si había daño detrás. Después comprueba si el punto de reaparición avanzado produjo una pelea completa o una cadena de entradas rápidas.' },
    ],
    ...pushBasics,
    heroPicks: [
      { name: 'Sigma', slug: 'sigma', role: 'tank', reason: 'Sostiene calles largas y avanza de cobertura en cobertura.' }, { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Disputa puentes y corrige un lateral comprometido.' },
      { name: 'Sojourn', slug: 'sojourn', role: 'dps', reason: 'Aprovecha sightlines largas sin renunciar a movilidad.' }, { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Usa pasillos y alturas para cerrar objetivos tocados.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Castiga cruces previsibles desde coberturas lejanas.' }, { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Sigue cambios de lado y limpia control en puntos de control.' },
    ],
    compositions: [
      { name: 'Poke de calles', lineup: ['Sigma', 'Sojourn', 'Cassidy', 'Ana', 'Kiriko'], plan: 'Sigma gana la primera esquina, los DPS abren dos líneas cercanas y Ana juega una cobertura atrás. Kiriko vigila el lateral y acompaña la rotación.', weakness: 'Sufre si se queda quieto cuando dive cruza la distancia o si tarda demasiado en girar por interiores.' },
      { name: 'Dive de puentes', lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'], plan: 'Winston marca una posición alta y los DPS llegan sobre el mismo objetivo. Ana avanza por cobertura y Kiriko sostiene el segundo movimiento.', weakness: 'Se desarma si cada móvil toma un puente diferente o si Ana queda aislada durante la transición.' },
    ],
    mistakes: ['Pelear encima del robot sin controlar las salidas del centro.', 'Empujar con cinco y regalar la siguiente esquina.', 'Cruzar el puente con movilidad ya gastada.', 'Perseguir hacia zona de reaparición después de ganar.', 'Volver a disputar el punto de control de uno en uno.'],
    faq: [
      { question: '¿Qué tipo de mapa es Colosseo?', answer: 'Colosseo es un mapa de Avance en Roma. Ambos equipos disputan TS-1 y tratan de llevar su barricada más lejos que la rival.' },
      { question: '¿Cómo se gana la primera pelea?', answer: 'Controla las coberturas laterales, fuerza un recurso y ataca un mismo sector en lugar de apilarte alrededor del robot.' },
      { question: '¿Qué héroes funcionan bien?', answer: 'Sigma, D.Va, Sojourn, Genji, Ana y Kiriko aprovechan sus líneas, puentes y cambios de altura.' },
      { question: '¿Qué revisar en una VOD?', answer: 'Revisa posición inicial, control de esquinas, metros convertidos tras victorias, reapariciones separadas y últimos intentos del punto de control.' },
    ],
    relatedLinks: [{ href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Elegir composición' }, { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' }, { href: '/heroes/ana', label: 'Guía de Ana' }, { href: '/heroes/genji', label: 'Guía de Genji' }],
  },
  {
    slug: 'esperanca', name: 'Esperança', mode: 'Avance', location: 'Portugal', image: '/maps/esperanca.png', imageAlt: 'Plaza, torre y calles portuguesas de Esperança en Overwatch',
    seoTitle: 'Esperança en Overwatch: guía de Avance y rotaciones', seoDescription: 'Guía de Esperança en Overwatch: centro, atajos, punto de control, mejores héroes, composiciones, errores y checklist para revisar tu VOD.', ...reviewed,
    intro: [
      'Esperança es fácil de leer desde lejos y difícil de ejecutar cuando empieza la pelea. La torre central ayuda a orientarse, pero sus calles peatonales, interiores y atajos permiten que un jugador llegue al lateral mucho antes que el resto. Esa diferencia de pocos segundos decide muchas rondas: el Tank entra, el héroe de flanco todavía gira y los supports descubren que la pared portuguesa más bonita del mapa también corta la curación.',
      'Avance recompensa a quien piensa una esquina por delante. Tras ganar, una persona acompaña a TS-1 y las demás ocupan puertas, plaza o altura para recibir el siguiente contacto. Esperança ofrece rutas cortas para volver al robot, por lo que perseguir eliminaciones es especialmente tentador. La disciplina consiste en tomar la posición útil y dejar que el rival sea quien tenga que exponerse.',
    ],
    quickRead: [
      { title: 'La torre sirve de referencia', body: 'Usa el centro para reagrupar y nombrar rutas. No dejes que cada jugador interprete el atajo de una forma distinta.' },
      { title: 'Los interiores cortan curación', body: 'Un flanco corto funciona si coincide con la calle principal y conserva salida. Dar otra vuelta al edificio suele llegar tarde.' },
      { title: 'El robot cambia de dueño rápido', body: 'Después de una victoria, confirma las bajas antes de perseguir. Un rival vivo puede devolver TS-1 al centro mientras miras hacia su zona de reaparición.' },
    ],
    phases: [
      { name: 'Torre y centro', attack: 'Toma una cobertura con visión de la plaza y abre un lateral cercano. La primera pelea no necesita tres flancos: necesita que el rival no pueda disparar a todos desde la misma puerta. Cuando aparezca una ventaja, cruza y deja a una persona con TS-1 mientras las demás preparan la calle.', defense: 'Si pierdes el centro, retrocede por una ruta que mantenga unido al equipo. Los interiores permiten salir, pero también esconden muertes tardías. Reagrupa cerca de una esquina desde la que todos puedan ayudar y evita volver al robot por puertas distintas.', vodReview: 'Comprueba la diferencia de llegada entre los cinco jugadores y qué ruta tomó cada uno. Una pelea que empieza con tres personas rara vez se arregla con mejor puntería.' },
      { name: 'Calles residenciales y atajos', attack: 'Usa los interiores para crear un ángulo lateral corto mientras el núcleo avanza por cobertura. El lateral debe aparecer cuando el Tank presione, no antes. Tras ganar espacio, abandona las habitaciones y ocupa la esquina siguiente; el objetivo sigue estando en la calle.', defense: 'Desgasta desde balcones y puertas con una retirada prevista. Si un atacante entra por dentro, márcalo y ayúdalo desde cerca sin desarmar toda la defensa. Ceder una fachada con vida permite volver a pelear en el siguiente giro.', vodReview: 'En cada muerte interior, revisa si existía línea de ayuda y si la entrada coincidió con el robot. Después mide el progreso perdido por perseguir dentro de edificios.' },
      { name: 'Punto de control y tramo final', attack: 'Agrupa antes de comprometer definitivas. La calle profunda favorece a la defensa y exige limpiar una esquina antes de que TS-1 llegue. Usa una herramienta para iniciar y guarda otra para el último intento; gastar cinco recursos por el punto de control suele dejar el avance final sin respuesta.', defense: 'Aprovecha la cercanía de la zona de reaparición sin entrar solo. El primer jugador toca o ralentiza y el resto prepara daño desde cobertura. Si recuperas el robot con ventaja de distancia, escolta la transición hacia una esquina segura en vez de perseguir hasta el centro rival.', vodReview: 'Anota qué definitiva abrió el punto de control y cuál quedó para responder. Revisa si los contactos defensivos construyeron una pelea o solo retrasaron las reapariciones.' },
    ],
    ...pushBasics,
    heroPicks: [
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Salta entre balcones y rompe posiciones separadas.' }, { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Cubre atajos y vuelve rápido al robot.' },
      { name: 'Tracer', slug: 'tracer', role: 'dps', reason: 'Reconoce interiores y sincroniza presión lateral.' }, { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Aprovecha cambios de nivel y objetivos aislados.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Mantiene líneas de calle y castiga cruces.' }, { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Corrige rotaciones interiores y acompaña movilidad.' },
    ],
    compositions: [
      { name: 'Dive de atajos', lineup: ['Winston', 'Tracer', 'Genji', 'Ana', 'Kiriko'], plan: 'Tracer informa, Winston ocupa la salida del interior y Genji llega después sobre el mismo sector. Ana conserva la calle y Kiriko acompaña la salida.', weakness: 'Las paredes dejan a Ana atrás si el núcleo encadena giros sin comprobar visión.' },
      { name: 'Rush de calles', lineup: ['Reinhardt', 'Mei', 'Cassidy', 'Lúcio', 'Kiriko'], plan: 'Lúcio mueve al bloque entre esquinas, Reinhardt toma cobertura y Mei separa al jugador que cruza tarde.', weakness: 'Pierde valor si persigue por interiores o no puede cerrar distancia contra altura bien colocada.' },
    ],
    mistakes: ['Usar tres atajos distintos en la primera pelea.', 'Entrar en un interior fuera de la coordinación del Tank.', 'Perseguir dentro de edificios mientras TS-1 retrocede.', 'Gastar todas las definitivas en el punto de control.', 'Confundir punto de reaparición avanzado con permiso para entrar solo.'],
    faq: [
      { question: '¿Qué tipo de mapa es Esperança?', answer: 'Es un mapa de Avance ambientado en Portugal. Los equipos disputan el robot y empujan barricadas en direcciones opuestas.' },
      { question: '¿Cómo usar los atajos?', answer: 'Como laterales cortos que coinciden con la presión principal, no como rutas independientes que separan al equipo.' },
      { question: '¿Qué héroes funcionan bien?', answer: 'Winston, D.Va, Tracer, Genji, Ana y Kiriko aprovechan balcones, interiores y rotaciones.' },
      { question: '¿Qué revisar en una VOD?', answer: 'Revisa tiempos de llegada, sincronización de atajos, líneas de curación, progreso del robot y uso de definitivas en punto de control.' },
    ],
    relatedLinks: [{ href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' }, { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Revisar habilidades' }, { href: '/heroes/winston', label: 'Guía de Winston' }, { href: '/heroes/kiriko', label: 'Guía de Kiriko' }],
  },
  {
    slug: 'new-queen-street', name: 'New Queen Street', mode: 'Avance', location: 'Toronto, Canadá', image: '/maps/new-queen-street.png', imageAlt: 'Calles nevadas, tranvía y edificios de New Queen Street en Overwatch',
    seoTitle: 'New Queen Street: guía de Avance, rutas y héroes', seoDescription: 'Guía de New Queen Street en Overwatch: cómo jugar el centro, las calles y el punto de control, con composiciones y revisión de VOD.', ...reviewed,
    intro: [
      'New Queen Street mezcla calles abiertas con tiendas y pasillos que parecen invitar al flanco perfecto. El problema es que muchos de esos recorridos tardan más que la pelea. Mientras un DPS rodea el bloque, el robot ya ha cambiado de dueño y la primera línea retrocede sin saber por qué está jugando cuatro contra cinco. El mapa premia los laterales cortos, visibles y sincronizados.',
      'La nieve no cambia la regla principal de Avance: gana espacio delante de TS-1 y convierte cada victoria en distancia. Las calles ofrecen líneas de tiro largas, pero el tranvía, las fachadas y las esquinas cortan visión con rapidez. Cada avance necesita una nueva cobertura para los supports y una salida para quien presiona el lateral. Quedarse pegado al robot simplifica demasiado el trabajo rival.',
    ],
    quickRead: [
      { title: 'El flanco necesita timing', body: 'Tiendas e interiores sirven para abrir un ángulo corto. Si la ruta tarda toda la pelea, no era un flank: era jugar 4v5.' },
      { title: 'El tranvía corta el mapa', body: 'Usa sus coberturas para cruzar y reagrupar, pero confirma dónde quedan tus supports antes de cambiar de lado.' },
      { title: 'Las calles favorecen el poke', body: 'No respondas caminando en línea recta. Avanza por fachadas, fuerza cooldowns y acelera solo cuando ya puedas cerrar distancia.' },
    ],
    phases: [
      { name: 'Centro y tranvía', attack: 'Ocupa una cobertura lateral y evita amontonarte alrededor de TS-1. Presiona desde dos ángulos cercanos hasta forzar movilidad o una habilidad defensiva; después cruza sobre un mismo sector. El ganador debe adelantar la formación hacia la calle mientras una persona inicia el empuje.', defense: 'Si la primera baja es rival, corta su salida sin perseguir por todas las tiendas. Si es propia, abandona el centro y agrupa junto a una fachada segura. Volver por turnos alrededor del tranvía regala carga de definitiva y más distancia.', vodReview: 'Revisa la ruta del primer jugador que murió. ¿Podía recibir ayuda? ¿Su lateral coincidió con la presión central? Después cuenta cuántos metros produjo realmente la victoria.' },
      { name: 'Tiendas y calles largas', attack: 'Camina de cobertura en cobertura y usa interiores para negar una línea, no para esconder a medio equipo. Un jugador móvil puede presionar la salida de la defensa mientras el núcleo conserva visión del robot. Cuando ganes la esquina, detén la persecución y prepara el siguiente contacto.', defense: 'Mantén alcance mientras puedas y cede cuando el rival cierre distancia con recursos. Las puertas ofrecen una segunda defensa si llegas vivo. Vigila el lateral con una persona y ayuda desde cerca; no abandones toda la calle por un héroe de flanco que ya no amenaza TS-1.', vodReview: 'Pausa cuando alguien entra en una tienda. Mide cuánto tiempo tarda en volver a influir y qué ocurre con el robot mientras tanto. Revisa también si la defensa murió tarde por aguantar una esquina perdida.' },
      { name: 'Punto de control y avance final', attack: 'Antes del punto de control, espera a los jugadores que reaparecen y decide qué recurso abre la puerta. El avance final tiene líneas más incómodas y reapariciones defensivas cercanas, así que reserva una respuesta. Tras activar el punto de reaparición avanzado, evita acelerar con tres personas solo porque el regreso parece corto.', defense: 'Organiza el toque desde cobertura y aprovecha el daño sobre el cruce. Si recuperas el robot, empuja lo suficiente para obligar al rival a girarse, pero no conviertas la ventaja en una persecución profunda. El reloj y la distancia pueden defender por ti.', vodReview: 'Compara el tiempo entre las reapariciones y la entrada al punto de control. Anota si las definitivas se encadenaron con intención y si cada último intento tenía jugadores capaces de apoyarlo.' },
    ],
    ...pushBasics,
    heroPicks: [
      { name: 'Sigma', slug: 'sigma', role: 'tank', reason: 'Controla calles largas y avanza por coberturas.' }, { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Contesta altura y laterales sin abandonar el núcleo.' },
      { name: 'Sojourn', slug: 'sojourn', role: 'dps', reason: 'Combina presión a distancia con movilidad.' }, { name: 'Tracer', slug: 'tracer', role: 'dps', reason: 'Usa tiendas como rutas cortas y regresa rápido.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Aprovecha calles y castiga entradas visibles.' }, { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Cambia de lado y rescata laterales comprometidos.' },
    ],
    compositions: [
      { name: 'Poke móvil', lineup: ['Sigma', 'Sojourn', 'Tracer', 'Ana', 'Kiriko'], plan: 'Sigma toma la esquina, Sojourn mantiene la calle y Tracer abre un lateral corto. Ana avanza por coberturas y Kiriko vigila la transición.', weakness: 'Puede desordenarse si Tracer alarga la ruta o si el núcleo no rota antes de recibir dive.' },
      { name: 'Dive urbano', lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'], plan: 'Winston marca un sector junto al tranvía y los DPS convergen. Ana sostiene la calle mientras Kiriko acompaña el segundo movimiento.', weakness: 'Los interiores cortan a Ana y castigan una cadena de entradas sin pausa.' },
    ],
    mistakes: ['Tomar un flanco que tarda más que la pelea.', 'Apilarse alrededor del robot en el centro.', 'Cruzar de lado sin comprobar visión de supports.', 'Perseguir por tiendas tras ganar la esquina.', 'Entrar con reapariciones separadas después del punto de reaparición avanzado.'],
    faq: [
      { question: '¿Qué tipo de mapa es New Queen Street?', answer: 'Es un mapa de Avance en Toronto donde ambos equipos disputan TS-1 y empujan su propia barricada.' },
      { question: '¿Cómo usar las tiendas?', answer: 'Como rutas cortas para crear presión al mismo tiempo que el núcleo. Los rodeos largos suelen dejar al equipo en inferioridad.' },
      { question: '¿Qué héroes funcionan bien?', answer: 'Sigma, D.Va, Sojourn, Tracer, Ana y Kiriko aprovechan las calles y cambios de lado.' },
      { question: '¿Qué revisar en una VOD?', answer: 'Revisa duración de flancos, control del tranvía, líneas de curación, conversión de victorias y reapariciones del punto de control.' },
    ],
    relatedLinks: [{ href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Elegir composición' }, { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' }, { href: '/heroes/dva', label: 'Guía de D.Va' }, { href: '/heroes/ana', label: 'Guía de Ana' }],
  },
  {
    slug: 'runasapi', name: 'Runasapi', mode: 'Avance', location: 'Perú', image: '/maps/runasapi.png', imageAlt: 'Plaza, arquitectura andina y monumento de Runasapi en Overwatch',
    seoTitle: 'Runasapi en Overwatch: guía de Avance, rutas y héroes', seoDescription: 'Guía de Runasapi en Overwatch: cómo jugar el centro, las alturas y puntos de control, mejores héroes, composiciones y revisión de VOD.', ...reviewed,
    intro: [
      'Runasapi parece amplio por sus vistas de los Andes, pero la partida se decide entre plazas, escaleras y puertas bastante concretas. Las alturas permiten presionar el robot sin estar encima y los laterales conectan rápido con el centro. Esa cercanía invita a entrar una y otra vez; también explica por qué tantos equipos pasan un minuto completo sin agruparse de verdad.',
      'El recorrido de TS-1 cambia de nivel y obliga a mover las líneas de curación. Un Tank puede cruzar una esquina y sentirse acompañado mientras sus supports siguen mirando una pared. Jugar bien Runasapi consiste en avanzar por tramos, ocupar la altura que domina el siguiente giro y reconocer cuándo la pelea ya está perdida. El mapa ofrece rutas para escapar; usarlas a tiempo conserva la siguiente oportunidad.',
    ],
    quickRead: [
      { title: 'La altura controla la plaza', body: 'Disputa escaleras y plataformas antes de seguir al robot. Desde abajo, el equipo recibe presión sin una respuesta limpia.' },
      { title: 'Los cambios de nivel cortan visión', body: 'Confirma que tus supports pueden ver la siguiente cobertura antes de acelerar con movilidad.' },
      { title: 'Regresar rápido no es agruparse', body: 'Las rutas al centro son cortas, pero cinco llegadas separadas siguen siendo cinco duelos perdidos.' },
    ],
    phases: [
      { name: 'Monumento y plaza central', attack: 'Toma una de las coberturas exteriores y presiona la plataforma que sostiene al rival. El Tank abre un sector y los DPS deben usar ese mismo espacio, no iniciar otra pelea al otro lado del monumento. Cuando aparezca la ventaja, una persona empuja y el resto corta las rutas más cortas de regreso.', defense: 'Si pierdes el centro, sal por la plaza exterior y reúne al equipo antes de la siguiente escalera. No merece la pena tocar por una distancia mínima. Conserva movilidad y control para recibir al robot desde una esquina con altura.', vodReview: 'Dibuja la formación alrededor del monumento. ¿Había dos ángulos que se ayudaban o cinco posiciones independientes? Después revisa la primera muerte tardía del equipo derrotado.' },
      { name: 'Escaleras, mercado y alturas', attack: 'Adelanta jugadores para tomar plataforma mientras TS-1 sube. Las escaleras comprimen la entrada y hacen valioso forzar control antes de cruzar. Un lateral por mercado debe coincidir con la presión principal y regresar cuando el rival ceda; perseguir dentro pierde el robot.', defense: 'Usa altura para forzar recursos y baja hacia la siguiente cobertura antes de quedar rodeado. Si el rival divide la entrada, enfoca el sector más comprometido y evita mandar un jugador distinto a cada escalera. Ceder unos metros mantiene la defensa viva.', vodReview: 'Comprueba si la primera línea desapareció de la visión al subir y cuánto tardó el lateral en influir. Revisa si la defensa abandonó altura con vida o después de perder la salida.' },
      { name: 'Punto de control y tramo final', attack: 'Llega con los cinco y una secuencia de definitivas sencilla. El tramo profundo favorece al defensor y castiga a quien usa movilidad solo para tocar. Tras ganar, ocupa la esquina delante de TS-1 y guarda una respuesta para el regreso rápido rival.', defense: 'La zona de reaparición cercana permite volver a disputar con frecuencia, pero no justifica entrar solo. Elige un héroe para tocar y coloca daño desde las escaleras o la puerta. Si tu equipo conserva la ventaja global, ganar tiempo y salir puede ser mejor que perseguir una eliminación.', vodReview: 'Separa cada intento del punto de control y anota quién podía apoyar el toque. Después revisa si el equipo con ventaja jugó según el reloj o regaló una pelea profunda sin necesidad.' },
    ],
    ...pushBasics,
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Disputa plataformas y corrige cambios de nivel.' }, { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Abre peleas sobre altura y corta visión.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Acompaña verticalidad y remata objetivos aislados.' }, { name: 'Sojourn', slug: 'sojourn', role: 'dps', reason: 'Presiona plazas y conserva movilidad para las escaleras.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Castiga cruces y sostiene desde la plaza.' }, { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Sigue los cambios de altura y limpia control.' },
    ],
    compositions: [
      { name: 'Dive andino', lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'], plan: 'Winston ocupa plataforma, Genji y Tracer convergen y Ana avanza desde plaza. Kiriko acompaña la salida o limpia el control.', weakness: 'Las escaleras dejan a Ana sin visión si el núcleo encadena saltos sin estabilizar.' },
      { name: 'Poke de plazas', lineup: ['Sigma', 'Sojourn', 'Cassidy', 'Ana', 'Kiriko'], plan: 'Sigma toma cobertura, los DPS reparten presión alrededor del monumento y Ana sostiene desde una línea segura.', weakness: 'Pierde altura contra dive si tarda en rotar o abre ángulos demasiado separados.' },
    ],
    mistakes: ['Pelear abajo mientras el rival conserva plataforma.', 'Acelerar por una escalera sin visión de supports.', 'Confundir una ruta corta con permiso para entrar solo.', 'Perseguir por mercado mientras TS-1 cambia de dueño.', 'Gastar movilidad únicamente para tocar el punto de control.'],
    faq: [
      { question: '¿Qué tipo de mapa es Runasapi?', answer: 'Runasapi es un mapa de Avance ambientado en Perú. Los equipos luchan por TS-1 y por llevar su barricada más lejos.' },
      { question: '¿Qué posición es más importante?', answer: 'Las plataformas y escaleras que dominan la siguiente parte del recorrido, no el espacio exacto donde está el robot.' },
      { question: '¿Qué héroes funcionan bien?', answer: 'D.Va, Winston, Genji, Sojourn, Ana y Kiriko aprovechan su verticalidad y sus cambios de nivel.' },
      { question: '¿Qué revisar en una VOD?', answer: 'Revisa control de altura, líneas al subir, coordinación de laterales, muertes tardías y apoyo de los últimos intentos.' },
    ],
    relatedLinks: [{ href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' }, { href: '/guides/como-revisar-cooldowns-overwatch', label: 'Revisar habilidades' }, { href: '/heroes/dva', label: 'Guía de D.Va' }, { href: '/heroes/genji', label: 'Guía de Genji' }],
  },
]
