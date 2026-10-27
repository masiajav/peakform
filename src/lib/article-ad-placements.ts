// One placement contract for both games. A placement never grants approval.
export const ARTICLE_AD_PLACEMENTS = {
  summary: { variant: 'inline', slot: 'guide-after-summary' },
  video: { variant: 'inline', slot: 'guide-after-video' },
  sidebar: { variant: 'sidebar', slot: 'guide-sidebar-rectangle' },
} as const

export type ArticleAdPosition = keyof typeof ARTICLE_AD_PLACEMENTS

export function articleAdPlacement(position: ArticleAdPosition, hasVideo = false) {
  return position === 'video' && !hasVideo ? null : ARTICLE_AD_PLACEMENTS[position]
}
