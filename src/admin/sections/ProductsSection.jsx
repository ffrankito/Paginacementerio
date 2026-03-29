import { useState, useEffect, useRef } from 'react'
import { db, storage } from '../../../lib/supabase'

const EMPTY_PRODUCT = {
  name: '', description: '', price: '', category: 'urnas',
  stock: '', active: true, image_url: '',
}

const CATEGORIES = [
  { id: 'urnas',      label: 'Urnas' },
  { id: 'collares',   label: 'Collares y recuerdos' },
  { id: 'cuadros',    label: 'Cuadros y fotos' },
  { id: 'plantas',    label: 'Plantas conmemorativas' },
  { id: 'general',    label: 'General' },
]

export default function ProductsSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const loadProducts = async () => {
    setLoading(true)
    const { data } = await db.from('products').select('*')
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(EMPTY_PRODUCT)
    setImageFile(null)
    setImagePreview('')
    setError('')
    setShowForm(true)
  }

  const openEdit = (product) => {
    setEditing(product.id)
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || 'general',
      stock: product.stock ?? '',
      active: product.active ?? true,
      image_url: product.image_url || '',
    })
    setImageFile(null)
    setImagePreview(product.image_url || '')
    setError('')
    setShowForm(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5MB.')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSave = async () => {
    if (!form.name.trim()) return setError('El nombre es obligatorio.')
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) return setError('El precio debe ser un número válido.')

    setSaving(true)
    setError('')

    let image_url = form.image_url

    // Subir imagen si hay una nueva
    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { url, error: uploadErr } = await storage.upload('products', path, imageFile)
      if (uploadErr) {
        setError('Error al subir la imagen. Verificá que el bucket "products" existe en Supabase Storage.')
        setSaving(false)
        return
      }
      image_url = url
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      stock: form.stock === '' ? 999 : Number(form.stock),
      active: form.active,
      image_url,
    }

    let err
    if (editing) {
      ;({ error: err } = await db.from('products').update(payload, { id: editing }))
    } else {
      ;({ error: err } = await db.from('products').insert(payload))
    }

    setSaving(false)
    if (err) {
      setError('Error al guardar el producto.')
      return
    }

    setShowForm(false)
    loadProducts()
  }

  const handleToggleActive = async (product) => {
    await db.from('products').update({ active: !product.active }, { id: product.id })
    loadProducts()
  }

  const handleDelete = async (product) => {
    if (!confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    await db.from('products').delete({ id: product.id })
    loadProducts()
  }

  if (loading) return <div className="admin-loading-inline">Cargando productos...</div>

  return (
    <div className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>🛍️ Tienda de productos</h2>
          <p>Agregá y administrá los productos que se muestran después del cotizador.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openNew}>
          + Nuevo producto
        </button>
      </div>

      {/* Lista de productos */}
      {products.length === 0 ? (
        <div className="admin-empty">
          <p>No hay productos todavía.</p>
          <button className="admin-btn admin-btn--primary" onClick={openNew}>
            Agregar el primero
          </button>
        </div>
      ) : (
        <div className="admin-products-grid">
          {products.map((p) => (
            <div key={p.id} className={`admin-product-card${p.active ? '' : ' inactive'}`}>
              <div className="admin-product-card__image">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} />
                  : <div className="admin-product-card__no-image">Sin imagen</div>
                }
                <span className={`admin-product-card__badge ${p.active ? 'active' : 'inactive'}`}>
                  {p.active ? 'Activo' : 'Oculto'}
                </span>
              </div>
              <div className="admin-product-card__body">
                <div className="admin-product-card__category">
                  {CATEGORIES.find(c => c.id === p.category)?.label || p.category}
                </div>
                <h4 className="admin-product-card__name">{p.name}</h4>
                <p className="admin-product-card__desc">{p.description}</p>
                <div className="admin-product-card__meta">
                  <span className="admin-product-card__price">
                    ${Number(p.price).toLocaleString('es-AR')}
                  </span>
                  <span className="admin-product-card__stock">
                    Stock: {p.stock}
                  </span>
                </div>
                <div className="admin-product-card__actions">
                  <button className="admin-btn admin-btn--sm admin-btn--secondary" onClick={() => openEdit(p)}>
                    Editar
                  </button>
                  <button
                    className={`admin-btn admin-btn--sm ${p.active ? 'admin-btn--warning' : 'admin-btn--success'}`}
                    onClick={() => handleToggleActive(p)}
                  >
                    {p.active ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(p)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal formulario */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="admin-modal">
            <div className="admin-modal__header">
              <h3>{editing ? 'Editar producto' : 'Nuevo producto'}</h3>
              <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <div className="admin-modal__body">
              {/* Imagen */}
              <div className="admin-field">
                <label>Imagen del producto</label>
                <div className="admin-image-upload" onClick={() => fileRef.current.click()}>
                  {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="admin-image-upload__preview" />
                    : <div className="admin-image-upload__placeholder">
                        <span>📷</span>
                        <span>Hacé click para subir una imagen</span>
                        <span style={{fontSize: 12, color: '#999'}}>JPG, PNG, WebP — máx. 5MB</span>
                      </div>
                  }
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Nombre */}
              <div className="admin-field">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={form.name}
                  placeholder="Ej: Urna de madera nogal"
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              {/* Descripción */}
              <div className="admin-field">
                <label>Descripción</label>
                <textarea
                  rows={3}
                  value={form.description}
                  placeholder="Descripción del producto..."
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>

              {/* Precio y stock */}
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Precio (ARS) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    placeholder="0.00"
                    onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                  />
                </div>
                <div className="admin-field">
                  <label>Stock disponible</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    placeholder="999"
                    onChange={(e) => setForm(f => ({ ...f, stock: e.target.value }))}
                  />
                </div>
              </div>

              {/* Categoría */}
              <div className="admin-field">
                <label>Categoría</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Activo */}
              <div className="admin-field admin-field--checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm(f => ({ ...f, active: e.target.checked }))}
                  />
                  Mostrar en la tienda
                </label>
              </div>

              {error && <div className="admin-error">{error}</div>}
            </div>

            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
              <button
                className="admin-btn admin-btn--primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Guardando...' : (editing ? 'Guardar cambios' : 'Crear producto')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}