import { createAdminClient } from '@/lib/supabase/admin'
import { announcementPath, articleDescription, guidePath, ROLE_LABELS, topicLabel, type ContentRole } from '@/lib/content'
import { REPLAID_DISCORD_URL } from '@/lib/community'
import JsonLd from './JsonLd'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import Link from 'next/link'
import { formatPrice } from '@/types'
import { getCounterHero } from '@/lib/overwatch-counters'
import { buildHeroSeoProfile, ROLE_SEO } from '@/lib/overwatch-seo'

export default async function TopicArchivePage({
  kind,
  slug,
  title,
  description,
}: {
  kind: 'hero' | 'role' | 'map'
  slug: string
  title: string
  description: string
}) {
  const admin = createAdminClient()

  const guideQuery = admin
    .from('guides')
    .select('id, title, slug, excerpt, body, category, hero, role, map, created_at')
    .eq('published', true)
    .eq(kind, slug)
    .order('created_at', { ascending: false })
    .limit(12)

  const newsQuery = admin
    .from('announcements')
    .select('id, title, slug, excerpt, body, content_type, hero, role, map, created_at')
    .eq('published', true)
    .eq(kind, slug)
    .order('created_at', { ascending: false })
    .limit(6)

  const expertsQuery = kind === 'role'
    ? admin
        .from('experts')
        .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
        .eq('status', 'active')
        .eq('service_paused', false)
        .eq('main_role', slug)
        .order('avg_rating', { ascending: false })
        .limit(6)
    : admin
        .from('experts')
        .select('id, slug, display_name, peak_rank, main_role, avg_rating, total_reviews, price_starter')
        .eq('status', 'active')
        .eq('service_paused', false)
        .order('avg_rating', { ascending: false })
        .limit(3)

  const [{ data: guides }, { data: news }, { data: experts }] = await Promise.all([guideQuery, newsQuery, expertsQuery])
  const topicContent = buildTopicContent(kind, slug, title)
  const counterHero = kind === 'hero' ? getCounterHero(slug) : null
  const heroSeo = kind === 'hero' ? buildHeroSeoProfile(slug) : null
  const roleSeo = kind === 'role' ? ROLE_SEO[slug as keyof typeof ROLE_SEO] : null

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: absoluteUrl(`/${kind === 'role' ? 'roles' : kind === 'hero' ? 'heroes' : 'maps'}/${slug}`),
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topicContent.faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={faqJsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ marginBottom: 40, maxWidth: 760 }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>
            HEMEROTECA OVERWATCH
          </div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(38px, 7vw, 68px)', letterSpacing: 1, lineHeight: 0.98, margin: '0 0 16px' }}>
            {title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            {description}
          </p>
        </header>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', marginBottom: 34 }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.8, marginBottom: 10 }}>
            GUÍA RÁPIDA
          </div>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 780 }}>
            {topicContent.overview}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {topicContent.quickWins.map(item => (
              <div key={item.title} style={{ borderTop: '1px solid var(--border2)', paddingTop: 12 }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 16, letterSpacing: 0.8, marginBottom: 5 }}>
                  {item.title}
                </div>
                <p style={{ color: 'var(--text3)', fontSize: 12, lineHeight: 1.55, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {heroSeo && counterHero && (
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', marginBottom: 34 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.8, marginBottom: 10 }}>
              COUNTERS Y MATCHUPS
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 820 }}>
              {heroSeo.intent}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {counterHero.counters.slice(0, 4).map(counter => (
                <Link key={counter.slug} href={`/heroes/${counter.slug}`} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text2)', padding: 14, textDecoration: 'none' }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 5 }}>{counter.name}</strong>
                  <span style={{ fontSize: 12, lineHeight: 1.5 }}>{counter.reason}</span>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
              <Link href={`/counters/${counterHero.slug}`} className="btn btn-secondary btn-sm">VER COUNTERS DE {counterHero.name.toUpperCase()}</Link>
              <Link href={`/team-comps/${counterHero.slug}`} className="btn btn-secondary btn-sm">VER COMPOSICIONES</Link>
              <Link href={`/guides/${counterHero.guideSlug}`} className="btn btn-primary btn-sm">VER GUÍA EN VÍDEO</Link>
            </div>
          </section>
        )}

        {roleSeo && (
          <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '24px', marginBottom: 34 }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 11, letterSpacing: 1.8, marginBottom: 10 }}>
              FUNDAMENTOS DEL ROL
            </div>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 820 }}>
              {roleSeo.overview}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {roleSeo.commonMistakes.map(item => (
                <div key={item.title} style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 14 }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 5 }}>{item.title}</strong>
                  <span style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.5 }}>{item.body}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="topic-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 28, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            <Section title="Guías y consejos">
              {!guides || guides.length === 0 ? (
                <EmptyCopy text="Todavía no hay guías publicadas para este tema." />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                  {guides.map((guide: any) => (
                    <ArticleCard key={guide.id} href={guidePath(guide.slug)} title={guide.title} body={guide.excerpt || guide.body} meta={guide.category || labelForTopic(guide)} />
                  ))}
                </div>
              )}
            </Section>

            <Section title="Noticias y patch notes">
              {!news || news.length === 0 ? (
                <EmptyCopy text="No hay noticias etiquetadas todavía." />
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  {news.map((item: any) => (
                    <ArticleCard key={item.id} href={announcementPath(item)} title={item.title} body={item.excerpt || item.body} meta={item.content_type === 'patch_note' ? 'Patch note' : 'Noticia'} compact />
                  ))}
                </div>
              )}
            </Section>

            <Section title="Preguntas frecuentes">
              <div style={{ display: 'grid', gap: 10 }}>
                {topicContent.faqs.map(item => (
                  <article key={item.question} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
                    <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 18, letterSpacing: 0.6, margin: '0 0 8px' }}>
                      {item.question}
                    </h3>
                    <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </Section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 16, letterSpacing: 1, marginBottom: 12 }}>
                EXPLORAR MÁS
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {topicContent.links.map(link => (
                  <Link key={link.href} href={link.href} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 12, letterSpacing: 1.5, marginBottom: 10 }}>
                REVISA TU PARTIDA
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: '0 0 14px' }}>
                Usa esta hemeroteca como base y recibe feedback aplicado a tus propias decisiones en partida.
              </p>
              <Link href={kind === 'role' ? `/experts?role=${slug}` : '/experts'} className="btn btn-primary btn-sm">VER EXPERTOS</Link>
            </div>

            {experts && experts.length > 0 && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px' }}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 16, letterSpacing: 1, marginBottom: 12 }}>
                  EXPERTOS DESTACADOS
                </div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {experts.map((expert: any) => (
                    <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                        <div style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>{expert.display_name}</div>
                        <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 3 }}>
                          {expert.peak_rank} · desde {formatPrice(expert.price_starter)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,107,43,0.25)', padding: '18px' }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
                PATROCINIO DISPONIBLE
              </div>
              <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.55, margin: 0 }}>
                Espacio nativo para herramientas, hardware o recursos útiles para jugadores de Overwatch. Siempre etiquetado.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function PublicNav() {
  return (
    <nav style={{
      height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3, textDecoration: 'none' }}>
        REPLAID LAB
      </Link>
      <div style={{ flex: 1 }} />
      <Link href="/guides" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Guías</Link>
      <Link href="/counters" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Counters</Link>
      <Link href="/team-comps" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Composiciones</Link>
      <Link href="/news" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Noticias</Link>
      <Link href="/experts" className="hide-mobile" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>Expertos</Link>
      <a href={REPLAID_DISCORD_URL} target="_blank" rel="noopener noreferrer" className="hide-mobile" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>Discord</a>
      <Link href="/login" className="btn btn-primary btn-sm">ENTRAR</Link>
    </nav>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, letterSpacing: 1, color: 'var(--text)', margin: '0 0 16px' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function ArticleCard({ href, title, body, meta, compact = false }: { href: string; title: string; body: string; meta?: string; compact?: boolean }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <article style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: compact ? '16px 18px' : '20px', height: '100%' }}>
        {meta && (
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--accent)', fontSize: 10, letterSpacing: 1.5, marginBottom: 8 }}>
            {meta.toUpperCase()}
          </div>
        )}
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: compact ? 18 : 20, letterSpacing: 0.5, margin: '0 0 8px', lineHeight: 1.15 }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
          {body.replace(/[#*_`]/g, '').slice(0, compact ? 150 : 120).trim()}...
        </p>
      </article>
    </Link>
  )
}

function EmptyCopy({ text }: { text: string }) {
  return <p style={{ color: 'var(--text3)', fontSize: 14, margin: 0 }}>{text}</p>
}

function labelForTopic(item: any) {
  if (item.role) return ROLE_LABELS[item.role as ContentRole]
  if (item.hero) return topicLabel(item.hero)
  if (item.map) return topicLabel(item.map)
  return 'Guía'
}

function buildTopicContent(kind: 'hero' | 'role' | 'map', slug: string, title: string) {
  const label = kind === 'role' ? ROLE_LABELS[slug as ContentRole] || title.replace(' en Overwatch', '') : topicLabel(slug)

  if (kind === 'role') {
    return {
      overview: `${label} es una de las formas más útiles de ordenar una review de Overwatch: te ayuda a separar errores de mecánicas, decisiones de macro, uso de cooldowns y timing de ultimates. Usa esta página como punto de entrada para encontrar guías, noticias y expertos relacionados con el rol.`,
      quickWins: [
        { title: 'Revisa tu primera muerte', body: 'Pregúntate si moriste por falta de cobertura, mal timing o por gastar tarde un recurso defensivo.' },
        { title: 'Mide tu impacto', body: 'No mires solo daño, curación o eliminaciones: busca qué recurso rival forzaste y qué espacio ganó tu equipo.' },
        { title: 'Conecta con el equipo', body: 'Una buena jugada aislada puede ser inútil si tu equipo no podía seguirla o castigarla.' },
      ],
      links: [
        { label: 'Todas las guías de Overwatch', href: '/guides' },
        { label: 'Expertos de Overwatch', href: `/experts?role=${slug}` },
        { label: 'Noticias y patch notes', href: '/news' },
      ],
      faqs: [
        {
          question: `¿Cómo puedo mejorar como ${label} en Overwatch?`,
          answer: `Empieza revisando muertes tempranas, uso de cooldowns y timing con tu equipo. Después compara tus decisiones con guías del rol y pide feedback experto si repites el mismo error en varios replays.`,
        },
        {
          question: `¿Cuándo merece la pena contratar un experto de ${label}?`,
          answer: 'Cuando entiendes la teoría pero no sabes por qué tus partidas se rompen. Un experto puede detectar patrones de posicionamiento, tempo y toma de decisiones que no se ven solo mirando estadísticas.',
        },
      ],
    }
  }

  if (kind === 'hero') {
    return {
      overview: `${label} no se aprende solo memorizando combos. Para sacar valor consistente necesitas entender posicionamiento, ventanas de presión, cooldowns importantes y cuándo tu pick encaja con el mapa y la composición.`,
      quickWins: [
        { title: 'Define tu trabajo', body: 'Antes de la pelea, decide si debes iniciar, presionar un ángulo, proteger a alguien o castigar un cooldown.' },
        { title: 'Cuenta amenazas', body: 'Identifica qué habilidad rival te niega valor y juega alrededor de esa ventana.' },
        { title: 'Revisa mapas', body: 'El mismo héroe cambia mucho según líneas de visión, rutas laterales y cobertura disponible.' },
      ],
      links: [
        { label: 'Guías de héroes', href: '/guides?category=Héroe' },
        { label: 'Composiciones recomendadas', href: `/team-comps/${slug}` },
        { label: 'Expertos recomendados', href: '/experts' },
        { label: 'Fundamentos de Overwatch', href: '/guides/fundamentos-overwatch-5v5-revisar-partidas' },
      ],
      faqs: [
        {
          question: `¿${label} es buen héroe para subir rango?`,
          answer: `Puede serlo si entiendes cuándo aporta valor y cuándo el mapa o la composición rival te limitan. La clave es revisar si tus jugadas fuerzan recursos, crean espacio o cierran peleas.`,
        },
        {
          question: `¿Qué debo mirar en una VOD jugando ${label}?`,
          answer: 'Revisa tus primeras muertes, los cooldowns que gastaste sin valor y si tus entradas coincidían con la presión de tu equipo.',
        },
      ],
    }
  }

  return {
    overview: `${label} cambia cómo se juega Overwatch: rutas, chokes, high grounds y líneas de visión determinan qué composiciones funcionan mejor. Usa esta página para conectar guías, noticias y decisiones de replay relacionadas con el mapa.`,
    quickWins: [
      { title: 'Identifica el choke', body: 'Marca dónde se atasca tu equipo y qué recurso necesitaba para cruzar con seguridad.' },
      { title: 'Busca rutas alternativas', body: 'No todas las peleas se ganan por la línea principal; muchas se abren con una rotación limpia.' },
      { title: 'Controla high ground', body: 'La altura suele decidir visión, presión y supervivencia antes de que empiece la pelea.' },
    ],
    links: [
      { label: 'Todas las guías', href: '/guides' },
      { label: 'Composiciones dive, brawl y poke', href: '/guides/composiciones-dive-brawl-poke-overwatch' },
      { label: 'Expertos para revisar tu replay', href: '/experts' },
    ],
    faqs: [
      {
        question: `¿Cómo se mejora en ${label}?`,
        answer: 'Revisa dónde empieza cada pelea, qué ruta tomó tu equipo y si estabas usando cobertura o high ground. En mapas, el error suele aparecer antes del primer disparo.',
      },
      {
        question: `¿Qué composiciones funcionan mejor en ${label}?`,
        answer: 'Depende de líneas de visión, chokes y movilidad necesaria. Como regla rápida, mapas abiertos favorecen poke, zonas cerradas favorecen brawl y rutas verticales o backlines expuestas favorecen dive.',
      },
    ],
  }
}
