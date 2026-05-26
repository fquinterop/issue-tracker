import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, isAuthenticated } from '../utils/auth'

const ROLES = ['Administrador', 'Desarrollador', 'QA Tester', 'Soporte Técnico']

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', role: 'Administrador' })
  const [error, setError] = useState('')

  // Already logged in? go straight to dashboard
  if (isAuthenticated()) {
    navigate('/dashboard', { replace: true })
    return null
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Por favor ingresa tu nombre.')
      return
    }
    setError('')
    saveSession({ name: form.name.trim(), role: form.role })
    navigate('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* Decorative blob */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7089ff 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}
      />
      <div
        className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4a61fa 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
      />

      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-brand-500/30">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-2xl text-surface-900 tracking-tight">
            Issue<span className="text-brand-600">Tracker</span>
          </h1>
          <p className="text-sm text-surface-800/50 mt-1">Gestión de incidencias técnicas</p>
        </div>

        <div className="card p-6">
          <h2 className="font-display font-semibold text-surface-900 mb-5">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label className="label" htmlFor="name">Tu nombre</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                className="input"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="label" htmlFor="role">Rol</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input"
              >
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary justify-center w-full mt-1">
              Ingresar al sistema
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-surface-800/40 mt-4">
          Acceso simulado · Los datos se guardan localmente
        </p>
      </div>
    </main>
  )
}

export default LoginPage
