import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import { Expert, formatPrice } from '@/types'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import JsonLd from '@/components/content/JsonLd'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

export function generateMetadata({ searchParams }: { searchParams: { role?: string; rank?: string } }): Metadata {
  const metadata = buildMetadata({
    title: 'Expertos de Overwatch',
    description: 'Encuentra expertos verificados de Overwatch por rol, rango, precio y valoraciones para revisar tu replay.',
    path: '/experts',
  })

  if (searchParams.role || searchParams.rank) {
    metadata.robots = { index: false, follow: true }
  }

  return metadata
}

const ROLE_LABELS: Record<string, string> = {
  tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
}

const ROLE_OPTIONS = [
  { value: '',        label: 'Todos los roles' },
  { value: 'tank',    label: 'Tank' },
  { value: 'dps',     label: 'DPS' },
  { value: 'support', label: 'Support' },
  { value: 'flex',    label: 'Flex' },
]

const RANK_OPTIONS = [
  { value: '',             label: 'Todos los rangos' },
  { value: 'Champion',     label: 'Champion' },
  { value: 'Grandmaster',  label: 'Grandmaster' },
  { value: 'Master',       label: 'Master' },
  { value: 'Diamond',      label: 'Diamond' },
]

const EXPERT_FAQS = [
  {
    question: '¿Qué es una VOD review de Overwatch?',
    answer: 'Es una revisión de una partida completa. El experto identifica decisiones repetidas de posicionamiento, cooldowns, engages y ultimates, y las convierte en un plan de práctica concreto.',
  },
  {
    question: '¿Qué replay debería enviar?',
    answer: 'Una partida competitiva reciente, igualada y en la que no tengas claro por qué perdiste. Una derrota unilateral suele enseñar menos que una partida donde varias decisiones pequeñas cambiaron el resultado.',
  },
  {
    question: '¿Cómo elijo al experto adecuado?',
    answer: 'Busca experiencia en tu rol y en el problema que quieres revisar. Las especialidades, el tipo de análisis, las valoraciones y el plazo de entrega ayudan más que elegir únicamente por rango.',
  },
  {
    question: '¿Una review garantiza que subiré de rango?',
    answer: 'No. La review ofrece diagnóstico y prioridades de práctica, pero la mejora depende de aplicar esas correcciones durante varias sesiones. Replaid Lab no promete una subida de rango concreta.',
  },
]

function buildUrl(role: string, rank: string) {
  const params = new URLSearchParams()
  if (role) params.set('role', role)
  if (rank) params.set('rank', rank)
  const str = params.toString()
  return `/experts${str ? '?' + str : ''}`
}

