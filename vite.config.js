import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'tslib'],
  },
  resolve: {
    alias: {
      'tslib': 'tslib/tslib.es6.js',
    },
  },
})