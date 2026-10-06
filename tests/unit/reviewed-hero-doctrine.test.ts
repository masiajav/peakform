import { describe, expect, it } from 'vitest'
import { reviewedDoctrineHero as doctrine } from '@/lib/reviewed-hero-doctrine'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('Doctrine trial-kit article', () => {
  it('preserves the URL and publication without treating a preview as the launched kit', () => {
    expect(getHeroPillar('doctrine')).toBe(doctrine)
    expect(doctrine).toMatchObject({ analysisStatus: 'trial', publishedAt: '2026-09-12', schemaDate: '2026-10-04' })
    expect(topicQualityDecision('hero', 'doctrine')).toMatchObject({ indexable: false, adsAllowed: false })
    expect(doctrine.intro[0]).toContain('Su trial del 12 al 14 de septiembre ya terminó')
    expect(doctrine.intro[0]).toContain('6 de octubre de 2026')
    expect(doctrine.seoTitle).toContain('del trial')
    expect(doctrine.h1).toContain('kit de prueba')
  })
  it('keeps an exactly reviewed trial preview outside search and without ads', () => {
    expect(hasCurrentStaticEditorialReview('/heroes/doctrine', doctrine)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/doctrine', { ...doctrine, analysisStatus: undefined })).toBe(false)
    expect(topicQualityDecision('hero', 'doctrine')).toMatchObject({ indexable: false, adsAllowed: false })
  })
  it('keeps the six shown abilities without inventing launch stats or shield penetration', () => {
    expect(doctrine.abilities.map(item => item.title)).toEqual(['Cetro eterno', 'Imbuir', 'Impulso velado', 'Drones vigorizantes', 'Liberación', 'Superviviente'])
    expect(doctrine.abilities[0].body).toContain('no basta para afirmar que atraviese barreras')
    expect(doctrine.abilities[2].body).toContain('no significa inmunidad ni cleanse')
    expect(doctrine.abilities[3].body).toContain('Con Imbuir también te afectan')
    expect(doctrine.abilities[5].body).toContain('No es lo mismo que recuperar toda la vida de inmediato')
    expect(doctrine.abilityKit).toBeUndefined()
  })
  it('separates mutually exclusive trial perks and maximum-health sacrifice', () => {
    expect(doctrine.perks?.map(item => item.title)).toEqual(['Minor · Salvación', 'Minor · Succión sanguinaria', 'Major · Transfusión', 'Major · El precio de la vida'])
    expect(doctrine.perksIntro).toContain('Eliges una de cada nivel, no las cuatro')
    expect(doctrine.perksIntro).toContain('no se presentan como balance final')
    expect(doctrine.perks?.[0].body).toContain('40 de salud')
    expect(doctrine.perks?.[1].body).toContain('50%')
    expect(doctrine.perks?.[3].body).toContain('no simplemente recibir 25 de daño')
  })
  it('uses specific decisions and hypothetical map examples, not lore as proof of synergy', () => {
    expect(doctrine.sections.some(item => item.title.startsWith('Lijiang, Control Center:'))).toBe(true)
    expect(doctrine.sections.some(item => item.title.startsWith('Gibraltar:'))).toBe(true)
    expect(doctrine.facts[1].body).toContain('no demuestra que formen una buena composición')
    expect(doctrine.faqs).toHaveLength(8)
    expect(doctrine.links.map(item => item.href)).toContain('/doctrine-support-sombra-roadhog-rework-overwatch')
    expect(JSON.stringify(doctrine)).not.toMatch(/he probado|mis partidas|TITLE SEO|mejor comp de Doctrine|guía de ranked/i)
  })
})
