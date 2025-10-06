import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
      '@components': resolve(rootDir, 'src/components'),
      '@hooks': resolve(rootDir, 'src/hooks'),
      '@content': resolve(rootDir, 'src/content'),
      '@styles': resolve(rootDir, 'src/styles'),
      '@data': resolve(rootDir, 'src/data'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})
