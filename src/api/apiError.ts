import axios from 'axios';
import { i18n } from '@/i18n';
import type { ApiError } from './contracts';

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError<ApiError>(error)) {
    return {
      message: error.response?.data?.message || i18n.t('errors.serverUnavailable'),
      status: error.response?.status,
      correlationId: error.response?.data?.correlationId,
      error: error.response?.data?.error,
      timestamp: error.response?.data?.timestamp,
    };
  }
  return { message: error instanceof Error ? error.message : i18n.t('errors.unexpected') };
}
