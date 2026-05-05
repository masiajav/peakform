import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { topicLabel } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { map: string } }): Metadata {
  const label = topicLabel(params.map)
  return buildMetadata({
    title: `${label}: setups, rutas y consejos de Overwatch`,
    description: `Hemeroteca de ${label}: setups, rutas, composiciones, guias, noticias y consejos para revisar tus partidas de Overwatch.`,
    path: `/maps/${params.map}`,
  })
}

export default function MapPage({ params }: { params: { map: string } }) {
  const label = topicLabel(params.map)

  return (
    <TopicArchivePage
      kind="map"
      slug={params.map}
      title={`${label} en Overwatch`}
      description={`Setups, rutas, composiciones, guias y noticias para entender mejor tus partidas en ${label}.`}
    />
  )
}
