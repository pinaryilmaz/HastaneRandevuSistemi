import { useQueries } from '@tanstack/react-query';
import type { Call } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { getMedicalAppointment } from '@/features/appointments/api/medicalAppointmentsApi';
import { toCallRow } from '../model/callMapper';
export function useCallRows(calls: Call[]) {
  const appointmentQueries = useQueries({ queries: calls.map((call) => ({ queryKey: queryKeys.medicalAppointments.detail(call.appointmentId), queryFn: () => getMedicalAppointment(call.appointmentId), staleTime: 30_000, retry: false })) });
  return { rows: calls.map((call, index) => toCallRow(call, appointmentQueries[index]?.data)), isLoadingNames: appointmentQueries.some((query) => query.isLoading) };
}
