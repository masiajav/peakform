import Image from 'next/image'
import Link from 'next/link'
import type { EditorialArticle } from '@/lib/editorial-record'
import { deadlockHeroLabel } from '@/lib/deadlock-seo'

export default function DeadlockHeroCard({ article, headingLevel = 2 }: { article: EditorialArticle; headingLevel?: 2 | 3 }) {
  const name = deadlockHeroLabel(article.hero) || article.title
  const english = article.aliases?.find(alias => alias.toLocaleLowerCase('es') !== name.toLocaleLowerCase('es'))
  const Heading = headingLevel === 3 ? 'h3' : 'h2'
  return <Link className="game-content-card dl-roster-card" href={article.path}>
    {article.image && <div className="game-card-portrait"><Image src={article.image} alt="" fill sizes="(max-width: 480px) 44vw, (max-width: 900px) 28vw, 220px" /></div>}
    <div className="dl-roster-copy"><Heading>{name}</Heading>{english && <span className="dl-hero-alias">{english}</span>}<span className="game-card-action">Ver guía <span aria-hidden="true">↗</span></span></div>
  </Link>
}
