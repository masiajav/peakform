import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import { ROLE_LABELS, ROLE_SLUGS, type ContentRole } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

function assertRole(role: string): ContentRole {
  if (![...ROLE_SLUGS, 'flex'].includes(role as ContentRole)) notFound()
  return role as ContentRole
}

export function generateMetadata({ params }: { params: { role: string } }): Metadata {
  const role = assertRole(params.role)
  const label = ROLE_LABELS[role]
  return buildMetadata({
    title: `Guías de ${label} en Overwatch`,
    description: `Hemeroteca de ${label}: guías, noticias, fundamentos, posicionamiento, macro y expertos recomendados para mejorar en Overwatch.`,
    path: `/roles/${role}`,
  })
}

export default function RolePage({ params }: { params: { role: string } }) {
  const role = assertRole(params.role)
  const label = ROLE_LABELS[role]

  return (
    <TopicArchivePage
      kind="role"
      slug={role}
      title={`${label} en Overwatch`}
      description={`Guías, noticias, fundamentos, errores comunes y expertos recomendados para jugadores de ${label}.`}
    />
  )
}
