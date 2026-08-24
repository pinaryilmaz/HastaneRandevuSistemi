import { describe, expect, it } from 'vitest';
import { mockCalls } from '@/mocks/fixtures/calls';
import { calculateCallStats } from './callUtils';
describe('calculateCallStats', () => { it('aktif, katılımcı ve eşleşen sayaçlarını backend kuralıyla hesaplar', () => { expect(calculateCallStats(mockCalls)).toEqual({ activeCalls: 3, participants: 7, matched: 1 }); }); });
