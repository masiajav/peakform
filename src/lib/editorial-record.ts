import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import type { GameId } from './games'
export type EditorialKind = 'hero' | 'counter' | 'build' | 'guide' | 'news' | 'patch_note' | 'map' | 'team_comp'
export type EditorialSection = {
  title: string; body: string[]; bullets?: string[]
  table?: { columns: string[]; rows: string[][] }
}
export type EditorialArticle = {
  game: GameId; kind: EditorialKind; slug: string; path: string; title: string; description: string
  hero?: string; aliases?: string[]; image?: string; publishedAt: string; updatedAt: string; patch: string
  intro: string; sections: EditorialSection[]
  faq?: { question: string; answer: string }[]
  related?: { href: string; label: string }[]
  checklist: string[]; sources: { title: string; url: string; accessedAt: string; primary?: boolean }[]
}
export type EditorialEvidence = {
  version: string; reviewer: 'codex-automated'; reviewedAt: string
  checks: { facts: boolean; sources: boolean; links: boolean; desktop: boolean; mobile: boolean; originality: boolean }; report: string
}
export const SECTION_KIND: Record<string, EditorialKind> = { heroes: 'hero', counters: 'counter', builds: 'build', guides: 'guide', news: 'news', 'patch-notes': 'patch_note', maps: 'map', 'team-comps': 'team_comp' }
export function editorialVersion(article: EditorialArticle) {
  function ordered(v: any): any { return Array.isArray(v) ? v.map(ordered) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, ordered(v[k])])) : typeof v === 'string' ? v.replace(/\r\n/g, '\n') : v }
  return createHash('sha256').update(JSON.stringify(ordered(article))).digest('hex')
}
export function safeSourceUrl(value: string) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !u.port && !isIP(u.hostname) && !u.hostname.startsWith('[') && !/\.(local|localhost|internal)$/i.test(u.hostname) && u.hostname.includes('.') } catch { return false }
}
export function editorialIssues(input: unknown): string[] {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return ['Artículo no válido']
  try {
  const a = input as EditorialArticle; const issues: string[] = []
  if (!['overwatch','deadlock'].includes(a.game)) issues.push('Juego no válido')
  if (!Object.values(SECTION_KIND).includes(a.kind)) issues.push('Tipo no válido')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug || '')) issues.push('Slug no válido')
  const section = Object.keys(SECTION_KIND).find(s => SECTION_KIND[s] === a.kind)
  if (a.path !== `${a.game === 'deadlock' ? '/deadlock' : ''}/${section}/${a.slug}`) issues.push('Ruta ajena al juego o al tipo')
  for (const k of ['title','description','intro','patch'] as const) if (typeof a[k] !== 'string' || !a[k].trim()) issues.push(`Falta ${k}`)
  for (const k of ['publishedAt','updatedAt'] as const) if (!Number.isFinite(Date.parse(a[k]))) issues.push(`Fecha ${k} no válida`)
  if (Date.parse(a.updatedAt) < Date.parse(a.publishedAt)) issues.push('La actualización precede a la publicación')
  if (!Array.isArray(a.sections) || a.sections.length < 3 || a.sections.some(s => typeof s.title !== 'string' || !Array.isArray(s.body) || !s.body.length || s.body.some(p => typeof p !== 'string' || !p.trim()) || (s.bullets && (!Array.isArray(s.bullets) || s.bullets.some(b => typeof b !== 'string'))))) issues.push('Secciones incompletas')
  if (!Array.isArray(a.checklist) || a.checklist.length < 3 || a.checklist.some(c => typeof c !== 'string' || !c.trim())) issues.push('Falta checklist práctica')
  for (const section of a.sections ?? []) {
    const table = section.table
    if (table && (!Array.isArray(table.columns) || table.columns.length < 2
      || table.columns.some(c => typeof c !== 'string' || !c.trim())
      || !Array.isArray(table.rows) || table.rows.length === 0
      || table.rows.some(row => !Array.isArray(row) || row.length !== table.columns.length || row.some(cell => typeof cell !== 'string')))) issues.push('Tabla incompleta')
  }
  if (a.faq && (!Array.isArray(a.faq) || a.faq.some(f => !f.question?.trim() || !f.answer?.trim()))) issues.push('Preguntas frecuentes no válidas')
  if (a.related && (!Array.isArray(a.related) || a.related.some(l => !l.label?.trim() || !/^\/(?!\/)/.test(l.href)))) issues.push('Enlaces relacionados no válidos')
  if (!Array.isArray(a.sources) || a.sources.length === 0 || a.sources.some(s => !s.title || !safeSourceUrl(s.url) || !Number.isFinite(Date.parse(s.accessedAt)))) issues.push('Fuentes no válidas')
  else if (!a.sources.some(s => s.primary) && new Set(a.sources.map(s => new URL(s.url).hostname.replace(/^www\./,''))).size < 2) issues.push('Se necesitan dos fuentes independientes o una fuente primaria')
  return issues
  } catch { return ['Estructura editorial no válida'] }
}
export function evidenceMatches(article: EditorialArticle, evidence: EditorialEvidence | null | undefined) {
  return editorialIssues(article).length === 0 && evidence?.version === editorialVersion(article) && evidence.reviewer === 'codex-automated' && Number.isFinite(Date.parse(evidence.reviewedAt)) && Boolean(evidence.report?.trim()) && ['facts','sources','links','desktop','mobile','originality'].every(k => evidence.checks?.[k as keyof EditorialEvidence['checks']] === true)
}
