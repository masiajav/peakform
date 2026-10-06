import { describe, expect, it } from 'vitest'
import { getTeamCompPillar } from '@/lib/seo-clusters'
import { getHeroPillar } from '@/lib/hero-pillars'
import { MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'

describe('individual Tracer and Zarya composition revisions', () => {
  for (const slug of ['tracer', 'zarya']) {
    it(`${slug} has its own answer, examples, VOD questions and honest dates`, () => {
      const article = getTeamCompPillar(slug)!
      expect(article.quickAnswer?.trim()).toBeTruthy()
      expect(article.conclusion?.trim()).toBeTruthy()
      expect(article.schemaDate).toBe('2026-10-05')
      expect(article.publishedDate).toBeUndefined()
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.faqs).toHaveLength(6)
      expect(article.compositions.map(comp => comp.format)).toEqual(['5v5', '5v5', '6v6'])
      const paragraphs = [...article.intro, ...article.examples.map(item => item.body), ...article.responsibilities.map(item => item.body)]
      expect(new Set(paragraphs).size).toBe(paragraphs.length)
      expect(paragraphs.filter(text => getHeroPillar(slug)!.intro.includes(text))).toEqual([])
      for (const link of article.links) {
        if (link.href.startsWith('/maps/')) expect(MAP_PILLAR_SLUGS).toContain(link.href.slice(6))
      }
      expect(JSON.stringify(article)).not.toMatch(/TITLE SEO|same duel|dos segundos|bajar su burbuja|volver con todos los Blinks|win rate garantizado/i)
    })
  }
})
