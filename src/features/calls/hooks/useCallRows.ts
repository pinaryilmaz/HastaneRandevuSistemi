import { useQueries } from '@tanstack/react-query';
import type { Call } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { getAppointment } from '@/features/appointments/api/appointmentsApi';
import { toCallRow } from '../model/callMapper';
export function useCallRows(calls: Call[]) {
  const appointmentQueries = useQueries({ queries: calls.map((call) => ({ queryKey: queryKeys.appointments.detail(call.appointmentId), queryFn: () => getAppointment(call.appointmentId), staleTime: 30_000, retry: false })) });
  return { rows: calls.map((call, index) => toCallRow(call, appointmentQueries[index]?.data)), isLoadingNames: appointmentQueries.some((query) => query.isLoading) };
}
