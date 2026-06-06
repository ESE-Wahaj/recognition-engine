export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
        <a
          href="#hero"
          className="font-display text-lg font-bold text-white"
          aria-label="The Recognition Engine — Home"
        >
          The{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)',
            }}
          >
            Recognition Engine
          </span>
        </a>
      </div>
    </header>
  )
}
