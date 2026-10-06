import { createElement } from 'react'
import { act, create, type ReactTestRenderer } from 'react-test-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import EditorialReviewChecklist, { useEditorialReviewState } from '@/app/admin/content/EditorialReviewChecklist'
import GuideManager from '@/app/admin/content/GuideManager'
import AnnouncementManager from '@/app/admin/content/AnnouncementManager'
import { completeReviewChecks, reviewedPatchFixture } from '../fixtures/reviewed-patch'

let renderer: ReactTestRenderer | undefined
afterEach(() => { renderer?.unmount(); renderer = undefined; vi.unstubAllGlobals() })

describe('editorial review UI', () => {
  it('requires each checkbox and resets checks for a different form version or article', () => {
    let state!: ReturnType<typeof useEditorialReviewState>
    function Harness({ text, scope }: { text: string; scope: string }) {
      state = useEditorialReviewState({ body: text }, scope)
      return createElement(EditorialReviewChecklist, { checks: state.checks, onChange: state.setCheck })
    }
    act(() => { renderer = create(createElement(Harness, { text: 'Texto revisado', scope: 'first' })) })
    expect(state.approval).toBeUndefined()
    for (let index = 0; index < 4; index++) act(() => renderer!.root.findAllByType('input')[index].props.onChange({ target: { checked: true } }))
    expect(state.approval).toEqual(completeReviewChecks)
    act(() => renderer!.update(createElement(Harness, { text: 'Texto cambiado', scope: 'first' })))
    expect(state.approval).toBeUndefined()
    expect(renderer!.root.findAllByType('input').every(input => !input.props.checked)).toBe(true)
    act(() => renderer!.update(createElement(Harness, { text: 'Texto revisado', scope: 'second' })))
    expect(state.approval).toBeUndefined()
  })

  for (const kind of ['guide', 'announcement'] as const) {
    it(`${kind}: sends explicit review checks only for the current fully checked version`, async () => {
      const item = { ...reviewedPatchFixture, id: 'fixture', category: 'Héroes', tags: ['ranked', ...reviewedPatchFixture.tags] }
      const fetchMock = vi.fn(async () => ({ ok: true, json: async () => item }))
      vi.stubGlobal('fetch', fetchMock)
      act(() => {
        renderer = create(kind === 'guide' ? createElement(GuideManager, { initialGuides: [item] }) : createElement(AnnouncementManager, { initialAnnouncements: [item] }))
      })
      act(() => renderer!.root.findAllByType('button').find(button => button.props.children === 'Editar')!.props.onClick())
      let form = renderer!.root.findAllByType('form')[1]
      const textValues = form.findAllByType('input').map(input => input.props.value).filter(value => typeof value === 'string')
      expect(textValues.some(value => value.includes('__editorial_review_'))).toBe(false)
      for (let index = 0; index < 4; index++) act(() => renderer!.root.findAllByType('input').filter(input => input.props.type === 'checkbox')[index].props.onChange({ target: { checked: true } }))
      form = renderer!.root.findAllByType('form')[1]
      await act(async () => { await form.props.onSubmit({ preventDefault() {} }) })
      const request = fetchMock.mock.calls[0] as unknown as [string, { body: string }]
      expect(JSON.parse(request[1].body).editorial_review).toEqual(completeReviewChecks)
    })

    it(`${kind}: editing after checking prevents stale approval being sent`, async () => {
      const item = { ...reviewedPatchFixture, id: 'fixture', category: 'Héroes' }
      const fetchMock = vi.fn(async () => ({ ok: true, json: async () => item }))
      vi.stubGlobal('fetch', fetchMock)
      act(() => { renderer = create(kind === 'guide' ? createElement(GuideManager, { initialGuides: [item] }) : createElement(AnnouncementManager, { initialAnnouncements: [item] })) })
      act(() => renderer!.root.findAllByType('button').find(button => button.props.children === 'Editar')!.props.onClick())
      for (let index = 0; index < 4; index++) act(() => renderer!.root.findAllByType('input').filter(input => input.props.type === 'checkbox')[index].props.onChange({ target: { checked: true } }))
      act(() => renderer!.root.findAllByType('form')[1].findAllByType('input')[0].props.onChange({ target: { value: 'Título cambiado después de revisar' } }))
      expect(renderer!.root.findAllByType('input').filter(input => input.props.type === 'checkbox').every(input => !input.props.checked)).toBe(true)
      await act(async () => { await renderer!.root.findAllByType('form')[1].props.onSubmit({ preventDefault() {} }) })
      const request = fetchMock.mock.calls[0] as unknown as [string, { body: string }]
      expect(JSON.parse(request[1].body).editorial_review).toBeUndefined()
    })
  }
})
