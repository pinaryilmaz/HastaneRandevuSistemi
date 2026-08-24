import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useQueryClient } from '@tanstack/react-query';
import type { Appointment, Call, RealtimeEnvelope } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { useAuthStore } from '@/features/auth/store/authStore';
import { env } from '@/lib/env';
import { useFilterStore } from '@/store/filterStore';
import { realtimeToLog } from '../model/realtimeEventMapper';

export function useRealtimeStream() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.accessToken);
  const setMode = useFilterStore((state) => state.setConnectionMode);
  const addLog = useFilterStore((state) => state.addRealtimeLog);
  const touch = useFilterStore((state) => state.touchUpdatedAt);

  useEffect(() => {
    if (env.useMocks) { setMode('polling'); return; }
    let attempts = 0;
    const client = new Client({
      webSocketFactory: () => new SockJS(env.wsEndpoint),
      reconnectDelay: 3_000,
      heartbeatIncoming: 10_000,
      heartbeatOutgoing: 10_000,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      beforeConnect: async () => { setMode(attempts ? 'polling' : 'connecting'); client.reconnectDelay = Math.min(3_000 * 2 ** attempts, 30_000); attempts += 1; },
      onConnect: () => {
        attempts = 0; setMode('live'); touch();
        client.subscribe('/topic/events', (message) => {
          try {
            const envelope = JSON.parse(message.body) as RealtimeEnvelope<Record<string, unknown>>;
            addLog(realtimeToLog(envelope)); touch(envelope.timestamp);
            if (envelope.event.startsWith('call.')) {
              const call = envelope.payload.call as Call | undefined;
              if (call) queryClient.setQueryData(queryKeys.calls.detail(call.id), call);
              void queryClient.invalidateQueries({ queryKey: queryKeys.calls.all });
            }
            if (envelope.event.startsWith('appointment.')) {
              const appointment = envelope.payload.appointment as Appointment | undefined;
              if (appointment) queryClient.setQueryData(queryKeys.appointments.detail(appointment.id), appointment);
              void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
            }
          } catch { setMode('polling'); }
        });
      },
      onStompError: () => setMode('polling'),
      onWebSocketClose: () => setMode(navigator.onLine ? 'polling' : 'offline'),
    });
    client.activate();
    const online = () => setMode('polling'); const offline = () => setMode('offline');
    window.addEventListener('online', online); window.addEventListener('offline', offline);
    return () => { window.removeEventListener('online', online); window.removeEventListener('offline', offline); void client.deactivate(); };
  }, [addLog, queryClient, setMode, token, touch]);
}
