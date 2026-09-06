import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/i18n';
import { App } from '@/app/App';
import { AppProviders } from '@/app/providers';
import { env } from '@/lib/env';
import '@/styles/globals.css';

const MOCK_START_TIMEOUT_MS = 2_500;
const MOCK_WORKER_FILE = '/mockServiceWorker.js';
const MOCK_WORKER_RELOAD_KEY = 'hospital-mock-worker-reload';

function isMockWorker(scriptUrl?: string | null) {
  if (!scriptUrl) return false;

  try {
    return new URL(scriptUrl).pathname.endsWith(MOCK_WORKER_FILE);
  } catch {
    return false;
  }
}

async function disableStaleMocks() {
  if (env.useMocks || env.useMockAuth || !('serviceWorker' in navigator)) return false;

  const controlledByMock = isMockWorker(navigator.serviceWorker.controller?.scriptURL);
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations
      .filter((registration) =>
        [registration.active, registration.waiting, registration.installing].some((worker) =>
          isMockWorker(worker?.scriptURL),
        ),
      )
      .map((registration) => registration.unregister()),
  );

  if (controlledByMock && sessionStorage.getItem(MOCK_WORKER_RELOAD_KEY) !== 'done') {
    sessionStorage.setItem(MOCK_WORKER_RELOAD_KEY, 'done');
    window.location.reload();
    return true;
  }

  sessionStorage.removeItem(MOCK_WORKER_RELOAD_KEY);
  return false;
}

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
  let shouldRender = true;

  try {
    shouldRender = !(await disableStaleMocks());
    if (shouldRender) await enableMocks();
  } catch (error) {
    console.error('Demo veri servisi başlatılamadı.', error);
  } finally {
    if (shouldRender) renderApp();
  }
}

void bootstrap();
