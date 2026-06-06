'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface MissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  body: string
  accent: 'gold' | 'teal' | 'rose'
}

const metalConfig = {
  gold: {
    // Muted warm amber — dark with a subtle orange-brown tint
    bg: 'linear-gradient(135deg, #130A02 0%, #2A1505 20%, #4A2510 38%, #6B3A18 50%, #4A2510 62%, #2A1505 80%, #130A02 100%)',
    border: 'rgba(160, 90, 35, 0.45)',
    bar: '#A06028',
    sheen: 'rgba(180, 100, 30, 0.07)',
  },
  teal: {
    // Muted rose-wine — dark with a subtle pink-burgundy tint
    bg: 'linear-gradient(135deg, #110608 0%, #261018 20%, #401828 38%, #5C2238 50%, #401828 62%, #261018 80%, #110608 100%)',
    border: 'rgba(140, 45, 75, 0.45)',
    bar: '#9A3055',
    sheen: 'rgba(160, 50, 80, 0.07)',
  },
  rose: {
    // Muted steel blue — dark with a subtle navy-blue tint
    bg: 'linear-gradient(135deg, #06080F 0%, #0C1220 20%, #101C38 38%, #172445 50%, #101C38 62%, #0C1220 80%, #06080F 100%)',
    border: 'rgba(30, 60, 130, 0.50)',
    bar: '#2A4890',
    sheen: 'rgba(40, 80, 180, 0.07)',
  },
}

export function MissionCard({ title, body, accent, className, ...props }: Readonly<MissionCardProps>) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = React.useState<React.CSSProperties>({})
  const cfg = metalConfig[accent]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const rotateX = ((y - height / 2) / (height / 2)) * -7
    const rotateY = ((x - width / 2) / (width / 2)) * 7
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
      transition: 'transform 0.1s ease-out',
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.45s ease-in-out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="region"
      tabIndex={0}
      style={{
        ...tiltStyle,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
      className={cn('relative rounded-2xl overflow-hidden', className)}
      {...props}
    >
      {/* Very subtle top sheen — barely-there reflection hint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 40% at 50% 0%, ${cfg.sheen} 0%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col gap-3">
        {/* Title — no rectangle, sits directly on the card */}
        <h3 className="font-display text-xl font-bold text-white leading-snug">
          {title}
        </h3>

        {/* Hairline divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Body — white text with slight transparency for hierarchy */}
        <p className="text-sm text-white/75 leading-relaxed">{body}</p>

        {/* Small accent pip */}
        <div className="mt-1">
          <div className="h-[2px] w-7 rounded-full opacity-70" style={{ background: cfg.bar }} />
        </div>
      </div>
    </div>
  )
}
