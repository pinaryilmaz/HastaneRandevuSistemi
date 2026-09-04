import { apiClient } from '@/api/client';
import type { Call, HospitalCallResponse } from '@/api/contracts';
import { hospitalClient } from '@/api/hospitalClient';
import { env } from '@/lib/env';
import { mapHospitalCall } from '../model/hospitalCallMapper';
export interface CallsFilters {
  storeId?: string;
  q?: string;
}
export async function getCalls(filters: CallsFilters): Promise<Call[]> {
  if (env.useMocks) return (await apiClient.get<Call[]>('/calls', { params: filters })).data;
  const items = (await hospitalClient.get<HospitalCallResponse[]>('/calls')).data.map(
    mapHospitalCall,
  );
  const query = filters.q?.toLocaleLowerCase('tr-TR');
  return items.filter(
    (item) =>
      (!filters.storeId || item.storeId === filters.storeId) &&
      (!query ||
        item.roomName.toLocaleLowerCase('tr-TR').includes(query) ||
        item.customerPhone.includes(query)),
  );
}
export async function getCall(id: string): Promise<Call> {
  if (env.useMocks) return (await apiClient.get<Call>(`/calls/${id}`)).data;
  const item = (await hospitalClient.get<HospitalCallResponse>(`/calls/${id}`)).data;
  return mapHospitalCall(item);
}
