import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getSystemStatus } from '../api/systemApi';
export function useSystemStatus() { return useQuery({ queryKey: queryKeys.systemStatus, queryFn: getSystemStatus, refetchInterval: 10_000 }); }
