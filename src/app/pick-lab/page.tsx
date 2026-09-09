import type { Metadata } from 'next'
import PublicNav from '@/components/layout/PublicNav'
import { buildMetadata } from '@/lib/seo'
import PickLab from './PickLab'

export const metadata: Metadata = buildMetadata({
  title: 'Pick Lab: sinergias y counters de Overwatch',
  description: 'Compara mapa, aliados y rivales para encontrar picks de Overwatch explicados por sinergia, counters y estilo de composición.',
  path: '/pick-lab',
})

export default function PickLabPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav />
      <PickLab />
    </div>
  )
}
