'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin',         label: 'PANEL' },
  { href: '/admin/experts', label: 'EXPERTOS' },
  { href: '/admin/orders',  label: 'PEDIDOS' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <nav style={{ width: 180, flexShrink: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              display: 'block',
              padding: '9px 14px',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 14,
              letterSpacing: 1,
              textDecoration: 'none',
              color: active ? 'var(--text)' : 'var(--text2)',
              background: active ? 'var(--surface2)' : 'transparent',
              borderLeft: active ? '2px solid var(--yellow)' : '2px solid transparent',
              transition: 'color 0.15s',
            }}>
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
