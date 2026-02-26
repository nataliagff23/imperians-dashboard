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
    <div
      className="bg-surface rounded-xl border border-border-subtle overflow-hidden hover:border-border-subtle/80 transition-colors"
      style={{ borderLeftColor: category.color, borderLeftWidth: '3px' }}
    >
      <div className="px-4 py-3 flex items-center gap-2.5 border-b border-border-subtle">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: category.color + '20' }}
        >
          <Icon className="w-4 h-4" style={{ color: category.color }} />
        </div>
        <h2 className="font-semibold text-text-primary">{category.name}</h2>
        <span className="ml-auto text-xs text-text-muted">
          {links.length} {links.length === 1 ? 'link' : 'links'}
        </span>
      </div>
      <div className="p-2">
        {links.length === 0 ? (
          <p className="text-sm text-text-muted px-3 py-2">Sin links aún</p>
        ) : (
          links.map((link) => <LinkItem key={link.id} link={link} />)
        )}
      </div>
    </div>
  )
}
