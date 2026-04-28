import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Recognition Engine team. Questions, feedback, or support — we read every message.',
  openGraph: {
    title: 'Contact — The Recognition Engine',
    description: 'Get in touch — we read every message.',
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
    a: "Google Sheets is fully accessible on mobile. The Canva templates are web-based and also work on mobile. For the best experience when reviewing data and rankings, a laptop or desktop is recommended.",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0D0D14 0%, #1A1A2E 100%)' }}
        aria-label="Contact page header"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.14em] text-yellow-300/80 mb-4 uppercase">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            We&apos;d Love to{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #C9952A 0%, #E8B84B 50%, #C9952A 100%)' }}
            >
              Hear From You
            </span>
          </h1>
          <p className="text-white/55 text-lg font-light">
            Questions, feedback, or just want to share how your first recognition cycle went?
          </p>
        </div>
      </section>

      {/* ── Contact Form ──────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12" aria-label="Contact form">
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
              <div key={label} className="flex items-start gap-3 p-4 bg-white border border-border-base rounded-xl">
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

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-14" aria-label="FAQ">
        <SectionHeader label="Frequently Asked Questions" />
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="bg-white border border-border-base rounded-xl group overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-sm text-ink hover:bg-surface transition-colors">
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
    </>
  )
}
