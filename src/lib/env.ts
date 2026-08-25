const bool = (value: string | undefined, fallback: boolean) =>
  value === undefined ? fallback : value.toLowerCase() === 'true';

const useMocks = bool(import.meta.env.VITE_USE_MOCKS, import.meta.env.DEV);

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  wsEndpoint: import.meta.env.VITE_WS_ENDPOINT || '/api/v1/stream',
  useMocks,
  useMockAuth: bool(import.meta.env.VITE_USE_MOCK_AUTH, useMocks),
};
