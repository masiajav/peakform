import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizeRole, normalizeTopic, parseTags, toSlug } from '@/lib/content'
import { NextResponse } from 'next/server'

async function assertAdmin() {
  const supabase = createClient()
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
    'category',
    'published',
    'excerpt',
    'seo_title',
    'seo_description',
    'author',
    'cover_image',
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
  if ('content_type' in body) allowed.content_type = body.content_type === 'patch_note' ? 'patch_note' : 'guide'

  return allowed
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json()
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('guides')
    .update(updatePayload(body))
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe una guia con ese slug' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const admin = createAdminClient()
  const { error } = await admin
    .from('guides')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
