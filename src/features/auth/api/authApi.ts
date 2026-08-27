import type { LoginRequest, LoginResponse } from '@/api/contracts';
import { apiClient } from '@/api/client';
import { hospitalClient } from '@/api/hospitalClient';
import { env } from '@/lib/env';

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const client = env.useMockAuth ? apiClient : hospitalClient;
  const { data } = await client.post<LoginResponse>('/auth/login', request);
  return data;
}
