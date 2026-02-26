import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase
    .from('categories')
    .select('*, links(*)')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Sort links within each category
  const sorted = data?.map(cat => ({
    ...cat,
    links: cat.links?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order) ?? []
  }))

  return NextResponse.json(sorted)
}

export async function POST(request: Request) {
  const body = await request.json()
  const slug = body.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const { data, error } = await supabase
    .from('categories')
    .insert({ ...body, slug })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
