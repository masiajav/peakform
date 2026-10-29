import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STATIC_EDITORIAL_REVIEWS } from '@/lib/static-editorial-reviews'
import { getCounterPillar, getTeamCompPillar } from '@/lib/seo-clusters'
import { flexRoleGuide } from '@/lib/flex-role-guide'
import { getHeroPillar } from '@/lib/hero-pillars'
import { getMapPillar } from '@/lib/overwatch-maps'
import { getRankedHeroGuide } from '@/lib/ranked-hero-guides'
import { evergreenGuides } from '@/lib/evergreen-guides'
import { reviewedGuideRevisions } from '@/lib/reviewed-guide-revisions'
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
      '/maps/kings-row', '/maps/lijiang-tower', '/maps/neon-junction', '/maps/dorado', '/maps/blizzard-world', '/maps/nepal',
      '/counters/ana', '/counters/shion', '/team-comps/shion', '/counters/reinhardt', '/counters/dva', '/counters/winston', '/counters/cassidy', '/counters/tracer', '/counters/domina', '/counters/zarya',
      '/counters/doomfist', '/counters/dmon', '/team-comps/doomfist', '/team-comps/dmon',
      '/counters/anran', '/counters/baptiste', '/counters/doctrine', '/counters/freja', '/counters/genji', '/counters/hazard', '/counters/illari', '/counters/jetpack-cat', '/counters/junker-queen', '/counters/junkrat', '/counters/juno', '/counters/kiriko', '/counters/lifeweaver', '/counters/lucio', '/counters/mauga', '/counters/mercy', '/counters/mizuki', '/counters/moira', '/counters/orisa', '/counters/pharah', '/counters/ramattra', '/counters/reaper', '/counters/roadhog', '/counters/sigma', '/counters/soldier-76', '/counters/sombra', '/counters/vendetta', '/counters/venture', '/counters/wrecking-ball', '/counters/wuyang', '/counters/zenyatta',
      '/guides/como-jugar-ana-ranked-overwatch', '/guides/como-jugar-cassidy-ranked-overwatch', '/guides/como-jugar-dva-ranked-overwatch', '/guides/como-jugar-genji-ranked-overwatch', '/guides/como-jugar-kiriko-ranked-overwatch', '/guides/como-jugar-reinhardt-ranked-overwatch', '/guides/como-jugar-winston-ranked-overwatch',
      '/guides/como-mejorar-en-overwatch', '/guides/como-subir-de-rango-overwatch', '/guides/como-revisar-cooldowns-overwatch', '/guides/composiciones-overwatch-5v5-6v6', '/guides/counters-overwatch-guia-completa', '/guides/mejores-heroes-overwatch', '/guides/review-vod-overwatch-espanol',
      '/guides/como-mejorar-como-tank-overwatch', '/guides/como-usar-ultimates-overwatch', '/guides/cuando-cambiar-de-heroe-overwatch',
      '/guides/como-mejorar-como-dps-overwatch', '/guides/como-mejorar-como-support-overwatch',
      '/guides/moira-guia-overwatch-recursos-supervivencia', '/guides/reaper-guia-video-overwatch', '/team-comps/moira', '/team-comps/reaper',
      '/guides/brigitte-guia-overwatch-peel-anti-dive', '/counters/brigitte', '/team-comps/brigitte',
      '/guides/echo-guia-overwatch-burst-vertical', '/counters/echo', '/team-comps/echo',
      '/guides/ashe-guia-overwatch-angulos-dinamita', '/counters/ashe', '/team-comps/ashe',
      '/guides/hanzo-guia-video-overwatch', '/counters/hanzo', '/team-comps/hanzo',
      '/guides/mei-guia-video-overwatch', '/counters/mei', '/team-comps/mei',
      '/guides/sojourn-guia-overwatch-railgun-presion', '/counters/sojourn', '/team-comps/sojourn',
      '/guides/bastion-guia-video-overwatch', '/counters/bastion', '/team-comps/bastion',
      '/guides/symmetra-guia-video-overwatch', '/counters/symmetra', '/team-comps/symmetra',
      '/guides/torbjorn-guia-video-overwatch', '/counters/torbjorn', '/team-comps/torbjorn',
      '/guides/mauga-guia-video-overwatch', '/team-comps/mauga',
      '/guides/ramattra-guia-video-overwatch', '/team-comps/ramattra',
      '/guides/wrecking-ball-guia-video-overwatch', '/team-comps/wrecking-ball',
      '/guides/junkrat-guia-video-overwatch', '/team-comps/junkrat',
      '/guides/venture-guia-video-overwatch', '/team-comps/venture',
      '/guides/hazard-guia-video-overwatch', '/team-comps/hazard',
      '/guides/freja-guia-video-overwatch', '/team-comps/freja',
      '/guides/wuyang-guia-video-overwatch',
      '/guides/widowmaker-guia-overwatch-lineas-vision', '/counters/widowmaker', '/team-comps/widowmaker',
      '/guides/soldier-76-guia-overwatch-off-angles', '/team-comps/soldier-76',
      '/guides/doomfist-guia-overwatch-entradas-cooldowns', '/guides/roadhog-guia-video-overwatch',
      '/guides/sombra-guia-video-overwatch', '/guides/anran-guia-video-overwatch',
      '/guides/baptiste-guia-overwatch-lamp-window', '/team-comps/baptiste',
      '/guides/illari-guia-overwatch-pilon-dano', '/team-comps/illari',
      '/guides/lucio-guia-overwatch-speed-peel', '/team-comps/lucio',
      '/guides/zenyatta-guia-overwatch-discord-transcendence', '/team-comps/zenyatta',
      '/heroes/ana', '/heroes/cassidy', '/heroes/dmon', '/heroes/doctrine', '/heroes/dva', '/heroes/genji', '/heroes/kiriko', '/heroes/reinhardt', '/heroes/shion', '/heroes/tracer', '/heroes/winston', '/heroes/zarya', '/roles/flex',
      '/team-comps/ana', '/team-comps/cassidy', '/team-comps/doctrine', '/team-comps/domina', '/team-comps/dva', '/team-comps/genji', '/team-comps/jetpack-cat', '/team-comps/kiriko', '/team-comps/reinhardt', '/team-comps/roadhog', '/team-comps/sombra', '/team-comps/tracer', '/team-comps/winston', '/team-comps/wuyang', '/team-comps/zarya',
    ].sort())
    for (const [articlePath, record] of Object.entries(STATIC_EDITORIAL_REVIEWS)) {
      const article = articlePath === '/roles/flex' ? flexRoleGuide : articlePath.startsWith('/maps/') ? getMapPillar(articlePath.split('/')[2]) : articlePath.startsWith('/guides/') ? getRankedHeroGuide(articlePath.split('/')[2]) ?? evergreenGuides[articlePath.split('/')[2]] ?? reviewedGuideRevisions[articlePath.split('/')[2]] : articlePath.startsWith('/heroes/') ? getHeroPillar(articlePath.split('/')[2]) : articlePath.startsWith('/team-comps/') ? getTeamCompPillar(articlePath.split('/')[2]) : getCounterPillar(articlePath.split('/')[2])
      expect(hasCurrentStaticEditorialReview(articlePath, article), articlePath).toBe(true)
      expect(existsSync(record.evidence), record.evidence).toBe(true)
      expect(matchesStaticEditorialReview(articlePath, { ...article, h1: 'Una edición no revisada' }, record)).toBe(false)
    }
  })
})
