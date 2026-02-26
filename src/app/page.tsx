'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { SearchBar } from '@/components/dashboard/search-bar'
import { CategoryCard } from '@/components/dashboard/category-card'
import type { Category } from '@/lib/types'
import { defaultCategories } from '@/lib/default-data'

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data)
        } else {
          setCategories(defaultCategories)
        }
      })
      .catch(() => {
        setCategories(defaultCategories)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = search.trim()
    ? categories
        .map(cat => ({
          ...cat,
          links: cat.links?.filter(
            link =>
              link.title.toLowerCase().includes(search.toLowerCase()) ||
              link.description?.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter(
          cat =>
            cat.name.toLowerCase().includes(search.toLowerCase()) ||
            (cat.links && cat.links.length > 0)
        )
    : categories

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Portal de Recursos
          </h1>
          <p className="text-text-secondary text-sm">
            Todos los links y herramientas del equipo en un solo lugar
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border-subtle h-48 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-text-muted">
              {search ? 'No se encontraron resultados' : 'No hay categorías aún. Ve al panel de Admin para agregar links.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
