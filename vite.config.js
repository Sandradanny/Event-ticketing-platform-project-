// vite.config.js
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://eventmanagerapi-1.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
}