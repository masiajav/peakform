/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/guides/ana-guia-video-overwatch',
        destination: '/guides/ana-primeros-habitos-impactar-mas',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
