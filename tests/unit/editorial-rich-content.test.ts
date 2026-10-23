import { describe, expect, it } from 'vitest'
import { editorialIssues, editorialVersion, evidenceMatches, type EditorialArticle, type EditorialEvidence } from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'
import reviews from '@/lib/deadlock-launch-reviews.json'
import catalog from '@/lib/deadlock-catalog.json'

const article: EditorialArticle = {
  ...launch[0] as EditorialArticle,
  sections: [...launch[0].sections, {
    title: 'Compras', body: ['Elige según la siguiente pelea.'],
    table: { columns: ['Objeto', 'Almas'], rows: [['Piel de Metal', '3200']] },
  }],
  faq: [{ question: '¿Qué protege?', answer: 'Protege frente a balas durante su efecto.' }],
  related: [{ href: '/deadlock/guides/economia-almas', label: 'Economía' }],
}
describe('editorial tables and related content', () => {
  it('keeps the fallback approved against the exact payload and searchable names', () => {
    for (const a of launch) expect(evidenceMatches(a as EditorialArticle, reviews[a.path as keyof typeof reviews] as EditorialEvidence)).toBe(true)
    expect(catalog.find(h => h.aliases.includes('Violet'))?.name).toBe('Violeta')
    expect(catalog.find(h => h.aliases.includes('Baba'))).toBeDefined()
    expect(new Set(catalog.map(h => h.id)).size).toBe(catalog.length)
  })
  it('accepts complete tables and rejects a row with missing cells', () => {
    expect(editorialIssues(article)).toEqual([])
    const broken = structuredClone(article)
    broken.sections.at(-1)!.table!.rows[0].pop()
    expect(editorialIssues(broken)).toContain('Tabla incompleta')
    broken.sections.at(-1)!.table!.columns = []
    expect(editorialIssues(broken)).toContain('Tabla incompleta')
  })
  it('binds factual table corrections and FAQ answers to a new review', () => {
    const evidence: EditorialEvidence = { version: editorialVersion(article), reviewer: 'codex-automated', reviewedAt: '2026-10-23', checks: { facts: true, sources: true, links: true, desktop: true, mobile: true, originality: true }, report: 'Item effect and price checked.' }
    const changed = structuredClone(article)
    changed.sections.at(-1)!.table!.rows[0][1] = '999'
    expect(evidenceMatches(article, evidence)).toBe(true)
    expect(evidenceMatches(changed, evidence)).toBe(false)
    expect(evidenceMatches({ ...article, faq: [{ question: '¿Qué protege?', answer: 'Everything' }] }, evidence)).toBe(false)
  })
  it('rejects unrelated external discovery links and malformed questions', () => {
    expect(editorialIssues({ ...article, related: [{ href: '//example.com', label: 'Off-site' }] })).toContain('Enlaces relacionados no válidos')
    expect(editorialIssues({ ...article, faq: [{ question: '', answer: 'x' }] })).toContain('Preguntas frecuentes no válidas')
  })
})
