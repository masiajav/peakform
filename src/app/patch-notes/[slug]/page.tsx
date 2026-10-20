import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementArticlePage from '@/components/content/AnnouncementArticlePage'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { announcementQualityDecision, robotsForQuality } from '@/lib/indexing-policy'
import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { resolveLegacyPatchArchive } from '@/lib/legacy-patch-archives'

export const dynamic = 'force-dynamic'

const fetchPatchNote = cache(async (slug: string) => {
  noStore()

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .eq('content_type', 'patch_note')
    .maybeSingle()

  if (error) throw new Error('No se ha podido cargar la nota del parche')
  return data ? resolveLegacyPatchArchive(data as AnnouncementContent) : null
})

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const article = await fetchPatchNote(params.slug)
  if (!article) return {}
  const quality = announcementQualityDecision(article)

  return buildMetadata({
    title: article.seo_title || article.title,
    description: articleDescription(article),
    path: announcementPath(article),
    image: article.cover_image,
    type: 'article',
    robots: robotsForQuality(quality),
  })
}

export default async function PatchNoteDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await fetchPatchNote(params.slug)
  if (!article) notFound()

  return <AnnouncementArticlePage article={article} reviewedAt={article.archiveReviewedAt} sectionLabel="Patch notes" sectionHref="/patch-notes" schemaType="Article" />
}
