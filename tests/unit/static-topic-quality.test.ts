import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { StaticEditorialReview } from '@/lib/static-editorial-review'

// Synthetic approval belongs to this isolated test, not the public registry.
const registry = vi.hoisted(() => ({} as Record<string, StaticEditorialReview>))
vi.mock('@/lib/static-editorial-reviews', () => ({ STATIC_EDITORIAL_REVIEWS: registry }))

import { editorialTopicQualityDecision, topicQualityDecision } from '@/lib/indexing-policy'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { getHeroPillar } from '@/lib/hero-pillars'
import { staticEditorialContentVersion } from '@/lib/static-editorial-review'

function approve(path: string, content: unknown) {
  registry[path] = {
    path, version: staticEditorialContentVersion(path, content),
    reviewedAt: '2026-10-02', reviewer: 'test-fixture', evidence: 'docs/content-review-fade-wraith-2026-10-02.md',
    checks: { specific: true, accurate: true, links: true, visual: true },
  }
}

beforeEach(() => { for (const key of Object.keys(registry)) delete registry[key] })

describe('static topic publication checks', () => {
  it('a public hero slug is not approval, and edits invalidate an exact hero review', () => {
    const article = getHeroPillar('ana')!
    expect(topicQualityDecision('hero', 'ana').indexable).toBe(false)
    approve('/heroes/ana', article)
    expect(topicQualityDecision('hero', 'ana')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(editorialTopicQualityDecision('hero', 'ana', { ...article, h1: 'Changed' }).indexable).toBe(false)
    const unlisted = { ...article, slug: 'moira' }
    approve('/heroes/moira', unlisted)
    expect(editorialTopicQualityDecision('hero', 'moira', unlisted).indexable).toBe(false)
    expect(topicQualityDecision('hero', 'shion').indexable).toBe(false)
  })

  it('hero review cannot bypass missing decisions, dates or internal text', () => {
    const original = getHeroPillar('ana')!
    for (const article of [
      { ...original, headerTips: [] }, { ...original, quickAnswers: [] },
      { ...original, abilities: [] }, { ...original, rankedPlan: [] },
      { ...original, checklist: [] }, { ...original, faqs: [] },
      { ...original, publishedAt: undefined }, { ...original, schemaDate: '2026-02-30' },
      { ...original, schemaDate: '2026-06-25' }, { ...original, intro: ['TITLE SEO: instrucciones internas'] },
    ]) {
      approve('/heroes/ana', article)
      expect(editorialTopicQualityDecision('hero', 'ana', article).indexable).toBe(false)
    }
  })
  it('never indexes a trial-kit hero or counter even with exact review and an otherwise publishable slug', () => {
    const article = { ...getCounterPillar('ana')!, analysisStatus: 'trial' as const }
    approve('/counters/ana', article)
    expect(editorialTopicQualityDecision('counter', 'ana', article)).toMatchObject({ indexable: false, adsAllowed: false })
    const hero = { ...getHeroPillar('ana')!, analysisStatus: 'trial' as const }
    approve('/heroes/ana', hero)
    expect(editorialTopicQualityDecision('hero', 'ana', hero)).toMatchObject({ indexable: false, adsAllowed: false })
    expect(topicQualityDecision('role', 'flex')).toMatchObject({ indexable: false, adsAllowed: false })
  })
  it('composition approval cannot bypass invalid teams, dates, empty decisions or repeated paragraphs', () => {
    const original = getTeamCompPillar('tracer')!
    const first = original.compositions[0]
    const variants = [
      { ...original, schemaDate: '2026-02-30' },
      { ...original, publishedDate: '2026-10-06' },
      { ...original, responsibilities: [{ title: '', body: 'Decisión concreta' }] },
      { ...original, summary: [' '] },
      { ...original, rotationPlan: [] },
      { ...original, checklist: [''] },
      { ...original, examples: [] },
      { ...original, links: [{ href: '//example.com', label: 'Fuera' }, ...original.links.slice(1)] },
      { ...original, intro: [original.intro[0], original.intro[0]] },
      { ...original, compositions: [] },
      { ...original, compositions: [{ ...first, winCondition: '' }] },
      { ...original, compositions: [{ ...first, lineup: first.lineup.slice(1) }] },
      { ...original, compositions: [{ ...first, lineup: ['Winston', 'Tracer', 'Tracer', 'Ana', 'Kiriko'] }] },
      { ...original, compositions: [{ ...first, lineup: ['Winston', 'Tracer', 'Genji', 'Cassidy', 'Kiriko'] }] },
      { ...original, compositions: [{ ...first, lineup: ['Winston', 'Tracer', 'Genji', 'No existe', 'Kiriko'] }] },
    ]
    for (const article of variants) {
      approve('/team-comps/tracer', article)
      expect(editorialTopicQualityDecision('team_comp', 'tracer', article)).toMatchObject({ indexable: false, adsAllowed: false })
    }
    for (const slug of ['tracer', 'zarya']) {
      const article = getTeamCompPillar(slug)!
      approve(`/team-comps/${slug}`, article)
      expect(editorialTopicQualityDecision('team_comp', slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
    }
  })
  for (const [kind, prefix, getArticle] of [
    ['counter', 'counters', getCounterPillar],
    ['team_comp', 'team-comps', getTeamCompPillar],
  ] as const) {
    it(`${kind} needs both an exact review and publication intent`, () => {
      const article = getArticle('ana')!
      const path = `/${prefix}/ana`
      expect(topicQualityDecision(kind, 'ana').indexable).toBe(false)
      approve(path, article)
      expect(topicQualityDecision(kind, 'ana')).toMatchObject({ indexable: true, adsAllowed: false })
      expect(editorialTopicQualityDecision(kind, 'ana', { ...article, h1: 'Changed' }).indexable).toBe(false)
      expect(editorialTopicQualityDecision(kind, 'ana', { ...article, links: [] }).indexable).toBe(false)
      const unlisted = getArticle('moira')!
      approve(`/${prefix}/moira`, unlisted)
      expect(editorialTopicQualityDecision(kind, 'moira', unlisted).indexable).toBe(false)
    })
    it(`${kind} still rejects incomplete or internal text even with a matching test review`, () => {
      for (const article of [
        { ...getArticle('ana')!, seoTitle: '' },
        { ...getArticle('ana')!, faqs: [] },
        { ...getArticle('ana')!, intro: ['TITLE SEO: instrucciones internas'] },
      ]) {
        approve(`/${prefix}/ana`, article)
        expect(editorialTopicQualityDecision(kind, 'ana', article).indexable).toBe(false)
      }
    })
  }
})
