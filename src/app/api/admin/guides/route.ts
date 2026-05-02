import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

async function assertAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

export async function GET() {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('guides')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { title, slug, body, category, published } = await request.json()
  if (!title?.trim() || !slug?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Título, slug y contenido son obligatorios' }, { status: 400 })
  }

  const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('guides')
    .insert({
      title: title.trim(),
      slug: cleanSlug,
      body: body.trim(),
      category: category?.trim() || null,
      published: published ?? false,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe una guía con ese slug' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}
