import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { ROLE_LABELS, ROLE_SLUGS, type ContentRole } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { ROLE_SEO } from '@/lib/overwatch-seo'
import { notFound } from 'next/navigation'

function assertRole(role: string): ContentRole {
  if (![...ROLE_SLUGS, 'flex'].includes(role as ContentRole)) notFound()
  return role as ContentRole
}

export function generateMetadata({ params }: { params: { role: string } }): Metadata {
  const role = assertRole(params.role)
  const label = ROLE_LABELS[role]
  const roleSeo = ROLE_SEO[role as keyof typeof ROLE_SEO]

  return buildMetadata({
    title: roleSeo?.searchTitle || `Guías de ${label} en Overwatch`,
    description: roleSeo?.searchDescription || `Hemeroteca de ${label}: guías, noticias, fundamentos, posicionamiento, macro y expertos recomendados para mejorar en Overwatch.`,
    path: `/roles/${role}`,
  })
}

export default function RolePage({ params }: { params: { role: string } }) {
  const role = assertRole(params.role)
  const label = ROLE_LABELS[role]
  const roleSeo = ROLE_SEO[role as keyof typeof ROLE_SEO]

  return (
    <TopicArchivePage
      kind="role"
      slug={role}
      title={roleSeo?.searchTitle || `${label} en Overwatch`}
      description={roleSeo?.searchDescription || `Guías, noticias, fundamentos, errores comunes y expertos recomendados para jugadores de ${label}.`}
    />
  )
}
