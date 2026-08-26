import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { env } from '@/lib/env';
import { getMedicalAppointments } from '../api/medicalAppointmentsApi';
import type { MedicalAppointmentFilters } from '../model/medicalAppointmentMapper';

export function useMedicalAppointments(filters: MedicalAppointmentFilters) {
  return useQuery({
    queryKey: queryKeys.medicalAppointments.list(filters),
    queryFn: () => getMedicalAppointments(filters),
    enabled: env.useMocks || Boolean(filters.patientPhone?.trim()),
    placeholderData: keepPreviousData,
  });
}
