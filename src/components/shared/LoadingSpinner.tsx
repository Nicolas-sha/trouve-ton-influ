interface LoadingSpinnerProps {
  size?: number
}

export function LoadingSpinner({ size = 14 }: LoadingSpinnerProps) {
  return (
    <div
      className="spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '2px solid var(--text-tertiary)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
      }}
    />
  )
}
