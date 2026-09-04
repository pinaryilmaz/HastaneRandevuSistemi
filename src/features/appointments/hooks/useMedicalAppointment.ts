import { useQuery } from '@tanstack/react-query';
import type { Appointment } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { getMedicalAppointment } from '../api/medicalAppointmentsApi';

export function useMedicalAppointment(id: string | undefined, initialData?: Appointment) {
  return useQuery({
    queryKey: queryKeys.medicalAppointments.detail(id ?? ''),
    queryFn: () => getMedicalAppointment(id!),
    enabled: Boolean(id),
    initialData: initialData?.id === id ? initialData : undefined,
    staleTime: 15_000,
  });
}
