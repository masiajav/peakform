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
    seoTitle: 'Neon Junction en Overwatch: rutas, héroes y composiciones',
    seoDescription: 'Guía de Neon Junction en Overwatch: cómo atacar y defender el mapa híbrido, rutas, héroes recomendados, composiciones, errores y checklist de VOD.',
    updatedAtIso: '2026-07-04',
    updatedAt: '4 de julio de 2026',
    intro: [
      'Neon Junction te deja una sensación engañosa: las calles de Tokio parecen ofrecer una ruta para cada jugador, pero la partida se rompe en cuanto cada uno elige la suya. Primero hay que abrir el punto y después acompañar a ANDROMEDA III hasta Zuiko-za. Lo que funcionó en la captura puede quedarse corto cuando la carga entra en calles con más ángulos y salidas laterales.',
      'No necesitas aprenderte cada esquina de memoria. Necesitas saber qué espacio busca tu equipo. Brawl quiere cruzar junto y pelear alrededor de cobertura; dive necesita que varios jugadores lleguen sobre la misma retaguardia; poke depende de líneas limpias y de rotar antes de quedar encerrado. Cuando esa intención está clara, los callejones dejan de ser ruido y empiezan a ofrecer decisiones útiles.',
    ],
    quickRead: [
      { title: 'Controla un lateral antes de tocar', body: 'Entrar de frente mientras la defensa conserva dos ángulos desgasta al equipo sin ganar espacio. Limpia uno de ellos y avanza por esa cobertura.' },
      { title: 'Entra siempre con una salida', body: 'Los callejones sirven para presionar de lado, pero también cortan la curación. No profundices si no sabes por dónde vas a volver.' },
      { title: 'Revisa la composición al capturar', body: 'Las calles de la escolta piden más alcance y movilidad que el primer punto. Cambia de héroe si ya no puedes llegar a la posición que necesita el equipo.' },
    ],
    phases: [
      {
        name: 'Captura inicial',
        attack: 'Atacar el primer punto exige limpiar una entrada y un lateral antes de comprometerse. El Tank abre una zona segura, pero no debería gastar toda su supervivencia solo para pisar. Un DPS puede enseñar el ángulo secundario y volver; el objetivo es obligar a la defensa a mirar en dos direcciones sin regalar una baja temprana.',
        defense: 'La defensa gana cuando mantiene líneas cruzadas y puede retroceder sin convertirse en cinco duelos separados. Empieza en una posición que permita ceder unos metros, conservar habilidades y volver a disputar. Perseguir a un héroe de flanco demasiado lejos suele abrir el punto para el resto del ataque.',
        vodReview: 'Pausa diez segundos antes de cada entrada. Comprueba cuántos ángulos controlaba tu equipo, quién podía recibir curación y qué habilidad importante se gastó antes de que alguien tocara el punto.',
      },
      {
        name: 'Calles comerciales',
        attack: 'Con la carga en movimiento, el equipo atacante debe adelantarse lo suficiente para tomar la siguiente cobertura sin abandonar al jugador que empuja. La carga cura y ofrece protección, pero no sustituye el control del altura o de los accesos laterales. Avanza después de confirmar una ventaja, no porque el objetivo se haya movido dos metros.',
        defense: 'La defensa debe escoger una esquina concreta para reagruparse. Entrar de uno en uno desde zona de reaparición alimenta definitivas y regala distancia. Cuando no puedas detener la carga de forma limpia, usa el tiempo para preparar una pelea completa en la siguiente zona y conserva la definitiva que realmente pueda iniciarla.',
        vodReview: 'Mide cuánto tiempo pasó la carga avanzando gratis después de una pelea ganada. Si cuatro jugadores perseguían eliminaciones mientras nadie ocupaba el siguiente espacio útil, la ventaja no se convirtió en progreso real.',
      },
      {
        name: 'Acceso a Zuiko-za',
        attack: 'El tramo final premia la paciencia. Las defensas reaparecen cerca y pueden encadenar varios intentos, así que conviene entrar con una combinación de definitivas sencilla y un objetivo prioritario. Guardar cinco definitivas para la pelea perfecta suele ser peor que usar dos para abrir una ventana clara.',
        defense: 'Defender el final no significa permanecer pegado al marcador. Controla la cobertura desde la que el rival quiere iniciar y reserva movilidad o protección para el segundo contacto. Si todos miran al Tank sobre la carga, un DPS lateral puede decidir la pelea sin oposición.',
        vodReview: 'Revisa por separado la primera entrada y el último intento. Anota quién debía iniciar, qué definitiva respondía al rival y si el equipo volvió a pelear con una formación reconocible o simplemente corrió hacia el objetivo.',
      },
    ],
    attackPlan: [
      { title: 'Elige una entrada', body: 'Marca una ruta principal y un lateral corto. Tres rutas simultáneas sin coordinación solo dividen curación y daño.' },
      { title: 'Fuerza el primer recurso', body: 'Presiona hasta ver movilidad, una habilidad defensiva o una rotación. La entrada empieza después de esa respuesta, no antes.' },
      { title: 'Convierte la baja', body: 'Tras eliminar a alguien, ocupa la siguiente cobertura antes de perseguir. En híbrido, ganar espacio vale tanto como completar la eliminación.' },
      { title: 'Revisa los picks', body: 'Al comenzar la escolta, cambia si tu héroe ya no puede mantener su rango, acceder a la altura o sobrevivir a los laterales.' },
    ],
    defensePlan: [
      { title: 'Defiende con salida', body: 'Toda posición inicial necesita una cobertura de retirada. Morir tarde en el punto puede costar también la primera pelea de escolta.' },
      { title: 'Protege la retaguardia', body: 'Los accesos laterales hacen valioso la protección. Identifica quién ayuda al support si Shion, Tracer o Genji cruzan la primera línea.' },
      { title: 'Corta el ritmo', body: 'No hace falta ganar cada pelea de forma total. Forzar definitivas y reagruparse a tiempo puede dejar al ataque sin recursos para el siguiente tramo.' },
      { title: 'Recontesta con plan', body: 'Decide quién toca y quién prepara daño. Cinco jugadores entrando sobre la carga desde el mismo ángulo facilitan demasiado la respuesta rival.' },
    ],
    heroPicks: [
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Puede disputar altura, cubrir una entrada con Matriz y volver rápido a proteger a sus supports.' },
      { name: 'Winston', slug: 'winston', role: 'tank', reason: 'Aprovecha las rutas laterales para dividir la atención, siempre que tenga una cobertura clara para salir.' },
      { name: 'Shion', slug: 'shion', role: 'dps', reason: 'Su movilidad encaja con los callejones y los cambios de ángulo, pero necesita entrar después de que aparezca una oportunidad.' },
      { name: 'Tracer', slug: 'tracer', role: 'dps', reason: 'Mantiene presión lateral y castiga rotaciones lentas sin obligar al equipo a abandonar la carga.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Aporta amenaza desde media distancia y puede castigar entradas previsibles si juega desde cobertura.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Paso ligero permite acompañar cambios de altura y Suzu estabiliza entradas agresivos cerca de esquinas.' },
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
      'Usar todas las definitivas en la primera entrada del tramo final y no conservar nada para el último intento.',
      'Mantener una composición de corto alcance cuando el equipo ya no puede cruzar ni disputar los ángulos del rival.',
    ],
    vodChecklist: [
      '¿Desde qué cobertura empezó cada pelea y dónde estaba la salida?',
      '¿Cuántos jugadores podían verte o curarte cuando usaste movilidad?',
      '¿Quién controlaba el lateral más cercano a la retaguardia?',
      '¿La primera baja produjo espacio o solo una persecución larga?',
      '¿Qué definitiva abrió cada entrada y cuál se guardó para responder?',
      '¿Cambiaste de héroe cuando cambió la geometría de la partida?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Neon Junction?', answer: 'Neon Junction es un mapa híbrido. El ataque debe capturar una zona inicial y después escoltar una carga hacia Zuiko-za, mientras la defensa intenta agotar el tiempo.' },
      { question: '¿Qué héroes funcionan bien en Neon Junction?', answer: 'Los héroes móviles y los que pueden controlar laterales tienen valor, pero no existe un pick obligatorio. D.Va, Winston, Tracer, Shion, Ana y Kiriko ofrecen herramientas útiles si la composición mantiene visión y entra coordinada.' },
      { question: '¿Cómo se ataca el primer punto de Neon Junction?', answer: 'Conviene limpiar una entrada principal y un lateral corto antes de tocar. El objetivo no es rodear con todo el equipo, sino dividir la atención defensiva y entrar después de forzar una habilidad importante.' },
      { question: '¿Qué debo revisar en una VOD de Neon Junction?', answer: 'Empieza por posición inicial, líneas de curación, control de laterales y conversión de peleas ganadas. Después revisa las definitivas del tramo final y si los últimos intentos tuvieron una función clara.' },
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
    updatedAtIso: '2026-07-04',
    updatedAt: '4 de julio de 2026',
    intro: [
      "King's Row tiene fama de ser el mapa de Reinhardt, y se entiende: sobran esquinas y muchas peleas terminan a corta distancia. Pero elegir brawl y caminar hacia delante no resuelve hotel, la estatua ni las alturas de calles. Primero hay que abrir el punto A y después conseguir que la carga avance sin regalar la retaguardia en cada giro.",
      'Las buenas rondas se notan en lo que ocurre después de ganar una pelea. Una persona empuja y el resto toma la siguiente esquina antes de que vuelva la defensa. Las malas se alargan persiguiendo una baja, terminan con la carga parada y comienzan el siguiente contacto sin posiciones ni habilidades. El mapa premia más esa disciplina que cualquier pick obligatorio.',
    ],
    quickRead: [
      { title: 'Gana la esquina antes de empujar', body: 'La carga avanzará cuando la defensa pierda la cobertura del siguiente tramo. Deja a una persona con ella y adelanta al resto del equipo.' },
      { title: 'Evita las muertes tardías', body: 'Caer de uno en uno puede regalar dos calles seguidas. Cuando una defensa esté perdida, sal con vida y prepara la siguiente esquina.' },
      { title: 'No estás obligado a pelear de cerca', body: 'Reinhardt encaja bien, pero las composiciones móviles o de largo alcance también funcionan si controlan las alturas y las esquinas.' },
    ],
    phases: [
      {
        name: 'Punto A: hotel y estatua',
        attack: 'El ataque necesita atravesar la entrada sin permanecer demasiado tiempo disparando desde la puerta. Hotel ofrece una rotación corta y la zona de estatua permite abrir ángulos, pero ambos caminos deben servir al mismo ataque. Si un grupo entra por hotel y el resto sigue esperando en zona de reaparición, la defensa resuelve cada amenaza por separado.',
        defense: 'La defensa debe usar la altura y las coberturas para forzar recursos antes del punto. No hace falta permanecer en la entrada hasta morir: retirarse hacia estatua con vida permite otra pelea. El jugador que vigila hotel debe comunicar y volver, no perseguir hasta perder la formación.',
        vodReview: 'Comprueba cuánto tiempo pasó el ataque delante dla entrada sin cambiar de posición. En defensa, revisa si la primera retirada ocurrió con habilidades disponibles o después de que ya no existiera una salida segura.',
      },
      {
        name: 'Calles y segundo tramo',
        attack: 'Después de capturar, el ataque debe tomar la primera esquina y disputar las alturas antes de apilarse en la carga. Un jugador empuja mientras el resto prepara el siguiente contacto. Cuando la defensa retrocede, ocupar la esquina correcta suele generar más progreso que perseguir una eliminación hasta su zona de reaparición.',
        defense: 'La defensa busca estabilizarse y pelear desde una esquina donde el ataque tenga que mostrar sus recursos. Saltar a la carga demasiado pronto elimina tu propia cobertura. Espera a que el rival cruce, amenaza su retaguardia o corta la visión entre primera línea y supports.',
        vodReview: 'Cuenta cuántas peleas empezaron con alguien todavía regresando. Observa también si la carga quedó parada porque todos tomaron altura o si avanzó sin protección porque nadie controló el siguiente acceso.',
      },
      {
        name: 'Fundición y tramo final',
        attack: 'El final comprime la pelea y favorece definitivas de área, pero el ataque sigue necesitando una secuencia. Primero fuerza la herramienta defensiva que puede negar tu combo; después entra con dos recursos compatibles. Tocar desesperadamente con cinco jugadores no sustituye un plan de foco.',
        defense: 'La cercanía dla zona de reaparición permite volver a disputar, aunque solo es útil si cada jugador cumple una función. Un héroe móvil puede tocar mientras el resto prepara daño desde cobertura. Gastar todas las definitivas para salvar diez centímetros deja la siguiente pelea sin respuesta.',
        vodReview: 'Separa cada último intento y anota si tenía posibilidades reales. Revisa quién tocó, quién podía apoyarlo, qué definitiva se utilizó y cuánto tiempo se ganó. Muchas derrotas finales nacen de entradas valientes pero imposibles de seguir.',
      },
    ],
    attackPlan: [
      { title: 'Cruza con intención', body: 'Usa velocidad, barrera, movilidad o presión lateral para abandonar la entrada. Disparar desde la puerta rara vez mejora el siguiente intento.' },
      { title: 'Toma la esquina', body: 'Tras cada pelea ganada, adelanta la formación hasta la siguiente cobertura útil y deja solo a quien pueda empujar sin quedar vendido.' },
      { title: 'Ataca una misma zona', body: 'Brawl, dive y poke pueden funcionar, pero los cinco jugadores deben presionar un sector compatible durante la misma ventana.' },
      { title: 'Ordena las definitivas', body: 'Elige una para iniciar y otra para responder. Cinco definitivas en una pelea ya ganada suelen costar el siguiente punto de control.' },
    ],
    defensePlan: [
      { title: 'Cede antes de caer', body: 'Retroceder con vida mantiene la amenaza. Morir en la entrada cuando el punto ya está perdido regala la transición completa.' },
      { title: 'Vigila hotel y altura', body: 'Asigna responsables a los accesos, pero evita que un simple flanco arrastre a medio equipo fuera de posición.' },
      { title: 'Usa la esquina', body: 'Haz que el ataque cruce hacia ti. Salir a campo abierto elimina la ventaja natural que ofrece la geometría del mapa.' },
      { title: 'Planifica el último intento', body: 'Decide quién toca primero y qué recurso compra tiempo. El resto debe entrar desde una posición que pueda convertir esos segundos.' },
    ],
    heroPicks: [
      { name: 'Reinhardt', slug: 'reinhardt', role: 'tank', reason: 'Convierte las esquinas en presión directa y ayuda al equipo a cruzar tramos cortos sin dispersarse.' },
      { name: 'D.Va', slug: 'dva', role: 'tank', reason: 'Aporta flexibilidad para negar proyectiles, disputar altura y volver a proteger la retaguardia.' },
      { name: 'Cassidy', slug: 'cassidy', role: 'dps', reason: 'Su rango medio y control defensivo funcionan bien alrededor de esquinas y contra héroes de flanco que buscan hotel.' },
      { name: 'Mei', slug: 'mei', role: 'dps', reason: 'Muro puede dividir una rotación y su supervivencia permite mantener espacio en peleas cerradas.' },
      { name: 'Ana', slug: 'ana', role: 'support', reason: 'Granada y Sleep amenazan entradas previsibles, aunque necesita rotar pronto para no perder visión en cada esquina.' },
      { name: 'Kiriko', slug: 'kiriko', role: 'support', reason: 'Suzu responde al control y Paso ligero permite corregir una rotación sin abandonar al equipo.' },
    ],
    compositions: [
      {
        name: 'Brawl de esquinas',
        lineup: ['Reinhardt', 'Cassidy', 'Mei', 'Lúcio', 'Kiriko'],
        plan: 'Lúcio marca el cruce, Reinhardt ocupa la esquina y Mei intenta aislar al objetivo que rota tarde. Cassidy cubre el lateral y Kiriko guarda Suzu para el control que realmente detenga la entrada.',
        weakness: 'Sufre contra poke bien colocado si Lúcio no encuentra una ventana o si el equipo gasta barrera y Muro antes de cerrar distancia.',
      },
      {
        name: 'Dive sobre retaguardia',
        lineup: ['Winston', 'Genji', 'Tracer', 'Ana', 'Kiriko'],
        plan: 'Ana presiona desde una línea segura; Winston divide la visión y los DPS entran sobre el mismo objetivo después del primer habilidad. Kiriko sostiene la salida o limpia el control.',
        weakness: 'Pierde consistencia en el tramo final si cada jugador entra por una puerta distinta o si Ana queda aislada durante las rotaciones cerradas.',
      },
    ],
    mistakes: [
      'Pasar toda la fase de ataque disparando desde la entrada sin usar hotel, estatua o una herramienta real de cruce.',
      'Empujar la carga con demasiados jugadores y regalar gratis la altura o la siguiente esquina.',
      'Perseguir después de una pelea ganada hasta romper las líneas de curación y llegar tarde al siguiente contacto.',
      'Defender una posición perdida hasta morir, provocando una cadena de reapariciones separadas.',
      'Guardar todas las definitivas para el final y terminar usándolas a la vez en un último intento sin coordinación.',
    ],
    vodChecklist: [
      '¿Cuánto tardaste en abandonar la entrada del punto A?',
      '¿Quién vigilaba hotel y quién podía ayudarle?',
      '¿La carga avanzó mientras el equipo tomaba la siguiente esquina?',
      '¿Tus supports conservaron visión durante cada rotación?',
      '¿Las muertes tardías impidieron una defensa completa?',
      '¿Cada último intento tenía jugador de toque, apoyo y recurso asignado?',
    ],
    faq: [
      { question: "¿Qué tipo de mapa es King's Row?", answer: "King's Row es un mapa híbrido: el ataque captura primero el punto A y después escolta una carga por las calles y la fundición hasta el destino final." },
      { question: "¿Qué composición funciona mejor en King's Row?", answer: 'El brawl con Reinhardt, Mei y Lúcio es cómodo por las esquinas, pero no es obligatorio. Dive puede castigar backlines aisladas y poke funciona si mantiene distancia y rota antes de quedar encerrado.' },
      { question: "¿Cómo se ataca el punto A de King's Row?", answer: 'Evita quedarte disparando desde la puerta. Coordina una herramienta de cruce, usa hotel o estatua para dividir la atención y entra después de forzar un recurso defensivo importante.' },
      { question: "¿Qué debo buscar en una VOD de King's Row?", answer: 'Revisa el tiempo perdido en la entrada, el control de las esquinas, quién empujaba la carga, las muertes tardías y si los últimos intentos finales tenían posibilidades reales de recibir apoyo.' },
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
    updatedAtIso: '2026-07-04',
    updatedAt: '4 de julio de 2026',
    intro: [
      'Lijiang Tower tiene una pequeña crueldad: los tres escenarios parecen favorecer las peleas rápidas, pero cada uno castiga una prisa distinta. En Night Market se entra antes de haber repartido las puertas, Garden invita a saltar sin comprobar quién puede seguirte y Control Center convierte una rotación dudosa en cinco jugadores atrapados en el mismo pasillo.',
      'La primera captura importa, aunque no merece llegar al punto con medio equipo. Quien gana puede defender accesos y obligar al rival a jugar contra el porcentaje. Para darle la vuelta hay que resistir la tentación de tocar por turnos: agrupa, decide una puerta y abre una segunda mirada cercana. En Lijiang, una entrada sencilla ejecutada a la vez suele funcionar mejor que el flanco más imaginativo del servidor.',
    ],
    quickRead: [
      { title: 'La puerta es la pelea', body: 'En Night Market y Control Center, cruzar con recursos vale más que disparar mucho desde fuera. Provoca una habilidad y entra antes de que vuelva.' },
      { title: 'No toques el punto por reflejo', body: 'Entrar solo regala otra baja y retrasa al equipo. Si todavía queda tiempo, espera a los cinco y prepara una entrada que pueda terminar en captura.' },
      { title: 'Cambia entre rondas', body: 'Garden permite movilidad y ángulos abiertos; Control Center comprime todo. Un héroe cómodo no tiene por qué seguir siendo útil cuando cambia el escenario.' },
    ],
    phases: [
      {
        name: 'Night Market',
        attack: 'Night Market se vuelve insoportable cuando los cinco intentan entrar por la misma puerta. Enseña una amenaza corta en el lateral mientras el Tank presiona la entrada que todos pueden seguir. No hace falta que el DPS dé la vuelta al edificio: su trabajo es conseguir que alguien dentro mire hacia otro sitio. En cuanto salga una habilidad defensiva o un rival abandone su esquina, cruza. Quedarse intercambiando daño desde la calle solo alimenta definitivas y el porcentaje contrario.',
        defense: 'Con el punto capturado, reparte las puertas y juega desde las esquinas interiores. Puedes molestar al rival fuera, pero debes seguir teniendo una retirada hacia la sala. Si alguien aparece por detrás, márcalo sin mandar a tres compañeros a perseguirlo. La defensa pierde su ventaja cuando abandona el edificio y convierte una entrada difícil en una carrera abierta.',
        vodReview: 'Pausa antes del cruce. ¿Cuántas puertas estaba mirando el equipo y quién podía ayudar al jugador del lateral? Si todos enfocaban el mismo acceso, ya tienes una explicación bastante honesta de la derrota.',
      },
      {
        name: 'Garden',
        attack: 'Garden da ganas de saltar al otro lado en cuanto ves una oportunidad. Antes, mira si tus supports conservan visión y si el resto puede aprovechar ese movimiento. Usa las paredes para acercarte, localiza a los héroes con empuje y ataca un mismo lado. El puente es una ruta, no una obligación. Si el rival lo controla, el interior ofrece una entrada menos vistosa y bastante más fiable.',
        defense: 'Juega las pasarelas con una salida prevista. Amenazar una caída ya reduce el espacio del ataque; no necesitas exponerte tú también para buscarla. Cuando el rival cambie de lado, rota con el núcleo del equipo y deja que un jugador móvil vigile la ruta anterior. Repartir a una persona por acceso suele acabar con todas demasiado lejos para ayudarse.',
        vodReview: 'En cada muerte ambiental, retrocede unos segundos. Comprueba por qué estabas junto al borde y si habías gastado la movilidad de salida. El empujón casi siempre remata un error anterior.',
      },
      {
        name: 'Control Center',
        attack: 'Control Center no deja mucho espacio para corregir una entrada a medias. Asoma para forzar Muro, Suzu, control o la herramienta que pueda detenerte y cruza mientras no esté disponible. Después ocupa dos esquinas dentro de la sala; cinco jugadores sobre el círculo reciben el mismo daño y se estorban al retroceder. Dar una vuelta completa por fuera solo tiene sentido si el equipo la hace junto y todavía queda tiempo.',
        defense: 'Recibe en la puerta, pero no mueras en ella. Cuando el ataque gaste velocidad o protección, vuelve a la cobertura del punto y responde allí. Si un rival se adelanta, acelera sobre él; si entra el grupo entero, conserva la forma y evita perseguir al primero que se retire. La última defensa necesita una definitiva útil, no cinco recursos gastados para ganar una pelea que ya era favorable.',
        vodReview: 'Busca el segundo exacto en que el Tank cruzó. Después comprueba dónde estaban los DPS y si los supports podían verlo. Una diferencia de dos segundos explica muchas peleas que parecían simplemente falta de daño.',
      },
    ],
    attackPlan: [
      { title: 'Llega como equipo', body: 'La primera pelea importa mucho, pero llegar antes no sirve si dos compañeros siguen rotando. Entra con una formación y una condición de victoria claras.' },
      { title: 'Abre dos miradas', body: 'Combina una ruta principal con un lateral corto. No necesitas un flanqueo largo: basta con impedir que los cinco rivales disparen a la misma puerta.' },
      { title: 'Recupera con recursos', body: 'Espera el reagrupación y decide qué habilidad o definitiva abre el cruce. Tocar primero y pensar después suele encadenar varias derrotas.' },
      { title: 'Ocupa después de capturar', body: 'Cuando el punto cambia de dueño, toma coberturas que permitan ver los accesos. Quedarse amontonado en el centro entrega la iniciativa.' },
    ],
    defensePlan: [
      { title: 'Defiende accesos, no el icono', body: 'El porcentaje seguirá subiendo mientras controlas las puertas y puedes volver al objetivo. Busca una posición con salida y línea de curación.' },
      { title: 'Lee la entrada rival', body: 'Identifica pronto la ruta principal. Rotar todos juntos es mejor que responder tarde con pequeños duelos en cada lado.' },
      { title: 'No persigas hasta zona de reaparición', body: 'Una eliminación no autoriza una persecución larga. Conserva el terreno desde el que podrás defender la siguiente entrada.' },
      { title: 'Prepara el último contacto', body: 'Por encima del 80 %, decide quién puede tocar, qué definitiva responderá y desde qué acceso llegará el resto del equipo.' },
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
        plan: 'Ana presiona desde cobertura, Winston corta la visión y ambos DPS atacan el mismo sector. Kiriko acompaña la salida o limpia la respuesta que impediría completar la entrada.',
        weakness: 'Falla cuando los saltos no comparten objetivo, Ana queda sin una rotación segura o el equipo confunde movilidad con la obligación de entrar constantemente.',
      },
    ],
    mistakes: [
      'Cambiar el punto por una persecución y permitir que el rival capture sin tener que ganar otra pelea.',
      'Entrar de uno en uno para arañar porcentaje cuando todavía existe tiempo para reagruparse.',
      'Usar la misma composición en los tres escenarios sin revisar alcance, movilidad y acceso al objetivo.',
      'Defender dentro del punto con los cinco jugadores y regalar todas las puertas al equipo contrario.',
      'Gastar varias definitivas después de ganar la pelea, dejando el último entrada sin una respuesta clara.',
    ],
    vodChecklist: [
      '¿Llegó el equipo completo a la primera pelea de cada ronda?',
      '¿Qué entrada se eligió y quién generaba la segunda mirada?',
      '¿Cuántas muertes ocurrieron intentando tocar sin apoyo?',
      '¿La posición defensiva tenía cobertura, curación y una salida?',
      '¿Se adaptaron los picks al cambiar de Night Market, Garden o Control Center?',
      '¿Qué definitiva estaba reservada para el último entrada?',
    ],
    faq: [
      { question: '¿Qué tipo de mapa es Lijiang Tower?', answer: 'Lijiang Tower es un mapa de Control. Los equipos compiten por capturar y mantener un único objetivo, y la partida se decide al ganar dos de los tres escenarios posibles.' },
      { question: '¿Cuáles son los escenarios de Lijiang Tower?', answer: 'Los tres escenarios son Night Market, Garden y Control Center. Cada uno cambia los accesos, las distancias y el valor de la movilidad, por lo que conviene revisar la composición entre rondas.' },
      { question: '¿Qué héroes funcionan bien en Lijiang Tower?', answer: 'Winston, Reinhardt, Genji, Mei, Kiriko y Lúcio tienen herramientas útiles según el escenario. No existe un pick obligatorio: lo importante es que el equipo pueda cruzar junto, sostener el punto y responder a los laterales.' },
      { question: '¿Cómo se recupera un punto en Lijiang Tower?', answer: 'Reagrúpate, elige una entrada principal y abre un segundo ángulo corto. Fuerza una habilidad rival antes de comprometer movilidad o definitivas y evita tocar con jugadores aislados.' },
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
        weakness: 'Sufre si una composición móvil alcanza la retaguardia, si los DPS renuncian a toda la altura o si el equipo intenta pelear a corta distancia sin haber desgastado recursos.',
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
