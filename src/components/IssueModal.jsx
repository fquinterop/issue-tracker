import { useState, useEffect } from 'react'
import Spinner from './Spinner'

const EMPTY_FORM = {
  titulo: '',
  descripcion: '',
  estado: 'Pendiente',
  prioridad: 'Media',
}

function IssueModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ?? EMPTY_FORM)
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const isEditing = Boolean(initialData)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEditing ? 'Editar incidencia' : 'Nueva incidencia'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative card w-full max-w-md p-6 animate-slide-up">
        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-lg text-surface-900">
            {isEditing ? 'Editar incidencia' : 'Nueva incidencia'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 text-surface-800/50 hover:text-surface-900 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Título */}
          <div>
            <label className="label" htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Descripción corta del problema"
              required
              className="input"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="label" htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Detalla el contexto, pasos para reproducir el error..."
              required
              rows={4}
              className="input resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Estado */}
            <div>
              <label className="label" htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="input"
              >
                <option>Pendiente</option>
                <option>En Progreso</option>
                <option>Resuelto</option>
              </select>
            </div>

            {/* Prioridad */}
            <div>
              <label className="label" htmlFor="prioridad">Prioridad</label>
              <select
                id="prioridad"
                name="prioridad"
                value={form.prioridad}
                onChange={handleChange}
                className="input"
              >
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 justify-center disabled:opacity-60"
            >
              {isSubmitting
                ? <Spinner size="sm" />
                : isEditing ? 'Guardar cambios' : 'Crear incidencia'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueModal
