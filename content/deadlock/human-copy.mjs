import {counterCopy} from './counter-copy.mjs'

// Exact passages reviewed in context. Keep ability identity, numeric values,
// item names, matchups and source records intact.
const passages = new Map([
 ['No regales un intercambio estático mientras Bruma mantiene el mismo blanco. Usa esquinas para cortar la secuencia y cambia la pelea de lugar. Si ya está cerca, correr por un pasillo abierto puede ser peor que alcanzar una cobertura lateral.', 'No te quedes quieto mientras Bruma te dispara. Busca una esquina y obliga a que cambie de posición para seguir acertándote. Si ya está cerca, una cobertura lateral puede protegerte mejor que correr por un pasillo abierto.'],
 ['La ruta refuerza el arma y la continuidad del duelo. Necesitas mantener al enemigo a tiro y conservar una salida; una compra de daño no resuelve por sí sola una entrada contra controles preparados.', 'Esta build mejora los disparos de Bruma. Para aprovecharla, mantén al enemigo a tiro y guarda una salida. Antes de usar la definitiva, mira quién puede detenerte: comprar más daño no evita un aturdimiento.'],
 ['Corta la continuidad de la quemadura', 'Corta los disparos que preparan la quemadura'],
 ['Las dagas ayudan a preparar esa continuidad. Si el objetivo desaparece, conserva parte del kit y recupera recursos. La compra no te obliga a completar un intercambio que el enemigo ya ha abandonado.', 'Usa las dagas para preparar los disparos. Si el enemigo se esconde, guarda parte de las habilidades y vuelve a farmear o recuperar vida. No tienes que perseguirlo solo porque hayas comprado más daño.'],
 ['Continuidad espiritual', 'Defensa frente al daño espiritual'],
 ['Haz daño para conseguir presión o una baja con continuidad. Un intercambio sin propósito que te deja a su alcance puede darle recursos sin mejorar tu posición.', 'Ataca cuando puedas obligarlo a retirarse o rematarlo con ayuda. Hacerle un poco de daño y quedarte a su lado puede darle tiempo para recuperarse sin que hayas ganado una posición mejor.'],
 ['Los cuchillos acumulan y renuevan el efecto con impactos adicionales. Usa cobertura para cortar la continuidad en vez de asomarte a la misma trayectoria una y otra vez. Si necesitas retirarte, avisa antes de quedarte sin vida ni movimiento.', 'Cada cuchillo que te acierta puede acumular y renovar el sangrado. Busca cobertura en vez de asomarte por el mismo sitio una y otra vez. Si tienes que retirarte, avisa antes de quedarte sin vida ni movimiento.'],
 ['El daño diferido exige continuidad de equipo, no persecución ciega', 'Seguid atacando juntos sin perseguirlo a ciegas'],
 ['El robo de esencia se acumula con continuidad. Si pierdes el ángulo o tu salud ya no permite responder, corta el contacto y recupera cobertura. Seguir mirando a Graves desde el mismo punto puede dar tiempo a su arma y a sus criaturas.', 'Graves acumula el robo de esencia si puede seguir atacándote. Si pierdes el ángulo o tienes poca vida, vuelve a cobertura. Quedarte delante de él le da más tiempo para usar el arma y las criaturas.'],
 ['Robo de Esencia: el contacto necesita continuidad', 'Robo de Esencia: sigue atacando al mismo enemigo'],
 ['Mantén continuidad para el robo de esencia.', 'Sigue atacando al mismo enemigo para acumular robo de esencia.'],
 ['No aceptes un intercambio estático bajo el rayo', 'No te quedes quieto bajo el rayo'],
 ['No asomes por turnos sin un plan común. Dar breves ventanas de daño a Bebop mientras todos gastan recursos para esconderse puede impedir la reentrada que necesitabais. Acordad quién puede presionar y quién conserva el control que aún sea aplicable.', 'No os asoméis de uno en uno contra Bebop. Si todos gastáis las habilidades para esconderos, después puede faltar una forma de volver a entrar. Acordad quién le dispara y quién guarda una habilidad capaz de detenerlo en ese momento.'],
 ['Necesita daño aplicable y tiempo para actuar. El foco enemigo y la anticuración pueden superar esa recuperación. Usa la compra para sostener un contacto útil, conservando cobertura y apoyo.', 'Necesitas seguir haciendo daño para aprovechar la recuperación. Si varios enemigos te atacan a la vez o te aplican anticuración, puede no bastar. Quédate cerca de una cobertura y de tus compañeros para poder seguir peleando.'],
 ['Comprueba la habilidad y el ángulo antes de asumir más daño aplicable.', 'Comprueba qué habilidad mejora y si puedes acertarla desde tu posición.'],
 ['El vínculo requiere visión y un alcance máximo. Una esquina cercana puede negar su continuidad sin que tengas que ganar el duelo de curación. Coordina el cambio de posición con el aliado que mantiene presión para que Geist no pueda seguir al mismo objetivo sin exponerse.', 'El vínculo necesita visión y tiene un alcance máximo. Una esquina puede cortarlo sin que tengas que ganar un duelo contra su curación. Muévete mientras un compañero la presiona para que no pueda seguirte sin quedar expuesta.'],
 ['Continuidad de disparo', 'Disparos a corta distancia'],
 ['La mirada necesita una continuidad que puedes disputar', 'Corta su visión para dificultar los dibujos'],
 ['Continuidad de disparos', 'Más cadencia de disparo'],
 ['Una carga de tinta debe tener una tarea', 'Para qué guardar una carga de tinta'],
 ['Rayo para dificultar la continuidad y granada para el compañero.', 'Rayo para dificultar sus disparos y granada para ayudar al compañero.'],
 ['Marca del Genio: dispara con continuidad, no sin pausa', 'Marca del Genio: acierta varios disparos sin perder la cobertura'],
 ['Cuando has perdido la posibilidad de disparar con seguridad, una nueva mejora de daño no sustituye el ángulo. Usa una cobertura lateral y vuelve a entrar cuando el equipo haya forzado una respuesta. La continuidad de la presión se construye sobreviviendo a más de un contacto.', 'Si no puedes disparar sin exponerte, comprar más daño no resuelve el problema. Busca una cobertura lateral y vuelve a atacar cuando tus compañeros hayan obligado al rival a gastar alguna habilidad. Sobrevivir te permite volver a pelear.'],
])

