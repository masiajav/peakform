import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'
import ApplyForm from './ApplyForm'
import ExpertAuthSection from './ExpertAuthSection'

export default async function ApplyPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let existingExpert = null

  if (user) {
    const { data: p } = await supabase
      .from('profiles')
      .select('role, display_name, avatar_url')
      .eq('id', user.id)
      .single()
    profile = p

    if (profile?.role === 'admin') redirect('/admin')
    if (profile?.role === 'expert') redirect('/expert/dashboard')

    const { data: e } = await supabase
      .from('experts')
      .select('id, status')
      .eq('user_id', user.id)
      .maybeSingle()
    existingExpert = e

    if (existingExpert?.status === 'active') redirect('/expert/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>

      {/* Nav */}
      {user ? (
        <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />
      ) : (
        <nav style={{
          height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>
              PEAKFORM
            </span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
            Ver expertos
          </Link>
          <Link href="/login" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
            Ya tengo cuenta
          </Link>
        </nav>
      )}

      {/* Hero */}
      <section style={{ padding: '72px 24px 64px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', fontSize: 11, letterSpacing: 2, color: 'var(--accent)',
          fontFamily: 'Bebas Neue, sans-serif', border: '1px solid rgba(255,107,43,0.25)',
          padding: '4px 12px', marginBottom: 28,
        }}>
          ÚNETE COMO ANALISTA
        </div>

        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 7vw, 64px)',
          letterSpacing: 2, lineHeight: 0.94, margin: '0 0 24px',
        }}>
          GANA DINERO ANALIZANDO<br />
          <span style={{ color: 'var(--accent)' }}>LO QUE YA SABES HACER.</span>
        </h1>

        <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
          PeakForm conecta jugadores que quieren mejorar con expertos que saben cómo lograrlo.
          Tú fijas tus precios, decides tus horarios y cobras directamente.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48, marginTop: 48,
          borderTop: '1px solid var(--border)', paddingTop: 32, flexWrap: 'wrap',
        }}>
          {[
            { value: '100%', label: 'DEL PRECIO QUE FIJAS' },
            { value: 'Tú', label: 'FIJAS TUS PRECIOS' },
            { value: '24-72h', label: 'PLAZO DE ENTREGA' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--text)', letterSpacing: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '56px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '24px' }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
                REQUISITOS
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  'Rango mínimo Diamond en Overwatch',
                  'Cuenta activa y jugando regularmente',
                  'Capacidad de dar feedback estructurado',
                  'Cumplir con los plazos de entrega',
                ].map(r => (
                  <li key={r} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '24px' }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--green)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
                QUÉ RECIBES
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  'Tú fijas tus propios precios por tier',
                  'Cobras el 100% del precio que fijas',
                  'Panel propio para gestionar pedidos',
                  'Los clientes llegan solos — sin prospecting',
                ].map(r => (
                  <li key={r} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '24px' }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 14 }}>
                CÓMO FUNCIONA
              </div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  'Rellena tu solicitud con tu rango y bio',
                  'El equipo la revisa en 24-48 horas',
                  'Recibes acceso a tu panel de experto',
                  'Jugadores te contratan y suben replays',
                ].map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--text3)', flexShrink: 0, fontFamily: 'Bebas Neue, sans-serif', fontSize: 14, marginTop: 1 }}>{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* Registration / Form section */}
      <section style={{ padding: '64px 24px 80px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
              {user ? 'COMPLETA TU SOLICITUD' : 'EMPIEZA HOY'}
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, color: 'var(--text)', margin: '0 0 8px' }}>
              {user ? 'FORMULARIO DE SOLICITUD' : 'ÚNETE A PEAKFORM'}
            </h2>
            {!user && (
              <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>
                Crea tu cuenta y rellena la solicitud. Aprobamos en 24-48h.
              </p>
            )}
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px' }}>

            {/* Pending state */}
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

            /* Not logged in — show auth */
            ) : !user ? (
              <ExpertAuthSection />

            /* Logged in — show apply form */
            ) : (
              <ApplyForm />
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>
          PEAKFORM
        </span>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 PeakForm</span>
      </footer>

    </div>
  )
}
