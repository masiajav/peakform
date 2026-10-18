import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { reviewedTankGuide as guide } from '@/lib/reviewed-ranked-fundamentals'
import { buildMetadata } from '@/lib/seo'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle, description: guide.seoDescription,
  path: `/guides/${guide.slug}`, type: 'article',
  robots: { index: evergreenGuideQualityDecision(guide).indexable, follow: true },
})

export default function TankFundamentalsPage() {
  return <><PublicNav /><EvergreenGuideArticle guide={guide} /></>
}