export default async function ExpertsPage({
  searchParams,
}: {
  searchParams: { role?: string; rank?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const roleFilter = searchParams.role ?? ''
  const rankFilter = searchParams.rank ?? ''

  let query = supabase
    .from('experts')
    .select('*')
    .eq('status', 'active')
    .order('service_paused', { ascending: true })
    .order('avg_rating', { ascending: false })

  if (roleFilter) query = query.eq('main_role', roleFilter)
  if (rankFilter) query = query.ilike('peak_rank', `${rankFilter}%`)

  const { data: experts } = await query
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Expertos de Overwatch',
      description: 'Expertos de Overwatch para revisar partidas, detectar errores repetidos y preparar un plan de mejora.',
      url: absoluteUrl('/experts'),
      publisher: { '@type': 'Organization', name: SITE_NAME },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: EXPERT_FAQS.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <JsonLd data={jsonLd} />

      <PublicNav
        ctaHref={user ? profile?.role === 'admin' ? '/admin' : profile?.role === 'expert' ? '/expert/dashboard' : '/dashboard' : '/login'}
        ctaLabel={user ? 'MI PANEL' : 'ENTRAR'}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--text)', margin: '0 0 6px', letterSpacing: 1 }}>
            EXPERTOS
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, margin: 0 }}>
            Elige a una persona con experiencia en tu rol para revisar una partida y convertir errores repetidos en un plan de práctica claro.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
          {/* Role filter */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
              ROL
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ROLE_OPTIONS.map(({ value, label }) => {
                const active = roleFilter === value
                return (
                  <Link
                    key={value || 'all'}
                    href={buildUrl(value, rankFilter)}
                    style={{
                      fontSize: 12, padding: '5px 12px', textDecoration: 'none',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      color: active ? 'var(--accent)' : 'var(--text2)',
                      background: active ? 'rgba(255,107,43,0.08)' : 'var(--surface)',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Rank filter */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 8 }}>
              RANGO PEAK
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {RANK_OPTIONS.map(({ value, label }) => {
                const active = rankFilter === value
                return (
                  <Link
                    key={value || 'all'}
                    href={buildUrl(roleFilter, value)}
                    style={{
                      fontSize: 12, padding: '5px 12px', textDecoration: 'none',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      color: active ? 'var(--accent)' : 'var(--text2)',
                      background: active ? 'rgba(255,107,43,0.08)' : 'var(--surface)',
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        {(roleFilter || rankFilter) && (
          <div style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>
            {experts?.length ?? 0} experto{(experts?.length ?? 0) !== 1 ? 's' : ''} encontrado{(experts?.length ?? 0) !== 1 ? 's' : ''}
            {' '}·{' '}
            <Link href="/experts" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Limpiar filtros
            </Link>
          </div>
        )}

        {(!experts || experts.length === 0) ? (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border2)',
            padding: '48px 32px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: 'var(--text2)', marginBottom: 8 }}>
              {roleFilter || rankFilter ? 'SIN RESULTADOS' : 'PRÓXIMAMENTE'}
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14, margin: 0 }}>
              {roleFilter || rankFilter
                ? 'No hay expertos activos con estos filtros. Prueba otra combinación.'
                : 'Estamos verificando a los primeros expertos. Vuelve pronto.'
              }
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {experts.map((expert: Expert) => (
              <Link key={expert.id} href={`/experts/${expert.slug || expert.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '24px', cursor: 'pointer', height: '100%', boxSizing: 'border-box',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, background: 'var(--surface3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0, overflow: 'hidden',
                    }}>
                      {expert.avatar_url
                        ? <img src={expert.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ color: 'var(--text2)' }}>{expert.display_name[0]}</span>
                      }
                    </div>
                    <div>
                      <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600 }}>
                        {expert.display_name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>
                        {expert.peak_rank} · {ROLE_LABELS[expert.main_role] ?? expert.main_role}
                      </div>
                      {expert.service_paused && (
                        <div style={{ marginTop: 6, display: 'inline-flex', fontSize: 10, letterSpacing: 1, color: 'var(--yellow)', border: '1px solid rgba(255,214,0,0.28)', padding: '2px 7px' }}>
                          PAUSADO
                        </div>
                      )}
                    </div>
                  </div>

                  {expert.bio && (
                    <p style={{ fontSize: 13, color: 'var(--text2)', margin: '0 0 16px', lineHeight: 1.5 }}>
                      {expert.bio.length > 100 ? expert.bio.slice(0, 100) + '…' : expert.bio}
                    </p>
                  )}

                  {expert.specialties?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {expert.specialties.slice(0, 3).map((s: string) => (
                        <span key={s} style={{
                          fontSize: 11, color: 'var(--text2)', background: 'var(--surface3)',
                          border: '1px solid var(--border2)', padding: '2px 8px',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid var(--border)', paddingTop: 14,
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text2)' }}>
                      {expert.total_reviews > 0
                        ? `⭐ ${Number(expert.avg_rating).toFixed(1)} · ${expert.total_reviews} reviews`
                        : 'Nuevo experto'
                      }
                    </div>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--text)' }}>
                      {expert.service_paused ? 'no disponible' : `desde ${formatPrice(expert.price_starter)}`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <section className="experts-editorial-section">
          <div className="eyebrow">CÓMO FUNCIONA</div>
          <h2>Una review centrada en decisiones, no solo en estadísticas</h2>
          <div className="experts-editorial-grid">
            <article>
              <span>01</span>
              <h3>Elige una partida útil</h3>
              <p>Envía una ranked reciente y competida. Cuéntanos tu rol, el héroe y la situación que más dudas te genera.</p>
            </article>
            <article>
              <span>02</span>
              <h3>El experto revisa el patrón</h3>
              <p>Se buscan primeras muertes, cooldowns sin propósito, rutas previsibles, engages descoordinados y ultimates que no cambian la pelea.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Practica una prioridad cada vez</h3>
              <p>Recibes ejemplos y un orden de trabajo. La intención es que sepas qué mirar en tus siguientes partidas, no abrumarte con veinte correcciones.</p>
            </article>
          </div>
        </section>

        <section className="experts-editorial-section experts-editorial-split">
          <div>
            <div className="eyebrow">ANTES DE ENVIAR</div>
            <h2>Qué replay merece la pena revisar</h2>
            <p>Prioriza una partida donde pudiste jugar con normalidad y aun así sentiste que te faltó impacto. Añade una pregunta concreta: por qué morías primero, cuándo debías entrar o qué recurso estabas gastando demasiado pronto.</p>
          </div>
          <div>
            <div className="eyebrow">EXPECTATIVAS</div>
            <h2>Qué puedes esperar del feedback</h2>
            <p>Una review no garantiza rango ni sustituye la práctica. Sí puede ahorrarte partidas repitiendo el mismo error sin verlo y darte una forma más objetiva de revisar tus propias VODs.</p>
          </div>
        </section>

        <section className="experts-editorial-section">
          <div className="eyebrow">PREGUNTAS FRECUENTES</div>
          <h2>Antes de elegir experto</h2>
          <div className="experts-faq-list">
            {EXPERT_FAQS.map(item => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
