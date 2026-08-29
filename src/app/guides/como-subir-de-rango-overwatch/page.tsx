import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { buildMetadata } from '@/lib/seo'

const guide = evergreenGuides['como-subir-de-rango-overwatch']

export const metadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.seoDescription,
  path: `/guides/${guide.slug}`,
  type: 'article',
})

export default function RankUpGuidePage() {
  return (
    <>
      <PublicNav />
      <EvergreenGuideArticle guide={guide} />
    </>
  )
}
