import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import AppNav from '@/components/layout/AppNav'
import PublicNav from '@/components/layout/PublicNav'
import Link from 'next/link'
import { announcementPath, articleDescription } from '@/lib/content'
import { isAnnouncementSitemapEligible } from '@/lib/indexing-policy'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import JsonLd from '@/components/content/JsonLd'

const featuredNews = [
  {
    href: '/doctrine-support-sombra-roadhog-rework-overwatch',
    title: 'Doctrine llega a Overwatch: Sombra será Support y Roadhog tendrá rework',
    date: '12 de septiembre de 2026',
    description: 'Doctrine ya se puede probar, Sombra cambia de rol, Roadhog recibe rework, hay una mítica gratis y Blizzard ha enseñado la silueta de otro héroe.',
  },
  {
    href: '/blizzcon-2026-overwatch-horarios-espana',
    title: 'BlizzCon 2026: horarios de Overwatch en España',
    date: '2 de septiembre de 2026',
    description: 'Horarios de Overwatch en BlizzCon 2026 convertidos a España: ceremonia, directo de desarrolladores, Hero Deep Dive y World Cup.',
  },
  {
    href: '/overwatch-temporada-4-heroes-of-busan',
    title: 'Overwatch Season 4 ya disponible: D.Mon, Emerald y reworks',
    date: '11 de agosto de 2026',
    description: 'Season 4 ya está disponible: D.Mon como nuevo Tank, nueva UI, balance de lanzamiento, Emerald, Battle Pass, reworks de mapas, Team Drives y LE SSERAFIM.',
  },
  {
    href: '/dmon-nuevo-heroe-tank-overwatch',
    title: 'D.Mon en Overwatch: gameplay, habilidades y counters',
    date: '11 de agosto de 2026',
    description: 'D.Mon ya está disponible como Tank melee de MEKA: Plasma Saber, Power Barrier, Propulsors, Stalwart, perks y por qué no juega como una D.Va 2.0.',
  },
  {
    href: '/busan-eichenwalde-paraiso-reworks-overwatch',
    title: 'Busan, Eichenwalde y Paraíso ya tienen rework en Overwatch',
    date: '11 de agosto de 2026',
    description: 'Season 4 ya está lanzada y toca reaprender Busan, Eichenwalde y Paraíso: rutas, coberturas, high grounds y primeras claves para ranked.',
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
  title: 'Noticias de Overwatch: temporadas, héroes, mapas y BlizzCon',
  description: 'Noticias de Overwatch en español con fechas, horarios y contexto para ranked: temporadas, nuevos héroes, mapas, balance, eventos y BlizzCon.',
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
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Noticias de Overwatch',
    description: 'Actualidad de Overwatch explicada en español con fechas, contenido confirmado y contexto para jugadores.',
    url: absoluteUrl('/news'),
    inLanguage: 'es',
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={collectionJsonLd} />
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
            Fechas, horarios y cambios de Overwatch explicados sin rodeos. Aquí reunimos temporadas, héroes, mapas, eventos y anuncios que cambian lo que vas a encontrar al abrir el juego.
          </p>
        </div>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 28 }}>
          <div className="eyebrow">QUÉ ENCONTRARÁS AQUÍ</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, margin: '8px 0 14px' }}>La actualidad que afecta a tus partidas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18 }}>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: 14 }}>Temporadas y héroes</strong>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: '7px 0 0' }}>Resumimos qué llega, cuándo se puede jugar y qué cambia de verdad. Si aparece un héroe nuevo, separamos el kit confirmado de las primeras impresiones y actualizamos su guía cuando hay partidas suficientes.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: 14 }}>Mapas y balance</strong>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: '7px 0 0' }}>Un rework de mapa puede cambiar rutas, high grounds y composiciones aunque las notas parezcan cortas. Cuando un ajuste altera un matchup, enlazamos la explicación práctica para ranked.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: 14 }}>Eventos y directos</strong>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, margin: '7px 0 0' }}>Convertimos horarios a España, comprobamos dónde se emite el evento y distinguimos los anuncios confirmados de lo que todavía no tiene detalle oficial.</p>
            </div>
          </div>
        </section>

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

        <section style={{ borderTop: '1px solid var(--border)', marginTop: 38, paddingTop: 28 }}>
          <div className="eyebrow">PARA SEGUIR JUGANDO</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 1, margin: '8px 0 12px' }}>Del anuncio a la partida</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            Si buscas el estado actual del juego, empieza por la <Link href="/overwatch-temporada-4-heroes-of-busan" style={{ color: 'var(--accent)' }}>Season 4</Link>. Para preparar tus partidas puedes consultar las <Link href="/guides" style={{ color: 'var(--accent)' }}>guías</Link>, los <Link href="/counters" style={{ color: 'var(--accent)' }}>matchups</Link> o las <Link href="/maps" style={{ color: 'var(--accent)' }}>guías de mapas</Link>. Las fechas visibles solo cambian cuando el contenido se ha revisado de verdad.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            En noticias en desarrollo indicamos qué está confirmado y qué falta por conocer. Cuando Blizzard publica horarios, requisitos de drops o notas de balance nuevas, corregimos la misma noticia para que no tengas que comparar versiones contradictorias. Si una novedad merece una explicación más larga, la encontrarás enlazada desde el resumen.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 780 }}>
            También mantenemos visibles las noticias anteriores cuando siguen ayudando a entender un héroe, un mapa o el origen de un cambio que todavía afecta al juego actual.
          </p>
          <div style={{ color: 'var(--text3)', fontSize: 12 }}>Última revisión del hub: 12 de septiembre de 2026 · Replaid Lab</div>
        </section>
      </section>
    </div>
  )
}
