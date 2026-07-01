export const STRIPE_PLATFORM_COUNTRY = 'ES'

export const STRIPE_COUNTRY_OPTIONS = [
  { code: 'ES', label: 'España', region: 'Europa' },
  { code: 'AR', label: 'Argentina', region: 'Latinoamérica' },
  { code: 'BO', label: 'Bolivia', region: 'Latinoamérica' },
  { code: 'BR', label: 'Brasil', region: 'Latinoamérica' },
  { code: 'CL', label: 'Chile', region: 'Latinoamérica' },
  { code: 'CO', label: 'Colombia', region: 'Latinoamérica' },
  { code: 'CR', label: 'Costa Rica', region: 'Latinoamérica' },
  { code: 'EC', label: 'Ecuador', region: 'Latinoamérica' },
  { code: 'SV', label: 'El Salvador', region: 'Latinoamérica' },
  { code: 'GT', label: 'Guatemala', region: 'Latinoamérica' },
  { code: 'MX', label: 'México', region: 'Latinoamérica' },
  { code: 'PA', label: 'Panamá', region: 'Latinoamérica' },
  { code: 'PY', label: 'Paraguay', region: 'Latinoamérica' },
  { code: 'PE', label: 'Perú', region: 'Latinoamérica' },
  { code: 'DO', label: 'República Dominicana', region: 'Latinoamérica' },
  { code: 'UY', label: 'Uruguay', region: 'Latinoamérica' },
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
