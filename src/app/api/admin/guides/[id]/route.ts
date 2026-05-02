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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await assertAdmin()
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 403 })

  const body = await request.json()
  if (body.slug) {
    body.slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('guides')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Ya existe una guía con ese slug' }, { status: 409 })
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
