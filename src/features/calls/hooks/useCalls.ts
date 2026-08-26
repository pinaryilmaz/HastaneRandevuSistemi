import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { useFilterStore } from '@/store/filterStore';
import { env } from '@/lib/env';
import { getCalls, type CallsFilters } from '../api/callsApi';
export function useCalls(filters: CallsFilters) {
  const mode = useFilterStore((state) => state.connectionMode);
  const touch = useFilterStore((state) => state.touchUpdatedAt);
  return useQuery({ queryKey: queryKeys.calls.list(filters), queryFn: async () => { const data = await getCalls(filters); touch(); return data; }, enabled: env.operationsApiEnabled, refetchInterval: mode === 'live' ? 30_000 : 5_000, refetchIntervalInBackground: false });
}
