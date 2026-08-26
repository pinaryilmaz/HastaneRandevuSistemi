import { useQuery } from '@tanstack/react-query';
import type { Appointment } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { env } from '@/lib/env';
import { getMedicalAppointment } from '../api/medicalAppointmentsApi';

export function useMedicalAppointment(
  id: string | undefined,
  patientPhone: string | undefined,
  initialData?: Appointment,
) {
  return useQuery({
    queryKey: queryKeys.medicalAppointments.detail(id ?? '', patientPhone),
    queryFn: () => getMedicalAppointment(id!, patientPhone ?? ''),
    enabled: Boolean(id && (env.useMocks || patientPhone?.trim())),
    initialData: initialData?.id === id ? initialData : undefined,
    staleTime: 15_000,
  });
}
