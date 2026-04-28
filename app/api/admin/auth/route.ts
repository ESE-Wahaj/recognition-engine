import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json() as { password?: unknown }
  const { password } = body

  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const session = await getSession()
  session.isAdmin = true
  await session.save()

  return NextResponse.json({ ok: true })
}
