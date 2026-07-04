import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MapPillarPage from '@/components/content/MapPillarPage'
import { getMapPillar, MAP_PILLAR_SLUGS } from '@/lib/overwatch-maps'
import { robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'
import { buildMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return MAP_PILLAR_SLUGS.map(map => ({ map }))
}

export function generateMetadata({ params }: { params: { map: string } }): Metadata {
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

export default function MapPage({ params }: { params: { map: string } }) {
  const map = getMapPillar(params.map)
  if (!map) notFound()

  return <MapPillarPage map={map} />
}
