/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_PROXY_TARGET?: string;
  readonly VITE_HOSPITAL_API_BASE_URL?: string;
  readonly VITE_HOSPITAL_API_PROXY_TARGET?: string;
  readonly VITE_WS_ENDPOINT?: string;
  readonly VITE_USE_MOCKS?: string;
  readonly VITE_USE_MOCK_AUTH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
