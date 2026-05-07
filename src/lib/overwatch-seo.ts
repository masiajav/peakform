import { COUNTER_HEROES, getCounterHero, type CounterHero, type CounterRole } from './overwatch-counters'
import { ROLE_LABELS, topicLabel } from './content'

export type VideoGuideStatus = 'verified' | 'needs_review'

export interface VideoGuideAuditEntry {
  hero: string
  heroSlug: string
  language: 'es' | 'en'
  creator: string
  status: VideoGuideStatus
  notes: string
}

export interface SeoTopicBlock {
  title: string
  body: string
}

export interface HeroSeoProfile {
  slug: string
  name: string
  role: CounterRole
  searchTitle: string
  searchDescription: string
  intent: string
  quickWins: SeoTopicBlock[]
  commonMistakes: SeoTopicBlock[]
  sixVsSix: string
}

export const ROLE_SEO: Record<CounterRole, {
  title: string
  searchTitle: string
  searchDescription: string
  overview: string
  quickWins: SeoTopicBlock[]
  commonMistakes: SeoTopicBlock[]
}> = {
  tank: {
    title: 'Tank',
    searchTitle: 'Cómo jugar Tank en Overwatch: espacio, recursos y errores comunes',
    searchDescription: 'Guía de Tank en Overwatch con fundamentos para crear espacio, aguantar recursos, elegir peleas y revisar errores frecuentes en tus partidas.',
    overview: 'Tank decide dónde empieza la pelea y cuánto espacio puede usar su equipo. La prioridad no es recibir daño infinito, sino forzar recursos rivales, cortar ángulos y entrar cuando tu equipo puede convertir esa presión en eliminaciones.',
    quickWins: [
      { title: 'Entra con una condición', body: 'Antes de avanzar, identifica qué cooldown rival quieres forzar y qué compañero puede seguir tu presión.' },
      { title: 'No cambies vida por nada', body: 'Si todos te pegan y tu equipo no gana ángulo, no has creado espacio: solo has comprado tiempo caro.' },
      { title: 'Revisa tu salida', body: 'Una buena entrada siempre tiene cobertura, cooldown defensivo o ruta de retirada.' },
    ],
    commonMistakes: [
      { title: 'Pelear solo en choke', body: 'Quedarte en la puerta permite al rival gastar daño gratis sin ceder posición.' },
      { title: 'Usar todo para entrar', body: 'Si llegas sin recursos al centro de la pelea, no puedes sostener ni salir.' },
      { title: 'Ignorar ángulos', body: 'El espacio frontal no vale si tus supports o DPS no pueden jugar sus líneas.' },
    ],
  },
  dps: {
    title: 'DPS',
    searchTitle: 'Cómo jugar DPS en Overwatch: ángulos, picks, counters y timing',
    searchDescription: 'Guía de DPS en Overwatch para mejorar ángulos, presión, picks, gestión de cooldowns y sincronización con el equipo.',
    overview: 'DPS no va solo de daño total. El valor real aparece cuando presionas desde un ángulo que obliga al rival a girarse, fuerzas cooldowns clave o cierras una baja cuando tu equipo ya ha creado ventaja.',
    quickWins: [
      { title: 'Juega ángulos útiles', body: 'Un ángulo bueno amenaza al rival sin dejarte vendido si pierdes el duelo.' },
      { title: 'Sincroniza presión', body: 'Disparar cuando tu tank entra multiplica el valor; hacerlo cinco segundos antes suele regalar información.' },
      { title: 'Cambia según el mapa', body: 'Hitscan, flanker y proyectil dependen mucho de líneas de visión, high ground y rutas laterales.' },
    ],
    commonMistakes: [
      { title: 'Buscar duelos imposibles', body: 'Si necesitas ganar tres duelos seguidos para aportar, la posicion inicial probablemente es mala.' },
      { title: 'No mirar cooldowns', body: 'Entrar antes de Suzu, Sleep, Lamp o burbujas suele convertir una buena idea en feed.' },
      { title: 'Medir solo eliminaciones', body: 'Forzar dos recursos defensivos puede ganar la pelea aunque no aparezca como kill inmediata.' },
    ],
  },
  support: {
    title: 'Support',
    searchTitle: 'Cómo jugar Support en Overwatch: posicionamiento, recursos y supervivencia',
    searchDescription: 'Guía de Support en Overwatch con posicionamiento, gestión de cooldowns, peel, daño útil y errores comunes para subir rango.',
    overview: 'Support no significa curar sin parar. Tu impacto viene de sobrevivir, estabilizar ventanas críticas, aportar daño cuando no hay peligro real y usar cooldowns para negar la condición de victoria rival.',
    quickWins: [
      { title: 'Prioriza líneas seguras', body: 'Una buena posición te permite curar, hacer daño y cubrirte sin gastar cooldown defensivo.' },
      { title: 'Guarda recursos clave', body: 'Sleep, Suzu, Lamp o boop valen mas cuando niegan una engage rival, no cuando se gastan por ansiedad.' },
      { title: 'Daño cuando puedas', body: 'Si nadie va a morir en el siguiente segundo, aportar presión puede abrir la pelea.' },
    ],
    commonMistakes: [
      { title: 'Curar tarde desde mala posición', body: 'Si para salvar a alguien tienes que cruzar campo abierto, el error ocurrió antes.' },
      { title: 'No jugar alrededor de dive', body: 'Contra Winston, Tracer o Sombra, tu plan empieza antes de que aparezcan encima.' },
      { title: 'Ults reactivas sin ventaja', body: 'Usar ultimate cuando la pelea ya esta perdida solo retrasa el siguiente intento.' },
    ],
  },
}

