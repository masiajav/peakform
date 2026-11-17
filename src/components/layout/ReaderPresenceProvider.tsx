'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useReaderPresence } from '@/lib/use-reader-presence'
import type { ReaderPresence } from '@/lib/reader-presence'

const ReaderContext = createContext<ReaderPresence>({ count: null, status: 'connecting' })

export default function ReaderPresenceProvider({ children }: { children: ReactNode }) {
  const presence = useReaderPresence()
  return <ReaderContext.Provider value={presence}>{children}</ReaderContext.Provider>
}

export function useSiteReaders() {
  return useContext(ReaderContext)
}
