import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { readLinks, writeLinks } from '@/lib/links'
import { type ResourceLinks } from '@/lib/config'

export async function GET() {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  const links = readLinks()
  return NextResponse.json(links)
}

export async function POST(req: NextRequest) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const body = await req.json() as Partial<ResourceLinks>

  const { sheets, canva, pdf } = body
  if (!sheets?.label || !sheets?.url || !canva?.label || !canva?.url || !pdf?.label || !pdf?.url) {
    return NextResponse.json({ error: 'Invalid payload. All three resources are required.' }, { status: 400 })
  }

  for (const [key, val] of Object.entries({ sheets, canva, pdf })) {
    if (!val.url.startsWith('https://')) {
      return NextResponse.json({ error: `${key} URL must start with https://` }, { status: 400 })
    }
  }

  const links: ResourceLinks = {
    sheets: { label: sheets.label, url: sheets.url },
    canva: { label: canva.label, url: canva.url },
    pdf: { label: pdf.label, url: pdf.url },
  }

  writeLinks(links)
  return NextResponse.json({ ok: true, links })
}
