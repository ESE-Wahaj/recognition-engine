import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json() as {
      name: string
      email: string
      message: string
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const to = process.env.CONTACT_EMAIL
    if (!to) {
      console.error('CONTACT_EMAIL env var not set')
      return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      from: 'Recognition Engine <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7f7fa;border-radius:12px;">
          <h2 style="margin:0 0 4px;color:#0D0D14;font-size:20px;">New Contact Message</h2>
          <p style="margin:0 0 24px;color:#6B6B82;font-size:13px;">Via The Recognition Engine contact form</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-radius:8px 8px 0 0;font-size:12px;color:#6B6B82;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Name</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-top:0;font-size:15px;color:#0D0D14;">${name}</td>
            </tr>
            <tr><td style="height:8px;background:transparent;border:none;"></td></tr>
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-radius:8px 8px 0 0;font-size:12px;color:#6B6B82;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Email</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-top:0;font-size:15px;color:#0D0D14;">
                <a href="mailto:${email}" style="color:#C9952A;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr><td style="height:8px;background:transparent;border:none;"></td></tr>
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-radius:8px 8px 0 0;font-size:12px;color:#6B6B82;font-weight:600;text-transform:uppercase;letter-spacing:.06em;">Message</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;background:#fff;border:1px solid #E2E2EB;border-top:0;font-size:15px;color:#0D0D14;white-space:pre-wrap;line-height:1.6;">${message.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#6B6B82;">
            Hit reply to respond directly to ${name}.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    console.log('[contact] Email sent, id:', data?.id)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] Unexpected error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
