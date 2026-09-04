import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { createMockSession } from '@/mocks/fixtures/auth';
import { server } from '@/test/setup';
import { useAuthStore } from '@/features/auth/store/authStore';
import { apiClient } from './client';

describe('apiClient', () => {
  beforeEach(() => {
    useAuthStore.getState().clearSession();
    window.history.replaceState(null, '', '/login');
  });

  it('Authorization ve benzersiz correlation ID başlıklarını gönderir', async () => {
    useAuthStore.getState().setSession(createMockSession());
    const headers: Array<{ authorization: string | null; correlationId: string | null }> = [];
    server.use(
      http.get('/api/v1/probe', ({ request }) => {
        headers.push({
          authorization: request.headers.get('Authorization'),
          correlationId: request.headers.get('X-Correlation-Id'),
        });
        return HttpResponse.json({ ok: true });
      }),
    );

    await apiClient.get('/probe');
    await apiClient.get('/probe');

    expect(headers[0].authorization).toBe('Bearer mock-jwt-hospital-operations');
    expect(headers[0].correlationId).toBeTruthy();
    expect(headers[1].correlationId).not.toBe(headers[0].correlationId);
  });

  it('401 yanıtında oturumu temizler', async () => {
    useAuthStore.getState().setSession(createMockSession());
    server.use(
      http.get('/api/v1/protected-probe', () =>
        HttpResponse.json({ message: 'Oturum sona erdi.' }, { status: 401 }),
      ),
    );

    await expect(apiClient.get('/protected-probe')).rejects.toBeDefined();

    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
