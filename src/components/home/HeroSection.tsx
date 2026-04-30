import { Search, Zap, Target, TrendingUp } from 'lucide-react'
import { UrlForm } from './UrlForm'

export function HeroSection() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: '640px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-glow)',
            background: 'var(--accent-glow)',
            fontSize: '12px',
            color: 'var(--accent-primary)',
            marginBottom: '24px',
            fontWeight: 500,
          }}
        >
          <Zap size={12} />
          Matching IA — Résultats en 10 secondes
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          Trouve les influenceurs <span style={{ color: 'var(--accent-primary)' }}>qui matchent</span> ta marque
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          Entre l&apos;URL de ton site. Notre IA détecte ta niche et trouve instantanément les créateurs de contenu les
          plus pertinents pour toi.
        </p>

        <UrlForm />

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: Search, text: 'Analyse IA du contenu' },
            { icon: Target, text: 'Score de pertinence' },
            { icon: TrendingUp, text: '+500 influenceurs indexés' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <Icon size={12} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
