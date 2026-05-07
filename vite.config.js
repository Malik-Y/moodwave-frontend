import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    allowedHosts: [
      'heterogynous-bimonthly-aundrea.ngrok-free.dev',
      'moodwave-frontend.vercel.app',
        'https://moodwave-6b5s.onrender.com',
    ]
  }
});