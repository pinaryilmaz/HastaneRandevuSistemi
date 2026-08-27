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
  medicalAppointments: {
    all: ['medical-appointments'] as const,
    list: (filters: object) => ['medical-appointments', 'list', filters] as const,
    detail: (id: string) => ['medical-appointments', 'detail', id] as const,
  },
  facilities: ['facilities'] as const,
  hospitalBranches: ['hospital-branches'] as const,
  logs: (filters: object) => ['logs', filters] as const,
  systemStatus: ['system-status'] as const,
};
