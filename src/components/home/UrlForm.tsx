'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Zap } from 'lucide-react'
import { AnalyzeResponse } from '@/types'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function UrlForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleAnalyze() {
    if (!url.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = (await res.json()) as AnalyzeResponse

      if (!res.ok || !data.success || !data.data) {
        throw new Error(data.error || 'Analyse échouée')
      }

      sessionStorage.setItem('tti-results', JSON.stringify(data.data))
      router.push('/results')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: error ? '12px' : '28px',
          background: 'var(--bg-surface)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '6px',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, padding: '0 12px' }}>
          <Search size={16} color="var(--text-tertiary)" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void handleAnalyze()}
            placeholder="https://monsupersite.com"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          />
        </div>

        <button
          onClick={() => void handleAnalyze()}
          disabled={loading || !url.trim()}
          style={{
            padding: '10px 20px',
            background: loading ? 'var(--bg-subtle)' : 'var(--accent-gradient)',
            color: loading ? 'var(--text-tertiary)' : 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
            boxShadow: loading ? 'none' : '0 0 16px rgba(139,92,246,0.3)',
          }}
        >
          {loading ? (
            <>
              <LoadingSpinner size={14} />
              Analyse...
            </>
          ) : (
            <>
              <Zap size={14} />
              Analyser
            </>
          )}
        </button>
      </div>

      {error && <p style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
    </>
  )
}
