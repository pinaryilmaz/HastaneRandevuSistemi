import type { Appointment, Call } from '@/api/contracts';
export interface CallRowModel extends Call { customerName: string; storeName: string; serviceType: string }
export function toCallRow(call: Call, appointment?: Appointment): CallRowModel { return { ...call, customerName: appointment?.customerName ?? 'Hasta bilgisi yüklenemedi', storeName: appointment?.storeName ?? '—', serviceType: appointment?.serviceType ?? '—' }; }
