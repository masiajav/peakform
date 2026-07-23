export const PUBLIC_HERO_PAGE_SLUGS = [
  'shion',
  'ana',
  'kiriko',
  'genji',
  'reinhardt',
  'dva',
  'winston',
  'cassidy',
] as const

export function isPublicHeroPageSlug(slug: string) {
  return PUBLIC_HERO_PAGE_SLUGS.includes(slug as typeof PUBLIC_HERO_PAGE_SLUGS[number])
}

export function heroTopicHref(slug: string) {
  return isPublicHeroPageSlug(slug) ? `/heroes/${slug}` : `/guides?hero=${encodeURIComponent(slug)}`
}

export function safeTopicHref(href: string) {
  const match = href.match(/^\/heroes\/([^/?#]+)$/)
  return match ? heroTopicHref(match[1]) : href
}
