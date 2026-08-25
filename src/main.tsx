import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { AppProviders } from '@/app/providers';
import { env } from '@/lib/env';
import '@/styles/globals.css';

const MOCK_START_TIMEOUT_MS = 2_500;

async function enableMocks() {
  if (!env.useMocks && !env.useMockAuth) return;

  const { worker } = await import('@/mocks/browser');
  await Promise.race([
    worker.start({ onUnhandledRequest: 'bypass' }),
    new Promise<never>((_, reject) => {
      window.setTimeout(
        () => reject(new Error('Demo veri servisi başlatma zaman aşımına uğradı.')),
        MOCK_START_TIMEOUT_MS,
      );
    }),
  ]);
}

function renderApp() {
  const root = document.getElementById('root');
  if (!root) throw new Error('Uygulama kök elementi bulunamadı.');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
}

async function bootstrap() {
  try {
    await enableMocks();
  } catch (error) {
    console.error('Demo veri servisi başlatılamadı.', error);
  } finally {
    renderApp();
  }
}

void bootstrap();
