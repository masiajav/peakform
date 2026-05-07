import { toSlug } from './content'

export type CounterRole = 'tank' | 'dps' | 'support'

export interface CounterPick {
  slug: string
  name: string
  reason: string
}

export interface CounterHero {
  slug: string
  name: string
  role: CounterRole
  guideSlug: string
  counters: CounterPick[]
  watchOutFor: CounterPick[]
  related: string[]
}

const heroSeeds = [
  ['Ana', 'support'],
  ['Anran', 'tank'],
  ['Ashe', 'dps'],
  ['Baptiste', 'support'],
  ['Bastion', 'dps'],
  ['Brigitte', 'support'],
  ['Cassidy', 'dps'],
  ['D.Va', 'tank'],
  ['Domina', 'support'],
  ['Doomfist', 'tank'],
  ['Echo', 'dps'],
  ['Emre', 'dps'],
  ['Freja', 'dps'],
  ['Genji', 'dps'],
  ['Hanzo', 'dps'],
  ['Hazard', 'tank'],
  ['Illari', 'support'],
  ['Jetpack Cat', 'support'],
  ['Junker Queen', 'tank'],
  ['Junkrat', 'dps'],
  ['Juno', 'support'],
  ['Kiriko', 'support'],
  ['Lifeweaver', 'support'],
  ['Lucio', 'support'],
  ['Mauga', 'tank'],
  ['Mei', 'dps'],
  ['Mercy', 'support'],
  ['Mizuki', 'support'],
  ['Moira', 'support'],
  ['Orisa', 'tank'],
  ['Pharah', 'dps'],
  ['Ramattra', 'tank'],
  ['Reaper', 'dps'],
  ['Reinhardt', 'tank'],
  ['Roadhog', 'tank'],
  ['Sierra', 'dps'],
  ['Sigma', 'tank'],
  ['Sojourn', 'dps'],
  ['Soldier-76', 'dps'],
  ['Sombra', 'dps'],
  ['Symmetra', 'dps'],
  ['Torbjorn', 'dps'],
  ['Tracer', 'dps'],
  ['Vendetta', 'dps'],
  ['Venture', 'dps'],
  ['Widowmaker', 'dps'],
  ['Winston', 'tank'],
  ['Wrecking Ball', 'tank'],
  ['Wuyang', 'support'],
  ['Zarya', 'tank'],
  ['Zenyatta', 'support'],
] as const

