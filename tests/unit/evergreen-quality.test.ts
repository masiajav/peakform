import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { StaticEditorialReview } from '@/lib/static-editorial-review'

const registry = vi.hoisted(() => ({} as Record<string, StaticEditorialReview>))
vi.mock('@/lib/static-editorial-reviews', () => ({ STATIC_EDITORIAL_REVIEWS: registry }))
import { evergreenGuideQualityDecision, guideQualityDecision, isGuideAdEligible, isGuideSitemapEligible } from '@/lib/indexing-policy'
import { evergreenGuides, type EvergreenGuide } from '@/lib/evergreen-guides'
import { staticEditorialContentVersion } from '@/lib/static-editorial-review'

function approve(guide: EvergreenGuide) {
  const path = `/guides/${guide.slug}`
  registry[path] = {
    path, version: staticEditorialContentVersion(path, guide), reviewedAt: '2026-10-10',
    reviewer: 'Test fixture only', evidence: 'docs/test-editorial-review.md',
    checks: { specific: true, accurate: true, links: true, visual: true },
  }
}
beforeEach(() => { for (const path of Object.keys(registry)) delete registry[path] })

describe('evergreen exact-version publication', () => {
  for (const guide of Object.values(evergreenGuides)) {
    it(`${guide.slug} requires a review, not a route or database word count`, () => {
      const row = { slug: guide.slug, published: true, body: 'contenido '.repeat(3000) }
      expect(evergreenGuideQualityDecision(guide).indexable).toBe(false)
      expect(isGuideSitemapEligible(row)).toBe(false)
      expect(guideQualityDecision(row).indexable).toBe(false)
      approve(guide)
      expect(evergreenGuideQualityDecision(guide)).toMatchObject({ status: 'index_no_ads', indexable: true, adsAllowed: false })
      expect(guideQualityDecision(row)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(isGuideSitemapEligible(row)).toBe(true)
      expect(isGuideAdEligible(row)).toBe(false)
      expect(isGuideSitemapEligible({ ...row, published: false })).toBe(false)
      expect(guideQualityDecision({ ...row, published: false }).indexable).toBe(false)
    })
  }
  const guide = evergreenGuides['composiciones-overwatch-5v5-6v6']
  it('invalidates the review after edits to prose, metadata, links, FAQs or dates', () => {
    approve(guide)
    for (const changed of [
      { ...guide, seoTitle: 'Otro título' }, { ...guide, quickAnswer: 'Otra respuesta' },
      { ...guide, modifiedAtIso: '2026-10-11' }, { ...guide, links: guide.links.slice(1) },
      { ...guide, faqs: guide.faqs.slice(1) }, { ...guide, intro: ['contenido '.repeat(3000)] },
      { ...guide, sections: guide.sections.map((section, index) => index ? section : { ...section, body: ['Otro equipo'] }) },
    ]) expect(evergreenGuideQualityDecision(changed).indexable).toBe(false)
    expect(evergreenGuideQualityDecision(null).indexable).toBe(false)
    expect(evergreenGuideQualityDecision({ ...guide, slug: 'invented' }).indexable).toBe(false)
  })
  it('does not let a synthetic review bypass missing structure or invalid content', () => {
    for (const changed of [
      { ...guide, h1: '' }, { ...guide, sections: [] }, { ...guide, checklist: [] },
      { ...guide, faqs: [] }, { ...guide, intro: [] }, { ...guide, seoDescription: '' },
      { ...guide, sections: [{ title: 'Vacía', body: [] }, ...guide.sections] },
      { ...guide, publishedAtIso: '2026-02-30' }, { ...guide, modifiedAtIso: '2026-06-01' },
      { ...guide, intro: [guide.intro[0], guide.intro[0]] },
      { ...guide, intro: ['Title SEO: instrucciones'] },
      { ...guide, links: [{ href: '//external.example', label: 'Externo' }, ...guide.links] },
    ]) {
      approve(changed)
      expect(evergreenGuideQualityDecision(changed).indexable).toBe(false)
    }
  })
  it('has six distinct articles, honest dates and no old normal Hack recommendation', () => {
    const articles = Object.values(evergreenGuides)
    expect(articles).toHaveLength(6)
    const paragraphs = articles.flatMap(article => [...article.intro, ...article.sections.flatMap(section => section.body)])
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    expect(new Set(articles.map(article => article.seoTitle)).size).toBe(6)
    expect(new Set(articles.map(article => article.seoDescription)).size).toBe(6)
    for (const article of articles) {
      expect(article.modifiedAtIso).toBe('2026-10-10')
      expect(article.publishedAtIso).toBe(article.slug === 'como-mejorar-en-overwatch' ? '2026-06-01' : '2026-08-29')
    }
    expect(JSON.stringify(articles)).not.toMatch(/página interactiva|base evergreen|guía pilar|ventana ganadora|hackeas tarde/)
    expect(JSON.stringify(evergreenGuides['counters-overwatch-guia-completa'])).toContain('No bloquea habilidades ni reduce directamente la curación que recibe')
    expect(JSON.stringify(guide)).toContain('ni sustituye a Tracer dentro de los DPS')
    expect(JSON.stringify(guide)).toContain('no funciona como una barrera ni detiene haces o melee')
  })
})
