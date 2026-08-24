import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getLogs, type LogFilters } from '../api/systemApi';
export function useLogs(filters: LogFilters) { return useQuery({ queryKey: queryKeys.logs(filters), queryFn: () => getLogs(filters), placeholderData: keepPreviousData, refetchInterval: 10_000 }); }
