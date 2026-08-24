import axios from 'axios';
import type { ApiError } from './contracts';

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError<ApiError>(error)) {
    return {
      message: error.response?.data?.message || 'Sunucuyla iletişim kurulamadı.',
      status: error.response?.status,
      correlationId: error.response?.data?.correlationId,
      error: error.response?.data?.error,
      timestamp: error.response?.data?.timestamp,
    };
  }
  return { message: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.' };
}
