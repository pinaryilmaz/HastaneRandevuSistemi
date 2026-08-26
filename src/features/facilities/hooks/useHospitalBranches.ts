import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/queryKeys';
import { getHospitalBranches } from '../api/hospitalFacilitiesApi';

export function useHospitalBranches() {
  return useQuery({
    queryKey: queryKeys.hospitalBranches,
    queryFn: getHospitalBranches,
    staleTime: 5 * 60_000,
  });
}