const counterMatrix: Record<string, string[]> = {
  ana: ['winston', 'ramattra', 'echo', 'pharah', 'tracer', 'kiriko'],
  anran: ['zarya', 'mei', 'reaper', 'pharah', 'kiriko', 'jetpack-cat'],
  ashe: ['zarya', 'reinhardt', 'genji', 'tracer', 'widowmaker', 'ana', 'kiriko'],
  baptiste: ['winston', 'dva', 'cassidy', 'ashe', 'mei', 'lucio'],
  bastion: ['zarya', 'orisa', 'junkrat', 'pharah', 'genji', 'tracer', 'ana'],
  brigitte: ['reinhardt', 'roadhog', 'pharah', 'echo', 'junkrat'],
  cassidy: ['reinhardt', 'winston', 'genji', 'ana'],
  dva: ['zarya', 'winston', 'symmetra', 'sojourn', 'bastion', 'moira'],
  domina: ['winston', 'ramattra', 'mauga', 'bastion', 'sojourn', 'reaper', 'moira', 'lucio'],
  doomfist: ['orisa', 'sombra', 'tracer', 'bastion', 'genji', 'ana', 'brigitte'],
  echo: ['winston', 'zarya', 'ashe', 'cassidy', 'soldier-76', 'widowmaker'],
  emre: ['dva', 'winston', 'genji', 'venture', 'vendetta', 'sombra'],
  freja: ['dva', 'widowmaker', 'cassidy', 'soldier-76', 'tracer', 'genji', 'ana'],
  genji: ['winston', 'zarya', 'symmetra', 'mei', 'moira', 'ana'],
  hanzo: ['dva', 'wrecking-ball', 'widowmaker', 'genji', 'lucio'],
  hazard: ['reinhardt', 'zarya', 'sombra', 'widowmaker', 'hanzo', 'soldier-76', 'ana', 'zenyatta'],
  illari: ['orisa', 'zarya', 'dva', 'cassidy', 'ashe', 'widowmaker', 'baptiste', 'lifeweaver', 'lucio'],
  'jetpack-cat': ['domina', 'mauga', 'soldier-76', 'emre', 'ashe', 'cassidy', 'baptiste', 'juno'],
  'junker-queen': ['wrecking-ball', 'widowmaker', 'soldier-76', 'hanzo', 'ana', 'lucio', 'kiriko'],
  junkrat: ['zarya', 'wrecking-ball', 'cassidy', 'soldier-76', 'lucio', 'brigitte', 'lifeweaver'],
  juno: ['dva', 'winston', 'reinhardt', 'sombra', 'soldier-76', 'widowmaker', 'lucio', 'ana'],
  kiriko: ['roadhog', 'winston', 'tracer', 'sombra', 'genji', 'mei'],
  lifeweaver: ['roadhog', 'dva', 'sombra', 'soldier-76', 'lucio'],
  lucio: ['winston', 'roadhog', 'soldier-76', 'cassidy', 'symmetra', 'torbjorn', 'mei', 'moira'],
  mauga: ['doomfist', 'wrecking-ball', 'mauga', 'sombra', 'reaper', 'widowmaker', 'zenyatta', 'kiriko'],
  mei: ['dva', 'sombra', 'pharah', 'echo', 'kiriko'],
  mercy: ['winston', 'roadhog', 'echo', 'cassidy', 'widowmaker', 'genji', 'tracer'],
  mizuki: ['pharah', 'echo', 'jetpack-cat', 'juno'],
  moira: ['roadhog', 'zarya', 'echo', 'pharah', 'widowmaker', 'junkrat', 'mei', 'ashe', 'ana'],
  orisa: ['zarya', 'dva', 'mei', 'echo', 'moira'],
  pharah: ['dva', 'roadhog', 'mauga', 'soldier-76', 'cassidy', 'ashe', 'widowmaker', 'baptiste'],
  ramattra: ['roadhog', 'reaper', 'tracer', 'pharah', 'genji', 'cassidy', 'kiriko'],
  reaper: ['zarya', 'pharah', 'echo', 'junkrat', 'widowmaker', 'ana'],
  reinhardt: ['sombra', 'cassidy', 'mei', 'junkrat', 'pharah', 'zenyatta'],
  roadhog: ['wrecking-ball', 'roadhog', 'reaper', 'echo', 'junkrat', 'ana'],
  sierra: ['dva', 'sigma', 'hazard', 'zarya', 'soldier-76', 'cassidy', 'ashe', 'kiriko', 'moira', 'ana'],
  sigma: ['ramattra', 'roadhog', 'genji', 'tracer', 'sombra', 'lucio'],
  sojourn: ['winston', 'mauga', 'genji', 'tracer', 'lucio'],
  'soldier-76': ['roadhog', 'ashe', 'cassidy', 'genji', 'junkrat', 'ana', 'lucio'],
  sombra: ['widowmaker', 'pharah', 'junkrat', 'hanzo', 'mei', 'kiriko', 'ana'],
  symmetra: ['winston', 'mauga', 'pharah', 'junkrat', 'echo'],
  torbjorn: ['dva', 'junkrat', 'ashe'],
  tracer: ['winston', 'mauga', 'symmetra', 'torbjorn', 'mei', 'brigitte', 'moira'],
  vendetta: ['orisa', 'cassidy', 'pharah', 'jetpack-cat', 'mizuki', 'ana'],
  venture: ['reinhardt', 'sigma', 'zarya', 'dva', 'pharah', 'soldier-76', 'mei', 'widowmaker', 'ana'],
  widowmaker: ['dva', 'winston', 'genji', 'tracer', 'sombra', 'zenyatta'],
  winston: ['zarya', 'junkrat', 'pharah', 'bastion', 'ana', 'brigitte'],
  'wrecking-ball': ['roadhog', 'doomfist', 'mei', 'sombra', 'ana', 'brigitte'],
  wuyang: ['winston', 'dva', 'genji', 'junkrat', 'reaper', 'freja', 'ana'],
  zarya: ['dva', 'hanzo', 'widowmaker', 'cassidy', 'tracer', 'zenyatta'],
  zenyatta: ['dva', 'zarya', 'junkrat', 'pharah', 'cassidy', 'widowmaker', 'ashe', 'hanzo', 'tracer', 'kiriko'],
}

const nameBySlug = Object.fromEntries(heroSeeds.map(([name]) => [heroSlug(name), name]))

export const COUNTER_HEROES: CounterHero[] = heroSeeds.map(([name, role]) => {
  const slug = heroSlug(name)
  const counters = (counterMatrix[slug] ?? []).slice(0, 4).map(counterSlug => pick(counterSlug, slug))
  const watchOutFor = (counterMatrix[slug] ?? []).slice(4, 8).map(counterSlug => pick(counterSlug, slug))

  return {
    slug,
    name,
    role,
    guideSlug: `${slug}-guia-video-overwatch`,
    counters,
    watchOutFor: watchOutFor.length > 0 ? watchOutFor : counters.slice(0, 3),
    related: relatedForRole(role, slug),
  }
})

export function getCounterHero(slug: string) {
  return COUNTER_HEROES.find(hero => hero.slug === slug) ?? null
}

function pick(counterSlug: string, targetSlug: string): CounterPick {
  return {
    slug: counterSlug,
    name: nameBySlug[counterSlug] ?? counterSlug,
    reason: reasonFor(counterSlug, targetSlug),
  }
}

