import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getCall } from '../api/callsApi';
export function useCallDetail(id: string | undefined) { return useQuery({ queryKey: queryKeys.calls.detail(id ?? ''), queryFn: () => getCall(id!), enabled: Boolean(id), refetchInterval: 5_000 }); }
