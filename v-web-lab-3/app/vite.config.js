import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: './',

  plugins: [react(), tailwindcss()],
  
  server: {
    host: 'localhost',
    port: 3000,
    open: true, // автоматически открывать браузер
    strictPort: true // не менять порт если занят
  },

  preview: {
    host: 'localhost',
    port: 4173,
    open: true
  },

})