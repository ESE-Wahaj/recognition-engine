'use client'

import { motion } from 'framer-motion'

interface ResourceCardProps {
  title: string
  description: string
  features: string[]
  buttonLabel: string
  href: string
  accent: 'gold' | 'teal' | 'rose'
  number?: string
  icon?: string
}

const accentStyles = {
  gold: {
    icon: 'bg-gold-light text-gold',
    dot: 'bg-gold',
    border: 'border-l-4 border-l-gold',
    button: 'gold' as const,
  },
  teal: {
    icon: 'bg-teal-light text-teal',
    dot: 'bg-teal',
    border: 'border-l-4 border-l-teal',
    button: 'teal' as const,
  },
  rose: {
    icon: 'bg-rose-light text-rose',
    dot: 'bg-rose',
    border: 'border-l-4 border-l-rose',
    button: 'rose' as const,
  },
}

export function ResourceCard({
  title,
  description,
  features,
  buttonLabel,
  href,
  accent,
  number,
  icon = '📊',
}: ResourceCardProps) {
  const styles = accentStyles[accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl border border-border-base overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ${styles.border}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 border-b border-border-base">
        <div className={`w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${styles.icon}`}>
          <span className="w-12 h-12 flex items-center justify-center">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          {number && (
            <p className="font-mono text-[10px] tracking-[0.1em] text-mist mb-1 uppercase">{number}</p>
          )}
          <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
          <p className="text-sm text-mist mt-0.5">{description}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-85 active:scale-[.98] ${
            accent === 'gold' ? 'bg-ink' : accent === 'teal' ? 'bg-teal' : 'bg-rose'
          }`}
        >
          {buttonLabel} →
        </a>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2.5 p-3 bg-surface rounded-lg">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${styles.dot}`} />
              <span className="text-sm text-ink-soft leading-snug">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
