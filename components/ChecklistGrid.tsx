'use client'

import { useState } from 'react'

interface ChecklistSection {
  title: string
  items: string[]
}

interface ChecklistGridProps {
  sections: ChecklistSection[]
}

export function ChecklistGrid({ sections }: ChecklistGridProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sections.map((section) => (
        <div key={section.title} className="bg-white border border-border-base rounded-2xl p-5">
          <h4 className="text-sm font-bold text-ink mb-3">{section.title}</h4>
          <ul className="space-y-0">
            {section.items.map((item) => {
              const key = `${section.title}::${item}`
              const isChecked = !!checked[key]
              return (
                <li key={item}>
                  <button
                    className="w-full flex items-start gap-2.5 py-2 border-b border-border-base last:border-none text-left cursor-pointer group"
                    onClick={() => toggle(key)}
                    aria-pressed={isChecked}
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-teal border-teal'
                          : 'border-border-base group-hover:border-teal'
                      }`}
                      aria-hidden
                    >
                      {isChecked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-sm leading-snug transition-colors ${
                        isChecked ? 'text-mist line-through' : 'text-ink-soft'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
