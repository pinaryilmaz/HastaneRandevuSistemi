import type { Call, CallResult, HospitalCallResponse, HospitalCallResult } from '@/api/contracts';

const resultMap: Partial<Record<HospitalCallResult, CallResult>> = {
  APPOINTMENT_CONFIRMED: 'CONFIRMED',
  APPOINTMENT_CANCELLED: 'DECLINED',
  APPOINTMENT_RESCHEDULED: 'RESCHEDULE_REQUESTED',
};

export function mapHospitalCall(item: HospitalCallResponse): Call {
  return {
    id: item.id,
    appointmentId: item.appointmentId,
    roomName: item.roomName,
    customerPhone: item.patientPhone,
    storeId: item.branchId,
    status: item.result === 'APPOINTMENT_CONFIRMED' ? 'MATCHED' : item.status,
    result: item.result ? (resultMap[item.result] ?? null) : null,
    participantCount: item.participantCount,
    transcriptUrl: item.transcriptUrl,
    startedAt: item.startedAt ?? item.createdAt,
    endedAt: item.endedAt,
  };
}
