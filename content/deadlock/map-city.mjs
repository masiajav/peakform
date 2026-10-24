export const sourceUrls=[
 'https://www.playdeadlock.com/cityneversleeps',
 'https://api.deadlock-api.com/v1/assets/map',
 'https://api.deadlock-api.com/v1/assets/generic-data?language=spanish',
 'https://api.deadlock-api.com/v1/assets/npc-units?language=spanish',
 'https://deadlockhandbook.com/map/map-overview/',
 ...['Lane_Guardian','Walker','Base_Guardian','Shrine','Patron','Mid_Boss','Rejuvenator','Soul_Urn','Unstable_Rift','The_Curiosity_Shop','Haunt','Sinner%27s_Sacrifice','Crate','Buff_Container','Healing_Snack','Powerup','Zipline','Teleporter','Cosmic_Veil','Steam_Vent','Tunnel','Base_Turret'].map(name=>`https://deadlock.wiki/${name}`),
]
export default {
 title:'Mapa de Deadlock: objetivos, recursos y rutas de la ciudad',
 description:'Explora las tres calles y los túneles. Reconoce guardianes, campamentos, tiendas, urna y grieta, y decide qué disputar con tu equipo.',
 intro:'La ciudad ofrece más recursos de los que puedes recoger a la vez. Elige una ruta que mantenga tus oleadas, te acerque a una compra útil y te deje llegar a la pelea. Este plano te ayuda a reconocer los lugares; las explicaciones de abajo conectan cada uno con una decisión de partida.',
 sections:[
  {key:'minimap',title:'Antes de moverte: qué cuenta el minimapa',body:[
   'El minimapa reúne oleadas, aliados, enemigos revelados y objetivos. Un enemigo que desaparece del plano puede seguir al otro lado de una pared: no equivale a que haya abandonado la zona. Antes de cruzar una calle, busca qué rivales faltan y desde qué acceso podrían llegar.',
   'En este plano puedes colocar Ámbar o Zafiro abajo. En partida, tu minimapa gira para dejar tu propia base en la parte inferior; por eso conviene comunicar «York» o «Greenwich» en lugar de un «izquierda» que tu compañero pueda interpretar desde otra orientación.',
   'Los triángulos de campamento indican su dificultad: sin raya, una raya o dos. El icono de bóveda identifica una ubicación con máquinas de almas y, en ocasiones, apariciones. Un marcador de aparición tampoco garantiza que el recurso esté disponible: mira su estado y su temporizador.'
  ]},
  {key:'lanes',title:'Tres calles, cuatro distritos y muchas alturas',imageKey:'map-neutral',caption:'Ámbar abajo: 1 Teatro · 2 Chinatown · 3 Terreno Encantado · 4 Plaza. Plano de Valve.',body:[
   'York es amarilla, Broadway azul y Greenwich verde. Cada una conecta las bases mediante una tirolina y una cadena de defensas. Las oleadas empujan ese recorrido; los espacios entre calles permiten conseguir almas, cambiar de ángulo y llegar a otro frente.',
   'Broadway pasa por Times Square y sobre el foso del Midboss. York conecta la Bolsa de Valores, los muelles y las fábricas Fairfax; Greenwich atraviesa el campus de Umbria, Central Park y las casas adosadas. Usa esos nombres para reconocer accesos cuando la pelea te saque de tu línea.',
   'Teatro, Chinatown, Terreno Encantado y Plaza ocupan los huecos entre calles. No son cuatro carriles adicionales: sus tejados, pasajes y campamentos sirven de conexión. Atravesarlos puede ocultar tu llegada, pero también te aleja de la ayuda de la oleada.'
  ]},
  {key:'theater',title:'Teatro: el enlace entre Broadway y Greenwich',imageKey:'theater-03',caption:'Teatro ocupa el espacio entre las calles azul y verde del lado de Zafiro. Imagen: Valve.',body:[
   'Sus escenarios y accesos conectan las dos calles. Las manos tramoyistas añaden fuego al suelo cuando limpias sus campamentos: conserva un ángulo para salir antes de seguir hacia la otra línea. Una rotación por aquí puede acercarte al frente desde un lateral, pero no revela qué te espera al terminar el pasaje.'
  ]},
  {key:'chinatown',title:'Chinatown: altura, campamentos y una campana',imageKey:'chinatown-01',caption:'Chinatown está entre Broadway y Greenwich del lado de Ámbar. Imagen: Valve.',body:[
   'El distrito combina callejones con accesos al Campanario. Vigila tanto la calle como los niveles superiores antes de cortar el paso a un rival. Subir a recoger recursos hace ruido y lleva tiempo; decide si te interesa esa limpieza o llegar antes a la siguiente oleada de Greenwich.'
  ]},
  {key:'haunted',title:'Terreno Encantado: desvíos entre York y Broadway',imageKey:'haunted-slums-01',caption:'Terreno Encantado enlaza las calles amarilla y azul del lado de Ámbar. Imagen: Valve.',body:[
   'Las apariciones y las coberturas de esta zona permiten enlazar una limpieza con una rotación. Reconoce el suelo peligroso de los hongos antes de comprometerte a otro grupo. Si alguien desaparece en el distrito, calcula sus salidas hacia ambas calles; esperar solo frente a la entrada por la que lo viste marcharse no cubre todo el recorrido.'
  ]},
  {key:'plaza',title:'Plaza: decidir antes de bajar',imageKey:'fairfax-plaza-01',caption:'Plaza conecta York y Broadway del lado de Zafiro. Imagen: Valve.',body:[
   'El espacio abierto y la zona hundida ofrecen rutas diferentes. Desde arriba puedes conservar información de las calles; al bajar aceptas las limitaciones de la niebla y el aguante. Si el objetivo está a punto de comenzar, una limpieza profunda puede impedirte llegar aunque el recurso parezca cercano en el minimapa.'
  ]},
  {key:'guardian',title:'Guardianes de línea: abrir el primer espacio',body:[
   'El guardián es la primera defensa de cada calle. Su rayo castiga a quien sostiene delante y su golpe cercano puede pararse. Atacarlo desde fuera de su zona no permite desgastarlo sin exponerte; entra con una oleada y evita cambiar su atención hacia ti golpeando a un rival bajo su protección.',
   'Derribarlo abre el acceso al Walker y cierra la tienda lateral de ese equipo en la calle. Esa pérdida cambia dónde puede comprar el defensor. Si ganas el espacio, vigila la salida hacia su siguiente tienda en lugar de perseguir sin saber qué recursos lleva.',
   'Una oleada entrando no obliga a terminar el guardián. Si faltan varios rivales y tu compañero ya está retrocediendo, conservar salud y recoger la siguiente oleada puede valer más que unos disparos adicionales.'
  ]},
  {key:'walker',title:'Walkers: una defensa y un espacio de inventario',body:[
   'Después del guardián aparece el Walker. Puede golpear el suelo, lanzar proyectiles y mantener daño sobre el frente. No confundas su tamaño con un objetivo inmóvil que puedas atacar pegado a él sin consecuencias: deja margen para salir del área y no agrupes al equipo sobre el mismo impacto.',
   'Cada Walker destruido concede un espacio adicional de objetos a todo el equipo atacante. Por eso preparar una oleada hacia un Walker puede ser más valioso que perseguir una baja lejos de la calle. Los Walkers restantes también ganan salud cuando cae uno de sus compañeros.',
   'La protección contra ataques sin oleada reduce mucho el daño y recupera salud. Si el asedio apenas avanza, comprueba la posición real de tus soldados antes de gastar todas las habilidades. Con rivales vivos, distribuye la vigilancia entre los accesos y el objetivo.'
  ]},
  {key:'base-chain',title:'Guardianes de base y santuarios: qué hay que romper',body:[
   'Cada entrada de calle termina en una pareja de guardianes de base. Derribar una pareja permite atacar los dos santuarios del interior; no necesitas eliminar primero las tres parejas. La tirolina de esa calle recibe además una mejora permanente de velocidad para el equipo que ha abierto el acceso.',
   'Los santuarios deben caer antes de poder dañar al Patrón. Atácalos desde su plataforma y respeta las áreas con las que el Patrón defiende ese lugar. Cuando cae el primero, el segundo se refuerza: no presupongas que tardarás lo mismo en ambos.',
   'La apertura de una entrada sirve para elegir el siguiente paso. Si tus compañeros están comprando o faltan oleadas en las otras calles, toma espacio y recursos antes de convertir el avance en una pelea contra toda la defensa.'
  ],table:{columns:['Paso','Qué permite','Qué comprobar'],rows:[
   ['Guardián de línea','Acceder al Walker','Oleada, atención del rayo y tienda lateral.'],
   ['Walker','Un espacio adicional para el equipo','Refuerzos enemigos y protección sin oleada.'],
   ['Una pareja de guardianes de base','Atacar los santuarios','Entrada elegida y respuesta de la defensa.'],
   ['Los dos santuarios','Dañar al Patrón','Permanecer en la plataforma sin regalarse al área.'],
   ['Patrón y forma debilitada','Cerrar la partida','Transformación, regresos enemigos y salida del foso.']
  ]}},
  {key:'patron',title:'El Patrón tiene dos fases: terminar una no acaba la partida',body:[
   'El Patrón defiende la base y solo se vuelve vulnerable después de perder ambos santuarios. Cuando completas su primera fase, se transforma y reaparece como Patrón debilitado en el foso. Durante la transformación no puedes seguir dañándolo: aprovecha esa pausa para recolocarte y mirar los regresos.',
   'La forma debilitada obliga a entrar en el foso para hacer daño. Sus pulsos y explosiones castigan quedarse allí sin recursos. La presencia de defensores en el foso también aumenta su protección, así que disparar al objetivo mientras ignoras a quienes lo sostienen puede dar muy poco resultado.',
   'Antes de buscar el cierre, cuenta aliados presentes, oleadas y herramientas defensivas. Si tienes que salir, sal con el grupo; permanecer solo dentro mientras el equipo retrocede suele convertir la presión ganada en una baja evitable.'
  ]},
  {key:'spawn',title:'La zona de aparición: recuperación, compras y pozo de almas',body:[
   'La sala de aparición permite recuperar salud y comprar en la tienda de tu equipo. El pozo libera pequeñas esferas de almas cuando está activo: puedes confirmarlas mientras recuperas recursos, sin confundir ese ingreso con el de una oleada completa.',
   'Las torretas de la zona de aparición son defensas indestructibles que castigan a los enemigos que se acercan. No necesitas perseguir hasta la sala para mantener una ventaja de asedio. Deja vigilada la salida y aprovecha el tiempo en que el rival no puede defender el resto de la base.'
  ]},
  {key:'midboss',title:'Midboss: preparar el foso y también la salida',body:[
   'El Midboss está bajo Broadway, en el centro. Sus accesos se reconocen por el símbolo del Rejuvenecedor. Para dañarlo debes entrar en el foso y superar su escudo regenerativo; si tu grupo no puede mantener suficiente presión, golpearlo durante mucho tiempo solo anuncia vuestra posición.',
   'Al morir concede almas y mejoras permanentes al equipo que lo elimina, pero el cristal que cae después puede disputarlo cualquiera. Su rugido avisa a ambos equipos durante el combate: reserva a alguien que mire las entradas en lugar de gastar toda la atención en la barra de vida.',
   'Una buena preparación combina calles empujadas, aliados con salud y compras, y visión de los rivales que podrían entrar. Si el enemigo conserva un acceso limpio para llegar al cristal, terminar el jefe todavía no significa haber ganado la zona.'
  ]},
  {key:'rejuv',title:'Rejuvenecedor: el cristal se reclama después de caer',body:[
   'El cristal tarda seis segundos en descender. Cuando toca el suelo, cada golpe cuerpo a cuerpo pesado reclama un crédito para el equipo, hasta tres por Midboss. El primer golpe también recupera la salud de quien lo conecta. El equipo que mata al jefe no tiene exclusividad sobre esos créditos.',
   'Los créditos duran tres minutos y permiten revivir en el lugar de la muerte tras una breve espera. Cada héroe puede consumir uno, y la reserva es compartida: no son tres vidas extra para cada jugador. Mira los indicadores superiores para saber quién conserva la posibilidad de volver.',
   'Al atacar con esa ventaja, coloca la pelea donde el grupo pueda acompañar el regreso. Revivir dentro de una zona controlada por el enemigo no te devuelve automáticamente una posición segura. Al defender, conserva distancia y una respuesta para la reaparición.'
  ]},
  {key:'urn',title:'Urna de Almas: transportar no es capturar un puente',body:[
   'La urna aparece a partir del minuto diez y alterna entre las calles laterales. Se recoge con un golpe cuerpo a cuerpo y se lleva al punto de entrega del lado contrario. El portador tiene ayudas de movimiento, pero no puede usar tirolinas ni teletransportadores, y puede perder la urna al recibir ciertos controles o golpes.',
   'La entrega libera esferas que se pueden confirmar o denegar, y recompensa al mensajero con mejoras permanentes. No la trates como un reparto automático de almas idéntico al de la grieta. Mientras acompañas, mira también las esferas al completar la entrega.',
   'Prepara el cruce antes de levantarla: quién vigila la salida, por dónde puede llegar el rival y qué calle está empujada. Si la retienes demasiado, su valor empieza a decaer y puede expirar. Dar un rodeo útil evita una emboscada; pasearla sin una ruta no aumenta la recompensa.'
  ]},
  {key:'rift',title:'Grieta Inestable: presencia, control del borde y oleada',body:[
   'La grieta es un evento independiente de la urna. Se anuncia en un puente lateral y abre una zona de captura. Hay que permanecer dentro; ambos equipos pueden acumular progreso, pero no se resuelve a favor de uno mientras el otro siga disputando el punto. Más aliados dentro no aceleran por sí solos el progreso.',
   'Ganar la grieta concede almas al equipo y genera soldados de grieta en esa calle. La ventaja sirve para presionar una defensa, así que comprueba cuál será el objetivo de esa oleada. El equipo que va por detrás puede recibir ayudas de captura y resistencia: no valores la disputa solo por la diferencia de almas.',
   'Con alguien capturando, los demás pueden sostener salidas y negar la llegada del rival desde cobertura. Meter a los seis sobre el mismo puente facilita que una sola área os afecte a todos. La zona revela presencia en el minimapa, de modo que una captura no es una maniobra oculta.'
  ]},
  {key:'shops',title:'Tiendas: dónde puedes convertir almas en fuerza',body:[
   'Hay una tienda en cada sala de aparición, tiendas de línea junto a los guardianes y dos tiendas secretas bajo tierra. Las de base y línea sirven al equipo correspondiente; cualquiera puede comprar en las secretas. La tienda lateral deja de funcionar cuando cae su guardián.',
   'Abre el menú dentro de la zona de compra. Si acabas de comprar y todavía no has salido de ella, puedes deshacer la compra sin la pérdida normal de vender después. Comprueba también tus objetos activos e imbuidos antes de reincorporarte.',
   'No hagas una visita sin decidir qué necesitas. Una compra de defensa antes de la grieta puede participar en toda la pelea; guardar las almas para una pieza cara mientras vuelves a morir no produce la misma ventaja. Vigila los accesos a las tiendas secretas, porque ambos equipos pueden usarlas.'
  ]},
  {key:'camps',title:'Campamentos: dificultad, recorrido y reaparición',body:[
   'Las apariciones o Haunts son enemigos neutrales que proporcionan almas. Los campamentos pequeños, medios y grandes se distinguen por su icono y por el nivel de las criaturas. La familia cambia la forma de atacarte, así que no todos los grupos de tamaño parecido se limpian igual.',
   'Para que empiece a contar la reaparición debes completar el campamento. En los grupos mixtos, también cuentan las máquinas que lo acompañan. Dejar una criatura o una máquina pendiente cambia cuándo habrá recursos de nuevo; las cajas y mejoras sueltas no forman parte de esa condición.',
   'Integra la limpieza en un trayecto: oleada, campamento próximo, compra y llegada al frente. Si vacías tus habilidades contra un grupo fuerte justo antes de cruzarte con el rival, las almas ganadas pueden costarte la pelea. Mira los temporizadores cercanos en lugar de esperar quieto a una aparición.'
  ],table:{columns:['Icono de campamento','Qué señala','Decisión útil'],rows:[
   ['Triángulo sin raya','Campamento pequeño','Un desvío corto cuando no pierdes una oleada.'],
   ['Triángulo con una raya','Campamento medio','Cuenta el tiempo de limpieza y los recursos de salida.'],
   ['Triángulo con dos rayas','Campamento grande','Evita comprometer salud y habilidades sin conocer a los rivales cercanos.'],
   ['Bóveda','Máquinas de almas; puede incluir apariciones','Completa el grupo y reserva salud para el daño de la máquina.']
  ]}},
  {key:'families',title:'Las familias de apariciones cambian tu forma de limpiar',body:[
   'Reconoce el ataque especial antes de quedarte disparando desde el mismo sitio. Sus variantes más fuertes pueden añadir proyectiles, áreas o efectos; el número romano del nombre indica su nivel. Esta tabla sirve para elegir una cobertura o una separación, no para asumir que todas las variantes usan el mismo ataque.'
  ],table:{columns:['Familia','Qué debes vigilar','Cómo cambia el recorrido'],rows:[
   ['Gul de Cloaca (Gutter Ghoul)','Charcos de residuos dañinos.','Limpia sin bloquear tu única salida con el área.'],
   ['Deudas Pendientes (Past Dues)','Proyectiles de libros y sueño en su secuencia.','Conserva cobertura para cortar la ráfaga.'],
   ['Bidón Mímico (Barrel Mimic)','Explosiones de área.','Deja distancia para seguir limpiando después del impacto.'],
   ['Maceta de Colgrejo (Crabbage Pot)','Ataque cercano de área.','Reconoce su preparación antes de acercarte.'],
   ['Espíritu Festivo (Festival Spirit)','Fuegos artificiales que persiguen.','No lleves la amenaza hasta un compañero sin espacio.'],
   ['Hongo de los Suburbios (Slum Shroom)','Esporas y suelo peligroso.','No valores el campamento solo por el daño de sus ataques básicos.'],
   ['Mano Tramoyista (Stage Hand)','Rayo y fuego en el suelo.','Cambia el ángulo si la zona te obliga a permanecer expuesto.'],
   ['Mano Oculta (Underhand)','Rayo y peligro en su recorrido.','Conserva una salida desde las zonas bajas.'],
   ['Espécimen (Specimen)','Explosión al morir en variantes superiores.','No termines el grupo pegado a su cuerpo sin necesidad.']
  ]}},
  {key:'machines',title:'Sinner’s Sacrifice: pagar salud para ganar almas',body:[
   'Estas máquinas se golpean cuerpo a cuerpo para conseguir almas y pueden conceder mejoras permanentes. Cada golpe provoca una respuesta que cuesta salud. Mira la vida disponible antes de empezar; farmear una máquina y quedar a un impacto de morir puede regalarle al rival todo el desvío.',
   'Al final aparece una secuencia de luces. Acertar el momento del golpe pesado permite obtener el premio de mejoras; no es lo mismo aporrear sin mirar que completar ese remate. Las habilidades que infligen daño melee no equivalen automáticamente a un golpe válido sobre la máquina.',
   'El icono de bóveda representa una ubicación, no necesariamente una única máquina. Si comparte campamento con apariciones, hay que terminar ambos componentes para iniciar su reaparición. Antes de encadenar otra, comprueba si ya puedes comprar o llegar a una pelea con ventaja.'
  ]},
  {key:'bell',title:'Campanario de Chinatown: recursos que se oyen desde lejos',imageKey:'mustdo-bell',caption:'El Campanario de Chinatown. Imagen: Valve.',body:[
   'En lo alto del Campanario se concentra una buena cantidad de recursos, incluidas máquinas de almas. Golpear las máquinas o los objetos de esa zona hace sonar la campana por el mapa. Tu limpieza deja una pista que el rival puede aprovechar para acercarse o atacar otro lugar.',
   'Antes de subir, elige por dónde vas a bajar y mira la calle cercana. Si oyes la campana desde otro punto, úsala como información: puede ayudarte a calcular dónde falta un rival, pero no revela por sí sola cuántos están allí.'
  ]},
  {key:'sunken',title:'Plaza Hundida: más recursos y menos margen de escape',imageKey:'mustdo-pool',caption:'La niebla de Plaza Hundida reduce la información del exterior. Imagen: Valve.',body:[
   'Bajo Plaza hay una zona con niebla, campamentos y máquinas. Al bajar, los sonidos del exterior se amortiguan y el aguante se consume. Una entrada que parecía corta puede dejarte sin las reservas necesarias para salir si aparece un enemigo.',
   'Conserva una ruta hacia las escaleras y evita empezar todos los grupos a la vez. Si un rival está limpiando dentro, controlar la salida puede dar más resultado que bajar con él sin conocer su salud ni sus habilidades. No confundas ocultación con una zona libre de amenazas.'
  ]},
  {key:'crates',title:'Cajas normales y resistentes: recoger sin romper tu ruta',imageKey:'mustdo-crate',caption:'Las cajas resistentes se reconocen por sus refuerzos y el cierre. Imagen: Valve.',body:[
   'Las cajas pueden soltar almas al romperse. Las normales admiten varias formas de daño y movimiento; las resistentes necesitan un golpe cuerpo a cuerpo pesado. No te quedes disparando a una resistente esperando que se comporte como una caja pequeña.',
   'Las almas obtenidas pueden quedar expuestas si mueres antes de consolidarlas. Recoger cajas de camino a una compra es distinto de encadenar desvíos hacia una zona enemiga. El pequeño ingreso deja de compensar cuando te hace perder una oleada o llegar tarde al objetivo.'
  ]},
  {key:'buffs',title:'Contenedores de mejoras: poder permanente que hay que recoger',imageKey:'mustdo-buffs',caption:'Los contenedores sustituyen a las antiguas estatuas doradas. Imagen: Valve.',body:[
   'Al romper estos contenedores puedes encontrar una mejora permanente. Entre sus efectos hay salud, arma, espíritu, cadencia, munición, recarga, resistencias, alcance y movimiento. No son los potenciadores temporales de los puentes.',
   'Recoge el objeto que sueltan antes de continuar. Una mejora pequeña acumulada durante un recorrido puede aportar durante toda la partida, pero no justifica exponerte en un área donde el rival ya te espera. Si estás siguiendo a alguien, decide si recoger o mantener la distancia del grupo.'
  ]},
  {key:'snacks',title:'Comida de curación: recuperar sin volver a base',imageKey:'mustdo-snack',caption:'Busca también por encima del nivel de la calle. Imagen: Valve.',body:[
   'La comida repartida por la ciudad recupera salud al recogerla. Parte está en altura y no aparece como un objetivo principal del minimapa: mira el escenario cuando te muevas entre coberturas.',
   'Puede ayudarte a sostener una rotación o preparar la siguiente oleada. Comprueba qué movimiento gastarás para alcanzarla; usar tu única salida en medio de enemigos puede costar más salud de la que estabas intentando recuperar.'
  ]},
  {key:'powerups',title:'Potenciadores de puente: ventaja temporal para una jugada',body:[
   'En los puentes aparecen piedras que se reclaman con un golpe pesado. Sus mejoras son temporales: arma, lanzamiento, movimiento o supervivencia. El icono indica qué tipo está disponible, así que no todas cambian de la misma forma la próxima pelea.',
   'Aprovecha la duración para una acción cercana: un duelo que puedas sostener, una rotación, una defensa o una ventana de presión. Si el enemigo lo recoge primero, respeta ese efecto antes de repetir el intercambio que acababas de ganar. No confundas su piedra con la entrega de urna o el evento de la grieta.'
  ]},
  {key:'steam',title:'Vapor: ocultarte y recuperar un poco de salud',imageKey:'mustdo-vents',caption:'El vapor ofrece cobertura visual mientras permaneces dentro. Imagen: Valve.',body:[
   'Las salidas de vapor permiten ocultarse y obtener regeneración mientras permaneces encima. El daño, las acciones sobre enemigos o la entrada de un rival pueden revelar tu presencia. No funciona como una pared que bloquee proyectiles.',
   'Úsalo para cambiar el momento de una aparición o recomponer una salida, sin asumir que puedes esperar allí con total seguridad. Si persigues a alguien que entra en el vapor, vigila también la ruta que podría usar para abandonar el lugar.'
  ]},
  {key:'veils',title:'Velos cósmicos: ver desde un lado no significa ser visto',body:[
   'Los velos son superficies visuales que puedes atravesar. Una cara oculta a quienes están al otro lado y la otra permite observar a través; no son puertas cerradas ni escudos. Reconocer qué cara estás mirando cambia si una asomada permite apuntar o solo te expone.',
   'Cuando prepares una emboscada, conserva una cobertura real además del velo. Si te persiguen, atravesarlo puede cortar información, pero un enemigo que ya conoce tu dirección puede continuar con daño de área. Comprueba el acceso completo en lugar de dar la retirada por terminada al cruzar la superficie.'
  ]},
  {key:'ziplines',title:'Tirolinas: transporte rápido, salida condicionada por el combate',body:[
   'Las tirolinas recorren las tres calles y su disponibilidad sigue el avance de las oleadas. El impulso acelera un trayecto y abrir los guardianes de base convierte esa línea en una ruta rápida permanente. Esa conexión cambia cuánto tarda tu equipo en volver a presionar.',
   'Recibir daño de un héroe cerca de la conexión puede impedir subir, y un impacto al comienzo del viaje puede derribarte. No elijas una tirolina como retirada si el rival todavía tiene un disparo limpio. Busca primero cobertura y reconoce cuándo vuelve a estar disponible el enganche.',
   'Al llegar, mira antes de soltarte sobre el objetivo: salir al centro de varios rivales elimina la ventaja de haber rotado deprisa. Si transportas la urna, necesitas otra ruta.'
  ]},
  {key:'teleports',title:'Teletransportadores: dos parejas con una espera',body:[
   'Los teletransportadores están junto a las tiendas secretas y conectan extremos del mapa. La entrada requiere una canalización de cuatro segundos; no es un escape instantáneo. El icono del minimapa apunta hacia la salida correspondiente.',
   'Comprueba si la llegada te deja participar o solo te aleja de tus aliados. Si te sigue un enemigo, la espera puede darle tiempo a alcanzarte. El portador de urna no puede usarlos: acompaña su ruta por tierra en lugar de dejarlo solo al cruzar.'
  ]},
  {key:'height',title:'Cuerdas y plataformas: subir también deja una trayectoria',body:[
   'Las cuerdas permiten ganar altura. Recibir daño de héroes afecta a la velocidad de subida y un golpe cercano puede entorpecerla. Ten preparada una salida al llegar arriba; la cuerda no te protege mientras asciendes.',
   'Las plataformas lanzan en una dirección marcada por el aire y por señales de aterrizaje. Puedes corregir el salto, pero el despegue no es una ventana de invulnerabilidad. Mira dónde vas a caer antes de usar una plataforma para entrar en una pelea.',
   'Un tejado sirve para disparar, rotar o romper una persecución solo si tienes acceso y descenso. Compara el tiempo de esa subida con el de acercarte por una cobertura de calle.'
  ]},
  {key:'tunnels',title:'Túneles y conductos pequeños: no todos los héroes caben',body:[
   'Los túneles centrales conectan tiendas, escaleras y accesos bajo Broadway. Cambiar de planta puede ocultar la dirección de una rotación, pero también limita tus salidas. Mira las escaleras cercanas y no confundas un enemigo situado encima con uno que ya comparte tu pasillo.',
   'Los conductos estrechos tienen restricciones adicionales. Rat King y Rem, Calico en forma de Ava y Mo y Krill con sus condiciones de acceso pueden utilizarlos; un héroe grande cualquiera no gana esa ruta por agacharse. El combate y llevar la urna también restringen la entrada.',
   'Si persigues a un héroe que puede entrar, controla la salida que le interesa o vuelve a la oleada. Quedarte delante del conducto sin acceso regala tiempo y puede separarte del equipo.'
  ]},
  {key:'routes',title:'Tres decisiones que unen recursos, mapa y equipo',body:[
   'Si tu oleada llega al guardián rival y faltan enemigos, recoge un recurso cercano desde una salida que conserve cobertura. No cruces otro distrito solo porque su campamento está disponible: primero decide qué perderás si el rival vuelve a la calle.',
   'Si se anuncia una grieta y tienes una compra preparada, visita la tienda antes de entrar en el puente. Elige quién ocupa el punto y quién vigila el acceso. Después de ganar, acompaña la oleada generada hacia una defensa que tu equipo pueda disputar.',
   'Si el rival reúne gente para Midboss, empuja una calle y cuenta quién puede llegar al foso. Disputar el cristal, defender un acceso o convertir el tiempo en una estructura son decisiones diferentes. Elige una que tu grupo pueda completar; dividirse entre las tres puede no conseguir ninguna.'
  ]},
 ],
 faq:[
  ['¿La urna activa la Grieta Inestable?','No. Son objetivos separados: la urna se transporta y entrega; la grieta se anuncia y se disputa dentro de una zona de captura.'],
  ['¿Hay que romper todos los guardianes de base?','Para habilitar los santuarios basta con destruir una pareja de guardianes de base. Después deben caer los dos santuarios antes de poder dañar al Patrón.'],
  ['¿Cada compañero tiene tres reapariciones con el Rejuvenecedor?','No. Los créditos son una reserva del equipo y cada héroe puede consumir uno. No prepares una entrada contando con tres vidas para cada jugador.'],
  ['¿Por qué un punto del plano parece estar encima de otro?','La ciudad tiene varias alturas. Cambia entre calles y túneles y reconoce escaleras, cuerdas y entradas; una proyección desde arriba no significa que ambos lugares estén conectados directamente.'],
  ['¿Por qué mi minimapa tiene las calles al otro lado?','El juego coloca tu base abajo. Usa la orientación Ámbar o Zafiro del plano para compararlo con tu partida y comunica las calles por su nombre o color.'],
 ],
 checklist:['Mira las oleadas y los enemigos que faltan antes de desviarte.','Compra antes de disputar y conserva una salida desde el recurso.','Distingue la entrega de urna, la captura de grieta y la disputa del Rejuvenecedor.','Tras ganar un objetivo, decide qué estructura o zona puedes presionar con esa ventaja.'],
}
