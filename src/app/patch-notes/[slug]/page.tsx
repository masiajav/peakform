import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementArticlePage from '@/components/content/AnnouncementArticlePage'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { unstable_noStore as noStore } from 'next/cache'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function fetchPatchNote(slug: string) {
  noStore()

  const admin = createAdminClient()
  const { data } = await admin
    .from('announcements')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .eq('content_type', 'patch_note')
    .single()

  return data as AnnouncementContent | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await fetchPatchNote(params.slug)
  if (!article) return {}

  return buildMetadata({
    title: article.seo_title || article.title,
    description: articleDescription(article),
    path: announcementPath(article),
    image: article.cover_image,
    type: 'article',
  })
}

export default async function PatchNoteDetailPage({ params }: { params: { slug: string } }) {
  const article = await fetchPatchNote(params.slug)
  if (!article) notFound()

  return <AnnouncementArticlePage article={article} sectionLabel="Patch notes" sectionHref="/patch-notes" schemaType="Article" />
}
