import Image from 'next/image'
import Link from 'next/link'
import { Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Imperians"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-lg font-semibold text-text-primary">
            Imperians
          </span>
        </Link>
        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Link>
      </div>
    </header>
  )
}
