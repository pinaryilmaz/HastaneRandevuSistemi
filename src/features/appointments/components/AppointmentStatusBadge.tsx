import { CalendarCheck2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AppointmentStatus } from '@/api/contracts';
import { Badge } from '@/components/ui/badge';
import { appointmentStatusConfig } from '@/lib/statusConfig';
export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  const { t } = useTranslation();
  const config = appointmentStatusConfig[status];
  return (
    <Badge className={config.className}>
      <CalendarCheck2 size={12} aria-hidden="true" />
      {t(`status.appointment.${status}`)}
    </Badge>
  );
}
