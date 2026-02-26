'use client'

import { useState } from 'react'
import { Modal } from './modal'
import { iconOptions, getIcon } from '@/lib/icons'
import type { Category } from '@/lib/types'

const colorPresets = [
  '#c9a84c', '#4a90d9', '#e07c3e', '#6c5ce7', '#00b894',
  '#e84393', '#fdcb6e', '#0984e3', '#d63031', '#636e72',
]

interface CategoryFormProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  category?: Category | null
}

export function CategoryForm({ open, onClose, onSave, category }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [icon, setIcon] = useState(category?.icon ?? 'folder')
  const [color, setColor] = useState(category?.color ?? '#c9a84c')
  const [saving, setSaving] = useState(false)

  const isEdit = !!category

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    const url = isEdit ? `/api/categories/${category.id}` : '/api/categories'
    const method = isEdit ? 'PUT' : 'POST'

    const maxOrder = isEdit ? category.sort_order : 999

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), icon, color, sort_order: maxOrder }),
    })

    setSaving(false)
    onSave()
    onClose()
  }

  const SelectedIcon = getIcon(icon)

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar Categoría' : 'Nueva Categoría'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ej: Calculadoras"
            required
            className="w-full px-3 py-2 bg-navy border border-border-subtle rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
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

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">Color</label>
          <div className="flex gap-2 flex-wrap">
            {colorPresets.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: c,
                  borderColor: color === c ? '#fff' : 'transparent',
                }}
              />
            ))}
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
            disabled={saving || !name.trim()}
            className="px-4 py-2 text-sm font-medium bg-gold text-navy rounded-lg hover:bg-gold-light disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
