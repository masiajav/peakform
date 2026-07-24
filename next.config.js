/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'd15f34w2p8l1cc.cloudfront.net' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/guides/ana-guia-video-overwatch',
        destination: '/guides/ana-primeros-habitos-impactar-mas',
        permanent: true,
      },
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
