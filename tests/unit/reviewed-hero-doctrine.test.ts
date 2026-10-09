import { describe, expect, it } from 'vitest'
import { reviewedDoctrineHero as doctrine } from '@/lib/reviewed-hero-doctrine'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('Doctrine Season 5 article', () => {
  it('preserves publication and the URL while updating the released kit', () => {
    expect(getHeroPillar('doctrine')).toBe(doctrine)
    expect(doctrine).toMatchObject({ publishedAt: '2026-09-12', schemaDate: '2026-10-09' })
    expect(doctrine.analysisStatus).toBeUndefined()
    expect(doctrine.intro[0]).toContain('ya está disponible desde el 6 de octubre de 2026')
    expect(doctrine.seoTitle).toContain('Season 5')
    expect(doctrine.h1).not.toContain('kit de prueba')
  })
  it('requires the exact launch revision for indexing, without ads', () => {
    expect(hasCurrentStaticEditorialReview('/heroes/doctrine', doctrine)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/doctrine', { ...doctrine, intro: ['Otro contenido'] })).toBe(false)
    expect(topicQualityDecision('hero', 'doctrine')).toMatchObject({ indexable: true, adsAllowed: false })
  })
  it('includes launch adjustments without inventing shield penetration or immunity', () => {
    expect(doctrine.abilities.map(item => item.title)).toEqual(['Cetro eterno', 'Imbuir', 'Impulso velado', 'Drones vigorizantes', 'Liberación', 'Superviviente'])
    expect(doctrine.abilities[0].body).toContain('no basta para afirmar que atraviese barreras')
    expect(doctrine.abilities[2].body).toContain('40% de reducción de daño y 8 segundos')
    expect(doctrine.abilities[2].body).toContain('no significa inmunidad ni cleanse')
    expect(doctrine.abilities[3].body).toContain('30% de velocidad de ataque')
    expect(doctrine.abilities[3].body).toContain('Con Imbuir también te afectan')
    expect(doctrine.abilities[5].body).toContain('No es lo mismo que recuperar toda la vida de inmediato')
    expect(doctrine.abilityKit).toBeUndefined()
  })
  it('separates mutually exclusive perks and the conversion nerf from a fixed cooldown', () => {
    expect(doctrine.perks?.map(item => item.title)).toEqual(['Minor · Salvación', 'Minor · Succión sanguinaria', 'Major · Transfusión', 'Major · El precio de la vida'])
    expect(doctrine.perksIntro).toContain('Eliges una de cada nivel, no las cuatro')
    expect(doctrine.perks?.[0].body).toContain('40 de salud')
    expect(doctrine.perks?.[1].body).toContain('50%')
    expect(doctrine.perks?.[2].body).toContain('redujo a la mitad esa conversión')
    expect(doctrine.perks?.[2].body).toContain('no significa que Imbuir tenga un cooldown fijo')
    expect(doctrine.perks?.[3].body).toContain('no simplemente recibir 25 de daño')
  })
  it('uses specific hypothetical examples and the current Sombra role', () => {
    expect(doctrine.sections.some(item => item.title.startsWith('Lijiang, Control Center:'))).toBe(true)
    expect(doctrine.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(doctrine.facts[1].body).toContain('no demuestra que formen una buena composición')
    expect(doctrine.counters[3].body).toContain('Sombra ya es Support')
    expect(doctrine.faqs).toHaveLength(8)
    expect(doctrine.links.map(item => item.href)).toContain('/doctrine-support-sombra-roadhog-rework-overwatch')
    expect(JSON.stringify(doctrine)).not.toMatch(/he probado|mis partidas|TITLE SEO|mejor comp de Doctrine|estreno está anunciado/i)
  })
})
