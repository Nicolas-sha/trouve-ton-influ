export function SkeletonCard() {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: '14px', width: '60%', marginBottom: '6px' }} />
          <div className="skeleton" style={{ height: '12px', width: '40%' }} />
        </div>
        <div className="skeleton" style={{ width: '48px', height: '24px', borderRadius: '999px' }} />
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <div className="skeleton" style={{ height: '22px', width: '80px', borderRadius: '999px' }} />
        <div className="skeleton" style={{ height: '22px', width: '70px', borderRadius: '999px' }} />
      </div>
      <div className="skeleton" style={{ height: '64px', borderRadius: 'var(--radius-md)' }} />
      <div className="skeleton" style={{ height: '12px', width: '50%' }} />
      <div className="skeleton" style={{ height: '38px', borderRadius: 'var(--radius-md)' }} />
    </div>
  )
}
