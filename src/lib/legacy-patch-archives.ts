import { sha256 } from '@noble/hashes/sha2.js'
import type { AnnouncementContent } from './content'
import { hasCurrentEditorialReview } from './editorial-review'

const APRIL_ARCHIVE_URL = 'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/04/'
const REVIEWED_AT = '2026-10-19T19:17:28.000Z'

interface PatchArchive {
  legacyBodyHash: string
  title: string
  description: string
  body: string
}

// These replacements cover the five exact legacy stubs, not future articles
// sharing their slugs. A database edit or approved review takes precedence.
const APRIL_ARCHIVES: Record<string, PatchArchive> = {
  'notas-parche-overwatch-2026-04-01': {
    legacyBodyHash: 'd13b6a5928cde7d6c3dff492b4dfd7558600275b804aff9f8709614210ac825c',
    title: 'Overwatch, 1 de abril de 2026: Underwatch no era un parche de ranked',
    description: 'Underwatch fue el modo de broma de abril de 2026: Mei Tank, ventajas desactivadas y kits disparatados. Qué pertenecía al Arcade y no al competitivo.',
    body: `El parche del 1 de abril de 2026 presentó **Underwatch**, una variante temporal de 5v5 en Arcade. Sus habilidades disparatadas no eran cambios del competitivo. El evento terminó el 13 de abril; esta página conserva el contexto de aquel modo, no el balance actual de Overwatch.

## Qué tenía de distinto Underwatch

Las ventajas estaban desactivadas y los kits cambiaban mucho más que en un ajuste habitual. Mei pasaba a Tank y aumentaba de tamaño; Genji intercambiaba el papel de su espada y sus shurikens; Sombra podía disfrazarse de un objeto en lugar de usar la Baliza de translocación. Son ejemplos del modo especial, no instrucciones para jugar hoy a esos héroes.

También había desafíos y recompensas vinculados al evento. Que esas reglas aparezcan en el archivo de parches de Blizzard no significa que se aplicaran a todas las colas: el encabezado de la nota las sitúa expresamente en Underwatch.

## Cómo reconocer una partida de aquel evento

Si ves un clip de abril en el que Mei ocupa el puesto de Tank o Genji usa la espada como arma habitual, comprueba el modo antes de compararlo con una ranked. Un enfrentamiento jugado con esos kits no sirve para medir los mismos duelos, tiempos de reutilización o responsabilidades que una partida normal.

Para una revisión de VOD, el primer paso aquí no es decidir si el pick era bueno: es identificar qué reglas estaban activas. Una jugada que depende de una habilidad exclusiva de Underwatch no se puede trasladar tal cual a competitivo.

## Qué consultar para jugar ahora

No uses esta nota para elegir un héroe en el parche actual. Puedes consultar la [guía de Genji](/heroes/genji) para trabajar los resets y el timing de entrada en partidas normales, o la [guía para revisar una VOD](/guides/como-mejorar-en-overwatch-revisando-vod) si quieres separar los errores de decisión de las particularidades de un evento.

El [archivo oficial de abril de Blizzard](${APRIL_ARCHIVE_URL}) conserva la sección «Notas del parche Underwatch» del 1 de abril junto a las actualizaciones posteriores del mes.`,
  },
  'notas-parche-overwatch-2026-04-14': {
    legacyBodyHash: '80f42724f4cf1b456c9a9fa1a9efceb3ef25b6f61c7c82599588ec7610c6d9e9',
    title: 'Overwatch, 14 de abril de 2026: Sierra y los cambios de Season 2',
    description: 'Así empezó Season 2: Sierra, el rediseño de Península Antártica y ajustes de Ana, Kiriko y Mercy. Balance histórico de abril de 2026, separado de Estadio.',
    body: `El 14 de abril de 2026 comenzó **Season 2: Cúspide**, con Sierra como nueva DPS, el rediseño de Península Antártica y una tanda amplia de ajustes de héroes. No fue solo una actualización de contenido: cambió la movilidad y varias herramientas de los Supports. Este resumen describe aquel lanzamiento, no los valores del parche actual.

## Sierra y el comienzo de temporada

Sierra llegó acompañada de Operación: Grand Mesa, un evento de historia y desafíos que duró del 14 de abril al 4 de mayo. También volvieron los elogios pospartida. Son novedades de aquel inicio de Season 2; el evento no sigue disponible por aparecer en esta página.

Conviene distinguir el lanzamiento de Sierra de su primer ajuste: el [parche del 17 de abril](/patch-notes/notas-parche-overwatch-2026-04-17) aumentó su daño y reforzó el dron. Si comparas un vídeo de sus primeros días con otro posterior, no estás viendo exactamente la misma versión del personaje.

## Ana, Kiriko y Mercy: qué cambiaba al jugar Support

La granada de Ana bajaba de 14 a 12 segundos de cooldown. Tenerla antes permite disputar otra ventana de antinade o recuperarla antes de la siguiente presión, pero no convierte una granada gastada sin objetivo en una buena decisión. Para revisar una pelea de ese parche, mira si Ana necesitaba reservarla para sobrevivir o tenía una oportunidad real de cortar la curación rival. La [guía de Ana](/heroes/ana) desarrolla esa decisión sin depender de una cifra histórica.

Kiriko reducía el alcance de Swift Step de 35 a 30 metros y aumentaba la cadencia de los ofudas. La diferencia práctica no era simplemente «cura más»: un flanco demasiado alejado podía dejarla sin aliado al que volver. Antes de dar por segura una escapatoria en una VOD de abril, comprueba dónde estaba el compañero, no solo si el teletransporte tenía cooldown. Puedes seguir esa revisión en la [guía de Kiriko](/heroes/kiriko).

Mercy incorporaba Sanación instantánea al kit base, mientras su curación habitual y la movilidad de Ángel de la guarda recibían reducciones. Eso cambiaba la decisión entre sostener con el haz y usar la curación puntual. No justificaba alargar todos los vuelos: el destino y la cobertura seguían importando más que llegar a cualquier aliado disponible.

## Península Antártica y Estadio no eran el mismo cambio

Península Antártica recibió una revisión de sus tres zonas. En una partida de Control, vale más comprobar qué puerta conecta con tu equipo y desde qué cobertura puede curarte el Support que intentar repetir una ruta anterior de memoria. La [guía del mapa](/maps/antarctic-peninsula) permite revisar esas entradas por zona.

Por separado, **Ramattra se incorporó a Estadio** y llegó Lijiang: Mercado nocturno a ese modo. Sus poderes y objetos de Estadio no describen el kit de una partida normal de Control. No mezcles una build de ese modo con una recomendación para ranked convencional.

## Cómo leer una VOD de aquel parche

Anota la fecha y el modo antes de comparar cooldowns o evaluar una composición. Después revisa una pelea concreta: dónde estaba cada Support cuando entró el Tank, qué habilidad defensiva faltaba y si la siguiente entrada llegó antes de recuperarla. Eso aporta más que atribuir la derrota entera a un buff o un nerf.

Este es un resumen de los cambios destacados, no la lista completa. El [archivo oficial de abril](${APRIL_ARCHIVE_URL}) incluye las notas de lanzamiento de Season 2, los ajustes de 6v6 y todos los cambios de Estadio.`,
  },
  'notas-parche-overwatch-2026-04-17': {
    legacyBodyHash: 'eecb7186215e46668e19b9472480569c8eaefdd7b8c9c1e3b5cbb79b865def8e',
    title: 'Overwatch, 17 de abril de 2026: buff de Sierra y coste de la ultimate',
    description: 'Sierra ganó daño, resistencia del dron y curación de una ventaja, pero su ultimate pasó a costar más. Qué significaba para las peleas de Season 2.',
    body: `El 17 de abril de 2026 Blizzard reforzó a **Sierra**, tres días después de su lanzamiento. Aumentaron el daño de sus disparos y la resistencia de Dron de anclaje, pero también subió un 30 % el coste de Abrecaminos. Estos son los ajustes de aquel parche de Season 2, no sus estadísticas actuales.

## Los cambios concretos

- Rifle hélice: cada proyectil pasaba de 7 a 9 de daño.
- Disparo rastreador: el daño por proyectil también subía de 7 a 9.
- Dron de anclaje: su salud pasaba de 30 a 80 y la velocidad del gancho, de 20 a 22.
- Drones médicos, una ventaja mayor: la sanación del haz subía de 75 a 100.
- Abrecaminos: el coste de la ultimate aumentaba un 30 %.

La mejora de Drones médicos correspondía a esa ventaja, no a una nueva curación disponible desde el principio para todas las partidas. Separar el kit base de la elección de perk evita sacar conclusiones equivocadas de dos clips con distinto progreso.

## Más presión sin tener que gastar la ultimate

El aumento del daño por proyectil reforzaba los intercambios con el arma. En una pelea larga, Sierra podía exigir más curación al equipo contrario sin usar Abrecaminos. Eso no implica ganar cualquier duelo: fallar el disparo rastreador o asomarse a dos enemigos seguía dejando una entrada mala, aunque los impactos acertados hicieran más daño.

Si revisas una pelea de esos días, compara el tiempo que podía permanecer disparando desde cobertura con el tiempo que pasaba buscando una posición nueva. Un daño total alto puede venir de castigar al Tank sin crear una baja; una ráfaga menor sobre un enemigo que ya había gastado su escape podía decidir la pelea.

## El dron aguantaba más; no era una salida garantizada

Pasar de 30 a 80 de salud hacía al dron menos frágil. La decisión seguía siendo dónde colocarlo y cuándo usarlo: una ruta que terminaba a la vista de varios rivales podía castigarse igualmente. Para el equipo contrario, distinguir entre una Sierra con el dron disponible y otra que ya había gastado su movilidad era más útil que perseguirla sin comprobarlo.

## Cómo valorar el coste de Abrecaminos

Un coste un 30 % mayor no equivale automáticamente a tardar un 30 % más en conseguir la ultimate: el propio parche también aumentaba el daño que podía contribuir a cargarla. El ritmo real dependía de cuántos disparos acertase y de las oportunidades de cada pelea. En una VOD, mira la carga antes y después del combate, no solo el tiempo transcurrido.

Los códigos de repetición del [parche del 14 de abril](/patch-notes/notas-parche-overwatch-2026-04-14) seguían disponibles tras esta actualización. Para ordenar la revisión, la [guía de cooldowns](/guides/como-revisar-cooldowns-overwatch) ayuda a separar una habilidad mal gastada de un problema de puntería.

Puedes consultar la entrada del 17 de abril en el [archivo oficial de Blizzard](${APRIL_ARCHIVE_URL}).`,
  },
  'notas-parche-overwatch-2026-04-23': {
    legacyBodyHash: 'f376e28063f40970a9d10ac9a96c6e5a29d0fdfc3ebcefd4e94e79522445c1f0',
    title: 'Overwatch, 23 de abril de 2026: Roadhog, Sombra y Vendetta',
    description: 'El parche de abril acortó el gancho de Roadhog, ajustó el sigilo de Sombra y devolvió salud a Vendetta. Cambios históricos, correcciones y Estadio separados.',
    body: `El 23 de abril de 2026 llegaron ajustes para **Roadhog, Sombra y Vendetta**, una corrección de Regreso Katashiro de Mizuki y cambios extensos de Estadio. Blizzard buscaba compensar a varios héroes que habían perdido más rendimiento del previsto al empezar Season 2. Esta página habla de aquella versión: Sombra todavía era DPS, no el Support de temporadas posteriores.

## Roadhog: menos tiempo entre ganchos

El cooldown de Garfio bajaba de 8 a 7 segundos. La ventana para cruzar después de verlo fallar se acortaba, pero el cambio no eliminaba la posibilidad de castigarlo. Si un equipo esperaba demasiado para avanzar tras el fallo, Roadhog podía recuperar la amenaza antes del siguiente cruce.

En una revisión de VOD de ese parche, empieza por la secuencia: gancho fallado, movimiento del equipo y posición de los Supports. Si la entrada se hizo cuando Garfio ya había vuelto, el problema no era que el rival tuviera «gancho siempre», sino que se había desaprovechado la ventana. La [guía para revisar cooldowns](/guides/como-revisar-cooldowns-overwatch) sirve para ordenar esos segundos.

## Sombra y Vendetta: movilidad y supervivencia

Sombra perdía menos velocidad al quedar revelada por daño durante el sigilo: la reducción de su bonificación pasaba del 50 % al 33 %. No era inmunidad al daño ni una mejora directa de su arma. En un duelo importaba seguir conectando disparos y no perder de vista la salida, en lugar de asumir que revelarla bastaba para asegurar la baja.

Vendetta aumentaba su salud de 175 a 200 y alcanzaba 275 de salud total. Eso daba más margen para aguantar daño, pero no convertía cualquier engage en correcto. Si tenía que atravesar dos líneas de tiro para alcanzar a un Support, el equipo aún podía concentrar el daño antes de que llegara. Si entraba mientras el Tank ya estaba recibiendo toda la atención, esos 25 puntos podían dejarle más margen para seguir presionando.

## Mizuki: una corrección que cambiaba la fiabilidad del regreso

Los enemigos dejaban de poder impedir Regreso Katashiro colocándose sobre su punto de inicio. No era una reducción de cooldown ni daño adicional: corregía una forma de bloquear el retorno. Para valorar una eliminación, distingue entre dejar el punto de regreso en una mala posición y sufrir el bloqueo que esta actualización corregía.

## Estadio tenía sus propios ajustes

Hazard perdía parte de los recursos de sus builds de Protección de púas. Ramattra recibía cambios de poderes y objetos, además de correcciones que afectaban a cómo funcionaban esas configuraciones. También había ajustes para otros héroes del modo.

No traslades esos números a una partida normal: una build de Estadio depende de compras y poderes que no existen en competitivo convencional. Antes de comparar dos partidas de Ramattra, confirma que ambas pertenecen al mismo modo. Una diferencia de daño puede venir de la configuración, de un error corregido o de una decisión de pelea; no necesariamente de su arma base.

## Qué conservar para revisar partidas antiguas

Los códigos del 14 de abril en adelante seguían disponibles tras esta actualización. Anota si la partida es anterior o posterior al día 23 antes de comparar el gancho, la salud de Vendetta o el regreso de Mizuki. Para trabajar el timing sin depender de estadísticas de abril, la [guía de revisión de VOD](/guides/como-mejorar-en-overwatch-revisando-vod) propone revisar una pelea completa y no solo la última muerte.

El [archivo oficial de abril de Blizzard](${APRIL_ARCHIVE_URL}) contiene todos los ajustes de Estadio y las correcciones de este parche.`,
  },
  'notas-parche-overwatch-2026-04-28': {
    legacyBodyHash: 'bd8245c2ba8fac4c876c000a9cca11bf4cc4af164a0939961db888e8cba7477d',
    title: 'Overwatch, 28 de abril de 2026: correcciones y 4v4 de Emre',
    description: 'El parche del 28 de abril borró los códigos de repetición, corrigió dos errores y abrió el 4v4 de Emre. Un ajuste de mantenimiento, no una nueva tanda de buffs.',
    body: `El parche del 28 de abril de 2026 fue una **actualización de corrección de errores**, no una nueva tanda de buffs y nerfs. Eliminó los códigos de repetición anteriores y anunció 4c4 evolucionado, el evento temporal en el que todos jugaban como Emre. Este resumen conserva lo ocurrido entonces; el evento terminó el 11 de mayo.

## Las dos correcciones del parche

Se arregló un problema que impedía saltar mientras el marcador estaba abierto. También se corrigió el volumen excesivo con el que a veces sonaba la ultimate de Ramattra. La nota no anunciaba un aumento de daño, un cambio de alcance ni un cooldown nuevo para ese héroe.

La distinción importa si estás revisando una partida antigua: el fallo de salto podía afectar a una acción de movimiento mientras se consultaban las estadísticas, pero no explica por sí solo todo un mal posicionamiento. Del mismo modo, una corrección de audio no convierte a Ramattra en un pick más fuerte por sus números de combate.

## Qué era el 4v4 de Emre

4c4 evolucionado se jugó del 28 de abril al 11 de mayo. Era un duelo por equipos con Emre y modificaciones propias del evento, pensado para reaparecer y volver a combatir. No era una sustitución de la cola competitiva ni una actualización general del kit del héroe.

Si un clip muestra comportamientos distintos a los de una partida normal, comprueba primero si pertenece a ese evento. No uses sus duelos como referencia automática para elegir composición o medir cuánto debía aguantar un héroe en ranked.

## Por qué podía desaparecer tu replay

Blizzard indicó que esta actualización eliminaba los códigos de repetición. Que uno anterior dejara de abrirse después del parche no demostraba que estuviera mal copiado. Si ya conservabas un vídeo de la partida, podías seguir revisando las decisiones visibles, aunque sin la libertad de cámara del replay.

Para futuras revisiones, anota la fecha y guarda los momentos que quieras analizar antes de un cambio de versión. La [guía para revisar una VOD](/guides/como-mejorar-en-overwatch-revisando-vod) explica qué mirar en cada pelea. Los ajustes de balance inmediatamente anteriores están en el [resumen del 23 de abril](/patch-notes/notas-parche-overwatch-2026-04-23), no en esta corrección de mantenimiento.

La entrada completa se conserva en el [archivo oficial de abril de Blizzard](${APRIL_ARCHIVE_URL}).`,
  },
}

export type DisplayPatchNote = AnnouncementContent & { archiveReviewedAt?: string }

export function resolveLegacyPatchArchive(article: AnnouncementContent): DisplayPatchNote {
  const archive = APRIL_ARCHIVES[article.slug]
  if (!archive || article.content_type !== 'patch_note' || article.published !== true || hasCurrentEditorialReview(article)) return article
  const bytes = new TextEncoder().encode(article.body.replace(/\r\n/g, '\n').trim())
  const version = Array.from(sha256(bytes), byte => byte.toString(16).padStart(2, '0')).join('')
  if (version !== archive.legacyBodyHash) return article

  return {
    ...article,
    title: archive.title,
    seo_title: archive.title,
    excerpt: archive.description,
    seo_description: archive.description,
    body: archive.body,
    author: 'Replaid Lab',
    updated_at: REVIEWED_AT,
    archiveReviewedAt: REVIEWED_AT,
    source_url: APRIL_ARCHIVE_URL,
  }
}
