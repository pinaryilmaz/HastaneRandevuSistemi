import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_PROXY_TARGET || 'http://localhost:8080';
  const hospitalTarget = env.VITE_HOSPITAL_API_PROXY_TARGET || 'http://localhost:8087';

  return {
    plugins: [react()],
    define: { global: 'globalThis' },
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
      port: 5173,
      proxy: {
        '/api': { target, changeOrigin: true, ws: true },
        '/hospital-api': {
          target: hospitalTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hospital-api/, '/api'),
        },
      },
    },
  };
});
