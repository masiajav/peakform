import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import TierSelector from './TierSelector'

const ROLE_LABELS: Record<string, string> = {
  tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
}

export default async function ExpertDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: expert } = await supabase
    .from('experts')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'active')
    .single()

  if (!expert) notFound()

  const { data: existingTrial } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', user.id)
    .eq('expert_id', expert.id)
    .eq('tier', 'trial')
    .maybeSingle()

  const hasUsedTrial = !!existingTrial

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role="user" displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <a href="/experts" style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none' }}>
          ← Todos los expertos
        </a>

        {/* Expert header */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '28px',
          marginTop: 20,
          marginBottom: 24,
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
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                  ⭐ {Number(expert.avg_rating).toFixed(1)} · {expert.total_reviews} reviews
                  {expert.avg_delivery_hours > 0 && ` · entrega media ${Math.round(expert.avg_delivery_hours)}h`}
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

        {/* Tier selector (client) */}
        <TierSelector expert={expert} hasUsedTrial={hasUsedTrial} />
      </div>
    </div>
  )
}
