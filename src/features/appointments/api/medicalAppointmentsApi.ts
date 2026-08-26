import type { Appointment, MedicalAppointmentResponse, PageResponse } from '@/api/contracts';
import { hospitalClient } from '@/api/hospitalClient';
import { env } from '@/lib/env';
import { getAppointments } from './appointmentsApi';
import {
  mapMedicalAppointment,
  toAppointmentPage,
  type MedicalAppointmentFilters,
} from '../model/medicalAppointmentMapper';

export async function getMedicalAppointments(
  filters: MedicalAppointmentFilters,
): Promise<PageResponse<Appointment>> {
  if (env.useMocks) return getAppointments(filters);

  if (!filters.patientPhone?.trim()) return toAppointmentPage([], filters);
  const response = await hospitalClient.get<MedicalAppointmentResponse[]>('/medical-appointments', {
    params: { patientPhone: filters.patientPhone.trim() },
  });
  return toAppointmentPage(response.data, filters);
}

export async function getMedicalAppointment(
  id: string,
  patientPhone: string,
): Promise<Appointment> {
  if (env.useMocks) {
    const { getAppointment } = await import('./appointmentsApi');
    return getAppointment(id);
  }

  const response = await hospitalClient.get<MedicalAppointmentResponse[]>('/medical-appointments', {
    params: { patientPhone: patientPhone.trim() },
  });
  const item = response.data.find((appointment) => appointment.id === id);
  if (!item) throw new Error('Bu hastaya ait randevu bulunamadı.');
  return mapMedicalAppointment(item);
}
