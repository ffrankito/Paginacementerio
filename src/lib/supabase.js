import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// ─── AUTH ───────────────────────────────────────────────────
export const auth = {
  signIn: async (email, password) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })
    return { session: data?.session ?? null, error }
  },
  signOut: async () => {
    const { error } = await supabaseClient.auth.signOut()
    return { error }
  },
  getSession: async () => {
    const { data } = await supabaseClient.auth.getSession()
    return data?.session ?? null
  },
  isAuthenticated: async () => {
    const { data } = await supabaseClient.auth.getSession()
    return !!data?.session
  },
}

// ─── DATABASE ───────────────────────────────────────────────
export const db = {
  from: (table) => ({
    select: async (columns = '*', filters = {}) => {
      let query = supabaseClient.from(table).select(columns)
      Object.entries(filters).forEach(([k, v]) => { query = query.eq(k, v) })
      const { data, error } = await query
      return { data, error }
    },
    selectOne: async (columns = '*', filters = {}) => {
      let query = supabaseClient.from(table).select(columns)
      Object.entries(filters).forEach(([k, v]) => { query = query.eq(k, v) })
      const { data, error } = await query.single()
      return { data, error }
    },
    insert: async (payload) => {
      const { data, error } = await supabaseClient.from(table).insert(payload).select()
      return { data, error }
    },
    update: async (payload, filters = {}) => {
      let query = supabaseClient.from(table).update(payload)
      Object.entries(filters).forEach(([k, v]) => { query = query.eq(k, v) })
      const { data, error } = await query.select()
      return { data, error }
    },
    delete: async (filters = {}) => {
      let query = supabaseClient.from(table).delete()
      Object.entries(filters).forEach(([k, v]) => { query = query.eq(k, v) })
      const { error } = await query
      return { error }
    },
  }),
}

// ─── STORAGE ────────────────────────────────────────────────
export const storage = {
  upload: async (bucket, path, file) => {
    const { error } = await supabaseClient.storage.from(bucket).upload(path, file)
    if (error) return { url: null, error }
    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path)
    return { url: data.publicUrl, error: null }
  },
  getPublicUrl: (bucket, path) => {
    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },
  remove: async (bucket, paths) => {
    const { error } = await supabaseClient.storage.from(bucket).remove(paths)
    return { error }
  },
}