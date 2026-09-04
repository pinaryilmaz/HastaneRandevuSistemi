import { configDefaults, defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    exclude: [...configDefaults.exclude, 'e2e/**'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/components/ui/**',
        'src/mocks/**',
        'src/test/**',
        'src/api/contracts.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        lines: 70,
        statements: 70,
      },
    },
  },
});
