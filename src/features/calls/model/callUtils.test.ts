import { describe, expect, it } from 'vitest';
import { mockCalls } from '@/mocks/fixtures/calls';
import type { CallRowModel } from './callMapper';
import { calculateCallStats, filterCallRowsByQuery, filterCallsByStatus } from './callUtils';

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

  it('çağrı satırlarını hasta adı, oda ve telefonla arar', () => {
    const rows: CallRowModel[] = mockCalls.slice(0, 2).map((call, index) => ({
      ...call,
      customerName: index === 0 ? 'Ayşe Yılmaz' : 'İpek Işık',
      storeName: 'Merkez Hastanesi',
      serviceType: 'Kardiyoloji',
    }));

    expect(filterCallRowsByQuery(rows, 'ayse')).toEqual([rows[0]]);
    expect(filterCallRowsByQuery(rows, 'room-002')).toEqual([rows[1]]);
    expect(filterCallRowsByQuery(rows, '544111')).toEqual([rows[1]]);
    expect(filterCallRowsByQuery(rows, 'bulunmayan')).toEqual([]);
    expect(filterCallRowsByQuery(rows, '   ')).toEqual(rows);
  });
});
