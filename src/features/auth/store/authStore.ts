import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthUser, LoginResponse } from '@/api/contracts';

interface AuthState {
  accessToken: string | null;
  expiresAt: string | null;
  user: AuthUser | null;
  setSession: (session: LoginResponse) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      user: null,
      setSession: (session) => set(session),
      clearSession: () => set({ accessToken: null, expiresAt: null, user: null }),
      isAuthenticated: () => {
        const { accessToken, expiresAt } = get();
        return Boolean(accessToken && expiresAt && new Date(expiresAt).getTime() > Date.now());
      },
    }),
    { name: 'hospital-auth', storage: createJSONStorage(() => sessionStorage) },
  ),
);
