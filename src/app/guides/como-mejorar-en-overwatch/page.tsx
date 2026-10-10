import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'
import { buildMetadata } from '@/lib/seo'

const guide = evergreenGuides['como-mejorar-en-overwatch']

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.seoDescription,
  path: `/guides/${guide.slug}`,
  type: 'article',
  robots: { index: evergreenGuideQualityDecision(guide).indexable, follow: true },
})

export default function ImproveOverwatchGuidePage() {
  return <><PublicNav /><EvergreenGuideArticle guide={guide} /></>
}
