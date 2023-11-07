import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://liham-api.adaptable.app/api/v1',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
});
