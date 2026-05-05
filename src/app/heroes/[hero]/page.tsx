import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { topicLabel } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  return buildMetadata({
    title: `${label}: guias, counters y consejos de Overwatch`,
    description: `Hemeroteca de ${label}: guias, counters, mapas, errores comunes, noticias y recursos para mejorar en Overwatch.`,
    path: `/heroes/${params.hero}`,
  })
}

export default function HeroPage({ params }: { params: { hero: string } }) {
  const label = topicLabel(params.hero)

  return (
    <TopicArchivePage
      kind="hero"
      slug={params.hero}
      title={`${label} en Overwatch`}
      description={`Guias, counters, mapas, noticias y consejos aplicables para jugar mejor con ${label}.`}
    />
  )
}
