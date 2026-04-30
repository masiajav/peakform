import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import { Expert, formatPrice } from '@/types'

const ROLE_LABELS: Record<string, string> = {
  tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
}

export default async function ExpertsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: experts } = await supabase
    .from('experts')
    .select('*')
    .eq('status', 'active')
    .order('avg_rating', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="user" displayName={profile?.display_name || user.email} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text)', margin: 0, letterSpacing: 1 }}>
            EXPERTOS
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, margin: '6px 0 0' }}>
            Elige el experto que analizará tu replay
          </p>
        </div>

        {(!experts || experts.length === 0) ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
            padding: '48px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text2)' }}>
              PRÓXIMAMENTE
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14, marginTop: 8 }}>
              Estamos verificando a los primeros expertos. Vuelve pronto.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {experts.map((expert: Expert) => (
              <a key={expert.id} href={`/experts/${expert.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '24px',
                  cursor: 'pointer',
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
                      desde {formatPrice(expert.price_starter)}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
