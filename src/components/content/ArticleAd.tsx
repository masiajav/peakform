import AdSlot from './AdSlot'
import { articleAdPlacement, type ArticleAdPosition } from '@/lib/article-ad-placements'

export default function ArticleAd({ position, allowAds = false, hasVideo = false }: {
  position: ArticleAdPosition
  allowAds?: boolean
  hasVideo?: boolean
}) {
  const placement = articleAdPlacement(position, hasVideo)
  return placement ? <AdSlot {...placement} allowAds={allowAds} /> : null
}
