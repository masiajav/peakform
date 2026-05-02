import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'

export default async function NewsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const admin = createAdminClient()
  const { data: announcements } = await admin
    .from('announcements')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>

      {user ? (
        <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user.email} avatarUrl={profile?.avatar_url} />
      ) : (
        <nav style={{
          height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>PEAKFORM</span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/guides" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            PEAKFORM
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, color: 'var(--text)', margin: 0 }}>
            NOTICIAS Y ACTUALIZACIONES
          </h1>
        </div>

        {!announcements || announcements.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--text3)' }}>No hay anuncios publicados todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {announcements.map((a: any) => (
              <article key={a.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px 28px' }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
                  {new Date(a.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                </div>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, color: 'var(--text)', margin: '0 0 14px' }}>
                  {a.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>PEAKFORM</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/guides" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 PeakForm</span>
      </footer>

    </div>
  )
}
