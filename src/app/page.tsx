import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'admin')  redirect('/admin')
    if (profile?.role === 'expert') redirect('/expert')
    redirect('/dashboard')
  }

  // No autenticado → landing (por ahora redirige a login, en Fase 4 será la landing real)
  redirect('/login')
}
