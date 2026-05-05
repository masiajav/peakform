import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import Link from 'next/link'
import { announcementPath, articleDescription } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Noticias de Overwatch',
  description: 'Noticias, actualizaciones, patch notes y anuncios de Overwatch seleccionados por Replaid Lab.',
  path: '/news',
})

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
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>REPLAID LAB</span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guias</Link>
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      )}

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            HEMEROTECA
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 42, letterSpacing: 1, color: 'var(--text)', margin: '0 0 12px' }}>
            NOTICIAS Y PATCH NOTES
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>
            Actualizaciones, contexto competitivo y cambios relevantes para jugadores de Overwatch.
          </p>
        </div>

        {!announcements || announcements.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--text3)' }}>No hay anuncios publicados todavia.</p>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {announcements.map((a: any) => (
              <Link key={a.id} href={announcementPath(a)} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>
                      {(a.content_type === 'patch_note' ? 'PATCH NOTE' : 'NOTICIA')}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                      {new Date(a.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1, color: 'var(--text)', margin: '0 0 10px' }}>
                    {a.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
                    {articleDescription(a)}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
