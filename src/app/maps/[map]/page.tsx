import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MapPillarPage from '@/components/content/MapPillarPage'
import { getMapPillar, MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'
import { buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return MAP_PILLAR_SLUGS.map(map => ({ map }))
}

export async function generateMetadata(props: { params: Promise<{ map: string }> }): Promise<Metadata> {
  const params = await props.params;
  const map = getMapPillar(params.map)
  if (!map) return {}

  return buildMetadata({
    title: map.seoTitle,
    description: map.seoDescription,
    path: `/maps/${map.slug}`,
    image: map.image,
    type: 'article',
    robots: robotsForQuality(topicQualityDecision('map', map.slug)),
  })
}

export default async function MapPage(props: { params: Promise<{ map: string }> }) {
  const params = await props.params;
  const map = getMapPillar(params.map)
  if (!map) notFound()

  return <MapPillarPage map={map} />
}
