import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/ayush.dev/",
  plugins: [react()],
  server: {
    proxy: {
      '/github-contributions': {
        target: 'https://github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-contributions/, '/users'),
      },
    },
  },
})
