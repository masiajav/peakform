'use client'

import { createContext, useContext } from 'react'
import type { ReaderPresence } from '@/lib/reader-presence'

export const ReaderContext = createContext<ReaderPresence>({ count: null, status: 'connecting' })

export function useSiteReaders() {
  return useContext(ReaderContext)
}
