import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AppNav from '@/components/layout/AppNav'
import ApplyForm from './ApplyForm'

export default async function ApplyPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/apply')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') redirect('/admin')

  // Already an expert (active or pending)
  const { data: existingExpert } = await supabase
    .from('experts')
    .select('id, status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingExpert?.status === 'active') redirect('/expert/dashboard')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user.email} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 64px' }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
            ÚNETE COMO ANALISTA
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, color: 'var(--text)', margin: '0 0 10px' }}>
            SOLICITAR SER EXPERTO
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>
            Comparte tu experiencia con otros jugadores y gana dinero haciendo lo que ya haces — analizar replays.
          </p>
        </div>

        {existingExpert?.status === 'pending' ? (
          <div style={{
            background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)',
            padding: '24px', fontSize: 14, color: 'var(--yellow)', lineHeight: 1.6,
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 1, marginBottom: 8 }}>
              SOLICITUD EN REVISIÓN
            </div>
            Tu solicitud ya fue enviada y está pendiente de aprobación. El equipo de PeakForm la revisará en 24-48h.
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }}>
            <ApplyForm />
          </div>
        )}

      </div>
    </div>
  )
}
