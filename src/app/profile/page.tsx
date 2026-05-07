import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import ProfileForm from './ProfileForm'
import AvatarUpload from './AvatarUpload'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const isExpert = profile?.role === 'expert'

  let expert = null
  if (isExpert) {
    const { data } = await supabase
      .from('experts')
      .select('bio, specialties, price_starter, price_pro, price_deep_dive, description_starter, description_pro, description_deep_dive, peak_rank, main_role, display_name, discord_handle, trial_enabled, trial_price, trial_refundable, trial_deadline_hours')
      .eq('user_id', user.id)
      .single()
    expert = data
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 64px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
            CUENTA
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 1, color: 'var(--text)', margin: '0 0 8px' }}>
            MI PERFIL
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0 }}>
            {isExpert
              ? 'Gestiona tu información pública y los precios que ven los jugadores.'
              : 'Actualiza tu nombre y battletag.'}
          </p>
        </div>

        {/* Avatar upload */}
        <div style={{ marginBottom: 32 }}>
          <AvatarUpload
            userId={user.id}
            currentUrl={profile?.avatar_url ?? null}
            displayName={profile?.display_name || user.email || '?'}
            subtitle={
              <>
                {user.email}
                {isExpert && expert && (
                  <span style={{ color: 'var(--accent)', marginLeft: 12 }}>
                    {expert.peak_rank} · {expert.main_role}
                  </span>
                )}
              </>
            }
          />
        </div>

        {/* Form */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }}>
          <ProfileForm
            displayName={profile?.display_name ?? ''}
            battletag={profile?.battletag ?? null}
            isExpert={isExpert}
            bio={expert?.bio ?? null}
            discordHandle={expert?.discord_handle ?? null}
            specialties={expert?.specialties ?? []}
            priceStarter={expert?.price_starter ?? 900}
            pricePro={expert?.price_pro ?? 1700}
            priceDeepDive={expert?.price_deep_dive ?? 3000}
            descriptionStarter={expert?.description_starter ?? null}
            descriptionPro={expert?.description_pro ?? null}
            descriptionDeepDive={expert?.description_deep_dive ?? null}
            trialEnabled={expert?.trial_enabled ?? false}
            trialPrice={expert?.trial_price ?? null}
            trialRefundable={expert?.trial_refundable ?? false}
            trialDeadlineHours={expert?.trial_deadline_hours ?? 48}
          />
        </div>

      </div>
    </div>
  )
}
