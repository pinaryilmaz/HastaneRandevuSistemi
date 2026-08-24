import { apiClient } from '@/api/client';
import type { Appointment, AppointmentStatus, PageResponse } from '@/api/contracts';
export interface AppointmentFilters { storeId?: string; status?: AppointmentStatus | ''; from?: string; to?: string; page?: number; size?: number }
export async function getAppointments(filters: AppointmentFilters): Promise<PageResponse<Appointment>> { return (await apiClient.get<PageResponse<Appointment>>('/appointments', { params: filters })).data; }
export async function getAppointment(id: string): Promise<Appointment> { return (await apiClient.get<Appointment>(`/appointments/${id}`)).data; }
