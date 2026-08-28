import type { HospitalBranchResponse, HospitalResponse } from '@/api/contracts';
import { hospitalClient } from '@/api/hospitalClient';
import { env } from '@/lib/env';
import { getFacilities } from './facilitiesApi';

export async function getHospitalBranches(): Promise<HospitalBranchResponse[]> {
  if (env.useMocks) {
    const facilities = await getFacilities();
    return facilities.map((facility) => ({
      ...facility,
      hospitalId: facility.id,
      hospitalName: facility.name,
    }));
  }

  const hospitals = (await hospitalClient.get<HospitalResponse[]>('/hospitals')).data.filter(
    (hospital) => hospital.active,
  );
  const branchResponses = await Promise.all(
    hospitals.map((hospital) =>
      hospitalClient.get<HospitalBranchResponse[]>(`/hospitals/${hospital.id}/branches`),
    ),
  );

  return branchResponses.flatMap((response) => response.data);
}
