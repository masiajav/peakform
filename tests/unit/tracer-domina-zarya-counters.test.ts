import { describe, expect, it } from 'vitest'
import { getCounterPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

const slugs = ['tracer', 'domina', 'zarya'] as const

describe('Tracer, Domina and Zarya counter revisions', () => {
  for (const slug of slugs) {
    it(`${slug} preserves its route and original date with specific review decisions`, () => {
      const article = getCounterPillar(slug)!
      expect(article).toMatchObject({ slug, publishedDate: '2026-07-12', schemaDate: '2026-10-19', updatedAt: '19 de octubre de 2026' })
      expect(article.reviewedPatch).toMatch(/^Kit normal de Season 5/)
      expect(article.threats.length).toBeGreaterThanOrEqual(5)
      expect(article.cooldownWindows).toHaveLength(4)
      expect(article.examples).toHaveLength(3)
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.faqs).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      expect(new Set(article.threats.map(item => item.href)).size).toBe(article.threats.length)
      for (const href of [`/team-comps/${slug}`, '/experts', '/guides/review-vod-overwatch-espanol#cuaderno-vod']) expect(article.links.some(link => link.href === href)).toBe(true)
      expect(JSON.stringify(article)).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|victoria garantizada|win.?rate|probado personalmente|mis partidas/i)
      expect(editorialTopicQualityDecision('counter', slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(hasCurrentStaticEditorialReview(`/counters/${slug}`, article)).toBe(true)
      expect(hasCurrentStaticEditorialReview(`/counters/${slug}`, { ...article, h1: 'Unreviewed change' })).toBe(false)
    })
  }

  it('does not reuse long paragraphs or metadata across these matchups', () => {
    const articles = slugs.map(slug => getCounterPillar(slug)!)
    const paragraphs = articles.flatMap(article => [...article.intro, ...article.adaptations, ...article.mistakes, ...article.threats.flatMap(item => [item.danger, item.signal, item.response]), ...article.cooldownWindows.map(item => item.body), ...article.examples.map(item => item.body), ...article.faqs.map(item => item.answer)])
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    expect(new Set(articles.map(article => article.seoTitle)).size).toBe(3)
    expect(new Set(articles.map(article => article.seoDescription)).size).toBe(3)
  })

  it('Tracer distinguishes the Recall return, alternative Major perks and objective urgency', () => {
    const article = getCounterPillar('tracer')!
    const text = JSON.stringify(article)
    for (const term of ['Blink Packs', 'Quantum Entanglement', 'Major alternativas', 'Auto Recall de Stadium', 'overhealth', 'overtime', 'No es un stun completo']) expect(text).toContain(term)
    expect(text).toContain('no una condición obligatoria para intervenir')
    expect(text).toContain('No hay un número fijo de segundos')
    expect(article.examples.map(item => item.title).join(' ')).toMatch(/Gibraltar.*Midtown.*Lijiang/)
    expect(text).not.toMatch(/diez segundos|Recall sale temprano y Tracer ya no puede/)
  })

  it('Domina distinguishes each barrier, crystal, displacement and October 6 adjustment', () => {
    const article = getCounterPillar('domina')!
    const text = JSON.stringify(article)
    for (const term of ['Barrier Array', 'Corporate Retreat', 'Crystal Charge', 'Sonic Repulsors', 'Photon Magnum', 'Panopticon', 'Reconstruction', 'Extended Power', 'Efficient Design', 'lifesteal']) expect(text).toContain(term)
    expect(article.reviewedPatch).toContain('6 de octubre')
    expect(article.cooldownWindows[3].body).toContain('La barrera puede romperse')
    expect(text).toContain('Amp no elimina esa barrera')
    expect(article.examples.map(item => item.title).join(' ')).toMatch(/Circuit Royal.*Midtown.*Numbani/)
  })

  it('Zarya distinguishes persistent energy, beam versus Matrix and observed resources', () => {
    const article = getCounterPillar('zarya')!
    const text = JSON.stringify(article)
    expect(text).toContain('Matrix no bloquea el haz principal')
    expect(text).toContain('Esa energía no desaparece al terminar una burbuja')
    expect(text).toContain('Suzu no gasta una burbuja de Zarya')
    expect(text).toContain('son recursos de jugadores distintos')
    expect(text).toContain('puede servir para frenar una entrada o mantener la disputa')
    expect(article.examples.map(item => item.title).join(' ')).toMatch(/King’s Row.*Numbani.*Midtown/)
  })
})
