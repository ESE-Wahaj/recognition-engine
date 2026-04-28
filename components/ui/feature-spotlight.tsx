'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ShinyButton } from '@/components/ui/shiny-button'

interface AnimatedFeatureSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  preheaderIcon?: React.ReactNode
  preheaderText: string
  heading: React.ReactNode
  description: string
  buttonText: string
  buttonHref?: string
  imageUrl: string
  imageAlt?: string
}

const AnimatedFeatureSpotlight = React.forwardRef<HTMLElement, AnimatedFeatureSpotlightProps>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttonText,
      buttonHref,
      imageUrl,
      imageAlt = 'Feature illustration',
      ...props
    },
    ref
  ) => {
    const buttonElement = <ShinyButton>{buttonText}</ShinyButton>

    const buttonContent = buttonHref ? (
      <Link href={buttonHref}>
        {buttonElement}
      </Link>
    ) : (
      buttonElement
    )
    return (
      <>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
        <section
          ref={ref}
          className={cn(
            'w-full max-w-6xl mx-auto p-8 md:p-12 rounded-3xl bg-white border border-border-base overflow-hidden',
            className
          )}
          aria-labelledby="feature-spotlight-heading"
          {...props}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Animated Text Content */}
            <div className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start">
              <div className="flex items-center space-x-2 text-sm font-medium text-mist animate-in fade-in slide-in-from-top-4 duration-700">
                {preheaderIcon}
                <span>{preheaderText}</span>
              </div>
              <h2
                id="feature-spotlight-heading"
                className="text-4xl lg:text-5xl font-bold tracking-tight text-ink animate-in fade-in slide-in-from-top-4 duration-700 delay-150"
              >
                {heading}
              </h2>
              <p className="text-lg text-mist leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
                {description}
              </p>
              <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-400">
                {buttonContent}
              </div>
            </div>

            {/* Right Column: Animated Visual */}
            <div className="relative w-full min-h-[250px] md:min-h-[320px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 delay-200">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full max-w-md object-contain animate-float"
              />
            </div>
          </div>
        </section>
      </>
    )
  }
)
AnimatedFeatureSpotlight.displayName = 'AnimatedFeatureSpotlight'

export { AnimatedFeatureSpotlight }
