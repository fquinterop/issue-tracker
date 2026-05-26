const STATUS_STYLES = {
  'Pendiente':   'bg-amber-50 text-amber-700 border border-amber-200',
  'En Progreso': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Resuelto':    'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

const PRIORITY_STYLES = {
  'Alta':  'bg-red-50 text-red-700 border border-red-200',
  'Media': 'bg-orange-50 text-orange-700 border border-orange-200',
  'Baja':  'bg-surface-100 text-surface-800/60 border border-surface-200',
}

const STATUS_DOTS = {
  'Pendiente':   'bg-amber-400',
  'En Progreso': 'bg-blue-400',
  'Resuelto':    'bg-emerald-400',
}

export function StatusBadge({ status }) {
  return (
    <span className={`badge ${STATUS_STYLES[status] ?? ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[status] ?? 'bg-gray-400'}`} />
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }) {
  return (
    <span className={`badge ${PRIORITY_STYLES[priority] ?? ''}`}>
      {priority}
    </span>
  )
}
