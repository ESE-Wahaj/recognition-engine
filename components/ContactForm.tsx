'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800))
    console.info('Contact form submitted', data)
    setSent(true)
    reset()
  }

  if (sent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="font-display text-lg font-bold text-emerald-800 mb-1">Message Sent</h3>
        <p className="text-sm text-emerald-700">We&apos;ll get back to you within one business day.</p>
        <button
          className="mt-4 text-sm text-emerald-600 underline hover:no-underline"
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-ink placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all ${
            errors.name ? 'border-rose' : 'border-border-base'
          }`}
          placeholder="Your full name"
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-rose">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-ink placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all ${
            errors.email ? 'border-rose' : 'border-border-base'
          }`}
          placeholder="you@example.com"
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-rose">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-ink placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none ${
            errors.message ? 'border-rose' : 'border-border-base'
          }`}
          placeholder="How can we help you?"
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-rose">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" loading={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending…' : 'Send Message →'}
      </Button>
    </form>
  )
}
