import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getAll: vi.fn(), set: vi.fn(), cookies: vi.fn(), createServerClient: vi.fn(),
}))
vi.mock('next/headers', () => ({ cookies: mocks.cookies }))
vi.mock('@supabase/ssr', () => ({ createServerClient: mocks.createServerClient }))
import { createClient } from '@/lib/supabase/server'

beforeEach(() => {
  vi.clearAllMocks()
  mocks.set.mockReset()
  mocks.cookies.mockResolvedValue({ getAll: mocks.getAll, set: mocks.set })
  mocks.createServerClient.mockReturnValue({ fixture: 'session-client' })
})

describe('async server session cookies', () => {
  it('awaits the request cookie store before creating the session client', async () => {
    expect(await createClient()).toEqual({ fixture: 'session-client' })
    const adapter = mocks.createServerClient.mock.calls[0][2].cookies
    const values = [{ name: 'session', value: 'fixture-token' }]
    mocks.getAll.mockReturnValue(values)
    expect(adapter.getAll()).toEqual(values)
    adapter.setAll([{ name: 'session', value: 'refreshed', options: { httpOnly: true } }])
    expect(mocks.set).toHaveBeenCalledWith('session', 'refreshed', { httpOnly: true })
  })

  it('retains read-only Server Component behavior when cookie writes are unavailable', async () => {
    mocks.set.mockImplementation(() => { throw new Error('read-only request') })
    await createClient()
    const adapter = mocks.createServerClient.mock.calls[0][2].cookies
    expect(() => adapter.setAll([{ name: 'session', value: 'refresh' }])).not.toThrow()
  })
})
