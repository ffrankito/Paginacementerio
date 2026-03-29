import { useState, useEffect } from 'react'
import { db } from '../lib/supabase'

export default function Store({ settings }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.from('products').select('*').then(({ data }) => {
      setProducts(data || [])
      setLoading(false)
    })
  }, [])

  if (loading || products.length === 0) return null

  return (
    <div className="store">
      <div className="store__header">
        <h3 className="store__title">🛍️ Tienda de recuerdos</h3>
        <p className="store__subtitle">
          Encontrá urnas, collares y objetos para guardar el recuerdo de tu compañero.
        </p>
      </div>

      <div className="store__grid">
        {products.map((p) => (
          <div key={p.id} className="store-card">
            <div className="store-card__image">
              {p.image_url
                ? <img src={p.image_url} alt={p.name} />
                : <div className="store-card__no-image">🐾</div>
              }
            </div>
            <div className="store-card__body">
              <p className="store-card__category">{p.category}</p>
              <h4 className="store-card__name">{p.name}</h4>
              {p.description && (
                <p className="store-card__desc">{p.description}</p>
              )}
              <div className="store-card__footer">
                <span className="store-card__price">
                  ${Number(p.price).toLocaleString('es-AR')}
                </span>
                <a
                  href={`https://wa.me/${settings?.whatsapp || '5493410000000'}?text=Hola%2C+me+interesa+el+producto+*${encodeURIComponent(p.name)}*`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-card__btn"
                >
                  Consultar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}