import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { discoverableGuides, repositoryGuideSearchCards } from '@/lib/guide-discovery'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { guideQualityDecision, isGuideSitemapEligible, PILLAR_GUIDE_SLUGS } from '@/lib/indexing-policy'
import { applyReviewedGuideRevision, hasReviewedGuideRevision, reviewedGuideTarget } from '@/lib/reviewed-guide-revisions'
import type { GuideContent } from '@/lib/content'
import { guideEditorial } from '@/lib/guide-editorial'
import { rankedHeroGuides } from '@/lib/ranked-hero-guides'

const oldSlug = 'como-mejorar-en-overwatch-revisando-vod'
const target = 'review-vod-overwatch-espanol'
const oldGuide: GuideContent = {
  id: 'original-vod-record', slug: oldSlug, title: 'VOD antigua', body: 'Contenido original almacenado',
  category: 'Fundamentos', published: true, author: 'Replaid Lab',
  created_at: '2026-06-21T12:10:02.805891+02:00', updated_at: '2026-06-28T18:39:29.578534+02:00',
}

describe('VOD guide consolidation', () => {
  it('keeps ranked recommendation titles distinct from their SEO titles without stale database summaries', () => {
    for (const guide of rankedHeroGuides) {
      const stored = { ...oldGuide, slug: guide.slug, title: 'Título anterior', seo_title: 'SEO anterior', seo_description: 'Resumen anterior' }
      const before = structuredClone(stored)
      expect(guideEditorial(stored)).toEqual({ title: guide.title, seoTitle: guide.seoTitle, description: guide.seoDescription })
      expect(guideEditorial(discoverableGuides([stored])[0])).toEqual(guideEditorial(stored))
      expect(stored).toEqual(before)
    }
  })
  it('uses a single permanent redirect to the existing, independently reviewed article', async () => {
    const config = createRequire(import.meta.url)('../../next.config.js')
    const redirects = await config.redirects()
    expect(redirects.filter((rule: { source: string }) => rule.source === `/guides/${oldSlug}`)).toEqual([
      { source: `/guides/${oldSlug}`, destination: `/guides/${target}`, permanent: true },
    ])
    expect(redirects.some((rule: { source: string }) => rule.source === `/guides/${target}`)).toBe(false)
    expect(reviewedGuideTarget(oldSlug)).toBe(target)
    expect(reviewedGuideTarget(target)).toBeUndefined()
    expect(reviewedGuideTarget('toString')).toBeUndefined()
    expect(reviewedGuideTarget('como-mejorar-en-overwatch-revisando-vod-extra')).toBeUndefined()
    expect(hasReviewedGuideRevision(oldSlug)).toBe(false)
    expect(guideQualityDecision({ slug: target })).toMatchObject({ indexable: true, adsAllowed: true })
  })

  it('preserves the stored record and dates instead of presenting a fake fresh revision', () => {
    const before = structuredClone(oldGuide)
    expect(applyReviewedGuideRevision(oldGuide)).toBe(oldGuide)
    expect(discoverableGuides([oldGuide])).toEqual([])
    expect(isGuideSitemapEligible(oldGuide)).toBe(false)
    expect(guideQualityDecision(oldGuide)).toMatchObject({ indexable: false, adsAllowed: false })
    expect(PILLAR_GUIDE_SLUGS).not.toContain(oldSlug)
    expect(oldGuide).toEqual(before)
    expect(evergreenGuides[target]).toMatchObject({ publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-17', notebookVersion: 1 })
  })

  it('keeps the actual VOD article available to text search without the stale duplicate', () => {
    const cards = repositoryGuideSearchCards()
    expect(new Set(cards.map(card => card.slug)).size).toBe(cards.length)
    expect(cards.some(card => card.slug === oldSlug)).toBe(false)
    expect(cards.find(card => card.slug === target)).toMatchObject({
      slug: target, title: evergreenGuides[target].title,
      seo_description: evergreenGuides[target].seoDescription, excerpt: evergreenGuides[target].quickAnswer,
      author: 'Replaid Lab', created_at: '2026-08-29', updated_at: '2026-10-17', category: 'Revisión de VOD',
    })
    expect(cards.find(card => card.slug === target)?.body).toContain(evergreenGuides[target].sections[2].body[0])
  })

  it('consolidates the stale composition guide without changing its stored history or renewing the destination', async () => {
    const slug = 'como-elegir-composicion-dive-poke-brawl'
    const destination = 'composiciones-overwatch-5v5-6v6'
    const stored = { ...oldGuide, slug, title: 'Composición antigua' }
    const config = createRequire(import.meta.url)('../../next.config.js')
    expect(await config.redirects()).toContainEqual({ source: `/guides/${slug}`, destination: `/guides/${destination}`, permanent: true })
    expect(reviewedGuideTarget(slug)).toBe(destination)
    expect(reviewedGuideTarget(destination)).toBeUndefined()
    expect(applyReviewedGuideRevision(stored)).toBe(stored)
    expect(discoverableGuides([stored])).toEqual([])
    expect(isGuideSitemapEligible(stored)).toBe(false)
    expect(guideQualityDecision(stored)).toMatchObject({ indexable: false, adsAllowed: false })
    expect(evergreenGuides[destination]).toMatchObject({ publishedAtIso: '2026-08-29', modifiedAtIso: '2026-10-10' })
    expect(guideQualityDecision({ slug: destination })).toMatchObject({ indexable: true, adsAllowed: true })
  })

  it('gives curated search cards specific categories without republishing a consolidated slug', () => {
    const cards = repositoryGuideSearchCards()
    const composition = cards.find(card => card.slug === 'composiciones-overwatch-5v5-6v6')!
    expect(composition.category).toBe('Composiciones')
    expect(composition.body).toContain('Sombra no es un tercer DPS')
    expect(cards.some(card => card.slug === 'como-elegir-composicion-dive-poke-brawl')).toBe(false)
    expect(cards.filter(card => card.category === 'Revisión de VOD').map(card => card.slug)).toEqual([target])
  })
})
