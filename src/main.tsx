import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { AppProviders } from '@/app/providers';
import { env } from '@/lib/env';
import '@/styles/globals.css';

async function enableMocks() { if (!env.useMocks) return; const { worker } = await import('@/mocks/browser'); await worker.start({ onUnhandledRequest: 'bypass' }); }

void enableMocks().then(() => { ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AppProviders><App /></AppProviders></React.StrictMode>); });
