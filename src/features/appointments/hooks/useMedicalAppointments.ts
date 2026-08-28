import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { env } from '@/lib/env';
import { isE164Phone } from '@/lib/isE164Phone';
import { getMedicalAppointments } from '../api/medicalAppointmentsApi';
import type { MedicalAppointmentFilters } from '../model/medicalAppointmentMapper';

export function useMedicalAppointments(filters: MedicalAppointmentFilters) {
  const phone = filters.patientPhone?.trim();
  const validPhone = !phone || isE164Phone(phone);
  return useQuery({
    queryKey: queryKeys.medicalAppointments.list(filters),
    queryFn: () => getMedicalAppointments(filters),
    enabled: env.useMocks || validPhone,
    placeholderData: keepPreviousData,
  });
}
