import Link from 'next/link'
import Image from 'next/image'
import PublicNav from '@/components/layout/PublicNav'
import JsonLd from './JsonLd'
import DeadlockAbilityKit from './DeadlockAbilityKit'
import DeadlockBuildImport from './DeadlockBuildImport'
import DeadlockMapAtlas from './DeadlockMapAtlas'
import { GAMES, gamePath } from '@/lib/games'
import { SECTION_KIND, editorialVersion, type EditorialArticle } from '@/lib/editorial-record'
import { publishedEditorial } from '@/lib/editorial-store'
import { DEADLOCK_MEDIA_VERSION, deadlockAbilityForHeading, deadlockAbilityHeadingTitle, getDeadlockCellMedia, getDeadlockHeroMedia } from '@/lib/deadlock-media'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import { deadlockBreadcrumbs, deadlockHeroLabel } from '@/lib/deadlock-seo'

const sectionLabels: Record<string, string> = { heroes: 'Héroes', counters: 'Counters', builds: 'Builds', guides: 'Guías', news: 'Noticias', 'patch-notes': 'Parches', maps: 'Mapas', 'team-comps': 'Composiciones' }

function TableCellContent({ text, game, publishedPaths }: { text: string; game: EditorialArticle['game']; publishedPaths: ReadonlySet<string> | null }) {
  const media = game === 'deadlock' ? getDeadlockCellMedia(text) : undefined
  if (!media) return <>{text}</>
  const content = <><Image src={media.icon} alt="" width={40} height={40} unoptimized /><span>{text}</span></>
  const href = media.type === 'hero' ? gamePath('deadlock', 'heroes', media.slug) : null
  return href && publishedPaths?.has(href)
    ? <Link className="deadlock-cell-media deadlock-cell-hero deadlock-cell-link" href={href}>{content}</Link>
    : <span className={`deadlock-cell-media deadlock-cell-${media.type}`}>{content}</span>
}

