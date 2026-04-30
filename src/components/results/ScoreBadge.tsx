interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md'
}

export function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const color = score >= 75 ? 'var(--success)' : score >= 50 ? 'var(--warning)' : 'var(--danger)'
  const bg = score >= 75 ? 'rgba(34,197,94,0.12)' : score >= 50 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)'

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: size === 'sm' ? '11px' : '13px',
        fontWeight: 600,
        color,
        background: bg,
        padding: size === 'sm' ? '2px 7px' : '3px 10px',
        borderRadius: 'var(--radius-full)',
      }}
    >
      {score}%
    </span>
  )
}
