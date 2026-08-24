import { describe, expect, it } from 'vitest';
import { realtimeToLog } from './realtimeEventMapper';
describe('realtimeToLog', () => { it('çağrı olayını canlı log satırına dönüştürür', () => { const item = realtimeToLog({ event: 'call.started', timestamp: '2026-08-24T12:00:00Z', correlationId: 'corr-1', payload: { call: { id: '1' } } }); expect(item).toMatchObject({ level: 'INFO', service: 'call-service', source: 'REALTIME', correlationId: 'corr-1' }); }); });
