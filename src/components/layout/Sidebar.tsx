'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, BarChart2, History, Zap } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { href: '/', icon: Search, label: 'Recherche' },
  { href: '/results', icon: BarChart2, label: 'Résultats', disabled: false },
  { href: '/history', icon: History, label: 'Historique', disabled: true },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '240px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        padding: '24px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'var(--accent-gradient)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap size={16} color="white" strokeWidth={2} />
        </div>
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Trouve-Ton-Influ
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>MVP v0.1</div>
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ href, icon: Icon, label, disabled }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={disabled ? '#' : href}
              onClick={(event) => {
                if (disabled) event.preventDefault()
              }}
              aria-disabled={disabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--text-primary)' : disabled ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-subtle)' : 'transparent',
                textDecoration: 'none',
                border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                opacity: disabled ? 0.4 : 1,
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Thème</div>
        <ThemeToggle />
      </div>
    </aside>
  )
}
