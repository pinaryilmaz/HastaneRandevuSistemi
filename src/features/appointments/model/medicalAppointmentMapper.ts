import type { Appointment, MedicalAppointmentResponse, PageResponse } from '@/api/contracts';

export interface MedicalAppointmentFilters {
  patientPhone?: string;
  storeId?: string;
  status?: Appointment['status'] | '';
  from?: string;
  to?: string;
  page?: number;
  size?: number;
}

export function mapMedicalAppointment(item: MedicalAppointmentResponse): Appointment {
  return {
    id: item.id,
    customerName: item.patientName,
    customerPhone: item.patientPhone,
    storeId: item.branchId,
    storeName: `${item.hospitalName} · ${item.branchName}`,
    employeeId: item.doctorId,
    employeeName: item.doctorName,
    serviceType: item.clinicName,
    startTime: item.startTime,
    endTime: item.endTime,
    status: item.status,
    channel: item.channel,
    calendarEventId: null,
    notes: null,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export function toAppointmentPage(
  items: MedicalAppointmentResponse[],
  filters: MedicalAppointmentFilters,
): PageResponse<Appointment> {
  const page = Math.max(filters.page ?? 0, 0);
  const size = Math.max(filters.size ?? 20, 1);
  const fromTime = filters.from ? new Date(filters.from).getTime() : null;
  const toTime = filters.to ? new Date(filters.to).getTime() : null;
  const filtered = items
    .filter((item) => !filters.storeId || item.branchId === filters.storeId)
    .filter((item) => !filters.status || item.status === filters.status)
    .filter((item) => fromTime === null || new Date(item.startTime).getTime() >= fromTime)
    .filter((item) => toTime === null || new Date(item.startTime).getTime() <= toTime)
    .map(mapMedicalAppointment);
  const totalElements = filtered.length;
  const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
  const content = filtered.slice(page * size, page * size + size);

  return {
    content,
    number: page,
    size,
    totalElements,
    totalPages,
    first: page === 0,
    last: totalPages === 0 || page >= totalPages - 1,
    empty: content.length === 0,
  };
}

export function mapMedicalAppointmentPage(
  page: PageResponse<MedicalAppointmentResponse>,
): PageResponse<Appointment> {
  return {
    ...page,
    content: page.content.map(mapMedicalAppointment),
  };
}
