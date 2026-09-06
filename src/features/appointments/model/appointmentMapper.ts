import { getCurrentLocale, i18n } from '@/i18n';

const serviceKeys: Record<string, string> = {
  cardiology: 'cardiology',
  neurology: 'neurology',
  dermatology: 'dermatology',
  orthopedics: 'orthopedics',
  pediatrics: 'pediatrics',
  'internal-medicine': 'internalMedicine',
};
export function formatServiceType(value: string): string {
  const serviceKey = serviceKeys[value];
  return (
    (serviceKey ? i18n.t(`serviceType.${serviceKey}`) : undefined) ??
    value
      .split('-')
      .map((part) => part.charAt(0).toLocaleUpperCase(getCurrentLocale()) + part.slice(1))
      .join(' ')
  );
}
