import { getIcon } from '@/lib/icons'
import type { Link as LinkType } from '@/lib/types'

interface LinkItemProps {
  link: LinkType
}

export function LinkItem({ link }: LinkItemProps) {
  const Icon = getIcon(link.icon)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-navy-lighter/50 transition-colors group"
    >
      <Icon className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-text-primary group-hover:text-gold transition-colors truncate">
          {link.title}
        </p>
        {link.description && (
          <p className="text-xs text-text-muted leading-relaxed">{link.description}</p>
        )}
      </div>
    </a>
  )
}
