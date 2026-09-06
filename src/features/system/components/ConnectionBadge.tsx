import { CloudOff, Radio, RefreshCw, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/formatDate';
import { useFilterStore, type ConnectionMode } from '@/store/filterStore';
import { env } from '@/lib/env';
const config: Record<ConnectionMode, { className: string; icon: typeof Radio }> = {
  live: {
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    icon: Radio,
  },
  polling: {
    className: 'bg-sky-50 text-sky-700 ring-sky-200',
    icon: RefreshCw,
  },
  connecting: {
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
    icon: Wifi,
  },
  offline: {
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
    icon: CloudOff,
  },
};
export function ConnectionBadge() {
  const { t } = useTranslation();
  const mode = useFilterStore((state) => state.connectionMode);
  const updated = useFilterStore((state) => state.lastUpdatedAt);
  if (!env.observabilityApiEnabled)
    return (
      <Badge className="bg-sky-50 text-sky-700 ring-sky-200">
        <Wifi size={12} /> {t('system.connection.hospitalApi')}
      </Badge>
    );
  const item = config[mode];
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-2">
      <Badge className={item.className}>
        <Icon
          size={12}
          className={mode === 'polling' || mode === 'connecting' ? 'animate-spin' : ''}
        />
        {t(`system.connection.${mode}`)}
      </Badge>
      {updated && (
        <span className="hidden w-36 whitespace-nowrap text-xs text-slate-500 xl:inline">
          {t('system.connection.lastData', { time: formatTime(updated) })}
        </span>
      )}
    </div>
  );
}
