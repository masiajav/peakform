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
  if (!body.title?.trim() || !body.body?.trim()) {
    return NextResponse.json({ error: 'Titulo y contenido son obligatorios' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .insert(contentPayload(body))
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
