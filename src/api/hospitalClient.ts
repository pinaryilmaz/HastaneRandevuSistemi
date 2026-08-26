import axios from 'axios';
import { createCorrelationId } from '@/api/correlationId';
import { useAuthStore } from '@/features/auth/store/authStore';
import { env } from '@/lib/env';

export const hospitalClient = axios.create({
  baseURL: env.hospitalApiBaseUrl,
  timeout: 12_000,
});

hospitalClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['X-Correlation-Id'] = createCorrelationId();
  return config;
});

hospitalClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);
