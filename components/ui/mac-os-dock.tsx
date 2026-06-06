'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

export interface DockApp {
  id: string
  name: string
  icon: string
}

interface MacOSDockProps {
  apps: DockApp[]
  onAppClick: (appId: string) => void
  openApps?: string[]
}

const BASE  = 50    // resting icon size (wrapper = BASE wide, icons touch at rest)
const MAX   = 80    // peak magnified size
const RANGE = 130   // cosine influence radius in px

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const DUR  = '0.18s'
const TR   = `${DUR} ${EASE}`

const resetToBase = () => BASE

export default function MacOSDock({ apps, onAppClick, openApps = [] }: Readonly<MacOSDockProps>) {
  const dockRef  = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [sizes, setSizes] = useState<number[]>(() => apps.map(() => BASE))

  const recalc = useCallback((mouseX: number) => {
    setSizes(
      itemRefs.current.map((el) => {
        if (!el) return BASE
        const { left, width } = el.getBoundingClientRect()
        // button is always centred on its wrapper → centre is always wrapper's midpoint
        const cx = left + width / 2
        const d  = Math.abs(mouseX - cx)
        if (d >= RANGE) return BASE
        const t = 1 - d / RANGE
        return BASE + (MAX - BASE) * Math.cos((1 - t) * (Math.PI / 2))
      })
    )
  }, [])

  const reset = useCallback(() => setSizes(p => p.map(resetToBase)), [])

  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return
    const onMove  = (e: MouseEvent) => recalc(e.clientX)
    const onLeave = () => reset()
    dock.addEventListener('mousemove', onMove)
    dock.addEventListener('mouseleave', onLeave)
    return () => {
      dock.removeEventListener('mousemove', onMove)
      dock.removeEventListener('mouseleave', onLeave)
    }
  }, [recalc, reset])

  return (
    <div
      ref={dockRef}
      style={{
        // inline-flex: pill auto-sizes to its content width
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: 4,
        // bottom padding holds the indicator dots; no extra horizontal gap
        padding: '8px 10px 14px',
        borderRadius: 20,
        background: 'rgba(8, 8, 14, 0.72)',
        backdropFilter: 'blur(32px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,0.13)',
        boxShadow: [
          '0 16px 48px rgba(0,0,0,0.65)',
          '0 4px 16px rgba(0,0,0,0.35)',
          'inset 0 1.5px 0 rgba(255,255,255,0.09)',
          'inset 0 -1px 0 rgba(0,0,0,0.30)',
        ].join(', '),
        // allow magnified icons to float above the pill
        overflow: 'visible',
      }}
    >
      {apps.map((app, i) => {
        const size   = sizes[i] ?? BASE
        const isOpen = openApps.includes(app.id)

        return (
          <div
            key={app.id}
            className="group"
            style={{
              position: 'relative',
              // ← THIS drives horizontal dock expansion.
              // Wrapper width grows with the icon; the pill grows because it's inline-flex.
              width: size,
              transition: `width ${TR}`,
              // Wrapper height stays BASE so the pill height never changes.
              // The button overflows upward via position:absolute.
              height: BASE,
              flexShrink: 0,
              // magnified icon renders above its neighbours
              zIndex: Math.round(size - BASE) + 1,
            }}
          >
            {/* Tooltip — anchored above even the tallest possible icon */}
            <div
              className="group-hover:!opacity-100"
              style={{
                position: 'absolute',
                bottom: MAX + 10,
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                zIndex: 200,
                whiteSpace: 'nowrap',
                background: 'rgba(12,12,20,0.90)',
                color: 'rgba(255,255,255,0.90)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.03em',
                padding: '4px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                opacity: 0,
                transition: 'opacity 0.12s',
              }}
            >
              {app.name}
            </div>

            {/* Button: absolutely centred on the wrapper.
                Grows upward + outward when magnified without affecting layout. */}
            <button
              ref={(el) => { itemRefs.current[i] = el }}
              aria-label={app.name}
              onClick={() => {
                setSizes(p => p.map(resetToBase))
                onAppClick(app.id)
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: size,
                height: size,
                transition: `width ${TR}, height ${TR}`,
                outline: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src={app.icon}
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: Math.round(size * 0.22),
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  filter: 'drop-shadow(0 5px 14px rgba(0,0,0,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
                  transition: `border-radius ${TR}`,
                }}
              />
            </button>

            {/* Active indicator dot — sits in the bottom padding area */}
            <div
              style={{
                position: 'absolute',
                bottom: -9,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: isOpen ? 'rgba(255,255,255,0.80)' : 'transparent',
                boxShadow: isOpen ? '0 0 6px 1px rgba(200,200,255,0.45)' : 'none',
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
