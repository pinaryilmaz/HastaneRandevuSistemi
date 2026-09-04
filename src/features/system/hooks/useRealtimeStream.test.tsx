import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryKeys } from '@/api/queryKeys';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useFilterStore } from '@/store/filterStore';
import { useRealtimeStream } from './useRealtimeStream';

const stompState = vi.hoisted(() => ({
  client: null as unknown,
  subscription: null as unknown,
}));

type MessageHandler = (message: { body: string }) => void;

interface FakeClient {
  reconnectDelay: number;
  activate: ReturnType<typeof vi.fn>;
  deactivate: ReturnType<typeof vi.fn>;
  subscribe: ReturnType<typeof vi.fn>;
  beforeConnect: () => Promise<void>;
  onConnect: () => void;
  onStompError: () => void;
  onWebSocketClose: () => void;
}

vi.mock('@stomp/stompjs', () => ({
  Client: class {
    reconnectDelay = 0;
    activate = vi.fn();
    deactivate = vi.fn().mockResolvedValue(undefined);
    subscribe = vi.fn((_destination: string, callback: MessageHandler) => {
      stompState.subscription = callback;
      return { unsubscribe: vi.fn() };
    });

    constructor(config: Record<string, unknown>) {
      Object.assign(this, config);
      stompState.client = this;
    }
  },
}));

vi.mock('sockjs-client', () => ({ default: vi.fn(() => ({})) }));
vi.mock('@/lib/env', () => ({
  env: {
    observabilityApiEnabled: true,
    useMocks: false,
    wsEndpoint: '/api/v1/stream',
  },
}));

function currentClient() {
  return stompState.client as FakeClient;
}

function sendEvent(eventType: string) {
  const subscription = stompState.subscription as MessageHandler;
  subscription({
    body: JSON.stringify({
      eventType,
      timestamp: '2026-09-04T09:00:00Z',
      correlationId: `corr-${eventType}`,
      payload: { status: 'ACTIVE' },
    }),
  });
}

describe('useRealtimeStream', () => {
  beforeEach(() => {
    stompState.client = null;
    stompState.subscription = null;
    useAuthStore.getState().clearSession();
    useFilterStore.setState({
      connectionMode: 'connecting',
      lastUpdatedAt: null,
      realtimeLogs: [],
    });
  });

  it('bağlantı kesildiğinde polling ve çevrimdışı moda geçip yeniden bağlanır', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { unmount } = renderHook(() => useRealtimeStream(), { wrapper });
    const client = currentClient();

    expect(client.activate).toHaveBeenCalledOnce();
    await act(() => client.beforeConnect());
    expect(client.reconnectDelay).toBe(3_000);
    expect(useFilterStore.getState().connectionMode).toBe('connecting');

    act(() => client.onStompError());
    expect(useFilterStore.getState().connectionMode).toBe('polling');

    await act(() => client.beforeConnect());
    expect(client.reconnectDelay).toBe(6_000);

    act(() => window.dispatchEvent(new Event('offline')));
    expect(useFilterStore.getState().connectionMode).toBe('offline');
    act(() => window.dispatchEvent(new Event('online')));
    expect(useFilterStore.getState().connectionMode).toBe('polling');

    unmount();
    expect(client.deactivate).toHaveBeenCalledOnce();
  });

  it('backend olaylarını loga dönüştürüp ilgili gereken query cachelerini yeniler', () => {
    const queryClient = new QueryClient();
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries');
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    renderHook(() => useRealtimeStream(), { wrapper });
    const client = currentClient();

    act(() => client.onConnect());
    expect(useFilterStore.getState().connectionMode).toBe('live');
    expect(client.subscribe).toHaveBeenCalledWith('/topic/events', expect.any(Function));

    act(() => sendEvent('CALL_CREATED'));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: queryKeys.calls.all });

    act(() => sendEvent('STATS_UPDATED'));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: queryKeys.calls.all });

    act(() => sendEvent('APPOINTMENT_STATUS_UPDATED'));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: queryKeys.appointments.all });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: queryKeys.medicalAppointments.all });
    expect(useFilterStore.getState().realtimeLogs).toHaveLength(3);

    act(() => {
      const subscription = stompState.subscription as MessageHandler;
      subscription({ body: '{invalid-json' });
    });
    expect(useFilterStore.getState().connectionMode).toBe('polling');
  });
});
