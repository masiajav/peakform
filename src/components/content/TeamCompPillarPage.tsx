import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import type { TeamCompPillar } from '@/lib/seo-clusters'

type TeamCompPillarPageProps = {
  pillar: TeamCompPillar
}

export default function TeamCompPillarPage({ pillar }: TeamCompPillarPageProps) {
  const pageUrl = absoluteUrl(`/team-comps/${pillar.slug}`)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pillar.h1,
      description: pillar.seoDescription,
      image: absoluteUrl(`/heroes/${pillar.slug}.png`),
      url: pageUrl,
      datePublished: pillar.schemaDate ?? '2026-06-28',
      dateModified: pillar.schemaDate ?? '2026-06-28',
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: pageUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Composiciones', item: absoluteUrl('/team-comps') },
        { '@type': 'ListItem', position: 2, name: pillar.name, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pillar.faqs.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <JsonLd data={jsonLd} />
      <PublicNav />

      <main className="seo-pillar-page">
        <nav className="seo-pillar-breadcrumb" aria-label="Migas de pan">
          <Link href="/team-comps">Composiciones</Link><span>/</span><span>{pillar.name}</span>
        </nav>

        <header className="seo-pillar-hero">
          <div>
            <div className="eyebrow">COMPOSICIONES · 5V5 Y 6V6</div>
            <h1>{pillar.h1}</h1>
            <div className="seo-pillar-intro">{pillar.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="seo-pillar-meta">
              <span>Actualizado: {pillar.updatedAt}</span>
              <span>Parche revisado: {pillar.reviewedPatch}</span>
            </div>
          </div>
          <div className="seo-pillar-portrait">
            <Image src={`/heroes/${pillar.slug}.png`} alt={`${pillar.name} en Overwatch`} fill priority sizes="(max-width: 760px) 100vw, 360px" />
          </div>
        </header>

        <section className="seo-pillar-section">
          <div className="eyebrow">RESUMEN RÁPIDO</div>
          <h2>Qué necesita una composición con {pillar.name}</h2>
          <ul className="seo-pillar-checklist compact">{pillar.summary.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">LINEUPS RECOMENDADOS</div>
          <h2>Tres formas de jugar alrededor de {pillar.name}</h2>
          <div className="seo-composition-list">
            {pillar.compositions.map(comp => (
              <article key={comp.name} className="seo-composition-card">
                <div className="seo-composition-heading">
                  <div><span>{comp.format}</span><span>{comp.style}</span></div>
                  <h3>{comp.name}</h3>
                </div>
                <div className="seo-composition-lineup">{comp.lineup.map(hero => <strong key={hero}>{hero}</strong>)}</div>
                <dl>
                  <dt>Condición de victoria</dt><dd>{comp.winCondition}</dd>
                  <dt>Plan de engage</dt><dd>{comp.engagePlan}</dd>
                  <dt>Dónde funciona</dt><dd>{comp.goodMaps}</dd>
                  <dt>Qué la frena</dt><dd>{comp.weakAgainst}</dd>
                  <dt>Sustituciones</dt><dd>{comp.substitutions}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">RESPONSABILIDADES</div>
          <h2>Qué debe aportar cada parte del equipo</h2>
          <div className="seo-pillar-card-grid">{pillar.responsibilities.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="seo-pillar-section seo-pillar-two-column">
          <div>
            <div className="eyebrow">ROTACIÓN Y ENGAGE</div>
            <h2>Un plan sencillo para entrar juntos</h2>
            <ol className="seo-pillar-steps">{pillar.rotationPlan.map(item => <li key={item}>{item}</li>)}</ol>
          </div>
          <div>
            <div className="eyebrow">DEBILIDADES</div>
            <h2>Por qué la composición puede fallar</h2>
            <ul className="seo-pillar-checklist danger">{pillar.weaknesses.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">EJEMPLOS DE RANKED</div>
          <h2>Cómo se coordina sin convertir la partida en una scrim</h2>
          <div className="seo-pillar-card-grid three">{pillar.examples.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">CHECKLIST</div>
          <h2>Antes de bloquear la composición</h2>
          <ul className="seo-pillar-checklist compact">{pillar.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">FAQ</div>
          <h2>Preguntas frecuentes sobre composiciones con {pillar.name}</h2>
          <div className="seo-pillar-faq">{pillar.faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className="seo-pillar-related">
          <div><div className="eyebrow">SIGUIENTE PASO</div><h2>Completa el plan de partida</h2></div>
          <div>{pillar.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        </section>
      </main>
    </div>
  )
}