function rewrite(v) {
  if(typeof v==='string')return (passages.get(v)??v).replaceAll('mantener impactos','seguir acertando').replaceAll('Mantener impactos','Seguir acertando')
  if(Array.isArray(v))return v.map(rewrite)
  if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,value])=>[k,rewrite(value)]))
  return v
}

export function humanCopy(article) {
  const a=structuredClone(article)
  for(const key of ['title','description','intro','sections','checklist','faq','related'])if(a[key])a[key]=rewrite(a[key])
  if(a.kind==='counter'&&counterCopy[a.hero])[a.description,a.intro]=counterCopy[a.hero]
  if(a.hero==='haze'&&a.kind==='hero'){
    a.intro='Bruma hace más daño si aciertas varios disparos al mismo enemigo. Usa la invisibilidad para buscar otro ángulo y la daga para acercarte o escapar. Antes de entrar con Baile de Balas, comprueba quién puede detenerte y espera a que gaste esa habilidad.'
    a.sections[0].body=[
      'Daga Adormecedora duerme al enemigo y te da tiempo para recolocarte, acercarte o ayudar a un compañero a preparar el ataque. El daño puede despertarlo. No la uses para intentar cortar una canalización: la daga no la interrumpe.',
      'Bomba de Humo te ayuda a cambiar de ángulo, pero los enemigos cercanos pueden verte. Rodea por una calle o una cobertura en vez de pasar junto a quien guarda el control. Lanzar la daga no rompe la invisibilidad; disparar con el arma sí.',
      'Obsesión recompensa acertar varios disparos al mismo objetivo. Elige a alguien que puedas mantener a tiro sin salir de cobertura. Si se esconde, no lo persigas hasta otra esquina solo para conservar las acumulaciones.',
      'Baile de Balas necesita tiempo para hacer daño. Mira quién puede detenerte y si ya ha gastado el control. Si un rival activa una protección frente a balas, tenlo en cuenta antes de seguir disparando como si no la tuviera.',
    ]
    a.sections[1].body=['Asegura las almas de la oleada antes de perseguir al rival. Si gasta su movilidad para atacarte, comprueba si puedes responder desde cobertura. Disparar cada ráfaga a un enemigo distinto dificulta aprovechar Obsesión.']
    a.sections[2].body=['Busca un lateral con Bomba de Humo y espera a que tus compañeros obliguen al rival a gastar alguna habilidad de control. Después puedes entrar con Baile de Balas. No cruces junto a un enemigo que pueda detectarte de cerca.']
    a.sections[3].body=['Imagina que ves a un enemigo separado y a su compañero esperando con un aturdimiento. Si solo miras al primero, pueden pararte nada más entrar. Asómate desde otro ángulo y espera a ver si gastan esa habilidad antes de usar la definitiva.']
    a.sections[4].title='Elige por dónde entrar antes de hacerte invisible'
    a.sections[4].body=['Busca una ruta que te deje a tiro de un enemigo y cerca de una cobertura. Puedes empezar disparando y guardar la definitiva hasta que el rival gaste el control contra tus compañeros.', 'Si la entrada falla, retírate antes de gastar todas las habilidades persiguiendo. Vuelve a una cobertura o a la oleada y busca otro ángulo. Hacerte invisible no detiene el daño que ya te está alcanzando.']
    a.sections[5].title='Cuándo dejar de farmear para ayudar al equipo'
    a.sections[5].body=['Antes de empezar otro campamento, mira si tus compañeros van a atacar o defender una estructura. Si llegas después de que mueran, las almas que has ganado no les habrán servido. Intenta farmear cerca del lugar donde se preparan para pelear.', 'Si llevas ventaja, empuja una oleada y amenaza un lateral cercano. El rival tendrá que atender ambos sitios y puedes encontrar un buen ángulo sin aparecer en medio de todo el equipo enemigo.']
    a.sections[6].title='En qué habilidad gastar los puntos'
    a.sections[6].body=['Si estás acertando muchos disparos en línea, mejorar Obsesión te ayuda a aprovecharlos. Si no consigues acercarte o escapar, revisa antes cómo usas el humo y la daga. Elige una mejora que puedas usar ahora, sin depender de objetos que todavía no tienes.']
    a.faq[0].answer='Cuando puedas llegar a tiempo y disparar junto a tus compañeros. Mira qué objetivo van a disputar y cuánto tardarás en alcanzarlos. No hay una cantidad de almas que sirva como permiso para pelear en todas las partidas.'
    a.checklist=['Dispara a quien puedas mantener a tiro sin salir de cobertura.', 'Mira quién puede detener Baile de Balas.', 'Busca una cobertura por si llega otro rival.']
  }
  if(a.hero==='graves'&&a.kind==='hero'){
    a.intro='Graves combina el arma con calaveras y necrófagos. Protege la lápida y coloca las manos en el camino que quieras dificultar. Busca una posición desde la que puedas seguir disparando mientras atacan tus criaturas.'
    a.sections[0].title='Tarro de los Muertos: dirige las calaveras con el arma'
    a.sections[1].title='Manos Agarradoras: elige dónde poner la grieta'
    a.sections[2].body=['El arma va robando daño de arma y resistencia espiritual mientras atacas, hasta un máximo por objetivo. Acertar un momento no basta para acumularlo todo. Dispara desde una cobertura que te permita aguantar el intercambio.', 'Con la mejora final, las invocaciones también aplican el robo de esencia. Hasta que la tengas, no cuentes con que tus criaturas roben esos atributos. Puedes cambiar de blanco si la pelea lo exige, pero repartir los disparos sin amenazar a nadie dificulta aprovechar la habilidad.']
  }
  if(a.hero==='viscous'&&a.kind==='build'){
    a.intro='Esta build reduce las recargas de Viscoso para usar más veces el charco, el cubo y los puños. Antes de comprar más daño o alcance, comprueba si estás acertando y llegas a tiempo para ayudar. Si te eliminan después de la primera habilidad, adelanta una defensa o cambia por dónde entras.'
    a.sections[1].title='Acierta el charco antes de comprar más daño'
    a.sections[1].body=['El espíritu ayuda si el charco o el golpe alcanzan al enemigo. Si lanzas donde ya no queda nadie, cambia la puntería o el momento antes de comprar más daño. Obligar al rival a abandonar un acceso también puede ayudar a tu equipo.', 'Después de ayudar, vuelve a cobertura. Si te quedas sin aguante y sin cubo, busca una retirada más corta o compra defensa contra el daño que te está matando.']
    a.sections[2].title='Qué habilidad mejorar con un objeto imbuido'
    a.sections[2].body=['Elige la habilidad que más está ayudando en esa partida. Puede que necesites volver a cerrar un acceso o tener el cubo listo para salvar a alguien. Mira su recarga antes de imbuir por costumbre otra habilidad.', 'Prueba el alcance desde el mismo punto del escenario para ver hasta dónde llegas. Debería permitirte alcanzar a un aliado o enemigo al que antes no llegabas. Reducir una recarga tampoco obliga a lanzar la habilidad en cuanto vuelve.']
    a.sections[3].body=['Antes de usar el cubo, compara el daño que recibirá el aliado con lo que iba a hacer. Durante la protección deja de iniciar ataques: si ya estaba ganando el duelo, puedes darle al enemigo tiempo para escapar.', 'Prepara también cómo saldrá del cubo. Si el rival sigue apuntando al mismo lugar, curarlo más puede no ser suficiente. Ayúdalo desde cobertura y guarda otra habilidad si la tienes disponible.']
    a.sections[4].body=['La bola aporta resistencia, pero necesitas conocer el recorrido y los rebotes. Practica entrar, golpear la zona que quieres y volver cerca del equipo. Comprar más defensa no arregla terminar rodeado y lejos de ayuda.', 'Si sobrevives a las entradas, reducir la recarga puede ayudarte a repetirlas. Si te eliminan al acabar la bola, cambia dónde terminas y adelanta defensa frente a ese daño. Mira qué habilidades tendrás listas al volver a tu forma normal.']
    a.faq[0].question='¿Necesito objetos de cuerpo a cuerpo para los puños?'
    a.faq[0].answer='Esta build prioriza daño espiritual y reducción de recarga. No des por hecho que todos los objetos de cuerpo a cuerpo funcionan igual con el puño: comprueba el efecto del que quieras añadir antes de cambiar las compras.'
    a.faq[1].question='¿Conviene usar el cubo en cuanto se recarga?'
    a.faq[1].answer='Úsalo cuando proteger al aliado sea más útil que dejarle seguir atacando. Reducir la recarga te permite volver a ayudar, pero sigue importando cuándo y dónde usas el cubo.'
    a.checklist=['Mejora la habilidad con la que estás ayudando al equipo.', 'Elige qué habilidad imbuir antes de comprar el objeto.', 'Deja una salida para cuando termine el cubo o la bola.']
  }
  return a
}
