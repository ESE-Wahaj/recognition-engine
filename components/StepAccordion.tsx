'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type ReactNode } from 'react'

export interface Step {
  num: number
  title: string
  time: string
  body: ReactNode
}

interface StepAccordionProps {
  steps: Step[]
}

export function StepAccordion({ steps }: StepAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-1">
      {steps.map((step, i) => {
        const isOpen = openIndex === i
        return (
          <div key={step.num} className="bg-white border border-border-base rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`step-body-${step.num}`}
            >
              <div className="w-8 h-8 rounded-full bg-ink text-white font-mono text-sm font-medium flex items-center justify-center flex-shrink-0">
                {step.num}
              </div>
              <span className="flex-1 text-[15px] font-semibold text-ink">{step.title}</span>
              <span className="font-mono text-xs text-mist">{step.time}</span>
              <svg
                className={`w-4 h-4 text-mist transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`step-body-${step.num}`}
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pl-[72px] border-t border-border-base pt-4">
                    {step.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
