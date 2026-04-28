import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-10 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-display text-lg font-bold text-white mb-2">
          The{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
          >
            Recognition Engine
          </span>
        </div>
        <p className="text-sm text-white/40 mb-5">CX Team Performance & Recognition Dashboard</p>
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/features', label: 'Features' },
            { href: '/resources', label: 'Resources' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs text-white/25">
          Built for CX managers who believe great teams deserve to be seen.
        </p>
      </div>
    </footer>
  )
}
