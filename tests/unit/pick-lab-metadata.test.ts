import { describe, expect, it } from 'vitest'
import { generateMetadata } from '@/app/pick-lab/page'
import { absoluteUrl } from '@/lib/seo'
import { HEROES, getHero } from '../../apps/replaid-coach-overlay/src/lib/picker-data.js'

describe('Pick Lab search variants', () => {
  it('uses the launched Support roster in the shared picker', () => {
    expect(getHero('sombra')?.role).toBe('support')
    expect(getHero('doctrine')?.role).toBe('support')
    expect(HEROES.filter(hero => hero.slug === 'doctrine')).toHaveLength(1)
    expect(HEROES.filter(hero => hero.role === 'dps').map(hero => hero.slug)).not.toContain('sombra')
  })

  it('indexes the base tool with its own canonical', async () => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve({}) })
    expect(metadata.robots).toEqual({ index: true, follow: true })
    expect(metadata.alternates?.canonical).toBe(absoluteUrl('/pick-lab'))
  })

  it.each([
    { mode: 'counters' },
    { role: 'support', map: 'kings-row' },
    { allies: ['ana', 'genji'] },
    { target: 'winston', counterRole: 'dps' },
    { unknown: '' },
  ])('keeps shared or filtered state out of search: %j', async searchParams => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve(searchParams) })
    expect(metadata.robots).toEqual({ index: false, follow: true })
    expect(metadata.alternates?.canonical).toBe(absoluteUrl('/pick-lab'))
    expect(metadata.openGraph?.url).toBe(absoluteUrl('/pick-lab'))
    expect(metadata.title).toBe('Pick Lab de Overwatch: picks, counters y sinergias')
  })
})
