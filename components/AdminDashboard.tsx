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
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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
        setStatus({ type: 'error', message: data.error ?? 'Failed to save links.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
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
      <div className="px-5 py-4 border-t border-border-base flex items-center justify-between gap-4 flex-wrap bg-surface">
        {status ? (
          <p
            role="status"
            className={`text-sm font-medium ${
              status.type === 'success' ? 'text-emerald-700' : 'text-rose'
            }`}
          >
            {status.type === 'success' ? '✓ ' : '✕ '}{status.message}
          </p>
        ) : (
          <p className="text-xs text-mist">All changes are saved to data/links.json on the server.</p>
        )}
        <ShinyButton colorScheme="gold" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </ShinyButton>
      </div>
    </div>
  )
}
