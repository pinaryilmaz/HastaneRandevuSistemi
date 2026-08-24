import axios from 'axios';
import { env } from '@/lib/env';
import { useAuthStore } from '@/features/auth/store/authStore';
import { createCorrelationId } from './correlationId';

export const apiClient = axios.create({ baseURL: env.apiBaseUrl, timeout: 12_000 });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers['X-Correlation-Id'] = createCorrelationId();
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);
