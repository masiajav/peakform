import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'
import { Expert, formatPrice } from '@/types'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Expertos de Overwatch',
  description: 'Encuentra expertos verificados de Overwatch por rol, rango, precio y valoraciones para revisar tu replay.',
  path: '/experts',
})

const ROLE_LABELS: Record<string, string> = {
  tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
}

const ROLE_OPTIONS = [
  { value: '',        label: 'Todos los roles' },
  { value: 'tank',    label: 'Tank' },
  { value: 'dps',     label: 'DPS' },
  { value: 'support', label: 'Support' },
  { value: 'flex',    label: 'Flex' },
]

const RANK_OPTIONS = [
  { value: '',             label: 'Todos los rangos' },
  { value: 'Champion',     label: 'Champion' },
  { value: 'Grandmaster',  label: 'Grandmaster' },
  { value: 'Master',       label: 'Master' },
  { value: 'Diamond',      label: 'Diamond' },
]

function buildUrl(role: string, rank: string) {
  const params = new URLSearchParams()
  if (role) params.set('role', role)
  if (rank) params.set('rank', rank)
  const str = params.toString()
  return `/experts${str ? '?' + str : ''}`
}

export default async function ExpertsPage({
  searchParams,
}: {
  searchParams: { role?: string; rank?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const roleFilter = searchParams.role ?? ''
  const rankFilter = searchParams.rank ?? ''

  let query = supabase
    .from('experts')
    .select('*')
    .eq('status', 'active')
    .order('service_paused', { ascending: true })
    .order('avg_rating', { ascending: false })

  if (roleFilter) query = query.eq('main_role', roleFilter)
  if (rankFilter) query = query.ilike('peak_rank', `${rankFilter}%`)

  const { data: experts } = await query

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {user ? (
        <AppNav
          role={profile?.role || 'user'}
          displayName={profile?.display_name || user.email}
          avatarUrl={profile?.avatar_url}
        />
      ) : (
        <nav style={{
          height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3, textDecoration: 'none' }}>
            REPLAID LAB
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/apply" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Ser experto</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text)', margin: '0 0 6px', letterSpacing: 1 }}>
            EXPERTOS
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, margin: 0 }}>
            Jugadores Champion y Grandmaster que analizarán tu replay
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
          {/* Role filter */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
              ROL
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ROLE_OPTIONS.map(({ value, label }) => {
                const active = roleFilter === value
                return (
                  <Link
                    key={value || 'all'}
                    href={buildUrl(value, rankFilter)}
                    style={{
                      fontSize: 12, padding: '5px 12px', textDecoration: 'none',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      color: active ? 'var(--accent)' : 'var(--text2)',
                      background: active ? 'rgba(255,107,43,0.08)' : 'var(--surface)',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Rank filter */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
              RANGO PEAK
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {RANK_OPTIONS.map(({ value, label }) => {
                const active = rankFilter === value
                return (
                  <Link
                    key={value || 'all'}
                    href={buildUrl(roleFilter, value)}
                    style={{
                      fontSize: 12, padding: '5px 12px', textDecoration: 'none',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      color: active ? 'var(--accent)' : 'var(--text2)',
                      background: active ? 'rgba(255,107,43,0.08)' : 'var(--surface)',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        {(roleFilter || rankFilter) && (
          <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>
            {experts?.length ?? 0} experto{(experts?.length ?? 0) !== 1 ? 's' : ''} encontrado{(experts?.length ?? 0) !== 1 ? 's' : ''}
            {' '}·{' '}
            <Link href="/experts" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Limpiar filtros
            </Link>
          </div>
        )}

        {(!experts || experts.length === 0) ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            padding: '48px 32px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text2)', marginBottom: 8 }}>
              {roleFilter || rankFilter ? 'SIN RESULTADOS' : 'PRÓXIMAMENTE'}
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14, margin: 0 }}>
              {roleFilter || rankFilter
                ? 'No hay expertos activos con estos filtros. Prueba otra combinación.'
                : 'Estamos verificando a los primeros expertos. Vuelve pronto.'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {experts.map((expert: Expert) => (
              <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '24px', cursor: 'pointer', height: '100%', boxSizing: 'border-box',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, background: 'var(--surface3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0, overflow: 'hidden',
                    }}>
                      {expert.avatar_url
                        ? <img src={expert.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ color: 'var(--text2)' }}>{expert.display_name[0]}</span>
                      }
                    </div>
                    <div>
                      <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                        {expert.display_name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>
                        {expert.peak_rank} · {ROLE_LABELS[expert.main_role] ?? expert.main_role}
                      </div>
                      {expert.service_paused && (
                        <div style={{ marginTop: 6, display: 'inline-flex', fontSize: 10, letterSpacing: 1, color: 'var(--yellow)', border: '1px solid rgba(255,214,0,0.28)', padding: '2px 7px' }}>
                          PAUSADO
                        </div>
                      )}
                    </div>
                  </div>

                  {expert.bio && (
                    <p style={{ fontSize: 13, color: 'var(--text2)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {expert.bio.length > 100 ? expert.bio.slice(0, 100) + '…' : expert.bio}
                    </p>
                  )}

                  {expert.specialties?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {expert.specialties.slice(0, 3).map((s: string) => (
                        <span key={s} style={{
                          fontSize: 11, color: 'var(--text2)', background: 'var(--surface3)',
                          border: '1px solid var(--border2)', padding: '2px 8px',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid var(--border)', paddingTop: 14,
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                      {expert.total_reviews > 0
                        ? `⭐ ${Number(expert.avg_rating).toFixed(1)} · ${expert.total_reviews} reviews`
                        : 'Nuevo experto'
                      }
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--text)' }}>
                      {expert.service_paused ? 'no disponible' : `desde ${formatPrice(expert.price_starter)}`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
