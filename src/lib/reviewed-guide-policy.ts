// Kept separate from article bodies because the ad gate also runs in the browser.
const videoTargets: Record<string, string> = {
  'orisa-guia-video-overwatch': 'orisa-guia-overwatch-fortify-javelin',
  'doomfist-guia-video-overwatch': 'doomfist-guia-overwatch-entradas-cooldowns',
  'sigma-guia-video-overwatch': 'sigma-guia-overwatch-poke-escudo',
  'ashe-guia-video-overwatch': 'ashe-guia-overwatch-angulos-dinamita',
  'sojourn-guia-video-overwatch': 'sojourn-guia-overwatch-railgun-presion',
  'baptiste-guia-video-overwatch': 'baptiste-guia-overwatch-lamp-window',
  'mercy-guia-video-overwatch': 'mercy-guia-overwatch-pocket-resurrect',
  'moira-guia-video-overwatch': 'moira-guia-overwatch-recursos-supervivencia',
}

const reviewedSlugs = new Set(Object.values(videoTargets))

export function reviewedGuideTarget(slug?: string | null) {
  return slug && Object.hasOwn(videoTargets, slug) ? videoTargets[slug] : undefined
}

export function hasReviewedGuideRevision(slug?: string | null) {
  return Boolean(slug && reviewedSlugs.has(slug))
}
