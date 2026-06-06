import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MissionCard } from '@/components/ui/mission-card'
import { AnimatedFeatureSpotlight } from '@/components/ui/feature-spotlight'
import { ResourceCard } from '@/components/ResourceCard'
import { StepAccordion } from '@/components/StepAccordion'
import { ChecklistGrid } from '@/components/ChecklistGrid'
import { ContactForm } from '@/components/ContactForm'
import { ShinyButton } from '@/components/ui/shiny-button'
import { Footer } from '@/components/Footer'
import { SiteDock } from '@/components/SiteDock'
import { readLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: {
    absolute: 'The Recognition Engine — CX Team Performance & Recognition',
  },
  description:
    'A complete monthly recognition system for CX teams. Rank agents, celebrate wins, and drive improvement — with one Google Sheet, six Canva templates, and a clear process.',
  openGraph: {
    title: 'The Recognition Engine',
    description: 'CX Team Performance & Recognition Dashboard',
  },
}

const faqs = [
  {
    q: 'How many agents can the tracker support?',
    a: 'Out of the box, the Google Sheet supports up to 25 agents. You can extend it by adding rows — the formulas use named ranges and will scale with minimal adjustments.',
  },
  {
    q: "Can I change the KPI weights to match my team's priorities?",
    a: 'Yes. The Settings tab has a dedicated weights section. Just ensure the weights always total 100%. We recommend running at least one full month with the defaults before making changes.',
  },
  {
    q: 'What if an agent was on leave for the whole month?',
    a: "Leave their row blank in the Data Input tab. The leaderboard formulas handle empty rows gracefully — they won't show up in the rankings or skew the Most Improved calculation.",
  },
  {
    q: 'Can I use this with multiple teams?',
    a: "Yes. Create a separate copy of the Google Sheet for each team. The Canva 'Team of the Month' template is designed for managers who want to celebrate across multiple teams.",
  },
  {
    q: 'Does this work with any CRM?',
    a: "Yes. The PDF guide includes export instructions for Zendesk, Freshdesk, and HubSpot. For any other platform, you need the five KPI values per agent — the system doesn't care where they come from.",
  },
  {
    q: 'Is there a mobile version of the tracker?',
    a: 'Google Sheets is fully accessible on mobile. The Canva templates are web-based and also work on mobile. For the best experience when reviewing data and rankings, a laptop or desktop is recommended.',
  },
]

