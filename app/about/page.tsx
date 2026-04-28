import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn the philosophy behind The Recognition Engine — public recognition for top performers, private coaching for growth. The golden rule every CX manager needs.',
  openGraph: {
    title: 'About — The Recognition Engine',
    description: 'Public recognition. Private coaching. Always.',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="About page header"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            About
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Built on a Simple{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Philosophy
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light">
            Recognition without fairness is noise. Fairness without recognition is invisible. The
            Recognition Engine brings both together.
          </p>
        </div>
      </section>

      {/* ── Golden Rule ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-14" aria-label="The golden rule">
        <SectionHeader label="The Golden Rule of This System" />

        <div
          className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        >
          <div aria-hidden className="absolute right-8 top-6 text-5xl opacity-10 select-none">
            ✦
          </div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-gold mb-3">
            THE GOLDEN RULE OF THIS SYSTEM
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            Public recognition. Private coaching. Always.
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Public */}
            <div className="rounded-xl p-5 bg-emerald-900/20 border border-emerald-700/30">
              <p className="text-[11px] font-bold tracking-widest text-emerald-400 mb-3">
                ✦ ALWAYS PUBLIC
              </p>
              <ul className="space-y-2">
                {[
                  'Best Performer of the Month',
                  'Most Improved Agent',
                  'Top 3 Leaderboard announcement',
                  'Team of the Month celebration',
                  'Annual Champion recognition',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Private */}
            <div className="rounded-xl p-5 bg-rose-900/20 border border-rose-700/30">
              <p className="text-[11px] font-bold tracking-widest text-rose-400 mb-3">
                ✕ ALWAYS PRIVATE
              </p>
              <ul className="space-y-2">
                {[
                  'Low performance or low scores',
                  'Individual ranking position (except top 3)',
                  'Coaching conversations',
                  'Improvement plans',
                  'Any agent asking where they placed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="text-rose-400 text-xs mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="Mission">
        <SectionHeader label="Our Mission" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              title: 'Data-Driven Fairness',
              body: 'Rankings are calculated from weighted KPIs — CSAT, FCR, volume, handle time, and attendance. No subjectivity. No favouritism. Just data.',
            },
            {
              icon: '🎯',
              title: 'Celebrating Growth',
              body: 'The Most Improved metric ensures you recognise effort and progress, not just peak performance. Every agent has a path to the spotlight.',
            },
            {
              icon: '🔒',
              title: 'Psychological Safety',
              body: 'Scores stay private. Only the positives go public. This creates a team culture where agents feel motivated to improve, not fearful of exposure.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-white border border-border-base rounded-2xl p-6">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">{title}</h3>
              <p className="text-sm text-mist leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote ────────────────────────────────────────────────────── */}
      <section className="bg-gold-light border-y border-gold/30 py-12 px-6 text-center" aria-label="Quote">
        <blockquote className="max-w-2xl mx-auto">
          <p className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-4 font-bold">
            &ldquo;Great teams don&apos;t just happen. They&apos;re built by managers who see, celebrate, and
            develop every individual.&rdquo;
          </p>
          <cite className="font-mono text-xs text-gold-dark not-italic tracking-widest">
            — THE RECOGNITION ENGINE
          </cite>
        </blockquote>
      </section>
    </>
  )
}
