import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    redirect('/admin-login')
  }
  return <>{children}</>
}
