export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 pt-10 pb-28 text-center">
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
        <p className="font-mono text-xs text-white/25">
          Recognition is not a nice-to-have. In a high-pressure CX environment, it is what keeps your team standing.
        </p>
      </div>
    </footer>
  )
}
