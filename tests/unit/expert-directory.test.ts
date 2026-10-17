import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Expert } from '@/types'

const fixture = vi.hoisted(() => ({ experts: [] as Expert[], error: null as { message: string } | null, selected: '' }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({
  auth: { getUser: async () => ({ data: { user: null } }) },
  from: () => {
    const query = {
      select: (columns: string) => { fixture.selected = columns; return query },
      eq: () => query, order: () => query, ilike: () => query,
      then: (resolve: (value: unknown) => void) => resolve({ data: fixture.error ? null : fixture.experts, error: fixture.error }),
    }
    return query
  },
}) }))

import ExpertsPage, { generateMetadata } from '@/app/experts/page'

const coach = {
  id: 'fixture', slug: 'coach-fixture', display_name: 'Coach de prueba', peak_rank: 'Master', main_role: 'support',
  avatar_url: null, specialties: ['Ana'], total_reviews: 0, bio: 'Review de posicionamiento con Ana.',
  price_starter: 1000, price_pro: 1700, price_deep_dive: 2700,
  tier_starter_enabled: false, tier_pro_enabled: true, tier_deep_dive_enabled: false,
  service_paused: false, trial_enabled: false, trial_price: null,
} as Expert

beforeEach(() => { fixture.experts = [coach]; fixture.error = null; fixture.selected = '' })
const page = async (searchParams = {}) => renderToStaticMarkup(await ExpertsPage({ searchParams: Promise.resolve(searchParams) }))

describe('expert directory gives truthful service information', () => {
  it('renders the actual active total, a main landmark and conditional service scope', async () => {
    const html = await page()
    expect(html).toContain('<main')
    expect(html).toContain('€20.40')
    expect(html).not.toContain('€10.00')
    expect(html).toContain('Incluye el 20% de comisión')
    expect(html).toContain('minmax(min(100%, 320px), 1fr)')
    for (const field of ['price_pro', 'tier_starter_enabled', 'tier_deep_dive_enabled', 'trial_price']) expect(fixture.selected).toContain(field)
    expect(html).toContain('/guides/review-vod-overwatch-espanol#cuaderno-vod')
    expect(html).not.toMatch(/partida completa|verificados|adsbygoogle/)
  })
  it('does not advertise a price while service is paused', async () => {
    fixture.experts = [{ ...coach, service_paused: true }]
    const html = await page()
    expect(html).toContain('Pedidos pausados')
    expect(html).not.toContain('€20.40')
  })
  it('distinguishes query failure from an empty directory without leaking database details', async () => {
    fixture.error = { message: 'private database diagnostic' }
    const html = await page({ role: 'support' })
    expect(html).toContain('No hemos podido cargar los expertos')
    expect(html).toContain('href="/experts?role=support"')
    expect(html).not.toMatch(/private database|experto encontrado|SIN RESULTADOS|PRÓXIMAMENTE/)
  })
  it('keeps useful empty and filtered states', async () => {
    fixture.experts = []
    expect(await page()).toContain('SIN EXPERTOS ACTIVOS')
    expect(await page({ rank: 'Master' })).toContain('SIN RESULTADOS')
  })
  it('matches all visible FAQ answers to structured data', async () => {
    const html = await page()
    const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    const faq = blocks.flat().find(item => item['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(6)
    for (const item of faq.mainEntity) {
      expect(html).toContain(item.name)
      expect(html).toContain(item.acceptedAnswer.text)
    }
  })
  it('keeps filtered URLs noindex and canonical to the directory without unsupported verification claims', async () => {
    const metadata = await generateMetadata({ searchParams: Promise.resolve({ role: 'support' }) })
    expect(metadata.robots).toEqual({ index: false, follow: true })
    expect(metadata.alternates?.canonical).toBe('https://www.replaidlab.com/experts')
    expect(metadata.description).not.toContain('verificados')
  })
})
