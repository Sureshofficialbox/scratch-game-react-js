import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the port to your desired value (e.g., 3000)
    base: '/scratch-game-react-js/', // Set the base to your repository name
  },
})
