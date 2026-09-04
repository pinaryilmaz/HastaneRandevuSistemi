import type { LogLevel } from '@/api/contracts';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export interface LogFilterValues {
  service: string;
  level: LogLevel | '';
  correlationId: string;
}

const serviceLabels: Record<string, string> = {
  'hospital-appointment-service': 'Hastane randevu',
  'appointment-service': 'Randevu',
  'call-service': 'Çağrı',
  'notification-service': 'Canlı bildirim',
  'whatsapp-service': 'WhatsApp',
  'crm-service': 'CRM',
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
  const set = <K extends keyof LogFilterValues>(key: K, next: LogFilterValues[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select
        aria-label="Log servisi"
        value={value.service}
        onChange={(event) => set('service', event.target.value)}
      >
        <option value="">Tüm servisler</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {serviceLabels[service] ?? service}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Log seviyesi"
        value={value.level}
        onChange={(event) => set('level', event.target.value as LogLevel | '')}
      >
        <option value="">Tüm seviyeler</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
      </Select>
      <Input
        aria-label="Correlation ID"
        value={value.correlationId}
        onChange={(event) => set('correlationId', event.target.value)}
        placeholder="Correlation ID ile filtrele"
      />
    </div>
  );
}
