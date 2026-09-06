import type { Appointment, Call } from '@/api/contracts';
import { i18n } from '@/i18n';
export interface CallRowModel extends Call {
  customerName: string;
  storeName: string;
  serviceType: string;
}
export function toCallRow(call: Call, appointment?: Appointment): CallRowModel {
  return {
    ...call,
    customerName: appointment?.customerName ?? i18n.t('calls.patientUnavailable'),
    storeName: appointment?.storeName ?? '—',
    serviceType: appointment?.serviceType ?? '—',
  };
}
