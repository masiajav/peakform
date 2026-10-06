import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { StaticEditorialReview } from '@/lib/static-editorial-review'

const registry = vi.hoisted(() => ({} as Record<string, StaticEditorialReview>))
vi.mock('@/lib/static-editorial-reviews', () => ({ STATIC_EDITORIAL_REVIEWS: registry }))
import { rankedGuideQualityDecision, guideQualityDecision, isGuideSitemapEligible, isGuideAdEligible } from '@/lib/indexing-policy'
import { rankedHeroGuides } from '@/lib/ranked-hero-guides'
import { staticEditorialContentVersion } from '@/lib/static-editorial-review'

const guide = rankedHeroGuides[0]
const path = `/guides/${guide.slug}`
function approve(content = guide) {
  registry[path] = {
    path, version: staticEditorialContentVersion(path, content),
    reviewedAt: '2026-10-05', reviewer: 'test-fixture', evidence: 'docs/content-research-ranked-2026-10-05.md',
    checks: { specific: true, accurate: true, links: true, visual: true },
  }
}
beforeEach(() => { for (const key of Object.keys(registry)) delete registry[key] })

describe('ranked guide exact-version publication gate', () => {
  it('a known route and a published database row cannot approve the rendered article', () => {
    expect(rankedGuideQualityDecision(guide)).toMatchObject({ indexable: false, adsAllowed: false })
    const row = { slug: guide.slug, published: true, body: 'contenido '.repeat(3000) }
    expect(isGuideSitemapEligible(row)).toBe(false)
    expect(guideQualityDecision(row).indexable).toBe(false)
    approve()
    expect(rankedGuideQualityDecision(guide)).toMatchObject({ status: 'index_no_ads', indexable: true, adsAllowed: false })
    expect(isGuideSitemapEligible(row)).toBe(true)
    expect(guideQualityDecision(row).adsAllowed).toBe(false)
    expect(isGuideAdEligible(row)).toBe(false)
    expect(isGuideSitemapEligible({ ...row, published: false })).toBe(false)
    expect(guideQualityDecision({ ...row, published: false }).indexable).toBe(false)
  })

  it('changes to prose, links, metadata or dates require a new individual review', () => {
    approve()
    for (const changed of [
      { ...guide, title: 'Otro título' }, { ...guide, seoDescription: 'Otra descripción' },
      { ...guide, quickAnswer: 'Otro resumen' }, { ...guide, modifiedAt: '2026-10-06' },
      { ...guide, intro: ['contenido '.repeat(3000)] }, { ...guide, links: guide.links.slice(1) },
    ]) expect(rankedGuideQualityDecision(changed).indexable).toBe(false)
    expect(rankedGuideQualityDecision(null).indexable).toBe(false)
    expect(rankedGuideQualityDecision({ ...guide, slug: 'invented-route' }).indexable).toBe(false)
  })

  it('a synthetic approval does not bypass broken structure, dates or internal text', () => {
    for (const changed of [
      { ...guide, seoTitle: '' }, { ...guide, faqs: [] }, { ...guide, vodQuestions: [] },
      { ...guide, checklist: [] }, { ...guide, intro: [] }, { ...guide, sections: [] },
      { ...guide, sections: [{ title: 'Vacía', paragraphs: [] }, ...guide.sections] },
      { ...guide, publishedAt: '2026-02-30' }, { ...guide, modifiedAt: '2026-06-20' },
      { ...guide, intro: [guide.intro[0], guide.intro[0]] },
      { ...guide, intro: ['TITLE SEO: instrucciones internas'] },
      { ...guide, links: [{ href: '//external.example', label: 'Externo' }, ...guide.links] },
    ]) {
      approve(changed)
      expect(rankedGuideQualityDecision(changed).indexable).toBe(false)
    }
  })

  it('has seven distinct ranked articles, not repeated paragraphs or a second allied Tank in 5v5', () => {
    expect(rankedHeroGuides).toHaveLength(7)
    const paragraphs = rankedHeroGuides.flatMap(article => [...article.intro, ...article.sections.flatMap(section => section.paragraphs)])
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    for (const article of rankedHeroGuides) {
      expect(article.publishedAt).toBe('2026-06-21')
      expect(article.modifiedAt).toBe('2026-10-05')
      expect(article.faqs).toHaveLength(4)
      expect(article.sections).toHaveLength(5)
      expect(article.links.some(link => link.href === '/guides/como-mejorar-en-overwatch-revisando-vod')).toBe(true)
    }
    expect(JSON.stringify(rankedHeroGuides)).not.toMatch(/tu Winston entra|La burbuja corta relaciones|Jump Pack tardará más|dos cooldowns para regresar|limpiar Earthshatter/)
  })
})
