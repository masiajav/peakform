import { describe, expect, it } from 'vitest'
import { reviewedCassidyHero as cassidy } from '@/lib/reviewed-hero-cassidy'
import { getHeroPillar } from '@/lib/hero-pillars'
import { topicQualityDecision } from '@/lib/indexing-policy'
import { hasCurrentStaticEditorialReview } from '@/lib/static-editorial-review'

describe('individual Cassidy hero article', () => {
  it('keeps its own dated article, map decisions and conclusion', () => {
    expect(getHeroPillar('cassidy')).toBe(cassidy)
    expect(cassidy.publishedAt).toBe('2026-06-26')
    expect(cassidy.schemaDate).toBe('2026-10-04')
    expect(cassidy.sections.some(item => item.title.startsWith('King’s Row:'))).toBe(true)
    expect(cassidy.sections.some(item => item.title.startsWith('Midtown:'))).toBe(true)
    expect(cassidy.conclusion).toContain('el lugar donde terminó Roll')
    expect(cassidy.links.map(item => item.href)).toEqual(expect.arrayContaining(['/maps/kings-row', '/maps/midtown', '/counters/cassidy', '/team-comps/cassidy']))
    expect(JSON.stringify(cassidy)).not.toMatch(/TITLE SEO|mis partidas|he probado/)
  })

  it('separates normal abilities, Hinder and the movement passive', () => {
    expect(cassidy.abilities.map(item => item.title)).toEqual(['Peacekeeper: disparo principal', 'Fan the Hammer: disparo secundario', 'Flashbang', 'Combat Roll', 'Deadeye', 'Sharpshooter'])
    expect(cassidy.abilities.find(item => item.title === 'Flashbang')?.body).toContain('sin el stun completo')
    expect(cassidy.abilities.find(item => item.title === 'Combat Roll')?.body).toContain('no es invulnerabilidad')
    expect(cassidy.abilities.find(item => item.title === 'Fan the Hammer: disparo secundario')?.body).toContain('ese perk lo sustituye')
    expect(cassidy.abilities.find(item => item.title === 'Sharpshooter')?.body).toContain('golpes críticos')
    expect(cassidy.faqs).toHaveLength(6)
  })

  it('describes current normal perks without importing Stadium or retired options', () => {
    expect(cassidy.perks?.map(item => item.title)).toEqual(['Minor · Bang Bang', 'Minor · Giddy Up', 'Major · Rollin’ Round-Up', 'Major · Silver Bullet'])
    expect(cassidy.perks?.[0].body).toContain('ambas hagan menos daño')
    expect(cassidy.perks?.[2].body).toContain('según las balas que recarga')
    expect(cassidy.perks?.[3].body).toContain('Roll y Deadeye reinician su cooldown')
    expect(cassidy.perksIntro).toContain('Stadium')
    expect(JSON.stringify(cassidy.perks)).not.toMatch(/Past Noon|Gun Slingin|\d+%|\d+ segundos/)
  })

  it('indexes only the exact reviewed version without advertisements', () => {
    expect(topicQualityDecision('hero', 'cassidy')).toMatchObject({ indexable: true, adsAllowed: false })
    expect(hasCurrentStaticEditorialReview('/heroes/cassidy', cassidy)).toBe(true)
    expect(hasCurrentStaticEditorialReview('/heroes/cassidy', { ...cassidy, conclusion: 'Una edicion pendiente' })).toBe(false)
    expect(hasCurrentStaticEditorialReview('/heroes/ana', cassidy)).toBe(false)
  })
})
