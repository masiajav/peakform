import type { Metadata } from 'next'
import Link from 'next/link'
import TopicArchivePage from '@/components/content/TopicArchivePage'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { topicLabel } from '@/lib/content'
import { absoluteUrl, buildMetadata, SITE_NAME } from '@/lib/seo'
import { buildHeroSeoProfile } from '@/lib/overwatch-seo'
import { isUpcomingHeroSlug, robotsForQuality, topicQualityDecision } from '@/lib/indexing-policy'

export function generateMetadata({ params }: { params: { hero: string } }): Metadata {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)
  const quality = topicQualityDecision('hero', params.hero)

  if (isUpcomingHeroSlug(params.hero)) {
    return buildMetadata({
      title: 'Shion en Overwatch: informacion confirmada y seguimiento',
      description: 'Pagina de seguimiento de Shion en Overwatch. Solo recoge informacion confirmada y se actualizara cuando Blizzard publique rol, habilidades y datos oficiales.',
      path: `/heroes/${params.hero}`,
      robots: robotsForQuality(quality),
    })
  }

  return buildMetadata({
    title: profile?.searchTitle || `Guia de ${label} en Overwatch: consejos, counters y videos`,
    description: profile?.searchDescription || `Hemeroteca de ${label}: guias, counters, mapas, errores comunes, noticias y recursos para mejorar en Overwatch.`,
    path: `/heroes/${params.hero}`,
    robots: robotsForQuality(quality),
  })
}

export default function HeroPage({ params }: { params: { hero: string } }) {
  const label = topicLabel(params.hero)
  const profile = buildHeroSeoProfile(params.hero)

  if (isUpcomingHeroSlug(params.hero)) {
    return <UpcomingHeroPage slug={params.hero} name={label} />
  }

  return (
    <TopicArchivePage
      kind="hero"
      slug={params.hero}
      title={`Guia de ${label} en Overwatch`}
      description={profile?.searchDescription || `Guias, counters, mapas, noticias y consejos aplicables para jugar mejor con ${label}.`}
    />
  )
}

function UpcomingHeroPage({ slug, name }: { slug: string; name: string }) {
  const pageUrl = absoluteUrl(`/heroes/${slug}`)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name} en Overwatch`,
    description: 'Seguimiento pre-release con informacion confirmada y estado editorial.',
    url: pageUrl,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />

      <main style={{ maxWidth: 980, margin: '0 auto', padding: '56px 24px 88px' }}>
        <div style={{ marginBottom: 28, fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/heroes" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Heroes</Link>
          <span>/</span>
          <span>{name}</span>
        </div>

        <header style={{ maxWidth: 780, marginBottom: 30 }}>
          <div className="eyebrow">HEROE EN SEGUIMIENTO</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 'clamp(42px, 8vw, 78px)', letterSpacing: 1, lineHeight: 0.95, margin: '0 0 16px' }}>
            {name.toUpperCase()} EN OVERWATCH
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Esta pagina prepara la cobertura de {name}, pero aun no la tratamos como guia definitiva. Hasta que Blizzard publique informacion completa, evitamos inventar rol, habilidades, counters o composiciones.
          </p>
        </header>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>ESTADO EDITORIAL</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <StatusCard title="Indexacion" body="Noindex, follow hasta tener datos oficiales suficientes y contenido propio completo." />
            <StatusCard title="Anuncios" body="Sin anuncios durante la fase pre-release para evitar inventario de bajo valor." />
            <StatusCard title="Contenido" body="Solo informacion confirmada, contexto editorial y proximas tareas de actualizacion." />
          </div>
        </section>

        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 24, marginBottom: 22 }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 28, letterSpacing: 1, margin: '0 0 12px' }}>
            Que falta para publicar la guia completa
          </h2>
          <ul style={{ color: 'var(--text2)', lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
            <li>Rol oficial dentro del juego.</li>
            <li>Kit completo de habilidades y ultimate.</li>
            <li>Primeros matchups reales contra heroes actuales.</li>
            <li>Composiciones recomendadas para 5v5 y 6v6.</li>
            <li>Resumen editorial propio basado en pruebas o fuentes oficiales.</li>
          </ul>
        </section>

        <section style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/heroes" className="btn btn-secondary btn-sm">VER HEROES</Link>
          <Link href="/patch-notes" className="btn btn-secondary btn-sm">SEGUIR PATCH NOTES</Link>
          <Link href="/guides" className="btn btn-primary btn-sm">VER GUIAS ACTUALES</Link>
        </section>
      </main>
    </div>
  )
}

function StatusCard({ title, body }: { title: string; body: string }) {
  return (
    <article style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', padding: 16 }}>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 20, letterSpacing: 0.8, margin: '0 0 8px' }}>
        {title}
      </h2>
      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
  )
}
