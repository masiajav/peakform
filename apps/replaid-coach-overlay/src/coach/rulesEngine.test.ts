import { describe, expect, it } from 'vitest'
import { buildRecommendation } from './rulesEngine'
import { createInitialMatchState, reduceMatchState } from '../match/stateStore'
import type { NormalizedGameEvent } from '../types'

const baseEvent = (event: Partial<NormalizedGameEvent>): NormalizedGameEvent => ({
  id: event.id ?? Math.random().toString(36),
  type: event.type ?? 'kill',
  timestamp: event.timestamp ?? Date.now(),
  team: event.team ?? 'unknown',
  actor: event.actor,
  target: event.target,
  hero: event.hero,
  raw: event.raw,
})

it('marks advantage when allies get the first kill', () => {
  const state = reduceMatchState(
    { ...createInitialMatchState(), eventsAvailable: true, providerStatus: 'ready' },
    baseEvent({ type: 'kill', team: 'ally', actor: 'Player', target: 'Enemy Ana' }),
  )

  expect(buildRecommendation(state).fightState).toBe('advantage')
})

it('marks lost when allies lose two players without a trade', () => {
  const initial = { ...createInitialMatchState(), eventsAvailable: true, providerStatus: 'ready' as const }
  const afterFirst = reduceMatchState(initial, baseEvent({ type: 'death', team: 'ally', actor: 'Tracer', target: 'Player' }))
  const afterSecond = reduceMatchState(afterFirst, baseEvent({ type: 'death', team: 'ally', actor: 'Tracer', target: 'Support' }))

  const recommendation = buildRecommendation(afterSecond)

  expect(recommendation.fightState).toBe('lost')
  expect(recommendation.ultimateAdvice).toContain('Guarda ultimate')
})

it('raises a repeated enemy threat and recommends a counter by player role', () => {
  const initial = {
    ...createInitialMatchState(),
    eventsAvailable: true,
    providerStatus: 'ready' as const,
    player: { role: 'support' as const, hero: 'Ana' },
  }
  const afterFirst = reduceMatchState(initial, baseEvent({ type: 'death', team: 'ally', actor: 'Tracer', target: 'Player' }))
  const afterSecond = reduceMatchState(afterFirst, baseEvent({ type: 'death', team: 'ally', actor: 'Tracer', target: 'Kiriko' }))

  const recommendation = buildRecommendation(afterSecond)

  expect(recommendation.primaryThreat).toBe('Tracer')
  expect(recommendation.recommendedSwap).toBe('Brigitte')
  expect(recommendation.confidence).toBeGreaterThan(0.6)
})

it('uses low-confidence limited mode when provider features are unavailable', () => {
  const recommendation = buildRecommendation(createInitialMatchState())

  expect(recommendation.fightState).toBe('reset')
  expect(recommendation.confidence).toBeLessThan(0.3)
  expect(recommendation.reason).toContain('modo limitado')
})
