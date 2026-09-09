import { COUNTERED_BY, HEROES, SYNERGY_PAIRS, getHero, getMap } from './picker-data.js'

export function getPickRecommendations({ role = 'support', map = 'kings-row', allies = [], enemies = [] } = {}) {
  const selectedMap = getMap(map)
  const allyHeroes = allies.map(getHero).filter(Boolean)
  const enemyHeroes = enemies.map(getHero).filter(Boolean)

  return HEROES
    .filter((candidate) => candidate.role === role && !allies.includes(candidate.slug))
    .map((candidate) => scoreCandidate(candidate, selectedMap, allyHeroes, enemyHeroes))
    .sort((left, right) => right.score - left.score || right.synergy - left.synergy || left.hero.name.localeCompare(right.hero.name))
    .slice(0, 3)
}

export function scoreCandidate(candidate, selectedMap, allies, enemies) {
  const synergyDetails = allies.map((ally) => synergyBetween(candidate, ally))
  const pairMatches = synergyDetails.filter((detail) => detail.explicit).map((detail) => detail.hero)
  const sharedStyleMatches = synergyDetails.filter((detail) => detail.sharedStyles.length > 0).map((detail) => detail.hero)
  const synergyPoints = synergyDetails.reduce((total, detail) => total + detail.points, 0)
  const synergy = allies.length ? clamp(Math.round(38 + synergyPoints / allies.length), 0, 100) : 50

  const counters = enemies.filter((enemy) => (COUNTERED_BY[enemy.slug] ?? []).includes(candidate.slug))
  const threats = enemies.filter((enemy) => (COUNTERED_BY[candidate.slug] ?? []).includes(enemy.slug))
  const matchup = enemies.length ? clamp(50 + counters.length * 18 - threats.length * 15, 0, 100) : 50

  const mapStyles = candidate.styles.filter((style) => selectedMap.styles.includes(style))
  const mapFit = clamp(44 + mapStyles.length * 24, 0, 100)

  const score = enemies.length
    ? Math.round(synergy * 0.45 + matchup * 0.4 + mapFit * 0.15)
    : Math.round(synergy * 0.65 + mapFit * 0.35)

  return {
    hero: candidate,
    score,
    synergy,
    matchup,
    mapFit,
    counters,
    threats,
    reasons: buildReasons({ candidate, selectedMap, pairMatches, sharedStyleMatches, mapStyles, counters, threats, hasEnemies: enemies.length > 0 }),
  }
}

function synergyBetween(candidate, ally) {
  const sharedStyles = candidate.styles.filter((style) => ally.styles.includes(style))
  const explicit = hasPair(candidate.slug, ally.slug)
  return {
    hero: ally,
    explicit,
    sharedStyles,
    points: Math.min(34, sharedStyles.length * 10 + (explicit ? 18 : 0)),
  }
}

function hasPair(first, second) {
  return (SYNERGY_PAIRS[first] ?? []).includes(second) || (SYNERGY_PAIRS[second] ?? []).includes(first)
}

function buildReasons({ candidate, selectedMap, pairMatches, sharedStyleMatches, mapStyles, counters, threats, hasEnemies }) {
  const reasons = []

  if (pairMatches.length) {
    reasons.push(`Sinergia directa con ${names(pairMatches)}.`)
  } else if (sharedStyleMatches.length) {
    reasons.push(`Encaja en el plan de ${candidate.styles[0]} de ${names(sharedStyleMatches.slice(0, 2))}.`)
  } else {
    reasons.push('Opcion flexible para completar la composicion.')
  }

  if (counters.length) {
    reasons.push(`Buena respuesta contra ${names(counters)}.`)
  } else if (hasEnemies && threats.length) {
    reasons.push(`Cuidado: ${names(threats)} puede castigar este pick.`)
  } else if (hasEnemies) {
    reasons.push('Matchup estable: sin counter directo detectado.')
  }

  if (mapStyles.length) {
    reasons.push(`${selectedMap.name} favorece su estilo ${mapStyles.join('/')}.`)
  }

  return reasons.slice(0, 3)
}

function names(heroes) {
  return heroes.map((hero) => hero.name).join(', ')
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}
