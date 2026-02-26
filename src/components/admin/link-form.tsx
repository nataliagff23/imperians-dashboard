'use client'

import { useState } from 'react'
import { Modal } from './modal'
import { iconOptions, getIcon } from '@/lib/icons'
import type { Link, Category } from '@/lib/types'

interface LinkFormProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  link?: Link | null
  categories: Category[]
  defaultCategoryId?: string
}

export function LinkForm({ open, onClose, onSave, link, categories, defaultCategoryId }: LinkFormProps) {
  const [title, setTitle] = useState(link?.title ?? '')
  const [url, setUrl] = useState(link?.url ?? '')
  const [description, setDescription] = useState(link?.description ?? '')
  const [categoryId, setCategoryId] = useState(link?.category_id ?? defaultCategoryId ?? '')
  const [icon, setIcon] = useState(link?.icon ?? 'external-link')
  const [saving, setSaving] = useState(false)

  const isEdit = !!link

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !url.trim() || !categoryId) return

    setSaving(true)
    const endpoint = isEdit ? `/api/links/${link.id}` : '/api/links'
    const method = isEdit ? 'PUT' : 'POST'

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
        category_id: categoryId,
        icon,
        sort_order: isEdit ? link.sort_order : 999,
      }),
    })

    setSaving(false)
    onSave()
    onClose()
  }

  const SelectedIcon = getIcon(icon)

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar Link' : 'Nuevo Link'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Título</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ej: Calculadora de Proyectos"
            required
            className="w-full px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">URL</label>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
            required
            className="w-full px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Descripción <span className="text-text-muted">(opcional)</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Breve descripción del link"
            className="w-full px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Categoría</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
            className="w-full px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Icono</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-navy border border-border-subtle flex items-center justify-center">
              <SelectedIcon className="w-5 h-5 text-gold" />
            </div>
            <select
              value={icon}
              onChange={e => setIcon(e.target.value)}
              className="flex-1 px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            >
              {iconOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || !title.trim() || !url.trim() || !categoryId}
            className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-light disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
