import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizeRole, normalizeTopic, parseTags, toSlug } from '@/lib/content'
import { NextResponse } from 'next/server'
import { patchNotePublicationIssues } from '@/lib/indexing-policy'
import { editorialInputIssues, prepareEditorialPublication } from '@/lib/editorial-publication'

async function assertAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

function contentPayload(body: any) {
  return {
    title: body.title.trim(),
    slug: toSlug(body.slug || body.title),
    body: body.body.trim(),
    published: body.published ?? false,
    excerpt: body.excerpt?.trim() || null,
    seo_title: body.seo_title?.trim() || null,
    seo_description: body.seo_description?.trim() || null,
    author: body.author?.trim() || null,
    hero: normalizeTopic(body.hero),
    role: normalizeRole(body.role),
    map: normalizeTopic(body.map),
    tags: parseTags(body.tags),
    cover_image: body.cover_image?.trim() || null,
    content_type: body.content_type === 'patch_note' ? 'patch_note' : 'news',
    ...(body.source_url?.trim() ? { source_url: body.source_url.trim() } : {}),
    ...(body.source_published_at?.trim() ? { source_published_at: body.source_published_at.trim() } : {}),
    sponsor_label: body.sponsor_label?.trim() || null,
    sponsor_title: body.sponsor_title?.trim() || null,
    sponsor_body: body.sponsor_body?.trim() || null,
    sponsor_url: body.sponsor_url?.trim() || null,
    sponsor_cta: body.sponsor_cta?.trim() || null,
  }
}

export async function GET() {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json()
  const inputIssues = editorialInputIssues(body)
  if (inputIssues.length) return NextResponse.json({ error: inputIssues.join('. ') }, { status: 400 })
  if (typeof body.title !== 'string' || !body.title.trim() || typeof body.body !== 'string' || !body.body.trim()) {
    return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 })
  }
  if ('published' in body && typeof body.published !== 'boolean') {
    return NextResponse.json({ error: 'El estado de publicación debe ser verdadero o falso' }, { status: 400 })
  }
  for (const field of ['source_url', 'source_published_at']) {
    if (body[field] != null && typeof body[field] !== 'string') {
      return NextResponse.json({ error: 'El enlace y la fecha oficiales deben ser texto' }, { status: 400 })
    }
  }

  const payload = contentPayload(body)
  const now = new Date().toISOString()
  const review = prepareEditorialPublication('announcement', null, { ...payload, created_at: now, updated_at: now }, body.editorial_review, user.id, payload.published)
  payload.tags = review.tags
  if (review.issues.length) return NextResponse.json({ error: 'La entrada todavía no está lista para publicarse', issues: review.issues }, { status: 422 })
  const issues = payload.published ? patchNotePublicationIssues(payload) : []
  if (issues.length) {
    return NextResponse.json({ error: 'La patch note todavía no está lista para publicarse', issues }, { status: 422 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .insert(payload)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe una noticia con ese slug' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
