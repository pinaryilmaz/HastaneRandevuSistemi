import { Check, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Call } from '@/api/contracts';
import { formatDate } from '@/lib/formatDate';
export function CallTimeline({ call }: { call: Call }) {
  const { t } = useTranslation();
  const items = [
    { label: t('calls.started'), value: call.startedAt },
    {
      label: t('calls.currentStatus', { status: t(`status.call.${call.status}`) }),
      value: call.endedAt ?? call.startedAt,
    },
    ...(call.endedAt ? [{ label: t('calls.ended'), value: call.endedAt }] : []),
  ];
  return (
    <ol className="space-y-0">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="relative flex gap-4 pb-6 last:pb-0">
          {index < items.length - 1 && (
            <span className="absolute left-[11px] top-6 h-full w-px bg-slate-200" />
          )}
          <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aqua-50 text-aqua-700 ring-4 ring-white">
            {index === items.length - 1 ? (
              <Circle size={10} fill="currentColor" />
            ) : (
              <Check size={12} />
            )}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-800">{item.label}</p>
            <p className="mt-1 text-xs text-slate-500">{formatDate(item.value)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
