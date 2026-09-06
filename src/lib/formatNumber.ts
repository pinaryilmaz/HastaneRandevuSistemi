import { getCurrentLocale } from '@/i18n';

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(getCurrentLocale()).format(value);
}
