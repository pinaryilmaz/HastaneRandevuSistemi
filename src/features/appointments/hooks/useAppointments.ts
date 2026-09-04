import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getAppointments, type AppointmentFilters } from '../api/appointmentsApi';
export function useAppointments(filters: AppointmentFilters) {
  return useQuery({
    queryKey: queryKeys.appointments.list(filters),
    queryFn: () => getAppointments(filters),
    placeholderData: keepPreviousData,
  });
}
