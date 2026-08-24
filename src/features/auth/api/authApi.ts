import type { LoginRequest, LoginResponse } from '@/api/contracts';
import { apiClient } from '@/api/client';

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', request);
  return data;
}
