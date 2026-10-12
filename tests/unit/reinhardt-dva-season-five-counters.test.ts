import { describe, expect, it } from 'vitest'
import { getCounterPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'

const rein = getCounterPillar('reinhardt')!
const dva = getCounterPillar('dva')!

describe('Reinhardt and D.Va Season 5 counter decisions', () => {
  for (const article of [rein, dva]) {
    it(`${article.name} preserves unknown publication history and rejects changed content`, () => {
      expect(article.schemaDate).toBe('2026-10-12')
      expect(article.publishedDate).toBeUndefined()
      expect(article.reviewedPatch).toContain('Season 5')
      expect(editorialTopicQualityDecision('counter', article.slug, article)).toMatchObject({ indexable: true, adsAllowed: false })
      for (const change of [{ intro: ['Unreviewed'] }, { seoDescription: 'Unreviewed' }, { vodQuestions: [] }, { links: [] }]) {
        expect(editorialTopicQualityDecision('counter', article.slug, { ...article, ...change }).indexable).toBe(false)
      }
      expect(article.threats).toHaveLength(6)
      expect(article.faqs).toHaveLength(5)
      expect(article.vodQuestions).toHaveLength(5)
      expect(article.conclusion).toBeTruthy()
      expect(JSON.stringify(article)).not.toMatch(/Season 3|TITLE SEO|META DESCRIPTION|KEYWORDS PRINCIPALES/)
    })
  }

  it('distinguishes Reinhardt positioning and optional perks from guaranteed punishments', () => {
    expect(rein.cooldownWindows[1].body).toContain('puede cancelar Charge')
    expect(rein.cooldownWindows[3].body).toContain('no permiso para ignorar')
    expect(rein.cooldownWindows[2].body).toContain('Ignited Fury, una opción Major')
    expect(rein.cooldownWindows[2].body).toContain('otra opción Major, Shield Slam')
    expect(rein.adaptations.join(' ')).toContain('Crusader’s Resolve, una opción Minor')
    expect(rein.faqs[2].answer).toContain('No cuentes con saltar como respuesta universal')
    expect(rein.faqs[2].answer).toContain('la invulnerabilidad de Suzu debe coincidir con el impacto')
  })

  it('does not treat projectile absorbs, beams and already applied effects as equivalent', () => {
    expect(dva.threats.find(item => item.name === 'Zarya')?.response).toContain('sin esperar a que termine Matriz')
    expect(dva.threats.find(item => item.name === 'Symmetra')?.danger).toContain('sí son proyectiles')
    expect(dva.threats.find(item => item.name === 'Mei')?.danger).toContain('el carámbano sí')
    expect(dva.threats.find(item => item.name === 'Doomfist')?.danger).toContain('Hand Cannon sí pueden ser absorbidos')
    expect(dva.adaptations.join(' ')).toContain('Matriz no la limpia después')
    expect(dva.cooldownWindows[0].body).toContain('No ves el medidor')
    expect(dva.cooldownWindows[1].body).toContain('no la inmoviliza')
  })

  it('keeps normal D.Va perks separate from Stadium and explains the pilot', () => {
    expect(dva.cooldownWindows[1].body).toContain('Extended Boosters, una opción Minor')
    expect(dva.cooldownWindows[2].body).toContain('Precision Fusion, una opción Major')
    expect(dva.cooldownWindows[3].body).toContain('Bunny Power, la otra opción Minor')
    expect(dva.adaptations.join(' ')).toContain('Shield System, la otra opción Major')
    expect(dva.adaptations.join(' ')).toContain('No cura toda su salud ni a sus compañeros')
    expect(dva.threats.find(item => item.name === 'Brigitte')?.response).toContain('fuera de Rally no aturde')
    expect(dva.cooldownWindows[3].body).toContain('Eject no es una eliminación completa')
  })

  it('uses different named map situations and respects role queue formats', () => {
    expect(rein.examples.map(item => item.title)).toEqual(['King’s Row: no gastar Assault antes del cruce', 'Control Center: el muro necesita seguimiento', 'Circuit Royal: una Charge corta no es una muerte gratis'])
    expect(dva.examples.map(item => item.title)).toEqual(['Hollywood: Zarya no alcanza cualquier altura', 'Midtown: defender al Support antes de buscar el meca', 'Gibraltar: no dejar la carga por la piloto'])
    expect(dva.examples[2].body).toContain('cola por roles 5v5')
    expect(dva.examples[2].body).toContain('En 6v6')
    expect(rein.faqs[4].answer).toContain('En 5v5 solo hay un Tank por equipo')
    expect(rein.vodQuestions?.join(' ')).toContain('cámara de tus DPS')
    expect(dva.vodQuestions?.join(' ')).toContain('quién siguió disputando el objetivo')
  })
})
