import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
export function renderWithProviders(ui: ReactElement, route = '/') { const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } }); return { client, ...render(<QueryClientProvider client={client}><MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{ui}</MemoryRouter></QueryClientProvider>) }; }
