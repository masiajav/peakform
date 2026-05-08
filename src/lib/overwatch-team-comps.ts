import { COUNTER_HEROES, type CounterHero, type CounterRole } from './overwatch-counters'

export type TeamCompFormat = '5v5' | '6v6'
export type TeamCompStyle = 'dive' | 'poke' | 'rush' | 'brawl' | 'flyers' | 'anti-dive'

export interface TeamCompTemplate {
  style: TeamCompStyle
  title: string
  description: string
  tanks: string[]
  dps: string[]
  supports: string[]
  winCondition: string
  avoidWhen: string
}

export interface TeamCompRecommendation {
  id: string
  hero: CounterHero
  format: TeamCompFormat
  style: TeamCompStyle
  title: string
  description: string
  tanks: string[]
  dps: string[]
  supports: string[]
  alternatives: string[]
  winCondition: string
  avoidWhen: string
}

export const TEAM_COMP_HEROES = COUNTER_HEROES

export const TEAM_COMP_STYLE_LABELS: Record<TeamCompStyle | 'all', string> = {
  all: 'Todos',
  dive: 'Dive',
  poke: 'Poke',
  rush: 'Rush',
  brawl: 'Brawl',
  flyers: 'Flyers',
  'anti-dive': 'Anti-dive',
}

const STYLE_TEMPLATES: Record<TeamCompStyle, TeamCompTemplate> = {
  dive: {
    style: 'dive',
    title: 'Dive coordinado',
    description: 'Movilidad, timing y burst para caer sobre un objetivo vulnerable antes de que el rival pueda estabilizar.',
    tanks: ['Winston', 'D.Va', 'Wrecking Ball', 'Doomfist', 'Hazard'],
    dps: ['Tracer', 'Genji', 'Sombra', 'Echo', 'Venture'],
    supports: ['Kiriko', 'Lucio', 'Ana', 'Juno'],
    winCondition: 'Preparar angulos, contar recursos defensivos y entrar todos a la vez sobre backline o DPS aislado.',
    avoidWhen: 'Mapas muy cerrados contra brawl con mucho peel, o cuando tu equipo entra de uno en uno.',
  },
  poke: {
    style: 'poke',
    title: 'Poke de largo rango',
    description: 'Presion desde rango, crossfire y gasto de recursos antes de que el rival pueda llegar al contacto.',
    tanks: ['Sigma', 'Orisa', 'Ramattra'],
    dps: ['Ashe', 'Widowmaker', 'Hanzo', 'Sojourn', 'Emre', 'Soldier-76'],
    supports: ['Baptiste', 'Illari', 'Zenyatta', 'Ana'],
    winCondition: 'Ganar vida, cooldowns y posicion desde lineas largas; pelear cuando el rival ya gasto recursos de entrada.',
    avoidWhen: 'Mapas sin lineas largas o contra dive que puede saltarse tus sightlines sin recibir castigo.',
  },
  rush: {
    style: 'rush',
    title: 'Rush de velocidad',
    description: 'Engage directo con speed, sustain y burst para cerrar distancia y atropellar objetivos sin movilidad.',
    tanks: ['Junker Queen', 'Reinhardt', 'Ramattra', 'Mauga'],
    dps: ['Reaper', 'Mei', 'Cassidy', 'Anran', 'Vendetta'],
    supports: ['Lucio', 'Juno', 'Kiriko', 'Mizuki', 'Moira'],
    winCondition: 'Guardar speed y defensivos hasta estar cerca, entrar juntos y convertir el primer objetivo que no pueda kitear.',
    avoidWhen: 'Mapas abiertos, high ground dominante o rivales que pueden kitear sin ceder objetivo.',
  },
  brawl: {
    style: 'brawl',
    title: 'Brawl de objetivo',
    description: 'Presencia frontal, control de corto rango y sustain para ganar peleas alrededor de corners y objetivo.',
    tanks: ['Reinhardt', 'Junker Queen', 'Zarya', 'Ramattra', 'Hazard'],
    dps: ['Mei', 'Reaper', 'Cassidy', 'Junkrat', 'Venture'],
    supports: ['Lucio', 'Kiriko', 'Moira', 'Baptiste', 'Brigitte'],
    winCondition: 'Tomar un corner, partir al rival con muro o presion frontal y jugar peleas cortas con recursos defensivos.',
    avoidWhen: 'Circuitos largos o composiciones poke que nunca tienen que entrar en tu rango efectivo.',
  },
  flyers: {
    style: 'flyers',
    title: 'Flyers y presion vertical',
    description: 'Control del espacio aereo para dividir la atencion rival y castigar equipos sin hitscan fiable.',
    tanks: ['D.Va', 'Winston'],
    dps: ['Pharah', 'Echo', 'Anran'],
    supports: ['Mercy', 'Juno', 'Illari', 'Baptiste'],
    winCondition: 'Abrir angulos verticales, forzar que el rival mire arriba y castigar supports o DPS sin cobertura.',
    avoidWhen: 'Contra doble hitscan fuerte, D.Va activa o mapas interiores donde no hay espacio vertical real.',
  },
  'anti-dive': {
    style: 'anti-dive',
    title: 'Anti-dive con peel',
    description: 'Recursos defensivos, CC y castigo al engage para sobrevivir a Tracer, Genji, Winston o Ball.',
    tanks: ['D.Va', 'Zarya', 'Orisa', 'Roadhog'],
    dps: ['Cassidy', 'Mei', 'Torbjorn', 'Symmetra', 'Reaper'],
    supports: ['Brigitte', 'Kiriko', 'Baptiste', 'Moira', 'Ana'],
    winCondition: 'Ceder un poco de espacio, forzar el engage rival y responder con peel, burst y limpieza de cooldowns.',
    avoidWhen: 'Si necesitas atacar una posicion poke muy abierta y tu comp no tiene forma de iniciar.',
  },
}

