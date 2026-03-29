// Supabase temporalmente desactivado — reactivar cuando se resuelva compatibilidad con Vite 8
// Para activar: npm install @supabase/supabase-js@2.39.0
// y descomentar el import real

export const supabase = {
  from: () => ({
    insert: async (data) => {
      console.log('[supabase mock] cotización guardada:', data);
      return { error: null };
    }
  })
};