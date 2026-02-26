import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path must match App.tsx `basename` and the GitHub Pages repo name.
// Update both if the repository is renamed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ghcp-car-challenge/',
})
