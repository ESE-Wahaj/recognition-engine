import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  session.destroy()
  const origin = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin
  return NextResponse.redirect(new URL('/', origin))
}
