import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
  // `npm run dev:api` (wrangler dev) serves /api on 8787
  server: { proxy: { '/api': 'http://localhost:8787' } },
});
