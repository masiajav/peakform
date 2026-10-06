import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '@/components/layout/PublicNav'
import type { HeroPillar, HeroPillarCard } from '@/lib/hero-pillars'
import { getHeroPortrait } from '@/lib/overwatch-hero-portraits'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import JsonLd from './JsonLd'
import GuideVideo from './GuideVideo'
import styles from './ReviewedHeroPillarPage.module.css'

function EditorialRows({ items }: { items: HeroPillarCard[] }) {
  return <div className={styles.rows}>{items.map(item => (
    <div className={styles.row} key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>
  ))}</div>
}

export default function ReviewedHeroPillarPage({ pillar }: { pillar: HeroPillar }) {
  const url = absoluteUrl(`/heroes/${pillar.slug}`)
  const portrait = getHeroPortrait(pillar.slug)
  const isTrial = pillar.analysisStatus === 'trial'
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: pillar.seoTitle, description: pillar.seoDescription, url,
      ...(portrait ? { image: absoluteUrl(portrait) } : {}), datePublished: pillar.publishedAt, dateModified: pillar.schemaDate,
      author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME }, mainEntityOfPage: url },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Héroes', item: absoluteUrl('/heroes') },
      { '@type': 'ListItem', position: 2, name: pillar.name, item: url },
    ] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pillar.faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ]

  return <>
    <JsonLd data={schemas} />
    <PublicNav />
    <main className={`seo-pillar-page ${styles.page}`}>
      <nav className="seo-pillar-breadcrumb" aria-label="Migas de pan"><Link href="/heroes">Héroes</Link><span>/</span><span>{pillar.name}</span></nav>
      <header className={styles.header}>
        <div>
          <div className="eyebrow">{pillar.role} · {pillar.kicker}</div>
          <h1>{pillar.h1}</h1>
          <div className={styles.paragraphs}>{pillar.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className={styles.meta}>
            <span>Por Replaid Lab</span>
            <span>Publicado: <time dateTime={pillar.publishedAt}>{pillar.publishedAt && new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${pillar.publishedAt}T00:00:00Z`))}</time></span>
            <span>Revisado: <time dateTime={pillar.schemaDate}>{pillar.updatedAt}</time></span>
            <Link href="/contact">Comunicar una corrección</Link>
          </div>
        </div>
        {portrait && <div className={styles.portrait}><Image src={portrait} alt={pillar.name} fill priority sizes="(max-width: 760px) 200px, 280px" /></div>}
      </header>
      <nav className={styles.contents} aria-label={`Secciones de la guía de ${pillar.name}`}>
        <Link href="#posicion">Posición</Link><Link href="#habilidades">Habilidades</Link><Link href="#perks">Perks</Link><Link href="#amenazas">Amenazas</Link><Link href="#vod">Revisión de VOD</Link>
        {pillar.balanceReview?.length ? <Link href="#balance">Balance</Link> : null}
        {pillar.video ? <Link href="#video">Vídeo</Link> : null}
      </nav>
      <section className={styles.section}>
        <h2>Por dónde empezar con {pillar.name}</h2>
        <ul className={styles.list}>{pillar.headerTips?.map(item => <li key={item}>{item}</li>)}</ul>
        <EditorialRows items={pillar.quickAnswers || []} />
        <dl className={styles.facts}>{pillar.facts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>
      </section>
      <section id="posicion" className={styles.section}>
        <h2>Colocarte antes de que empiece la pelea</h2>
        <ol className={styles.list}>{pillar.rankedPlan.map(item => <li key={item}>{item}</li>)}</ol>
        <EditorialRows items={pillar.sections} />
      </section>
      <section id="habilidades" className={styles.section}>
        <h2>{isTrial ? `Habilidades de ${pillar.name} mostradas en el trial` : `Cómo usar las habilidades de ${pillar.name}`}</h2>
        {pillar.abilityKit && <figure className={styles.kit}>
          <Image src={pillar.abilityKit.src} alt={pillar.abilityKit.alt} width={pillar.abilityKit.width} height={pillar.abilityKit.height} sizes="(max-width: 760px) 100vw, 1120px" />
          <figcaption>{pillar.abilityKit.caption} <a href={pillar.abilityKit.src}>Ver kit de {pillar.name} ampliado</a></figcaption>
        </figure>}
        <EditorialRows items={pillar.abilities} />
      </section>
      {pillar.perks?.length ? <section id="perks" className={styles.section}>
        <h2>Perks: elecciones Minor y Major</h2>
        {pillar.perksIntro && <p>{pillar.perksIntro}</p>}
        <EditorialRows items={pillar.perks} />
      </section> : null}
      {pillar.balanceReview?.length ? <section id="balance" className={styles.section}>
        <h2>Cambios de balance de {pillar.name}</h2><EditorialRows items={pillar.balanceReview} />
      </section> : null}
      <section className={styles.section}><h2>Errores que conviene revisar</h2><ul className={styles.list}>{pillar.mistakes.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section id="amenazas" className={styles.section}>
        <h2>{isTrial ? 'Amenazas que conviene comprobar al lanzamiento' : 'Qué cambia frente a cada amenaza'}</h2>
        <EditorialRows items={pillar.counters} />
        <div className={styles.paragraphs}>{pillar.counterplay.map(item => <p key={item}>{item}</p>)}</div>
        <p><Link href={`/counters/${pillar.slug}`}>{isTrial ? `Consultar el análisis del kit de prueba de ${pillar.name}` : `Ver los matchups y las respuestas frente a ${pillar.name}`}</Link></p>
      </section>
      <section className={styles.section}>
        <h2>{isTrial ? 'Qué comprobar antes de elegir una composición' : 'Equipos en los que puedes aprovechar su kit'}</h2><EditorialRows items={pillar.compositions} />
        {!isTrial && <p><Link href={`/team-comps/${pillar.slug}`}>Preparar las rotaciones y el seguimiento del equipo</Link></p>}
      </section>
      <section id="vod" className={styles.section}>
        <h2>Qué mirar en una VOD de {pillar.name}</h2>
        <ol className={styles.list}>{pillar.vodReview.map(item => <li key={item}>{item}</li>)}</ol>
        <h3>Antes de la siguiente pelea</h3>
        <ul className={styles.checklist}>{pillar.checklist.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      {pillar.video ? <section id="video" className={styles.section}>
        <h2>Guía en vídeo de {pillar.name}</h2>
        <p>{pillar.video.description}</p>
        <GuideVideo videoId={pillar.video.id} title={pillar.video.title} channel={pillar.video.channel} language={pillar.video.language} url={`https://youtu.be/${pillar.video.id}`} />
      </section> : null}
      <section className={styles.section}>
        <h2>Preguntas frecuentes sobre {pillar.name}</h2>
        <div className="seo-pillar-faq">{pillar.faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>
      <section className={styles.section}>
        <h2>{isTrial ? 'Antes del lanzamiento' : 'Seguir trabajando tu partida'}</h2>
        {pillar.conclusion && <p>{pillar.conclusion}</p>}
        <ul className={styles.related}>{pillar.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
      </section>
    </main>
  </>
}
