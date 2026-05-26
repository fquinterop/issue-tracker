import { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import IssueCard from '../components/IssueCard'
import IssueModal from '../components/IssueModal'
import StatsBar from '../components/StatsBar'
import Spinner from '../components/Spinner'
import { useIssues } from '../hooks/useIssues'

const STATUS_OPTIONS   = ['Todos', 'Pendiente', 'En Progreso', 'Resuelto']
const PRIORITY_OPTIONS = ['Todas', 'Baja', 'Media', 'Alta']

function DashboardPage() {
  const { issues, loading, error, fetchIssues, addIssue, editIssue, removeIssue } = useIssues()

  const [modalOpen, setModalOpen]     = useState(false)
  const [editingIssue, setEditingIssue] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filterStatus,   setFilterStatus]   = useState('Todos')
  const [filterPriority, setFilterPriority] = useState('Todas')
  const [search, setSearch] = useState('')

  // ─── Filters ───────────────────────────────────────────────
  const filtered = issues.filter(issue => {
    const matchesStatus   = filterStatus   === 'Todos'  || issue.estado    === filterStatus
    const matchesPriority = filterPriority === 'Todas'  || issue.prioridad === filterPriority
    const matchesSearch = (issue.titulo ?? '').toLowerCase().includes(search.toLowerCase()) ||
                      (issue.descripcion ?? '').toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  })

  // ─── Open modal helpers ─────────────────────────────────────
  function openCreateModal() {
    setEditingIssue(null)
    setModalOpen(true)
  }

  function openEditModal(issue) {
    setEditingIssue(issue)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingIssue(null)
  }

  // ─── Submit (create / edit) ─────────────────────────────────
  async function handleSubmit(formData) {
    setIsSubmitting(true)
    try {
      if (editingIssue) {
        await editIssue(editingIssue.id, formData)
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'La incidencia fue actualizada correctamente.',
          timer: 1800,
          showConfirmButton: false,
        })
      } else {
        await addIssue(formData)
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'La incidencia fue registrada correctamente.',
          timer: 1800,
          showConfirmButton: false,
        })
      }
      closeModal()
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la incidencia. Intenta nuevamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Delete ─────────────────────────────────────────────────
  async function handleDelete(issue) {
    const result = await Swal.fire({
      title: '¿Eliminar incidencia?',
      html: `<span class="text-sm text-gray-500">Esta acción no se puede deshacer.<br><strong>${issue.titulo}</strong> será eliminada permanentemente.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await removeIssue(issue.id)
      Swal.fire({
        icon: 'success',
        title: 'Eliminada',
        text: 'La incidencia fue eliminada.',
        timer: 1500,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar. Intenta nuevamente.',
      })
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-surface-900">Dashboard</h1>
            <p className="text-sm text-surface-800/50 mt-0.5">Gestiona y monitorea las incidencias del equipo</p>
          </div>
          <button onClick={openCreateModal} className="btn-primary self-start sm:self-auto">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nueva incidencia
          </button>
        </div>

        {/* Stats */}
        {!loading && !error && <StatsBar issues={issues} />}

        {/* Filters & search */}
        <div className="card p-4 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar incidencia..."
            className="input flex-1"
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input sm:w-40">
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="input sm:w-36">
            {PRIORITY_OPTIONS.map(p => <option key={p}>{p}</option>)}
          </select>
          {(filterStatus !== 'Todos' || filterPriority !== 'Todas' || search) && (
            <button
              onClick={() => { setFilterStatus('Todos'); setFilterPriority('Todas'); setSearch('') }}
              className="btn-secondary shrink-0"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Content */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Spinner size="lg" />
            <p className="text-sm text-surface-800/50">Cargando incidencias...</p>
          </div>
        )}

        {error && !loading && (
          <div className="card p-6 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button onClick={fetchIssues} className="btn-secondary">Reintentar</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="card p-12 text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-surface-100 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-surface-800/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="font-display font-semibold text-surface-900">Sin resultados</p>
            <p className="text-sm text-surface-800/50">
              {issues.length === 0
                ? 'Aún no hay incidencias. ¡Crea la primera!'
                : 'No hay incidencias que coincidan con los filtros.'}
            </p>
            {issues.length === 0 && (
              <button onClick={openCreateModal} className="btn-primary mt-1">
                Crear incidencia
              </button>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-xs text-surface-800/40 -mb-2">
              {filtered.length} de {issues.length} incidencia{issues.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(issue => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <IssueModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingIssue}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

export default DashboardPage
