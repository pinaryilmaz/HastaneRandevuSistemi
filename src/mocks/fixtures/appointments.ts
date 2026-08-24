import type { Appointment } from '@/api/contracts';
export const mockAppointments: Appointment[] = [
  appointment('apt-001', 'Ayşe Yılmaz', '+905321234512', 'fac-001', 'Merkez Hastanesi', 'cardiology', 'Dr. Selin Kaya', '2026-08-24T12:30:00Z', 'CONFIRMED', 'VOICE'),
  appointment('apt-002', 'Mehmet Demir', '+905441112288', 'fac-001', 'Merkez Hastanesi', 'neurology', 'Dr. Emre Arslan', '2026-08-24T13:00:00Z', 'PENDING', 'WHATSAPP'),
  appointment('apt-003', 'Zeynep Aksoy', '+905331245645', 'fac-002', 'Anadolu Hastanesi', 'dermatology', 'Dr. Aslı Çetin', '2026-08-24T13:30:00Z', 'CONFIRMED', 'VOICE'),
  appointment('apt-004', 'Can Öztürk', '+905554418901', 'fac-003', 'Sahil Tıp Merkezi', 'orthopedics', 'Dr. Burak Şen', '2026-08-24T14:00:00Z', 'RESCHEDULED', 'SMS'),
  appointment('apt-005', 'Elif Koç', '+905307778811', 'fac-002', 'Anadolu Hastanesi', 'pediatrics', 'Dr. Deniz Acar', '2026-08-24T15:30:00Z', 'PENDING', 'WHATSAPP'),
  appointment('apt-006', 'Murat Şahin', '+905426547722', 'fac-001', 'Merkez Hastanesi', 'internal-medicine', 'Dr. Ece Yalın', '2026-08-25T07:00:00Z', 'CANCELLED', 'VOICE'),
  appointment('apt-007', 'Seda Kılıç', '+905389914433', 'fac-003', 'Sahil Tıp Merkezi', 'cardiology', 'Dr. Selin Kaya', '2026-08-25T08:30:00Z', 'CONFIRMED', 'WHATSAPP'),
  appointment('apt-008', 'Ali Tunç', '+905455526644', 'fac-002', 'Anadolu Hastanesi', 'neurology', 'Dr. Emre Arslan', '2026-08-25T09:00:00Z', 'NO_SHOW', 'SMS'),
];
function appointment(id: string, customerName: string, customerPhone: string, storeId: string, storeName: string, serviceType: string, employeeName: string, startTime: string, status: Appointment['status'], channel: Appointment['channel']): Appointment { const endTime = new Date(new Date(startTime).getTime() + 30 * 60_000).toISOString(); return { id, customerName, customerPhone, storeId, storeName, employeeId: `emp-${id}`, employeeName, serviceType, startTime, endTime, status, channel, calendarEventId: `cal-${id}`, notes: status === 'RESCHEDULED' ? 'Hasta daha geç bir saat talep etti.' : null, createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-24T09:00:00Z' }; }
