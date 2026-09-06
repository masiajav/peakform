import assert from 'node:assert/strict'
import test from 'node:test'

import { getPickRecommendations } from '../src/lib/picker-engine.js'

test('returns three picks for the selected role ordered by score', () => {
  const recommendations = getPickRecommendations({
    role: 'support',
    map: 'kings-row',
    allies: ['reinhardt', 'mei', 'cassidy', 'lucio'],
    enemies: ['winston', 'tracer'],
  })

  assert.equal(recommendations.length, 3)
  assert.ok(recommendations.every(({ hero }) => hero.role === 'support'))
  assert.ok(recommendations[0].score >= recommendations[1].score)
  assert.ok(recommendations[1].score >= recommendations[2].score)
})

test('prioritizes hitscan answers into Pharah and Mercy', () => {
  const recommendations = getPickRecommendations({
    role: 'dps',
    map: 'circuit-royal',
    allies: ['sigma', 'baptiste', 'zenyatta'],
    enemies: ['pharah', 'mercy'],
  })

  const expectedAnswers = new Set(['ashe', 'cassidy', 'soldier-76', 'widowmaker'])
  assert.ok(recommendations.every(({ hero }) => expectedAnswers.has(hero.slug)))
  assert.ok(recommendations.some(({ counters }) => counters.some(({ slug }) => slug === 'pharah')))
})

test('recommends a brawl support when only allied information is known', () => {
  const recommendations = getPickRecommendations({
    role: 'support',
    map: 'lijiang-tower',
    allies: ['reinhardt', 'mei', 'reaper'],
    enemies: [],
  })

  assert.equal(recommendations[0].hero.slug, 'lucio')
  assert.match(recommendations[0].reasons[0], /Sinergia directa/)
})

test('never recommends a hero already selected by an ally', () => {
  const recommendations = getPickRecommendations({
    role: 'support',
    map: 'kings-row',
    allies: ['lucio'],
    enemies: [],
  })

  assert.ok(recommendations.every(({ hero }) => hero.slug !== 'lucio'))
})
