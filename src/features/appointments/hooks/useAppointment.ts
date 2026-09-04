import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getAppointment } from '../api/appointmentsApi';
export function useAppointment(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.appointments.detail(id ?? ''),
    queryFn: () => getAppointment(id!),
    enabled: Boolean(id),
    staleTime: 15_000,
  });
}
