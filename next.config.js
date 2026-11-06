const publicHeroGuidePaths = require('./src/lib/public-hero-guide-paths.json')
const legacyHeroGuideRedirects = require('./src/lib/legacy-hero-guide-redirects.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'd15f34w2p8l1cc.cloudfront.net' },
    ],
  },
  async headers() {
    // Content hashes make only these font files safe to cache immutably.
    return [
      '/fonts/bebas-neue-latin-ext.16c95ce45a29.woff2',
      '/fonts/bebas-neue-latin.a7c90c89240c.woff2',
      '/fonts/dm-sans-latin-ext.a5d38fe99f93.woff2',
      '/fonts/dm-sans-latin.9fea608a947e.woff2',
    ].map(source => ({
      source,
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }))
  },
  async redirects() {
    return [
      // Remove the matching entry before publishing a future /heroes/:slug page.
      ...Object.entries(publicHeroGuidePaths).map(([slug, destination]) => ({
        source: `/heroes/${slug}`,
        destination,
        permanent: true,
      })),
      {
        source: '/guides/como-mejorar-en-overwatch-revisando-vod',
        destination: '/guides/review-vod-overwatch-espanol',
        permanent: true,
      },
      {
        source: '/guides/como-elegir-composicion-dive-poke-brawl',
        destination: '/guides/composiciones-overwatch-5v5-6v6',
        permanent: true,
      },
      ...Object.entries(legacyHeroGuideRedirects).map(([source, destination]) => ({
        source: `/guides/${source}`,
        destination: `/guides/${destination}`,
        permanent: true,
      })),
      {
        source: '/guides/como-revisar-habilidades-overwatch',
        destination: '/guides/como-revisar-cooldowns-overwatch',
        permanent: true,
      },
      {
        source: '/guides/como-mejorar-posicionamiento-overwatch',
        destination: '/guides/como-mejorar-en-overwatch',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
