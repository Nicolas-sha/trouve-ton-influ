interface NicheBadgeProps {
  niche: string
}

export function NicheBadge({ niche }: NicheBadgeProps) {
  return (
    <span
      style={{
        fontSize: '11px',
        padding: '3px 9px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--accent-glow)',
        color: 'var(--accent-primary)',
        fontWeight: 500,
      }}
    >
      {niche}
    </span>
  )
}
