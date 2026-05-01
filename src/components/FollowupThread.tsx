'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

type Message = {
  id: string
  sender_id: string
  message: string
  created_at: string
}

type Props = {
  orderId: string
  currentUserId: string
  otherPartyLabel: string
  initialMessages: Message[]
}

export default function FollowupThread({ orderId, currentUserId, otherPartyLabel, initialMessages }: Props) {
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const channel = supabase
      .channel(`followup-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'followup_messages', filter: `order_id=eq.${orderId}` },
        (payload) => {
          const incoming = payload.new as Message
          setMessages(prev => prev.some(m => m.id === incoming.id) ? prev : [...prev, incoming])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [orderId])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setSending(true)
    setError(null)
    const { error: err } = await supabase
      .from('followup_messages')
      .insert({ order_id: orderId, sender_id: currentUserId, message: trimmed })
    if (err) {
      setError('No se pudo enviar el mensaje')
    } else {
      setText('')
    }
    setSending(false)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', marginTop: 24 }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif',
      }}>
        PREGUNTAS DE SEGUIMIENTO
      </div>

      {/* Thread */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80, maxHeight: 420, overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--text3)', margin: 0 }}>
            Sin mensajes aún. Puedes hacer preguntas sobre tu análisis.
          </p>
        ) : (
          messages.map(msg => {
            const isOwn = msg.sender_id === currentUserId
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>
                  {isOwn ? 'Tú' : otherPartyLabel}
                  {' · '}
                  {new Date(msg.created_at).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: isOwn ? '#0a0a0a' : 'var(--text)',
                  background: isOwn ? 'var(--accent)' : 'var(--surface2)',
                  border: isOwn ? 'none' : '1px solid var(--border2)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.message}
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ borderTop: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 10 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe una pregunta..."
          style={{ flex: 1, height: 38 }}
          disabled={sending}
        />
        <button type="submit" disabled={sending || !text.trim()} className="btn btn-primary" style={{ height: 38, padding: '0 18px', fontSize: 13 }}>
          {sending ? '...' : 'ENVIAR'}
        </button>
      </form>

      {error && (
        <div style={{ padding: '8px 20px 12px', fontSize: 12, color: 'var(--danger)' }}>{error}</div>
      )}
    </div>
  )
}
