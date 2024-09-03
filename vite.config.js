import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 将 '@' 别名映射到 'src' 目录
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
