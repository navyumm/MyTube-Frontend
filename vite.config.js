import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:8080/api/v1'
      '/api': 'https://youtube-backend-xi.vercel.app/api/v1'
    }
  }
})