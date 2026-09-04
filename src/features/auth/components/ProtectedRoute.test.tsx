import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockSession } from '@/mocks/fixtures/auth';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from './ProtectedRoute';

function renderRoute() {
  const router = createMemoryRouter(
    [
      { path: '/login', element: <p>Giriş ekranı</p> },
      {
        element: <ProtectedRoute />,
        children: [{ path: '/dashboard', element: <p>Korunan ekran</p> }],
      },
    ],
    { initialEntries: ['/dashboard'] },
  );

  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  return router;
}

describe('ProtectedRoute', () => {
  beforeEach(() => useAuthStore.getState().clearSession());

  it('oturumu olmayan kullanıcıyı login sayfasına yönlendirir', async () => {
    const router = renderRoute();

    expect(await screen.findByText('Giriş ekranı')).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
    expect(router.state.location.state).toEqual({ from: '/dashboard' });
  });

  it('geçerli oturumu olan kullanıcıya korunan ekranı gösterir', async () => {
    useAuthStore.getState().setSession(createMockSession());
    renderRoute();

    expect(await screen.findByText('Korunan ekran')).toBeInTheDocument();
  });

  it('süresi dolmuş oturumu geçersiz sayar', async () => {
    useAuthStore.getState().setSession({
      ...createMockSession(),
      expiresAt: new Date(Date.now() - 1_000).toISOString(),
    });
    renderRoute();

    expect(await screen.findByText('Giriş ekranı')).toBeInTheDocument();
  });
});
