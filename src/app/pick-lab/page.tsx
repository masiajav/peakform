import type { Metadata } from 'next'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import PickLab from './PickLab'

export const metadata: Metadata = buildMetadata({
  title: 'Pick Lab de Overwatch: picks, counters y sinergias',
  description: 'Elige tu rol, mapa, aliados y rivales para saber qué héroe jugar en Overwatch. Compara picks por sinergias, counters y estilo de composición.',
  path: '/pick-lab',
})

export default function PickLabPage() {
  const applicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Replaid Pick Lab',
    alternateName: 'Pick Lab de Overwatch',
    description: 'Herramienta gratuita para comparar picks de Overwatch según el mapa, la composición aliada y los héroes rivales.',
    url: absoluteUrl('/pick-lab'),
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'es',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Recomendaciones de héroes por mapa',
      'Sinergias con la composición aliada',
      'Counters según los rivales visibles',
      'Consulta rápida de matchups por rol',
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={applicationJsonLd} />
      <PublicNav />
      <PickLab />
    </div>
  )
}
