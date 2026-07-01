export const STRIPE_PLATFORM_COUNTRY = 'ES'

export const STRIPE_COUNTRY_OPTIONS = [
  { code: 'ES', label: 'España' },
  { code: 'CL', label: 'Chile' },
] as const

export type StripeCountryCode = typeof STRIPE_COUNTRY_OPTIONS[number]['code']

export function isSupportedStripeCountry(value: unknown): value is StripeCountryCode {
  return typeof value === 'string'
    && STRIPE_COUNTRY_OPTIONS.some(country => country.code === value.toUpperCase())
}

export function normalizeStripeCountry(value: string): StripeCountryCode {
  return value.toUpperCase() as StripeCountryCode
}

export function stripeCountryLabel(code: string | null | undefined) {
  return STRIPE_COUNTRY_OPTIONS.find(country => country.code === code)?.label ?? code ?? 'Sin seleccionar'
}
