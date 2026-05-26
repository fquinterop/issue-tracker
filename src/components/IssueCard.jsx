import { StatusBadge, PriorityBadge } from './Badges'

function IssueCard({ issue, onEdit, onDelete }) {
  return (
    <article className="card p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-surface-900 text-sm leading-snug flex-1">
          {issue.titulo}
        </h3>
        <span className="font-mono text-[10px] text-surface-800/40 shrink-0 mt-0.5">#{issue.id}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-surface-800/60 leading-relaxed line-clamp-3">
        {issue.descripcion}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={issue.estado} />
        <PriorityBadge priority={issue.prioridad} />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-surface-100">
        <button
          onClick={() => onEdit(issue)}
          className="btn-secondary flex-1 justify-center text-xs py-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Editar
        </button>
        <button
          onClick={() => onDelete(issue)}
          className="btn-danger flex-1 justify-center text-xs py-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default IssueCard
