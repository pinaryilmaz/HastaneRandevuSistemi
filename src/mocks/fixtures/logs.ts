import type { LogEvent } from '@/api/contracts';
export const mockLogs: LogEvent[] = [
  log(
    'log-001',
    '2026-08-24T12:30:12Z',
    'INFO',
    'call-service',
    'Çağrı katılımcı bilgisi güncellendi',
    'corr-call-001',
  ),
  log(
    'log-002',
    '2026-08-24T12:29:58Z',
    'INFO',
    'appointment-service',
    'Randevu çağrı doğrulamasına gönderildi',
    'corr-apt-002',
  ),
  log(
    'log-003',
    '2026-08-24T12:29:44Z',
    'WARN',
    'notification-service',
    'WebSocket istemcisi yeniden bağlandı',
    'corr-ws-021',
  ),
  log(
    'log-004',
    '2026-08-24T12:29:31Z',
    'INFO',
    'whatsapp-service',
    'Hasta mesajı alındı ve AI kuyruğuna iletildi',
    'corr-wa-118',
  ),
  log(
    'log-005',
    '2026-08-24T12:28:52Z',
    'INFO',
    'call-service',
    'LiveKit odası aktif hale geldi',
    'corr-call-004',
  ),
  log(
    'log-006',
    '2026-08-24T12:27:14Z',
    'ERROR',
    'call-service',
    'Teyit çağrısı yanıt alınamadığı için sonlandırıldı',
    'corr-call-008',
  ),
];
function log(
  id: string,
  timestamp: string,
  level: LogEvent['level'],
  service: string,
  message: string,
  correlationId: string,
): LogEvent {
  return { id, timestamp, level, service, message, correlationId, source: 'REST' };
}
