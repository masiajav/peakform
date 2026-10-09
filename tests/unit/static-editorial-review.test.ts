import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { flexRoleGuide } from '@/lib/flex-role-guide'
import { getHeroPillar } from '@/lib/hero-pillars'
import { getRankedHeroGuide } from '@/lib/ranked-hero-guides'
import { hasCurrentStaticEditorialReview, matchesStaticEditorialReview, staticEditorialContentVersion } from '@/lib/static-editorial-review'

const path = '/counters/example'
const content = { title: 'Un texto concreto', intro: ['Primero lee la entrada.\nLuego mira la salida.'], links: [{ href: '/heroes/ana', label: 'Ana' }], updatedAt: '2026-10-02' }
const review = {
  path, version: staticEditorialContentVersion(path, content),
  reviewedAt: '2026-10-02', reviewer: 'test-fixture', evidence: 'docs/content-review-fade-wraith-2026-10-02.md',
  checks: { specific: true, accurate: true, links: true, visual: true },
}

describe('version-bound static editorial reviews', () => {
  it('matches the exact article and path, never just a known slug or length', () => {
    expect(matchesStaticEditorialReview(path, content, review)).toBe(true)
    expect(matchesStaticEditorialReview('/counters/other', content, review)).toBe(false)
    expect(hasCurrentStaticEditorialReview(path, content)).toBe(false)
    expect(matchesStaticEditorialReview(path, { ...content, title: 'Otro título' }, review)).toBe(false)
    expect(matchesStaticEditorialReview(path, { ...content, intro: ['Texto '.repeat(1500)] }, review)).toBe(false)
    expect(matchesStaticEditorialReview(path, { ...content, links: [{ href: '/heroes/genji', label: 'Ana' }] }, review)).toBe(false)
    expect(matchesStaticEditorialReview(path, { ...content, updatedAt: '2026-10-03' }, review)).toBe(false)
  })

  it('ignores object key order and CRLF, but not the order of editorial sections', () => {
    expect(staticEditorialContentVersion(path, { ...content, intro: content.intro.map(text => text.replace(/\n/g, '\r\n')) })).toBe(review.version)
    expect(staticEditorialContentVersion(path, { updatedAt: content.updatedAt, links: content.links, intro: content.intro, title: content.title })).toBe(review.version)
    expect(staticEditorialContentVersion(path, { intro: ['Uno', 'Dos'] })).not.toBe(staticEditorialContentVersion(path, { intro: ['Dos', 'Uno'] }))
  })

  it('rejects missing, malformed and incomplete evidence without throwing', () => {
    for (const invalid of [null, {}, { ...review, version: 'abc' }, { ...review, reviewer: '' }, { ...review, reviewer: 123 }, { ...review, evidence: '../docs/review.md' }, { ...review, reviewedAt: '2026-02-30' }, { ...review, reviewedAt: 123 }, { ...review, checks: { ...review.checks, visual: false } }]) {
      expect(matchesStaticEditorialReview(path, content, invalid)).toBe(false)
    }
    expect(matchesStaticEditorialReview(path, { value: NaN }, review)).toBe(false)
    expect(matchesStaticEditorialReview(path, { value: () => 'text' }, review)).toBe(false)
    expect(matchesStaticEditorialReview(path, new Date(), review)).toBe(false)
  })

  it('pins only individually reviewed article revisions, with existing evidence', () => {
    expect(Object.keys(STATIC_EDITORIAL_REVIEWS).sort()).toEqual([
      '/counters/anran', '/counters/baptiste', '/counters/freja', '/counters/genji', '/counters/hazard', '/counters/illari', '/counters/jetpack-cat', '/counters/junker-queen', '/counters/junkrat', '/counters/juno', '/counters/kiriko', '/counters/lifeweaver', '/counters/lucio', '/counters/mauga', '/counters/mercy', '/counters/mizuki', '/counters/moira', '/counters/orisa', '/counters/pharah', '/counters/ramattra', '/counters/reaper', '/counters/sigma', '/counters/soldier-76', '/counters/vendetta', '/counters/venture', '/counters/wrecking-ball', '/counters/wuyang', '/counters/zenyatta',
      '/guides/como-jugar-ana-ranked-overwatch', '/guides/como-jugar-cassidy-ranked-overwatch', '/guides/como-jugar-dva-ranked-overwatch', '/guides/como-jugar-genji-ranked-overwatch', '/guides/como-jugar-kiriko-ranked-overwatch', '/guides/como-jugar-reinhardt-ranked-overwatch', '/guides/como-jugar-winston-ranked-overwatch',
      '/heroes/ana', '/heroes/cassidy', '/heroes/dmon', '/heroes/doctrine', '/heroes/dva', '/heroes/genji', '/heroes/kiriko', '/heroes/reinhardt', '/heroes/shion', '/heroes/tracer', '/heroes/winston', '/heroes/zarya', '/roles/flex',
      '/team-comps/ana', '/team-comps/genji', '/team-comps/kiriko', '/team-comps/reinhardt', '/team-comps/tracer', '/team-comps/zarya',
    ])
    for (const [articlePath, record] of Object.entries(STATIC_EDITORIAL_REVIEWS)) {
      const article = articlePath === '/roles/flex' ? flexRoleGuide : articlePath.startsWith('/guides/') ? getRankedHeroGuide(articlePath.split('/')[2]) : articlePath.startsWith('/heroes/') ? getHeroPillar(articlePath.split('/')[2]) : articlePath.startsWith('/team-comps/') ? getTeamCompPillar(articlePath.split('/')[2]) : getCounterPillar(articlePath.split('/')[2])
      expect(hasCurrentStaticEditorialReview(articlePath, article), articlePath).toBe(true)
      expect(existsSync(record.evidence), record.evidence).toBe(true)
      expect(matchesStaticEditorialReview(articlePath, { ...article, h1: 'Una edición no revisada' }, record)).toBe(false)
    }
  })
})
