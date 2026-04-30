import { Influencer } from '@/types'
import { ScoreBadge } from './ScoreBadge'
import { NicheBadge } from './NicheBadge'
import { AtSign, BriefcaseBusiness, Camera, ExternalLink, Play, Video } from 'lucide-react'

const PLATFORM_ICONS = {
  instagram: Camera,
  tiktok: Video,
  youtube: Play,
  twitter: AtSign,
  linkedin: BriefcaseBusiness,
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const AVATAR_COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#14B8A6', '#F59E0B', '#22C55E']

interface InfluencerCardProps {
  influencer: Influencer
  index: number
}

export function InfluencerCard({ influencer, index }: InfluencerCardProps) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length]
  const Icon = PLATFORM_ICONS[influencer.platform] ?? Camera

  return (
    <div
      className="animate-in"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'default',
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'both',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-glow)'
        el.style.boxShadow = '0 0 24px rgba(139,92,246,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-default)'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              background: avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              flexShrink: 0,
            }}
          >
            {getInitials(influencer.name)}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
              {influencer.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              @{influencer.handle}
            </div>
          </div>
        </div>
        <ScoreBadge score={influencer.matchScore} />
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <NicheBadge niche={influencer.niche} />
        <span
          style={{
            fontSize: '11px',
            padding: '3px 9px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            textTransform: 'capitalize',
          }}
        >
          <Icon size={12} />
          {influencer.platform}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          padding: '14px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Followers</div>
          <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {formatFollowers(influencer.followers)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Engagement</div>
          <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {influencer.engagementRate}%
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{influencer.location}</div>

      <a
        href={influencer.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: '9px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
          background: 'transparent',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.borderColor = 'var(--accent-primary)'
          el.style.color = 'var(--accent-primary)'
          el.style.background = 'var(--accent-glow)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.borderColor = 'var(--border-default)'
          el.style.color = 'var(--text-secondary)'
          el.style.background = 'transparent'
        }}
      >
        <ExternalLink size={13} />
        Voir le profil
      </a>
    </div>
  )
}
