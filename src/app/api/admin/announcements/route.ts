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
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const { title, body, published } = await request.json()
  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Título y contenido son obligatorios' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .insert({ title: title.trim(), body: body.trim(), published: published ?? false })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
