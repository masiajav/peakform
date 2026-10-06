import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  user: null as { id: string; email: string } | null,
  profileRole: 'user', row: null as Record<string, unknown> | null,
  filters: [] as [string, unknown][], writes: vi.fn(), admin: vi.fn(),
  session: vi.fn(), refund: vi.fn(), status: vi.fn(), email: vi.fn(),
}))
vi.mock('@/lib/supabase/server', () => ({ createClient: async () => {
  const query = {
    select: () => query,
    eq: (column: string, value: unknown) => { state.filters.push([column, value]); return query },
    returns: () => query,
    single: async () => ({ data: state.row }),
    update: state.writes,
  }
  const profile = { select: () => profile, eq: () => profile, single: async () => ({ data: { role: state.profileRole } }) }
  return {
    auth: { getUser: async () => ({ data: { user: state.user } }) },
    from: (table: string) => table === 'profiles' ? profile : query,
  }
} }))
vi.mock('@/lib/supabase/admin', () => ({ createAdminClient: state.admin }))
vi.mock('@/lib/email', () => ({ sendNewOrderEmail: state.email }))
vi.mock('@/lib/stripe', () => ({ getStripe: () => ({ checkout: { sessions: { create: state.session } } }) }))
vi.mock('stripe', () => ({ default: class { refunds = { create: state.refund } } }))
vi.mock('@/lib/stripe-connect', async importOriginal => ({
  ...await importOriginal<typeof import('@/lib/stripe-connect')>(),
  getStripeConnectStatus: state.status,
}))

import { POST as checkout } from '@/app/api/checkout/route'
import { POST as submit } from '@/app/api/orders/[id]/submit/route'
import { POST as refund } from '@/app/api/orders/[id]/refund/route'
import { POST as onboard } from '@/app/api/stripe/connect/onboard/route'
import { evaluateStripeConnectAccount } from '@/lib/stripe-connect'
import { calculateTotal } from '@/types'

const context = { params: Promise.resolve({ id: 'order-fixture' }) }
function request(body: unknown = {}) {
  return new Request('http://localhost/api/fixture', {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin: 'http://localhost' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  state.user = null
  state.profileRole = 'user'
  state.row = null
  state.filters = []
  state.session.mockResolvedValue({ url: 'https://checkout.stripe.com/test-fixture' })
  state.status.mockResolvedValue(evaluateStripeConnectAccount({ country: 'ES', capabilities: { transfers: 'active' } }))
})

describe('request API migration preserves payment authorization', () => {
  it('rejects anonymous checkout, onboarding, replay submission and refunds without writes', async () => {
    expect((await checkout(request())).status).toBe(401)
    expect((await onboard(request())).status).toBe(401)
    expect((await submit(request(), context)).status).toBe(401)
    expect((await refund(request(), context)).status).toBe(401)
    expect(state.filters).toEqual([])
    expect(state.writes).not.toHaveBeenCalled()
    expect(state.admin).not.toHaveBeenCalled()
    expect(state.session).not.toHaveBeenCalled()
    expect(state.refund).not.toHaveBeenCalled()
  })

  it('does not permit ordinary users to create connected accounts', async () => {
    state.user = { id: 'buyer-fixture', email: 'buyer@example.test' }
    expect((await onboard(request({ country: 'CL' }))).status).toBe(403)
    expect(state.status).not.toHaveBeenCalled()
    expect(state.writes).not.toHaveBeenCalled()
  })

  it.each([submit, refund])('retains ownership filtering with promised route params', async handler => {
    state.user = { id: 'buyer-fixture', email: 'buyer@example.test' }
    expect((await handler(request({ replay_url: 'REPLAY' }), context)).status).toBe(404)
    expect(state.filters).toContainEqual(['id', 'order-fixture'])
    expect(state.filters).toContainEqual(['user_id', 'buyer-fixture'])
    expect(state.writes).not.toHaveBeenCalled()
    expect(state.admin).not.toHaveBeenCalled()
    expect(state.refund).not.toHaveBeenCalled()
  })

  it.each(['ES', 'CL'])('preserves totals, destination and settlement merchant for %s', async country => {
    state.user = { id: 'buyer-fixture', email: 'buyer@example.test' }
    state.row = { id: 'expert-fixture', display_name: 'Fixture', price_starter: 2700, tier_starter_enabled: true, stripe_account_id: 'acct_fixture' }
    state.status.mockResolvedValue(evaluateStripeConnectAccount({ country, capabilities: { transfers: 'active', card_payments: 'active' } }))
    const response = await checkout(request({ expertId: 'expert-fixture', tier: 'starter' }))
    expect(response.status).toBe(200)
    const session = state.session.mock.calls[0][0]
    const total = calculateTotal(2700)
    expect(session.line_items[0].price_data.unit_amount).toBe(total.total)
    expect(session.payment_intent_data.application_fee_amount).toBe(total.commission)
    expect(session.payment_intent_data.transfer_data.destination).toBe('acct_fixture')
    expect(session.payment_intent_data.on_behalf_of).toBe(country === 'ES' ? undefined : 'acct_fixture')
    expect(session.metadata.user_id).toBe(state.user.id)
    expect(session.success_url).toBe('http://localhost/dashboard?order=paid')
    expect(state.writes).not.toHaveBeenCalled()
  })

  it('does not create checkout when the connected account is not ready', async () => {
    state.user = { id: 'buyer-fixture', email: 'buyer@example.test' }
    state.row = { id: 'expert-fixture', tier_starter_enabled: true, stripe_account_id: 'acct_fixture' }
    state.status.mockResolvedValue(evaluateStripeConnectAccount({ country: 'CL', capabilities: { transfers: 'active', card_payments: 'pending' } }))
    expect((await checkout(request({ expertId: 'expert-fixture', tier: 'starter' }))).status).toBe(409)
    expect(state.session).not.toHaveBeenCalled()
    expect(state.writes).not.toHaveBeenCalled()
  })
})
