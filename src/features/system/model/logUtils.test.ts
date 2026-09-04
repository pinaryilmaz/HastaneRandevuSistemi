import { describe, expect, it } from 'vitest';
import type { LogEvent } from '@/api/contracts';
import { collectLogServices, mergeAndFilterLogs } from './logUtils';

const realtimeLog: LogEvent = {
  id: 'rt-1',
  timestamp: '2026-09-04T09:00:00Z',
  level: 'INFO',
  service: 'call-service',
  message: 'Çağrı güncellendi',
  correlationId: 'corr-shared',
  source: 'REALTIME',
};

const restLog: LogEvent = {
  ...realtimeLog,
  id: 'rest-1',
  service: 'hospital-appointment-service',
  message: 'Çağrı kaydı güncellendi',
  source: 'REST',
};

describe('logUtils', () => {
  it('aynı correlation ve zaman değerine sahip REST ve canlı kaydı tekilleştirir', () => {
    expect(
      mergeAndFilterLogs([realtimeLog], [restLog], {
        service: '',
        level: '',
        correlationId: '',
      }),
    ).toEqual([restLog]);
  });

  it('servis, seviye ve correlation ID filtrelerini birlikte uygular', () => {
    const errorLog: LogEvent = {
      ...realtimeLog,
      id: 'rt-2',
      timestamp: '2026-09-04T10:00:00Z',
      level: 'ERROR',
      service: 'whatsapp-service',
      correlationId: 'corr-whatsapp-42',
    };

    expect(
      mergeAndFilterLogs([realtimeLog, errorLog], [], {
        service: 'whatsapp-service',
        level: 'ERROR',
        correlationId: '42',
      }),
    ).toEqual([errorLog]);
  });

  it('gerçek backend servisini ve sonradan gelen servisleri seçeneklere ekler', () => {
    const services = collectLogServices([{ ...realtimeLog, service: 'custom-hospital-adapter' }]);

    expect(services).toContain('hospital-appointment-service');
    expect(services).toContain('custom-hospital-adapter');
  });
});
