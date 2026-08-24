export const queryKeys = {
  calls: {
    all: ['calls'] as const,
    list: (filters: { storeId?: string; q?: string }) => ['calls', 'list', filters] as const,
    detail: (id: string) => ['calls', 'detail', id] as const,
  },
  appointments: {
    all: ['appointments'] as const,
    list: (filters: object) => ['appointments', 'list', filters] as const,
    detail: (id: string) => ['appointments', 'detail', id] as const,
  },
  facilities: ['facilities'] as const,
  logs: (filters: object) => ['logs', filters] as const,
  systemStatus: ['system-status'] as const,
};
