export const dynamic = 'force-dynamic'
import { editorialForPath } from '@/lib/editorial-store'
import GameEditorialArticle from '@/components/content/GameEditorialArticle'
import { buildMetadata as revisionMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import EvergreenGuideArticle from '@/components/content/EvergreenGuideArticle'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { buildMetadata } from '@/lib/seo'
import { evergreenGuideQualityDecision } from '@/lib/indexing-policy'

const guide = evergreenGuides['como-subir-de-rango-overwatch']

const legacyMetadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.seoDescription,
  path: `/guides/${guide.slug}`,
  type: 'article',
  robots: { index: evergreenGuideQualityDecision(guide).indexable, follow: true },
})

export default async function RankUpGuidePage() {
  const revision = await editorialForPath('overwatch', '/guides/como-subir-de-rango-overwatch')
  if (revision) return <GameEditorialArticle article={revision}/>

  return (
    <>
      <PublicNav />
      <EvergreenGuideArticle guide={guide} />
    </>
  )
}

export async function generateMetadata(){const revision=await editorialForPath('overwatch','/guides/como-subir-de-rango-overwatch');return revision?revisionMetadata({title:revision.title,description:revision.description,path:revision.path,type:'article'}):legacyMetadata}
