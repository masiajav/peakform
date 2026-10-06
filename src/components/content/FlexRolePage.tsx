import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from './JsonLd'
import { flexRoleGuide as guide } from '@/lib/flex-role-guide'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'

export default function FlexRolePage() {
  const url = absoluteUrl(guide.path)
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: guide.seoTitle, description: guide.seoDescription, url, dateModified: guide.schemaDate, author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME }, mainEntityOfPage: url },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Guías', item: absoluteUrl('/guides') },
      { '@type': 'ListItem', position: 2, name: 'Jugar flex', item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: guide.faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <PublicNav />
      <main className="seo-pillar-page flex-role-page">
        <nav className="seo-pillar-breadcrumb" aria-label="Migas de pan"><Link href="/guides">Guías</Link><span>/</span><span>Flex</span></nav>
        <header className="seo-pillar-hero" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <div>
            <div className="eyebrow">HERO POOL</div>
            <h1>{guide.h1}</h1>
            <div className="seo-pillar-intro">{guide.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="seo-pillar-meta">
              <span>Por Replaid Lab</span>
              <span>Actualizado: <time dateTime={guide.schemaDate}>{guide.updatedAt}</time></span>
              <Link href="/contact" style={{ color: 'var(--text3)', fontSize: 'inherit', textDecoration: 'none' }}>Comunicar una corrección</Link>
            </div>
          </div>
        </header>
        <section className="seo-pillar-section">
          <div className="eyebrow">ANTES DEL SWAP</div>
          <h2>Qué necesitas para que el cambio tenga sentido</h2>
          <ul className="seo-pillar-checklist compact">{guide.summary.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="seo-pillar-section">
          <div className="eyebrow">ALTERNATIVAS POR ROL</div>
          <h2>Ejemplos de un hero pool pequeño</h2>
          <div className="seo-pillar-card-grid three">
            {guide.pools.map(pool => (
              <article key={pool.role}>
                <h3><Link href={pool.href}>{pool.role}</Link></h3>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', minHeight: 88, marginBottom: 16 }}>
                  {pool.heroes.map(hero => <Link key={hero.slug} href={`/heroes/${hero.slug}`} aria-label={`Guía de ${hero.name}`}><Image src={`/heroes/${hero.slug}.png`} alt={hero.name} width={88} height={88} style={{ objectFit: 'contain', objectPosition: 'center bottom' }} /></Link>)}
                </div>
                <p>{pool.body}</p>
                <p><strong>{pool.question}</strong></p>
              </article>
            ))}
          </div>
        </section>
        {guide.sections.map(section => (
          <section key={section.id} id={section.id} className="seo-pillar-section">
            <h2>{section.title}</h2>
            <div className="seo-pillar-intro">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>
        ))}
        <section className="seo-pillar-section">
          <h2>Seis preguntas para revisar tu cambio</h2>
          <ul className="seo-pillar-checklist compact">{guide.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="seo-pillar-section">
          <h2>Preguntas frecuentes sobre jugar flex</h2>
          <div className="seo-pillar-faq">{guide.faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </section>
        <section className="seo-pillar-related">
          <div><h2>Trabaja la decisión que te cuesta</h2></div>
          <div>{guide.links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>
        </section>
      </main>
    </>
  )
}
