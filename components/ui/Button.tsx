'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'teal' | 'rose'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const sizes: Record<string, string> = {
      sm: 'text-xs px-3 py-2',
      md: 'text-sm px-5 py-2.5',
      lg: 'text-base px-7 py-3',
    }

    const variants: Record<string, string> = {
      primary: 'bg-gold-grad text-ink hover:opacity-90 active:scale-[.98]',
      secondary: 'border border-border-base text-ink-soft hover:bg-surface active:scale-[.98]',
      ghost: 'text-mist hover:text-ink hover:bg-surface active:scale-[.98]',
      gold: 'bg-ink text-white hover:opacity-90 active:scale-[.98]',
      teal: 'bg-teal text-white hover:opacity-90 active:scale-[.98]',
      rose: 'bg-rose text-white hover:opacity-90 active:scale-[.98]',
    }

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
