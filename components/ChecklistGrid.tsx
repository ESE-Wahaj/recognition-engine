'use client'

import { useState } from 'react'
import { NeonCheckbox } from '@/components/ui/animated-check-box'

interface ChecklistSection {
  title: string
  items: string[]
}

interface ChecklistGridProps {
  sections: ChecklistSection[]
}

// Muted metallic gradients — same subdued approach as MissionCard
const metalConfigs = [
  {
    // Warm amber / gold
    bg: 'linear-gradient(135deg, #130A02 0%, #2A1505 18%, #4A2510 35%, #6B3A18 50%, #4A2510 65%, #2A1505 82%, #130A02 100%)',
    border: 'rgba(107,58,24,0.50)',
    title: '#C87828',
    bar: '#9A5822',
    sheen: 'rgba(180,100,30,0.07)',
  },
  {
    // Steel blue
    bg: 'linear-gradient(135deg, #06080F 0%, #0C1220 18%, #101C38 35%, #172445 50%, #101C38 65%, #0C1220 82%, #06080F 100%)',
    border: 'rgba(23,36,69,0.65)',
    title: '#5080C8',
    bar: '#2A4890',
    sheen: 'rgba(40,80,180,0.07)',
  },
  {
    // Deep violet / purple
    bg: 'linear-gradient(135deg, #0A0818 0%, #180E30 18%, #2A1855 35%, #3A2275 50%, #2A1855 65%, #180E30 82%, #0A0818 100%)',
    border: 'rgba(58,34,117,0.55)',
    title: '#8060D0',
    bar: '#5040A0',
    sheen: 'rgba(100,60,200,0.07)',
  },
  {
    // Rose / dusty copper
    bg: 'linear-gradient(135deg, #110608 0%, #26101A 18%, #401828 35%, #5C2238 50%, #401828 65%, #26101A 82%, #110608 100%)',
    border: 'rgba(92,34,56,0.55)',
    title: '#C04070',
    bar: '#9A3055',
    sheen: 'rgba(160,50,80,0.07)',
  },
]

export function ChecklistGrid({ sections }: Readonly<ChecklistGridProps>) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sections.map((section, idx) => {
        const cfg = metalConfigs[idx % metalConfigs.length]
        const doneCount = section.items.filter((item) => !!checked[`${section.title}::${item}`]).length

        return (
          <div
            key={section.title}
            className="rounded-2xl overflow-hidden flex flex-col relative"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            {/* Subtle top sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 90% 40% at 50% 0%, ${cfg.sheen} 0%, transparent 100%)`,
              }}
            />

            {/* Header */}
            <div
              className="relative z-10 px-5 pt-5 pb-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${cfg.border}` }}
            >
              <h4 className="font-display text-base font-bold" style={{ color: cfg.title }}>
                {section.title}
              </h4>
              <span className="font-mono text-[10px] text-white/30 tracking-widest">
                {doneCount}/{section.items.length}
              </span>
            </div>

            {/* Items */}
            <ul className="relative z-10 flex flex-col px-5 py-2 flex-1">
              {section.items.map((item, i) => {
                const key = `${section.title}::${item}`
                const isChecked = !!checked[key]
                const isLast = i === section.items.length - 1

                return (
                  <li key={item} className={isLast ? '' : 'border-b border-white/5'}>
                    <button
                      className="w-full flex items-center gap-3 py-3 text-left cursor-pointer group"
                      onClick={() => toggle(key)}
                      aria-pressed={isChecked}
                    >
                      <NeonCheckbox
                        checked={isChecked}
                        onChange={() => toggle(key)}
                        aria-hidden
                        tabIndex={-1}
                      />
                      <span
                        className={`text-sm leading-snug transition-all duration-200 ${
                          isChecked
                            ? 'text-white/30 line-through'
                            : 'text-white/75 group-hover:text-white'
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Progress bar */}
            <div className="relative z-10 px-5 pb-4 pt-1">
              <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${section.items.length ? (doneCount / section.items.length) * 100 : 0}%`,
                    background: cfg.bar,
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
