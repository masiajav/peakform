import type { Metadata } from 'next'
import './globals.css'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Replaid Lab - Coaching y hemeroteca de Overwatch',
    template: `%s - ${SITE_NAME}`,
  },
  description: 'Reviews personalizadas de replays, guias, noticias y consejos de Overwatch por expertos verificados.',
  openGraph: {
    title: 'Replaid Lab',
    description: 'Coaching de Overwatch por expertos verificados',
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
