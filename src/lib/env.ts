const bool = (value: string | undefined, fallback: boolean) =>
  value === undefined ? fallback : value.toLowerCase() === 'true';

const useMocks = bool(import.meta.env.VITE_USE_MOCKS, import.meta.env.DEV);
const operationsApiEnabled = bool(import.meta.env.VITE_OPERATIONS_API_ENABLED, useMocks);

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  hospitalApiBaseUrl: import.meta.env.VITE_HOSPITAL_API_BASE_URL || '/hospital-api/v1',
  wsEndpoint: import.meta.env.VITE_WS_ENDPOINT || '/api/v1/stream',
  useMocks,
  useMockAuth: bool(import.meta.env.VITE_USE_MOCK_AUTH, useMocks),
  operationsApiEnabled,
  defaultProtectedRoute: useMocks ? '/dashboard' : '/appointments',
};
