import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getFacilities } from '../api/facilitiesApi';
export function useFacilities() { return useQuery({ queryKey: queryKeys.facilities, queryFn: getFacilities, staleTime: 5 * 60_000 }); }
