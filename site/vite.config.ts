import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../deploy',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'assets/luis-portfolio.js', assetFileNames: 'assets/luis-portfolio.[ext]' } }
  }
})
