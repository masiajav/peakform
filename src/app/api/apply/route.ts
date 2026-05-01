import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    return NextResponse.json({ error: 'Los admins no pueden solicitar ser expertos' }, { status: 400 })
  }

  // Check if already applied
  const { data: existing } = await supabase
    .from('experts')
    .select('id, status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing?.status === 'active') {
    return NextResponse.json({ error: 'Ya eres un experto activo' }, { status: 400 })
  }
  if (existing?.status === 'pending') {
    return NextResponse.json({ error: 'Ya tienes una solicitud pendiente' }, { status: 400 })
  }

  const body = await request.json()
  const {
    display_name,
    battletag,
    peak_rank,
    main_role,
    bio,
    specialties,
    pro_experience,
    price_starter,
    price_pro,
    price_deep_dive,
  } = body

  if (!display_name?.trim() || !battletag?.trim() || !peak_rank || !main_role) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  const { error } = await supabase
    .from('experts')
    .insert({
      user_id:         user.id,
      status:          'pending',
      display_name:    display_name.trim(),
      battletag:       battletag.trim(),
      peak_rank,
      peak_sr:         0,
      main_role,
      bio:             bio || null,
      specialties:     specialties || [],
      pro_experience:  pro_experience || null,
      price_starter:   price_starter || 900,
      price_pro:       price_pro || 1700,
      price_deep_dive: price_deep_dive || 3000,
    })

  if (error) {
    console.error('[apply] insert expert failed:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
