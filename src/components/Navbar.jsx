import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../utils/auth'

function Navbar() {
  const navigate = useNavigate()
  const user = getSession()

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-display font-bold text-surface-900 tracking-tight">
            Issue<span className="text-brand-600">Tracker</span>
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-surface-900 leading-none">{user?.name}</span>
            <span className="text-xs text-surface-800/50 mt-0.5">{user?.role}</span>
          </div>
          <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-display font-bold text-sm uppercase">
            {user?.name?.[0] ?? 'U'}
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary text-xs px-3 py-2"
            aria-label="Cerrar sesión"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
