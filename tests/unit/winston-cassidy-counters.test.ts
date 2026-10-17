import { describe, expect, it } from 'vitest'
import { getCounterPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'

describe('Winston and Cassidy counter revisions', () => {
  for (const slug of ['winston', 'cassidy']) {
    it(`${slug} has its own decisions, date, examples and VOD review without invented publication history`, () => {
      const article = getCounterPillar(slug)!
      expect(article.schemaDate).toBe('2026-10-17')
      expect(article.updatedAt).toBe('17 de octubre de 2026')
      expect(article.publishedDate).toBeUndefined()
      expect(article.reviewedPatch).toBe('Kit normal de Season 5')
      expect(article.threats).toHaveLength(6)
      expect(article.examples).toHaveLength(3)
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.faqs).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      expect(new Set(article.threats.map(item => item.href)).size).toBe(6)
      for (const threat of article.threats) expect(COUNTER_HEROES.some(hero => threat.href === `/heroes/${hero.slug}`)).toBe(true)
      for (const href of [`/heroes/${slug}`, `/team-comps/${slug}`, '/experts', '/guides/review-vod-overwatch-espanol#cuaderno-vod']) expect(article.links.some(link => link.href === href)).toBe(true)
      expect(JSON.stringify(article)).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|victoria garantizada|win.?rate|probado personalmente/i)
      expect(editorialTopicQualityDecision('counter', slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(editorialTopicQualityDecision('counter', slug, { ...article, h1: 'Changed without approval' }).indexable).toBe(false)
    })
  }
  it('does not repeat long sections across the two counter articles', () => {
    const paragraphs = ['winston', 'cassidy'].flatMap(slug => {
      const article = getCounterPillar(slug)!
      return [...article.intro, ...article.adaptations, ...article.mistakes, ...article.threats.flatMap(item => [item.danger, item.signal, item.response]), ...article.examples.map(item => item.body), ...article.cooldownWindows.map(item => item.body), ...article.faqs.map(item => item.answer)]
    })
    expect(new Set(paragraphs).size).toBe(paragraphs.length)
    expect(getCounterPillar('winston')!.seoDescription).not.toBe(getCounterPillar('cassidy')!.seoDescription)
  })
  it('Winston distinguishes a drop from Jump Pack, Matrix from Tesla and optional normal perks', () => {
    const article = getCounterPillar('winston')!
    const text = JSON.stringify(article)
    expect(text).toContain('Matriz no bloquea el disparo principal de Tesla')
    expect(text).toContain('Electric Charge')
    expect(text).toContain('Heavy Landing')
    expect(text).toContain('Chain Lightning')
    expect(text).toContain('Revitalizing Barrier')
    expect(text).toContain('no está en todas las burbujas')
    expect(text).toContain('puede conservar Jump Pack')
    expect(text).toContain('No esperes el Hack normal')
    expect(article.examples.map(item => item.title).join(' ')).toMatch(/Gibraltar.*Numbani.*Lijiang/)
  })
  it('Cassidy distinguishes reloaded Roll, passive recovery, Hinder and alternate secondaries', () => {
    const article = getCounterPillar('cassidy')!
    const text = JSON.stringify(article)
    for (const term of ['Sharpshooter', 'Hinder', 'Bang Bang', 'Giddy Up', 'Silver Bullet', 'Rollin’ Round-Up']) expect(text).toContain(term)
    expect(text).toContain('sin dar invulnerabilidad')
    expect(text).toContain('no el stun completo')
    expect(text).toContain('No atribuyas ambas mejoras al mismo Cassidy')
    expect(text).toContain('Roll y Deadeye pueden reiniciarlo')
    expect(article.examples.map(item => item.title).join(' ')).toMatch(/Circuit Royal.*King’s Row.*Midtown/)
  })
})
