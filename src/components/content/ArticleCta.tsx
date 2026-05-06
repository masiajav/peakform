import Link from 'next/link'
import { ROLE_LABELS, type ContentRole } from '@/lib/content'

export default function ArticleCta({
  role,
  hero,
}: {
  role?: ContentRole | null
  hero?: string | null
}) {
  const copy = role
    ? `¿Quieres que un experto de ${ROLE_LABELS[role]} revise tus errores y te diga qué corregir en tu próxima partida?`
    : hero
      ? `¿Quieres que un experto revise tus errores con ${hero} y los convierta en un plan de mejora?`
      : '¿Quieres que un experto revise tu replay y te diga qué corregir primero?'

  return (
    <div style={{
      marginTop: 48,
      paddingTop: 28,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 18,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}>
      <div>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', color: 'var(--text)', fontSize: 22, letterSpacing: 1, marginBottom: 6 }}>
          LLEVA ESTO A TU VOD
        </div>
        <p style={{ fontSize: 14, color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>
          {copy}
        </p>
      </div>
      <Link href={role ? `/experts?role=${role}` : '/experts'} className="btn btn-primary">
        VER EXPERTOS
      </Link>
    </div>
  )
}
