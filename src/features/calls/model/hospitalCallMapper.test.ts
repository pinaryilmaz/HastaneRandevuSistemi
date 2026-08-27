import { describe, expect, it } from 'vitest';
import type { HospitalCallResponse } from '@/api/contracts';
import { mapHospitalCall } from './hospitalCallMapper';

const response: HospitalCallResponse = {
  id: 'call-1',
  appointmentId: 'appointment-1',
  roomName: 'hospital-call-12345678',
  patientPhone: '+38344123456',
  hospitalId: 'hospital-1',
  hospitalName: 'Medical Park Kosova',
  branchId: 'branch-1',
  branchName: 'Priştine',
  status: 'COMPLETED',
  result: 'APPOINTMENT_CONFIRMED',
  participantCount: 2,
  transcriptUrl: null,
  startedAt: '2026-08-27T08:00:00Z',
  endedAt: '2026-08-27T08:05:00Z',
  createdAt: '2026-08-27T07:59:00Z',
  updatedAt: '2026-08-27T08:05:00Z',
};

describe('mapHospitalCall', () => {
  it('yeni backend çağrı DTO alanlarını panel modeline eşler', () => {
    expect(mapHospitalCall(response)).toEqual({
      id: 'call-1',
      appointmentId: 'appointment-1',
      roomName: 'hospital-call-12345678',
      customerPhone: '+38344123456',
      storeId: 'branch-1',
      status: 'MATCHED',
      result: 'CONFIRMED',
      participantCount: 2,
      transcriptUrl: null,
      startedAt: '2026-08-27T08:00:00Z',
      endedAt: '2026-08-27T08:05:00Z',
    });
  });

  it('teknik başarısızlık sonucunu görüşme durumunda tutar', () => {
    expect(mapHospitalCall({ ...response, result: 'FAILED' }).result).toBeNull();
  });
});
