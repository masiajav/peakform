import type { GuideContent } from './content'
import { hasReviewedGuideRevision } from './reviewed-guide-policy'
import { secondGuideReviewBatch } from './reviewed-guide-batch-2'
import { thirdGuideReviewBatch } from './reviewed-guide-batch-3'
import { fourthGuideReviewBatch } from './reviewed-guide-batch-4'
import { fifthGuideReviewBatch } from './reviewed-guide-batch-5'
import { sixthGuideReviewBatch } from './reviewed-guide-batch-6'
import { seventhGuideReviewBatch } from './reviewed-guide-batch-7'
import { eighthGuideReviewBatch } from './reviewed-guide-batch-8'
import { reviewedRoleGuides } from './reviewed-role-guides'
export { hasReviewedGuideRevision, reviewedGuideTarget } from './reviewed-guide-policy'

export type GuideRevision = {
  hero: string
  title: string
  description: string
  quickAnswer: string
  videoSlug: string
  videoDescription?: string
  body: string
  revisedAt?: string
  category?: string
  role?: GuideContent['role']
}

export const GUIDE_REVISION_DATE = '2026-09-30'

// Explicit revisions, not a template that fills in a hero name.
const firstGuideReviewBatch: Record<string, GuideRevision> = {
  'orisa-guia-overwatch-fortify-javelin': {
    hero: 'orisa',
    title: 'Cómo jugar Orisa: Fortify, jabalina y presión sin sobreextenderte',
    description: 'Aprende a jugar Orisa sin depender de curación constante: alterna Fortify y Spin, elige objetivos para la jabalina y prepara Terra Surge.',
    quickAnswer: 'Con Orisa, toma una esquina que tus supports puedan cubrir y alterna Fortify y Javelin Spin según la amenaza. Guarda la jabalina para cortar una entrada o castigar a alguien expuesto. Si el rival se retira fuera de la visión de tus supports, conserva el espacio que has ganado en vez de perseguirlo.',
    videoSlug: 'orisa-guia-video-overwatch',
    body: `## La esquina importa más que aguantar en campo abierto

Orisa puede sobrevivir a mucho daño, pero eso no convierte cualquier posición en una buena posición. Si necesitas que ambos supports te curen sin parar, tus DPS se quedan sin ayuda y el rival gana la pelea por otro lado. Usa la cobertura para reducir el daño que recibes antes de decidir qué cooldown gastar.

En el ataque del primer punto de King's Row, por ejemplo, comprueba desde dónde te cura tu equipo antes de cruzar la entrada. Avanzar hasta la siguiente esquina puede abrir espacio; seguir detrás del Tank rival mientras tus compañeros aún cruzan el choke te deja sola. El mismo paso hacia delante puede ser correcto o un error según quién tenga línea de visión.

## No pulses Fortify y Spin por costumbre

Fortify te permite soportar una ventana de presión. Spin ayuda a gestionar ataques de frente y a desplazarte, pero no es una protección universal. Contra daño que llega desde dos ángulos, girar la jabalina hacia uno no resuelve el otro: necesitas cambiar de posición.

No hay un orden fijo que sirva para todas las peleas. Si solo necesitas cruzar hasta cobertura, usa el recurso que te permita hacer ese recorrido y conserva el otro. Si el rival ya ha comprometido una entrada fuerte, puede tener sentido encadenarlos. Lo que no compensa es gastar ambos mientras el enemigo solo está haciendo poke y quedarte sin nada cuando entra de verdad.

Vigila también el calor del arma. Sobrecalentarte justo cuando un rival cruza tu esquina corta tu presión en el peor momento. Una pausa detrás de cobertura puede servir para enfriar el arma y comprobar si tus supports siguen contigo.

## La jabalina debe cambiar una decisión rival

Acertar Energy Javelin al Tank más cercano no siempre es el mejor uso. Mira si puedes cortar una habilidad, separar a un enemigo de su cobertura o frenar a quien amenaza a tu backline. Un Doomfist que prepara su entrada puede justificar guardarla; lanzarla antes por unos puntos de daño le permite actuar después con menos riesgo.

La pared detrás del objetivo también importa. Busca trayectorias claras y evita disparar por huecos llenos de aliados o enemigos que puedan interceptar el lanzamiento. Si un DPS queda expuesto al salir de una puerta y tus compañeros lo están mirando, esa jabalina tiene un seguimiento mucho más fácil que una lanzada a un objetivo lejano.

## Contra Zarya y contra dive no haces el mismo trabajo

Contra Zarya, presta atención a las burbujas antes de mantener el gatillo pulsado. No disparar a una burbuja no significa dejar de jugar: puedes cambiar de objetivo, enfriar el arma o acercarte a una esquina mejor. Romperla tiene sentido cuando el equipo puede confirmar la baja, no cuando cada uno dispara a algo distinto.

Contra Winston o D.Va, quedarse mirando al Tank que ha pasado detrás de ti puede regalar el frente al resto del equipo rival. Valora si puedes ayudar con la jabalina sin abandonar tu posición o si tus supports ya tienen una retirada. Si nadie puede contener el dive y tú no llegas a intervenir, replantea el pick o el plan del equipo; aguantar tú no basta.

## Terra Surge necesita enemigos que no puedan salir cómodamente

Antes de usar Terra Surge, observa las salidas y la movilidad que queda disponible. Si el enemigo puede abandonar el área sin presión, cargar más tiempo no arregla la jugada. Busca una esquina, un objetivo disputado o una entrada rival que ya esté comprometida.

No persigas la carga máxima como objetivo en sí mismo. Soltar antes para confirmar una baja puede ser mejor que esperar mientras se escapan todos. Avisa de la ultimate para que tus DPS puedan disparar a los objetivos reunidos: atraer enemigos no garantiza por sí solo que la pelea esté ganada.

## Qué revisar después de una derrota

- En tu primera muerte, ¿tus supports podían verte durante todo el avance?
- ¿Gastaste Fortify y Spin contra poke o contra una entrada real?
- ¿La jabalina frenó una amenaza o solo añadió daño al Tank?
- ¿Seguiste disparando a Zarya sin que hubiera una intención común de matarla?
- ¿Terra Surge encontró objetivos sin salida o dependía de que no reaccionaran?

Empieza por las muertes en las que habías gastado los dos recursos defensivos. Retrocede la VOD hasta el primer paso fuera de cobertura y compara esa decisión con la posición de tus supports. Corregir ese avance suele ser más útil que fijarte únicamente en cuántos enemigos alcanzó tu ultimate.

## FAQ

### ¿Tengo que disparar siempre al Tank con Orisa?

No. Presionarlo puede impedir que avance, pero un Support o DPS expuesto puede ser un objetivo mejor. Cambia el foco cuando hacerlo no te obligue a abandonar la esquina que protege a tu equipo.

### ¿Cuándo debería guardar la jabalina?

Cuando haya una amenaza concreta que puedas cortar y todavía no haya actuado. No hace falta guardarla toda la partida: identifica esa amenaza y vuelve a usarla libremente cuando deje de condicionar la pelea.

### ¿Orisa funciona igual en 5v5 y 6v6?

No. Con otro Tank hay más recursos que pueden interceptar tu presión y más opciones para repartir el frente. Coordina qué espacio disputa cada uno en vez de seguir ambos al mismo objetivo.

## Guías relacionadas

Si el problema está en cuándo avanzar, continúa con [los fundamentos de Tank](/roles/tank) y [la revisión de cooldowns](/guides/como-revisar-cooldowns-overwatch). Para analizar un avance concreto, [King's Row](/maps/kings-row) ofrece ejemplos de cómo jugar sus esquinas.`,
  },
  'doomfist-guia-overwatch-entradas-cooldowns': {
    hero: 'doomfist',
    title: 'Cómo jugar Doomfist: preparar el dive y salir sin regalar la vida',
    description: 'Guía de Doomfist para preparar entradas, elegir entre Slam y Punch, usar Power Block con cobertura y convertir presión en espacio para tu equipo.',
    quickAnswer: 'Prepara la entrada de Doomfist desde una posición que te permita ver al objetivo y volver a tu equipo. No gastes Slam y Punch para llegar a una pelea que aún no ha empezado. Si obligas a un Support a retirarse y sobrevives, ya has creado una oportunidad aunque no consigas una baja.',
    videoSlug: 'doomfist-guia-video-overwatch',
    body: `## Antes del combo, prepara la posición

Doomfist castiga a enemigos que no pueden responder a tiempo, pero entrar primero no siempre significa entrar bien. Si saltas mientras tus DPS están recargando o tus supports siguen cruzando una puerta, recibirás la atención de todo el equipo rival sin que nadie aproveche tu presión.

Busca una esquina o una altura desde la que puedas preparar el engage sin recibir daño gratis. En Gibraltar, una entrada hacia un enemigo en high ground puede ser útil si tus DPS también pueden disputarlo. Si ellos están abajo y tú persigues al objetivo hasta otra sala, el dive deja de ser conjunto y se convierte en un duelo aislado.

Elige una salida antes de moverte. No tiene que ser una ruta espectacular: basta con saber qué cobertura puedes alcanzar y desde dónde te podrán curar. Si tu única salida depende de matar a alguien, estás apostando toda la pelea al primer combo.

## Slam y Punch no deben desaparecer a la vez sin motivo

Slam puede ayudarte a entrar, cambiar de altura o escapar. Punch puede desplazar a una amenaza, alcanzar una posición o castigar un grupo mal colocado. Decide qué necesitas de cada uno antes de usarlos. Gastar los dos para llegar al objetivo deja muy poco margen si una granada, un control o un muro corta el seguimiento.

Una entrada corta puede servir para provocar respuestas y volver. Si Ana gasta Sleep y retrocede, la siguiente entrada cambia aunque no la hayas matado. Pero comprueba lo que ocurrió: que haya usado granada sobre otro aliado no significa que Sleep también esté fuera de la pelea.

Evita usar Hand Cannon como un detalle olvidado del combo. Tras desplazar o acercarte a un enemigo, los disparos que conectas importan para confirmar presión. Al mismo tiempo, no te quedes disparando a alguien que ya escapó si tu movilidad de salida vuelve a estar disponible y el resto del rival te está rodeando.

## Power Block no sustituye a la cobertura

Bloquear de frente no te protege de todos los ángulos ni de todas las formas de control. Plantarte en medio del rival esperando que carguen el guantelete facilita que te rodeen o te interrumpan. Úsalo desde una posición donde puedas esconderte si el enemigo deja de disparar o prepara una respuesta.

Contra Orisa, vigila la jabalina. Contra Ana, identifica si Sleep sigue disponible. No hace falta memorizar toda la partida: sigue las herramientas que pueden convertir tu próximo Block o tu entrada en una muerte. Si no las has visto salir, planifica como si estuvieran listas.

Un Punch potenciado no obliga a entrar inmediatamente. Puede servir para amenazar una puerta y hacer que el rival la respete mientras tu equipo avanza. Perseguir una oportunidad mala solo porque tienes el recurso preparado desperdicia la ventaja que acabas de conseguir.

## Decide si estás haciendo dive o peel

Si tu backline está estable, puedes presionar al enemigo que permite funcionar al equipo rival. Si una Tracer o un Genji está aislando a tu Support y nadie responde, desplazar a ese atacante puede aportar más que otro salto hacia el fondo del mapa.

No alternes entre ambos trabajos sin mirar dónde está la pelea. Volver para ayudar cuando tu DPS acaba de entrar puede dejarlo solo; continuar el dive cuando has perdido la curación también puede condenarte. Usa una señal concreta: la posición de tu otro atacante, la vida de tus supports o el cooldown que ha gastado el enemigo.

## Meteor Strike no arregla cualquier entrada

La ultimate puede ayudarte a salir de una situación comprometida y elegir otra posición, pero no borra el coste de haber gastado todo antes. Si aterrizas otra vez en el mismo grupo sin apoyo, solo retrasas la muerte.

Mira qué enemigos están ocupados y dónde puedes volver a recibir curación. Un aterrizaje sobre un objetivo ya presionado por un aliado es distinto de caer sobre cinco rivales que te están esperando. Si la pelea está perdida, conservar la vida y reagruparse puede ser la mejor decisión.

## Revisa la entrada, no solo el final de la pelea

- ¿Qué aliado podía disparar al objetivo cuando empezó tu Slam?
- ¿Qué habilidad habías reservado para salir?
- ¿Sabías si Sleep o la jabalina estaban disponibles?
- ¿Power Block obligó al enemigo a reaccionar o te dejó inmóvil ante varias amenazas?
- ¿Después de Meteor Strike aterrizaste con ayuda o repetiste el mismo aislamiento?

En una VOD, pausa justo antes del engage y dibuja mentalmente la ruta de vuelta. Si en ese momento ya no existe una salida razonable, el error ocurre antes de fallar el Punch. Practica primero entradas más cortas y añade compromiso cuando el equipo pueda seguirte.

## FAQ

### ¿Una entrada sin baja es un mal dive?

No si fuerza una retirada o un recurso importante y permite avanzar a tu equipo. Sí puede serlo si consumes toda la curación disponible y vuelves sin haber cambiado la posición rival.

### ¿Debo entrar siempre con Slam?

No. Depende de la altura, la distancia y la salida que necesitas conservar. Si ya has llegado a una buena posición sin gastar movilidad, puedes empezar la presión desde ahí.

### ¿Qué cambia en 6v6?

Un segundo Tank puede cubrir tu salida o aumentar el peel rival. Acuerda quién presiona primero; dos entradas a objetivos distintos pueden dejar ambos frentes sin seguimiento.

## Guías relacionadas

Compara tus entradas con [el dive de Winston](/guides/como-jugar-winston-ranked-overwatch) y revisa [cómo elegir dive, poke o brawl](/guides/como-elegir-composicion-dive-poke-brawl) si tu equipo no puede acompañarlas.`,
  },
  'sigma-guia-overwatch-poke-escudo': {
    hero: 'sigma',
    title: 'Cómo jugar Sigma: controlar ángulos sin malgastar la barrera',
    description: 'Juega Sigma con mejor control de distancia: usa la barrera contra amenazas concretas, alterna Grasp con cobertura y prepara Accretion y Flux.',
    quickAnswer: 'Sigma quiere mantener al rival en una distancia donde sus Hyperspheres puedan presionar sin que lo rodeen. Usa la barrera para cortar una amenaza concreta, no para absorber todo el spam. Si un equipo de rush consigue llegar hasta ti, cede una esquina con tiempo en vez de gastar barrera, Grasp y roca en el mismo sitio.',
    videoSlug: 'sigma-guia-video-overwatch',
    body: `## El poke necesita distancia y una retirada

Sigma puede presionar una línea mientras protege otra, pero no quiere recibir ataques desde todos lados. Antes de empezar, elige qué ángulo mantienes y qué cobertura usarás cuando el rival se acerque. La barrera ayuda a ganar tiempo; no compensa una posición rodeada.

En una zona abierta de Circuit Royal, puedes obligar al rival a cruzar bajo presión. Si avanzas hasta una curva donde un equipo de rush puede aparecer a tu lado, pierdes la distancia que hacía bueno el pick. Cuando el enemigo cruza, retrocede a la siguiente esquina mientras tus DPS siguen disparando. Ceder unos metros a tiempo no es regalar el mapa.

## Coloca la barrera por una razón y retírala después

Experimental Barrier no tiene que vivir delante de tu cara. Puede cortar la línea de una Widowmaker, proteger a un compañero que cruza o dificultar que un Support rival vea la pelea. Mira qué amenaza estás negando y retírala cuando esa necesidad termine.

Dejarla delante de todo el spam la rompe antes del momento importante. Si una Ashe está castigando a tu Support desde un lateral, mover la barrera hacia esa línea puede ser mejor que mantenerla frente a un Tank al que tu equipo ya aguanta con cobertura.

Tampoco persigas cada disparo con el escudo. Si intentas tapar tres ángulos alternándolos sin parar, el problema probablemente es dónde está colocado el equipo. Cierra uno, avisa del otro y busca una posición menos expuesta. La barrera debe acompañar una decisión, no sustituir todas las decisiones de posicionamiento.

## Grasp y Accretion responden a amenazas distintas

Kinetic Grasp sirve contra ataques que pueda absorber. No lo trates como respuesta universal: un beam, una amenaza de melee o un control que lo interrumpa pueden seguir siendo peligrosos. Contra Zarya, por ejemplo, la cobertura y la distancia importan más que esperar que Grasp resuelva el duelo.

Usa Grasp para atravesar una ventana concreta de daño o sobrevivir hasta la siguiente esquina. Si lo activas mientras el rival todavía no te presiona, puede limitarse a esperar. Si lo reservas hasta que ya no tienes salida, quizá tampoco alcance para salvarte.

Accretion puede frenar una entrada o castigar a un objetivo que tus compañeros puedan rematar. La roca tiene un lanzamiento que el rival puede leer, así que no la tires desde lejos por hábito. Contra un flanker que se ha comprometido cerca de tu Support, tendrás una intención mucho más clara que contra un Tank que aún está detrás de cobertura.

## Usa las Hyperspheres para hacer incómoda una posición

No toda presión necesita una baja inmediata. Los rebotes pueden obligar a alguien a abandonar una esquina sin que tú cruces primero. Ajusta la distancia y mira dónde explotan las esferas, en vez de mantener el disparo a un objetivo demasiado lejano que apenas recibe presión.

Cuando aparezca un rival con poca vida, cambia el foco si puedes hacerlo sin perder el frente. Seguir golpeando al Tank por costumbre deja escapar oportunidades. Pero no persigas al objetivo hasta quedar cerca de un Reinhardt que estaba esperando que te acercaras.

## Gravitic Flux requiere una posición de lanzamiento segura

Antes de usar Flux, mira quién puede interrumpirte y qué cobertura tendrás durante la ultimate. No basta con encontrar varios enemigos juntos. Si dejas de controlar la línea que protegía a tus supports, la pelea puede darse la vuelta mientras buscas un grupo grande.

Elige objetivos que tu equipo pueda seguir y ten en cuenta sus recursos defensivos. Una ultimate sobre dos enemigos expuestos puede ser mejor que otra sobre todo el equipo detrás de una pared. Coordinar daño durante la jugada ayuda más que evaluar únicamente cuántos alcanzaste.

## Señales de que estás jugando demasiado cerca

- Necesitas gastar barrera y Grasp juntos en cada entrada rival.
- La roca se convierte siempre en un intento desesperado de salir.
- Los enemigos llegan a tu lateral antes de que cambies de esquina.
- Tus Hyperspheres golpean al Tank, pero tus supports no pueden mantener la posición.

Revisa una pelea contra rush y pausa cuando el enemigo comienza a avanzar. Si esperaste a verlo delante para retroceder, trabaja esa anticipación. Si cediste espacio sin que tus DPS tuvieran una nueva línea de tiro, revisa también dónde querías acabar, no solo de dónde saliste.

## FAQ

### ¿Debo mantener la barrera desplegada mientras disparo?

Solo cuando esté bloqueando una amenaza que justifique ese desgaste. Puedes disparar desde cobertura y reservarla para un cruce, un ángulo lateral o una habilidad importante.

### ¿Sigma es siempre la mejor elección para mapas largos?

No. La distancia favorece su poke, pero una composición que llega hasta ti o disputa varios ángulos puede exigir otro plan. Mira dónde ocurren las peleas, no solo el nombre del mapa.

### ¿Qué cambia con un segundo Tank?

Puedes repartir el control de líneas, pero también habrá más presión y protección enfrente. Acordad qué cruce cubre cada uno para no gastar ambos recursos defensivos contra el mismo spam.

## Guías relacionadas

Para trabajar el recorrido entre coberturas, consulta [Circuit Royal](/maps/circuit-royal). Si lo que falla es el ritmo del equipo, revisa [poke y brawl](/guides/como-elegir-composicion-dive-poke-brawl).`,
  },
  'ashe-guia-overwatch-angulos-dinamita': {
    hero: 'ashe',
    title: 'Cómo jugar Ashe: ángulos, dinamita y B.O.B. con seguimiento',
    description: 'Mejora con Ashe eligiendo líneas de tiro seguras, detonando dinamita en cruces útiles y colocando B.O.B. donde el rival no pueda ignorarlo.',
    quickAnswer: 'Busca con Ashe una línea de tiro que termine en cobertura y una salida para Coach Gun. La dinamita debe presionar a enemigos que tu equipo pueda castigar, no solo sumar daño. Usa B.O.B. para disputar un espacio o crear otro ángulo, comprobando antes dónde se detendrá y quién puede neutralizarlo.',
    videoSlug: 'ashe-guia-video-overwatch',
    body: `## Una buena línea de tiro también tiene una salida

Ashe quiere ver a enemigos que cruzan, no quedarse visible para todo el equipo rival. Juega junto a una esquina y asoma lo suficiente para disparar. Si necesitas permanecer en medio de una ventana para mantener el ángulo, una Widowmaker puede obligarte a abandonarlo o matarte antes de que aportes presión.

En el primer tramo de Dorado, una altura puede ayudarte a mirar la calle sin mezclarte con tu Tank. Su valor cambia cuando Winston o D.Va pueden alcanzarte. Antes del dive, identifica dónde puedes retroceder y qué aliado tiene visión de esa posición. La altura no te protege por sí sola.

Evita pasar toda la pelea con la mira puesta. Comprueba los laterales entre disparos y recargas. Un flanker que desaparece de tu pantalla no desaparece del mapa; si reaparece a tu lado después de gastar Coach Gun, tendrás muchas menos opciones.

## Dinamita para abrir un cruce, no para inflar el daño

Busca enemigos reunidos cerca de una puerta, una esquina o una cobertura que necesitan abandonar. Detonar la dinamita en ese momento puede obligar a los supports a dedicar recursos a varias personas y permitir que tus compañeros avancen.

Una explosión sobre rivales que pueden cubrirse sin perder nada aporta menos. Pregúntate qué puede hacer tu equipo mientras están quemándose. Si tu Tank aún no ha llegado y tus DPS no tienen ángulo, quizá estés usando el cooldown antes de la ventana útil.

Practica la trayectoria y el disparo de detonación desde posiciones que realmente uses. No necesitas acertar un lanzamiento de exhibición. Una dinamita sencilla que cae al otro lado de la esquina correcta puede ser más repetible y útil que una muy alta que avisa al rival con demasiada antelación.

## Coach Gun no es solo una herramienta para subir

Usarlo para alcanzar high ground puede ser una buena preparación, pero comprueba qué amenaza llegará antes de que vuelvas a tenerlo. Si el dive enemigo ya está listo, subir tarde y gastar tu salida puede dejarte atrapada en la altura que intentabas ganar.

Durante el duelo, Coach Gun puede separarte de un enemigo cercano o cambiar tu posición. Mira hacia dónde te desplazará: retroceder hacia otra línea de tiro rival no es escapar. Reserva una cobertura detrás de ti y evita usarlo por reflejo cuando el atacante todavía está lejos.

Si Genji usa Deflect, no le regales disparos ni habilidades por seguir el mismo ritmo de ataque. Puedes cortar la línea, recargar o forzarlo a acercarse por una ruta peor. No todos los momentos del duelo necesitan que estés disparando.

## B.O.B. debe acabar donde quieres que pelee

Antes de lanzarlo, mira la trayectoria, las paredes y el espacio donde se detendrá. Una carga que termina mirando una zona vacía puede desperdiciar la ultimate aunque el lugar desde el que la activaste pareciera correcto.

B.O.B. puede obligar a atender un ángulo distinto mientras tú sigues disparando desde el tuyo. Úsalo cuando tus aliados puedan presionar a quienes intentan apartarse o neutralizarlo. Contra una Ana con Sleep disponible, ten en cuenta que dejarlo solo delante de ella facilita la respuesta; presionar su posición o esperar a ver ese cooldown cambia la jugada.

En overtime, disputar el objetivo puede ser importante, pero comprueba si llega a él y si el resto del equipo está en condiciones de volver. No evalúes todos los B.O.B. por las bajas: a veces su trabajo es dar tiempo o sacar a un rival de una cobertura decisiva.

## Cómo aportar si tus disparos no están entrando

No arregles una mala sesión acercándote cada vez más al Tank. Vuelve a líneas previsibles, apunta a quienes cruzan y usa la dinamita para dar presión mientras ajustas el ritmo. Cambiar de altura o de esquina puede ofrecer un disparo más sencillo que insistir en el mismo duelo contra una Widowmaker mejor colocada.

Si el rival te expulsa constantemente y nadie puede ayudarte, valora un cambio de posición o de héroe. La pregunta no es si Ashe sirve en el mapa, sino si puedes disparar desde algún sitio útil sin gastar toda la pelea sobreviviendo.

## Qué buscar en tu VOD

- ¿Tenías cobertura al asomarte con la mira?
- ¿Qué oportunidad creó cada dinamita para tus aliados?
- ¿Coach Gun estaba disponible cuando llegó el dive?
- ¿Dónde se detuvo B.O.B. y quién pudo ignorarlo o dormirlo?
- ¿Cambiaste de ángulo después de que el rival identificara tu posición?

Revisa primero las muertes con Coach Gun fuera de cooldown. Si la salida seguía disponible, quizá el problema no fuera la habilidad, sino una dirección de escape sin cobertura o no haber visto venir al atacante.

## FAQ

### ¿Es obligatorio jugar Ashe con Mercy?

No. Un pocket puede mejorar tu presión, pero la posición y la selección de objetivos siguen siendo tuyas. No bases tu ruta de escape en que Mercy vaya a seguirte a cualquier sitio.

### ¿Uso B.O.B. al principio o al final de la pelea?

Cuando su posición pueda cambiar la pelea. Al principio puede crear otro ángulo; más tarde puede disputar un objetivo. Lanzarlo cuando nadie puede aprovecharlo suele dejar al rival libre para neutralizarlo.

## Guías relacionadas

Si te cuesta sostener un ángulo, continúa con [los fundamentos de DPS](/roles/dps) y [Dorado](/maps/dorado). Para reconocer una buena oportunidad de ultimate, consulta [cuándo gastar ultimates](/guides/como-usar-ultimates-overwatch).`,
  },
  'sojourn-guia-overwatch-railgun-presion': {
    hero: 'sojourn',
    title: 'Cómo jugar Sojourn: cargar la railgun y elegir bien el siguiente tiro',
    description: 'Aprende con Sojourn a convertir energía en presión: selecciona objetivos para la railgun, conserva Power Slide y usa Overclock desde un ángulo útil.',
    quickAnswer: 'Con Sojourn, usa el disparo principal para preparar energía sin abandonar cobertura y reserva el tiro cargado para un objetivo que puedas castigar. Power Slide debe tener un destino seguro. Antes de Overclock, busca una línea donde el enemigo necesite cruzar o abandonar una posición; activar la ultimate no crea esa línea por sí solo.',
    videoSlug: 'sojourn-guia-video-overwatch',
    body: `## Cargar energía y elegir objetivo son dos decisiones distintas

Disparar a un Tank visible puede ayudarte a preparar la railgun, pero no obliga a gastar el tiro cargado en ese mismo Tank. Comprueba si aparece un DPS o Support expuesto y si puedes alcanzarlo sin salir de tu esquina. Ahí es donde tu presión puede convertirse en una oportunidad de baja.

Tampoco reserves cada disparo hasta encontrar una cabeza perfecta. Un tiro que obliga a un enemigo herido a esconderse puede permitir avanzar a tu equipo. La diferencia está entre elegir ese resultado y disparar por reflejo porque la barra está cargada.

Si pasas mucho tiempo preparando energía pero nunca encuentras otro objetivo, revisa la línea desde la que juegas. Mirar siempre por detrás de tu Tank limita lo que ves. Un lateral cercano puede ofrecer otra amenaza sin convertirte en una flanker aislada.

## Un off-angle cercano suele ser suficiente

En Midtown, separarte un poco de la ruta de tu Tank puede hacer que el rival tenga que mirar dos entradas. No necesitas atravesar medio mapa. El ángulo funciona si puedes recibir ayuda o volver cuando se gira la presión hacia ti.

Antes de tomarlo, mira qué espacio ha ganado el equipo y dónde está tu otro DPS. Si ambos os alejáis hacia lados distintos mientras los supports retroceden, el rival puede perseguir a uno sin perder el frente. Coordina la presión con el avance de tu Tank o con otro atacante que ya esté molestando al enemigo.

Un ángulo también puede agotarse. Tras mostrar tu posición, un hitscan puede empezar a esperarte. Cambiar de esquina o de altura evita repetir el mismo peek desfavorable; insistir más rápido no cambia quién tiene preparado el disparo.

## Power Slide necesita un destino

El slide puede acercarte a una oportunidad o sacarte de un duelo malo. Antes de gastarlo para rematar, comprueba dónde quedarás si el enemigo recibe curación o se cubre. Si acabarás junto a varios rivales y sin una segunda salida, la baja que buscas puede costar demasiado.

Para retirarte, busca cobertura y no solo distancia. Un desplazamiento hacia una calle abierta permite que el rival siga disparando. El salto también puede exponerte durante el recorrido: alcanzar altura es útil cuando sabes quién controla esa línea.

Contra dive, conservar el slide puede permitirte cambiar de posición después de que Winston salte o Genji se comprometa. Si lo gastas justo antes para buscar un tiro más cómodo, comprueba que no estés cambiando tu única salida por una mejora pequeña del ángulo.

## Disruptor Shot puede condicionar una ruta

Colócalo donde el rival quiera permanecer o cruzar, no simplemente donde estaba al empezar la animación. Una puerta estrecha, la cobertura de un Support o una zona que el Tank necesita ocupar pueden obligar a elegir entre recibir presión o moverse.

El objetivo no es que el enemigo decida quedarse dentro. Si sale hacia la línea donde tú o un compañero tenéis preparado el tiro, la habilidad ya ha ayudado. Si abandona el área detrás de otra pared y nadie puede verlo, quizá necesitabas una colocación distinta o esperar al engage.

## Overclock no sustituye a una buena posición

Actívalo cuando puedas mantener una línea de tiro y no necesites dedicar toda su duración a buscar enemigos. Mira antes qué barreras, coberturas y recursos pueden cortar esa línea. Lanzarlo después de que el rival cruce hacia tu equipo puede ofrecer más oportunidades que hacerlo mientras aún está escondido.

No te quedes inmóvil por intentar aprovechar cada disparo. Si el enemigo gira sobre ti, sigue usando cobertura y reposiciónate. Una ultimate con menos tiros y sin morir puede dejarte en condiciones de cerrar la pelea; exponerte para disparar uno más puede regalar el intercambio.

## Cómo separar fallos de aim y de decisión

- Si el tiro tenía un objetivo claro y estabas segura, trabaja la ejecución.
- Si cambiaste de objetivo a última hora sin necesidad, revisa la preparación del disparo.
- Si la baja exigía cruzar toda la línea rival, revisa el ángulo, no solo el fallo.
- Si moriste tras un slide ofensivo, comprueba qué esperabas que ocurriera al llegar.
- Si Overclock pasó sin enemigos visibles, analiza el momento en que lo activaste.

Elige una pelea de tu VOD y observa cuándo pasaste de cargar a buscar una baja. Si esa transición nunca ocurre, prueba a mirar a los supports y DPS entre ráfagas. Si ocurre demasiado pronto, aprende a reconocer cuándo la cobertura rival sigue cerrando el disparo.

## FAQ

### ¿Debo gastar el tiro cargado siempre en un DPS o Support?

No. Un Tank que puede morir o que necesita retirarse puede ser el objetivo correcto. Evita elegirlo solo porque fue quien te dio energía.

### ¿Es mejor usar slide para atacar o para escapar?

Depende del riesgo y del destino. Úsalo ofensivamente cuando exista una oportunidad clara y puedas sostener la posición después; consérvalo si el rival aún puede entrar sobre ti.

### ¿Tengo que saltar durante cada slide?

No. Decide si necesitas altura o si el salto te expondrá a una línea que no puedes disputar. La ruta segura cambia según la posición del enemigo.

## Guías relacionadas

Para practicar estos ángulos, consulta [Midtown](/maps/midtown). Si te cuesta decidir cuándo dejar un duelo, revisa [cuándo cambiar de héroe o de plan](/guides/cuando-cambiar-de-heroe-overwatch).`,
  },
  'baptiste-guia-overwatch-lamp-window': {
    hero: 'baptiste',
    title: 'Cómo jugar Baptiste: curar, hacer daño y no malgastar la Lamp',
    description: 'Guía de Baptiste para alternar daño y curación, colocar Immortality Field con cobertura, usar Exo Boots y preparar Amplification Matrix.',
    quickAnswer: 'Baptiste necesita una posición desde la que sus granadas lleguen al equipo y pueda disparar sin perderlo de vista. Usa Lamp para impedir una muerte concreta y colócala donde el rival no pueda destruirla fácilmente. La Window vale cuando tú o tus aliados ya tenéis un disparo útil, no cuando obliga a todos a recolocarse bajo fuego.',
    videoSlug: 'baptiste-guia-video-overwatch',
    body: `## Busca una posición que sirva para curar y disparar

Baptiste puede aportar mucho daño, pero no si cada ráfaga te obliga a girarte y perder de vista a tus aliados. Busca una esquina desde la que puedas ver el recorrido del Tank y una línea de tiro rival. Así puedes alternar ambas tareas sin dedicar segundos enteros a cambiar de orientación.

La altura ayuda a leer la pelea y a lanzar granadas hacia el suelo cerca de tus compañeros. No todas las alturas son cómodas: si un techo corta la trayectoria o una pared tapa al aliado que recibirá el engage, necesitas moverte. En Numbani, por ejemplo, subir no basta si tu Tank ya ha entrado por una ruta que queda fuera de tu visión.

También mira quién te acompaña. Un high ground desde el que puedes saltar hacia tu otro Support tiene una retirada distinta de una plataforma donde el dive rival te encontrará solo. Exo Boots permite cambiar de nivel, pero no ofrece una solución automática a una posición aislada.

## Alterna tareas según el daño que está entrando

No hace falta mantener un patrón rígido de disparos y granadas durante toda la pelea. Cuando un aliado recibe burst, prioriza que la curación llegue a tiempo. Cuando el equipo está estable y el rival asoma por una línea clara, usa esas ventanas para disparar.

Apunta la curación al lugar donde estará el aliado al llegar la granada, no siempre a donde estaba al lanzarla. Los cambios de esquina y los saltos pueden dificultar el impacto. Si tu compañero avanza hacia una sala, empieza a ajustar tu posición antes de que desaparezca completamente de la pantalla.

El daño útil también puede reducir la necesidad de curar. Presionar a una Ashe que dispara libremente puede obligarla a cubrirse. Pero si para hacerlo abandonas a un aliado que ya está en peligro, intercambias una oportunidad de daño por una muerte evitable.

## Immortality Field necesita protección y una salida

Lamp evita una muerte mientras cumple sus condiciones; no elimina la presión que está sufriendo el equipo. Si la lanzas en una zona donde todo el rival puede dispararle, puede desaparecer antes de que los aliados se recuperen. Usa esquinas y coberturas sin perder la línea necesaria hacia quienes quieres proteger.

No esperes al último píxel de vida en todas las situaciones. El lanzamiento y la presión rival importan. Si una ultimate o un engage va a matar a un aliado antes de que puedas curarlo, anticipar Lamp puede ser correcto. Si el daño se resuelve con una granada o Regenerative Burst, conservarla evita que el siguiente ataque encuentre al equipo sin respuesta.

Después de lanzarla, sigue jugando. Cura a los protegidos y mira si deben retirarse del área. Un Tank que se queda recibiendo daño solo porque Lamp está activa puede volver a estar en peligro en cuanto termine. La habilidad compra una oportunidad para recuperarse, no permiso para permanecer expuesto.

## No encadenes todos los recursos ante la misma amenaza

Regenerative Burst puede ayudar a estabilizar aliados cercanos, mientras Lamp responde a un riesgo letal que no puedes resolver a tiempo. Gastar ambas por reflejo contra una presión pequeña deja menos herramientas para la entrada real.

Si el rival te hace dive, identifica por dónde puedes bajar o cambiar de altura. Saltar constantemente en el mismo sitio facilita que un hitscan siga tu trayectoria. Carga Exo Boots cuando tengas un destino útil, no porque moverte más siempre parezca mejor.

## Una buena Window aprovecha una línea que ya existe

Antes de Amplification Matrix, comprueba quién puede usarla y qué objetivo estará visible. Una matriz que te permite defender un cruce con tus propios disparos y curación puede aportar mucho sin reunir a todo el equipo detrás de ella.

No la coloques frente a una pared o tan adelantada que nadie pueda disparar sin exponerse. En defensa de una calle estrecha, espera a que el rival deba atravesar tu línea. Si puede permanecer detrás de la esquina hasta que pase la ultimate, quizá necesitabas otro timing o una posición que cubra su salida.

## Qué revisar cuando tienes mucha curación y aun así pierdes

- ¿Llegaban las granadas antes o después del burst enemigo?
- ¿Lamp quedó protegida y permitió recuperar vida?
- ¿Gastaste Burst y Lamp sin identificar una amenaza letal?
- ¿Tus saltos terminaban en una cobertura o te exponían al mismo tirador?
- ¿Window tuvo disparos reales o solo estuvo presente en la pelea?

El marcador no te dice si curaste tarde. Revisa una muerte salvable y pausa cuando comienza el daño. Compara el tiempo que dedicaste a disparar, la trayectoria de la granada y la opción de lanzar Lamp. Así puedes distinguir una prioridad equivocada de un problema de puntería o de posición.

## FAQ

### ¿Baptiste debería hacer daño en cada pelea?

Busca oportunidades para hacerlo, pero no a costa de una curación urgente. Su valor está en alternar según la situación, no en mantener una cifra de daño prefijada.

### ¿Debo guardar Lamp solo para ultimates?

No. Un engage normal también puede causar una muerte decisiva. Úsala cuando el peligro sea real y no tengas una alternativa fiable que llegue a tiempo.

### ¿Una Window solo para mí es un desperdicio?

No si tienes una línea clara y puedes aprovecharla para daño o curación. Una matriz para cinco aliados que nadie puede usar es peor que una colocada para una oportunidad concreta.

## Guías relacionadas

Continúa con [los fundamentos de Support](/roles/support) y [cómo revisar cooldowns](/guides/como-revisar-cooldowns-overwatch). Si tus rotaciones fallan en el primer punto, consulta [Numbani](/maps/numbani).`,
  },
  'mercy-guia-overwatch-pocket-resurrect': {
    hero: 'mercy',
    title: 'Cómo jugar Mercy: elegir el pocket, sobrevivir y decidir un Resurrect',
    description: 'Mejora con Mercy: elige a quién potenciar, prepara rutas de Guardian Angel, evalúa cada Resurrect y usa Valkyrie sin perder cobertura.',
    quickAnswer: 'Mercy aporta más cuando potencia al aliado que puede hacer algo ahora y mantiene una ruta segura hacia otro compañero. Antes de Resurrect, mira quién controla el cuerpo, cuánto tiempo necesitarás exponerte y qué ocurrirá con el resto del equipo mientras lo intentas. Una baja no es una orden de resucitar.',
    videoSlug: 'mercy-guia-video-overwatch',
    body: `## El pocket es una decisión, no un contrato

Que empieces acompañando a Ashe no significa que debas mantener el beam sobre ella mientras recarga y otro aliado tiene una oportunidad clara. Mira quién está disparando, entrando o usando una habilidad que pueda aprovechar tu apoyo. Cambiar unos segundos de objetivo puede aportar más que permanecer con tu compañero habitual por costumbre.

También valora la posición. Un DPS que cruza hasta un flanco sin aliados cercanos puede dejarte sin ruta de salida. Puedes apoyarlo durante una ventana segura sin seguirlo hasta el final. Si él continúa hacia una zona que controla el rival, conservar tu vida y ayudar al resto del equipo no es abandonarlo: es evitar que una mala posición cueste dos muertes.

En Gibraltar, acompañar a quien disputa una altura puede ser útil. Antes de hacerlo, busca otro aliado al que puedas volver y una cobertura donde terminar el movimiento. El recorrido importa tanto como el destino.

## Cura cuando hace falta y potencia cuando hay una oportunidad

No necesitas rellenar cada pequeña pérdida de vida antes de cambiar al beam de daño. Si el aliado está estable y puede presionar, potenciarlo puede obligar al rival a cubrirse. Si recibe burst o corre peligro de morir antes de la siguiente ayuda, la curación pasa a ser prioritaria.

Comprueba también el trabajo de tu otro Support. Si está manteniendo al Tank y tú haces lo mismo sin mirar a los DPS, quizá estés dejando sin apoyo al héroe que podía cerrar una baja. Si lo están atacando, ayudarle a sobrevivir puede ser más importante que continuar el pocket.

El marcador de curación no resume esas decisiones. Una partida con menos curación puede tener buenos cambios de beam y mucha presión útil; otra con cifras altas puede reflejar que el equipo estuvo expuesto demasiado tiempo. Mira las peleas, no solo el total.

## Guardian Angel debe acabar en cobertura

Volar hacia un aliado no obliga a terminar encima de él. Elige un recorrido y una salida que no te dejen visible para un hitscan. Los movimientos ascendentes pueden servir para cambiar de nivel, pero repetirlos en una zona abierta vuelve previsible tu trayectoria.

Antes de moverte, localiza qué aliado permitirá el siguiente desplazamiento. Si todos quedan detrás de una pared cuando llegas al pocket, tendrás menos opciones ante un dive. Puedes quedarte un poco más atrás o cambiar de lateral para conservar varios objetivos accesibles.

No uses Guardian Angel solo porque vuelve a estar listo. Mantener una posición segura mientras miras la pelea puede ser mejor que cruzar una línea rival para acercarte unos metros. Reserva el movimiento cuando aún no haya una razón para abandonar tu cobertura.

## Resurrect empieza por mirar quién controla el cuerpo

Una baja detrás de una esquina protegida no es lo mismo que otra en mitad de la calle. Comprueba si un enemigo puede verte durante el intento, si alguien puede interrumpirte y si tus aliados pueden cubrir esa ventana sin morir mientras dejas de curar.

No bases la decisión únicamente en la importancia del compañero. Un Tank puede ser esencial, pero si resucitarlo exige entrar sola en todo el equipo rival, quizá solo añadas tu muerte. Si el enemigo se ha retirado o atiende otra amenaza, esa misma resurrección puede volverse viable.

En una pelea ya perdida, piensa también en el reagrupamiento. Devolver a un aliado a una posición donde morirá otra vez puede retrasar al equipo. Usa la información disponible en ese momento: no juzgues un Resurrect solo porque acabó bien tras un error del rival.

## Valkyrie te da opciones, no invisibilidad

La movilidad de Valkyrie permite cambiar de perspectiva y acompañar una pelea, pero seguirás siendo un objetivo si vuelas por una línea abierta. Usa edificios y alturas para cortar visión en vez de permanecer suspendida delante de los hitscans.

Actívala cuando el equipo pueda aprovechar la estabilidad o la presión adicional. Si tus aliados están dispersos, no ven al enemigo y necesitan reagruparse, quizá la ultimate no cambie esa situación. Cuando un DPS rival queda aislado y puedes intervenir sin abandonar una urgencia de curación, valora esa oportunidad; no conviertas cada Valkyrie en una persecución con la pistola.

## Una revisión de VOD útil para Mercy

- ¿A quién potenciabas cuando comenzó el engage y qué estaba haciendo?
- ¿Guardian Angel terminó en una cobertura o en una línea abierta?
- ¿Tenías otro aliado accesible como salida?
- ¿Quién controlaba el cuerpo antes de cada Resurrect?
- ¿Valkyrie mejoró una pelea existente o intentó arreglar una ya perdida?

Revisa una muerte sin cambiar la cámara al enemigo. Usa primero la información que tú podías ver. Si el flanker ya había desaparecido de tu pantalla y solo tenías una salida, puedes anticipar mejor la próxima entrada aunque no sepas su posición exacta.

## FAQ

### ¿Tengo que quedarme toda la partida con un DPS?

No. Prioriza oportunidades reales y cambia de aliado cuando tu pocket recarga, se cubre o toma una ruta que no puedes acompañar con seguridad.

### ¿Un Resurrect disponible debe usarse siempre?

No. La seguridad del intento, la posibilidad de recuperar la pelea y el estado de los demás aliados importan más que tener el cooldown listo.

### ¿Cuándo debería cambiar de Mercy?

Si no puedes potenciar a nadie desde una posición razonable o el equipo necesita una respuesta que tu kit no está aportando. Revisa antes si puedes cambiar el pocket o la ruta: no todo problema se resuelve cambiando de héroe.

## Guías relacionadas

Para comparar tus prioridades con las de tu compañero, consulta [Ana en ranked](/guides/como-jugar-ana-ranked-overwatch) y [los fundamentos de Support](/roles/support). Si dudas entre insistir y cambiar, revisa [las señales para cambiar de héroe](/guides/cuando-cambiar-de-heroe-overwatch).`,
  },
  'moira-guia-overwatch-recursos-supervivencia': {
    hero: 'moira',
    title: 'Cómo jugar Moira: gestionar curación, orbes y Fade sin aislarte',
    description: 'Guía de Moira para gestionar el recurso de curación, elegir orbes según la pelea, reservar Fade y usar Coalescence con una línea útil.',
    quickAnswer: 'Con Moira, evita gastar toda la curación antes del engage y recupera recurso haciendo daño cuando el equipo esté estable. Elige el orbe por lo que necesita la pelea y apunta su recorrido. Fade debe terminar en una posición que puedas sostener: entrar con él a perseguir una baja puede dejarte sin salida cuando el rival se gira.',
    videoSlug: 'moira-guia-video-overwatch',
    body: `## La barra de curación condiciona la siguiente pelea

No mantengas el spray sobre aliados que apenas han recibido daño solo para ver subir la curación. Mira cuánto recurso te queda antes de que el equipo cruce. Si llegas vacía a la presión importante, tendrás que buscar daño en un momento en el que los demás necesitan que cures.

Recupera recurso durante ventanas seguras: cuando el Tank rival está visible, tus aliados se han cubierto o tu otro Support puede sostener la presión actual. No hace falta convertirte en una flanker para hacerlo. Un objetivo al alcance desde tu posición puede bastar para prepararte sin abandonar al equipo.

Si siempre te quedas sin barra, revisa también cuánto daño evitable está recibiendo el grupo. Puedes usar un orbe de curación para ayudar, pero no resolverás indefinidamente una composición dispersa que necesita curación en varios puntos fuera de tu alcance. A veces debes cambiar dónde juegas; otras, valorar si otro Support encaja mejor.

## Elige el orbe antes de elegir la dirección

Un orbe de daño puede presionar una habitación o un enemigo que está intentando recuperarse. Un orbe de curación puede mantener al equipo mientras cruza o ayudarte a sobrevivir a un duelo. Elige según la pelea que está ocurriendo, no según el cooldown que acabas de recuperar.

Después mira la trayectoria. Lanzarlo hacia una calle abierta puede hacer que abandone enseguida la zona útil. Los rebotes en una sala o junto a una pared pueden mantenerlo cerca de quienes necesitan el efecto. En los interiores de Lijiang Tower, piensa en el recorrido completo y en dónde estará el equipo al cruzar, no solo en acertar la dirección inicial.

Si el rival tiene recursos para negar el orbe, evita ofrecerlo por la línea más fácil de interceptar. Cambia el ángulo o espera a que esa herramienta se haya gastado. No todas las habilidades listas deben salir inmediatamente.

## Fade es una salida que debes preparar

Antes de usar Fade para acercarte a un Support herido, comprueba si puedes volver sin depender de otra habilidad. Si el objetivo recibe ayuda, puede convertir tu persecución en una muerte. Una baja casi conseguida no justifica entrar en una posición donde el resto del rival te espera.

En defensa, usa el movimiento para alcanzar cobertura o reagruparte con un aliado. Alejarte de un atacante hacia una línea de Widowmaker solo cambia quién te mata. Mira el destino y conserva una ruta dentro de la pelea que todavía puedas sostener al terminar Fade.

Tampoco gastes Fade para corregir cada pequeño desplazamiento. Si puedes caminar detrás de una pared mientras tu equipo cubre la ruta, conservarlo te permite responder a la amenaza que llegue después. Una Moira con movilidad disponible condiciona un dive de forma distinta de una que acaba de usarla delante del enemigo.

## Hacer daño no significa perseguir a cualquiera

El daño de Moira puede terminar una baja o recuperar recursos, pero el objetivo debe ser accesible. Mientras persigues a un Genji hasta otra sala, tu equipo puede perder el único Support que podía curar a varios aliados juntos.

Mira primero si el enemigo está aislado, si tienes una salida y cuánto necesita el equipo tu atención. Si un compañero ya tiene el duelo controlado, quizá sea mejor volver al frente. Si nadie puede rematar a un rival expuesto y tú puedes hacerlo desde cerca del grupo, esa presión sí tiene una intención clara.

No uses tus eliminaciones como prueba de que el reparto daño-curación fue correcto. Participar en muchas bajas y llegar tarde a una curación decisiva puede ocurrir en la misma partida. La revisión debe centrarse en los momentos donde hubo una elección, no en defender el marcador final.

## Coalescence necesita una línea que no se rompa enseguida

Busca una posición donde puedas alcanzar a aliados y enemigos relevantes. Si activas la ultimate mientras tu Tank está a punto de doblar una esquina que tapa el beam, quizá pierdas su mejor ventana. Acompaña el avance sin ponerte delante de todo el equipo rival.

Antes de usarla, mira las amenazas que pueden cortar tu acción y evita depender de una línea frontal expuesta. Puede ayudar a sostener un engage o presionar un objetivo herido, pero no garantiza recuperar una pelea donde ya han muerto varios aliados.

Mantén una prioridad durante la ultimate. Cambiar de un enemigo lejano a otro mientras el aliado cercano cae puede desperdiciar el apoyo que justificaba activarla. Si el equipo está estable y un rival no tiene cobertura, entonces puedes concentrar la presión sobre él.

## Qué revisar sin obsesionarte con las estadísticas

- ¿Con cuánta curación llegabas al primer cruce de cada pelea?
- ¿El orbe permanecía junto al equipo o se iba por una ruta vacía?
- ¿Dónde terminaste Fade y quién podía ayudarte allí?
- ¿La persecución de una baja dejó a alguien sin curación?
- ¿Coalescence tuvo una línea continua hacia los objetivos importantes?

Escoge una pelea donde se agote tu recurso y retrocede hasta que la barra aún estaba cómoda. Comprueba cuánto spray gastaste sobre daño pequeño y qué ventanas de daño ignoraste. La mejora no consiste en curar menos por sistema, sino en llegar preparada al momento que de verdad lo exige.

## FAQ

### ¿Cuánto daño debería hacer con Moira?

No hay una proporción válida para todas las partidas. Haz daño cuando permita recuperar recurso o cerrar una oportunidad sin dejar una necesidad urgente de curación desatendida.

### ¿El orbe de curación es siempre más seguro?

Solo si habrá alguien que pueda aprovecharlo. Un orbe que abandona el equipo rápidamente puede aportar poco aunque hayas elegido curación. La trayectoria importa tanto como el tipo.

### ¿Puedo usar Fade para entrar?

Sí, cuando el destino sea seguro y puedas sostenerlo sin esperar una salida imposible. Evita usarlo para perseguir objetivos que aún tienen ayuda, movilidad o cobertura disponible.

## Guías relacionadas

Para revisar el orden de tus recursos, consulta [cómo analizar cooldowns](/guides/como-revisar-cooldowns-overwatch). Si quieres trabajar una sala concreta, empieza por [Lijiang Tower](/maps/lijiang-tower) y compara las rutas de los orbes con el avance del equipo.`,
  },
}

