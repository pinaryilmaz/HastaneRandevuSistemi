import type { AppointmentStatus, CallStatus } from '@/api/contracts';

export const callStatusConfig: Record<CallStatus, { label: string; className: string }> = {
  QUEUED: { label: 'Kuyrukta', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
  DIALING: { label: 'Aranıyor', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  ACTIVE: { label: 'Aktif', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  MATCHED: { label: 'Eşleşti', className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  COMPLETED: { label: 'Tamamlandı', className: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  FAILED: { label: 'Başarısız', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  NO_ANSWER: { label: 'Yanıt yok', className: 'bg-orange-50 text-orange-700 ring-orange-200' },
};

export const appointmentStatusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  PENDING: { label: 'Bekliyor', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  CONFIRMED: { label: 'Onaylandı', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  CANCELLED: { label: 'İptal', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
  RESCHEDULED: { label: 'Yeniden planlandı', className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  NO_SHOW: { label: 'Gelmedi', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
};
