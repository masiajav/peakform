import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Replaid Lab — Coaching de Overwatch',
  description: 'Reviews personalizadas de replays por expertos verificados. Sube de rango con análisis real.',
  openGraph: {
    title: 'Replaid Lab',
    description: 'Coaching de Overwatch por expertos verificados',
    siteName: 'Replaid Lab',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
