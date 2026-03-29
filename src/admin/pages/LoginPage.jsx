import { useState } from 'react'
import { auth } from '../../../lib/supabase'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [blocked, setBlocked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (blocked) return

    // Bloquear después de 5 intentos fallidos
    if (attempts >= 5) {
      setBlocked(true)
      setError('Demasiados intentos. Esperá 30 segundos.')
      setTimeout(() => {
        setBlocked(false)
        setAttempts(0)
        setError('')
      }, 30000)
      return
    }

    setLoading(true)
    setError('')

    const { session, error: err } = await auth.signIn(email, password)

    if (err || !session) {
      setAttempts((a) => a + 1)
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    onLogin(session)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src="/logo-aires-de-paz.png" alt="Aires de Paz" />
        </div>

        <h1 className="admin-login__title">Panel Administrador</h1>
        <p className="admin-login__subtitle">Aires de Paz — Acceso restringido</p>

        <form onSubmit={handleSubmit} className="admin-login__form" autoComplete="off">
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@airesdepaz.com"
              required
              disabled={loading || blocked}
              autoComplete="username"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading || blocked}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="admin-login__error">
              ⚠️ {error}
            </div>
          )}

          {attempts > 0 && attempts < 5 && (
            <p className="admin-login__attempts">
              {5 - attempts} intentos restantes
            </p>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--full"
            disabled={loading || blocked}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="admin-login__footer">
          Este panel es de acceso exclusivo para administradores de Aires de Paz.
        </p>
      </div>
    </div>
  )
}