import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import ExpertPriceSummary from '@/components/content/ExpertPriceSummary'
import { hasPublicTrial, lowestStandardOffer, type ExpertPublicPricing } from '@/lib/expert-public-pricing'

const pricing: ExpertPublicPricing = {
  price_starter: 1000, price_pro: 1700, price_deep_dive: 2700,
  tier_starter_enabled: true, tier_pro_enabled: true, tier_deep_dive_enabled: true,
  service_paused: false, trial_enabled: true, trial_price: 100,
}

describe('accurate public expert prices', () => {
  it('uses the same commission and rounding as checkout, not a cheap introductory trial', () => {
    expect(lowestStandardOffer(pricing)).toEqual({ tier: 'starter', label: 'Starter', base: 1000, commission: 200, total: 1200 })
    expect(lowestStandardOffer({ ...pricing, price_starter: 1003 })?.total).toBe(1204)
  })
  it('never advertises a disabled Starter tier or assumes prices increase by tier', () => {
    expect(lowestStandardOffer({ ...pricing, tier_starter_enabled: false })?.tier).toBe('pro')
    expect(lowestStandardOffer({ ...pricing, price_deep_dive: 900 })?.tier).toBe('deep_dive')
  })
  it('matches the checkout default for legacy flags rather than changing billing rules', () => {
    expect(lowestStandardOffer({ ...pricing, tier_starter_enabled: undefined } as unknown as ExpertPublicPricing)?.tier).toBe('starter')
  })
  it.each([NaN, Infinity, -1, 100.5, null, undefined, '1000'])('does not turn invalid stored amounts into an advertised price: %s', value => {
    expect(lowestStandardOffer({ ...pricing, price_starter: value } as unknown as ExpertPublicPricing)?.tier).toBe('pro')
  })
  it('keeps zero distinct from a missing price', () => {
    expect(lowestStandardOffer({ ...pricing, price_starter: 0 })?.total).toBe(0)
  })
  it('does not advertise paused or disabled offers', () => {
    expect(lowestStandardOffer({ ...pricing, service_paused: true })).toBeNull()
    expect(hasPublicTrial({ ...pricing, service_paused: true })).toBe(false)
    expect(lowestStandardOffer({ ...pricing, tier_starter_enabled: false, tier_pro_enabled: false, tier_deep_dive_enabled: false })).toBeNull()
  })
  it('requires an actual valid trial price', () => {
    expect(hasPublicTrial(pricing)).toBe(true)
    expect(hasPublicTrial({ ...pricing, trial_price: null })).toBe(false)
    expect(hasPublicTrial({ ...pricing, trial_enabled: false })).toBe(false)
    expect(hasPublicTrial({ ...pricing, trial_price: -1 })).toBe(false)
  })
  it('renders a clear total, commission and tier without claiming checkout readiness', () => {
    const html = renderToStaticMarkup(createElement(ExpertPriceSummary, { expert: { ...pricing, tier_starter_enabled: false } }))
    expect(html).toContain('€20.40')
    expect(html).toContain('Pro')
    expect(html).toContain('20% de comisión')
    expect(html).not.toMatch(/€10.00|€1.00|InStock|Comprar/)
  })
  it('distinguishes a conditional trial, no offers, and a paused service', () => {
    const disabled = { ...pricing, tier_starter_enabled: false, tier_pro_enabled: false, tier_deep_dive_enabled: false }
    const html = (expert: ExpertPublicPricing) => renderToStaticMarkup(createElement(ExpertPriceSummary, { expert }))
    expect(html(disabled)).toContain('consulta las condiciones')
    expect(html({ ...disabled, trial_price: null })).toContain('Sin ofertas activas')
    expect(html({ ...pricing, service_paused: true })).toContain('Pedidos pausados')
    expect(html(disabled)).not.toContain('Desde')
  })
})
