import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#f1f6fa', 100: '#dfeaf2', 500: '#24577a', 700: '#173f60', 900: '#0f2744' },
        aqua: { 50: '#eefcfa', 100: '#d4f7f2', 500: '#10a6a1', 600: '#0c8583', 700: '#0d6b6a' },
      },
      boxShadow: { panel: '0 16px 40px -24px rgba(15, 39, 68, 0.32)' },
    },
  },
  plugins: [],
} satisfies Config;
