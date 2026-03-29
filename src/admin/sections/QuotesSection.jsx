import { useState, useEffect } from 'react'
import { db } from '../../../lib/supabase'

const STATUS_LABELS = {
  pending:   { label: 'Pendiente',   color: '#f5a623' },
  contacted: { label: 'Contactado',  color: '#2d6a4f' },
  confirmed: { label: 'Confirmado',  color: '#25D366' },
  cancelled: { label: 'Cancelado',   color: '#e74c3c' },
}

export default function QuotesSection() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await db.from('quotes').select('*')
    const sorted = (data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    setQuotes(sorted)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    await db.from('quotes').update({ status }, { id })
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q))
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }))
  }

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter)

  const fmt = (date) => new Date(date).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  if (loading) return <div className="admin-loading-inline">Cargando cotizaciones...</div>

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>📋 Cotizaciones recibidas</h2>
          <p>{quotes.length} cotizaciones en total</p>
        </div>
        <button className="admin-btn admin-btn--secondary" onClick={load}>
          🔄 Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="admin-filters">
        {[['all', 'Todas'], ...Object.entries(STATUS_LABELS).map(([k, v]) => [k, v.label])].map(([key, label]) => (
          <button
            key={key}
            className={`admin-filter-btn${filter === key ? ' active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {label}
            <span className="admin-filter-btn__count">
              {key === 'all' ? quotes.length : quotes.filter(q => q.status === key).length}
            </span>
          </button>
        ))}
      </div>

      <div className="admin-quotes-layout">
        {/* Lista */}
        <div className="admin-quotes-list">
          {filtered.length === 0 ? (
            <div className="admin-empty">No hay cotizaciones en esta categoría.</div>
          ) : (
            filtered.map((q) => (
              <div
                key={q.id}
                className={`admin-quote-row${selected?.id === q.id ? ' selected' : ''}`}
                onClick={() => setSelected(q)}
              >
                <div className="admin-quote-row__main">
                  <span className="admin-quote-row__name">{q.owner_name}</span>
                  <span className="admin-quote-row__pet">{q.pet_name} ({q.pet_type})</span>
                </div>
                <div className="admin-quote-row__meta">
                  <span
                    className="admin-quote-row__status"
                    style={{ background: STATUS_LABELS[q.status]?.color + '22', color: STATUS_LABELS[q.status]?.color }}
                  >
                    {STATUS_LABELS[q.status]?.label}
                  </span>
                  <span className="admin-quote-row__date">{fmt(q.created_at)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detalle */}
        {selected && (
          <div className="admin-quote-detail">
            <div className="admin-quote-detail__header">
              <h3>Detalle de cotización</h3>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="admin-quote-detail__body">
              {[
                ['Mascota',   `${selected.pet_name} (${selected.pet_type})`],
                ['Tamaño',    selected.pet_size],
                ['Servicio',  selected.service],
                ['Retiro',    selected.pickup_method],
                ['Cenizas',   selected.ashes_delivery],
                ['Zona',      selected.zone || 'No aplica'],
                ['Dueño',     selected.owner_name],
                ['Teléfono',  selected.phone],
                ['Email',     selected.email],
                ['Fecha',     fmt(selected.created_at)],
              ].map(([k, v]) => (
                <div key={k} className="admin-quote-detail__row">
                  <span className="admin-quote-detail__key">{k}</span>
                  <span className="admin-quote-detail__val">{v}</span>
                </div>
              ))}
            </div>

            <div className="admin-quote-detail__actions">
              <p style={{ fontSize: 13, color: '#555', marginBottom: 8 }}>Cambiar estado:</p>
              <div className="admin-status-buttons">
                {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => (
                  <button
                    key={key}
                    className={`admin-status-btn${selected.status === key ? ' active' : ''}`}
                    style={{ '--status-color': color }}
                    onClick={() => updateStatus(selected.id, key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <a
                href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hola+${encodeURIComponent(selected.owner_name)}%2C+te+contactamos+desde+Aires+de+Paz+por+la+cotización+de+${encodeURIComponent(selected.pet_name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn--whatsapp admin-btn--full"
                style={{ marginTop: 16, textDecoration: 'none', display: 'block', textAlign: 'center' }}
              >
                💬 Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}