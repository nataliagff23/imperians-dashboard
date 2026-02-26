import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const NO_DB = NextResponse.json({ error: 'Database not configured' }, { status: 503 })

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabase) return NO_DB

  const { id } = await params
  const body = await request.json()

  const { data, error } = await supabase
    .from('links')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabase) return NO_DB

  const { id } = await params

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