export default async function HomePage() {
  const links = await readLinks()

  const deliverables = [
    {
      number: 'DELIVERABLE 01',
      title: 'Performance Dashboard',
      description: 'Google Sheets — 5 tabs, 218 live formulas',
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
              "Enter last month's data in the light blue cells (Columns H–I)",
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
              "Update the winner's name, their standout stat, and the reporting month",
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

  const checklistSections = [
    {
      title: 'Setup',
      items: [
        'Reporting month updated in Settings',
        'Team name & manager name confirmed',
        'KPI weights reviewed (total = 100%)',
      ],
    },
    {
      title: 'Data',
      items: [
        'All agent names in Column B',
        'All 5 KPIs in yellow cells',
        'Previous month data in blue cells',
        'No errors in Weighted Score column',
      ],
    },
    {
      title: 'Review',
      items: [
        'Top 3 verified against CRM',
        'Most Improved agent confirmed',
        'Scorecard shared with leadership',
      ],
    },
    {
      title: 'Announce',
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
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden text-center py-20 px-6"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Hero section"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(201,149,42,.13) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(26,107,107,.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="shimmer-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 animate-fade-up border border-transparent">
            <span className="text-[9px]">✦</span>
            <span className="font-mono text-[11px] tracking-widest text-yellow-300">
              PRODUCT HUB — EXCLUSIVE ACCESS
            </span>
          </div>

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

          <div className="bg-white/6 border border-white/10 rounded-xl p-6 text-left mb-10">
            <p className="font-mono text-[10px] tracking-[0.12em] text-yellow-300 mb-2">Greetings</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Welcome — and congratulations on taking this step. Inside this hub you&apos;ll find everything
              you need to run a complete monthly recognition cycle for your CX team.{' '}
              <strong className="text-white font-medium">Great work deserves to be seen.</strong> This system
              makes sure it is.
            </p>
          </div>

           <div className="flex flex-wrap gap-3 justify-center">
            <a href="#features" className="inline-flex">
              <ShinyButton colorScheme="gold">Explore Features →</ShinyButton>
            </a>
            <a href="#resources" className="inline-flex">
              <ShinyButton colorScheme="teal">Access Resources</ShinyButton>
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
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

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="About"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Built on a Simple{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Philosophy
            </span>
          </h2>
          <p className="text-white/55 text-lg font-light">
            Recognition without fairness is noise. Fairness without recognition is invisible. The
            Recognition Engine brings both together.
          </p>
        </div>
      </section>

      {/* Golden Rule */}
      <div className="w-full px-6 py-14 bg-gradient-to-b from-white to-gray-50">
        <AnimatedFeatureSpotlight
          preheaderIcon={<span>✦</span>}
          preheaderText="THE GOLDEN RULE OF THIS SYSTEM"
          heading={
            <>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
              >
                Public Recognition.
              </span>{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #c41e3a 0%, #e8597b 100%)' }}
              >
                Private Coaching.
              </span>{' '}
              Always.
            </>
          }
          description="Share wins publicly to celebrate and motivate. Keep challenges private to coach with care. This balance builds trust, drives performance, and creates a culture where everyone feels seen."
          buttonText="Explore Features →"
          buttonHref="#features"
          imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80"
          imageAlt="Team collaboration and recognition"
        />
      </div>

      {/* Mission */}
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
                title: 'Data-Driven Fairness',
                body: 'Rankings are calculated from weighted KPIs — CSAT, FCR, volume, handle time, and attendance. No subjectivity. No favouritism. Just data.',
                accent: 'gold' as const,
              },
              {
                title: 'Celebrating Growth',
                body: 'The Most Improved metric ensures you recognise effort and progress, not just peak performance. Every agent has a path to the spotlight.',
                accent: 'teal' as const,
              },
              {
                title: 'Psychological Safety',
                body: 'Scores stay private. Only the positives go public. This creates a team culture where agents feel motivated to improve, not fearful of exposure.',
                accent: 'rose' as const,
              },
            ].map(({ title, body, accent }) => (
              <MissionCard key={title} title={title} body={body} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
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

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Features"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Features
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Everything You Need,{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Nothing You Don&apos;t
            </span>
          </h2>
          <p className="text-white/55 text-lg font-light">
            Three deliverables. One complete recognition cycle. Ready to use on day one.
          </p>
        </div>
      </section>

      {/* Deliverables + Monthly Process — shared gradient canvas */}
      <div
        style={{
          background:
            'linear-gradient(160deg, #f2e0a6 0%, #f7f7fa 45%, #faeee3 75%, #f5e8d0 100%)',
        }}
      >
        {/* Deliverables */}
        <section className="max-w-5xl mx-auto px-6 py-14" aria-label="Deliverables">
          <SectionHeader label="Your Deliverables" />
          <div className="flex flex-col gap-5">
            {deliverables.map((d) => (
              <ResourceCard key={d.title} {...d} />
            ))}
          </div>
        </section>

        {/* Monthly Process */}
        <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="Monthly process">
          <SectionHeader label="Monthly Process — 5 Steps" />
          <StepAccordion steps={steps} />
        </section>
      </div>

      {/* ── RESOURCES ────────────────────────────────────────────────── */}
      <section
        id="resources"
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Resources"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Resources
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Everything You Need,{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              In One Place
            </span>
          </h2>
          <p className="text-white/55 text-lg font-light">
            Your three deliverables, ready to open. Plus a monthly checklist to keep you on track.
          </p>
        </div>
      </section>

      {/* Quick Start Banner */}
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

      {/* Quick Access Buttons */}
      <section
        className="w-full px-6 py-8"
        aria-label="Quick access"
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

      {/* Monthly Checklist */}
      <section className="max-w-5xl mx-auto px-6 py-14" aria-label="Monthly checklist">
        <SectionHeader label="Monthly Checklist — Click to Check Off" />
        <ChecklistGrid sections={checklistSections} />
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Contact"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            We&apos;d Love to{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Hear From You
            </span>
          </h2>
          <p className="text-white/55 text-lg font-light">
            Questions, feedback, or just want to share how your first recognition cycle went?
          </p>
        </div>
      </section>

      {/* Contact form + FAQ — shared gradient canvas */}
      <div
        className="pb-8"
        style={{
          background:
            'linear-gradient(140deg, #eeddf5 0%, #f7f7fa 38%, #fddede 72%, #f2e4b2 100%)',
        }}
      >
        {/* Contact form + Quick info */}
        <section
          className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12"
          aria-label="Contact form"
        >
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-3">Send a Message</h2>
            <p className="text-mist text-sm leading-relaxed mb-6">
              Fill in the form and we&apos;ll get back to you within one business day. For urgent setup
              issues, check the FAQ below first — most common questions are answered there.
            </p>
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-6">Quick Info</h2>
            <div className="space-y-4">
              {[
                { icon: '⚡', label: 'Response Time', value: 'Within 1 business day' },
                { icon: '📖', label: 'Setup Support', value: 'Covered in the PDF guide' },
                { icon: '🔒', label: 'Privacy', value: 'We never share your data' },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm border border-border-base rounded-xl"
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-sm text-mist">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="FAQ">
          <SectionHeader label="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="bg-white/70 backdrop-blur-sm border border-border-base rounded-xl group overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-sm text-ink hover:bg-white/60 transition-colors">
                  {q}
                  <svg
                    className="w-4 h-4 text-mist flex-shrink-0 transition-transform group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-3 border-t border-border-base">
                  <p className="text-sm text-mist leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <Footer />
      <SiteDock />
    </>
  )
}
