'use client'

import { useState } from 'react'
import { type ResourceLinks } from '@/lib/config'
import { ShinyButton } from '@/components/ui/shiny-button'

interface AdminDashboardProps {
  initialLinks: ResourceLinks
}

interface FieldState {
  label: string
  url: string
}

export function AdminDashboard({ initialLinks }: AdminDashboardProps) {
  const [fields, setFields] = useState<Record<keyof ResourceLinks, FieldState>>({
    sheets: { ...initialLinks.sheets },
    canva: { ...initialLinks.canva },
    pdf: { ...initialLinks.pdf },
  })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null)
  const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')

  const update = (key: keyof ResourceLinks, field: keyof FieldState, value: string) => {
    setFields((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }))
    setStatus(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus(null)

    for (const [key, val] of Object.entries(fields)) {
      if (!val.url.startsWith('https://')) {
        setStatus({ type: 'error', message: `${key} URL must start with https://` })
        setSaving(false)
        return
      }
    }

    try {
      const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (res.ok) {
        setStatus({ type: 'success', message: 'Links saved successfully.' })
      } else {
        const data = await res.json() as { error?: string }
        const errorMsg = data.error ?? 'Failed to save links.'
        
        if (isVercel && errorMsg.includes('Vercel')) {
          setStatus({ 
            type: 'warning', 
            message: 'Vercel requires KV storage for persistence. See setup instructions above.' 
          })
        } else {
          setStatus({ type: 'error', message: errorMsg })
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Network error. Please try again.'
      setStatus({ type: 'error', message: errorMsg })
    } finally {
      setSaving(false)
    }
  }

  const rows: { key: keyof ResourceLinks; icon: string; type: string }[] = [
    { key: 'sheets', icon: '📊', type: 'SHEETS' },
    { key: 'canva', icon: '🎨', type: 'CANVA' },
    { key: 'pdf', icon: '📖', type: 'PDF' },
  ]

  return (
    <div className="bg-white border border-border-base rounded-2xl overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_3fr_80px] bg-ink text-white text-xs font-medium px-5 py-3">
        <span>Resource Name</span>
        <span>URL / Source Path</span>
        <span>Type</span>
      </div>

      {/* Rows */}
      {rows.map(({ key, icon, type }, i) => (
        <div
          key={key}
          className={`grid grid-cols-[2fr_3fr_80px] gap-3 items-center px-5 py-4 ${
            i < rows.length - 1 ? 'border-b border-border-base' : ''
          } ${i % 2 === 1 ? 'bg-surface' : 'bg-white'}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <input
              type="text"
              value={fields[key].label}
              onChange={(e) => update(key, 'label', e.target.value)}
              aria-label={`${key} resource name`}
              className="text-sm text-ink border border-border-base rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
            />
          </div>
          <input
            type="url"
            value={fields[key].url}
            onChange={(e) => update(key, 'url', e.target.value)}
            aria-label={`${key} URL`}
            className="text-sm text-ink border border-border-base rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-mono"
            placeholder="https://..."
          />
          <span className="font-mono text-[10px] tracking-widest text-mist bg-surface border border-border-base px-2 py-1 rounded text-center">
            {type}
          </span>
        </div>
      ))}

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border-base flex flex-col gap-3 bg-surface">
        {status ? (
          <p
            role="status"
            className={`text-sm font-medium ${
              status.type === 'success' ? 'text-emerald-700' : status.type === 'warning' ? 'text-amber-700' : 'text-rose'
            }`}
          >
            {status.type === 'success' ? '✓ ' : status.type === 'warning' ? '⚠ ' : '✕ '}{status.message}
          </p>
        ) : null}
        
        {isVercel && (
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="font-semibold mb-1">⚠️ Vercel Deployment Notice</p>
            <p className="mb-2">Vercel&apos;s serverless environment doesn&apos;t persist filesystem changes. To save changes permanently:</p>
            <ol className="list-decimal list-inside space-y-1 mb-2">
              <li>Go to your Vercel project dashboard</li>
              <li>Click <strong>Storage</strong> tab</li>
              <li>Create <strong>Vercel KV</strong> (Redis database)</li>
              <li>Redeploy your app</li>
            </ol>
            <p className="text-xs">Without Vercel KV, changes will be lost. Local development works fine with file storage.</p>
          </div>
        )}
        
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-mist">
            {isVercel ? 'Changes require Vercel KV setup to persist.' : 'All changes are saved to data/links.json on the server.'}
          </p>
          <ShinyButton colorScheme="gold" onClick={handleSave} disabled={saving || (isVercel && !status?.message.includes('KV'))}>
            {saving ? 'Saving…' : 'Save Changes'}
          </ShinyButton>
        </div>
      </div>
    </div>
  )
}
