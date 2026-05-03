import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'
import TierSelector from './TierSelector'

const ROLE_LABELS: Record<string, string> = {
  tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: 'var(--yellow)', fontSize: 13 }}>
      {Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆').join('')}
    </span>
  )
}

export default async function ExpertDetailPage({ params }: { params: { id: string } }) {
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

  const admin = createAdminClient()

  const { data: expert } = await admin
    .from('experts')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'active')
    .single()

  if (!expert) notFound()

  // Check if this user has used the trial for this expert
  let hasUsedTrial = false
  if (user) {
    const { data: existingTrial } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', user.id)
      .eq('expert_id', expert.id)
      .eq('tier', 'trial')
      .maybeSingle()
    hasUsedTrial = !!existingTrial
  }

  // Fetch public ratings (rating + comment only, not review content)
  const { data: ratings } = await admin
    .from('reviews')
    .select('rating, rating_comment, created_at')
    .eq('expert_id', expert.id)
    .not('rating', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5)

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

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

        {/* Breadcrumb */}
        <Link href="/experts" style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          ← Todos los expertos
        </Link>

        {/* Expert header */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          padding: '28px', marginTop: 20, marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{
              width: 72, height: 72, background: 'var(--surface3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, flexShrink: 0, overflow: 'hidden',
            }}>
              {expert.avatar_url
                ? <img src={expert.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ color: 'var(--text2)' }}>{expert.display_name[0]}</span>
              }
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'Bebas Neue, sans-serif', fontSize: 28,
                color: 'var(--text)', margin: '0 0 4px', letterSpacing: 1,
              }}>
                {expert.display_name}
              </h1>
              <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 8 }}>
                {expert.peak_rank} · {ROLE_LABELS[expert.main_role] ?? expert.main_role} · {expert.battletag}
              </div>
              {expert.total_reviews > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                  <Stars rating={Math.round(Number(expert.avg_rating))} />
                  <span>{Number(expert.avg_rating).toFixed(1)} · {expert.total_reviews} valoraciones</span>
                  {expert.avg_delivery_hours > 0 && (
                    <span style={{ color: 'var(--text3)' }}>· entrega media {Math.round(expert.avg_delivery_hours)}h</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {expert.bio && (
            <p style={{ fontSize: 14, color: 'var(--text2)', margin: '20px 0 0', lineHeight: 1.7 }}>
              {expert.bio}
            </p>
          )}

          {expert.specialties?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {expert.specialties.map((s: string) => (
                <span key={s} style={{
                  fontSize: 12, color: 'var(--text2)', background: 'var(--surface3)',
                  border: '1px solid var(--border2)', padding: '4px 10px',
                }}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ratings */}
        {ratings && ratings.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
              VALORACIONES DE JUGADORES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ratings.map((r: any, i: number) => (
                <div key={i} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '14px 18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: r.rating_comment ? 8 : 0 }}>
                    <Stars rating={r.rating} />
                    <span style={{ fontSize: 12, color: 'var(--text3)' }}>
                      {new Date(r.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  {r.rating_comment && (
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                      {r.rating_comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tier selector (client) */}
        <TierSelector expert={expert} hasUsedTrial={hasUsedTrial} isLoggedIn={!!user} stripeConnected={!!expert.stripe_account_id} />

      </div>
    </div>
  )
}
