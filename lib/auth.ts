import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'

export interface SessionData {
  isAdmin: boolean
}

export const sessionOptions = {
  password: process.env.ADMIN_COOKIE_SECRET ?? 'change-this-secret-at-least-32-chars-long',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24, // 24 hours
  },
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  return session
}

export async function requireAdmin(): Promise<boolean> {
  const session = await getSession()
  return session.isAdmin === true
}
