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
import VodReviewNotebook from '@/components/content/VodReviewNotebook'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'

const guide = evergreenGuides['review-vod-overwatch-espanol']

const legacyMetadata: Metadata = buildMetadata({
  title: guide.seoTitle,
  description: guide.seoDescription,
  path: `/guides/${guide.slug}`,
  type: 'article',
  robots: { index: evergreenGuideQualityDecision(guide).indexable, follow: true },
})

export default async function VodReviewGuidePage() {
  const revision = await editorialForPath('overwatch', '/guides/review-vod-overwatch-espanol')
  if (revision) return <GameEditorialArticle article={revision}/>

  return (
    <>
      <PublicNav />
      <EvergreenGuideArticle guide={guide}>
        <VodReviewNotebook heroes={COUNTER_HEROES.map(hero => ({ slug: hero.slug, name: hero.name, role: hero.role }))} />
      </EvergreenGuideArticle>
    </>
  )
}

export async function generateMetadata(){const revision=await editorialForPath('overwatch','/guides/review-vod-overwatch-espanol');return revision?revisionMetadata({title:revision.title,description:revision.description,path:revision.path,type:'article'}):legacyMetadata}
