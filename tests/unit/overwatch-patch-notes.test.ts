import { describe, expect, it } from 'vitest'
import { extractBlizzardPatchArchiveUrls, parseBlizzardPatchNotes } from '@/lib/overwatch-patch-notes'
import { patchNotePublicationIssues } from '@/lib/indexing-policy'

const PATCH_HTML = `
  <div class="PatchNotes-patch PatchNotes-live">
    <div class="anchor" id="patch-2026-06-24"></div>
    <div class="PatchNotes-labels"><div class="PatchNotes-date">24 de junio de 2026</div></div>
    <h3 class="PatchNotes-patchTitle">Notas del parche de Overwatch – 24 de junio de 2026</h3>
    <h4 class="PatchNotes-sectionTitle">Actualización de la jugabilidad</h4>
    <h4 class="PatchNotes-sectionTitle">Evento Golpe de ánima</h4>
  </div>
  <div data-kind="patch" class="PatchNotes-live PatchNotes-patch">
    <div class="anchor extra" id="patch-2026-06-23"></div>
    <time datetime="2026-06-23"></time>
    <div class="PatchNotes-date extra">23 de junio de 2026</div>
    <h3 data-title="patch" class="extra PatchNotes-patchTitle">Notas del parche de Overwatch – 23 de junio de 2026</h3>
    <h4 class="extra PatchNotes-sectionTitle">Correcciones</h4>
  </div>
`

describe('Blizzard patch notes parser', () => {
  it('extracts and orders patch notes with flexible class attributes', () => {
    const notes = parseBlizzardPatchNotes(PATCH_HTML, 5)

    expect(notes).toHaveLength(2)
    expect(notes[0]).toMatchObject({
      sourceId: 'patch-2026-06-24',
      sourcePublishedAt: '2026-06-24T12:00:00.000Z',
      sections: ['Actualización de la jugabilidad', 'Evento Golpe de ánima'],
      slug: 'notas-parche-overwatch-2026-06-24',
    })
    expect(notes[1].sourceId).toBe('patch-2026-06-23')
  })

  it('respects the requested import limit', () => {
    expect(parseBlizzardPatchNotes(PATCH_HTML, 1)).toHaveLength(1)
  })

  it('finds recent monthly archive URLs when the current month is empty', () => {
    const html = `<script>patchNotesDates = {"live":["2026-07","2026-06","2026-05"],"ptr":[]};</script>`

    expect(extractBlizzardPatchArchiveUrls(html, 2)).toEqual([
      'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/07',
      'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/06',
    ])
  })

  it('keeps the exact monthly source URL for each imported note', () => {
    const [note] = parseBlizzardPatchNotes(
      PATCH_HTML,
      1,
      'https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/06',
    )

    expect(note.sourceUrl).toBe('https://overwatch.blizzard.com/es-es/news/patch-notes/live/2026/06#patch-2026-06-24')
  })

  it('creates an editorial draft that cannot be published untouched', () => {
    const [draft] = parseBlizzardPatchNotes(PATCH_HTML, 1)
    const issues = patchNotePublicationIssues({
      ...draft,
      content_type: 'patch_note',
      tags: ['auto-import', 'editorial-draft'],
    })

    expect(issues).toContain('Añade la etiqueta editorial-review-complete')
    expect(issues).toContain('Elimina todos los marcadores pendientes del borrador')
  })

  it('accepts a fully reviewed patch note', () => {
    const sourceUrl = 'https://overwatch.blizzard.com/es-es/news/patch-notes/'
    const body = `${Array.from({ length: 430 }, () => 'análisis').join(' ')}\n\n[Guía de Ana](/heroes/ana)\n\n[Nota oficial](${sourceUrl})`
    const issues = patchNotePublicationIssues({
      slug: 'notas-parche-overwatch-2026-06-24',
      body,
      excerpt: 'Resumen editorial del parche con los cambios principales y su impacto directo dentro de las partidas competitivas.',
      seo_title: 'Notas del parche de Overwatch del 24 de junio: cambios y análisis',
      seo_description: 'Cambios del parche explicados para ranked, con héroes afectados, matchups importantes y guías relacionadas para jugar mejor.',
      content_type: 'patch_note',
      source_url: sourceUrl,
      source_published_at: '2026-06-24T12:00:00.000Z',
      tags: ['editorial-review-complete'],
    })

    expect(issues).toEqual([])
  })
})