function reasonFor(counterSlug: string, targetSlug: string) {
  const target = nameBySlug[targetSlug] ?? targetSlug
  const specific: Record<string, string> = {
    ana: `Sleep y granada anti-curacion castigan las ventanas de ${target}.`,
    kiriko: `Suzu limpia efectos clave y niega la condicion de victoria de ${target}.`,
    zenyatta: `Discord reduce mucho el margen de error y acelera el focus sobre ${target}.`,
    lucio: `Speed, boop y movilidad rompen el ritmo que ${target} quiere imponer.`,
    moira: `Dano fiable, sustain y Fade castigan duelos largos contra ${target}.`,
    brigitte: `Peel, Inspire y Whip Shot frenan entradas y remates de ${target}.`,
    baptiste: `Immortality Field y dano hitscan estabilizan peleas contra ${target}.`,
    lifeweaver: `Reposiciona objetivos y niega picks cuando ${target} invierte recursos.`,
    juno: `Movilidad y velocidad dificultan que ${target} confirme objetivos.`,
    wuyang: `Sustain y movilidad le permiten sobrevivir a la presion de ${target}.`,
    'jetpack-cat': `Juega fuera de rango y obliga a ${target} a mirar verticalmente.`,
    dva: `Matrix, movilidad y peel niegan proyectiles o burst de ${target}.`,
    zarya: `Burbujas limpian presion, cargan energia y castigan dano predecible de ${target}.`,
    winston: `Dive directo fuerza cooldowns y expulsa a ${target} de posiciones comodas.`,
    roadhog: `Hook amenaza picks y castiga a ${target} si juega sin cobertura.`, 
    orisa: `Fortify, Javelin y presencia frontal cortan engages de ${target}.`,
    sigma: `Barrera y Grasp bloquean ventanas de dano y ultimates de ${target}.`,
    reinhardt: `Escudo y brawl cerrado reducen angulos y presionan a ${target}.`,
    ramattra: `Presion constante y forma Nemesis castigan posiciones estaticas de ${target}.`,
    mauga: `Dano sostenido y presencia frontal obligan a ${target} a ceder espacio.`,
    doomfist: `CC, movilidad y burst interrumpen el plan de pelea de ${target}.`,
    'wrecking-ball': `Movilidad y boops desordenan la posicion de ${target}.`,
    hazard: `Brawl y control de corto rango castigan rutas previsibles de ${target}.`,
    sombra: `Hack corta habilidades clave y convierte a ${target} en objetivo vulnerable.`,
    mei: `Muro, slow y sustain separan a ${target} de su equipo.`,
    symmetra: `Beam y torretas castigan movilidad corta y defensas que no bloquean rayos.`,
    torbjorn: `Torre y dano estable controlan flancos y entradas de ${target}.`,
    bastion: `Burst frontal derrite objetivos grandes o engages lineales de ${target}.`,
    junkrat: `Burst y spam de area castigan rutas cerradas o modelos grandes de ${target}.`,
    pharah: `Presion vertical obliga a ${target} a pelear fuera de su rango comodo.`,
    echo: `Movilidad aerea y burst castigan a ${target} desde angulos dificiles.`,
    ashe: `Hitscan, dinamita y rango medio-largo presionan a ${target} antes del engage.`,
    cassidy: `Burst fiable y granada castigan movilidad o entradas lineales de ${target}.`,
    'soldier-76': `Hitscan sostenido y Sprint mantienen presion constante sobre ${target}.`,
    widowmaker: `Rango extremo amenaza picks antes de que ${target} pueda ejecutar su plan.`,
    hanzo: `Burst y picks desde angulos castigan rotaciones previsibles de ${target}.`,
    tracer: `Movilidad y presion lateral fuerzan cooldowns defensivos de ${target}.`,
    genji: `Deflect, movilidad y resets castigan errores de posicion de ${target}.`,
    reaper: `Dano de corto rango y sustain ganan trades contra ${target} si entra cerca.`,
    venture: `Burst de corto rango y escape castigan objetivos sin control inmediato.`,
    freja: `Movilidad y pick potential dificultan que ${target} juegue a su ritmo.`,
    emre: `Presion movil obliga a ${target} a reposicionarse antes de encontrar valor.`,
    vendetta: `Amenaza cuerpo a cuerpo obliga a ${target} a guardar distancia o recursos.`,
  }

  return specific[counterSlug] ?? `Matchup favorable contra ${target} por rango, movilidad o control.`
}

function relatedForRole(role: CounterRole, slug: string) {
  const peers = heroSeeds
    .filter(([name, seedRole]) => seedRole === role && heroSlug(name) !== slug)
    .slice(0, 3)
    .map(([name]) => heroSlug(name))

  if (peers.length) return peers

  return heroSeeds
    .map(([name]) => heroSlug(name))
    .filter(heroSlugValue => heroSlugValue !== slug)
    .slice(0, 3)
}

function heroSlug(name: string) {
  if (name === 'D.Va') return 'dva'
  return toSlug(name)
}
