import { create } from 'zustand';
import type { LogEvent } from '@/api/contracts';

export type ConnectionMode = 'connecting' | 'live' | 'polling' | 'offline';

interface FilterState {
  facilityId: string;
  connectionMode: ConnectionMode;
  lastUpdatedAt: string | null;
  realtimeLogs: LogEvent[];
  setFacilityId: (id: string) => void;
  setConnectionMode: (mode: ConnectionMode) => void;
  touchUpdatedAt: (value?: string) => void;
  addRealtimeLog: (log: LogEvent) => void;
  clearRealtimeLogs: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  facilityId: '',
  connectionMode: 'connecting',
  lastUpdatedAt: null,
  realtimeLogs: [],
  setFacilityId: (facilityId) => set({ facilityId }),
  setConnectionMode: (connectionMode) => set({ connectionMode }),
  touchUpdatedAt: (value) => set({ lastUpdatedAt: value ?? new Date().toISOString() }),
  addRealtimeLog: (log) => set((state) => ({ realtimeLogs: [log, ...state.realtimeLogs].slice(0, 100) })),
  clearRealtimeLogs: () => set({ realtimeLogs: [] }),
}));
