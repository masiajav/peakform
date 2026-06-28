import { describe, expect, it } from 'vitest'
import { parseBlizzardPatchNotes } from '@/lib/overwatch-patch-notes'

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
})
