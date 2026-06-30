import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'

const RECIPIENT_CAPABILITIES = ['transfers', 'crypto_transfers', 'legacy_payments'] as const

type CapabilityStatus = 'active' | 'inactive' | 'pending' | 'unrequested' | string | null | undefined

export type StripeConnectStatus = {
  accountExists: boolean
  readyForDestinationCharges: boolean
  statusCheckFailed: boolean
  transfersStatus: CapabilityStatus
  detailsSubmitted: boolean
  payoutsEnabled: boolean
  currentlyDueCount: number
}

type AccountLike = {
  deleted?: boolean
  capabilities?: Record<string, CapabilityStatus> | null
  details_submitted?: boolean
  payouts_enabled?: boolean
  requirements?: { currently_due?: string[] | null } | null
}

export function evaluateStripeConnectAccount(account: AccountLike): StripeConnectStatus {
  if (account.deleted) {
    return {
      accountExists: false,
      readyForDestinationCharges: false,
      statusCheckFailed: false,
      transfersStatus: null,
      detailsSubmitted: false,
      payoutsEnabled: false,
      currentlyDueCount: 0,
    }
  }

  const capabilities = account.capabilities ?? {}
  const recipientCapabilityActive = RECIPIENT_CAPABILITIES.some(
    capability => capabilities[capability] === 'active',
  )

  return {
    accountExists: true,
    readyForDestinationCharges: recipientCapabilityActive,
    statusCheckFailed: false,
    transfersStatus: capabilities.transfers,
    detailsSubmitted: account.details_submitted === true,
    payoutsEnabled: account.payouts_enabled === true,
    currentlyDueCount: account.requirements?.currently_due?.length ?? 0,
  }
}

export async function getStripeConnectStatus(accountId: string | null | undefined) {
  if (!accountId) return evaluateStripeConnectAccount({ deleted: true })

  try {
    const account = await getStripe().accounts.retrieve(accountId)
    return evaluateStripeConnectAccount(account as Stripe.Account & AccountLike)
  } catch (error) {
    const code = getStripeErrorCode(error)
    console.error('[stripe-connect] Unable to retrieve account status', {
      accountId: `${accountId.slice(0, 8)}...`,
      code,
    })
    const unavailableStatus = evaluateStripeConnectAccount({})
    return {
      ...unavailableStatus,
      accountExists: code !== 'resource_missing',
      statusCheckFailed: code !== 'resource_missing',
    }
  }
}

export async function requestTransfersCapability(accountId: string) {
  const stripe = getStripe()
  const account = await stripe.accounts.retrieve(accountId)
  const status = evaluateStripeConnectAccount(account as Stripe.Account & AccountLike)

  if (!status.accountExists || status.readyForDestinationCharges || status.transfersStatus === 'pending') {
    return status
  }

  const updatedAccount = await stripe.accounts.update(accountId, {
    capabilities: { transfers: { requested: true } },
  })

  return evaluateStripeConnectAccount(updatedAccount as Stripe.Account & AccountLike)
}

export function getStripeErrorCode(error: unknown) {
  if (typeof error !== 'object' || error === null) return 'unknown'
  const candidate = error as { code?: unknown; type?: unknown }
  if (typeof candidate.code === 'string') return candidate.code
  if (typeof candidate.type === 'string') return candidate.type
  return 'unknown'
}
