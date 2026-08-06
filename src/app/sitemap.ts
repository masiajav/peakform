import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, ROLE_SLUGS } from '@/lib/content'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { MAP_PILLARS } from '@/lib/overwatch-maps'
import { TEAM_COMP_HEROES } from '@/lib/overwatch-team-comps'
import {
  PILLAR_COUNTER_SLUGS,
  PILLAR_HERO_SLUGS,
  PILLAR_MAP_SLUGS,
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
  '/dmon-nuevo-heroe-tank-overwatch': '2026-08-06',
  '/heroes/dmon': '2026-08-06',
  '/busan-eichenwalde-paraiso-reworks-overwatch': '2026-08-02',
  '/overwatch-temporada-3-into-the-tigers-den': '2026-06-16',
  '/counters/shion': '2026-06-28',
  '/team-comps/shion': '2026-06-28',
  '/counters/ana': '2026-06-28',
  '/team-comps/ana': '2026-06-28',
  '/counters/genji': '2026-06-28',
  '/team-comps/genji': '2026-06-28',
  '/counters/kiriko': '2026-06-28',
  '/team-comps/kiriko': '2026-07-01',
  '/counters/reinhardt': '2026-07-01',
  '/team-comps/reinhardt': '2026-07-01',
  '/counters/dva': '2026-07-01',
  '/team-comps/dva': '2026-07-01',
  '/counters/winston': '2026-07-01',
  '/team-comps/winston': '2026-07-01',
  '/counters/cassidy': '2026-07-01',
  '/team-comps/cassidy': '2026-07-01',
  '/counters/zarya': '2026-07-12',
  '/counters/tracer': '2026-07-12',
  '/counters/domina': '2026-07-12',
  '/maps/neon-junction': '2026-07-04',
  '/maps/kings-row': '2026-07-04',
  '/maps/lijiang-tower': '2026-07-04',
  '/maps/dorado': '2026-07-04',
  '/maps/antarctic-peninsula': '2026-07-04',
  '/maps/busan': '2026-07-04',
  '/maps/ilios': '2026-07-04',
  '/maps/nepal': '2026-07-04',
  '/maps/oasis': '2026-07-04',
  '/maps/samoa': '2026-07-04',
  '/maps/circuit-royal': '2026-07-04',
  '/maps/havana': '2026-07-04',
  '/maps/junkertown': '2026-07-04',
  '/maps/rialto': '2026-07-04',
  '/maps/route-66': '2026-07-04',
  '/maps/shambali-monastery': '2026-07-04',
  '/maps/watchpoint-gibraltar': '2026-07-04',
  '/maps/aatlis': '2026-07-04',
  '/maps/new-junk-city': '2026-07-04',
  '/maps/suravasa': '2026-07-04',
  '/maps/blizzard-world': '2026-07-04',
  '/maps/eichenwalde': '2026-07-04',
  '/maps/hollywood': '2026-07-04',
  '/maps/midtown': '2026-07-04',
  '/maps/numbani': '2026-07-04',
  '/maps/paraiso': '2026-07-04',
  '/maps/colosseo': '2026-07-04',
  '/maps/esperanca': '2026-07-04',
  '/maps/new-queen-street': '2026-07-04',
  '/maps/runasapi': '2026-07-04',
}

const MAP_LAST_MODIFIED = Object.fromEntries(
  MAP_PILLARS.map(map => [`/maps/${map.slug}`, map.updatedAtIso]),
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/experts',
    '/heroes',
    '/guides',
    '/counters',
    '/team-comps',
    '/maps',
    '/news',
    '/dmon-nuevo-heroe-tank-overwatch',
    '/busan-eichenwalde-paraiso-reworks-overwatch',
    '/overwatch-temporada-3-into-the-tigers-den',
    ...PILLAR_GUIDE_SLUGS.map(slug => `/guides/${slug}`),
    ...TRUST_ROUTES,
    ...ROLE_SLUGS.map(role => `/roles/${role}`),
    ...PILLAR_HERO_SLUGS.map(hero => `/heroes/${hero}`),
    ...PILLAR_MAP_SLUGS.map(map => `/maps/${map}`),
    ...COUNTER_HEROES.filter(hero => PILLAR_COUNTER_SLUGS.includes(hero.slug)).map(hero => `/counters/${hero.slug}`),
    ...TEAM_COMP_HEROES.filter(hero => PILLAR_TEAM_COMP_SLUGS.includes(hero.slug)).map(hero => `/team-comps/${hero.slug}`),
  ].map(path => {
    const normalizedPath = path || '/'
    const lastModified = STATIC_LAST_MODIFIED[normalizedPath] ?? MAP_LAST_MODIFIED[normalizedPath]
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
