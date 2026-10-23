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
  async redirects() {
    return [
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
