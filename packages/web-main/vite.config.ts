import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: true
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 3500,
    sourcemap: true, // 소스맵 생성
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@packages/design-token': path.resolve(
        __dirname,
        '../design-token/src/index.ts',
      ),
      '@packages/ui': path.resolve(__dirname, '../ui/src'),
    },
  },
  optimizeDeps: {
    include: [
      'react-router',
      'react-router-dom'
    ],
    force: true,
    exclude: ['@babel/runtime'],
  },
})
