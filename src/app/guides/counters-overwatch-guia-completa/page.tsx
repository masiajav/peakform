import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { buildMetadata } from '@/lib/seo'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'

const guide = evergreenGuides['counters-overwatch-guia-completa']

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.seoDescription,
  path: `/guides/${guide.slug}`,
  type: 'article',
  robots: { index: evergreenGuideQualityDecision(guide).indexable, follow: true },
})

export default function CounterGuidePage() {
  return (
    <>
      <PublicNav />
      <EvergreenGuideArticle guide={guide} />
    </>
  )
}