export const reviewedGuideRevisions: Record<string, GuideRevision> = {
  ...firstGuideReviewBatch,
  ...secondGuideReviewBatch,
  ...thirdGuideReviewBatch,
  ...fourthGuideReviewBatch,
  ...fifthGuideReviewBatch,
  ...sixthGuideReviewBatch,
  ...seventhGuideReviewBatch,
  ...eighthGuideReviewBatch,
  ...reviewedRoleGuides,
}

export function reviewedGuideVideoSource(slug: string) {
  if (!hasReviewedGuideRevision(slug)) return undefined
  const source = reviewedGuideRevisions[slug].videoSlug
  return source !== slug ? source : undefined
}

export function applyReviewedGuideRevision<T extends Pick<GuideContent, 'slug'>>(guide: T): T {
  if (!hasReviewedGuideRevision(guide.slug)) return guide
  const revision = reviewedGuideRevisions[guide.slug]
  return {
    ...guide,
    ...(revision.role ? { role: revision.role } : {}),
    title: revision.title,
    seo_title: revision.title,
    seo_description: revision.description,
    excerpt: revision.quickAnswer,
    body: revision.body,
    author: 'Replaid Lab',
    updated_at: revision.revisedAt || GUIDE_REVISION_DATE,
    video_summary: revision.quickAnswer,
    category: revision.category || 'Héroes',
    content_type: 'guide',
  }
}

export function mergeReviewedGuideVideo(guide: GuideContent, video: GuideContent | null): GuideContent {
  if (!video?.video_id || guide.video_id || video.hero !== guide.hero) return guide
  return {
    ...guide,
    video_id: video.video_id,
    video_url: video.video_url,
    video_platform: video.video_platform,
    video_title: video.video_title,
    video_channel: video.video_channel,
    video_language: video.video_language,
    video_published_at: video.video_published_at,
  }
}
