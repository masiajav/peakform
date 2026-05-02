import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'

export default async function GuidesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('role, display_name, avatar_url').eq('id', user.id).single()
    profile = data
  }

  const admin = createAdminClient()
  const { data: guides } = await admin
    .from('guides')
    .select('id, title, slug, category, body, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const categories = Array.from(new Set((guides ?? []).map((g: any) => g.category).filter(Boolean))) as string[]

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
          <Link href="/news" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <section style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            APRENDE
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 1, color: 'var(--text)', margin: '0 0 12px' }}>
            GUÍAS Y CONSEJOS
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>
            Artículos escritos por el equipo de PeakForm para ayudarte a mejorar en Overwatch.
          </p>
        </div>

        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {categories.map(cat => (
              <span key={cat} style={{
                fontSize: 11, letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif',
                color: 'var(--text2)', border: '1px solid var(--border)', padding: '3px 10px',
              }}>
                {cat}
              </span>
            ))}
          </div>
        )}

        {!guides || guides.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--text3)' }}>No hay guías publicadas todavía. Vuelve pronto.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {guides.map((g: any) => {
              const wordCount = g.body.split(' ').length
              const readMinutes = Math.max(1, Math.round(wordCount / 200))
              return (
                <Link key={g.id} href={`/guides/${g.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="expert-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px', height: '100%' }}>
                    {g.category && (
                      <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
                        {g.category.toUpperCase()}
                      </div>
                    )}
                    <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: 0.5, color: 'var(--text)', margin: '0 0 10px', lineHeight: 1.2 }}>
                      {g.title}
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text2)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {g.body.replace(/[#*_`]/g, '').slice(0, 100).trim()}…
                    </p>
                    <div style={{ fontSize: 11, color: 'var(--text3)', display: 'flex', gap: 12 }}>
                      <span>{new Date(g.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      <span>{readMinutes} min de lectura</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>PEAKFORM</span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/news" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 PeakForm</span>
      </footer>

    </div>
  )
}
