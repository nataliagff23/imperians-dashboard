import { getIcon } from '@/lib/icons'
import { LinkItem } from './link-item'
import type { Category } from '@/lib/types'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getIcon(category.icon)
  const links = category.links ?? []

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: category.color + '20' }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: category.color }} />
        </div>
        <h2 className="text-lg font-bold text-text-primary">{category.name}</h2>
        <div className="flex-1 h-px bg-border-subtle ml-2" />
        <span className="text-xs text-text-muted">
          {links.length} {links.length === 1 ? 'link' : 'links'}
        </span>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-text-muted px-1">Sin links aún</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <LinkItem key={link.id} link={link} color={category.color} />
          ))}
        </div>
      )}
    </section>
  )
}
