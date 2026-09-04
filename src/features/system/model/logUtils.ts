import type { LogEvent, LogLevel } from '@/api/contracts';

export interface LogFilterCriteria {
  service: string;
  level: LogLevel | '';
  correlationId: string;
}

export const defaultLogServices = [
  'hospital-appointment-service',
  'appointment-service',
  'call-service',
  'notification-service',
  'whatsapp-service',
  'crm-service',
] as const;

function identity(log: LogEvent) {
  return `${log.correlationId}|${log.timestamp}`;
}

export function mergeAndFilterLogs(
  realtimeLogs: LogEvent[],
  restLogs: LogEvent[],
  filters: LogFilterCriteria,
): LogEvent[] {
  const unique = new Map<string, LogEvent>();

  for (const log of [...realtimeLogs, ...restLogs]) {
    unique.set(identity(log), log);
  }

  return [...unique.values()]
    .filter(
      (log) =>
        (!filters.service || log.service === filters.service) &&
        (!filters.level || log.level === filters.level) &&
        (!filters.correlationId || log.correlationId.includes(filters.correlationId)),
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function collectLogServices(...groups: LogEvent[][]): string[] {
  return [...new Set([...defaultLogServices, ...groups.flat().map((log) => log.service)])];
}
