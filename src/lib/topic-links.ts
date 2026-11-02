export const PUBLIC_HERO_PAGE_SLUGS = [
  'shion',
  'ana',
  'kiriko',
  'genji',
  'reinhardt',
  'dmon',
  'doctrine',
  'dva',
  'winston',
  'cassidy',
  'tracer',
  'zarya',
] as const

export function isPublicHeroPageSlug(slug: string) {
  return PUBLIC_HERO_PAGE_SLUGS.includes(slug as typeof PUBLIC_HERO_PAGE_SLUGS[number])
}

// These heroes have a reviewed guide, but no standalone /heroes/:slug page.
// Keep their canonical guides reachable without sending readers through a filter.
const PUBLIC_HERO_GUIDE_PATHS: Record<string, string> = {
  pharah: '/guides/pharah-guia-overwatch-presion-aerea',
  sombra: '/guides/sombra-guia-video-overwatch',
  roadhog: '/guides/roadhog-guia-video-overwatch',
  sierra: '/guides/sierra-guia-video-overwatch',
}

export function heroTopicHref(slug: string) {
  if (isPublicHeroPageSlug(slug)) return `/heroes/${slug}`
  return Object.hasOwn(PUBLIC_HERO_GUIDE_PATHS, slug)
    ? PUBLIC_HERO_GUIDE_PATHS[slug]
    : `/guides?hero=${encodeURIComponent(slug)}`
}

export function safeTopicHref(href: string) {
  const match = href.match(/^\/heroes\/([^/?#]+)$/)
  return match ? heroTopicHref(match[1]) : href
}
