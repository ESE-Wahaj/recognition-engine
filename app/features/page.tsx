import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ResourceCard } from '@/components/ResourceCard'
import { StepAccordion } from '@/components/StepAccordion'
import { readLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore all three Recognition Engine deliverables: the Google Sheets performance dashboard, Canva template kit, and PDF setup guide.',
  openGraph: {
    title: 'Features — The Recognition Engine',
    description: 'Three deliverables, one complete recognition system.',
  },
}

export default async function FeaturesPage() {
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
        'Best Performer of the Month — flagship announcement',
        'Top 3 Leaderboard — for meetings and screens',
        'Most Improved Agent — celebrates growth',
        'Monthly Team Scorecard — one-pager for leadership',
        'Team of the Month — for multi-team environments',
        'Annual Champion — the highest year-end honour',
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

  const steps = [
    {
      num: 1,
      title: 'Update Settings Tab',
      time: '~2 min',
      body: (
        <div className="space-y-3">
          <p className="text-sm text-ink-soft leading-relaxed">
            Open the <strong>⚙️ Settings</strong> tab in Google Sheets and update the following at the
            start of each month:
          </p>
          <ul className="space-y-1.5">
            {[
              'Reporting Month — e.g. "May 2025"',
              'Team Name & Manager Name — shown on all output tabs and Canva cards',
              'KPI Weights — must total 100%. Leave at default for your first cycle.',
              'Performance Thresholds — Green ≥ 80%, Amber 60–79%, Red < 60% by default',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="text-gold text-xs mt-1">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border-l-4 border-gold px-4 py-3 rounded-r-lg text-sm text-gold-dark mt-3">
            💡 Don&apos;t change KPI weights until you&apos;ve run at least one full month. See how the scores
            land first.
          </div>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Pull Your Data From the CRM',
      time: '~10 min',
      body: (
        <div className="space-y-3">
          <p className="text-sm text-ink-soft leading-relaxed">
            Export or note these 5 metrics per agent. You only need one month of data to start.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-ink text-white">
                  <th className="text-left p-2.5 font-medium rounded-tl-lg">KPI</th>
                  <th className="text-left p-2.5 font-medium">Weight</th>
                  <th className="text-left p-2.5 font-medium">Where to find it</th>
                  <th className="text-left p-2.5 font-medium rounded-tr-lg">Enter as</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CSAT Score', '35%', 'Reports → Customer Satisfaction', '87 (not 87%)'],
                  ['Tickets Resolved', '20%', 'Reports → Tickets Closed / Volume', '148'],
                  ['First Contact Resolution', '20%', 'FCR Rate or Resolution Rate report', '82 (not 82%)'],
                  ['Avg Handle Time', '15%', 'AHT — convert seconds to minutes', '6.5 minutes'],
                  ['Attendance Rate', '10%', 'HR system or shift scheduler', '96 (not 96%)'],
                ].map(([kpi, weight, where, enter]) => (
                  <tr key={kpi} className="border-b border-border-base even:bg-surface">
                    <td className="p-2.5 font-medium text-ink">{kpi}</td>
                    <td className="p-2.5 font-mono font-semibold text-gold-dark">{weight}</td>
                    <td className="p-2.5 text-mist">{where}</td>
                    <td className="p-2.5 text-ink-soft">{enter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border-l-4 border-gold px-4 py-3 rounded-r-lg text-sm text-gold-dark">
            💡 Also pull last month&apos;s CSAT and Tickets per agent — needed for the Most Improved tracker.
          </div>
        </div>
      ),
    },
    {
      num: 3,
      title: 'Paste Into the Data Input Tab',
      time: '~5 min',
      body: (
        <div className="space-y-3">
          <ul className="space-y-1.5">
            {[
              'Go to 📋 Data Input',
              'Enter agent names in Column B',
              'Paste KPI values into the yellow cells (Columns C–G)',
              'Enter last month\'s data in the light blue cells (Columns H–I)',
              'The dark blue Weighted Score column calculates automatically — never edit it',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="text-gold text-xs mt-1">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border-l-4 border-gold px-4 py-3 rounded-r-lg text-sm text-gold-dark">
            💡 If an agent was on leave all month, leave their row blank. The formulas handle empty rows
            without errors.
          </div>
        </div>
      ),
    },
    {
      num: 4,
      title: 'Review the Leaderboard & Scorecard',
      time: '~2 min',
      body: (
        <div className="space-y-3">
          <ul className="space-y-1.5">
            {[
              'Go to 🏆 Leaderboard — rankings are already sorted highest to lowest',
              'Top 3 agents automatically receive 🥇 🥈 🥉 medals',
              'Check Most Improved highlight at the bottom of the leaderboard tab',
              'Go to 📋 Monthly Scorecard for the leadership summary — this is your QBR slide',
              'Check the RAG distribution: how many agents are Green / Amber / Red this month?',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="text-gold text-xs mt-1">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 px-4 py-3 rounded-r-lg text-sm text-emerald-800 font-medium">
            🔒 The full ranking is for your eyes only as manager. Only the Top 3 and Most Improved are
            announced publicly.
          </div>
        </div>
      ),
    },
    {
      num: 5,
      title: 'Announce & Celebrate',
      time: '~5 min',
      body: (
        <div className="space-y-3">
          <ul className="space-y-1.5">
            {[
              'Open the Canva Template Kit — select the relevant card',
              'Update the winner\'s name, their standout stat, and the reporting month',
              'Download as PNG (for Slack/WhatsApp/Teams) or PDF (for printing)',
              'Post the announcement — tag the winner if your platform supports it',
              'Share the Monthly Scorecard slide with leadership separately',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="text-gold text-xs mt-1">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border-l-4 border-gold px-4 py-3 rounded-r-lg text-sm text-gold-dark">
            💡 Announce within 48 hours of month-end. Recognition loses its impact when delayed. Friday
            afternoons have the highest team engagement.
          </div>
        </div>
      ),
    },
  ]

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Features page header"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Features
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Everything You Need,{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Nothing You Don&apos;t
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light">
            Three deliverables. One complete recognition cycle. Ready to use on day one.
          </p>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-14" aria-label="Deliverables">
        <SectionHeader label="Your Deliverables" />
        <div className="flex flex-col gap-5">
          {deliverables.map((d) => (
            <ResourceCard key={d.title} {...d} />
          ))}
        </div>
      </section>

      {/* ── Monthly Process ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="Monthly process">
        <SectionHeader label="Monthly Process — 5 Steps" />
        <StepAccordion steps={steps} />
      </section>
    </>
  )
}
