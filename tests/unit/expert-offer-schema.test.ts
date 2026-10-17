import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Expert } from '@/types'
import type { StripeConnectStatus } from '@/lib/stripe-connect'

const fixture = vi.hoisted(() => ({ expert: {} as Expert, status: {} as StripeConnectStatus }))
vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: () => ({ from: (table: string) => {
  const query = {
    select: () => query, eq: () => query, or: () => query, not: () => query, order: () => query, limit: () => query,
    single: async () => ({ data: fixture.expert }),
    then: (resolve: (value: unknown) => void) => resolve({ data: table === 'reviews' ? [] : [fixture.expert] }),
  }
  return query
} }) }))
vi.mock('@/lib/stripe-connect', async importOriginal => ({
  ...await importOriginal<typeof import('@/lib/stripe-connect')>(),
  getStripeConnectStatus: async () => fixture.status,
}))

import ExpertDetailPage from '@/app/experts/[id]/page'

beforeEach(() => {
  fixture.expert = {
    id: 'fixture', slug: 'coach-fixture', display_name: 'Coach de prueba', peak_rank: 'Master', main_role: 'support',
    avatar_url: null, specialties: ['Ana'], total_reviews: 0, bio: 'Review de posicionamiento con Ana.',
    price_starter: 1000, price_pro: 1700, price_deep_dive: 2700,
    tier_starter_enabled: false, tier_pro_enabled: true, tier_deep_dive_enabled: false,
    service_paused: false, trial_enabled: false, trial_price: null,
  } as Expert
  fixture.status = { accountExists: true, readyForDestinationCharges: true, statusCheckFailed: false, country: 'ES', cardPaymentsStatus: 'active', transfersStatus: 'active', detailsSubmitted: true, payoutsEnabled: true, currentlyDueCount: 0 }
})

async function renderProfile() {
  const html = renderToStaticMarkup(await ExpertDetailPage({ params: Promise.resolve({ id: 'coach-fixture' }) }))
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
  return { html, person: blocks.find(item => item['@type'] === 'Person') }
}

describe('expert offers reflect the visible offer and confirmed checkout status', () => {
  it('uses the active Pro total including commission, matching the visible price summary', async () => {
    const { html, person } = await renderProfile()
    expect(person.makesOffer).toMatchObject({ name: 'Pro por Coach de prueba', price: '20.40', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' })
    expect(html).toContain('€20.40')
    expect(html).toContain('Incluye el 20% de comisión')
    expect(html).not.toContain('€10.00')
  })
  it.each(['paused', 'no tiers', 'not ready', 'unknown', 'foreign cards inactive'] as const)('does not publish an unsupported InStock offer: %s', state => {
    if (state === 'paused') fixture.expert.service_paused = true
    if (state === 'no tiers') fixture.expert.tier_pro_enabled = false
    if (state === 'not ready') fixture.status.readyForDestinationCharges = false
    if (state === 'unknown') fixture.status.statusCheckFailed = true
    if (state === 'foreign cards inactive') { fixture.status.country = 'CL'; fixture.status.cardPaymentsStatus = 'pending' }
    return renderProfile().then(({ person }) => { expect(person.makesOffer).toBeUndefined() })
  })
})
