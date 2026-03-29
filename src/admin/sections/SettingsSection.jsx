import { useState, useEffect } from 'react'
import { db } from '../../../lib/supabase'
import { DEFAULTS } from '../../../lib/useSettings'

export default function SettingsSection() {
  const [form, setForm] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    db.from('settings').selectOne('*', { id: 1 }).then(({ data }) => {
      if (data) setForm({ ...DEFAULTS, ...data })
      setLoading(false)
    })
  }, [])

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    const { error: err } = await db.from('settings').update(form, { id: 1 })
    setSaving(false)
    if (err) {
      setError('Error al guardar. Intentá de nuevo.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  if (loading) return <div className="admin-loading-inline">Cargando configuración...</div>

  const FIELDS = [
    { section: '📞 Contacto', fields: [
      { key: 'phone',     label: 'Teléfono (mostrado en header)',  type: 'text', placeholder: '341 000 0000' },
      { key: 'whatsapp',  label: 'WhatsApp (número completo)',      type: 'text', placeholder: '5493410000000' },
    ]},
    { section: '🏦 Datos bancarios', fields: [
      { key: 'bank_name',    label: 'Banco',         type: 'text', placeholder: 'BBVA' },
      { key: 'bank_account', label: 'Número de cuenta', type: 'text', placeholder: 'CA $ 0-00000/0' },
      { key: 'bank_cbu',     label: 'CBU',            type: 'text', placeholder: '0000000000000000000000' },
      { key: 'bank_alias',   label: 'Alias',          type: 'text', placeholder: 'AIRESDEPAZ' },
      { key: 'bank_swift',   label: 'Código Swift',   type: 'text', placeholder: 'BFRPARBAXXX' },
    ]},
    { section: '📝 Textos', fields: [
      { key: 'cash_note', label: 'Nota de pago en efectivo', type: 'textarea', placeholder: 'También podés pagarlo en efectivo...' },
    ]},
  ]

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <h2>⚙️ Configuración del negocio</h2>
        <p>Estos datos se muestran en el cotizador y en la pantalla de confirmación.</p>
      </div>

      <div className="admin-settings">
        {FIELDS.map(({ section, fields }) => (
          <div key={section} className="admin-settings__group">
            <h3 className="admin-settings__group-title">{section}</h3>
            <div className="admin-settings__fields">
              {fields.map(({ key, label, type, placeholder }) => (
                <div key={key} className="admin-field">
                  <label>{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={form[key] || ''}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  ) : (
                    <input
                      type={type}
                      value={form[key] || ''}
                      placeholder={placeholder}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-settings__actions">
          <button
            className="admin-btn admin-btn--primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          {saved && <span className="admin-saved">✓ Guardado correctamente</span>}
        </div>
      </div>
    </div>
  )
}