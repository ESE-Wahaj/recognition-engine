interface SectionHeaderProps {
  label: string
  className?: string
}

export function SectionHeader({ label, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      <div className="flex-1 h-px bg-border-base" />
      <span className="font-mono text-[10px] tracking-[0.14em] text-mist whitespace-nowrap uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-border-base" />
    </div>
  )
}
