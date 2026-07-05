import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.SERVER_PORT || 3001}`,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: Number(process.env.VITE_PORT) || 4173,
    host: '0.0.0.0',
  },
})
