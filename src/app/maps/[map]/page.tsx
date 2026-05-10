import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { topicLabel } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { createAdminClient } from '@/lib/supabase/admin'

async function hasPublishedMapContent(map: string) {
  const admin = createAdminClient()
  const [{ count: guideCount }, { count: announcementCount }] = await Promise.all([
    admin.from('guides').select('id', { count: 'exact', head: true }).eq('published', true).eq('map', map),
    admin.from('announcements').select('id', { count: 'exact', head: true }).eq('published', true).eq('map', map),
  ])

  return Boolean((guideCount ?? 0) + (announcementCount ?? 0))
}

export async function generateMetadata({ params }: { params: { map: string } }): Promise<Metadata> {
  const label = topicLabel(params.map)
  const metadata = buildMetadata({
    title: `${label}: setups, rutas y consejos de Overwatch`,
    description: `Hemeroteca de ${label}: setups, rutas, composiciones, guias, noticias y consejos para revisar tus partidas de Overwatch.`,
    path: `/maps/${params.map}`,
  })

  if (!(await hasPublishedMapContent(params.map))) {
    metadata.robots = { index: false, follow: true }
  }

  return metadata
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
