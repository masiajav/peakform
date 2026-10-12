import { describe, expect, it } from 'vitest'
import { getCounterPillar } from '@/lib/seo-clusters'
import { editorialTopicQualityDecision } from '@/lib/indexing-policy'

const ana = getCounterPillar('ana')!

describe('Ana Season 5 counter analysis', () => {
  it('preserves publication history and rejects unreviewed changes', () => {
    expect(editorialTopicQualityDecision('counter', 'ana', ana)).toMatchObject({ indexable: true, adsAllowed: false })
    expect(ana).toMatchObject({ publishedDate: '2026-06-28', schemaDate: '2026-10-12' })
    expect(ana.reviewedPatch).toContain('Season 5')
    for (const edit of [{ intro: ['Unreviewed'] }, { seoDescription: 'Unreviewed' }, { vodQuestions: [] }, { links: [] }]) {
      expect(editorialTopicQualityDecision('counter', 'ana', { ...ana, ...edit })).toMatchObject({ indexable: false, adsAllowed: false })
    }
  })

  it('distinguishes Sombra Support output reduction from anti and normal Hack', () => {
    const sombra = ana.threats.find(item => item.name === 'Sombra')!
    expect(sombra.href).toBe('/counters/sombra')
    expect(sombra.danger).toContain('curación que ella produce')
    expect(sombra.danger).toContain('No impide que reciba curación')
    expect(sombra.response).toContain('plaza de Support')
    expect(JSON.stringify(ana)).not.toMatch(/primer hack|Season 3|Groggy/)
  })

  it('keeps optional perks and projectile responses distinct from cleanses', () => {
    expect(ana.cooldownWindows[0].body).toContain('una de las opciones Minor')
    expect(ana.cooldownWindows[0].body).toContain('ni confundas ese efecto con dormir a todos')
    expect(ana.cooldownWindows[1].body).toContain('Biotic Bounce, una opción Major')
    expect(ana.cooldownWindows[3].body).toContain('Speed Serum, la otra opción Minor')
    expect(ana.adaptations.join(' ')).toContain('Headhunter')
    expect(ana.threats.find(item => item.name === 'D.Va')?.danger).toContain('Matrix no limpia')
    expect(ana.threats.find(item => item.name === 'Genji')?.danger).toContain('No devuelve una granada que ya ha explotado')
    expect(ana.summary).toContain('Cubre al aliado dormido: tu daño no puede despertarlo.')
  })

  it('offers map-specific examples and replay decisions rather than guaranteed kills', () => {
    expect(ana.examples.map(item => item.title)).toEqual(['Gibraltar: subir no basta', 'King’s Row: la granada que no llegará al choke', 'Esperança: no seguir al robot por inercia'])
    expect(ana.vodQuestions).toHaveLength(5)
    expect(ana.vodQuestions?.join(' ')).toContain('cámara de Ana')
    expect(ana.faqs).toHaveLength(5)
    expect(ana.faqs[4].answer).toContain('Winston y D.Va juntos corresponden a 6v6')
    expect(ana.conclusion).toContain('qué hace tu equipo después')
  })
})
