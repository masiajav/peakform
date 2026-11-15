export const dynamic = 'force-dynamic'
import { editorialForPath } from '@/lib/editorial-store'
import GameEditorialArticle from '@/components/content/GameEditorialArticle'
import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { buildMetadata } from '@/lib/seo'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'

const guide = evergreenGuides['composiciones-overwatch-5v5-6v6']

export default async function TeamCompsGuidePage() {
  const revision = await editorialForPath('overwatch', '/guides/composiciones-overwatch-5v5-6v6')
  if (revision) return <GameEditorialArticle article={revision}/>

  return (
    <>
      <PublicNav />
      <EvergreenGuideArticle guide={guide} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const revision = await editorialForPath('overwatch', '/guides/composiciones-overwatch-5v5-6v6')
  if (revision) return buildMetadata({ title: revision.title, description: revision.description, path: revision.path, type: 'article' })
  const quality = evergreenGuideQualityDecision(guide)
  return buildMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    type: 'article',
    robots: { index: quality.indexable, follow: true },
  })
}
