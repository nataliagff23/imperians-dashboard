'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
} from 'lucide-react'
import { getIcon } from '@/lib/icons'
import { CategoryForm } from '@/components/admin/category-form'
import { LinkForm } from '@/components/admin/link-form'
import type { Category, Link as LinkType } from '@/lib/types'

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Modal states
  const [catFormOpen, setCatFormOpen] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [linkFormOpen, setLinkFormOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkType | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'category' | 'link'; id: string; name: string } | null>(null)

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    if (Array.isArray(data)) {
      setCategories(data)
      // Auto-select first category if none selected
      if (!selectedCatId && data.length > 0) {
        setSelectedCatId(data[0].id)
      }
    }
    setLoading(false)
  }, [selectedCatId])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  const selectedCategory = categories.find(c => c.id === selectedCatId)
  const selectedLinks = selectedCategory?.links ?? []

  async function handleDelete() {
    if (!deleteConfirm) return
    const { type, id } = deleteConfirm
    const url = type === 'category' ? `/api/categories/${id}` : `/api/links/${id}`
    await fetch(url, { method: 'DELETE' })

    if (type === 'category' && selectedCatId === id) {
      setSelectedCatId(null)
    }
    setDeleteConfirm(null)
    fetchCategories()
  }

  function openEditCategory(cat: Category) {
    setEditingCat(cat)
    setCatFormOpen(true)
  }

  function openNewCategory() {
    setEditingCat(null)
    setCatFormOpen(true)
  }

  function openEditLink(link: LinkType) {
    setEditingLink(link)
    setLinkFormOpen(true)
  }

  function openNewLink() {
    setEditingLink(null)
    setLinkFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <Image src="/logo.png" alt="Imperians" width={28} height={28} className="rounded" />
            <span className="text-sm font-medium text-text-primary">Panel Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex gap-6">
            <div className="w-80 bg-surface rounded-xl h-96 animate-pulse" />
            <div className="flex-1 bg-surface rounded-xl h-96 animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories Panel */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-surface rounded-xl border border-border-subtle">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <h2 className="font-semibold text-text-primary">Categorías</h2>
                  <button
                    onClick={openNewCategory}
                    className="flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold-light transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nueva
                  </button>
                </div>
                <div className="p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {categories.length === 0 ? (
                    <p className="text-sm text-text-muted px-3 py-4 text-center">
                      No hay categorías. Crea la primera.
                    </p>
                  ) : (
                    categories.map(cat => {
                      const CatIcon = getIcon(cat.icon)
                      const isSelected = cat.id === selectedCatId
                      return (
                        <div
                          key={cat.id}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                            isSelected ? 'bg-navy-lighter' : 'hover:bg-navy-light'
                          }`}
                          onClick={() => setSelectedCatId(cat.id)}
                        >
                          <div
                            className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: cat.color + '20' }}
                          >
                            <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-text-primary truncate">{cat.name}</p>
                            <p className="text-xs text-text-muted">
                              {cat.links?.length ?? 0} links
                            </p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditCategory(cat) }}
                              className="p-1 text-text-muted hover:text-gold transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ type: 'category', id: cat.id, name: cat.name }) }}
                              className="p-1 text-text-muted hover:text-danger transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Links Panel */}
            <div className="flex-1">
              <div className="bg-surface rounded-xl border border-border-subtle">
                <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                  <h2 className="font-semibold text-text-primary">
                    {selectedCategory ? `Links — ${selectedCategory.name}` : 'Selecciona una categoría'}
                  </h2>
                  {selectedCategory && (
                    <button
                      onClick={openNewLink}
                      className="flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold-light transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Nuevo Link
                    </button>
                  )}
                </div>
                <div className="p-2 min-h-[200px]">
                  {!selectedCategory ? (
                    <p className="text-sm text-text-muted px-3 py-8 text-center">
                      Selecciona una categoría de la izquierda para ver sus links
                    </p>
                  ) : selectedLinks.length === 0 ? (
                    <p className="text-sm text-text-muted px-3 py-8 text-center">
                      Esta categoría no tiene links aún. Agrega el primero.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {selectedLinks.map(link => {
                        const LinkIcon = getIcon(link.icon)
                        return (
                          <div
                            key={link.id}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-navy-light transition-colors group"
                          >
                            <LinkIcon className="w-4 h-4 text-text-muted flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {link.title}
                              </p>
                              {link.description && (
                                <p className="text-xs text-text-muted truncate">{link.description}</p>
                              )}
                              <p className="text-xs text-text-muted/60 truncate">{link.url}</p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-text-muted hover:text-gold transition-colors"
                                onClick={e => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => openEditLink(link)}
                                className="p-1 text-text-muted hover:text-gold transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'link', id: link.id, name: link.title })}
                                className="p-1 text-text-muted hover:text-danger transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Category Form Modal */}
      {catFormOpen && (
        <CategoryForm
          open={catFormOpen}
          onClose={() => { setCatFormOpen(false); setEditingCat(null) }}
          onSave={fetchCategories}
          category={editingCat}
        />
      )}

      {/* Link Form Modal */}
      {linkFormOpen && (
        <LinkForm
          open={linkFormOpen}
          onClose={() => { setLinkFormOpen(false); setEditingLink(null) }}
          onSave={fetchCategories}
          link={editingLink}
          categories={categories}
          defaultCategoryId={selectedCatId ?? undefined}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-surface border border-border-subtle rounded-xl p-6 max-w-sm mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-semibold text-text-primary mb-2">Confirmar eliminación</h3>
            <p className="text-sm text-text-secondary mb-1">
              ¿Estás seguro de eliminar <strong>{deleteConfirm.name}</strong>?
            </p>
            {deleteConfirm.type === 'category' && (
              <p className="text-xs text-danger mb-4">
                Esto también eliminará todos los links dentro de esta categoría.
              </p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium bg-danger text-white rounded-lg hover:bg-danger-hover transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
