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
  relatedLinks: { href: string; label: string }[]
}

export const MAP_PILLARS: MapPillar[] = [
  {
    slug: 'neon-junction',
    name: 'Neon Junction',
    mode: 'Híbrido',
    location: 'Tokio, Japón',
    image: '/maps/neon-junction.png',
    imageAlt: 'Calles iluminadas y edificios de Neon Junction en Overwatch',
    seoTitle: 'Neon Junction en Overwatch: rutas, héroes y composiciones',
    seoDescription: 'Guía de Neon Junction en Overwatch: cómo atacar y defender el mapa híbrido, rutas, héroes recomendados, composiciones, errores y checklist de VOD.',
    updatedAt: '2 de julio de 2026',
    intro: [
      'Neon Junction es un mapa híbrido ambientado en las calles nocturnas de Tokio. La partida empieza con una captura y continúa escoltando a ANDROMEDA III hacia Zuiko-za. Esa mezcla obliga a cambiar de ritmo: el equipo que funciona bien delante del primer punto puede quedarse sin respuestas cuando la carga empieza a avanzar por calles con más ángulos y rutas laterales.',
      'La primera prioridad no es memorizar cada esquina, sino entender qué espacio necesita tu composición. Los equipos de brawl quieren cruzar juntos y pelear alrededor de cobertura; las composiciones de dive buscan una backline aislada; el poke necesita líneas limpias sin quedarse atrapado cuando la pelea gira. Si sabes qué condición persigues, el mapa deja de parecer una colección de callejones y empieza a tener decisiones claras.',
    ],
    quickRead: [
      { title: 'Condición principal', body: 'Controlar los laterales antes de tocar el objetivo. Entrar recto mientras el rival conserva dos ángulos suele convertir la pelea en una lenta pérdida de recursos.' },
      { title: 'Lo que más castiga', body: 'Separarse sin una ruta de salida. Los callejones permiten flanquear, pero también aíslan a quien entra sin comprobar dónde están sus supports.' },
      { title: 'Cambio de ritmo', body: 'Tras capturar, revisa si tu composición sigue teniendo alcance y movilidad para acompañar la carga. No mantengas cinco picks por inercia.' },
    ],
    phases: [
      {
        name: 'Captura inicial',
        attack: 'Atacar el primer punto exige limpiar una entrada y un lateral antes de comprometerse. El Tank abre una zona segura, pero no debería gastar toda su supervivencia solo para pisar. Un DPS puede enseñar el ángulo secundario y volver; el objetivo es obligar a la defensa a mirar en dos direcciones sin regalar una baja temprana.',
        defense: 'La defensa gana cuando mantiene líneas cruzadas y puede retroceder sin convertirse en cinco duelos separados. Empieza en una posición que permita ceder unos metros, conservar cooldowns y volver a disputar. Perseguir a un flanker demasiado lejos suele abrir el punto para el resto del ataque.',
        vodReview: 'Pausa diez segundos antes de cada engage. Comprueba cuántos ángulos controlaba tu equipo, quién podía recibir curación y qué cooldown importante se gastó antes de que alguien tocara el punto.',
      },
      {
        name: 'Calles comerciales',
        attack: 'Con la carga en movimiento, el equipo atacante debe adelantarse lo suficiente para tomar la siguiente cobertura sin abandonar al jugador que empuja. La carga cura y ofrece protección, pero no sustituye el control del high ground o de los accesos laterales. Avanza después de confirmar una ventaja, no porque el objetivo se haya movido dos metros.',
        defense: 'La defensa debe escoger una esquina concreta para reagruparse. Entrar de uno en uno desde respawn alimenta ultimates y regala distancia. Cuando no puedas detener la carga de forma limpia, usa el tiempo para preparar una pelea completa en la siguiente zona y conserva la ultimate que realmente pueda iniciarla.',
        vodReview: 'Mide cuánto tiempo pasó la carga avanzando gratis después de una pelea ganada. Si cuatro jugadores perseguían eliminaciones mientras nadie ocupaba el siguiente espacio útil, la ventaja no se convirtió en progreso real.',
      },
      {
        name: 'Acceso a Zuiko-za',
        attack: 'El tramo final premia la paciencia. Las defensas reaparecen cerca y pueden encadenar varios intentos, así que conviene entrar con una combinación de ultimates sencilla y un objetivo prioritario. Guardar cinco definitivas para la pelea perfecta suele ser peor que usar dos para abrir una ventana clara.',
        defense: 'Defender el final no significa permanecer pegado al marcador. Controla la cobertura desde la que el rival quiere iniciar y reserva movilidad o peel para el segundo contacto. Si todos miran al Tank sobre la carga, un DPS lateral puede decidir la pelea sin oposición.',
        vodReview: 'Revisa por separado la primera entrada y el recontest. Anota quién debía iniciar, qué ultimate respondía al rival y si el equipo volvió a pelear con una formación reconocible o simplemente corrió hacia el objetivo.',
      },
    ],
    attackPlan: [
      { title: 'Elige una entrada', body: 'Marca una ruta principal y un lateral corto. Tres rutas simultáneas sin coordinación solo dividen curación y daño.' },
      { title: 'Fuerza el primer recurso', body: 'Presiona hasta ver movilidad, una habilidad defensiva o una rotación. El engage empieza después de esa respuesta, no antes.' },
      { title: 'Convierte la baja', body: 'Tras eliminar a alguien, ocupa la siguiente cobertura antes de perseguir. En híbrido, ganar espacio vale tanto como completar la eliminación.' },
      { title: 'Revisa los picks', body: 'Al comenzar la escolta, cambia si tu héroe ya no puede mantener su rango, acceder a la altura o sobrevivir a los laterales.' },
    ],
    defensePlan: [
      { title: 'Defiende con salida', body: 'Toda posición inicial necesita una cobertura de retirada. Morir tarde en el punto puede costar también la primera pelea de escolta.' },
      { title: 'Protege la backline', body: 'Los accesos laterales hacen valioso el peel. Identifica quién ayuda al support si Shion, Tracer o Genji cruzan la primera línea.' },
      { title: 'Corta el ritmo', body: 'No hace falta ganar cada pelea de forma total. Forzar ultimates y reagruparse a tiempo puede dejar al ataque sin recursos para el siguiente tramo.' },
      { title: 'Recontesta con plan', body: 'Decide quién toca y quién prepara daño. Cinco jugadores entrando sobre la carga desde el mismo ángulo facilitan demasiado la respuesta rival.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar altura, cubrir una entrada con Matriz y volver rápido a proteger a sus supports.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Aprovecha las rutas laterales para dividir la atención, siempre que tenga una cobertura clara para salir.' },
      { name: 'Shion', slug: 'shion', role: 'dps', reason: 'Su movilidad encaja con los callejones y los cambios de ángulo, pero necesita entrar después de que aparezca una oportunidad.' },
      { name: 'Tracer', slug: 'tracer', role: 'dps', reason: 'Mantiene presión lateral y castiga rotaciones lentas sin obligar al equipo a abandonar la carga.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Aporta amenaza desde media distancia y puede castigar entradas previsibles si juega desde cobertura.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Paso ligero permite acompañar cambios de altura y Suzu estabiliza engages agresivos cerca de esquinas.' },
    ],
    compositions: [
      {
        name: 'Dive móvil',
        lineup: ['Winston', 'Tracer', 'Shion', 'Ana', 'Kiriko'],
        plan: 'Ana prepara presión desde cobertura; Winston obliga a girarse y los DPS entran después sobre el mismo sector. Kiriko conserva Paso ligero para estabilizar la salida, no para empezar sola.',
        weakness: 'Sufre si Winston salta fuera de la visión, los DPS eligen objetivos distintos o la defensa juega compacta con mucho control.',
      },
      {
        name: 'Brawl flexible',
        lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
        plan: 'Lúcio acelera el cruce de calles abiertas, Mei limita una retirada y Reinhardt convierte cada esquina en una pelea corta. Cassidy vigila el flanco mientras Kiriko limpia el recurso que frene la entrada.',
        weakness: 'Pierde valor si avanza sin velocidad, no alcanza al poke rival o gasta Muro y Suzu antes de que la pelea esté realmente comprometida.',
      },
    ],
    mistakes: [
      'Entrar por un callejón solo porque está abierto, sin comprobar si existe una salida o línea de curación.',
      'Quedarse sobre la carga con cuatro jugadores cuando ya se ganó la pelea y nadie toma la siguiente cobertura.',
      'Defender el primer punto hasta morir tarde, regalando también la transición a la fase de escolta.',
      'Usar todas las ultimates en la primera entrada del tramo final y no conservar nada para el recontest.',
      'Mantener una composición de corto alcance cuando el equipo ya no puede cruzar ni disputar los ángulos del rival.',
    ],
    vodChecklist: [
      '¿Desde qué cobertura empezó cada pelea y dónde estaba la salida?',
      '¿Cuántos jugadores podían verte o curarte cuando usaste movilidad?',
      '¿Quién controlaba el lateral más cercano a la backline?',
      '¿La primera baja produjo espacio o solo una persecución larga?',
      '¿Qué ultimate abrió cada engage y cuál se guardó para responder?',
      '¿Cambiaste de héroe cuando cambió la geometría de la partida?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Neon Junction?', answer: 'Neon Junction es un mapa híbrido. El ataque debe capturar una zona inicial y después escoltar una carga hacia Zuiko-za, mientras la defensa intenta agotar el tiempo.' },
      { question: '¿Qué héroes funcionan bien en Neon Junction?', answer: 'Los héroes móviles y los que pueden controlar laterales tienen valor, pero no existe un pick obligatorio. D.Va, Winston, Tracer, Shion, Ana y Kiriko ofrecen herramientas útiles si la composición mantiene visión y entra coordinada.' },
      { question: '¿Cómo se ataca el primer punto de Neon Junction?', answer: 'Conviene limpiar una entrada principal y un lateral corto antes de tocar. El objetivo no es rodear con todo el equipo, sino dividir la atención defensiva y entrar después de forzar un cooldown importante.' },
      { question: '¿Qué debo revisar en una VOD de Neon Junction?', answer: 'Empieza por posición inicial, líneas de curación, control de laterales y conversión de peleas ganadas. Después revisa las ultimates del tramo final y si los recontests tuvieron una función clara.' },
    ],
    relatedLinks: [
      { href: '/overwatch-temporada-3-into-the-tigers-den', label: 'Novedades de Season 3' },
      { href: '/heroes/shion', label: 'Guía de Shion' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Elegir composición' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' },
    ],
  },
  {
    slug: 'kings-row',
    name: "King's Row",
    mode: 'Híbrido',
    location: 'Londres, Reino Unido',
    image: '/maps/kings-row.png',
    imageAlt: "Estatua y calles nocturnas de King's Row en Overwatch",
    seoTitle: "King's Row en Overwatch: ataque, defensa y composiciones",
    seoDescription: "Guía de King's Row en Overwatch: cómo atacar y defender cada tramo, mejores héroes y composiciones, errores frecuentes y checklist para revisar tu VOD.",
    updatedAt: '2 de julio de 2026',
    intro: [
      "King's Row es uno de los mapas híbridos más conocidos de Overwatch: primero se captura el punto A y después se escolta la carga por las calles hasta el tramo final. Su fama de mapa de brawl tiene sentido porque abundan las esquinas y las peleas a media y corta distancia, pero reducirlo a 'elige Reinhardt y avanza' deja fuera buena parte de lo que decide una partida.",
      'El mapa recompensa a los equipos que controlan la siguiente esquina antes de mover la carga. También castiga mucho las muertes tardías: una defensa que cae escalonada puede perder dos tramos seguidos, y un ataque que persigue demasiado puede llegar al siguiente engage sin posiciones ni cooldowns. La pregunta útil no es quién empuja, sino qué espacio permite que la carga siga avanzando sin regalar la backline.',
    ],
    quickRead: [
      { title: 'Condición principal', body: 'Ganar la esquina y la altura que dominan el siguiente tramo. La carga avanza como consecuencia de ese control, no al revés.' },
      { title: 'Lo que más castiga', body: 'Morir tarde y reaparecer de uno en uno. Las distancias de respawn convierten un stagger pequeño en muchos metros gratuitos.' },
      { title: 'Picks flexibles', body: 'Brawl es cómodo, pero dive y poke funcionan si respetan las esquinas y no permiten que el rival cierre distancia gratis.' },
    ],
    phases: [
      {
        name: 'Punto A: hotel y estatua',
        attack: 'El ataque necesita atravesar el choke sin permanecer demasiado tiempo disparando desde la puerta. Hotel ofrece una rotación corta y la zona de estatua permite abrir ángulos, pero ambos caminos deben servir al mismo engage. Si un grupo entra por hotel y el resto sigue esperando en spawn, la defensa resuelve cada amenaza por separado.',
        defense: 'La defensa debe usar la altura y las coberturas para forzar recursos antes del punto. No hace falta permanecer en el choke hasta morir: retirarse hacia estatua con vida permite otra pelea. El jugador que vigila hotel debe comunicar y volver, no perseguir hasta perder la formación.',
        vodReview: 'Comprueba cuánto tiempo pasó el ataque delante del choke sin cambiar de posición. En defensa, revisa si la primera retirada ocurrió con cooldowns disponibles o después de que ya no existiera una salida segura.',
      },
      {
        name: 'Calles y segundo tramo',
        attack: 'Después de capturar, el ataque debe tomar la primera esquina y disputar las alturas antes de apilarse en la carga. Un jugador empuja mientras el resto prepara el siguiente contacto. Cuando la defensa retrocede, ocupar la esquina correcta suele generar más progreso que perseguir una eliminación hasta su spawn.',
        defense: 'La defensa busca estabilizarse y pelear desde una esquina donde el ataque tenga que mostrar sus recursos. Saltar a la carga demasiado pronto elimina tu propia cobertura. Espera a que el rival cruce, amenaza su backline o corta la visión entre frontline y supports.',
        vodReview: 'Cuenta cuántas peleas empezaron con alguien todavía regresando. Observa también si la carga quedó parada porque todos tomaron altura o si avanzó sin protección porque nadie controló el siguiente acceso.',
      },
      {
        name: 'Fundición y tramo final',
        attack: 'El final comprime la pelea y favorece ultimates de área, pero el ataque sigue necesitando una secuencia. Primero fuerza la herramienta defensiva que puede negar tu combo; después entra con dos recursos compatibles. Tocar desesperadamente con cinco jugadores no sustituye un plan de foco.',
        defense: 'La cercanía del respawn permite recontestar, aunque solo es útil si cada jugador cumple una función. Un héroe móvil puede tocar mientras el resto prepara daño desde cobertura. Gastar todas las ultimates para salvar diez centímetros deja la siguiente pelea sin respuesta.',
        vodReview: 'Separa cada recontest y anota si tenía posibilidades reales. Revisa quién tocó, quién podía apoyarlo, qué ultimate se utilizó y cuánto tiempo se ganó. Muchas derrotas finales nacen de entradas valientes pero imposibles de seguir.',
      },
    ],
    attackPlan: [
      { title: 'Cruza con intención', body: 'Usa velocidad, barrera, movilidad o presión lateral para abandonar el choke. Disparar desde la puerta rara vez mejora el siguiente intento.' },
      { title: 'Toma la esquina', body: 'Tras cada pelea ganada, adelanta la formación hasta la siguiente cobertura útil y deja solo a quien pueda empujar sin quedar vendido.' },
      { title: 'Ataca una misma zona', body: 'Brawl, dive y poke pueden funcionar, pero los cinco jugadores deben presionar un sector compatible durante la misma ventana.' },
      { title: 'Ordena las ultimates', body: 'Elige una para iniciar y otra para responder. Cinco definitivas en una pelea ya ganada suelen costar el siguiente checkpoint.' },
    ],
    defensePlan: [
      { title: 'Cede antes de caer', body: 'Retroceder con vida mantiene la amenaza. Morir en el choke cuando el punto ya está perdido regala la transición completa.' },
      { title: 'Vigila hotel y altura', body: 'Asigna responsables a los accesos, pero evita que un simple flanco arrastre a medio equipo fuera de posición.' },
      { title: 'Usa la esquina', body: 'Haz que el ataque cruce hacia ti. Salir a campo abierto elimina la ventaja natural que ofrece la geometría del mapa.' },
      { title: 'Planifica el recontest', body: 'Decide quién toca primero y qué recurso compra tiempo. El resto debe entrar desde una posición que pueda convertir esos segundos.' },
    ],
    heroPicks: [
      { name: 'Reinhardt', slug: 'reinhardt', role: 'tank', reason: 'Convierte las esquinas en presión directa y ayuda al equipo a cruzar tramos cortos sin dispersarse.' },
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Aporta flexibilidad para negar proyectiles, disputar altura y volver a proteger la backline.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Su rango medio y control defensivo funcionan bien alrededor de esquinas y contra flankers que buscan hotel.' },
      { name: 'Mei', slug: 'mei', role: 'dps', reason: 'Muro puede dividir una rotación y su supervivencia permite mantener espacio en peleas cerradas.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Granada y Sleep amenazan entradas previsibles, aunque necesita rotar pronto para no perder visión en cada esquina.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Suzu responde al control y Paso ligero permite corregir una rotación sin abandonar al equipo.' },
    ],
    compositions: [
      {
        name: 'Brawl de esquinas',
        lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
        plan: 'Lúcio marca el cruce, Reinhardt ocupa la esquina y Mei intenta aislar al objetivo que rota tarde. Cassidy cubre el lateral y Kiriko guarda Suzu para el control que realmente detenga el engage.',
        weakness: 'Sufre contra poke bien colocado si Lúcio no encuentra una ventana o si el equipo gasta barrera y Muro antes de cerrar distancia.',
      },
      {
        name: 'Dive sobre backline',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Ana presiona desde una línea segura; Winston divide la visión y los DPS entran sobre el mismo objetivo después del primer cooldown. Kiriko sostiene la salida o limpia el control.',
        weakness: 'Pierde consistencia en el tramo final si cada jugador entra por una puerta distinta o si Ana queda aislada durante las rotaciones cerradas.',
      },
    ],
    mistakes: [
      'Pasar toda la fase de ataque disparando desde el choke sin usar hotel, estatua o una herramienta real de cruce.',
      'Empujar la carga con demasiados jugadores y regalar gratis la altura o la siguiente esquina.',
      'Perseguir después de una pelea ganada hasta romper las líneas de curación y llegar tarde al siguiente contacto.',
      'Defender una posición perdida hasta morir, provocando una cadena de respawns separados.',
      'Guardar todas las ultimates para el final y terminar usándolas a la vez en un recontest sin coordinación.',
    ],
    vodChecklist: [
      '¿Cuánto tardaste en abandonar el choke del punto A?',
      '¿Quién vigilaba hotel y quién podía ayudarle?',
      '¿La carga avanzó mientras el equipo tomaba la siguiente esquina?',
      '¿Tus supports conservaron visión durante cada rotación?',
      '¿Las muertes tardías impidieron una defensa completa?',
      '¿Cada recontest final tenía jugador de toque, apoyo y recurso asignado?',
    ],
    faq: [
      { question: "¿Qué tipo de mapa es King's Row?", answer: "King's Row es un mapa híbrido: el ataque captura primero el punto A y después escolta una carga por las calles y la fundición hasta el destino final." },
      { question: "¿Qué composición funciona mejor en King's Row?", answer: 'El brawl con Reinhardt, Mei y Lúcio es cómodo por las esquinas, pero no es obligatorio. Dive puede castigar backlines aisladas y poke funciona si mantiene distancia y rota antes de quedar encerrado.' },
      { question: "¿Cómo se ataca el punto A de King's Row?", answer: 'Evita quedarte disparando desde la puerta. Coordina una herramienta de cruce, usa hotel o estatua para dividir la atención y entra después de forzar un recurso defensivo importante.' },
      { question: "¿Qué debo buscar en una VOD de King's Row?", answer: 'Revisa el tiempo perdido en el choke, el control de las esquinas, quién empujaba la carga, las muertes tardías y si los recontests finales tenían posibilidades reales de recibir apoyo.' },
    ],
    relatedLinks: [
      { href: '/heroes/reinhardt', label: 'Guía de Reinhardt' },
      { href: '/team-comps/reinhardt', label: 'Composiciones con Reinhardt' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Dive, poke o brawl' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' },
    ],
  },
  {
    slug: 'lijiang-tower',
    name: 'Lijiang Tower',
    mode: 'Control',
    location: 'China',
    image: '/maps/lijiang-tower.png',
    imageAlt: 'Pagoda iluminada y accesos al punto de Lijiang Tower en Overwatch',
    seoTitle: 'Guía de Lijiang Tower: mapas, héroes y composiciones',
    seoDescription: 'Guía de Lijiang Tower en Overwatch: cómo jugar Night Market, Garden y Control Center, mejores héroes, composiciones, errores y revisión de VOD.',
    updatedAt: '4 de julio de 2026',
    intro: [
      'Lijiang Tower es un mapa de Control formado por tres escenarios: Night Market, Garden y Control Center. Los dos equipos parten en igualdad de condiciones y pelean por un único objetivo; gana la ronda quien consiga mantenerlo hasta completar el progreso. La regla parece sencilla, pero cada escenario cambia por completo la distancia de combate, las rutas de entrada y el valor de los héroes con movilidad.',
      'La clave no es correr al punto en cuanto se abre, sino llegar a la primera pelea con una formación que pueda sostenerse. Control premia mucho la ventaja inicial porque el equipo que captura obliga al rival a cruzar puertas estrechas y jugar contra el reloj. Aun así, tocar sin recursos o entrar por turnos no recupera nada. Conviene reagruparse, elegir una entrada y preparar una pelea que deje tiempo para capturar después.',
    ],
    quickRead: [
      { title: 'Condición principal', body: 'Ganar una entrada y mantener acceso al punto sin encerrar a tus supports. El porcentaje llega solo cuando el equipo conserva una posición defendible.' },
      { title: 'Lo que más castiga', body: 'Tocar por reflejo mientras faltan compañeros. Cinco segundos de progreso rara vez compensan otra pelea perdida y más carga de ultimate para el rival.' },
      { title: 'Cambio entre rondas', body: 'Revisa la composición al conocer el escenario. Un pick cómodo en Garden puede quedarse sin espacio o alcance en Control Center.' },
    ],
    phases: [
      {
        name: 'Night Market',
        attack: 'El punto está dentro de un edificio con varias puertas, de modo que entrar todos por el mismo acceso facilita demasiado el daño rival. Abre una segunda amenaza corta sin separar al equipo durante medio mapa. Un Tank puede presionar la puerta principal mientras un DPS enseña un lateral y vuelve a la línea de curación. El objetivo es cruzar después de forzar una habilidad, no intercambiar daño desde fuera indefinidamente.',
        defense: 'Cuando tienes el punto, no hace falta esperar en el centro. Controla las puertas desde cobertura y conserva una ruta para retroceder. Si el rival se divide, presiona al grupo que no puede recibir ayuda; si entra compacto, cede unos metros y responde con recursos. Perseguir fuera del edificio puede regalar el acceso contrario y convertir una defensa favorable en una carrera desordenada.',
        vodReview: 'Pausa antes de cada entrada y comprueba por qué puerta miraba cada jugador. Si tres compañeros vigilaban el mismo ángulo y nadie veía el lateral, el problema no fue de puntería sino de reparto del espacio.',
      },
      {
        name: 'Garden',
        attack: 'Garden ofrece rutas abiertas, puentes y peligro de expulsión. La movilidad ayuda, pero saltar primero sin confirmar dónde está la backline suele terminar en una eliminación rápida. Cruza por cobertura, toma el terreno que permite mirar al punto y ataca al mismo sector. Los héroes con empuje ganan valor cerca de los bordes, siempre que no abandonen la pelea por buscar una jugada espectacular.',
        defense: 'Defender Garden exige vigilar los accesos sin quedarse expuesto en una pasarela. La primera línea debe saber dónde puede recibir curación y qué salto o esquina utilizará para salir. Si el rival entra por un lateral, rota como bloque; enviar un jugador distinto a cada puerta rompe la formación y deja al objetivo sin una defensa reconocible.',
        vodReview: 'Revisa cada muerte ambiental y cada salto sin apoyo. Anota si se conocía la posición del rival, si existía una ruta de vuelta y si el equipo podía aprovechar el espacio creado durante esa entrada.',
      },
      {
        name: 'Control Center',
        attack: 'Control Center favorece peleas cercanas y rotaciones rápidas alrededor del punto. Para recuperar, fuerza primero el recurso que puede frenar tu entrada y cruza con velocidad o protección. Dar vueltas por el exterior sin una decisión solo consume tiempo. Una vez dentro, evita apilar a los cinco jugadores: ocupa la cobertura inmediata y mantén un ángulo que castigue la retirada rival.',
        defense: 'Con el control asegurado, usa las paredes y accesos para acortar las líneas de tiro. No regales el centro por intentar defender la puerta del spawn. El equipo debe reconocer cuándo ceder hacia el punto y cuándo acelerar sobre un enemigo aislado. Guardar una ultimate defensiva para el último engage suele valer más que usarla en una pelea ya ganada.',
        vodReview: 'Observa cuándo empezó realmente cada engage. Si el Tank cruzó antes de que los DPS tuvieran ángulo o los supports pudieran seguirlo, apunta la diferencia de tiempo y no solo el resultado final.',
      },
    ],
    attackPlan: [
      { title: 'Llega como equipo', body: 'La primera pelea importa mucho, pero llegar antes no sirve si dos compañeros siguen rotando. Entra con una formación y una condición de victoria claras.' },
      { title: 'Abre dos miradas', body: 'Combina una ruta principal con un lateral corto. No necesitas un flanqueo largo: basta con impedir que los cinco rivales disparen a la misma puerta.' },
      { title: 'Recupera con recursos', body: 'Espera el regroup y decide qué habilidad o ultimate abre el cruce. Tocar primero y pensar después suele encadenar varias derrotas.' },
      { title: 'Ocupa después de capturar', body: 'Cuando el punto cambia de dueño, toma coberturas que permitan ver los accesos. Quedarse amontonado en el centro entrega la iniciativa.' },
    ],
    defensePlan: [
      { title: 'Defiende accesos, no el icono', body: 'El porcentaje seguirá subiendo mientras controlas las puertas y puedes volver al objetivo. Busca una posición con salida y línea de curación.' },
      { title: 'Lee la entrada rival', body: 'Identifica pronto la ruta principal. Rotar todos juntos es mejor que responder tarde con pequeños duelos en cada lado.' },
      { title: 'No persigas hasta spawn', body: 'Una eliminación no autoriza una persecución larga. Conserva el terreno desde el que podrás defender el siguiente engage.' },
      { title: 'Prepara el último contacto', body: 'Por encima del 80 %, decide quién puede tocar, qué ultimate responderá y desde qué acceso llegará el resto del equipo.' },
    ],
    heroPicks: [
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Puede cruzar rutas abiertas, separar la visión rival y volver a cobertura si el equipo coordina el salto.' },
      { name: 'Reinhardt', slug: 'reinhardt', role: 'tank', reason: 'Encaja especialmente bien en Control Center y Night Market, donde puede cerrar distancia y sostener entradas cortas.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Aprovecha los cambios de altura y puede entrar sobre objetivos aislados después de que el Tank fuerce atención.' },
      { name: 'Mei', slug: 'mei', role: 'dps', reason: 'Muro divide puertas estrechas y ayuda a convertir una rotación tardía en una ventaja numérica.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Puede acompañar entradas móviles, limpiar control y corregir una posición peligrosa con Paso ligero.' },
      { name: 'Lúcio', slug: 'lucio', role: 'support', reason: 'La velocidad decide muchos cruces y su empuje amenaza las zonas abiertas de Garden.' },
    ],
    compositions: [
      {
        name: 'Rush para espacios cerrados',
        lineup: ['Reinhardt', 'Mei', 'Cassidy', 'Lúcio', 'Kiriko'],
        plan: 'Lúcio marca el cruce, Reinhardt ocupa la primera cobertura y Mei intenta separar al rival que rota tarde. Cassidy protege el lateral y Kiriko reserva Suzu para el control que detenga de verdad la entrada.',
        weakness: 'Pierde valor si el equipo acelera sin una ruta acordada o si Garden obliga a cruzar espacio abierto contra una composición con más alcance y movilidad.',
      },
      {
        name: 'Dive coordinado',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Ana presiona desde cobertura, Winston corta la visión y ambos DPS atacan el mismo sector. Kiriko acompaña la salida o limpia la respuesta que impediría completar el engage.',
        weakness: 'Falla cuando los saltos no comparten objetivo, Ana queda sin una rotación segura o el equipo confunde movilidad con la obligación de entrar constantemente.',
      },
    ],
    mistakes: [
      'Cambiar el punto por una persecución y permitir que el rival capture sin tener que ganar otra pelea.',
      'Entrar de uno en uno para arañar porcentaje cuando todavía existe tiempo para reagruparse.',
      'Usar la misma composición en los tres escenarios sin revisar alcance, movilidad y acceso al objetivo.',
      'Defender dentro del punto con los cinco jugadores y regalar todas las puertas al equipo contrario.',
      'Gastar varias ultimates después de ganar la pelea, dejando el último engage sin una respuesta clara.',
    ],
    vodChecklist: [
      '¿Llegó el equipo completo a la primera pelea de cada ronda?',
      '¿Qué entrada se eligió y quién generaba la segunda mirada?',
      '¿Cuántas muertes ocurrieron intentando tocar sin apoyo?',
      '¿La posición defensiva tenía cobertura, curación y una salida?',
      '¿Se adaptaron los picks al cambiar de Night Market, Garden o Control Center?',
      '¿Qué ultimate estaba reservada para el último engage?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Lijiang Tower?', answer: 'Lijiang Tower es un mapa de Control. Los equipos compiten por capturar y mantener un único objetivo, y la partida se decide al ganar dos de los tres escenarios posibles.' },
      { question: '¿Cuáles son los escenarios de Lijiang Tower?', answer: 'Los tres escenarios son Night Market, Garden y Control Center. Cada uno cambia los accesos, las distancias y el valor de la movilidad, por lo que conviene revisar la composición entre rondas.' },
      { question: '¿Qué héroes funcionan bien en Lijiang Tower?', answer: 'Winston, Reinhardt, Genji, Mei, Kiriko y Lúcio tienen herramientas útiles según el escenario. No existe un pick obligatorio: lo importante es que el equipo pueda cruzar junto, sostener el punto y responder a los laterales.' },
      { question: '¿Cómo se recupera un punto en Lijiang Tower?', answer: 'Reagrúpate, elige una entrada principal y abre un segundo ángulo corto. Fuerza una habilidad rival antes de comprometer movilidad o ultimates y evita tocar con jugadores aislados.' },
    ],
    relatedLinks: [
      { href: '/heroes/winston', label: 'Guía de Winston' },
      { href: '/heroes/kiriko', label: 'Guía de Kiriko' },
      { href: '/guides/como-elegir-composicion-dive-poke-brawl', label: 'Elegir composición' },
      { href: '/guides/como-mejorar-en-overwatch-revisando-vod', label: 'Revisar una VOD' },
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
    updatedAt: '4 de julio de 2026',
    intro: [
      'Dorado es un mapa de Escolta ambientado en México. El ataque acompaña la carga desde las calles exteriores hasta las instalaciones de LumériCo, mientras la defensa intenta agotar el tiempo en tres tramos con alturas, esquinas y líneas de tiro muy distintas. El mapa ha recibido cambios importantes con el paso de las temporadas, así que muchas rutas antiguas ya no explican por sí solas cómo se juega la versión actual.',
      'La altura sigue siendo valiosa, pero no porque un DPS deba vivir allí toda la partida. Sirve para ver antes la rotación, disparar sin atravesar al propio Tank y obligar al rival a gastar movilidad. La carga solo progresa de forma segura cuando alguien controla la posición desde la que la defensa quiere detenerla. Empujar sin mirar arriba suele acabar en una pelea iniciada por el enemigo y con el equipo atacante atrapado en la calle.',
    ],
    quickRead: [
      { title: 'Condición principal', body: 'Disputar la altura antes de que la carga llegue debajo. Quien controla la siguiente posición decide cuándo empieza la pelea.' },
      { title: 'Lo que más castiga', body: 'Empujar con cuatro jugadores mientras la defensa conserva todos los ángulos. La carga no protege de una línea cruzada ni corrige una rotación tardía.' },
      { title: 'Ritmo de escolta', body: 'Después de una baja, adelanta el equipo y deja un solo jugador empujando cuando sea seguro. Convierte la ventaja en espacio, no solo en metros.' },
    ],
    phases: [
      {
        name: 'Salida y primer checkpoint',
        attack: 'La defensa suele comenzar con altura y visión sobre la ruta de la carga. El ataque debe decidir si disputa esa posición o si cruza rápido por una cobertura que reduzca su valor. Permanecer debajo disparando hacia arriba favorece al rival. Un Tank puede absorber la primera atención mientras un DPS toma un ángulo lateral corto; ambos movimientos tienen que coincidir para que la defensa no los resuelva por separado.',
        defense: 'La defensa quiere infligir presión desde arriba y retirarse antes de quedar rodeada. Mantén una salida hacia la siguiente esquina y no sacrifiques a todo el equipo por conservar la posición inicial unos segundos más. Una retirada ordenada permite otra pelea completa antes del checkpoint; morir tarde puede regalar también buena parte del segundo tramo.',
        vodReview: 'Fíjate en qué momento el ataque miró o subió a la altura. Si la carga avanzó mientras cuatro jugadores disparaban desde abajo sin cambiar de ruta, señala el instante en que dejaron de crear una amenaza real.',
      },
      {
        name: 'Calles y plaza central',
        attack: 'El tramo medio mezcla calles estrechas con balcones y accesos laterales. El equipo atacante necesita ocupar la siguiente esquina antes de amontonarse en la carga. Los supports deben rotar pronto para conservar visión; esperar a que el Tank ya haya girado suele obligarlos a cruzar una zona peligrosa sin ayuda. Tras una pelea ganada, limpia el ángulo más cercano y evita perseguir hasta perder el objetivo.',
        defense: 'La defensa puede usar las esquinas para detener el avance, pero debe elegir dónde reagruparse. Saltar desde altura de uno en uno alimenta ultimates y elimina la ventaja posicional. Espera a que el rival cruce, presiona su línea de apoyo y usa el edificio o la cobertura para cortar la conexión entre la carga y quienes intentan tomar espacio.',
        vodReview: 'Comprueba si la carga se detuvo porque nadie la empujaba o porque nadie controló la siguiente esquina. Son errores distintos: el primero es de asignación; el segundo, de conversión de una pelea ganada.',
      },
      {
        name: 'Interior de LumériCo',
        attack: 'El tramo final reduce el espacio y hace más previsible la entrada. Necesitas forzar primero la habilidad capaz de negar tu combinación y después usar una o dos ultimates con funciones compatibles. Entrar por la misma puerta sin presión lateral permite a la defensa concentrar todo el daño. Incluso un ángulo corto puede obligar a girarse y abrir el paso del Tank.',
        defense: 'La defensa reaparece cerca, pero eso no convierte cada toque en una buena pelea. Decide quién gana tiempo y quién prepara daño desde cobertura. Conserva una herramienta para el segundo contacto y evita gastar todas las ultimates cuando la carga todavía está lejos del final. Una salida tardía del spawn puede dividir el equipo durante varios intentos.',
        vodReview: 'Separa los intentos del final y anota qué recurso inició cada uno. Revisa si había un objetivo común, si los supports podían ver la entrada y cuánto tiempo real compró cada recontest defensivo.',
      },
    ],
    attackPlan: [
      { title: 'Mira arriba primero', body: 'Antes de acompañar la carga, localiza la altura defensiva y decide cómo negarla: movilidad, presión a distancia o un cruce rápido por cobertura.' },
      { title: 'Rota antes del Tank', body: 'Los supports y DPS de poca movilidad deben cambiar de posición antes de perder visión. Esperar al último segundo convierte una esquina normal en un cruce peligroso.' },
      { title: 'Convierte cada ventaja', body: 'Cuando cae un rival, ocupa la siguiente esquina y deja a un jugador seguro con la carga. El espacio impide que la defensa se reorganice gratis.' },
      { title: 'Ordena el tramo final', body: 'Elige una ultimate para abrir y otra para responder. Evita lanzar todo sobre la primera persona que toque la carga.' },
    ],
    defensePlan: [
      { title: 'Altura con salida', body: 'Empieza donde puedas presionar y retirarte. Una posición elevada deja de ser buena si obliga a morir cuando el ataque finalmente la alcanza.' },
      { title: 'Reagrupa en una esquina', body: 'Después de ceder terreno, marca la siguiente defensa completa. Entrar desde spawn sin esperar solo entrega carga de ultimate.' },
      { title: 'Ataca la conexión', body: 'No dispares siempre al Tank. Busca el momento en que la esquina separa a la primera línea de sus supports y castiga esa rotación.' },
      { title: 'Recontesta con funciones', body: 'Asigna a quien toca, quien protege y quien aporta daño. Tres jugadores saltando solos a la carga no forman una defensa.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar balcones, negar proyectiles durante un cruce y regresar rápido a proteger a sus supports.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Amenaza posiciones elevadas y divide líneas de tiro, siempre que no salte fuera del alcance de su equipo.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Su rango medio funciona alrededor de las esquinas y ofrece una respuesta estable contra flankers.' },
      { name: 'Genji', slug: 'genji', role: 'dps', reason: 'Accede a las alturas y puede rematar objetivos aislados cuando la defensa empieza a retroceder.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Aprovecha líneas largas y puede castigar entradas previsibles, aunque debe rotar pronto antes de perder visión.' },
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
      'Rotar tarde con un support y perder visión del Tank justo cuando empieza el engage.',
      'Defender una altura sin ruta de retirada y morir cuando el ataque termina de alcanzarla.',
      'Convertir el tramo final en una sucesión de toques individuales sin esperar una pelea posible.',
    ],
    vodChecklist: [
      '¿Quién controlaba la altura antes de cada checkpoint?',
      '¿La carga avanzaba mientras el resto tomaba la siguiente posición?',
      '¿Tus supports rotaron antes o después de perder visión de la frontline?',
      '¿La defensa murió tarde intentando conservar una posición ya rodeada?',
      '¿Qué cooldown se forzó antes de usar una ultimate ofensiva?',
      '¿Cada recontest final tenía apoyo y una función concreta?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Dorado?', answer: 'Dorado es un mapa de Escolta. El ataque debe acompañar la carga a través de tres tramos hasta LumériCo, mientras la defensa intenta detenerla y agotar el tiempo.' },
      { question: '¿Qué es lo más importante para atacar Dorado?', answer: 'Controlar o negar la altura antes de que la carga llegue debajo. También conviene adelantar la formación después de cada pelea y dejar solo a un jugador empujando cuando sea seguro.' },
      { question: '¿Qué héroes funcionan bien en Dorado?', answer: 'D.Va, Winston, Cassidy, Genji, Ana y Kiriko tienen herramientas útiles para las alturas y rotaciones del mapa. La elección final debe encajar con el plan del equipo y no solo con una lista fija.' },
      { question: '¿Qué debo revisar en una VOD de Dorado?', answer: 'Revisa el control de altura, las rotaciones de los supports, la conversión de peleas ganadas, las muertes defensivas tardías y si los recontests del final podían recibir ayuda.' },
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
