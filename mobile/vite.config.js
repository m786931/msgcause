import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), tailwindcss(), basicSsl()],
  server: {
    https: true,
    port: 5174,
    proxy: {
      '/api': 'http://localhost:3000',
      '/connect': 'http://localhost:3000',
      '/auth': 'http://localhost:3000'
    }
  }
})