interface StatsRowProps {
  stats: {
    totalFound: number
    avgEngagement: number
    totalReach: number
    topScore: number
  }
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

const STATS = (stats: StatsRowProps['stats']) => [
  { label: 'Influenceurs trouvés', value: stats.totalFound.toString(), featured: false },
  { label: 'Engagement moyen', value: `${stats.avgEngagement}%`, featured: false },
  { label: 'Reach total', value: formatNumber(stats.totalReach), featured: false },
  { label: 'Meilleur score', value: `${stats.topScore}%`, featured: true },
]

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '32px',
      }}
    >
      {STATS(stats).map(({ label, value, featured }) => (
        <div
          key={label}
          style={{
            background: featured
              ? 'linear-gradient(160deg, rgba(139,92,246,0.1) 0%, var(--bg-surface) 60%)'
              : 'var(--bg-surface)',
            border: featured ? '1px solid rgba(139,92,246,0.3)' : '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{label}</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: featured ? 'var(--accent-primary)' : 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}
