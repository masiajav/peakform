import { describe, expect, it } from 'vitest'
import { evaluateStripeConnectAccount } from '@/lib/stripe-connect'

describe('Stripe Connect destination account readiness', () => {
  it('accepts an account with transfers active', () => {
    const status = evaluateStripeConnectAccount({
      capabilities: { transfers: 'active' },
      details_submitted: true,
      payouts_enabled: true,
    })

    expect(status.readyForDestinationCharges).toBe(true)
    expect(status.statusCheckFailed).toBe(false)
  })

  it('accepts a legacy recipient capability supported by Stripe', () => {
    const status = evaluateStripeConnectAccount({
      capabilities: { transfers: 'inactive', legacy_payments: 'active' },
    })

    expect(status.readyForDestinationCharges).toBe(true)
  })

  it.each(['inactive', 'pending', 'unrequested'])('rejects transfers in %s state', transfers => {
    const status = evaluateStripeConnectAccount({ capabilities: { transfers } })

    expect(status.readyForDestinationCharges).toBe(false)
  })

  it('rejects a deleted account', () => {
    const status = evaluateStripeConnectAccount({ deleted: true })

    expect(status.accountExists).toBe(false)
    expect(status.readyForDestinationCharges).toBe(false)
    expect(status.statusCheckFailed).toBe(false)
  })
})
