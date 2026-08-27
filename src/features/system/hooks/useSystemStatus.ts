import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getSystemStatus } from '../api/systemApi';
import { env } from '@/lib/env';
export function useSystemStatus() { return useQuery({ queryKey: queryKeys.systemStatus, queryFn: getSystemStatus, enabled: env.observabilityApiEnabled, refetchInterval: 10_000 }); }
