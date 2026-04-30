import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('no_code')}`)
  }

  const supabase = createClient()
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    console.error('[auth/callback] exchangeCodeForSession failed:', exchangeError)
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
    )
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error('[auth/callback] getUser failed:', userError)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('no_user')}`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin')  return NextResponse.redirect(`${origin}/admin`)
  if (profile?.role === 'expert') return NextResponse.redirect(`${origin}/expert`)
  return NextResponse.redirect(`${origin}${next}`)
}