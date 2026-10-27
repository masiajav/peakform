import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

// Read-only diagnostic. It cannot grant reviews or change publication state.
const output = process.env.INDEXING_REVIEW_OUTPUT || 'reports/indexing-review-2026-10-27'
const base = process.env.INDEXING_REVIEW_BASE || 'https://www.replaidlab.com'
const seed = JSON.parse(await fs.readFile(process.env.INDEXING_REVIEW_SEED || 'reports/adsense-2026-10-25/inventory-after-content.json', 'utf8'))
await fs.mkdir(`${output}/models`, { recursive: true })
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
const [guides, announcements, editorial] = await Promise.all([
  db.from('guides').select('*').eq('published', true).eq('game', 'overwatch'),
  db.from('announcements').select('*').eq('published', true),
  db.from('editorial_pages').select('path,game,payload,version,evidence,status').eq('status', 'published'),
])
for (const result of [guides, announcements, editorial]) if (result.error) throw result.error
await fs.writeFile(`${output}/source-snapshot.json`, JSON.stringify({ at: new Date().toISOString(), guides: guides.data, announcements: announcements.data, editorial: editorial.data }, null, 2))

const server = await createServer({ configFile: false, resolve: { alias: { '@': path.resolve('src') } }, server: { middlewareMode: true, watch: null } })
try {
  const policy = await server.ssrLoadModule('/src/lib/indexing-policy.ts')
  const review = await server.ssrLoadModule('/src/lib/static-editorial-review.ts')
  const { STATIC_EDITORIAL_REVIEWS } = await server.ssrLoadModule('/src/lib/static-editorial-reviews.ts')
  const rowReview = await server.ssrLoadModule('/src/lib/editorial-review.ts')
  const guideRevisions = await server.ssrLoadModule('/src/lib/reviewed-guide-revisions.ts')
  const { getHeroPillar } = await server.ssrLoadModule('/src/lib/hero-pillars.ts')
  const { getCounterPillar, getTeamCompPillar } = await server.ssrLoadModule('/src/lib/seo-clusters.ts')
  const { getMapPillar } = await server.ssrLoadModule('/src/lib/overwatch-maps.ts')
  const { getRankedHeroGuide } = await server.ssrLoadModule('/src/lib/ranked-hero-guides.ts')
  const { evergreenGuides } = await server.ssrLoadModule('/src/lib/evergreen-guides.ts')
  const { flexRoleGuide } = await server.ssrLoadModule('/src/lib/flex-role-guide.ts')
  const sitemapResponse = await fetch(`${base}/sitemap.xml`, { signal: AbortSignal.timeout(30000) })
  if (!sitemapResponse.ok) throw Error(`Sitemap HTTP ${sitemapResponse.status}`)
  const sitemap = new Set([...((await sitemapResponse.text()).matchAll(/<loc>(.*?)<\/loc>/g))].map(match => new URL(match[1]).pathname))
  const seeded = seed.pages.filter(page => page.robots.includes('noindex') || (!page.path.includes('?') && /^\/(?:heroes|guides|counters|team-comps|maps|roles|news|patch-notes)\/[^/]+$/.test(page.path)))
  const sourcePaths = [...guides.data.map(row => `/guides/${row.slug}`), ...editorial.data.map(row => row.path)]
  const candidates = [...new Map([...seeded, ...sourcePaths.map(p => ({ path: p }))].map(row => [row.path,row])).values()]
  const rows = []
  let next = 0
  async function inspect(entry) {
    const url = new URL(entry.path, base)
    const row = { path: entry.path, observedAt: new Date().toISOString(), inSitemap: sitemap.has(url.pathname) }
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
      const html = await response.text()
      const robots = [...html.matchAll(/<meta\s+[^>]*name="(?:robots|googlebot)"[^>]*content="([^"]*)"/g)].map(match => match[1]).join('; ')
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html
      Object.assign(row, { status: response.status, resolvedPath: new URL(response.url).pathname, robots, currentlyNoindex: /noindex/.test(robots), title: html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '', liveContentSha256: createHash('sha256').update(main).digest('hex') })
      if (url.search) return { ...row, disposition: 'excluded-filter', reason: 'Variante de búsqueda o filtro; revisar la URL canónica, no indexar cada combinación.' }
      if (url.pathname.startsWith('/experts/')) return { ...row, disposition: 'excluded-profile', reason: 'Perfil comercial; fuera del objetivo de artículos editoriales.' }
      if (url.pathname === '/patch-notes') return { ...row, disposition: 'excluded-archive-hub', reason: 'Índice del archivo de parches; revisar sus artículos individuales, sin aprobar el índice como artículo.' }
      if (row.resolvedPath !== url.pathname) return { ...row, disposition: 'redirected-alias', reason: `Revisar la URL de destino ${row.resolvedPath}; conservar la redirección del alias.` }
      if (!row.currentlyNoindex) return { ...row, disposition: 'already-indexable', reason: 'La URL ya no publica noindex; no necesita desbloqueo.' }
      const [, kind, slug] = url.pathname.split('/')
      let model, decision, version, previousReview
      if (['heroes', 'counters', 'team-comps', 'maps'].includes(kind)) {
        model = kind === 'heroes' ? getHeroPillar(slug) : kind === 'counters' ? getCounterPillar(slug) : kind === 'team-comps' ? getTeamCompPillar(slug) : getMapPillar(slug)
        decision = policy.topicQualityDecision({ heroes: 'hero', counters: 'counter', 'team-comps': 'team_comp', maps: 'map' }[kind], slug)
      } else if (kind === 'roles' && slug === 'flex') {
        model = flexRoleGuide
        decision = policy.topicQualityDecision('role', slug)
      } else if (kind === 'guides') {
        const stored = guides.data.find(guide => guide.slug === slug)
        const staticGuide = getRankedHeroGuide(slug) ?? evergreenGuides[slug]
        if (staticGuide) {
          model = staticGuide
          decision = getRankedHeroGuide(slug) ? policy.rankedGuideQualityDecision(model) : policy.evergreenGuideQualityDecision(model)
        } else if (stored) {
          model = guideRevisions.hasReviewedGuideRevision(slug) ? guideRevisions.applyReviewedGuideRevision(stored) : stored
          decision = policy.guideQualityDecision(model)
          version = rowReview.editorialContentVersion(model)
          const tags = model.tags ?? []
          previousReview = tags.find(tag => tag.startsWith('__editorial_review_v1:')) ?? null
          const revision = guideRevisions.reviewedGuideRevisions[slug]
          if (revision) {
            row.reviewedTextVersion = review.staticEditorialContentVersion(url.pathname, revision)
            previousReview = STATIC_EDITORIAL_REVIEWS[url.pathname] ?? null
            row.reviewState = review.hasCurrentStaticEditorialReview(url.pathname, revision) ? 'current-static-review' : previousReview ? 'stale-static-review' : 'missing-static-review'
          } else row.reviewState = rowReview.hasCurrentEditorialReview(model) ? 'current-row-review' : previousReview ? 'stale-row-review' : 'missing-row-review'
        }
      } else if (['news', 'patch-notes'].includes(kind)) {
        model = announcements.data.find(article => article.slug === slug)
        if (model) { decision = policy.announcementQualityDecision(model); version = rowReview.editorialContentVersion(model); row.reviewState = rowReview.hasCurrentEditorialReview(model) ? 'current-row-review' : 'missing-or-stale-row-review' }
      }
      if (model && !version) {
        version = review.staticEditorialContentVersion(url.pathname, model)
        previousReview = STATIC_EDITORIAL_REVIEWS[url.pathname] ?? null
        row.reviewState = review.hasCurrentStaticEditorialReview(url.pathname, model) ? 'current-static-review' : previousReview ? 'stale-static-review' : 'missing-static-review'
      }
      if (model) {
        row.modelFile = `models/${kind}-${slug}.json`
        await fs.writeFile(`${output}/${row.modelFile}`, JSON.stringify(model, null, 2))
      }
      return { ...row, disposition: 'pending-individual-review', reason: decision?.reason ?? 'Localizar la fuente y el control específico de esta ruta antes de revisarla.', version, previousReview, decision }
    } catch (error) { return { ...row, disposition: 'inspection-error', reason: error.message } }
  }
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < candidates.length) { const entry = candidates[next++]; rows.push(await inspect(entry)); if (rows.length % 25 === 0) console.log(`Inspected ${rows.length}/${candidates.length}`) }
  }))
  rows.sort((a,b) => a.path.localeCompare(b.path))
  const totals = Object.fromEntries([...new Set(rows.map(row => row.disposition))].map(key => [key, rows.filter(row => row.disposition === key).length]))
  await fs.writeFile(`${output}/inventory.json`, JSON.stringify({ at: new Date().toISOString(), base, seedScope: 'Previously observed noindex URLs, re-fetched now; redirects are tracked separately from canonical articles.', totals, rows }, null, 2))
  console.log(JSON.stringify({ totals, reviewStates: Object.fromEntries([...new Set(rows.map(row => row.reviewState).filter(Boolean))].map(key => [key, rows.filter(row => row.reviewState === key).length])) }, null, 2))
} finally { await server.close() }
