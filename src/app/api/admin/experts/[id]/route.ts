import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 })
  }

  const { action } = await request.json()
  if (!['approve', 'suspend', 'pending'].includes(action)) {
    return NextResponse.json({ error: 'Acción inválida' }, { status: 400 })
  }

  const admin = createAdminClient()

  const { data: expert, error: fetchError } = await admin
    .from('experts')
    .select('id, user_id')
    .eq('id', params.id)
    .single()

  if (fetchError || !expert) {
    return NextResponse.json({ error: 'Experto no encontrado' }, { status: 404 })
  }

  const newStatus = action === 'approve' ? 'active' : action === 'suspend' ? 'suspended' : 'pending'

  const { error: expertError } = await admin
    .from('experts')
    .update({ status: newStatus })
    .eq('id', params.id)

  if (expertError) {
    console.error('[admin/experts] update status failed:', expertError)
    return NextResponse.json({ error: expertError.message }, { status: 500 })
  }

  // Sync profiles.role when activating or deactivating expert
  const newRole = newStatus === 'active' ? 'expert' : 'user'
  const { error: profileError } = await admin
    .from('profiles')
    .update({ role: newRole })
    .eq('id', expert.user_id)

  if (profileError) {
    console.error('[admin/experts] update profile role failed:', profileError)
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, status: newStatus })
}
