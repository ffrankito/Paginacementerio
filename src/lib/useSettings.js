import { useState, useEffect } from 'react'
import { db } from './supabase'

export const DEFAULTS = {
  phone: '',
  whatsapp: '',
  bank_name: '',
  bank_account: '',
  bank_cbu: '',
  bank_alias: '',
  bank_swift: '',
  cash_note: '',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.from('settings')
      .selectOne('*', { id: 1 })
      .then(({ data }) => {
        if (data) setSettings(data)
        setLoading(false)
      })
  }, [])

  return { settings, loading }
}