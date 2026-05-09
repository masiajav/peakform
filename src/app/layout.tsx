import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import JsonLd from '@/components/content/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'Replaid Lab - Guías, counters y vídeos de Overwatch',
    template: `%s - ${SITE_NAME}`,
  },
  description: 'Guías, counters, vídeos, noticias y consejos de Overwatch para mejorar por héroe, rol y mapa.',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'gaming',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Replaid Lab',
    description: 'Guías, counters, vídeos y consejos de Overwatch para mejorar por héroe, rol y mapa.',
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og-image.svg'),
        width: 1200,
        height: 630,
        alt: 'Replaid Lab - Guías y counters de Overwatch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Replaid Lab',
    description: 'Guías, counters, vídeos y consejos de Overwatch para mejorar por héroe, rol y mapa.',
    images: [absoluteUrl('/og-image.svg')],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/icon.svg'),
    sameAs: [],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Replaid',
    url: SITE_URL,
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/guides')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="es">
      <head>
        {adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
