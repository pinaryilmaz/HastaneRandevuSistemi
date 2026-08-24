export type CallStatus =
  | 'QUEUED'
  | 'DIALING'
  | 'ACTIVE'
  | 'MATCHED'
  | 'COMPLETED'
  | 'FAILED'
  | 'NO_ANSWER';

export type CallResult = 'CONFIRMED' | 'DECLINED' | 'RESCHEDULE_REQUESTED';

export interface Call {
  id: string;
  appointmentId: string;
  roomName: string;
  customerPhone: string;
  storeId: string;
  status: CallStatus;
  result: CallResult | null;
  participantCount: number;
  transcriptUrl: string | null;
  startedAt: string | null;
  endedAt: string | null;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'RESCHEDULED' | 'NO_SHOW';
export type Channel = 'WHATSAPP' | 'SMS' | 'VOICE';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  storeId: string;
  storeName: string;
  employeeId: string | null;
  employeeName: string | null;
  serviceType: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  channel: Channel;
  calendarEventId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StoreResponse {
  id: string;
  name: string;
  location: string;
  phone: string;
  googleCalendarId: string | null;
  timezone: string;
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface LogEvent {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  correlationId: string;
  meta?: Record<string, unknown> | null;
  source?: 'REST' | 'REALTIME';
}

export type ServiceStatus = 'UP' | 'DOWN';

export interface SystemStatus {
  dialer: ServiceStatus;
  livekitAgent: ServiceStatus;
  dashboard: ServiceStatus;
  whatsapp: ServiceStatus;
}

export interface CallStatsPayload {
  activeCalls: number;
  participants: number;
  matched: number;
}

export interface RealtimeEnvelope<T = unknown> {
  event: string;
  timestamp: string;
  correlationId: string;
  payload: T;
}

export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiError {
  timestamp?: string;
  status?: number;
  error?: string;
  message: string;
  correlationId?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginRequest { email: string; password: string }
export interface LoginResponse { accessToken: string; expiresAt: string; user: AuthUser }
