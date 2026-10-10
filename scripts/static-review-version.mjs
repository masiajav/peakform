import { createServer } from 'vite'

const requests = process.argv.slice(2)
if (!requests.length || requests.some(path => !/^\/(?:heroes|counters|team-comps|guides)\/[a-z0-9-]+$/.test(path) && path !== '/roles/flex')) {
  throw new Error('Pass exact /heroes/slug, /counters/slug, /team-comps/slug, editorial /guides/slug or /roles/flex paths to inspect; this command never approves or writes reviews.')
}
const server = await createServer({ configFile: false, server: { middlewareMode: true, watch: null } })
try {
  const { getCounterPillar, getTeamCompPillar } = await server.ssrLoadModule('/src/lib/seo-clusters.ts')
  const { staticEditorialContentVersion } = await server.ssrLoadModule('/src/lib/static-editorial-review.ts')
  const { flexRoleGuide } = await server.ssrLoadModule('/src/lib/flex-role-guide.ts')
  const { getHeroPillar } = await server.ssrLoadModule('/src/lib/hero-pillars.ts')
  const { getRankedHeroGuide } = await server.ssrLoadModule('/src/lib/ranked-hero-guides.ts')
  const { evergreenGuides } = await server.ssrLoadModule('/src/lib/evergreen-guides.ts')
  for (const path of requests) {
    const [, kind, slug] = path.split('/')
    const content = path === '/roles/flex' ? flexRoleGuide : kind === 'guides' ? getRankedHeroGuide(slug) ?? (Object.hasOwn(evergreenGuides, slug) ? evergreenGuides[slug] : null) : kind === 'heroes' ? getHeroPillar(slug) : kind === 'counters' ? getCounterPillar(slug) : getTeamCompPillar(slug)
    if (!content) throw new Error(`No editorial model for ${path}`)
    console.log(JSON.stringify({ path, version: staticEditorialContentVersion(path, content) }))
  }
} finally { await server.close() }
