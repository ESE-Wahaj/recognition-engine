import { type HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = true, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-white border border-border-base rounded-2xl overflow-hidden ${
        hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'
