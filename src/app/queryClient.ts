import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
export const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 3_000, retry: (count, error) => !(axios.isAxiosError(error) && error.response?.status === 401) && count < 1, refetchOnWindowFocus: true }, mutations: { retry: false } } });
