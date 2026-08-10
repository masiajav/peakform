import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import PublicNav from '@/components/layout/PublicNav'
import Link from 'next/link'
import { announcementPath, articleDescription } from '@/lib/content'
import { isAnnouncementSitemapEligible } from '@/lib/indexing-policy'
import { buildMetadata } from '@/lib/seo'

const featuredNews = [
  {
    href: '/dmon-nuevo-heroe-tank-overwatch',
    title: 'D.Mon en Overwatch: gameplay, habilidades y counters',
    date: '08 de agosto de 2026',
    description: 'D.Mon entra como Tank melee de MEKA: Plasma Saber, Power Barrier, Propulsors, Stalwart, perks y por qué no juega como una D.Va 2.0.',
  },
  {
    href: '/busan-eichenwalde-paraiso-reworks-overwatch',
    title: 'Busan, Eichenwalde y Paraíso tendrán rework en Overwatch',
    date: '02 de agosto de 2026',
    description: 'Blizzard confirma reworks para Busan, Eichenwalde y Paraíso. Resumen de cambios y primeras claves para ranked.',
  },
  {
    href: '/overwatch-temporada-3-into-the-tigers-den',
    title: "Temporada 3 de Overwatch: Into the Tiger's Den",
    date: '16 de junio de 2026',
    description: 'Resumen editorial de la temporada con Shion, Neon Junction, evento Anima Strike y cambios relevantes para ranked.',
  },
]

const ANNOUNCEMENT_LIST_COLUMNS = `
  id,
  title,
  slug,
  body,
  excerpt,
  seo_title,
  seo_description,
  hero,
  role,
  map,
  cover_image,
  content_type,
  published,
  created_at,
  updated_at
`

export const metadata: Metadata = buildMetadata({
  title: 'Noticias de Overwatch',
  description: 'Noticias, actualizaciones y anuncios de Overwatch seleccionados por Replaid Lab.',
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
    .select(ANNOUNCEMENT_LIST_COLUMNS)
    .eq('published', true)
    .neq('content_type', 'patch_note')
    .order('created_at', { ascending: false })
  const indexableAnnouncements = (announcements ?? []).filter((item: any) => isAnnouncementSitemapEligible(item))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <PublicNav
        ctaHref={user ? profile?.role === 'admin' ? '/admin' : profile?.role === 'expert' ? '/expert/dashboard' : '/dashboard' : '/login'}
        ctaLabel={user ? 'MI PANEL' : 'ENTRAR'}
      />
      {false && (user ? (
        <AppNav role={profile?.role ?? 'user'} displayName={profile?.display_name || user?.email} avatarUrl={profile?.avatar_url} />
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
          <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
        </nav>
      ))}

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
            HEMEROTECA
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 42, letterSpacing: 1, color: 'var(--text)', margin: '0 0 12px' }}>
            NOTICIAS
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>
            Actualizaciones, contexto competitivo y anuncios relevantes para jugadores de Overwatch.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {featuredNews.map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>
                    ACTUALIDAD
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{item.date}</span>
                </div>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1, color: 'var(--text)', margin: '0 0 10px' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </article>
            </Link>
          ))}
          {indexableAnnouncements.map((a: any) => (
            <Link key={a.id} href={announcementPath(a)} style={{ textDecoration: 'none' }}>
              <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--accent)', fontFamily: 'Bebas Neue, sans-serif' }}>
                    NOTICIA
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
      </section>
    </div>
  )
}
