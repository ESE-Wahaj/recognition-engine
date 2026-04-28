import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlowCard } from '@/components/ui/spotlight-card'
import { AnimatedFeatureSpotlight } from '@/components/ui/feature-spotlight'

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
      <div className="w-full px-6 py-14 bg-gradient-to-b from-white to-gray-50">
        <AnimatedFeatureSpotlight
          preheaderIcon={<span>✦</span>}
          preheaderText="THE GOLDEN RULE OF THIS SYSTEM"
          heading={
            <>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}>
                Public Recognition.
              </span>{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #c41e3a 0%, #e8597b 100%)' }}>
                Private Coaching.
              </span>{' '}
              Always.
            </>
          }
          description="Share wins publicly to celebrate and motivate. Keep challenges private to coach with care. This balance builds trust, drives performance, and creates a culture where everyone feels seen."
          buttonText="Learn More →"
          buttonHref="/features"
          imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80"
          imageAlt="Team collaboration and recognition"
        />
      </div>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section
        className="w-full px-6 py-14"
        aria-label="Mission"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Our Mission" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📊',
                title: 'Data-Driven Fairness',
                body: 'Rankings are calculated from weighted KPIs — CSAT, FCR, volume, handle time, and attendance. No subjectivity. No favouritism. Just data.',
                glowColor: 'gold' as const,
              },
              {
                icon: '🎯',
                title: 'Celebrating Growth',
                body: 'The Most Improved metric ensures you recognise effort and progress, not just peak performance. Every agent has a path to the spotlight.',
                glowColor: 'green' as const,
              },
              {
                icon: '🔒',
                title: 'Psychological Safety',
                body: 'Scores stay private. Only the positives go public. This creates a team culture where agents feel motivated to improve, not fearful of exposure.',
                glowColor: 'rose' as const,
              },
            ].map(({ icon, title, body, glowColor }) => (
              <GlowCard key={title} glowColor={glowColor} className="p-6">
                <div className="relative z-10">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="font-display text-lg font-bold text-ink mb-2">{title}</h3>
                  <p className="text-sm text-mist leading-relaxed">{body}</p>
                </div>
              </GlowCard>
            ))}
          </div>
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
