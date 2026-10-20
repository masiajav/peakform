import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementArticlePage from '@/components/content/AnnouncementArticlePage'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { announcementQualityDecision, robotsForQuality } from '@/lib/indexing-policy'
import { ANNOUNCEMENT_REVIEW_COLUMNS } from '@/lib/editorial-review'
import { notFound } from 'next/navigation'
import { cache } from 'react'

const fetchNews = cache(async (slug: string) => {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .select(ANNOUNCEMENT_REVIEW_COLUMNS)
    .eq('slug', slug)
    .eq('published', true)
    .neq('content_type', 'patch_note')
    .maybeSingle()

  if (error) throw new Error('No se ha podido cargar la noticia')
  return data as AnnouncementContent | null
})

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const article = await fetchNews(params.slug)
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

export default async function NewsDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await fetchNews(params.slug)
  if (!article) notFound()

  return <AnnouncementArticlePage article={article} sectionLabel="Noticias" sectionHref="/news" schemaType="NewsArticle" />
}
