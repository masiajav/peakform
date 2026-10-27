import { createElement } from 'react'
import { act, create } from 'react-test-renderer'
import { expect, it, vi } from 'vitest'
import PrivacyChoices from '@/components/content/PrivacyChoices'

it('exposes revocation only after the CMP is ready and invokes its official callback API', async () => {
  const queue: { CONSENT_API_READY: () => void }[] = []
  const showRevocationMessage = vi.fn()
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.stubGlobal('window', { googlefc: { callbackQueue: queue, showRevocationMessage } })
  let view: ReturnType<typeof create> | undefined
  try {
    await act(() => { view = create(createElement(PrivacyChoices)) })
    expect(view!.toJSON()).toBeNull()
    await act(() => queue[0].CONSENT_API_READY())
    expect(view!.root.findByType('button').children).toContain('Privacidad y cookies: cambiar opciones')
    await act(() => view!.root.findByType('button').props.onClick())
    expect(showRevocationMessage).not.toHaveBeenCalled()
    queue[1].CONSENT_API_READY()
    expect(showRevocationMessage).toHaveBeenCalledOnce()
  } finally { if (view) await act(() => view!.unmount()); vi.unstubAllGlobals() }
})
