import type { Metadata } from 'next'
import { readLinks } from '@/lib/links'
import { AdminDashboard } from '@/components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage resource links for The Recognition Engine.',
}

export default async function AdminPage() {
  const links = readLinks()

  return (
    <div className="min-h-screen bg-surface py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.14em] text-mist mb-2 uppercase">Admin</p>
          <h1 className="font-display text-3xl font-bold text-ink mb-2">Resource Link Manager</h1>
          <p className="text-sm text-mist">
            Update the live resource links shown to users. Changes take effect immediately on save.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-amber-500 mt-0.5">⚠</span>
          <p className="text-sm text-amber-800">
            Only secure <strong>HTTPS</strong> links are accepted. Changes are written to{' '}
            <code className="font-mono bg-amber-100 px-1 rounded">data/links.json</code> on the server.
          </p>
        </div>

        <AdminDashboard initialLinks={links} />

        <div className="mt-8 pt-6 border-t border-border-base flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-mist font-mono">Recognition Engine — Admin Panel</p>
          <form action="/api/admin/auth/signout" method="POST">
            <button
              type="submit"
              className="text-xs text-rose hover:text-rose/80 font-medium transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
