import { describe, expect, it } from 'vitest';
import { mockCalls } from '@/mocks/fixtures/calls';
import { calculateCallStats, filterCallsByStatus } from './callUtils';

describe('callUtils', () => {
  it('aktif, katılımcı ve eşleşen sayaçlarını backend kuralıyla hesaplar', () => {
    expect(calculateCallStats(mockCalls)).toEqual({ activeCalls: 3, participants: 7, matched: 1 });
  });

  it('çağrıları seçilen duruma göre filtreler', () => {
    expect(filterCallsByStatus(mockCalls, 'MATCHED')).toEqual(
      mockCalls.filter((call) => call.status === 'MATCHED'),
    );
  });

  it('durum seçilmediğinde bütün çağrıları korur', () => {
    expect(filterCallsByStatus(mockCalls, '')).toEqual(mockCalls);
  });
});
