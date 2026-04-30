import { Influencer } from '@/types'
import { InfluencerCard } from './InfluencerCard'
import { SkeletonCard } from '@/components/shared/SkeletonCard'

interface InfluencerGridProps {
  influencers: Influencer[]
  loading?: boolean
}

export function InfluencerGrid({ influencers, loading = false }: InfluencerGridProps) {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
      }}
    >
      {influencers.map((influencer, i) => (
        <InfluencerCard key={influencer.id} influencer={influencer} index={i} />
      ))}
    </div>
  )
}