const STYLE_ORDER: TeamCompStyle[] = ['dive', 'poke', 'rush', 'brawl', 'flyers', 'anti-dive']

export function getTeamCompHero(slug: string) {
  return TEAM_COMP_HEROES.find(hero => hero.slug === slug) ?? null
}

export function getTeamCompsForHero(slug: string, format?: TeamCompFormat, style?: TeamCompStyle | 'all') {
  const hero = getTeamCompHero(slug)
  if (!hero) return []

  return STYLE_ORDER
    .filter(styleName => !style || style === 'all' || styleName === style)
    .flatMap(styleName => {
      const formats: TeamCompFormat[] = format ? [format] : ['5v5', '6v6']
      return formats.map(compFormat => buildRecommendation(hero, STYLE_TEMPLATES[styleName], compFormat))
    })
}

export function bestDefaultStyle(hero: CounterHero): TeamCompStyle {
  if (['winston', 'dva', 'doomfist', 'wrecking-ball', 'tracer', 'genji', 'sombra', 'echo', 'kiriko', 'lucio', 'juno'].includes(hero.slug)) return 'dive'
  if (['sigma', 'orisa', 'ashe', 'widowmaker', 'hanzo', 'sojourn', 'baptiste', 'illari', 'zenyatta', 'emre'].includes(hero.slug)) return 'poke'
  if (['pharah', 'echo', 'mercy', 'anran'].includes(hero.slug)) return 'flyers'
  if (['brigitte', 'torbjorn', 'symmetra', 'cassidy', 'mei'].includes(hero.slug)) return 'anti-dive'
  return hero.role === 'tank' ? 'brawl' : 'rush'
}

export function teamCompPageTitle(hero: CounterHero) {
  return `Composiciones con ${hero.name} en Overwatch: equipos 5v5 y 6v6`
}

export function teamCompPageDescription(hero: CounterHero) {
  return `Composiciones de Overwatch con ${hero.name}: equipos recomendados para 5v5 y 6v6, sinergias, alternativas y cuando evitar cada comp.`
}

function buildRecommendation(hero: CounterHero, template: TeamCompTemplate, format: TeamCompFormat): TeamCompRecommendation {
  const tankSlots = format === '6v6' ? 2 : 1
  const dpsSlots = 2
  const supportSlots = 2
  const poolsByRole: Record<CounterRole, keyof Pick<TeamCompTemplate, 'tanks' | 'dps' | 'supports'>> = {
    tank: 'tanks',
    dps: 'dps',
    support: 'supports',
  }
  const forcedRole = poolsByRole[hero.role]

  const tanks = fillSlots(template.tanks, forcedRole === 'tanks' ? hero.name : null, tankSlots)
  const dps = fillSlots(template.dps, forcedRole === 'dps' ? hero.name : null, dpsSlots)
  const supports = fillSlots(template.supports, forcedRole === 'supports' ? hero.name : null, supportSlots)
  const picked = new Set([...tanks, ...dps, ...supports])
  const alternatives = [...template.tanks, ...template.dps, ...template.supports]
    .filter(name => name !== hero.name && !picked.has(name))
    .slice(0, 5)

  return {
    id: `${format}-${template.style}-${hero.slug}`,
    hero,
    format,
    style: template.style,
    title: `${template.title} con ${hero.name}`,
    description: template.description,
    tanks,
    dps,
    supports,
    alternatives,
    winCondition: template.winCondition,
    avoidWhen: template.avoidWhen,
  }
}

function fillSlots(pool: string[], forced: string | null, slots: number) {
  const values = forced ? [forced] : []
  for (const candidate of pool) {
    if (values.length >= slots) break
    if (!values.includes(candidate)) values.push(candidate)
  }
  return values
}
