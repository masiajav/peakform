import Link from 'next/link'
import type { SponsoredFields } from '@/lib/content'

export default function SponsoredBlock({ item }: { item: SponsoredFields }) {
  if (!item.sponsor_title || !item.sponsor_body) return null

  const label = item.sponsor_label || 'Patrocinado'
  const cta = item.sponsor_cta || 'Ver recurso'

  return (
    <aside style={{
      margin: '40px 0',
      background: 'var(--surface)',
      border: '1px solid rgba(255,107,43,0.28)',
      padding: '18px 20px',
    }}>
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        letterSpacing: 1.5,
        color: 'var(--accent)',
        fontSize: 10,
        marginBottom: 8,
      }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 18, letterSpacing: 0.5, marginBottom: 8 }}>
        {item.sponsor_title}
      </div>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: item.sponsor_url ? '0 0 14px' : 0 }}>
        {item.sponsor_body}
      </p>
      {item.sponsor_url && (
        <Link
          href={item.sponsor_url}
          rel="sponsored nofollow"
          target={item.sponsor_url.startsWith('http') ? '_blank' : undefined}
          style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'none' }}
        >
          {cta} →
        </Link>
      )}
    </aside>
  )
}
