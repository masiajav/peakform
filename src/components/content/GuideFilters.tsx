'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

type Option = {
  value: string
  label: string
}

export default function GuideFilters({
  initial,
  roles,
  heroes,
  categories,
}: {
  initial: {
    q?: string
    sort?: string
    role?: string
    hero?: string
    category?: string
  }
  roles: Option[]
  heroes: Option[]
  categories: Option[]
}) {
  const router = useRouter()
  const hasFilters = Boolean(
    initial.q ||
      (initial.sort && initial.sort !== 'latest') ||
      (initial.role && initial.role !== 'all') ||
      (initial.hero && initial.hero !== 'all') ||
      (initial.category && initial.category !== 'all'),
  )

  function submitForm(form: HTMLFormElement) {
    const formData = new FormData(form)
    const params = new URLSearchParams()
    const query = String(formData.get('q') || '').trim()

    if (query) {
      params.set('q', query)
    }

    addParamIfUseful(params, formData, 'role', 'all')
    addParamIfUseful(params, formData, 'hero', 'all')
    addParamIfUseful(params, formData, 'category', 'all')
    addParamIfUseful(params, formData, 'sort', 'latest')

    const nextQuery = params.toString()
    router.push(nextQuery ? `/guides?${nextQuery}` : '/guides')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitForm(event.currentTarget)
  }

  return (
    <form action="/guides" className="guide-filter-panel" onSubmit={handleSubmit}>
      <div className="guide-filter-search">
        <input
          name="q"
          defaultValue={initial.q || ''}
          placeholder="Buscar por concepto, héroe o problema..."
          aria-label="Buscar guías"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          BUSCAR
        </button>
      </div>

      <div className="guide-filter-grid">
        <FilterSelect name="role" label="Rol" value={initial.role || 'all'} options={roles} onFormChange={submitForm} />
        <FilterSelect name="hero" label="Héroe" value={initial.hero || 'all'} options={heroes} onFormChange={submitForm} />
        <FilterSelect name="category" label="Categoría" value={initial.category || 'all'} options={categories} onFormChange={submitForm} />
        <FilterSelect
          name="sort"
          label="Orden"
          value={initial.sort || 'latest'}
          options={[
            { value: 'latest', label: 'Recientes' },
            { value: 'oldest', label: 'Antiguas' },
            { value: 'title', label: 'Título A-Z' },
            { value: 'read', label: 'Lectura corta' },
          ]}
          onFormChange={submitForm}
        />
      </div>

      <div className="guide-filter-footer">
        <span>Filtra sin salir de la hemeroteca</span>
        {hasFilters && (
          <Link href="/guides" className="guide-filter-clear">
            Limpiar filtros
          </Link>
        )}
      </div>
    </form>
  )
}

function addParamIfUseful(params: URLSearchParams, formData: FormData, key: string, defaultValue: string) {
  const value = String(formData.get(key) || '')

  if (value && value !== defaultValue) {
    params.set(key, value)
  }
}

function FilterSelect({
  name,
  label,
  value,
  options,
  onFormChange,
}: {
  name: string
  label: string
  value: string
  options: Option[]
  onFormChange: (form: HTMLFormElement) => void
}) {
  return (
    <label className="guide-filter-field">
      <span>{label}</span>
      <select
        aria-label={label}
        name={name}
        defaultValue={value}
        onChange={event => {
          const form = event.currentTarget.form

          if (form) {
            onFormChange(form)
          }
        }}
      >
        <option value="all">Todos</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
