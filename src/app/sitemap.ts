import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, ROLE_SLUGS } from '@/lib/content'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import {
  PILLAR_COUNTER_SLUGS,
  PILLAR_HERO_SLUGS,
  PILLAR_GUIDE_SLUGS,
  PILLAR_TEAM_COMP_SLUGS,
  TRUST_ROUTES,
  expertQualityDecision,
  isAnnouncementSitemapEligible,
  isGuideSitemapEligible,
} from '@/lib/indexing-policy'
import { absoluteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const STATIC_LAST_MODIFIED: Record<string, string> = {
  '/overwatch-temporada-3-into-the-tigers-den': '2026-06-16',
  '/counters/shion': '2026-06-28',
  '/team-comps/shion': '2026-06-28',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/experts',
    '/heroes',
    '/guides',
    '/counters',
    '/team-comps',
    '/news',
    '/overwatch-temporada-3-into-the-tigers-den',
    ...PILLAR_GUIDE_SLUGS.map(slug => `/guides/${slug}`),
    ...TRUST_ROUTES,
    ...ROLE_SLUGS.map(role => `/roles/${role}`),
    ...PILLAR_HERO_SLUGS.map(hero => `/heroes/${hero}`),
    ...COUNTER_HEROES.filter(hero => PILLAR_COUNTER_SLUGS.includes(hero.slug)).map(hero => `/counters/${hero.slug}`),
    ...TEAM_COMP_HEROES.filter(hero => PILLAR_TEAM_COMP_SLUGS.includes(hero.slug)).map(hero => `/team-comps/${hero.slug}`),
  ].map(path => {
    const normalizedPath = path || '/'
    const lastModified = STATIC_LAST_MODIFIED[normalizedPath]
    return {
      url: absoluteUrl(normalizedPath),
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      changeFrequency: path === '' ? 'daily' as const : 'weekly' as const,
      priority: path === '' ? 1 : path.startsWith('/counters/') || path.startsWith('/team-comps/') ? 0.74 : 0.7,
    }
  })

  const admin = createAdminClient()
  const [{ data: guides }, { data: announcements }, { data: experts }] = await Promise.all([
    admin.from('guides').select('slug, title, excerpt, seo_description, body, category, content_type, map, updated_at, created_at').eq('published', true),
    admin.from('announcements').select('slug, title, excerpt, seo_description, body, content_type, map, updated_at, created_at').eq('published', true),
    admin.from('experts').select('id, slug, display_name, bio, specialties, avatar_url, peak_rank, main_role, status, tier_starter_enabled, tier_pro_enabled, tier_deep_dive_enabled, updated_at, created_at').eq('status', 'active'),
  ])

  const guideRoutes = (guides ?? [])
    .filter((guide: any) => isGuideSitemapEligible(guide))
    .map((guide: any) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(guide.updated_at || guide.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

  const announcementRoutes = (announcements ?? [])
    .filter((item: any) => item.content_type !== 'patch_note' && isAnnouncementSitemapEligible(item))
    .map((item: any) => ({
      url: absoluteUrl(announcementPath(item)),
      lastModified: new Date(item.updated_at || item.created_at),
      changeFrequency: item.content_type === 'patch_note' ? 'weekly' as const : 'daily' as const,
      priority: item.content_type === 'patch_note' ? 0.72 : 0.65,
    }))

  const expertRoutes = (experts ?? [])
    .filter((expert: any) => expertQualityDecision(expert).indexable)
    .map((expert: any) => ({
      url: absoluteUrl(`/experts/${expert.slug || expert.id}`),
      lastModified: new Date(expert.updated_at || expert.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  const routes = [...staticRoutes, ...guideRoutes, ...announcementRoutes, ...expertRoutes]
  return Array.from(new Map(routes.map(route => [route.url, route])).values())
}
