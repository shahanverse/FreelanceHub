import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import tailwind plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // add tailwind as plugin
  ],
})