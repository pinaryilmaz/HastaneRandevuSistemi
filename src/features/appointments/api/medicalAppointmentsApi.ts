import type { Appointment, MedicalAppointmentResponse, PageResponse } from '@/api/contracts';
import { hospitalClient } from '@/api/hospitalClient';
import { env } from '@/lib/env';
import { getAppointment, getAppointments } from './appointmentsApi';
import {
  mapMedicalAppointment,
  mapMedicalAppointmentPage,
  toAppointmentPage,
  type MedicalAppointmentFilters,
} from '../model/medicalAppointmentMapper';

export async function getMedicalAppointments(
  filters: MedicalAppointmentFilters,
): Promise<PageResponse<Appointment>> {
  if (env.useMocks) return getAppointments(filters);

  if (filters.patientPhone?.trim()) {
    const response = await hospitalClient.post<MedicalAppointmentResponse[]>(
      '/medical-appointments/search',
      { patientPhone: filters.patientPhone.trim() },
    );
    return toAppointmentPage(response.data, filters);
  }

  const response = await hospitalClient.get<PageResponse<MedicalAppointmentResponse>>(
    '/medical-appointments',
    {
      params: {
        branchId: filters.storeId,
        status: filters.status,
        from: filters.from,
        to: filters.to,
        page: filters.page,
        size: filters.size,
        sort: 'startTime,desc',
      },
    },
  );
  return mapMedicalAppointmentPage(response.data);
}

export async function getMedicalAppointment(id: string): Promise<Appointment> {
  if (env.useMocks) {
    return getAppointment(id);
  }

  const response = await hospitalClient.get<MedicalAppointmentResponse>(
    `/medical-appointments/${id}`,
  );
  return mapMedicalAppointment(response.data);
}
