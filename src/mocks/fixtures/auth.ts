import type { LoginResponse } from '@/api/contracts';
export const mockCredentials = { email: 'operator@hastane.local', password: 'Demo123!' };
export function createMockSession(): LoginResponse {
  return {
    accessToken: 'mock-jwt-hospital-operations',
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    user: {
      id: 'user-operator-01',
      name: 'Ayşe Operatör',
      email: mockCredentials.email,
      roles: ['OPERATIONS'],
    },
  };
}