export const VIDEO_GUIDE_AUDIT: VideoGuideAuditEntry[] = COUNTER_HEROES.map(hero => ({
  hero: hero.name,
  heroSlug: hero.slug,
  language: 'es',
  creator: 'Pendiente de curación editorial',
  status: 'needs_review',
  notes: 'Debe verificarse manualmente: guía explícita del héroe, 2025 o posterior y más de 10k views cuando exista alternativa viable.',
}))

export function buildHeroSeoProfile(slug: string): HeroSeoProfile | null {
  const hero = getCounterHero(slug)
  if (!hero) return null

  const roleLabel = ROLE_LABELS[hero.role]
  const counterNames = hero.counters.slice(0, 3).map(counter => counter.name).join(', ')
  const threatNames = hero.watchOutFor.slice(0, 2).map(counter => counter.name).join(' y ')

  return {
    slug: hero.slug,
    name: hero.name,
    role: hero.role,
    searchTitle: `Guía de ${hero.name} en Overwatch: counters, consejos y cómo jugar`,
    searchDescription: `Guía de ${hero.name} en Overwatch con counters, errores comunes, consejos de posicionamiento, notas de 6v6 y enlaces a vídeos útiles.`,
    intent: `${hero.name} es un ${roleLabel} que se entiende mejor desde tres preguntas: qué recurso fuerza, qué amenaza debe respetar y qué mapa o composición le permite jugar con ventaja.`,
    quickWins: [
      { title: 'Juega por ventanas', body: `Con ${hero.name}, busca actuar cuando el rival ya ha gastado su herramienta principal para frenarte.` },
      { title: 'Respeta counters directos', body: counterNames ? `${counterNames} pueden limitar mucho tu valor si entras sin plan o sin cobertura.` : 'Identifica qué héroes rivales te obligan a cambiar ángulo, ritmo o distancia.' },
      { title: 'Revisa la primera muerte', body: 'Si mueres antes de que tu equipo pueda seguirte, el problema suele ser timing, no mecánica.' },
    ],
    commonMistakes: [
      { title: 'Forzar valor sin información', body: `Entrar con ${hero.name} sin saber dónde están supports, cooldowns o amenazas convierte una buena idea en una pelea perdida.` },
      { title: 'No adaptar distancia', body: `${threatNames || 'Los counters rivales'} pueden obligarte a jugar más lento, cambiar ruta o esperar recursos aliados.` },
      { title: 'Cambiar tarde', body: 'Si el mapa, la composición y los counters niegan tu plan durante varias peleas, revisa el pick antes de gastar otra ultimate.' },
    ],
    sixVsSix: `En 6v6 hay más cuerpos, más peel y más recursos defensivos. Con ${hero.name}, revisa si tu ventana sigue existiendo cuando el rival tiene un segundo tank o una capa extra de protección.`,
  }
}

export function counterPageTitle(hero: CounterHero) {
  return `Counters de ${hero.name} en Overwatch: cómo jugar contra este héroe`
}

export function counterPageDescription(hero: CounterHero) {
  const counterNames = hero.counters.slice(0, 3).map(counter => counter.name).join(', ')
  return `Counters de ${hero.name} en Overwatch: héroes recomendados como ${counterNames}, amenazas que debes respetar y consejos prácticos para ganar el matchup.`
}

export function roleFromHeroSlug(slug: string) {
  return getCounterHero(slug)?.role ?? null
}

export function heroName(slug: string) {
  return getCounterHero(slug)?.name ?? topicLabel(slug)
}
