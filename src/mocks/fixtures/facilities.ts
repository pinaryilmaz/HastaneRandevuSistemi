import type { StoreResponse } from '@/api/contracts';
export const mockFacilities: StoreResponse[] = [
  { id: 'fac-001', name: 'Merkez Hastanesi', location: 'Şişli, İstanbul', phone: '+902120001001', googleCalendarId: null, timezone: 'Europe/Istanbul' },
  { id: 'fac-002', name: 'Anadolu Hastanesi', location: 'Kadıköy, İstanbul', phone: '+902160001002', googleCalendarId: null, timezone: 'Europe/Istanbul' },
  { id: 'fac-003', name: 'Sahil Tıp Merkezi', location: 'Bakırköy, İstanbul', phone: '+902120001003', googleCalendarId: null, timezone: 'Europe/Istanbul' },
];
