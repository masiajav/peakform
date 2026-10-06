import type { Metadata } from 'next'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import FlexRolePage from '@/components/content/FlexRolePage'
import { flexRoleGuide } from '@/lib/flex-role-guide'
import { ROLE_LABELS, ROLE_SLUGS, type ContentRole } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { ROLE_SEO } from '@/lib/overwatch-seo'
import { notFound } from 'next/navigation'
import { robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'

function assertRole(role: string): ContentRole {
  if (![...ROLE_SLUGS, 'flex'].includes(role as ContentRole)) notFound()
  return role as ContentRole
}

export async function generateMetadata(props: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const params = await props.params;
  const role = assertRole(params.role)
  const label = ROLE_LABELS[role]
  const roleSeo = ROLE_SEO[role as keyof typeof ROLE_SEO]
  const quality = topicQualityDecision('role', role)

  return buildMetadata({
    title: role === 'flex' ? flexRoleGuide.seoTitle : roleSeo?.searchTitle || `Guías de ${label} en Overwatch`,
    description: role === 'flex' ? flexRoleGuide.seoDescription : roleSeo?.searchDescription || `Hemeroteca de ${label}: guías, noticias, fundamentos, posicionamiento, macro y expertos recomendados para mejorar en Overwatch.`,
    path: `/roles/${role}`,
    type: role === 'flex' ? 'article' : 'website',
    robots: robotsForQuality(quality),
  })
}

export default async function RolePage(props: { params: Promise<{ role: string }> }) {
  const params = await props.params;
  const role = assertRole(params.role)
  if (role === 'flex') return <FlexRolePage />
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
