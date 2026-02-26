export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  sort_order: number
  created_at: string
  links?: Link[]
}

export interface Link {
  id: string
  category_id: string
  title: string
  url: string
  description: string
  icon: string
  sort_order: number
  created_at: string
}
