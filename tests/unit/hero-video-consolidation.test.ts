import { createRequire } from 'node:module'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { getRankedHeroGuide } from '@/lib/ranked-hero-guides'
import { reviewedGuideTarget } from '@/lib/reviewed-guide-policy'
import { discoverableGuides } from '@/lib/guide-discovery'
import RankedHeroGuideArticle from '@/components/content/RankedHeroGuideArticle'

vi.mock('@/components/layout/PublicNav', () => ({ default: () => null }))

const sources = [
  {hero:'ana',slug:'ana-primeros-habitos-impactar-mas',id:'7DrtWksik9I'},
  {hero:'kiriko',slug:'kiriko-guia-video-overwatch',id:'hgHc2YZY3WE'},
  {hero:'genji',slug:'genji-guia-video-overwatch',id:'PpqRqH0M9sk'},
  {hero:'cassidy',slug:'cassidy-guia-video-overwatch',id:'CS-hiY9EysU'},
  {hero:'reinhardt',slug:'reinhardt-guia-video-overwatch',id:'WV8V7UMqyAg'},
  {hero:'dva',slug:'dva-guia-video-overwatch',id:'h6ITrTAqIUM'},
]

describe('hero video consolidation into the existing ranked articles', () => {
  it.each(sources)('keeps $hero original video with its own context on the actual redirect destination', async source => {
    const target = `como-jugar-${source.hero}-ranked-overwatch`
    const guide = getRankedHeroGuide(target)!
    expect(reviewedGuideTarget(source.slug)).toBe(target)
    const config = createRequire(import.meta.url)('../../next.config.js')
    expect(await config.redirects()).toContainEqual({source:`/guides/${source.slug}`,destination:`/guides/${target}`,permanent:true})
    expect(guide.video?.id).toBe(source.id)
    const html = renderToStaticMarkup(createElement(RankedHeroGuideArticle, {guide}))
    expect(html).toContain(`https://www.youtube-nocookie.com/embed/${source.id}`)
    expect(html).toContain(guide.video!.context)
    expect(html).toContain(guide.video!.channel)
    const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]))
    const videoSchema = schemas.find(item => item['@type'] === 'VideoObject')
    expect(videoSchema).not.toHaveProperty('contentUrl')
    expect(videoSchema.embedUrl).toBe(`https://www.youtube-nocookie.com/embed/${source.id}`)
    expect(videoSchema.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/)
    expect(guide.publishedAt).toBe('2026-06-21')
    expect(guide.modifiedAt).toBe('2026-10-20')
    expect(discoverableGuides([{slug:source.slug,published:true}])).toEqual([])
  })
  it('does not turn the Winston satire into a competitive tutorial or redirect it away', () => {
    expect(getRankedHeroGuide('como-jugar-winston-ranked-overwatch')!.video).toBeUndefined()
    expect(reviewedGuideTarget('winston-guia-video-overwatch')).toBeUndefined()
  })
  it('removes the old Ana redirect chain and preserves the two specialist video destinations', async () => {
    const config = createRequire(import.meta.url)('../../next.config.js')
    expect(await config.redirects()).toContainEqual({source:'/guides/ana-guia-video-overwatch',destination:'/guides/como-jugar-ana-ranked-overwatch',permanent:true})
    expect(reviewedGuideTarget('tracer-guia-video-overwatch')).toBe('tracer-presion-lateral-sin-morir-gratis')
    expect(reviewedGuideTarget('zarya-guia-video-overwatch')).toBe('zarya-guia-overwatch-burbujas-energia')
    expect(reviewedGuideTarget('toString')).toBeUndefined()
  })
})
