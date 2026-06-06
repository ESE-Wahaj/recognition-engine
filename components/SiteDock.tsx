'use client'

import { useState, useEffect } from 'react'
import MacOSDock from '@/components/ui/mac-os-dock'

// SVG → data URL helper
const enc = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`

// Each icon: vibrant linear gradient (bright top-left → deep bottom-right)
//            + radial glass shine (white highlight at top, fading out)
//            + crisp white symbol
const gfx = (grad: string, shine: string, symbol: string) =>
  enc(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2=".65" y2="1">${grad}</linearGradient>` +
    `<radialGradient id="s" cx=".38" cy=".13" r=".75">` +
    `<stop offset="0%" stop-color="${shine}" stop-opacity=".42"/>` +
    `<stop offset="55%" stop-color="${shine}" stop-opacity=".06"/>` +
    `<stop offset="100%" stop-color="${shine}" stop-opacity="0"/>` +
    `</radialGradient>` +
    `</defs>` +
    `<rect width="100" height="100" rx="22" fill="url(#g)"/>` +
    `<rect width="100" height="100" rx="22" fill="url(#s)"/>` +
    symbol +
    `</svg>`
  )

const W = `rgba(255,255,255,0.93)`   // white symbol fill shorthand
const S = `rgba(255,255,255,0.56)`   // secondary / dimmer stroke

// ── Icon definitions ─────────────────────────────────────────────────────────
const ICONS = {
  // Warm amber-gold — house polygon
  hero: gfx(
    `<stop offset="0%" stop-color="#FFBE55"/><stop offset="100%" stop-color="#742E00"/>`,
    `#fff`,
    `<polygon points="50,17 84,46 74,46 74,81 57,81 57,63 43,63 43,81 26,81 26,46 16,46" fill="${W}"/>`
  ),

  // Sapphire blue — info dot + bar
  about: gfx(
    `<stop offset="0%" stop-color="#55C0FF"/><stop offset="100%" stop-color="#08286E"/>`,
    `#fff`,
    `<circle cx="50" cy="33" r="8" fill="${W}"/>` +
    `<rect x="43" y="46" width="14" height="32" rx="5" fill="${W}"/>`
  ),

  // Vivid violet — sparkle asterisk (cross + diagonal)
  features: gfx(
    `<stop offset="0%" stop-color="#B870FF"/><stop offset="100%" stop-color="#2A0880"/>`,
    `#fff`,
    `<line x1="50" y1="17" x2="50" y2="83" stroke="${W}" stroke-width="10" stroke-linecap="round"/>` +
    `<line x1="17" y1="50" x2="83" y2="50" stroke="${W}" stroke-width="10" stroke-linecap="round"/>` +
    `<line x1="27" y1="27" x2="73" y2="73" stroke="${S}" stroke-width="7" stroke-linecap="round"/>` +
    `<line x1="73" y1="27" x2="27" y2="73" stroke="${S}" stroke-width="7" stroke-linecap="round"/>`
  ),

  // Emerald teal — 2 × 2 tile grid
  resources: gfx(
    `<stop offset="0%" stop-color="#00E0A8"/><stop offset="100%" stop-color="#005C44"/>`,
    `#fff`,
    `<rect x="13" y="13" width="30" height="30" rx="7" fill="${W}"/>` +
    `<rect x="57" y="13" width="30" height="30" rx="7" fill="${W}"/>` +
    `<rect x="13" y="57" width="30" height="30" rx="7" fill="${W}"/>` +
    `<rect x="57" y="57" width="30" height="30" rx="7" fill="${W}"/>`
  ),

  // Crimson rose — envelope body + flap line
  contact: gfx(
    `<stop offset="0%" stop-color="#FF6080"/><stop offset="100%" stop-color="#8C0E28"/>`,
    `#fff`,
    `<rect x="10" y="27" width="80" height="52" rx="8" fill="${W}"/>` +
    `<polyline points="10,27 50,60 90,27" fill="none" stroke="#8C0E28" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
}

const NAV = [
  { id: 'hero',      name: 'Home',      icon: ICONS.hero      },
  { id: 'about',     name: 'About',     icon: ICONS.about     },
  { id: 'features',  name: 'Features',  icon: ICONS.features  },
  { id: 'resources', name: 'Resources', icon: ICONS.resources },
  { id: 'contact',   name: 'Contact',   icon: ICONS.contact   },
]

export function SiteDock() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.25, rootMargin: '0px 0px -50% 0px' }
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <MacOSDock apps={NAV} onAppClick={handleClick} openApps={[active]} />
      </div>
    </div>
  )
}
