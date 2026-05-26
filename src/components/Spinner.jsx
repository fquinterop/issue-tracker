function Spinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }

  return (
    <div
      className={`${sizeClasses[size]} border-surface-200 border-t-brand-500 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Cargando"
    />
  )
}

export default Spinner
