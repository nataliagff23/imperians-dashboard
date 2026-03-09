import { getIcon } from '@/lib/icons'
import { ExternalLink } from 'lucide-react'
import type { Link as LinkType } from '@/lib/types'

interface LinkItemProps {
  link: LinkType
  color?: string
}

export function LinkItem({ link, color = '#c9a84c' }: LinkItemProps) {
  const Icon = getIcon(link.icon)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-surface rounded-xl border border-border-subtle hover:border-gold/40 transition-all duration-300 p-5 flex flex-col justify-between gap-4 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color + '20' }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors">
            {link.title}
          </p>
          {link.description && (
            <p className="text-xs text-text-muted leading-relaxed mt-1">
              {link.description}
            </p>
          )}
        </div>
      </div>
      <div
        className="flex items-center justify-center gap-2 text-xs font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        style={{ backgroundColor: color + '20', color }}
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Abrir herramienta
      </div>
    </a>
  )
}
