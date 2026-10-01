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
  'junker-queen-guia-video-overwatch': 'junker-queen-guia-overwatch-tempo-heridas',
  'echo-guia-video-overwatch': 'echo-guia-overwatch-burst-vertical',
  'pharah-guia-video-overwatch': 'pharah-guia-overwatch-presion-aerea',
  'soldier-76-guia-video-overwatch': 'soldier-76-guia-overwatch-off-angles',
  'widowmaker-guia-video-overwatch': 'widowmaker-guia-overwatch-lineas-vision',
  'brigitte-guia-video-overwatch': 'brigitte-guia-overwatch-peel-anti-dive',
  'illari-guia-video-overwatch': 'illari-guia-overwatch-pilon-dano',
  'lucio-guia-video-overwatch': 'lucio-guia-overwatch-speed-peel',
  'zenyatta-guia-video-overwatch': 'zenyatta-guia-overwatch-discord-transcendence',
}

const reviewedSlugs = new Set(Object.values(videoTargets))

export function reviewedGuideTarget(slug?: string | null) {
  return slug && Object.hasOwn(videoTargets, slug) ? videoTargets[slug] : undefined
}

export function hasReviewedGuideRevision(slug?: string | null) {
  return Boolean(slug && reviewedSlugs.has(slug))
}
