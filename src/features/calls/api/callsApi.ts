import { apiClient } from '@/api/client';
import type { Call } from '@/api/contracts';
export interface CallsFilters { storeId?: string; q?: string }
export async function getCalls(filters: CallsFilters): Promise<Call[]> { return (await apiClient.get<Call[]>('/calls', { params: filters })).data; }
export async function getCall(id: string): Promise<Call> { return (await apiClient.get<Call>(`/calls/${id}`)).data; }
