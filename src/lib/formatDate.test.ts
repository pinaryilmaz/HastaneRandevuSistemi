import { describe, expect, it } from 'vitest';
import { i18n } from '@/i18n';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  const value = '2026-09-06T12:30:00Z';

  it('Türkçe seçildiğinde İstanbul saatini Türkçe biçimler', () => {
    expect(formatDate(value)).toContain('Eyl');
    expect(formatDate(value)).toContain('15:30');
  });

  it('İngilizce seçildiğinde dili değiştirip İstanbul saatini korur', async () => {
    await i18n.changeLanguage('en');
    expect(formatDate(value)).toContain('Sep');
    expect(formatDate(value)).toContain('03:30 PM');
  });
});
