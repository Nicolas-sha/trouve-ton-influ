'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Globe, Sparkles } from 'lucide-react'
import { AnalysisResult } from '@/types'
import { StatsRow } from '@/components/results/StatsRow'
import { InfluencerGrid } from '@/components/results/InfluencerGrid'

function subscribe() {
  return () => {}
}

export default function ResultsPage() {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false)
  const router = useRouter()

  const results = useMemo((): AnalysisResult | null => {
    if (!isClient) return null

    try {
      const raw = sessionStorage.getItem('tti-results')
      if (raw) return JSON.parse(raw) as AnalysisResult
    } catch {
      // no-op
    }
    return null
  }, [isClient])

  if (!isClient) {
    return (
      <div style={{ padding: '40px', maxWidth: '1100px' }}>
        <div style={{ marginTop: '100px' }}>
          <InfluencerGrid influencers={[]} loading />
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div
        style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          gap: '16px',
        }}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Aucune analyse en cours.</p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-gradient)',
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Lancer une analyse
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px' }}>
      <button
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          background: 'transparent',
          border: 'none',
          fontSize: '13px',
          cursor: 'pointer',
          marginBottom: '32px',
          padding: 0,
        }}
      >
        <ArrowLeft size={14} /> Nouvelle analyse
      </button>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Globe size={14} color="var(--text-tertiary)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-tertiary)' }}>
            {results.url}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Résultats pour <span style={{ color: 'var(--accent-primary)' }}>{results.detectedNiche}</span>
          </h1>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-glow)',
              color: 'var(--accent-primary)',
              fontWeight: 500,
            }}
          >
            <Sparkles size={11} />
            {results.confidence}% confiance
          </span>
        </div>

        {results.nicheKeywords.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
            {results.nicheKeywords.map((kw) => (
              <span
                key={kw}
                style={{
                  fontSize: '11px',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <StatsRow stats={results.stats} />

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Influenceurs recommandés
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          {results.influencers.length} résultats
        </span>
      </div>

      <InfluencerGrid influencers={results.influencers} />
    </div>
  )
}
