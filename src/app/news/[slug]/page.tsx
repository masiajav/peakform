import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import AnnouncementArticlePage from '@/components/content/AnnouncementArticlePage'
import { announcementPath, articleDescription, type AnnouncementContent } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

async function fetchNews(slug: string) {
  const admin = createAdminClient()
  const { data } = await admin
    .from('announcements')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .neq('content_type', 'patch_note')
    .single()

  return data as AnnouncementContent | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await fetchNews(params.slug)
  if (!article) return {}

  return buildMetadata({
    title: article.seo_title || article.title,
    description: articleDescription(article),
    path: announcementPath(article),
    image: article.cover_image,
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = await fetchNews(params.slug)
  if (!article) notFound()

  return <AnnouncementArticlePage article={article} sectionLabel="Noticias" sectionHref="/news" schemaType="NewsArticle" />
}
