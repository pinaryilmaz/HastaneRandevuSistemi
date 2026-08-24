const bool = (value: string | undefined, fallback: boolean) =>
  value === undefined ? fallback : value.toLowerCase() === 'true';

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  wsEndpoint: import.meta.env.VITE_WS_ENDPOINT || '/api/v1/stream',
  useMocks: bool(import.meta.env.VITE_USE_MOCKS, import.meta.env.DEV),
};
