import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Expert } from '@/types'
import type { GuideContent } from '@/lib/content'

const fixture = vi.hoisted(() => ({ experts: [] as Expert[], guide: {} as GuideContent, expertColumns: [] as string[] }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
vi.mock('@/components/layout/AppNav', () => ({ default: () => null }))
vi.mock('@/components/content/GuideVideo', () => ({ default: () => null }))
vi.mock('@/components/content/ArticleCta', () => ({ default: () => null }))
vi.mock('@/lib/guide-discovery', () => ({ discoverableGuides: () => [] }))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ from: (table: string) => {
  const query = {
    select: (columns: string) => { if (table === 'experts') fixture.expertColumns.push(columns); return query },
    eq: () => query, neq: () => query, order: () => query, limit: () => query,
    single: async () => ({ data: fixture.guide }),
    returns: () => query,
    then: (resolve: (value: unknown) => void) => resolve({ data: table === 'experts' ? fixture.experts : [] }),
  }
  return query
} }) }))

import GuideDetailPage from '@/app/guides/[slug]/page'

beforeEach(() => {
  fixture.expertColumns = []
  fixture.experts = [{
    id: 'fixture', slug: 'coach-fixture', display_name: 'Coach de prueba', peak_rank: 'Master', main_role: 'support',
    price_starter: 1000, price_pro: 1700, price_deep_dive: 2700,
    tier_starter_enabled: false, tier_pro_enabled: true, tier_deep_dive_enabled: false,
    service_paused: false, trial_enabled: false, trial_price: null,
  } as Expert]
  fixture.guide = {
    id: 'guide-fixture', slug: 'guide-fixture', title: 'Preparar una revisión', body: 'Comprueba el replay antes de revisarlo.',
    excerpt: 'Elige una situación que puedas comparar después.', category: 'Fundamentos', role: 'support', hero: null,
    created_at: '2026-10-01', updated_at: '2026-10-17', author: 'Replaid Lab', published: true,
  }
})

async function renderGuide() {
  return renderToStaticMarkup(await GuideDetailPage({ params: Promise.resolve({ slug: 'guide-fixture' }) }))
}

describe('expert recommendations inside a guide', () => {
  it.each(['support', null] as const)('selects all pricing fields and displays the active total when role is %s', async role => {
    fixture.guide.role = role
    const html = await renderGuide()
    expect(html).toContain('EXPERTOS RECOMENDADOS')
    expect(html).toContain('href="/experts/coach-fixture"')
    expect(html).toContain('€20.40')
    expect(html).toContain('Pro')
    expect(html).toContain('Incluye el 20% de comisión')
    expect(html).not.toMatch(/€10.00|€12.00|white-space:nowrap/)
    expect(fixture.expertColumns).toHaveLength(1)
    for (const field of ['price_pro', 'price_deep_dive', 'tier_starter_enabled', 'tier_pro_enabled', 'tier_deep_dive_enabled', 'service_paused', 'trial_enabled', 'trial_price']) expect(fixture.expertColumns[0]).toContain(field)
  })
  it('does not advertise an unavailable standard price as a universal trial', async () => {
    fixture.experts[0].tier_pro_enabled = false
    fixture.experts[0].trial_enabled = true
    fixture.experts[0].trial_price = 100
    const html = await renderGuide()
    expect(html).toContain('Prueba disponible: consulta las condiciones en el perfil.')
    expect(html).not.toMatch(/Desde|€1.00|€20.40/)
  })
  it('keeps the article readable when there are no expert recommendations', async () => {
    fixture.experts = []
    const html = await renderGuide()
    expect(html).toContain('Comprueba el replay antes de revisarlo.')
    expect(html).not.toContain('EXPERTOS RECOMENDADOS')
  })
})
