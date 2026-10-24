import { notFound } from 'next/navigation'
import { cache } from 'react'
import { SECTION_KIND } from '@/lib/editorial-record'
import { editorialForPath } from '@/lib/editorial-store'
import { deadlockArticleMetadata } from '@/lib/deadlock-seo'
import GameEditorialArticle from '@/components/content/GameEditorialArticle'
export const dynamic = 'force-dynamic'
const load = cache(async (section:string,slug:string) => SECTION_KIND[section] ? editorialForPath('deadlock', `/deadlock/${section}/${slug}`) : null)
export async function generateMetadata({params}:{params:Promise<{section:string;slug:string}>}) { const p=await params;const a=await load(p.section,p.slug);return a ? deadlockArticleMetadata(a) : {} }
export default async function Page({params}:{params:Promise<{section:string;slug:string}>}) {const p=await params;const a=await load(p.section,p.slug);if(!a)notFound();return <GameEditorialArticle article={a}/>}
