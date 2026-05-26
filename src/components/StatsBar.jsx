function StatsBar({ issues }) {
  const total      = issues.length
  const pending    = issues.filter(i => i.estado === 'Pendiente').length
  const inProgress = issues.filter(i => i.estado === 'En Progreso').length
  const resolved   = issues.filter(i => i.estado === 'Resuelto').length
  const highPrio   = issues.filter(i => i.prioridad === 'Alta').length

  const stats = [
    { label: 'Total',      value: total,      color: 'text-surface-900' },
    { label: 'Pendientes', value: pending,    color: 'text-amber-600' },
    { label: 'En progreso',value: inProgress, color: 'text-blue-600' },
    { label: 'Resueltos',  value: resolved,   color: 'text-emerald-600' },
    { label: 'Alta prioridad', value: highPrio, color: 'text-red-600' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {stats.map(stat => (
        <div key={stat.label} className="card px-4 py-3 text-center">
          <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
          <p className="text-[11px] text-surface-800/50 mt-0.5 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
