// Authored tactical additions. Item names and prices are resolved against the saved client snapshot.
export default {
  abrams: {
    abilities: [
      'Extracción de Vida te ayuda a sostener un contacto cercano. Úsala cuando ya puedas permanecer junto al objetivo; activarla mientras todavía atraviesas un pasillo deja escapar parte de la oportunidad. Si el rival gira una esquina, decide si puedes acompañarlo con el equipo o si necesitas cortar el intercambio.',
      'Embestida de Hombro necesita una trayectoria útil: el choque contra una pared es lo que añade el aturdimiento. Apunta al lugar donde terminará el objetivo, no solo a su posición inicial. También puedes usar el recorrido para retirarte; entrar sin un destino es regalar la siguiente respuesta.',
      'Resiliencia Infernal devuelve parte del daño como regeneración a lo largo del tiempo. Te favorece alternar presión y cobertura para aprovechar esa recuperación. No evita que varias fuentes de daño concentradas te eliminen antes de recuperar salud; prolongar la exposición no convierte la regeneración en invulnerabilidad.',
      'Impacto Sísmico abre una llegada con daño y control. Decide qué enemigo quedará al alcance de tus aliados cuando aterrices. Si tu equipo está demasiado lejos, el mismo salto puede servir para proteger una retirada o cambiar de lado de una estructura en vez de empezar otra pelea.'
    ],
    sections: [
      ['Una secuencia corta que puedes repetir', 'Acércate por una cobertura, amenaza la embestida hacia una pared y dispara mientras el rival decide cómo esquivarla. Si consigues el choque, utiliza el tiempo de control para añadir daño o asegurar un golpe legible. Si el choque no ocurre, no fuerces un golpe pesado delante de un rival que conserva el contrataque: vuelve a cobertura y prepara otra aproximación.', 'La segunda decisión llega después del contacto. Mira si todavía tienes salud, una salida lateral y apoyo. Conservar el salto para corregir una entrada fallida puede ser más útil que gastarlo inmediatamente sobre un objetivo ya controlado. En una pelea ganada, usa la posición conseguida para presionar la estructura antes de perseguir hasta otra esquina.'],
      ['Cómo repartir puntos de habilidad', 'Si encuentras choques contra pared con frecuencia, mejorar Embestida refuerza la parte más repetible de tu plan. Si estás perdiendo intercambios antes de acercarte, revisa primero la recuperación y la resistencia de tus compras. Subir una habilidad ofensiva no corrige por sí solo una línea en la que recibes daño sin poder responder.', 'No necesitas seguir un orden idéntico cuando tu tarea cambia. Un Abrams que acompaña una entrada corta puede valorar el control; uno que está defendiendo una retirada necesita conservar herramientas para negar la persecución. Antes de gastar puntos, piensa qué botón vas a poder usar en la próxima pelea.'],
      ['Contra disparos y contra habilidades', 'Cuando un tirador te obliga a cruzar terreno abierto, acorta la aproximación con una ruta distinta en vez de intentar absorber todo el cargador. Contra control cercano, procura que el rival gaste una respuesta antes de comprometer la embestida. El camino y el tipo de amenaza importan más que buscar siempre al enemigo con menos salud.']
    ],
    matchups: [
      ['Mo y Krill', 'Su desarme puede cortar la continuación de disparos y Combo puede fijarte mientras llega daño aliado.', 'Juega a una distancia desde la que puedas cubrir la entrada de un compañero. Si gastas Combo, hazlo cuando tu equipo vea a Abrams y pueda aprovechar el control.', 'No persigas a Abrams solo después de gastar el control; vuelve a contar las herramientas disponibles.'],
      ['Dínamo', 'Pulsación Cinética puede romper una aproximación y Entrelazamiento Cuántico permite cambiar la posición del objetivo amenazado.', 'Conserva una respuesta para la llegada de Abrams. Si la usas antes contra daño poco peligroso, deja de existir la protección de la que dependía el aliado.', 'Acumular a todo el equipo junto a Dínamo también facilita un Impacto Sísmico sobre varios jugadores.'],
      ['Bruma', 'Puede presionar con el arma desde un ángulo lateral mientras Abrams intenta acercarse al frente.', 'Corta la línea de tiro cuando Abrams mire hacia ti y vuelve a disparar cuando se comprometa con otro objetivo. Usa la daga para ganar una ventana de distancia.', 'No conviertas el daño a distancia en un duelo de golpes junto a una pared.']
    ],
    shopping: [
      ['Línea','Melee Lifesteal','Te recupera al conectar el ataque cuerpo a cuerpo que activa su efecto.','Tiene recarga; no te cura por cada golpe ni vuelve seguro un golpe pesado previsible.'],
      ['Línea','Spirit Strike','Añade presión espiritual al golpe sobre un héroe y reduce su resistencia espiritual.','Acompáñalo con el daño de tus habilidades; no aumenta automáticamente todo el daño de la escopeta.'],
      ['Línea difícil','Extra Stamina','Permite corregir el ángulo de aproximación y conservar un impulso para salir.','No gastes las cargas adicionales solo para entrar más lejos de tus compañeros.'],
      ['Pelea intermedia','Healing Booster','Refuerza un plan que consigue aprovechar recuperación durante el combate.','Si mueres durante el control inicial, necesitas sobrevivir a esa ventana antes de buscar más curación.'],
      ['Contra control','Reactive Barrier','Añade una barrera cuando sufres los controles que activan su efecto.','No cancela el aturdimiento ni te devuelve la capacidad de actuar inmediatamente.'],
      ['Contra disparos','Bullet Resilience','Te da margen ante el daño balístico concentrado.','No sustituye la resistencia espiritual frente a habilidades que te están expulsando.'],
      ['Contra habilidades','Spirit Resilience','Ayuda a sostener una entrada ante daño espiritual.','No es una respuesta al daño de arma de todo el equipo enemigo.'],
      ['Pelea decisiva','Unstoppable','Permite preparar una entrada protegida contra varios efectos negativos.','Actívalo antes del control: no se puede usar si ya estás aturdido o dormido.']
    ],
    buildSections: [
      ['Cuándo cambiar la primera compra', 'Contra una línea que te dispara desde lejos, empezar por recuperación o aguante puede darte más oleadas jugables que adelantar daño de un golpe que no llegas a conectar. Si el rival te permite pelear junto a cobertura, el robo de vida cuerpo a cuerpo gana sentido. Cambia el primer paso según el intercambio que realmente puedas tomar.'],
      ['Qué vender y qué conservar', 'No vendas una compra de recuperación solo porque ha empezado una pelea grande. Comprueba si necesitas ese espacio para una respuesta que vas a usar inmediatamente y cuánto cuesta completar el cambio. Una pieza pequeña que sigue permitiendo volver a la línea puede tener más utilidad que una ranura libre mientras ahorras.']
    ],
    faq: [
      ['¿Debo lanzar siempre un golpe pesado después de la embestida?', 'Busca primero si hubo choque contra pared y si el rival seguirá controlado al terminar tu animación. Si puede responder, alterna disparos, un golpe ligero o reposicionamiento. Repetir el golpe pesado sin comprobar esa ventana facilita el contrataque.'],
      ['¿Cuándo uso Impacto Sísmico para escapar?', 'Cuando permanecer en el contacto te deja sin ayuda o sin cobertura. Salvar la posición y volver con el equipo puede permitir otra entrada. No necesitas transformar cada definitiva en una iniciación ofensiva.'],
      ['¿Piel de Metal me protege de los golpes de Abrams?', 'Su efecto protege frente a balas. No la elijas como si negara automáticamente el daño cuerpo a cuerpo o las habilidades espirituales de Abrams. Identifica qué parte de su secuencia te está eliminando.']
    ]
  },
  dynamo: {
    abilities: [
      'Pulsación Cinética recorre el suelo y levanta a los enemigos alcanzados. Úsala para preparar un ángulo de disparo, cortar una aproximación o permitir que un aliado recupere espacio. Si la lanzas antes de que el perseguidor se comprometa, puede esperar a que pase y continuar por otra ruta.',
      'Entrelazamiento Cuántico te vuelve brevemente no seleccionable mientras cambias de posición y puede llevar aliados cercanos. Comprueba quién está dentro antes de usarlo. Transportar a un compañero cambia su ángulo también: la salida debe ayudarle a sobrevivir o a continuar el combate, no sacarlo de su acción más útil.',
      'Aurora Rejuvenecedora recupera salud de quienes permanecen cerca. Acompaña la dirección de retirada o la esquina que tu equipo quiere sostener. No te coloques delante de todo el daño solo para meter a un aliado en el radio; una posición desde la que puedas seguir vivo permite mantener más ayuda.',
      'Singularidad combina atracción y control en una zona cercana. Elige un objetivo al que pueda llegar el daño aliado y presta atención al rival que todavía puede intervenir desde fuera. Capturar a dos enemigos visibles con apoyo suele ser preferible a entrar solo buscando una captura de seis.'
    ],
    sections: [
      ['Cómo encadenar control, disparos y retirada', 'Desde cobertura, utiliza la pulsación para crear una ventana y añade disparos mientras el objetivo está expuesto. Conserva Entrelazamiento si la respuesta rival puede aislarte. Si tu compañero tiene que salir, acompaña su trayectoria con recuperación y guarda la siguiente herramienta para el enemigo que lo persigue.', 'Si consigues acercarte para Singularidad, comunica el objetivo con un ping antes de comprometerte. Mira el mapa: un compañero limpiando otra línea no está listo para seguirte aunque figure cerca en la clasificación. Después de la captura, recupera una esquina para volver a aportar recuperación o control normal.'],
      ['Puntos de habilidad según tu tarea', 'Cuando la línea se decide en intercambios cortos, mejorar la pulsación refuerza una herramienta que puedes usar con frecuencia. Si la presión mantiene a dos aliados retrocediendo, valora la ayuda de recuperación que puedes sostener. No reserves todos los puntos para una secuencia de definitiva si aún no tienes una forma segura de llegar.', 'Reparte puntos pensando en la habilidad que vas a utilizar antes del siguiente objetivo. La frecuencia solo aporta si sobrevives para volver a actuar; si te eliminan durante la primera entrada, ajusta la posición y la protección antes de insistir en más recarga.'],
      ['Dos maneras de jugar la media partida', 'Puedes acompañar al aliado que toma espacio y guardar la salida para él, o colocarte en un lateral corto desde el que amenazar una captura. Elige según quién de vuestro equipo está preparado para entrar. Si nadie puede seguir tu lateral, vuelve a una posición que permita defender y recupera presión con la pulsación.']
    ],
    matchups: [
      ['Mo y Krill', 'Combo ofrece una respuesta de control sobre un objetivo al que puedas acercarte, pero necesita que Dínamo ya se haya expuesto.', 'Conserva la respuesta para la entrada y asegura una línea de visión de tu equipo sobre la pelea.', 'No cuentes con atravesar toda la zona de Singularidad después de que haya atrapado también a tu personaje.'],
      ['Bruma', 'Puede abrir presión desde un segundo ángulo y obligar a Dínamo a elegir entre acercarse o proteger al frente.', 'Espera a que se comprometa y juega fuera de la misma agrupación que tus compañeros.', 'Daga Adormecedora no interrumpe canalizaciones. No la guardes como si fuera una solución a Singularidad.'],
      ['Bebop', 'La amenaza del brazo obliga a Dínamo a respetar el espacio abierto antes de que pueda colocarse para una captura.', 'Busca el ángulo desde otra cobertura y no dejes al equipo alineado detrás del objetivo al que quieres atraer.', 'Si el rival conserva su desplazamiento, el primer contacto no garantiza que termine junto a tu equipo.']
    ],
    shopping: [
      ['Línea','Extra Stamina','Ajusta la distancia de la pulsación y ayuda a salir de una presión corta.','Más aguante no convierte en buena una aproximación sin cobertura.'],
      ['Recuperación','Healing Rite','Permite recuperar a un aliado o a ti mismo entre intercambios.','El daño de jugadores u objetivos cancela el efecto; busca un lugar protegido.'],
      ['Control de zona','Mystic Expansion','Amplía alcance y radio de una habilidad imbuida.','Comprueba qué habilidad estás imbuyendo antes de salir de la tienda.'],
      ['Disponibilidad','Compress Cooldown','Imbuye una habilidad para reducir su recarga; la pulsación es una opción si la usas en cada intercambio.','No reduce todo el kit. Comprueba qué habilidad has seleccionado.'],
      ['Apoyo','Healing Booster','Aumenta el valor de la recuperación que consigues aplicar.','Si los aliados quedan fuera del radio, el objeto no arregla esa distancia.'],
      ['Reposicionamiento','Warp Stone','Abre una llegada corta o una salida cuando conoces el destino.','No entres fuera de la visión de los compañeros que deben seguir tu control.'],
      ['Supervivencia','Reactive Barrier','Aporta barrera al recibir uno de los controles que la activan.','No evita ni elimina el control recibido.'],
      ['Definitiva preparada','Unstoppable','Protege la preparación frente a varios efectos de control si lo usas a tiempo.','No puedes activarlo ya aturdido o dormido; tampoco sustituye el apoyo aliado.']
    ],
    buildSections: [
      ['No compres toda la partida para Singularidad', 'Si vuestra presión depende de recuperarse entre escaramuzas, una compra de apoyo o disponibilidad puede aportar antes que ahorrar exclusivamente para una entrada cara. Si ya habéis preparado una captura con seguimiento, entonces una compra de llegada o protección puede completar esa jugada. Cambia el gasto con la tarea del equipo.'],
      ['Prueba el radio y el destino antes de la pelea', 'Después de comprar una expansión, identifica qué habilidad recibió la mejora. Después de comprar un desplazamiento, practica desde dónde puedes llegar a una esquina útil. Usar por primera vez el objeto durante una pelea decisiva puede colocarte justo fuera del alcance que necesitabas.']
    ],
    faq: [
      ['¿Tengo que esperar a atrapar a todo el equipo?', 'No. Una captura sobre un objetivo importante que tus aliados puedan alcanzar puede dar una pelea favorable. Esperar una agrupación perfecta puede hacerte perder una oportunidad accesible.'],
      ['¿La daga de Bruma corta Singularidad?', 'Daga Adormecedora no interrumpe las canalizaciones enemigas. Para responder a Singularidad necesitas otra herramienta adecuada o evitar su zona y el seguimiento rival.'],
      ['¿Cuándo priorizo curación sobre una entrada?', 'Cuando tu equipo está intentando conservar una posición y todavía no puede seguirte. Ayudar a recuperar recursos puede preparar una entrada conjunta; separarte en ese momento puede dejar sin ayuda a quienes debían acompañarla.']
    ]
  },
  haze: {
    abilities: [
      'Daga Adormecedora prepara un intervalo para recolocarte o acercarte a un objetivo. El daño puede despertar al enemigo, así que decide antes si la quieres para salir, apuntar un intercambio o coordinar una continuación. No la uses como interrupción de canalizaciones: ese efecto no forma parte de la habilidad.',
      'Bomba de Humo permite cambiar la aproximación, pero los enemigos cercanos pueden verte. Usa calles y coberturas para alcanzar otro ángulo sin cruzar junto al rival que guarda control. Lanzar la daga no rompe la invisibilidad; atacar con el arma sí la termina.',
      'Obsesión recompensa mantener impactos sobre el mismo objetivo. En vez de repartir cada ráfaga entre varios enemigos, elige a quién puedes seguir viendo sin abandonar la cobertura. Si el blanco deja de ser accesible, conserva la posición antes de perseguir sus acumulaciones hasta otra esquina.',
      'Baile de Balas necesita una entrada en la que puedas permanecer disparando. Localiza al enemigo con una respuesta de control y observa si ya la ha gastado. Si un rival activa protección frente a balas, no des por hecho que seguir la misma secuencia producirá el mismo daño.'
    ],
    sections: [
      ['La secuencia empieza antes de hacerte invisible', 'Mira primero quién puede detenerte y desde qué lado entrarás. Busca una ruta que te deje junto a una cobertura y al alcance de un objetivo expuesto. Puedes abrir un intercambio con disparos normales y reservar la definitiva para cuando el enemigo ya haya usado una respuesta contra el frente.', 'Si la primera entrada no consigue espacio, corta el contacto antes de gastar todas las herramientas detrás del objetivo. Recupera una oleada o una cobertura cercana y vuelve a mirar los ángulos. La invisibilidad sirve para cambiar lo que ve el rival; no borra el daño que ya te está alcanzando.'],
      ['Cómo convertir el farmeo en una pelea útil', 'Antes de empezar otro recurso, comprueba si tus compañeros van a disputar una estructura. Llegar después de que hayan muerto puede dejarte con más economía y sin la pelea donde necesitabas usarla. Acerca tu ruta de recursos al lugar donde podrás acompañar la siguiente presión.', 'Con ventaja, intenta que el rival tenga que responder a una oleada mientras tú amenazas un lateral próximo. Mantener un objetivo bajo fuego desde dos ángulos puede producir una oportunidad sin depender de aparecer en medio del equipo enemigo con Baile de Balas.'],
      ['Puntos de habilidad y un objetivo reconocible', 'Si puedes sostener disparos durante la línea, reforzar Obsesión acompaña ese patrón. Si tu problema consiste en llegar o salir, revisa el uso de humo y daga antes de subir daño esperando que cambie el recorrido. Elige una mejora que puedas utilizar en la siguiente acción, no una secuencia que exige recursos que todavía no tienes.']
    ],
    matchups: [
      ['Mo y Krill', 'El desarme puede negar una ventana de arma y Combo ofrece control sobre un objetivo cercano.', 'Guarda una herramienta para la entrada de Bruma y coloca al resto del equipo donde pueda contestar sin quedar agrupado en su definitiva.', 'Si Combo se gasta antes contra otro enemigo, ya no es la respuesta que tus aliados estaban esperando.'],
      ['Kelvin', 'El rayo reduce progresivamente la cadencia y el movimiento del objetivo que consigue mantener delante.', 'Mantén cobertura y evita que Bruma entre desde un lateral sin que puedas orientar la respuesta. Separa el ángulo del frente del de la retaguardia.', 'Perseguir a Bruma por un espacio abierto puede cortar tu propia cobertura y exponerte al resto del equipo.'],
      ['Dínamo', 'Puede negar una aproximación cercana con control y cambiar la posición de un compañero amenazado.', 'Conserva pulsación o desplazamiento para la entrada que de verdad obliga al aliado a retirarse.', 'No gastes todo por una ráfaga de tanteo y después permanezcas agrupado esperando Baile de Balas.']
    ],
    shopping: [
      ['Línea','Extended Magazine','Amplía el cargador para mantener una secuencia de impactos.','No arregla un duelo donde el enemigo corta tu ángulo antes de gastar la munición.'],
      ['Movimiento','Extra Stamina','Permite conservar un impulso después de asomarte.','No gastes todas las cargas persiguiendo a un objetivo que ya recibe ayuda.'],
      ['Daño sostenido','Swift Striker','Refuerza un plan que consigue disparar durante el intercambio.','Si mueres bajo control antes de atacar, adelanta supervivencia.'],
      ['Continuación','Kinetic Dash','Tras un impulso con salto, añade cadencia y munición temporal.','Practica el recorrido; el bonus no justifica saltar a una posición sin salida.'],
      ['Ventana de daño','Burst Fire','Un impacto de bala sobre un héroe activa cadencia y movimiento breves.','Busca aprovechar esa ventana desde un ángulo mantenible.'],
      ['Mantener distancia','Fleetfoot','Ayuda a moverte mientras disparas y aporta un activo de movimiento.','No te hace inmune a las respuestas de control.'],
      ['Pelea larga','Escalating Resilience','Gana resistencia balística al conectar balas contra héroes.','La resistencia crece durante los impactos; no la trates como protección completa al entrar.'],
      ['Distribuir presión','Ricochet','Hace rebotar balas hacia enemigos próximos al objetivo.','No ahorres para él mientras una compra defensiva pequeña decidiría si puedes participar.'],
      ['Contra control','Unstoppable','Permite proteger una entrada preparada contra varios efectos negativos.','No lo puedes usar si ya estás aturdido o dormido.']
    ],
    buildSections: [
      ['Una ruta de arma y sus desvíos', 'Empieza por resolver cargador y acceso al intercambio. Cuando ya consigues disparar, añade una pieza que refuerce la ventana de daño y otra que te permita mantener la posición. Si la pelea cambia y el rival guarda control para ti, adelanta la protección necesaria antes de continuar hacia objetos caros de daño.'],
      ['Cómo jugar alrededor de Piel de Metal', 'Si el objetivo activa inmunidad a balas, cambia tu prioridad: corta el intercambio, amenaza a otro rival accesible o espera su final desde cobertura. Gastar toda la secuencia sobre esa protección puede darte tiempo de disparo sin producir el resultado que esperabas. Cuenta también qué respuestas conservan los demás enemigos.']
    ],
    faq: [
      ['¿Cuándo puedo dejar de farmear para entrar?', 'Cuando puedes llegar a una acción donde tu daño sea aplicable y tus compañeros todavía conserven recursos. La decisión depende del objetivo y del tiempo de llegada, no de una cantidad única de almas para todas las partidas.'],
      ['¿Rebote es obligatorio antes de pelear?', 'No. Es una compra cara que amplía la presión, pero puedes participar antes con un objetivo claro y una posición segura. Si el equipo va a defender ahora, esperar a completarlo puede hacerte perder esa ventana.'],
      ['¿Qué protege frente a Baile de Balas?', 'Piel de Metal protege frente a las balas mientras dura su activo. Combínala con una salida o con la respuesta del equipo. No extiendas esa protección al daño espiritual que pueden aportar Bruma y sus compañeros.']
    ]
  },
  infernus: {
    abilities: [
      'Napalm prepara un objetivo con daño, ralentización y una vulnerabilidad que puedes aprovechar con la continuación. Úsalo cuando puedas mantener un ángulo de disparo o cuando un aliado esté listo para atacar. Lanzarlo sobre un enemigo que va a abandonar tu visión puede dejar la parte importante del intercambio sin aplicación.',
      'Impulso Llameante permite recorrer espacio dejando una zona de daño. Elige si lo necesitas para llegar, atravesar una pelea o retirarte. Una línea de fuego bajo los enemigos puede dar presión, pero no conviene terminar el recorrido detrás de todos ellos sin aguante ni apoyo.',
      'Poscombustión se acumula con impactos del arma y sostiene daño espiritual después. Las habilidades ayudan a mantener el efecto y las balas prolongan la quemadura. Prioriza una secuencia de impactos que puedas repetir; ir cambiando de blanco antes de aplicar presión puede diluir el resultado.',
      'Combustión Conmocionadora detona después de un retraso y, una vez lanzada, no se puede interrumpir. Anticipa dónde estará el rival cuando ocurra la explosión. No necesitas recorrer la máxima distancia: ocupar el acceso que el enemigo quiere utilizar puede obligarlo a cambiar su pelea.'
    ],
    sections: [
      ['Presiona primero, persigue después', 'Empieza con un ángulo desde el que puedas mantener impactos y aplicar la quemadura. Si el rival utiliza su salida, observa dónde queda antes de gastar tu movilidad. Cuando desaparece detrás de una cobertura con ayuda posible, conserva la presión de la oleada en vez de convertir el intercambio en una persecución sin visión.', 'En la pelea de equipo, combina la amenaza de detonación con una ruta de salida. Si otro aliado ya ha iniciado, puedes acercarte al espacio que el rival necesita usar para retirarse. Si eres tú quien va delante, comprueba que el equipo pueda llegar antes de activar una secuencia que te compromete.'],
      ['Decide qué parte de tu daño vas a reforzar', 'Tus disparos ayudan a aplicar un efecto espiritual. Comprar solo según el aspecto del arma puede dejar sin atender la fuente de daño que estás pudiendo sostener. Mira si el rival te corta los impactos, si aguanta la quemadura o si te elimina antes de completarla: son tres problemas distintos.', 'Cuando has perdido la posibilidad de disparar con seguridad, una nueva mejora de daño no sustituye el ángulo. Usa una cobertura lateral y vuelve a entrar cuando el equipo haya forzado una respuesta. La continuidad de la presión se construye sobreviviendo a más de un contacto.'],
      ['Mejoras de habilidad para tu siguiente acción', 'Si la línea te permite aplicar la quemadura, reforzar esa parte del kit acompaña el intercambio que ya estás ganando. Si vas a disputar zonas estrechas, piensa en la herramienta que ayuda a ocuparlas. No gastes puntos imaginando una entrada larga cuando la pelea real se está jugando desde dos esquinas próximas.']
    ],
    matchups: [
      ['Kelvin', 'La ralentización sostenida y los cambios de espacio pueden dificultar que Infernus mantenga una persecución cómoda.', 'Frena la trayectoria de llegada desde una cobertura y conserva una ruta lateral para la detonación.', 'El rayo no elimina la necesidad de salir del radio de la definitiva.'],
      ['Mo y Krill', 'El desarme puede cortar la aplicación con arma y el control cercano puede permitir que el equipo se reposicione.', 'Usa la respuesta cuando el rival se haya comprometido y alguien pueda aprovecharla.', 'Combustión Conmocionadora ya lanzada no se interrumpe; no te quedes dentro de su detonación suponiendo que el control la cancela.'],
      ['Dínamo', 'Puede cambiar de posición con un aliado amenazado y usar control para cortar la continuación del intercambio.', 'Reserva la herramienta de salida para la aproximación que realmente os encierra.', 'Si la gastas solo para ganar una pequeña distancia ofensiva, puede faltar cuando llegue la detonación.']
    ],
    shopping: [
      ['Línea','Extended Magazine','Facilita mantener impactos antes de recargar.','No abandones la cobertura para agotar el cargador sobre un blanco inaccesible.'],
      ['Aplicación','Swift Striker','Refuerza la frecuencia del disparo con el que preparas la quemadura.','La cadencia no sirve si el enemigo te obliga a dejar de atacar inmediatamente.'],
      ['Recuperación','Spirit Lifesteal','Acompaña el daño espiritual que consigues mantener.','La reducción de curación y el daño concentrado siguen siendo amenazas.'],
      ['Contra recuperación','Healbane','Tu daño espiritual aplica reducción de curación entrante al rival.','Comprueba que estás aplicando daño espiritual al objetivo que quieres debilitar.'],
      ['Presión intermedia','Bullet Resist Shredder','El daño espiritual reduce la resistencia a balas del objetivo para la continuación.','No confundas el tipo de daño que activa el efecto con el tipo de resistencia que reduce.'],
      ['Contra disparos','Bullet Resilience','Ayuda a sostener un intercambio ante daño balístico.','No es una respuesta universal a habilidades espirituales.'],
      ['Contra habilidades','Spirit Resilience','Aporta resistencia ante daño espiritual que amenaza tu acercamiento.','Elige según el registro de daño, no solo según el nombre del enemigo.'],
      ['Partida avanzada','Spiritual Overflow','Los disparos sobre héroes cargan una mejora de cadencia, espíritu y robo de vida espiritual.','Necesitas poder sostener esos impactos para activar el plan.'],
      ['Contra anticuración','Leech','Refuerza un plan de robo de vida y reduce el efecto de la reducción de curación rival.','No elimina toda la anticuración ni resuelve una entrada sin salida.']
    ],
    buildSections: [
      ['Robo de vida o resistencia primero', 'Si puedes seguir aplicando daño pero pierdes por desgaste, el robo de vida puede ayudar a prolongar la presión. Si mueres dentro de un control antes de volver a atacar, una compra de resistencia o una mejor aproximación tiene prioridad. La curación depende de que llegues a producir el daño que la alimenta.'],
      ['No confundas quemadura con una baja asegurada', 'Un objetivo que se retira puede recibir ayuda o dejar de ser accesible. Antes de perseguirlo, compara la ventaja de mantener la oleada y comprar con el riesgo de cruzar una zona sin información. La build debe permitirte participar en la siguiente acción, no obligarte a justificar una persecución anterior.']
    ],
    faq: [
      ['¿Aturdir a Infernus cancela su explosión?', 'No si ya ha lanzado Combustión Conmocionadora. Usa el tiempo previo a la detonación para cambiar de posición; un control puede frenar su continuación sin eliminar esa amenaza.'],
      ['¿Compro resistencia balística o espiritual contra él?', 'Sus disparos y sus efectos no son la misma fuente de daño. Mira qué te alcanza en la secuencia que estás perdiendo y qué aportan sus compañeros. No asumas un solo tipo por el aspecto de su arma.'],
      ['¿Cuándo me interesa Maleficio Anticuración?', 'Cuando necesitas reducir la recuperación de un enemigo al que puedas aplicar daño espiritual. Adelantarlo tiene sentido si esa curación está negando vuestra presión; no es una compra automática contra cualquier composición.']
    ]
  },
  lash: {
    abilities: [
      'Ataque Terrestre convierte una caída en daño sobre el espacio que tienes delante. La altura ayuda, pero el crecimiento del daño se reduce a partir de cierta distancia. Elige antes dónde quieres aterrizar; una caída más alta no compensa terminar donde nadie puede ayudarte.',
      'Pértiga te desplaza por el aire hacia un objetivo y restablece el límite de saltos e impulsos aéreos. Úsala pensando en la siguiente corrección del recorrido. Si la gastas para alcanzar a un enemigo lejano, identifica qué objetivo o cobertura quedará después como salida.',
      'Azotar produce daño frontal y recuperación. Orienta el cono antes de usarlo para golpear a los enemigos que puedes mantener delante. No necesitas perseguir siempre al blanco de menor salud: recuperar recursos golpeando una zona accesible puede permitir otra entrada más segura.',
      'Trompazo Mortal necesita mantener las condiciones de visión y alcance mientras conectas a los enemigos. Decide dónde los vas a lanzar y quién puede hacer daño allí. Si los alejas del frente aliado o los colocas detrás de una protección, puedes regalarles la retirada.'
    ],
    sections: [
      ['Prepara una caída que tu equipo pueda utilizar', 'Elige un acceso alto próximo a la pelea y observa hacia dónde mira el enemigo. Puedes entrar cuando un aliado ya le obliga a responder desde el frente. Después de Ataque Terrestre, orienta Azotar para recuperar recursos y busca el siguiente destino antes de volver a elevarte.', 'Si tus compañeros están retrocediendo, caer sobre el perseguidor puede ser más útil que intentar una entrada al fondo. En cambio, si el rival acaba de gastar sus salidas y tu equipo tiene un ángulo claro, la misma movilidad te permite cerrar distancia y preparar un lanzamiento hacia vuestro daño.'],
      ['Cómo repartir tus mejoras', 'Mejorar Ataque Terrestre acompaña un plan de impactos desde altura; reforzar Azotar favorece secuencias en las que necesitas volver a sostenerte después de caer. Elige según qué parte del recorrido estás pudiendo completar. No construyas todo alrededor de un salto que el rival ya está anticipando.', 'Cuando tu aportación depende de recolocarte, conservar la movilidad importa más que encadenar todas las habilidades al primer contacto. Usa los puntos para reforzar la acción disponible en la siguiente disputa, manteniendo una salida que no dependa de que el enemigo falle.'],
      ['La decisión después de un lanzamiento', 'Mira si el objetivo aterrizó donde esperabas y si tus aliados conservan daño. Si la captura solo ha forzado respuestas, recupera una posición segura y prepara una segunda entrada. Perseguir inmediatamente al mismo enemigo puede separarte del equipo justo cuando este ya ganó el espacio necesario para el objetivo.']
    ],
    matchups: [
      ['Guardia', 'Su amenaza de inmovilización obliga a Lash a elegir pronto un destino y puede complicar una llegada previsible.', 'Aplica presión sobre la zona donde Lash terminará el recorrido y conserva una cobertura propia.', 'La inmovilización exige que el rival no salga de la zona a tiempo; no es un aturdimiento inmediato garantizado.'],
      ['Mo y Krill', 'El control sobre un objetivo cercano puede castigar a Lash después de que se comprometa con la caída.', 'Busca la ventana tras el aterrizaje y asegúrate de que tus aliados ven a quién estás sujetando.', 'Acercarte solo mientras Lash conserva todas sus opciones aéreas puede dejarte persiguiendo sin resultado.'],
      ['Kelvin', 'El rayo y la presión de área pueden dificultar una continuación cómoda después del impacto.', 'Juega desde otro ángulo y acompaña la retirada del aliado sobre el que Lash está entrando.', 'No corras con todo el equipo hacia una misma zona de aterrizaje.']
    ],
    shopping: [
      ['Línea','Mystic Burst','Carga un daño adicional que se activa con habilidades que hacen más de 80 de daño.','Debe estar cargado y superar el umbral; no añade daño a cualquier roce.'],
      ['Movimiento','Extra Stamina','Aporta una corrección más a tu trayectoria.','Decide dónde usarla antes de comprometer todas las cargas.'],
      ['Zona de impacto','Mystic Expansion','Amplía alcance y radio de la habilidad que imbuyas.','Comprueba la selección; no mejora todo el kit a la vez.'],
      ['Repetir entradas','Compress Cooldown','Imbuye la habilidad que necesitas recuperar antes para repetir la entrada.','No reduce todas las recargas ni ayuda si no sobrevives al primer aterrizaje.'],
      ['Recorrido avanzado','Stamina Mastery','Refuerza la disponibilidad de opciones de movimiento.','La ruta debe seguir terminando cerca del equipo.'],
      ['Impacto intermedio','Tankbuster','Carga daño espiritual adicional para habilidades que hacen más de 165 de daño; el efecto ignora resistencia espiritual.','Necesita estar cargado y un impacto que supere el umbral.'],
      ['Frecuencia','Superior Cooldown','Reduce los tiempos de espera de tus habilidades.','Compara si necesitas frecuencia o supervivencia antes de comprar.'],
      ['Pelea decisiva','Unstoppable','Ayuda a proteger una aproximación preparada frente a varios controles.','No puedes activarlo ya aturdido o dormido.']
    ],
    buildSections: [
      ['Combina radio, daño y supervivencia', 'Empieza por hacer que tu caída alcance el lugar que has elegido. Cuando el recorrido ya funciona, añade una compra que aumente el valor del impacto. Si el equipo rival guarda el control para el aterrizaje, adelanta protección o cambia el momento de llegada: añadir más daño no elimina esa respuesta.'],
      ['Hechizo Ralentizante y Derribo no hacen lo mismo', 'Hechizo Ralentizante limita habilidades y objetos de movimiento, pero no elimina el uso normal de aguante. Derribo aplica el aturdimiento después de un retraso. Si juegas contra esas respuestas, mira cuándo se han activado y qué parte de tu recorrido todavía puedes usar, en vez de asumir que toda la movilidad ha desaparecido.']
    ],
    faq: [
      ['¿Cuanto más alto salte, mejor?', 'La altura puede reforzar Ataque Terrestre, pero el crecimiento del daño pierde fuerza a gran distancia. Aterrizar con apoyo y salida suele aportar más que buscar altura adicional mientras la pelea se aleja.'],
      ['¿Dónde debo lanzar al enemigo con la definitiva?', 'A una zona donde tus compañeros puedan aplicar daño sin exponerse a toda la respuesta rival. Mira la cobertura de la llegada; el recorrido más largo no siempre es el más útil.'],
      ['¿Hechizo Ralentizante elimina mis impulsos normales?', 'No impide usar el aguante. Su efecto sobre herramientas de movimiento sigue siendo peligroso, pero conserva la diferencia entre las habilidades afectadas y las opciones básicas que aún tienes disponibles.']
    ]
  },
  seven: {
    abilities: [
      'Esfera Eléctrica ocupa un recorrido y hace daño dentro de su radio. Apúntala por el espacio donde el rival necesita permanecer para disputar la oleada. Una esfera lanzada hacia un objetivo que ya abandona la zona puede producir menos presión que otra que le obliga a ceder recursos.',
      'Carga Estática prepara un aturdimiento tras un retraso. Sigue la trayectoria del objetivo sin colocarte junto a él sin necesidad. Si juegas contra la carga, evita llevar su resolución hasta compañeros que podían permanecer fuera del radio.',
      'Sobretensión potencia disparos con daño eléctrico que puede saltar a enemigos próximos. Necesitas mantener un ángulo de arma para aprovechar la ventana. Activarla antes de cruzar una cobertura larga puede consumir parte del efecto sin que llegues a disparar.',
      'Nube de Tormenta expande una zona de daño durante la canalización y necesita línea de visión. Busca una posición desde la que puedas amenazar el objetivo y mantener protección frente a los enemigos que aún pueden responder. Una pared útil para cubrirte también puede bloquear el daño que esperabas aplicar.'
    ],
    sections: [
      ['Una pelea no empieza siempre con la definitiva', 'Prepara la zona con la esfera y utiliza la carga sobre un objetivo que tu equipo pueda seguir presionando. Mantén disparos durante Sobretensión cuando tengas una línea estable. Si la pelea se mueve, recupera el ángulo antes de activar otra herramienta: gastar el kit en un lugar que el enemigo ya abandonó deja libre la nueva posición.', 'Reserva Nube de Tormenta para una zona que el rival necesite disputar. Si puede cubrirse sin perder nada, puede esperar a que termine. La presión de tus compañeros desde un segundo lado ayuda a convertir esa elección en un problema real para él.'],
      ['Limpia recursos cerca de la siguiente acción', 'Después de limpiar una oleada, mira qué estructura o acceso va a necesitar ayuda. Encadenar un recurso lejano cuando el equipo ya se aproxima a una pelea puede dejar tus habilidades fuera de la disputa. Elige una ruta que te permita llegar con tiempo para colocar la primera esfera.', 'Si el equipo necesita recuperar economía, una limpieza rápida puede sostener la defensa y abrir espacio para comprar. No la conviertas en una obligación de continuar recolectando: el valor está en la posición y el tiempo que libera.'],
      ['Puntos de habilidad: área o disparos', 'Cuando el rival disputa pasillos y se agrupa cerca de las oleadas, reforzar las herramientas de área puede acompañar tu plan. Si tus intercambios se deciden manteniendo el arma sobre un objetivo, revisa la mejora de Sobretensión que vas a aprovechar. La elección debe corresponder a la secuencia que realmente puedes ejecutar.']
    ],
    matchups: [
      ['Dínamo', 'Una entrada cercana con control puede contestar una posición de canalización expuesta.', 'Acércate desde cobertura y con apoyo antes de que el equipo quede obligado a atravesar toda la zona.', 'No supongas que puedes cruzar daño sin recursos solo porque dispones de una definitiva de control.'],
      ['Mo y Krill', 'Combo puede sujetar a un objetivo cercano y crear una ventana para que el resto responda.', 'Prepara la distancia durante la colocación de Siete y mantén una salida si su equipo protege el acceso.', 'Una herramienta de corto alcance no resuelve una canalización situada detrás de todos sus aliados.'],
      ['Bruma', 'Puede abrir un ángulo distinto y castigar a Siete cuando ya se haya comprometido con la posición.', 'Espera la ventana en que no pueda reorientarse cómodamente y conserva una cobertura para cortar el daño.', 'La daga no corta canalizaciones. No la confundas con el control que necesita tu equipo para disputar dentro de la tormenta.']
    ],
    shopping: [
      ['Línea','Extra Charge','Aumenta las opciones de una habilidad con cargas.','Comprueba qué parte del kit utiliza cargas; no concede usos extra a cualquier habilidad.'],
      ['Primer impacto','Mystic Burst','Carga daño adicional para una habilidad que haga más de 80 de daño.','Necesita estar cargado; no se aplica a cada pequeña instancia de daño periódico.'],
      ['Control de área','Mystic Expansion','Amplía la habilidad imbuida para cubrir el paso que quieres disputar.','El radio adicional sigue necesitando una posición útil.'],
      ['Frecuencia','Compress Cooldown','Imbuye una habilidad para reducir su recarga y repetir esa herramienta de presión.','No mejora todas las recargas. Elige el botón que realmente utilizas para disputar.'],
      ['Mantener al rival','Mystic Slow','Ayuda a frenar al objetivo cuando aplicas el tipo de daño que activa el efecto.','No reemplaza el control inmediato si el equipo necesita una interrupción.'],
      ['Contra recuperación','Healbane','Tu daño espiritual reduce la curación entrante del rival.','Aplícalo sobre el objetivo al que de verdad está ayudando la recuperación enemiga.'],
      ['Resistencia','Spirit Resilience','Da margen ante habilidades espirituales que alcanzan tu posición.','Elige otra respuesta si lo que te elimina son disparos o un control sin seguimiento propio.'],
      ['Disponibilidad avanzada','Superior Cooldown','Refuerza un plan de presión repetida con habilidades.','Si pierdes la primera canalización, compara antes protección y posición.']
    ],
    buildSections: [
      ['Comprar para la esfera o para el arma', 'Una ruta orientada a ocupar zonas necesita que el enemigo tenga motivos para quedarse en ellas. Una ruta que refuerza disparos exige que puedas mantener el objetivo delante. Antes de mezclar compras, identifica cuál de las dos situaciones estás encontrando en las peleas por estructuras.', 'Si el rival se cubre de tu definitiva, una compra cara de daño adicional no elimina la pared. Coordina otra amenaza que pueda obligarle a salir o cambia el lugar de la canalización. La tienda debe reforzar una oportunidad, no sustituir la necesidad de crearla.'],
      ['Reserva una respuesta al control', 'Antes de una pelea decisiva, mira quién puede acercarse para interrumpirte y desde qué ruta. Una protección activada a tiempo o un cambio de esquina pueden dar más valor que una pequeña mejora de daño. Si ya has quedado aturdido, no cuentes con activar Imparable como si fuera una limpieza reactiva.']
    ],
    faq: [
      ['¿Puedo hacer daño con Nube de Tormenta detrás de una pared?', 'Los enemigos fuera de tu línea de visión no reciben su daño. Elige una cobertura que te proteja sin bloquear el acceso o el objetivo sobre el que quieres ejercer presión.'],
      ['¿Carga Estática aturde al lanzarla?', 'No: su resolución tiene un retraso. Tenlo en cuenta al coordinar la continuación y al decidir si todavía necesitas conservar otra respuesta más inmediata.'],
      ['¿Cuándo dejo una oleada para ir al objetivo?', 'Cuando puedes llegar antes de que tu equipo gaste sus recursos y ocupar un ángulo desde el que tus habilidades tengan valor. Mira el coste de abandonar la línea y el tiempo de llegada, no solo la rapidez con la que puedes limpiar otro recurso.']
    ]
  }
}
