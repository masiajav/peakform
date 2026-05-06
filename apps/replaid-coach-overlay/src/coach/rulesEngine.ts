import { findCounterPlan } from './counters'
import type { CoachRecommendation, FightState, MatchState, NormalizedGameEvent } from '../types'

export function buildRecommendation(state: MatchState): CoachRecommendation {
  const fightState = inferFightState(state)
  const primaryThreat = inferPrimaryThreat(state.recentEvents)
  const counterPlan = findCounterPlan(primaryThreat)
  const confidence = inferConfidence(state, primaryThreat)

  return {
    primaryThreat,
    fightState,
    recommendedSwap: counterPlan?.swaps[state.player.role] ?? counterPlan?.swaps.flex ?? null,
    playstyleAdjustment: buildAdjustment(fightState, counterPlan?.adjustment),
    ultimateAdvice: buildUltimateAdvice(fightState, state.eventsAvailable),
    confidence,
    reason: buildReason(state, fightState, primaryThreat, confidence),
    updatedAt: Date.now(),
  }
}

function inferFightState(state: MatchState): FightState {
  const swing = state.enemyDeaths - state.allyDeaths
  if (state.allyDeaths >= 2 && swing <= -2) return 'lost'
  if (state.enemyDeaths >= 2 && swing >= 2) return 'won'
  if (swing >= 1) return 'advantage'
  if (swing <= -1) return 'danger'
  if (!state.eventsAvailable) return 'reset'
  return 'neutral'
}

function inferPrimaryThreat(events: NormalizedGameEvent[]) {
  const threatScores = new Map<string, number>()

  for (const event of events) {
    if (!['kill', 'death'].includes(event.type)) continue
    const threat = event.team === 'enemy' || event.type === 'death' ? event.actor || event.hero : event.hero
    if (!threat) continue
    threatScores.set(threat, (threatScores.get(threat) ?? 0) + (event.type === 'death' ? 2 : 1))
  }

  const [topThreat] = [...threatScores.entries()].sort((a, b) => b[1] - a[1])[0] ?? []
  return topThreat ?? null
}

function inferConfidence(state: MatchState, primaryThreat: string | null) {
  let confidence = state.eventsAvailable ? 0.42 : 0.18
  if (state.recentEvents.length >= 4) confidence += 0.16
  if (state.allyDeaths || state.enemyDeaths) confidence += 0.16
  if (primaryThreat) confidence += 0.18
  if (state.player.role !== 'unknown') confidence += 0.08
  return Math.min(0.92, Number(confidence.toFixed(2)))
}

function buildAdjustment(fightState: FightState, counterAdjustment?: string) {
  if (fightState === 'lost') return 'Pelea perdida: sal vivo, agrupa y no conviertas una mala pelea en dos.'
  if (fightState === 'won') return 'Pelea ganada: toma espacio, pero no inviertas más recursos si el rival ya está limpiado.'
  if (counterAdjustment) return counterAdjustment
  if (fightState === 'danger') return 'Reduce ángulos abiertos y juega la próxima entrada con una salida clara.'
  if (fightState === 'advantage') return 'Mantén la ventaja sin perseguir demasiado; controla el objetivo y espera el siguiente error.'
  return 'No hay señal fuerte todavía. Prioriza información, cobertura y cooldowns defensivos.'
}

function buildUltimateAdvice(fightState: FightState, eventsAvailable: boolean) {
  if (!eventsAvailable) return 'Datos limitados: no hay recomendación fuerte de ultimate.'
  if (fightState === 'lost') return 'Guarda ultimate salvo que corte captura u overtime.'
  if (fightState === 'won') return 'No uses otra ultimate; obliga al rival a gastar para volver.'
  if (fightState === 'advantage') return 'Puedes guardar ultimate y ganar por ventaja numérica.'
  if (fightState === 'danger') return 'Usa defensiva solo si salva la pelea; si no, prepara reset.'
  return 'Busca forzar recursos antes de invertir ultimate.'
}

function buildReason(state: MatchState, fightState: FightState, primaryThreat: string | null, confidence: number) {
  if (!state.eventsAvailable) {
    return 'Overwolf no confirmó todas las features; la recomendación usa modo limitado y contexto manual.'
  }
  if (primaryThreat) {
    return `${primaryThreat} aparece como amenaza principal por eventos recientes. Estado de pelea: ${fightState}. Confianza ${Math.round(confidence * 100)}%.`
  }
  return `Estado de pelea inferido por bajas recientes: ${fightState}. Aún faltan eventos para aislar una amenaza.`
}