export default async function GameEditorialArticle({ article: a, preview = false }: { article: EditorialArticle; preview?: boolean }) {
  const section = Object.keys(SECTION_KIND).find(section => SECTION_KIND[section] === a.kind)!
  const publishedPaths = a.game === 'deadlock' ? new Set((await publishedEditorial('deadlock')).map(article => article.path)) : null
  const heroSections = a.game === 'deadlock' ? ['heroes', 'counters', 'builds'] : ['heroes', 'counters', 'team-comps']
  const links = a.hero ? heroSections.filter(item => item !== section && (!publishedPaths || publishedPaths.has(gamePath(a.game, item, a.hero)))) : []
  const related = a.related?.filter(link => !publishedPaths || publishedPaths.has(link.href))
  const heroLinks = links.length > 0 && <nav className={`game-related${a.game === 'deadlock' ? ' game-hero-resources' : ''}`} aria-label="Sigue aprendiendo">{links.map(section => <Link key={section} href={gamePath(a.game, section, a.hero)}>{a.game === 'deadlock' ? `${section === 'heroes' ? 'Guía de' : section === 'counters' ? 'Counters de' : 'Build de'} ${deadlockHeroLabel(a.hero)}` : section === 'heroes' ? 'Guía del héroe' : section === 'counters' ? 'Cómo responder a este héroe' : section === 'team-comps' ? 'Composiciones y sinergias' : 'Build y compras'}</Link>)}</nav>
  const fallbackHero = a.game === 'deadlock' ? getDeadlockHeroMedia(a.hero) : undefined
  const hero = fallbackHero ? { ...fallbackHero, abilities: a.abilities ?? fallbackHero.abilities } : undefined
  const illustrated = a.kind === 'hero' && Boolean(hero)
  const showReferences = !(a.game === 'deadlock' && a.kind === 'build')
  const contents = <nav aria-label="En este artículo" className="game-toc">{a.sections.map((section, i) => <a key={i} href={`#apartado-${i}`}>{section.title}</a>)}</nav>
  const title = <>
    <p className="eyebrow">{GAMES[a.game].name} · {sectionLabels[section]}</p>
    <h1>{a.title}</h1><p className="game-lead">{a.description}</p>
    <p className="game-meta">Actualizado el {new Date(a.updatedAt).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' })} · {a.patch}</p>
  </>

  return <div className={`game-page game-${a.game}`}><PublicNav />
    {!preview && a.game === 'deadlock' && <JsonLd data={deadlockBreadcrumbs([{ name: SITE_NAME, path: '/' }, { name: 'Deadlock', path: '/deadlock' }, { name: sectionLabels[section], path: gamePath(a.game, section) }, { name: a.title, path: a.path }])} />}
    {!preview && <JsonLd data={{ '@context': 'https://schema.org', '@type': a.kind === 'news' ? 'NewsArticle' : 'Article', headline: a.title, description: a.description, url: absoluteUrl(a.path), mainEntityOfPage: absoluteUrl(a.path), ...(a.image ? { image: [absoluteUrl(a.image)] } : {}), datePublished: a.publishedAt, dateModified: a.updatedAt, inLanguage: 'es', author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME }, ...(showReferences ? { citation: a.sources.map(source => source.url) } : {}) }} />}
    <main className={`game-article${illustrated ? ' game-article-illustrated' : ''}${a.mapAtlas ? ' game-article-atlas' : ''}`} data-editorial-version={editorialVersion(a)} data-media-version={a.game === 'deadlock' ? DEADLOCK_MEDIA_VERSION : undefined}>
      <nav className="game-breadcrumb" aria-label="Ruta de navegación"><Link href="/">Replaid Lab</Link><span>/</span><Link href={GAMES[a.game].href}>{GAMES[a.game].name}</Link><span>/</span><Link href={gamePath(a.game, section)}>{sectionLabels[section]}</Link></nav>
      {preview && <p role="status">Vista previa de revisión · aún no publicada</p>}
      {illustrated && hero ? <header className="deadlock-hero-header">
        <div>{title}<ul className="deadlock-hero-tips">{a.checklist.map(tip => <li key={tip}>{tip}</li>)}</ul></div>
        <figure className="deadlock-hero-portrait"><Image src={hero.portrait} alt={hero.name} fill sizes="(max-width: 700px) 280px, 340px" priority /><figcaption>{hero.name}{hero.aliases.filter(alias => alias !== hero.name).length > 0 && <small>{hero.aliases.filter(alias => alias !== hero.name).join(' · ')}</small>}</figcaption></figure>
      </header> : <>{title}{a.image && !a.mapAtlas && <Image className="game-article-image" src={a.image} alt={a.aliases?.[0] ?? a.title} width={200} height={260} />}</>}

      <div className="game-article-reading">
        <p className="game-article-intro">{a.intro}</p>
        {a.game === 'deadlock' && heroLinks}
        {a.mapAtlas && <DeadlockMapAtlas atlas={a.mapAtlas} />}
        {a.game === 'deadlock' && a.kind === 'build' && a.buildImport && <DeadlockBuildImport build={a.buildImport} heroName={hero?.name ?? a.aliases?.[0] ?? a.hero ?? a.slug} />}
        {illustrated && hero && <DeadlockAbilityKit hero={hero} sections={a.sections} />}
        {a.mapAtlas ? <details className="game-map-toc"><summary>Índice de la guía · {a.sections.length} apartados</summary>{contents}</details> : contents}
        {a.sections.map((section, i) => {
          const ability = illustrated ? deadlockAbilityForHeading(hero, section.title) : undefined
          return <section id={`apartado-${i}`} key={i}>
            <h2 className={ability ? 'deadlock-ability-heading' : undefined}>{ability && <Image src={ability.icon} alt="" width={52} height={52} unoptimized />}<span>{deadlockAbilityHeadingTitle(ability, section.title)}</span></h2>
            {section.image && <figure className="deadlock-map-figure"><Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 840px) 100vw, 840px" />{section.image.caption && <figcaption>{section.image.caption}</figcaption>}</figure>}
            {section.body.map((paragraph, j) => <p key={j}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}</ul>}
            {section.table && <div className="game-table-scroll" role="region" aria-label={section.title} tabIndex={0}><table className="game-data-table" role="table">
              <thead><tr>{section.table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
              <tbody>{section.table.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => k === 0
                ? <th scope="row" key={k} data-label={section.table!.columns[k]}><TableCellContent text={cell} game={a.game} publishedPaths={publishedPaths} /></th>
                : <td key={k} data-label={section.table!.columns[k]}><TableCellContent text={cell} game={a.game} publishedPaths={publishedPaths} /></td>)}</tr>)}</tbody>
            </table></div>}
          </section>
        })}
        {a.faq && a.faq.length > 0 && <section><h2>Preguntas frecuentes</h2>{a.faq.map(faq => <details className="game-faq" key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
        {!illustrated && <section className="game-checklist"><h2>Antes de tu próxima partida</h2><ul>{a.checklist.map((tip, i) => <li key={i}>{tip}</li>)}</ul></section>}
        {a.game !== 'deadlock' && heroLinks}
        {related && related.length > 0 && <nav className="game-related" aria-label="Guías relacionadas">{related.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>}
        {showReferences && <details className="game-sources"><summary>Referencias</summary><ul>{a.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ul></details>}
      </div>
    </main>
  </div>
}
