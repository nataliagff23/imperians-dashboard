import {
  Calculator,
  UserPlus,
  Server,
  Wrench,
  FileText,
  ExternalLink,
  Folder,
  Globe,
  BarChart3,
  CreditCard,
  Users,
  Settings,
  BookOpen,
  Mail,
  MessageSquare,
  Shield,
  Database,
  Zap,
  Layout,
  Link as LinkIcon,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  'user-plus': UserPlus,
  server: Server,
  wrench: Wrench,
  'file-text': FileText,
  'external-link': ExternalLink,
  folder: Folder,
  globe: Globe,
  'bar-chart': BarChart3,
  'credit-card': CreditCard,
  users: Users,
  settings: Settings,
  'book-open': BookOpen,
  mail: Mail,
  'message-square': MessageSquare,
  shield: Shield,
  database: Database,
  zap: Zap,
  layout: Layout,
  link: LinkIcon,
}

export const iconOptions = Object.keys(iconMap).map(key => ({
  value: key,
  label: key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
}))

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Folder
}
