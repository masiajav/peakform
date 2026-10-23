import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import TankPage, { generateMetadata as tankMetadata } from '@/app/guides/como-mejorar-como-tank-overwatch/page'
import UltimatePage, { generateMetadata as ultimateMetadata } from '@/app/guides/como-usar-ultimates-overwatch/page'
import SwapPage, { generateMetadata as swapMetadata } from '@/app/guides/cuando-cambiar-de-heroe-overwatch/page'
import { reviewedRankedFundamentals, reviewedTankGuide, reviewedUltimateGuide, reviewedHeroSwapGuide } from '@/lib/reviewed-ranked-fundamentals'
import { discoverableGuides } from '@/lib/guide-discovery'
import { guideEditorial } from '@/lib/guide-editorial'
import { evergreenGuideQualityDecision, guidePublicationIssues } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'
import type { GuideContent } from '@/lib/content'

describe('individual Tank, ultimate and swap revisions', () => {
  for (const [index, Page] of [TankPage, UltimatePage, SwapPage].entries()) {
    const guide = reviewedRankedFundamentals[index]
    const loadMetadata = [tankMetadata, ultimateMetadata, swapMetadata][index]
    it(`${guide.slug} keeps publication history and renders actual content and schemas without database access`, async () => {
      const metadata = await loadMetadata()
      expect(guide.publishedAtIso).toBe(index === 0 ? '2026-06-21' : '2026-06-28')
      expect(guide.modifiedAtIso).toBe('2026-10-18')
      expect(metadata.alternates?.canonical).toBe(`https://www.replaidlab.com/guides/${guide.slug}`)
      const html = renderToStaticMarkup(await Page())
      expect([...html.matchAll(/<h1\b/g)]).toHaveLength(1)
      expect(html).toContain(guide.h1)
      expect(html).toContain(guide.quickAnswer)
      expect(html).not.toMatch(/__editorial_review_|adsbygoogle|Enlaces internos|TITLE SEO|META DESCRIPTION/)
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
      expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: guide.publishedAtIso, dateModified: guide.modifiedAtIso, author: { '@type': 'Organization', name: 'Replaid Lab' } }))
      expect(schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity).toEqual(guide.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })))
    })
    it(`${guide.slug} updates discovered cards without overwriting the original database record`, () => {
      const stored: GuideContent = { id: `old-${index}`, slug: guide.slug, title: 'Antiguo', body: 'Regla anterior.', category: 'Fundamentos', role: index === 0 ? 'tank' : 'flex', created_at: guide.publishedAtIso, updated_at: '2026-06-28', published: true }
      const before = structuredClone(stored)
      const [card] = discoverableGuides([stored])
      expect(card).toMatchObject({ id: stored.id, slug: stored.slug, created_at: stored.created_at, category: stored.category, role: stored.role, title: guide.title, seo_description: guide.seoDescription, excerpt: guide.quickAnswer, updated_at: '2026-10-18' })
      expect(guideEditorial(stored)).toEqual({ title: guide.title, seoTitle: guide.seoTitle, description: guide.seoDescription })
      expect(stored).toEqual(before)
      expect(discoverableGuides([{ ...stored, published: false }])).toEqual([])
      expect(evergreenGuideQualityDecision(guide)).toMatchObject({ indexable: hasCurrentStaticEditorialReview(`/guides/${guide.slug}`, guide), adsAllowed: false })
      expect(evergreenGuideQualityDecision({ ...guide, quickAnswer: 'Texto no revisado' })).toMatchObject({ indexable: false, adsAllowed: false })
    })
  }

  it('teaches Tank choices without mandatory speed, constant healing vision or waiting forever for Sleep', () => {
    const body = JSON.stringify(reviewedTankGuide)
    for (const phrase of ['Perder visión un momento', 'No necesitas tener a Lúcio', 'No tienes que esperar siempre', 'overtime', 'dos Tanks', 'Gibraltar', 'King’s Row']) expect(body).toContain(phrase)
    expect(body).not.toMatch(/durante siete partidas|Entra para forzar, sal para repetir|No entro si mis supports no me ven/)
  })
  it('distinguishes resources, known information, overtime, missed opportunities and complementary combos', () => {
    const body = JSON.stringify(reviewedUltimateGuide)
    for (const phrase of ['no por el combo', 'no cubre una secuencia completa', 'otra ultimate solo si aún hace falta', 'overtime', 'no es «una ultimate por pelea»', 'cámara libre', 'ocasiones que dejaste pasar']) expect(body).toContain(phrase)
    expect(body).not.toMatch(/no uso Blade hasta ver Sleep|mi Beat responde a Kitsune|Suzu contra Graviton/)
  })
  it('allows an early justified swap and checks lost utility, actual HUD rules and participation', () => {
    const body = JSON.stringify(reviewedHeroSwapGuide)
    for (const phrase of ['No tienes que esperar varias derrotas', 'Mira el HUD', 'El reloj', 'qué ayuda dejaré de aportar', 'D.Va', 'Zarya', 'Circuit Royal']) expect(body).toContain(phrase)
    expect(body).not.toMatch(/entra cinco segundos|Pausa diez segundos|Si el plan falla 3 veces/)
  })
  it('blocks literal internal publishing headings, not an ordinary use of the same vocabulary', () => {
    for (const heading of ['CTA', 'Enlaces internos', '  cta  ']) {
      expect(guidePublicationIssues({ body: `## ${heading}\n\nBorrador.` })).toContain('Hay instrucciones internas o texto provisional visible')
    }
    expect(guidePublicationIssues({ body: 'Un texto que habla de CTA y enlaces internos sin usarlos como títulos.' })).not.toContain('Hay instrucciones internas o texto provisional visible')
  })
})
