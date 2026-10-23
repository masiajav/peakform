import 'server-only'
import { cache } from 'react'
import { createAdminClient } from './supabase/admin'
import { evidenceMatches, type EditorialArticle, type EditorialEvidence } from './editorial-record'
import launch from './deadlock-launch.json'
import approvals from './deadlock-launch-reviews.json'
import type { GameId } from './games'
export const launchArticles = launch as EditorialArticle[]
export const verifiedLaunchArticles = () => launchArticles.filter(a => evidenceMatches(a, (approvals as Record<string, EditorialEvidence>)[a.path]))
export const publishedEditorial = cache(async (game: GameId): Promise<EditorialArticle[]> => {
  const fallback = game === 'deadlock' ? verifiedLaunchArticles() : []
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return fallback
  try {
    const { data, error } = await createAdminClient().from('editorial_pages').select('path, payload, evidence, status').eq('game', game)
    if (error) { if (!['PGRST205','42P01'].includes(error.code)) console.error('editorial-store', error.code); return fallback }
    const merged = new Map(fallback.map(a => [a.path, a]))
    for (const row of data ?? []) {
      if (row.status === 'published' && evidenceMatches(row.payload, row.evidence)) merged.set(row.path, row.payload)
      else merged.delete(row.path)
    }
    return [...merged.values()]
  } catch { return fallback }
})
export async function editorialForPath(game: GameId, path: string) { return (await publishedEditorial(game)).find(a => a.path === path) ?? null }
