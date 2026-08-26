import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getCall } from '../api/callsApi';
import { env } from '@/lib/env';
export function useCallDetail(id: string | undefined) { return useQuery({ queryKey: queryKeys.calls.detail(id ?? ''), queryFn: () => getCall(id!), enabled: env.operationsApiEnabled && Boolean(id), refetchInterval: 5_000 }); }
