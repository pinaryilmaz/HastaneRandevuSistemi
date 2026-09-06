import type { LogEvent, LogLevel, RealtimeEnvelope } from '@/api/contracts';
import { i18n } from '@/i18n';

const eventAliases: Record<string, string> = {
  CALL_CREATED: 'call.started',
  CALL_UPDATED: 'call.updated',
  CALL_COMPLETED: 'call.ended',
  APPOINTMENT_CREATED: 'appointment.created',
  APPOINTMENT_UPDATED: 'appointment.updated',
  APPOINTMENT_STATUS_UPDATED: 'appointment.updated',
  APPOINTMENT_CANCELLED: 'appointment.cancelled',
  MESSAGE_RECEIVED: 'message.received',
  CRM_OFFER_GENERATED: 'crm.offer.generated',
  STATS_UPDATED: 'stats.updated',
};

const labelKeys: Record<string, string> = {
  'call.started': 'callStarted',
  'call.updated': 'callUpdated',
  'call.ended': 'callEnded',
  'appointment.created': 'appointmentCreated',
  'appointment.updated': 'appointmentUpdated',
  'appointment.cancelled': 'appointmentCancelled',
  'message.received': 'messageReceived',
  'crm.offer.generated': 'crmOfferGenerated',
  'stats.updated': 'statsUpdated',
};

export function normalizeRealtimeEventName(envelope: RealtimeEnvelope): string {
  const rawEvent = envelope.event ?? envelope.eventType ?? 'unknown';
  return eventAliases[rawEvent] ?? rawEvent.toLocaleLowerCase('en-US').replaceAll('_', '.');
}

function inferService(event: string): string {
  if (event.startsWith('call.')) return 'call-service';
  if (event.startsWith('appointment.')) return 'appointment-service';
  if (event.startsWith('message.') || event.startsWith('whatsapp.')) return 'whatsapp-service';
  if (event.startsWith('stats.')) return 'notification-service';
  if (event.startsWith('crm.')) return 'crm-service';
  return 'system';
}

function inferLevel(event: string): LogLevel {
  if (event.includes('failed') || event.includes('error')) return 'ERROR';
  if (event.includes('cancelled') || event.includes('ended')) return 'WARN';
  return 'INFO';
}

export function realtimeToLog(envelope: RealtimeEnvelope): LogEvent {
  const event = normalizeRealtimeEventName(envelope);
  return {
    id: `rt-${envelope.correlationId}-${envelope.timestamp}`,
    timestamp: envelope.timestamp,
    level: inferLevel(event),
    service: inferService(event),
    message: labelKeys[event] ? i18n.t(`system.events.${labelKeys[event]}`) : event,
    correlationId: envelope.correlationId,
    meta:
      typeof envelope.payload === 'object' && envelope.payload
        ? (envelope.payload as Record<string, unknown>)
        : null,
    source: 'REALTIME',
  };
}
