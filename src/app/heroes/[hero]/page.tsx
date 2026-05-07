import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { topicLabel } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { buildHeroSeoProfile } from '@/lib/overwatch-seo'

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)

  return buildMetadata({
    title: profile?.searchTitle || `Guía de ${label} en Overwatch: consejos, counters y vídeos`,
    description: profile?.searchDescription || `Hemeroteca de ${label}: guías, counters, mapas, errores comunes, noticias y recursos para mejorar en Overwatch.`,
    path: `/heroes/${params.hero}`,
  })
}

export default function HeroPage({ params }: { params: { hero: string } }) {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)

  return (
    <TopicArchivePage
      kind="hero"
      slug={params.hero}
      title={`Guía de ${label} en Overwatch`}
      description={profile?.searchDescription || `Guías, counters, mapas, noticias y consejos aplicables para jugar mejor con ${label}.`}
    />
  )
}
