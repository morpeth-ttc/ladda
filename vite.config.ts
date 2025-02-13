import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import fs from 'fs'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  define: {
    DEFAULT_DB: JSON.stringify("Open"),
    SITE_NAME: JSON.stringify("MorpethTTC Ladders"),
  },
})