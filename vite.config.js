import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensures the app binds to 0.0.0.0 for external access
    port: process.env.PORT || 5173  // Uses Render's assigned port or defaults to 5173
  }
})

