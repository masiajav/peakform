import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { validPreviewSignature } from '@/lib/editorial-preview-token'
import { editorialIssues, type EditorialArticle } from '@/lib/editorial-record'
import launch from '@/lib/deadlock-launch.json'
import GameEditorialArticle from '@/components/content/GameEditorialArticle'
export const dynamic='force-dynamic'
export const metadata={title:'Vista previa editorial',robots:{index:false,follow:false}}
export default async function Page({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{expires?:string;token?:string}>}){
 const [{id},{expires='',token=''}]=await Promise.all([params,searchParams]);if(!validPreviewSignature(id,expires,token,process.env.SUPABASE_SERVICE_ROLE_KEY??''))notFound()
 let article:EditorialArticle|null=null
 if(/^seed-\d+$/.test(id))article=(launch as EditorialArticle[])[Number(id.slice(5))]??null
 else {const {data}=await createAdminClient().from('editorial_candidates').select('payload').eq('id',id).maybeSingle();article=data?.payload??null}
 if(!article||editorialIssues(article).length)notFound()
 return <GameEditorialArticle article={article} preview/>
}
