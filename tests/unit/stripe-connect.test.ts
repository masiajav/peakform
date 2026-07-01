import { describe, expect, it } from 'vitest'
import {
  buildDestinationPaymentData,
  evaluateStripeConnectAccount,
  isStripeAccountReadyForCheckout,
  requiresOnBehalfOf,
} from '@/lib/stripe-connect'
import { isSupportedStripeCountry } from '@/lib/stripe-countries'

describe('Stripe Connect destination account readiness', () => {
  it.each([
    'ES',
    'AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'DO', 'EC', 'GT',
    'MX', 'PA', 'PE', 'PY', 'SV', 'UY',
  ])('allows onboarding in %s', country => {
    expect(isSupportedStripeCountry(country)).toBe(true)
  })

  it('rejects countries not approved for this payment flow', () => {
    expect(isSupportedStripeCountry('HN')).toBe(false)
    expect(isSupportedStripeCountry('VE')).toBe(false)
  })

  it('accepts an account with transfers active', () => {
    const status = evaluateStripeConnectAccount({
      capabilities: { transfers: 'active' },
      country: 'ES',
      details_submitted: true,
      payouts_enabled: true,
    })

    expect(status.readyForDestinationCharges).toBe(true)
    expect(status.statusCheckFailed).toBe(false)
    expect(isStripeAccountReadyForCheckout(status)).toBe(true)
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

  it('requires card payments for a Latin American settlement merchant', () => {
    const incomplete = evaluateStripeConnectAccount({
      country: 'CL',
      capabilities: { transfers: 'active', card_payments: 'pending' },
    })
    const ready = evaluateStripeConnectAccount({
      country: 'CL',
      capabilities: { transfers: 'active', card_payments: 'active' },
    })

    expect(requiresOnBehalfOf(incomplete.country)).toBe(true)
    expect(isStripeAccountReadyForCheckout(incomplete)).toBe(false)
    expect(isStripeAccountReadyForCheckout(ready)).toBe(true)
  })

  it('adds on_behalf_of only for international accounts', () => {
    for (const country of ['AR', 'BR', 'CL', 'CO', 'MX', 'PE']) {
      expect(buildDestinationPaymentData(`acct_${country}`, 500, country)).toEqual({
        application_fee_amount: 500,
        transfer_data: { destination: `acct_${country}` },
        on_behalf_of: `acct_${country}`,
      })
    }
    expect(buildDestinationPaymentData('acct_spain', 500, 'ES')).toEqual({
      application_fee_amount: 500,
      transfer_data: { destination: 'acct_spain' },
    })
  })
})
