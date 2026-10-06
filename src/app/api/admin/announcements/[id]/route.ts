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

function updatePayload(body: any) {
  const allowed: Record<string, unknown> = {}

  for (const key of [
    'title',
    'body',
    'published',
    'excerpt',
    'seo_title',
    'seo_description',
    'author',
    'cover_image',
    'source_url',
    'source_published_at',
    'sponsor_label',
    'sponsor_title',
    'sponsor_body',
    'sponsor_url',
    'sponsor_cta',
  ]) {
    if (key in body) {
      const value = body[key]
      allowed[key] = typeof value === 'string' ? value.trim() || null : value
    }
  }

  if ('slug' in body) allowed.slug = toSlug(body.slug)
  if ('hero' in body) allowed.hero = normalizeTopic(body.hero)
  if ('role' in body) allowed.role = normalizeRole(body.role)
  if ('map' in body) allowed.map = normalizeTopic(body.map)
  if ('tags' in body) allowed.tags = parseTags(body.tags)
  if ('content_type' in body) allowed.content_type = body.content_type === 'patch_note' ? 'patch_note' : 'news'

  return allowed
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json()
  const inputIssues = editorialInputIssues(body)
  if (inputIssues.length) return NextResponse.json({ error: inputIssues.join('. ') }, { status: 400 })
  if ('published' in body && typeof body.published !== 'boolean') {
    return NextResponse.json({ error: 'El estado de publicación debe ser verdadero o falso' }, { status: 400 })
  }
  for (const field of ['source_url', 'source_published_at']) {
    if (body[field] != null && typeof body[field] !== 'string') {
      return NextResponse.json({ error: 'El enlace y la fecha oficiales deben ser texto' }, { status: 400 })
    }
  }
  const admin = createAdminClient()
  const payload = updatePayload(body)

  const { data: current, error: currentError } = await admin
    .from('announcements')
    .select('*')
    .eq('id', params.id)
    .single()

  if (currentError || !current) {
    return NextResponse.json({ error: 'No se ha podido revisar la entrada antes de guardarla' }, { status: currentError && currentError.code !== 'PGRST116' ? 500 : 404 })
  }

  for (const field of ['source_url', 'source_published_at']) {
    if (!(field in current) && payload[field] === null) delete payload[field]
  }
  const updated = { ...current, ...payload }
  const review = prepareEditorialPublication('announcement', current, updated, body.editorial_review, user.id, body.published === true)
  payload.tags = review.tags
  if (review.issues.length) return NextResponse.json({ error: 'La entrada necesita revisión', issues: review.issues }, { status: 422 })
  if (updated.published) {
    if (current.content_type === 'patch_note' && updated.content_type !== 'patch_note') {
      return NextResponse.json({ error: 'Oculta la patch note antes de cambiar el tipo de entrada' }, { status: 422 })
    }
    const issues = patchNotePublicationIssues(updated)
    if (issues.length > 0) {
      return NextResponse.json({
        error: 'La patch note todavía no está lista para publicarse',
        issues,
      }, { status: 422 })
    }
  }

  const { data, error } = await admin
    .from('announcements')
    .update(payload)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe una noticia con ese slug' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const admin = createAdminClient()
  const { error } = await admin
    .from('announcements')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
