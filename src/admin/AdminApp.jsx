import { useState, useEffect } from 'react'
import { auth } from '../../lib/supabase'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay sesión activa en memoria
    const s = auth.getSession()
    setSession(s)
    setLoading(false)
  }, [])

  const handleLogin = (s) => setSession(s)
  const handleLogout = async () => {
    await auth.signOut()
    setSession(null)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
      </div>
    )
  }

  if (!session) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}