import { describe, expect, it } from 'vitest';
import { normalizeRealtimeEventName, realtimeToLog } from './realtimeEventMapper';

describe('realtime event mapper', () => {
  it('frontend olay biçimini canlı log satırına dönüştürür', () => {
    const item = realtimeToLog({
      event: 'call.started',
      timestamp: '2026-08-24T12:00:00Z',
      correlationId: 'corr-1',
      payload: { call: { id: '1' } },
    });

    expect(item).toMatchObject({
      level: 'INFO',
      service: 'call-service',
      source: 'REALTIME',
      correlationId: 'corr-1',
      message: 'Yeni çağrı başlatıldı',
    });
  });

  it('backend eventType biçimini normalize eder', () => {
    const envelope = {
      eventType: 'APPOINTMENT_STATUS_UPDATED',
      timestamp: '2026-08-24T12:00:00Z',
      correlationId: 'corr-2',
      payload: { appointmentId: '2' },
    };

    expect(normalizeRealtimeEventName(envelope)).toBe('appointment.updated');
    expect(realtimeToLog(envelope)).toMatchObject({
      service: 'appointment-service',
      message: 'Randevu güncellendi',
      meta: { appointmentId: '2' },
    });
  });

  it('bilinmeyen backend olaylarını okunabilir noktalı biçime çevirir', () => {
    expect(
      normalizeRealtimeEventName({
        eventType: 'CUSTOM_EVENT_CREATED',
        timestamp: '2026-08-24T12:00:00Z',
        correlationId: 'corr-3',
        payload: {},
      }),
    ).toBe('custom.event.created');
  });
});
