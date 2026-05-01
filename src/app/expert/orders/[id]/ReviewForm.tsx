'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TimestampEntry {
  time:  string
  label: string
  type:  'error' | 'positive' | 'note'
}

interface Props {
  orderId: string
  tier:    string
}

export default function ReviewForm({ orderId, tier }: Props) {
  const router = useRouter()

  const [summary,       setSummary]       = useState('')
  const [errors,        setErrors]        = useState('')
  const [positives,     setPositives]     = useState('')
  const [actionPlan,    setActionPlan]    = useState('')
  const [crossAnalysis, setCrossAnalysis] = useState('')
  const [roadmap,       setRoadmap]       = useState('')
  const [timestamps,    setTimestamps]    = useState<TimestampEntry[]>([])

  const [submitLoading, setSubmitLoading] = useState(false)
  const [error,         setError]         = useState<string | null>(null)

  const showTimestamps = tier === 'pro' || tier === 'deep_dive'
  const showDeepDive   = tier === 'deep_dive'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!summary.trim() || !errors.trim() || !positives.trim() || !actionPlan.trim()) {
      setError('Completa todos los campos requeridos antes de entregar')
      return
    }
    setSubmitLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/expert/deliver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          summary,
          errors,
          positives,
          action_plan: actionPlan,
          timestamps:  showTimestamps ? timestamps : [],
          cross_analysis: showDeepDive ? crossAnalysis || null : undefined,
          roadmap:     showDeepDive ? roadmap || null : undefined,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Error al entregar la review')
      }
      router.push('/expert/dashboard?delivered=1')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  function addTimestamp() {
    setTimestamps(prev => [...prev, { time: '', label: '', type: 'error' }])
  }

  function updateTimestamp(i: number, field: keyof TimestampEntry, value: string) {
    setTimestamps(prev => prev.map((t, idx) => idx === i ? { ...t, [field]: value } : t))
  }

  function removeTimestamp(i: number) {
    setTimestamps(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <form onSubmit={handleSubmit}>

      <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif', marginBottom: 24 }}>
        ESCRIBIR REVIEW
      </div>

      {error && (
        <div style={{
          background: 'rgba(255,68,68,0.06)', border: '1px solid rgba(255,68,68,0.2)',
          padding: '12px 16px', marginBottom: 20, fontSize: 13, color: 'var(--danger)',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        <Field label="RESUMEN EJECUTIVO *" hint="2-3 frases que capturen el nivel del jugador y los principales puntos">
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            rows={4}
            placeholder="Ej: Tu posicionamiento como Support muestra buena lectura del mapa, pero..."
            required
          />
        </Field>

        <Field label="ERRORES IDENTIFICADOS *" hint="Lista los errores más impactantes con contexto específico del replay">
          <textarea
            value={errors}
            onChange={e => setErrors(e.target.value)}
            rows={7}
            placeholder={'• Error 1: descripción detallada\n• Error 2: descripción detallada'}
            required
          />
        </Field>

        <Field label="PUNTOS FUERTES *" hint="Lo que el jugador hace bien — importante para motivar y reforzar hábitos">
          <textarea
            value={positives}
            onChange={e => setPositives(e.target.value)}
            rows={5}
            placeholder={'• Punto fuerte 1\n• Punto fuerte 2'}
            required
          />
        </Field>

        <Field label="PLAN DE ACCIÓN *" hint="Pasos concretos y ejercicios específicos para mejorar">
          <textarea
            value={actionPlan}
            onChange={e => setActionPlan(e.target.value)}
            rows={6}
            placeholder={'1. Ejercicio específico\n2. Recurso o drill recomendado\n3. Meta para la próxima semana'}
            required
          />
        </Field>

        {/* Timestamps — Pro y Deep Dive */}
        {showTimestamps && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
                  TIMESTAMPS DE VÍDEO
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
                  Opcional — marca momentos clave del replay
                </div>
              </div>
              <button type="button" onClick={addTimestamp} className="btn btn-secondary btn-sm">
                + AÑADIR
              </button>
            </div>
            {timestamps.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {timestamps.map((ts, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      value={ts.time}
                      onChange={e => updateTimestamp(i, 'time', e.target.value)}
                      placeholder="0:00"
                      style={{ width: 72, flex: 'none' }}
                    />
                    <input
                      value={ts.label}
                      onChange={e => updateTimestamp(i, 'label', e.target.value)}
                      placeholder="Descripción del momento"
                      style={{ flex: 1 }}
                    />
                    <select
                      value={ts.type}
                      onChange={e => updateTimestamp(i, 'type', e.target.value as TimestampEntry['type'])}
                      style={{ width: 110, flex: 'none' }}
                    >
                      <option value="error">Error</option>
                      <option value="positive">Positivo</option>
                      <option value="note">Nota</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTimestamp(i)}
                      style={{
                        background: 'none', border: 'none',
                        color: 'var(--text3)', cursor: 'pointer',
                        fontSize: 20, padding: '0 4px', lineHeight: 1,
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Deep Dive extras */}
        {showDeepDive && (
          <>
            <Field label="ANÁLISIS CRUZADO" hint="Patrones que emergen al comparar los 3 replays — opcional">
              <textarea
                value={crossAnalysis}
                onChange={e => setCrossAnalysis(e.target.value)}
                rows={5}
                placeholder="Describe los patrones comunes observados en los 3 replays..."
              />
            </Field>
            <Field label="HOJA DE RUTA" hint="Plan de mejora a 2 semanas con hitos concretos — opcional">
              <textarea
                value={roadmap}
                onChange={e => setRoadmap(e.target.value)}
                rows={5}
                placeholder={'Semana 1: ...\nSemana 2: ...'}
              />
            </Field>
          </>
        )}

      </div>

      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button
          type="submit"
          disabled={submitLoading}
          className="btn btn-primary btn-lg"
        >
          {submitLoading ? 'ENTREGANDO...' : 'ENTREGAR REVIEW →'}
        </button>
      </div>

    </form>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: 'var(--text2)', fontFamily: 'Bebas Neue, sans-serif' }}>
          {label}
        </div>
        {hint && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{hint}</div>
        )}
      </div>
      {children}
    </div>
  )
}
