import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ChecklistGrid } from '@/components/ChecklistGrid'
import { GlowCard } from '@/components/ui/spotlight-card'
import { ShinyButton } from '@/components/ui/shiny-button'
import { readLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Access the Google Sheets performance tracker, Canva template kit, and PDF guide. Plus your printable monthly checklist.',
  openGraph: {
    title: 'Resources — The Recognition Engine',
    description: 'Your three deliverables, ready to go.',
  },
}

export default async function ResourcesPage() {
  const links = readLinks()

  const resources = [
    {
      key: 'sheets',
      icon: '📊',
      label: 'DELIVERABLE 01',
      title: 'Performance Dashboard',
      description:
        'Your core tool. Enter agent data and instantly see ranked leaderboards, RAG status, and a leadership-ready scorecard.',
      href: links.sheets.url,
      buttonLabel: 'Open Google Sheets →',
      color: 'gold',
    },
    {
      key: 'canva',
      icon: '🎨',
      label: 'DELIVERABLE 02',
      title: 'Canva Template Kit',
      description:
        'Six ready-to-edit announcement graphics. Update a name, download as PNG, and post — all in under 5 minutes.',
      href: links.canva.url,
      buttonLabel: 'Open Canva Kit →',
      color: 'teal',
    },
    {
      key: 'pdf',
      icon: '📖',
      label: 'DELIVERABLE 03',
      title: "Manager's PDF Guide",
      description:
        'The printable reference manual. CRM export guides, KPI definitions, rollout script, and troubleshooting — all in 6 pages.',
      href: links.pdf.url,
      buttonLabel: 'Open PDF Guide →',
      color: 'rose',
    },
  ]

  const checklistSections = [
    {
      title: '⚙️ Setup',
      items: [
        'Reporting month updated in Settings',
        'Team name & manager name confirmed',
        'KPI weights reviewed (total = 100%)',
      ],
    },
    {
      title: '📋 Data',
      items: [
        'All agent names in Column B',
        'All 5 KPIs in yellow cells',
        'Previous month data in blue cells',
        'No errors in Weighted Score column',
      ],
    },
    {
      title: '🔍 Review',
      items: [
        'Top 3 verified against CRM',
        'Most Improved agent confirmed',
        'Scorecard shared with leadership',
      ],
    },
    {
      title: '📣 Announce',
      items: [
        'Best Performer card updated & posted',
        'Most Improved card updated & posted',
        'Announced within 48 hrs of month-end',
        '1:1 coaching booked for anyone in Red',
      ],
    },
  ]

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Resources page header"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Resources
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Your{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Three Deliverables
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light">
            Access everything you need to run your first recognition cycle today.
          </p>
        </div>
      </section>

      {/* ── Resource Cards ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-14" aria-label="Resource links">
        <SectionHeader label="Access Your Resources" />
        <div className="flex flex-col gap-4">
          {resources.map((r) => (
            <GlowCard
              key={r.key}
              glowColor={r.color === 'gold' ? 'gold' : r.color === 'teal' ? 'green' : 'rose'}
              className="p-6 flex flex-col sm:flex-row sm:items-center gap-5"
            >
              <div className="flex items-center gap-4 flex-1 relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                    r.color === 'gold'
                      ? 'bg-gold/20'
                      : r.color === 'teal'
                      ? 'bg-teal/20'
                      : 'bg-rose/20'
                  }`}
                >
                  {r.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] text-gray-500 mb-0.5">{r.label}</p>
                  <h3 className="font-display text-xl font-bold text-ink mb-1">{r.title}</h3>
                  <p className="text-sm text-mist leading-relaxed">{r.description}</p>
                </div>
              </div>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex-shrink-0"
              >
                <ShinyButton 
                  colorScheme={r.color === 'gold' ? 'gold' : r.color === 'teal' ? 'teal' : 'rose'}
                  className="text-sm"
                >
                  {r.buttonLabel}
                </ShinyButton>
              </a>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ── Monthly Checklist ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="Monthly checklist">
        <SectionHeader label="Monthly Checklist — Click to Check Off" />
        <ChecklistGrid sections={checklistSections} />
      </section>
    </>
  )
}
