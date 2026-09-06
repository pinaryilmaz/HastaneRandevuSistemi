import type { AppointmentStatus, CallStatus } from '@/api/contracts';

export const callStatusConfig: Record<CallStatus, { className: string }> = {
  QUEUED: { className: 'bg-slate-100 text-slate-700 ring-slate-200' },
  DIALING: { className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  ACTIVE: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  MATCHED: { className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  COMPLETED: { className: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  FAILED: { className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  NO_ANSWER: { className: 'bg-orange-50 text-orange-700 ring-orange-200' },
};

export const appointmentStatusConfig: Record<AppointmentStatus, { className: string }> = {
  PENDING: { className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  CONFIRMED: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  CANCELLED: { className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  RESCHEDULED: { className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  NO_SHOW: { className: 'bg-slate-100 text-slate-700 ring-slate-200' },
  COMPLETED: { className: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
};
