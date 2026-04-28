import type { Metadata } from 'next'
import { AdminLoginForm } from '@/components/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Sign in to the Recognition Engine admin panel.',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.14em] text-mist mb-3 uppercase">Admin Access</p>
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Sign In</h1>
          <p className="text-sm text-mist">Enter your admin password to continue.</p>
        </div>

        <div className="bg-white border border-border-base rounded-2xl p-6 shadow-sm">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
