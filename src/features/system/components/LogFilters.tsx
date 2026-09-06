import type { LogLevel } from '@/api/contracts';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export interface LogFilterValues {
  service: string;
  level: LogLevel | '';
  correlationId: string;
}

const serviceKeys: Record<string, string> = {
  'hospital-appointment-service': 'hospitalAppointment',
  'appointment-service': 'appointment',
  'call-service': 'call',
  'notification-service': 'notification',
  'whatsapp-service': 'whatsapp',
  'crm-service': 'crm',
};

export function LogFilters({
  value,
  services,
  onChange,
}: {
  value: LogFilterValues;
  services: string[];
  onChange: (next: LogFilterValues) => void;
}) {
  const { t } = useTranslation();
  const set = <K extends keyof LogFilterValues>(key: K, next: LogFilterValues[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select
        aria-label={t('system.logService')}
        value={value.service}
        onChange={(event) => set('service', event.target.value)}
      >
        <option value="">{t('system.allServices')}</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {serviceKeys[service] ? t(`system.services.${serviceKeys[service]}`) : service}
          </option>
        ))}
      </Select>
      <Select
        aria-label={t('system.logLevel')}
        value={value.level}
        onChange={(event) => set('level', event.target.value as LogLevel | '')}
      >
        <option value="">{t('system.allLevels')}</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
      </Select>
      <Input
        aria-label={t('system.correlationLabel')}
        value={value.correlationId}
        onChange={(event) => set('correlationId', event.target.value)}
        placeholder={t('system.correlationPlaceholder')}
      />
    </div>
  );
}
