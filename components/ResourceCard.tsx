'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ShinyButton } from '@/components/ui/shiny-button'

interface ResourceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  features: string[]
  buttonLabel: string
  href: string
  accent: 'gold' | 'teal' | 'rose'
  number?: string
}

const accentConfig = {
  gold: {
    topBar: 'bg-gradient-to-r from-[#C9952A] via-[#E8B84B] to-[#C9952A]',
    border: 'border-[#C9952A]/25',
    glow: 'shadow-[0_0_45px_-10px_rgba(201,149,42,0.35)]',
    glowHover: 'hover:shadow-[0_0_65px_-8px_rgba(201,149,42,0.55)]',
    bgAccent: 'from-[#C9952A]/[0.07] via-[#C9952A]/[0.03]',
    badge: 'bg-[#C9952A]/15 text-[#E8B84B] border-[#C9952A]/30',
    check: '#C9952A',
    checkBg: 'rgba(201,149,42,0.12)',
    featureHover: 'hover:bg-[#C9952A]/[0.07] hover:border-[#C9952A]/20',
    button: 'gold' as const,
  },
  teal: {
    topBar: 'bg-gradient-to-r from-[#1A6B6B] via-[#2d9d9d] to-[#1A6B6B]',
    border: 'border-[#1A6B6B]/25',
    glow: 'shadow-[0_0_45px_-10px_rgba(26,107,107,0.35)]',
    glowHover: 'hover:shadow-[0_0_65px_-8px_rgba(26,107,107,0.55)]',
    bgAccent: 'from-[#1A6B6B]/[0.07] via-[#1A6B6B]/[0.03]',
    badge: 'bg-[#1A6B6B]/15 text-[#52bfbf] border-[#1A6B6B]/30',
    check: '#2d9d9d',
    checkBg: 'rgba(26,107,107,0.12)',
    featureHover: 'hover:bg-[#1A6B6B]/[0.07] hover:border-[#1A6B6B]/20',
    button: 'teal' as const,
  },
  rose: {
    topBar: 'bg-gradient-to-r from-[#B84040] via-[#e8597b] to-[#B84040]',
    border: 'border-[#B84040]/25',
    glow: 'shadow-[0_0_45px_-10px_rgba(184,64,64,0.35)]',
    glowHover: 'hover:shadow-[0_0_65px_-8px_rgba(184,64,64,0.55)]',
    bgAccent: 'from-[#B84040]/[0.07] via-[#B84040]/[0.03]',
    badge: 'bg-[#B84040]/15 text-[#f08fa3] border-[#B84040]/30',
    check: '#e8597b',
    checkBg: 'rgba(184,64,64,0.12)',
    featureHover: 'hover:bg-[#B84040]/[0.07] hover:border-[#B84040]/20',
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
  className,
  ...props
}: ResourceCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = React.useState<React.CSSProperties>({})
  const cfg = accentConfig[accent]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const rotateX = ((y - height / 2) / (height / 2)) * -4
    const rotateY = ((x - width / 2) / (width / 2)) * 4
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-in-out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={cn(
        'relative rounded-2xl overflow-hidden border',
        cfg.border,
        cfg.glow,
        cfg.glowHover,
        'transition-shadow duration-300 cursor-default',
        className
      )}
      {...props}
    >
      {/* Accent top strip */}
      <div className={cn('h-[2px] w-full', cfg.topBar)} />

      {/* Dark base + accent gradient bleed */}
      <div className="absolute inset-0 bg-[#0B0B12]" />
      <div className={cn('absolute inset-0 bg-gradient-to-br to-transparent', cfg.bgAccent)} />
      {/* Noise texture layer */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-5 px-7 py-6 border-b border-white/[0.07]"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex-1 min-w-0">
            {number && (
              <span
                className={cn(
                  'inline-block font-mono text-[10px] tracking-[0.18em] uppercase mb-3 px-2.5 py-1 rounded-full border',
                  cfg.badge
                )}
              >
                {number}
              </span>
            )}
            <h3 className="font-display text-[1.35rem] font-bold text-white leading-tight mb-1.5">
              {title}
            </h3>
            <p className="text-sm text-white/45 font-light">{description}</p>
          </div>
          <a href={href} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-start sm:self-center">
            <ShinyButton colorScheme={cfg.button}>{buttonLabel} →</ShinyButton>
          </a>
        </div>

        {/* Features grid */}
        <div className="px-7 py-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {features.map((f) => (
              <div
                key={f}
                className={cn(
                  'flex items-start gap-3 px-4 py-3 rounded-xl',
                  'bg-white/[0.035] border border-white/[0.07]',
                  'transition-all duration-200',
                  cfg.featureHover
                )}
              >
                {/* Check icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0 mt-[1px]"
                  aria-hidden
                >
                  <rect width="16" height="16" rx="4" fill={cfg.checkBg} />
                  <path
                    d="M4.5 8L7 10.5L11.5 5.5"
                    stroke={cfg.check}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-white/60 leading-snug">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
