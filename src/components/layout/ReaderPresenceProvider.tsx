'use client'

import type { ReactNode } from 'react'
import { useReaderPresence } from '@/lib/use-reader-presence'
import { ReaderContext } from './ReaderPresenceContext'

export default function ReaderPresenceProvider({ children }: { children: ReactNode }) {
  const presence = useReaderPresence()
  return <ReaderContext.Provider value={presence}>{children}</ReaderContext.Provider>
}
