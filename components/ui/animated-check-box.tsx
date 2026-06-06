'use client'

import React, { InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'

interface NeonCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
}

export const NeonCheckbox: React.FC<NeonCheckboxProps> = ({
  label,
  className = '',
  checked: controlledChecked,
  defaultChecked,
  onChange,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false)
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked)
    onChange?.(e)
  }

  const neonVars = {
    '--primary': '#00ffaa',
    '--primary-dark': '#00cc88',
    '--primary-light': '#88ffdd',
    '--size': '22px',
  } as React.CSSProperties

  return (
    <label
      className={cn('relative inline-block w-[var(--size)] h-[var(--size)] cursor-pointer flex-shrink-0', className)}
      style={neonVars}
    >
      <input type="checkbox" className="hidden" checked={isChecked} onChange={handleChange} {...props} />

      <div className="relative w-full h-full">
        {/* Box */}
        <div
          className={cn(
            'absolute inset-0 bg-black/80 rounded border-2 transition-all duration-300',
            isChecked
              ? 'border-[var(--primary)] bg-[rgba(0,255,170,0.08)]'
              : 'border-[var(--primary-dark)]'
          )}
        >
          {/* Checkmark */}
          <div className="absolute inset-[2px] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={cn(
                'w-4/5 h-4/5 fill-none stroke-[var(--primary)] stroke-[3] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:40] origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isChecked ? '[stroke-dashoffset:0] scale-110' : '[stroke-dashoffset:40]'
              )}
            >
              <path d="M3,12.5l7,7L21,5" />
            </svg>
          </div>

          {/* Glow */}
          <div
            className={cn(
              'absolute -inset-0.5 rounded-md bg-[var(--primary)] blur-md transition-opacity duration-300',
              isChecked ? 'opacity-15' : 'opacity-0'
            )}
          />

          {/* Running border lines */}
          <div className="absolute inset-0 rounded overflow-hidden">
            {(['borderFlow1', 'borderFlow2', 'borderFlow3', 'borderFlow4'] as const).map((anim, i) => (
              <span
                key={i}
                className={cn(
                  'absolute bg-[var(--primary)] transition-opacity duration-300',
                  isChecked ? 'opacity-100' : 'opacity-0',
                  i === 0 && 'top-0 left-[-100%] w-10 h-px animate-[borderFlow1_2s_linear_infinite]',
                  i === 1 && 'top-[-100%] right-0 w-px h-10 animate-[borderFlow2_2s_linear_infinite]',
                  i === 2 && 'bottom-0 right-[-100%] w-10 h-px animate-[borderFlow3_2s_linear_infinite]',
                  i === 3 && 'bottom-[-100%] left-0 w-px h-10 animate-[borderFlow4_2s_linear_infinite]'
                )}
              />
            ))}
          </div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0">
          {[
            ['25px', '-25px'], ['-25px', '-25px'], ['25px', '25px'], ['-25px', '25px'],
            ['35px', '0px'],   ['-35px', '0px'],   ['0px', '35px'],  ['0px', '-35px'],
            ['20px', '-30px'], ['-20px', '30px'],   ['30px', '20px'], ['-30px', '-20px'],
          ].map(([x, y], i) => (
            <span
              key={i}
              className={cn(
                'absolute w-1 h-1 bg-[var(--primary)] rounded-full pointer-events-none top-1/2 left-1/2 shadow-[0_0_6px_var(--primary)]',
                isChecked ? 'animate-[particleExplosion_0.6s_ease-out_forwards]' : 'opacity-0'
              )}
              style={{ '--x': x, '--y': y } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Rings */}
        <div className="absolute -inset-4 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'absolute inset-0 rounded-full border border-[var(--primary)] scale-0',
                isChecked ? 'animate-[ringPulse_0.6s_ease-out_forwards]' : 'opacity-0'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Sparks */}
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                'absolute w-5 h-px bg-gradient-to-r from-[var(--primary)] to-transparent top-1/2 left-1/2',
                isChecked ? 'animate-[sparkFlash_0.6s_ease-out_forwards]' : 'opacity-0'
              )}
              style={{ '--r': `${i * 90}deg` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {label && <span className="ml-8 text-white">{label}</span>}
    </label>
  )
}
