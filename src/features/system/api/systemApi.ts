import { apiClient } from '@/api/client';
import type { LogEvent, LogLevel, PageResponse, SystemStatus } from '@/api/contracts';
export interface LogFilters { service?: string; level?: LogLevel | ''; correlationId?: string; page?: number; size?: number }
export async function getSystemStatus(): Promise<SystemStatus> { return (await apiClient.get<SystemStatus>('/system/status')).data; }
export async function getLogs(filters: LogFilters): Promise<PageResponse<LogEvent>> { return (await apiClient.get<PageResponse<LogEvent>>('/logs', { params: filters })).data; }
