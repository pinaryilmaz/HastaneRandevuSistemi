import {
  CircleCheck,
  CircleDot,
  CircleOff,
  Clock3,
  PhoneCall,
  PhoneMissed,
  Radio,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CallStatus } from '@/api/contracts';
import { Badge } from '@/components/ui/badge';
import { callStatusConfig } from '@/lib/statusConfig';
const icons = {
  QUEUED: Clock3,
  DIALING: PhoneCall,
  ACTIVE: Radio,
  MATCHED: CircleCheck,
  COMPLETED: CircleDot,
  FAILED: CircleOff,
  NO_ANSWER: PhoneMissed,
};
export function CallStatusBadge({ status }: { status: CallStatus }) {
  const { t } = useTranslation();
  const Icon = icons[status];
  const config = callStatusConfig[status];
  return (
    <Badge className={config.className}>
      <Icon size={12} aria-hidden="true" />
      {t(`status.call.${status}`)}
    </Badge>
  );
}
