import { setupWorker } from 'msw/browser';
import { env } from '@/lib/env';
import { authHandlers, handlers } from './handlers';

export const worker = setupWorker(...(env.useMocks ? handlers : authHandlers));
