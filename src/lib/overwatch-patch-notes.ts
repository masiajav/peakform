import { toSlug } from './content'

export const BLIZZARD_PATCH_NOTES_URL = 'https://overwatch.blizzard.com/es-es/news/patch-notes/'
export const BLIZZARD_PATCH_SOURCE_NAME = 'blizzard-overwatch-patch-notes'

export interface BlizzardPatchNote {
  title: string
  dateLabel: string
  sourceId: string
  sourceUrl: string
  sourcePublishedAt: string
  sections: string[]
  slug: string
  excerpt: string
  body: string
}

const SPANISH_MONTHS: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
}

export function parseBlizzardPatchNotes(html: string, limit = 5): BlizzardPatchNote[] {
  const blocks = html.match(/<div class="PatchNotes-patch[\s\S]*?(?=<div class="PatchNotes-patch|<div class="PatchNotesTop">|<\/div><\/div><\/blz-section>)/g) ?? []

  return blocks
    .map(parsePatchBlock)
    .filter((item): item is BlizzardPatchNote => Boolean(item))
    .slice(0, limit)
}

function parsePatchBlock(block: string): BlizzardPatchNote | null {
  const dateLabel = textFromMatch(block, /<div class="PatchNotes-date">([\s\S]*?)<\/div>/)
  const title = textFromMatch(block, /<h3 class="PatchNotes-patchTitle">([\s\S]*?)<\/h3>/)
  const anchor = textFromMatch(block, /<div class="anchor" id="([^"]+)"><\/div>/)
  const sourcePublishedAt = parseSpanishDate(dateLabel)

  if (!dateLabel || !title || !sourcePublishedAt) return null

  const sourceId = anchor || `patch-${sourcePublishedAt.slice(0, 10)}`
  const sourceUrl = `${BLIZZARD_PATCH_NOTES_URL}#${sourceId}`
  const sections = unique(
    Array.from(block.matchAll(/<h4 class="PatchNotes-sectionTitle">([\s\S]*?)<\/h4>/g))
      .map(match => cleanText(match[1]))
      .filter(Boolean)
      .slice(0, 6)
  )
  const sectionSummary = sections.length > 0
    ? `Bloques principales detectados: ${sections.join(', ')}.`
    : 'Blizzard publicó cambios de juego y correcciones en esta actualización.'

  const titleDate = title.replace(/^Notas del parche de Overwatch\s*[–-]\s*/i, '').trim() || dateLabel
  const slug = toSlug(`notas-parche-overwatch-${sourcePublishedAt.slice(0, 10)}`)
  const excerpt = `Resumen propio de las notas oficiales de Overwatch publicadas por Blizzard el ${dateLabel}.`
  const body = [
    `Blizzard publicó nuevas notas oficiales de Overwatch el ${dateLabel}.`,
    '',
    sectionSummary,
    '',
    'Esta entrada de Replaid Lab resume la existencia de la actualización y apunta a la fuente oficial para consultar el detalle completo de cambios, ajustes y correcciones.',
    '',
    `Fuente oficial: [${title}](${sourceUrl})`,
  ].join('\n')

  return {
    title: `Notas del parche de Overwatch - ${titleDate}`,
    dateLabel,
    sourceId,
    sourceUrl,
    sourcePublishedAt,
    sections,
    slug,
    excerpt,
    body,
  }
}

function parseSpanishDate(value: string) {
  const match = cleanText(value).toLowerCase().match(/^(\d{1,2}) de ([a-záéíóúñ]+) de (\d{4})$/i)
  if (!match) return null

  const day = Number(match[1])
  const month = SPANISH_MONTHS[removeAccents(match[2])]
  const year = Number(match[3])
  if (!day || month === undefined || !year) return null

  return new Date(Date.UTC(year, month, day, 12, 0, 0)).toISOString()
}

function textFromMatch(value: string, pattern: RegExp) {
  const match = value.match(pattern)
  return match ? cleanText(match[1]) : ''
}

function cleanText(value: string) {
  return decodeHtml(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
}

function removeAccents(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}
