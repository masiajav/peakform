import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import CooldownReviewGuidePage, { generateMetadata } from '@/app/guides/como-revisar-cooldowns-overwatch/page'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'
import { discoverableGuides } from '@/lib/guide-discovery'
import { guideEditorial } from '@/lib/guide-editorial'
import type { GuideContent } from '@/lib/content'

const guide = evergreenGuides['como-revisar-cooldowns-overwatch']
const stored: GuideContent = {
  id: 'fixture-cooldown-guide', slug: guide.slug, title: 'Texto anterior', body: 'No uso Sleep en poke.',
  category: 'Fundamentos', role: 'flex', hero: null, published: true,
  created_at: '2026-06-21T12:10:02.805891+02:00', updated_at: '2026-06-28',
}

describe('individual cooldown review guide', () => {
  it('keeps the existing URL and real publication day, with its actual revision date', async () => {
    const metadata=await generateMetadata()
    expect(guide.slug).toBe('como-revisar-cooldowns-overwatch')
    expect(guide.publishedAtIso).toBe('2026-06-21')
    expect(guide.modifiedAtIso).toBe('2026-10-18')
    expect(guide.updatedAt).toBe('18 de octubre de 2026')
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/guides/como-revisar-cooldowns-overwatch')
    expect(guide.quickAnswer).toContain('por guardarlo')
    expect(guide.faqs).toHaveLength(6)
  })
  it('explains use, holding, execution, information and overtime rather than a fixed prohibition', () => {
    const text = JSON.stringify(guide)
    for (const term of ['Suzu', 'Sleep', 'Matrix', 'Boosters', 'Dash', 'Swift Cuts', 'overtime', 'tu cámara', 'el HUD']) expect(text).toContain(term)
    expect(guide.sections.find(section => section.title.startsWith('Kiriko'))!.body.join(' ')).toContain('No decidas por una cantidad fija de vida perdida')
    expect(guide.sections.find(section => section.title.startsWith('D.Va'))!.body.join(' ')).toContain('El disparo principal de Tesla y el haz de Zarya no se frenan con Matrix')
    expect(guide.sections.find(section => section.title.startsWith('Genji'))!.body.join(' ')).toContain('Las eliminaciones reinician Swift Strike')
    expect(text).not.toMatch(/esperas anti-nade, ultimate o burst real|No uso Sleep en poke|tras 10 partidas|probado personalmente|TITLE SEO|META DESCRIPTION/)
    expect(guide.sections[1].body[0]).toContain('no un límite del análisis')
    const paragraphs = [...guide.intro, ...guide.sections.flatMap(section => section.body)]
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
  })
  it('shows the current article on discovered cards without mutating the stored source or dates', () => {
    const [card] = discoverableGuides([stored])
    expect(card).toMatchObject({ id: stored.id, slug: stored.slug, category: 'Fundamentos', role: 'flex', created_at: stored.created_at, title: guide.title, seo_title: guide.seoTitle, seo_description: guide.seoDescription, excerpt: guide.quickAnswer, updated_at: guide.modifiedAtIso, author: 'Replaid Lab' })
    expect(card.body).toContain(guide.sections[0].body[0])
    expect(card.body).toContain('\n\n')
    expect(card.body).not.toContain('\\n')
    expect(card.body).not.toContain(stored.body)
    expect(stored.title).toBe('Texto anterior')
    expect(stored.body).toBe('No uso Sleep en poke.')
    expect(discoverableGuides([{ ...stored, published: false }])).toEqual([])
    expect(guideEditorial(stored)).toEqual({ title: guide.title, seoTitle: guide.seoTitle, description: guide.seoDescription })
  })
  it('renders its direct answer, dates and matching FAQ without a database fetch, adverts or internal text', async () => {
    const html = renderToStaticMarkup(await CooldownReviewGuidePage())
    expect([...html.matchAll(/<h1\b/g)]).toHaveLength(1)
    expect(html).toContain(guide.h1)
    expect(html).toContain(guide.quickAnswer)
    expect(html).toContain('dateTime="2026-06-21"')
    expect(html).toContain('dateTime="2026-10-18"')
    expect(html).toContain('/guides/review-vod-overwatch-espanol#cuaderno-vod')
    expect(html).not.toMatch(/__editorial_review_|adsbygoogle|No uso Sleep en poke|Enlaces internos/)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
    expect(schemas).toContainEqual(expect.objectContaining({ '@type': 'BlogPosting', datePublished: guide.publishedAtIso, dateModified: guide.modifiedAtIso, headline: guide.seoTitle, author: { '@type': 'Organization', name: 'Replaid Lab' } }))
    expect(schemas.find(item => item['@type'] === 'FAQPage').mainEntity).toEqual(guide.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })))
  })
  it('indexes only the individually reviewed version and never approves an edited version', () => {
    expect(evergreenGuideQualityDecision(guide)).toMatchObject({ indexable: true, adsAllowed: true })
    for (const changed of [{ ...guide, quickAnswer: 'Unreviewed answer' }, { ...guide, modifiedAtIso: '2026-10-19' }]) expect(evergreenGuideQualityDecision(changed)).toMatchObject({ indexable: false, adsAllowed: false })
  })
})
