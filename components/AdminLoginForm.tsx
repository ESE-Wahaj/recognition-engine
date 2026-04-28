'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function AdminLoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json() as { error?: string }
        setError(data.error ?? 'Invalid password. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
          Admin Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby={error ? 'login-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-ink placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all ${
            error ? 'border-rose' : 'border-border-base'
          }`}
          placeholder="Enter admin password"
          required
        />
        {error && (
          <p id="login-error" role="alert" className="mt-1.5 text-xs text-rose">
            {error}
          </p>
        )}
      </div>

      <Button type="submit" variant="gold" loading={loading} className="w-full">
        {loading ? 'Signing in…' : 'Sign In →'}
      </Button>
    </form>
  )
}
