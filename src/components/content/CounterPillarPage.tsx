import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/content/JsonLd'
import PublicNav from '@/components/layout/PublicNav'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import type { CounterPillar } from '@/lib/seo-clusters'
import { safeTopicHref } from '@/lib/topic-links'

type CounterPillarPageProps = {
  pillar: CounterPillar
}

export default function CounterPillarPage({ pillar }: CounterPillarPageProps) {
  const pageUrl = absoluteUrl(`/counters/${pillar.slug}`)
  const seoTitle = pillar.seoTitle
  const seoDescription = pillar.seoDescription
  const reviewLabel = /^(?:Ranked|Kit)\b/i.test(pillar.reviewedPatch) ? 'Habilidades revisadas' : 'Parche revisado'
  const isTrial = pillar.analysisStatus === 'trial'
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seoTitle,
      description: seoDescription,
      image: absoluteUrl(`/heroes/${pillar.slug}.png`),
      url: pageUrl,
      datePublished: pillar.publishedDate,
      dateModified: pillar.schemaDate,
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: pageUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Counters', item: absoluteUrl('/counters') },
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
          <Link href="/counters">Counters</Link><span>/</span><span>{pillar.name}</span>
        </nav>

        <header className="seo-pillar-hero">
          <div>
            <div className="eyebrow">MATCHUPS · {pillar.role}</div>
            <h1>{pillar.h1}</h1>
            <div className="seo-pillar-intro">
              {pillar.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="seo-pillar-meta">
              <span>Por Replaid Lab</span>
              <span>Actualizado: <time dateTime={pillar.schemaDate}>{pillar.updatedAt}</time></span>
              <span>{reviewLabel}: {pillar.reviewedPatch}</span>
              <Link href="/contact" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Comunicar una corrección</Link>
            </div>
          </div>
          <div
            className="seo-pillar-portrait"
            style={{ position: 'relative', minHeight: 340, maxHeight: 380, backgroundColor: 'var(--surface2)' }}
          >
            <Image
              src={`/heroes/${pillar.slug}.png`}
              alt={`${pillar.name} en Overwatch`}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 360px"
              style={{ boxSizing: 'border-box', objectFit: 'contain', objectPosition: 'center bottom', padding: 26 }}
            />
          </div>
        </header>

        <section className="seo-pillar-section">
          <div className="eyebrow">EN CORTO</div>
          <h2>Contra {pillar.name}, qué importa de verdad</h2>
          <ul className="seo-pillar-checklist compact">
            {pillar.summary.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">{isTrial ? 'OPCIONES SEGÚN EL KIT DE PRUEBA' : 'HÉROES RECOMENDADOS'}</div>
          <h2>{isTrial ? `Qué puedes probar frente a ${pillar.name}` : `Los counters más útiles contra ${pillar.name}`}</h2>
          <div className="seo-threat-grid">
            {pillar.threats.map(threat => (
              <article key={threat.name} className="seo-threat-card">
                <h3><Link href={safeTopicHref(threat.href)}>{threat.name}</Link></h3>
                <p>{threat.danger}</p>
                <dl>
                  <dt>Señal</dt><dd>{threat.signal}</dd>
                  <dt>Respuesta</dt><dd>{threat.response}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">VENTANAS DE CASTIGO</div>
          <h2>Cuándo {pillar.name} deja de tener la iniciativa</h2>
          <div className="seo-pillar-card-grid">
            {pillar.cooldownWindows.map(item => (
              <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="seo-pillar-section seo-pillar-two-column">
          <div>
            <div className="eyebrow">SIN CAMBIAR DE HÉROE</div>
            <h2>Cómo adaptar tu forma de jugar</h2>
            <ul className="seo-pillar-checklist">{pillar.adaptations.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">ERRORES COMUNES</div>
            <h2>Lo que facilita la partida a {pillar.name}</h2>
            <ul className="seo-pillar-checklist danger">{pillar.mistakes.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">{isTrial ? 'SITUACIONES PARA REVISAR' : 'EJEMPLOS DE RANKED'}</div>
          <h2>Cómo se ve una buena respuesta en partida</h2>
          <div className="seo-pillar-card-grid three">
            {pillar.examples.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">REVISIÓN RÁPIDA</div>
          <h2>Checklist para tu siguiente partida</h2>
          <ul className="seo-pillar-checklist compact">{pillar.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="seo-pillar-section">
          <div className="eyebrow">FAQ</div>
          <h2>Preguntas frecuentes sobre los counters de {pillar.name}</h2>
          <div className="seo-pillar-faq">
            {pillar.faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        {pillar.conclusion && <section className="seo-pillar-section">
          <h2>Qué cambiar en tu próxima partida</h2>
          <p>{pillar.conclusion}</p>
        </section>}

        <section className="seo-pillar-related">
          <div><div className="eyebrow">SIGUIENTE PASO</div><h2>Sigue preparando el matchup</h2></div>
          <div>{pillar.links.map(link => <Link key={link.href} href={safeTopicHref(link.href)}>{link.label}</Link>)}</div>
        </section>
      </main>
    </div>
  )
}
