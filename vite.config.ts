import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 사용 시: base: '/QR-code-maker/'
// Vercel/Netlify 사용 시: base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
});
