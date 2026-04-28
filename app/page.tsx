import type { Metadata } from 'next'
import Link from 'next/link'
import { readLinks } from '@/lib/links'
import { ShinyButton } from '@/components/ui/shiny-button'

export const metadata: Metadata = {
  title: 'Home — CX Team Performance & Recognition',
  description:
    'Run a complete monthly recognition cycle for your CX team. Rank agents fairly, celebrate top performers, and drive continuous improvement.',
  openGraph: {
    title: 'The Recognition Engine — Home',
    description: 'CX Team Performance & Recognition Dashboard',
  },
}

export default async function HomePage() {
  const links = readLinks()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-center py-20 px-6"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Hero section"
      >
        {/* Radial glows */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(201,149,42,.13) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(26,107,107,.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Badge with shimmer effect */}
          <style>{`
            @property --gradient-angle-badge {
              syntax: "<angle>";
              initial-value: 0deg;
              inherits: false;
            }
            @keyframes shimmer-badge {
              to { --gradient-angle-badge: 360deg; }
            }
            .shimmer-badge {
              animation: shimmer-badge 3s linear infinite;
              background: linear-gradient(rgba(30, 20, 10, 0.5), rgba(30, 20, 10, 0.5)) padding-box,
                conic-gradient(
                  from var(--gradient-angle-badge),
                  transparent,
                  #C9952A 5%,
                  #E8B84B 10%,
                  #C9952A 15%,
                  transparent 20%
                ) border-box;
            }
          `}</style>
          <div className="shimmer-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 animate-fade-up border border-transparent">
            <span className="text-[9px]">✦</span>
            <span className="font-mono text-[11px] tracking-widest text-yellow-300">PRODUCT HUB — EXCLUSIVE ACCESS</span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-black text-white leading-tight mb-3 animate-fade-up"
            style={{ fontSize: 'clamp(38px, 6vw, 62px)' }}
          >
            The{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Recognition Engine
            </span>
          </h1>

          <p className="text-white/55 font-light text-lg mb-6 animate-fade-up">
            CX Team Performance &amp; Recognition Dashboard
          </p>

          <div
            className="w-12 h-0.5 mx-auto mb-8 rounded-full"
            style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
          />

          {/* Welcome panel */}
          <div className="bg-white/6 border border-white/10 rounded-xl p-6 text-left mb-10">
            <p className="font-mono text-[10px] tracking-[0.12em] text-yellow-300 mb-2">Greetings</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Welcome — and congratulations on taking this step. Inside this hub you&apos;ll find everything
              you need to run a complete monthly recognition cycle for your CX team.{' '}
              <strong className="text-white font-medium">Great work deserves to be seen.</strong> This system
              makes sure it is.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/features" className="inline-flex">
              <ShinyButton colorScheme="gold">
                Explore Features →
              </ShinyButton>
            </Link>
            <Link href="/resources" className="inline-flex">
              <ShinyButton colorScheme="teal">
                Access Resources
              </ShinyButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick Start Banner ────────────────────────────────────────── */}
      <div
        className="px-6 py-4 flex flex-wrap items-center justify-center gap-4"
        style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
        aria-label="Quick start steps"
      >
        <span className="text-sm font-bold text-ink">⚡ First 10 minutes:</span>
        <div className="flex flex-wrap gap-1.5 items-center justify-center">
          {[
            'Open Google Sheet',
            'Enter agent names',
            'Paste CRM data',
            'View Leaderboard',
            '🏆 First ranking live',
          ].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="bg-black/12 rounded-md px-2.5 py-1 text-xs font-semibold text-ink">
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-ink-soft text-xs">›</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Quick Access Buttons ─────────────────────────────────────── */}
      <section
        className="w-full px-6 py-6"
        aria-label="Quick access buttons"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href={links.sheets.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <ShinyButton colorScheme="gold" className="w-full justify-center">
              Google Sheets →
            </ShinyButton>
          </a>

          <a
            href={links.canva.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <ShinyButton colorScheme="teal" className="w-full justify-center">
              Canva Kit →
            </ShinyButton>
          </a>

          <a
            href={links.pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center"
          >
            <ShinyButton colorScheme="rose" className="w-full justify-center">
              PDF Guide →
            </ShinyButton>
          </a>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section
        className="py-2 px-6"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Platform statistics"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '218', label: 'Live Formulas' },
            { value: '6', label: 'Canva Templates' },
            { value: '25', label: 'Agents Supported' },
            { value: '5', label: 'Monthly Steps' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                className="font-display text-4xl font-bold text-transparent bg-clip-text mb-1"
                style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
              >
                {value}
              </div>
              <div className="text-white/50 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
