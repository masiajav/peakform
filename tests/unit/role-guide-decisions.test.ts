import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { reviewedRoleGuides } from '@/lib/reviewed-role-guides'
import { applyReviewedGuideRevision } from '@/lib/reviewed-guide-revisions'
import { discoverableGuides } from '@/lib/guide-discovery'
import { guideEditorial } from '@/lib/guide-editorial'
import { guideQualityDecision, isGuideSitemapEligible } from '@/lib/indexing-policy'
import type { GuideContent } from '@/lib/content'

describe('conditional DPS and Support advice', () => {
  for (const role of ['dps', 'support'] as const) {
    const slug = `como-mejorar-como-${role}-overwatch`
    const guide = reviewedRoleGuides[slug]
    it(`${role} preserves the original route, record, role and publication while refreshing the reviewed copy`, () => {
      const stored: GuideContent = { id: `original-${role}`, slug, title: 'Anterior', body: 'Anterior', category: 'Fundamentos', hero: null, role, published: true, created_at: '2026-06-21', updated_at: '2026-10-01' }
      const before = structuredClone(stored)
      const revised = applyReviewedGuideRevision(stored)
      expect(revised).toMatchObject({ id: stored.id, slug, role, hero: null, created_at: stored.created_at, updated_at: '2026-10-18', author: 'Replaid Lab', body: guide.body, excerpt: guide.quickAnswer })
      expect(discoverableGuides([stored])[0]).toEqual(revised)
      expect(guideEditorial(revised)).toMatchObject({ title: guide.title, description: guide.description })
      expect(stored).toEqual(before)
      expect(guide.body).toContain('/guides/review-vod-overwatch-espanol#cuaderno-vod')
      expect([...guide.body.matchAll(/^### /gm)]).toHaveLength(5)
      expect(guide.body).not.toMatch(/TITLE SEO|META DESCRIPTION|^## (CTA|Enlaces internos)$/m)
      expect(guideQualityDecision(revised)).toMatchObject({ indexable: true, adsAllowed: false })
      expect(isGuideSitemapEligible(revised)).toBe(true)
    })
  }
  it('distinguishes DPS mechanics, accessible angles, Recall destinations and objective contests', () => {
    const text = reviewedRoleGuides['como-mejorar-como-dps-overwatch'].body
    for (const value of ['adónde volverás con Recall', 'No cuentes con un reset', 'tracking', 'Numbani', 'overtime', '6v6', 'Stadium', 'aunque ambos terminen en derrota']) expect(text).toContain(value)
    expect(text).not.toContain('guarda Recall para responder a la presión que todavía no has recibido')
    expect(text).not.toContain('Elige dos peleas perdidas y una ganada')
  })
  it('does not prescribe an unsafe follow, compulsory Suzu hoarding or one defensive per entry', () => {
    const text = reviewedRoleGuides['como-mejorar-como-support-overwatch'].body
    for (const value of ['Una pérdida breve de visión', 'no significa que tenga que esperar siempre', 'No lo marques como un error', 'Reparte la ayuda', 'no lo has visto', 'un aliado en spawn', '6v6', 'overtime']) expect(text).toContain(value)
    expect(text).not.toContain('muévete antes de perderlo de vista:')
    expect(text).not.toContain('Tampoco uses dos defensivas')
  })
  it('makes the correction channel available without removing expert prices or related readings', () => {
    const source = readFileSync('src/app/guides/[slug]/page.tsx', 'utf8')
    expect(source).toContain('Comunicar una corrección</Link>')
    expect(source).toContain('EXPERTOS RECOMENDADOS')
    expect(source).toContain('<ExpertPriceSummary expert={expert} />')
    expect(source).toContain('LECTURAS RELACIONADAS')
  })
})
