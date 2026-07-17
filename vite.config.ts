import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches the GitHub Pages repo name so built asset URLs resolve
// correctly when served from https://<user>.github.io/nieuw-boek/
export default defineConfig({
  base: '/nieuw-boek/',
  plugins: [react()],
})
