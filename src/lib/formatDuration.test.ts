import { describe, expect, it } from 'vitest';
import { formatDuration } from './formatDuration';
describe('formatDuration', () => {
  it('dakika ve saniyeyi biçimler', () => {
    expect(
      formatDuration('2026-08-24T12:00:00Z', null, new Date('2026-08-24T12:01:12Z').getTime()),
    ).toBe('01:12');
  });
  it('başlangıç yoksa sıfır döner', () => {
    expect(formatDuration(null, null)).toBe('00:00');
  });
});
