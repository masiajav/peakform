import type { Metadata } from 'next'
import './globals.css'
import JsonLd from '@/components/content/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'Replaid Lab - Coaching y hemeroteca de Overwatch',
    template: `%s - ${SITE_NAME}`,
  },
  description: 'Reviews personalizadas de replays, guías, noticias y consejos de Overwatch por expertos verificados.',
  keywords: [
    'Overwatch',
    'coaching Overwatch',
    'análisis de replays',
    'guías Overwatch',
    'expertos Overwatch',
    'VOD review Overwatch',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'gaming',
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
    description: 'Coaching de Overwatch, guías y análisis de replays por expertos verificados.',
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/og-image.svg'),
        width: 1200,
        height: 630,
        alt: 'Replaid Lab - Coaching y guías de Overwatch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Replaid Lab',
    description: 'Coaching de Overwatch, guías y análisis de replays por expertos verificados.',
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
      </body>
    </html>
  )
}
