import { describe, expect, it } from 'vitest'
import { resolveLegacyPatchArchive } from '@/lib/legacy-patch-archives'
import { announcementQualityDecision, isAnnouncementSitemapEligible } from '@/lib/indexing-policy'
import { editorialReviewTags } from '@/lib/editorial-review'
import type { AnnouncementContent } from '@/lib/content'

const dates = [1, 14, 17, 23, 28]
function legacy(day: number): AnnouncementContent {
  const date = `2026-04-${String(day).padStart(2, '0')}`
  const title = `Notas del parche de Overwatch - ${day} de abril de 2026`
  return {
    id: `old-${day}`, slug: `notas-parche-overwatch-${date}`, title,
    body: `Blizzard publico una nueva actualizacion de Overwatch el ${day} de abril de 2026.\n\nEsta nota deja cambios y correcciones que merece la pena revisar antes de jugar, sobre todo si estas entrando a ranked o ajustando composiciones con tu equipo.\n\nEn Replaid Lab la guardamos para tener a mano el contexto de cada parche sin copiar la nota completa. Si un heroe, mapa o sistema que usas a menudo aparece en la lista, conviene leer el detalle antes de sacar conclusiones en partida.\n\nPuedes leer todos los cambios en la web oficial de Blizzard: [${title}](https://overwatch.blizzard.com/es-es/news/patch-notes/#patch-${date}).`,
    published: true, content_type: 'patch_note', created_at: `${date}T12:00:00+00:00`, updated_at: '2026-05-12T10:16:01Z', tags: [],
  }
}

describe('individually written April patch archives', () => {
  it.each(dates)('replaces only the observed stub for April %i, without mutating its row or first publication', day => {
    const row = legacy(day)
    const original = structuredClone(row)
    const result = resolveLegacyPatchArchive(row)
    expect(row).toEqual(original)
    expect(result.body).not.toBe(row.body)
    expect(result.created_at).toBe(row.created_at)
    expect(result.slug).toBe(row.slug)
    expect(result.published).toBe(true)
    expect(result.updated_at).toBe(result.archiveReviewedAt)
    expect(result.body).toContain('https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/04/')
    expect(result.body).not.toMatch(/En Replaid Lab la guardamos|#patch-2026|title seo|keywords|lorem ipsum/i)
    expect(result.author).toBe('Replaid Lab')
    expect(announcementQualityDecision(result)).toMatchObject({ status: 'noindex_no_ads', indexable: false, adsAllowed: false })
    expect(isAnnouncementSitemapEligible(result)).toBe(false)
  })
  it('preserves later editorial changes, drafts, news, unknown slugs and approved database versions', () => {
    const row = legacy(1)
    const approved = { ...row, tags: editorialReviewTags(row, 'actual-reviewer', '2026-10-19T19:00:00Z') }
    for (const changed of [
      { ...row, body: `${row.body}\n\nUna corrección posterior.` },
      { ...row, published: false }, { ...row, content_type: 'news' },
      { ...row, slug: 'otro-parche' }, approved,
    ]) expect(resolveLegacyPatchArchive(changed)).toBe(changed)
  })
  it('identifies April Fools as an expired Arcade event, not a ranked balance patch', () => {
    const body = resolveLegacyPatchArchive(legacy(1)).body
    expect(body).toContain('no eran cambios del competitivo')
    expect(body).toContain('terminó el 13 de abril')
    expect(body).toContain('ventajas estaban desactivadas')
  })
  it('distinguishes the season launch, Sierra hotfix, later balance and maintenance', () => {
    const launch = resolveLegacyPatchArchive(legacy(14)).body
    expect(launch).toContain('Season 2: Cúspide')
    expect(launch).toContain('14 a 12 segundos')
    expect(launch).toContain('35 a 30 metros')
    expect(launch).toContain('Ramattra se incorporó a Estadio')
    const sierra = resolveLegacyPatchArchive(legacy(17)).body
    expect(sierra).toContain('7 a 9')
    expect(sierra).toContain('30 a 80')
    expect(sierra).toContain('no equivale automáticamente a tardar un 30 % más')
    const balance = resolveLegacyPatchArchive(legacy(23)).body
    expect(balance).toContain('Sombra todavía era DPS')
    expect(balance).toContain('8 a 7 segundos')
    expect(balance).toContain('275 de salud total')
    const maintenance = resolveLegacyPatchArchive(legacy(28)).body
    expect(maintenance).toContain('Eliminó los códigos de repetición')
    expect(maintenance).toContain('evento terminó el 11 de mayo')
    expect(maintenance).toContain('No era una sustitución de la cola competitiva')
  })
  it('has five different answers and descriptions rather than a date-substitution template', () => {
    const articles = dates.map(day => resolveLegacyPatchArchive(legacy(day)))
    expect(new Set(articles.map(article => article.title)).size).toBe(5)
    expect(new Set(articles.map(article => article.seo_description)).size).toBe(5)
    expect(new Set(articles.map(article => article.body.split('\n\n')[0])).size).toBe(5)
  })
})
