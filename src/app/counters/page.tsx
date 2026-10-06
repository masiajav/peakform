import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import SeoFaq from '@/components/content/SeoFaq'
import { COUNTER_HEROES } from '@/lib/overwatch-counters'
import { PILLAR_COUNTER_SLUGS } from '@/lib/indexing-policy'
import SiteNav from '@/components/layout/PublicNav'
import { absoluteUrl, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Counters de Overwatch por héroe: picks y matchups para ranked',
  description: 'Busca qué jugar contra cada héroe de Overwatch: counters, picks recomendados, ventanas de castigo y cuándo no cambiar por tilt.',
  path: '/counters',
})

export default function CountersPage() {
  const featuredHeroes = COUNTER_HEROES.filter(hero => PILLAR_COUNTER_SLUGS.includes(hero.slug))
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Counters de héroes de Overwatch',
    itemListElement: featuredHeroes.map((hero, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Counters de ${hero.name}`,
      url: absoluteUrl(`/counters/${hero.slug}`),
    })),
  }

  const faq = [
    {
      question: '¿Qué significa counter en Overwatch?',
      answer: 'Un counter es un héroe, estilo de juego o composición que reduce mucho el valor de otro héroe al negar su recurso principal o castigar su debilidad.',
    },
    {
      question: '¿Tengo que cambiar siempre si me counterean?',
      answer: 'No siempre. A veces basta con cambiar posición, timing o cooldowns. Cambia cuando tu héroe ya no puede cumplir su función.',
    },
    {
      question: '¿Los counters cambian con los parches?',
      answer: 'Sí. Cambios de daño, cooldowns, perks o formato pueden alterar los matchups, así que conviene revisar patch notes antes de asumir valores.',
    },
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={itemListJsonLd} />
      <SiteNav />

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 88px' }}>
        <header style={{ maxWidth: 820, marginBottom: 28 }}>
          <div className="eyebrow">COUNTERS POR HÉROE</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 7vw, 76px)', letterSpacing: 1, lineHeight: 0.96, margin: '0 0 16px' }}>
            COUNTERS DE OVERWATCH POR HÉROE
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            Busca al héroe que os está complicando la partida. Encontrarás qué picks pueden ayudar, qué habilidad conviene esperar y cómo responder sin cambiar de personaje. Si necesitas comparar opciones según vuestro equipo, abre Pick Lab.
          </p>
        </header>

        <section className="counter-hub-tool" style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', marginBottom: 20, padding: 22 }}>
          <div>
            <div className="eyebrow">HERRAMIENTA DE MATCHUPS</div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 0, margin: '0 0 8px' }}>Busca el counter dentro de Pick Lab</h2>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Elige el héroe rival y tu rol para comparar opciones que encajen en vuestro equipo.
            </p>
          </div>
          <Link href="/pick-lab?mode=counters" className="btn btn-primary">ABRIR COUNTER RÁPIDO</Link>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 22, marginBottom: 20 }}>
          <div className="eyebrow">CÓMO LEER UN COUNTER</div>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: '0 0 12px' }}>
            Un counter funciona cuando niega movilidad, fuerza un cooldown clave, castiga el rango cómodo del rival o protege el objetivo que quiere matar. No se trata solo de cambiar de pick: si mantienes el mismo timing malo, el matchup seguirá siendo incómodo.
          </p>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            Antes de cambiar, revisa si el problema es realmente el matchup o si estás entrando demasiado pronto, jugando sin cobertura o gastando recursos antes de la amenaza real.
          </p>
        </section>

        <section style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: 18, marginBottom: 20 }}>
          <div className="eyebrow">GUÍAS POR HÉROE</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            {featuredHeroes.map(hero => (
              <Link key={hero.slug} href={`/counters/${hero.slug}`} className="btn btn-secondary btn-sm">
                {hero.name}
              </Link>
            ))}
          </div>
        </section>

        <section style={{ margin: '34px 0' }}>
          <div className="eyebrow">ANTES DE CAMBIAR DE HÉROE</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, letterSpacing: 1, margin: '8px 0 18px' }}>Tres formas de ganar un matchup difícil</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { title: 'Cambia la distancia', body: 'Si Reaper domina el corto alcance o Widowmaker controla la calle, no repitas el duelo a su distancia favorita. Una ruta cubierta o un ángulo distinto puede resolver más que un cambio inmediato de pick.' },
              { title: 'Espera el cooldown', body: 'Suzu, Sleep, burbujas, Recall o movilidad suelen definir la entrada. Fuerza primero ese recurso y compromete tu daño después; entrar contra todo disponible hace que cualquier héroe parezca un counter imposible.' },
              { title: 'Ayuda al compañero que recibe la entrada', body: 'Contra un flanker no hace falta perseguir hasta matarlo. Forzar su salida y volver con tu backline puede dejar a tu equipo con ventaja en la pelea principal.' },
            ].map(item => (
              <article key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20 }}>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 21, letterSpacing: .5, margin: '0 0 9px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <p style={{ color: 'var(--text3)', fontSize: 12, margin: '28px 0 0' }}>¿Has visto un consejo desactualizado? <Link href="/contact" style={{ color: 'var(--text3)' }}>Comunicar una corrección</Link></p>
        <SeoFaq items={faq} title="Preguntas sobre counters de Overwatch" />
      </main>
    </div>
  )
}
