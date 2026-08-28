import { describe, expect, it } from 'vitest';
import type { MedicalAppointmentResponse } from '@/api/contracts';
import { mapMedicalAppointment, toAppointmentPage } from './medicalAppointmentMapper';

const medicalAppointment: MedicalAppointmentResponse = {
  id: 'appointment-1',
  hospitalId: 'hospital-1',
  hospitalName: 'Medical Park Kosova',
  branchId: 'branch-1',
  branchName: 'Priştine Şubesi',
  clinicId: 'clinic-1',
  clinicName: 'Kardiyoloji',
  doctorId: 'doctor-1',
  doctorName: 'Dr. Ayşe Yılmaz',
  patientName: 'Ali Kaya',
  patientPhone: '+38344123456',
  startTime: '2026-08-27T09:00:00+03:00',
  endTime: '2026-08-27T09:30:00+03:00',
  status: 'CONFIRMED',
  channel: 'VOICE',
  createdAt: '2026-08-26T12:00:00+03:00',
  updatedAt: '2026-08-26T12:00:00+03:00',
};

describe('medicalAppointmentMapper', () => {
  it('hastane DTO verisini panel randevu modeline dönüştürür', () => {
    expect(mapMedicalAppointment(medicalAppointment)).toMatchObject({
      id: 'appointment-1',
      customerName: 'Ali Kaya',
      customerPhone: '+38344123456',
      storeId: 'branch-1',
      storeName: 'Medical Park Kosova · Priştine Şubesi',
      employeeName: 'Dr. Ayşe Yılmaz',
      serviceType: 'Kardiyoloji',
      status: 'CONFIRMED',
    });
  });

  it('şube, durum ve tarih filtrelerini uygulayıp sayfa yanıtı üretir', () => {
    const other = {
      ...medicalAppointment,
      id: 'appointment-2',
      branchId: 'branch-2',
      status: 'CANCELLED' as const,
      startTime: '2026-09-02T09:00:00+03:00',
    };
    const page = toAppointmentPage([medicalAppointment, other], {
      storeId: 'branch-1',
      status: 'CONFIRMED',
      from: '2026-08-27T00:00:00+03:00',
      to: '2026-08-27T23:59:59+03:00',
      page: 0,
      size: 20,
    });

    expect(page.content.map((item) => item.id)).toEqual(['appointment-1']);
    expect(page.totalElements).toBe(1);
    expect(page.first).toBe(true);
    expect(page.last).toBe(true);
  });
});
