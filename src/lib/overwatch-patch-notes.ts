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
  const blocks = extractPatchBlocks(html)

  return uniqueBySourceId(blocks
    .map(parsePatchBlock)
    .filter((item): item is BlizzardPatchNote => Boolean(item))
    .sort((a, b) => b.sourcePublishedAt.localeCompare(a.sourcePublishedAt)))
    .slice(0, limit)
}

function parsePatchBlock(block: string): BlizzardPatchNote | null {
  const dateLabel = textFromMatch(block, /<div[^>]*class="[^"]*\bPatchNotes-date\b[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  const title = textFromMatch(block, /<h3[^>]*class="[^"]*\bPatchNotes-patchTitle\b[^"]*"[^>]*>([\s\S]*?)<\/h3>/i)
  const anchor = attributeFromMatch(block, /<div[^>]*class="[^"]*\banchor\b[^"]*"[^>]*\bid="([^"]+)"[^>]*>/i)
  const datetime = attributeFromMatch(block, /<time[^>]*datetime="([^"]+)"[^>]*>/i)
  const sourcePublishedAt = parseSpanishDate(dateLabel) || parseIsoDate(datetime)

  if (!dateLabel || !title || !sourcePublishedAt) return null

  const sourceId = anchor || `patch-${sourcePublishedAt.slice(0, 10)}`
  const sourceUrl = `${BLIZZARD_PATCH_NOTES_URL}#${sourceId}`
  const sections = unique(
    Array.from(block.matchAll(/<h4[^>]*class="[^"]*\bPatchNotes-sectionTitle\b[^"]*"[^>]*>([\s\S]*?)<\/h4>/gi))
      .map(match => cleanText(match[1]))
      .filter(Boolean)
      .slice(0, 6)
  )
  const titleDate = title.replace(/^Notas del parche de Overwatch\s*(?:-|\u2013)\s*/i, '').trim() || dateLabel
  const slug = toSlug(`notas-parche-overwatch-${sourcePublishedAt.slice(0, 10)}`)
  const excerpt = `Blizzard publico una nueva actualizacion de Overwatch el ${dateLabel}. Te dejamos el contexto rapido y el enlace a la nota oficial.`
  const body = [
    `Blizzard publico una nueva actualizacion de Overwatch el ${dateLabel}.`,
    '',
    describeSections(sections),
    '',
    'En Replaid Lab la guardamos para tener a mano el contexto de cada parche sin copiar la nota completa. Si un heroe, mapa o sistema que usas a menudo aparece en la lista, conviene leer el detalle antes de sacar conclusiones en partida.',
    '',
    `Puedes leer todos los cambios en la web oficial de Blizzard: [${title}](${sourceUrl}).`,
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

function extractPatchBlocks(html: string) {
  const starts = Array.from(html.matchAll(/<div[^>]*class="[^"]*\bPatchNotes-patch\b[^"]*"[^>]*>/gi))
    .map(match => match.index)
    .filter((index): index is number => typeof index === 'number')

  return starts.map((start, index) => html.slice(start, starts[index + 1] ?? html.length))
}

function parseSpanishDate(value: string) {
  const match = cleanText(value).toLowerCase().match(/^(\d{1,2}) de ([^ ]+) de (\d{4})$/i)
  if (!match) return null

  const day = Number(match[1])
  const month = SPANISH_MONTHS[removeAccents(match[2])]
  const year = Number(match[3])
  if (!day || month === undefined || !year) return null

  return new Date(Date.UTC(year, month, day, 12, 0, 0)).toISOString()
}

function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return null
  const parsed = new Date(`${value.slice(0, 10)}T12:00:00.000Z`)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

function describeSections(sections: string[]) {
  if (sections.length === 0) {
    return 'Esta nota deja cambios y correcciones que merece la pena revisar antes de jugar, sobre todo si estas entrando a ranked o ajustando composiciones con tu equipo.'
  }

  return `La nota se centra sobre todo en ${formatNaturalList(sections.slice(0, 4))}. Conviene revisarla si estos cambios pueden afectar a tus picks, composiciones o rutinas de ranked.`
}

function textFromMatch(value: string, pattern: RegExp) {
  const match = value.match(pattern)
  return match ? cleanText(match[1]) : ''
}

function attributeFromMatch(value: string, pattern: RegExp) {
  return value.match(pattern)?.[1]?.trim() || ''
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

function uniqueBySourceId(values: BlizzardPatchNote[]) {
  return Array.from(new Map(values.map(value => [value.sourceId, value])).values())
}

function formatNaturalList(values: string[]) {
  if (values.length <= 1) return values[0] || 'los cambios principales'
  if (values.length === 2) return `${values[0]} y ${values[1]}`

  return `${values.slice(0, -1).join(', ')} y ${values[values.length - 1]}`
}
