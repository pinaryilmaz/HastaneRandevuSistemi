import type { StoreResponse } from '@/api/contracts';
export interface FacilityOption { id: string; label: string; location: string }
export function toFacilityOption(store: StoreResponse): FacilityOption { return { id: store.id, label: store.name, location: store.location }; }
