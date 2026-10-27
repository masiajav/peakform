import { describe, expect, it, vi } from 'vitest'
import { editorialPublicationIssues } from '@/lib/editorial-publication-checks'
import { editorialIssues, editorialVersion, evidenceMatches, type EditorialArticle, type EditorialEvidence } from '@/lib/editorial-record'
import { isReviewedGameArticleAdEligible } from '@/lib/game-article-ad-policy'
import { articleAdPlacement } from '@/lib/article-ad-placements'
import { checkEditorialLinks } from '../../scripts/check-editorial-links.mjs'
import { checkDeadlockBuild } from '../../scripts/check-deadlock-build.mjs'

const article: EditorialArticle = {
  game: 'deadlock', kind: 'guide', slug: 'almas', path: '/deadlock/guides/almas', title: 'Almas', description: 'Aprende a comprar',
  publishedAt: '2026-10-01', updatedAt: '2026-10-25', patch: 'Octubre', intro: 'Una introducción específica.',
  sections: [{ title: 'Primero', body: ['Un primer consejo concreto.'] }, { title: 'Después', body: ['Un segundo consejo distinto.'] }, { title: 'Al terminar', body: ['Un tercer ejemplo práctico.'] }],
  checklist: ['Observa', 'Decide', 'Comprueba'], faq: [{ question: '¿Cuándo comprar?', answer: 'Cuando puedas llegar a tiempo al objetivo con la compra.' }],
  sources: [{ title: 'Fuente primaria de prueba', url: 'https://example.com/source', primary: true, accessedAt: '2026-10-25' }],
}

describe('future editorial publication and advertising', () => {
  it('accepts an unavailable import notice only for a verified 404 of the correct hero', async () => {
    const unavailable: EditorialArticle = { ...article, kind: 'build', hero: 'haze', slug: 'haze', path: '/deadlock/builds/haze', buildImportUnavailable: { code: 899427, heroId: 13, checkedAt: '2026-10-25' } }
    expect(editorialIssues(unavailable)).toEqual([])
    expect(editorialIssues({ ...unavailable, game: 'overwatch' })).toContain('Aviso de build no disponible no válido')
    try {
      vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 404 })))
      await expect(checkDeadlockBuild(unavailable)).resolves.toContain('import control removed')
      await expect(checkDeadlockBuild({ ...unavailable, buildImportUnavailable: { ...unavailable.buildImportUnavailable!, heroId: 1 } })).rejects.toThrow('hero mismatch')
      vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 500 })))
      await expect(checkDeadlockBuild(unavailable)).rejects.toThrow('unavailability changed')
      vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 200 })))
      await expect(checkDeadlockBuild(unavailable)).rejects.toThrow('unavailability changed')
    } finally { vi.unstubAllGlobals() }
  })
  it('rejects copied FAQs without invalidating historical publication evidence', () => {
    const duplicate = { ...article, faq: [{ question: '¿Qué hago?', answer: ' UN PRIMER consejo concreto.  ' }] }
    const evidence: EditorialEvidence = { version: editorialVersion(duplicate), reviewer: 'codex-automated', reviewedAt: '2026-10-25', report: 'Historical test fixture', checks: { facts: true, sources: true, links: true, desktop: true, mobile: true, originality: true } }
    expect(editorialPublicationIssues(duplicate)).toContain('Una respuesta FAQ copia un párrafo del artículo')
    expect(evidenceMatches(duplicate, evidence)).toBe(true)
    expect(isReviewedGameArticleAdEligible(duplicate, [duplicate])).toBe(false)
  })

  it('requires the exact currently reviewed publication and excludes previews and non-ad categories', () => {
    expect(isReviewedGameArticleAdEligible(article, [article])).toBe(true)
    expect(isReviewedGameArticleAdEligible(article, [])).toBe(false)
    expect(isReviewedGameArticleAdEligible({ ...article, intro: 'Edited after review.' }, [article])).toBe(false)
    expect(isReviewedGameArticleAdEligible(article, [article], true)).toBe(false)
    const hero = { ...article, kind: 'hero' as const, path: '/deadlock/heroes/almas' }
    expect(isReviewedGameArticleAdEligible(hero, [hero])).toBe(false)
    const overwatch = { ...article, game: 'overwatch' as const, path: '/guides/almas' }
    expect(isReviewedGameArticleAdEligible(overwatch, [overwatch])).toBe(true)
  })

  it('detects repeated paragraphs, questions and answers but permits distinct useful FAQs', () => {
    expect(editorialPublicationIssues(article)).toEqual([])
    expect(editorialPublicationIssues({ ...article, intro: article.sections[0].body[0] })).toContain('El artículo repite párrafos completos')
    expect(editorialPublicationIssues({ ...article, faq: [...article.faq!, ...article.faq!] })).toEqual(expect.arrayContaining(['Hay preguntas frecuentes repetidas', 'Hay respuestas FAQ repetidas']))
  })

  it('shares slots and never inserts an after-video placement without a video', () => {
    expect(articleAdPlacement('summary')).toEqual({ variant: 'inline', slot: 'guide-after-summary' })
    expect(articleAdPlacement('video')).toBeNull()
    expect(articleAdPlacement('video', true)).toEqual({ variant: 'inline', slot: 'guide-after-video' })
    expect(articleAdPlacement('sidebar')).toEqual({ variant: 'sidebar', slot: 'guide-sidebar-rectangle' })
  })

  it('checks distinct public internal links and rejects missing or off-site destinations', async () => {
    const request = vi.fn(async () => new Response('', { status: 200 }))
    await checkEditorialLinks(['/guides/almas#uno', '/guides/almas#dos', '//example.org/', '/api/private', '/dashboard/orders'], 'https://www.replaidlab.com', request)
    expect(request).toHaveBeenCalledTimes(1)
    await expect(checkEditorialLinks(['/missing'], 'https://www.replaidlab.com', async () => new Response('', { status: 404 }))).rejects.toThrow('Internal link unavailable')
    const redirected = new Response('', { status: 200 })
    Object.defineProperty(redirected, 'url', { value: 'https://example.org/' })
    await expect(checkEditorialLinks(['/redirect'], 'https://www.replaidlab.com', async () => redirected)).rejects.toThrow('redirected off site')
  })
})
