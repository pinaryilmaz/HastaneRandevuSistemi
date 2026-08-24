import { apiClient } from '@/api/client';
import type { StoreResponse } from '@/api/contracts';
export async function getFacilities(): Promise<StoreResponse[]> { return (await apiClient.get<StoreResponse[]>('/stores')).data; }
