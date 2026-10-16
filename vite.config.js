import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    host: true,
    port: 4173,
    cors: true,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js']
  }
});
