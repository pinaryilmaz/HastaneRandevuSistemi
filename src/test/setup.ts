import '@testing-library/jest-dom/vitest';
import { i18n } from '@/i18n';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';

export const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(async () => {
  cleanup();
  server.resetHandlers();
  sessionStorage.clear();
  await i18n.changeLanguage('tr');
  localStorage.clear();
});
afterAll(() => server.close());

Object.defineProperty(window, 'scrollTo', { value: () => undefined, writable: true });
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: () => undefined,
  writable: true,
});
