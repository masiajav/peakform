import { calculateTotal, TIER_CONFIG, type Expert, type OrderTier } from '@/types'

export type ExpertPublicPricing = Pick<Expert,
  'price_starter' | 'price_pro' | 'price_deep_dive' | 'tier_starter_enabled'
  | 'tier_pro_enabled' | 'tier_deep_dive_enabled' | 'service_paused' | 'trial_enabled' | 'trial_price'>

export const EXPERT_PUBLIC_PRICE_COLUMNS = 'price_starter, price_pro, price_deep_dive, tier_starter_enabled, tier_pro_enabled, tier_deep_dive_enabled, service_paused, trial_enabled, trial_price'

type StandardTier = Exclude<OrderTier, 'trial'>

const tiers = [
  { tier: 'starter', price: 'price_starter', enabled: 'tier_starter_enabled' },
  { tier: 'pro', price: 'price_pro', enabled: 'tier_pro_enabled' },
  { tier: 'deep_dive', price: 'price_deep_dive', enabled: 'tier_deep_dive_enabled' },
] as const

export function lowestStandardOffer(expert: ExpertPublicPricing) {
  if (expert.service_paused) return null
  let cheapest: { tier: StandardTier; label: string; base: number; commission: number; total: number } | null = null
  for (const { tier, price, enabled } of tiers) {
    const base = expert[price]
    // Missing legacy flags have the same default as the existing checkout.
    if (expert[enabled] === false || !Number.isSafeInteger(base) || base < 0) continue
    const offer = { tier, label: TIER_CONFIG[tier].label, ...calculateTotal(base) }
    if (!cheapest || offer.total < cheapest.total) cheapest = offer
  }
  return cheapest
}

export function hasPublicTrial(expert: ExpertPublicPricing) {
  return !expert.service_paused && expert.trial_enabled && expert.trial_price !== null
    && Number.isSafeInteger(expert.trial_price) && expert.trial_price >= 0
}
