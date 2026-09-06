import { describe, expect, it } from 'vitest';
import { i18n } from '@/i18n';
import { formatNumber } from './formatNumber';

describe('formatNumber', () => {
  it('tam sayıları Türkçe binlik ayırıcıyla biçimlendirir', () => {
    expect(formatNumber(1_234_567)).toBe('1.234.567');
  });

  it('ondalık sayılarda Türkçe virgül ayırıcı kullanır', () => {
    expect(formatNumber(1234.5)).toBe('1.234,5');
  });

  it('İngilizce seçildiğinde İngilizce sayı biçimini kullanır', async () => {
    await i18n.changeLanguage('en');
    expect(formatNumber(1234.5)).toBe('1,234.5');
  });
});
