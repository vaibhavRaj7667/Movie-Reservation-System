import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// export const urls = import.meta.env.VITE_API_URL


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    
    react(),
    tailwindcss(),
  
  ],
})
