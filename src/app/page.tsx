import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TIER_CONFIG, formatPrice } from '@/types'

export default async function RootPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'admin')  redirect('/admin')
    if (profile?.role === 'expert') redirect('/expert/dashboard')
    redirect('/dashboard')
  }

  const adminClient = createAdminClient()
  const [{ data: experts }, { data: latestNews }] = await Promise.all([
    supabase
      .from('experts')
      .select('id, display_name, peak_rank, main_role, specialties, avg_rating, total_reviews, price_starter')
      .eq('status', 'active')
      .order('avg_rating', { ascending: false })
      .limit(6),
    adminClient
      .from('announcements')
      .select('id, title, body, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(3),
  ])

  const ROLE_LABELS: Record<string, string> = {
    tank: 'Tank', dps: 'DPS', support: 'Support', flex: 'Flex',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>

      {/* Nav */}
      <nav style={{
        height: 52, background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 20,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 26, color: 'var(--accent)', letterSpacing: 3 }}>
          REPLAID LAB
        </span>
        <div style={{ flex: 1 }} />
        <Link href="/guides" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
          Guías
        </Link>
        <Link href="/news" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
          Noticias
        </Link>
        <Link href="/experts" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
          Expertos
        </Link>
        <Link href="/apply" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none' }}>
          Ser experto
        </Link>
        <Link href="/login" className="btn btn-primary btn-sm">
          ENTRAR
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ padding: '96px 24px 104px', textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', fontSize: 11, letterSpacing: 2, color: 'var(--accent)',
          fontFamily: 'Bebas Neue, sans-serif', border: '1px solid rgba(255,107,43,0.25)',
          padding: '4px 12px', marginBottom: 32,
        }}>
          ANÁLISIS DE REPLAYS · OVERWATCH
        </div>

        <h1 style={{
          fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 9vw, 84px)',
          letterSpacing: 2, lineHeight: 0.92, margin: '0 0 28px', color: 'var(--text)',
        }}>
          DOMINA.<br />
          <span style={{ color: 'var(--accent)' }}>APRENDE DE LOS MEJORES.</span>
        </h1>

        <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.65 }}>
          Feedback real de jugadores nivel Champion y Grandmaster. No IA genérica — un análisis humano, estructurado y accionable.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/experts" className="btn btn-primary btn-lg">
            VER EXPERTOS →
          </Link>
          <a href="#como-funciona" className="btn btn-secondary btn-lg">
            CÓMO FUNCIONA
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48, marginTop: 60,
          borderTop: '1px solid var(--border)', paddingTop: 36, flexWrap: 'wrap',
        }}>
          {[
            { value: '24-72h', label: 'TIEMPO DE ENTREGA' },
            { value: 'Diamond+', label: 'NIVEL MÍNIMO' },
            { value: '3 TIERS', label: 'PLANES DISPONIBLES' },
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

      {/* How it works */}
      <section id="como-funciona" style={{
        borderTop: '1px solid var(--border)', background: 'var(--surface)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 2,
            textAlign: 'center', marginBottom: 56, color: 'var(--text)',
          }}>
            CÓMO FUNCIONA
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {[
              {
                n: '01',
                title: 'ELIGE UN EXPERTO',
                desc: 'Filtra por rol, nivel y precio. Todos son jugadores activos Champion o Grandmaster en Europa.',
              },
              {
                n: '02',
                title: 'COMPARTE TU REPLAY',
                desc: 'Pega el enlace de YouTube o tu código de repetición de Overwatch. Cuéntale al experto en qué áreas quieres mejorar.',
              },
              {
                n: '03',
                title: 'RECIBE TU ANÁLISIS',
                desc: 'Errores identificados, puntos fuertes y un plan de acción concreto. Todo en 24-72 horas.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 72, color: 'var(--accent)', lineHeight: 1, marginBottom: 16, opacity: 0.9 }}>
                  {n}
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, letterSpacing: 1, color: 'var(--text)', marginBottom: 10 }}>
                  {title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 2,
            textAlign: 'center', marginBottom: 12, color: 'var(--text)',
          }}>
            PLANES
          </h2>
          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text2)', marginBottom: 4 }}>
            Cada experto fija sus propios precios y describe qué incluye cada tier.
          </p>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text3)', marginBottom: 48 }}>
            El jugador paga el precio del experto más una comisión de plataforma del 20%.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                tier: 'starter' as const,
                highlight: false,
                baseFrom: 200,
              },
              {
                tier: 'pro' as const,
                highlight: true,
                baseFrom: 500,
              },
              {
                tier: 'deep_dive' as const,
                highlight: false,
                baseFrom: 800,
              },
            ].map(({ tier, highlight, baseFrom }) => {
              const cfg = TIER_CONFIG[tier]
              return (
                <div key={tier} style={{
                  background: highlight ? 'var(--surface)' : 'var(--surface)',
                  border: highlight ? '1px solid var(--accent)' : '1px solid var(--border)',
                  padding: '28px 24px',
                  position: 'relative',
                }}>
                  {highlight && (
                    <div style={{
                      position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--accent)', color: '#0a0a0a', fontSize: 10,
                      fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1.5,
                      padding: '2px 10px',
                    }}>
                      MÁS POPULAR
                    </div>
                  )}
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: 1, marginBottom: 6, color: 'var(--text)' }}>
                    {cfg.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 4 }}>
                    Desde <span style={{ color: 'var(--text)', fontWeight: 600 }}>{formatPrice(baseFrom)}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16 }}>
                    El experto fija el precio y el contenido exacto
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 1.5, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 10 }}>
                      INCLUYE HABITUALMENTE
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {cfg.features.map(f => (
                        <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--green)', fontSize: 12, marginTop: 2 }}>✓</span>
                          <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expert preview */}
      {experts && experts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', padding: '80px 24px', background: 'var(--surface)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 36, letterSpacing: 2, margin: 0, color: 'var(--text)' }}>
                CONOCE A LOS ANALISTAS
              </h2>
              <Link href="/experts" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
                VER TODOS →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {experts.map(expert => (
                <Link key={expert.id} href={`/experts/${expert.id}`} style={{ textDecoration: 'none' }}>
                  <div className="expert-card" style={{
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    padding: '20px 22px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                      <div style={{
                        width: 44, height: 44, background: 'var(--surface3)',
                        border: '1px solid var(--border2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, color: 'var(--text2)',
                        flexShrink: 0,
                      }}>
                        {expert.display_name[0]}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, letterSpacing: 0.5, color: 'var(--text)' }}>
                          {expert.display_name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>
                          {expert.peak_rank} · {ROLE_LABELS[expert.main_role] || expert.main_role}
                        </div>
                      </div>
                    </div>
                    {expert.specialties?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                        {expert.specialties.slice(0, 3).map((s: string) => (
                          <span key={s} style={{
                            fontSize: 11, background: 'var(--surface3)', color: 'var(--text2)',
                            border: '1px solid var(--border2)', padding: '2px 8px',
                          }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                        {expert.total_reviews > 0 ? `${expert.total_reviews} reviews` : 'Nuevo'}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text2)' }}>
                        Desde <span style={{ color: 'var(--text)', fontWeight: 600 }}>{formatPrice(expert.price_starter)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News widget */}
      {latestNews && latestNews.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: 2, margin: 0, color: 'var(--text)' }}>
                ÚLTIMAS NOTICIAS
              </h2>
              <Link href="/news" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>VER TODAS →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {latestNews.map((n: any) => (
                <div key={n.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 22px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: 1, marginBottom: 6 }}>
                    {new Date(n.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 17, letterSpacing: 0.5, color: 'var(--text)', marginBottom: 6 }}>
                    {n.title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0, lineHeight: 1.5 }}>
                    {n.body.length > 140 ? n.body.slice(0, 140) + '…' : n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section style={{ padding: '96px 24px', textAlign: 'center', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 60px)',
            letterSpacing: 2, margin: '0 0 16px', color: 'var(--text)',
          }}>
            ¿LISTO PARA SUBIR DE RANGO?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: 36, lineHeight: 1.6 }}>
            Un solo análisis puede cambiar cómo ves tus partidas para siempre.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/login" className="btn btn-primary btn-lg">
              EMPEZAR AHORA
            </Link>
            <Link href="/experts" className="btn btn-secondary btn-lg">
              VER EXPERTOS
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)', letterSpacing: 2 }}>
          REPLAID LAB
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/guides" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Guías</Link>
          <Link href="/news" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Noticias</Link>
          <Link href="/experts" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Expertos</Link>
          <Link href="/apply" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Ser experto</Link>
          <Link href="/legal" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Legal</Link>
          <Link href="/login" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none' }}>Entrar</Link>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 Replaid Lab</span>
      </footer>

    </div>
  )
}
