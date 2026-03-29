import { useState } from 'react'
import { auth } from '../../../lib/supabase'
import QuotesSection from '../sections/QuotesSection'
import ProductsSection from '../sections/ProductsSection'
import SettingsSection from '../sections/SettingsSection'

const NAV = [
  { id: 'quotes',   label: '📋 Cotizaciones' },
  { id: 'products', label: '🛍️ Tienda'        },
  { id: 'settings', label: '⚙️ Configuración'  },
]

export default function Dashboard({ onLogout }) {
  const [section, setSection] = useState('quotes')

  const handleLogout = async () => {
    if (confirm('¿Cerrar sesión?')) onLogout()
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <img src="/logo-aires-de-paz.png" alt="Aires de Paz" />
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`admin-sidebar__link${section === item.id ? ' active' : ''}`}
              onClick={() => setSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-content">
          {section === 'quotes'   && <QuotesSection />}
          {section === 'products' && <ProductsSection />}
          {section === 'settings' && <SettingsSection />}
        </div>
      </main>
    </div>
  )
}