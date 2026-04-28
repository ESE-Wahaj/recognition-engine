import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ResourceCard } from '@/components/ResourceCard'
import { readLinks } from '@/lib/links'

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

  const deliverables = [
    {
      number: 'DELIVERABLE 01',
      title: 'Performance Dashboard',
      description: 'Google Sheets — 5 tabs, 218 live formulas',
      icon: '📊',
      accent: 'gold' as const,
      buttonLabel: 'Open in Google Sheets',
      href: links.sheets.url,
      features: [
        'Auto-ranking leaderboard by weighted score',
        'Most Improved agent auto-detected',
        'RAG status: Green / Amber / Red per agent',
        'Leadership-ready monthly scorecard tab',
        'Customisable KPI weights in Settings',
        'Supports up to 25 agents out of the box',
      ],
    },
    {
      number: 'DELIVERABLE 02',
      title: 'Canva Announcement Template Kit',
      description: '6 editable templates — update each in under 5 minutes',
      icon: '🎨',
      accent: 'teal' as const,
      buttonLabel: 'Open Canva Kit',
      href: links.canva.url,
      features: [
        'Best Performer of the Month',
        'Top 3 Leaderboard announcement',
        'Most Improved Agent recognition',
        'Monthly Team Scorecard one-pager',
        'Team of the Month celebration',
        'Annual Champion year-end award',
      ],
    },
    {
      number: 'DELIVERABLE 03',
      title: 'Setup Guide & Reference Manual',
      description: 'PDF — 6 pages, printable, step-by-step',
      icon: '📖',
      accent: 'rose' as const,
      buttonLabel: 'Open PDF Guide',
      href: links.pdf.url,
      features: [
        '5-step monthly setup process',
        'CRM export guides for Zendesk, Freshdesk, HubSpot',
        'KPI definitions and weighting rationale',
        'Team rollout script — word for word',
        'Troubleshooting for 6 common issues',
        'Printable monthly checklist',
      ],
    },
  ]

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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/35 text-yellow-300 font-mono text-[11px] tracking-widest px-4 py-1.5 rounded-full mb-7 animate-fade-up">
            <span className="text-[9px]">✦</span>
            PRODUCT HUB — EXCLUSIVE ACCESS
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
            <p className="font-mono text-[10px] tracking-[0.12em] text-yellow-300 mb-2">WELCOME MESSAGE</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Welcome — and congratulations on taking this step. Inside this hub you&apos;ll find everything
              you need to run a complete monthly recognition cycle for your CX team.{' '}
              <strong className="text-white font-medium">Great work deserves to be seen.</strong> This system
              makes sure it is.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-ink hover:opacity-90 active:scale-[.98] transition-all"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Explore Features →
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white border border-white/20 hover:bg-white/10 active:scale-[.98] transition-all"
            >
              Access Resources
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

      {/* ── Deliverables ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-14" aria-label="Deliverables">
        <SectionHeader label="Your Deliverables" />
        <div className="flex flex-col gap-5">
          {deliverables.map((d) => (
            <ResourceCard key={d.title} {...d} />
          ))}
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <section
        className="py-10 px-6"
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
