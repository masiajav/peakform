import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, DEFAULT_HEROES, ROLE_SLUGS } from '@/lib/content'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/experts',
    '/guides',
    '/counters',
    '/team-comps',
    '/news',
    '/legal',
    ...ROLE_SLUGS.map(role => `/roles/${role}`),
    ...DEFAULT_HEROES.map(hero => `/heroes/${hero}`),
    ...COUNTER_HEROES.map(hero => `/counters/${hero.slug}`),
    ...TEAM_COMP_HEROES.map(hero => `/team-comps/${hero.slug}`),
  ].map(path => ({
    url: absoluteUrl(path || '/'),
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.startsWith('/counters/') || path.startsWith('/team-comps/') ? 0.74 : 0.7,
  }))

  const admin = createAdminClient()
  const [{ data: guides }, { data: announcements }, { data: experts }] = await Promise.all([
    admin.from('guides').select('slug, map, updated_at, created_at').eq('published', true),
    admin.from('announcements').select('slug, content_type, map, updated_at, created_at').eq('published', true),
    admin.from('experts').select('id, slug, updated_at, created_at').eq('status', 'active'),
  ])

  const guideRoutes = (guides ?? []).map((guide: any) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updated_at || guide.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  const announcementRoutes = (announcements ?? []).map((item: any) => ({
    url: absoluteUrl(announcementPath(item)),
    lastModified: new Date(item.updated_at || item.created_at),
    changeFrequency: item.content_type === 'patch_note' ? 'weekly' as const : 'daily' as const,
    priority: item.content_type === 'patch_note' ? 0.72 : 0.65,
  }))

  const expertRoutes = (experts ?? []).map((expert: any) => ({
    url: absoluteUrl(`/experts/${expert.slug || expert.id}`),
    lastModified: new Date(expert.updated_at || expert.created_at || now),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const mapRecords = [...(guides ?? []), ...(announcements ?? [])].filter((item: any) => item.map)
  const mapRoutes = Array.from(new Map(mapRecords.map((item: any) => [
    item.map,
    {
      url: absoluteUrl(`/maps/${item.map}`),
      lastModified: new Date(item.updated_at || item.created_at || now),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ])).values())

  return [...staticRoutes, ...guideRoutes, ...announcementRoutes, ...expertRoutes, ...mapRoutes]
}
